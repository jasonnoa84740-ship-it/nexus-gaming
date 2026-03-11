"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type GameType = "fps" | "mmo" | "polyvalent";
type Budget = "petit" | "moyen" | "gros";

export default function QuizPage() {
  const [game, setGame] = useState<GameType | null>(null);
  const [budget, setBudget] = useState<Budget | null>(null);

  const result = useMemo(() => {
    if (!game || !budget) return null;

    if (game === "fps") {
      return {
        title: "Setup orienté FPS",
        links: [
          "/products?category=souris",
          "/products?category=ecrans",
          "/products?category=claviers",
        ],
      };
    }

    if (game === "mmo") {
      return {
        title: "Setup orienté MMO / confort",
        links: [
          "/products?category=souris",
          "/products?category=casques",
          "/products?category=chaises",
        ],
      };
    }

    return {
      title: "Setup polyvalent",
      links: [
        "/products?category=ecrans",
        "/products?category=casques",
        "/products?category=bureaux",
      ],
    };
  }, [game, budget]);

  return (
    <main className="min-h-screen bg-[#05060a] px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-fuchsia-300">Quiz</p>
        <h1 className="mt-3 text-3xl font-black sm:text-5xl">Quel setup gaming est fait pour toi ?</h1>

        <div className="mt-10 space-y-8 rounded-3xl border border-white/10 bg-white/5 p-6">
          <div>
            <h2 className="text-xl font-bold">1. Tu joues surtout à quoi ?</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              <button onClick={() => setGame("fps")} className={`rounded-2xl px-4 py-3 font-semibold ${game === "fps" ? "bg-fuchsia-600" : "bg-white/10"}`}>FPS</button>
              <button onClick={() => setGame("mmo")} className={`rounded-2xl px-4 py-3 font-semibold ${game === "mmo" ? "bg-fuchsia-600" : "bg-white/10"}`}>MMO / RPG</button>
              <button onClick={() => setGame("polyvalent")} className={`rounded-2xl px-4 py-3 font-semibold ${game === "polyvalent" ? "bg-fuchsia-600" : "bg-white/10"}`}>Polyvalent</button>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold">2. Ton budget ?</h2>
            <div className="mt-4 flex flex-wrap gap-3">
              <button onClick={() => setBudget("petit")} className={`rounded-2xl px-4 py-3 font-semibold ${budget === "petit" ? "bg-fuchsia-600" : "bg-white/10"}`}>Petit</button>
              <button onClick={() => setBudget("moyen")} className={`rounded-2xl px-4 py-3 font-semibold ${budget === "moyen" ? "bg-fuchsia-600" : "bg-white/10"}`}>Moyen</button>
              <button onClick={() => setBudget("gros")} className={`rounded-2xl px-4 py-3 font-semibold ${budget === "gros" ? "bg-fuchsia-600" : "bg-white/10"}`}>Gros</button>
            </div>
          </div>

          {result ? (
            <div className="rounded-3xl border border-fuchsia-400/20 bg-fuchsia-500/10 p-6">
              <h3 className="text-2xl font-bold">Résultat : {result.title}</h3>
              <div className="mt-4 flex flex-wrap gap-3">
                {result.links.map((href, index) => (
                  <Link key={`${href}-${index}`} href={href} className="rounded-2xl bg-fuchsia-600 px-5 py-3 font-semibold text-white hover:bg-fuchsia-500">
                    Voir la sélection {index + 1}
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </main>
  );
}
