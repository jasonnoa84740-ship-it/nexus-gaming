"use client";

import { useMemo, useState } from "react";
import NexusShell from "./components/NexusShell";
import { Product, useCart, euro } from "./lib/cart";
import Link from "next/link";

const PRODUCTS: Product[] = [
  {
    id: "gpu-5090",
    brand: "NVIDIA",
    name: "RTX 5090 ULTRA RGB",
    price: 2199,
    oldPrice: 2399,
    tag: "Nouveau 2026",
    ship: "Livraison 24/48h • Point Relais dès 2,99€",
    image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d4?auto=format&fit=crop&w=1200&q=80",
    details: ["Ray Tracing nouvelle gen", "DLSS • Perf boost", "Garantie 2 ans"],
  },
  {
    id: "ps5-pro",
    brand: "PlayStation",
    name: "Console PS5 Pro Pack",
    price: 699,
    oldPrice: 749,
    tag: "Best-seller",
    ship: "Livraison 2-3 jours • Point Relais offert dès 99€",
    image: "https://images.unsplash.com/photo-1606813909355-c7cfa7c8fef2?auto=format&fit=crop&w=1200&q=80",
    details: ["Pack prêt à jouer", "Manette + câbles", "Stock limité"],
  },
  {
    id: "headset-71",
    brand: "Nexus",
    name: "Casque 7.1 Spatial Neo",
    price: 149,
    oldPrice: 179,
    tag: "Top audio",
    ship: "Livraison 48h • Retours 30 jours",
    image: "https://images.unsplash.com/photo-1599669454699-248893623440?auto=format&fit=crop&w=1200&q=80",
    details: ["Spatial 7.1", "Micro clear", "Confort longue session"],
  },
  {
    id: "kb-mecha",
    brand: "Nexus",
    name: "Clavier Meca Aurora TKL",
    price: 129,
    oldPrice: 159,
    tag: "RGB",
    ship: "Livraison 48h • Point Relais",
    image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=1200&q=80",
    details: ["Switches premium", "TKL compact", "RGB dynamique"],
  },
  {
    id: "mouse-pro",
    brand: "Nexus",
    name: "Souris Pro 8K Sensor",
    price: 89,
    oldPrice: 109,
    tag: "E-sport",
    ship: "Livraison 48h",
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=1200&q=80",
    details: ["Capteur 8K", "Ultra légère", "Grip antidérapant"],
  },
];

export default function HomePage() {
  const { add, count } = useCart();
  const [q, setQ] = useState("");

  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return PRODUCTS;
    return PRODUCTS.filter((p) => `${p.brand} ${p.name}`.toLowerCase().includes(s));
  }, [q]);

  return (
    <NexusShell
      title="Le shop gaming Nexus 2026"
      subtitle="Fond animé, glow violet, parallax souris. Produits gaming, transitions fluides, et page panier dédiée."
    >
      <section id="produits" className="mx-auto max-w-6xl px-4 pb-16">
        <div className="flex flex-col md:flex-row md:items-center gap-3 mt-4">
          <input
            className="nx-input flex-1"
            placeholder="Rechercher GPU, console, périphériques…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <Link href="/cart" className="nx-btn nx-btn-ghost">
            Aller au panier ({count})
          </Link>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {list.map((p) => (
            <article key={p.id} className="nx-card overflow-hidden group">
              <div className="relative h-44">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.image}
                  alt={p.name}
                  className="absolute inset-0 h-full w-full object-cover opacity-90 group-hover:opacity-100 transition"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                {p.tag ? (
                  <div className="absolute left-3 top-3 nx-badge">{p.tag}</div>
                ) : null}
              </div>

              <div className="p-4">
                <div className="text-xs text-white/60">{p.brand}</div>
                <div className="text-lg font-black">{p.name}</div>

                <div className="mt-2 flex items-end gap-2">
                  <div className="text-2xl font-black">{euro(p.price)}</div>
                  {p.oldPrice ? (
                    <div className="text-white/50 line-through text-sm">{euro(p.oldPrice)}</div>
                  ) : null}
                </div>

                <div className="mt-2 text-sm text-white/70">{p.ship}</div>

                <div className="mt-4 flex gap-2">
                  <button className="nx-btn nx-btn-ghost flex-1" onClick={() => alert(p.details.join("\n"))}>
                    Détails
                  </button>
                  <button className="nx-btn nx-btn-primary flex-1" onClick={() => add(p)}>
                    Ajouter
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </NexusShell>
  );
}