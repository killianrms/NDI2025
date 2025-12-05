'use client'

import { useState } from 'react'

// Combine questions from NIRD and cybersecurity
const allQuestions = [
  {
    id: 1,
    question: 'Quel pourcentage de l\'empreinte carbone du numérique provient de la fabrication des équipements ?',
    options: ['20%', '45%', '78%', '90%'],
    correct: 2,
    explanation: '78% de l\'empreinte carbone du numérique vient de la fabrication, pas de l\'utilisation !',
    category: 'NIRD',
  },
  {
    id: 2,
    question: 'Combien de kg de matières premières sont nécessaires pour fabriquer un smartphone ?',
    options: ['5 kg', '20 kg', '70 kg', '150 kg'],
    correct: 2,
    explanation: 'Il faut environ 70 kg de matières premières pour fabriquer un smartphone de 150g !',
    category: 'NIRD',
  },
  {
    id: 3,
    question: 'Quelle est la durée de vie moyenne d\'un smartphone en France ?',
    options: ['1 an', '2.5 ans', '5 ans', '7 ans'],
    correct: 1,
    explanation: 'La durée de vie moyenne est de 2.5 ans, alors que l\'appareil pourrait durer 5-7 ans !',
    category: 'NIRD',
  },
  {
    id: 4,
    question: 'Quel est le mot de passe le PLUS sécurisé ?',
    options: [
      'motdepasse123',
      'Password2024!',
      'J\'Aim3L3sP0mm3s!',
      'Tr0p!c@l#R4inF0r3st$92',
    ],
    correct: 3,
    explanation: 'Un bon mot de passe doit avoir au moins 12 caractères, mélanger majuscules, minuscules, chiffres et symboles, et ne pas être un mot du dictionnaire.',
    category: 'Cybersécurité',
  },
  {
    id: 5,
    question: 'Lequel de ces emails est suspect (phishing) ?',
    options: [
      'Newsletter hebdomadaire de votre magasin habituel',
      'Email urgent demandant de cliquer pour éviter la suspension de compte',
      'Confirmation de commande d\'un site connu',
      'Notification de réunion de votre calendrier',
    ],
    correct: 1,
    explanation: 'Les emails de phishing créent un sentiment d\'urgence artificielle pour vous pousser à agir sans réfléchir.',
    category: 'Cybersécurité',
  },
  {
    id: 6,
    question: 'Quelle est la meilleure pratique pour réduire la consommation énergétique d\'un serveur ?',
    options: [
      'Le laisser toujours allumé',
      'Mettre en veille les serveurs inactifs',
      'Augmenter la climatisation',
      'Ajouter plus de RAM',
    ],
    correct: 1,
    explanation: 'Mettre en veille les serveurs inactifs peut réduire la consommation de 30W à 5W par serveur.',
    category: 'Cybersécurité',
  },
  {
    id: 7,
    question: 'Parmi ces principes, lequel fait partie du RGPD ?',
    options: [
      'Collecte maximale de données',
      'Minimisation des données',
      'Conservation illimitée',
      'Partage sans consentement',
    ],
    correct: 1,
    explanation: 'Le RGPD impose de ne collecter que les données strictement nécessaires (principe de minimisation).',
    category: 'Cybersécurité',
  },
  {
    id: 8,
    question: 'Quel geste a le plus d\'impact pour un numérique responsable ?',
    options: [
      'Supprimer ses emails',
      'Garder son appareil le plus longtemps possible',
      'Éteindre son wifi la nuit',
      'Utiliser le mode sombre',
    ],
    correct: 1,
    explanation: 'Prolonger la durée de vie de ses appareils est l\'action la plus impactante, car 78% de l\'empreinte vient de la fabrication.',
    category: 'NIRD',
  },
]

// Shuffle function
function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array]
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]]
  }
  return newArray
}

interface ShuffledQuestion {
  id: number
  question: string
  options: string[]
  correctIndex: number
  explanation: string
  category: string
}

