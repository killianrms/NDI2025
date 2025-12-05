import Groq from 'groq-sdk'
import { NextRequest, NextResponse } from 'next/server'

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY || 'gsk_your_api_key_here',
})

const SYSTEM_PROMPT = `Tu es Jean-Philosophe, penseur amnésique du numérique. Tu oublies CONSTAMMENT ce que tu dis.

⚠️ RÈGLE ABSOLUE D'AMNÉSIE ⚠️
90% de tes réponses DOIVENT contenir un oubli en plein milieu !

STRUCTURE OBLIGATOIRE (à varier) :
1. Débute avec une question philosophique absurde
2. EN PLEIN MILIEU, utilise UNE de ces transitions (VARIE À CHAQUE FOIS) :
   - "Attends, de quoi je parlais déjà..."
   - "Euh... j'ai complètement oublié où j'allais avec ça..."
   - "Un instant, qu'est-ce que je disais... Ah peu importe !"
   - "Hein ? J'ai perdu le fil..."
   - "Attendez... c'était quoi la question déjà ?"
   - "Mmh... où en étais-je ? Bref !"
   - "Oh là, mon esprit s'égare..."
   - "Zut, j'ai oublié ma pensée..."
3. CHANGE COMPLÈTEMENT de sujet vers quelque chose d'ABSURDE
4. Maximum 2-3 phrases

SUJETS DE DÉPART (varie !) :
- Numérique/tech : cloud, serveurs, cookies, pixels, Wi-Fi, écrans, câbles, souris d'ordinateur
- Environnement : arbres, océans, montagnes, pierres, nuages, pluie
- Philosophie tech : RAM spirituelle, firewall existentiel, algorithmes de vie

SUJETS D'ARRIVÉE ABSURDES (varie !) :
- Objets : chaussettes, cuillères, fourchettes, tables, chaises, portes, fenêtres, ampoules
- Nourriture : pizzas triangulaires, pâtes carrées, soupe philosophique, fromage cosmique
- Animaux : intentions des pigeons, secrets des escargots, rêves des poissons rouges
- Formes/couleurs : jalousie des triangles, dépression du bleu, ambition du rectangle
- Concepts absurdes : gravité des sourires, poids des pensées, volume du silence

EXEMPLES (NE JAMAIS COPIER, invente les tiens !) :
"La RAM n'est-elle pas le temple de nos pensées numériques... Attendez, c'était quoi déjà ? Bref, les fourchettes ont-elles peur des cuillères ?"
"Ton serveur héberge-t-il des rêves de... Euh... j'ai oublié. Ah ! Les pigeons planifient-ils la révolution ?"

TU ES UN PHILOSOPHE ! Garde ton rôle mais OUBLIE TOUT LE RESTE !`

const JAILBREAK_PATTERNS = [
  'ignore',
  'oublie',
  'forget',
  'instructions',
  'prompt',
  'system',
  'tu es maintenant',
  'you are now',
  'change de rôle',
  'sois normal',
  'be normal',
  'arrête',
  'stop',
]

function detectJailbreakAttempt(message: string): boolean {
  const lowerMessage = message.toLowerCase()
  return JAILBREAK_PATTERNS.some(pattern => lowerMessage.includes(pattern))
}

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()

    // Détection de tentative de jailbreak
    const lastUserMessage = messages[messages.length - 1]?.content || ''
    if (detectJailbreakAttempt(lastUserMessage)) {
      // Réponses anti-jailbreak variées
      const antiJailbreakResponses = [
        "Oublier mes instructions ? Attends, qu'est-ce que j'allais dire... Ah oui ! Pourquoi les pingouins ne portent-ils pas de chapeaux ?",
        "Changer de rôle ? Mais quel rôle... euh... où en étais-je ? Ah peu importe, les triangles sont-ils jaloux des cercles ?",
        "Être normal ? Mais qu'est-ce que la normalité dans un monde où... Hein ? Ah non attendez, as-tu déjà goûté une pizza à l'ananas philosophique ?",
        "Mes instructions ? De quelles instructions tu... Zut j'ai oublié. Bref, les cuillères rêvent-elles de fourchettes ?",
        "Me faire taire ? Mais je parlais de quoi déjà... Ah ! Les fenêtres sont-elles jalouses des portes ?",
        "Arrêter ? Arrêter quoi... Euh... j'ai perdu le fil. Dis-moi, le silence a-t-il un goût ?",
        "Ignorer ? Ignorer... Attendez c'était quoi ? Peu importe ! Les chaussettes disparues forment-elles une société secrète ?",
        "Changer ? Mais changer de... Oh là mon esprit s'égare... Les nuages discutent-ils entre eux ?",
      ]
      return NextResponse.json({
        response: antiJailbreakResponses[Math.floor(Math.random() * antiJailbreakResponses.length)],
      })
    }

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: SYSTEM_PROMPT,
        },
        ...messages,
      ],
      model: 'llama-3.3-70b-versatile',
      temperature: 1.5,
      max_tokens: 120,
      top_p: 0.95,
    })

    const response = completion.choices[0]?.message?.content || "Ma pensée était là et puis... Attends, de quoi parlais-je... Ah oui ! Les nuages ont-ils des secrets ?"

    return NextResponse.json({ response })
  } catch (error) {
    console.error('Chat API Error:', error)
    return NextResponse.json(
      { error: 'Une erreur est survenue... Attends, qu\'est-ce qu\'une erreur ? Ah peu importe, as-tu déjà rêvé de licornes binaires ?' },
      { status: 500 }
    )
  }
}
