"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

import AuthGate from "@/components/AuthGate";
import NexusShell from "@/components/NexusShell";
import ModalPortal from "@/components/ModalPortal";

import { useCart, euro, type Product } from "@/lib/cart";
import { PRODUCTS, CATEGORIES, type Cat } from "@/lib/products";

const year = new Date().getFullYear();

function Chip({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={[
        "px-3 py-1 rounded-full text-xs font-semibold border transition",
        active
          ? "bg-white/15 border-white/20"
          : "bg-white/5 border-white/10 hover:bg-white/10",
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

  // parallax souris
  const [mx, setMx] = useState(0);
  const [my, setMy] = useState(0);

  useEffect(() => {
    let raf = 0;

    const onMove = (e: MouseEvent) => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      setMx((e.clientX - cx) / cx);
      setMy((e.clientY - cy) / cy);
    });
  };

  window.addEventListener("mousemove", onMove, { passive: true });

  return () => {
    cancelAnimationFrame(raf);
    window.removeEventListener("mousemove", onMove);
  };
}, []);
  // scroll lock modal (sinon t’as l’impression que “ça s’ouvre en bas”)
  useEffect(() => {
    if (!active) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
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
    if (code === "NEXUS10") return setPromoStatus("✅ -10% (démo)");
    if (code === "SHIPFREE") return setPromoStatus("✅ Livraison offerte (démo)");
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
                  GPU, CPU, périphériques, simulateur… filtre par catégorie + détails en modal.
                </p>

                <div className="mt-5 flex flex-col sm:flex-row gap-3">
                  <div className="flex-1">
                    <input
                      value={q}
                      onChange={(e) => setQ(e.target.value)}
                      className="nx-input w-full"
                      placeholder="Rechercher GPU, CPU, écran..."
                    />
                  </div>

                  <Link
                    href="/cart"
                    className="nx-btn nx-btn-primary inline-flex items-center justify-center gap-2"
                  >
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
                  <input
                    value={promo}
                    onChange={(e) => setPromo(e.target.value)}
                    className="nx-input flex-1"
                    placeholder="Code promo"
                  />
                  <button onClick={applyPromo} className="nx-btn nx-btn-ghost">
                    Appliquer
                  </button>
                </div>

                {promoStatus ? (
                  <div className="mt-2 text-xs text-white/70">{promoStatus}</div>
                ) : null}

                <div className="mt-3 text-xs text-white/60">
                  Livraison: 48h standard • Express disponible • Point relais dès 2,99€
                </div>
              </div>
            </div>

            <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          </motion.div>
        </div>

        {/* GRID */}
        <div className="mx-auto max-w-6xl px-4 pb-14 pt-8">
          <div className="flex items-end justify-between gap-3">
            <div>
              <div className="text-sm text-white/60">Résultats</div>
              <div className="text-lg font-black">{filtered.length} article(s)</div>
            </div>
            <Link href="/account" className="nx-btn nx-btn-ghost">
              👤 Mon compte
            </Link>
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
                  <img
                    src={p.image}
                    alt={p.name}
                    className="h-44 w-full object-cover opacity-90"
                    loading="lazy"
                  />
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
                      <div className="text-white/40 line-through text-sm mb-1">
                        {euro(p.oldPrice)}
                      </div>
                    ) : null}
                  </div>

                  <div className="mt-2 text-xs text-white/60">{p.ship}</div>

                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => setActive(p)}
                      className="nx-btn nx-btn-ghost flex-1"
                    >
                      Détails
                    </button>
                    <button
                      onClick={() => add(p, 1)}
                      className="nx-btn nx-btn-primary flex-1"
                    >
                      Ajouter
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* MODAL DETAILS */}
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
                      <img
                        src={active.image}
                        alt={active.name}
                        className="h-72 md:h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                      <div className="absolute top-3 left-3 flex gap-2">
                        <Badge text={active.badge} />
                        <Badge text={active.category} />
                      </div>
                    </div>

                    <div className="p-5 md:p-6">
                      <div className="text-sm text-white/60">{active.brand}</div>
                      <div className="text-2xl font-black leading-tight">
                        {active.name}
                      </div>

                      <div className="mt-2 flex items-end gap-2">
                        <div className="text-3xl font-black">{euro(active.price)}</div>
                        {active.oldPrice ? (
                          <div className="text-white/40 line-through mb-1">
                            {euro(active.oldPrice)}
                          </div>
                        ) : null}
                      </div>

                      {active.desc ? (
                        <p className="mt-3 text-white/75">{active.desc}</p>
                      ) : null}

                      <div className="mt-4 nx-card p-3 bg-white/5 border-white/10">
                        <div className="text-sm font-semibold">Livraison & Retours</div>
                        <div className="mt-1 text-sm text-white/70">
                          {active.ship}
                          <br />
                          Retours 30 jours • Support 7j/7 • Paiement sécurisé Stripe
                        </div>
                      </div>

                      <div className="mt-6 flex gap-2">
                        <button
                          onClick={() => add(active, 1)}
                          className="nx-btn nx-btn-primary flex-1"
                        >
                          Ajouter au panier
                        </button>

                        <Link
                          href="/cart"
                          className="nx-btn nx-btn-ghost flex-1 text-center"
                          onClick={() => add(active, 1)}
                        >
                          Acheter maintenant
                        </Link>
                      </div>

                      <button
                        className="mt-3 w-full text-sm text-white/60 hover:text-white/80 transition"
                        onClick={() => setActive(null)}
                      >
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