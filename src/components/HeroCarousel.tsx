"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface Props {
  img2: string;
}

export function HeroCarousel({ img2 }: Props) {
  const [showSecond, setShowSecond] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setShowSecond((prev) => !prev);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className={`absolute inset-0 transition-opacity duration-1000 ease-in-out z-10 ${
        showSecond ? "opacity-100" : "opacity-0"
      }`}
    >
      <Image
        src={img2}
        alt="Nano Signs — Premium custom printing and signage products"
        fill
        sizes="100vw"
        quality={75}
        className="object-cover object-center"
      />
    </div>
  );
}
