// lib/amazonProducts.ts
// Liste produits Amazon (gaming). Tu peux remplir amazonUrl plus tard.
// Ton /go/[id] doit rediriger vers amazonUrl si rempli, sinon vers une recherche via query.

export type Category =
  | "Ecran"
  | "Souris"
  | "Clavier"
  | "Casque"
  | "Micro"
  | "Webcam"
  | "Chaise"
  | "Bureau";

export type AmazonProduct = {
  id: string;
  title: string;
  subtitle?: string;
  category: Category;
  badge?: string;

  // image locale (placeholder)
  image: string;

  // recherche Amazon (fallback)
  query: string;

  // lien produit affilié exact (tu colles ici plus tard)
  amazonUrl?: string;

  // contenu personnalisé
  recommendation?: string;
  facts?: string[];
};

// Ton tag (utile si tu veux générer tes liens propres plus tard)
export const AMAZON_TAG = "nexusgamingfr-21";

function slugify(input: string) {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")
    .slice(0, 80);
}

function makeId(category: Category, title: string) {
  return `${slugify(category)}-${slugify(title)}`;
}

function makeQuery(title: string) {
  return `${title} gaming`;
}

const IMG: Record<Category, string> = {
  Ecran: "/products/ecran.jpg",
  Souris: "/products/souris.jpg",
  Clavier: "/products/clavier.jpg",
  Casque: "/products/casque.jpg",
  Micro: "/products/micro.jpg",
  Webcam: "/products/webcam.jpg",
  Chaise: "/products/chaise.jpg",
  Bureau: "/products/bureau.jpg",
};

type Seed = {
  title: string;
  subtitle?: string;
  badge?: string;
};

function build(category: Category, items: Seed[]): AmazonProduct[] {
  return items.map((it) => ({
    id: makeId(category, it.title),
    title: it.title,
    subtitle: it.subtitle,
    badge: it.badge,
    category,
    image: IMG[category],
    query: makeQuery(it.title),
    amazonUrl: "https://www.amazon.fr/dp/B0CYZBLFGC?tag=nexusgamingfr-21",
  }));
}

/* =========================
   30 ÉCRANS GAMING
========================= */
const ECRANS_30: AmazonProduct[] = [
  {
    id: "aoc-24g4xe",
    title: 'AOC 24G4XE 24" 180Hz IPS',
    category: "Ecran",
    image: "/ecran/aoc-24g4xe.jpg",
    query: "AOC 24G4XE gaming monitor",
    amazonUrl: "https://www.amazon.fr/dp/B0CWRWYCZ4?tag=nexusgamingfr-21",
  },
  {
    id: "aoc-c27g4zxe",
    title: 'AOC C27G4ZXE 27" incurvé',
    category: "Ecran",
    image: "/ecran/aoc-c27g4zxe.jpg",
    query: "AOC C27G4ZXE gaming monitor",
    amazonUrl: "https://www.amazon.fr/dp/B0D58MQQ7S?tag=nexusgamingfr-21",
  },
  {
    id: "samsung-odyssey-g3",
    title: 'Samsung Odyssey G3 24"',
    category: "Ecran",
    image: "/ecran/samsung-g3.jpg",
    query: "Samsung Odyssey G3 gaming monitor",
    amazonUrl: "https://www.amazon.fr/dp/B09QZWYZT5?tag=nexusgamingfr-21",
  },
  {
    id: "samsung-odyssey-g5",
    title: 'Samsung Odyssey G5 27"',
    category: "Ecran",
    image: "/ecran/samsung-g5.jpg",
    query: "Samsung Odyssey G5 gaming monitor",
    amazonUrl: "https://www.amazon.fr/dp/B0CP687WQK?tag=nexusgamingfr-21",
  },
  {
    id: "samsung-odyssey-g7",
    title: 'Samsung Odyssey G7 27"',
    category: "Ecran",
    image: "/ecran/samsung-g7.jpg",
    query: "Samsung Odyssey G7 gaming monitor",
    amazonUrl: "https://www.amazon.fr/dp/B0BRL8T2G7?tag=nexusgamingfr-21",
  },
  {
    id: "lg-ultragear-24g411a",
    title: "LG UltraGear 24G411A-B",
    category: "Ecran",
    image: "/ecran/lg-24g411.jpg",
    query: "LG UltraGear 24G411A gaming monitor",
    amazonUrl: "https://www.amazon.fr/dp/B0FL32LSR5?tag=nexusgamingfr-21",
  },
  {
    id: "lg-ultragear-27gr75q",
    title: "LG UltraGear 27GR75Q-B",
    category: "Ecran",
    image: "/ecran/lg-27gr75.jpg",
    query: "LG UltraGear 27GR75Q gaming monitor",
    amazonUrl: "https://www.amazon.fr/dp/B0BVWMSP1V?tag=nexusgamingfr-21",
  },
  {
    id: "lg-ultragear-oled",
    title: 'LG UltraGear OLED 27"',
    category: "Ecran",
    image: "/ecran/lg-27gx704.jpg",
    query: "LG UltraGear OLED gaming monitor",
    amazonUrl: "https://www.amazon.fr/dp/B0FTPCP6S1?tag=nexusgamingfr-21",
  },
  {
    id: "asus-tuf-24",
    title: 'ASUS TUF Gaming 24"',
    category: "Ecran",
    image: "/ecran/asus-tuf-24.jpg",
    query: "ASUS TUF Gaming monitor",
    amazonUrl: "https://www.amazon.fr/dp/B0F9Z1SS65?tag=nexusgamingfr-21",
  },
  {
    id: "asus-tuf-vg27aq",
    title: "ASUS TUF VG27AQM1A",
    category: "Ecran",
    image: "/ecran/asus-tuf-vg27aqm1a.jpg",
    query: "ASUS TUF VG27AQM1A monitor",
    amazonUrl: "https://www.amazon.fr/dp/B0CQ5K4HG5?tag=nexusgamingfr-21",
  },
  {
    id: "asus-rog-oled",
    title: "ASUS ROG Strix OLED",
    category: "Ecran",
    image: "/ecran/asus-rog-strix.jpg",
    query: "ASUS ROG OLED gaming monitor",
    amazonUrl: "https://www.amazon.fr/dp/B0F13V37YH?tag=nexusgamingfr-21",
  },
  {
    id: "msi-g2412",
    title: 'MSI G2412 24"',
    category: "Ecran",
    image: "/ecran/msi-g2412.jpg",
    query: "MSI G2412 gaming monitor",
    amazonUrl: "https://www.amazon.fr/dp/B0B83MNB5H?tag=nexusgamingfr-21",
  },
  {
    id: "msi-mag-275qf",
    title: "MSI MAG 275QF",
    category: "Ecran",
    image: "/ecran/msi-mag275qf.jpg",
    query: "MSI MAG 275QF monitor",
    amazonUrl: "https://www.amazon.fr/dp/B0D1R9TMX7?tag=nexusgamingfr-21",
  },
  {
    id: "msi-mag274qrf",
    title: "MSI MAG274QRF-QD",
    category: "Ecran",
    image: "/ecran/msi-mag274qrf.jpg",
    query: "MSI MAG274QRF monitor",
    amazonUrl: "https://www.amazon.fr/dp/B08PKHV1R9?tag=nexusgamingfr-21",
  },
  {
    id: "benq-xl2411k",
    title: "BenQ ZOWIE XL2411K",
    category: "Ecran",
    image: "/ecran/benq-xl2411k.jpg",
    query: "BenQ XL2411K gaming monitor",
    amazonUrl: "https://www.amazon.fr/dp/B08HJ2T1JK?tag=nexusgamingfr-21",
  },
  {
    id: "benq-xl2540k",
    title: "BenQ ZOWIE XL2540K",
    category: "Ecran",
    image: "/ecran/benq-xl2540k.jpg",
    query: "BenQ XL2540K gaming monitor",
    amazonUrl: "https://www.amazon.fr/dp/B08M671TZX?tag=nexusgamingfr-21",
  },
  {
    id: "benq-ex2510s",
    title: "BenQ MOBIUZ EX2510S",
    category: "Ecran",
    image: "/ecran/benq-ex2510s.jpg",
    query: "BenQ EX2510S gaming monitor",
    amazonUrl: "https://www.amazon.fr/dp/B096B51TMD?tag=nexusgamingfr-21",
  },
  {
    id: "gigabyte-g24f",
    title: "Gigabyte G24F",
    category: "Ecran",
    image: "/ecran/gigabyte-g24f.jpg",
    query: "Gigabyte G24F gaming monitor",
    amazonUrl: "https://www.amazon.fr/dp/B0BT897JXB?tag=nexusgamingfr-21",
  },
  {
    id: "gigabyte-m27q",
    title: "Gigabyte M27Q",
    category: "Ecran",
    image: "/ecran/gigabyte-m27q3.jpg",
    query: "Gigabyte M27Q gaming monitor",
    amazonUrl: "https://www.amazon.fr/dp/B0FPXG8PGT?tag=nexusgamingfr-21",
  },
  {
    id: "dell-25-gaming",
    title: "Dell 25 Gaming Monitor",
    category: "Ecran",
    image: "/ecran/dell-se2426.jpg",
    query: "Dell gaming monitor 25",
    amazonUrl: "https://www.amazon.fr/dp/B0GHQ2BPYJ?tag=nexusgamingfr-21",
  },
  {
    id: "alienware-aw2523hf",
    title: "Alienware AW2523HF",
    category: "Ecran",
    image: "/ecran/alienware-aw2523hf.jpg",
    query: "Alienware AW2523HF monitor",
    amazonUrl: "https://www.amazon.fr/dp/B0BF5SJFN8?tag=nexusgamingfr-21",
  },
  {
    id: "acer-kg272",
    title: "Acer KG272",
    category: "Ecran",
    image: "/ecran/acer-kg272.jpg",
    query: "Acer KG272 gaming monitor",
    amazonUrl: "https://www.amazon.fr/dp/B0DN28QY5P?tag=nexusgamingfr-21",
  },
  {
    id: "acer-nitro",
    title: "Acer Nitro",
    category: "Ecran",
    image: "/ecran/acer-nitro.jpg",
    query: "Acer Nitro gaming monitor",
    amazonUrl: "https://www.amazon.fr/dp/B0CCY6CQ21?tag=nexusgamingfr-21",
  },
  {
    id: "acer-predator",
    title: "Acer Predator",
    category: "Ecran",
    image: "/ecran/acer-predator.jpg",
    query: "Acer Predator gaming monitor",
    amazonUrl: "https://www.amazon.fr/dp/B0B8GWGLLS?tag=nexusgamingfr-21",
  },
  {
    id: "viewsonic-va24",
    title: "ViewSonic VA24G1-H",
    category: "Ecran",
    image: "/ecran/viewsonic-va24.jpg",
    query: "ViewSonic VA24 gaming monitor",
    amazonUrl: "https://www.amazon.fr/dp/B0FHK34X5L?tag=nexusgamingfr-21",
  },
  {
    id: "viewsonic-vx2479",
    title: "ViewSonic VX2479A",
    category: "Ecran",
    image: "/ecran/viewsonic-vx2479.jpg",
    query: "ViewSonic VX2479A gaming monitor",
    amazonUrl: "https://www.amazon.fr/dp/B0F1T7G19N?tag=nexusgamingfr-21",
  },
  {
    id: "koorui-24",
    title: 'KOORUI 24"',
    category: "Ecran",
    image: "/ecran/koorui-24.jpg",
    query: "KOORUI gaming monitor",
    amazonUrl: "https://www.amazon.fr/dp/B0DPHDPWW1?tag=nexusgamingfr-21",
  },
  {
    id: "iiyama-gmaster",
    title: "iiyama G-Master",
    category: "Ecran",
    image: "/ecran/iiyama-gmaster.jpg",
    query: "iiyama G Master gaming monitor",
    amazonUrl: "https://www.amazon.fr/dp/B0947BJM8S?tag=nexusgamingfr-21",
  },
  {
    id: "philips-evnia",
    title: "Philips Evnia",
    category: "Ecran",
    image: "/ecran/philips-evnia.jpg",
    query: "Philips Evnia gaming monitor",
    amazonUrl: "https://www.amazon.fr/dp/B0DF7LPJSR?tag=nexusgamingfr-21",
  },
  {
    id: "hp-omen",
    title: 'HP Omen 27"',
    category: "Ecran",
    image: "/ecran/hp-omen.jpg",
    query: "HP Omen gaming monitor",
    amazonUrl: "https://www.amazon.fr/dp/B0C4F3YP8F?tag=nexusgamingfr-21",
  },
];

