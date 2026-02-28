"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useCart } from "../lib/cart";

export default function NexusShell({
  title,
  subtitle,
  children,
}: {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  const { count } = useCart();
  const [mx, setMx] = useState(0);
  const [my, setMy] = useState(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMx(x);
      setMy(y);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div className="min-h-screen text-white overflow-x-hidden">
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#070A12]/70 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-purple-600 to-cyan-400 shadow-lg shadow-purple-600/20" />
            <div>
              <div className="font-black tracking-wide leading-none">NEXUS GAMING</div>
              <div className="text-xs text-white/60">Boutique 100% gaming • 2026</div>
            </div>
          </Link>

          <div className="ml-auto">
            <Link href="/cart" className="relative nx-btn nx-btn-ghost px-4 py-2">
              🛒 Panier
              {count > 0 && (
                <span className="absolute -top-2 -right-2 text-xs font-bold bg-purple-600 px-2 py-1 rounded-full">
                  {count}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        {(title || subtitle) && (
          <section className="mx-auto max-w-6xl px-4 pt-10 pb-6">
            <motion.div
              className="nx-card p-6 md:p-10 shadow-2xl shadow-purple-600/10"
              style={{
                transform: `perspective(900px) rotateY(${mx * 4}deg) rotateX(${my * -3}deg)`,
              }}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                ⚡ Nexus vibe • Fond animé • Parallax
              </div>
              {title && (
                <h1 className="mt-4 text-4xl md:text-6xl font-black tracking-tight">{title}</h1>
              )}
              {subtitle && <p className="mt-4 text-white/70 max-w-2xl">{subtitle}</p>}
            </motion.div>
          </section>
        )}

        {children}
      </motion.div>
    </div>
  );
}