"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { useCart } from "@/lib/cart";

function cx(...a: Array<string | false | undefined | null>) {
  return a.filter(Boolean).join(" ");
}

function isIOSUserAgent() {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent || "";
  // iPhone/iPad/iPod + iPadOS (MacIntel + touch)
  const iOS =
    /iPhone|iPad|iPod/i.test(ua) ||
    (navigator.platform === "MacIntel" && (navigator as any).maxTouchPoints > 1);
  return iOS;
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

  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [pseudo, setPseudo] = useState<string>("");
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    setIsIOS(isIOSUserAgent());
  }, []);

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

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
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

  return (
    <div className="min-h-screen text-white relative">
    <div className="nx-bg" />
    <div className="nx-glow" />
    <div className="nx-watermark" />
    {/* ✅ Background global : lourd sur PC, léger sur iOS */}
    {!isIOS ? (
        <>
          {/* Effets PC (tu peux garder tes layers existants) */}
          <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,#2b0a3d_0%,transparent_55%),radial-gradient(ellipse_at_bottom,#120019_0%,transparent_55%)]" />
          <div className="fixed inset-0 -z-10 opacity-40 blur-3xl bg-[radial-gradient(circle_at_20%_20%,#a855f7_0%,transparent_35%),radial-gradient(circle_at_80%_30%,#7c3aed_0%,transparent_40%),radial-gradient(circle_at_50%_80%,#4c1d95_0%,transparent_45%)]" />
          {/* watermark logo léger */}
          <div
            className="fixed inset-0 -z-10 opacity-[0.10] bg-center bg-no-repeat bg-[length:520px]"
            style={{ backgroundImage: "url(/ng-logo.png)" }}
          />
        </>
      ) : (
        <>
          {/* ✅ iOS safe mode : pas de blur/backdrop-filter lourd */}
          <div className="fixed inset-0 -z-10 bg-gradient-to-b from-[#120019] via-black to-black" />
          <div
            className="fixed inset-0 -z-10 opacity-[0.12] bg-center bg-no-repeat bg-[length:320px]"
            style={{ backgroundImage: "url(/ng-logo.png)" }}
          />
        </>
      )}

      {/* Top bar */}
      <header
        className={cx(
          "sticky top-0 z-50 border-b border-white/10",
          // ✅ sur iOS on évite backdrop-blur (souvent source de crash)
          isIOS ? "bg-black/70" : "bg-black/40 backdrop-blur-xl"
        )}
      >
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between gap-3">
          <Link href="/" className="font-black tracking-tight text-lg inline-flex items-center gap-2">
            {/* ✅ petit logo en header */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/ng-logo.png" alt="Nexus Gaming" className="h-7 w-7 rounded-lg object-cover border border-white/10" />
            NEXUS<span className="text-white/60">GAMING</span>
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

                    <Link onClick={() => setOpen(false)} href="/account?tab=settings" className="block px-2 py-2 rounded-lg hover:bg-white/10 text-sm">
                      ⚙️ Mes réglages
                    </Link>
                    <Link onClick={() => setOpen(false)} href="/account?tab=orders" className="block px-2 py-2 rounded-lg hover:bg-white/10 text-sm">
                      📦 Mes commandes
                    </Link>
                    <Link onClick={() => setOpen(false)} href="/account?tab=tracking" className="block px-2 py-2 rounded-lg hover:bg-white/10 text-sm">
                      🚚 Mes suivis
                    </Link>
                    <Link onClick={() => setOpen(false)} href="/account?tab=promos" className="block px-2 py-2 rounded-lg hover:bg-white/10 text-sm">
                      🎟️ Mes codes promo
                    </Link>

                    <div className="h-px bg-white/10 my-2" />

                    <button onClick={logout} className="w-full text-left px-2 py-2 rounded-lg hover:bg-white/10 text-sm">
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

      <footer className="mx-auto max-w-6xl px-4 pb-12 text-xs text-white/50">
        © {new Date().getFullYear()} Nexus Gaming • Paiement sécurisé • Support 7j/7
      </footer>
    </div>
  );
}