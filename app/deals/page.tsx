import Link from "next/link";
import { amazonProducts } from "@/lib/amazonProducts";

type Product = { id: string; title: string; badge?: string; category: string };

export default function DealsPage() {
  const deals = (amazonProducts as Product[])
    .filter((p) => ["Budget", "Best", "Best"].includes(p.badge || ""))
    .slice(0, 24);

  return (
    <main className="min-h-screen bg-[#05060a] px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-fuchsia-300">Deals</p>
        <h1 className="mt-3 text-3xl font-black sm:text-5xl">Deals gaming et bons plans setup</h1>
        <p className="mt-4 max-w-3xl text-white/70">Une sélection de produits à surveiller si tu cherches à optimiser ton setup sans partir sur le plus cher.</p>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {deals.map((product) => (
            <article key={product.id} className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <span className="inline-flex rounded-full border border-orange-400/30 bg-orange-400/10 px-3 py-1 text-xs font-semibold text-orange-200">
                {product.badge || "Deal"}
              </span>
              <h2 className="mt-4 text-xl font-bold">{product.title}</h2>
              <p className="mt-2 text-sm text-white/60">{product.category}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                <Link href={`/products/${product.id}`} className="rounded-2xl bg-fuchsia-600 px-4 py-2 text-sm font-semibold text-white hover:bg-fuchsia-500">Voir la fiche</Link>
                <a href={`/go/${product.id}`} className="rounded-2xl border border-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/5">Amazon</a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
