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
  // On force "gaming" pour améliorer les résultats Amazon
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
    amazonUrl: "", // ✅ tu colles ton lien affilié ici plus tard
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
    image: "/products/ecran.jpg",
    query: "AOC 24G4XE gaming monitor",
    amazonUrl: "https://www.amazon.fr/dp/B0CWRWYCZ4?tag=nexusgamingfr-21",
  },
  {
    id: "aoc-c27g4zxe",
    title: 'AOC C27G4ZXE 27" incurvé',
    category: "Ecran",
    image: "/products/ecran.jpg",
    query: "AOC C27G4ZXE gaming monitor",
    amazonUrl: "https://www.amazon.fr/dp/B0D58MQQ7S?tag=nexusgamingfr-21",
  },
  {
    id: "samsung-odyssey-g3",
    title: 'Samsung Odyssey G3 24"',
    category: "Ecran",
    image: "/products/ecran.jpg",
    query: "Samsung Odyssey G3 gaming monitor",
    amazonUrl: "https://www.amazon.fr/dp/B09QZWYZT5?tag=nexusgamingfr-21",
  },
  {
    id: "samsung-odyssey-g5",
    title: 'Samsung Odyssey G5 27"',
    category: "Ecran",
    image: "/products/ecran.jpg",
    query: "Samsung Odyssey G5 gaming monitor",
    amazonUrl: "https://www.amazon.fr/dp/B0CP687WQK?tag=nexusgamingfr-21",
  },
  {
    id: "samsung-odyssey-g7",
    title: 'Samsung Odyssey G7 27"',
    category: "Ecran",
    image: "/products/ecran.jpg",
    query: "Samsung Odyssey G7 gaming monitor",
    amazonUrl: "https://www.amazon.fr/dp/B0BRL8T2G7?tag=nexusgamingfr-21",
  },
  {
    id: "lg-ultragear-24g411a",
    title: "LG UltraGear 24G411A-B",
    category: "Ecran",
    image: "/products/ecran.jpg",
    query: "LG UltraGear 24G411A gaming monitor",
    amazonUrl: "https://www.amazon.fr/dp/B0FL32LSR5?tag=nexusgamingfr-21",
  },
  {
    id: "lg-ultragear-27gr75q",
    title: "LG UltraGear 27GR75Q-B",
    category: "Ecran",
    image: "/products/ecran.jpg",
    query: "LG UltraGear 27GR75Q gaming monitor",
    amazonUrl: "https://www.amazon.fr/dp/B0BVWMSP1V?tag=nexusgamingfr-21",
  },
  {
    id: "lg-ultragear-oled",
    title: 'LG UltraGear OLED 27"',
    category: "Ecran",
    image: "/products/ecran.jpg",
    query: "LG UltraGear OLED gaming monitor",
    amazonUrl: "https://www.amazon.fr/dp/B0FTPCP6S1?tag=nexusgamingfr-21",
  },
  {
    id: "asus-tuf-24",
    title: 'ASUS TUF Gaming 24"',
    category: "Ecran",
    image: "/products/ecran.jpg",
    query: "ASUS TUF Gaming monitor",
    amazonUrl: "https://www.amazon.fr/dp/B0F9Z1SS65?tag=nexusgamingfr-21",
  },
  {
    id: "asus-tuf-vg27aq",
    title: "ASUS TUF VG27AQM1A",
    category: "Ecran",
    image: "/products/ecran.jpg",
    query: "ASUS TUF VG27AQM1A monitor",
    amazonUrl: "https://www.amazon.fr/dp/B0CQ5K4HG5?tag=nexusgamingfr-21",
  },
  {
    id: "asus-rog-oled",
    title: "ASUS ROG Strix OLED",
    category: "Ecran",
    image: "/products/ecran.jpg",
    query: "ASUS ROG OLED gaming monitor",
    amazonUrl: "https://www.amazon.fr/dp/B0F13V37YH?tag=nexusgamingfr-21",
  },
  {
    id: "msi-g2412",
    title: 'MSI G2412 24"',
    category: "Ecran",
    image: "/products/ecran.jpg",
    query: "MSI G2412 gaming monitor",
    amazonUrl: "https://www.amazon.fr/dp/B0B83MNB5H?tag=nexusgamingfr-21",
  },
  {
    id: "msi-mag-275qf",
    title: "MSI MAG 275QF",
    category: "Ecran",
    image: "/products/ecran.jpg",
    query: "MSI MAG 275QF monitor",
    amazonUrl: "https://www.amazon.fr/dp/B0D1R9TMX7?tag=nexusgamingfr-21",
  },
  {
    id: "msi-mag274qrf",
    title: "MSI MAG274QRF-QD",
    category: "Ecran",
    image: "/products/ecran.jpg",
    query: "MSI MAG274QRF monitor",
    amazonUrl: "https://www.amazon.fr/dp/B08PKHV1R9?tag=nexusgamingfr-21",
  },
  {
    id: "benq-xl2411k",
    title: "BenQ ZOWIE XL2411K",
    category: "Ecran",
    image: "/products/ecran.jpg",
    query: "BenQ XL2411K gaming monitor",
    amazonUrl: "https://www.amazon.fr/dp/B08HJ2T1JK?tag=nexusgamingfr-21",
  },
  {
    id: "benq-xl2540k",
    title: "BenQ ZOWIE XL2540K",
    category: "Ecran",
    image: "/products/ecran.jpg",
    query: "BenQ XL2540K gaming monitor",
    amazonUrl: "https://www.amazon.fr/dp/B08M671TZX?tag=nexusgamingfr-21",
  },
  {
    id: "benq-ex2510s",
    title: "BenQ MOBIUZ EX2510S",
    category: "Ecran",
    image: "/products/ecran.jpg",
    query: "BenQ EX2510S gaming monitor",
    amazonUrl: "https://www.amazon.fr/dp/B096B51TMD?tag=nexusgamingfr-21",
  },
  {
    id: "gigabyte-g24f",
    title: "Gigabyte G24F",
    category: "Ecran",
    image: "/products/ecran.jpg",
    query: "Gigabyte G24F gaming monitor",
    amazonUrl: "https://www.amazon.fr/dp/B0BT897JXB?tag=nexusgamingfr-21",
  },
  {
    id: "gigabyte-m27q",
    title: "Gigabyte M27Q",
    category: "Ecran",
    image: "/products/ecran.jpg",
    query: "Gigabyte M27Q gaming monitor",
    amazonUrl: "https://www.amazon.fr/dp/B0FPXG8PGT?tag=nexusgamingfr-21",
  },
  {
    id: "dell-25-gaming",
    title: "Dell 25 Gaming Monitor",
    category: "Ecran",
    image: "/products/ecran.jpg",
    query: "Dell gaming monitor 25",
    amazonUrl: "https://www.amazon.fr/dp/B0GHQ2BPYJ?tag=nexusgamingfr-21",
  },
  {
    id: "alienware-aw2523hf",
    title: "Alienware AW2523HF",
    category: "Ecran",
    image: "/products/ecran.jpg",
    query: "Alienware AW2523HF monitor",
    amazonUrl: "https://www.amazon.fr/dp/B0BF5SJFN8?tag=nexusgamingfr-21",
  },
  {
    id: "acer-kg272",
    title: "Acer KG272",
    category: "Ecran",
    image: "/products/ecran.jpg",
    query: "Acer KG272 gaming monitor",
    amazonUrl: "https://www.amazon.fr/dp/B0DN28QY5P?tag=nexusgamingfr-21",
  },
  {
    id: "acer-nitro",
    title: "Acer Nitro",
    category: "Ecran",
    image: "/products/ecran.jpg",
    query: "Acer Nitro gaming monitor",
    amazonUrl: "https://www.amazon.fr/dp/B0CCY6CQ21?tag=nexusgamingfr-21",
  },
  {
    id: "acer-predator",
    title: "Acer Predator",
    category: "Ecran",
    image: "/products/ecran.jpg",
    query: "Acer Predator gaming monitor",
    amazonUrl: "https://www.amazon.fr/dp/B0B8GWGLLS?tag=nexusgamingfr-21",
  },
  {
    id: "viewsonic-va24",
    title: "ViewSonic VA24G1-H",
    category: "Ecran",
    image: "/products/ecran.jpg",
    query: "ViewSonic VA24 gaming monitor",
    amazonUrl: "https://www.amazon.fr/dp/B0FHK34X5L?tag=nexusgamingfr-21",
  },
  {
    id: "viewsonic-vx2479",
    title: "ViewSonic VX2479A",
    category: "Ecran",
    image: "/products/ecran.jpg",
    query: "ViewSonic VX2479A gaming monitor",
    amazonUrl: "https://www.amazon.fr/dp/B0F1T7G19N?tag=nexusgamingfr-21",
  },
  {
    id: "koorui-24",
    title: 'KOORUI 24"',
    category: "Ecran",
    image: "/products/ecran.jpg",
    query: "KOORUI gaming monitor",
    amazonUrl: "https://www.amazon.fr/dp/B0DPHDPWW1?tag=nexusgamingfr-21",
  },
  {
    id: "iiyama-gmaster",
    title: "iiyama G-Master",
    category: "Ecran",
    image: "/products/ecran.jpg",
    query: "iiyama G Master gaming monitor",
    amazonUrl: "https://www.amazon.fr/dp/B0947BJM8S?tag=nexusgamingfr-21",
  },
  {
    id: "philips-evnia",
    title: "Philips Evnia",
    category: "Ecran",
    image: "/products/ecran.jpg",
    query: "Philips Evnia gaming monitor",
    amazonUrl: "https://www.amazon.fr/dp/B0DF7LPJSR?tag=nexusgamingfr-21",
  },
  {
    id: "hp-omen",
    title: 'HP Omen 27"',
    category: "Ecran",
    image: "/products/ecran.jpg",
    query: "HP Omen gaming monitor",
    amazonUrl: "https://www.amazon.fr/dp/B0C4F3YP8F?tag=nexusgamingfr-21",
  },
];

