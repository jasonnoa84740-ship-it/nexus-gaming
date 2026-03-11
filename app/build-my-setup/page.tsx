import Link from "next/link";
import { amazonProducts } from "@/lib/amazonProducts";

type Product = {
  id: string;
  title: string;
  category: "Ecran" | "Souris" | "Clavier" | "Casque" | "Micro" | "Webcam" | "Chaise" | "Bureau";
  badge?: string;
};

const budgets = [500, 1000, 2000];
const requiredCategories: Product["category"][] = ["Ecran", "Souris", "Clavier", "Casque", "Chaise", "Bureau"];

function pickProduct(category: Product["category"], budget: number) {
  const products = (amazonProducts as Product[]).filter((p) => p.category === category);
  if (!products.length) return null;

  if (budget <= 500) {
    return products.find((p) => p.badge?.toLowerCase().includes("budget")) || products[0];
  }
  if (budget <= 1000) {
    return products.find((p) => p.badge?.toLowerCase().includes("best")) || products[1] || products[0];
  }
  return products.find((p) => p.badge?.toLowerCase().includes("pro")) || products[2] || products[0];
}

export default function BuildMySetupPage() {
  return (
    <main className="min-h-screen bg-[#05060a] px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-fuchsia-300">Setup builder</p>
        <h1 className="mt-3 text-3xl font-black sm:text-5xl">Build ton setup gaming</h1>
        <p className="mt-4 max-w-3xl text-white/70">Des setups rapides selon ton budget pour t’aider à démarrer sans te perdre dans 200 produits.</p>

        <div className="mt-10 grid gap-8 lg:grid-cols-3">
          {budgets.map((budget) => (
            <section key={budget} className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-2xl font-bold">Setup {budget}€</h2>
                <span className="rounded-full bg-fuchsia-500/15 px-3 py-1 text-sm text-fuchsia-200">Budget</span>
              </div>

              <div className="mt-6 space-y-4">
                {requiredCategories.map((category) => {
                  const product = pickProduct(category, budget);
                  if (!product) return null;
                  return (
                    <div key={`${budget}-${category}`} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                      <p className="text-xs uppercase tracking-wide text-white/40">{category}</p>
                      <h3 className="mt-1 font-semibold">{product.title}</h3>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <Link href={`/products/${product.id}`} className="rounded-xl bg-fuchsia-600 px-3 py-2 text-sm font-semibold text-white hover:bg-fuchsia-500">Voir la fiche</Link>
                        <a href={`/go/${product.id}`} className="rounded-xl border border-white/10 px-3 py-2 text-sm font-semibold text-white hover:bg-white/5">Amazon</a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
