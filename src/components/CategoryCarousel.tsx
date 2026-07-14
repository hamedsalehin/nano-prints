"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const categories = [
  {
    name: "Signs",
    href: "/custom-signs",
    image: "/images/products/main%20page/all_signs_product.png",
  },
  {
    name: "Business Cards",
    href: "/marketing-materials/business-cards",
    image: "/images/products/main%20page/business_cards.png",
  },
  {
    name: "Banners",
    href: "/custom-banners",
    image: "/images/products/main%20page/fabric_banner.png",
  },
  {
    name: "Retractable Banners",
    href: "/custom-banners/roll-up-banners",
    image: "/images/products/main%20page/retractable_roll_up_banner.png",
  },
  {
    name: "Flags",
    href: "/custom-flags",
    image: "/images/products/main%20page/flags.png",
  },
  {
    name: "Car Magnets",
    href: "/vehicle-signs",
    image: "/images/products/main%20page/vehicle_magnets.png",
  },
  {
    name: "Tradeshow",
    href: "/trade-show",
    image: "/images/products/main%20page/event_tents.png",
  },
  {
    name: "Custom Decals",
    href: "/custom-decals",
    image: "/images/products/main%20page/sticker_and_labels.png",
  },
];

export function CategoryCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.75;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="pt-3 pb-3 md:pt-6 md:pb-6 bg-white border-b border-pink-50">
      <div className="w-full px-6 md:px-16 lg:px-24 xl:px-32">
        <h2 className="font-poppins text-lg sm:text-xl md:text-2xl lg:text-3xl font-extrabold mb-2 md:mb-4 tracking-tight pink-cyan-text">
          Custom Signs for Every Need
        </h2>

        <div className="relative">
          {/* Scroll left */}
          <button
            type="button"
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-xl rounded-full p-3 -ml-5 focus:outline-none hover:scale-110 transition-transform duration-200"
            style={{ border: "2px solid #ff2d78", color: "#ff2d78" }}
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Scroll right */}
          <button
            type="button"
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-xl rounded-full p-3 -mr-5 focus:outline-none hover:scale-110 transition-transform duration-200"
            style={{ border: "2px solid #ff2d78", color: "#ff2d78" }}
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Carousel track */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto hide-scrollbar pb-6 px-1"
          >
            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="flex-shrink-0 w-48 md:w-64 group"
              >
                {/* Pure CSS hover via card-pink-hover class */}
                <div className="card-pink-hover rounded-2xl p-6 mb-4 aspect-square flex items-center justify-center overflow-hidden">
                  <div className="relative w-full h-full">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      sizes="(max-width: 768px) 192px, 256px"
                      quality={85}
                      className="object-contain transition-transform duration-500 ease-out group-hover:scale-110"
                    />
                  </div>
                </div>
                <p className="text-center font-bold font-poppins text-xs sm:text-sm md:text-base leading-tight text-gray-800 group-hover:pink-cyan-text transition-all duration-200">
                  {category.name}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