/* =========================
   30 SOURIS GAMER
========================= */
const SOURIS_30: AmazonProduct[] = [
  {
    id: "logitech-g-pro-x-superlight",
    title: "Logitech G Pro X Superlight",
    category: "Souris",
    image: "/souris/logitech-g-pro-x-superlight.jpg",
    query: "Logitech G Pro X Superlight gaming mouse",
    amazonUrl: "https://www.amazon.fr/dp/B07W5JKPJX?tag=nexusgamingfr-21",
    badge: "Pro",
  },
  {
    id: "logitech-g-pro-x-superlight-2",
    title: "Logitech G Pro X Superlight 2",
    category: "Souris",
    image: "/souris/logitech-g-pro-x-superlight-2.jpg",
    query: "Logitech G Pro X Superlight 2 gaming mouse",
    amazonUrl: "https://www.amazon.fr/dp/B0F1YS92S2?tag=nexusgamingfr-21",
    badge: "Pro",
  },
  {
    id: "logitech-g502-hero",
    title: "Logitech G502 HERO",
    category: "Souris",
    image: "/souris/logitech-g502-hero.jpg",
    query: "Logitech G502 HERO gaming mouse",
    amazonUrl: "https://www.amazon.fr/dp/B07GS6ZB7T?tag=nexusgamingfr-21",
    badge: "Best",
  },
  {
    id: "logitech-g305-lightspeed",
    title: "Logitech G305 LIGHTSPEED",
    category: "Souris",
    image: "/souris/logitech-g305-lightspeed.jpg",
    query: "Logitech G305 LIGHTSPEED gaming mouse",
    amazonUrl: "https://www.amazon.fr/dp/B07CGPZ3ZQ?tag=nexusgamingfr-21",
    badge: "Wireless",
  },
  {
    id: "logitech-g703-lightspeed",
    title: "Logitech G703 LIGHTSPEED",
    category: "Souris",
    image: "/souris/logitech-g703-lightspeed.jpg",
    query: "Logitech G703 LIGHTSPEED gaming mouse",
    amazonUrl: "https://www.amazon.fr/dp/B07S7CKTBR?tag=nexusgamingfr-21",
    badge: "Wireless",
  },
  {
    id: "logitech-g203",
    title: "Logitech G203",
    category: "Souris",
    image: "/souris/logitech-g203.jpg",
    query: "Logitech G203 gaming mouse",
    amazonUrl: "https://www.amazon.fr/dp/B07TBLT997?tag=nexusgamingfr-21",
    badge: "Budget",
  },
  {
    id: "razer-deathadder-essential",
    title: "Razer DeathAdder Essential",
    category: "Souris",
    image: "/souris/razer-deathadder-essential.jpg",
    query: "Razer DeathAdder Essential gaming mouse",
    amazonUrl: "https://www.amazon.fr/dp/B092R5MCB3?tag=nexusgamingfr-21",
    badge: "Best",
  },
  {
    id: "razer-deathadder-v3",
    title: "Razer DeathAdder V3",
    category: "Souris",
    image: "/souris/razer-deathadder-v3.jpg",
    query: "Razer DeathAdder V3 gaming mouse",
    amazonUrl: "https://www.amazon.fr/dp/B09ZLTV8B3?tag=nexusgamingfr-21",
    badge: "Pro",
  },
  {
    id: "razer-viper-mini",
    title: "Razer Viper Mini",
    category: "Souris",
    image: "/souris/razer-viper-mini.jpg",
    query: "Razer Viper Mini gaming mouse",
    amazonUrl: "https://www.amazon.fr/dp/B084W6W9WB?tag=nexusgamingfr-21",
    badge: "FPS",
  },
  {
    id: "razer-viper-v2-pro",
    title: "Razer Viper V2 Pro",
    category: "Souris",
    image: "/souris/razer-viper-v2-pro.jpg",
    query: "Razer Viper V2 Pro gaming mouse",
    amazonUrl: "https://www.amazon.fr/dp/B09QFVSYX6?tag=nexusgamingfr-21",
    badge: "Pro",
  },
  {
    id: "razer-viper-v3-hyperspeed",
    title: "Razer Viper V3 HyperSpeed",
    category: "Souris",
    image: "/souris/razer-viper-v3-hyperspeed.jpg",
    query: "Razer Viper V3 HyperSpeed gaming mouse",
    amazonUrl: "https://www.amazon.fr/dp/B0FT8DX8CD?tag=nexusgamingfr-21",
    badge: "Wireless",
  },
  {
    id: "razer-basilisk-v3",
    title: "Razer Basilisk V3",
    category: "Souris",
    image: "/souris/razer-basilisk-v3.jpg",
    query: "Razer Basilisk V3 gaming mouse",
    amazonUrl: "https://www.amazon.fr/dp/B097F8H1MC?tag=nexusgamingfr-21",
    badge: "Best",
  },
  {
    id: "razer-basilisk-ultimate",
    title: "Razer Basilisk Ultimate",
    category: "Souris",
    image: "/souris/razer-basilisk-ultimate.jpg",
    query: "Razer Basilisk Ultimate gaming mouse",
    amazonUrl: "https://www.amazon.fr/dp/B0BT4VRZGV?tag=nexusgamingfr-21",
    badge: "Pro",
  },
  {
    id: "razer-orochi-v2",
    title: "Razer Orochi V2",
    category: "Souris",
    image: "/souris/razer-orochi-v2.jpg",
    query: "Razer Orochi V2 gaming mouse",
    amazonUrl: "https://www.amazon.fr/dp/B08YZ61Y5S?tag=nexusgamingfr-21",
    badge: "Compact",
  },
  {
    id: "razer-naga-mmo",
    title: "Razer Naga (MMO)",
    category: "Souris",
    image: "/souris/razer-naga-mmo.jpg",
    query: "Razer Naga MMO gaming mouse",
    amazonUrl: "https://www.amazon.fr/dp/B0BD5L1ZJQ?tag=nexusgamingfr-21",
    badge: "MMO",
  },
  {
    id: "steelseries-rival-3",
    title: "SteelSeries Rival 3",
    category: "Souris",
    image: "/souris/steelseries-rival-3.jpg",
    query: "SteelSeries Rival 3 gaming mouse",
    amazonUrl: "https://www.amazon.fr/dp/B0F5QBSRDR?tag=nexusgamingfr-21",
    badge: "Best",
  },
  {
    id: "steelseries-prime",
    title: "SteelSeries Prime",
    category: "Souris",
    image: "/souris/steelseries-prime.jpg",
    query: "SteelSeries Prime gaming mouse",
    amazonUrl: "https://www.amazon.fr/dp/B093LV8SPK?tag=nexusgamingfr-21",
    badge: "Pro",
  },
  {
    id: "steelseries-aerox-3",
    title: "SteelSeries Aerox 3",
    category: "Souris",
    image: "/souris/steelseries-aerox-3.jpg",
    query: "SteelSeries Aerox 3 gaming mouse",
    amazonUrl: "https://www.amazon.fr/dp/B08KWKDRFF?tag=nexusgamingfr-21",
    badge: "Light",
  },
  {
    id: "steelseries-aerox-5",
    title: "SteelSeries Aerox 5",
    category: "Souris",
    image: "/souris/steelseries-aerox-5.jpg",
    query: "SteelSeries Aerox 5 gaming mouse",
    amazonUrl: "https://www.amazon.fr/dp/B09W19PZFF?tag=nexusgamingfr-21",
    badge: "Light",
  },
  {
    id: "corsair-katar-pro",
    title: "Corsair Katar Pro",
    category: "Souris",
    image: "/souris/corsair-katar-pro.jpg",
    query: "Corsair Katar Pro gaming mouse",
    amazonUrl: "https://www.amazon.fr/dp/B08TRFKBQH?tag=nexusgamingfr-21",
    badge: "Budget",
  },
  {
    id: "corsair-sabre-rgb-pro",
    title: "Corsair Sabre RGB Pro",
    category: "Souris",
    image: "/souris/corsair-sabre-rgb-pro.jpg",
    query: "Corsair Sabre RGB Pro gaming mouse",
    amazonUrl: "https://www.amazon.fr/dp/B08XJRDTKC?tag=nexusgamingfr-21",
    badge: "FPS",
  },
  {
    id: "corsair-m65-rgb",
    title: "Corsair M65 RGB",
    category: "Souris",
    image: "/souris/corsair-m65-rgb.jpg",
    query: "Corsair M65 RGB gaming mouse",
    amazonUrl: "https://www.amazon.fr/dp/B01D63UU52?tag=nexusgamingfr-21",
    badge: "Best",
  },
  {
    id: "corsair-dark-core-rgb",
    title: "Corsair Dark Core RGB",
    category: "Souris",
    image: "/souris/corsair-dark-core-rgb.jpg",
    query: "Corsair Dark Core RGB gaming mouse",
    amazonUrl: "https://www.amazon.fr/dp/B083KZB7XW?tag=nexusgamingfr-21",
    badge: "Wireless",
  },
  {
    id: "roccat-kone-pro",
    title: "ROCCAT Kone Pro",
    category: "Souris",
    image: "/souris/roccat-kone-pro.jpg",
    query: "ROCCAT Kone Pro gaming mouse",
    amazonUrl: "https://www.amazon.fr/dp/B07KNRWG4R?tag=nexusgamingfr-21",
    badge: "Pro",
  },
  {
    id: "roccat-burst-pro",
    title: "ROCCAT Burst Pro",
    category: "Souris",
    image: "/souris/roccat-burst-pro.jpg",
    query: "ROCCAT Burst Pro gaming mouse",
    amazonUrl: "https://www.amazon.fr/dp/B09WX31QH3?tag=nexusgamingfr-21",
    badge: "FPS",
  },
  {
    id: "glorious-model-o",
    title: "Glorious Model O",
    category: "Souris",
    image: "/souris/glorious-model-o.jpg",
    query: "Glorious Model O gaming mouse",
    amazonUrl: "https://www.amazon.fr/dp/B07LDH3TWM?tag=nexusgamingfr-21",
    badge: "Light",
  },
  {
    id: "glorious-model-d",
    title: "Glorious Model D",
    category: "Souris",
    image: "/souris/glorious-model-d.jpg",
    query: "Glorious Model D gaming mouse",
    amazonUrl: "https://www.amazon.fr/dp/B0822Y456P?tag=nexusgamingfr-21",
    badge: "Ergo",
  },
  {
    id: "hyperx-pulsefire-haste",
    title: "HyperX Pulsefire Haste",
    category: "Souris",
    image: "/souris/hyperx-pulsefire-haste.jpg",
    query: "HyperX Pulsefire Haste gaming mouse",
    amazonUrl: "https://www.amazon.fr/dp/B0BX51KBL9?tag=nexusgamingfr-21",
    badge: "Light",
  },
  {
    id: "asus-rog-keris",
    title: "ASUS ROG Keris",
    category: "Souris",
    image: "/souris/asus-rog-keris.jpg",
    query: "ASUS ROG Keris gaming mouse",
    amazonUrl: "https://www.amazon.fr/dp/B0F911D4YW?tag=nexusgamingfr-21",
    badge: "Pro",
  },
  {
    id: "cooler-master-mm710",
    title: "Cooler Master MM710",
    category: "Souris",
    image: "/souris/cooler-master-mm710.jpg",
    query: "Cooler Master MM710 gaming mouse",
    amazonUrl: "https://www.amazon.fr/dp/B09X1V67CJ?tag=nexusgamingfr-21",
    badge: "Light",
  },
];

