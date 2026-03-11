import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { amazonProducts } from "@/lib/amazonProducts";
import { getUniqueFacts, getUniqueRecommendation } from "@/lib/productContent";

type Product = (typeof amazonProducts)[number];

type PageProps = {
  params: Promise<{ id: string }>;
};

function getProduct(id: string) {
  return amazonProducts.find((p) => p.id === id);
}

function getCategoryHref(category?: string) {
  switch (category) {
    case "Souris":
      return "/products?category=souris";
    case "Clavier":
      return "/products?category=claviers";
    case "Casque":
      return "/products?category=casques";
    case "Ecran":
      return "/products?category=ecrans";
    case "Bureau":
      return "/products?category=bureaux";
    case "Chaise":
      return "/products?category=chaises";
    case "Micro":
      return "/products?category=micros";
    case "Webcam":
      return "/products?category=webcams";
    default:
      return "/products";
  }
}

function getCategoryLabel(category?: string) {
  switch (category) {
    case "Souris":
      return "Souris Gaming";
    case "Clavier":
      return "Clavier Gaming";
    case "Casque":
      return "Casque Gaming";
    case "Ecran":
      return "Écran Gaming";
    case "Bureau":
      return "Bureau Gamer";
    case "Chaise":
      return "Chaise Gaming";
    case "Micro":
      return "Micro Gaming";
    case "Webcam":
      return "Webcam Gaming";
    default:
      return "Produit Gaming";
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const product = getProduct(id);

  if (!product) {
    return {
      title: "Produit introuvable | Nexus Gaming FR",
      description: "Le produit demandé est introuvable sur Nexus Gaming FR.",
    };
  }

  const description =
    product.subtitle || `${product.title} : sélection gaming recommandée par Nexus Gaming FR.`;

  return {
    title: `${product.title} | Nexus Gaming FR`,
    description,
    alternates: {
      canonical: `https://nexusgamingfr.com/products/${product.id}`,
    },
    openGraph: {
      title: `${product.title} | Nexus Gaming FR`,
      description,
      url: `https://nexusgamingfr.com/products/${product.id}`,
      siteName: "Nexus Gaming FR",
      images: product.image ? [{ url: product.image, alt: product.title }] : [],
      locale: "fr_FR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.title} | Nexus Gaming FR`,
      description,
      images: product.image ? [product.image] : [],
    },
  };
}

export function generateStaticParams() {
  return amazonProducts.map((product) => ({
    id: product.id,
  }));
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;
  const product = getProduct(id);

  if (!product) return notFound();

  const hasAmazonUrl = Boolean((product.amazonUrl || "").trim());
  const amazonSearchUrl = `https://www.amazon.fr/s?k=${encodeURIComponent(
    product.query || product.title
  )}`;
  const goUrl = hasAmazonUrl ? `/go/${product.id}` : amazonSearchUrl;

  const categoryHref = getCategoryHref(product.category);
  const categoryLabel = getCategoryLabel(product.category);

  const description =
    product.subtitle || `${product.title} : sélection gaming recommandée par Nexus Gaming FR.`;

  const recommendation = getUniqueRecommendation(product);
  const facts = getUniqueFacts(product);

  const similarProducts = amazonProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description,
    image: product.image ? [product.image] : [],
    category: product.category,
    brand: {
      "@type": "Brand",
      name: "Nexus Gaming FR",
    },
    offers: {
      "@type": "Offer",
      url: `https://nexusgamingfr.com/products/${product.id}`,
      availability: "https://schema.org/InStock",
      priceCurrency: "EUR",
      seller: {
        "@type": "Organization",
        name: "Amazon",
      },
    },
  };

  return (
    <main className="min-h-screen bg-[#05060a] text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />

      <section className="border-b border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-3 text-sm text-white/60">
            <Link href="/" className="hover:text-white">
              Accueil
            </Link>
            <span>/</span>
            <Link href="/products" className="hover:text-white">
              Produits
            </Link>
            <span>/</span>
            <Link href={categoryHref} className="hover:text-white">
              {categoryLabel}
            </Link>
            <span>/</span>
            <span className="text-white/85">{product.title}</span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-4">
            <div className="relative h-[420px] overflow-hidden rounded-[1.5rem] bg-black/20 sm:h-[520px]">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-contain p-4"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex rounded-full border border-fuchsia-400/30 bg-fuchsia-400/10 px-3 py-1 text-sm text-fuchsia-200">
                {categoryLabel}
              </span>

              {product.badge ? (
                <span className="inline-flex rounded-full border border-orange-400/30 bg-orange-400/10 px-3 py-1 text-sm text-orange-200">
                  {product.badge}
                </span>
              ) : null}
            </div>

            <h1 className="mt-5 text-3xl font-black tracking-tight sm:text-4xl">
              {product.title}
            </h1>

            <p className="mt-4 text-base leading-7 text-white/75">
              {description}
            </p>

            <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-5">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-white/90">
                Pourquoi on le recommande
              </h2>
              <p className="mt-3 text-sm leading-7 text-white/70">
                {recommendation}
              </p>
            </div>

            <div className="mt-4 rounded-3xl border border-white/10 bg-white/5 p-5">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-white/90">
                À savoir
              </h2>
              <ul className="mt-3 space-y-2 text-sm leading-7 text-white/70">
                {facts.map((fact) => (
                  <li key={fact}>• {fact}</li>
                ))}
              </ul>
            </div>

            <div className="mt-4 rounded-3xl border border-white/10 bg-white/5 p-5 text-sm leading-7 text-white/70">
              Certains liens présents sur cette page sont des liens affiliés.
              Si tu passes commande, Nexus Gaming FR peut toucher une commission,
              sans coût supplémentaire pour toi.
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href={goUrl}
                rel="nofollow sponsored noopener"
                className="inline-flex flex-1 items-center justify-center rounded-2xl bg-orange-500 px-5 py-3 font-semibold text-white transition hover:bg-orange-400"
              >
                Voir sur Amazon
              </a>

              <Link
                href={categoryHref}
                className="inline-flex items-center justify-center rounded-2xl border border-white/10 px-5 py-3 font-semibold text-white transition hover:bg-white/5"
              >
                Voir la catégorie
              </Link>

              <Link
                href="/products"
                className="inline-flex items-center justify-center rounded-2xl border border-white/10 px-5 py-3 font-semibold text-white transition hover:bg-white/5"
              >
                Tous les produits
              </Link>
            </div>
          </div>
        </div>
      </section>

      {similarProducts.length ? (
        <section className="mx-auto max-w-6xl px-4 pb-12 sm:px-6 lg:px-8">
          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 sm:p-8">
            <h2 className="text-2xl font-black sm:text-3xl">Produits similaires</h2>

            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {similarProducts.map((item) => (
                <article
                  key={item.id}
                  className="rounded-2xl border border-white/10 bg-black/20 p-4"
                >
                  <p className="text-xs uppercase tracking-wide text-white/40">
                    {item.category}
                  </p>

                  <h3 className="mt-2 font-bold">{item.title}</h3>

                  <p className="mt-2 text-sm text-white/65">
                    {getUniqueRecommendation(item)}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <Link
                      href={`/products/${item.id}`}
                      className="rounded-xl bg-fuchsia-600 px-3 py-2 text-sm font-semibold text-white hover:bg-fuchsia-500"
                    >
                      Voir la fiche
                    </Link>

                    <a
                      href={`/go/${item.id}`}
                      className="rounded-xl border border-white/10 px-3 py-2 text-sm font-semibold text-white hover:bg-white/5"
                    >
                      Amazon
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="mx-auto max-w-6xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-fuchsia-500/10 to-blue-500/10 p-6 sm:p-8">
          <h2 className="text-2xl font-black sm:text-3xl">
            Continue ta recherche
          </h2>
          <p className="mt-3 max-w-2xl text-white/70">
            Compare d’autres produits gaming, explore la catégorie de ce produit
            ou consulte nos guides pour choisir plus facilement.
          </p>

          <div className="mt-6 flex flex-wrap gap-4">
            <Link
              href={categoryHref}
              className="rounded-2xl bg-fuchsia-600 px-6 py-3 font-semibold text-white transition hover:bg-fuchsia-500"
            >
              Explorer {categoryLabel}
            </Link>

            <Link
              href="/blog"
              className="rounded-2xl border border-white/15 bg-white/5 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              Voir les guides
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}