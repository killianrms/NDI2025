'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { projects, quizQuestions } from '@/lib/projects-data'
import { Project } from '@/lib/types'

// Import Map dynamically to avoid SSR issues with Leaflet
const Map = dynamic(() => import('@/components/Map'), {
  ssr: false,
  loading: () => (
    <div className="h-[500px] w-full bg-gray-100 rounded-xl flex items-center justify-center">
      <p className="text-gray-600">Chargement de la carte...</p>
    </div>
  ),
})

export default function MapPage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [showQuiz, setShowQuiz] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project)
    setShowQuiz(false)
    setQuizCompleted(false)
    setCurrentQuestion(0)
    setScore(0)
  }

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
    setShowExplanation(true)

    if (answerIndex === quizQuestions[currentQuestion].correct) {
      setScore(score + 1)
    }
  }

  const handleNextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
    } else {
      setQuizCompleted(true)
    }
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
            Carte Interactive Montpellier
          </h1>
          <p className="text-lg text-gray-600">
            Découvrez les espaces de fabrication numérique responsable
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Map */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Localisation
            </h2>
            <Map projects={projects} onProjectClick={handleProjectClick} />
            <p className="text-sm text-gray-500 mt-4 text-center">
              99 Avenue d'Occitanie, 34090 Montpellier
            </p>
          </div>

          {/* Project Details */}
          <div>
            {selectedProject ? (
              <div className="bg-white rounded-2xl shadow-xl p-8 animate-fade-in">
                <div className="mb-6">
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">
                    {selectedProject.name}
                  </h2>
                  <span className="inline-block px-4 py-2 rounded-full text-sm font-semibold bg-blue-100 text-blue-700">
                    {selectedProject.category}
                  </span>
                </div>

                <p className="text-gray-600 mb-6 leading-relaxed">
                  {selectedProject.description}
                </p>

                <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 mb-6">
                  <h3 className="font-bold text-lg mb-3 text-gray-800">Informations pratiques</h3>
                  <div className="space-y-2 text-gray-700">
                    <p>Adresse : 99 Avenue d'Occitanie, 34090 Montpellier</p>
                    <p>Horaires : Lundi au vendredi, 9h-12h et 13h-17h</p>
                    <p>Accès : Gratuit</p>
                  </div>
                </div>

                <button
                  onClick={() => setShowQuiz(true)}
                  className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
                >
                  Testez vos connaissances
                </button>

                {/* Quiz Section */}
                {showQuiz && !quizCompleted && (
                  <div className="mt-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 animate-fade-in">
                    <div className="mb-4">
                      <div className="text-sm text-gray-600 mb-2">
                        Question {currentQuestion + 1}/{quizQuestions.length}
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all"
                          style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-gray-800 mb-4">
                      {quizQuestions[currentQuestion].question}
                    </h3>

                    <div className="space-y-3 mb-4">
                      {quizQuestions[currentQuestion].options.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => !showExplanation && handleAnswer(index)}
                          disabled={showExplanation}
                          className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                            showExplanation
                              ? index === quizQuestions[currentQuestion].correct
                                ? 'border-green-500 bg-green-50'
                                : selectedAnswer === index
                                ? 'border-red-500 bg-red-50'
                                : 'border-gray-200 bg-gray-50'
                              : 'border-gray-200 hover:border-purple-300 hover:bg-purple-50'
                          } ${showExplanation ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>

                    {showExplanation && (
                      <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 mb-4 animate-fade-in">
                        <p className="text-gray-700">{quizQuestions[currentQuestion].explanation}</p>
                      </div>
                    )}

                    {showExplanation && (
                      <button
                        onClick={handleNextQuestion}
                        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
                      >
                        {currentQuestion < quizQuestions.length - 1 ? 'Question suivante' : 'Voir le résultat'}
                      </button>
                    )}
                  </div>
                )}

                {/* Quiz Results */}
                {quizCompleted && (
                  <div className="mt-6 bg-gradient-to-br from-green-500 to-blue-500 rounded-xl p-8 text-white text-center animate-fade-in">
                    <div className="text-6xl mb-4">
                      {score === quizQuestions.length ? '🏆' : score >= quizQuestions.length / 2 ? '🌟' : '💪'}
                    </div>
                    <h3 className="text-3xl font-bold mb-2">Quiz terminé</h3>
                    <p className="text-2xl mb-4">Score : {score}/{quizQuestions.length}</p>
                    <p className="text-lg opacity-90">
                      {score === quizQuestions.length
                        ? 'Parfait ! Vous êtes un expert du numérique responsable'
                        : score >= quizQuestions.length / 2
                        ? 'Bien joué ! Continuez à apprendre'
                        : 'Continuez vos efforts, chaque pas compte'}
                    </p>
                    <button
                      onClick={() => {
                        setShowQuiz(false)
                        setQuizCompleted(false)
                        setCurrentQuestion(0)
                        setScore(0)
                        setSelectedAnswer(null)
                        setShowExplanation(false)
                      }}
                      className="mt-6 bg-white text-green-600 px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
                    >
                      Recommencer
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-xl p-8 flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="text-6xl mb-4">🗺️</div>
                  <p className="text-xl text-gray-600">
                    Cliquez sur le marqueur pour découvrir l'Ob.i LAB
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
