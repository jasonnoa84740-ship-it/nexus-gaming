"use client";

import Link from "next/link";
import Script from "next/script";
import { motion } from "framer-motion";

const categories = [
  {
    title: "Souris Gaming",
    description: "Précision, légèreté et réactivité pour FPS, MMO et jeux compétitifs.",
    href: "/products?category=souris",
    emoji: "🖱️",
  },
  {
    title: "Claviers Gaming",
    description: "Claviers mécaniques performants pour améliorer ton confort et ta vitesse.",
    href: "/products?category=claviers",
    emoji: "⌨️",
  },
  {
    title: "Casques Gaming",
    description: "Immersion, bon micro et confort pour jouer longtemps sans compromis.",
    href: "/products?category=casques",
    emoji: "🎧",
  },
  {
    title: "Écrans Gaming",
    description: "144Hz, 240Hz et dalles rapides pour un gameplay fluide et net.",
    href: "/products?category=ecrans",
    emoji: "🖥️",
  },
  {
    title: "Micros Gaming",
    description: "Pour stream, Discord et améliorer la clarté de ta voix.",
    href: "/products?category=micros",
    emoji: "🎙️",
  },
  {
    title: "Webcams Gaming",
    description: "Idéales pour le stream, la visio et un setup créateur.",
    href: "/products?category=webcams",
    emoji: "📷",
  },
  {
    title: "Chaises Gaming",
    description: "Confort et maintien pour les longues sessions.",
    href: "/products?category=chaises",
    emoji: "💺",
  },
  {
    title: "Bureaux Gamer",
    description: "Des bureaux propres et pratiques pour un setup bien organisé.",
    href: "/products?category=bureaux",
    emoji: "🪑",
  },
];

const sections = [
  {
    title: "Comparer 2 produits",
    description: "Affronte deux périphériques en duel pour voir lequel colle le mieux à ton besoin.",
    href: "/compare/logitech-g-pro-x-superlight-vs-razer-viper-v2-pro",
    cta: "Lancer un comparatif",
  },
  {
    title: "Build ton setup",
    description: "Choisis un budget et récupère une sélection complète d’accessoires gaming.",
    href: "/build-my-setup",
    cta: "Construire mon setup",
  },
  {
    title: "Quiz setup gamer",
    description: "Réponds à quelques questions et obtiens une reco adaptée à ton style de jeu.",
    href: "/quiz",
    cta: "Faire le quiz",
  },
  {
    title: "Top produits par catégorie",
    description: "Découvre des tops dédiés pour souris, casques, écrans, claviers et plus.",
    href: "/top/souris",
    cta: "Voir les tops",
  },
  {
    title: "Deals gaming",
    description: "Une page spéciale pour les produits à surveiller et les bons plans setup.",
    href: "/deals",
    cta: "Voir les deals",
  },
  {
    title: "Setups de pro gamers",
    description: "Découvre des sélections inspirées des setups des joueurs compétitifs.",
    href: "/pro-gamer-setups",
    cta: "Voir les setups",
  },
];

const featured = [
  {
    title: "Top souris gaming",
    subtitle: "Découvre notre sélection de souris gaming pour FPS, MMO et usage polyvalent.",
    href: "/products?category=souris",
    badge: "Top catégorie",
  },
  {
    title: "Top casques gaming",
    subtitle: "Trouve un casque gaming confortable avec bon son et bon micro.",
    href: "/products?category=casques",
    badge: "Très demandé",
  },
  {
    title: "Top écrans gaming",
    subtitle: "Compare les meilleurs écrans gaming pour un setup plus fluide.",
    href: "/products?category=ecrans",
    badge: "Bon setup",
  },
];

