import { Challenge } from './types'

export const challenges: Challenge[] = [
  {
    id: 'password',
    title: 'Défi des Mots de Passe',
    description: 'Trouvez le mot de passe sécurisé parmi les propositions',
    type: 'quiz',
    difficulty: 1,
    timeLimit: 60,
    completed: false,
  },
  {
    id: 'phishing',
    title: 'Détection de Phishing',
    description: 'Identifiez les emails frauduleux',
    type: 'quiz',
    difficulty: 2,
    timeLimit: 90,
    completed: false,
  },
  {
    id: 'energy',
    title: 'Optimisation Énergétique',
    description: 'Résolvez le puzzle pour réduire la consommation énergétique du réseau',
    type: 'puzzle',
    difficulty: 3,
    timeLimit: 120,
    completed: false,
  },
  {
    id: 'data-privacy',
    title: 'Protection des Données',
    description: 'Déchiffrez le code pour sécuriser les données personnelles',
    type: 'code',
    difficulty: 3,
    timeLimit: 150,
    completed: false,
  },
]

export const passwordChallenge = {
  question: 'Quel est le mot de passe le PLUS sécurisé ?',
  options: [
    { text: 'motdepasse123', isCorrect: false, feedback: 'Trop simple et prévisible !' },
    { text: 'Password2024!', isCorrect: false, feedback: 'Encore trop courant et facile à deviner.' },
    { text: 'J\'Aim3L3sP0mm3s!', isCorrect: false, feedback: 'Bien mais prévisible avec des substitutions communes.' },
    { text: 'Tr0p!c@l#R4inF0r3st$92', isCorrect: true, feedback: 'Excellent ! Long, complexe et unique.' },
  ],
  explanation: 'Un bon mot de passe doit avoir au moins 12 caractères, mélanger majuscules, minuscules, chiffres et symboles, et ne pas être un mot du dictionnaire.',
}

export const phishingChallenge = {
  question: 'Quels sont les signes d\'un email de phishing ? (Plusieurs réponses possibles)',
  emails: [
    {
      id: 1,
      from: 'support@amaz0n-secure.com',
      subject: 'URGENT: Votre compte sera suspendu',
      content: 'Cliquez immédiatement sur ce lien pour vérifier votre identité.',
      isPhishing: true,
      signs: ['URL suspecte', 'Urgence artificielle', 'Demande de clic'],
    },
    {
      id: 2,
      from: 'newsletter@example-shop.fr',
      subject: 'Nouvelles promotions de la semaine',
      content: 'Découvrez nos offres. Visitez notre site officiel.',
      isPhishing: false,
      signs: [],
    },
    {
      id: 3,
      from: 'noreply@paypa1.com',
      subject: 'Confirmez votre paiement de 499€',
      content: 'Un paiement suspect a été détecté. Cliquez ici pour annuler.',
      isPhishing: true,
      signs: ['Chiffre 1 au lieu de L', 'Montant suspect', 'Pression psychologique'],
    },
  ],
}

export const energyPuzzle = {
  description: 'Organisez les serveurs pour minimiser la consommation énergétique. Déplacez les blocs pour regrouper les serveurs actifs et mettre en veille les autres.',
  grid: [
    { id: 1, type: 'active', power: 100, canSleep: false },
    { id: 2, type: 'idle', power: 30, canSleep: true },
    { id: 3, type: 'active', power: 100, canSleep: false },
    { id: 4, type: 'idle', power: 30, canSleep: true },
    { id: 5, type: 'idle', power: 30, canSleep: true },
    { id: 6, type: 'active', power: 100, canSleep: false },
  ],
  targetPower: 300, // Objectif: réduire à 300W
}

export const dataPrivacyChallenge = {
  description: 'Déchiffrez le message en appliquant les bonnes pratiques de protection des données. Trouvez les 4 principes du RGPD.',
  scrambledPrinciples: [
    'TATANSPERNRCE',
    'IAIMNIMSOTIN',
    'XTIACTEUDE',
    'MIILATTINO'
  ],
  correctAnswers: [
    'TRANSPARENCE',
    'MINIMISATION',
    'EXACTITUDE',
    'LIMITATION'
  ],
  hints: [
    'Les données doivent être collectées de manière claire',
    'Collecter uniquement ce qui est nécessaire',
    'Les données doivent être correctes et à jour',
    'Conserver les données seulement le temps nécessaire'
  ],
}

export function calculateEscapeGameScore(
  timeRemaining: number,
  challengesCompleted: number,
  totalChallenges: number,
  hintsUsed: number
): number {
  const completionBonus = (challengesCompleted / totalChallenges) * 500
  const timeBonus = Math.max(0, timeRemaining * 2)
  const hintPenalty = hintsUsed * 50

  return Math.round(completionBonus + timeBonus - hintPenalty)
}
