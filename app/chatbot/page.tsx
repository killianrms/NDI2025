'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Bonjour ! Je suis Jean-Philosophe, penseur du... Attends, de quoi parlais-je... Ah oui ! As-tu déjà questionné l'existence des nuages ?",
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = { role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      })

      const data = await response.json()
      const assistantMessage: Message = {
        role: 'assistant',
        content: data.response || data.error,
      }
      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: "Erreur de connexion... Attends, c'est quoi une connexion ? Ah peu importe, les étoiles ont-elles des amis ?",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm rounded-t-3xl p-6 shadow-lg border-b-4 border-purple-300">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-3xl animate-bounce">
                  🤔
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Jean-Philosophe</h1>
                <p className="text-sm text-gray-500">Penseur amnésique du numérique</p>
              </div>
            </div>
            <Link
              href="/"
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-full text-sm font-semibold transition-colors"
            >
              Retour
            </Link>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="bg-white/60 backdrop-blur-sm p-6 h-[500px] overflow-y-auto space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl p-4 ${
                  message.role === 'user'
                    ? 'bg-gradient-to-br from-blue-500 to-cyan-500 text-white'
                    : 'bg-gradient-to-br from-purple-200 to-pink-200 text-gray-800 border-2 border-purple-300'
                } animate-fade-in`}
              >
                {message.role === 'assistant' && (
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">🤔</span>
                    <span className="font-semibold text-sm">Jean-Philosophe</span>
                  </div>
                )}
                <p className="leading-relaxed">{message.content}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gradient-to-br from-purple-200 to-pink-200 rounded-2xl p-4 border-2 border-purple-300">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <span className="text-sm text-gray-600">Jean-Philosophe oublie ce qu'il allait dire...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="bg-white/80 backdrop-blur-sm rounded-b-3xl p-6 shadow-lg">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Posez une question à Jean-Philosophe..."
              className="flex-1 px-4 py-3 rounded-full border-2 border-purple-300 focus:border-purple-500 focus:outline-none bg-white/80"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              Envoyer
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-3 text-center">
            Jean-Philosophe ne se souvient pas toujours de ce qu'il dit... mais il reste philosophe !
          </p>
        </form>
      </div>

      {/* Floating decoration */}
      <div className="fixed top-20 left-10 w-20 h-20 bg-purple-300 rounded-full opacity-30 animate-float"></div>
      <div className="fixed bottom-20 right-10 w-32 h-32 bg-pink-300 rounded-full opacity-30 animate-float" style={{ animationDelay: '1s' }}></div>
      <div className="fixed top-40 right-20 w-16 h-16 bg-blue-300 rounded-full opacity-30 animate-float" style={{ animationDelay: '0.5s' }}></div>
    </div>
  )
}
