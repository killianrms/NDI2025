export const translations = {
  fr: {
    // Navigation
    nav: {
      home: 'Accueil',
      simulator: 'Simulateur',
      test: 'Test tes Connaissances',
      passwordGame: 'Password Game',
    },

    // Home Page
    home: {
      title: 'Numérique Responsable',
      subtitle: 'Découvrez les enjeux du numérique responsable de manière ludique et interactive',
      cta: 'Commencer l\'Aventure',

      // Challenges Section
      challenges: {
        title: 'Défis Nuit de l\'Info 2025',
        subtitle: 'Notre équipe participe à 3 défis complémentaires pour enrichir l\'expérience',

        extensions: {
          tag: 'Développement Sécurisé',
          title: 'La Ligue des Extensions',
          description: 'Extension Chrome Manifest V3 "SafeLinks", qui détecte si un lien est sur avant de cliquer, en open source et utile pour améliorer la navigation quotidienne',
          tagline: 'Manifestement à jour, open source et utile',
        },

        ergonomics: {
          tag: 'Ergonomie',
          title: 'Simplifier pour mieux vivre',
          description: 'Création d\'un champ de saisie volontairement frustrant et original',
          link: '→ Voir le Password Game',
        },

        chatbot: {
          tag: 'Chatbot',
          title: 'Chat\'bruti',
          description: 'Chatbot avec personnalité décalée, drôle et inutilement philosophe',
          info: '💡 Accessible via le bouton en bas à droite',
        },
      },

      // Features Section
      features: {
        title: 'Explorez nos modules interactifs',
        simulator: {
          title: 'Simulateur d\'Empreinte',
          description: 'Calculez votre impact numérique et gagnez des badges',
        },
        test: {
          title: 'Test tes Connaissances',
          description: 'Évalue tes connaissances en NIRD et cybersécurité',
        },
        passwordGame: {
          title: 'Password Game',
          description: 'Créez le mot de passe le plus frustrant possible',
        },
        discover: 'Découvrir',
      },
    },

    // Footer
    footer: {
      team: {
        title: 'Golem Gang',
        description: 'Équipe participante au défi Nuit de l\'Info 2025',
      },
      challenges: {
        title: 'Nuit de l\'Info 2025 Défi :',
      },
      participants: {
        title: 'Participants',
      },
      navigation: {
        title: 'Navigation',
      },
      copyright: 'Golem Gang - Nuit de l\'Info 2025 - Projet libre de droits sous licence MIT',
    },
  },

  en: {
    // Navigation
    nav: {
      home: 'Home',
      simulator: 'Simulator',
      test: 'Test Your Knowledge',
      passwordGame: 'Password Game',
    },

    // Home Page
    home: {
      title: 'Responsible Digital',
      subtitle: 'Discover the challenges of responsible digital in a fun and interactive way',
      cta: 'Start the Adventure',

      // Challenges Section
      challenges: {
        title: 'Night of Info 2025 Challenges',
        subtitle: 'Our team participates in 3 complementary challenges to enrich the experience',

        extensions: {
          tag: 'Secure Development',
          title: 'The League of Extensions',
          description: `Chrome Extension Manifest V3, to check link's safety, open source and useful to improve daily browsing`,
          tagline: 'Clearly up to date, open source and useful',
        },

        ergonomics: {
          tag: 'Ergonomics',
          title: 'Simplify for Better Living',
          description: 'Creating a deliberately frustrating and original input field',
          link: '→ See Password Game',
        },

        chatbot: {
          tag: 'Chatbot',
          title: 'Chat\'stupid',
          description: 'Chatbot with quirky, funny and uselessly philosophical personality',
          info: '💡 Accessible via the button at the bottom right',
        },
      },

      // Features Section
      features: {
        title: 'Explore our interactive modules',
        simulator: {
          title: 'Carbon Footprint Simulator',
          description: 'Calculate your digital impact and earn badges',
        },
        test: {
          title: 'Test Your Knowledge',
          description: 'Assess your knowledge in responsible digital and cybersecurity',
        },
        passwordGame: {
          title: 'Password Game',
          description: 'Create the most frustrating password possible',
        },
        discover: 'Discover',
      },
    },

    // Footer
    footer: {
      team: {
        title: 'Golem Gang',
        description: 'Team participating in the Night of Info 2025 challenge',
      },
      challenges: {
        title: 'Night of Info 2025 Challenge:',
      },
      participants: {
        title: 'Participants',
      },
      navigation: {
        title: 'Navigation',
      },
      copyright: 'Golem Gang - Night of Info 2025 - Open source project under MIT license',
    },
  },
}

export type Language = 'fr' | 'en'
export type TranslationKey = typeof translations.fr
