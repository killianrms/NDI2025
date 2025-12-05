'use client'

import { useState, useEffect, useCallback } from 'react'
import { RULES, validatePassword, loadDynamicValues, PasswordRule } from '@/lib/password-game-rules'
import Link from 'next/link'

const TIMER_DURATION = 180
const CHECKBOX_SPEED = 500 // Bouge toutes les 0.5 secondes (beaucoup plus rapide !)

// Positions possibles pour la checkbox mobile
const CHECKBOX_POSITIONS = [
  { top: '10%', left: '10%' },
  { top: '10%', right: '10%' },
  { top: '80%', left: '10%' },
  { top: '80%', right: '10%' },
  { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' },
  { top: '30%', left: '20%' },
  { top: '60%', right: '30%' },
  { top: '20%', left: '70%' },
  { top: '70%', left: '60%' },
  { top: '40%', right: '15%' },
]

// ============================================================================
// COMPOSANT PRINCIPAL
// ============================================================================

export default function PasswordGamePage() {
  // États principaux
  const [password, setPassword] = useState('')
  const [validatedRulesCount, setValidatedRulesCount] = useState(0)
  const [showHints, setShowHints] = useState(false)
  const [dynamicValues, setDynamicValues] = useState<Map<string, number | string>>(new Map())

  // États pour les éléments frustrants
  const [showValidationField, setShowValidationField] = useState(false)
  const [validationInput, setValidationInput] = useState('')
  const [checkboxPosition, setCheckboxPosition] = useState(0)
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(TIMER_DURATION)
  const [gameCompleted, setGameCompleted] = useState(false)

  // Validation du mot de passe
  const { valid, validatedRules, failedRules } = validatePassword(
    password,
    validatedRulesCount,
    dynamicValues
  )

  // ============================================================================
  // EFFETS
  // ============================================================================

  // Charger les valeurs dynamiques au montage
  useEffect(() => {
    loadDynamicValues().then(setDynamicValues)
  }, [])

  // Timer de progression
  useEffect(() => {
    if (gameCompleted) return

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          // Timer expiré : réinitialiser la progression
          setPassword('')
          setValidatedRulesCount(0)
          setShowValidationField(false)
          setValidationInput('')
          setIsCheckboxChecked(false)
          return TIMER_DURATION
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [gameCompleted])

  // Validation automatique : avancer instantanément quand la règle courante est validée
  useEffect(() => {
    if (valid && validatedRules.length > validatedRulesCount && validatedRules.length < RULES.length) {
      setValidatedRulesCount(validatedRules.length)
    }
  }, [valid, validatedRules.length, validatedRulesCount])

  // Déplacement de la checkbox
  useEffect(() => {
    if (!showValidationField) return

    const interval = setInterval(() => {
      setCheckboxPosition((prev) => (prev + 1) % CHECKBOX_POSITIONS.length)
    }, CHECKBOX_SPEED)

    return () => clearInterval(interval)
  }, [showValidationField])

  // Détecter quand toutes les règles sont validées
  useEffect(() => {
    if (valid && validatedRules.length === RULES.length) {
      setShowValidationField(true)
    }
  }, [valid, validatedRules.length])

  // ============================================================================
  // HANDLERS
  // ============================================================================

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const handleFinalValidation = () => {
    if (
      validationInput.toLowerCase() === password.toLowerCase() &&
      isCheckboxChecked &&
      valid &&
      validatedRules.length === RULES.length
    ) {
      setGameCompleted(true)
    }
  }

  // ============================================================================
  // FONCTIONS UTILITAIRES
  // ============================================================================

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const getProgressPercentage = (): number => {
    return (validatedRulesCount / RULES.length) * 100
  }

  const getUnlockedRules = (): PasswordRule[] => {
    return RULES.filter((rule) => rule.unlockAtRule <= validatedRulesCount)
  }

  // Obtenir la règle actuelle (la prochaine non validée)
  const getCurrentRule = (): PasswordRule | null => {
    const unlockedRules = getUnlockedRules()
    const nextRule = unlockedRules.find((rule) => !validatedRules.includes(rule.id))
    return nextRule || null
  }

  // ============================================================================
  // RENDU - ÉCRAN DE VICTOIRE
  // ============================================================================

  if (gameCompleted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-500 to-blue-500 p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-12 max-w-2xl text-center">
          <div className="text-8xl mb-6">🎉</div>
          <h1 className="text-5xl font-bold mb-4 text-gray-800">Félicitations !</h1>
          <p className="text-xl text-gray-600 mb-8">
            Vous avez réussi à créer un mot de passe valide malgré toutes les contraintes frustantes.
          </p>
          <div className="bg-gray-100 rounded-lg p-6 mb-8">
            <p className="text-sm text-gray-500 mb-2">Votre mot de passe victorieux :</p>
            <p className="font-mono text-2xl font-bold text-green-600 break-all">{password}</p>
          </div>
          <div className="space-y-4">
            <div className="text-lg text-gray-700">
              <span className="font-semibold">{RULES.length} règles</span> validées
            </div>
            <div className="text-lg text-gray-700">
              Temps écoulé : <span className="font-semibold">{formatTime(TIMER_DURATION - timeRemaining)}</span>
            </div>
          </div>
          <Link
            href="/"
            className="mt-8 inline-block px-8 py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all"
          >
            Retour à l'accueil
          </Link>
        </div>
      </div>
    )
  }

  // ============================================================================
  // RENDU - JEU EN COURS
  // ============================================================================

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-red-100 to-pink-100 relative overflow-hidden">
      {/* Header */}
      <div className="bg-white shadow-md py-6 px-4 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">The Password Game</h1>
              <p className="text-sm text-gray-600">Numérique Responsable Edition</p>
            </div>
            <Link
              href="/"
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
            >
              ← Retour
            </Link>
          </div>

          {/* Timer */}
          <div className="bg-red-50 border-2 border-red-300 rounded-lg p-3">
            <div className="flex items-center justify-between">
              <span className="text-red-700 font-semibold">⏱️ Temps restant :</span>
              <span className={`font-mono text-xl font-bold ${timeRemaining < 30 ? 'text-red-600 animate-pulse' : 'text-red-700'}`}>
                {formatTime(timeRemaining)}
              </span>
            </div>
            <p className="text-xs text-red-600 mt-1">
              Après expiration, votre progression sera réinitialisée !
            </p>
          </div>

          {/* Progression */}
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-gray-700">
                Règles validées : {validatedRulesCount}/{RULES.length}
              </span>
              <span className="text-sm text-gray-600">{getProgressPercentage().toFixed(0)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${getProgressPercentage()}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="max-w-4xl mx-auto p-6 pb-32">
        {/* Champ de mot de passe */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <label className="block text-lg font-semibold text-gray-800 mb-3">
            Entrez votre mot de passe :
          </label>
          <input
            type="text"
            value={password}
            onChange={handlePasswordChange}
            className="w-full px-6 py-4 text-xl border-4 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none transition-colors font-mono"
            placeholder="Commencez à taper..."
            autoComplete="off"
          />

          {/* Toggle hints */}
          <button
            onClick={() => setShowHints(!showHints)}
            className="mt-3 text-sm text-blue-600 hover:text-blue-800 underline"
          >
            {showHints ? '🙈 Cacher' : '💡 Afficher'} les indices
          </button>
        </div>

        {/* Règle actuelle (une seule à la fois) */}
        <div className="space-y-4">
          {/* Règle actuelle (la prochaine non validée) */}
          {(() => {
            const currentRule = getCurrentRule()
            if (!currentRule) return null

            const isValid = validatedRules.includes(currentRule.id)
            const isFailed = failedRules.some((r) => r.id === currentRule.id)
            const ruleIndex = RULES.findIndex((r) => r.id === currentRule.id)

            return (
              <div
                key={currentRule.id}
                className={`rounded-xl p-6 shadow-lg transition-all animate-fade-in ${
                  isValid
                    ? 'bg-green-50 border-2 border-green-400'
                    : isFailed
                    ? 'bg-red-50 border-2 border-red-400'
                    : 'bg-white border-2 border-gray-300'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                      isValid
                        ? 'bg-green-500 text-white'
                        : isFailed
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-300 text-gray-600'
                    }`}
                  >
                    {isValid ? '✓' : ruleIndex + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800 mb-1 flex items-center gap-2">
                      {currentRule.title}
                      {currentRule.isContradictory && (
                        <span className="text-xs bg-orange-200 text-orange-800 px-2 py-1 rounded-full">
                          ⚠️ Contradictoire
                        </span>
                      )}
                    </h3>
                    <p className="text-gray-600 text-sm">{currentRule.description}</p>
                    {showHints && currentRule.hint && (
                      <p className="text-blue-600 text-xs mt-2 italic">💡 {currentRule.hint}</p>
                    )}
                  </div>
                </div>
              </div>
            )
          })()}

          {/* Règles validées précédentes en vert (en dessous) */}
          {getUnlockedRules()
            .filter((rule) => validatedRules.includes(rule.id))
            .map((rule, index) => {
              const ruleIndex = RULES.findIndex((r) => r.id === rule.id)
              return (
                <div
                  key={rule.id}
                  className="rounded-xl p-6 shadow-lg transition-all bg-green-50 border-2 border-green-400 opacity-70"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold bg-green-500 text-white">
                      ✓
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-800 mb-1 flex items-center gap-2">
                        {rule.title}
                        {rule.isContradictory && (
                          <span className="text-xs bg-orange-200 text-orange-800 px-2 py-1 rounded-full">
                            ⚠️ Contradictoire
                          </span>
                        )}
                      </h3>
                      <p className="text-gray-600 text-sm">{rule.description}</p>
                    </div>
                  </div>
                </div>
              )
            })}
        </div>

        {/* Message quand toutes les règles sont respectées */}
        {valid && validatedRules.length === RULES.length && (
          <div className="mt-6 bg-yellow-50 border-2 border-yellow-400 rounded-xl p-6">
            <h3 className="font-bold text-yellow-800 text-xl mb-2">
              🎯 Presque terminé !
            </h3>
            <p className="text-yellow-700 mb-4">
              Toutes les règles sont validées ! Maintenant, trouvez le champ de validation en bas à droite
              et la checkbox qui bouge pour terminer le jeu...
            </p>
          </div>
        )}
      </div>

      {/* ========================================================================
          ÉLÉMENTS FRUSTRANTS
          ======================================================================== */}

      {/* Champ de validation en bas à droite (apparaît quand toutes les règles sont OK) */}
      {showValidationField && (
        <div className="fixed bottom-4 right-4 bg-white border-4 border-purple-500 rounded-xl p-6 shadow-2xl max-w-sm z-20 animate-bounce">
          <h3 className="font-bold text-purple-800 mb-3 flex items-center gap-2">
            🎮 Validation finale
          </h3>
          <p className="text-sm text-gray-600 mb-3">
            Retapez votre mot de passe ici pour confirmer :
          </p>
          <input
            type="text"
            value={validationInput}
            onChange={(e) => setValidationInput(e.target.value)}
            className="w-full px-4 py-2 border-2 border-purple-300 rounded-lg focus:border-purple-500 focus:outline-none mb-3 font-mono text-sm"
            placeholder="Retapez le mot de passe..."
          />

          {validationInput === password && (
            <p className="text-green-600 text-xs mb-2">✓ Mot de passe correct !</p>
          )}

          <p className="text-xs text-gray-500 mb-3">
            Et maintenant, cochez la case qui bouge... si vous pouvez !
          </p>
        </div>
      )}

      {/* Checkbox qui bouge (apparaît avec le champ de validation) */}
      {showValidationField && (
        <div
          className="fixed transition-all duration-500 ease-in-out z-30"
          style={CHECKBOX_POSITIONS[checkboxPosition]}
        >
          <label className="bg-green-500 text-white px-6 py-3 rounded-full shadow-2xl cursor-pointer flex items-center gap-3 hover:bg-green-600 transition-colors">
            <input
              type="checkbox"
              checked={isCheckboxChecked}
              onChange={(e) => {
                setIsCheckboxChecked(e.target.checked)
                if (e.target.checked && validationInput.toLowerCase() === password.toLowerCase()) {
                  handleFinalValidation()
                }
              }}
              className="w-6 h-6"
            />
            <span className="font-bold text-lg">Je certifie !</span>
          </label>
        </div>
      )}
    </div>
  )
}
