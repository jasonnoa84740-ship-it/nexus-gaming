import { NextRequest, NextResponse } from "next/server";
import { amazonProducts, AMAZON_TAG } from "@/lib/amazonProducts";

function makeAmazonSearchUrl(query: string) {
  const url = new URL("https://www.amazon.fr/s");
  url.searchParams.set("k", query);
  url.searchParams.set("tag", AMAZON_TAG);
  return url.toString();
}

export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;

  const product = amazonProducts.find((p) => p.id === id);

  if (!product) {
    return NextResponse.json({ error: "Produit introuvable" }, { status: 404 });
  }

  const direct = (product.amazonUrl ?? "").trim();
  const target =
    direct !== "" ? direct : makeAmazonSearchUrl(product.query || product.title);

  return NextResponse.redirect(target, 302);
}