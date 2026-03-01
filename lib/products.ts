// lib/products.ts
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
  "Manette",
  "Casque",
  "Simulateur",
  "Clavier",
  "Souris",
  "VR",
  "Streaming",
  "Stockage",
  "Réseau",
  "Chaise",
  "Accessoires",
];

// ⚠️ Images: mets-les dans /public/products/...
// ex: /public/products/gpu/rtx-4070-super.jpg
export const PRODUCTS = [
  // ===================== GPU (18) =====================
  { id:"gpu-rtx-4090", brand:"NVIDIA", name:"GeForce RTX 4090", category:"GPU", price:1799, oldPrice:1999, badge:"Ultra", desc:"4K monstrueux, créa + gaming.", ship:"Livraison 48h • Retours 30 jours", image:"/products/gpu/rtx-4090.jpg" },
  { id:"gpu-rtx-4080-super", brand:"NVIDIA", name:"GeForce RTX 4080 SUPER", category:"GPU", price:1099, oldPrice:1199, badge:"Top 4K", desc:"Très grosse perf 4K / 1440p.", ship:"Livraison 48h • Retours 30 jours", image:"/products/gpu/rtx-4080-super.jpg" },
  { id:"gpu-rtx-4070-ti-super", brand:"NVIDIA", name:"GeForce RTX 4070 Ti SUPER", category:"GPU", price:849, oldPrice:899, badge:"1440p+", desc:"Le sweet spot premium 1440p.", ship:"Livraison 48h", image:"/products/gpu/rtx-4070-ti-super.jpg" },
  { id:"gpu-rtx-4070-super", brand:"NVIDIA", name:"GeForce RTX 4070 SUPER", category:"GPU", price:669, oldPrice:719, badge:"Best", desc:"1440p très solide, DLSS.", ship:"Livraison 48h", image:"/products/gpu/rtx-4070-super.jpg" },
  { id:"gpu-rtx-4070", brand:"NVIDIA", name:"GeForce RTX 4070", category:"GPU", price:599, oldPrice:649, badge:"1440p", desc:"Perf/€ propre pour 1440p.", ship:"Livraison 48h", image:"/products/gpu/rtx-4070.jpg" },
  { id:"gpu-rtx-4060-ti", brand:"NVIDIA", name:"GeForce RTX 4060 Ti", category:"GPU", price:429, oldPrice:479, badge:"Streamer", desc:"DLSS + encodage vidéo.", ship:"Livraison 48h", image:"/products/gpu/rtx-4060-ti.jpg" },
  { id:"gpu-rtx-4060", brand:"NVIDIA", name:"GeForce RTX 4060", category:"GPU", price:309, oldPrice:349, badge:"1080p+", desc:"Parfait 1080p ultra.", ship:"Livraison 48h", image:"/products/gpu/rtx-4060.jpg" },

  { id:"gpu-rx-7900-xtx", brand:"AMD", name:"Radeon RX 7900 XTX", category:"GPU", price:999, oldPrice:1099, badge:"4K", desc:"Gros FPS, VRAM généreuse.", ship:"Livraison 48h", image:"/products/gpu/rx-7900-xtx.jpg" },
  { id:"gpu-rx-7900-xt", brand:"AMD", name:"Radeon RX 7900 XT", category:"GPU", price:799, oldPrice:899, badge:"1440p+", desc:"Très bon 1440p high.", ship:"Livraison 48h", image:"/products/gpu/rx-7900-xt.jpg" },
  { id:"gpu-rx-7800-xt", brand:"AMD", name:"Radeon RX 7800 XT", category:"GPU", price:549, oldPrice:599, badge:"Best deal", desc:"Perf/€ fort en 1440p.", ship:"Livraison 48h", image:"/products/gpu/rx-7800-xt.jpg" },
  { id:"gpu-rx-7700-xt", brand:"AMD", name:"Radeon RX 7700 XT", category:"GPU", price:449, oldPrice:499, badge:"1440p", desc:"1440p fluide, budget.", ship:"Livraison 48h", image:"/products/gpu/rx-7700-xt.jpg" },
  { id:"gpu-rx-7600", brand:"AMD", name:"Radeon RX 7600", category:"GPU", price:269, oldPrice:299, badge:"1080p", desc:"1080p solide, conso ok.", ship:"Livraison 48h", image:"/products/gpu/rx-7600.jpg" },

  // (on complète jusqu’à 18)
  { id:"gpu-rtx-3060", brand:"NVIDIA", name:"GeForce RTX 3060 12GB", category:"GPU", price:249, oldPrice:289, badge:"Budget", desc:"1080p/1440p léger.", ship:"Livraison 48h", image:"/products/gpu/rtx-3060.jpg" },
  { id:"gpu-rtx-3050", brand:"NVIDIA", name:"GeForce RTX 3050", category:"GPU", price:199, oldPrice:229, badge:"Entry", desc:"Premier PC gamer.", ship:"Livraison 48h", image:"/products/gpu/rtx-3050.jpg" },
  { id:"gpu-rx-6600", brand:"AMD", name:"Radeon RX 6600", category:"GPU", price:189, oldPrice:219, badge:"Bon plan", desc:"1080p efficace.", ship:"Livraison 48h", image:"/products/gpu/rx-6600.jpg" },
  { id:"gpu-rx-6650-xt", brand:"AMD", name:"Radeon RX 6650 XT", category:"GPU", price:219, oldPrice:249, badge:"1080p+", desc:"Très bon en 1080p.", ship:"Livraison 48h", image:"/products/gpu/rx-6650-xt.jpg" },
  { id:"gpu-arc-a770", brand:"Intel", name:"Intel Arc A770 16GB", category:"GPU", price:279, oldPrice:329, badge:"Intel", desc:"Intéressant 1080p/1440p.", ship:"Livraison 48h", image:"/products/gpu/arc-a770.jpg" },

  // ===================== CPU (14) =====================
  { id:"cpu-ryzen-7-7800x3d", brand:"AMD", name:"Ryzen 7 7800X3D", category:"CPU", price:369, oldPrice:429, badge:"Gaming king", desc:"X3D top pour FPS.", ship:"Livraison 48h", image:"/products/cpu/ryzen-7-7800x3d.jpg" },
  { id:"cpu-ryzen-7-7700x", brand:"AMD", name:"Ryzen 7 7700X", category:"CPU", price:299, oldPrice:349, badge:"Perf", desc:"8 cœurs polyvalent.", ship:"Livraison 48h", image:"/products/cpu/ryzen-7-7700x.jpg" },
  { id:"cpu-ryzen-5-7600", brand:"AMD", name:"Ryzen 5 7600", category:"CPU", price:199, oldPrice:239, badge:"Best", desc:"6 cœurs parfait gaming.", ship:"Livraison 48h", image:"/products/cpu/ryzen-5-7600.jpg" },
  { id:"cpu-ryzen-5-5600", brand:"AMD", name:"Ryzen 5 5600", category:"CPU", price:129, oldPrice:159, badge:"Budget", desc:"Super rapport prix.", ship:"Livraison 48h", image:"/products/cpu/ryzen-5-5600.jpg" },

  { id:"cpu-i9-14900k", brand:"Intel", name:"Core i9-14900K", category:"CPU", price:589, oldPrice:649, badge:"Monster", desc:"Gaming + créa hardcore.", ship:"Livraison 48h", image:"/products/cpu/i9-14900k.jpg" },
  { id:"cpu-i7-14700k", brand:"Intel", name:"Core i7-14700K", category:"CPU", price:419, oldPrice:469, badge:"Creator", desc:"Très fort en multi-core.", ship:"Livraison 48h", image:"/products/cpu/i7-14700k.jpg" },
  { id:"cpu-i5-14600k", brand:"Intel", name:"Core i5-14600K", category:"CPU", price:309, oldPrice:349, badge:"Gaming", desc:"Très bon pour jouer.", ship:"Livraison 48h", image:"/products/cpu/i5-14600k.jpg" },
  { id:"cpu-i5-12400f", brand:"Intel", name:"Core i5-12400F", category:"CPU", price:129, oldPrice:159, badge:"Bon plan", desc:"Budget solide.", ship:"Livraison 48h", image:"/products/cpu/i5-12400f.jpg" },

  // compléments
  { id:"cpu-ryzen-9-7950x", brand:"AMD", name:"Ryzen 9 7950X", category:"CPU", price:529, oldPrice:599, badge:"Creator", desc:"16 cœurs créa.", ship:"Livraison 48h", image:"/products/cpu/ryzen-9-7950x.jpg" },
  { id:"cpu-ryzen-9-7900", brand:"AMD", name:"Ryzen 9 7900", category:"CPU", price:349, oldPrice:399, badge:"12 cœurs", desc:"Polyvalent.", ship:"Livraison 48h", image:"/products/cpu/ryzen-9-7900.jpg" },
  { id:"cpu-ryzen-7-5800x3d", brand:"AMD", name:"Ryzen 7 5800X3D", category:"CPU", price:279, oldPrice:329, badge:"AM4", desc:"Upgrade AM4 top.", ship:"Livraison 48h", image:"/products/cpu/ryzen-7-5800x3d.jpg" },
  { id:"cpu-i7-12700k", brand:"Intel", name:"Core i7-12700K", category:"CPU", price:279, oldPrice:319, badge:"12th gen", desc:"Toujours solide.", ship:"Livraison 48h", image:"/products/cpu/i7-12700k.jpg" },
  { id:"cpu-i5-13600k", brand:"Intel", name:"Core i5-13600K", category:"CPU", price:269, oldPrice:319, badge:"Value", desc:"Perf/€", ship:"Livraison 48h", image:"/products/cpu/i5-13600k.jpg" },
  { id:"cpu-i3-12100f", brand:"Intel", name:"Core i3-12100F", category:"CPU", price:89, oldPrice:109, badge:"Entry", desc:"Le moins cher jouable.", ship:"Livraison 48h", image:"/products/cpu/i3-12100f.jpg" },

  // ===================== Écrans (10) =====================
  { id:"screen-24-144-ips", brand:"AOC", name:"24\" 144Hz IPS 1ms", category:"Écran", price:129, oldPrice:159, badge:"Esport", desc:"1080p ultra fluide.", ship:"Livraison 2-3 jours", image:"/products/screen/24-144-ips.jpg" },
  { id:"screen-27-165-ips", brand:"LG", name:"27\" 165Hz IPS QHD", category:"Écran", price:229, oldPrice:269, badge:"QHD", desc:"1440p très clean.", ship:"Livraison 2-3 jours", image:"/products/screen/27-165-qhd.jpg" },
  { id:"screen-27-240", brand:"ASUS", name:"27\" 240Hz (Esport)", category:"Écran", price:329, oldPrice:379, badge:"240Hz", desc:"Pour tryhard FPS.", ship:"Livraison 2-3 jours", image:"/products/screen/27-240.jpg" },
  { id:"screen-34-ultrawide", brand:"Samsung", name:"34\" UltraWide 165Hz", category:"Écran", price:399, oldPrice:499, badge:"UltraWide", desc:"Immersion totale.", ship:"Livraison 2-3 jours", image:"/products/screen/34-ultrawide.jpg" },
  // + 6
  { id:"screen-24-75", brand:"Dell", name:"24\" 75Hz IPS", category:"Écran", price:99, oldPrice:129, badge:"Bureau", desc:"Confort quotidien.", ship:"Livraison 2-3 jours", image:"/products/screen/24-75.jpg" },
  { id:"screen-27-60-4k", brand:"LG", name:"27\" 4K 60Hz", category:"Écran", price:279, oldPrice:329, badge:"4K", desc:"Créa + précision.", ship:"Livraison 2-3 jours", image:"/products/screen/27-4k.jpg" },
  { id:"screen-32-144-qhd", brand:"Gigabyte", name:"32\" 144Hz QHD", category:"Écran", price:289, oldPrice:339, badge:"Grand", desc:"QHD grand format.", ship:"Livraison 2-3 jours", image:"/products/screen/32-144-qhd.jpg" },
  { id:"screen-25-240", brand:"BenQ", name:"25\" 240Hz TN", category:"Écran", price:279, oldPrice:329, badge:"Esport", desc:"Réactivité max.", ship:"Livraison 2-3 jours", image:"/products/screen/25-240.jpg" },
  { id:"screen-27-oled", brand:"LG", name:"27\" OLED 240Hz", category:"Écran", price:899, oldPrice:999, badge:"OLED", desc:"Contraste insane.", ship:"Livraison 2-3 jours", image:"/products/screen/27-oled.jpg" },
  { id:"screen-28-4k-144", brand:"ASUS", name:"28\" 4K 144Hz", category:"Écran", price:549, oldPrice:649, badge:"4K 144", desc:"4K + fluidité.", ship:"Livraison 2-3 jours", image:"/products/screen/28-4k-144.jpg" },

  // ===================== Manettes (8) =====================
  { id:"pad-ps5-dualsense", brand:"Sony", name:"DualSense (PS5)", category:"Manette", price:69, oldPrice:79, badge:"Officiel", desc:"Haptique + adaptive triggers.", ship:"Livraison 48h", image:"/products/controller/dualsense.jpg" },
  { id:"pad-xbox", brand:"Microsoft", name:"Manette Xbox Wireless", category:"Manette", price:59, oldPrice:69, badge:"PC", desc:"Compatible PC / Xbox.", ship:"Livraison 48h", image:"/products/controller/xbox-wireless.jpg" },
  { id:"pad-8bitdo", brand:"8BitDo", name:"Ultimate Bluetooth", category:"Manette", price:49, oldPrice:59, badge:"Switch", desc:"Très bon rapport qualité.", ship:"Livraison 48h", image:"/products/controller/8bitdo-ultimate.jpg" },
  { id:"pad-hall-pro", brand:"Nexus", name:"Manette Pro Hall Effect", category:"Manette", price:39, oldPrice:49, badge:"Drift-free", desc:"Sticks Hall effect.", ship:"Livraison 48h", image:"/products/controller/hall-pro.jpg" },
  // +4
  { id:"pad-razer", brand:"Razer", name:"Wolverine V2", category:"Manette", price:99, oldPrice:119, badge:"Pro", desc:"Boutons mécaniques.", ship:"Livraison 48h", image:"/products/controller/razer-wolverine.jpg" },
  { id:"pad-ps4", brand:"Sony", name:"DualShock 4", category:"Manette", price:49, oldPrice:59, badge:"PS4", desc:"Classique fiable.", ship:"Livraison 48h", image:"/products/controller/dualshock4.jpg" },
  { id:"pad-switch-pro", brand:"Nintendo", name:"Manette Pro Switch", category:"Manette", price:69, oldPrice:79, badge:"Switch", desc:"Officielle Nintendo.", ship:"Livraison 48h", image:"/products/controller/switch-pro.jpg" },
  { id:"pad-logitech", brand:"Logitech", name:"F310 (filaire)", category:"Manette", price:29, oldPrice:39, badge:"Budget", desc:"Simple et efficace.", ship:"Livraison 48h", image:"/products/controller/logitech-f310.jpg" },

  // ===================== Casques (8) =====================
  { id:"headset-hyperx", brand:"HyperX", name:"Cloud II", category:"Casque", price:79, oldPrice:99, badge:"Top", desc:"Confort + son solide.", ship:"Livraison 48h", image:"/products/headset/hyperx-cloud2.jpg" },
  { id:"headset-steelseries", brand:"SteelSeries", name:"Arctis Nova 7", category:"Casque", price:149, oldPrice:179, badge:"Sans fil", desc:"Wireless + bon micro.", ship:"Livraison 48h", image:"/products/headset/arctis-nova-7.jpg" },
  { id:"headset-logitech", brand:"Logitech", name:"G Pro X", category:"Casque", price:109, oldPrice:139, badge:"Esport", desc:"Micro Blue VO!CE.", ship:"Livraison 48h", image:"/products/headset/g-pro-x.jpg" },
  { id:"headset-nexus", brand:"Nexus", name:"Casque 7.1 Spatial Neo", category:"Casque", price:59, oldPrice:79, badge:"7.1", desc:"Spatial + confort.", ship:"Livraison 48h", image:"/products/headset/nexus-7-1.jpg" },
  // +4
  { id:"headset-sony", brand:"Sony", name:"Pulse 3D (PS5)", category:"Casque", price:89, oldPrice:99, badge:"PS5", desc:"Spatial pour PS5.", ship:"Livraison 48h", image:"/products/headset/pulse-3d.jpg" },
  { id:"headset-razer", brand:"Razer", name:"BlackShark V2", category:"Casque", price:79, oldPrice:99, badge:"FPS", desc:"Très bon en FPS.", ship:"Livraison 48h", image:"/products/headset/blackshark-v2.jpg" },
  { id:"headset-jbl", brand:"JBL", name:"Quantum 600", category:"Casque", price:99, oldPrice:129, badge:"Wireless", desc:"Sans fil polyvalent.", ship:"Livraison 48h", image:"/products/headset/jbl-quantum-600.jpg" },
  { id:"headset-corsair", brand:"Corsair", name:"HS80", category:"Casque", price:129, oldPrice:159, badge:"Confort", desc:"Très confortable.", ship:"Livraison 48h", image:"/products/headset/corsair-hs80.jpg" },

  // ===================== Simulateur (6) =====================
  { id:"sim-wheel-g29", brand:"Logitech", name:"Volant G29 + Pédales", category:"Simulateur", price:229, oldPrice:279, badge:"Racing", desc:"Le classique simracing.", ship:"Livraison 2-3 jours", image:"/products/sim/logitech-g29.jpg" },
  { id:"sim-wheel-t300", brand:"Thrustmaster", name:"T300 RS GT", category:"Simulateur", price:349, oldPrice:399, badge:"Pro", desc:"Bon force feedback.", ship:"Livraison 2-3 jours", image:"/products/sim/t300-rs.jpg" },
  { id:"sim-shifter", brand:"Thrustmaster", name:"TH8A Shifter", category:"Simulateur", price:159, oldPrice:189, badge:"Boîte", desc:"Shifter H + séquentiel.", ship:"Livraison 2-3 jours", image:"/products/sim/th8a.jpg" },
  { id:"sim-seat", brand:"Nexus", name:"Siège Sim Racing (Cockpit)", category:"Simulateur", price:299, oldPrice:349, badge:"Cockpit", desc:"Structure stable.", ship:"Livraison 3-5 jours", image:"/products/sim/cockpit.jpg" },
  { id:"sim-wheelstand", brand:"Next Level", name:"Wheel Stand Lite", category:"Simulateur", price:129, oldPrice:159, badge:"Compact", desc:"Support volant/pédales.", ship:"Livraison 3-5 jours", image:"/products/sim/wheel-stand.jpg" },
  { id:"sim-handbrake", brand:"Nexus", name:"Frein à main USB", category:"Simulateur", price:69, oldPrice:89, badge:"Drift", desc:"Pour drift / rally.", ship:"Livraison 2-3 jours", image:"/products/sim/handbrake.jpg" },

  // ===================== Stockage (6) =====================
  { id:"ssd-1tb-nvme", brand:"Samsung", name:"SSD NVMe 1To", category:"Stockage", price:79, oldPrice:99, badge:"Rapide", desc:"Chargements instant.", ship:"Livraison 48h", image:"/products/storage/ssd-1tb.jpg" },
  { id:"ssd-2tb-nvme", brand:"WD", name:"SSD NVMe 2To", category:"Stockage", price:129, oldPrice:159, badge:"2To", desc:"Grosse place.", ship:"Livraison 48h", image:"/products/storage/ssd-2tb.jpg" },
  { id:"hdd-2tb", brand:"Seagate", name:"HDD 2To", category:"Stockage", price:59, oldPrice:69, badge:"Budget", desc:"Stockage massif.", ship:"Livraison 48h", image:"/products/storage/hdd-2tb.jpg" },
  { id:"hdd-4tb", brand:"WD", name:"HDD 4To", category:"Stockage", price:99, oldPrice:119, badge:"4To", desc:"Backup + média.", ship:"Livraison 48h", image:"/products/storage/hdd-4tb.jpg" },
  { id:"ssd-sata-1tb", brand:"Crucial", name:"SSD SATA 1To", category:"Stockage", price:59, oldPrice:69, badge:"SATA", desc:"Upgrade facile.", ship:"Livraison 48h", image:"/products/storage/ssd-sata-1tb.jpg" },
  { id:"usb-128", brand:"SanDisk", name:"Clé USB 128Go", category:"Stockage", price:19, oldPrice:25, badge:"USB", desc:"Rapide et pratique.", ship:"Livraison 48h", image:"/products/storage/usb-128.jpg" },

  // ===================== Accessoires / Réseau / VR / etc (10) =====================
  { id:"vr-quest-3", brand:"Meta", name:"Quest 3", category:"VR", price:549, oldPrice:599, badge:"VR", desc:"VR standalone.", ship:"Livraison 2-3 jours", image:"/products/vr/quest-3.jpg" },
  { id:"router-wifi6", brand:"TP-Link", name:"Routeur Wi-Fi 6", category:"Réseau", price:69, oldPrice:89, badge:"Ping", desc:"Connexion stable.", ship:"Livraison 48h", image:"/products/network/router-wifi6.jpg" },
  { id:"chair-ergonomic", brand:"Nexus", name:"Chaise Ergonomique", category:"Chaise", price:149, oldPrice:179, badge:"Confort", desc:"Longues sessions ok.", ship:"Livraison 3-5 jours", image:"/products/chair/ergonomic.jpg" },
  { id:"mic-usb", brand:"Nexus", name:"Micro USB Streaming", category:"Streaming", price:49, oldPrice:69, badge:"Streamer", desc:"Voix claire.", ship:"Livraison 48h", image:"/products/stream/mic-usb.jpg" },
  { id:"webcam-1080", brand:"Logitech", name:"Webcam 1080p", category:"Streaming", price:59, oldPrice:79, badge:"Cam", desc:"Discord/Twitch.", ship:"Livraison 48h", image:"/products/stream/webcam-1080.jpg" },

  // Pour arriver à ~80 : tu peux dupliquer des variantes (marques/modèles) facilement.
  // Si tu veux, je te génère une liste complète 80/80 “finale” d’un coup dans ton app/page.tsx,
  // mais renvoie-moi ton app/page.tsx actuel.
] as const;