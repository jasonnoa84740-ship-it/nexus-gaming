"use client";

import Link from "next/link";
import Script from "next/script";
import { motion } from "framer-motion";

type Category = {
  title: string;
  description: string;
  href: string;
  emoji: string;
};

type Product = {
  title: string;
  subtitle: string;
  href: string;
  badge?: string;
  priceLabel?: string;
  rating?: number;
};

type Guide = {
  title: string;
  description: string;
  href: string;
};

const categories: Category[] = [
  {
    title: "Souris Gaming",
    description: "Précision, légèreté et réactivité pour FPS, MMO et jeux compétitifs.",
    href: "/products",
    emoji: "🖱️",
  },
  {
    title: "Claviers Gaming",
    description: "Claviers mécaniques performants pour améliorer ton confort et ta vitesse.",
    href: "/products",
    emoji: "⌨️",
  },
  {
    title: "Casques Gaming",
    description: "Immersion, bon micro et confort pour jouer longtemps sans compromis.",
    href: "/products",
    emoji: "🎧",
  },
  {
    title: "Écrans Gaming",
    description: "144Hz, 240Hz et dalles rapides pour un gameplay fluide et net.",
    href: "/products",
    emoji: "🖥️",
  },
  {
    title: "Bureaux Gamer",
    description: "Des bureaux solides et pratiques pour un setup propre et efficace.",
    href: "/products",
    emoji: "🪑",
  },
  {
    title: "Chaises Gaming",
    description: "Confort et maintien pour les longues sessions de jeu ou de stream.",
    href: "/products",
    emoji: "💺",
  },
];

const featuredProducts: Product[] = [
  {
    title: "Logitech G Pro X Superlight",
    subtitle: "Une souris gaming ultra légère très appréciée pour les jeux compétitifs.",
    href: "/products",
    badge: "Top FPS",
    priceLabel: "Voir le prix",
    rating: 4.8,
  },
  {
    title: "SteelSeries Arctis Nova 7",
    subtitle: "Casque gaming confortable avec bon son, bon micro et excellente polyvalence.",
    href: "/products",
    badge: "Très recommandé",
    priceLabel: "Voir le prix",
    rating: 4.7,
  },
  {
    title: "ASUS TUF Gaming 144Hz",
    subtitle: "Un écran gaming fluide et efficace pour booster ton setup sans te ruiner.",
    href: "/products",
    badge: "Bon rapport qualité/prix",
    priceLabel: "Voir le prix",
    rating: 4.6,
  },
];

const guides: Guide[] = [
  {
    title: "Meilleure souris gaming",
    description: "Notre sélection des meilleures souris gaming selon ton budget et ton style de jeu.",
    href: "/blog/guide-souris-gaming",
  },
  {
    title: "Meilleur casque gaming",
    description: "Compare les meilleurs casques gamer pour le confort, le son et le micro.",
    href: "/blog/guide-casque-gaming",
  },
  {
    title: "Meilleur clavier gaming",
    description: "Les meilleurs claviers mécaniques gaming pour FPS, MMO et usage polyvalent.",
    href: "/blog/guide-clavier-gaming",
  },
  {
    title: "Meilleur écran gaming 144Hz",
    description: "Notre guide pour choisir un écran gaming fluide, net et adapté à ton setup.",
    href: "/blog/comment-choisir-un-ecran-gaming",
  },
  {
    title: "Meilleure chaise gaming",
    description: "Trouve une chaise gamer confortable et adaptée aux longues sessions.",
    href: "/blog/comment-choisir-une-chaise-gaming",
  },
  {
    title: "Meilleur bureau gamer",
    description: "Les meilleurs bureaux pour construire un setup gaming propre et pratique.",
    href: "/blog/comment-choisir-un-bureau-gaming",
  },
];

