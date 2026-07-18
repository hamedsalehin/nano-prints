import { MetadataRoute } from "next";
import { PRODUCTS_REGISTRY } from "@/lib/productsRegistry";
import { LOCATIONS_REGISTRY } from "@/lib/locationsRegistry";
import { BLOG_REGISTRY } from "@/lib/blogRegistry";

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
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/locations`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/design`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/corporate-pricing`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.7,
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

  const locationPages: MetadataRoute.Sitemap = [];
  for (const locationId of Object.keys(LOCATIONS_REGISTRY)) {
    locationPages.push({
      url: `${baseUrl}/locations/${locationId}`,
      lastModified: currentDate,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    });
  }

  const blogPages: MetadataRoute.Sitemap = [];
  for (const slug of Object.keys(BLOG_REGISTRY)) {
    blogPages.push({
      url: `${baseUrl}/blog/${slug}`,
      lastModified: currentDate,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    });
  }

  return [...corePages, ...categoryPages, ...productPages, ...locationPages, ...blogPages];
}
