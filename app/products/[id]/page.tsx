import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { amazonProducts } from "@/lib/amazonProducts";

type Product = {
  id: string;
  title: string;
  subtitle?: string;
  image: string;
  badge?: string;
  category: "Ecran" | "Souris" | "Clavier" | "Casque" | "Micro" | "Webcam" | "Chaise" | "Bureau";
  amazonUrl?: string;
  query?: string;
};

type PageProps = {
  params: Promise<{ id: string }>;
};

function getProduct(id: string) {
  return (amazonProducts as Product[]).find((p) => p.id === id);
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

function getRecommendation(product: Product) {
  const title = product.title.toLowerCase();

  switch (product.category) {
    case "Ecran":
      if (title.includes("180hz") || title.includes("240hz")) {
        return "On recommande cet écran pour sa très bonne fluidité, particulièrement intéressante pour les jeux compétitifs et les sessions rapides.";
      }
      if (title.includes("incurvé")) {
        return "Cet écran est intéressant pour les joueurs qui cherchent une expérience plus immersive et plus confortable au quotidien.";
      }
      if (title.includes("odyssey")) {
        return "On recommande cet écran pour son orientation gaming, sa fluidité et son bon potentiel dans un setup moderne.";
      }
      return "On recommande cet écran pour améliorer la fluidité, le confort visuel et la qualité générale d’un setup gaming.";

    case "Souris":
      if (title.includes("logitech")) {
        return "Cette souris est un excellent choix pour les joueurs qui veulent précision, fiabilité et très bonne prise en main.";
      }
      if (title.includes("razer")) {
        return "On recommande cette souris pour sa réactivité et son intérêt dans les jeux rapides et compétitifs.";
      }
      return "Cette souris est intéressante pour améliorer la précision, le confort et la réactivité en jeu.";

    case "Clavier":
      if (title.includes("mecanique") || title.includes("mechanical")) {
        return "Ce clavier est un bon choix pour ceux qui veulent une frappe plus nette, plus rapide et plus agréable en session gaming.";
      }
      if (title.includes("sans fil") || title.includes("wireless")) {
        return "On recommande ce clavier pour les joueurs qui veulent plus de liberté sur le bureau sans sacrifier le confort.";
      }
      return "On recommande ce clavier pour améliorer le confort, la réactivité et l’expérience globale sur un setup gamer.";

    case "Casque":
      if (title.includes("wireless") || title.includes("sans fil")) {
        return "Ce casque est intéressant pour les joueurs qui veulent plus de liberté de mouvement sans négliger le confort.";
      }
      return "On recommande ce casque pour son immersion, son confort et son utilité dans les jeux en ligne avec communication.";

    case "Micro":
      return "Ce micro est un bon choix pour améliorer la clarté de la voix en jeu, en stream ou pendant les discussions.";

    case "Webcam":
      return "On recommande cette webcam pour les joueurs et créateurs qui veulent une image plus propre en stream ou en visio.";

    case "Chaise":
      return "Cette chaise est intéressante pour améliorer le confort et le maintien pendant les longues sessions de jeu.";

    case "Bureau":
      return "On recommande ce bureau pour construire un setup gaming plus propre, plus stable et plus pratique au quotidien.";

    default:
      return "Ce produit fait partie de notre sélection pour son intérêt dans un setup gaming.";
  }
}

function getProductFacts(product: Product) {
  const title = product.title.toLowerCase();

  switch (product.category) {
    case "Ecran":
      return [
        "Catégorie : Écran gaming",
        title.includes("incurvé")
          ? "Format orienté immersion"
          : "Pensé pour améliorer la fluidité visuelle",
        title.includes("180hz") || title.includes("240hz")
          ? "Très intéressant pour le jeu compétitif"
          : "Peut convenir à un setup gaming polyvalent",
      ];

    case "Souris":
      return [
        "Catégorie : Souris gaming",
        "Intéressante pour gagner en précision et en réactivité",
        title.includes("logitech") || title.includes("razer")
          ? "Modèle populaire chez beaucoup de joueurs"
          : "Peut convenir à plusieurs styles de jeu",
      ];

    case "Clavier":
      return [
        "Catégorie : Clavier gaming",
        title.includes("mecanique") || title.includes("mechanical")
          ? "Frappe plus nette et plus réactive"
          : "Peut améliorer le confort de jeu au quotidien",
        title.includes("sans fil") || title.includes("wireless")
          ? "Plus de liberté sur le bureau"
          : "Bon ajout pour un setup gamer stable",
      ];

    case "Casque":
      return [
        "Catégorie : Casque gaming",
        "Utile pour l’immersion et les communications en jeu",
        title.includes("wireless") || title.includes("sans fil")
          ? "Version pensée pour plus de liberté"
          : "Peut convenir aux longues sessions gaming",
      ];

    case "Micro":
      return [
        "Catégorie : Micro gaming",
        "Permet d’améliorer la clarté de la voix",
        "Utile pour le jeu en ligne, le stream ou les appels",
      ];

    case "Webcam":
      return [
        "Catégorie : Webcam gaming",
        "Intéressante pour le stream et la visio",
        "Peut améliorer le rendu vidéo d’un setup",
      ];

    case "Chaise":
      return [
        "Catégorie : Chaise gaming",
        "Pensée pour améliorer le confort d’assise",
        "Utile pour les longues sessions de jeu ou de travail",
      ];

    case "Bureau":
      return [
        "Catégorie : Bureau gamer",
        "Aide à construire un setup plus propre et mieux organisé",
        "Intéressant pour le confort et la stabilité du poste",
      ];

    default:
      return [
        `Catégorie : ${product.category}`,
        "Produit sélectionné pour setup gaming",
        "Consultation du prix via Amazon",
      ];
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
  return (amazonProducts as Product[]).map((product) => ({
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
                {getRecommendation(product)}
              </p>
            </div>

            <div className="mt-4 rounded-3xl border border-white/10 bg-white/5 p-5">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-white/90">
                À savoir
              </h2>
              <ul className="mt-3 space-y-2 text-sm leading-7 text-white/70">
                {getProductFacts(product).map((fact) => (
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