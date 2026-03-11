import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { amazonProducts } from "@/lib/amazonProducts";
import { getUniqueRecommendation, getUniqueFacts } from "@/lib/productContent";

type Product = (typeof amazonProducts)[number];

type PageProps = {
  params: Promise<{ id: string }>;
};

function getProduct(id: string) {
  return amazonProducts.find((p) => p.id === id);
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;
  const product = getProduct(id);

  if (!product) return notFound();

  const recommendation = getUniqueRecommendation(product);
  const facts = getUniqueFacts(product);

  const similarProducts = amazonProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const compareProducts = amazonProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <main className="min-h-screen bg-[#05060a] text-white">

      <section className="mx-auto max-w-6xl px-4 py-10 grid gap-8 lg:grid-cols-2">

        <div className="relative h-[420px] bg-white/5 rounded-2xl">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain p-6"
          />
        </div>

        <div>

          <h1 className="text-3xl font-black">{product.title}</h1>

          <p className="mt-4 text-white/70">
            {product.subtitle}
          </p>

          <div className="mt-6 bg-white/5 border border-white/10 p-5 rounded-2xl">
            <h2 className="font-bold mb-2">Pourquoi on le recommande</h2>
            <p className="text-white/70">{recommendation}</p>
          </div>

          <div className="mt-4 bg-white/5 border border-white/10 p-5 rounded-2xl">
            <h2 className="font-bold mb-2">À savoir</h2>
            <ul className="text-white/70 space-y-1">
              {facts.map((fact) => (
                <li key={fact}>• {fact}</li>
              ))}
            </ul>
          </div>

          <div className="mt-6 flex gap-3 flex-wrap">
            <a
              href={`/go/${product.id}`}
              className="bg-orange-500 px-6 py-3 rounded-xl font-semibold hover:bg-orange-400"
            >
              Voir sur Amazon
            </a>

            <Link
              href="/products"
              className="border border-white/10 px-6 py-3 rounded-xl hover:bg-white/5"
            >
              Tous les produits
            </Link>
          </div>

        </div>

      </section>

      {similarProducts.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 pb-14">
          <h2 className="text-2xl font-black mb-6">Produits similaires</h2>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">

            {similarProducts.map((item) => (
              <article
                key={item.id}
                className="border border-white/10 bg-white/5 p-4 rounded-xl"
              >

                <h3 className="font-bold">{item.title}</h3>

                <p className="text-sm text-white/60 mt-2">
                  {getUniqueRecommendation(item)}
                </p>

                <Link
                  href={`/products/${item.id}`}
                  className="mt-3 inline-block text-fuchsia-300 text-sm"
                >
                  Voir →
                </Link>

              </article>
            ))}

          </div>
        </section>
      )}

      {compareProducts.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 pb-16">
          <h2 className="text-2xl font-black mb-6">
            Produits souvent comparés
          </h2>

          <div className="grid md:grid-cols-3 gap-4">

            {compareProducts.map((item) => (
              <Link
                key={item.id}
                href={`/compare/${product.id}-vs-${item.id}`}
                className="border border-white/10 bg-white/5 p-5 rounded-xl hover:bg-white/10"
              >
                <h3 className="font-bold">
                  {product.title} vs {item.title}
                </h3>

                <p className="text-sm text-white/60 mt-2">
                  Comparer ces deux produits gaming
                </p>

              </Link>
            ))}

          </div>
        </section>
      )}

    </main>
  );
}