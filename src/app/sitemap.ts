import { MetadataRoute } from "next";
import { PRODUCTS_REGISTRY } from "@/lib/productsRegistry";
import { LOCATIONS_REGISTRY } from "@/lib/locationsRegistry";
import { BLOG_REGISTRY } from "@/lib/blogRegistry";
import { getMarkdownBlogPosts } from "@/lib/blogUtils";
import fs from "fs";
import path from "path";

// Helper to extract file mtime or fallback to safe static date
function getFileMtime(relativeFilePath: string): Date {
  try {
    const fullPath = path.join(process.cwd(), relativeFilePath);
    if (fs.existsSync(fullPath)) {
      const stat = fs.statSync(fullPath);
      return stat.mtime;
    }
  } catch (e) {
    // fallback
  }
  return new Date("2026-11-20T12:00:00.000Z");
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://nano-signs.com";

  // Core public indexable pages with individual modification timestamps
  const corePages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: getFileMtime("src/app/page.tsx"),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/get-a-quote`,
      lastModified: getFileMtime("src/app/get-a-quote/page.tsx"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about-us`,
      lastModified: getFileMtime("src/app/about-us/page.tsx"),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact-us`,
      lastModified: getFileMtime("src/app/contact-us/page.tsx"),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/return-policy`,
      lastModified: getFileMtime("src/app/return-policy/page.tsx"),
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: getFileMtime("src/app/blog/page.tsx"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: getFileMtime("src/app/projects/page.tsx"),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/locations`,
      lastModified: getFileMtime("src/app/locations/page.tsx"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: getFileMtime("src/app/faq/page.tsx"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/corporate-pricing`,
      lastModified: getFileMtime("src/app/corporate-pricing/page.tsx"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    // Spanish Section (/es)
    {
      url: `${baseUrl}/es`,
      lastModified: getFileMtime("src/app/es/page.tsx"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/es/cotizacion`,
      lastModified: getFileMtime("src/app/es/cotizacion/page.tsx"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/es/letreros-comerciales`,
      lastModified: getFileMtime("src/app/es/letreros-comerciales/page.tsx"),
      changeFrequency: "weekly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/es/banners-y-pancartas`,
      lastModified: getFileMtime("src/app/es/banners-y-pancartas/page.tsx"),
      changeFrequency: "weekly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/es/letreros-led-y-neon`,
      lastModified: getFileMtime("src/app/es/letreros-led-y-neon/page.tsx"),
      changeFrequency: "weekly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/es/letreros-de-neon`,
      lastModified: getFileMtime("src/app/es/letreros-de-neon/page.tsx"),
      changeFrequency: "weekly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/es/ubicaciones/fort-lauderdale`,
      lastModified: getFileMtime("src/app/es/ubicaciones/fort-lauderdale/page.tsx"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  // Category & Product pages
  const categoryPages: MetadataRoute.Sitemap = [];
  const productPages: MetadataRoute.Sitemap = [];
  const addedProducts = new Set<string>();

  const productsRegistryMtime = getFileMtime("src/lib/productsRegistry.ts");

  for (const categorySlug of Object.keys(PRODUCTS_REGISTRY)) {
    categoryPages.push({
      url: `${baseUrl}/${categorySlug}`,
      lastModified: productsRegistryMtime,
      changeFrequency: "weekly",
      priority: 0.8,
    });

    const category = PRODUCTS_REGISTRY[categorySlug];
    for (const product of category.products) {
      if (!addedProducts.has(product.id)) {
        addedProducts.add(product.id);
        const productUrl = `${baseUrl}/${categorySlug}/${product.id}`;

        // Exclude legacy redirected product URLs so sitemap stays 100% clean
        if (
          productUrl.includes("/custom-signs/programmable-led-sign") ||
          productUrl.includes("/trade-show/roll-up-banners") ||
          productUrl.includes("/trade-show/retractable-banner") ||
          productUrl.includes("/trade-show/business-cards")
        ) {
          continue;
        }

        productPages.push({
          url: productUrl,
          lastModified: productsRegistryMtime,
          changeFrequency: "weekly",
          priority: 0.7,
        });
      }
    }
  }

  // Active City Locations
  const locationPages: MetadataRoute.Sitemap = [];
  const locationsRegistryMtime = getFileMtime("src/lib/locationsRegistry.ts");

  for (const locationId of Object.keys(LOCATIONS_REGISTRY)) {
    // Only include real active city/state location pages
    locationPages.push({
      url: `${baseUrl}/locations/${locationId}`,
      lastModified: locationsRegistryMtime,
      changeFrequency: "weekly",
      priority: 0.85,
    });
  }

  // Blog pages with real individual markdown post modification dates
  const blogPages: MetadataRoute.Sitemap = [];
  const addedBlogSlugs = new Set<string>();

  try {
    const mdPosts = getMarkdownBlogPosts();
    for (const post of mdPosts) {
      if (post.slug && !addedBlogSlugs.has(post.slug)) {
        addedBlogSlugs.add(post.slug);
        const mdFileMtime = getFileMtime(`src/content/blog/${post.slug}.md`);
        blogPages.push({
          url: `${baseUrl}/blog/${post.slug}`,
          lastModified: mdFileMtime,
          changeFrequency: "monthly",
          priority: 0.7,
        });
      }
    }
  } catch (e) {
    // Graceful fallback
  }

  // Registry-defined blog posts
  const blogRegistryMtime = getFileMtime("src/lib/blogRegistry.ts");
  for (const slug of Object.keys(BLOG_REGISTRY)) {
    if (!addedBlogSlugs.has(slug)) {
      addedBlogSlugs.add(slug);
      blogPages.push({
        url: `${baseUrl}/blog/${slug}`,
        lastModified: blogRegistryMtime,
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
  }

  return [...corePages, ...categoryPages, ...productPages, ...locationPages, ...blogPages];
}
