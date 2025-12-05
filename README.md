# 🌱 Numérique Responsable - NIRD

<div align="center">

**Une application interactive et ludique pour sensibiliser aux enjeux du numérique responsable**

[🚀 Voir la démo](https://votre-url-github-pages.github.io) • [📖 Documentation](#fonctionnalités) • [🤝 Contribuer](#contribution)

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3-38bdf8?style=flat-square&logo=tailwindcss)
![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)

</div>

---

## ✨ Fonctionnalités

### 📊 Simulateur d'Empreinte Numérique
Calculez votre impact environnemental quotidien et découvrez comment l'améliorer. Obtenez des recommandations personnalisées et gagnez des badges en fonction de vos efforts.

### 🧠 Test de Connaissances
Évaluez vos connaissances sur le numérique responsable et la cybersécurité à travers des questions interactives et ludiques.

### 🗺️ Carte Interactive
Découvrez l'Ob.i LAB à Montpellier et ses initiatives en faveur du numérique responsable.

### 🎮 Password Game
Un jeu frustrant mais éducatif pour comprendre l'importance de la sécurité des mots de passe.

### 🤔 Jean-Philosophe
Discutez avec notre chatbot philosophe amnésique qui vous fera réfléchir... ou rire ! Propulsé par l'IA Groq.

---

## 🚀 Installation

### Prérequis
- Node.js 18+
- npm ou yarn

### Étapes

```bash
# Cloner le repository
git clone https://github.com/votre-username/nird-app.git
cd nird-app

# Installer les dépendances
npm install

# Créer le fichier .env.local
echo "GROQ_API_KEY=votre_clé_api_groq" > .env.local

# Lancer en développement
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000) dans votre navigateur.

---

## 🔑 Configuration

Pour utiliser le chatbot Jean-Philosophe, vous devez obtenir une clé API Groq gratuite :

1. Créez un compte sur [Groq Cloud](https://console.groq.com)
2. Générez une clé API
3. Ajoutez-la dans `.env.local` :

```env
GROQ_API_KEY=gsk_votre_clé_ici
```

---

## 🏗️ Build & Déploiement

```bash
# Build de production
npm run build

# Démarrer en production
npm start
```

Pour déployer sur GitHub Pages, voir la branche `deploy`.

---

## 🎯 RSE by Design

Ce projet a été conçu avec une approche **éthique et responsable** :

- ✅ **Sensibilisation** : Éduquer sur l'impact environnemental du numérique
- ✅ **Accessibilité** : Interface intuitive et responsive
- ✅ **Performance** : Code optimisé pour réduire la consommation d'énergie
- ✅ **Open Source** : Code ouvert à la contribution
- ✅ **Vie privée** : Aucune collecte de données personnelles
- ✅ **Engagement** : Gamification pour encourager les bonnes pratiques

---

## 🛠️ Technologies

- **Framework** : [Next.js 15](https://nextjs.org/)
- **Langage** : [TypeScript](https://www.typescriptlang.org/)
- **Styling** : [Tailwind CSS](https://tailwindcss.com/)
- **IA** : [Groq SDK](https://groq.com/)
- **Cartes** : [Leaflet](https://leafletjs.com/) & React Leaflet

---

## 📂 Structure du projet

```
nird-app/
├── app/                    # Pages Next.js
│   ├── api/chat/          # API du chatbot
│   ├── simulateur/        # Simulateur d'empreinte
│   ├── test-connaissances/# Quiz NIRD
│   ├── carte/             # Carte interactive
│   └── password-game/     # Jeu de mot de passe
├── components/            # Composants réutilisables
│   ├── ChatBot.tsx        # Chatbot flottant
│   ├── Navigation.tsx     # Barre de navigation
│   └── Footer.tsx         # Pied de page
├── lib/                   # Utilitaires et types
└── public/                # Fichiers statiques
```

---

## 🤝 Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. Fork le projet
2. Créez une branche (`git checkout -b feature/amelioration`)
3. Committez vos changements (`git commit -m 'Ajout d'une fonctionnalité'`)
4. Push vers la branche (`git push origin feature/amelioration`)
5. Ouvrez une Pull Request

---

## 📝 License

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

## 👥 Équipe

Projet développé dans le cadre de la **Nuit de l'Info 2025**.

---

<div align="center">

**Fait avec 💚 pour un numérique plus responsable**

[⬆ Retour en haut](#-numérique-responsable---nird)

</div>
