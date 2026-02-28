"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "../lib/supabaseClient";

export default function UserMenu() {
  const [user, setUser] = useState<any>(null);
  const [open, setOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));

    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => sub.subscription.unsubscribe();
  }, []);

  // close on route change
  useEffect(() => setOpen(false), [pathname]);

  // close on outside click
  useEffect(() => {
    function onDown(e: MouseEvent) {
      if (!boxRef.current) return;
      if (!boxRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  async function logout() {
    await supabase.auth.signOut();
    setOpen(false);
    router.push("/");
  }

  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Link href="/login" className="nx-btn nx-btn-ghost">
          Se connecter
        </Link>
        <Link href="/signup" className="nx-btn nx-btn-primary">
          S’inscrire
        </Link>
      </div>
    );
  }

  const pseudo =
    user.user_metadata?.pseudo || user.email?.split("@")?.[0] || "Nexus";

  return (
    <div className="relative" ref={boxRef}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="nx-btn nx-btn-ghost flex items-center gap-2"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <span className="w-8 h-8 rounded-full bg-white/10 border border-white/10 flex items-center justify-center">
          <span className="font-black">{pseudo[0]?.toUpperCase()}</span>
        </span>
        <span className="hidden md:block max-w-[140px] truncate">{pseudo}</span>
        <span className="opacity-70">▾</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-64 nx-card p-2 z-50">
          <div className="px-3 py-2 text-xs text-white/60">
            Connecté en tant que <span className="text-white/90">{user.email}</span>
          </div>

          <Link
            className="block px-3 py-2 rounded-xl hover:bg-white/5 transition"
            href="/account"
          >
            👤 Profil
          </Link>
          <Link
            className="block px-3 py-2 rounded-xl hover:bg-white/5 transition"
            href="/account#orders"
          >
            📦 Mes commandes
          </Link>
          <Link
            className="block px-3 py-2 rounded-xl hover:bg-white/5 transition"
            href="/account#settings"
          >
            ⚙️ Réglages
          </Link>

          <div className="h-px bg-white/10 my-2" />

          <button
            onClick={logout}
            className="w-full text-left px-3 py-2 rounded-xl hover:bg-white/5 transition"
          >
            🚪 Déconnexion
          </button>
        </div>
      )}
    </div>
  );
}