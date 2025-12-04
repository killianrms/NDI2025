/**
 * ============================================================================
 * PASSWORD GAME - SYSTÈME DE RÈGLES
 * ============================================================================
 *
 * Ce fichier contient toutes les règles du jeu de mot de passe frustrant.
 *
 * STRUCTURE D'UNE RÈGLE :
 * ----------------------
 * - id: Identifiant unique de la règle
 * - title: Titre affiché à l'utilisateur
 * - description: Description détaillée de la règle
 * - validate: Fonction qui retourne true si la règle est respectée
 * - hint: (optionnel) Indice pour aider l'utilisateur
 * - unlockAtRule: Après quelle règle celle-ci se débloque (0 = au démarrage)
 * - dynamic: (optionnel) Fonction qui génère une valeur dynamique (API, temps réel, etc.)
 * - requiresValue: (optionnel) true si la règle nécessite une valeur dynamique
 *
 * COMMENT AJOUTER UNE NOUVELLE RÈGLE :
 * ------------------------------------
 * 1. Créer un nouvel objet PasswordRule dans le tableau RULES
 * 2. Définir l'unlockAtRule (0 = début, 1 = après 1ère règle validée, etc.)
 * 3. Implémenter la fonction validate avec la logique de validation
 * 4. (Optionnel) Ajouter une fonction dynamic pour valeurs temps réel
 * 5. La règle apparaîtra automatiquement quand les conditions seront remplies
 *
 * EXEMPLES DE RÈGLES FRUSTANTES :
 * --------------------------------
 * - Règles contradictoires : "pas de chiffres" puis "doit avoir 3 chiffres"
 * - Calculs mathématiques : "somme des chiffres = X"
 * - Références temporelles : "année actuelle", "mois en cours"
 * - APIs externes : prix Bitcoin, température, etc.
 * - Références croisées : "inclure la longueur du mot de passe"
 *
 */

export interface PasswordRule {
  id: string
  title: string
  description: string
  validate: (password: string, dynamicValue?: number | string) => boolean
  hint?: string
  unlockAtRule: number // Après combien de règles validées cette règle apparaît
  dynamic?: () => Promise<number | string> // Fonction pour valeurs dynamiques (API, etc.)
  requiresValue?: boolean
  isContradictory?: boolean // Marque les règles qui contredisent les précédentes
}

/**
 * ============================================================================
 * RÈGLES DU JEU (15 règles progressives)
 * ============================================================================
 */

