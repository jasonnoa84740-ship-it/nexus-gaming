"use client";

import NexusHeader from "./NexusHeader";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useCart } from "../lib/cart";

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
  const [p, setP] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setP({ x, y });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const transform = useMemo(() => `translate3d(${p.x * 10}px, ${p.y * 10}px, 0)`, [p]);

  return (
    <main className="min-h-screen text-white overflow-x-hidden">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="nx-bg" style={{ transform }} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(124,58,237,.35),transparent_45%),radial-gradient(circle_at_70%_65%,rgba(6,182,212,.25),transparent_50%)]" />
        <div className="absolute inset-0 opacity-[.16] [background-image:linear-gradient(rgba(255,255,255,.07)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.07)_1px,transparent_1px)] [background-size:52px_52px]" />
      </div>

      {/* Top bar */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-black/35 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-purple-500 to-cyan-400 shadow-[0_0_30px_rgba(124,58,237,.35)]" />
          <div className="leading-tight">
            <div className="font-black tracking-wide">NEXUS GAMING</div>
            <div className="text-xs text-white/60">Boutique 100% gaming • 2026</div>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <Link href="/#produits" className="nx-btn nx-btn-ghost">Produits</Link>
            <Link href="/cart" className="nx-btn nx-btn-primary relative">
              🛒 Panier
              <span className="ml-2 inline-flex items-center justify-center min-w-6 h-6 px-2 rounded-full bg-white/10 border border-white/15 text-xs">
                {count}
              </span>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-4 pt-10 pb-6">
        <div className="nx-card p-8 md:p-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
            ⚡ Nexus vibe • Fond animé • Parallax
          </div>
          <h1 className="mt-4 text-4xl md:text-6xl font-black tracking-tight">
            {title}
          </h1>
          {subtitle ? <p className="mt-3 text-white/70 max-w-2xl">{subtitle}</p> : null}

          <div className="mt-6 flex flex-wrap gap-2 text-sm text-white/75">
            <span className="nx-chip">🔒 Paiement sécurisé (Stripe)</span>
            <span className="nx-chip">📦 Point relais</span>
            <span className="nx-chip">↩️ Retours 30j</span>
            <span className="nx-chip">⚡ Expédition 24/48h</span>
          </div>
        </div>
      </section>

      {children}
    </main>
  );
}