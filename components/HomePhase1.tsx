const bestSellers = [
  {
    id: "gpu-rtx-4060",
    name: "GeForce RTX 4060 8GB",
    brand: "NVIDIA",
    price: 249.99,
    oldPrice: 279.99,
    tag: "Top vente",
    sold: 37,
    rating: 4.8,
    image: "/products/rtx-4060.png",
  },
  {
    id: "gpu-rtx-4070",
    name: "GeForce RTX 4070 12GB",
    brand: "NVIDIA",
    price: 549.99,
    oldPrice: 599.99,
    tag: "🔥 Hot",
    sold: 22,
    rating: 4.9,
    image: "/products/rtx-4070.png",
  },
  {
    id: "cpu-ryzen-7",
    name: "Ryzen 7 (Gaming)",
    brand: "AMD",
    price: 319.99,
    oldPrice: 359.99,
    tag: "Meilleur choix",
    sold: 19,
    rating: 4.7,
    image: "/products/ryzen-7.png",
  },
  {
    id: "ssd-1to",
    name: "SSD NVMe 1To",
    brand: "Kingston / WD",
    price: 79.99,
    oldPrice: 99.99,
    tag: "-20%",
    sold: 64,
    rating: 4.6,
    image: "/products/ssd-1tb.png",
  },
];

const reviews = [
  {
    name: "Lucas M.",
    text: "Livraison ultra rapide, GPU super bien protégé. Packaging clean.",
    stars: 5,
  },
  {
    name: "Sarah T.",
    text: "Support au top : ils m’ont aidée à choisir une config compatible.",
    stars: 5,
  },
  {
    name: "Mehdi K.",
    text: "Prix compétitifs et retour simple. Je recommande.",
    stars: 5,
  },
];

function Stars({ value }: { value: number }) {
  const full = Math.round(value);
  return (
    <div className="flex items-center gap-1 text-white/90">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < full ? "opacity-100" : "opacity-30"}>★</span>
      ))}
      <span className="ml-2 text-xs text-white/60">{value.toFixed(1)}</span>
    </div>
  );
}

export default function HomePhase1({
  onAddToCart,
}: {
  onAddToCart?: (id: string) => void;
}) {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-16">
      {/* BEST SELLERS */}
      <div className="mt-8 nx-card p-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold">⭐ Meilleures ventes Nexus</h2>
            <p className="text-white/70 mt-1">
              Les produits les plus achetés cette semaine — choix sûrs, stock qui part vite.
            </p>
          </div>

          <a
            href="#catalogue"
            className="nx-btn nx-btn-ghost self-start sm:self-auto"
          >
            Voir tout le catalogue →
          </a>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {bestSellers.map((p) => (
            <div key={p.id} className="rounded-3xl border border-white/10 bg-white/5 p-4 hover:bg-white/7 transition">
              <div className="flex items-center justify-between">
                <span className="rounded-full border border-white/10 bg-black/25 px-2 py-1 text-[11px] text-white/80">
                  {p.tag}
                </span>
                <span className="text-[11px] text-white/60">+{p.sold} vendus</span>
              </div>

              <div className="mt-3 aspect-[4/3] w-full overflow-hidden rounded-2xl bg-black/25 border border-white/10">
                {/* Si tu n'as pas d'images, laisse le fallback */}
                <img
                  src={p.image}
                  alt={p.name}
                  className="h-full w-full object-contain p-3"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = "none";
                  }}
                />
                <div className="h-full w-full flex items-center justify-center text-white/30 text-xs">
                  Image produit
                </div>
              </div>

              <div className="mt-3 text-xs text-white/60">{p.brand}</div>
              <div className="mt-1 font-semibold">{p.name}</div>

              <div className="mt-2">
                <Stars value={p.rating} />
              </div>

              <div className="mt-3 flex items-baseline gap-2">
                <div className="text-lg font-extrabold">{p.price.toFixed(2)} €</div>
                <div className="text-sm text-white/40 line-through">{p.oldPrice.toFixed(2)} €</div>
              </div>

              <button
                className="nx-btn nx-btn-primary mt-4 w-full"
                onClick={() => onAddToCart?.(p.id)}
              >
                Ajouter au panier
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* AVIS */}
      <div className="mt-6 nx-card p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold">💬 Avis clients</h2>
            <p className="text-white/70 mt-1">La confiance, c’est la base pour du matériel informatique.</p>
          </div>
          <div className="hidden sm:block text-sm text-white/70">
            Note moyenne <span className="font-semibold text-white">4.8/5</span>
          </div>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          {reviews.map((r, idx) => (
            <div key={idx} className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <div className="text-white/90">{Array.from({ length: r.stars }).map((_, i) => <span key={i}>★</span>)}</div>
              <p className="mt-3 text-white/75 leading-relaxed">“{r.text}”</p>
              <div className="mt-4 text-sm text-white/60">— {r.name} <span className="text-white/40">(achat vérifié)</span></div>
            </div>
          ))}
        </div>
      </div>

      {/* POURQUOI NEXUS */}
      <div className="mt-6 nx-card p-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold">🏆 Pourquoi acheter chez Nexus ?</h2>
        <p className="text-white/70 mt-1">
          On met la perf et la fiabilité devant le blabla. Et on te couvre en cas de souci.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <div className="text-xl">🔒</div>
            <div className="mt-2 font-semibold">Paiement sécurisé</div>
            <div className="mt-1 text-sm text-white/65">Stripe / 3D Secure • checkout fiable</div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <div className="text-xl">🚚</div>
            <div className="mt-2 font-semibold">Livraison rapide</div>
            <div className="mt-1 text-sm text-white/65">48h standard • Express dispo</div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <div className="text-xl">🛡️</div>
            <div className="mt-2 font-semibold">Garantie 2 ans</div>
            <div className="mt-1 text-sm text-white/65">Constructeur officiel • SAV clair</div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
            <div className="text-xl">🧠</div>
            <div className="mt-2 font-semibold">Support config</div>
            <div className="mt-1 text-sm text-white/65">Compatibilité CPU/CM/RAM • conseils</div>
          </div>
        </div>
      </div>
    </section>
  );
}