/* =========================
   30 SOURIS GAMER
========================= */
const SOURIS_30: Seed[] = [
  { title: "Logitech G Pro X Superlight", badge: "Pro" },
  { title: "Logitech G Pro X Superlight 2", badge: "Pro" },
  { title: "Logitech G502 HERO", badge: "Best" },
  { title: "Logitech G305 LIGHTSPEED", badge: "Wireless" },
  { title: "Logitech G703 LIGHTSPEED", badge: "Wireless" },
  { title: "Logitech G203", badge: "Budget" },
  { title: "Razer DeathAdder Essential", badge: "Best" },
  { title: "Razer DeathAdder V3", badge: "Pro" },
  { title: "Razer Viper Mini", badge: "FPS" },
  { title: "Razer Viper V2 Pro", badge: "Pro" },
  { title: "Razer Viper V3 HyperSpeed", badge: "Wireless" },
  { title: "Razer Basilisk V3", badge: "Best" },
  { title: "Razer Basilisk Ultimate", badge: "Pro" },
  { title: "Razer Orochi V2", badge: "Compact" },
  { title: "Razer Naga (MMO)", badge: "MMO" },
  { title: "SteelSeries Rival 3", badge: "Best" },
  { title: "SteelSeries Prime", badge: "Pro" },
  { title: "SteelSeries Aerox 3", badge: "Light" },
  { title: "SteelSeries Aerox 5", badge: "Light" },
  { title: "Corsair Katar Pro", badge: "Budget" },
  { title: "Corsair Sabre RGB Pro", badge: "FPS" },
  { title: "Corsair M65 RGB", badge: "Best" },
  { title: "Corsair Dark Core RGB", badge: "Wireless" },
  { title: "ROCCAT Kone Pro", badge: "Pro" },
  { title: "ROCCAT Burst Pro", badge: "FPS" },
  { title: "Glorious Model O", badge: "Light" },
  { title: "Glorious Model D", badge: "Ergo" },
  { title: "HyperX Pulsefire Haste", badge: "Light" },
  { title: "ASUS ROG Keris", badge: "Pro" },
  { title: "Cooler Master MM710", badge: "Light" },
];

