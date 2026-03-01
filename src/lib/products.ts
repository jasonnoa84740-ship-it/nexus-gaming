// lib/products.ts
import type { Product } from "@/lib/cart";

export type Cat =
  | "GPU"
  | "CPU"
  | "PC"
  | "Console"
  | "Écran"
  | "Clavier"
  | "Souris"
  | "Casque"
  | "Manette"
  | "Simulateur"
  | "VR"
  | "Streaming"
  | "Stockage"
  | "Réseau"
  | "Chaise"
  | "Accessoires";

export const CATEGORIES: Array<Cat | "Tous"> = [
  "Tous",
  "GPU",
  "CPU",
  "PC",
  "Console",
  "Écran",
  "Clavier",
  "Souris",
  "Casque",
  "Manette",
  "Simulateur",
  "VR",
  "Streaming",
  "Stockage",
  "Réseau",
  "Chaise",
  "Accessoires",
];

// Helper pour aller vite
function p(partial: Omit<Product, "details"> & { details?: string[] }): Product {
  return {
    details: partial.details ?? [],
    ...partial,
  };
}

/**
 * IMPORTANT :
 * - Les images ci-dessous supposent que tu mets des images dans /public/products/...
 * - Si tu veux "de vraies images", le plus clean c’est :
 *   -> tu télécharges des images (libres) ou tes propres images
 *   -> tu les mets dans /public/products/...
 *   -> et tu références "/products/xxx.jpg"
 */

// --------------------------
// GPU (exemples réalistes)
// --------------------------
const GPU: Product[] = [
  p({
    id: "gpu-rtx-4090",
    brand: "NVIDIA",
    name: "GeForce RTX 4090",
    category: "GPU",
    price: 1999,
    oldPrice: 2199,
    badge: "Ultra",
    desc: "Le monstre pour 4K/VR. (prix à ajuster selon ton marché)",
    ship: "Livraison 48h • Assurance incluse",
    image: "/products/gpu/rtx-4090.jpg",
    details: ["24GB GDDR6X", "4K/VR", "DLSS"],
  }),
  p({
    id: "gpu-rtx-4080-super",
    brand: "NVIDIA",
    name: "GeForce RTX 4080 SUPER",
    category: "GPU",
    price: 1199,
    oldPrice: 1299,
    badge: "4K",
    desc: "Très solide en 4K, excellent ratio perf/consommation.",
    ship: "Livraison 48h • Point Relais",
    image: "/products/gpu/rtx-4080-super.jpg",
    details: ["16GB GDDR6X", "4K", "DLSS"],
  }),
  p({
    id: "gpu-rx-7900-xtx",
    brand: "AMD",
    name: "Radeon RX 7900 XTX",
    category: "GPU",
    price: 999,
    oldPrice: 1099,
    badge: "Best deal",
    desc: "Gros FPS, très bon en 4K raster.",
    ship: "Livraison 48h",
    image: "/products/gpu/rx-7900-xtx.jpg",
    details: ["24GB GDDR6", "4K", "FSR"],
  }),
];

// --------------------------
// CPU (exemples réalistes)
// --------------------------
const CPU: Product[] = [
  p({
    id: "cpu-7800x3d",
    brand: "AMD",
    name: "Ryzen 7 7800X3D",
    category: "CPU",
    price: 349,
    oldPrice: 399,
    badge: "Gaming king",
    desc: "Un des meilleurs CPU gaming.",
    ship: "Livraison 48h",
    image: "/products/cpu/ryzen-7-7800x3d.jpg",
    details: ["8 cœurs", "3D V-Cache", "AM5"],
  }),
  p({
    id: "cpu-7950x3d",
    brand: "AMD",
    name: "Ryzen 9 7950X3D",
    category: "CPU",
    price: 629,
    oldPrice: 699,
    badge: "Creator",
    desc: "Gaming + création lourd.",
    ship: "Livraison 48h",
    image: "/products/cpu/ryzen-9-7950x3d.jpg",
    details: ["16 cœurs", "3D V-Cache", "AM5"],
  }),
  p({
    id: "cpu-i7-14700k",
    brand: "Intel",
    name: "Core i7-14700K",
    category: "CPU",
    price: 419,
    oldPrice: 469,
    badge: "Polyvalent",
    desc: "Gros multi-thread + super en jeu.",
    ship: "Livraison 48h",
    image: "/products/cpu/intel-i7-14700k.jpg",
    details: ["20 cœurs (8P+12E)", "LGA1700"],
  }),
];

