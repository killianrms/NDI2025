'use client'

import dynamic from 'next/dynamic'
import { projects } from '@/lib/projects-data'
import { Project } from '@/lib/types'
import { useState } from 'react'

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

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project)
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
                    <p><strong>Adresse :</strong> 99 Avenue d'Occitanie, 34090 Montpellier</p>
                    <p><strong>Horaires :</strong> Lundi au vendredi, 9h-12h et 13h-17h</p>
                    <p><strong>Accès :</strong> Gratuit pour étudiants et professionnels</p>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-xl p-6">
                  <h3 className="font-bold text-lg mb-3 text-gray-800">Équipements disponibles</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-center gap-2">
                      <span className="text-green-600">✓</span>
                      Imprimantes 3D
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-600">✓</span>
                      Découpeuse laser
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-600">✓</span>
                      Fraiseuse numérique
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-600">✓</span>
                      Atelier électronique et codage
                    </li>
                  </ul>
                </div>
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
