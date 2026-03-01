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

/** ⭐ mini composant étoiles */
function Stars({ value }: { value: number }) {
  const full = Math.max(0, Math.min(5, Math.round(value)));
  return (
    <div className="flex items-center gap-1 text-white/90">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < full ? "opacity-100" : "opacity-30"}>
          ★
        </span>
      ))}
      <span className="ml-2 text-xs text-white/60">{value.toFixed(1)}</span>
    </div>
  );
}

function PromoBar() {
  return (
    <div className="sticky top-0 z-[60]">
      <div className="border-b border-white/10 bg-black/35 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-center gap-2 px-3 py-2 text-xs sm:text-sm text-white/90">
          <span className="inline-flex items-center gap-2">
            <span className="animate-pulse">🔥</span>
            <span className="font-semibold">-10%</span> avec{" "}
            <span className="font-semibold">NEXUS10</span>
          </span>
          <span className="text-white/40">•</span>
          <span>
            🚚 Livraison offerte dès <span className="font-semibold">79€</span>
          </span>
          <span className="text-white/40">•</span>
          <span>⚡ Stock limité sur certaines RTX</span>
        </div>
      </div>
    </div>
  );
}

const REVIEWS = [
  {
    name: "Lucas M.",
    text: "Livraison ultra rapide, GPU super bien protégé. Packaging clean.",
    stars: 5,
  },
  {
    name: "Sarah T.",
    text: "Support au top : ils m’ont aidée à choisir une config compatible.",
    stars: 5,
  },
  {
    name: "Mehdi K.",
    text: "Prix compétitifs et retour simple. Je recommande.",
    stars: 5,
  },
];

