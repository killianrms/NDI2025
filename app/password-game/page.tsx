'use client'

import { useState, useEffect, useCallback } from 'react'
import { RULES, validatePassword, loadDynamicValues, PasswordRule } from '@/lib/password-game-rules'
import Link from 'next/link'

const TIMER_DURATION = 120
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

  // États pour les popups ennuyeux
  const [showCookiePopup, setShowCookiePopup] = useState(true)
  const [showUpdatePopup, setShowUpdatePopup] = useState(false)
  const [showWindowsPopup, setShowWindowsPopup] = useState(false)
  const [showNotificationPopup, setShowNotificationPopup] = useState(false)
  const [showSurveyPopup, setShowSurveyPopup] = useState(false)
  const [showAntivirusPopup, setShowAntivirusPopup] = useState(false)
  const [acceptButtonPosition, setAcceptButtonPosition] = useState({ x: 0, y: 0 })

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

  // Vérifier la validation finale automatiquement
  useEffect(() => {
    if (
      validationInput.toLowerCase() === password.toLowerCase() &&
      validationInput !== '' &&
      isCheckboxChecked &&
      valid &&
      validatedRules.length === RULES.length &&
      !gameCompleted
    ) {
      setGameCompleted(true)
    }
  }, [validationInput, password, isCheckboxChecked, valid, validatedRules.length, gameCompleted])

  // Popups ennuyeux qui apparaissent aléatoirement
  useEffect(() => {
    if (gameCompleted) return

    // Popup de mise à jour apparaît après 8 secondes
    const updateTimer = setTimeout(() => {
      setShowUpdatePopup(true)
    }, 8000)

    // Popup Windows apparaît après 15 secondes
    const windowsTimer = setTimeout(() => {
      setShowWindowsPopup(true)
    }, 15000)

    // Popup notification apparaît après 25 secondes
    const notificationTimer = setTimeout(() => {
      setShowNotificationPopup(true)
    }, 25000)

    // Popup sondage apparaît après 18 secondes
    const surveyTimer = setTimeout(() => {
      setShowSurveyPopup(true)
    }, 18000)

    // Popup antivirus apparaît après 30 secondes
    const antivirusTimer = setTimeout(() => {
      setShowAntivirusPopup(true)
    }, 30000)

    return () => {
      clearTimeout(updateTimer)
      clearTimeout(windowsTimer)
      clearTimeout(notificationTimer)
      clearTimeout(surveyTimer)
      clearTimeout(antivirusTimer)
    }
  }, [gameCompleted])

  // Faire réapparaître le popup de cookies après 15 secondes s'il est fermé
  useEffect(() => {
    if (gameCompleted || showCookiePopup) return

    const cookieTimer = setTimeout(() => {
      setShowCookiePopup(true)
    }, 15000)

    return () => clearTimeout(cookieTimer)
  }, [showCookiePopup, gameCompleted])

  // ============================================================================
  // HANDLERS
  // ============================================================================

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
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
  // RENDU
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

          {/* Progression des règles */}
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-gray-700">
                Règles validées : {validatedRules.length}/{RULES.length}
              </span>
              <span className="text-sm text-gray-600">{((validatedRules.length / RULES.length) * 100).toFixed(0)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${(validatedRules.length / RULES.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Barre de progression dorée pour la validation finale */}
          {validatedRules.length === RULES.length && !gameCompleted && (
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-yellow-700">
                  🏆 Validation finale
                </span>
                <span className="text-sm text-yellow-600">
                  {isCheckboxChecked && validationInput.toLowerCase() === password.toLowerCase() ? '2/2' :
                   validationInput.toLowerCase() === password.toLowerCase() ? '1/2' :
                   isCheckboxChecked ? '1/2' : '0/2'}
                </span>
              </div>
              <div className="w-full bg-yellow-200 rounded-full h-3 border-2 border-yellow-400">
                <div
                  className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${(isCheckboxChecked && validationInput.toLowerCase() === password.toLowerCase() ? 100 :
                              validationInput.toLowerCase() === password.toLowerCase() ? 50 :
                              isCheckboxChecked ? 50 : 0)}%`
                  }}
                />
              </div>
              <p className="text-xs text-yellow-700 mt-1">
                ✓ Remplir le champ en bas à droite | ✓ Cocher la checkbox qui bouge
              </p>
            </div>
          )}
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

        {/* Message quand toutes les règles sont respectées - DÉPLACÉ EN HAUT */}
        {valid && validatedRules.length === RULES.length && (
          <div className="mb-6 bg-yellow-50 border-2 border-yellow-400 rounded-xl p-6 animate-pulse">
            <h3 className="font-bold text-yellow-800 text-xl mb-2">
              🎯 Presque terminé !
            </h3>
            <p className="text-yellow-700 mb-4">
              Toutes les règles sont validées ! Maintenant, trouvez le champ de validation en bas à droite
              et la checkbox qui bouge pour terminer le jeu...
            </p>
          </div>
        )}

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
      </div>

      {/* ========================================================================
          ÉLÉMENTS FRUSTRANTS
          ======================================================================== */}

      {/* Popup de cookies (apparaît au début) */}
      {showCookiePopup && !gameCompleted && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-end justify-center z-40">
          <div className="bg-gray-800 text-white p-6 m-4 rounded-lg shadow-2xl max-w-2xl w-full">
            <h3 className="text-lg font-bold mb-2">🍪 Nous utilisons des cookies</h3>
            <p className="text-sm text-gray-300 mb-4">
              Ce site utilise des cookies pour améliorer votre expérience, analyser le trafic,
              vous proposer des publicités ciblées et partager vos données avec 1 247 partenaires de confiance.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowCookiePopup(false)}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded font-semibold transition-colors"
              >
                Tout accepter
              </button>
              <button
                onClick={() => setShowCookiePopup(false)}
                className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded font-semibold transition-colors"
              >
                Paramétrer (503 options)
              </button>
              <button
                onClick={() => {
                  setShowCookiePopup(false)
                  // Réapparaît après seulement 3 secondes si on refuse
                  setTimeout(() => setShowCookiePopup(true), 3000)
                }}
                className="px-3 py-2 text-gray-400 hover:text-gray-300 text-sm"
              >
                Tout refuser
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Popup de mise à jour */}
      {showUpdatePopup && !gameCompleted && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-40">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4">
            <div className="bg-blue-600 text-white p-4 rounded-t-xl">
              <h3 className="text-lg font-bold">Mise à jour disponible</h3>
            </div>
            <div className="p-6">
              <p className="text-gray-700 mb-4">
                Une mise à jour importante est disponible pour améliorer votre sécurité.
                Voulez-vous redémarrer maintenant ?
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded p-3 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '0%' }}></div>
                  </div>
                </div>
                <p className="text-xs text-gray-600">Téléchargement : 0% (2.4 Go)</p>
              </div>
              <div className="flex gap-3 justify-end">
                <button
                  onMouseEnter={(e) => {
                    // Faire bouger le bouton au survol
                    const button = e.currentTarget
                    const randomX = Math.random() > 0.5 ? 100 : -100
                    const randomY = Math.random() > 0.5 ? 50 : -50
                    button.style.transform = `translate(${randomX}px, ${randomY}px)`
                    button.style.transition = 'transform 0.3s'
                    setTimeout(() => {
                      button.style.transform = 'translate(0, 0)'
                    }, 300)
                  }}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                >
                  Plus tard
                </button>
                <button
                  onClick={() => setShowUpdatePopup(false)}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Redémarrer maintenant
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Popup Activer Windows */}
      {showWindowsPopup && !gameCompleted && (
        <div className="fixed bottom-4 right-4 bg-gray-900 bg-opacity-95 text-white p-4 rounded shadow-2xl max-w-sm z-40 border border-gray-700">
          <div className="flex items-start gap-3">
            <div className="text-3xl">⚠️</div>
            <div className="flex-1">
              <h3 className="font-bold mb-1">Activer Windows</h3>
              <p className="text-sm text-gray-300 mb-3">
                Accédez aux paramètres pour activer Windows.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowWindowsPopup(false)}
                  className="px-4 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm font-semibold"
                >
                  Activer
                </button>
                <button
                  onClick={() => setShowWindowsPopup(false)}
                  className="px-4 py-1 text-gray-300 hover:text-white text-sm"
                >
                  Plus tard
                </button>
              </div>
            </div>
            <button
              onClick={() => setShowWindowsPopup(false)}
              className="text-gray-400 hover:text-white"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Popup de notification */}
      {showNotificationPopup && !gameCompleted && (
        <div className="fixed top-4 right-4 bg-white rounded-lg shadow-2xl max-w-sm z-40 border border-gray-200 animate-fade-in">
          <div className="p-4">
            <div className="flex items-start gap-3">
              <div className="text-2xl">🔔</div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-800 mb-1">Nouvelle notification</h3>
                <p className="text-sm text-gray-600 mb-2">
                  Votre session va expirer dans 2 minutes. Enregistrez votre travail !
                </p>
                <p className="text-xs text-gray-400">Il y a 1 minute</p>
              </div>
              <button
                onClick={() => setShowNotificationPopup(false)}
                className="flex-shrink-0 w-6 h-6 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded transition-colors text-lg font-bold"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Popup de sondage */}
      {showSurveyPopup && !gameCompleted && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full mx-4">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-t-xl">
              <h3 className="text-xl font-bold">📊 Votre avis nous intéresse !</h3>
            </div>
            <div className="p-6">
              <p className="text-gray-700 mb-4">
                Êtes-vous satisfait de votre expérience sur cette page ?
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2">
                  <input type="radio" name="satisfaction" id="very-satisfied" />
                  <label htmlFor="very-satisfied">😍 Très satisfait</label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="radio" name="satisfaction" id="satisfied" />
                  <label htmlFor="satisfied">🙂 Satisfait</label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="radio" name="satisfaction" id="neutral" />
                  <label htmlFor="neutral">😐 Neutre</label>
                </div>
                <div className="flex items-center gap-2">
                  <input type="radio" name="satisfaction" id="unsatisfied" />
                  <label htmlFor="unsatisfied">😠 Pas satisfait</label>
                </div>
              </div>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setShowSurveyPopup(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                >
                  Ignorer
                </button>
                <button
                  onClick={() => setShowSurveyPopup(false)}
                  className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded hover:shadow-lg"
                >
                  Envoyer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Popup antivirus expiré */}
      {showAntivirusPopup && !gameCompleted && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-40">
          <div className="bg-red-50 rounded-xl shadow-2xl max-w-md w-full mx-4 border-4 border-red-600">
            <div className="bg-red-600 text-white p-4 rounded-t-lg">
              <div className="flex items-center gap-3">
                <div className="text-3xl">🛡️</div>
                <h3 className="text-xl font-bold">ALERTE SÉCURITÉ</h3>
              </div>
            </div>
            <div className="p-6">
              <p className="text-red-800 font-bold mb-3">
                ⚠️ Votre protection antivirus a expiré !
              </p>
              <p className="text-gray-700 mb-4">
                Votre ordinateur est exposé à 47 menaces critiques. Renouvelez maintenant pour
                seulement 89,99€/an.
              </p>
              <div className="bg-yellow-100 border-l-4 border-yellow-500 p-3 mb-4">
                <p className="text-sm text-yellow-800">
                  <strong>Menaces détectées :</strong> Trojan.Generic (12), Malware.Win32 (23),
                  Spyware.Tracker (12)
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowAntivirusPopup(false)}
                  className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-bold"
                >
                  Renouveler maintenant
                </button>
                <button
                  onClick={() => setShowAntivirusPopup(false)}
                  className="px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg text-sm"
                >
                  Plus tard
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Popup de félicitations (apparaît après la validation finale) */}
      {gameCompleted && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md text-center transform animate-bounce">
            <h2 className="text-4xl font-bold text-green-600 mb-4">
              🎉 Bravo c'est fini ! 🎉
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              Vous avez réussi à valider toutes les règles et la validation finale !
            </p>

            {/* GIF de célébration */}
            <div className="mb-6 rounded-xl overflow-hidden">
              <iframe
                src="https://giphy.com/embed/g9582DNuQppxC"
                width="100%"
                height="240"
                frameBorder="0"
                className="giphy-embed"
                allowFullScreen
              />
            </div>

            <div className="bg-gray-100 rounded-lg p-6 mb-6">
              <p className="text-sm text-gray-500 mb-2">Votre mot de passe victorieux :</p>
              <p className="font-mono text-xl font-bold text-green-600 break-all">{password}</p>
            </div>

            <Link
              href="/"
              className="inline-block px-8 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-full font-bold hover:shadow-lg transform hover:scale-105 transition-all"
            >
              Retour à l'accueil
            </Link>
          </div>
        </div>
      )}

      {/* Champ de validation en bas à droite (apparaît quand toutes les règles sont OK) */}
      {showValidationField && !gameCompleted && (
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
      {showValidationField && !gameCompleted && (
        <div
          className="fixed transition-all duration-500 ease-in-out z-30"
          style={CHECKBOX_POSITIONS[checkboxPosition]}
        >
          <label className="bg-green-500 text-white px-6 py-3 rounded-full shadow-2xl cursor-pointer flex items-center gap-3 hover:bg-green-600 transition-colors">
            <input
              type="checkbox"
              checked={isCheckboxChecked}
              onChange={(e) => setIsCheckboxChecked(e.target.checked)}
              className="w-6 h-6"
            />
            <span className="font-bold text-lg">Je certifie !</span>
          </label>
        </div>
      )}
    </div>
  )
}
