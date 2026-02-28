import Stripe from "stripe";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

// ⚠️ Stripe doit être créé avec une clé valide
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

type Body = {
  items: { id: string; name: string; price: number; qty: number }[];
  promoCode?: string | null;
  summary?: {
    subtotal?: number;
    discount?: number;
    shipping?: number;
    total?: number;
  };
};

function asMoneyCents(n: number) {
  return Math.max(0, Math.round(Number(n || 0) * 100));
}

export async function POST(req: Request) {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: "STRIPE_SECRET_KEY manquant (Vercel/.env)" },
        { status: 500 }
      );
    }

    const body = (await req.json()) as Body;

    if (!body?.items?.length) {
      return NextResponse.json({ error: "Panier vide" }, { status: 400 });
    }

    const promoCode = (body.promoCode || "").trim().toUpperCase();

    // Shipping côté Stripe (on le reçoit du panier)
    let shippingEUR = Number(body.summary?.shipping ?? 0);
    if (!Number.isFinite(shippingEUR) || shippingEUR < 0) shippingEUR = 0;

    // Code SHIPFREE : on force livraison à 0
    if (promoCode === "SHIPFREE") {
      shippingEUR = 0;
    }

    // Line items produits
    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] =
      body.items.map((it) => ({
        quantity: Math.max(1, Math.floor(Number(it.qty || 1))),
        price_data: {
          currency: "eur",
          unit_amount: asMoneyCents(Number(it.price)),
          product_data: {
            name: String(it.name || "Produit"),
            // Tu peux rajouter un metadata si tu veux
          },
        },
      }));

    // Ajout d'une ligne "Livraison" (sinon Stripe ne voit jamais la livraison)
    if (shippingEUR > 0) {
      line_items.push({
        quantity: 1,
        price_data: {
          currency: "eur",
          unit_amount: asMoneyCents(shippingEUR),
          product_data: { name: "Livraison" },
        },
      });
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    // Réduction NEXUS10 : via coupon Stripe (recommandé)
    // 👉 Mets l’ID du coupon dans Vercel/.env : STRIPE_COUPON_NEXUS10_ID=coupon_xxx
    const discounts: Stripe.Checkout.SessionCreateParams.Discount[] = [];
    if (promoCode === "NEXUS10") {
      const couponId = process.env.STRIPE_COUPON_NEXUS10_ID;
      if (couponId) {
        discounts.push({ coupon: couponId });
      }
      // Si pas de couponId, on laisse Stripe gérer via allow_promotion_codes
      // (tu peux aussi créer un Promotion Code "NEXUS10" côté Stripe Dashboard)
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      success_url: `${siteUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/cart`,

      // ✅ Permet aussi à l’utilisateur d’entrer un code dans Stripe Checkout
      // (utile si tu crées des promo codes dans Stripe Dashboard)
      allow_promotion_codes: true,

      // ✅ Applique automatiquement NEXUS10 si tu fournis STRIPE_COUPON_NEXUS10_ID
      discounts: discounts.length ? discounts : undefined,

      // utile pour debug / webhook
      metadata: {
        promoCode: promoCode || "",
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message || "Stripe error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    hasKey: Boolean(process.env.STRIPE_SECRET_KEY),
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL || null,
    hasCouponNexus10: Boolean(process.env.STRIPE_COUPON_NEXUS10_ID),
  });
}