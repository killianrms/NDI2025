import { Project } from './types'

export const projects: Project[] = [
  {
    id: 'repair-cafe-paris',
    name: 'Repair Café Paris',
    description: 'Atelier de réparation collaborative pour appareils électroniques. Apprenez à réparer plutôt que jeter !',
    location: { lat: 48.8566, lng: 2.3522 },
    category: 'Réparation',
    videoUrl: 'https://example.com/repair-cafe',
  },
  {
    id: 'recyclerie-lyon',
    name: 'La Recyclerie Numérique Lyon',
    description: 'Centre de recyclage et reconditionnement d\'ordinateurs et smartphones.',
    location: { lat: 45.764, lng: 4.8357 },
    category: 'Recyclage',
  },
  {
    id: 'inclusion-marseille',
    name: 'Inclusion Numérique Marseille',
    description: 'Formation gratuite aux outils numériques pour tous. Réduisons la fracture numérique !',
    location: { lat: 43.2965, lng: 5.3698 },
    category: 'Inclusion',
  },
  {
    id: 'fablab-toulouse',
    name: 'FabLab Numérique Responsable',
    description: 'Espace de création et fabrication avec imprimantes 3D recyclées et matériaux écologiques.',
    location: { lat: 43.6047, lng: 1.4442 },
    category: 'Innovation',
  },
  {
    id: 'datacenter-nantes',
    name: 'Datacenter Vert Nantes',
    description: 'Premier datacenter 100% énergies renouvelables de la région avec récupération de chaleur.',
    location: { lat: 47.2184, lng: -1.5536 },
    category: 'Infrastructure',
  },
  {
    id: 'ecolab-bordeaux',
    name: 'EcoLab Bordeaux',
    description: 'Laboratoire de recherche sur les technologies vertes et l\'éco-conception numérique.',
    location: { lat: 44.8378, lng: -0.5792 },
    category: 'Recherche',
  },
]

export const categories = [
  { id: 'all', name: 'Tous', color: 'gray' },
  { id: 'Réparation', name: 'Réparation', color: 'blue' },
  { id: 'Recyclage', name: 'Recyclage', color: 'green' },
  { id: 'Inclusion', name: 'Inclusion', color: 'purple' },
  { id: 'Innovation', name: 'Innovation', color: 'orange' },
  { id: 'Infrastructure', name: 'Infrastructure', color: 'red' },
  { id: 'Recherche', name: 'Recherche', color: 'pink' },
]

export const quizQuestions = [
  {
    id: 1,
    question: 'Quel pourcentage de l\'empreinte carbone du numérique provient de la fabrication des équipements ?',
    options: ['20%', '45%', '78%', '90%'],
    correct: 2,
    explanation: '78% de l\'empreinte carbone du numérique vient de la fabrication, pas de l\'utilisation !',
  },
  {
    id: 2,
    question: 'Combien de kg de matières premières sont nécessaires pour fabriquer un smartphone ?',
    options: ['5 kg', '20 kg', '70 kg', '150 kg'],
    correct: 2,
    explanation: 'Il faut environ 70 kg de matières premières pour fabriquer un smartphone de 150g !',
  },
  {
    id: 3,
    question: 'Quelle est la durée de vie moyenne d\'un smartphone en France ?',
    options: ['1 an', '2.5 ans', '5 ans', '7 ans'],
    correct: 1,
    explanation: 'La durée de vie moyenne est de 2.5 ans, alors que l\'appareil pourrait durer 5-7 ans !',
  },
]
