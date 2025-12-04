'use client'

import { useState } from 'react'
import { leaderboardData, weeklyChallenges, achievements } from '@/lib/leaderboard-data'

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState<'leaderboard' | 'challenges' | 'achievements'>('leaderboard')

  const currentUser = leaderboardData[9] // YouCurrent

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-800">
            Tableau de Bord
          </h1>
          <p className="text-lg text-gray-600">
            Suivez vos progrès et comparez-vous à la communauté
          </p>
        </div>

        {/* User Stats Card */}
        <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl shadow-xl p-8 mb-8 text-white">
          <div className="flex items-center gap-6 mb-6">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center text-4xl">
              {currentUser.avatar}
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-1">{currentUser.username}</h2>
              <p className="text-green-100">Rang #{currentUser.rank} · Niveau {currentUser.level}</p>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
              <div className="text-3xl font-bold mb-1">{currentUser.totalPoints}</div>
              <div className="text-green-100">Points Totaux</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
              <div className="text-3xl font-bold mb-1">{currentUser.badges}</div>
              <div className="text-green-100">Badges</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
              <div className="text-3xl font-bold mb-1">{currentUser.carbonSaved}kg</div>
              <div className="text-green-100">CO2 Économisé</div>
            </div>
            <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
              <div className="text-3xl font-bold mb-1">{currentUser.level}</div>
              <div className="text-green-100">Niveau</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab('leaderboard')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              activeTab === 'leaderboard'
                ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            🏆 Classement
          </button>
          <button
            onClick={() => setActiveTab('challenges')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              activeTab === 'challenges'
                ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            🎯 Défis Hebdomadaires
          </button>
          <button
            onClick={() => setActiveTab('achievements')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all ${
              activeTab === 'achievements'
                ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            🏅 Réussites
          </button>
        </div>

        {/* Leaderboard Tab */}
        {activeTab === 'leaderboard' && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Classement Global
            </h2>

            <div className="space-y-3">
              {leaderboardData.map((entry) => (
                <div
                  key={entry.rank}
                  className={`flex items-center gap-6 p-4 rounded-xl transition-all ${
                    entry.username === currentUser.username
                      ? 'bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-300'
                      : entry.rank <= 3
                      ? 'bg-gradient-to-r from-yellow-50 to-orange-50'
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  {/* Rank */}
                  <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl ${
                    entry.rank === 1
                      ? 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-white'
                      : entry.rank === 2
                      ? 'bg-gradient-to-br from-gray-300 to-gray-500 text-white'
                      : entry.rank === 3
                      ? 'bg-gradient-to-br from-orange-400 to-orange-600 text-white'
                      : 'bg-gray-200 text-gray-700'
                  }`}>
                    {entry.rank <= 3 ? (
                      entry.rank === 1 ? '🥇' : entry.rank === 2 ? '🥈' : '🥉'
                    ) : (
                      entry.rank
                    )}
                  </div>

                  {/* Avatar */}
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center text-2xl">
                    {entry.avatar}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-gray-800 truncate">{entry.username}</div>
                    <div className="text-sm text-gray-600">
                      Niveau {entry.level} · {entry.badges} badges · {entry.carbonSaved}kg CO2
                    </div>
                  </div>

                  {/* Points */}
                  <div className="flex-shrink-0 text-right">
                    <div className="text-2xl font-bold text-green-600">{entry.totalPoints}</div>
                    <div className="text-xs text-gray-600">points</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Challenges Tab */}
        {activeTab === 'challenges' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold mb-2 text-gray-800">
                Défis de la Semaine
              </h2>
              <p className="text-gray-600 mb-6">
                Complétez les défis pour gagner des points bonus et monter dans le classement !
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                {weeklyChallenges.map((challenge) => {
                  const progress = (challenge.progress / challenge.target) * 100

                  return (
                    <div
                      key={challenge.id}
                      className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6 border-2 border-green-200"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="text-4xl">{challenge.icon}</div>
                          <div>
                            <h3 className="font-bold text-lg text-gray-800">{challenge.title}</h3>
                            <p className="text-sm text-gray-600">{challenge.description}</p>
                          </div>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="mb-4">
                        <div className="flex justify-between text-sm text-gray-600 mb-2">
                          <span>Progression</span>
                          <span>{challenge.progress} / {challenge.target}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                          <div
                            className={`h-3 rounded-full transition-all ${
                              progress >= 100
                                ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                                : 'bg-gradient-to-r from-blue-500 to-cyan-500'
                            }`}
                            style={{ width: `${Math.min(progress, 100)}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="text-2xl font-bold text-green-600">+{challenge.points} pts</div>
                        <div className="text-sm text-gray-600">
                          Expire le {new Date(challenge.deadline).toLocaleDateString('fr-FR')}
                        </div>
                      </div>

                      {progress >= 100 && (
                        <div className="mt-4 bg-green-500 text-white py-2 px-4 rounded-lg text-center font-semibold">
                          ✓ Défi Complété !
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Challenge History */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-xl font-bold mb-4 text-gray-800">Défis Précédents</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">✅</div>
                    <div>
                      <div className="font-semibold text-gray-800">Week-end sans réseaux sociaux</div>
                      <div className="text-sm text-gray-600">Complété le 01/12/2025</div>
                    </div>
                  </div>
                  <div className="text-xl font-bold text-green-600">+200 pts</div>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">✅</div>
                    <div>
                      <div className="font-semibold text-gray-800">Partage de projet NIRD</div>
                      <div className="text-sm text-gray-600">Complété le 28/11/2025</div>
                    </div>
                  </div>
                  <div className="text-xl font-bold text-green-600">+150 pts</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Achievements Tab */}
        {activeTab === 'achievements' && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Réussites
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`relative rounded-xl p-6 border-2 transition-all ${
                    achievement.unlocked
                      ? 'bg-gradient-to-br from-green-50 to-blue-50 border-green-300 shadow-md'
                      : 'bg-gray-100 border-gray-300 opacity-60'
                  }`}
                >
                  {achievement.unlocked && (
                    <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full p-1">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}

                  <div className="text-5xl mb-4 text-center">{achievement.icon}</div>
                  <h3 className={`font-bold text-lg text-center mb-2 ${
                    achievement.unlocked ? 'text-gray-800' : 'text-gray-500'
                  }`}>
                    {achievement.name}
                  </h3>
                  <p className={`text-sm text-center ${
                    achievement.unlocked ? 'text-gray-600' : 'text-gray-500'
                  }`}>
                    {achievement.description}
                  </p>

                  {!achievement.unlocked && (
                    <div className="mt-4 text-center">
                      <div className="inline-block bg-gray-300 text-gray-600 px-3 py-1 rounded-full text-xs font-semibold">
                        Verrouillé
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Achievement Stats */}
            <div className="mt-8 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200">
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-600 mb-2">
                  {achievements.filter(a => a.unlocked).length}/{achievements.length}
                </div>
                <div className="text-gray-700">Réussites Débloquées</div>
                <div className="w-full bg-gray-200 rounded-full h-3 mt-4">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all"
                    style={{ width: `${(achievements.filter(a => a.unlocked).length / achievements.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