function SectionTitle({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-3xl">
      {eyebrow ? (
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-fuchsia-300">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-2xl font-extrabold text-white sm:text-3xl">{title}</h2>
      {description ? <p className="mt-3 text-white/70">{description}</p> : null}
    </div>
  );
}

export default function HomePage() {
  const year = new Date().getFullYear();

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "NexusGamingFR",
    url: "https://nexusgamingfr.com",
  };

  return (
    <>
      <Script
        id="schema-home"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />

      <main className="min-h-screen bg-[#05060a] text-white">
        <section className="relative overflow-hidden border-b border-white/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.22),transparent_35%),radial-gradient(circle_at_right,rgba(59,130,246,0.16),transparent_30%)]" />

          <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mx-auto max-w-4xl text-center"
            >
              <span className="inline-flex items-center rounded-full border border-fuchsia-400/30 bg-fuchsia-400/10 px-4 py-1 text-sm text-fuchsia-200">
                🎮 Comparatifs, tops, guides et setups gaming
              </span>

              <h1 className="mt-6 text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
                Les meilleurs équipements gaming en {year}
              </h1>

              <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-white/75 sm:text-lg">
                NexusGamingFR t’aide à comparer les meilleurs écrans gaming, souris,
                claviers, casques, micros, webcams, chaises et bureaux gamer pour
                améliorer ton setup plus facilement.
              </p>

              <form
                action="/search"
                className="mx-auto mt-8 flex max-w-2xl flex-col gap-3 sm:flex-row"
              >
                <input
                  type="text"
                  name="q"
                  placeholder="Recherche une souris, un casque, un guide ou une marque..."
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white placeholder:text-white/35 outline-none"
                />
                <button className="rounded-2xl bg-fuchsia-600 px-6 py-4 font-semibold text-white hover:bg-fuchsia-500">
                  Rechercher
                </button>
              </form>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/build-my-setup"
                  className="rounded-2xl bg-fuchsia-600 px-6 py-3 font-semibold text-white transition hover:bg-fuchsia-500"
                >
                  Construire mon setup
                </Link>

                <Link
                  href="/quiz"
                  className="rounded-2xl border border-white/15 bg-white/5 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
                >
                  Faire le quiz gamer
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="Catégories"
            title="Trouve rapidement le bon équipement gaming"
            description="Des catégories claires pour naviguer plus vite et aller directement vers ce qui t’intéresse."
          />

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.03 }}
              >
                <Link
                  href={category.href}
                  className="block rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:-translate-y-1 hover:bg-white/10"
                >
                  <div className="text-3xl">{category.emoji}</div>
                  <h3 className="mt-4 text-xl font-bold">{category.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/65">
                    {category.description}
                  </p>
                  <span className="mt-4 inline-block text-sm font-semibold text-fuchsia-300">
                    Explorer la catégorie →
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="Fonctions"
            title="Le site passe en mode gros setup gaming"
            description="Toutes les pages qui peuvent t’aider à gagner du trafic, des clics Amazon et du temps utilisateur."
          />

          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {sections.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:-translate-y-1 hover:bg-white/10"
              >
                <h3 className="text-xl font-bold">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/65">
                  {item.description}
                </p>
                <span className="mt-5 inline-block text-sm font-semibold text-fuchsia-300">
                  {item.cta} →
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="Sélection"
            title="Produits gaming recommandés"
            description="Une sélection rapide de catégories populaires pour aller droit au but."
          />

          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {featured.map((product) => (
              <article
                key={product.title}
                className="rounded-3xl border border-white/10 bg-white/5 p-6"
              >
                <span className="inline-flex rounded-full border border-orange-400/30 bg-orange-400/10 px-3 py-1 text-xs font-semibold text-orange-200">
                  {product.badge}
                </span>

                <h3 className="mt-4 text-xl font-bold">{product.title}</h3>

                <p className="mt-3 text-sm leading-6 text-white/70">
                  {product.subtitle}
                </p>

                <Link
                  href={product.href}
                  className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-orange-500 px-5 py-3 font-semibold text-white transition hover:bg-orange-400"
                >
                  Voir la sélection
                </Link>
              </article>
            ))}
          </div>
        </section>

        <footer className="border-t border-white/10">
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <div className="grid gap-8 md:grid-cols-3">
              <div>
                <h3 className="text-lg font-bold">NexusGamingFR</h3>
                <p className="mt-3 text-sm leading-6 text-white/65">
                  Sélections, guides, comparatifs et setups pour améliorer ton
                  setup gaming avec des produits populaires et des conseils simples
                  à suivre.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-bold uppercase tracking-wide text-white/90">
                  Navigation
                </h3>
                <ul className="mt-3 space-y-2 text-sm text-white/65">
                  <li>
                    <Link href="/a-propos" className="hover:text-white">
                      À propos
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog" className="hover:text-white">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link href="/products" className="hover:text-white">
                      Produits
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-bold uppercase tracking-wide text-white/90">
                  Informations
                </h3>
                <ul className="mt-3 space-y-2 text-sm text-white/65">
                  <li>
                    <Link href="/privacy" className="hover:text-white">
                      Politique de confidentialité
                    </Link>
                  </li>
                  <li>
                    <Link href="/terms" className="hover:text-white">
                      Conditions d’utilisation
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-6 text-white/60">
              En tant que Partenaire Amazon, NexusGamingFR réalise un bénéfice sur
              les achats remplissant les conditions requises.
            </div>

            <div className="mt-6 text-xs text-white/40">
              © {year} NexusGamingFR. Tous droits réservés.
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}