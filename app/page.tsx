"use client";

import { PRODUCTS, CATEGORIES, type Cat } from "@/lib/products";
import ModalPortal from "@/components/ModalPortal";
import { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

import AuthGate from "@/components/AuthGate";
import NexusShell from "@/components/NexusShell";
import { useCart, euro, Product } from "@/lib/cart";

type Cat =
  | "GPU"
  | "PC"
  | "Console"
  | "Écran"
  | "Clavier"
  | "Souris"
  | "Casque"
  | "Manette"
  | "VR"
  | "Streaming"
  | "Stockage"
  | "Réseau"
  | "Chaise"
  | "Accessoires";

const year = new Date().getFullYear();


  },
  {
    id: "gpu-rx-8800",
    brand: "AMD",
    name: "Radeon RX 8800 Pulse",
    category: "GPU",
    price: 349,
    oldPrice: 399,
    badge: "Best deal",
    desc:
      "Gros FPS en 1440p, consommation maîtrisée. Idéale pour un PC gaming équilibré.",
    ship: "Livraison 48h • Point Relais offert dès 199€",
    image: "/products/gpu/rx-8800.jpg",
  },
  {
    id: "gpu-rtx-4060",
    brand: "NVIDIA",
    name: "GeForce RTX 4060 Compact",
    category: "GPU",
    price: 219,
    oldPrice: 249,
    badge: "Pas cher",
    desc:
      "Parfaite pour un premier PC gamer. DLSS, encodage stream, format compact.",
    ship: "Livraison 2-3 jours • Retours 30 jours",
    image: "/products/gpu/rtx-4060.jpg",
  },

  {
    id: "pc-starter-144",
    brand: "Nexus",
    name: "PC Starter 144FPS (1080p)",
    category: "PC",
    price: 599,
    oldPrice: 679,
    badge: "Top vente",
    desc:
      "Config prête à jouer: CPU 6 cœurs, 16Go RAM, SSD NVMe. Ultra fluide en 1080p.",
    ship: "Livraison 3-5 jours • Montage inclus",
    image: "/products/pc/starter-144.jpg",
  },
  {
    id: "pc-creator-stream",
    brand: "Nexus",
    name: "PC Stream & Creator",
    category: "PC",
    price: 799,
    oldPrice: 899,
    badge: "Streaming",
    desc:
      "Pour streamer + jouer: CPU multi-cœurs, 32Go RAM, SSD rapide. Setup stable.",
    ship: "Livraison 3-5 jours • Support 7j/7",
    image: "/products/pc/creator-stream.jpg",
  },

  {
    id: "console-ps5-slim",
    brand: "PlayStation",
    name: "Console PS5 Slim (Edition standard)",
    category: "Console",
    price: 449,
    oldPrice: 499,
    badge: "Populaire",
    desc:
      "La console incontournable pour les exclus. Plus compacte, plus silencieuse.",
    ship: "Livraison 24/48h • Point Relais 2,99€",
    image: "/products/console/ps5-slim.jpg",
  },
  {
    id: "console-switch-oled",
    brand: "Nintendo",
    name: "Switch OLED + Housse",
    category: "Console",
    price: 299,
    oldPrice: 329,
    badge: "Nomade",
    desc:
      "Écran OLED, couleurs magnifiques. Parfait pour jouer partout sans prise de tête.",
    ship: "Livraison 48h • Retours 30 jours",
    image: "/products/console/switch-oled.jpg",
  },

  {
    id: "screen-27-165",
    brand: "Nexus",
    name: 'Écran 27" 165Hz IPS (1ms)',
    category: "Écran",
    price: 169,
    oldPrice: 199,
    badge: "Smooth",
    desc: "165Hz ultra fluide, IPS colors, idéal FPS/MOBA. Support VESA.",
    ship: "Livraison 2-3 jours • Point Relais offert dès 199€",
    image: "/products/screen/27-165.jpg",
  },
  {
    id: "screen-24-144",
    brand: "Nexus",
    name: 'Écran 24" 144Hz (Gaming)',
    category: "Écran",
    price: 119,
    oldPrice: 149,
    badge: "Pas cher",
    desc: "Le bon plan 144Hz: parfait pour starter l’e-sport en 1080p.",
    ship: "Livraison 2-3 jours • Retours 30 jours",
    image: "/products/screen/24-144.jpg",
  },

  {
    id: "kbd-mecha-75",
    brand: "Nexus",
    name: "Clavier Mécanique 75% (Hot-swap)",
    category: "Clavier",
    price: 69,
    oldPrice: 89,
    badge: "Pro",
    desc: "Compact, RGB, hot-swap. Touches PBT, super feeling pour tryhard.",
    ship: "Livraison 48h • Point Relais 2,99€",
    image: "/products/keyboard/mecha-75.jpg",
  },
  {
    id: "kbd-lowprofile",
    brand: "Nexus",
    name: "Clavier Low-profile Wireless",
    category: "Clavier",
    price: 49,
    oldPrice: 59,
    badge: "Sans fil",
    desc: "Confort bureautique + gaming chill. Autonomie longue durée.",
    ship: "Livraison 48h • Retours 30 jours",
    image: "/products/keyboard/lowprofile.jpg",
  },

  {
    id: "mouse-ultralight",
    brand: "Nexus",
    name: "Souris Ultralight 59g (Wireless)",
    category: "Souris",
    price: 39,
    oldPrice: 49,
    badge: "FPS",
    desc: "Ultra légère, capteur précis, latence faible. Pour flicks rapides.",
    ship: "Livraison 48h • Point Relais 2,99€",
    image: "/products/mouse/ultralight.jpg",
  },
  {
    id: "mouse-ergo",
    brand: "Nexus",
    name: "Souris Ergonomique (Main droite)",
    category: "Souris",
    price: 29,
    oldPrice: 39,
    badge: "Confort",
    desc: "Confort long gaming, clics silencieux, prise en main naturelle.",
    ship: "Livraison 2-3 jours • Retours 30 jours",
    image: "/products/mouse/ergo.jpg",
  },

  {
    id: "headset-7-1",
    brand: "Nexus",
    name: "Casque 7.1 Spatial Neo",
    category: "Casque",
    price: 59,
    oldPrice: 79,
    badge: "Top audio",
    desc: "Spatial 7.1, micro clair, confortable. Bon pour FPS + Discord.",
    ship: "Livraison 48h • Retours 30 jours",
    image: "/products/headset/7-1.jpg",
  },
  {
    id: "headset-wireless",
    brand: "Nexus",
    name: "Casque Wireless Pro (latence low)",
    category: "Casque",
    price: 89,
    oldPrice: 109,
    badge: "Sans fil",
    desc: "Wireless stable, autonomie solide, micro détachable. Ultra clean.",
    ship: "Livraison 48h • Point Relais offert dès 199€",
    image: "/products/headset/wireless-pro.jpg",
  },

  {
    id: "pad-pro",
    brand: "Nexus",
    name: "Manette Pro (Hall Effect)",
    category: "Manette",
    price: 39,
    oldPrice: 49,
    badge: "Drift-free",
    desc:
      "Sticks Hall Effect, meilleure durée de vie, super pour Rocket League.",
    ship: "Livraison 48h • Retours 30 jours",
    image: "/products/controller/pro-hall.jpg",
  },

  {
    id: "vr-quest",
    brand: "Meta",
    name: "Casque VR (Pack Starter)",
    category: "VR",
    price: 279,
    oldPrice: 329,
    badge: "VR",
    desc: "Entrée parfaite dans la VR. Setup rapide, bibliothèque énorme.",
    ship: "Livraison 2-3 jours • Point Relais 2,99€",
    image: "/products/vr/quest-starter.jpg",
  },

  {
    id: "stream-mic",
    brand: "Nexus",
    name: "Micro Streaming USB (Anti-bruit)",
    category: "Streaming",
    price: 39,
    oldPrice: 59,
    badge: "Streamer",
    desc: "Voix claire, filtre anti-pop, installation simple. Go live direct.",
    ship: "Livraison 48h • Retours 30 jours",
    image: "/products/stream/mic-usb.jpg",
  },
  {
    id: "stream-cam",
    brand: "Nexus",
    name: "Webcam 1080p 60fps",
    category: "Streaming",
    price: 29,
    oldPrice: 39,
    badge: "60fps",
    desc: "Image fluide, autofocus correct, top pour Twitch/Discord.",
    ship: "Livraison 48h • Point Relais 2,99€",
    image: "/products/stream/webcam-1080-60.jpg",
  },

  {
    id: "ssd-1tb",
    brand: "Nexus",
    name: "SSD NVMe 1To (3500MB/s)",
    category: "Stockage",
    price: 59,
    oldPrice: 79,
    badge: "Rapide",
    desc: "Chargements instantanés, parfait pour gros jeux et Windows.",
    ship: "Livraison 48h • Retours 30 jours",
    image: "/products/storage/ssd-1tb.jpg",
  },
  {
    id: "hdd-2tb",
    brand: "Nexus",
    name: "Disque Dur 2To (Backup & jeux)",
    category: "Stockage",
    price: 49,
    oldPrice: 59,
    badge: "Budget",
    desc: "Pour stocker bibliothèque Steam, clips, sauvegardes et mods.",
    ship: "Livraison 2-3 jours • Retours 30 jours",
    image: "/products/storage/hdd-2tb.jpg",
  },

  {
    id: "router-gaming",
    brand: "Nexus",
    name: "Routeur Gaming Wi-Fi 6 (Low ping)",
    category: "Réseau",
    price: 69,
    oldPrice: 89,
    badge: "Ping",
    desc: "Wi-Fi 6, priorisation gaming, connexion stable. Adieu lag spikes.",
    ship: "Livraison 48h • Point Relais 2,99€",
    image: "/products/network/router-wifi6.jpg",
  },

  {
    id: "chair-ergonomic",
    brand: "Nexus",
    name: "Chaise Ergonomique (Support lombaires)",
    category: "Chaise",
    price: 129,
    oldPrice: 169,
    badge: "Confort",
    desc: "Confort longue session, réglages, posture meilleure (dos merci).",
    ship: "Livraison 3-5 jours • Retours 30 jours",
    image: "/products/chair/ergonomic.jpg",
  },

  {
    id: "mousepad-xl",
    brand: "Nexus",
    name: "Tapis XL (Control)",
    category: "Accessoires",
    price: 19,
    oldPrice: 25,
    badge: "Must",
    desc: "Surface control, bord cousu, parfait FPS.",
    ship: "Livraison 48h • Retours 30 jours",
    image: "/products/accessories/mousepad-xl.jpg",
  },
  {
    id: "rgb-strip",
    brand: "Nexus",
    name: "Bande LED RGB (2m) + Télécommande",
    category: "Accessoires",
    price: 15,
    oldPrice: 19,
    badge: "RGB",
    desc: "Ambiance 2026 direct. Facile à poser derrière écran/bureau.",
    ship: "Livraison 48h • Point Relais 2,99€",
    image: "/products/accessories/rgb-strip.jpg",
  },
];

];

