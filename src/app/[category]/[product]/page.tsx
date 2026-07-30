import React from "react";
import { notFound } from "next/navigation";
import { SignProductPage } from "@/components/SignProductPage";
import { PRODUCTS_REGISTRY } from "@/lib/productsRegistry";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{
    category: string;
    product: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category, product } = await params;
  const decodedCategory = decodeURIComponent(category);
  const decodedProduct = decodeURIComponent(product);
  const categoryData = PRODUCTS_REGISTRY[decodedCategory];
  if (!categoryData) return {};
  const productData = categoryData.products.find((p) => p.id === decodedProduct);
  if (!productData) return {};
  
  // Category-specific keyword suffixes for accurate product titles
  const categorySuffixes: Record<string, string> = {
    "neon-signs": "Custom LED Neon Signs Fort Lauderdale FL",
    "custom-banners": "Vinyl Banner Printing Fort Lauderdale FL",
    "custom-flags": "Custom Flag Printing Fort Lauderdale FL",
    "custom-signs": "Custom Business Signs Fort Lauderdale FL",
    "led-display-signs": "Digital Signage Fort Lauderdale FL",
    "custom-decals": "Vehicle Wraps & Decals Fort Lauderdale FL",
    "trade-show": "Trade Show Displays Fort Lauderdale FL",
    "marketing-materials": "Commercial Printing Fort Lauderdale FL",
  };

  const suffix = categorySuffixes[decodedCategory] || `Custom ${categoryData.title} Fort Lauderdale FL`;
  const isDuplicate = productData.name.toLowerCase().includes("led") && suffix.toLowerCase().includes("led");
  const title = `${productData.name} Fort Lauderdale FL | Nano Signs`;
  const description = productData.description
    ? `Custom ${productData.name} in Fort Lauderdale FL. ${productData.description} Call 305-967-1005 for a free quote.`
    : `High-quality ${productData.name} printing in Fort Lauderdale & Oakland Park FL. Fast turnaround & durable materials. Call 305-967-1005!`;

  let primaryCategory = decodedCategory;
  for (const [catSlug, catData] of Object.entries(PRODUCTS_REGISTRY)) {
    if (catData.products.some(p => p.id === decodedProduct)) {
      primaryCategory = catSlug;
      break;
    }
  }

  const ogImageUrl = productData.image.startsWith("/") 
    ? `https://nano-signs.com${productData.image}`
    : productData.image;

  return {
    title,
    description: description.slice(0, 155),
    alternates: {
      canonical: `https://nano-signs.com/${primaryCategory}/${decodedProduct}`,
    },
    openGraph: {
      title,
      description: description.slice(0, 155),
      url: `https://nano-signs.com/${primaryCategory}/${decodedProduct}`,
      type: "website",
      images: [
        {
          url: ogImageUrl,
          alt: productData.name,
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

// Categories that have their own static product sub-pages
// These must be excluded from generateStaticParams to avoid route conflicts.
const STATIC_PRODUCT_CATEGORIES = new Set<string>();

export async function generateStaticParams() {
  const paths: { category: string; product: string }[] = [];

  for (const category of Object.keys(PRODUCTS_REGISTRY)) {
    if (STATIC_PRODUCT_CATEGORIES.has(category)) {
      continue;
    }
    const categoryData = PRODUCTS_REGISTRY[category];
    for (const product of categoryData.products) {
      paths.push({
        category: category,
        product: product.id,
      });
    }
  }
  return paths;
}

export const dynamicParams = false;

export default async function ProductConfiguratorPage({ params }: PageProps) {
  const { category, product } = await params;
  const decodedCategory = decodeURIComponent(category);
  const decodedProduct = decodeURIComponent(product);

  const categoryData = PRODUCTS_REGISTRY[decodedCategory];
  if (!categoryData) {
    notFound();
  }

  const productData = categoryData.products.find(
    (p) => p.id === decodedProduct,
  );
  if (!productData) {
    notFound();
  }

  // Render the pre-configured product layout page with dynamic description
  const configWithDesc = {
    ...productData.config,
    id: productData.id,
    description: productData.config.description || productData.description,
  };

  return <SignProductPage cfg={configWithDesc} />;
}