const BENEFITS = [
  {
    icon: "🔒",
    title: "Paiement sécurisé",
    desc: "Stripe / 3D Secure • checkout fiable",
  },
  {
    icon: "🚚",
    title: "Livraison rapide",
    desc: "48h standard • Express dispo",
  },
  {
    icon: "🛡️",
    title: "Garantie 2 ans",
    desc: "Constructeur officiel • SAV clair",
  },
  {
    icon: "🧠",
    title: "Support config",
    desc: "Compatibilité CPU/CM/RAM • conseils",
  },
];

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

  /** ⭐ Best sellers: on prend 4 produits “promos” ou “badgés”, sinon les 4 premiers */
  const bestSellers = useMemo(() => {
    const scored = PRODUCTS.map((p) => {
      let score = 0;
      if (p.oldPrice && p.oldPrice > p.price) score += 3; // promo
      if (p.badge) score += 2; // mis en avant
      if (p.category.toLowerCase().includes("gpu")) score += 1; // souvent top vendeur
      return { p, score };
    })
      .sort((a, b) => b.score - a.score)
      .slice(0, 4)
      .map((x, idx) => ({
        ...x.p,
        sold: 18 + idx * 11, // démo (preuve sociale visuelle)
        rating: 4.6 + (3 - idx) * 0.1, // démo
        tag: x.p.oldPrice ? "Promo" : x.p.badge || "Top vente",
      }));

    return scored;
  }, []);

  function applyPromo() {
    const code = promo.trim().toUpperCase();
    if (!code) return setPromoStatus("Entre un code promo.");
    if (code === "NEXUS10") return setPromoStatus("✅ -10% (démo)");
    if (code === "SHIPFREE") return setPromoStatus("✅ Livraison offerte (démo)");
    return setPromoStatus("❌ Code invalide.");
  }

  return (
    <AuthGate>
      {/* Phase 1: bandeau promo sticky */}
      <PromoBar />

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
                  Le shop gaming{" "}
                  <span className="text-white/90">Nexus {year}</span>
                </h1>
                <p className="mt-3 text-white/70 max-w-xl">
                  GPU, CPU, périphériques, simulateur… filtre par catégorie +
                  détails en modal.
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
                  <Chip
                    active={cat === "Tous"}
                    label="Tous"
                    onClick={() => setCat("Tous")}
                  />
                  {CATEGORIES.map((c) => (
                    <Chip
                      key={c}
                      active={cat === c}
                      label={c}
                      onClick={() => setCat(c)}
                    />
                  ))}
                </div>
              </div>

              <div className="nx-card p-4 border-white/10 bg-white/5">
                <div className="text-sm font-semibold text-white/80">
                  Promo rapide
                </div>
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
                  Livraison: 48h standard • Express disponible • Point relais dès
                  2,99€
                </div>
              </div>
            </div>

            <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          </motion.div>
        </div>

        {/* ✅ PHASE 1: BEST SELLERS */}
        <div className="mx-auto max-w-6xl px-4 pt-6">
          <div className="nx-card p-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold">
                  ⭐ Meilleures ventes Nexus
                </h2>
                <p className="text-white/70 mt-1">
                  Les produits les plus populaires en ce moment — bons deals,
                  stock qui part vite.
                </p>
              </div>

              <a href="#catalogue" className="nx-btn nx-btn-ghost self-start sm:self-auto">
                Voir tout le catalogue →
              </a>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {bestSellers.map((p) => (
                <div
                  key={p.id}
                  className="rounded-3xl border border-white/10 bg-white/5 p-4 hover:bg-white/10 transition"
                >
                  <div className="flex items-center justify-between">
                    <span className="rounded-full border border-white/10 bg-black/25 px-2 py-1 text-[11px] text-white/80">
                      {p.tag}
                    </span>
                    <span className="text-[11px] text-white/60">
                      +{p.sold} vendus
                    </span>
                  </div>

                  <div className="mt-3 aspect-[4/3] w-full overflow-hidden rounded-2xl bg-black/25 border border-white/10">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.image}
                      alt={p.name}
                      className="h-full w-full object-cover opacity-90"
                      loading="lazy"
                    />
                  </div>

                  <div className="mt-3 text-xs text-white/60">{p.brand}</div>
                  <div className="mt-1 font-semibold leading-snug">{p.name}</div>

                  <div className="mt-2">
                    <Stars value={p.rating} />
                  </div>

                  <div className="mt-3 flex items-baseline gap-2">
                    <div className="text-lg font-extrabold">{euro(p.price)}</div>
                    {p.oldPrice ? (
                      <div className="text-sm text-white/40 line-through">
                        {euro(p.oldPrice)}
                      </div>
                    ) : null}
                  </div>

                  <button
                    className="nx-btn nx-btn-primary mt-4 w-full"
                    onClick={() => add(p, 1)}
                  >
                    Ajouter au panier
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ✅ PHASE 1: AVIS */}
        <div className="mx-auto max-w-6xl px-4 pt-6">
          <div className="nx-card p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold">
                  💬 Avis clients
                </h2>
                <p className="text-white/70 mt-1">
                  La confiance, c’est la base — surtout sur du hardware.
                </p>
              </div>
              <div className="hidden sm:block text-sm text-white/70">
                Note moyenne{" "}
                <span className="font-semibold text-white">4.8/5</span>
              </div>
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-3">
              {REVIEWS.map((r, idx) => (
                <div
                  key={idx}
                  className="rounded-3xl border border-white/10 bg-white/5 p-5"
                >
                  <div className="text-white/90">
                    {Array.from({ length: r.stars }).map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                  <p className="mt-3 text-white/75 leading-relaxed">
                    “{r.text}”
                  </p>
                  <div className="mt-4 text-sm text-white/60">
                    — {r.name}{" "}
                    <span className="text-white/40">(achat vérifié)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ✅ PHASE 1: POURQUOI NEXUS */}
        <div className="mx-auto max-w-6xl px-4 pt-6">
          <div className="nx-card p-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold">
              🏆 Pourquoi acheter chez Nexus ?
            </h2>
            <p className="text-white/70 mt-1">
              On met la perf et la fiabilité devant le blabla. Et on te couvre en
              cas de souci.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {BENEFITS.map((b) => (
                <div
                  key={b.title}
                  className="rounded-3xl border border-white/10 bg-white/5 p-5"
                >
                  <div className="text-xl">{b.icon}</div>
                  <div className="mt-2 font-semibold">{b.title}</div>
                  <div className="mt-1 text-sm text-white/65">{b.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* GRID */}
        <div id="catalogue" className="mx-auto max-w-6xl px-4 pb-14 pt-8">
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