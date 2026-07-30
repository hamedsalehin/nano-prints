import React from "react";
import { notFound } from "next/navigation";
import { PRODUCTS_REGISTRY } from "@/lib/productsRegistry";
import { CategoryPageClient } from "@/components/CategoryPageClient";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{ category: string }>;
}

// Per-category SEO keyword map — focused on Fort Lauderdale FL
const categoryMeta: Record<string, { title: string; description: string }> = {
  "neon-signs": {
    title: "Nano Signs | Custom Neon Signs & LED Neon Fort Lauderdale FL",
    description: "Custom LED neon signs for businesses, restaurants & home decor in Fort Lauderdale FL. Energy-efficient, shatterproof & bright. Call 305-967-1005 for free quote.",
  },
  "custom-banners": {
    title: "Vinyl Banner Printing Fort Lauderdale FL | Nano Signs",
    description: "Heavy-duty vinyl banner printing in Fort Lauderdale FL. Weatherproof outdoor banners, mesh & retractable roll-up banner stands. Call 305-967-1005 for fast print.",
  },
  "custom-flags": {
    title: "Custom Feather Flags & Business Advertising Flags | Nano Signs",
    description: "Custom feather flags, teardrop flags & event banners printed in Fort Lauderdale FL. Wind-resistant, double-sided printing. Call 305-967-1005 for fast turnaround.",
  },
  "custom-signs": {
    title: "Nano Signs | Custom Business & Storefront Signs FL",
    description: "Custom storefront business signs, channel letters, acrylic & yard signs in Fort Lauderdale FL. Design, fabrication & install. Call 305-967-1005 for a free quote.",
  },
  "led-display-signs": {
    title: "Nano Signs | LED Display & Programmable Signs FL",
    description: "Programmable LED display signs & digital message boards for businesses in Fort Lauderdale FL. Indoor/outdoor bright screens. Call 305-967-1005 for custom quote.",
  },
  "custom-decals": {
    title: "Nano Signs | Vehicle Wraps & Window Decals FL",
    description: "Custom vehicle wraps, car door magnets & storefront window decals in Fort Lauderdale FL. Premium UV vinyl & sleek finish. Call 305-967-1005 for fast quotes.",
  },
  "trade-show": {
    title: "Nano Signs | Trade Show Displays & Banners FL",
    description: "Trade show displays, pop-up backdrops & roll-up banner stands printed in Fort Lauderdale FL. Lightweight, portable & vibrant. Call 305-967-1005 for fast delivery.",
  },
  "marketing-materials": {
    title: "Business Cards, Flyers & Print Services Fort Lauderdale",
    description: "Premium business cards, flyers, brochures & postcards printed in Fort Lauderdale FL. Heavy cardstock & sharp colors. Call 305-967-1005 for bulk print deals.",
  },
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params;
  const decodedCategory = decodeURIComponent(category);
  const categoryData = PRODUCTS_REGISTRY[decodedCategory];
  if (!categoryData) return {};

  const meta = categoryMeta[decodedCategory];
  const title = meta?.title ?? `Nano Signs | Custom ${categoryData.title} Fort Lauderdale FL`;
  const description = meta?.description ?? `High-quality custom ${categoryData.title.toLowerCase()} in Fort Lauderdale & Oakland Park FL. Fast turnaround in Broward County. Same-day quotes. Call 305-967-1005.`;

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
