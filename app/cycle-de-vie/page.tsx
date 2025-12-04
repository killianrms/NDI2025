'use client'

import { useState } from 'react'
import { lifecycleStages, calculateFinalScore } from '@/lib/lifecycle-data'
import { LifecycleChoice } from '@/lib/types'

export default function LifecyclePage() {
  const [currentStage, setCurrentStage] = useState(0)
  const [totalImpact, setTotalImpact] = useState(0)
  const [choices, setChoices] = useState<LifecycleChoice[]>([])
  const [showResults, setShowResults] = useState(false)
  const [selectedChoice, setSelectedChoice] = useState<LifecycleChoice | null>(null)

  const stage = lifecycleStages[currentStage]
  const progress = ((currentStage + 1) / lifecycleStages.length) * 100

  const handleChoice = (choice: LifecycleChoice) => {
    setSelectedChoice(choice)
  }

  const handleNext = () => {
    if (!selectedChoice) return

    const newTotalImpact = totalImpact + selectedChoice.impact
    const newChoices = [...choices, selectedChoice]

    setTotalImpact(newTotalImpact)
    setChoices(newChoices)
    setSelectedChoice(null)

    if (currentStage < lifecycleStages.length - 1) {
      setCurrentStage(currentStage + 1)
    } else {
      setShowResults(true)
    }
  }

  const handleRestart = () => {
    setCurrentStage(0)
    setTotalImpact(0)
    setChoices([])
    setShowResults(false)
    setSelectedChoice(null)
  }

  if (showResults) {
    const result = calculateFinalScore(totalImpact)

    return (
      <div className="min-h-screen py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
              Résultats de votre parcours
            </h1>

            <div className={`bg-gradient-to-br ${result.color} rounded-2xl p-8 text-white mb-8`}>
              <div className="text-center">
                <div className="text-6xl font-bold mb-4">{result.rating}</div>
                <div className="text-3xl mb-4">Score d'Impact: {result.score}</div>
                <p className="text-xl">{result.message}</p>
              </div>
            </div>

            <div className="space-y-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-800">Récapitulatif de vos choix</h2>
              {choices.map((choice, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">{lifecycleStages[index].image}</div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg text-gray-800 mb-2">
                        {lifecycleStages[index].title}
                      </h3>
                      <p className="text-gray-700 mb-2">{choice.text}</p>
                      <div className="flex items-center gap-2">
                        <span className={`font-semibold ${choice.impact >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          Impact: {choice.impact > 0 ? '+' : ''}{choice.impact}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-2 italic">{choice.consequence}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleRestart}
                className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 text-white py-4 rounded-xl font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all"
              >
                Recommencer le parcours
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold text-gray-800">Cycle de Vie du Numérique</h1>
            <div className="text-lg font-semibold text-gray-600">
              Étape {currentStage + 1}/{lifecycleStages.length}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-green-500 to-blue-500 h-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          {/* Impact Score */}
          <div className="mt-4 text-center">
            <div className="inline-block bg-white rounded-xl shadow-md px-6 py-3">
              <span className="text-gray-600 font-medium">Score d'Impact Total: </span>
              <span className={`text-2xl font-bold ${totalImpact >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {totalImpact > 0 ? '+' : ''}{totalImpact}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="text-center mb-8">
            <div className="text-8xl mb-4">{stage.image}</div>
            <h2 className="text-3xl font-bold mb-4 text-gray-800">{stage.title}</h2>
            <p className="text-lg text-gray-600">{stage.description}</p>
          </div>

          <div className="space-y-4">
            {stage.choices.map((choice) => (
              <button
                key={choice.id}
                onClick={() => handleChoice(choice)}
                className={`w-full text-left p-6 rounded-xl border-2 transition-all ${
                  selectedChoice?.id === choice.id
                    ? 'border-green-500 bg-green-50 shadow-lg transform scale-105'
                    : 'border-gray-200 hover:border-green-300 hover:bg-green-50'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <p className="text-gray-800 font-medium mb-2">{choice.text}</p>
                    {selectedChoice?.id === choice.id && (
                      <div className="mt-4 p-4 bg-white rounded-lg animate-fade-in">
                        <div className={`font-semibold mb-2 ${choice.impact >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          Impact: {choice.impact > 0 ? '+' : ''}{choice.impact}
                        </div>
                        <p className="text-sm text-gray-600 italic">{choice.consequence}</p>
                      </div>
                    )}
                  </div>
                  <div className={`flex-shrink-0 w-6 h-6 rounded-full border-2 ${
                    selectedChoice?.id === choice.id
                      ? 'border-green-500 bg-green-500'
                      : 'border-gray-300'
                  } flex items-center justify-center`}>
                    {selectedChoice?.id === choice.id && (
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {selectedChoice && (
            <div className="mt-8">
              <button
                onClick={handleNext}
                className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-4 rounded-xl font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all"
              >
                {currentStage < lifecycleStages.length - 1 ? 'Étape suivante' : 'Voir les résultats'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
