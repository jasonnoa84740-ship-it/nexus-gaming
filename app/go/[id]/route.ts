// app/go/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { amazonProducts } from "@/lib/amazonProducts";

export function GET(req: NextRequest, context: { params: { id: string } }) {
  const { id } = context.params;

  const product = amazonProducts.find((p) => p.id === id);

  if (!product) {
    return NextResponse.redirect(new URL("/bons-plans", req.url), 302);
  }

  const url = (product.amazonUrl || "").trim();
  if (url) {
    return NextResponse.redirect(url, 302);
  }

  const q = encodeURIComponent(product.query || product.title);
  return NextResponse.redirect(`https://www.amazon.fr/s?k=${q}`, 302);
}