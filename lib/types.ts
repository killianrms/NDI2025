export interface Badge {
  id: string
  name: string
  description: string
  icon: string
  threshold: number
  unlocked: boolean
}

export interface UserProgress {
  points: number
  badges: Badge[]
  level: number
  carbonSaved: number
}

export interface SimulatorData {
  streaming: number
  email: number
  socialMedia: number
  videoCall: number
  cloudStorage: number
}

export interface LifecycleChoice {
  id: string
  text: string
  impact: number
  consequence: string
}

export interface LifecycleStage {
  id: string
  title: string
  description: string
  image: string
  choices: LifecycleChoice[]
}

export interface Project {
  id: string
  name: string
  description: string
  location: {
    lat: number
    lng: number
  }
  category: string
  videoUrl?: string
  link?: string
}

export interface Challenge {
  id: string
  title: string
  description: string
  type: 'quiz' | 'puzzle' | 'code'
  difficulty: number
  timeLimit: number
  completed: boolean
}