/* =========================
   30 CLAVIERS GAMER
========================= */
const CLAVIERS_30: AmazonProduct[] = [
  { id: "clavier-razer-huntsman-mini-60", title: "Razer Huntsman Mini (60%)", category: "Clavier", image: "/clavier/clavier-razer-huntsman-mini-60.jpg", query: "Razer Huntsman Mini 60% clavier gaming", amazonUrl: "https://www.amazon.fr/dp/B08CY2QS65?tag=nexusgamingfr-21", badge: "FPS" },
  { id: "clavier-razer-huntsman-v2", title: "Razer Huntsman V2", category: "Clavier", image: "/clavier/clavier-razer-huntsman-v2.jpg", query: "Razer Huntsman V2 clavier gaming", amazonUrl: "https://www.amazon.fr/dp/B08P4XVDDJ?tag=nexusgamingfr-21", badge: "Pro" },
  { id: "clavier-razer-blackwidow-v3", title: "Razer BlackWidow V3", category: "Clavier", image: "/clavier/clavier-razer-blackwidow-v3.jpg", query: "Razer BlackWidow V3 clavier gaming", amazonUrl: "https://www.amazon.fr/dp/B08CHLRZ2B?tag=nexusgamingfr-21", badge: "Best" },
  { id: "clavier-razer-blackwidow-v4", title: "Razer BlackWidow V4", category: "Clavier", image: "/clavier/clavier-razer-blackwidow-v4.jpg", query: "Razer BlackWidow V4 clavier gaming", amazonUrl: "https://www.amazon.fr/dp/B0C6FDVHNY?tag=nexusgamingfr-21", badge: "Pro" },
  { id: "clavier-razer-ornata-v3", title: "Razer Ornata V3", category: "Clavier", image: "/clavier/clavier-razer-ornata-v3.jpg", query: "Razer Ornata V3 clavier gaming", amazonUrl: "https://www.amazon.fr/dp/B09X5YRBF9?tag=nexusgamingfr-21", badge: "Budget" },
  { id: "clavier-logitech-g-pro-x-tkl", title: "Logitech G Pro X TKL", category: "Clavier", image: "/clavier/clavier-logitech-g-pro-x-tkl.jpg", query: "Logitech G Pro X TKL clavier gaming", amazonUrl: "https://www.amazon.fr/dp/B0CW1VPWBG?tag=nexusgamingfr-21", badge: "Pro" },
  { id: "clavier-logitech-g915-tkl", title: "Logitech G915 TKL", category: "Clavier", image: "/clavier/clavier-logitech-g915-tkl.jpg", query: "Logitech G915 TKL clavier gaming", amazonUrl: "https://www.amazon.fr/dp/B07W6H91JG?tag=nexusgamingfr-21", badge: "Wireless" },
  { id: "clavier-logitech-g213-prodigy", title: "Logitech G213 Prodigy", category: "Clavier", image: "/clavier/clavier-logitech-g213-prodigy.jpg", query: "Logitech G213 Prodigy clavier gaming", amazonUrl: "https://www.amazon.fr/dp/B07W5JK5XP?tag=nexusgamingfr-21", badge: "Budget" },
  { id: "clavier-logitech-g413", title: "Logitech G413", category: "Clavier", image: "/clavier/clavier-logitech-g413.jpg", query: "Logitech G413 clavier gaming", amazonUrl: "https://www.amazon.fr/dp/B07W6H32W5?tag=nexusgamingfr-21", badge: "Best" },
  { id: "clavier-corsair-k55-rgb-pro", title: "Corsair K55 RGB PRO", category: "Clavier", image: "/clavier/clavier-corsair-k55-rgb-pro.jpg", query: "Corsair K55 RGB PRO clavier gaming", amazonUrl: "https://www.amazon.fr/dp/B0FH5JQQ15?tag=nexusgamingfr-21", badge: "Budget" },
  { id: "clavier-corsair-k60-pro", title: "Corsair K60 PRO", category: "Clavier", image: "/clavier/clavier-corsair-k60-pro.jpg", query: "Corsair K60 PRO clavier gaming", amazonUrl: "https://www.amazon.fr/dp/B0BCR1P1LY?tag=nexusgamingfr-21", badge: "FPS" },
  { id: "clavier-corsair-k65-mini", title: "Corsair K65 MINI", category: "Clavier", image: "/clavier/clavier-corsair-k65-mini.jpg", query: "Corsair K65 MINI clavier gaming", amazonUrl: "https://www.amazon.fr/dp/B08XKD8R69?tag=nexusgamingfr-21", badge: "FPS" },
  { id: "clavier-corsair-k70-rgb", title: "Corsair K70 RGB", category: "Clavier", image: "/clavier/clavier-corsair-k70-rgb.jpg", query: "Corsair K70 RGB clavier gaming", amazonUrl: "https://www.amazon.fr/dp/B0B644XK2Y?tag=nexusgamingfr-21", badge: "Best" },
  { id: "clavier-corsair-k95-platinum", title: "Corsair K95 Platinum", category: "Clavier", image: "/clavier/clavier-corsair-k95-platinum.jpg", query: "Corsair K95 Platinum clavier gaming", amazonUrl: "https://www.amazon.fr/dp/B082GRKQYF?tag=nexusgamingfr-21", badge: "Pro" },
  { id: "clavier-steelseries-apex-3", title: "SteelSeries Apex 3", category: "Clavier", image: "/clavier/clavier-steelseries-apex-3.jpg", query: "SteelSeries Apex 3 clavier gaming", amazonUrl: "https://www.amazon.fr/dp/B082Y5XBDW?tag=nexusgamingfr-21", badge: "Budget" },
  { id: "clavier-steelseries-apex-5", title: "SteelSeries Apex 5", category: "Clavier", image: "/clavier/clavier-steelseries-apex-5.jpg", query: "SteelSeries Apex 5 clavier gaming", amazonUrl: "https://www.amazon.fr/dp/B082WHHZFS?tag=nexusgamingfr-21", badge: "Best" },
  { id: "clavier-steelseries-apex-7", title: "SteelSeries Apex 7", category: "Clavier", image: "/clavier/clavier-steelseries-apex-7.jpg", query: "SteelSeries Apex 7 clavier gaming", amazonUrl: "https://www.amazon.fr/dp/B07RXWH4DJ?tag=nexusgamingfr-21", badge: "Pro" },
  { id: "clavier-steelseries-apex-pro", title: "SteelSeries Apex Pro", category: "Clavier", image: "/clavier/clavier-steelseries-apex-pro.jpg", query: "SteelSeries Apex Pro clavier gaming", amazonUrl: "https://www.amazon.fr/dp/B0B2X3FC5L?tag=nexusgamingfr-21", badge: "Pro" },
  { id: "clavier-hyperx-alloy-origins", title: "HyperX Alloy Origins", category: "Clavier", image: "/products/clavier.jpg", query: "HyperX Alloy Origins clavier gaming", amazonUrl: "", badge: "Best" },
  { id: "clavier-hyperx-alloy-fps", title: "HyperX Alloy FPS", category: "Clavier", image: "/clavier/clavier-hyperx-alloy-fps.jpg", query: "HyperX Alloy FPS clavier gaming", amazonUrl: "https://www.amazon.fr/dp/B07G2PY7KH?tag=nexusgamingfr-21", badge: "FPS" },
  { id: "clavier-hyperx-alloy-core-rgb", title: "HyperX Alloy Core RGB", category: "Clavier", image: "/clavier/clavier-hyperx-alloy-core-rgb.jpg", query: "HyperX Alloy Core RGB clavier gaming", amazonUrl: "https://www.amazon.fr/dp/B0971CPVYK?tag=nexusgamingfr-21", badge: "Budget" },
  { id: "clavier-asus-rog-strix-scope", title: "ASUS ROG Strix Scope", category: "Clavier", image: "/clavier/clavier-asus-rog-strix-scope.jpg", query: "ASUS ROG Strix Scope clavier gaming", amazonUrl: "https://www.amazon.fr/dp/B0FH2RGFFP?tag=nexusgamingfr-21", badge: "Pro" },
  { id: "clavier-asus-tuf-gaming-k1", title: "ASUS TUF Gaming K1", category: "Clavier", image: "/clavier/clavier-asus-tuf-gaming-k1.jpg", query: "ASUS TUF Gaming K1 clavier gaming", amazonUrl: "https://www.amazon.fr/dp/B08BX48ZBK?tag=nexusgamingfr-21", badge: "Best" },
  { id: "clavier-roccat-vulcan-120", title: "ROCCAT Vulcan 120", category: "Clavier", image: "/clavier/clavier-roccat-vulcan-120.jpg", query: "ROCCAT Vulcan 120 clavier gaming", amazonUrl: "https://www.amazon.fr/dp/B07DJ596FY?tag=nexusgamingfr-21", badge: "Pro" },
  { id: "clavier-roccat-pyro", title: "ROCCAT Pyro", category: "Clavier", image: "/clavier/clavier-roccat-pyro.jpg", query: "ROCCAT Pyro clavier gaming", amazonUrl: "https://www.amazon.fr/dp/B0932ZZ6XF?tag=nexusgamingfr-21", badge: "Best" },
  { id: "clavier-cooler-master-ck552", title: "Cooler Master CK552", category: "Clavier", image: "/clavier/clavier-cooler-master-ck552.jpg", query: "Cooler Master CK552 clavier gaming", amazonUrl: "https://www.amazon.fr/dp/B07NPZKPH6?tag=nexusgamingfr-21", badge: "Budget" },
  { id: "clavier-msi-vigor-gk50", title: "MSI Vigor GK50", category: "Clavier", image: "/clavier/clavier-msi-vigor-gk50.jpg", query: "MSI Vigor GK50 clavier gaming", amazonUrl: "https://www.amazon.fr/dp/B0CK7BC6RS?tag=nexusgamingfr-21", badge: "Best" },
  { id: "clavier-keychron-k2-wireless", title: "Keychron K2 (wireless)", category: "Clavier", image: "/clavier/clavier-keychron-k2-wireless.jpg", query: "Keychron K2 wireless clavier gaming", amazonUrl: "https://www.amazon.fr/dp/B0G342BZBG?tag=nexusgamingfr-21", badge: "Wireless" },
  { id: "clavier-keychron-k6-compact", title: "Keychron K6 (compact)", category: "Clavier", image: "/clavier/clavier-keychron-k6-compact.jpg", query: "Keychron K6 compact clavier gaming", amazonUrl: "https://www.amazon.fr/dp/B0F9XWDXJT?tag=nexusgamingfr-21", badge: "Compact" },
  { id: "clavier-rk-royal-kludge-wireless", title: "RK Royal Kludge (wireless)", category: "Clavier", image: "/products/clavier.jpg", query: "RK Royal Kludge wireless clavier gaming", amazonUrl: "", badge: "Budget" },
];

