import React from "react";
import Link from "next/link";
import Image from "next/image";
import { PRODUCTS_REGISTRY } from "@/lib/productsRegistry";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search | Nano Signs",
  description:
    "Search Nano Signs' catalog of custom signs, LED displays, neon signs, banners, vehicle wraps & printing products in Fort Lauderdale FL.",
  robots: { index: false, follow: false },
};

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const resolvedParams = await searchParams;
  const query = (resolvedParams.q || "").toLowerCase();

  // Find matching products
  const matchingProducts = [];
  if (query) {
    for (const [categoryKey, categoryData] of Object.entries(PRODUCTS_REGISTRY)) {
      if (categoryData.products) {
        for (const product of categoryData.products) {
          const searchString = `${product.name} ${product.description} ${categoryKey} ${categoryData.title || ""} ${categoryData.categoryDescriptionText || ""} ${product.config?.keyFeatures?.join(" ") || ""}`.toLowerCase();
          const tokens = query.split(/\s+/).filter(Boolean);
          const isMatch = tokens.every(token => searchString.includes(token));
          
          if (isMatch) {
            matchingProducts.push({
              ...product,
              categoryHref: `/${categoryKey}`,
              href: `/${categoryKey}/${product.id}`
            });
          }
        }
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-2">
          Search Results
        </h1>
        <p className="text-gray-600 mb-8">
          {query ? (
            <>
              Showing results for <span className="font-bold text-gray-900">"{resolvedParams.q}"</span>
            </>
          ) : (
            "Please enter a search term."
          )}
        </p>

        {query && matchingProducts.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
            <div className="text-5xl mb-4">🔍</div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">No products found</h2>
            <p className="text-gray-500 mb-6">
              We couldn't find any products matching "{resolvedParams.q}".
            </p>
            <Link
              href="/"
              className="inline-flex px-6 py-3 rounded-full text-white font-bold brand-gradient hover:opacity-90 transition-opacity"
            >
              Back to Home
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {matchingProducts.map((product) => (
              <Link
                key={product.id}
                href={product.href}
                className="group"
              >
                <div className="product-card-hover bg-white rounded-xl p-4 mb-3 aspect-square flex items-center justify-center relative shadow-sm border border-gray-100">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 250px"
                    quality={85}
                    className="object-contain p-6 group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <p className="text-center font-bold text-gray-800 text-xs sm:text-sm md:text-base transition-all group-hover:pink-cyan-text">
                  {product.name}
                </p>
              </Link>
            ))}
          </div>
        )}
        
        {/* Add Back to Home button for when results are found */}
        {query && matchingProducts.length > 0 && (
          <div className="mt-12 text-center">
            <Link
              href="/"
              className="inline-flex px-8 py-3 rounded-full text-white font-bold brand-gradient hover:opacity-90 transition-opacity"
            >
              Back to Home
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
