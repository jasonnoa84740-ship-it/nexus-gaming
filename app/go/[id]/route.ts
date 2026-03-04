import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { amazonProducts } from "@/lib/amazonProducts";

export function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id;

  const product = amazonProducts.find((p) => p.id === id);

  if (!product) {
    return NextResponse.redirect(new URL("/bons-plans", req.url));
  }

  const url = (product.amazonUrl || "").trim();
  if (url) {
    return NextResponse.redirect(url);
  }

  const q = encodeURIComponent(product.query || product.title);
  return NextResponse.redirect(`https://www.amazon.fr/s?k=${q}`);
}