function Chip({ active, label, onClick }: { active: boolean; label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={[
        "px-3 py-1 rounded-full text-xs font-semibold border transition",
        active ? "bg-white/15 border-white/20" : "bg-white/5 border-white/10 hover:bg-white/10",
      ].join(" ")}
    >
      {label}
    </button>
  );
}

function Badge({ text }: { text?: string }) {
  if (!text) return null;
  return (
    <span className="inline-flex items-center gap-2 px-2 py-1 rounded-full text-[11px] bg-white/10 border border-white/10">
      <span className="h-1.5 w-1.5 rounded-full bg-white/60" />
      {text}
    </span>
  );
}

export default function Page() {
  const { add, count } = useCart();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<Cat | "Tous">("Tous");
  const [active, setActive] = useState<Product | null>(null);

  const [promo, setPromo] = useState("");
  const [promoStatus, setPromoStatus] = useState<string | null>(null);

  const [mx, setMx] = useState(0);
  const [my, setMy] = useState(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      setMx((e.clientX - cx) / cx);
      setMy((e.clientY - cy) / cy);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // ✅ Scroll lock + éviter l’impression “ça s’ouvre en bas”
  useEffect(() => {
    if (!active) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // optionnel: remonter en haut si tu veux toujours le voir direct
    // window.scrollTo({ top: 0, behavior: "smooth" });
    return () => {
      document.body.style.overflow = prev;
    };
  }, [active]);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    return PRODUCTS.filter((p) => {
      const inCat = cat === "Tous" ? true : p.category === cat;
      const inSearch =
        !s ||
        p.name.toLowerCase().includes(s) ||
        p.brand.toLowerCase().includes(s) ||
        p.category.toLowerCase().includes(s);
      return inCat && inSearch;
    });
  }, [q, cat]);

  function applyPromo() {
    const code = promo.trim().toUpperCase();
    if (!code) return setPromoStatus("Entre un code promo.");
    if (code === "NEXUS10") return setPromoStatus("✅ -10% (sera appliqué au panier).");
    if (code === "SHIPFREE") return setPromoStatus("✅ Livraison offerte (sera appliqué au panier).");
    return setPromoStatus("❌ Code invalide.");
  }

  return (
    <AuthGate>
      <NexusShell
        title={`Le shop gaming Nexus ${year}`}
        subtitle="Fond animé, glow violet, parallax souris. Produits gaming, transitions fluides, et page panier dédiée."
      >
        {/* HERO */}
        <div className="mx-auto max-w-6xl px-4 pt-6">
          <motion.div
            className="nx-card p-6 md:p-8 overflow-hidden relative"
            style={{ transform: `translate3d(${mx * 6}px, ${my * 6}px, 0)` }}
          >
            <div className="flex flex-wrap items-center gap-2">
              <Badge text="⚡ Nexus vibe • Fond animé • Parallax" />
              <Badge text="🔒 Paiement sécurisé (Stripe)" />
              <Badge text="📦 Point Relais" />
              <Badge text="↩️ Retours 30 jours" />
            </div>

            <div className="mt-5 grid md:grid-cols-[1.2fr_.8fr] gap-6 items-end">
              <div>
                <h1 className="text-3xl md:text-5xl font-black tracking-tight">
                  Le shop gaming <span className="text-white/90">Nexus {year}</span>
                </h1>
                <p className="mt-3 text-white/70 max-w-xl">
                  Setup complet: GPU, consoles, périphériques, VR, streaming… prix clean, livraison rapide, et une vibe 2026.
                </p>

                <div className="mt-5 flex flex-col sm:flex-row gap-3">
                  <div className="flex-1">
                    <input
                      value={q}
                      onChange={(e) => setQ(e.target.value)}
                      className="nx-input w-full"
                      placeholder="Rechercher GPU, console, périphériques..."
                    />
                  </div>

                  <Link href="/cart" className="nx-btn nx-btn-primary inline-flex items-center justify-center gap-2">
                    🛒 Panier ({count})
                  </Link>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  <Chip active={cat === "Tous"} label="Tous" onClick={() => setCat("Tous")} />
                  {CATEGORIES.map((c) => (
                    <Chip key={c} active={cat === c} label={c} onClick={() => setCat(c)} />
                  ))}
                </div>
              </div>

              <div className="nx-card p-4 border-white/10 bg-white/5">
                <div className="text-sm font-semibold text-white/80">Promo rapide</div>
                <div className="text-xs text-white/60 mt-1">
                  Essaie: <b>NEXUS10</b> ou <b>SHIPFREE</b>
                </div>

                <div className="mt-3 flex gap-2">
                  <input value={promo} onChange={(e) => setPromo(e.target.value)} className="nx-input flex-1" placeholder="Code promo" />
                  <button onClick={applyPromo} className="nx-btn nx-btn-ghost">Appliquer</button>
                </div>

                {promoStatus ? <div className="mt-2 text-xs text-white/70">{promoStatus}</div> : null}

                <div className="mt-3 text-xs text-white/60">
                  Livraison: 48h standard • Express disponible • Point relais dès 2,99€ (souvent offert)
                </div>
              </div>
            </div>

            <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          </motion.div>
        </div>

        {/* GRID PRODUCTS */}
        <div className="mx-auto max-w-6xl px-4 pb-14 pt-8">
          <div className="flex items-end justify-between gap-3">
            <div>
              <div className="text-sm text-white/60">Résultats</div>
              <div className="text-lg font-black">{filtered.length} article(s)</div>
            </div>
            <Link href="/account" className="nx-btn nx-btn-ghost">👤 Mon compte</Link>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <motion.div
                key={p.id}
                className="nx-card overflow-hidden"
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                <div className="relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.image} alt={p.name} className="h-44 w-full object-cover opacity-90" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <Badge text={p.badge} />
                  </div>
                  <div className="absolute bottom-3 left-3 text-xs text-white/80">
                    {p.category} • {p.brand}
                  </div>
                </div>

                <div className="p-4">
                  <div className="text-sm text-white/60">{p.brand}</div>
                  <div className="font-black text-lg leading-snug">{p.name}</div>

                  <div className="mt-2 flex items-end gap-2">
                    <div className="text-2xl font-black">{euro(p.price)}</div>
                    {p.oldPrice ? (
                      <div className="text-white/40 line-through text-sm mb-1">{euro(p.oldPrice)}</div>
                    ) : null}
                  </div>

                  <div className="mt-2 text-xs text-white/60">{p.ship}</div>

                  <div className="mt-4 flex gap-2">
                    <button onClick={() => setActive(p)} className="nx-btn nx-btn-ghost flex-1">Détails</button>
                    <button onClick={() => add(p, 1)} className="nx-btn nx-btn-primary flex-1">Ajouter</button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* DETAILS MODAL */}
        <AnimatePresence>
          {active ? (
            <ModalPortal>
              <motion.div
                className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActive(null)}
              >
                <motion.div
                  className="nx-card w-full max-w-3xl overflow-hidden"
                  initial={{ y: 18, opacity: 0, scale: 0.98 }}
                  animate={{ y: 0, opacity: 1, scale: 1 }}
                  exit={{ y: 18, opacity: 0, scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 260, damping: 22 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="grid md:grid-cols-2">
                    <div className="relative">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={active.image} alt={active.name} className="h-72 md:h-full w-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                      <div className="absolute top-3 left-3 flex gap-2">
                        <Badge text={active.badge} />
                        <Badge text={active.category} />
                      </div>
                    </div>

                    <div className="p-5 md:p-6">
                      <div className="text-sm text-white/60">{active.brand}</div>
                      <div className="text-2xl font-black leading-tight">{active.name}</div>

                      <div className="mt-2 flex items-end gap-2">
                        <div className="text-3xl font-black">{euro(active.price)}</div>
                        {active.oldPrice ? (
                          <div className="text-white/40 line-through mb-1">{euro(active.oldPrice)}</div>
                        ) : null}
                      </div>

                      <p className="mt-3 text-white/75">{active.desc}</p>

                      <div className="mt-4 nx-card p-3 bg-white/5 border-white/10">
                        <div className="text-sm font-semibold">Livraison & Retours</div>
                        <div className="mt-1 text-sm text-white/70">
                          {active.ship}
                          <br />
                          Retours 30 jours • Support 7j/7 • Paiement sécurisé Stripe
                        </div>
                      </div>

                      <div className="mt-6 flex gap-2">
                        <button onClick={() => add(active, 1)} className="nx-btn nx-btn-primary flex-1">
                          Ajouter au panier
                        </button>

                        <Link href="/cart" className="nx-btn nx-btn-ghost flex-1 text-center" onClick={() => add(active, 1)}>
                          Acheter maintenant
                        </Link>
                      </div>

                      <button className="mt-3 w-full text-sm text-white/60 hover:text-white/80 transition" onClick={() => setActive(null)}>
                        Fermer
                      </button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </ModalPortal>
          ) : null}
        </AnimatePresence>
      </NexusShell>
    </AuthGate>
  );
}