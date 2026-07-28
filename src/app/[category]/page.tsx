import React from "react";
import { notFound } from "next/navigation";
import { PRODUCTS_REGISTRY } from "@/lib/productsRegistry";
import { CategoryPageClient } from "@/components/CategoryPageClient";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{ category: string }>;
}

// Per-category SEO keyword map — focused on Oakland Park FL
const categoryMeta: Record<string, { title: string; description: string }> = {
  "neon-signs": {
    title: "Custom Neon Signs Oakland Park FL | LED Neon Signs | Nano Signs",
    description: "Custom LED neon signs for businesses, restaurants & home décor in Oakland Park FL. Any color, font or shape. Indoor & outdoor. Fast turnaround. Free quote: 305-967-1005.",
  },
  "custom-banners": {
    title: "Banner Printing Oakland Park FL | Vinyl & Mesh Banners | Nano Signs",
    description: "Professional banner printing in Oakland Park FL. Vinyl banners, mesh banners, fabric banners & retractable banners. Same-week turnaround. Call 305-967-1005.",
  },
  "custom-flags": {
    title: "Custom Flags Oakland Park FL | Feather Flags & Flag Printing | Nano Signs",
    description: "Custom flags, feather flags & teardrop flags printed in Oakland Park FL. Perfect for business events, grand openings & storefronts. Fast printing. Call 305-967-1005.",
  },
  "custom-signs": {
    title: "Custom Business Signs Oakland Park FL | Sign Shop | Nano Signs",
    description: "Custom business signs, storefront signs, yard signs & real estate signs in Oakland Park FL. Full-service sign shop. Same-day quotes. Call 305-967-1005.",
  },
  "led-display-signs": {
    title: "LED Display Signs Oakland Park FL | Programmable LED Signs | Nano Signs",
    description: "Programmable LED display signs & digital signage for businesses in Oakland Park FL. Outdoor & indoor LED signs. Installation included. Free quote: 305-967-1005.",
  },
  "custom-decals": {
    title: "Vehicle Wraps & Decals Oakland Park FL | Window Graphics | Nano Signs",
    description: "Custom vehicle wraps, car decals, window graphics & stickers in Oakland Park FL. Full & partial wraps. UV-resistant inks. Fast turnaround. Call 305-967-1005.",
  },
  "trade-show": {
    title: "Trade Show Displays Oakland Park FL | Roll-Up Banners & Booths | Nano Signs",
    description: "Trade show displays, roll-up banners, pop-up booths & retractable banners in Oakland Park FL. Professional quality, fast print. Call 305-967-1005.",
  },
  "marketing-materials": {
    title: "Business Cards & Marketing Print Oakland Park FL | Nano Signs",
    description: "Business cards, flyers, brochures, postcards & marketing materials printed in Oakland Park FL. Premium paper stocks, fast turnaround. Call 305-967-1005.",
  },
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params;
  const decodedCategory = decodeURIComponent(category);
  const categoryData = PRODUCTS_REGISTRY[decodedCategory];
  if (!categoryData) return {};

  const meta = categoryMeta[decodedCategory];
  const title = meta?.title ?? `Custom ${categoryData.title} Oakland Park FL | Nano Signs`;
  const description = meta?.description ?? `High-quality custom ${categoryData.title.toLowerCase()} in Oakland Park FL. Fast turnaround in Broward County. Same-day quotes. Call 305-967-1005.`;

  const ogImageUrl = categoryData.heroImage.startsWith("/") 
    ? `https://nano-signs.com${categoryData.heroImage}`
    : categoryData.heroImage;

  return {
    title,
    description: description.slice(0, 155),
    alternates: {
      canonical: `https://nano-signs.com/${decodedCategory}`,
    },
    openGraph: {
      title,
      description: description.slice(0, 155),
      url: `https://nano-signs.com/${decodedCategory}`,
      type: "website",
      images: [
        {
          url: ogImageUrl,
          alt: categoryData.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: description.slice(0, 155),
      images: [ogImageUrl],
    },
  };
}

export async function generateStaticParams() {
  const categories = Object.keys(PRODUCTS_REGISTRY);
  return categories.map((category) => ({
    category: category,
  }));
}

export const dynamicParams = false;

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;
  const decodedCategory = decodeURIComponent(category);
  const categoryData = PRODUCTS_REGISTRY[decodedCategory];

  if (!categoryData) {
    notFound();
  }

  const firstTwoProducts = categoryData.products.slice(0, 2);

  return (
    <CategoryPageClient
      categorySlug={decodedCategory}
      title={categoryData.title}
      breadcrumbLabel={categoryData.breadcrumbLabel || categoryData.title}
      heroSubtitle={
        categoryData.heroSubtitle ||
        "All-Weather. Quick Production. Affordable."
      }
      heroImage={categoryData.heroImage}
      tabletHeroImage={categoryData.tabletHeroImage}
      mobileHeroImage={categoryData.mobileHeroImage}
      heroVariant={(categoryData as { heroVariant?: "neon" | "default" }).heroVariant}
      products={categoryData.products.map((p) => ({
        id: p.id,
        name: p.name,
        image: p.image,
        hoverImage: p.hoverImage,
      }))}
      categoryDescriptionText={categoryData.categoryDescriptionText}
      categorySecondaryImage={categoryData.categorySecondaryImage}
      faqs={categoryData.faqs || []}
      reviewRating={categoryData.reviewRating}
      reviewCount={categoryData.reviewCount}
      reviewQuote={categoryData.reviewQuote}
      ctaProduct1={
        firstTwoProducts[0]
          ? {
              name: firstTwoProducts[0].name,
              href: `/${decodedCategory}/${firstTwoProducts[0].id}`,
            }
          : undefined
      }
      ctaProduct2={
        firstTwoProducts[1]
          ? {
              name: firstTwoProducts[1].name,
              href: `/${decodedCategory}/${firstTwoProducts[1].id}`,
            }
          : undefined
      }
    />
  );
}
