"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import NexusShell from "@/components/NexusShell";
import { useCart, euro } from "@/lib/cart";
import { supabase } from "@/lib/supabaseClient";
import { PRODUCTS } from "@/lib/products"; // ✅ UPSell

const PROMO_STORAGE_KEY = "nx_promo_code";

// 🎯 seuil livraison offerte (tu peux changer)
const FREE_SHIP_THRESHOLD = 79;

export default function CartPage() {
  const { cart, inc, dec, remove, subtotal, shipping, clear, add } = useCart(); // ✅ add pour upsell

  const [promoInput, setPromoInput] = useState("");
  const [promoCode, setPromoCode] = useState<string | null>(null);
  const [promoPercent, setPromoPercent] = useState<number>(0);
  const [promoMsg, setPromoMsg] = useState<string | null>(null);
  const [promoLoading, setPromoLoading] = useState(false);

  // Restore promo from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(PROMO_STORAGE_KEY);
      if (saved) {
        setPromoInput(saved);
        void validateAndApplyPromo(saved, { silent: true });
      }
    } catch {
      // ignore
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const shipFree = useMemo(() => {
    return (promoCode || "").toUpperCase() === "SHIPFREE";
  }, [promoCode]);

  const discount = useMemo(() => {
    const pct = promoPercent || 0;
    if (pct <= 0) return 0;
    return Math.round((subtotal * pct) / 100);
  }, [promoPercent, subtotal]);

  const effectiveShipping = useMemo(() => {
    if (shipFree) return 0;
    return shipping;
  }, [shipFree, shipping]);

  const total = useMemo(() => {
    return Math.max(0, subtotal - discount) + effectiveShipping;
  }, [subtotal, discount, effectiveShipping]);

  // ✅ Livraison offerte (barre)
  const remainingForFreeShip = useMemo(() => {
    // on regarde le sous-total APRES remise (plus logique pour l’utilisateur)
    const afterDiscount = Math.max(0, subtotal - discount);
    return Math.max(0, FREE_SHIP_THRESHOLD - afterDiscount);
  }, [subtotal, discount]);

  const freeShipProgress = useMemo(() => {
    const afterDiscount = Math.max(0, subtotal - discount);
    const pct = Math.round((afterDiscount / FREE_SHIP_THRESHOLD) * 100);
    return Math.min(100, Math.max(0, pct));
  }, [subtotal, discount]);

  // ✅ Upsell: petits items pas chers, pas déjà dans le panier
  const upsell = useMemo(() => {
    const inCart = new Set(cart.map((it) => it.product.id));
    return PRODUCTS
      .filter((p) => !inCart.has(p.id))
      .sort((a, b) => a.price - b.price)
      .slice(0, 6); // 6 suggestions
  }, [cart]);

  async function validateAndApplyPromo(raw: string, opts?: { silent?: boolean }) {
    const code = raw.trim().toUpperCase();
    if (!code) {
      setPromoCode(null);
      setPromoPercent(0);
      setPromoMsg(opts?.silent ? null : "Entre un code promo.");
      try {
        localStorage.removeItem(PROMO_STORAGE_KEY);
      } catch {}
      return;
    }

    setPromoLoading(true);
    setPromoMsg(opts?.silent ? null : "Vérification du code promo...");

    try {
      const { data, error } = await supabase
        .from("promo_codes")
        .select("code, percent, active, expires_at")
        .eq("code", code)
        .maybeSingle();

      if (error || !data || data.active !== true) {
        setPromoCode(null);
        setPromoPercent(0);
        setPromoMsg(opts?.silent ? null : "❌ Code invalide.");
        try {
          localStorage.removeItem(PROMO_STORAGE_KEY);
        } catch {}
        return;
      }

      if (data.expires_at) {
        const exp = new Date(data.expires_at).getTime();
        if (!Number.isNaN(exp) && exp < Date.now()) {
          setPromoCode(null);
          setPromoPercent(0);
          setPromoMsg(opts?.silent ? null : "❌ Code expiré.");
          try {
            localStorage.removeItem(PROMO_STORAGE_KEY);
          } catch {}
          return;
        }
      }

      setPromoCode(data.code);
      setPromoPercent(Number(data.percent) || 0);
      setPromoMsg(opts?.silent ? null : "✅ Code appliqué.");
      try {
        localStorage.setItem(PROMO_STORAGE_KEY, data.code);
      } catch {}
    } finally {
      setPromoLoading(false);
    }
  }

  function removePromo() {
    setPromoCode(null);
    setPromoPercent(0);
    setPromoMsg("Code promo retiré.");
    setPromoInput("");
    try {
      localStorage.removeItem(PROMO_STORAGE_KEY);
    } catch {}
  }

  async function goCheckout() {
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          promoCode: promoCode || null,
          items: cart.map((it) => ({
            id: it.product.id,
            name: it.product.name,
            price: it.product.price,
            qty: it.qty,
          })),
          summary: {
            subtotal,
            discount,
            shipping: effectiveShipping,
            total,
          },
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data?.error || `Erreur checkout (${res.status})`);
        console.log("Checkout error:", data);
        return;
      }

      if (!data?.url) {
        alert("URL Stripe manquante (voir console)");
        console.log("No url:", data);
        return;
      }

      window.location.href = data.url;
    } catch (e) {
      console.error(e);
      alert("Erreur réseau checkout");
    }
  }

  return (
    <NexusShell title="Panier" subtitle="Gère tes articles puis passe au paiement sécurisé Stripe.">
      <section className="mx-auto max-w-6xl px-4 pb-16">
        {cart.length === 0 ? (
          <div className="nx-card p-8">
            <div className="text-white/70">Ton panier est vide.</div>
            <Link href="/#produits" className="nx-btn nx-btn-primary mt-5 inline-flex">
              Revenir aux produits →
            </Link>

            {/* ✅ Upsell même panier vide */}
            {upsell.length ? (
              <div className="mt-6">
                <div className="font-black text-lg">Nos best picks</div>
                <div className="text-sm text-white/70 mt-1">Quelques produits populaires pour commencer.</div>

                <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {upsell.slice(0, 3).map((p) => (
                    <div key={p.id} className="nx-card p-4 bg-white/5 border-white/10">
                      <div className="text-sm text-white/70">{p.brand}</div>
                      <div className="font-black">{p.name}</div>
                      <div className="mt-2 flex items-center justify-between">
                        <div className="font-black">{euro(p.price)}</div>
                        <button className="nx-btn nx-btn-primary" onClick={() => add(p, 1)} type="button">
                          + Ajouter
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            <div className="lg:col-span-2 space-y-3">
              {/* ✅ BARRE LIVRAISON OFFERTE */}
              <div className="nx-card p-4 bg-white/5 border-white/10">
                {shipFree ? (
                  <div className="text-sm text-white/80">✅ Livraison offerte via le code <b>SHIPFREE</b>.</div>
                ) : remainingForFreeShip > 0 ? (
                  <>
                    <div className="text-sm text-white/80">
                      🚚 Plus que <span className="font-black">{euro(remainingForFreeShip)}</span> pour la livraison offerte (dès{" "}
                      <span className="font-black">{euro(FREE_SHIP_THRESHOLD)}</span>).
                    </div>
                    <div className="mt-2 h-2 rounded-full bg-white/10 overflow-hidden">
                      <div className="h-full bg-white/50" style={{ width: `${freeShipProgress}%` }} />
                    </div>
                    <div className="mt-2 text-xs text-white/60">Astuce : ajoute un petit accessoire pour atteindre le seuil.</div>
                  </>
                ) : (
                  <div className="text-sm text-white/80">✅ Livraison offerte activée 🎉</div>
                )}
              </div>

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

                    <button
                      type="button"
                      className="nx-btn nx-btn-ghost px-3 py-2"
                      onClick={() => remove(it.product.id)}
                    >
                      🗑️
                    </button>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <div className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2">
                      <button type="button" className="px-2" onClick={() => dec(it.product.id)}>
                        −
                      </button>
                      <span className="w-8 text-center font-black">{it.qty}</span>
                      <button type="button" className="px-2" onClick={() => inc(it.product.id)}>
                        +
                      </button>
                    </div>

                    <div className="font-black">{euro(it.qty * it.product.price)}</div>
                  </div>
                </div>
              ))}

              {/* ✅ UPSELL */}
              {upsell.length ? (
                <div className="nx-card p-5 bg-white/5 border-white/10">
                  <div className="flex items-end justify-between gap-3">
                    <div>
                      <div className="text-lg font-black">Ajouts rapides</div>
                      <div className="text-sm text-white/70">
                        Les indispensables qui sauvent une config (et aident à passer la livraison offerte 👀).
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {upsell.map((p) => (
                      <div key={p.id} className="rounded-3xl border border-white/10 bg-white/5 p-4">
                        <div className="text-xs text-white/60">{p.category} • {p.brand}</div>
                        <div className="font-black mt-1 line-clamp-2">{p.name}</div>
                        <div className="mt-3 flex items-center justify-between">
                          <div className="font-black">{euro(p.price)}</div>
                          <button className="nx-btn nx-btn-primary" onClick={() => add(p, 1)} type="button">
                            + Ajouter
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>

            <div className="nx-card p-5 h-fit">
              <div className="text-xl font-black">Résumé</div>

              {/* PROMO */}
              <div className="mt-4">
                <div className="text-sm text-white/70 mb-2">Code promo</div>
                <div className="flex gap-2">
                  <input
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    className="nx-input flex-1"
                    placeholder="Ex: NEXUS10 / SHIPFREE"
                    disabled={promoLoading}
                  />
                  <button
                    type="button"
                    className="nx-btn nx-btn-ghost"
                    onClick={() => validateAndApplyPromo(promoInput)}
                    disabled={promoLoading}
                  >
                    {promoLoading ? "..." : "Appliquer"}
                  </button>
                </div>

                {promoCode ? (
                  <div className="mt-2 flex items-center justify-between text-xs text-white/70">
                    <span>
                      ✅ Appliqué : <b>{promoCode}</b>
                      {promoPercent > 0 ? ` (-${promoPercent}%)` : ""}
                      {shipFree ? " (livraison offerte)" : ""}
                    </span>
                    <button type="button" className="underline" onClick={removePromo}>
                      Retirer
                    </button>
                  </div>
                ) : null}

                {promoMsg ? <div className="mt-2 text-xs text-white/60">{promoMsg}</div> : null}
              </div>

              {/* TOTALS */}
              <div className="mt-5 flex justify-between text-sm text-white/75">
                <span>Sous-total</span>
                <span>{euro(subtotal)}</span>
              </div>

              {discount > 0 ? (
                <div className="mt-2 flex justify-between text-sm text-white/75">
                  <span>Promo</span>
                  <span>-{euro(discount)}</span>
                </div>
              ) : null}

              <div className="mt-2 flex justify-between text-sm text-white/75">
                <span>Livraison</span>
                <span>{effectiveShipping === 0 ? "Offerte" : euro(effectiveShipping)}</span>
              </div>

              <div className="mt-3 flex justify-between text-lg font-black">
                <span>Total</span>
                <span>{euro(total)}</span>
              </div>

              <button type="button" className="nx-btn nx-btn-primary w-full mt-4" onClick={goCheckout}>
                Payer en sécurisé
              </button>

              <div className="mt-3 text-xs text-white/55">
                Paiement sécurisé via Stripe • Retours 30 jours • Support 7j/7
              </div>

              <button type="button" className="nx-btn nx-btn-ghost w-full mt-3" onClick={clear}>
                Vider le panier
              </button>
            </div>
          </div>
        )}
      </section>
    </NexusShell>
  );
}