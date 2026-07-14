"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  TrendingUp,
  Zap,
  Award,
  Users,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  ArrowRight
} from "lucide-react";

export default function AboutUsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-opensans">
      <Header />

      {/* Hero Header */}
      <section className="relative text-white py-16 md:py-24" style={{
        background: "linear-gradient(135deg, #0d0d1a 0%, #1a0a2f 50%, #00222a 100%)"
      }}>
        {/* Decorative elements */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
        
        <div className="relative max-w-7xl mx-auto px-4 text-center z-10">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-[#ff2d78]/20 text-[#ff2d78] mb-4 uppercase tracking-widest border border-[#ff2d78]/30">
            Our Story
          </span>
          <h1 className="text-4xl md:text-6xl font-poppins font-black mb-6 tracking-tight leading-tight">
            We Print Everything.
          </h1>
          <p className="max-w-2xl mx-auto text-sm md:text-base text-gray-300 font-medium">
            Nano Signs is Oakland Park's premier custom signage and digital printing workshop. We turn your visual ideas into high-impact reality, fast.
          </p>
        </div>
      </section>

      {/* Main Section */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 py-12 md:py-16 space-y-16">
        
        {/* Mission and Story */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-2xl md:text-3xl font-poppins font-black text-slate-800 tracking-tight leading-tight">
              Oakland Park's Local Printing Experts
            </h2>
            <p className="text-sm md:text-base text-slate-650 leading-relaxed font-medium">
              Established with a single goal in mind—to deliver premium quality commercial printing with lightning-fast turnaround times—Nano Signs has grown to serve real estate agents, contractors, political campaigns, and retail shops across Broward County.
            </p>
            <p className="text-sm md:text-base text-slate-650 leading-relaxed font-medium">
              Unlike generic online printing conglomerates, we print locally at our Powerline Road headquarters. We oversee every single sign, banner, flag, and card that rolls off our high-resolution UV flatbeds, ensuring vibrant, fade-proof colors that withstand the harsh South Florida sun and humidity.
            </p>
            <div className="pt-2">
              <Link
                href="/custom-signs"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-[#ff2d78] to-[#b020ff] hover:opacity-90 transition-opacity text-white rounded-xl text-sm font-bold shadow-md"
              >
                Browse Products <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 bg-gradient-to-tr from-pink-500/10 to-cyan-500/10 border border-pink-100 rounded-3xl p-8 shadow-sm text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#00e5ff]/10 rounded-full filter blur-xl" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#ff2d78]/10 rounded-full filter blur-xl" />

            <div className="relative z-10 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-[#ff2d78] mx-auto shadow border border-pink-50">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-poppins font-black text-xl text-slate-800">
                Our Guarantee
              </h3>
              <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                Whether you need a single custom-cut aluminum parking sign or 5,000 political corrugated yard signs, we back every project with our Quality Proofing check. We check resolutions, bleed lines, and print settings before ink hits the substrate.
              </p>
              <div className="border-t border-slate-200/50 pt-4 mt-4 text-left space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                  <ShieldCheck className="w-4.5 h-4.5 text-emerald-500" />
                  <span>Next-Day Pick-up / Delivery Available</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                  <ShieldCheck className="w-4.5 h-4.5 text-emerald-500" />
                  <span>UV-Stabilized Weatherproof Inks</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                  <ShieldCheck className="w-4.5 h-4.5 text-emerald-500" />
                  <span>Free Design Layout Checks</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pillars / Values */}
        <section className="bg-white rounded-3xl p-8 md:p-12 shadow-md border border-gray-150">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl md:text-3xl font-poppins font-black text-slate-800">
              Core Principles
            </h2>
            <p className="text-sm text-slate-500 font-medium mt-1">
              We construct our entire operation around what matters most to your business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-pink-50 text-[#ff2d78] flex items-center justify-center flex-shrink-0">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-poppins font-black text-slate-800">
                Turnaround Speed
              </h3>
              <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                Time is money. We specialize in next-day local pickup and fast express delivery. When you have a last-minute open house or campaign event, we ensure your signs are ready on time.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-50 text-[#00e5ff] flex items-center justify-center flex-shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-poppins font-black text-slate-800">
                Material Durability
              </h3>
              <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                South Florida weather presents unique challenges. We use premium cast acrylics, rust-proof alloys, heavy-duty coroplast, and laminate films designed specifically to block moisture and UV rays.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-[#b020ff] flex items-center justify-center flex-shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-poppins font-black text-slate-800">
                Expert Assistance
              </h3>
              <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                We're a team of designers and print technicians. If you need help modifying a template, scaling a logo, or selecting the right mount or stake, our live chat and phone support are staffed by actual print experts.
              </p>
            </div>
          </div>
        </section>

        {/* Visit Our Fort Lauderdale Location */}
        <section className="space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-poppins font-black text-slate-800">
              Our Fort Lauderdale Facility
            </h2>
            <p className="text-sm text-slate-500 font-medium mt-1">
              Visit our local showroom and production facility on Powerline Road. See our state-of-the-art printers in action and check out physical material samples before you order.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 shadow-sm hover:shadow-md transition-shadow">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-slate-100">
                <Image
                  src="/images/about/storefront.jpg"
                  alt="Nano Signs Storefront in Fort Lauderdale"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <p className="mt-3 text-center text-xs font-bold text-slate-700 font-poppins">Fort Lauderdale Storefront</p>
            </div>

            <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 shadow-sm hover:shadow-md transition-shadow">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-slate-100">
                <Image
                  src="/images/about/interior_2.jpg"
                  alt="Nano Signs Lobby & Showroom"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <p className="mt-3 text-center text-xs font-bold text-slate-700 font-poppins">Lobby &amp; Waiting Area</p>
            </div>

            <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 shadow-sm hover:shadow-md transition-shadow">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-slate-100">
                <Image
                  src="/images/about/interior_1.png"
                  alt="Custom Print Product Display"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <p className="mt-3 text-center text-xs font-bold text-slate-700 font-poppins">Product Samples Display</p>
            </div>

            <div className="group overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 shadow-sm hover:shadow-md transition-shadow">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-slate-100">
                <Image
                  src="/images/about/printer.jpg"
                  alt="High-Resolution Wide Format Mimaki Printer"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <p className="mt-3 text-center text-xs font-bold text-slate-700 font-poppins">Wide Format UV Printer</p>
            </div>
          </div>
        </section>

        {/* Capability Overview */}
        <section className="text-center space-y-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-poppins font-black text-slate-800">
              One Shop. Infinite Possibilities.
            </h2>
            <p className="text-sm text-slate-500 font-medium mt-1">
              If it can be printed, we can construct it. Explore our primary product categories.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <Link href="/custom-signs" className="group">
              <div className="product-card-hover bg-white rounded-2xl p-4 mb-3 aspect-square flex items-center justify-center border border-slate-200 shadow-sm relative overflow-hidden">
                <Image
                  src="/images/products/main%20page/all_signs_product.png"
                  alt="Custom Signs"
                  fill
                  sizes="(max-width: 640px) 50vw, 250px"
                  className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <p className="text-center font-poppins font-black text-slate-800 text-xs sm:text-sm transition-colors group-hover:text-[#ff2d78]">
                Custom Signs
              </p>
            </Link>

            <Link href="/custom-banners" className="group">
              <div className="product-card-hover bg-white rounded-2xl p-4 mb-3 aspect-square flex items-center justify-center border border-slate-200 shadow-sm relative overflow-hidden">
                <Image
                  src="/images/products/main%20page/fabric_banner.png"
                  alt="Vinyl Banners"
                  fill
                  sizes="(max-width: 640px) 50vw, 250px"
                  className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <p className="text-center font-poppins font-black text-slate-800 text-xs sm:text-sm transition-colors group-hover:text-[#ff2d78]">
                Vinyl Banners
              </p>
            </Link>

            <Link href="/custom-flags" className="group">
              <div className="product-card-hover bg-white rounded-2xl p-4 mb-3 aspect-square flex items-center justify-center border border-slate-200 shadow-sm relative overflow-hidden">
                <Image
                  src="/images/products/main%20page/flags.png"
                  alt="Business Flags"
                  fill
                  sizes="(max-width: 640px) 50vw, 250px"
                  className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <p className="text-center font-poppins font-black text-slate-800 text-xs sm:text-sm transition-colors group-hover:text-[#ff2d78]">
                Business Flags
              </p>
            </Link>

            <Link href="/marketing-materials" className="group">
              <div className="product-card-hover bg-white rounded-2xl p-4 mb-3 aspect-square flex items-center justify-center border border-slate-200 shadow-sm relative overflow-hidden">
                <Image
                  src="/images/products/main%20page/business_cards.png"
                  alt="Business Cards"
                  fill
                  sizes="(max-width: 640px) 50vw, 250px"
                  className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <p className="text-center font-poppins font-black text-slate-800 text-xs sm:text-sm transition-colors group-hover:text-[#ff2d78]">
                Business Cards
              </p>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
