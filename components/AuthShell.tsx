"use client";

import Link from "next/link";

export default function AuthShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      {/* Fond Nexus (violet + glow) */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_20%_20%,rgba(168,85,247,0.22),transparent_60%),radial-gradient(1000px_600px_at_80%_30%,rgba(99,102,241,0.18),transparent_60%),radial-gradient(900px_600px_at_50%_90%,rgba(236,72,153,0.10),transparent_60%)]" />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-purple-500/20 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />
      </div>

      {/* Header simple */}
      <header className="relative z-10 mx-auto max-w-6xl px-4 py-4">
        <Link href="/" className="font-black tracking-tight text-lg">
          NEXUS<span className="text-white/60">GAMING</span>
        </Link>
      </header>

      {/* Card */}
      <main className="relative z-10 min-h-[calc(100vh-72px)] flex items-center justify-center px-4">
        <div className="nx-card p-6 max-w-md w-full">
          <h1 className="text-xl font-black">{title}</h1>
          {subtitle ? <p className="text-white/70 mt-2 text-sm">{subtitle}</p> : null}
          <div className="mt-4">{children}</div>
        </div>
      </main>
    </div>
  );
}