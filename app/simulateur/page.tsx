'use client'

import { useState } from 'react'
import { SimulatorData, Badge } from '@/lib/types'
import { calculateCarbonFootprint, calculatePoints, getLevel, checkBadges, getRecommendations } from '@/lib/calculator'

export default function SimulatorPage() {
  const [data, setData] = useState<SimulatorData>({
    streaming: 2,
    email: 10,
    socialMedia: 2,
    videoCall: 1,
    cloudStorage: 5,
  })

  const [showResults, setShowResults] = useState(false)
  const [carbonFootprint, setCarbonFootprint] = useState(0)
  const [points, setPoints] = useState(0)
  const [badges, setBadges] = useState<Badge[]>([])
  const [recommendations, setRecommendations] = useState<string[]>([])

  const handleCalculate = () => {
    const carbon = calculateCarbonFootprint(data)
    const pts = calculatePoints(carbon)
    const bdgs = checkBadges(data, pts)
    const recs = getRecommendations(data)

    setCarbonFootprint(carbon)
    setPoints(pts)
    setBadges(bdgs)
    setRecommendations(recs)
    setShowResults(true)
  }

  const handleReset = () => {
    setData({
      streaming: 2,
      email: 10,
      socialMedia: 2,
      videoCall: 1,
      cloudStorage: 5,
    })
    setShowResults(false)
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
            Simulateur d'Empreinte Numérique
          </h1>
          <p className="text-lg text-gray-600">
            Calculez votre impact environnemental quotidien et découvrez comment l'améliorer
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Votre utilisation quotidienne</h2>

          {/* Streaming */}
          <div className="mb-6">
            <label className="flex justify-between items-center mb-2">
              <span className="text-gray-700 font-medium">📺 Streaming vidéo (heures/jour)</span>
              <span className="text-2xl font-bold text-green-600">{data.streaming}h</span>
            </label>
            <input
              type="range"
              min="0"
              max="12"
              step="0.5"
              value={data.streaming}
              onChange={(e) => setData({ ...data, streaming: parseFloat(e.target.value) })}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-500"
            />
          </div>

          {/* Email */}
          <div className="mb-6">
            <label className="flex justify-between items-center mb-2">
              <span className="text-gray-700 font-medium">📧 Emails envoyés/reçus (par jour)</span>
              <span className="text-2xl font-bold text-green-600">{data.email}</span>
            </label>
            <input
              type="range"
              min="0"
              max="100"
              step="5"
              value={data.email}
              onChange={(e) => setData({ ...data, email: parseInt(e.target.value) })}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-500"
            />
          </div>

          {/* Social Media */}
          <div className="mb-6">
            <label className="flex justify-between items-center mb-2">
              <span className="text-gray-700 font-medium">📱 Réseaux sociaux (heures/jour)</span>
              <span className="text-2xl font-bold text-green-600">{data.socialMedia}h</span>
            </label>
            <input
              type="range"
              min="0"
              max="12"
              step="0.5"
              value={data.socialMedia}
              onChange={(e) => setData({ ...data, socialMedia: parseFloat(e.target.value) })}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-500"
            />
          </div>

          {/* Video Calls */}
          <div className="mb-6">
            <label className="flex justify-between items-center mb-2">
              <span className="text-gray-700 font-medium">💻 Appels vidéo (heures/jour)</span>
              <span className="text-2xl font-bold text-green-600">{data.videoCall}h</span>
            </label>
            <input
              type="range"
              min="0"
              max="8"
              step="0.5"
              value={data.videoCall}
              onChange={(e) => setData({ ...data, videoCall: parseFloat(e.target.value) })}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-500"
            />
          </div>

          {/* Cloud Storage */}
          <div className="mb-8">
            <label className="flex justify-between items-center mb-2">
              <span className="text-gray-700 font-medium">☁️ Stockage cloud (GB)</span>
              <span className="text-2xl font-bold text-green-600">{data.cloudStorage} GB</span>
            </label>
            <input
              type="range"
              min="0"
              max="50"
              step="1"
              value={data.cloudStorage}
              onChange={(e) => setData({ ...data, cloudStorage: parseInt(e.target.value) })}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-500"
            />
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleCalculate}
              className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 text-white py-4 rounded-xl font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all"
            >
              Calculer mon empreinte
            </button>
            {showResults && (
              <button
                onClick={handleReset}
                className="px-6 bg-gray-200 text-gray-700 py-4 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
              >
                Réinitialiser
              </button>
            )}
          </div>
        </div>

        {/* Results */}
        {showResults && (
          <div className="space-y-6 animate-fade-in">
            {/* Carbon Footprint */}
            <div className="bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl shadow-xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Votre Empreinte Carbone</h3>
              <div className="text-center">
                <div className="text-6xl font-bold mb-2">{carbonFootprint}</div>
                <div className="text-xl">grammes de CO2 / jour</div>
                <div className="mt-4 text-sm opacity-90">
                  Équivalent à {(carbonFootprint / 1000 * 365).toFixed(1)} kg de CO2 par an
                </div>
              </div>
            </div>

            {/* Points */}
            <div className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl shadow-xl p-8 text-white text-center">
              <h3 className="text-xl font-bold mb-2">Points Éco-Responsables</h3>
              <div className="text-5xl font-bold">{points} / 1000</div>
            </div>

            {/* Badges */}
            {badges.length > 0 && (
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h3 className="text-2xl font-bold mb-6 text-gray-800">
                  🏆 Badges Débloqués ({badges.length})
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {badges.map((badge) => (
                    <div
                      key={badge.id}
                      className="flex items-center gap-4 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border-2 border-green-200"
                    >
                      <div className="text-4xl">{badge.icon}</div>
                      <div>
                        <div className="font-bold text-gray-800">{badge.name}</div>
                        <div className="text-sm text-gray-600">{badge.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recommendations */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-gray-800">💡 Recommandations</h3>
              <ul className="space-y-3">
                {recommendations.map((rec, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 p-4 bg-green-50 rounded-xl"
                  >
                    <span className="text-green-600 font-bold">✓</span>
                    <span className="text-gray-700">{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