/* =========================
   30 CASQUES GAMER
========================= */
const CASQUES_30: AmazonProduct[] = [
  { id: "casque-hyperx-cloud-ii", title: "HyperX Cloud II", category: "Casque", image: "/casque/casque-hyperx-cloud-ii.jpg", query: "HyperX Cloud II casque gaming", amazonUrl: "https://www.amazon.fr/dp/B08NTYB4M7?tag=nexusgamingfr-21", badge: "Best" },
  { id: "casque-hyperx-cloud-alpha", title: "HyperX Cloud Alpha", category: "Casque", image: "/casque/casque-hyperx-cloud-alpha.jpg", query: "HyperX Cloud Alpha casque gaming", amazonUrl: "https://www.amazon.fr/dp/B076GT6XJ9?tag=nexusgamingfr-21", badge: "Best" },
  { id: "casque-hyperx-cloud-stinger", title: "HyperX Cloud Stinger", category: "Casque", image: "/casque/casque-hyperx-cloud-stinger.jpg", query: "HyperX Cloud Stinger casque gaming", amazonUrl: "https://www.amazon.fr/dp/B08DCKP6D4?tag=nexusgamingfr-21", badge: "Budget" },
  { id: "casque-hyperx-cloud-flight-sans-fil", title: "HyperX Cloud Flight (sans fil)", category: "Casque", image: "/casque/casque-hyperx-cloud-flight-sans-fil.jpg", query: "HyperX Cloud Flight sans fil casque gaming", amazonUrl: "https://www.amazon.fr/dp/B0FP1SW8P5?tag=nexusgamingfr-21", badge: "Wireless" },
  { id: "casque-steelseries-arctis-nova-1", title: "SteelSeries Arctis Nova 1", category: "Casque", image: "/casque/casque-steelseries-arctis-nova-1.jpg", query: "SteelSeries Arctis Nova 1 casque gaming", amazonUrl: "https://www.amazon.fr/dp/B0FS7JXWJG?tag=nexusgamingfr-21", badge: "Best" },
  { id: "casque-steelseries-arctis-nova-7", title: "SteelSeries Arctis Nova 7", category: "Casque", image: "/casque/casque-steelseries-arctis-nova-7.jpg", query: "SteelSeries Arctis Nova 7 casque gaming", amazonUrl: "https://www.amazon.fr/dp/B0D4DN21RN?tag=nexusgamingfr-21", badge: "Wireless" },
  { id: "casque-steelseries-arctis-nova-pro", title: "SteelSeries Arctis Nova Pro", category: "Casque", image: "/casque/casque-steelseries-arctis-nova-pro.jpg", query: "SteelSeries Arctis Nova Pro casque gaming", amazonUrl: "https://www.amazon.fr/dp/B09ZLRD7Z9?tag=nexusgamingfr-21", badge: "Pro" },
  { id: "casque-steelseries-arctis-7", title: "SteelSeries Arctis 7", category: "Casque", image: "/products/casque.jpg", query: "SteelSeries Arctis 7 casque gaming", amazonUrl: "", badge: "Wireless" },
  { id: "casque-logitech-g-pro-x", title: "Logitech G Pro X", category: "Casque", image: "/casque/casque-logitech-g-pro-x.jpg", query: "Logitech G Pro X casque gaming", amazonUrl: "https://www.amazon.fr/dp/B07W4DHT95?tag=nexusgamingfr-21", badge: "Pro" },
  { id: "casque-logitech-g733", title: "Logitech G733", category: "Casque", image: "/casque/casque-logitech-g733.jpg", query: "Logitech G733 casque gaming", amazonUrl: "https://www.amazon.fr/dp/B0F1YTF5VJ?tag=nexusgamingfr-21", badge: "Wireless" },
  { id: "casque-logitech-g435", title: "Logitech G435", category: "Casque", image: "/casque/casque-logitech-g435.jpg", query: "Logitech G435 casque gaming", amazonUrl: "https://www.amazon.fr/dp/B09FQBWVT4?tag=nexusgamingfr-21", badge: "Wireless" },
  { id: "casque-corsair-hs35", title: "Corsair HS35", category: "Casque", image: "/casque/casque-corsair-hs35.jpg", query: "Corsair HS35 casque gaming", amazonUrl: "https://www.amazon.fr/dp/B0DTTX55WW?tag=nexusgamingfr-21", badge: "Budget" },
  { id: "casque-corsair-hs60", title: "Corsair HS60", category: "Casque", image: "/casque/casque-corsair-hs60.jpg", query: "Corsair HS60 casque gaming", amazonUrl: "https://www.amazon.fr/dp/B09CLM1LPR?tag=nexusgamingfr-21", badge: "Best" },
  { id: "casque-corsair-hs80", title: "Corsair HS80", category: "Casque", image: "/casque/casque-corsair-hs80.jpg", query: "Corsair HS80 casque gaming", amazonUrl: "https://www.amazon.fr/dp/B0BQFM14HB?tag=nexusgamingfr-21", badge: "Pro" },
  { id: "casque-corsair-void-elite", title: "Corsair VOID Elite", category: "Casque", image: "/casque/casque-corsair-void-elite.jpg", query: "Corsair VOID Elite casque gaming", amazonUrl: "https://www.amazon.fr/dp/B0DYVD72P2?tag=nexusgamingfr-21", badge: "Best" },
  { id: "casque-corsair-virtuoso", title: "Corsair Virtuoso", category: "Casque", image: "/casque/casque-corsair-virtuoso.jpg", query: "Corsair Virtuoso casque gaming", amazonUrl: "https://www.amazon.fr/dp/B07X71T4R6?tag=nexusgamingfr-21", badge: "Pro" },
  { id: "casque-razer-blackshark-v2", title: "Razer BlackShark V2", category: "Casque", image: "/casque/casque-razer-blackshark-v2.jpg", query: "Razer BlackShark V2 casque gaming", amazonUrl: "https://www.amazon.fr/dp/B0CK1V3GR6?tag=nexusgamingfr-21", badge: "Best" },
  { id: "casque-razer-blackshark-v2-pro", title: "Razer BlackShark V2 Pro", category: "Casque", image: "/casque/casque-razer-blackshark-v2-pro.jpg", query: "Razer BlackShark V2 Pro casque gaming", amazonUrl: "https://www.amazon.fr/dp/B09CT58RPX?tag=nexusgamingfr-21", badge: "Pro" },
  { id: "casque-razer-kraken-x", title: "Razer Kraken X", category: "Casque", image: "/products/casque.jpg", query: "Razer Kraken X casque gaming", amazonUrl: "", badge: "Budget" },
  { id: "casque-razer-kraken", title: "Razer Kraken", category: "Casque", image: "/products/casque.jpg", query: "Razer Kraken casque gaming", amazonUrl: "", badge: "Best" },
  { id: "casque-razer-barracuda", title: "Razer Barracuda", category: "Casque", image: "/casque/casque-razer-barracuda.jpg", query: "Razer Barracuda casque gaming", amazonUrl: "https://www.amazon.fr/dp/B0FP2QK2T2?tag=nexusgamingfr-21", badge: "Wireless" },
  { id: "casque-turtle-beach-stealth-500", title: "Turtle Beach Stealth 500", category: "Casque", image: "/casque/casque-turtle-beach-stealth-500.jpg", query: "Turtle Beach Stealth 500 casque gaming", amazonUrl: "https://www.amazon.fr/dp/B0CYWJJLBY?tag=nexusgamingfr-21", badge: "Wireless" },
  { id: "casque-turtle-beach-stealth-600", title: "Turtle Beach Stealth 600", category: "Casque", image: "/casque/casque-turtle-beach-stealth-600.jpg", query: "Turtle Beach Stealth 600 casque gaming", amazonUrl: "https://www.amazon.fr/dp/B0CZX7MB48?tag=nexusgamingfr-21", badge: "Wireless" },
  { id: "casque-turtle-beach-stealth-700", title: "Turtle Beach Stealth 700", category: "Casque", image: "/casque/casque-turtle-beach-stealth-700.jpg", query: "Turtle Beach Stealth 700 casque gaming", amazonUrl: "https://www.amazon.fr/dp/B0DBB38QK1?tag=nexusgamingfr-21", badge: "Pro" },
  { id: "casque-turtle-beach-recon-200", title: "Turtle Beach Recon 200", category: "Casque", image: "/products/casque.jpg", query: "Turtle Beach Recon 200 casque gaming", amazonUrl: "", badge: "Budget" },
  { id: "casque-asus-tuf-h3", title: "ASUS TUF H3", category: "Casque", image: "/casque/casque-asus-tuf-h3.jpg", query: "ASUS TUF H3 casque gaming", amazonUrl: "https://www.amazon.fr/dp/B08XY13X81?tag=nexusgamingfr-21", badge: "Best" },
  { id: "casque-asus-rog-delta", title: "ASUS ROG Delta", category: "Casque", image: "/products/casque.jpg", query: "ASUS ROG Delta casque gaming", amazonUrl: "", badge: "Pro" },
  { id: "casque-jbl-quantum-100", title: "JBL Quantum 100", category: "Casque", image: "/casque/casque-jbl-quantum-100.jpg", query: "JBL Quantum 100 casque gaming", amazonUrl: "https://www.amazon.fr/dp/B084CWCJTW?tag=nexusgamingfr-21", badge: "Budget" },
  { id: "casque-jbl-quantum-810", title: "JBL Quantum 810", category: "Casque", image: "/casque/casque-jbl-quantum-810.jpg", query: "JBL Quantum 810 casque gaming", amazonUrl: "https://www.amazon.fr/dp/B09VB2JMBQ?tag=nexusgamingfr-21", badge: "Pro" },
  { id: "casque-sony-inzone-h7", title: "Sony INZONE H7", category: "Casque", image: "/casque/casque-sony-inzone-h7.jpg", query: "Sony INZONE H7 casque gaming", amazonUrl: "https://www.amazon.fr/dp/B0C6WX2KYM?tag=nexusgamingfr-21", badge: "Pro" },
];

