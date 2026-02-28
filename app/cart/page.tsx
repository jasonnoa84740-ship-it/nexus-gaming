"use client";

import Link from "next/link";
import NexusShell from "../components/NexusShell";
import { useCart, euro } from "../lib/cart";

export default function CartPage() {
  const { cart, inc, dec, remove, subtotal, shipping, total, clear } = useCart();
  async function goCheckout() {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: cart.map((it) => ({
          id: it.product.id,
          name: it.product.name,
          price: it.product.price,
          qty: it.qty,
        })),
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error || "Erreur Stripe");
      return;
    }

    window.location.href = data.url;
  }
  return (
    <NexusShell title="Panier" subtitle="Gère tes articles puis passe au paiement.">
      <section className="mx-auto max-w-6xl px-4 pb-16">
        {cart.length === 0 ? (
          <div className="nx-card p-8">
            <div className="text-white/70">Ton panier est vide.</div>
            <Link href="/#produits" className="nx-btn nx-btn-primary mt-5 inline-flex">
              Revenir aux produits →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="lg:col-span-2 space-y-3">
              {cart.map((it) => (
                <div key={it.product.id} className="nx-card p-4">
                  <div className="flex items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={it.product.image}
                      alt={it.product.name}
                      className="h-16 w-16 rounded-2xl object-cover border border-white/10"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-bold truncate">{it.product.name}</div>
                      <div className="text-sm text-white/70">{euro(it.product.price)}</div>
                    </div>

                    <button className="nx-btn nx-btn-ghost px-3 py-2" onClick={() => remove(it.product.id)}>
                      🗑️
                    </button>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <div className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
                      <button className="px-2" onClick={() => dec(it.product.id)}>
                        −
                      </button>
                      <span className="w-8 text-center font-bold">{it.qty}</span>
                      <button className="px-2" onClick={() => inc(it.product.id)}>
                        +
                      </button>
                    </div>

                    <div className="font-black">{euro(it.qty * it.product.price)}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="nx-card p-5 h-fit">
              <div className="text-xl font-black">Résumé</div>

              <div className="mt-4 flex justify-between text-sm text-white/75">
                <span>Sous-total</span>
                <span>{euro(subtotal)}</span>
              </div>
              <div className="mt-2 flex justify-between text-sm text-white/75">
                <span>Livraison</span>
                <span>{shipping === 0 ? "Offerte" : euro(shipping)}</span>
              </div>
              <div className="mt-3 flex justify-between text-lg font-black">
                <span>Total</span>
                <span>{euro(total)}</span>
              </div>

              <button
                  className="nx-btn nx-btn-primary w-full mt-4"
                  onClick={goCheckout}
                                        >
                                             Payer en sécurisé
                                     </button>
              <button className="nx-btn nx-btn-ghost w-full mt-2" onClick={clear}>
                Vider le panier
              </button>
            </div>
          </div>
        )}
      </section>
    </NexusShell>
  );
}