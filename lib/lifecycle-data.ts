import { LifecycleStage } from './types'

export const lifecycleStages: LifecycleStage[] = [
  {
    id: 'extraction',
    title: 'Extraction des Ressources',
    description: 'Vous êtes responsable de l\'extraction des matières premières pour fabriquer un smartphone. Comment procédez-vous ?',
    image: '⛏️',
    choices: [
      {
        id: 'cheap',
        text: 'Extraction rapide et peu coûteuse sans contrôle environnemental',
        impact: -30,
        consequence: 'Pollution importante des sols et des nappes phréatiques. Conditions de travail dangereuses.',
      },
      {
        id: 'moderate',
        text: 'Extraction avec quelques mesures de protection',
        impact: -15,
        consequence: 'Impact environnemental modéré mais encore significatif.',
      },
      {
        id: 'responsible',
        text: 'Extraction responsable avec recyclage et protection des travailleurs',
        impact: 10,
        consequence: 'Coûts plus élevés mais impact minimal sur l\'environnement et respect des droits humains.',
      },
    ],
  },
  {
    id: 'manufacturing',
    title: 'Fabrication',
    description: 'L\'usine de fabrication doit assembler les composants. Quelle approche choisissez-vous ?',
    image: '🏭',
    choices: [
      {
        id: 'mass',
        text: 'Production de masse sans considération énergétique',
        impact: -25,
        consequence: 'Forte consommation d\'énergie fossile et déchets toxiques importants.',
      },
      {
        id: 'efficient',
        text: 'Production optimisée avec énergies renouvelables partielles',
        impact: 0,
        consequence: 'Équilibre entre production et impact environnemental.',
      },
      {
        id: 'green',
        text: 'Usine 100% énergies renouvelables avec recyclage des déchets',
        impact: 20,
        consequence: 'Production durable mais cadence plus lente et coûts supérieurs.',
      },
    ],
  },
  {
    id: 'distribution',
    title: 'Distribution',
    description: 'Comment allez-vous distribuer les appareils aux consommateurs ?',
    image: '🚚',
    choices: [
      {
        id: 'air',
        text: 'Transport aérien pour livraison rapide',
        impact: -20,
        consequence: 'Empreinte carbone très élevée due au transport aérien.',
      },
      {
        id: 'mixed',
        text: 'Combinaison transport maritime et terrestre',
        impact: -5,
        consequence: 'Bon compromis entre rapidité et impact environnemental.',
      },
      {
        id: 'local',
        text: 'Production locale et circuits courts',
        impact: 15,
        consequence: 'Réduction drastique des émissions mais réseau de distribution limité.',
      },
    ],
  },
  {
    id: 'usage',
    title: 'Utilisation',
    description: 'Le consommateur utilise l\'appareil. Quelle politique encouragez-vous ?',
    image: '📱',
    choices: [
      {
        id: 'frequent',
        text: 'Encourager le renouvellement fréquent (obsolescence programmée)',
        impact: -35,
        consequence: 'Profits à court terme mais impact environnemental désastreux.',
      },
      {
        id: 'repair',
        text: 'Proposer des réparations et mises à jour',
        impact: 15,
        consequence: 'Durée de vie prolongée et satisfaction client accrue.',
      },
      {
        id: 'modular',
        text: 'Design modulaire avec pièces remplaçables',
        impact: 25,
        consequence: 'Innovation durable permettant une utilisation sur 5-7 ans.',
      },
    ],
  },
  {
    id: 'end-of-life',
    title: 'Fin de Vie',
    description: 'L\'appareil arrive en fin de vie. Comment gérez-vous les déchets électroniques ?',
    image: '♻️',
    choices: [
      {
        id: 'landfill',
        text: 'Mise en décharge standard',
        impact: -40,
        consequence: 'Pollution toxique et gaspillage de ressources précieuses.',
      },
      {
        id: 'basic-recycling',
        text: 'Recyclage basique des métaux',
        impact: 5,
        consequence: 'Récupération partielle des matériaux mais processus énergivore.',
      },
      {
        id: 'circular',
        text: 'Économie circulaire avec récupération complète',
        impact: 30,
        consequence: 'Récupération de 95% des matériaux pour de nouveaux produits.',
      },
    ],
  },
]

export function calculateFinalScore(totalImpact: number): {
  score: number
  rating: string
  message: string
  color: string
} {
  if (totalImpact >= 50) {
    return {
      score: totalImpact,
      rating: 'Excellent !',
      message: 'Vous avez fait des choix exemplaires pour l\'environnement et la société. Continuez sur cette voie !',
      color: 'from-green-500 to-emerald-500',
    }
  } else if (totalImpact >= 0) {
    return {
      score: totalImpact,
      rating: 'Bien',
      message: 'Vous avez pris des décisions équilibrées. Il y a encore des marges d\'amélioration.',
      color: 'from-blue-500 to-cyan-500',
    }
  } else if (totalImpact >= -50) {
    return {
      score: totalImpact,
      rating: 'Peut mieux faire',
      message: 'Vos choix ont un impact négatif significatif. Reconsidérez vos priorités.',
      color: 'from-orange-500 to-yellow-500',
    }
  } else {
    return {
      score: totalImpact,
      rating: 'Critique',
      message: 'Vos décisions ont des conséquences désastreuses pour l\'environnement.',
      color: 'from-red-500 to-pink-500',
    }
  }
}