const faq = [
  {
    q: "NexusGamingFR vend-il directement les produits ?",
    a: "Non. NexusGamingFR sélectionne, compare et recommande des équipements gaming. Les achats se font ensuite via les pages produits et les liens partenaires.",
  },
  {
    q: "Comment choisissez-vous les produits ?",
    a: "Nous mettons en avant des produits populaires, utiles pour un setup gaming et pertinents selon différents budgets.",
  },
  {
    q: "Pourquoi consulter les guides d’achat ?",
    a: "Les guides permettent de comparer rapidement les options, de mieux comprendre les critères importants et de choisir un produit plus facilement.",
  },
];

function Stars({ value = 4.8 }: { value?: number }) {
  const rounded = Math.round(value);

  return (
    <div className="flex items-center gap-1" aria-label={`Note ${value} sur 5`}>
      <div className="flex">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} className={i < rounded ? "text-yellow-400" : "text-white/20"}>
            ★
          </span>
        ))}
      </div>
      <span className="text-sm text-white/60">{value.toFixed(1)}/5</span>
    </div>
  );
}

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

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "NexusGamingFR",
    url: "https://nexusgamingfr.com",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <>
      <Script
        id="schema-website"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <Script
        id="schema-organization"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <Script
        id="schema-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
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
                🎮 Guides, comparatifs et sélections gaming
              </span>

              <h1 className="mt-6 text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
                Les meilleurs équipements gaming en {year}
              </h1>

              <p className="mx-auto mt-6 max-w-3xl text-base leading-8 text-white/75 sm:text-lg">
                NexusGamingFR t’aide à comparer les meilleurs écrans gaming, souris,
                claviers mécaniques, casques, bureaux gamer, chaises et accessoires
                pour améliorer ton setup plus facilement.
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="#produits"
                  className="rounded-2xl bg-fuchsia-600 px-6 py-3 font-semibold text-white transition hover:bg-fuchsia-500"
                >
                  Voir les produits recommandés
                </Link>
                <Link
                  href="#guides"
                  className="rounded-2xl border border-white/15 bg-white/5 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
                >
                  Voir les guides d’achat
                </Link>
              </div>

              <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                  <p className="text-2xl font-black">Setup</p>
                  <p className="mt-1 text-sm text-white/65">
                    Des sélections utiles pour améliorer ton bureau gaming
                  </p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                  <p className="text-2xl font-black">Guides</p>
                  <p className="mt-1 text-sm text-white/65">
                    Des articles pour choisir plus vite et éviter les mauvais achats
                  </p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
                  <p className="text-2xl font-black">Comparatifs</p>
                  <p className="mt-1 text-sm text-white/65">
                    Un site pensé pour aider avant de cliquer, pas juste lister des produits
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="categories" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="Catégories"
            title="Trouve rapidement le bon équipement gaming"
            description="Des catégories claires pour naviguer plus vite et aller directement vers le type de produit qui t’intéresse."
          />

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.04 }}
              >
                <Link
                  href={category.href}
                  className="block rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:-translate-y-1 hover:bg-white/10"
                >
                  <div className="text-3xl">{category.emoji}</div>
                  <h3 className="mt-4 text-xl font-bold">{category.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/65">{category.description}</p>
                  <span className="mt-4 inline-block text-sm font-semibold text-fuchsia-300">
                    Explorer la catégorie →
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="produits" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="Sélection"
            title="Produits gaming recommandés"
            description="Une sélection rapide de produits populaires pour ceux qui veulent aller droit au but."
          />

          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {featuredProducts.map((product, index) => (
              <motion.article
                key={product.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="rounded-3xl border border-white/10 bg-white/5 p-6"
              >
                {product.badge ? (
                  <span className="inline-flex rounded-full border border-orange-400/30 bg-orange-400/10 px-3 py-1 text-xs font-semibold text-orange-200">
                    {product.badge}
                  </span>
                ) : null}

                <h3 className="mt-4 text-xl font-bold">{product.title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/70">{product.subtitle}</p>

                <div className="mt-4">
                  <Stars value={product.rating} />
                </div>

                <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-4">
                  <h4 className="text-sm font-semibold text-white">Pourquoi on le recommande</h4>
                  <p className="mt-2 text-sm leading-6 text-white/65">
                    Ce produit fait partie de notre sélection pour son bon rapport
                    qualité/prix, sa popularité et sa pertinence pour améliorer un setup gamer.
                  </p>
                </div>

                <Link
                  href={product.href}
                  className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-orange-500 px-5 py-3 font-semibold text-white transition hover:bg-orange-400"
                >
                  {product.priceLabel ?? "Voir le prix"}
                </Link>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="guides" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 sm:p-8">
            <SectionTitle
              eyebrow="SEO + Conversion"
              title="Guides d’achat gaming"
              description="C’est ici que ton site peut vraiment commencer à ramener du trafic Google et à convertir mieux qu’un simple catalogue."
            />

            <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {guides.map((guide, index) => (
                <motion.div
                  key={guide.title}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.04 }}
                >
                  <Link
                    href={guide.href}
                    className="block rounded-3xl border border-white/10 bg-black/20 p-5 transition hover:bg-white/10"
                  >
                    <h3 className="text-lg font-bold">{guide.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-white/65">{guide.description}</p>
                    <span className="mt-4 inline-block text-sm font-semibold text-fuchsia-300">
                      Lire le guide →
                    </span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="Pourquoi NexusGamingFR"
            title="Un site pensé pour aider à choisir plus vite"
            description="L’idée n’est pas de noyer le visiteur sous trop de produits, mais de l’aider à trouver le bon équipement selon son besoin."
          />

          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {[
              "Sélections claires et utiles",
              "Guides d’achat orientés setup gaming",
              "Navigation simple par catégories",
              "Accès rapide aux produits",
            ].map((item) => (
              <div
                key={item}
                className="rounded-3xl border border-white/10 bg-white/5 p-6 text-white/85"
              >
                <p className="font-semibold">{item}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionTitle
            eyebrow="FAQ"
            title="Questions fréquentes"
            description="Une section utile pour rassurer les visiteurs et enrichir la page sur le plan SEO."
          />

          <div className="mt-8 space-y-4">
            {faq.map((item) => (
              <details
                key={item.q}
                className="rounded-3xl border border-white/10 bg-white/5 p-5"
              >
                <summary className="cursor-pointer list-none font-semibold">
                  {item.q}
                </summary>
                <p className="mt-3 text-sm leading-6 text-white/70">{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] border border-fuchsia-400/20 bg-gradient-to-br from-fuchsia-500/10 to-blue-500/10 p-8 text-center">
            <h2 className="text-2xl font-black sm:text-3xl">
              Commence par les meilleurs guides du site
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-white/70">
              Si ton objectif est d’avoir plus de trafic et plus de clics, les comparatifs
              et guides d’achat sont le levier le plus rentable.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/blog/guide-souris-gaming"
                className="rounded-2xl bg-fuchsia-600 px-6 py-3 font-semibold text-white transition hover:bg-fuchsia-500"
              >
                Voir le guide souris gaming
              </Link>
              <Link
                href="/blog/guide-casque-gaming"
                className="rounded-2xl border border-white/15 bg-white/5 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                Voir le guide casque gaming
              </Link>
            </div>
          </div>
        </section>

        <footer className="border-t border-white/10">
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <div className="grid gap-8 md:grid-cols-3">
              <div>
                <h3 className="text-lg font-bold">NexusGamingFR</h3>
                <p className="mt-3 text-sm leading-6 text-white/65">
                  Sélections, guides et comparatifs pour améliorer ton setup gaming
                  avec des produits populaires et des conseils simples à suivre.
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
              En tant que Partenaire Amazon, NexusGamingFR réalise un bénéfice sur les
              achats remplissant les conditions requises.
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