import type { Metadata } from 'next'
import './globals.css'
import ClientLayout from '@/components/ClientLayout'

export const metadata: Metadata = {
  title: 'Numérique Responsable - NIRD',
  description: 'Application interactive dédiée aux enjeux du Numérique Responsable',
  keywords: ['numérique responsable', 'écologie', 'environnement', 'digital', 'éducation'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex flex-col">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
