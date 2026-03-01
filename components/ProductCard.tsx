// components/ProductCard.tsx

import Image from "next/image";
import Link from "next/link";
import type { AmazonProduct } from "@/lib/amazonProducts";

export default function ProductCard({ product }: { product: AmazonProduct }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-sm">
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
          priority={false}
        />
      </div>

      <div className="mt-4">
        {product.badge && (
          <span className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs">
            {product.badge}
          </span>
        )}

        <h3 className="mt-2 text-lg font-semibold">{product.title}</h3>
        {product.subtitle && <p className="mt-1 opacity-80">{product.subtitle}</p>}

        <div className="mt-4 flex gap-3">
          {/* Redirection interne -> Amazon (propre + trackable) */}
          <a
            href={`/go/${product.id}`}
            rel="nofollow sponsored noopener"
            className="inline-flex items-center justify-center rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold hover:bg-white/15"
          >
            Acheter sur Amazon
          </a>

          {/* Optionnel : lien direct Amazon (si tu veux) */}
          <Link
            href={product.amazonUrl}
            target="_blank"
            rel="nofollow sponsored noopener"
            className="inline-flex items-center justify-center rounded-xl border border-white/10 px-4 py-2 text-sm opacity-80 hover:opacity-100"
          >
            Voir sur Amazon
          </Link>
        </div>
      </div>
    </div>
  );
}