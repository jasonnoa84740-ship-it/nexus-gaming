// lib/amazonProducts.ts

export type AmazonProduct = {
  id: string;           // ID interne (sert pour /go/[id])
  title: string;
  subtitle?: string;
  image: string;        // idéalement une image locale dans /public
  amazonUrl: string;    // lien affilié complet
  badge?: string;
};

export const amazonProducts: AmazonProduct[] = [
  {
    id: "clavier-meca",
    title: "Clavier mécanique gaming",
    subtitle: "Compact, réactif, parfait pour FPS",
    image: "/products/clavier.jpg",
    // Remplace TON_TAG-21 par ton tag d'affiliation Amazon
    amazonUrl: "https://www.amazon.fr/dp/ASIN_ICI?tag=TON_TAG-21",
    badge: "Bon plan",
  },
  {
    id: "souris-gaming",
    title: "Souris gaming légère",
    subtitle: "Capteur précis, bonne prise en main",
    image: "/products/souris.jpg",
    amazonUrl: "https://www.amazon.fr/dp/ASIN_ICI?tag=TON_TAG-21",
    badge: "Top",
  },
];