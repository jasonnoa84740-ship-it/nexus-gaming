import fs from "fs";
import path from "path";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { amazonProducts } from "@/lib/amazonProducts";

type BlogSection = {
  title: string;
  content: string;
};

type BlogPost = {
  slug: string;
  title: string;
  description: string;
  intro?: string;
  sections?: BlogSection[];
};

type Product = {
  id: string;
  title: string;
  category: "Ecran" | "Souris" | "Clavier" | "Casque" | "Micro" | "Webcam" | "Chaise" | "Bureau";
  badge?: string;
  recommendation?: string;
};

type PageProps = {
  params: Promise<{ slug: string }>;
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

function getPost(slug: string) {
  return getPosts().find((post) => post.slug === slug);
}

function detectCategory(text: string): Product["category"] | null {
  const normalized = text.toLowerCase();
  if (normalized.includes("souris")) return "Souris";
  if (normalized.includes("clavier")) return "Clavier";
  if (normalized.includes("casque")) return "Casque";
  if (normalized.includes("ecran") || normalized.includes("écran")) return "Ecran";
  if (normalized.includes("micro")) return "Micro";
  if (normalized.includes("webcam")) return "Webcam";
  if (normalized.includes("chaise")) return "Chaise";
  if (normalized.includes("bureau")) return "Bureau";
  return null;
}

function getCategoryHref(category: Product["category"] | null) {
  switch (category) {
    case "Souris":
      return "/products?category=souris";
    case "Clavier":
      return "/products?category=claviers";
    case "Casque":
      return "/products?category=casques";
    case "Ecran":
      return "/products?category=ecrans";
    case "Micro":
      return "/products?category=micros";
    case "Webcam":
      return "/products?category=webcams";
    case "Chaise":
      return "/products?category=chaises";
    case "Bureau":
      return "/products?category=bureaux";
    default:
      return "/products";
  }
}

function getRelatedProducts(category: Product["category"] | null) {
  if (!category) return (amazonProducts as Product[]).slice(0, 4);
  return (amazonProducts as Product[]).filter((p) => p.category === category).slice(0, 4);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) {
    return {
      title: "Article introuvable | NexusGamingFR",
      description: "L’article demandé est introuvable.",
    };
  }

  return {
    title: `${post.title} | NexusGamingFR`,
    description: post.description,
    alternates: {
      canonical: `https://nexusgamingfr.com/blog/${post.slug}`,
    },
  };
}

export function generateStaticParams() {
  return getPosts().map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return notFound();

  const category = detectCategory(`${post.slug} ${post.title}`);
  const categoryHref = getCategoryHref(category);
  const relatedProducts = getRelatedProducts(category);
  const comparePair = relatedProducts.length >= 2 ? `/compare/${relatedProducts[0].id}-vs-${relatedProducts[1].id}` : "/products";

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    mainEntityOfPage: `https://nexusgamingfr.com/blog/${post.slug}`,
    author: {
      "@type": "Organization",
      name: "NexusGamingFR",
    },
    publisher: {
      "@type": "Organization",
      name: "NexusGamingFR",
    },
  };

  return (
    <main className="min-h-screen bg-[#05060a] text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />

      <article className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-fuchsia-300">Guide gaming</p>
          <h1 className="mt-3 text-3xl font-black sm:text-5xl">{post.title}</h1>
          <p className="mt-5 text-lg leading-8 text-white/75">{post.description}</p>

          {post.intro ? <p className="mt-8 text-base leading-8 text-white/80">{post.intro}</p> : null}

          <div className="mt-8 space-y-8">
            {(post.sections || []).map((section) => (
              <section key={section.title}>
                <h2 className="text-2xl font-bold">{section.title}</h2>
                <p className="mt-3 leading-8 text-white/75">{section.content}</p>
              </section>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-2xl font-bold">Produits liés</h2>
            <div className="mt-5 space-y-4">
              {relatedProducts.map((product) => (
                <div key={product.id} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <h3 className="font-semibold">{product.title}</h3>
                  <p className="mt-2 text-sm text-white/65">{product.recommendation || "Une option intéressante dans cette catégorie."}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Link href={`/products/${product.id}`} className="rounded-xl bg-fuchsia-600 px-3 py-2 text-sm font-semibold text-white hover:bg-fuchsia-500">Voir la fiche</Link>
                    <a href={`/go/${product.id}`} className="rounded-xl border border-white/10 px-3 py-2 text-sm font-semibold text-white hover:bg-white/5">Amazon</a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-fuchsia-500/10 to-blue-500/10 p-6">
            <h2 className="text-2xl font-bold">Continue la recherche</h2>
            <p className="mt-3 text-white/70">Passe du guide au comparatif ou explore la catégorie pour transformer la lecture en clic utile.</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href={categoryHref} className="rounded-2xl bg-fuchsia-600 px-5 py-3 font-semibold text-white hover:bg-fuchsia-500">Explorer la catégorie</Link>
              <Link href={comparePair} className="rounded-2xl border border-white/10 px-5 py-3 font-semibold text-white hover:bg-white/5">Voir un comparatif</Link>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
}
