import Image from "next/image";
import Link from "next/link";
import { HeroCarousel } from "./HeroCarousel";

// HeroCarousel has "use client" — Next.js handles the client boundary automatically.
// The first <Image priority> renders server-side for fast LCP.

export function HeroSection() {
  return (
    <section className="w-full">
      <h1 className="sr-only">
        Custom Signs, Banners &amp; LED Signage in Fort Lauderdale FL — Nano Signs
      </h1>
      <div className="relative w-full aspect-[2164/727] overflow-hidden bg-slate-950">
        {/* First image renders server-side — LCP fires immediately with 30KB mobile WebP */}
        <picture className="absolute inset-0 w-full h-full">
          <source media="(max-width: 768px)" srcSet="/images/hero-image-mobile.webp" />
          <img
            src="/images/hero-image.webp"
            alt="Nano Signs — Custom banners, yard signs, roll-up displays and more"
            fetchPriority="high"
            loading="eager"
            className="w-full h-full object-cover object-center"
          />
        </picture>
        {/* Second slide loads client-side after hydration */}
        <HeroCarousel img2="/images/hero-image 2.webp" />
        <Link
          href="/get-a-quote"
          className="absolute bottom-[10%] left-[8%] z-20 px-[3%] py-[1.2%] bg-white text-gray-950 font-black uppercase tracking-wider rounded-none shadow-[0_4px_20px_rgba(0,0,0,0.3)] text-[length:clamp(8px,1.15vw,16px)] transition-all duration-300 hover:bg-[#ff2d78] hover:text-white hover:border-[#ff2d78] border border-transparent active:scale-95"
        >
          Request Quote
        </Link>
      </div>
    </section>
  );
}
