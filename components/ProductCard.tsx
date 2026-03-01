// components/ProductCard.tsx

import Image from "next/image";
import Link from "next/link";
import type { AmazonProduct } from "@/lib/amazonProducts";

export default function ProductCard({ product }: { product: AmazonProduct }) {
  const hasAmazonUrl = Boolean((product.amazonUrl || "").trim());

  // URL de recherche Amazon (fallback safe)
  const amazonSearchUrl = `https://www.amazon.fr/s?k=${encodeURIComponent(
    product.query || product.title
  )}`;

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
        {product.subtitle ? (
          <p className="mt-1 opacity-80">{product.subtitle}</p>
        ) : null}

        <div className="mt-4 flex gap-3">
          {/* ✅ Bouton principal : si lien prêt -> /go/id, sinon -> recherche Amazon */}
          <a
            href={hasAmazonUrl ? `/go/${product.id}` : amazonSearchUrl}
            target={hasAmazonUrl ? undefined : "_blank"}
            rel="nofollow sponsored noopener"
            className="inline-flex flex-1 items-center justify-center rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold hover:bg-white/15"
          >
            {hasAmazonUrl ? "Acheter sur Amazon" : "🔎 Rechercher sur Amazon"}
          </a>

          {/* ✅ Bouton secondaire : toujours utile */}
          <Link
            href={hasAmazonUrl ? (product.amazonUrl as string) : amazonSearchUrl}
            target="_blank"
            rel="nofollow sponsored noopener"
            className="inline-flex items-center justify-center rounded-xl border border-white/10 px-4 py-2 text-sm opacity-80 hover:opacity-100"
          >
            Amazon
          </Link>
        </div>

        {!hasAmazonUrl ? (
          <p className="mt-3 text-xs text-white/60">
            Astuce : clique sur “Rechercher sur Amazon”, trouve le produit exact,
            puis colle ton lien affilié dans <code className="text-white/80">amazonUrl</code>.
          </p>
        ) : null}
      </div>
    </div>
  );
}