// lib/amazonProducts.ts

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

  // image locale (placeholders par catégorie)
  image: string;

  // requête de recherche Amazon (fallback si amazonUrl est vide)
  query: string;

  // lien affilié final (tu colles ici ton lien avec ?tag=nexusgamingfr-21)
  amazonUrl?: string;
};

function slugify(input: string) {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // accents
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")
    .slice(0, 80);
}

function makeProducts(category: Category, titles: string[], image: string, badge?: string) {
  return titles.map((title) => {
    const id = `${slugify(category)}-${slugify(title)}`;
    return {
      id,
      title,
      category,
      badge,
      image,
      query: `${title} ${category} gaming`,
      amazonUrl: "", // <-- colle ton lien affilié ici quand tu l’as
    } satisfies AmazonProduct;
  });
}

// ✅ 30 titres par catégorie (gaming / setup)
const ECRANS_30 = [
  "AOC 24G2 24\" 144/165Hz IPS",
  "AOC C24G2 24\" incurvé 144/165Hz",
  "Samsung Odyssey G3 24\" 144/165Hz",
  "Samsung Odyssey G5 27\" QHD 144/165Hz",
  "Samsung Odyssey G7 27\" QHD 240Hz",
  "LG UltraGear 24\" 144/165Hz",
  "LG UltraGear 27\" QHD 144/165Hz",
  "LG UltraGear 27\" QHD 240Hz",
  "ASUS TUF VG249Q (24\") 144/165Hz",
  "ASUS TUF VG27AQ (27\") QHD 144/165Hz",
  "ASUS ROG Swift 24/25\" 240Hz",
  "MSI G241 (24\") 144Hz",
  "MSI G272 (27\") 144/165Hz",
  "MSI MAG274QRF-QD (27\") QHD 165Hz",
  "BenQ ZOWIE XL2411K 144Hz",
  "BenQ ZOWIE XL2546K 240Hz",
  "BenQ MOBIUZ EX2510S 165Hz",
  "Gigabyte G24F 165Hz",
  "Gigabyte M27Q QHD 170Hz",
  "Dell S2522HG 240Hz",
  "Alienware AW2523HF 360Hz",
  "Acer Nitro VG240Y 144/165Hz",
  "Acer Nitro XV272U QHD 144/170Hz",
  "Acer Predator XB253Q 240Hz",
  "ViewSonic XG2405 144Hz",
  "ViewSonic XG2431 240Hz",
  "KOORUI 24\" 144/165Hz",
  "iiyama G-Master 24/27\" 144/165Hz",
  "Philips Evnia 24/27\" 144/165Hz",
  "HP Omen 27\" QHD 165Hz",
];

const SOURIS_30 = [
  "Logitech G Pro X Superlight",
  "Logitech G Pro X Superlight 2",
  "Logitech G502 HERO",
  "Logitech G305 LIGHTSPEED",
  "Logitech G703 LIGHTSPEED",
  "Logitech G903 LIGHTSPEED",
  "Logitech G203",
  "Razer DeathAdder Essential",
  "Razer DeathAdder V3",
  "Razer Viper Mini",
  "Razer Viper V2 Pro",
  "Razer Viper V3 HyperSpeed",
  "Razer Basilisk V3",
  "Razer Basilisk Ultimate",
  "Razer Orochi V2",
  "Razer Naga Trinity",
  "SteelSeries Rival 3",
  "SteelSeries Prime",
  "SteelSeries Aerox 3",
  "SteelSeries Aerox 5",
  "Corsair Katar Pro",
  "Corsair Sabre RGB Pro",
  "Corsair M65 RGB Elite",
  "Corsair Dark Core RGB",
  "ROCCAT Kone Pro",
  "ROCCAT Burst Pro",
  "Glorious Model O",
  "Glorious Model D",
  "HyperX Pulsefire Haste",
  "ASUS ROG Keris",
];

