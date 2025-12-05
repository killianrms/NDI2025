'use client'

import { LanguageProvider } from '@/contexts/LanguageContext'
import Navigation from '@/components/Navigation'
import ChatBot from '@/components/ChatBot'
import Footer from '@/components/Footer'

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <Navigation />
      <main className="pt-16 flex-grow">
        {children}
      </main>
      <Footer />
      <ChatBot />
    </LanguageProvider>
  )
}