/* =========================
   30 CLAVIERS GAMER
========================= */
const CLAVIERS_30: Seed[] = [
  { title: "Razer Huntsman Mini (60%)", badge: "FPS" },
  { title: "Razer Huntsman V2", badge: "Pro" },
  { title: "Razer BlackWidow V3", badge: "Best" },
  { title: "Razer BlackWidow V4", badge: "Pro" },
  { title: "Razer Ornata V3", badge: "Budget" },
  { title: "Logitech G Pro X TKL", badge: "Pro" },
  { title: "Logitech G915 TKL", badge: "Wireless" },
  { title: "Logitech G213 Prodigy", badge: "Budget" },
  { title: "Logitech G413", badge: "Best" },
  { title: "Corsair K55 RGB PRO", badge: "Budget" },
  { title: "Corsair K60 PRO", badge: "FPS" },
  { title: "Corsair K65 MINI", badge: "FPS" },
  { title: "Corsair K70 RGB", badge: "Best" },
  { title: "Corsair K95 Platinum", badge: "Pro" },
  { title: "SteelSeries Apex 3", badge: "Budget" },
  { title: "SteelSeries Apex 5", badge: "Best" },
  { title: "SteelSeries Apex 7", badge: "Pro" },
  { title: "SteelSeries Apex Pro", badge: "Pro" },
  { title: "HyperX Alloy Origins", badge: "Best" },
  { title: "HyperX Alloy FPS", badge: "FPS" },
  { title: "HyperX Alloy Core RGB", badge: "Budget" },
  { title: "ASUS ROG Strix Scope", badge: "Pro" },
  { title: "ASUS TUF Gaming K1", badge: "Best" },
  { title: "ROCCAT Vulcan 120", badge: "Pro" },
  { title: "ROCCAT Pyro", badge: "Best" },
  { title: "Cooler Master CK552", badge: "Budget" },
  { title: "MSI Vigor GK50", badge: "Best" },
  { title: "Keychron K2 (wireless)", badge: "Wireless" },
  { title: "Keychron K6 (compact)", badge: "Compact" },
  { title: "RK Royal Kludge (wireless)", badge: "Budget" },
];