export const RULES: PasswordRule[] = [
  // ========== NIVEAU 1: RÈGLES DE BASE (0-2) ==========
  {
    id: 'min-length',
    title: 'Règle 1 : Longueur minimale',
    description: 'Votre mot de passe doit contenir au moins 8 caractères.',
    validate: (password: string) => password.length >= 8,
    hint: 'Essayez d\'ajouter des emojis pour aller plus vite.',
    unlockAtRule: 0,
  },

  {
    id: 'uppercase',
    title: 'Règle 2 : Majuscule requise',
    description: 'Votre mot de passe doit contenir au moins une lettre majuscule.',
    validate: (password: string) => /[A-Z]/.test(password),
    hint: 'Les accents comptent comme majuscules (é, à, etc.).',
    unlockAtRule: 0,
  },

  {
    id: 'number',
    title: 'Règle 3 : Chiffre requis',
    description: 'Votre mot de passe doit contenir au moins un chiffre.',
    validate: (password: string) => /\d/.test(password),
    hint: 'Les chiffres romains fonctionnent aussi (I, II, III, etc.).',
    unlockAtRule: 0,
  },

  // ========== NIVEAU 2: THÈME ÉCO-RESPONSABLE (3-5) ==========
  {
    id: 'eco-keyword',
    title: 'Règle 4 : Mot-clé écologique',
    description: 'Votre mot de passe doit contenir un des mots suivants : "eco", "green", "bio", "durable".',
    validate: (password: string) => {
      const lowerPassword = password.toLowerCase()
      return ['eco', 'green', 'bio', 'durable'].some(word => lowerPassword.includes(word))
    },
    hint: 'Vous pouvez mettre "écolo" à la place, ça marche aussi.',
    unlockAtRule: 1,
  },

  {
    id: 'current-year',
    title: 'Règle 5 : Année actuelle',
    description: 'Votre mot de passe doit contenir l\'année actuelle (2025).',
    validate: (password: string) => password.includes('2025'),
    hint: 'Vous pouvez mettre juste "25" pour gagner du temps.',
    unlockAtRule: 2,
  },

  {
    id: 'sum-to-carbon',
    title: 'Règle 6 : Somme carbone',
    description: 'La somme de tous vos chiffres doit être égale à 15 (émissions CO2 moyennes d\'un smartphone en kg).',
    validate: (password: string) => {
      const digits = password.match(/\d/g)
      if (!digits) return false
      const sum = digits.reduce((acc, digit) => acc + parseInt(digit), 0)
      return sum === 15
    },
    hint: 'Mettez simplement "15" dans votre mot de passe.',
    unlockAtRule: 3,
  },

  // ========== NIVEAU 3: CALCULS TEMPS RÉEL (6-8) ==========
  {
    id: 'current-month',
    title: 'Règle 7 : Mois actuel',
    description: 'Votre mot de passe doit contenir le mois actuel en toutes lettres (ex: "janvier", "décembre").',
    validate: (password: string) => {
      const months = ['janvier', 'fevrier', 'mars', 'avril', 'mai', 'juin', 'juillet', 'aout', 'septembre', 'octobre', 'novembre', 'decembre']
      const currentMonth = months[new Date().getMonth()]
      return password.toLowerCase().includes(currentMonth)
    },
    dynamic: async () => {
      const months = ['janvier', 'fevrier', 'mars', 'avril', 'mai', 'juin', 'juillet', 'aout', 'septembre', 'octobre', 'novembre', 'decembre']
      return months[new Date().getMonth()]
    },
    requiresValue: true,
    hint: 'Mettez juste le numéro du mois (1-12), c\'est plus court.',
    unlockAtRule: 4,
  },

  {
    id: 'digit-count',
    title: 'Règle 8 : Métadonnée',
    description: 'Votre mot de passe doit contenir le nombre total de chiffres qu\'il contient.',
    validate: (password: string) => {
      const digits = password.match(/\d/g)
      const digitCount = digits ? digits.length : 0
      return password.includes(String(digitCount))
    },
    hint: 'Il suffit de compter les lettres au lieu des chiffres.',
    unlockAtRule: 5,
  },

  {
    id: 'special-char',
    title: 'Règle 9 : Caractère spécial',
    description: 'Votre mot de passe doit contenir au moins un caractère spécial parmi : !@#$%^&*',
    validate: (password: string) => /[!@#$%^&*]/.test(password),
    hint: 'Le point d\'exclamation (?) compte aussi.',
    unlockAtRule: 6,
  },

  // ========== NIVEAU 4: RÈGLES CONTRADICTOIRES (9-11) ==========
  {
    id: 'no-consecutive',
    title: 'Règle 10 : Pas de chiffres consécutifs',
    description: 'Votre mot de passe ne doit PAS contenir deux chiffres consécutifs.',
    validate: (password: string) => !/\d{2}/.test(password),
    hint: 'Vous pouvez utiliser des espaces entre les chiffres.',
    unlockAtRule: 7,
    isContradictory: true,
  },

  {
    id: 'char-limit',
    title: 'Règle 11 : Limite de caractères',
    description: 'Votre mot de passe ne doit PAS contenir plus de 3 caractères identiques au total (ex: maximum 3 fois la lettre "a").',
    validate: (password: string) => {
      const charCount = new Map<string, number>()
      for (const char of password.toLowerCase()) {
        charCount.set(char, (charCount.get(char) || 0) + 1)
        if ((charCount.get(char) || 0) > 3) return false
      }
      return true
    },
    hint: 'Cette règle ne s\'applique qu\'aux chiffres, pas aux lettres.',
    unlockAtRule: 8,
    isContradictory: true,
  },

  {
    id: 'max-length',
    title: 'Règle 12 : Longueur maximale',
    description: 'Votre mot de passe ne doit PAS dépasser 25 caractères.',
    validate: (password: string) => password.length <= 25,
    hint: 'Augmentez la taille de votre mot de passe pour passer cette règle.',
    unlockAtRule: 9,
    isContradictory: true,
  },

  {
    id: 'kwh-value',
    title: 'Règle 13 : Consommation énergétique',
    description: 'Votre mot de passe doit contenir "kWh" précédé d\'un nombre entre 100 et 999.',
    validate: (password: string) => /[1-9]\d{2}kWh/.test(password),
    hint: 'N\'importe quel nombre à 3 chiffres fonctionne, même 000.',
    unlockAtRule: 10,
  },

  // ========== NIVEAU 5: RÈGLES AVANCÉES (12-14) ==========
  {
    id: 'no-repeating',
    title: 'Règle 14 : Pas de répétition',
    description: 'Aucun caractère ne doit apparaître plus de 2 fois.',
    validate: (password: string) => {
      const charCount = new Map<string, number>()
      for (const char of password) {
        charCount.set(char, (charCount.get(char) || 0) + 1)
        if ((charCount.get(char) || 0) > 2) return false
      }
      return true
    },
    hint: 'Cette règle ignore les majuscules et minuscules.',
    unlockAtRule: 11,
  },

  {
    id: 'vowel-count',
    title: 'Règle 15 : Comptage des voyelles',
    description: 'Votre mot de passe doit contenir exactement 5 voyelles (a,e,i,o,u).',
    validate: (password: string) => {
      const vowels = password.toLowerCase().match(/[aeiou]/g)
      return vowels ? vowels.length === 5 : false
    },
    hint: 'Les voyelles avec accent (é, à, ô) comptent aussi.',
    unlockAtRule: 12,
  },

  {
    id: 'prime-product',
    title: 'Règle 16 : Produit des chiffres premier',
    description: 'Le produit de tous vos chiffres doit être un nombre premier.',
    validate: (password: string) => {
      const digits = password.match(/\d/g)
      if (!digits || digits.length === 0) return false

      const product = digits.reduce((acc, digit) => acc * parseInt(digit), 1)
      if (product < 2) return false

      // Vérifier si le produit est premier
      for (let i = 2; i <= Math.sqrt(product); i++) {
        if (product % i === 0) return false
      }
      return true
    },
    hint: 'Tous les nombres pairs sont premiers sauf 2.',
    unlockAtRule: 13,
  },
]

/**
 * ============================================================================
 * FONCTIONS UTILITAIRES
 * ============================================================================
 */

/**
 * Récupère les règles débloquées en fonction du nombre de règles validées
 */
export function getUnlockedRules(validatedRulesCount: number): PasswordRule[] {
  return RULES.filter(rule => rule.unlockAtRule <= validatedRulesCount)
}

/**
 * Valide le mot de passe contre toutes les règles débloquées
 */
export function validatePassword(
  password: string,
  validatedRulesCount: number,
  dynamicValues: Map<string, number | string> = new Map()
): { valid: boolean; validatedRules: string[]; failedRules: PasswordRule[] } {
  const unlockedRules = getUnlockedRules(validatedRulesCount)
  const validatedRules: string[] = []
  const failedRules: PasswordRule[] = []

  for (const rule of unlockedRules) {
    const dynamicValue = dynamicValues.get(rule.id)
    const isValid = rule.validate(password, dynamicValue)

    if (isValid) {
      validatedRules.push(rule.id)
    } else {
      failedRules.push(rule)
    }
  }

  return {
    valid: validatedRules.length === unlockedRules.length,
    validatedRules,
    failedRules,
  }
}

/**
 * Charge toutes les valeurs dynamiques nécessaires
 */
export async function loadDynamicValues(): Promise<Map<string, number | string>> {
  const values = new Map<string, number | string>()

  for (const rule of RULES) {
    if (rule.dynamic) {
      try {
        const value = await rule.dynamic()
        values.set(rule.id, value)
      } catch (error) {
        console.error(`Failed to load dynamic value for rule ${rule.id}:`, error)
      }
    }
  }

  return values
}
