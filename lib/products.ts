import type { Product } from "@/lib/cart";

export type Cat =
  | "GPU"
  | "CPU"
  | "Carte mère"
  | "RAM"
  | "SSD"
  | "Alimentation"
  | "Boîtier"
  | "Refroidissement"
  | "Écran"
  | "Clavier"
  | "Souris"
  | "Casque"
  | "Manette"
  | "Simulateur"
  | "Console"
  | "Accessoires";

export const CATEGORIES: Cat[] = [
  "GPU",
  "CPU",
  "Carte mère",
  "RAM",
  "SSD",
  "Alimentation",
  "Boîtier",
  "Refroidissement",
  "Écran",
  "Clavier",
  "Souris",
  "Casque",
  "Manette",
  "Simulateur",
  "Console",
  "Accessoires",
];

const shipFast = "Livraison 48h • Retours 30 jours";
const shipRelay = "Livraison 48h • Point Relais 2,99€";
const shipBuild = "Livraison 3-5 jours • Support 7j/7";

function pImg(path: string) {
  // tu mets tes images dans /public/products/...
  return `/products/${path}`;
}

function mk(
  id: string,
  brand: string,
  name: string,
  category: Cat,
  price: number,
  img: string,
  extra?: Partial<Product>
): Product {
  return {
    id,
    brand,
    name,
    category,
    price,
    ship: shipFast,
    image: pImg(img),
    ...extra,
  };
}

