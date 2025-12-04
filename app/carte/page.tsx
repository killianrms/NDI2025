'use client'

import { useState } from 'react'
import { projects, categories, quizQuestions } from '@/lib/projects-data'
import { Project } from '@/lib/types'

export default function MapPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [showQuiz, setShowQuiz] = useState(false)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)

  const filteredProjects = selectedCategory === 'all'
    ? projects
    : projects.filter(p => p.category === selectedCategory)

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

  const getCategoryColor = (category: string) => {
    const cat = categories.find(c => c.id === category)
    return cat?.color || 'gray'
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
            Carte Interactive NIRD
          </h1>
          <p className="text-lg text-gray-600">
            Découvrez les projets de numérique responsable près de chez vous
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-8 flex flex-wrap justify-center gap-3">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-6 py-3 rounded-full font-semibold transition-all transform hover:scale-105 ${
                selectedCategory === cat.id
                  ? `bg-${cat.color}-500 text-white shadow-lg`
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Projects List */}
          <div className="lg:col-span-1 space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Projets ({filteredProjects.length})
            </h2>
            <div className="space-y-3 max-h-[600px] overflow-y-auto">
              {filteredProjects.map((project) => (
                <button
                  key={project.id}
                  onClick={() => handleProjectClick(project)}
                  className={`w-full text-left p-4 rounded-xl transition-all ${
                    selectedProject?.id === project.id
                      ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg'
                      : 'bg-white hover:shadow-md'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <h3 className={`font-bold mb-1 ${
                        selectedProject?.id === project.id ? 'text-white' : 'text-gray-800'
                      }`}>
                        {project.name}
                      </h3>
                      <p className={`text-sm ${
                        selectedProject?.id === project.id ? 'text-white opacity-90' : 'text-gray-600'
                      }`}>
                        {project.description.substring(0, 80)}...
                      </p>
                    </div>
                    <span className={`text-xs px-3 py-1 rounded-full ${
                      selectedProject?.id === project.id
                        ? 'bg-white/20 text-white'
                        : `bg-${getCategoryColor(project.category)}-100 text-${getCategoryColor(project.category)}-700`
                    }`}>
                      {project.category}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Map Visualization & Details */}
          <div className="lg:col-span-2">
            {/* Simplified Map */}
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
              <div className="relative bg-gradient-to-br from-blue-100 to-green-100 rounded-xl h-96 flex items-center justify-center overflow-hidden">
                {/* France Outline (Simplified) */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg viewBox="0 0 400 500" className="w-full h-full opacity-20">
                    <path
                      d="M 150 100 L 250 80 L 300 150 L 320 250 L 280 350 L 200 400 L 120 380 L 80 300 L 100 200 Z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                </div>

                {/* Project Markers */}
                {filteredProjects.map((project, index) => {
                  // Simple positioning based on lat/lng approximation
                  const x = ((project.location.lng + 5) / 10) * 100
                  const y = ((50 - project.location.lat) / 10) * 100

                  return (
                    <button
                      key={project.id}
                      onClick={() => handleProjectClick(project)}
                      className={`absolute w-12 h-12 rounded-full transform -translate-x-1/2 -translate-y-1/2 transition-all hover:scale-125 ${
                        selectedProject?.id === project.id
                          ? 'bg-gradient-to-br from-green-500 to-blue-500 shadow-lg scale-125'
                          : 'bg-white shadow-md'
                      }`}
                      style={{ left: `${x}%`, top: `${y}%` }}
                      title={project.name}
                    >
                      <span className="text-2xl">📍</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Project Details */}
            {selectedProject && (
              <div className="bg-white rounded-2xl shadow-xl p-8 animate-fade-in">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">
                      {selectedProject.name}
                    </h2>
                    <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold bg-${getCategoryColor(selectedProject.category)}-100 text-${getCategoryColor(selectedProject.category)}-700`}>
                      {selectedProject.category}
                    </span>
                  </div>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="text-gray-400 hover:text-gray-600 text-2xl"
                  >
                    ×
                  </button>
                </div>

                <p className="text-gray-600 mb-6">{selectedProject.description}</p>

                <div className="flex gap-4 mb-6">
                  {selectedProject.videoUrl && (
                    <button className="flex-1 bg-blue-500 text-white py-3 rounded-xl font-semibold hover:bg-blue-600 transition-colors">
                      📹 Voir la vidéo
                    </button>
                  )}
                  <button
                    onClick={() => setShowQuiz(true)}
                    className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
                  >
                    🎯 Mini-Quiz
                  </button>
                </div>

                {/* Quiz Section */}
                {showQuiz && !quizCompleted && (
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 animate-fade-in">
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
                  <div className="bg-gradient-to-br from-green-500 to-blue-500 rounded-xl p-8 text-white text-center animate-fade-in">
                    <div className="text-6xl mb-4">
                      {score === quizQuestions.length ? '🏆' : score >= quizQuestions.length / 2 ? '🌟' : '💪'}
                    </div>
                    <h3 className="text-3xl font-bold mb-2">Quiz terminé !</h3>
                    <p className="text-2xl mb-4">Score: {score}/{quizQuestions.length}</p>
                    <p className="text-lg opacity-90">
                      {score === quizQuestions.length
                        ? 'Parfait ! Vous êtes un expert du numérique responsable !'
                        : score >= quizQuestions.length / 2
                        ? 'Bien joué ! Continuez à apprendre !'
                        : 'Continuez vos efforts, chaque pas compte !'}
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
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