/* =========================
   30 CASQUES GAMER
========================= */
const CASQUES_30: Seed[] = [
  { title: "HyperX Cloud II", badge: "Best" },
  { title: "HyperX Cloud Alpha", badge: "Best" },
  { title: "HyperX Cloud Stinger", badge: "Budget" },
  { title: "HyperX Cloud Flight (sans fil)", badge: "Wireless" },
  { title: "SteelSeries Arctis Nova 1", badge: "Best" },
  { title: "SteelSeries Arctis Nova 7", badge: "Wireless" },
  { title: "SteelSeries Arctis Nova Pro", badge: "Pro" },
  { title: "SteelSeries Arctis 7", badge: "Wireless" },
  { title: "Logitech G Pro X", badge: "Pro" },
  { title: "Logitech G733", badge: "Wireless" },
  { title: "Logitech G435", badge: "Wireless" },
  { title: "Corsair HS35", badge: "Budget" },
  { title: "Corsair HS60", badge: "Best" },
  { title: "Corsair HS80", badge: "Pro" },
  { title: "Corsair VOID Elite", badge: "Best" },
  { title: "Corsair Virtuoso", badge: "Pro" },
  { title: "Razer BlackShark V2", badge: "Best" },
  { title: "Razer BlackShark V2 Pro", badge: "Pro" },
  { title: "Razer Kraken X", badge: "Budget" },
  { title: "Razer Kraken", badge: "Best" },
  { title: "Razer Barracuda", badge: "Wireless" },
  { title: "Turtle Beach Stealth 500", badge: "Wireless" },
  { title: "Turtle Beach Stealth 600", badge: "Wireless" },
  { title: "Turtle Beach Stealth 700", badge: "Pro" },
  { title: "Turtle Beach Recon 200", badge: "Budget" },
  { title: "ASUS TUF H3", badge: "Best" },
  { title: "ASUS ROG Delta", badge: "Pro" },
  { title: "JBL Quantum 100", badge: "Budget" },
  { title: "JBL Quantum 810", badge: "Pro" },
  { title: "Sony INZONE H7", badge: "Pro" },
];