const CLAVIERS_30 = [
  "Razer Huntsman Mini (60%)",
  "Razer Huntsman V2",
  "Razer BlackWidow V3",
  "Razer BlackWidow V4",
  "Razer Ornata V3",
  "Logitech G Pro X TKL",
  "Logitech G915 TKL",
  "Logitech G815",
  "Logitech G213 Prodigy",
  "Logitech G413",
  "Corsair K55 RGB PRO",
  "Corsair K60 PRO",
  "Corsair K65 MINI",
  "Corsair K70 RGB MK.2",
  "Corsair K95 Platinum",
  "SteelSeries Apex 3",
  "SteelSeries Apex 5",
  "SteelSeries Apex 7",
  "SteelSeries Apex Pro",
  "HyperX Alloy Origins",
  "HyperX Alloy FPS",
  "HyperX Alloy Core RGB",
  "ASUS ROG Strix Scope",
  "ASUS TUF Gaming K1",
  "ROCCAT Vulcan 120",
  "ROCCAT Pyro",
  "Cooler Master CK552",
  "MSI Vigor GK50",
  "Keychron K2 (wireless)",
  "Anne Pro 2 (60%)",
];

const CASQUES_30 = [
  "HyperX Cloud II",
  "HyperX Cloud Alpha",
  "HyperX Cloud Stinger",
  "HyperX Cloud Flight",
  "SteelSeries Arctis 1",
  "SteelSeries Arctis 3",
  "SteelSeries Arctis 5",
  "SteelSeries Arctis 7",
  "SteelSeries Arctis Nova 1",
  "SteelSeries Arctis Nova 7",
  "SteelSeries Arctis Nova Pro",
  "Logitech G Pro X",
  "Logitech G733",
  "Logitech G435",
  "Logitech G432",
  "Corsair HS35",
  "Corsair HS60",
  "Corsair HS80",
  "Corsair VOID Elite",
  "Corsair Virtuoso",
  "Razer BlackShark V2",
  "Razer BlackShark V2 Pro",
  "Razer Kraken X",
  "Razer Kraken",
  "Razer Barracuda",
  "Turtle Beach Stealth 600",
  "Turtle Beach Stealth 700",
  "Turtle Beach Recon 200",
  "ASUS TUF H3",
  "ASUS ROG Delta",
];

const MICROS_30 = [
  "HyperX QuadCast",
  "HyperX QuadCast S",
  "HyperX SoloCast",
  "Elgato Wave:1",
  "Elgato Wave:3",
  "Elgato Wave DX",
  "Blue Yeti",
  "Blue Yeti Nano",
  "Blue Snowball iCE",
  "FIFINE K669B",
  "FIFINE K690",
  "FIFINE AM8",
  "RØDE NT-USB",
  "RØDE NT-USB Mini",
  "RØDE PodMic",
  "Shure MV7",
  "Audio-Technica AT2020",
  "Samson Q2U",
  "Samson Meteor Mic",
  "Maono AU-A04",
  "Maono PD200X",
  "TONOR TC30",
  "TONOR Q9",
  "Trust GXT 232 Mantis",
  "Trust GXT 258 Fyru",
  "Behringer C-1U",
  "AKG Lyra",
  "NZXT Capsule",
  "Razer Seiren Mini",
  "Razer Seiren X",
];

const WEBCAMS_30 = [
  "Logitech C270",
  "Logitech C310",
  "Logitech C505",
  "Logitech C920 HD Pro",
  "Logitech C922 Pro Stream",
  "Logitech C930e",
  "Logitech StreamCam",
  "Logitech Brio 4K",
  "Razer Kiyo",
  "Razer Kiyo X",
  "Razer Kiyo Pro",
  "Elgato Facecam",
  "Elgato Facecam Pro",
  "Microsoft LifeCam HD-3000",
  "AverMedia PW313",
  "AverMedia PW513",
  "NexiGo N930AF",
  "NexiGo N960E",
  "Anker PowerConf C200",
  "Creative Live! Cam Sync 1080p",
  "Creative Live! Cam Sync V3",
  "Obsbot Tiny 2",
  "Obsbot Meet 4K",
  "Insta360 Link",
  "Ugreen Webcam 1080p",
  "Dell UltraSharp Webcam",
  "Lenovo 300 FHD Webcam",
  "HP Webcam 1080p",
  "Trust Tyro",
  "Aukey Webcam 1080p",
];

