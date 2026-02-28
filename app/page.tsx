"use client";

import { motion, AnimatePresence } from "framer-motion";
import NexusShell from "./components/NexusShell";
import { useCart, euro } from "./lib/cart";
import { useMemo, useState } from "react";
import Link from "next/link";

const PRODUCTS: Product[] = [
  {
    id: "rtx5090",
    name: "RTX 5090 ULTRA RGB",
    brand: "NVIDIA",
    price: 2199,
    oldPrice: 2399,
    tag: "Nouveau 2026",
    delivery: "Livraison 24/48h • Point Relais dès 2,99€",
    image: "https://images.unsplash.com/photo-1612810436541-336d9f2f95c0?auto=format&fit=crop&w=1400&q=80",
    specs: ["24GB GDDR7", "DLSS 4", "Ray Tracing Gen 5", "Boost OC"],
  },
  {
    id: "ps5pro",
    name: "Console PS5 Pro Pack",
    brand: "PlayStation",
    price: 699,
    oldPrice: 749,
    tag: "Best-seller",
    delivery: "Livraison 2-3 jours • Point Relais offert dès 99€",
    image: "https://images.unsplash.com/photo-1605902711622-cfb43c44367f?auto=format&fit=crop&w=1400&q=80",
    specs: ["4K/120Hz", "SSD Ultra-rapide", "Ray Tracing", "DualSense"],
  },
  {
    id: "headset",
    name: "Casque 7.1 Spatial Neo",
    brand: "Nexus",
    price: 149,
    oldPrice: 179,
    tag: "Top audio",
    delivery: "Livraison 48h • Retours 30 jours",
    image: "https://images.unsplash.com/photo-1518444028785-8f8d3a8b3f8e?auto=format&fit=crop&w=1400&q=80",
    specs: ["7.1 virtuel", "Micro antibruit", "RGB", "USB + Jack"],
  },
  {
    id: "keyboard",
    name: "Clavier Mécanique Apex TKL",
    brand: "Nexus",
    price: 129,
    tag: "Switchs rapides",
    delivery: "Livraison 48h • Point Relais dès 2,99€",
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1400&q=80",
    specs: ["TKL compact", "Hot-swap", "RGB per-key", "Anti-ghosting"],
  },
  {
    id: "mouse",
    name: "Souris Pro 26K DPI",
    brand: "Nexus",
    price: 79,
    oldPrice: 99,
    tag: "E-sport",
    delivery: "Livraison 48h • Retours 30 jours",
    image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=1400&q=80",
    specs: ["26K DPI", "Poids 62g", "Capteur pro", "Câble paracord"],
  },
];

export default function Home() {
  const { add, count } = useCart();
  const [q, setQ] = useState("");
  const [active, setActive] = useState<Product | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return PRODUCTS;
    return PRODUCTS.filter((p) => `${p.name} ${p.brand} ${p.tag}`.toLowerCase().includes(s));
  }, [q]);

  const pop = (t: string) => {
    setToast(t);
    setTimeout(() => setToast(null), 1400);
  };

  return (
    <NexusShell
      title="Le shop gaming Nexus 2026"
      subtitle="Fond animé, glow violet, parallax souris. Produits gaming, transitions fluides, et page panier dédiée."
    >
      <section className="mx-auto max-w-6xl px-4 pb-12">
        <div className="flex flex-col md:flex-row md:items-center gap-3 justify-between">
          <div className="text-white/70 text-sm">
            🔒 Paiement sécurisé (Stripe ensuite) • 📦 Point Relais • 🔁 Retours 30j
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Rechercher GPU, console, périphériques..."
              className="flex-1 md:w-[360px] rounded-2xl border border-white/10 bg-white/5 px-4 py-3 outline-none placeholder:text-white/35"
            />
            <Link href="/cart" className="nx-btn nx-btn-ghost px-4 py-3 whitespace-nowrap">
              Panier ({count})
            </Link>
          </div>
        </div>

        <div id="produits" className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {list.map((p) => (
            <motion.article
              key={p.id}
              className="nx-card"
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 220, damping: 20 }}
            >
              <div className="relative h-52">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.image} alt={p.name} className="h-full w-full object-cover" />
                <div className="absolute top-3 left-3 rounded-full bg-black/60 border border-white/10 px-3 py-1 text-xs">
                  {p.tag}
                </div>
              </div>

              <div className="p-5">
                <div className="text-xs text-white/60">{p.brand}</div>
                <div className="mt-1 font-extrabold text-lg">{p.name}</div>

                <div className="mt-2 flex items-baseline gap-2">
                  <div className="text-xl font-black">{euro(p.price)}</div>
                  {p.oldPrice && <div className="text-sm text-white/45 line-through">{euro(p.oldPrice)}</div>}
                </div>

                <div className="mt-2 text-xs text-white/65">{p.delivery}</div>

                <div className="mt-4 flex gap-2">
                  <button className="nx-btn nx-btn-ghost flex-1" onClick={() => setActive(p)}>
                    Détails
                  </button>
                  <button
                    className="nx-btn nx-btn-primary flex-1"
                    onClick={() => {
                      add(p);
                      pop("Ajouté ✅");
                    }}
                  >
                    Ajouter
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Modal produit avec transition */}
      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.div
              className="w-full max-w-2xl rounded-3xl border border-white/10 bg-[#0b1020] overflow-hidden"
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-64">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={active.image} alt={active.name} className="h-full w-full object-cover" />
                <button onClick={() => setActive(null)} className="absolute top-3 right-3 nx-btn nx-btn-ghost px-3 py-2">
                  ✕
                </button>
              </div>

              <div className="p-6">
                <div className="text-xs text-white/60">{active.brand}</div>
                <div className="mt-1 text-2xl font-black">{active.name}</div>

                <div className="mt-2 flex items-baseline gap-2">
                  <div className="text-2xl font-black">{euro(active.price)}</div>
                  {active.oldPrice && <div className="text-sm text-white/45 line-through">{euro(active.oldPrice)}</div>}
                </div>

                <div className="mt-3 text-sm text-white/70">{active.delivery}</div>

                <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {active.specs.map((s) => (
                    <div key={s} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm">
                      {s}
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex gap-2">
                  <button
                    className="nx-btn nx-btn-primary flex-1"
                    onClick={() => {
                      add(active);
                      pop("Ajouté ✅");
                    }}
                  >
                    Ajouter au panier
                  </button>
                  <Link
                    href="/cart"
                    className="nx-btn nx-btn-ghost flex-1 text-center"
                    onClick={() => add(active)}
                  >
                    Acheter maintenant →
                  </Link>
                </div>

                <div className="mt-4 text-xs text-white/55">
                  Transitions fluides • Glow • Parallax • 2026
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[60] rounded-full border border-white/10 bg-black/70 px-4 py-2 text-sm backdrop-blur"
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </NexusShell>
  );
}