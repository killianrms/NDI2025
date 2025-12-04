import { Project } from './types'

export const projects: Project[] = [
  {
    id: 'obilab-montpellier',
    name: 'Ob.i LAB',
    description: 'Espace de fabrication numérique et de travail collaboratif situé à l\'IUT Montpellier-Sète. Ce Fab Lab de 300 m² dispose d\'un atelier équipé de machines à commande numérique comme des imprimantes 3D, une découpeuse laser et une fraiseuse numérique. Ouvert gratuitement aux étudiants et professionnels du lundi au vendredi pour la conception, le prototypage et la matérialisation de projets dans les domaines de l\'électronique, du design et du codage.',
    location: { lat: 43.6319, lng: 3.8620 },
    category: 'Fab Lab',
  },
]

export const categories = [
  { id: 'all', name: 'Tous', color: 'gray' },
  { id: 'Fab Lab', name: 'Fab Lab', color: 'blue' },
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
