import Link from "next/link";
import { notFound } from "next/navigation";
import { amazonProducts } from "@/lib/amazonProducts";

type Product = {
  id: string;
  title: string;
  subtitle?: string;
  badge?: string;
  category: string;
  recommendation?: string;
  facts?: string[];
};

type PageProps = {
  params: Promise<{ slug: string }>;
};

function getProduct(id: string) {
  return (amazonProducts as Product[]).find((p) => p.id === id);
}

function parseCompareSlug(slug: string) {
  const parts = slug.split("-vs-");
  if (parts.length !== 2) return null;
  return { leftId: parts[0], rightId: parts[1] };
}

function scoreFromProduct(product: Product) {
  const text = `${product.title} ${product.badge ?? ""}`.toLowerCase();
  let performance = 7;
  let comfort = 7;
  let quality = 7;
  let value = 7;

  if (text.includes("pro") || text.includes("oled") || text.includes("nova pro")) {
    performance += 2;
    quality += 2;
  }
  if (text.includes("wireless") || text.includes("sans fil")) {
    comfort += 1;
  }
  if (text.includes("budget")) {
    value += 2;
    quality -= 1;
  }
  if (text.includes("best")) {
    value += 1;
  }
  if (text.includes("fps") || text.includes("180hz") || text.includes("240hz")) {
    performance += 1;
  }

  performance = Math.min(10, Math.max(5, performance));
  comfort = Math.min(10, Math.max(5, comfort));
  quality = Math.min(10, Math.max(5, quality));
  value = Math.min(10, Math.max(5, value));
  const total = Number(((performance + comfort + quality + value) / 4).toFixed(1));

  return { performance, comfort, quality, value, total };
}

export default async function ComparePage({ params }: PageProps) {
  const { slug } = await params;
  const parsed = parseCompareSlug(slug);
  if (!parsed) return notFound();

  const left = getProduct(parsed.leftId);
  const right = getProduct(parsed.rightId);

  if (!left || !right) return notFound();

  const leftScore = scoreFromProduct(left);
  const rightScore = scoreFromProduct(right);

  return (
    <main className="min-h-screen bg-[#05060a] px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-fuchsia-300">Comparatif</p>
        <h1 className="mt-3 text-3xl font-black sm:text-5xl">{left.title} vs {right.title}</h1>
        <p className="mt-4 max-w-3xl text-white/70">Un duel simple pour voir lequel colle le mieux à ton setup gaming.</p>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {[{ product: left, score: leftScore }, { product: right, score: rightScore }].map(({ product, score }) => (
            <div key={product.id} className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-wide text-white/40">{product.category}</p>
                  <h2 className="mt-1 text-2xl font-bold">{product.title}</h2>
                </div>
                <div className="rounded-2xl bg-fuchsia-500/15 px-4 py-3 text-center">
                  <div className="text-xs uppercase tracking-wide text-fuchsia-200">Score gaming</div>
                  <div className="text-2xl font-black text-white">{score.total}/10</div>
                </div>
              </div>

              <div className="mt-6 grid gap-3 text-sm sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">Performance : <strong>{score.performance}/10</strong></div>
                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">Confort : <strong>{score.comfort}/10</strong></div>
                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">Qualité : <strong>{score.quality}/10</strong></div>
                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">Rapport prix : <strong>{score.value}/10</strong></div>
              </div>

              <p className="mt-5 text-sm leading-7 text-white/70">{product.recommendation || "Très bon choix dans sa catégorie pour un setup gaming moderne."}</p>

              <div className="mt-6 flex flex-wrap gap-3">
                <Link href={`/products/${product.id}`} className="rounded-2xl bg-fuchsia-600 px-5 py-3 font-semibold text-white hover:bg-fuchsia-500">Voir la fiche</Link>
                <a href={`/go/${product.id}`} className="rounded-2xl border border-white/10 px-5 py-3 font-semibold text-white hover:bg-white/5">Voir sur Amazon</a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-2xl font-bold">Verdict rapide</h2>
          <p className="mt-3 text-white/70">
            {leftScore.total > rightScore.total
              ? `${left.title} prend l’avantage avec un score global plus élevé.`
              : rightScore.total > leftScore.total
              ? `${right.title} prend l’avantage avec un score global plus élevé.`
              : `Les deux produits sont très proches : le choix dépend surtout de ton budget et de ton usage.`}
          </p>
        </div>
      </div>
    </main>
  );
}
