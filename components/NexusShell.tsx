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

const LOGO_SRC = "/ng-logo.jpg"; // ✅ mets ton logo dans /public/ng-logo.jpg

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

  // parallax fond (logo + glow)
  const bgParallax = reduceMotion
    ? {}
    : {
        transform: `translate3d(${mx * 14}px, ${my * 14}px, 0)`,
      };

  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      {/* 🔮 Background layer (violet + logo watermark animé) */}
      <div aria-hidden className="fixed inset-0 -z-10">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#090012] via-[#05010a] to-black" />

        {/* Glow radial */}
        <div
          className="absolute inset-0 opacity-90"
          style={{
            background:
              "radial-gradient(900px 600px at 50% 10%, rgba(168,85,247,0.22), transparent 60%), radial-gradient(700px 520px at 20% 40%, rgba(99,102,241,0.16), transparent 60%), radial-gradient(700px 520px at 80% 55%, rgba(236,72,153,0.12), transparent 60%)",
          }}
        />

        {/* Parallax wrapper */}
        <div className="absolute inset-0" style={bgParallax}>
          {/* ✅ Logo watermark en fond (bouge doucement) */}
          {!reduceMotion ? (
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0.0, scale: 1.02 }}
              animate={{ opacity: 1, scale: [1.02, 1.04, 1.02] }}
              transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
            >
              <div
                className="absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2"
                style={{
                  width: "min(920px, 90vw)",
                  height: "min(920px, 90vw)",
                }}
              >
                {/* On utilise un div background-image pour “watermark” doux */}
                <div
                  className="absolute inset-0 rounded-full blur-[0px]"
                  style={{
                    backgroundImage: `url(${LOGO_SRC})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    backgroundSize: "contain",
                    opacity: 0.10,
                    filter: "saturate(1.15) contrast(1.05)",
                    mixBlendMode: "screen",
                  }}
                />
                {/* petit glow derrière le logo */}
                <div
                  className="absolute inset-0 rounded-full blur-3xl"
                  style={{
                    background:
                      "radial-gradient(circle at 50% 50%, rgba(168,85,247,0.18), transparent 60%)",
                    opacity: 0.9,
                  }}
                />
              </div>
            </motion.div>
          ) : (
            <div
              className="absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2"
              style={{
                width: "min(920px, 90vw)",
                height: "min(920px, 90vw)",
                backgroundImage: `url(${LOGO_SRC})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "contain",
                opacity: 0.10,
                filter: "saturate(1.15) contrast(1.05)",
                mixBlendMode: "screen",
              }}
            />
          )}

          {/* Animated blobs */}
          {!reduceMotion ? (
            <>
              <motion.div
                className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full blur-3xl"
                style={{ background: "rgba(168,85,247,0.22)" }}
                animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute top-[20%] -right-48 h-[560px] w-[560px] rounded-full blur-3xl"
                style={{ background: "rgba(99,102,241,0.18)" }}
                animate={{ x: [0, -50, 0], y: [0, 35, 0] }}
                transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute bottom-[-220px] left-[30%] h-[640px] w-[640px] rounded-full blur-3xl"
                style={{ background: "rgba(236,72,153,0.10)" }}
                animate={{ x: [0, 55, 0], y: [0, -25, 0] }}
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
              <Image
                src={LOGO_SRC}
                alt="Nexus Gaming"
                fill
                className="object-cover"
                priority
              />
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
                    <div className="text-sm font-semibold leading-none">
                      {pseudo || user.email}
                    </div>
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

                    <div className="h-px bg-white/10 my-2" />

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