export const PRODUCTS: Product[] = [
  // ===== GPU (10)
  mk("gpu-rtx-4060", "NVIDIA", "GeForce RTX 4060 8GB", "GPU", 249, "gpu/rtx-4060.jpg", {
    oldPrice: 279,
    badge: "Best seller",
    desc: "Parfait 1080p ultra + DLSS. Setup clean pour commencer.",
    ship: shipRelay,
  }),
  mk("gpu-rtx-4060ti", "NVIDIA", "GeForce RTX 4060 Ti 16GB", "GPU", 399, "gpu/rtx-4060ti.jpg", {
    oldPrice: 449,
    badge: "16GB",
    desc: "Très bon 1440p + mémoire confortable pour gros jeux.",
    ship: shipRelay,
  }),
  mk("gpu-rtx-4070", "NVIDIA", "GeForce RTX 4070 12GB", "GPU", 549, "gpu/rtx-4070.jpg", {
    badge: "1440p",
    desc: "Sweet spot 1440p, DLSS 3, silencieuse.",
  }),
  mk("gpu-rtx-4070s", "NVIDIA", "GeForce RTX 4070 SUPER 12GB", "GPU", 629, "gpu/rtx-4070s.jpg", {
    badge: "Perf+",
    desc: "Boost perf pour 1440p/4K léger.",
  }),
  mk("gpu-rtx-4080s", "NVIDIA", "GeForce RTX 4080 SUPER 16GB", "GPU", 1099, "gpu/rtx-4080s.jpg", {
    badge: "4K",
    desc: "4K ultra, ray tracing solide, énorme marge.",
  }),
  mk("gpu-rx-7600", "AMD", "Radeon RX 7600 8GB", "GPU", 229, "gpu/rx-7600.jpg", {
    badge: "Bon plan",
    desc: "1080p super fluide, excellent rapport qualité/prix.",
  }),
  mk("gpu-rx-7700xt", "AMD", "Radeon RX 7700 XT 12GB", "GPU", 419, "gpu/rx-7700xt.jpg", {
    oldPrice: 469,
    badge: "12GB",
    desc: "Très bon 1440p, gros FPS en raster.",
  }),
  mk("gpu-rx-7800xt", "AMD", "Radeon RX 7800 XT 16GB", "GPU", 499, "gpu/rx-7800xt.jpg", {
    badge: "16GB",
    desc: "1440p ultra, mémoire large, top long terme.",
  }),
  mk("gpu-rx-7900xt", "AMD", "Radeon RX 7900 XT 20GB", "GPU", 799, "gpu/rx-7900xt.jpg", {
    badge: "20GB",
    desc: "Très solide 4K raster, énorme VRAM.",
  }),
  mk("gpu-rx-7900xtx", "AMD", "Radeon RX 7900 XTX 24GB", "GPU", 999, "gpu/rx-7900xtx.jpg", {
    badge: "24GB",
    desc: "Grosse 4K, VRAM énorme, perf brute.",
  }),

  // ===== CPU (10)
  mk("cpu-i5-14600k", "Intel", "Core i5-14600K", "CPU", 319, "cpu/i5-14600k.jpg", {
    badge: "Gaming",
    desc: "Excellent CPU gaming + multitâche.",
  }),
  mk("cpu-i7-14700k", "Intel", "Core i7-14700K", "CPU", 429, "cpu/i7-14700k.jpg", {
    badge: "Perf",
    desc: "Gros multi-core, top streaming + jeux.",
  }),
  mk("cpu-i9-14900k", "Intel", "Core i9-14900K", "CPU", 589, "cpu/i9-14900k.jpg", {
    badge: "Pro",
    desc: "Très haut de gamme, créa + gaming extrême.",
  }),
  mk("cpu-r5-7600", "AMD", "Ryzen 5 7600", "CPU", 219, "cpu/r5-7600.jpg", {
    badge: "Bon plan",
    desc: "Le meilleur départ AM5 en gaming.",
  }),
  mk("cpu-r7-7700", "AMD", "Ryzen 7 7700", "CPU", 299, "cpu/r7-7700.jpg", {
    badge: "8 cœurs",
    desc: "8 cœurs efficaces, parfait pour tout faire.",
  }),
  mk("cpu-r7-7800x3d", "AMD", "Ryzen 7 7800X3D", "CPU", 389, "cpu/r7-7800x3d.jpg", {
    badge: "FPS king",
    desc: "Un des meilleurs CPU gaming (cache 3D).",
  }),
  mk("cpu-r9-7900", "AMD", "Ryzen 9 7900", "CPU", 379, "cpu/r9-7900.jpg", {
    badge: "12 cœurs",
    desc: "Création + gaming, très bon rendement.",
  }),
  mk("cpu-r9-7950x", "AMD", "Ryzen 9 7950X", "CPU", 559, "cpu/r9-7950x.jpg", {
    badge: "16 cœurs",
    desc: "Création lourde, rendu, montage, etc.",
  }),
  mk("cpu-r5-5600", "AMD", "Ryzen 5 5600", "CPU", 119, "cpu/r5-5600.jpg", {
    badge: "Budget",
    desc: "AM4 pas cher pour config 1080p.",
  }),
  mk("cpu-i5-12400f", "Intel", "Core i5-12400F", "CPU", 129, "cpu/i5-12400f.jpg", {
    badge: "Budget",
    desc: "Très bon CPU gaming entrée/milieu de gamme.",
  }),

  // ===== Écran (8)
  mk("screen-24-144", "Nexus", 'Écran 24" 144Hz', "Écran", 129, "screen/24-144.jpg", {
    badge: "E-sport",
    desc: "144Hz fluidité, parfait FPS.",
    ship: shipRelay,
  }),
  mk("screen-27-165", "Nexus", 'Écran 27" 165Hz IPS', "Écran", 179, "screen/27-165.jpg", {
    badge: "IPS",
    desc: "Couleurs + fluidité, sweet spot 27”.",
    ship: shipRelay,
  }),
  mk("screen-27-240", "Nexus", 'Écran 27" 240Hz', "Écran", 249, "screen/27-240.jpg", {
    badge: "240Hz",
    desc: "Pour tryhard compétitif.",
  }),
  mk("screen-32-1440p", "Nexus", 'Écran 32" QHD 165Hz', "Écran", 299, "screen/32-qhd.jpg", {
    badge: "QHD",
    desc: "Grand format + QHD.",
  }),
  mk("screen-34-ultrawide", "Nexus", 'Écran 34" Ultrawide 144Hz', "Écran", 399, "screen/34-ultrawide.jpg", {
    badge: "UltraWide",
    desc: "Immersion totale, simus + AAA.",
  }),
  mk("screen-27-4k", "Nexus", 'Écran 27" 4K 144Hz', "Écran", 499, "screen/27-4k.jpg", {
    badge: "4K",
    desc: "4K net + 144Hz.",
  }),
  mk("screen-24-ips", "Nexus", 'Écran 24" IPS 75Hz', "Écran", 99, "screen/24-ips.jpg", {
    badge: "Bureau",
    desc: "Simple et clean pour setup budget.",
  }),
  mk("screen-1080p-portable", "Nexus", "Écran portable 15.6”", "Écran", 139, "screen/portable-156.jpg", {
    badge: "Nomade",
    desc: "Second écran facile à transporter.",
  }),

  // ===== Simulateur (8)
  mk("sim-wheel-basic", "Nexus", "Volant Simu Starter (PC/Console)", "Simulateur", 129, "sim/wheel-starter.jpg", {
    badge: "Starter",
    desc: "Parfait pour débuter en sim-racing.",
    ship: shipBuild,
  }),
  mk("sim-wheel-pro", "Nexus", "Volant Simu Pro Force Feedback", "Simulateur", 299, "sim/wheel-ffb.jpg", {
    badge: "FFB",
    desc: "Force feedback plus réaliste.",
    ship: shipBuild,
  }),
  mk("sim-pedals", "Nexus", "Pédalier 3 pédales métal", "Simulateur", 159, "sim/pedals-3.jpg", {
    badge: "Métal",
    desc: "Meilleure sensation au freinage.",
  }),
  mk("sim-shifter", "Nexus", "Shifter H-pattern + séquentiel", "Simulateur", 79, "sim/shifter.jpg", {
    badge: "Shifter",
    desc: "Pour drift / rallye / immersion.",
  }),
  mk("sim-cockpit", "Nexus", "Cockpit Simu (structure)", "Simulateur", 349, "sim/cockpit.jpg", {
    badge: "Rig",
    desc: "Structure stable pour volant + pédalier.",
    ship: shipBuild,
  }),
  mk("sim-handbrake", "Nexus", "Frein à main USB", "Simulateur", 59, "sim/handbrake.jpg", {
    badge: "Drift",
    desc: "Parfait drift & rallye.",
  }),
  mk("sim-wheel-stand", "Nexus", "Support volant pliable", "Simulateur", 99, "sim/wheel-stand.jpg", {
    badge: "Pliable",
    desc: "Facile à ranger, stable.",
  }),
  mk("sim-gloves", "Nexus", "Gants Simu (anti-glisse)", "Simulateur", 19, "sim/gloves.jpg", {
    badge: "Grip",
    desc: "Confort + grip volant.",
  }),

  // ===== Manette (6)
  mk("pad-ps5", "Sony", "Manette DualSense", "Manette", 69, "controller/dualsense.jpg", {
    badge: "PS5",
    desc: "Haptique + gâchettes adaptatives.",
  }),
  mk("pad-xbox", "Microsoft", "Manette Xbox Wireless", "Manette", 59, "controller/xbox-wireless.jpg", {
    badge: "Xbox/PC",
    desc: "Compat PC + console, top ergonomie.",
  }),
  mk("pad-hall", "Nexus", "Manette Hall Effect (drift-free)", "Manette", 49, "controller/pro-hall.jpg", {
    badge: "Drift-free",
    desc: "Sticks hall effect, longue durée.",
  }),
  mk("pad-fight", "Nexus", "Fightpad 6 boutons", "Manette", 39, "controller/fightpad.jpg", {
    badge: "FGC",
    desc: "Pour jeux de combat.",
  }),
  mk("pad-backbuttons", "Nexus", "Manette Pro Back Buttons", "Manette", 79, "controller/pro-back.jpg", {
    badge: "Pro",
    desc: "Boutons arrière, compétitif.",
  }),
  mk("pad-mobile", "Nexus", "Manette mobile USB-C", "Manette", 29, "controller/mobile-usbc.jpg", {
    badge: "Mobile",
    desc: "Pour cloud gaming sur téléphone.",
  }),

  // ===== Casque (6)
  mk("hs-neo-71", "Nexus", "Casque 7.1 Spatial Neo", "Casque", 69, "headset/7-1.jpg", {
    badge: "7.1",
    desc: "Spatial, micro clair, confort.",
  }),
  mk("hs-wireless", "Nexus", "Casque Wireless Pro", "Casque", 99, "headset/wireless-pro.jpg", {
    badge: "Sans fil",
    desc: "Latence low + autonomie solide.",
  }),
  mk("hs-iem", "Nexus", "In-Ear Gaming (IEM)", "Casque", 39, "headset/iem.jpg", {
    badge: "IEM",
    desc: "Léger, précis, top FPS.",
  }),
  mk("hs-stream", "Nexus", "Casque Studio + Micro", "Casque", 119, "headset/studio.jpg", {
    badge: "Studio",
    desc: "Plus neutre, bon pour créa.",
  }),
  mk("hs-budget", "Nexus", "Casque Gaming Starter", "Casque", 29, "headset/starter.jpg", {
    badge: "Budget",
    desc: "Simple, efficace, pas cher.",
  }),
  mk("hs-premium", "Nexus", "Casque Premium ANC", "Casque", 149, "headset/premium-anc.jpg", {
    badge: "ANC",
    desc: "Réduction bruit + confort.",
  }),

  // ===== Souris (6)
  mk("mouse-ultra", "Nexus", "Souris Ultralight 59g", "Souris", 39, "mouse/ultralight.jpg", {
    badge: "FPS",
    desc: "Ultra légère, flicks rapides.",
  }),
  mk("mouse-ergo", "Nexus", "Souris Ergonomique", "Souris", 29, "mouse/ergo.jpg", {
    badge: "Confort",
    desc: "Main droite, longues sessions.",
  }),
  mk("mouse-pro", "Nexus", "Souris Pro 2K Hz", "Souris", 69, "mouse/pro-2khz.jpg", {
    badge: "2KHz",
    desc: "Polling rate élevé, très réactive.",
  }),
  mk("mouse-wireless", "Nexus", "Souris Wireless RGB", "Souris", 49, "mouse/wireless.jpg", {
    badge: "Sans fil",
    desc: "Bonne autonomie, RGB.",
  }),
  mk("mouse-moba", "Nexus", "Souris MOBA 12 boutons", "Souris", 39, "mouse/moba-12.jpg", {
    badge: "MOBA",
    desc: "Macros / MMO / MOBA.",
  }),
  mk("mouse-budget", "Nexus", "Souris Starter", "Souris", 15, "mouse/starter.jpg", {
    badge: "Budget",
    desc: "Simple et fiable.",
  }),

  // ===== Clavier (6)
  mk("kbd-75", "Nexus", "Clavier Mécanique 75% Hot-swap", "Clavier", 79, "keyboard/mecha-75.jpg", {
    badge: "Hot-swap",
    desc: "Compact + super feeling.",
  }),
  mk("kbd-tkl", "Nexus", "Clavier TKL Mécanique", "Clavier", 69, "keyboard/tkl.jpg", {
    badge: "TKL",
    desc: "Format e-sport.",
  }),
  mk("kbd-60", "Nexus", "Clavier 60% RGB", "Clavier", 49, "keyboard/60-rgb.jpg", {
    badge: "60%",
    desc: "Petit format, parfait pour FPS.",
  }),
  mk("kbd-low", "Nexus", "Clavier Low-profile Wireless", "Clavier", 59, "keyboard/lowprofile.jpg", {
    badge: "Sans fil",
    desc: "Confort + autonomie.",
  }),
  mk("kbd-premium", "Nexus", "Clavier Premium (PBT + mousse)", "Clavier", 119, "keyboard/premium.jpg", {
    badge: "Premium",
    desc: "Son plus “thock”, meilleur feeling.",
  }),
  mk("kbd-budget", "Nexus", "Clavier Starter", "Clavier", 19, "keyboard/starter.jpg", {
    badge: "Budget",
    desc: "Simple, efficace.",
  }),

  // ===== SSD (6)
  mk("ssd-1tb", "Nexus", "SSD NVMe 1To (3500MB/s)", "SSD", 69, "storage/ssd-1tb.jpg", {
    badge: "Rapide",
    desc: "Chargements rapides.",
  }),
  mk("ssd-2tb", "Nexus", "SSD NVMe 2To (5000MB/s)", "SSD", 129, "storage/ssd-2tb.jpg", {
    badge: "2To",
    desc: "Grosse capacité.",
  }),
  mk("ssd-500", "Nexus", "SSD NVMe 500Go", "SSD", 39, "storage/ssd-500.jpg", {
    badge: "Budget",
    desc: "Idéal OS + jeux.",
  }),
  mk("ssd-sata-1tb", "Nexus", "SSD SATA 1To", "SSD", 59, "storage/ssd-sata-1tb.jpg", {
    badge: "SATA",
    desc: "Upgrade facile.",
  }),
  mk("ssd-heatsink", "Nexus", "SSD NVMe 1To + Heatsink", "SSD", 79, "storage/ssd-heatsink.jpg", {
    badge: "Heatsink",
    desc: "Top console/PC compact.",
  }),
  mk("ssd-ps5", "Nexus", "SSD NVMe 2To (PS5 Ready)", "SSD", 149, "storage/ssd-ps5-2tb.jpg", {
    badge: "PS5",
    desc: "Compatible PS5.",
  }),

  // ===== Accessoires (8)
  mk("acc-mousepad-xl", "Nexus", "Tapis XL Control", "Accessoires", 19, "accessories/mousepad-xl.jpg", {
    badge: "Must",
    desc: "Surface control, bord cousu.",
  }),
  mk("acc-rgb-strip", "Nexus", "Bande LED RGB 2m", "Accessoires", 15, "accessories/rgb-strip.jpg", {
    badge: "RGB",
    desc: "Ambiance violet 2026.",
  }),
  mk("acc-usb-hub", "Nexus", "Hub USB 3.0 (7 ports)", "Accessoires", 19, "accessories/usb-hub.jpg", {
    badge: "Pratique",
    desc: "Pour setup chargé.",
  }),
  mk("acc-cable-kit", "Nexus", "Kit câbles gainés", "Accessoires", 29, "accessories/cable-kit.jpg", {
    badge: "Clean",
    desc: "Cable management + style.",
  }),
  mk("acc-stand", "Nexus", "Support casque RGB", "Accessoires", 19, "accessories/headset-stand.jpg", {
    badge: "RGB",
    desc: "Pose casque stylée.",
  }),
  mk("acc-controller-stand", "Nexus", "Support manette", "Accessoires", 9, "accessories/controller-stand.jpg", {
    badge: "Simple",
    desc: "Rangement propre.",
  }),
  mk("acc-thermal", "Nexus", "Pâte thermique (Performance)", "Accessoires", 9, "accessories/thermal-paste.jpg", {
    badge: "Refroid.",
    desc: "Pour repaste CPU/GPU.",
  }),
  mk("acc-zip", "Nexus", "Serre-câbles + velcro", "Accessoires", 5, "accessories/cable-ties.jpg", {
    badge: "Cheap",
    desc: "Setup clean pas cher.",
  }),
];

// 👉 On a déjà > 80 items ?
// Là on est autour de ~80 selon ce que tu gardes/ajoutes.
// Si tu veux, je te fais une version “full 90/100” (RAM/CM/PSU/boîtiers…) aussi.