export type SeoPage = {
  slug: string
  keyword: string
  title: string
  description: string
  intro: string
  sections: {
    title: string
    content: string
  }[]
  faq?: {
    question: string
    answer: string
  }[]
}

export const seoPages: SeoPage[] = [
  {
    slug: "meilleur-ecran-gaming",
    keyword: "meilleur écran gaming",
    title: "Meilleur écran gaming 2026 | NexusGamingFR",
    description:
      "Découvrez notre sélection des meilleurs écrans gaming en 2026 : 144Hz, 165Hz, 180Hz et plus, avec un excellent rapport qualité/prix.",
    intro:
      "Choisir le meilleur écran gaming peut changer totalement votre expérience de jeu. Un bon écran apporte une meilleure fluidité, une réactivité plus rapide et un meilleur confort visuel.",
    sections: [
      {
        title: "Pourquoi choisir un écran gaming rapide ?",
        content:
          "Un écran gaming avec un taux de rafraîchissement élevé comme 144Hz ou 180Hz permet une image plus fluide dans les jeux compétitifs comme Fortnite, Call of Duty, Valorant ou CS2.",
      },
      {
        title: "Quels critères regarder ?",
        content:
          "Avant d’acheter un écran gaming, il faut regarder la fréquence, le temps de réponse, le type de dalle, la taille de l’écran et la compatibilité avec votre setup.",
      },
      {
        title: "Notre conseil",
        content:
          "Pour la majorité des joueurs, un écran 24 ou 27 pouces en 144Hz ou 180Hz offre déjà une excellente expérience pour un budget raisonnable.",
      },
    ],
    faq: [
      {
        question: "Quel est le meilleur taux de rafraîchissement pour jouer ?",
        answer:
          "Pour la plupart des joueurs, 144Hz est déjà excellent. 165Hz ou 180Hz apportent encore plus de fluidité pour les jeux compétitifs.",
      },
      {
        question: "Quelle taille d’écran choisir ?",
        answer:
          "24 pouces est idéal pour le jeu compétitif, tandis que 27 pouces offre plus de confort pour un usage polyvalent.",
      },
    ],
  },
  {
    slug: "meilleure-souris-gaming",
    keyword: "meilleure souris gaming",
    title: "Meilleure souris gaming 2026 | NexusGamingFR",
    description:
      "Comparatif des meilleures souris gaming en 2026 pour FPS, MOBA et usage polyvalent.",
    intro:
      "Une bonne souris gaming améliore la précision, le confort et la réactivité en jeu. Voici les critères les plus importants pour faire le bon choix.",
    sections: [
      {
        title: "Pourquoi une souris gaming change tout ?",
        content:
          "Une souris gaming offre souvent un meilleur capteur, une meilleure ergonomie et une latence plus faible qu’une souris classique.",
      },
      {
        title: "Les critères à regarder",
        content:
          "Le poids, la forme, le capteur, les boutons programmables et la connexion filaire ou sans fil sont les éléments principaux à comparer.",
      },
    ],
    faq: [
      {
        question: "Une souris légère est-elle meilleure ?",
        answer:
          "Pour les FPS, beaucoup de joueurs préfèrent une souris légère pour gagner en rapidité et en confort.",
      },
    ],
  },
]