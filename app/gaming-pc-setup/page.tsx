import Link from "next/link";

const setupPages = [
  {
    title: "Setup gaming 500€",
    description: "Pour démarrer proprement avec l’essentiel sans exploser le budget.",
    href: "/build-my-setup",
  },
  {
    title: "Setup gaming 1000€",
    description: "Un bon milieu pour viser un setup plus confortable et plus équilibré.",
    href: "/build-my-setup",
  },
  {
    title: "Setup gaming 2000€",
    description: "Pour viser un setup beaucoup plus premium avec plus de confort et d’image.",
    href: "/build-my-setup",
  },
  {
    title: "Setup streamer",
    description: "Ajoute webcam, micro et confort pour un espace plus propre à l’écran.",
    href: "/pro-gamer-setups",
  },
];

export default function GamingPcSetupPage() {
  return (
    <main className="min-h-screen bg-[#05060a] px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-fuchsia-300">Setups budget</p>
        <h1 className="mt-3 text-3xl font-black sm:text-5xl">Setups gaming par budget</h1>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {setupPages.map((item) => (
            <section key={item.title} className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <h2 className="text-2xl font-bold">{item.title}</h2>
              <p className="mt-3 text-sm leading-6 text-white/70">{item.description}</p>
              <Link href={item.href} className="mt-5 inline-flex rounded-2xl bg-fuchsia-600 px-5 py-3 font-semibold text-white hover:bg-fuchsia-500">
                Ouvrir
              </Link>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
