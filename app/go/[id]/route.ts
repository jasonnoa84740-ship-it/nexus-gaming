import { NextResponse } from "next/server";
import { amazonProducts } from "@/lib/amazonProducts";

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const origin = new URL(request.url).origin;

  const product = amazonProducts.find((p) => p.id === id);
  if (!product) {
    return NextResponse.redirect(new URL("/bons-plans", origin), 302);
  }

  const url = (product.amazonUrl || "").trim();
  if (url) {
    // ✅ redirection directe vers le produit Amazon (ton lien affilié)
    return NextResponse.redirect(url, 302);
  }

  // ✅ fallback safe si lien pas encore rempli : recherche Amazon
  const search = `https://www.amazon.fr/s?k=${encodeURIComponent(
    product.query || product.title
  )}`;
  return NextResponse.redirect(search, 302);
}