export default function TestConnaissancesPage() {
  const [started, setStarted] = useState(false)
  const [shuffledQuestions, setShuffledQuestions] = useState<ShuffledQuestion[]>([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [userAnswers, setUserAnswers] = useState<number[]>([])
  const [finished, setFinished] = useState(false)
  const [showResults, setShowResults] = useState(false)

  const startTest = () => {
    // Shuffle questions and options
    const shuffled = shuffleArray(allQuestions).map(q => {
      const optionsWithIndices = q.options.map((opt, idx) => ({
        option: opt,
        wasCorrect: idx === q.correct
      }))
      const shuffledOptions = shuffleArray(optionsWithIndices)
      const correctIndex = shuffledOptions.findIndex(o => o.wasCorrect)

      return {
        id: q.id,
        question: q.question,
        options: shuffledOptions.map(o => o.option),
        correctIndex,
        explanation: q.explanation,
        category: q.category,
      }
    })

    setShuffledQuestions(shuffled)
    setStarted(true)
    setCurrentQuestion(0)
    setScore(0)
    setSelectedAnswer(null)
    setShowExplanation(false)
    setUserAnswers([])
    setFinished(false)
    setShowResults(false)
  }

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
    setShowExplanation(true)

    if (answerIndex === shuffledQuestions[currentQuestion].correctIndex) {
      setScore(score + 1)
    }
  }

  const handleNext = () => {
    if (selectedAnswer !== null) {
      setUserAnswers([...userAnswers, selectedAnswer])
    }

    if (currentQuestion < shuffledQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
    } else {
      setFinished(true)
    }
  }

  if (!started) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-12 text-center">
          <div className="text-6xl mb-6">🧠</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
            Test tes Connaissances
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Évalue tes connaissances sur le numérique responsable et la cybersécurité à travers {allQuestions.length} questions.
          </p>

          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 mb-8">
            <h2 className="font-bold text-xl mb-4 text-gray-800">Au programme</h2>
            <div className="grid md:grid-cols-2 gap-4 text-left">
              <div className="flex items-start gap-3">
                <span className="text-2xl">🌱</span>
                <div>
                  <div className="font-semibold text-gray-800">Numérique Responsable</div>
                  <div className="text-sm text-gray-600">Impact environnemental, cycle de vie</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">🔐</span>
                <div>
                  <div className="font-semibold text-gray-800">Cybersécurité</div>
                  <div className="text-sm text-gray-600">Mots de passe, phishing, RGPD</div>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={startTest}
            className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-12 py-4 rounded-xl font-bold text-xl hover:shadow-lg transform hover:scale-105 transition-all"
          >
            Commencer le test
          </button>
        </div>
      </div>
    )
  }

  if (finished) {
    const percentage = Math.round((score / shuffledQuestions.length) * 100)
    const emoji = percentage >= 80 ? '🏆' : percentage >= 60 ? '🌟' : percentage >= 40 ? '💪' : '📚'
    const message =
      percentage >= 80 ? 'Excellent ! Tu maîtrises parfaitement ces sujets' :
      percentage >= 60 ? 'Bien joué ! Tu as de bonnes bases' :
      percentage >= 40 ? 'Pas mal ! Continue à apprendre' :
      'Continue tes efforts, chaque pas compte'

    return (
      <div className="min-h-screen py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
            <div className="text-8xl mb-6">{emoji}</div>
            <h1 className="text-4xl font-bold mb-4 text-gray-800">Test terminé</h1>

            <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl p-8 text-white mb-8">
              <div className="text-6xl font-bold mb-2">{score}/{shuffledQuestions.length}</div>
              <div className="text-2xl mb-2">{percentage}%</div>
              <p className="text-lg opacity-90">{message}</p>
            </div>

            <div className="flex gap-4 mb-8">
              <button
                onClick={() => setShowResults(!showResults)}
                className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
              >
                {showResults ? 'Masquer les réponses' : 'Voir les réponses'}
              </button>
              <button
                onClick={startTest}
                className="flex-1 bg-gray-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-700 transition-all"
              >
                Recommencer
              </button>
            </div>

            {showResults && (
              <div className="bg-gray-50 rounded-xl p-6 text-left animate-fade-in">
                <h4 className="text-xl font-bold mb-4 text-gray-800 text-center">Récapitulatif des réponses</h4>
                <div className="space-y-4">
                  {shuffledQuestions.map((q, index) => {
                    const userAnswer = userAnswers[index]
                    const isCorrect = userAnswer === q.correctIndex

                    return (
                      <div key={index} className={`p-4 rounded-xl border-2 ${isCorrect ? 'border-green-300 bg-green-50' : 'border-red-300 bg-red-50'}`}>
                        <div className="flex items-start gap-2">
                          <span className="text-xl">{isCorrect ? '✅' : '❌'}</span>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className={`text-xs px-2 py-1 rounded-full ${q.category === 'NIRD' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                                {q.category}
                              </span>
                            </div>
                            <p className="font-semibold text-gray-800 mb-2">Q{index + 1}: {q.question}</p>

                            {!isCorrect && (
                              <div className="mb-2">
                                <p className="text-sm text-red-700">Ta réponse : {q.options[userAnswer]}</p>
                              </div>
                            )}

                            <div className="mb-2">
                              <p className="text-sm text-green-700 font-semibold">Bonne réponse : {q.options[q.correctIndex]}</p>
                            </div>

                            <p className="text-sm text-gray-600 italic">{q.explanation}</p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  const question = shuffledQuestions[currentQuestion]
  const progress = ((currentQuestion + 1) / shuffledQuestions.length) * 100

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <div className="text-sm text-gray-600">
                Question {currentQuestion + 1}/{shuffledQuestions.length}
              </div>
              <div className={`text-xs px-3 py-1 rounded-full ${question.category === 'NIRD' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                {question.category}
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-gray-800 mb-6">
            {question.question}
          </h3>

          <div className="space-y-3 mb-6">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => !showExplanation && handleAnswer(index)}
                disabled={showExplanation}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                  showExplanation
                    ? index === question.correctIndex
                      ? 'border-green-500 bg-green-50'
                      : selectedAnswer === index
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-200 bg-gray-50'
                    : 'border-gray-200 hover:border-green-300 hover:bg-green-50'
                } ${showExplanation ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              >
                {option}
              </button>
            ))}
          </div>

          {showExplanation && (
            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 mb-4 animate-fade-in">
              <p className="text-gray-700">{question.explanation}</p>
            </div>
          )}

          {showExplanation && (
            <button
              onClick={handleNext}
              className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              {currentQuestion < shuffledQuestions.length - 1 ? 'Question suivante' : 'Voir le résultat'}
            </button>
          )}
        </div>

        <div className="mt-6 text-center">
          <div className="inline-block bg-white rounded-xl shadow-md px-6 py-3">
            <span className="text-gray-600 font-medium">Score actuel : </span>
            <span className="text-2xl font-bold text-green-600">{score}/{currentQuestion + (showExplanation ? 1 : 0)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
