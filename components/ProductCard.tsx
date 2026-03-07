"use client";

import Image from "next/image";
import Link from "next/link";
import type { AmazonProduct } from "@/lib/amazonProducts";
import { trackAmazonClick, trackOpenDetails } from "@/lib/analytics";

export default function ProductCard({ product }: { product: AmazonProduct }) {
  const hasAmazonUrl = Boolean((product.amazonUrl || "").trim());

  const amazonSearchUrl = `https://www.amazon.fr/s?k=${encodeURIComponent(
    product.query || product.title
  )}`;

  const goUrl = hasAmazonUrl ? `/go/${product.id}` : amazonSearchUrl;

  return (
    <article className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-sm">
      <div className="relative h-44 overflow-hidden rounded-xl bg-black/20 border border-white/10">
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
      </div>

      <div className="mt-4">
        {product.badge ? (
          <span className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs">
            {product.badge}
          </span>
        ) : null}

        <h3 className="mt-2 text-lg font-semibold">{product.title}</h3>

        {product.subtitle ? (
          <p className="mt-1 opacity-80">{product.subtitle}</p>
        ) : null}

        <div className="mt-4 flex gap-3">
          <a
            href={goUrl}
            target={hasAmazonUrl ? undefined : "_blank"}
            rel="nofollow sponsored noopener"
            onClick={() =>
              trackAmazonClick({
                id: product.id,
                title: product.title,
                category: product.category,
              })
            }
            className="inline-flex flex-1 items-center justify-center rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold hover:bg-white/15"
          >
            {hasAmazonUrl ? "Acheter sur Amazon" : "🔎 Rechercher sur Amazon"}
          </a>

          <Link
            href={`/products/${product.id}`}
            onClick={() =>
              trackOpenDetails({
                id: product.id,
                title: product.title,
                category: product.category,
              })
            }
            className="inline-flex items-center justify-center rounded-xl border border-white/10 px-4 py-2 text-sm opacity-80 hover:opacity-100"
          >
            Détails
          </Link>
        </div>
      </div>
    </article>
  );
}