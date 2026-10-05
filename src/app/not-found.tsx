"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Phone, MessageCircle, HelpCircle, ArrowRight, Home } from "lucide-react";

const featuredProducts = [
  {
    name: "LED Display Signs",
    href: "/led-display-signs",
    image: "/images/products/outdoor-fixed-led-display.jpg",
    description: "Ultra-bright outdoor & indoor LED screens",
  },
  {
    name: "Neon LED Signs",
    href: "/neon-signs",
    image: "/images/products/neon/nano-signs-bar-neon-usa.webp",
    description: "Custom glowing neon signs for any space",
  },
  {
    name: "Custom Banners",
    href: "/custom-banners",
    image: "/images/products/yard_sign_hover.png",
    description: "Vinyl banners for events & promotions",
  },
  {
    name: "Vehicle Signs",
    href: "/vehicle-signs",
    image: "/images/products/mobile-truck-led-display.jpg",
    description: "Wraps & magnets for your fleet",
  },
];

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-opensans">
      <Header />

      {/* 404 Hero */}
      <section
        className="relative text-white py-20 md:py-28 overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0d0d1a 0%, #1a0a2f 50%, #00222a 100%)" }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
        {/* Animated blobs */}
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-[#ff2d78]/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-1000" />

        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <div className="text-[130px] md:text-[200px] font-black font-poppins leading-none mb-4 text-transparent bg-clip-text bg-gradient-to-br from-[#ff2d78] via-[#ff6b00] to-[#ff9a00]">
            404
          </div>
          <h1 className="text-3xl md:text-5xl font-black font-poppins mb-5 -mt-4">
            Oops! Page Not Found
          </h1>
          <p className="text-slate-300 text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed">
            Looks like this page got lost in transit. But don't worry — we have thousands of custom signage options ready for you!
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 bg-[#ff2d78] hover:bg-[#e0265f] text-white font-bold px-8 py-4 rounded-xl text-sm uppercase tracking-wider font-poppins transition-all shadow-lg shadow-pink-900/30"
            >
              <Home className="w-4 h-4" />
              Back to Home
            </Link>
            <Link
              href="/get-a-quote"
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold px-8 py-4 rounded-xl text-sm uppercase tracking-wider font-poppins transition-all border border-white/20"
            >
              Get a Free Quote <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Bar */}
      <div className="bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-wrap items-center justify-center gap-6 md:gap-12">
          <a
            href="tel:305-967-1005"
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center group-hover:bg-[#ff2d78] transition-colors">
              <Phone className="w-4 h-4 text-[#ff2d78] group-hover:text-white transition-colors" />
            </div>
            <div>
              <p className="text-xs text-gray-400 font-medium">Call Us</p>
              <p className="text-sm font-bold text-gray-800 group-hover:text-[#ff2d78] transition-colors">305-967-1005</p>
            </div>
          </a>
          <a
            href="mailto:info@nano-signs.com"
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center group-hover:bg-[#ff2d78] transition-colors">
              <MessageCircle className="w-4 h-4 text-[#ff2d78] group-hover:text-white transition-colors" />
            </div>
            <div>
              <p className="text-xs text-gray-400 font-medium">Email Us</p>
              <p className="text-sm font-bold text-gray-800 group-hover:text-[#ff2d78] transition-colors">info@nano-signs.com</p>
            </div>
          </a>
          <Link
            href="/contact-us"
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-full bg-pink-50 flex items-center justify-center group-hover:bg-[#ff2d78] transition-colors">
              <HelpCircle className="w-4 h-4 text-[#ff2d78] group-hover:text-white transition-colors" />
            </div>
            <div>
              <p className="text-xs text-gray-400 font-medium">Support</p>
              <p className="text-sm font-bold text-gray-800 group-hover:text-[#ff2d78] transition-colors">Contact Us</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Featured Products */}
      <main className="max-w-7xl mx-auto px-4 py-14">
        <h2 className="text-2xl md:text-3xl font-black text-gray-900 font-poppins text-center mb-10">
          Browse Our Popular Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <Link
              key={product.href}
              href={product.href}
              className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              <div className="relative h-44 bg-gray-100 overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 100vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <h3 className="font-bold text-gray-900 font-poppins group-hover:text-[#ff2d78] transition-colors mb-1">
                  {product.name}
                </h3>
                <p className="text-xs text-gray-400 flex-1">{product.description}</p>
                <div className="mt-3 flex items-center gap-1 text-xs font-bold text-[#ff2d78] font-poppins">
                  Shop Now <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Links */}
        <div className="mt-14 bg-gradient-to-br from-gray-900 to-slate-800 rounded-3xl p-10 md:p-12 text-white text-center">
          <h2 className="text-2xl md:text-3xl font-black font-poppins mb-3">Can't Find What You're Looking For?</h2>
          <p className="text-slate-300 mb-8 max-w-lg mx-auto">
            Our team at Nano Signs is ready to help you design and order the perfect custom sign for your business.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 text-sm font-bold font-poppins">
            {[
              { label: "All Signs", href: "/custom-signs" },
              { label: "Banners", href: "/custom-banners" },
              { label: "Vehicle Wraps", href: "/vehicle-signs" },
              { label: "LED Signs", href: "/led-display-signs" },
              { label: "Neon Signs", href: "/neon-signs" },
              { label: "Locations", href: "/locations" },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="bg-white/10 hover:bg-[#ff2d78] text-white px-5 py-2.5 rounded-full border border-white/20 hover:border-[#ff2d78] transition-all"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
