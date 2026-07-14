import { MetadataRoute } from "next";
import { PRODUCTS_REGISTRY } from "@/lib/productsRegistry";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://nano-signs.com";
  const currentDate = new Date();

  // Core pages
  const corePages = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about-us`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact-us`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/return-policy`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/get-a-quote`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
  ];

  const categoryPages: MetadataRoute.Sitemap = [];
  const productPages: MetadataRoute.Sitemap = [];
  const addedProducts = new Set<string>();

  for (const categorySlug of Object.keys(PRODUCTS_REGISTRY)) {
    categoryPages.push({
      url: `${baseUrl}/${categorySlug}`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    });

    const category = PRODUCTS_REGISTRY[categorySlug];
    for (const product of category.products) {
      if (!addedProducts.has(product.id)) {
        addedProducts.add(product.id);
        productPages.push({
          url: `${baseUrl}/${categorySlug}/${product.id}`,
          lastModified: currentDate,
          changeFrequency: "weekly" as const,
          priority: 0.6,
        });
      }
    }
  }

  return [...corePages, ...categoryPages, ...productPages];
}
