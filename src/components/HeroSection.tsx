"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const heroImages = [
  {
    src: "/images/hero-image.jpeg",
    alt: "Nano Signs — Custom banners, yard signs, roll-up displays and more",
  },
  {
    src: "/images/hero-image 2.jpg",
    alt: "Nano Signs — Premium custom printing and signage products",
  },
];

export function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="w-full">
      <h1 className="sr-only">Custom Signs, Banners &amp; LED Signage in Fort Lauderdale FL — Nano Signs</h1>
      <div className="relative w-full aspect-[2164/727] overflow-hidden bg-slate-950">
        {heroImages.map((img, index) => (
          <div
            key={img.src}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="100vw"
              quality={75}
              fetchPriority={index === 0 ? "high" : "auto"}
              className="object-cover object-center"
              priority={index === 0}
            />
          </div>
        ))}
        {/* Dynamic percentage-positioned Request Quote Button overlaying the hero image */}
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
