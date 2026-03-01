// app/go/[id]/route.ts

import { NextResponse } from "next/server";
import { amazonProducts } from "@/lib/amazonProducts";

export function GET(request: Request, { params }: { params: { id: string } }) {
  const product = amazonProducts.find((p) => p.id === params.id);

  // origine dynamique (marche en local + Vercel)
  const origin = new URL(request.url).origin;

  // Si id inconnu -> retourne vers la page Bons Plans
  if (!product) {
    return NextResponse.redirect(new URL("/bons-plans", origin), 302);
  }

  // Redirection vers Amazon
  return NextResponse.redirect(product.amazonUrl, 302);
}