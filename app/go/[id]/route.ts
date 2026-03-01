import { NextResponse } from "next/server";
import { amazonProducts } from "@/lib/amazonProducts";

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;

  const product = amazonProducts.find((p) => p.id === id);

  const origin = new URL(request.url).origin;

  if (!product) {
    return NextResponse.redirect(new URL("/bons-plans", origin), 302);
  }

  return NextResponse.redirect(product.amazonUrl, 302);
}