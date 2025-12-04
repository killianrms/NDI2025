# Application Numérique Responsable (NIRD)

Application web interactive dédiée à l'illustration des enjeux du Numérique Responsable sous toutes ses formes.

## Fonctionnalités

### 🌱 Simulateur d'Empreinte Numérique
- Calcul de l'impact environnemental basé sur l'utilisation quotidienne
- Système de points et badges pour encourager les bonnes pratiques
- Recommandations personnalisées

### 🔄 Parcours Narratif "Cycle de Vie du Numérique"
- Jeu interactif suivant le parcours d'un appareil numérique
- Choix impactant l'environnement et la société
- Fins multiples selon les décisions prises

### 🗺️ Carte Interactive Régionale
- Visualisation des projets NIRD locaux
- Mini-quiz pédagogiques
- Informations détaillées sur chaque projet

### 🔐 Escape Game Cybersécurité
- 4 défis chronométrés
- Thèmes: mots de passe, phishing, énergie, protection des données
- Système de score et de classement

### 🏆 Gamification
- Classement global
- Défis hebdomadaires
- Système de réussites et badges
- Suivi des progrès personnels

## Technologies

- **Next.js 16** - Framework React avec App Router
- **TypeScript** - Typage statique
- **Tailwind CSS 4** - Styling moderne et responsive
- **React 19** - UI interactive

## Installation

```bash
# Installer les dépendances
npm install

# Lancer en mode développement
npm run dev

# Build pour production
npm run build

# Lancer en production
npm start
```

L'application sera disponible sur [http://localhost:3000](http://localhost:3000)

## Structure du Projet

```
nird-app/
├── app/                    # Pages et routes (App Router)
│   ├── simulateur/        # Simulateur d'empreinte
│   ├── cycle-de-vie/      # Parcours narratif
│   ├── carte/             # Carte interactive
│   ├── escape-game/       # Escape game
│   └── classement/        # Classement et gamification
├── components/            # Composants réutilisables
├── lib/                   # Utilitaires et données
│   ├── types.ts          # Types TypeScript
│   ├── calculator.ts     # Calculs empreinte carbone
│   ├── lifecycle-data.ts # Données cycle de vie
│   ├── projects-data.ts  # Données projets NIRD
│   ├── escape-game-data.ts
│   └── leaderboard-data.ts
└── public/                # Assets statiques

```

## Optimisations

- **Performance**: Code splitting automatique avec Next.js
- **Mobile-first**: Design responsive avec Tailwind CSS
- **Accessibilité**: Contrôles clavier, ARIA labels
- **SEO**: Metadata optimisées
- **Bundle size**: Composants optimisés et tree-shaking

## Licence

ISC
