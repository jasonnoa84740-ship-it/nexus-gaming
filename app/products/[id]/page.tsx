import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import { amazonProducts } from "@/lib/amazonProducts";

type PageProps = {
  params: Promise<{ id: string }>;
};

function getProduct(id: string) {
  return amazonProducts.find((p) => p.id === id);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const product = getProduct(id);

  if (!product) {
    return {
      title: "Produit introuvable | Nexus Gaming FR",
    };
  }

  return {
    title: `${product.title} | Nexus Gaming FR`,
    description:
      product.subtitle ||
      `${product.title} : bon plan Amazon gaming sélectionné par Nexus Gaming FR.`,
    alternates: {
      canonical: `https://nexusgamingfr.com/products/${product.id}`,
    },
    openGraph: {
      title: `${product.title} | Nexus Gaming FR`,
      description:
        product.subtitle ||
        `${product.title} : bon plan Amazon gaming sélectionné par Nexus Gaming FR.`,
      url: `https://nexusgamingfr.com/products/${product.id}`,
      siteName: "Nexus Gaming FR",
      images: [
        {
          url: product.image,
          alt: product.title,
        },
      ],
      locale: "fr_FR",
      type: "website",
    },
  };
}

export function generateStaticParams() {
  return amazonProducts.map((product) => ({
    id: product.id,
  }));
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;
  const product = getProduct(id);

  if (!product) return notFound();

  const hasAmazonUrl = Boolean((product.amazonUrl || "").trim());
  const amazonSearchUrl = `https://www.amazon.fr/s?k=${encodeURIComponent(
    product.query || product.title
  )}`;
  const goUrl = hasAmazonUrl ? `/go/${product.id}` : amazonSearchUrl;

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description:
      product.subtitle ||
      `${product.title} : bon plan Amazon gaming sélectionné par Nexus Gaming FR.`,
    image: [product.image],
    category: product.category,
    brand: {
      "@type": "Brand",
      name: "Nexus Gaming FR",
    },
    offers: {
      "@type": "Offer",
      url: `https://nexusgamingfr.com/products/${product.id}`,
      availability: "https://schema.org/InStock",
      priceCurrency: "EUR",
      seller: {
        "@type": "Organization",
        name: "Amazon",
      },
    },
  };

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />

      <div className="grid gap-8 md:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
          <div className="relative h-[420px] overflow-hidden rounded-2xl bg-black/20">
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-contain p-4"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>

        <div>
          <div className="inline-flex rounded-full bg-white/10 px-3 py-1 text-sm">
            {product.category}
          </div>

          <h1 className="mt-4 text-3xl font-black">{product.title}</h1>

          {product.subtitle ? (
            <p className="mt-4 text-white/75">{product.subtitle}</p>
          ) : (
            <p className="mt-4 text-white/75">
              Retrouvez ce bon plan Amazon gaming sélectionné par Nexus Gaming FR.
            </p>
          )}

          {product.badge ? (
            <div className="mt-4 inline-flex rounded-full bg-white/10 px-3 py-1 text-sm">
              {product.badge}
            </div>
          ) : null}

          <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/75">
            Certains liens sont affiliés. Si tu passes commande, Nexus Gaming FR peut
            toucher une commission, sans coût supplémentaire pour toi.
          </div>

          <div className="mt-6 flex gap-3">
            <a
              href={goUrl}
              rel="nofollow sponsored noopener"
              className="inline-flex flex-1 items-center justify-center rounded-xl bg-white/10 px-4 py-3 font-semibold hover:bg-white/15"
            >
              Acheter sur Amazon
            </a>

            <a
              href="/bons-plans"
              className="inline-flex items-center justify-center rounded-xl border border-white/10 px-4 py-3 font-semibold hover:bg-white/5"
            >
              Retour
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}