import React from "react";
import { notFound } from "next/navigation";
import { PRODUCTS_REGISTRY } from "@/lib/productsRegistry";
import { CategoryPageClient } from "@/components/CategoryPageClient";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params;
  const decodedCategory = decodeURIComponent(category);
  const categoryData = PRODUCTS_REGISTRY[decodedCategory];
  if (!categoryData) return {};
  
  const title = `${categoryData.title} | Nano Signs`;
  const description = categoryData.description
    ? `Custom ${categoryData.title.toLowerCase()} online or in Broward County. ${categoryData.description}`
    : `High-quality custom ${categoryData.title.toLowerCase()} printing in Fort Lauderdale & Oakland Park FL. Fastest turnaround. Call 305-967-1005!`;

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
