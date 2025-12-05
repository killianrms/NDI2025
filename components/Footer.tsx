'use client'

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Team Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Golem Gang</h3>
            <p className="text-gray-300 text-sm">
              Équipe participante au défi Nuit de l'Info 2025
            </p>
          </div>

          {/* Challenge Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Nuit de l'Info 2025 Défi :</h3>
            <p className="text-gray-300 text-sm mb-2">
                - La Ligue des Extensions : Manifestement à jour, open source et utile.
            </p>
             <p className="text-gray-300 text-sm mb-2">
                - L'ergonomie : simplifier pour mieux vivre.
             </p>
              <p className="text-gray-300 text-sm mb-2">
                  - Chat'bruti
              </p>
          </div>

          {/* Participants */}
          <div>
            <h3 className="text-xl font-bold mb-4">Participants</h3>
            <ul className="space-y-1 text-sm text-gray-300">
              <li>Cyprien BONS</li>
              <li>Killian RAMUS</li>
              <li>Raphël RIVAS</li>
              <li>Maël NICOLAS</li>
              <li>Galdric DESERT-CAPAROS</li>
              <li>Nicolas LYFONG</li>
                <li>Marc HAYE</li>
            </ul>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-gray-300 hover:text-green-400 transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/simulateur" className="text-gray-300 hover:text-green-400 transition-colors">
                  Simulateur
                </Link>
              </li>
              <li>
                <Link href="/test-connaissances" className="text-gray-300 hover:text-green-400 transition-colors">
                  Test tes Connaissances
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p className="text-gray-400 text-sm">
            Golem Gang - Nuit de l'Info 2025 - Projet libre de droits sous licence MIT
          </p>
        </div>
      </div>
    </footer>
  )
}