/* =========================
   30 MICROS STREAMING
========================= */
const MICROS_30: AmazonProduct[] = [
  { id: "micro-hyperx-quadcast", title: "HyperX QuadCast", category: "Micro", image: "/micro/micro-hyperx-quadcast.jpg", query: "HyperX QuadCast micro gaming", amazonUrl: "https://www.amazon.fr/dp/B07NZZZ746?tag=nexusgamingfr-21", badge: "Stream" },
  { id: "micro-hyperx-quadcast-s", title: "HyperX QuadCast S", category: "Micro", image: "/micro/micro-hyperx-quadcast-s.jpg", query: "HyperX QuadCast S micro gaming", amazonUrl: "https://www.amazon.fr/dp/B0D9MCK4R8?tag=nexusgamingfr-21", badge: "Stream" },
  { id: "micro-hyperx-solocast", title: "HyperX SoloCast", category: "Micro", image: "/micro/micro-hyperx-solocast.jpg", query: "HyperX SoloCast micro gaming", amazonUrl: "https://www.amazon.fr/dp/B08KFL3SFV?tag=nexusgamingfr-21", badge: "Budget" },
  { id: "micro-elgato-wave-1", title: "Elgato Wave:1", category: "Micro", image: "/micro/micro-elgato-wave-1.jpg", query: "Elgato Wave 1 micro gaming", amazonUrl: "https://www.amazon.fr/dp/B0GGYLFHPS?tag=nexusgamingfr-21", badge: "Stream" },
  { id: "micro-elgato-wave-3", title: "Elgato Wave:3", category: "Micro", image: "/micro/micro-elgato-wave-3.jpg", query: "Elgato Wave 3 micro gaming", amazonUrl: "https://www.amazon.fr/dp/B088HHWC47?tag=nexusgamingfr-21", badge: "Pro" },
  { id: "micro-elgato-wave-dx", title: "Elgato Wave DX", category: "Micro", image: "/micro/micro-elgato-wave-dx.jpg", query: "Elgato Wave DX micro gaming", amazonUrl: "https://www.amazon.fr/dp/B0B8GRCXB6?tag=nexusgamingfr-21", badge: "Pro" },
  { id: "micro-blue-yeti", title: "Blue Yeti", category: "Micro", image: "/products/micro.jpg", query: "Blue Yeti micro gaming", amazonUrl: "", badge: "Best" },
  { id: "micro-blue-yeti-nano", title: "Blue Yeti Nano", category: "Micro", image: "/micro/micro-blue-yeti-nano.jpg", query: "Blue Yeti Nano micro gaming", amazonUrl: "https://www.amazon.fr/dp/B07W5JK3M6?tag=nexusgamingfr-21", badge: "Best" },
  { id: "micro-blue-snowball-ice", title: "Blue Snowball iCE", category: "Micro", image: "/micro/micro-blue-snowball-ice.jpg", query: "Blue Snowball iCE micro gaming", amazonUrl: "https://www.amazon.fr/dp/B006DIA77E?tag=nexusgamingfr-21", badge: "Budget" },
  { id: "micro-fifine-k669b", title: "FIFINE K669B", category: "Micro", image: "/products/micro.jpg", query: "FIFINE K669B micro gaming", amazonUrl: "", badge: "Budget" },
  { id: "micro-fifine-k690", title: "FIFINE K690", category: "Micro", image: "/micro/micro-fifine-k690.jpg", query: "FIFINE K690 micro gaming", amazonUrl: "https://www.amazon.fr/dp/B0CMDB6QK5?tag=nexusgamingfr-21", badge: "Best" },
  { id: "micro-fifine-am8", title: "FIFINE AM8", category: "Micro", image: "/micro/micro-fifine-am8.jpg", query: "FIFINE AM8 micro gaming", amazonUrl: "https://www.amazon.fr/dp/B0CMD9HCN2?tag=nexusgamingfr-21", badge: "Best" },
  { id: "micro-rode-nt-usb", title: "RØDE NT-USB", category: "Micro", image: "/products/micro.jpg", query: "RODE NT USB micro gaming", amazonUrl: "", badge: "Pro" },
  { id: "micro-rode-nt-usb-mini", title: "RØDE NT-USB Mini", category: "Micro", image: "/products/micro.jpg", query: "RODE NT USB Mini micro gaming", amazonUrl: "", badge: "Best" },
  { id: "micro-rode-podmic", title: "RØDE PodMic", category: "Micro", image: "/products/micro.jpg", query: "RODE PodMic micro gaming", amazonUrl: "", badge: "Pro" },
  { id: "micro-shure-mv7", title: "Shure MV7", category: "Micro", image: "/micro/micro-shure-mv7.jpg", query: "Shure MV7 micro gaming", amazonUrl: "https://www.amazon.fr/dp/B0CTJ7PVN1?tag=nexusgamingfr-21", badge: "Pro" },
  { id: "micro-audio-technica-at2020", title: "Audio-Technica AT2020", category: "Micro", image: "/micro/micro-audio-technica-at2020.jpg", query: "Audio Technica AT2020 micro gaming", amazonUrl: "https://www.amazon.fr/dp/B09M49PJ58?tag=nexusgamingfr-21", badge: "Pro" },
  { id: "micro-samson-q2u", title: "Samson Q2U", category: "Micro", image: "/micro/micro-samson-q2u.jpg", query: "Samson Q2U micro gaming", amazonUrl: "https://www.amazon.fr/dp/B0DMFPDMSD?tag=nexusgamingfr-21", badge: "Best" },
  { id: "micro-samson-meteor-mic", title: "Samson Meteor Mic", category: "Micro", image: "/micro/micro-samson-meteor-mic.jpg", query: "Samson Meteor Mic micro gaming", amazonUrl: "https://www.amazon.fr/dp/B004J3X47A?tag=nexusgamingfr-21", badge: "Budget" },
  { id: "micro-maono-au-a04", title: "Maono AU-A04", category: "Micro", image: "/micro/micro-maono-au-a04.jpg", query: "Maono AU A04 micro gaming", amazonUrl: "https://www.amazon.fr/dp/B07GQT8879?tag=nexusgamingfr-21", badge: "Budget" },
  { id: "micro-tonor-tc30", title: "TONOR TC30", category: "Micro", image: "/micro/micro-tonor-tc30.jpg", query: "TONOR TC30 micro gaming", amazonUrl: "https://www.amazon.fr/dp/B08CVP2HXP?tag=nexusgamingfr-21", badge: "Budget" },
  { id: "micro-trust-gxt-232", title: "Trust GXT 232", category: "Micro", image: "/micro/micro-trust-gxt-232.jpg", query: "Trust GXT 232 micro gaming", amazonUrl: "https://www.amazon.fr/dp/B07CZ6LWW4?tag=nexusgamingfr-21", badge: "Budget" },
  { id: "micro-trust-gxt-258", title: "Trust GXT 258", category: "Micro", image: "/micro/micro-trust-gxt-258.jpg", query: "Trust GXT 258 micro gaming", amazonUrl: "https://www.amazon.fr/dp/B08WCM8SS8?tag=nexusgamingfr-21", badge: "Best" },
  { id: "micro-behringer-c-1u", title: "Behringer C-1U", category: "Micro", image: "/products/micro.jpg", query: "Behringer C 1U micro gaming", amazonUrl: "", badge: "Best" },
  { id: "micro-akg-lyra", title: "AKG Lyra", category: "Micro", image: "/products/micro.jpg", query: "AKG Lyra micro gaming", amazonUrl: "", badge: "Best" },
  { id: "micro-nzxt-capsule", title: "NZXT Capsule", category: "Micro", image: "/micro/micro-nzxt-capsule.jpg", query: "NZXT Capsule micro gaming", amazonUrl: "https://www.amazon.fr/dp/B0BYSMYHHY?tag=nexusgamingfr-21", badge: "Best" },
  { id: "micro-razer-seiren-mini", title: "Razer Seiren Mini", category: "Micro", image: "/micro/micro-razer-seiren-mini.jpg", query: "Razer Seiren Mini micro gaming", amazonUrl: "https://www.amazon.fr/dp/B00PADOYP4?tag=nexusgamingfr-21", badge: "Budget" },
  { id: "micro-razer-seiren-x", title: "Razer Seiren X", category: "Micro", image: "/micro/micro-razer-seiren-x.jpg", query: "Razer Seiren X micro gaming", amazonUrl: "https://www.amazon.fr/dp/B0CMTRDWLL?tag=nexusgamingfr-21", badge: "Best" },
  { id: "micro-shure-sm7b", title: "Shure SM7B", category: "Micro", image: "/micro/micro-shure-sm7b.jpg", query: "Shure SM7B micro gaming", amazonUrl: "https://www.amazon.fr/dp/B09Y8GHJ1H?tag=nexusgamingfr-21", badge: "Pro" },
  { id: "micro-rode-wireless-go-stream", title: "RØDE Wireless GO (stream)", category: "Micro", image: "/products/micro.jpg", query: "RODE Wireless GO stream micro", amazonUrl: "", badge: "Pro" },
];

/* =========================
   30 WEBCAMS
========================= */
const WEBCAMS_30: AmazonProduct[] = [
  { id: "webcam-logitech-c270", title: "Logitech C270", category: "Webcam", image: "/webcam/webcam-logitech-c270.jpg", query: "Logitech C270 webcam", amazonUrl: "https://www.amazon.fr/dp/B01BGBJ8Y0?tag=nexusgamingfr-21", badge: "Budget" },
  { id: "webcam-logitech-c505", title: "Logitech C505", category: "Webcam", image: "/products/webcam.jpg", query: "Logitech C505 webcam", amazonUrl: "", badge: "Budget" },
  { id: "webcam-logitech-c920-hd-pro", title: "Logitech C920 HD Pro", category: "Webcam", image: "/webcam/webcam-logitech-c920-hd-pro.jpg", query: "Logitech C920 HD Pro webcam", amazonUrl: "https://www.amazon.fr/dp/B0BJ5P51NT?tag=nexusgamingfr-21", badge: "Best" },
  { id: "webcam-logitech-c922-pro-stream", title: "Logitech C922 Pro Stream", category: "Webcam", image: "/webcam/webcam-logitech-c922-pro-stream.jpg", query: "Logitech C922 Pro Stream webcam", amazonUrl: "https://www.amazon.fr/dp/B01L6L52K4?tag=nexusgamingfr-21", badge: "Stream" },
  { id: "webcam-logitech-c930e", title: "Logitech C930e", category: "Webcam", image: "/webcam/webcam-logitech-c930e.jpg", query: "Logitech C930e webcam", amazonUrl: "https://www.amazon.fr/dp/B00CES5A60?tag=nexusgamingfr-21", badge: "Pro" },
  { id: "webcam-logitech-streamcam", title: "Logitech StreamCam", category: "Webcam", image: "/webcam/webcam-logitech-streamcam.jpg", query: "Logitech StreamCam webcam", amazonUrl: "https://www.amazon.fr/dp/B07W4DHNBF?tag=nexusgamingfr-21", badge: "Stream" },
  { id: "webcam-logitech-brio-4k", title: "Logitech Brio 4K", category: "Webcam", image: "/webcam/webcam-logitech-brio-4k.jpg", query: "Logitech Brio 4K webcam", amazonUrl: "https://www.amazon.fr/dp/B0CX8S8JLX?tag=nexusgamingfr-21", badge: "Pro" },
  { id: "webcam-razer-kiyo", title: "Razer Kiyo", category: "Webcam", image: "/products/webcam.jpg", query: "Razer Kiyo webcam", amazonUrl: "", badge: "Stream" },
  { id: "webcam-razer-kiyo-x", title: "Razer Kiyo X", category: "Webcam", image: "/products/webcam.jpg", query: "Razer Kiyo X webcam", amazonUrl: "", badge: "Best" },
  { id: "webcam-razer-kiyo-pro", title: "Razer Kiyo Pro", category: "Webcam", image: "/webcam/webcam-razer-kiyo-pro.jpg", query: "Razer Kiyo Pro webcam", amazonUrl: "https://www.amazon.fr/dp/B0CSZ5FMZZ?tag=nexusgamingfr-21", badge: "Pro" },
  { id: "webcam-elgato-facecam", title: "Elgato Facecam", category: "Webcam", image: "/webcam/webcam-elgato-facecam.jpg", query: "Elgato Facecam webcam", amazonUrl: "https://www.amazon.fr/dp/B0973DV11T?tag=nexusgamingfr-21", badge: "Pro" },
  { id: "webcam-elgato-facecam-pro", title: "Elgato Facecam Pro", category: "Webcam", image: "/webcam/webcam-elgato-facecam-pro.jpg", query: "Elgato Facecam Pro webcam", amazonUrl: "https://www.amazon.fr/dp/B0BJL7Q3SR?tag=nexusgamingfr-21", badge: "Pro" },
  { id: "webcam-microsoft-lifecam-hd-3000", title: "Microsoft LifeCam HD-3000", category: "Webcam", image: "/webcam/webcam-microsoft-lifecam-hd-3000.jpg", query: "Microsoft LifeCam HD 3000 webcam", amazonUrl: "https://www.amazon.fr/dp/B004JRJVGE?tag=nexusgamingfr-21", badge: "Budget" },
  { id: "webcam-avermedia-pw313", title: "AverMedia PW313", category: "Webcam", image: "/webcam/webcam-avermedia-pw313.jpg", query: "AverMedia PW313 webcam", amazonUrl: "https://www.amazon.fr/dp/B07W1X93HW?tag=nexusgamingfr-21", badge: "Best" },
  { id: "webcam-avermedia-pw513", title: "AverMedia PW513", category: "Webcam", image: "/webcam/webcam-avermedia-pw513.jpg", query: "AverMedia PW513 webcam", amazonUrl: "https://www.amazon.fr/dp/B08LVNYYZH?tag=nexusgamingfr-21", badge: "Pro" },
  { id: "webcam-nexigo-n930af", title: "NexiGo N930AF", category: "Webcam", image: "/webcam/webcam-nexigo-n930af.jpg", query: "NexiGo N930AF webcam", amazonUrl: "https://www.amazon.fr/dp/B08931JJLV?tag=nexusgamingfr-21", badge: "Best" },
  { id: "webcam-anker-powerconf-c200", title: "Anker PowerConf C200", category: "Webcam", image: "/webcam/webcam-anker-powerconf-c200.jpg", query: "Anker PowerConf C200 webcam", amazonUrl: "https://www.amazon.fr/dp/B09MFMTMPD?tag=nexusgamingfr-21", badge: "Best" },
  { id: "webcam-creative-live-cam-sync-1080p", title: "Creative Live! Cam Sync 1080p", category: "Webcam", image: "/webcam/webcam-creative-live-cam-sync-1080p.jpg", query: "Creative Live Cam Sync 1080p webcam", amazonUrl: "https://www.amazon.fr/dp/B08BWTX81H?tag=nexusgamingfr-21", badge: "Budget" },
  { id: "webcam-obsbot-meet-4k", title: "Obsbot Meet 4K", category: "Webcam", image: "/products/webcam.jpg", query: "Obsbot Meet 4K webcam", amazonUrl: "", badge: "Pro" },
  { id: "webcam-obsbot-tiny-2", title: "Obsbot Tiny 2", category: "Webcam", image: "/products/webcam.jpg", query: "Obsbot Tiny 2 webcam", amazonUrl: "", badge: "Pro" },
  { id: "webcam-insta360-link", title: "Insta360 Link", category: "Webcam", image: "/webcam/webcam-insta360-link.jpg", query: "Insta360 Link webcam", amazonUrl: "https://www.amazon.fr/dp/B0DDTH3HX8?tag=nexusgamingfr-21", badge: "Pro" },
  { id: "webcam-dell-ultrasharp-webcam", title: "Dell UltraSharp Webcam", category: "Webcam", image: "/webcam/webcam-dell-ultrasharp-webcam.jpg", query: "Dell UltraSharp Webcam", amazonUrl: "https://www.amazon.fr/dp/B098R165KF?tag=nexusgamingfr-21", badge: "Pro" },
  { id: "webcam-hp-webcam-1080p", title: "HP Webcam 1080p", category: "Webcam", image: "/products/webcam.jpg", query: "HP Webcam 1080p", amazonUrl: "", badge: "Budget" },
  { id: "webcam-lenovo-300-fhd-webcam", title: "Lenovo 300 FHD Webcam", category: "Webcam", image: "/webcam/webcam-lenovo-300-fhd-webcam.jpg", query: "Lenovo 300 FHD Webcam", amazonUrl: "https://www.amazon.fr/dp/B0DDLGZJLZ?tag=nexusgamingfr-21", badge: "Budget" },
  { id: "webcam-trust-tyro", title: "Trust Tyro", category: "Webcam", image: "/products/webcam.jpg", query: "Trust Tyro webcam", amazonUrl: "", badge: "Budget" },
  { id: "webcam-aukey-webcam-1080p", title: "Aukey Webcam 1080p", category: "Webcam", image: "/webcam/webcam-aukey-webcam-1080p.jpg", query: "Aukey Webcam 1080p", amazonUrl: "https://www.amazon.fr/dp/B0DSKDRJLW?tag=nexusgamingfr-21", badge: "Budget" },
  { id: "webcam-ugreen-webcam-1080p", title: "Ugreen Webcam 1080p", category: "Webcam", image: "/products/webcam.jpg", query: "Ugreen Webcam 1080p", amazonUrl: "", badge: "Budget" },
  { id: "webcam-razer-kiyo-pro-ultra", title: "Razer Kiyo Pro Ultra", category: "Webcam", image: "/webcam/webcam-razer-kiyo-pro-ultra.jpg", query: "Razer Kiyo Pro Ultra webcam", amazonUrl: "https://www.amazon.fr/dp/B0CSZ5FMZZ?tag=nexusgamingfr-21", badge: "Pro" },
  { id: "webcam-logitech-brio-500", title: "Logitech Brio 500", category: "Webcam", image: "/webcam/webcam-logitech-brio-500.jpg", query: "Logitech Brio 500 webcam", amazonUrl: "https://www.amazon.fr/dp/B07W5JKKFJ?tag=nexusgamingfr-21", badge: "Best" },
  { id: "webcam-logitech-c615", title: "Logitech C615", category: "Webcam", image: "/webcam/webcam-logitech-c615.jpg", query: "Logitech C615 webcam", amazonUrl: "https://www.amazon.fr/dp/B00NM9QIPW?tag=nexusgamingfr-21", badge: "Budget" },
];

