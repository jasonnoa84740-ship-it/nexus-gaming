import { NextResponse } from "next/server";
import { amazonProducts } from "@/lib/amazonProducts";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  const product = amazonProducts.find((p) => p.id === id);

  // si produit introuvable -> retour au catalogue
  if (!product) {
    return NextResponse.redirect(new URL("/bons-plans", request.url), 302);
  }

  // ✅ si lien exact rempli -> fiche produit exacte Amazon
  const url = (product.amazonUrl || "").trim();
  if (url) {
    return NextResponse.redirect(url, 302);
  }

  // sinon -> recherche Amazon
  const q = encodeURIComponent(product.query || product.title);
  return NextResponse.redirect(`https://www.amazon.fr/s?k=${q}`, 302);
}