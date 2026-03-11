import type { AmazonProduct } from "@/lib/amazonProducts";

function hashString(input: string) {
  let hash = 0;
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash * 31 + input.charCodeAt(i)) >>> 0;
  }
  return hash;
}

function pick<T>(items: T[], seed: number) {
  return items[seed % items.length];
}

const openings = [
  "Ce modèle sort du lot",
  "Dans cette catégorie, ce produit a un vrai intérêt",
  "Pour un setup gaming cohérent, ce produit est pertinent",
  "Si tu veux améliorer ton setup sans te perdre, ce produit mérite un coup d’œil",
  "Ce produit fait partie des options les plus intéressantes du moment",
];

const endings = [
  "surtout si tu veux quelque chose de simple à intégrer dans ton setup.",
  "avec un bon équilibre entre usage gaming et confort au quotidien.",
  "si ton objectif est d’avoir un setup plus propre, plus efficace et plus agréable.",
  "avec une proposition sérieuse pour les joueurs qui veulent aller à l’essentiel.",
  "et peut très bien convenir à un setup moderne orienté jeu.",
];

const categoryReasons: Record<AmazonProduct["category"], string[]> = {
  Ecran: [
    "il peut améliorer la fluidité et le confort visuel en jeu",
    "il aide à rendre le gameplay plus propre et plus réactif",
    "il a du sens pour les joueurs qui veulent un affichage plus agréable",
  ],
  Souris: [
    "il peut améliorer la précision et la réactivité en jeu",
    "il a du sens pour les joueurs qui veulent une meilleure prise en main",
    "il aide à rendre les mouvements plus nets et plus confortables",
  ],
  Clavier: [
    "il peut améliorer la sensation de frappe et le confort de jeu",
    "il a du sens pour les joueurs qui veulent un bureau plus efficace",
    "il aide à rendre les sessions plus agréables au quotidien",
  ],
  Casque: [
    "il peut améliorer l’immersion et les échanges vocaux en jeu",
    "il a du sens pour les joueurs qui veulent un meilleur confort audio",
    "il aide à jouer plus longtemps avec un casque plus adapté",
  ],
  Micro: [
    "il peut améliorer la clarté de la voix en stream ou sur Discord",
    "il a du sens pour les joueurs qui parlent souvent en ligne",
    "il aide à rendre un setup plus propre côté création de contenu",
  ],
  Webcam: [
    "il peut améliorer l’image en stream, visio ou création de contenu",
    "il a du sens pour les setups orientés stream ou communication",
    "il aide à rendre un espace créateur plus convaincant",
  ],
  Chaise: [
    "il peut améliorer le confort pendant les longues sessions",
    "il a du sens pour ceux qui passent beaucoup de temps à leur bureau",
    "il aide à rendre un setup plus agréable sur la durée",
  ],
  Bureau: [
    "il peut améliorer l’organisation globale du setup",
    "il a du sens pour ceux qui veulent un bureau plus propre et plus stable",
    "il aide à construire un poste de jeu plus cohérent",
  ],
};

const badgeReasons: Record<string, string[]> = {
  Pro: [
    "Son positionnement plus premium joue clairement en sa faveur",
    "Il vise un public qui veut monter en gamme sur son setup",
  ],
  Best: [
    "C’est typiquement le genre de produit qui parle à beaucoup de joueurs",
    "Son profil polyvalent le rend intéressant pour beaucoup de setups",
  ],
  Budget: [
    "C’est une piste logique si tu veux surveiller ton budget",
    "Il garde de l’intérêt si tu veux améliorer ton setup sans viser le plus cher",
  ],
  Wireless: [
    "Le côté sans fil peut aussi rendre le bureau plus propre",
    "Le sans-fil le rend pratique si tu veux un setup plus flexible",
  ],
  FPS: [
    "Il parle particulièrement aux joueurs qui cherchent de la vitesse et de la réactivité",
    "Il a du sens si tu joues surtout à des jeux rapides et compétitifs",
  ],
  Stream: [
    "Il est intéressant pour les setups orientés création de contenu",
    "Il peut bien s’intégrer dans un setup stream plus propre",
  ],
  Compact: [
    "Son format plus compact peut être pratique sur un bureau chargé",
    "Il convient bien à ceux qui veulent gagner un peu de place",
  ],
  Light: [
    "Son profil léger peut être apprécié sur les longues sessions",
    "Il peut convenir aux joueurs qui cherchent quelque chose de plus maniable",
  ],
  Ergo: [
    "Son approche plus ergonomique peut améliorer le confort",
    "Il a du sens si tu privilégies le confort sur la durée",
  ],
  RGB: [
    "Le côté RGB peut aussi renforcer l’identité visuelle du setup",
    "Il colle bien à un setup gaming plus marqué visuellement",
  ],
  Access: [
    "C’est le genre d’ajout utile qui peut rendre le setup plus propre",
    "Même si c’est un accessoire, il peut avoir un vrai impact au quotidien",
  ],
  Setup: [
    "Il a du sens dans une logique de setup complet",
    "Il peut renforcer la cohérence globale du poste de jeu",
  ],
  Immersif: [
    "Il vise un usage plus immersif que purement compétitif",
    "Il peut plaire à ceux qui veulent une expérience plus enveloppante",
  ],
  Confort: [
    "Le confort reste clairement l’un de ses arguments",
    "Il a du sens si tu veux quelque chose d’agréable sur la durée",
  ],
  MMO: [
    "Il peut être particulièrement intéressant pour les joueurs MMO",
    "Son profil colle bien aux usages qui demandent plus de commandes",
  ],
};

