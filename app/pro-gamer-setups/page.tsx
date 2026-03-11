import Link from "next/link";

const setups = [
  {
    name: "Setup FPS Compétitif",
    description: "Inspiré des joueurs e-sport qui misent sur la légèreté, la vitesse et la réactivité.",
    links: [
      { label: "Souris FPS", href: "/products?category=souris" },
      { label: "Écrans rapides", href: "/products?category=ecrans" },
      { label: "Claviers compacts", href: "/products?category=claviers" },
    ],
  },
  {
    name: "Setup Streamer",
    description: "Pensé pour ceux qui jouent, discutent sur Discord et veulent aussi créer du contenu.",
    links: [
      { label: "Micros", href: "/products?category=micros" },
      { label: "Webcams", href: "/products?category=webcams" },
      { label: "Casques", href: "/products?category=casques" },
    ],
  },
  {
    name: "Setup Full Comfort",
    description: "Pour jouer longtemps avec un poste propre, plus agréable et bien organisé.",
    links: [
      { label: "Chaises", href: "/products?category=chaises" },
      { label: "Bureaux", href: "/products?category=bureaux" },
      { label: "Écrans", href: "/products?category=ecrans" },
    ],
  },
];

export default function ProGamerSetupsPage() {
  return (
    <main className="min-h-screen bg-[#05060a] px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-fuchsia-300">Setups</p>
        <h1 className="mt-3 text-3xl font-black sm:text-5xl">Setups inspirés des pro gamers</h1>
        <p className="mt-4 max-w-3xl text-white/70">Des sélections simples à explorer si tu veux construire un setup par style de joueur.</p>

        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {setups.map((setup) => (
            <section key={setup.name} className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <h2 className="text-2xl font-bold">{setup.name}</h2>
              <p className="mt-3 text-sm leading-6 text-white/70">{setup.description}</p>
              <div className="mt-5 flex flex-wrap gap-3">
                {setup.links.map((link) => (
                  <Link key={link.label} href={link.href} className="rounded-2xl border border-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/5">
                    {link.label}
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
