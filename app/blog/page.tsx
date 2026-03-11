import fs from "fs";
import path from "path";
import Link from "next/link";

type BlogPost = {
  slug: string;
  title: string;
  description: string;
};

function getPosts(): BlogPost[] {
  const filePath = path.join(process.cwd(), "data", "blog-posts.json");

  if (!fs.existsSync(filePath)) {
    return [];
  }

  try {
    const raw = fs.readFileSync(filePath, "utf8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function getPostTheme(slug: string, title: string) {
  const text = `${slug} ${title}`.toLowerCase();

  if (text.includes("souris")) {
    return {
      label: "Guide souris",
      cta: "Lire le guide souris",
      recommendation:
        "Idéal pour comparer les meilleures souris gaming selon ton budget et ton style de jeu.",
    };
  }

  if (text.includes("casque")) {
    return {
      label: "Guide casque",
      cta: "Lire le guide casque",
      recommendation:
        "Utile pour choisir un casque gamer selon le confort, le son et la qualité du micro.",
    };
  }

  if (text.includes("clavier")) {
    return {
      label: "Guide clavier",
      cta: "Lire le guide clavier",
      recommendation:
        "Pratique pour repérer rapidement les claviers gaming les plus intéressants.",
    };
  }

  if (text.includes("ecran")) {
    return {
      label: "Guide écran",
      cta: "Lire le guide écran",
      recommendation:
        "Parfait pour mieux choisir un écran gaming selon la fluidité, la taille et le confort visuel.",
    };
  }

  if (text.includes("chaise")) {
    return {
      label: "Guide chaise",
      cta: "Lire le guide chaise",
      recommendation:
        "Un bon point de départ pour trouver une chaise gaming confortable pour les longues sessions.",
    };
  }

  if (text.includes("bureau")) {
    return {
      label: "Guide bureau",
      cta: "Lire le guide bureau",
      recommendation:
        "Utile pour construire un setup gamer propre, stable et agréable au quotidien.",
    };
  }

  return {
    label: "Guide gaming",
    cta: "Lire le guide",
    recommendation:
      "Un article utile pour mieux comprendre, comparer et choisir ton équipement gaming.",
  };
}

export default function BlogIndexPage() {
  const posts = getPosts();

  return (
    <main className="min-h-screen bg-[#05060a] text-white">
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-fuchsia-300">
            Blog
          </p>

          <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
            Guides et conseils gaming
          </h1>

          <p className="mt-4 max-w-3xl text-white/70">
            Découvre nos guides d’achat gaming pour choisir plus facilement
            les meilleurs écrans, souris, claviers, casques, bureaux gamer,
            chaises et accessoires.
          </p>

          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <Link
              href="/products?category=souris"
              className="rounded-full border border-white/10 px-4 py-2 text-white/80 hover:bg-white/10"
            >
              Souris
            </Link>
            <Link
              href="/products?category=claviers"
              className="rounded-full border border-white/10 px-4 py-2 text-white/80 hover:bg-white/10"
            >
              Claviers
            </Link>
            <Link
              href="/products?category=casques"
              className="rounded-full border border-white/10 px-4 py-2 text-white/80 hover:bg-white/10"
            >
              Casques
            </Link>
            <Link
              href="/products?category=ecrans"
              className="rounded-full border border-white/10 px-4 py-2 text-white/80 hover:bg-white/10"
            >
              Écrans
            </Link>
            <Link
              href="/products?category=bureaux"
              className="rounded-full border border-white/10 px-4 py-2 text-white/80 hover:bg-white/10"
            >
              Bureaux
            </Link>
            <Link
              href="/products?category=chaises"
              className="rounded-full border border-white/10 px-4 py-2 text-white/80 hover:bg-white/10"
            >
              Chaises
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {posts.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-white/70">
            Aucun article disponible pour le moment.
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {posts.map((post) => {
              const theme = getPostTheme(post.slug, post.title);

              return (
                <article
                  key={post.slug}
                  className="rounded-3xl border border-white/10 bg-white/5 p-6 transition hover:-translate-y-1 hover:bg-white/10"
                >
                  <span className="inline-flex rounded-full border border-fuchsia-400/30 bg-fuchsia-400/10 px-3 py-1 text-xs font-semibold text-fuchsia-200">
                    {theme.label}
                  </span>

                  <h2 className="mt-4 text-2xl font-bold leading-tight">
                    <Link href={`/blog/${post.slug}`} className="hover:text-fuchsia-300">
                      {post.title}
                    </Link>
                  </h2>

                  <p className="mt-3 text-sm leading-6 text-white/70">
                    {post.description}
                  </p>

                  <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-4">
                    <h3 className="text-sm font-semibold text-white">
                      Pourquoi lire cet article
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-white/65">
                      {theme.recommendation}
                    </p>
                  </div>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-fuchsia-600 px-5 py-3 font-semibold text-white transition hover:bg-fuchsia-500"
                  >
                    {theme.cta}
                  </Link>
                </article>
              );
            })}
          </div>
        )}
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-fuchsia-500/10 to-blue-500/10 p-6 sm:p-8">
          <h2 className="text-2xl font-black sm:text-3xl">
            Continue vers les produits
          </h2>
          <p className="mt-3 max-w-2xl text-white/70">
            Après avoir lu un guide, compare directement les produits par
            catégorie pour trouver plus vite le bon équipement gaming.
          </p>

          <div className="mt-6 flex flex-wrap gap-4">
            <Link
              href="/products"
              className="rounded-2xl bg-fuchsia-600 px-6 py-3 font-semibold text-white transition hover:bg-fuchsia-500"
            >
              Voir tous les produits
            </Link>

            <Link
              href="/products?category=ecrans"
              className="rounded-2xl border border-white/15 bg-white/5 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
            >
              Voir les écrans gaming
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}