const CHAISES_30 = [
  "GTPLAYER chaise gaming",
  "Dowinx chaise gaming",
  "AutoFull chaise gaming",
  "DXRacer Formula",
  "DXRacer Racing",
  "noblechairs HERO",
  "noblechairs EPIC",
  "Secretlab TITAN Evo",
  "AndaSeat Kaiser",
  "AndaSeat Dark Knight",
  "Razer Iskur",
  "Razer Enki",
  "Corsair T3 RUSH",
  "Corsair TC100 RELAXED",
  "AKRacing Core Series",
  "AKRacing Masters Series",
  "Cougar Armor",
  "Cougar Explore",
  "Vertagear SL4000",
  "Vertagear PL4500",
  "GTRacing chaise gaming",
  "Homall chaise gaming",
  "Hbada chaise gaming",
  "RESPAWN 110",
  "RESPAWN 205",
  "X Rocker chaise gaming",
  "BraZen chaise gaming",
  "Nitro Concepts S300",
  "Songmics chaise bureau gaming",
  "Sihoo chaise ergonomique",
];

const BUREAUX_30 = [
  "Arozzi Arena (grand tapis)",
  "Arozzi Arena Leggero",
  "Secretlab MAGNUS",
  "Eureka Ergonomic bureau gaming",
  "CubiCubi bureau gaming",
  "Mr IRONSTONE bureau gaming",
  "Seven Warrior bureau gaming RGB",
  "Vitesse bureau gaming",
  "Rolanstar bureau gaming",
  "Coleshome bureau gaming",
  "GreenForest bureau gaming",
  "Homall bureau gaming",
  "MOTPK bureau gaming",
  "Sedeta bureau gaming",
  "Need bureau gaming",
  "DESINO bureau gaming",
  "Atlantic bureau gaming",
  "RESPAWN bureau gaming",
  "Mars Gaming bureau gaming",
  "Waleaf bureau gaming",
  "ODK bureau gaming",
  "L-Shaped bureau gaming (angle)",
  "Bureau assis-debout électrique (standing desk)",
  "FlexiSpot bureau électrique",
  "SANODESK bureau électrique",
  "Fezibo bureau assis-debout",
  "Bureau 140cm gaming passe-câbles",
  "Bureau 160cm gaming grande surface",
  "Support écran double pour bureau",
  "Support PC tour sous bureau",
];

// ✅ Images locales (placeholders)
const IMG = {
  Ecran: "/products/ecran.jpg",
  Souris: "/products/souris.jpg",
  Clavier: "/products/clavier.jpg",
  Casque: "/products/casque.jpg",
  Micro: "/products/micro.jpg",
  Webcam: "/products/webcam.jpg",
  Chaise: "/products/chaise.jpg",
  Bureau: "/products/bureau.jpg",
} as const;

export const amazonProducts: AmazonProduct[] = [
  ...makeProducts("Ecran", ECRANS_30, IMG.Ecran, "Best"),
  ...makeProducts("Souris", SOURIS_30, IMG.Souris, "Aim"),
  ...makeProducts("Clavier", CLAVIERS_30, IMG.Clavier, "FPS"),
  ...makeProducts("Casque", CASQUES_30, IMG.Casque, "Audio"),
  ...makeProducts("Micro", MICROS_30, IMG.Micro, "Stream"),
  ...makeProducts("Webcam", WEBCAMS_30, IMG.Webcam, "Cam"),
  ...makeProducts("Chaise", CHAISES_30, IMG.Chaise, "Confort"),
  ...makeProducts("Bureau", BUREAUX_30, IMG.Bureau, "Setup"),
];