/* =========================
   30 MICROS STREAMING
========================= */
const MICROS_30: Seed[] = [
  { title: "HyperX QuadCast", badge: "Stream" },
  { title: "HyperX QuadCast S", badge: "Stream" },
  { title: "HyperX SoloCast", badge: "Budget" },
  { title: "Elgato Wave:1", badge: "Stream" },
  { title: "Elgato Wave:3", badge: "Pro" },
  { title: "Elgato Wave DX", badge: "Pro" },
  { title: "Blue Yeti", badge: "Best" },
  { title: "Blue Yeti Nano", badge: "Best" },
  { title: "Blue Snowball iCE", badge: "Budget" },
  { title: "FIFINE K669B", badge: "Budget" },
  { title: "FIFINE K690", badge: "Best" },
  { title: "FIFINE AM8", badge: "Best" },
  { title: "RØDE NT-USB", badge: "Pro" },
  { title: "RØDE NT-USB Mini", badge: "Best" },
  { title: "RØDE PodMic", badge: "Pro" },
  { title: "Shure MV7", badge: "Pro" },
  { title: "Audio-Technica AT2020", badge: "Pro" },
  { title: "Samson Q2U", badge: "Best" },
  { title: "Samson Meteor Mic", badge: "Budget" },
  { title: "Maono AU-A04", badge: "Budget" },
  { title: "TONOR TC30", badge: "Budget" },
  { title: "Trust GXT 232", badge: "Budget" },
  { title: "Trust GXT 258", badge: "Best" },
  { title: "Behringer C-1U", badge: "Best" },
  { title: "AKG Lyra", badge: "Best" },
  { title: "NZXT Capsule", badge: "Best" },
  { title: "Razer Seiren Mini", badge: "Budget" },
  { title: "Razer Seiren X", badge: "Best" },
  { title: "Shure SM7B", badge: "Pro" },
  { title: "RØDE Wireless GO (stream)", badge: "Pro" },
];

/* =========================
   30 WEBCAMS
========================= */
const WEBCAMS_30: Seed[] = [
  { title: "Logitech C270", badge: "Budget" },
  { title: "Logitech C505", badge: "Budget" },
  { title: "Logitech C920 HD Pro", badge: "Best" },
  { title: "Logitech C922 Pro Stream", badge: "Stream" },
  { title: "Logitech C930e", badge: "Pro" },
  { title: "Logitech StreamCam", badge: "Stream" },
  { title: "Logitech Brio 4K", badge: "Pro" },
  { title: "Razer Kiyo", badge: "Stream" },
  { title: "Razer Kiyo X", badge: "Best" },
  { title: "Razer Kiyo Pro", badge: "Pro" },
  { title: "Elgato Facecam", badge: "Pro" },
  { title: "Elgato Facecam Pro", badge: "Pro" },
  { title: "Microsoft LifeCam HD-3000", badge: "Budget" },
  { title: "AverMedia PW313", badge: "Best" },
  { title: "AverMedia PW513", badge: "Pro" },
  { title: "NexiGo N930AF", badge: "Best" },
  { title: "Anker PowerConf C200", badge: "Best" },
  { title: "Creative Live! Cam Sync 1080p", badge: "Budget" },
  { title: "Obsbot Meet 4K", badge: "Pro" },
  { title: "Obsbot Tiny 2", badge: "Pro" },
  { title: "Insta360 Link", badge: "Pro" },
  { title: "Dell UltraSharp Webcam", badge: "Pro" },
  { title: "HP Webcam 1080p", badge: "Budget" },
  { title: "Lenovo 300 FHD Webcam", badge: "Budget" },
  { title: "Trust Tyro", badge: "Budget" },
  { title: "Aukey Webcam 1080p", badge: "Budget" },
  { title: "Ugreen Webcam 1080p", badge: "Budget" },
  { title: "Razer Kiyo Pro Ultra", badge: "Pro" },
  { title: "Logitech Brio 500", badge: "Best" },
  { title: "Logitech C615", badge: "Budget" },
];