// --------------------------
// Écrans / Casques / Manettes / Simulateur
// --------------------------
const SCREENS: Product[] = [
  p({
    id: "screen-27-165",
    brand: "Nexus",
    name: 'Écran 27" 165Hz IPS',
    category: "Écran",
    price: 169,
    oldPrice: 199,
    badge: "Smooth",
    desc: "165Hz ultra fluide, IPS, parfait FPS/MOBA.",
    ship: "Livraison 2-3 jours",
    image: "/products/screen/27-165.jpg",
  }),
  p({
    id: "screen-34-ultrawide",
    brand: "Nexus",
    name: 'Écran 34" Ultrawide 144Hz',
    category: "Écran",
    price: 349,
    oldPrice: 399,
    badge: "Immersion",
    desc: "Ultrawide pour simu, MMO, multitâche.",
    ship: "Livraison 2-3 jours",
    image: "/products/screen/34-ultrawide.jpg",
  }),
];

const PADS: Product[] = [
  p({
    id: "pad-dualsense",
    brand: "PlayStation",
    name: "DualSense",
    category: "Manette",
    price: 69,
    oldPrice: 79,
    badge: "Officiel",
    desc: "Retour haptique, gâchettes adaptatives.",
    ship: "Livraison 48h",
    image: "/products/controller/dualsense.jpg",
  }),
  p({
    id: "pad-xbox",
    brand: "Xbox",
    name: "Manette Xbox Wireless",
    category: "Manette",
    price: 59,
    oldPrice: 69,
    badge: "PC/Console",
    desc: "Compatible PC/Xbox, prise en main top.",
    ship: "Livraison 48h",
    image: "/products/controller/xbox-wireless.jpg",
  }),
];

const SIMU: Product[] = [
  p({
    id: "simu-wheel-t300",
    brand: "Thrustmaster",
    name: "Volant T300 RS GT",
    category: "Simulateur",
    price: 349,
    oldPrice: 399,
    badge: "Sim Racing",
    desc: "Force feedback, excellent pour sim racing.",
    ship: "Livraison 2-3 jours",
    image: "/products/sim/t300-rs.jpg",
  }),
  p({
    id: "simu-wheel-g923",
    brand: "Logitech",
    name: "Volant G923",
    category: "Simulateur",
    price: 299,
    oldPrice: 349,
    badge: "TrueForce",
    desc: "Très populaire, bon rapport qualité/prix.",
    ship: "Livraison 2-3 jours",
    image: "/products/sim/g923.jpg",
  }),
];

// --------------------------
// Générateur pour atteindre ~80 produits sans écrire 80 blocs à la main
// (tu peux remplacer ensuite par de “vrais” produits un par un)
// --------------------------
function cloneMany(base: Product[], count: number, prefix: string): Product[] {
  const out: Product[] = [];
  for (let i = 0; i < count; i++) {
    const b = base[i % base.length];
    out.push(
      p({
        ...b,
        id: `${b.id}-${prefix}-${i + 1}`,
        name: `${b.name} • Série ${i + 1}`,
        oldPrice: b.oldPrice ?? Math.round(b.price * 1.12),
        price: Math.max(9, Math.round(b.price * (0.92 + (i % 7) * 0.03))),
      })
    );
  }
  return out;
}

// Ici tu obtiens ~80 items rapidement
export const PRODUCTS: Product[] = [
  ...cloneMany(GPU, 20, "gpu"),
  ...cloneMany(CPU, 20, "cpu"),
  ...cloneMany(SCREENS, 10, "screen"),
  ...cloneMany(PADS, 10, "pad"),
  ...cloneMany(SIMU, 10, "simu"),
];