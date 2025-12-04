'use client'

import { useState, useEffect } from 'react'
import { challenges, passwordChallenge, phishingChallenge, energyPuzzle, dataPrivacyChallenge, calculateEscapeGameScore } from '@/lib/escape-game-data'

export default function EscapeGamePage() {
  const [gameStarted, setGameStarted] = useState(false)
  const [currentChallenge, setCurrentChallenge] = useState(0)
  const [timeRemaining, setTimeRemaining] = useState(600) // 10 minutes total
  const [completedChallenges, setCompletedChallenges] = useState<string[]>([])
  const [gameCompleted, setGameCompleted] = useState(false)
  const [hintsUsed, setHintsUsed] = useState(0)
  const [showHint, setShowHint] = useState(false)

  // Password Challenge State
  const [selectedPassword, setSelectedPassword] = useState<number | null>(null)
  const [passwordFeedback, setPasswordFeedback] = useState('')

  // Phishing Challenge State
  const [selectedEmails, setSelectedEmails] = useState<number[]>([])
  const [phishingResult, setPhishingResult] = useState<string | null>(null)

  // Energy Puzzle State
  const [serverGrid, setServerGrid] = useState(energyPuzzle.grid)
  const [currentPower, setCurrentPower] = useState(
    energyPuzzle.grid.reduce((sum, server) => sum + server.power, 0)
  )

  // Data Privacy State
  const [userAnswers, setUserAnswers] = useState<string[]>(['', '', '', ''])
  const [privacyResult, setPrivacyResult] = useState<string | null>(null)

  useEffect(() => {
    if (gameStarted && timeRemaining > 0 && !gameCompleted) {
      const timer = setTimeout(() => setTimeRemaining(timeRemaining - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeRemaining === 0) {
      setGameCompleted(true)
    }
  }, [gameStarted, timeRemaining, gameCompleted])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const handleStartGame = () => {
    setGameStarted(true)
    setTimeRemaining(600)
  }

  const handlePasswordSelect = (index: number) => {
    setSelectedPassword(index)
    setPasswordFeedback(passwordChallenge.options[index].feedback)

    if (passwordChallenge.options[index].isCorrect) {
      setTimeout(() => {
        setCompletedChallenges([...completedChallenges, challenges[0].id])
        if (currentChallenge < challenges.length - 1) {
          setCurrentChallenge(currentChallenge + 1)
          setSelectedPassword(null)
          setPasswordFeedback('')
        } else {
          setGameCompleted(true)
        }
      }, 2000)
    }
  }

  const handlePhishingSubmit = () => {
    const correct = phishingChallenge.emails
      .filter(email => email.isPhishing)
      .map(email => email.id)

    const isCorrect =
      selectedEmails.length === correct.length &&
      selectedEmails.every(id => correct.includes(id))

    if (isCorrect) {
      setPhishingResult('Bravo ! Vous avez identifié tous les emails de phishing.')
      setTimeout(() => {
        setCompletedChallenges([...completedChallenges, challenges[1].id])
        setCurrentChallenge(currentChallenge + 1)
        setSelectedEmails([])
        setPhishingResult(null)
      }, 2000)
    } else {
      setPhishingResult('Incorrect. Réessayez !')
    }
  }

  const handleServerToggle = (id: number) => {
    const updatedGrid = serverGrid.map(server => {
      if (server.id === id && server.canSleep) {
        const newType = server.type === 'idle' ? 'sleep' : 'idle'
        const newPower = newType === 'sleep' ? 5 : 30
        return { ...server, type: newType, power: newPower }
      }
      return server
    })

    setServerGrid(updatedGrid)
    const newPower = updatedGrid.reduce((sum, server) => sum + server.power, 0)
    setCurrentPower(newPower)

    if (newPower <= energyPuzzle.targetPower) {
      setTimeout(() => {
        setCompletedChallenges([...completedChallenges, challenges[2].id])
        setCurrentChallenge(currentChallenge + 1)
      }, 1500)
    }
  }

  const handlePrivacySubmit = () => {
    const allCorrect = userAnswers.every((answer, index) =>
      answer.toUpperCase() === dataPrivacyChallenge.correctAnswers[index]
    )

    if (allCorrect) {
      setPrivacyResult('Parfait ! Vous maîtrisez les principes du RGPD.')
      setTimeout(() => {
        setCompletedChallenges([...completedChallenges, challenges[3].id])
        setGameCompleted(true)
      }, 2000)
    } else {
      setPrivacyResult('Certaines réponses sont incorrectes. Réessayez !')
    }
  }

  const handleHint = () => {
    setShowHint(true)
    setHintsUsed(hintsUsed + 1)
  }

  if (!gameStarted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-12 text-center">
          <div className="text-6xl mb-6">🔐</div>
          <h1 className="text-4xl font-bold mb-6 text-gray-800">
            Escape Game Numérique
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Testez vos connaissances en cybersécurité et sobriété numérique à travers 4 défis chronométrés.
          </p>

          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 mb-8">
            <h2 className="font-bold text-xl mb-4 text-gray-800">Les Défis</h2>
            <ul className="text-left space-y-3">
              {challenges.map((challenge, index) => (
                <li key={challenge.id} className="flex items-center gap-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-green-500 to-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                    {index + 1}
                  </span>
                  <div>
                    <div className="font-semibold text-gray-800">{challenge.title}</div>
                    <div className="text-sm text-gray-600">{challenge.description}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4 mb-8">
            <p className="text-gray-700">
              ⏱️ Temps limite: 10 minutes pour tous les défis
            </p>
          </div>

          <button
            onClick={handleStartGame}
            className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-12 py-4 rounded-xl font-bold text-xl hover:shadow-lg transform hover:scale-105 transition-all"
          >
            Commencer l'Escape Game
          </button>
        </div>
      </div>
    )
  }

  if (gameCompleted) {
    const score = calculateEscapeGameScore(timeRemaining, completedChallenges.length, challenges.length, hintsUsed)

    return (
      <div className="min-h-screen py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
            <div className="text-8xl mb-6">
              {completedChallenges.length === challenges.length ? '🎉' : '⏰'}
            </div>
            <h1 className="text-4xl font-bold mb-4 text-gray-800">
              {completedChallenges.length === challenges.length ? 'Félicitations !' : 'Temps écoulé !'}
            </h1>

            <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl p-8 text-white mb-8">
              <div className="text-5xl font-bold mb-2">{score}</div>
              <div className="text-xl">points</div>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {completedChallenges.length}/{challenges.length}
                </div>
                <div className="text-gray-600">Défis Réussis</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  {formatTime(timeRemaining)}
                </div>
                <div className="text-gray-600">Temps Restant</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {hintsUsed}
                </div>
                <div className="text-gray-600">Indices Utilisés</div>
              </div>
            </div>

            <button
              onClick={() => window.location.reload()}
              className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-all"
            >
              Rejouer
            </button>
          </div>
        </div>
      </div>
    )
  }

  const challenge = challenges[currentChallenge]

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Escape Game Numérique</h1>
              <p className="text-gray-600">Défi {currentChallenge + 1}/{challenges.length}</p>
            </div>
            <div className={`text-3xl font-bold ${timeRemaining < 120 ? 'text-red-600 animate-pulse' : 'text-green-600'}`}>
              ⏱️ {formatTime(timeRemaining)}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full transition-all"
              style={{ width: `${(completedChallenges.length / challenges.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Challenge Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">{challenge.title}</h2>
              <p className="text-gray-600">{challenge.description}</p>
            </div>
            <button
              onClick={handleHint}
              disabled={showHint}
              className="px-4 py-2 bg-yellow-500 text-white rounded-lg font-semibold hover:bg-yellow-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              💡 Indice
            </button>
          </div>

          {/* Challenge 1: Password */}
          {currentChallenge === 0 && (
            <div className="space-y-4">
              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 mb-6">
                <p className="text-gray-700 font-medium">{passwordChallenge.question}</p>
              </div>

              {showHint && (
                <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4 mb-4 animate-fade-in">
                  <p className="text-gray-700">💡 {passwordChallenge.explanation}</p>
                </div>
              )}

              {passwordChallenge.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handlePasswordSelect(index)}
                  disabled={selectedPassword !== null}
                  className={`w-full p-4 rounded-xl border-2 font-mono text-lg transition-all ${
                    selectedPassword === index
                      ? option.isCorrect
                        ? 'border-green-500 bg-green-50'
                        : 'border-red-500 bg-red-50'
                      : 'border-gray-200 hover:border-green-300 hover:bg-green-50'
                  } ${selectedPassword !== null ? 'cursor-not-allowed' : ''}`}
                >
                  {option.text}
                </button>
              ))}

              {passwordFeedback && (
                <div className={`p-4 rounded-xl animate-fade-in ${
                  passwordChallenge.options[selectedPassword!].isCorrect
                    ? 'bg-green-50 border-2 border-green-200 text-green-700'
                    : 'bg-red-50 border-2 border-red-200 text-red-700'
                }`}>
                  {passwordFeedback}
                </div>
              )}
            </div>
          )}

          {/* Challenge 2: Phishing */}
          {currentChallenge === 1 && (
            <div className="space-y-4">
              {showHint && (
                <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4 mb-4 animate-fade-in">
                  <p className="text-gray-700">💡 Vérifiez l'adresse email, l'urgence du message, et les liens suspects.</p>
                </div>
              )}

              <p className="text-gray-700 font-medium mb-4">{phishingChallenge.question}</p>

              {phishingChallenge.emails.map((email) => (
                <button
                  key={email.id}
                  onClick={() => {
                    if (selectedEmails.includes(email.id)) {
                      setSelectedEmails(selectedEmails.filter(id => id !== email.id))
                    } else {
                      setSelectedEmails([...selectedEmails, email.id])
                    }
                  }}
                  className={`w-full text-left p-6 rounded-xl border-2 transition-all ${
                    selectedEmails.includes(email.id)
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-semibold text-gray-800 mb-1">De: {email.from}</div>
                  <div className="font-medium text-gray-700 mb-2">Sujet: {email.subject}</div>
                  <div className="text-gray-600">{email.content}</div>
                </button>
              ))}

              {phishingResult && (
                <div className={`p-4 rounded-xl animate-fade-in ${
                  phishingResult.includes('Bravo')
                    ? 'bg-green-50 border-2 border-green-200 text-green-700'
                    : 'bg-red-50 border-2 border-red-200 text-red-700'
                }`}>
                  {phishingResult}
                </div>
              )}

              <button
                onClick={handlePhishingSubmit}
                className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all"
              >
                Valider
              </button>
            </div>
          )}

          {/* Challenge 3: Energy Puzzle */}
          {currentChallenge === 2 && (
            <div>
              {showHint && (
                <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4 mb-4 animate-fade-in">
                  <p className="text-gray-700">💡 Mettez en veille les serveurs inactifs pour réduire la consommation.</p>
                </div>
              )}

              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 mb-6">
                <p className="text-gray-700">{energyPuzzle.description}</p>
                <div className="mt-4 flex justify-between items-center">
                  <div>
                    <span className="font-bold">Consommation actuelle: </span>
                    <span className={`text-2xl font-bold ${currentPower <= energyPuzzle.targetPower ? 'text-green-600' : 'text-red-600'}`}>
                      {currentPower}W
                    </span>
                  </div>
                  <div>
                    <span className="font-bold">Objectif: </span>
                    <span className="text-2xl font-bold text-green-600">≤ {energyPuzzle.targetPower}W</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {serverGrid.map((server) => (
                  <button
                    key={server.id}
                    onClick={() => handleServerToggle(server.id)}
                    disabled={!server.canSleep}
                    className={`p-6 rounded-xl border-2 transition-all ${
                      server.type === 'active'
                        ? 'bg-red-100 border-red-300'
                        : server.type === 'sleep'
                        ? 'bg-green-100 border-green-300'
                        : 'bg-yellow-100 border-yellow-300 hover:bg-green-50'
                    } ${!server.canSleep ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
                  >
                    <div className="text-3xl mb-2">🖥️</div>
                    <div className="font-bold text-gray-800 capitalize">{server.type}</div>
                    <div className="text-sm text-gray-600">{server.power}W</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Challenge 4: Data Privacy */}
          {currentChallenge === 3 && (
            <div className="space-y-6">
              {showHint && (
                <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4 mb-4 animate-fade-in">
                  <p className="text-gray-700 mb-2">💡 Indices:</p>
                  <ul className="text-sm space-y-1">
                    {dataPrivacyChallenge.hints.map((hint, i) => (
                      <li key={i}>• {hint}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-4">
                <p className="text-gray-700">{dataPrivacyChallenge.description}</p>
              </div>

              {dataPrivacyChallenge.scrambledPrinciples.map((scrambled, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <div className="text-sm text-gray-600 mb-2">Mot brouillé:</div>
                      <div className="font-mono text-xl font-bold text-gray-800 mb-3">{scrambled}</div>
                      <input
                        type="text"
                        value={userAnswers[index]}
                        onChange={(e) => {
                          const newAnswers = [...userAnswers]
                          newAnswers[index] = e.target.value
                          setUserAnswers(newAnswers)
                        }}
                        placeholder="Votre réponse"
                        className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none uppercase"
                      />
                    </div>
                  </div>
                </div>
              ))}

              {privacyResult && (
                <div className={`p-4 rounded-xl animate-fade-in ${
                  privacyResult.includes('Parfait')
                    ? 'bg-green-50 border-2 border-green-200 text-green-700'
                    : 'bg-red-50 border-2 border-red-200 text-red-700'
                }`}>
                  {privacyResult}
                </div>
              )}

              <button
                onClick={handlePrivacySubmit}
                className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all"
              >
                Valider et Terminer
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
