export interface LeaderboardEntry {
  rank: number
  username: string
  totalPoints: number
  badges: number
  level: number
  carbonSaved: number
  avatar: string
}

export interface WeeklyChallenge {
  id: string
  title: string
  description: string
  points: number
  progress: number
  target: number
  icon: string
  deadline: string
}

export const leaderboardData: LeaderboardEntry[] = [
  {
    rank: 1,
    username: 'EcoWarrior92',
    totalPoints: 2850,
    badges: 12,
    level: 28,
    carbonSaved: 145,
    avatar: '🌟',
  },
  {
    rank: 2,
    username: 'GreenCoder',
    totalPoints: 2640,
    badges: 11,
    level: 26,
    carbonSaved: 132,
    avatar: '💚',
  },
  {
    rank: 3,
    username: 'DigitalSaver',
    totalPoints: 2450,
    badges: 10,
    level: 24,
    carbonSaved: 128,
    avatar: '🌱',
  },
  {
    rank: 4,
    username: 'TechEco',
    totalPoints: 2280,
    badges: 9,
    level: 22,
    carbonSaved: 115,
    avatar: '🌿',
  },
  {
    rank: 5,
    username: 'ResponsibleDev',
    totalPoints: 2150,
    badges: 9,
    level: 21,
    carbonSaved: 108,
    avatar: '♻️',
  },
  {
    rank: 6,
    username: 'CleanCode',
    totalPoints: 2020,
    badges: 8,
    level: 20,
    carbonSaved: 102,
    avatar: '✨',
  },
  {
    rank: 7,
    username: 'DataGuardian',
    totalPoints: 1890,
    badges: 8,
    level: 18,
    carbonSaved: 95,
    avatar: '🛡️',
  },
  {
    rank: 8,
    username: 'MinimalTech',
    totalPoints: 1750,
    badges: 7,
    level: 17,
    carbonSaved: 89,
    avatar: '🎯',
  },
  {
    rank: 9,
    username: 'SustainDev',
    totalPoints: 1620,
    badges: 7,
    level: 16,
    carbonSaved: 82,
    avatar: '🌍',
  },
  {
    rank: 10,
    username: 'YouCurrent',
    totalPoints: 1520,
    badges: 6,
    level: 15,
    carbonSaved: 76,
    avatar: '👤',
  },
]

export const weeklyChallenges: WeeklyChallenge[] = [
  {
    id: 'week1',
    title: 'Réduire le Streaming',
    description: 'Regardez moins de 10h de vidéo cette semaine',
    points: 150,
    progress: 6,
    target: 10,
    icon: '📺',
    deadline: '2025-12-08',
  },
  {
    id: 'week2',
    title: 'Nettoyer ses Emails',
    description: 'Supprimez 500 emails non nécessaires',
    points: 200,
    progress: 320,
    target: 500,
    icon: '📧',
    deadline: '2025-12-08',
  },
  {
    id: 'week3',
    title: 'Maître du Cycle de Vie',
    description: 'Obtenez un score parfait au parcours narratif',
    points: 250,
    progress: 0,
    target: 1,
    icon: '🔄',
    deadline: '2025-12-08',
  },
  {
    id: 'week4',
    title: 'Escape Game Expert',
    description: 'Terminez l\'escape game en moins de 5 minutes',
    points: 300,
    progress: 0,
    target: 1,
    icon: '🔐',
    deadline: '2025-12-08',
  },
]

export const achievements = [
  {
    id: 'first-steps',
    name: 'Premiers Pas',
    description: 'Complétez votre premier module',
    icon: '👣',
    unlocked: true,
  },
  {
    id: 'eco-conscious',
    name: 'Conscience Écologique',
    description: 'Atteignez 500 points',
    icon: '🌱',
    unlocked: true,
  },
  {
    id: 'badge-collector',
    name: 'Collectionneur de Badges',
    description: 'Débloquez 5 badges différents',
    icon: '🏅',
    unlocked: true,
  },
  {
    id: 'quiz-master',
    name: 'Maître du Quiz',
    description: 'Réussissez 10 quiz sans erreur',
    icon: '🎓',
    unlocked: false,
  },
  {
    id: 'carbon-hero',
    name: 'Héros du Carbone',
    description: 'Économisez 100kg de CO2',
    icon: '🦸',
    unlocked: true,
  },
  {
    id: 'week-warrior',
    name: 'Guerrier Hebdomadaire',
    description: 'Complétez tous les défis hebdomadaires',
    icon: '⚔️',
    unlocked: false,
  },
]
