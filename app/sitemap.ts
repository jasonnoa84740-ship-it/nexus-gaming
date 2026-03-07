import type { MetadataRoute } from "next";
import { amazonProducts } from "@/lib/amazonProducts";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://nexusgamingfr.com";

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/bons-plans`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  const productPages: MetadataRoute.Sitemap = amazonProducts.map((product) => ({
    url: `${baseUrl}/products/${product.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...productPages];
}