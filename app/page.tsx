import Link from 'next/link'

export default function Home() {
    const features = [
        {
            title: 'Simulateur d\'Empreinte',
            description: 'Calculez votre impact numérique et gagnez des badges',
            icon: '📊',
            href: '/simulateur',
            color: 'from-blue-500 to-cyan-500',
        },
        {
            title: 'Test tes Connaissances',
            description: 'Évalue tes connaissances en NIRD et cybersécurité',
            icon: '🧠',
            href: '/test-connaissances',
            color: 'from-green-500 to-emerald-500',
        },
        {
            title: 'Password Game',
            description: 'Créez le mot de passe le plus frustrant possible',
            icon: '🎮',
            href: '/password-game',
            color: 'from-red-500 to-orange-500',
        },
    ]

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative py-20 px-4 overflow-hidden">
                <div className="max-w-6xl mx-auto text-center">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent animate-fade-in">
                        Numérique Responsable
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto animate-slide-up">
                        Découvrez les enjeux du numérique responsable de manière ludique et interactive
                    </p>
                    <div className="flex justify-center animate-slide-up">
                        <Link
                            href="/simulateur"
                            className="px-8 py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all"
                        >
                            Commencer l'Aventure
                        </Link>
                    </div>
                </div>

                {/* Floating elements */}
                <div
                    className="absolute top-20 left-10 w-20 h-20 bg-green-200 rounded-full opacity-50 animate-float"></div>
                <div className="absolute bottom-20 right-10 w-32 h-32 bg-blue-200 rounded-full opacity-50 animate-float"
                     style={{animationDelay: '1s'}}></div>
            </section>

            {/* Défis Section */}
            <section className="py-16 px-4 bg-gradient-to-br from-purple-50 to-blue-50">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">
                        Défis Nuit de l'Info 2025
                    </h2>
                    <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
                        Notre équipe participe à 3 défis complémentaires pour enrichir l'expérience
                    </p>

                    <div className="grid md:grid-cols-3 gap-6">
                        {/* Défi 1: La Ligue des Extensions */}
                        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                            <div className="flex items-center gap-2 mb-3">
                                <span className="text-3xl">🔧</span>
                                <div className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-semibold">
                                    Développement Sécurisé
                                </div>
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-gray-800">
                                La Ligue des Extensions
                            </h3>
                            <p className="text-sm text-gray-600 mb-3">
                                Extension Chrome Manifest V3, open source et utile pour améliorer la navigation
                                quotidienne
                            </p>
                            <div className="text-xs text-gray-500 italic">
                                Manifestement à jour, open source et utile
                            </div>
                        </div>

                        {/* Défi 2: L'ergonomie */}
                        <Link href="/password-game"
                              className="text-xs text-purple-600 hover:text-purple-800 font-semibold">
                            <div
                                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow border-2 border-purple-200">
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="text-3xl">🎮</span>
                                    <div
                                        className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full font-semibold">
                                        Ergonomie
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold mb-2 text-gray-800">
                                    Simplifier pour mieux vivre
                                </h3>
                                <p className="text-sm text-gray-600 mb-3">
                                    Création d'un champ de saisie volontairement frustrant et original
                                </p>
                                → Voir le Password Game
                            </div>
                        </Link>

                        {/* Défi 3: Chat'bruti */}
                        <div
                            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow border-2 border-green-200">
                            <div className="flex items-center gap-2 mb-3">
                                <span className="text-3xl">💬</span>
                                <div
                                    className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-semibold">
                                    Chatbot
                                </div>
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-gray-800">
                                Chat'bruti
                            </h3>
                            <p className="text-sm text-gray-600 mb-3">
                                Chatbot avec personnalité décalée, drôle et inutilement philosophe
                            </p>
                            <div className="text-xs text-green-600 font-semibold">
                                💡 Accessible via le bouton en bas à droite
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-16 px-4 bg-white/50">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
                        Explorez nos modules interactifs
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        {features.map((feature, index) => (
                            <Link
                                key={feature.href}
                                href={feature.href}
                                className="group relative overflow-hidden rounded-2xl bg-white p-8 shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2"
                                style={{animationDelay: `${index * 100}ms`}}
                            >
                                <div
                                    className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity`}></div>
                                <div className="relative">
                                    <div className="text-6xl mb-4">{feature.icon}</div>
                                    <h3 className="text-2xl font-bold mb-3 text-gray-800">{feature.title}</h3>
                                    <p className="text-gray-600 mb-4">{feature.description}</p>
                                    <span
                                        className="inline-flex items-center text-green-600 font-semibold group-hover:gap-2 transition-all">
                    Découvrir
                    <svg className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" fill="none"
                         stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                    </svg>
                  </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-3xl p-12 text-white">
                        <h2 className="text-3xl font-bold text-center mb-12">Impact de la Communauté</h2>
                        <div className="grid md:grid-cols-3 gap-8 text-center">
                            <div>
                                <div className="text-5xl font-bold mb-2">2.5k+</div>
                                <div className="text-green-100">Utilisateurs Actifs</div>
                            </div>
                            <div>
                                <div className="text-5xl font-bold mb-2">15k+</div>
                                <div className="text-green-100">Badges Débloqués</div>
                            </div>
                            <div>
                                <div className="text-5xl font-bold mb-2">500+</div>
                                <div className="text-green-100">Défis Complétés</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
