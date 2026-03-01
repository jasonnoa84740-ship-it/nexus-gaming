// lib/amazonProducts.ts

export type AmazonProduct = {
  id: string;
  title: string;
  subtitle?: string;
  category: "Audio" | "Bureau" | "Chaise" | "Clavier" | "Souris" | "Ecran" | "Micro" | "Webcam" | "Lumiere" | "Accessoires";
  badge?: string;

  // ✅ image locale (placeholder)
  image: string;

  // ✅ requête pour ouvrir Amazon en recherche (toujours dispo)
  query: string;

  // ✅ lien affilié final (à remplir par toi)
  amazonUrl?: string;
};

export const amazonProducts: AmazonProduct[] = [
  {
    id: "casque-sans-fil",
    title: "Casque gaming sans fil",
    subtitle: "PC / PS5 • micro clair • bonne autonomie",
    category: "Audio",
    badge: "Top",
    image: "/products/casque.jpg",
    query: "casque gaming sans fil pc ps5 micro",
    amazonUrl: "", // <-- tu colleras ton lien affilié ici
  },
  {
    id: "bureau-gaming",
    title: "Bureau gaming",
    subtitle: "140X60 cm • passe-câbles • stable",
    category: "Bureau",
    badge: "Setup",
    image: "/products/bureau.jpg",
    query: "bureau gaming 140 cm passe cables stable",
    amazonUrl:"https://amzn.eu/d/0ifzectw",
  },
  {
    id: "chaise-gaming",
    title: "Chaise gaming ergonomique",
    subtitle: "coussin lombaire • accoudoirs • confort long",
    category: "Chaise",
    badge: "Confort",
    image: "/products/chaise.jpg",
    query: "chaise gaming ergonomique coussin lombaire accoudoirs",
    amazonUrl: "",
  },
  {
    id: "clavier-mecanique",
    title: "Clavier mécanique",
    subtitle: "AZERTY • RGB • switches réactifs",
    category: "Clavier",
    badge: "FPS",
    image: "/products/clavier.jpg",
    query: "clavier mecanique azerty rgb gaming",
    amazonUrl: "",
  },
  {
    id: "souris-legere",
    title: "Souris gaming légère",
    subtitle: "capteur précis • bonne prise en main",
    category: "Souris",
    badge: "Aim",
    image: "/products/souris.jpg",
    query: "souris gaming legere capteur precis",
    amazonUrl: "",
  },
  {
    id: "ecran-144hz",
    title: "Écran 144Hz (ou +)",
    subtitle: "24–27\" • faible latence • fluidité",
    category: "Ecran",
    badge: "Smooth",
    image: "/products/ecran.jpg",
    query: "ecran gaming 144hz 24 27 pouces",
    amazonUrl: "",
  },
  {
    id: "micro-usb",
    title: "Micro USB streaming",
    subtitle: "voix propre • facile à installer",
    category: "Micro",
    badge: "Stream",
    image: "/products/micro.jpg",
    query: "micro usb streaming voix claire",
    amazonUrl: "",
  },
  {
    id: "webcam-1080p",
    title: "Webcam 1080p",
    subtitle: "visio/stream • autofocus si possible",
    category: "Webcam",
    badge: "Cam",
    image: "/products/webcam.jpg",
    query: "webcam 1080p autofocus micro",
    amazonUrl: "",
  },
  {
    id: "lumiere-rgb",
    title: "Éclairage / LED RGB",
    subtitle: "barres LED • ambiance setup",
    category: "Lumiere",
    badge: "RGB",
    image: "/products/led.jpg",
    query: "barre led rgb setup gaming",
    amazonUrl: "",
  },
  {
    id: "tapis-xl",
    title: "Tapis de souris XL",
    subtitle: "grand format • glisse stable",
    category: "Accessoires",
    badge: "Setup",
    image: "/products/tapis.jpg",
    query: "tapis de souris xl gaming",
    amazonUrl: "",
  },
];