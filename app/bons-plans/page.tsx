// app/bons-plans/page.tsx

import ProductCard from "@/components/ProductCard";
import { amazonProducts } from "@/lib/amazonProducts";

export const metadata = {
  title: "Bons plans Amazon | Nexus Gaming",
  description: "Sélection Nexus Gaming de produits Amazon (liens affiliés).",
};

export default function BonsPlansPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold">Bons plans Amazon</h1>
      <p className="mt-2 opacity-80">
        Sélection Nexus Gaming (liens affiliés). Tu paies sur Amazon, nous on touche une petite commission.
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {amazonProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </main>
  );
}