/* =========================
   30 CHAISES
========================= */
const CHAISES_30: AmazonProduct[] = [
  { id: "chaise-gtplayer-chaise-gaming", title: "GTPLAYER chaise gaming", category: "Chaise", image: "/products/chaise.jpg", query: "GTPLAYER chaise gaming", amazonUrl: "", badge: "Best" },
  { id: "chaise-dowinx-chaise-gaming", title: "Dowinx chaise gaming", category: "Chaise", image: "/products/chaise.jpg", query: "Dowinx chaise gaming", amazonUrl: "", badge: "Confort" },
  { id: "chaise-autofull-chaise-gaming", title: "AutoFull chaise gaming", category: "Chaise", image: "/products/chaise.jpg", query: "AutoFull chaise gaming", amazonUrl: "", badge: "Best" },
  { id: "chaise-dxracer-formula", title: "DXRacer Formula", category: "Chaise", image: "/chaise/chaise-dxracer-formula.jpg", query: "DXRacer Formula chaise gaming", amazonUrl: "https://www.amazon.fr/dp/B0DK785TVZ?tag=nexusgamingfr-21", badge: "Pro" },
  { id: "chaise-dxracer-racing", title: "DXRacer Racing", category: "Chaise", image: "/products/chaise.jpg", query: "DXRacer Racing chaise gaming", amazonUrl: "", badge: "Pro" },
  { id: "chaise-noblechairs-hero", title: "noblechairs HERO", category: "Chaise", image: "/chaise/chaise-noblechairs-hero.jpg", query: "noblechairs HERO chaise gaming", amazonUrl: "https://www.amazon.fr/dp/B0778HTXVF?tag=nexusgamingfr-21", badge: "Pro" },
  { id: "chaise-noblechairs-epic", title: "noblechairs EPIC", category: "Chaise", image: "/chaise/chaise-noblechairs-epic.jpg", query: "noblechairs EPIC chaise gaming", amazonUrl: "https://www.amazon.fr/dp/B0778HTXVF?tag=nexusgamingfr-21", badge: "Pro" },
  { id: "chaise-secretlab-titan-evo", title: "Secretlab TITAN Evo", category: "Chaise", image: "/chaise/chaise-secretlab-titan-evo.jpg", query: "Secretlab TITAN Evo chaise gaming", amazonUrl: "https://www.amazon.fr/dp/B0B3RH59X8?tag=nexusgamingfr-21", badge: "Pro" },
  { id: "chaise-andaseat-kaiser", title: "AndaSeat Kaiser", category: "Chaise", image: "/chaise/chaise-andaseat-kaiser.jpg", query: "AndaSeat Kaiser chaise gaming", amazonUrl: "https://www.amazon.fr/dp/B0DD8L771B?tag=nexusgamingfr-21", badge: "Pro" },
  { id: "chaise-andaseat-dark-knight", title: "AndaSeat Dark Knight", category: "Chaise", image: "/products/chaise.jpg", query: "AndaSeat Dark Knight chaise gaming", amazonUrl: "", badge: "Pro" },
  { id: "chaise-razer-iskur", title: "Razer Iskur", category: "Chaise", image: "/products/chaise.jpg", query: "Razer Iskur chaise gaming", amazonUrl: "", badge: "Pro" },
  { id: "chaise-razer-enki", title: "Razer Enki", category: "Chaise", image: "/products/chaise.jpg", query: "Razer Enki chaise gaming", amazonUrl: "", badge: "Pro" },
  { id: "chaise-corsair-t3-rush", title: "Corsair T3 RUSH", category: "Chaise", image: "/chaise/chaise-corsair-t3-rush.jpg", query: "Corsair T3 RUSH chaise gaming", amazonUrl: "https://www.amazon.fr/dp/B0BMC359CT?tag=nexusgamingfr-21", badge: "Best" },
  { id: "chaise-corsair-tc100-relaxed", title: "Corsair TC100 RELAXED", category: "Chaise", image: "/chaise/chaise-corsair-tc100-relaxed.jpg", query: "Corsair TC100 RELAXED chaise gaming", amazonUrl: "https://www.amazon.fr/dp/B0BN7FDFVP?tag=nexusgamingfr-21", badge: "Best" },
  { id: "chaise-akracing-core-series", title: "AKRacing Core Series", category: "Chaise", image: "/chaise/chaise-akracing-core-series.jpg", query: "AKRacing Core Series chaise gaming", amazonUrl: "https://www.amazon.fr/dp/B088CL7VJL?tag=nexusgamingfr-21", badge: "Pro" },
  { id: "chaise-akracing-masters-series", title: "AKRacing Masters Series", category: "Chaise", image: "/products/chaise.jpg", query: "AKRacing Masters Series chaise gaming", amazonUrl: "", badge: "Pro" },
  { id: "chaise-cougar-armor", title: "Cougar Armor", category: "Chaise", image: "/chaise/chaise-cougar-armor.jpg", query: "Cougar Armor chaise gaming", amazonUrl: "https://www.amazon.fr/dp/B0DBQRHPTL?tag=nexusgamingfr-21", badge: "Best" },
  { id: "chaise-cougar-explore", title: "Cougar Explore", category: "Chaise", image: "/chaise/chaise-cougar-explore.jpg", query: "Cougar Explore chaise gaming", amazonUrl: "https://www.amazon.fr/dp/B0GL4J4HY6?tag=nexusgamingfr-21", badge: "Best" },
  { id: "chaise-vertagear-sl4000", title: "Vertagear SL4000", category: "Chaise", image: "/products/chaise.jpg", query: "Vertagear SL4000 chaise gaming", amazonUrl: "", badge: "Pro" },
  { id: "chaise-vertagear-pl4500", title: "Vertagear PL4500", category: "Chaise", image: "/products/chaise.jpg", query: "Vertagear PL4500 chaise gaming", amazonUrl: "", badge: "Pro" },
  { id: "chaise-gtracing-chaise-gaming", title: "GTRacing chaise gaming", category: "Chaise", image: "/products/chaise.jpg", query: "GTRacing chaise gaming", amazonUrl: "", badge: "Best" },
  { id: "chaise-homall-chaise-gaming", title: "Homall chaise gaming", category: "Chaise", image: "/products/chaise.jpg", query: "Homall chaise gaming", amazonUrl: "", badge: "Budget" },
  { id: "chaise-hbada-chaise-gaming", title: "Hbada chaise gaming", category: "Chaise", image: "/products/chaise.jpg", query: "Hbada chaise gaming", amazonUrl: "", badge: "Budget" },
  { id: "chaise-respawn-110", title: "RESPAWN 110", category: "Chaise", image: "/products/chaise.jpg", query: "RESPAWN 110 chaise gaming", amazonUrl: "", badge: "Best" },
  { id: "chaise-respawn-205", title: "RESPAWN 205", category: "Chaise", image: "/products/chaise.jpg", query: "RESPAWN 205 chaise gaming", amazonUrl: "", badge: "Best" },
  { id: "chaise-x-rocker-chaise-gaming", title: "X Rocker chaise gaming", category: "Chaise", image: "/chaise/chaise-x-rocker-chaise-gaming.jpg", query: "X Rocker chaise gaming", amazonUrl: "https://www.amazon.fr/dp/B002YMWUGE?tag=nexusgamingfr-21", badge: "Immersif" },
  { id: "chaise-brazen-chaise-gaming", title: "BraZen chaise gaming", category: "Chaise", image: "/chaise/chaise-brazen-chaise-gaming.jpg", query: "BraZen chaise gaming", amazonUrl: "https://www.amazon.fr/dp/B087749MRQ?tag=nexusgamingfr-21", badge: "Immersif" },
  { id: "chaise-nitro-concepts-s300", title: "Nitro Concepts S300", category: "Chaise", image: "/chaise/chaise-nitro-concepts-s300.jpg", query: "Nitro Concepts S300 chaise gaming", amazonUrl: "https://www.amazon.fr/dp/B07PW89PXM?tag=nexusgamingfr-21", badge: "Pro" },
  { id: "chaise-sihoo-chaise-ergonomique", title: "Sihoo chaise ergonomique", category: "Chaise", image: "/products/chaise.jpg", query: "Sihoo chaise ergonomique gaming", amazonUrl: "", badge: "Ergo" },
  { id: "chaise-songmics-chaise-bureau", title: "Songmics chaise bureau", category: "Chaise", image: "/products/chaise.jpg", query: "Songmics chaise bureau gaming", amazonUrl: "", badge: "Budget" },
];

