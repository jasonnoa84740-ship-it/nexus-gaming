"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import NexusShell from "@/components/NexusShell";
import { useCart, euro } from "@/lib/cart";
import { supabase } from "@/lib/supabaseClient";

const PROMO_STORAGE_KEY = "nx_promo_code";

export default function CartPage() {
  const { cart, inc, dec, remove, subtotal, shipping, clear } = useCart();

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
        // On revalide au montage pour éviter un code expiré
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
    // promo sur sous-total uniquement
    return Math.round((subtotal * pct) / 100);
  }, [promoPercent, subtotal]);

  const effectiveShipping = useMemo(() => {
    if (shipFree) return 0;
    return shipping;
  }, [shipFree, shipping]);

  const total = useMemo(() => {
    return Math.max(0, subtotal - discount) + effectiveShipping;
  }, [subtotal, discount, effectiveShipping]);

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
      // On check dans Supabase (table promo_codes)
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

      // Si expires_at existe et est passé, on refuse
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
          // info utile (debug / validation côté serveur)
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
    <NexusShell
      title="Panier"
      subtitle="Gère tes articles puis passe au paiement sécurisé Stripe."
    >
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
                      <div className="text-sm text-white/70">
                        {euro(it.product.price)}
                      </div>
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
                      <button
                        type="button"
                        className="px-2"
                        onClick={() => dec(it.product.id)}
                      >
                        −
                      </button>
                      <span className="w-8 text-center font-black">{it.qty}</span>
                      <button
                        type="button"
                        className="px-2"
                        onClick={() => inc(it.product.id)}
                      >
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
                    <button
                      type="button"
                      className="underline"
                      onClick={removePromo}
                    >
                      Retirer
                    </button>
                  </div>
                ) : null}

                {promoMsg ? (
                  <div className="mt-2 text-xs text-white/60">{promoMsg}</div>
                ) : null}
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
                <span>
                  {effectiveShipping === 0 ? "Offerte" : euro(effectiveShipping)}
                </span>
              </div>

              <div className="mt-3 flex justify-between text-lg font-black">
                <span>Total</span>
                <span>{euro(total)}</span>
              </div>

              <button
                type="button"
                className="nx-btn nx-btn-primary w-full mt-4"
                onClick={goCheckout}
              >
                Payer en sécurisé
              </button>

              <div className="mt-3 text-xs text-white/55">
                Paiement sécurisé via Stripe • Retours 30 jours • Support 7j/7
              </div>

              <button
                type="button"
                className="nx-btn nx-btn-ghost w-full mt-3"
                onClick={clear}
              >
                Vider le panier
              </button>
            </div>
          </div>
        )}
      </section>
    </NexusShell>
  );
}