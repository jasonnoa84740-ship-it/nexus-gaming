"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import UserMenu from "./UserMenu";

function cn(...xs: Array<string | false | null | undefined>) {
  return xs.filter(Boolean).join(" ");
}

export default function NexusHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [q, setQ] = useState("");

  function goSearch(e: React.FormEvent) {
    e.preventDefault();
    const s = q.trim();
    if (!s) return;
    router.push(`/?q=${encodeURIComponent(s)}`);
  }

  const active = (href: string) =>
    pathname === href || (href !== "/" && pathname?.startsWith(href));

  return (
    <header className="sticky top-0 z-50">
      {/* top glow bar */}
      <div className="pointer-events-none absolute inset-x-0 -top-10 h-24 bg-[radial-gradient(circle_at_20%_50%,rgba(124,58,237,.45),transparent_55%),radial-gradient(circle_at_80%_50%,rgba(6,182,212,.35),transparent_55%)] blur-2xl" />

      <div className="mx-auto max-w-6xl px-4 pt-4">
        <div className="nx-card px-4 py-3 flex items-center gap-3">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-purple-500/80 to-cyan-400/70 shadow-[0_0_30px_rgba(124,58,237,.35)] border border-white/10" />
            <div className="leading-tight">
              <div className="font-black tracking-wide">
                NEXUS <span className="text-white/80">GAMING</span>
              </div>
              <div className="text-xs text-white/60">
                Bons plans gaming • Amazon
              </div>
            </div>
          </Link>

          {/* Nav */}
          <nav className="hidden lg:flex items-center gap-2 ml-2">
            <Link
              href="/"
              className={cn(
                "px-3 py-2 rounded-xl text-sm transition",
                active("/") ? "bg-white/10" : "hover:bg-white/5"
              )}
            >
              Accueil
            </Link>

            <Link
              href="/bons-plans"
              className={cn(
                "px-3 py-2 rounded-xl text-sm transition",
                active("/bons-plans") ? "bg-white/10" : "hover:bg-white/5"
              )}
            >
              🔥 Bons Plans
            </Link>

            <Link
              href="/#catalogue"
              className={cn(
                "px-3 py-2 rounded-xl text-sm transition",
                "hover:bg-white/5"
              )}
            >
              Sélection
            </Link>

            <Link
              href="/#support"
              className="px-3 py-2 rounded-xl text-sm hover:bg-white/5 transition"
            >
              Support
            </Link>
          </nav>

          {/* Search */}
          <form
            onSubmit={goSearch}
            className="hidden md:flex flex-1 justify-center"
          >
            <div className="w-full max-w-md relative">
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                className="nx-input w-full pl-10"
                placeholder="Rechercher clavier, souris, GPU..."
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/55">
                🔎
              </div>
            </div>
          </form>

          {/* Right actions */}
          <div className="ml-auto flex items-center gap-2">
            <Link href="/bons-plans" className="nx-btn nx-btn-ghost">
              🔥 <span className="hidden sm:inline">Bons plans</span>
            </Link>

            <UserMenu />
          </div>
        </div>

        {/* mobile search */}
        <div className="md:hidden mt-3">
          <form onSubmit={goSearch} className="nx-card p-3">
            <div className="relative">
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                className="nx-input w-full pl-10"
                placeholder="Rechercher..."
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-white/55">
                🔎
              </div>
            </div>
          </form>
        </div>
      </div>
    </header>
  );
}