/* =========================
   30 BUREAUX
========================= */
const BUREAUX_30: AmazonProduct[] = [
  { id: "bureau-arozzi-arena-grand-tapis", title: "Arozzi Arena (grand tapis)", category: "Bureau", image: "/bureau/bureau-arozzi-arena-grand-tapis.jpg", query: "Arozzi Arena bureau gaming", amazonUrl: "https://www.amazon.fr/dp/B072MLNQXK?tag=nexusgamingfr-21", badge: "Pro" },
  { id: "bureau-arozzi-arena-leggero", title: "Arozzi Arena Leggero", category: "Bureau", image: "/bureau/bureau-arozzi-arena-leggero.jpg", query: "Arozzi Arena Leggero bureau gaming", amazonUrl: "https://www.amazon.fr/dp/B07F1K6GKB?tag=nexusgamingfr-21", badge: "Pro" },
  { id: "bureau-secretlab-magnus", title: "Secretlab MAGNUS", category: "Bureau", image: "/bureau/bureau-secretlab-magnus.jpg", query: "Secretlab MAGNUS bureau gaming", amazonUrl: "https://www.amazon.fr/dp/B0FW4TPYJN?tag=nexusgamingfr-21", badge: "Pro" },
  { id: "bureau-eureka-ergonomic-bureau-gaming", title: "Eureka Ergonomic bureau gaming", category: "Bureau", image: "/bureau/bureau-eureka-ergonomic-bureau-gaming.jpg", query: "Eureka Ergonomic bureau gaming", amazonUrl: "https://www.amazon.fr/dp/B0B4NFB7J9?tag=nexusgamingfr-21", badge: "Pro" },
  { id: "bureau-cubicubi-bureau-gaming", title: "CubiCubi bureau gaming", category: "Bureau", image: "/products/bureau.jpg", query: "CubiCubi bureau gaming", amazonUrl: "", badge: "Budget" },
  { id: "bureau-mr-ironstone-bureau-gaming", title: "Mr IRONSTONE bureau gaming", category: "Bureau", image: "/products/bureau.jpg", query: "Mr IRONSTONE bureau gaming", amazonUrl: "", badge: "Best" },
  { id: "bureau-seven-warrior-bureau-gaming-rgb", title: "Seven Warrior bureau gaming RGB", category: "Bureau", image: "/products/bureau.jpg", query: "Seven Warrior bureau gaming RGB", amazonUrl: "", badge: "RGB" },
  { id: "bureau-vitesse-bureau-gaming", title: "Vitesse bureau gaming", category: "Bureau", image: "/bureau/bureau-vitesse-bureau-gaming.jpg", query: "Vitesse bureau gaming", amazonUrl: "https://www.amazon.fr/dp/B0FNNBPK8Z?tag=nexusgamingfr-21", badge: "Best" },
  { id: "bureau-rolanstar-bureau-gaming", title: "Rolanstar bureau gaming", category: "Bureau", image: "/products/bureau.jpg", query: "Rolanstar bureau gaming", amazonUrl: "", badge: "Best" },
  { id: "bureau-coleshome-bureau-gaming", title: "Coleshome bureau gaming", category: "Bureau", image: "/products/bureau.jpg", query: "Coleshome bureau gaming", amazonUrl: "", badge: "Budget" },
  { id: "bureau-greenforest-bureau-gaming", title: "GreenForest bureau gaming", category: "Bureau", image: "/bureau/bureau-greenforest-bureau-gaming.jpg", query: "GreenForest bureau gaming", amazonUrl: "https://www.amazon.fr/dp/B09TW8Z7R5?tag=nexusgamingfr-21", badge: "Budget" },
  { id: "bureau-homall-bureau-gaming", title: "Homall bureau gaming", category: "Bureau", image: "/products/bureau.jpg", query: "Homall bureau gaming", amazonUrl: "", badge: "Budget" },
  { id: "bureau-motpk-bureau-gaming", title: "MOTPK bureau gaming", category: "Bureau", image: "/products/bureau.jpg", query: "MOTPK bureau gaming", amazonUrl: "", badge: "Best" },
  { id: "bureau-sedeta-bureau-gaming-rangements", title: "Sedeta bureau gaming (rangements)", category: "Bureau", image: "/products/bureau.jpg", query: "Sedeta bureau gaming rangements", amazonUrl: "", badge: "Best" },
  { id: "bureau-need-bureau-gaming", title: "Need bureau gaming", category: "Bureau", image: "/products/bureau.jpg", query: "Need bureau gaming", amazonUrl: "", badge: "Budget" },
  { id: "bureau-desino-bureau-gaming", title: "DESINO bureau gaming", category: "Bureau", image: "/products/bureau.jpg", query: "DESINO bureau gaming", amazonUrl: "", badge: "Best" },
  { id: "bureau-atlantic-bureau-gaming", title: "Atlantic bureau gaming", category: "Bureau", image: "/bureau/bureau-atlantic-bureau-gaming.jpg", query: "Atlantic bureau gaming", amazonUrl: "https://www.amazon.fr/dp/B0BWJC3LRL?tag=nexusgamingfr-21", badge: "Budget" },
  { id: "bureau-respawn-bureau-gaming", title: "RESPAWN bureau gaming", category: "Bureau", image: "/bureau/bureau-respawn-bureau-gaming.jpg", query: "RESPAWN bureau gaming", amazonUrl: "https://www.amazon.fr/dp/B09V897Z93?tag=nexusgamingfr-21", badge: "Pro" },
  { id: "bureau-mars-gaming-bureau-gaming", title: "Mars Gaming bureau gaming", category: "Bureau", image: "/products/bureau.jpg", query: "Mars Gaming bureau gaming", amazonUrl: "", badge: "Budget" },
  { id: "bureau-odk-bureau-gaming", title: "ODK bureau gaming", category: "Bureau", image: "/bureau/bureau-odk-bureau-gaming.jpg", query: "ODK bureau gaming", amazonUrl: "https://www.amazon.fr/dp/B0CYZBLFGC?tag=nexusgamingfr-21", badge: "Best" },
  { id: "bureau-bureau-gaming-en-l-angle", title: "Bureau gaming en L (angle)", category: "Bureau", image: "/products/bureau.jpg", query: "Bureau gaming en L angle", amazonUrl: "", badge: "Setup" },
  { id: "bureau-bureau-assis-debout-electrique", title: "Bureau assis-debout électrique", category: "Bureau", image: "/products/bureau.jpg", query: "Bureau assis debout electrique gaming", amazonUrl: "", badge: "Pro" },
  { id: "bureau-flexispot-bureau-electrique", title: "FlexiSpot bureau électrique", category: "Bureau", image: "/products/bureau.jpg", query: "FlexiSpot bureau electrique gaming", amazonUrl: "", badge: "Pro" },
  { id: "bureau-sanodesk-bureau-electrique", title: "SANODESK bureau électrique", category: "Bureau", image: "/products/bureau.jpg", query: "SANODESK bureau electrique gaming", amazonUrl: "", badge: "Pro" },
  { id: "bureau-fezibo-bureau-assis-debout", title: "Fezibo bureau assis-debout", category: "Bureau", image: "/products/bureau.jpg", query: "Fezibo bureau assis debout gaming", amazonUrl: "", badge: "Pro" },
  { id: "bureau-support-ecran-double", title: "Support écran double", category: "Bureau", image: "/products/bureau.jpg", query: "Support ecran double bureau gaming", amazonUrl: "", badge: "Access" },
  { id: "bureau-support-ecran-simple", title: "Support écran simple", category: "Bureau", image: "/products/bureau.jpg", query: "Support ecran simple bureau gaming", amazonUrl: "", badge: "Access" },
  { id: "bureau-support-pc-tour-sous-bureau", title: "Support PC tour sous bureau", category: "Bureau", image: "/products/bureau.jpg", query: "Support PC tour sous bureau gaming", amazonUrl: "", badge: "Access" },
  { id: "bureau-goulotte-passe-cables-bureau", title: "Goulotte passe-câbles bureau", category: "Bureau", image: "/products/bureau.jpg", query: "Goulotte passe cables bureau gaming", amazonUrl: "", badge: "Access" },
  { id: "bureau-bras-ecran-monitor-arm-gaming", title: "Bras écran (monitor arm) gaming", category: "Bureau", image: "/products/bureau.jpg", query: "Bras ecran monitor arm gaming", amazonUrl: "", badge: "Access" },
];

