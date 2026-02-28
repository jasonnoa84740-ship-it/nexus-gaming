import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

});

type Body = {
  items: { id: string; name: string; price: number; qty: number }[];
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Body;

    // ⚠️ IMPORTANT (vrai site) : ne fais jamais confiance au prix envoyé par le client.
    // Pour l’instant on est en test. Ensuite on sécurise en gardant les prix côté serveur.
    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = body.items.map((it) => ({
      quantity: it.qty,
      price_data: {
        currency: "eur",
        unit_amount: Math.round(it.price * 100),
        product_data: { name: it.name },
      },
    }));

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      success_url: `${siteUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteUrl}/cart`,
      allow_promotion_codes: true,
    });

    // Stripe renvoie une URL Checkout prête à ouvrir
    return NextResponse.json({ url: session.url });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "Stripe error" }, { status: 400 });
  }
}