import Link from "next/link";
import { amazonProducts } from "@/lib/amazonProducts";

type Product = {
  id: string;
  title: string;
  subtitle?: string;
  image?: string;
  badge?: string;
  category: "Ecran" | "Souris" | "Clavier" | "Casque" | "Micro" | "Webcam" | "Chaise" | "Bureau";
};

type ProductsPageProps = {
  searchParams?: Promise<{
    category?: string;
  }>;
};

function normalize(value?: string) {
  return (value || "").toLowerCase().trim();
}

function mapCategoryParam(param?: string): Product["category"] | null {
  switch (normalize(param)) {
    case "souris":
      return "Souris";
    case "claviers":
    case "clavier":
      return "Clavier";
    case "casques":
    case "casque":
      return "Casque";
    case "ecrans":
    case "ecran":
      return "Ecran";
    case "bureaux":
    case "bureau":
      return "Bureau";
    case "chaises":
    case "chaise":
      return "Chaise";
    case "micros":
    case "micro":
      return "Micro";
    case "webcams":
    case "webcam":
      return "Webcam";
    default:
      return null;
  }
}

function getCategoryTitle(category: Product["category"] | null) {
  switch (category) {
    case "Souris":
      return "Souris Gaming";
    case "Clavier":
      return "Claviers Gaming";
    case "Casque":
      return "Casques Gaming";
    case "Ecran":
      return "Écrans Gaming";
    case "Bureau":
      return "Bureaux Gamer";
    case "Chaise":
      return "Chaises Gaming";
    case "Micro":
      return "Micros Gaming";
    case "Webcam":
      return "Webcams Gaming";
    default:
      return "Tous les produits gaming";
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

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const resolvedSearchParams = await searchParams;
  const selectedCategory = mapCategoryParam(resolvedSearchParams?.category);

  const products = selectedCategory
    ? amazonProducts.filter((product) => product.category === selectedCategory)
    : amazonProducts;

  const pageTitle = getCategoryTitle(selectedCategory);

  return (
    <main className="min-h-screen bg-[#05060a] text-white">
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-fuchsia-300">
            Produits
          </p>

          <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
            {pageTitle}
          </h1>

          <p className="mt-4 max-w-3xl text-white/70">
            Explore notre sélection de produits gaming pour améliorer ton setup :
            souris, claviers, casques, écrans, bureaux gamer, chaises et accessoires.
          </p>

          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <Link href="/products" className="rounded-full border border-white/10 px-4 py-2 text-white/80 hover:bg-white/10">
              Tous
            </Link>
            <Link href="/products?category=souris" className="rounded-full border border-white/10 px-4 py-2 text-white/80 hover:bg-white/10">
              Souris
            </Link>
            <Link href="/products?category=claviers" className="rounded-full border border-white/10 px-4 py-2 text-white/80 hover:bg-white/10">
              Claviers
            </Link>
            <Link href="/products?category=casques" className="rounded-full border border-white/10 px-4 py-2 text-white/80 hover:bg-white/10">
              Casques
            </Link>
            <Link href="/products?category=ecrans" className="rounded-full border border-white/10 px-4 py-2 text-white/80 hover:bg-white/10">
              Écrans
            </Link>
            <Link href="/products?category=bureaux" className="rounded-full border border-white/10 px-4 py-2 text-white/80 hover:bg-white/10">
              Bureaux
            </Link>
            <Link href="/products?category=chaises" className="rounded-full border border-white/10 px-4 py-2 text-white/80 hover:bg-white/10">
              Chaises
            </Link>
            <Link href="/products?category=micros" className="rounded-full border border-white/10 px-4 py-2 text-white/80 hover:bg-white/10">
              Micros
            </Link>
            <Link href="/products?category=webcams" className="rounded-full border border-white/10 px-4 py-2 text-white/80 hover:bg-white/10">
              Webcams
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {products.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-white/70">
            Aucun produit trouvé dans cette catégorie.
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => (
              <article
                key={product.id}
                className="rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:-translate-y-1 hover:bg-white/10"
              >
                {product.badge ? (
                  <span className="inline-flex rounded-full border border-orange-400/30 bg-orange-400/10 px-3 py-1 text-xs font-semibold text-orange-200">
                    {product.badge}
                  </span>
                ) : null}

                <div className="mt-4">
                  <p className="text-xs uppercase tracking-wide text-white/40">
                    {product.category}
                  </p>

                  <h2 className="mt-2 text-xl font-bold">{product.title}</h2>

                  {product.subtitle ? (
                    <p className="mt-3 text-sm leading-6 text-white/70">
                      {product.subtitle}
                    </p>
                  ) : null}
                </div>

                <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-4">
                  <h3 className="text-sm font-semibold text-white">
                    Pourquoi on le recommande
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-white/65">
                    {getRecommendation(product)}
                  </p>
                </div>

                <Link
                  href={`/products/${product.id}`}
                  className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-fuchsia-600 px-5 py-3 font-semibold text-white transition hover:bg-fuchsia-500"
                >
                  Voir le produit
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}