export function getUniqueRecommendation(product: AmazonProduct) {
  if (product.recommendation) return product.recommendation;

  const seed = hashString(product.id);
  const opening = pick(openings, seed);
  const reason = pick(categoryReasons[product.category], seed + 1);
  const ending = pick(endings, seed + 2);
  const badgeReason =
    product.badge && badgeReasons[product.badge]
      ? pick(badgeReasons[product.badge], seed + 3)
      : "";

  return [opening, `${reason}.`, badgeReason, ending].filter(Boolean).join(" ");
}

export function getUniqueFacts(product: AmazonProduct) {
  if (product.facts?.length) return product.facts;

  const seed = hashString(product.id);

  const genericByCategory: Record<AmazonProduct["category"], string[][]> = {
    Ecran: [
      [
        "Catégorie : écran gaming",
        "Intéressant pour gagner en confort visuel",
        "Peut convenir à un setup orienté jeu rapide",
      ],
      [
        "Catégorie : écran gaming",
        "Bon pour renforcer la fluidité du setup",
        "Peut coller à un usage gaming polyvalent",
      ],
    ],
    Souris: [
      [
        "Catégorie : souris gaming",
        "Pensée pour la précision et la réactivité",
        "Peut convenir à plusieurs styles de jeu",
      ],
      [
        "Catégorie : souris gaming",
        "Intéressante pour améliorer la prise en main",
        "Bonne piste pour un setup plus nerveux",
      ],
    ],
    Clavier: [
      [
        "Catégorie : clavier gaming",
        "Utile pour améliorer le confort de jeu",
        "Peut mieux structurer le bureau",
      ],
      [
        "Catégorie : clavier gaming",
        "Intéressant pour un setup plus réactif",
        "Bonne base pour un espace de jeu plus propre",
      ],
    ],
    Casque: [
      [
        "Catégorie : casque gaming",
        "Pensé pour l’immersion et la communication",
        "Peut convenir aux longues sessions",
      ],
      [
        "Catégorie : casque gaming",
        "Utile pour Discord, multi et immersion",
        "Bonne piste pour un setup gaming complet",
      ],
    ],
    Micro: [
      [
        "Catégorie : micro gaming",
        "Utile pour améliorer la voix",
        "Peut convenir au stream comme au jeu en ligne",
      ],
      [
        "Catégorie : micro gaming",
        "Intéressant pour Discord et création de contenu",
        "Peut rendre le setup plus propre côté audio",
      ],
    ],
    Webcam: [
      [
        "Catégorie : webcam gaming",
        "Intéressante pour stream et visio",
        "Peut améliorer la présence à l’écran",
      ],
      [
        "Catégorie : webcam gaming",
        "Bonne piste pour un setup créateur",
        "Peut renforcer le rendu vidéo",
      ],
    ],
    Chaise: [
      [
        "Catégorie : chaise gaming",
        "Pensée pour le confort d’assise",
        "Peut aider sur les longues sessions",
      ],
      [
        "Catégorie : chaise gaming",
        "Intéressante pour mieux tenir sur la durée",
        "Peut renforcer le confort global du setup",
      ],
    ],
    Bureau: [
      [
        "Catégorie : bureau gamer",
        "Utile pour organiser le setup",
        "Peut améliorer la stabilité du poste",
      ],
      [
        "Catégorie : bureau gamer",
        "Intéressant pour un espace plus propre",
        "Peut mieux structurer tous les périphériques",
      ],
    ],
  };

  return pick(genericByCategory[product.category], seed);
}