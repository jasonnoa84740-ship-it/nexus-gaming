"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

function cx(...a: Array<string | false | undefined | null>) {
  return a.filter(Boolean).join(" ");
}

export default function UserMenu() {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [pseudo, setPseudo] = useState<string>("");

  useEffect(() => {
    let mounted = true;

    supabase.auth.getUser().then((res: any) => {
      if (!mounted) return;
      const u = res.data.user;
      setUser(u);
      setPseudo(u?.user_metadata?.pseudo || "");
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event: any, session: any) => {
      const u = session?.user ?? null;
      setUser(u);
      setPseudo(u?.user_metadata?.pseudo || "");
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

  // Si pas connecté
  if (!user) {
    return (
      <Link href="/auth" className="nx-btn nx-btn-primary">
        Se connecter
      </Link>
    );
  }

  return (
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

      {open ? (
        <div
          className={cx(
            "absolute right-0 mt-2 w-64 nx-card p-2 border-white/10 bg-black/80"
          )}
          onMouseLeave={() => setOpen(false)}
        >
          <div className="px-2 py-2">
            <div className="text-sm font-black">{pseudo || "Mon profil"}</div>
            <div className="text-xs text-white/60">{user.email}</div>
          </div>

          <div className="h-px bg-white/10 my-2" />

          {/* ✅ On garde seulement Réglages + Codes promo */}
          <Link
            onClick={() => setOpen(false)}
            href="/account?tab=settings"
            className="block px-2 py-2 rounded-lg hover:bg-white/10 text-sm"
          >
            ⚙️ Mes réglages
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
      ) : null}
    </div>
  );
}