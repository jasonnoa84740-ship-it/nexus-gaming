import Link from "next/link";
import { amazonProducts } from "@/lib/amazonProducts";

type Product = (typeof amazonProducts)[number];

type PageProps = {
  params: Promise<{ brand: string }>;
};

export default async function BrandPage({ params }: PageProps) {

  const { brand } = await params;

  const brandProducts = amazonProducts.filter((p) =>
    p.title.toLowerCase().includes(brand.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-[#05060a] text-white px-4 py-12">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl font-black mb-6">
          Produits {brand}
        </h1>

        <p className="text-white/70 mb-10">
          Découvre les équipements gaming {brand} disponibles sur NexusGamingFR.
        </p>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

          {brandProducts.map((product) => (

            <article
              key={product.id}
              className="bg-white/5 border border-white/10 p-6 rounded-2xl"
            >

              <p className="text-xs text-white/50 uppercase">
                {product.category}
              </p>

              <h2 className="text-xl font-bold mt-2">
                {product.title}
              </h2>

              <p className="text-white/60 text-sm mt-3">
                {product.subtitle}
              </p>

              <Link
                href={`/products/${product.id}`}
                className="mt-4 inline-block bg-fuchsia-600 px-4 py-2 rounded-lg"
              >
                Voir le produit
              </Link>

            </article>

          ))}

        </div>

      </div>

    </main>
  );
}