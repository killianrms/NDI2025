'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Team Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">{t.footer.team.title}</h3>
            <p className="text-gray-300 text-sm">
              {t.footer.team.description}
            </p>
          </div>

          {/* Challenge Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">{t.footer.challenges.title}</h3>
            <p className="text-gray-300 text-sm mb-2">
                - {t.home.challenges.extensions.title} : {t.home.challenges.extensions.tagline}
            </p>
             <p className="text-gray-300 text-sm mb-2">
                - {t.home.challenges.ergonomics.title}
             </p>
              <p className="text-gray-300 text-sm mb-2">
                  - {t.home.challenges.chatbot.title}
              </p>
          </div>

          {/* Participants */}
          <div>
            <h3 className="text-xl font-bold mb-4">{t.footer.participants.title}</h3>
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
            <h3 className="text-xl font-bold mb-4">{t.footer.navigation.title}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-gray-300 hover:text-green-400 transition-colors">
                  {t.nav.home}
                </Link>
              </li>
              <li>
                <Link href="/simulateur" className="text-gray-300 hover:text-green-400 transition-colors">
                  {t.nav.simulator}
                </Link>
              </li>
              <li>
                <Link href="/test-connaissances" className="text-gray-300 hover:text-green-400 transition-colors">
                  {t.nav.test}
                </Link>
              </li>
                <li>
                    <Link href="https://github.com/killianrms/NDI2025" className="text-gray-300 hover:text-green-400 transition-colors">
                        Github - Code source
                    </Link>
                </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p className="text-gray-400 text-sm">
            {t.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  )
}
