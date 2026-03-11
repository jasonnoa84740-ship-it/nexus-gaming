import Link from "next/link";
import { notFound } from "next/navigation";
import { amazonProducts } from "@/lib/amazonProducts";

type Product = {
  id: string;
  title: string;
  badge?: string;
  category: "Ecran" | "Souris" | "Clavier" | "Casque" | "Micro" | "Webcam" | "Chaise" | "Bureau";
  recommendation?: string;
};

type PageProps = { params: Promise<{ category: string }> };

const categoryMap = {
  souris: "Souris",
  claviers: "Clavier",
  casques: "Casque",
  ecrans: "Ecran",
  micros: "Micro",
  webcams: "Webcam",
  chaises: "Chaise",
  bureaux: "Bureau",
} as const;

function titleFor(category: keyof typeof categoryMap) {
  return `Top ${category}`;
}

export default async function TopCategoryPage({ params }: PageProps) {
  const { category } = await params;
  const mapped = categoryMap[category as keyof typeof categoryMap];
  if (!mapped) return notFound();

  const products = (amazonProducts as Product[]).filter((p) => p.category === mapped).slice(0, 10);

  return (
    <main className="min-h-screen bg-[#05060a] px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-fuchsia-300">Top produits</p>
        <h1 className="mt-3 text-3xl font-black sm:text-5xl">{titleFor(category as keyof typeof categoryMap)}</h1>
        <div className="mt-10 space-y-4">
          {products.map((product, index) => (
            <article key={product.id} className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-wide text-white/40">#{index + 1}</p>
                  <h2 className="mt-1 text-xl font-bold">{product.title}</h2>
                  <p className="mt-2 text-sm text-white/70">{product.recommendation || "Une option solide dans cette catégorie pour un setup gaming moderne."}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Link href={`/products/${product.id}`} className="rounded-2xl bg-fuchsia-600 px-4 py-2 font-semibold text-white hover:bg-fuchsia-500">Voir la fiche</Link>
                  <a href={`/go/${product.id}`} className="rounded-2xl border border-white/10 px-4 py-2 font-semibold text-white hover:bg-white/5">Amazon</a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
