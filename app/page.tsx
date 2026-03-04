"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

import AuthGate from "@/components/AuthGate";
import NexusShell from "@/components/NexusShell";
import ModalPortal from "@/components/ModalPortal";

import { amazonProducts, type AmazonProduct, type Category } from "@/lib/amazonProducts";

const year = new Date().getFullYear();

type CatFilter = "Tous" | Category;

function Chip({
  active,
  label,
  onClick,
  count,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
  count?: number;
}) {
  return (
    <button
      onClick={onClick}
      className={[
        "px-3 py-1 rounded-full text-xs font-semibold border transition inline-flex items-center gap-2",
        active
          ? "bg-white/15 border-white/20"
          : "bg-white/5 border-white/10 hover:bg-white/10",
      ].join(" ")}
    >
      <span>{label}</span>
      {typeof count === "number" ? (
        <span className="text-[11px] px-2 py-0.5 rounded-full bg-black/30 border border-white/10 text-white/70">
          {count}
        </span>
      ) : null}
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

/** Bandeau promo sticky */
function PromoBar() {
  return (
    <div className="sticky top-0 z-[60] shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
      <div className="border-b border-white/10 bg-black/40 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-center gap-2 px-3 py-2 text-xs sm:text-sm text-white/90">
          <span className="inline-flex items-center gap-2">
            <span className="animate-pulse">🔥</span>
            <span className="font-semibold">Bons plans</span> sélection{" "}
            <span className="font-semibold">Nexus</span>
          </span>
          <span className="text-white/40">•</span>
          <span>
            ✅ Achat sur <span className="font-semibold">Amazon</span>
          </span>
          <span className="text-white/40">•</span>
          <span>🔗 Liens affiliés</span>
        </div>
      </div>
    </div>
  );
}

const REVIEWS = [
  { name: "Lucas M.", text: "Sélection solide, j’ai trouvé un bon deal sur mon setup.", stars: 5 },
  { name: "Sarah T.", text: "Le filtre par catégorie est clean, ça fait gagner du temps.", stars: 5 },
  { name: "Mehdi K.", text: "Simple et efficace : je clique et j’achète direct sur Amazon.", stars: 5 },
];

const BENEFITS = [
  { icon: "🛒", title: "Achat sur Amazon", desc: "Paiement, livraison, retours gérés par Amazon" },
  { icon: "🔥", title: "Sélection Nexus", desc: "On choisit des produits gaming utiles et populaires" },
  { icon: "🧠", title: "Gagne du temps", desc: "Recherche + catégories + sélection déjà filtrée" },
  { icon: "🔗", title: "Liens affiliés", desc: "Ça nous aide à financer Nexus (sans surcoût pour toi)" },
];

function getCategories(products: AmazonProduct[]): CatFilter[] {
  const set = new Set<Category>();
  products.forEach((p) => set.add(p.category));

  const order: Category[] = ["Ecran", "Souris", "Clavier", "Casque", "Micro", "Webcam", "Chaise", "Bureau"];
  const sorted = order.filter((c) => set.has(c));

  return ["Tous", ...sorted];
}

function countByCategory(products: AmazonProduct[]) {
  const map = new Map<string, number>();
  map.set("Tous", products.length);
  for (const p of products) {
    map.set(p.category, (map.get(p.category) || 0) + 1);
  }
  return map;
}

export default function Page() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<CatFilter>("Tous");
  const [active, setActive] = useState<AmazonProduct | null>(null);

  const cats = useMemo(() => getCategories(amazonProducts), []);
  const counts = useMemo(() => countByCategory(amazonProducts), []);

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

  // scroll lock modal
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
    return amazonProducts.filter((p) => {
      const inCat = cat === "Tous" ? true : p.category === cat;
      const inSearch =
        !s ||
        p.title.toLowerCase().includes(s) ||
        (p.subtitle || "").toLowerCase().includes(s) ||
        (p.badge || "").toLowerCase().includes(s);
      return inCat && inSearch;
    });
  }, [q, cat]);

  /** Best sellers: on prend les premiers */
  const bestSellers = useMemo(() => {
    return amazonProducts.slice(0, 4).map((p, idx) => ({
      ...p,
      sold: 18 + idx * 11,
      rating: 4.6 + (3 - idx) * 0.1,
      tag: p.badge || "Top vente",
    }));
  }, []);

  return (
    <AuthGate>
      <PromoBar />

      <NexusShell
        title={`Nexus Gaming • Bons plans Amazon ${year}`}
        subtitle="Sélection gaming + filtres + détails en modal. Achat sur Amazon via liens affiliés."
      >
        {/* HERO */}
        <div className="mx-auto max-w-6xl px-4 pt-6">
          <motion.div
            className="nx-card p-6 md:p-8 overflow-hidden relative"
            style={{ transform: `translate3d(${mx * 6}px, ${my * 6}px, 0)` }}
          >
            <div className="flex flex-wrap items-center gap-2">
              <Badge text="⚡ Nexus vibe • Fond animé • Parallax" />
              <Badge text="🛒 Achat sur Amazon" />
              <Badge text="🔗 Liens affiliés" />
              <Badge text="🎮 Sélection gaming" />
            </div>

            <div className="mt-5 grid md:grid-cols-[1.2fr_.8fr] gap-6 items-end">
              <div>
                <h1 className="text-3xl md:text-5xl font-black tracking-tight">
                  Les bons plans <span className="text-white/90">Nexus {year}</span>
                </h1>
                <p className="mt-3 text-white/70 max-w-xl">
                  Choisis une catégorie, cherche un produit, et tu achètes directement sur Amazon.
                </p>

                <div className="mt-5 flex flex-col sm:flex-row gap-3">
                  <div className="flex-1">
                    <input
                      value={q}
                      onChange={(e) => setQ(e.target.value)}
                      className="nx-input w-full"
                      placeholder="Rechercher écran, clavier, souris..."
                    />
                  </div>

                  <a href="#catalogue" className="nx-btn nx-btn-primary inline-flex items-center justify-center gap-2">
                    🔥 Voir le catalogue
                  </a>
                </div>

                {/* CATEGORIES */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {cats.map((c) => (
                    <Chip
                      key={c}
                      active={cat === c}
                      label={c}
                      count={counts.get(c) || 0}
                      onClick={() => setCat(c)}
                    />
                  ))}
                </div>
              </div>

              <div className="nx-card p-4 border-white/10 bg-white/5">
                <div className="text-sm font-semibold text-white/80">Transparence</div>
                <div className="text-sm text-white/70 mt-2 leading-relaxed">
                  Les boutons redirigent vers Amazon. Certains liens sont affiliés : ça nous aide à financer Nexus,
                  sans coût en plus pour toi.
                </div>
                <div className="mt-4">
                  <a href="#catalogue" className="nx-btn nx-btn-ghost w-full text-center">
                    Découvrir la sélection
                  </a>
                </div>
              </div>
            </div>

            <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          </motion.div>
        </div>

        {/* BEST SELLERS */}
        <div className="mx-auto max-w-6xl px-4 pt-6">
          <div className="nx-card p-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold">⭐ Sélection Nexus (Top)</h2>
                <p className="text-white/70 mt-1">
                  Quelques recommandations rapides — clique et achète sur Amazon.
                </p>
              </div>

              <a href="#catalogue" className="nx-btn nx-btn-primary self-start sm:self-auto">
                Voir la sélection →
              </a>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {bestSellers.map((p) => (
                <div
                  key={p.id}
                  className="rounded-3xl border border-purple-500/25 bg-white/5 p-4 hover:bg-white/10 transition relative overflow-hidden"
                >
                  <div className="pointer-events-none absolute -top-10 -right-10 h-28 w-28 rounded-full bg-purple-500/20 blur-2xl" />

                  <div className="flex items-center justify-between relative">
                    <span className="rounded-full border border-white/10 bg-black/25 px-2 py-1 text-[11px] text-white/80">
                      {p.tag}
                    </span>
                    <span className="text-[11px] text-white/60">+{p.sold} vus</span>
                  </div>

                  {/* ✅ IMAGE CLEAN (pas coupée, pas déborde) */}
                  <div className="mt-3 relative h-44 w-full overflow-hidden rounded-2xl bg-black/30 border border-white/10">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.image}
                      alt={p.title}
                      className="absolute inset-0 h-full w-full object-contain p-3 block"
                      loading="lazy"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                  </div>

                  <div className="mt-3 text-xs text-white/60">{p.category}</div>
                  <div className="mt-1 font-semibold leading-snug">{p.title}</div>

                  <div className="mt-2">
                    <Stars value={p.rating} />
                  </div>

                  <a
                    className="nx-btn nx-btn-primary mt-4 w-full text-center"
                    href={`/go/${p.id}`}
                    rel="nofollow sponsored noopener"
                  >
                    Acheter sur Amazon
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AVIS */}
        <div className="mx-auto max-w-6xl px-4 pt-6">
          <div className="nx-card p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold">💬 Avis</h2>
                <p className="text-white/70 mt-1">L’objectif : rendre la recherche plus simple.</p>
              </div>
              <div className="hidden sm:block text-sm text-white/70">
                Note moyenne <span className="font-semibold text-white">4.8/5</span>
              </div>
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-3">
              {REVIEWS.map((r, idx) => (
                <div key={idx} className="rounded-3xl border border-white/10 bg-white/5 p-5">
                  <div className="text-white/90">
                    {Array.from({ length: r.stars }).map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                  <p className="mt-3 text-white/75 leading-relaxed">“{r.text}”</p>
                  <div className="mt-4 text-sm text-white/60">— {r.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* POURQUOI NEXUS */}
        <div className="mx-auto max-w-6xl px-4 pt-6">
          <div className="nx-card p-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold">🏆 Pourquoi Nexus ?</h2>
            <p className="text-white/70 mt-1">On te met une sélection claire, et tu achètes sur Amazon.</p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {BENEFITS.map((b) => (
                <div key={b.title} className="rounded-3xl border border-white/10 bg-white/5 p-5">
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
              <div className="text-lg font-black">
                {filtered.length} article(s){" "}
                <span className="text-white/50 font-semibold">{cat !== "Tous" ? `• ${cat}` : ""}</span>
              </div>
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
                {/* ✅ IMAGE CLEAN (plus grande + contain + pas déborde) */}
                <div className="relative h-64 w-full overflow-hidden bg-black/30 border-b border-white/10 flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.image}
                    alt={p.title}
                    className="max-h-full max-w-full object-contain p-4 block"
                    loading="lazy"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <Badge text={p.category} />
                    <Badge text={p.badge} />
                  </div>
                </div>

                <div className="p-4">
                  <div className="text-sm text-white/60">Sélection Nexus</div>
                  <div className="font-black text-lg leading-snug mt-1">{p.title}</div>

                  {p.subtitle ? <div className="mt-2 text-sm text-white/70">{p.subtitle}</div> : null}

                  <div className="mt-4 flex gap-2">
                    <button onClick={() => setActive(p)} className="nx-btn nx-btn-ghost flex-1">
                      Détails
                    </button>
                    <a
                      href={`/go/${p.id}`}
                      rel="nofollow sponsored noopener"
                      className="nx-btn nx-btn-primary flex-1 text-center"
                    >
                      Amazon
                    </a>
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
                    {/* ✅ MODAL IMAGE CLEAN */}
                    <div className="relative h-80 md:h-full w-full overflow-hidden bg-black/30 flex items-center justify-center">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={active.image}
                        alt={active.title}
                        className="max-h-full max-w-full object-contain p-5 block"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                      <div className="absolute top-3 left-3 flex gap-2">
                        <Badge text={active.category} />
                        <Badge text={active.badge} />
                        <Badge text="Amazon" />
                      </div>
                    </div>

                    <div className="p-5 md:p-6">
                      <div className="text-sm text-white/60">Sélection Nexus</div>
                      <div className="text-2xl font-black leading-tight">{active.title}</div>
                      {active.subtitle ? <p className="mt-3 text-white/75">{active.subtitle}</p> : null}

                      <div className="mt-4 nx-card p-3 bg-white/5 border-white/10">
                        <div className="text-sm font-semibold">Achat</div>
                        <div className="mt-1 text-sm text-white/70">
                          Tu seras redirigé vers Amazon pour payer et te faire livrer.
                        </div>
                      </div>

                      <div className="mt-6 flex gap-2">
                        <a
                          href={`/go/${active.id}`}
                          className="nx-btn nx-btn-primary flex-1 text-center"
                          rel="nofollow sponsored noopener"
                        >
                          Acheter sur Amazon
                        </a>

                        <button
                          className="nx-btn nx-btn-ghost flex-1 text-center"
                          onClick={() => setActive(null)}
                        >
                          Fermer
                        </button>
                      </div>
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