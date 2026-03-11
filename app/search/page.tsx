import fs from "fs";
import path from "path";
import Link from "next/link";
import { amazonProducts } from "@/lib/amazonProducts";
import { getUniqueRecommendation } from "@/lib/productContent";

type SearchPageProps = {
  searchParams?: Promise<{ q?: string }>;
};

type Product = (typeof amazonProducts)[number];

type BlogPost = {
  slug: string;
  title: string;
  description: string;
};

function getPosts(): BlogPost[] {
  const filePath = path.join(process.cwd(), "data", "blog-posts.json");

  if (!fs.existsSync(filePath)) return [];

  try {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  } catch {
    return [];
  }
}

function normalize(value?: string) {
  return (value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function searchProducts(query: string) {
  const q = normalize(query);
  if (!q) return [] as Product[];

  return amazonProducts
    .map((product) => {
      const haystack = normalize(
        `${product.title} ${product.subtitle || ""} ${product.category} ${product.badge || ""}`
      );

      let score = 0;

      if (haystack.includes(q)) score += 5;
      if (normalize(product.title).includes(q)) score += 4;
      if (normalize(product.category).includes(q)) score += 2;

      q.split(" ").forEach((word) => {
        if (word && haystack.includes(word)) score += 1;
      });

      return { product, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 24)
    .map((item) => item.product);
}

function searchPosts(query: string) {
  const q = normalize(query);
  if (!q) return [] as BlogPost[];

  return getPosts()
    .map((post) => {
      const haystack = normalize(`${post.title} ${post.description} ${post.slug}`);
      let score = 0;

      if (haystack.includes(q)) score += 5;
      if (normalize(post.title).includes(q)) score += 4;

      q.split(" ").forEach((word) => {
        if (word && haystack.includes(word)) score += 1;
      });

      return { post, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 12)
    .map((item) => item.post);
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const query = params?.q || "";

  const products = searchProducts(query);
  const posts = searchPosts(query);

  return (
    <main className="min-h-screen bg-[#05060a] px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-fuchsia-300">
          Recherche
        </p>

        <h1 className="mt-3 text-3xl font-black sm:text-5xl">
          Recherche dans le site
        </h1>

        <form action="/search" className="mt-8 flex flex-col gap-3 sm:flex-row">
          <input
            type="text"
            name="q"
            defaultValue={query}
            placeholder="Recherche souris, casque, logitech, guide..."
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-white placeholder:text-white/35 outline-none"
          />
          <button className="rounded-2xl bg-fuchsia-600 px-6 py-4 font-semibold text-white hover:bg-fuchsia-500">
            Rechercher
          </button>
        </form>

        {!query ? (
          <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6 text-white/70">
            Tape un nom de produit, une marque, une catégorie ou un guide pour
            trouver les articles du site.
          </div>
        ) : (
          <div className="mt-10 space-y-10">
            <section>
              <h2 className="text-2xl font-bold">Produits trouvés</h2>

              {products.length === 0 ? (
                <p className="mt-4 text-white/65">Aucun produit trouvé pour “{query}”.</p>
              ) : (
                <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {products.map((product) => (
                    <article
                      key={product.id}
                      className="rounded-3xl border border-white/10 bg-white/5 p-5"
                    >
                      <p className="text-xs uppercase tracking-wide text-white/40">
                        {product.category}
                      </p>

                      <h3 className="mt-2 text-xl font-bold">{product.title}</h3>

                      <p className="mt-3 text-sm leading-6 text-white/65">
                        {getUniqueRecommendation(product)}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-2">
                        <Link
                          href={`/products/${product.id}`}
                          className="rounded-xl bg-fuchsia-600 px-3 py-2 text-sm font-semibold text-white hover:bg-fuchsia-500"
                        >
                          Voir la fiche
                        </Link>

                        <a
                          href={`/go/${product.id}`}
                          className="rounded-xl border border-white/10 px-3 py-2 text-sm font-semibold text-white hover:bg-white/5"
                        >
                          Amazon
                        </a>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </section>

            <section>
              <h2 className="text-2xl font-bold">Articles du blog</h2>

              {posts.length === 0 ? (
                <p className="mt-4 text-white/65">Aucun article trouvé pour “{query}”.</p>
              ) : (
                <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {posts.map((post) => (
                    <article
                      key={post.slug}
                      className="rounded-3xl border border-white/10 bg-white/5 p-5"
                    >
                      <h3 className="text-xl font-bold">{post.title}</h3>

                      <p className="mt-3 text-sm leading-6 text-white/65">
                        {post.description}
                      </p>

                      <Link
                        href={`/blog/${post.slug}`}
                        className="mt-4 inline-flex rounded-xl bg-fuchsia-600 px-3 py-2 text-sm font-semibold text-white hover:bg-fuchsia-500"
                      >
                        Lire l’article
                      </Link>
                    </article>
                  ))}
                </div>
              )}
            </section>
          </div>
        )}
      </div>
    </main>
  );
}