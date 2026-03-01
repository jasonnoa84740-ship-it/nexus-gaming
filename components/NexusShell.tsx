"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { useCart } from "@/lib/cart";
import { motion, useReducedMotion } from "framer-motion";

function cx(...a: Array<string | false | undefined | null>) {
  return a.filter(Boolean).join(" ");
}

const LOGO_SRC = "/ng-logo.jpg";

function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export default function NexusShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  const { count } = useCart();
  const router = useRouter();
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [pseudo, setPseudo] = useState<string>("");

  // Parallax mouse (soft)
  const [mx, setMx] = useState(0);
  const [my, setMy] = useState(0);

  useEffect(() => {
    let mounted = true;

    supabase.auth.getUser().then(({ data }) => {
      if (!mounted) return;
      setUser(data.user);
      setPseudo(data.user?.user_metadata?.pseudo || "");
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null);
      setPseudo(session?.user?.user_metadata?.pseudo || "");
    });

    const onMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx;
      const dy = (e.clientY - cy) / cy;
      setMx(dx);
      setMy(dy);
    };

    window.addEventListener("mousemove", onMove, { passive: true });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  const initials = useMemo(() => {
    const s = (pseudo || user?.email || "U").trim();
    return s.slice(0, 1).toUpperCase();
  }, [pseudo, user?.email]);

  async function logout() {
    await supabase.auth.signOut();
    setOpen(false);
    router.replace("/auth");
  }

  // parallax fond
  const bgParallax = reduceMotion
    ? {}
    : {
        transform: `translate3d(${mx * 16}px, ${my * 16}px, 0)`,
      };

  // Particules (générées une fois)
  const particles = useMemo(() => {
    return Array.from({ length: 26 }).map((_, i) => ({
      id: i,
      left: rand(5, 95),
      top: rand(8, 92),
      size: rand(2, 5),
      dur: rand(8, 16),
      driftX: rand(-40, 40),
      driftY: rand(-30, 30),
      delay: rand(0, 4),
      opacity: rand(0.18, 0.5),
    }));
  }, []);

  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      {/* 🔮 Background layer */}
      <div aria-hidden className="fixed inset-0 -z-10">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b0016] via-[#06000d] to-black" />

        {/* Glow radial stronger */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(900px 620px at 50% 10%, rgba(168,85,247,0.28), transparent 60%), radial-gradient(800px 600px at 18% 42%, rgba(99,102,241,0.20), transparent 60%), radial-gradient(900px 700px at 82% 55%, rgba(236,72,153,0.14), transparent 60%)",
            opacity: 1,
          }}
        />

        {/* Parallax wrapper */}
        <div className="absolute inset-0" style={bgParallax}>
          {/* ✅ Logo watermark plus visible + rotation lente */}
          {reduceMotion ? (
            <div
              className="absolute left-1/2 top-[44%] -translate-x-1/2 -translate-y-1/2"
              style={{
                width: "min(980px, 92vw)",
                height: "min(980px, 92vw)",
                backgroundImage: `url(${LOGO_SRC})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "contain",
                opacity: 0.16, // ✅ plus visible
                filter: "saturate(1.25) contrast(1.15) drop-shadow(0 0 35px rgba(168,85,247,0.22))",
                mixBlendMode: "screen",
              }}
            />
          ) : (
            <motion.div
              className="absolute left-1/2 top-[44%] -translate-x-1/2 -translate-y-1/2"
              style={{
                width: "min(980px, 92vw)",
                height: "min(980px, 92vw)",
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 120, repeat: Infinity, ease: "linear" }} // ✅ rotation ultra lente
            >
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `url(${LOGO_SRC})`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                  backgroundSize: "contain",
                  opacity: 0.16, // ✅ plus visible
                  filter:
                    "saturate(1.25) contrast(1.15) drop-shadow(0 0 35px rgba(168,85,247,0.22))",
                  mixBlendMode: "screen",
                }}
              />
              {/* halo derrière */}
              <div
                className="absolute inset-0 rounded-full blur-3xl"
                style={{
                  background:
                    "radial-gradient(circle at 50% 50%, rgba(168,85,247,0.22), transparent 62%)",
                  opacity: 1,
                }}
              />
            </motion.div>
          )}

          {/* ✅ Scanline violet (balayage) */}
          {!reduceMotion && (
            <motion.div
              className="absolute left-0 right-0 h-40"
              initial={{ y: -200, opacity: 0 }}
              animate={{ y: ["-20%", "120%"], opacity: [0, 0.35, 0] }}
              transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 2 }}
              style={{
                background:
                  "linear-gradient(to bottom, transparent, rgba(168,85,247,0.25), rgba(99,102,241,0.18), transparent)",
                filter: "blur(10px)",
                mixBlendMode: "screen",
              }}
            />
          )}

          {/* ✅ Particules */}
          {!reduceMotion &&
            particles.map((p) => (
              <motion.div
                key={p.id}
                className="absolute rounded-full"
                style={{
                  left: `${p.left}%`,
                  top: `${p.top}%`,
                  width: p.size,
                  height: p.size,
                  background: "rgba(255,255,255,1)",
                  opacity: p.opacity,
                  boxShadow: "0 0 18px rgba(168,85,247,0.35)",
                }}
                animate={{
                  x: [0, p.driftX, 0],
                  y: [0, p.driftY, 0],
                  opacity: [p.opacity, Math.min(0.75, p.opacity + 0.18), p.opacity],
                }}
                transition={{
                  duration: p.dur,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: p.delay,
                }}
              />
            ))}

          {/* Animated blobs stronger */}
          {!reduceMotion ? (
            <>
              <motion.div
                className="absolute -top-44 -left-44 h-[560px] w-[560px] rounded-full blur-3xl"
                style={{ background: "rgba(168,85,247,0.26)" }}
                animate={{ x: [0, 48, 0], y: [0, 34, 0] }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute top-[18%] -right-56 h-[620px] w-[620px] rounded-full blur-3xl"
                style={{ background: "rgba(99,102,241,0.22)" }}
                animate={{ x: [0, -60, 0], y: [0, 40, 0] }}
                transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute bottom-[-260px] left-[28%] h-[720px] w-[720px] rounded-full blur-3xl"
                style={{ background: "rgba(236,72,153,0.14)" }}
                animate={{ x: [0, 60, 0], y: [0, -28, 0] }}
                transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
              />
            </>
          ) : null}
        </div>

        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.25) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.25) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* Noise overlay */}
        <div
          className="absolute inset-0 opacity-[0.06] mix-blend-overlay"
          style={{
            backgroundImage:
              "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"140\" height=\"140\"><filter id=\"n\"><feTurbulence type=\"fractalNoise\" baseFrequency=\"0.9\" numOctaves=\"3\" stitchTiles=\"stitch\"/></filter><rect width=\"140\" height=\"140\" filter=\"url(%23n)\" opacity=\"0.45\"/></svg>')",
          }}
        />
      </div>

      {/* Top bar */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/35 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between gap-3">
          {/* ✅ Logo petit + texte */}
          <Link href="/" className="flex items-center gap-2 font-black tracking-tight text-lg">
            <span className="relative h-8 w-8 rounded-xl overflow-hidden border border-white/10 bg-white/5">
              <Image src={LOGO_SRC} alt="Nexus Gaming" fill className="object-cover" priority />
            </span>
            <span>
              NEXUS<span className="text-white/60">GAMING</span>
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <Link
              href="/cart"
              className={cx("nx-btn nx-btn-ghost", pathname === "/cart" && "bg-white/10")}
            >
              🛒 Panier ({count})
            </Link>

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setOpen((v) => !v)}
                  className="nx-btn nx-btn-ghost inline-flex items-center gap-2"
                >
                  <span className="h-8 w-8 rounded-full bg-white/10 border border-white/10 grid place-items-center font-black">
                    {initials}
                  </span>
                  <span className="hidden sm:block text-left">
                    <div className="text-xs text-white/60 leading-none">Connecté</div>
                    <div className="text-sm font-semibold leading-none">{pseudo || user.email}</div>
                  </span>
                  <span className="text-white/60">▾</span>
                </button>

                {open && (
                  <div
                    className="absolute right-0 mt-2 w-64 nx-card p-2 border-white/10 bg-black/80"
                    onMouseLeave={() => setOpen(false)}
                  >
                    <div className="px-2 py-2">
                      <div className="text-sm font-black">{pseudo || "Mon profil"}</div>
                      <div className="text-xs text-white/60">{user.email}</div>
                    </div>

                    <div className="h-px bg-white/10 my-2" />

                    <Link
                      onClick={() => setOpen(false)}
                      href="/account?tab=settings"
                      className="block px-2 py-2 rounded-lg hover:bg-white/10 text-sm"
                    >
                      ⚙️ Mes réglages
                    </Link>
                    <Link
                      onClick={() => setOpen(false)}
                      href="/account?tab=orders"
                      className="block px-2 py-2 rounded-lg hover:bg-white/10 text-sm"
                    >
                      📦 Mes commandes
                    </Link>
                    <Link
                      onClick={() => setOpen(false)}
                      href="/account?tab=tracking"
                      className="block px-2 py-2 rounded-lg hover:bg-white/10 text-sm"
                    >
                      🚚 Mes suivis
                    </Link>
                    <Link
                      onClick={() => setOpen(false)}
                      href="/account?tab=promos"
                      className="block px-2 py-2 rounded-lg hover:bg-white/10 text-sm"
                    >
                      🎟️ Mes codes promo
                    </Link>
                                    
                    <button
                      onClick={logout}
                      className="w-full text-left px-2 py-2 rounded-lg hover:bg-white/10 text-sm"
                    >
                      🚪 Déconnexion
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/auth" className="nx-btn nx-btn-primary">
                Se connecter
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Page header */}
      <div className="mx-auto max-w-6xl px-4 pt-6">
        <div className="nx-card p-6 md:p-8">
          <h1 className="text-2xl md:text-4xl font-black">{title}</h1>
          {subtitle ? <p className="mt-2 text-white/70">{subtitle}</p> : null}
        </div>
      </div>

      {/* Content */}
      <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>

      {/* Footer */}
      <footer className="mx-auto max-w-6xl px-4 pb-12 text-xs text-white/50">
        © {new Date().getFullYear()} Nexus Gaming • Paiement sécurisé • Support 7j/7
      </footer>
    </div>
  );
}