"use client";

import Link from "next/link";
import Script from "next/script";
import { motion } from "framer-motion";
import Image from "next/image";

const categories = [
  {
    title: "Souris Gaming",
    description: "Précision, légèreté et réactivité pour FPS et jeux compétitifs.",
    href: "/products?category=souris",
    emoji: "🖱️",
  },
  {
    title: "Claviers Gaming",
    description: "Claviers mécaniques performants pour améliorer ton confort.",
    href: "/products?category=claviers",
    emoji: "⌨️",
  },
  {
    title: "Casques Gaming",
    description: "Immersion audio, micro clair et confort pour longues sessions.",
    href: "/products?category=casques",
    emoji: "🎧",
  },
  {
    title: "Écrans Gaming",
    description: "144Hz, 240Hz et dalles rapides pour un gameplay fluide.",
    href: "/products?category=ecrans",
    emoji: "🖥️",
  },
  {
    title: "Micros Gaming",
    description: "Améliore la qualité de ta voix pour Discord et stream.",
    href: "/products?category=micros",
    emoji: "🎙️",
  },
  {
    title: "Webcams Gaming",
    description: "Streaming et visio plus propres pour ton setup.",
    href: "/products?category=webcams",
    emoji: "📷",
  },
  {
    title: "Chaises Gaming",
    description: "Confort et maintien pour jouer plus longtemps.",
    href: "/products?category=chaises",
    emoji: "💺",
  },
  {
    title: "Bureaux Gamer",
    description: "Des bureaux adaptés pour un setup propre et organisé.",
    href: "/products?category=bureaux",
    emoji: "🪑",
  },
];

const brands = [
  { name: "Logitech", href: "/brands/logitech" },
  { name: "Razer", href: "/brands/razer" },
  { name: "HyperX", href: "/brands/hyperx" },
  { name: "Corsair", href: "/brands/corsair" },
  { name: "SteelSeries", href: "/brands/steelseries" },
];

const featuredSections = [
  {
    title: "Comparer 2 produits",
    description:
      "Affronte deux périphériques gaming pour voir lequel te correspond le mieux.",
    href: "/compare/logitech-g-pro-x-superlight-vs-razer-viper-v2-pro",
    cta: "Voir le comparatif",
  },
  {
    title: "Build ton setup",
    description:
      "Choisis ton budget et découvre une sélection d’équipements gaming.",
    href: "/build-my-setup",
    cta: "Construire mon setup",
  },
  {
    title: "Quiz setup gamer",
    description:
      "Réponds à quelques questions et récupère une recommandation adaptée.",
    href: "/quiz",
    cta: "Faire le quiz",
  },
  {
    title: "Deals gaming",
    description: "Découvre les bons plans setup et les produits à surveiller.",
    href: "/deals",
    cta: "Voir les deals",
  },
  {
    title: "Setups de pro gamers",
    description:
      "Explore des setups inspirés des joueurs compétitifs et streamers.",
    href: "/pro-gamer-setups",
    cta: "Voir les setups",
  },
  {
    title: "Setups par budget",
    description:
      "500€, 1000€, 2000€ : trouve une base cohérente selon ton budget.",
    href: "/gaming-pc-setup",
    cta: "Voir les setups budget",
  },
];

const quickLinks = [
  { label: "Top souris gaming", href: "/top/souris" },
  { label: "Top casques gaming", href: "/top/casques" },
  { label: "Top claviers gaming", href: "/top/claviers" },
  { label: "Top écrans gaming", href: "/top/ecrans" },
  { label: "Produits Logitech", href: "/brands/logitech" },
  { label: "Produits Razer", href: "/brands/razer" },
  { label: "Produits HyperX", href: "/brands/hyperx" },
  { label: "Tous les produits", href: "/products" },
];

