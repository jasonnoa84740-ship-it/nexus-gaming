import Link from "next/link";

// Adapte ce chemin si besoin selon ton projet
import { amazonProducts } from "@/data/amazonProducts";

type Product = {
  id: string;
  title: string;
  subtitle?: string;
  image?: string;
  rating?: number;
  badge?: string;
  category?: string;
};

function Stars({ value = 4.6 }: { value?: number }) {
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

export default function ProductsPage() {
  const products = amazonProducts as Product[];

  return (
    <main className="min-h-screen bg-[#05060a] text-white">
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-fuchsia-300">
            Produits
          </p>

          <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
            Tous les produits gaming
          </h1>

          <p className="mt-4 max-w-3xl text-white/70">
            Explore notre sélection de produits gaming pour améliorer ton setup :
            souris, claviers, casques, écrans, bureaux gamer, chaises et accessoires.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {products.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-white/70">
            Aucun produit disponible pour le moment.
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
                  {product.category ? (
                    <p className="text-xs uppercase tracking-wide text-white/40">
                      {product.category}
                    </p>
                  ) : null}

                  <h2 className="mt-2 text-xl font-bold">{product.title}</h2>

                  {product.subtitle ? (
                    <p className="mt-3 text-sm leading-6 text-white/70">
                      {product.subtitle}
                    </p>
                  ) : null}
                </div>

                <div className="mt-4">
                  <Stars value={product.rating ?? 4.6} />
                </div>

                <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-4">
                  <h3 className="text-sm font-semibold text-white">
                    Pourquoi on le recommande
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-white/65">
                    Ce produit fait partie de notre sélection pour son intérêt
                    dans un setup gaming, sa popularité et son bon équilibre
                    entre utilité et rapport qualité/prix.
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