import { SimulatorData, Badge } from './types'

// Carbon emissions in gCO2 per hour
const EMISSION_FACTORS = {
  streaming: 55, // HD video streaming
  email: 0.3, // per email
  socialMedia: 2.5, // per hour
  videoCall: 150, // HD video call per hour
  cloudStorage: 10, // per GB per year (divided by 365*24)
}

export function calculateCarbonFootprint(data: SimulatorData): number {
  const total =
    (data.streaming * EMISSION_FACTORS.streaming) +
    (data.email * EMISSION_FACTORS.email) +
    (data.socialMedia * EMISSION_FACTORS.socialMedia) +
    (data.videoCall * EMISSION_FACTORS.videoCall) +
    (data.cloudStorage * EMISSION_FACTORS.cloudStorage / (365 * 24))

  return Math.round(total)
}

export function calculatePoints(carbonFootprint: number): number {
  // Lower footprint = more points
  const maxFootprint = 1000
  const points = Math.max(0, maxFootprint - carbonFootprint)
  return Math.round(points)
}

export function getLevel(points: number): number {
  return Math.floor(points / 100) + 1
}

export const BADGES: Badge[] = [
  {
    id: 'beginner',
    name: 'Débutant Éco-Responsable',
    description: 'Première utilisation du simulateur',
    icon: '🌱',
    threshold: 0,
    unlocked: false,
  },
  {
    id: 'conscious',
    name: 'Conscient',
    description: 'Score de 100 points',
    icon: '🌿',
    threshold: 100,
    unlocked: false,
  },
  {
    id: 'eco-warrior',
    name: 'Guerrier Écologique',
    description: 'Score de 300 points',
    icon: '🌳',
    threshold: 300,
    unlocked: false,
  },
  {
    id: 'green-master',
    name: 'Maître Vert',
    description: 'Score de 500 points',
    icon: '🏆',
    threshold: 500,
    unlocked: false,
  },
  {
    id: 'email-saver',
    name: 'Économiseur d\'Emails',
    description: 'Moins de 10 emails par jour',
    icon: '📧',
    threshold: 0,
    unlocked: false,
  },
  {
    id: 'streaming-conscious',
    name: 'Streaming Responsable',
    description: 'Moins de 2h de streaming par jour',
    icon: '📺',
    threshold: 0,
    unlocked: false,
  },
  {
    id: 'cloud-optimizer',
    name: 'Optimiseur Cloud',
    description: 'Moins de 5GB de stockage cloud',
    icon: '☁️',
    threshold: 0,
    unlocked: false,
  },
]

export function checkBadges(data: SimulatorData, points: number): Badge[] {
  const unlockedBadges: Badge[] = []

  BADGES.forEach(badge => {
    let unlocked = false

    switch (badge.id) {
      case 'beginner':
        unlocked = true
        break
      case 'conscious':
      case 'eco-warrior':
      case 'green-master':
        unlocked = points >= badge.threshold
        break
      case 'email-saver':
        unlocked = data.email < 10
        break
      case 'streaming-conscious':
        unlocked = data.streaming < 2
        break
      case 'cloud-optimizer':
        unlocked = data.cloudStorage < 5
        break
    }

    if (unlocked) {
      unlockedBadges.push({ ...badge, unlocked: true })
    }
  })

  return unlockedBadges
}

export function getRecommendations(data: SimulatorData): string[] {
  const recommendations: string[] = []

  if (data.streaming > 3) {
    recommendations.push('Réduisez la qualité de streaming ou limitez votre temps de visionnage')
  }

  if (data.email > 20) {
    recommendations.push('Nettoyez votre boîte mail et désabonnez-vous des newsletters non lues')
  }

  if (data.socialMedia > 3) {
    recommendations.push('Limitez votre temps sur les réseaux sociaux')
  }

  if (data.videoCall > 4) {
    recommendations.push('Privilégiez les appels audio quand la vidéo n\'est pas nécessaire')
  }

  if (data.cloudStorage > 10) {
    recommendations.push('Supprimez les fichiers inutiles du cloud et utilisez le stockage local')
  }

  if (recommendations.length === 0) {
    recommendations.push('Excellent ! Continuez vos bonnes pratiques numériques !')
  }

  return recommendations
}