const guides = [
  {
    title: "Trouver la meilleure souris gaming",
    description:
      "Découvre les modèles les plus intéressants selon ton style de jeu.",
    href: "/blog",
  },
  {
    title: "Bien choisir son casque gaming",
    description: "Confort, son, micro : les vrais critères qui comptent.",
    href: "/blog",
  },
  {
    title: "Construire un setup gaming propre",
    description:
      "Bureau, chaise, écran et accessoires pour un setup plus cohérent.",
    href: "/blog",
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

      <main className="relative min-h-screen overflow-hidden bg-[#05060a] text-white">
        <div className="nx-bg" />
        <div className="nx-glow" />
        <div className="nx-watermark" />

        <div className="pointer-events-none fixed inset-0 z-[1] flex items-center justify-center">
          <div className="relative h-[520px] w-[520px] opacity-[0.13] sm:h-[720px] sm:w-[720px]">
            <div className="absolute inset-0 animate-[spin_45s_linear_infinite]">
              <Image
                src="/ng-logo.png"
                alt="NexusGamingFR background logo"
                fill
                priority
                className="object-contain blur-[1px]"
              />
            </div>
            <div className="absolute inset-0 rounded-full bg-fuchsia-500/10 blur-3xl" />
            <div className="absolute inset-[12%] rounded-full bg-cyan-500/10 blur-3xl" />
          </div>
        </div>

        <div className="pointer-events-none fixed inset-0 z-[2] bg-[linear-gradient(180deg,rgba(5,6,10,0.32)_0%,rgba(5,6,10,0.12)_25%,rgba(5,6,10,0.12)_75%,rgba(5,6,10,0.32)_100%)]" />

        <div className="relative z-10">
          <section className="px-4 pt-20 pb-16 sm:px-6 lg:px-8 lg:pt-28 lg:pb-24">
            <div className="mx-auto max-w-7xl">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mx-auto max-w-4xl text-center"
              >
                <span className="inline-flex items-center rounded-full border border-fuchsia-400/30 bg-fuchsia-400/10 px-4 py-1 text-sm text-fuchsia-200 shadow-[0_0_30px_rgba(217,70,239,0.15)] backdrop-blur-md">
                  🎮 Comparatifs, guides, tops et équipements gaming
                </span>

                <h1 className="mt-6 bg-gradient-to-r from-white via-fuchsia-100 to-cyan-100 bg-clip-text text-4xl font-black tracking-tight text-transparent sm:text-5xl lg:text-6xl">
                  Les meilleurs équipements gaming pour ton setup
                </h1>

                <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-white/75 sm:text-lg">
                  NexusGamingFR t’aide à comparer les meilleurs écrans gaming,
                  souris, claviers, casques, micros, webcams, chaises et bureaux
                  gamer pour améliorer ton setup plus facilement.
                </p>

                <form
                  action="/search"
                  className="mx-auto mt-8 flex max-w-2xl flex-col gap-3 sm:flex-row"
                >
                  <input
                    type="text"
                    name="q"
                    placeholder="Recherche une souris, un casque, une marque ou un guide..."
                    className="nx-input px-5 py-4"
                  />
                  <button className="nx-btn nx-btn-primary px-6 py-4 text-white">
                    Rechercher
                  </button>
                </form>

                <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                  <Link
                    href="/build-my-setup"
                    className="nx-btn nx-btn-primary px-6 py-3 text-white"
                  >
                    Construire mon setup
                  </Link>

                  <Link
                    href="/products"
                    className="nx-btn nx-btn-ghost px-6 py-3 text-white"
                  >
                    Voir les produits
                  </Link>
                </div>

                <div className="mt-10 flex flex-wrap justify-center gap-3 text-sm text-white/70">
                  <Link
                    href="/top/souris"
                    className="nx-btn nx-btn-ghost rounded-full px-4 py-2"
                  >
                    Top souris
                  </Link>
                  <Link
                    href="/top/casques"
                    className="nx-btn nx-btn-ghost rounded-full px-4 py-2"
                  >
                    Top casques
                  </Link>
                  <Link
                    href="/top/ecrans"
                    className="nx-btn nx-btn-ghost rounded-full px-4 py-2"
                  >
                    Top écrans
                  </Link>
                  <Link
                    href="/brands/logitech"
                    className="nx-btn nx-btn-ghost rounded-full px-4 py-2"
                  >
                    Logitech
                  </Link>
                  <Link
                    href="/brands/razer"
                    className="nx-btn nx-btn-ghost rounded-full px-4 py-2"
                  >
                    Razer
                  </Link>
                </div>
              </motion.div>
            </div>
          </section>

          <section className="px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
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
                      className="nx-card nx-hover-glow block p-6"
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
            </div>
          </section>

          <section className="px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <SectionTitle
                eyebrow="Marques"
                title="Marques gaming populaires"
                description="Explore rapidement les produits des marques les plus recherchées."
              />

              <div className="mt-8 flex flex-wrap gap-4">
                {brands.map((brand) => (
                  <Link
                    key={brand.name}
                    href={brand.href}
                    className="nx-btn nx-btn-ghost px-6 py-3 text-white"
                  >
                    {brand.name}
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <section className="px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <SectionTitle
                eyebrow="Explorer"
                title="Tout pour trouver le bon setup gaming"
                description="Compare, explore et découvre les meilleures pages du site pour choisir ton équipement plus facilement."
              />

              <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {featuredSections.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="nx-card nx-hover-glow block p-6"
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
            </div>
          </section>

          <section className="px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <SectionTitle
                eyebrow="Accès rapide"
                title="Pages utiles et recherches populaires"
                description="Un menu plus riche pour naviguer plus vite dans le site."
              />

              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {quickLinks.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="nx-card nx-hover-glow block px-5 py-4 font-medium text-white/85"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <section className="px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <SectionTitle
                eyebrow="Guides"
                title="Guides populaires pour améliorer ton setup"
                description="Des contenus utiles pour choisir plus facilement ton équipement gaming."
              />

              <div className="mt-8 grid gap-6 lg:grid-cols-3">
                {guides.map((guide) => (
                  <article key={guide.title} className="nx-card p-6">
                    <h3 className="text-xl font-bold">{guide.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-white/70">
                      {guide.description}
                    </p>
                    <Link
                      href={guide.href}
                      className="nx-btn nx-btn-primary mt-6 px-5 py-3 text-white"
                    >
                      Voir les guides
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <footer className="px-4 pt-10 pb-12 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
              <div className="grid gap-8 md:grid-cols-4">
                <div>
                  <h3 className="text-lg font-bold">NexusGamingFR</h3>
                  <p className="mt-3 text-sm leading-6 text-white/65">
                    Sélections, comparatifs, guides et setups pour améliorer ton
                    setup gaming avec des produits populaires et des conseils
                    simples.
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wide text-white/90">
                    Produits
                  </h3>
                  <ul className="mt-3 space-y-2 text-sm text-white/65">
                    <li>
                      <Link href="/products?category=souris" className="nx-link-smooth hover:text-white">
                        Souris gaming
                      </Link>
                    </li>
                    <li>
                      <Link href="/products?category=claviers" className="nx-link-smooth hover:text-white">
                        Claviers gaming
                      </Link>
                    </li>
                    <li>
                      <Link href="/products?category=casques" className="nx-link-smooth hover:text-white">
                        Casques gaming
                      </Link>
                    </li>
                    <li>
                      <Link href="/products?category=ecrans" className="nx-link-smooth hover:text-white">
                        Écrans gaming
                      </Link>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wide text-white/90">
                    Explorer
                  </h3>
                  <ul className="mt-3 space-y-2 text-sm text-white/65">
                    <li>
                      <Link href="/build-my-setup" className="nx-link-smooth hover:text-white">
                        Build ton setup
                      </Link>
                    </li>
                    <li>
                      <Link href="/quiz" className="nx-link-smooth hover:text-white">
                        Quiz gamer
                      </Link>
                    </li>
                    <li>
                      <Link href="/deals" className="nx-link-smooth hover:text-white">
                        Deals gaming
                      </Link>
                    </li>
                    <li>
                      <Link href="/pro-gamer-setups" className="nx-link-smooth hover:text-white">
                        Setups de pro gamers
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
                      <Link href="/blog" className="nx-link-smooth hover:text-white">
                        Blog
                      </Link>
                    </li>
                    <li>
                      <Link href="/privacy" className="nx-link-smooth hover:text-white">
                        Politique de confidentialité
                      </Link>
                    </li>
                    <li>
                      <Link href="/terms" className="nx-link-smooth hover:text-white">
                        Conditions d’utilisation
                      </Link>
                    </li>
                    <li>
                      <Link href="/search" className="nx-link-smooth hover:text-white">
                        Recherche
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="nx-card mt-8 p-4 text-sm leading-6 text-white/60">
                En tant que Partenaire Amazon, NexusGamingFR réalise un bénéfice
                sur les achats remplissant les conditions requises.
              </div>

              <div className="mt-6 text-xs text-white/40">
                © {year} NexusGamingFR. Tous droits réservés.
              </div>
            </div>
          </footer>
        </div>
      </main>
    </>
  );
}