/* =========================
   30 CHAISES
========================= */
const CHAISES_30: Seed[] = [
  { title: "GTPLAYER chaise gaming", badge: "Best" },
  { title: "Dowinx chaise gaming", badge: "Confort" },
  { title: "AutoFull chaise gaming", badge: "Best" },
  { title: "DXRacer Formula", badge: "Pro" },
  { title: "DXRacer Racing", badge: "Pro" },
  { title: "noblechairs HERO", badge: "Pro" },
  { title: "noblechairs EPIC", badge: "Pro" },
  { title: "Secretlab TITAN Evo", badge: "Pro" },
  { title: "AndaSeat Kaiser", badge: "Pro" },
  { title: "AndaSeat Dark Knight", badge: "Pro" },
  { title: "Razer Iskur", badge: "Pro" },
  { title: "Razer Enki", badge: "Pro" },
  { title: "Corsair T3 RUSH", badge: "Best" },
  { title: "Corsair TC100 RELAXED", badge: "Best" },
  { title: "AKRacing Core Series", badge: "Pro" },
  { title: "AKRacing Masters Series", badge: "Pro" },
  { title: "Cougar Armor", badge: "Best" },
  { title: "Cougar Explore", badge: "Best" },
  { title: "Vertagear SL4000", badge: "Pro" },
  { title: "Vertagear PL4500", badge: "Pro" },
  { title: "GTRacing chaise gaming", badge: "Best" },
  { title: "Homall chaise gaming", badge: "Budget" },
  { title: "Hbada chaise gaming", badge: "Budget" },
  { title: "RESPAWN 110", badge: "Best" },
  { title: "RESPAWN 205", badge: "Best" },
  { title: "X Rocker chaise gaming", badge: "Immersif" },
  { title: "BraZen chaise gaming", badge: "Immersif" },
  { title: "Nitro Concepts S300", badge: "Pro" },
  { title: "Sihoo chaise ergonomique", badge: "Ergo" },
  { title: "Songmics chaise bureau", badge: "Budget" },
];

/* =========================
   30 BUREAUX
========================= */
const BUREAUX_30: Seed[] = [
  { title: "Arozzi Arena (grand tapis)", badge: "Pro" },
  { title: "Arozzi Arena Leggero", badge: "Pro" },
  { title: "Secretlab MAGNUS", badge: "Pro" },
  { title: "Eureka Ergonomic bureau gaming", badge: "Pro" },
  { title: "CubiCubi bureau gaming", badge: "Budget" },
  { title: "Mr IRONSTONE bureau gaming", badge: "Best" },
  { title: "Seven Warrior bureau gaming RGB", badge: "RGB" },
  { title: "Vitesse bureau gaming", badge: "Best" },
  { title: "Rolanstar bureau gaming", badge: "Best" },
  { title: "Coleshome bureau gaming", badge: "Budget" },
  { title: "GreenForest bureau gaming", badge: "Budget" },
  { title: "Homall bureau gaming", badge: "Budget" },
  { title: "MOTPK bureau gaming", badge: "Best" },
  { title: "Sedeta bureau gaming (rangements)", badge: "Best" },
  { title: "Need bureau gaming", badge: "Budget" },
  { title: "DESINO bureau gaming", badge: "Best" },
  { title: "Atlantic bureau gaming", badge: "Budget" },
  { title: "RESPAWN bureau gaming", badge: "Pro" },
  { title: "Mars Gaming bureau gaming", badge: "Budget" },
  { title: "ODK bureau gaming", badge: "Best" },
  { title: "Bureau gaming en L (angle)", badge: "Setup" },
  { title: "Bureau assis-debout électrique", badge: "Pro" },
  { title: "FlexiSpot bureau électrique", badge: "Pro" },
  { title: "SANODESK bureau électrique", badge: "Pro" },
  { title: "Fezibo bureau assis-debout", badge: "Pro" },
  { title: "Support écran double", badge: "Access" },
  { title: "Support écran simple", badge: "Access" },
  { title: "Support PC tour sous bureau", badge: "Access" },
  { title: "Goulotte passe-câbles bureau", badge: "Access" },
  { title: "Bras écran (monitor arm) gaming", badge: "Access" },
];

// ✅ Export final : tout le catalogue
// IMPORTANT : on garde ECRANS_30 tel quel (avec tes liens) => PAS de build() dessus
export const amazonProducts: AmazonProduct[] = [
  ...ECRANS_30,
  ...build("Souris", SOURIS_30),
  ...build("Clavier", CLAVIERS_30),
  ...build("Casque", CASQUES_30),
  ...build("Micro", MICROS_30),
  ...build("Webcam", WEBCAMS_30),
  ...build("Chaise", CHAISES_30),
  ...build("Bureau", BUREAUX_30),
];