const PRODUCT_RECOMMENDATIONS: Partial<Record<string, string>> = {
  "aoc-24g4xe":
    "On recommande cet écran pour sa fréquence de 180Hz très fluide, idéale pour les jeux FPS et compétitifs.",
  "aoc-c27g4zxe":
    "Cet écran incurvé est intéressant pour les joueurs qui cherchent plus d’immersion dans leur setup gaming.",
  "samsung-odyssey-g3":
    "On recommande cet écran pour son bon rapport qualité/prix et sa fluidité adaptée au gaming.",
  "samsung-odyssey-g5":
    "Cet écran Odyssey est intéressant pour les joueurs qui veulent une dalle immersive et performante.",
  "samsung-odyssey-g7":
    "On recommande cet écran pour les joueurs exigeants qui veulent une fluidité et une immersion élevées.",
  "lg-ultragear-24g411a":
    "Cet écran UltraGear est un choix solide pour améliorer la fluidité et la réactivité dans un setup gaming.",
  "lg-ultragear-27gr75q":
    "On recommande cet écran pour son bon équilibre entre confort visuel, fluidité et polyvalence gaming.",
  "lg-ultragear-oled":
    "Cet écran OLED est particulièrement intéressant pour ceux qui veulent un rendu visuel plus premium et réactif.",
  "asus-tuf-24":
    "On recommande cet écran ASUS TUF pour sa simplicité, sa fluidité et son bon positionnement pour le gaming.",
  "asus-tuf-vg27aq":
    "Cet écran est un bon choix pour les joueurs qui veulent monter en gamme sur un setup gaming plus sérieux.",
  "asus-rog-oled":
    "On recommande cet écran ROG OLED pour un setup haut de gamme orienté performances et qualité d’image.",
  "msi-g2412":
    "Cet écran MSI est intéressant pour les joueurs qui cherchent un modèle accessible et efficace au quotidien.",
  "msi-mag-275qf":
    "On recommande cet écran pour son bon potentiel dans un setup gaming moderne et polyvalent.",
  "msi-mag274qrf":
    "Cet écran MSI est un très bon choix pour les joueurs qui veulent une image plus propre et réactive.",
  "benq-xl2411k":
    "On recommande cet écran ZOWIE pour les joueurs compétitifs qui privilégient la réactivité avant tout.",
  "benq-xl2540k":
    "Cet écran est particulièrement intéressant pour les FPS et les joueurs qui veulent un affichage ultra fluide.",
  "benq-ex2510s":
    "On recommande cet écran pour son bon compromis entre fluidité, confort et usage gaming quotidien.",
  "gigabyte-g24f":
    "Cet écran est un choix solide pour améliorer la fluidité de jeu sans viser un budget trop élevé.",
  "gigabyte-m27q":
    "On recommande cet écran pour les setups plus ambitieux qui veulent plus d’espace et de confort visuel.",
  "alienware-aw2523hf":
    "Cet écran Alienware est pensé pour les joueurs qui veulent une expérience rapide et clairement orientée e-sport.",

  "logitech-g-pro-x-superlight":
    "Cette souris est très appréciée des joueurs FPS pour sa précision, sa légèreté et sa fiabilité.",
  "logitech-g-pro-x-superlight-2":
    "On recommande cette version pour ceux qui veulent une souris gaming premium orientée performance.",
  "logitech-g502-hero":
    "Cette souris reste une référence pour les joueurs qui veulent beaucoup de contrôle et une excellente prise en main.",
  "logitech-g305-lightspeed":
    "On recommande cette souris pour son format simple, sans fil, efficace et accessible.",
  "logitech-g703-lightspeed":
    "Cette souris est intéressante pour les joueurs qui veulent du confort avec la liberté du sans-fil.",
  "logitech-g203":
    "On recommande cette souris pour les petits budgets qui veulent tout de même une vraie souris gaming.",
  "razer-deathadder-essential":
    "Cette souris est un bon point d’entrée pour les joueurs qui veulent une forme confortable et une bonne précision.",
  "razer-deathadder-v3":
    "On recommande cette souris pour les joueurs exigeants qui veulent un modèle taillé pour la performance.",
  "razer-viper-mini":
    "Cette souris est très intéressante pour les joueurs qui aiment les modèles compacts et rapides.",
  "razer-viper-v2-pro":
    "On recommande cette souris pour son orientation compétitive et sa réactivité très convaincante.",
  "razer-viper-v3-hyperspeed":
    "Cette souris est un bon choix pour les joueurs qui veulent vitesse, mobilité et très bonne réactivité.",
  "razer-basilisk-v3":
    "On recommande cette souris pour sa polyvalence et son confort sur de longues sessions.",
  "razer-basilisk-ultimate":
    "Cette souris est intéressante pour ceux qui veulent un modèle gaming premium plus complet.",
  "razer-orochi-v2":
    "On recommande cette souris pour son format compact, pratique et agréable à utiliser.",
  "razer-naga-mmo":
    "Cette souris est particulièrement adaptée aux joueurs MMO qui ont besoin de nombreux boutons.",

  "clavier-razer-huntsman-mini-60":
    "On recommande ce clavier compact pour les joueurs FPS qui veulent libérer de la place sur le bureau.",
  "clavier-razer-huntsman-v2":
    "Ce clavier est intéressant pour ceux qui veulent une frappe rapide et une vraie sensation premium.",
  "clavier-razer-blackwidow-v3":
    "On recommande ce clavier pour son bon équilibre entre style, confort et efficacité en jeu.",
  "clavier-razer-blackwidow-v4":
    "Ce clavier est un très bon choix pour les joueurs qui veulent monter en gamme sur leur setup.",
  "clavier-razer-ornata-v3":
    "On recommande ce clavier pour les joueurs qui cherchent une solution plus accessible et agréable au quotidien.",
  "clavier-logitech-g-pro-x-tkl":
    "Ce clavier est particulièrement adapté aux setups orientés performance et e-sport.",
  "clavier-logitech-g915-tkl":
    "On recommande ce clavier pour ceux qui veulent un modèle sans fil, propre et haut de gamme.",
  "clavier-logitech-g213-prodigy":
    "Ce clavier est intéressant pour débuter avec un setup gaming plus confortable sans trop dépenser.",
  "clavier-logitech-g413":
    "On recommande ce clavier pour sa simplicité, sa fiabilité et sa bonne expérience de frappe.",
  "clavier-corsair-k70-rgb":
    "Ce clavier reste une valeur sûre pour les joueurs qui veulent un modèle gaming reconnu et efficace.",

  "casque-hyperx-cloud-ii":
    "On recommande ce casque pour son confort, sa réputation solide et son usage très agréable en jeu.",
  "casque-hyperx-cloud-alpha":
    "Ce casque est un très bon choix pour les joueurs qui veulent un son convaincant et un bon confort.",
  "casque-hyperx-cloud-stinger":
    "On recommande ce casque pour les petits budgets qui veulent une expérience gaming correcte et simple.",
  "casque-hyperx-cloud-flight-sans-fil":
    "Ce casque est intéressant pour ceux qui veulent jouer sans câble et garder un bon confort.",
  "casque-steelseries-arctis-nova-1":
    "On recommande ce casque pour son bon équilibre entre confort, son et utilisation gaming.",
  "casque-steelseries-arctis-nova-7":
    "Ce casque est un excellent choix pour ceux qui veulent une solution sans fil polyvalente.",
  "casque-steelseries-arctis-nova-pro":
    "On recommande ce casque pour les setups gaming haut de gamme orientés confort et qualité audio.",
  "casque-logitech-g-pro-x":
    "Ce casque est intéressant pour les joueurs qui veulent un modèle gaming connu, sérieux et efficace.",
  "casque-logitech-g733":
    "On recommande ce casque pour sa liberté sans fil et son côté pratique sur de longues sessions.",
  "casque-logitech-g435":
    "Ce casque est un bon choix pour ceux qui veulent quelque chose de léger et simple à utiliser.",

  "micro-hyperx-quadcast":
    "On recommande ce micro pour les joueurs et créateurs qui veulent une voix plus propre et plus nette.",
  "micro-hyperx-quadcast-s":
    "Ce micro est particulièrement intéressant pour un setup stream plus travaillé et plus esthétique.",
  "micro-hyperx-solocast":
    "On recommande ce micro pour ceux qui veulent un modèle simple, pratique et accessible.",
  "micro-elgato-wave-1":
    "Ce micro est un bon choix pour démarrer un setup stream ou gaming vocal proprement.",
  "micro-elgato-wave-3":
    "On recommande ce micro pour ceux qui veulent une solution sérieuse pour le stream et la voix.",
  "micro-shure-mv7":
    "Ce micro est très intéressant pour les créateurs qui veulent une voix plus propre et plus professionnelle.",
  "micro-shure-sm7b":
    "On recommande ce micro pour les setups premium orientés création de contenu et streaming avancé.",

  "webcam-logitech-c270":
    "On recommande cette webcam pour les petits budgets qui veulent une image simple mais suffisante.",
  "webcam-logitech-c920-hd-pro":
    "Cette webcam reste une référence pour ceux qui veulent une image fiable et propre en stream ou visio.",
  "webcam-logitech-c922-pro-stream":
    "On recommande cette webcam pour les créateurs et joueurs qui veulent une solution pensée pour le stream.",
  "webcam-logitech-streamcam":
    "Cette webcam est intéressante pour améliorer clairement la qualité vidéo d’un setup gaming ou créateur.",
  "webcam-logitech-brio-4k":
    "On recommande cette webcam pour ceux qui veulent une image plus premium et plus détaillée.",
  "webcam-razer-kiyo-pro":
    "Cette webcam est un bon choix pour les joueurs qui veulent une image propre avec une vraie orientation créateur.",
  "webcam-elgato-facecam":
    "On recommande cette webcam pour les setups stream plus sérieux et plus propres visuellement.",
  "webcam-elgato-facecam-pro":
    "Cette webcam est particulièrement intéressante pour ceux qui veulent pousser la qualité vidéo plus loin.",

  "chaise-dxracer-formula":
    "On recommande cette chaise pour son positionnement gaming classique et son maintien adapté aux longues sessions.",
  "chaise-noblechairs-hero":
    "Cette chaise est un très bon choix pour ceux qui veulent plus de confort et une finition premium.",
  "chaise-noblechairs-epic":
    "On recommande cette chaise pour son design gaming affirmé et son bon maintien global.",
  "chaise-secretlab-titan-evo":
    "Cette chaise est une référence pour les joueurs qui veulent un siège très confortable et plus haut de gamme.",
  "chaise-andaseat-kaiser":
    "On recommande cette chaise pour les setups ambitieux qui veulent un siège imposant et confortable.",
  "chaise-corsair-t3-rush":
    "Cette chaise est intéressante pour les joueurs qui veulent un bon confort sans viser l’ultra premium.",
  "chaise-corsair-tc100-relaxed":
    "On recommande cette chaise pour son positionnement accessible et agréable sur de longues sessions.",
  "chaise-cougar-armor":
    "Cette chaise est un bon choix pour renforcer le confort et l’identité gaming du setup.",

  "bureau-arozzi-arena-grand-tapis":
    "On recommande ce bureau pour les setups gaming qui veulent beaucoup d’espace et une surface pensée pour jouer.",
  "bureau-arozzi-arena-leggero":
    "Ce bureau est intéressant pour ceux qui veulent un format gaming plus compact mais toujours efficace.",
  "bureau-secretlab-magnus":
    "On recommande ce bureau pour un setup propre, premium et très bien organisé.",
  "bureau-eureka-ergonomic-bureau-gaming":
    "Ce bureau est un très bon choix pour améliorer l’ergonomie et la présentation générale du setup.",
  "bureau-vitesse-bureau-gaming":
    "On recommande ce bureau pour les joueurs qui veulent une solution simple, gaming et fonctionnelle.",
  "bureau-greenforest-bureau-gaming":
    "Ce bureau est intéressant pour les petits budgets qui veulent tout de même une base propre pour leur setup.",
  "bureau-atlantic-bureau-gaming":
    "On recommande ce bureau pour son côté pratique et sa bonne intégration dans un espace gaming.",
  "bureau-odk-bureau-gaming":
    "Ce bureau est un bon choix pour créer un setup gaming bien rangé et plus agréable au quotidien.",
};

const PRODUCT_FACTS: Partial<Record<string, string[]>> = {
  "aoc-24g4xe": [
    "Catégorie : écran gaming",
    "Dalle IPS pour une image plus propre",
    "180Hz intéressant pour les jeux rapides",
  ],
  "samsung-odyssey-g7": [
    "Catégorie : écran gaming premium",
    "Pensé pour une expérience plus haut de gamme",
    "Très intéressant pour les joueurs exigeants",
  ],
  "logitech-g-pro-x-superlight": [
    "Catégorie : souris gaming",
    "Format très léger",
    "Très populaire en FPS compétitif",
  ],
  "razer-basilisk-v3": [
    "Catégorie : souris gaming",
    "Souris polyvalente et confortable",
    "Bonne option pour un usage gaming varié",
  ],
  "clavier-logitech-g915-tkl": [
    "Catégorie : clavier gaming",
    "Format TKL plus compact",
    "Version sans fil pensée pour les setups propres",
  ],
  "clavier-razer-huntsman-mini-60": [
    "Catégorie : clavier gaming",
    "Format compact 60%",
    "Très intéressant pour libérer de l’espace souris",
  ],
  "casque-steelseries-arctis-nova-7": [
    "Catégorie : casque gaming",
    "Version sans fil polyvalente",
    "Bon compromis entre confort et usage quotidien",
  ],
  "casque-hyperx-cloud-ii": [
    "Catégorie : casque gaming",
    "Référence connue chez beaucoup de joueurs",
    "Confort adapté aux longues sessions",
  ],
  "micro-hyperx-quadcast": [
    "Catégorie : micro gaming",
    "Très apprécié pour le stream",
    "Améliore nettement la qualité de voix",
  ],
  "micro-shure-sm7b": [
    "Catégorie : micro premium",
    "Pensé pour les setups plus avancés",
    "Très intéressant pour création de contenu",
  ],
  "webcam-logitech-c920-hd-pro": [
    "Catégorie : webcam",
    "Référence connue pour stream et visio",
    "Bon compromis entre simplicité et qualité",
  ],
  "webcam-elgato-facecam": [
    "Catégorie : webcam",
    "Pensée pour les créateurs et streamers",
    "Très bonne intégration dans un setup moderne",
  ],
  "chaise-secretlab-titan-evo": [
    "Catégorie : chaise gaming",
    "Modèle premium très connu",
    "Très bon maintien pour longues sessions",
  ],
  "chaise-corsair-t3-rush": [
    "Catégorie : chaise gaming",
    "Confort intéressant pour un usage prolongé",
    "Bonne option pour renforcer le setup",
  ],
  "bureau-secretlab-magnus": [
    "Catégorie : bureau gamer",
    "Très propre pour organiser le setup",
    "Pensé pour une installation premium",
  ],
  "bureau-arozzi-arena-grand-tapis": [
    "Catégorie : bureau gamer",
    "Grande surface utile pour le setup",
    "Très intéressant pour plusieurs périphériques",
  ],
};

export const amazonProducts: AmazonProduct[] = [
  ...ECRANS_30,
  ...SOURIS_30,
  ...CLAVIERS_30,
  ...CASQUES_30,
  ...MICROS_30,
  ...WEBCAMS_30,
  ...CHAISES_30,
  ...BUREAUX_30,
].map((product) => ({
  ...product,
  recommendation: PRODUCT_RECOMMENDATIONS[product.id],
  facts: PRODUCT_FACTS[product.id],
}));