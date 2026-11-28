"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Phone,
  Sparkles,
  ShoppingBag,
  FileText,
  MapPin,
  Clock,
  ShieldCheck,
  Award,
  ThumbsUp,
  CheckCircle2,
  Star,
  ExternalLink,
  Layers,
  Compass,
  ArrowRight,
  Eye,
  ChevronRight,
} from "lucide-react";
import { VERIFIED_REVIEWS } from "@/components/TrustReviewSection";

// Selected real products from existing productsRegistry and main-page store
const READY_TO_ORDER_PRODUCTS = [
  {
    id: "roll-up-banners",
    name: "Retractable Roll-Up Banner Stand",
    category: "Banners & Displays",
    price: "$89.00",
    image: "/images/products/main-page/retractable_roll_up_banner-oakland-park-printing-fl.webp",
    href: "/custom-banners/roll-up-banners",
    badge: "Bestseller",
    highlights: "Includes aluminum cassette stand, stay-flat graphic & padded carry case.",
  },
  {
    id: "vinyl-banner",
    name: "Heavy-Duty Vinyl Banners (13oz / 18oz)",
    category: "Banners",
    price: "From $45.00",
    image: "/images/products/main-page/vinyl_banner-oakland-park-printing-fl.webp",
    href: "/custom-banners/vinyl-banners",
    badge: "Outdoor Rated",
    highlights: "Weatherproof UV-cured inks with heat-welded hems & brass grommets.",
  },
  {
    id: "feather-flags",
    name: "Custom Feather & Teardrop Flags",
    category: "Flags",
    price: "From $79.00",
    image: "/images/products/main-page/flags-oakland-park-printing-fl.webp",
    href: "/custom-flags/feather-flags",
    badge: "High Visibility",
    highlights: "Wind-resistant double-sided printing with heavy steel ground stake or cross base.",
  },
  {
    id: "programmable-led-sign",
    name: "WiFi Programmable LED Sign (P10 Outdoor)",
    category: "Electronic LED",
    price: "From $249.00",
    image: "/images/products/main-page/programmable_led_sign-oakland-park-printing-fl.webp",
    href: "/led-display-signs/programmable-led-sign",
    badge: "High ROI",
    highlights: "Ultra-bright dynamic scrolling text, mobile app & PC WiFi control.",
  },
  {
    id: "yard-signs",
    name: "Corrugated Yard Signs (Coroplast)",
    category: "Yard & Lawn",
    price: "From $8.50",
    image: "/images/products/main-page/yard_sign-oakland-park-printing-fl.webp",
    href: "/custom-signs/yard-signs",
    badge: "Bulk Deals",
    highlights: "4mm weatherproof fluted plastic with heavy-gauge metal H-stakes.",
  },
  {
    id: "car-magnets",
    name: "Heavy-Duty Vehicle Door Magnets (Pair)",
    category: "Vehicle Graphics",
    price: "From $55.00",
    image: "/images/products/main-page/vehicle_magnets-oakland-park-printing-fl.webp",
    href: "/vehicle-signs/magnetic-signs",
    badge: "Turnkey",
    highlights: "30mil commercial-grade magnetic sheeting, rounded safety corners, UV gloss.",
  },
  {
    id: "tablecloths",
    name: "Custom Printed Logo Tablecloths (6ft & 8ft)",
    category: "Trade Show",
    price: "From $99.00",
    image: "/images/products/main-page/tablecloths-oakland-park-printing-fl.webp",
    href: "/trade-show/tablecloths",
    badge: "Events",
    highlights: "Wrinkle-resistant polyester fabric, washable, full-bleed vibrant colors.",
  },
  {
    id: "aluminum-signs",
    name: "Commercial Aluminum & Parking Signs",
    category: "Rigid Signs",
    price: "From $35.00",
    image: "/images/products/main-page/aluminum_sign-oakland-park-printing-fl.webp",
    href: "/custom-signs/aluminum-signs",
    badge: "Durable",
    highlights: "Rust-proof 0.040\"/0.063\" aluminum with pre-drilled mounting holes.",
  },
];

// Commercial capabilities with authentic project images from Nano Signs
const COMMERCIAL_SERVICES = [
  {
    title: "Storefront Signs",
    desc: "Illuminated and non-illuminated building facades engineered for maximum visibility and Florida HVHZ compliance.",
    image: "/images/fort-lauderdale/commercial-storefront-facade.jpg",
    href: "/custom-signs",
  },
  {
    title: "Channel Letter Signs",
    desc: "Custom 3D front-lit, reverse halo-lit, and open-face LED channel letters with city permit drawings.",
    image: "/images/fort-lauderdale/hero-channel-letters-install.jpg",
    href: "/custom-signs/channel-letters",
  },
  {
    title: "Commercial Building Signs",
    desc: "Large-scale exterior architectural signage, corporate headquarters letters, and industrial park branding.",
    image: "/images/projects/gallery/project-27.jpg",
    href: "/custom-signs",
  },
  {
    title: "Illuminated Business Signs",
    desc: "Energy-efficient UL-listed LED light boxes, backlit pylon signs, and edge-lit interior signs.",
    image: "/images/fort-lauderdale/commercial-illuminated-business-signs.jpg",
    href: "/led-display-signs",
  },
  {
    title: "Monument Signs",
    desc: "Freestanding entrance monuments built from aluminum composite, masonry textures, and illuminated panels.",
    image: "/images/fort-lauderdale/commercial-monument-signs.jpg",
    href: "/custom-signs",
  },
  {
    title: "Aluminum Signs",
    desc: "Rigid heavy-duty 0.040, 0.063, and 0.080 aluminum signs for parking lots, real estate, and municipal requirements.",
    image: "/images/fort-lauderdale/commercial-aluminum-signs.jpg",
    href: "/custom-signs/aluminum-signs",
  },
  {
    title: "Acrylic Signs",
    desc: "Laser-cut dimensional acrylic logos with polished edges, standoff wall mounting, and frosted backplates.",
    image: "/images/products/main-page/acrylic_sign-oakland-park-printing-fl.webp",
    href: "/custom-signs/acrylic-signs",
  },
  {
    title: "Wide-Format Printing & Banners",
    desc: "Heavy 13oz to 18oz blockout vinyl, breathable mesh banners for construction fences, roll-up stands, and step & repeats.",
    image: "/images/fort-lauderdale/large-format-banner-printer.jpg",
    href: "/custom-banners",
  },
  {
    title: "Window Graphics & Perforated Film",
    desc: "One-way perforated window film for storefront privacy and solar heat reduction, plus frosted decals.",
    image: "/images/products/main-page/window_sign-oakland-park-printing-fl.webp",
    href: "/custom-decals/window-decals",
  },
  {
    title: "Vehicle Graphics & Fleet Wraps",
    desc: "Turn commercial vans, trucks, and trailers into 24/7 mobile billboards with high-tack laminated cast vinyl.",
    image: "/images/products/main-page/vehicle_signs_desc-oakland-park-printing-fl.webp",
    href: "/custom-decals",
  },
  {
    title: "Trade Show Displays",
    desc: "Portable tension fabric backdrops, pop-up podiums, roll-up banner stands, and branded tablecloths.",
    image: "/images/products/main-page/tradeshow_hero_image-oakland-park-printing-fl.webp",
    href: "/trade-show",
  },
];

// Authentic workshop photos
const WORKSHOP_PHOTOS = [
  {
    src: "/images/fort-lauderdale/inhouse-channel-letters-workshop.jpg",
    title: "In-House Channel Letter & CNC Workshop",
    subtitle: "Real fabrication facility with precision CNC routing and acrylic assembly",
  },
  {
    src: "/images/fort-lauderdale/in-store-consultation-samples.jpg",
    title: "Customer Consultation & Material Samples",
    subtitle: "Inspect physical metals, acrylics, and LED diodes in person at our desk",
  },
  {
    src: "/images/about/storefront.jpg",
    title: "Nano Signs Storefront",
    subtitle: "4567 Powerline Rd, Fort Lauderdale, FL 33309",
  },
  {
    src: "/images/fort-lauderdale/large-format-banner-printer.jpg",
    title: "Wide-Format Banner & Roll-to-Roll Production",
    subtitle: "High-precision commercial solvent and UV printing equipment",
  },
];

export function FortLauderdaleEnhancedClient() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const MAPS_URL = "https://maps.google.com/?q=Nano+Signs+4567+Powerline+Rd+Fort+Lauderdale+FL+33309";
  const PHONE_NUMBER = "(305) 967-1005";
  const PHONE_LINK = "tel:3059671005";

  return (
    <div className="bg-white text-slate-900 font-opensans">
      {/* ── 1. HERO SECTION ────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-slate-950 text-white pt-10 pb-16 lg:py-24 border-b border-slate-800">
        {/* Background glow and subtle grid */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-pink-900/20 via-slate-950 to-slate-950 pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:36px_36px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            {/* Left: Headline & 3 CTAs */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#ff2d78]/15 text-[#ff2d78] border border-[#ff2d78]/30 uppercase tracking-widest font-poppins shadow-xs">
                <Sparkles className="w-3.5 h-3.5" /> FORT LAUDERDALE SIGN &amp; PRINT SHOP
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-black font-poppins tracking-tight leading-[1.15] text-white">
                Fort Lauderdale Sign Company, Print Shop &amp; Custom Signage
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed">
                Your local sign and print shop in Fort Lauderdale &amp; Broward County for commercial signs, storefront signage, channel letters, programmable LED signs, custom neon signs, banners, and large-format printing.
              </p>

              {/* THREE CLEAR CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row flex-wrap gap-3.5 justify-center lg:justify-start">
                {/* 1. SHOP NOW -> Direct to online catalog */}
                <Link
                  href="/custom-signs"
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-gradient-to-r from-[#00e5ff] to-[#00b4d8] text-slate-950 font-black uppercase tracking-wider rounded-xl shadow-lg transition-all duration-300 hover:shadow-cyan-500/30 hover:scale-[1.02] active:scale-95 text-sm font-poppins"
                  id="hero-shop-now"
                >
                  <ShoppingBag className="w-4 h-4 text-slate-950" />
                  SHOP NOW
                </Link>

                {/* 2. GET A FREE QUOTE -> /get-a-quote */}
                <Link
                  href="/get-a-quote"
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-[#ff2d78] text-white font-black uppercase tracking-wider rounded-xl shadow-lg transition-all duration-300 hover:bg-[#e02467] hover:shadow-pink-500/30 hover:scale-[1.02] active:scale-95 text-sm font-poppins"
                  id="hero-free-quote"
                >
                  <FileText className="w-4 h-4 text-white" />
                  GET A FREE QUOTE
                </Link>

                {/* 3. CALL NOW -> tel:3059671005 */}
                <a
                  href={PHONE_LINK}
                  className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-black uppercase tracking-wider rounded-xl transition-all duration-300 hover:scale-[1.02] active:scale-95 text-sm font-poppins backdrop-blur-xs"
                  id="hero-call-now"
                >
                  <Phone className="w-4 h-4 text-emerald-400" />
                  CALL NOW: {PHONE_NUMBER}
                </a>
              </div>

              {/* Fast Trust Highlights */}
              <div className="pt-4 grid grid-cols-3 gap-2 border-t border-slate-800 text-xs text-slate-400 max-w-lg mx-auto lg:mx-0">
                <a
                  href="#visit-store"
                  className="flex items-center gap-1.5 justify-center lg:justify-start hover:text-[#00e5ff] transition-colors"
                >
                  <MapPin className="w-4 h-4 text-[#ff2d78] shrink-0" />
                  <span className="underline decoration-slate-600 underline-offset-2">4567 Powerline Rd, Fort Lauderdale, FL</span>
                </a>
                <div className="flex items-center gap-1.5 justify-center lg:justify-start">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Licensed &amp; Insured</span>
                </div>
                <div className="flex items-center gap-1.5 justify-center lg:justify-start">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>In-House FL Fabrication</span>
                </div>
              </div>
            </div>

            {/* Right: Authentic Nano Signs Project Photograph */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden border-2 border-slate-700/80 shadow-2xl bg-slate-900 group">
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src="/images/fort-lauderdale/hero-channel-letters-install.jpg"
                    alt="Nano Signs technicians installing custom 3D channel letters on a commercial storefront in Fort Lauderdale, FL"
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 500px"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="inline-block bg-[#ff2d78] text-white text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md font-poppins mb-1.5">
                      Actual Completed Project
                    </span>
                    <p className="text-xs sm:text-sm font-bold font-poppins text-white leading-tight">
                      Custom 3D Channel Letters &amp; Illuminated Facade – Fort Lauderdale, FL
                    </p>
                    <p className="text-[11px] text-slate-300 mt-0.5">
                      Engineered &amp; fabricated in our local Powerline Rd facility
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. TWO CLEAR PATHS: CUSTOM VS DIRECT ONLINE ORDERS ─────── */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-black uppercase tracking-wider text-[#ff2d78] font-poppins">
            Choose Your Ordering Method
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 font-poppins mt-1">
            How Would You Like to Order?
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Whether you need turnkey permitted commercial signage or quick ready-to-print marketing products, we have a streamlined path for you.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          {/* PATH A: CUSTOM COMMERCIAL SIGNS */}
          <div className="relative rounded-3xl p-8 bg-gradient-to-br from-slate-900 to-slate-950 text-white border-2 border-pink-500/40 shadow-xl flex flex-col justify-between overflow-hidden">
            <div className="absolute top-0 right-0 w-36 h-36 bg-[#ff2d78]/15 rounded-full filter blur-2xl" />
            <div className="relative z-10 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-[#ff2d78] text-white uppercase tracking-wider font-poppins">
                <FileText className="w-3.5 h-3.5" /> PATH A • Custom Fabrication
              </div>
              <h3 className="text-2xl sm:text-3xl font-black font-poppins text-white">
                Custom Commercial Signs
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                For businesses requiring on-site consultations, custom storefront signs, 3D channel letters, monument signs, architectural building logos, and city permitting assistance across Broward County.
              </p>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-200 pt-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#ff2d78] shrink-0" />
                  <span>Free digital proof &amp; structural engineering guidance</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#ff2d78] shrink-0" />
                  <span>High-Velocity Hurricane Zone (HVHZ) compliant materials</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#ff2d78] shrink-0" />
                  <span>Full-service crane and bucket truck installation</span>
                </li>
              </ul>
            </div>

            <div className="pt-8 relative z-10">
              <Link
                href="/get-a-quote"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-[#ff2d78] hover:bg-[#e02467] text-white font-black uppercase tracking-wider rounded-xl transition-all shadow-md font-poppins text-sm group"
              >
                GET A FREE QUOTE
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <p className="text-center text-[11px] text-slate-400 mt-2">
                Guaranteed line-item quote within 4 business hours
              </p>
            </div>
          </div>

          {/* PATH B: READY-TO-ORDER PRODUCTS */}
          <div className="relative rounded-3xl p-8 bg-gradient-to-br from-cyan-950/20 via-white to-slate-50 text-slate-900 border-2 border-cyan-500/40 shadow-xl flex flex-col justify-between">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-[#00e5ff] text-slate-950 uppercase tracking-wider font-poppins">
                <ShoppingBag className="w-3.5 h-3.5" /> PATH B • Direct Online Purchase
              </div>
              <h3 className="text-2xl sm:text-3xl font-black font-poppins text-slate-900">
                Ready-To-Order Products
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                For customers who want to browse standard sizes, calculate instant pricing, upload artwork, and checkout directly through the Nano Signs secure online store.
              </p>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700 pt-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0" />
                  <span>Banners, roll-up stands, feather flags &amp; yard signs</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0" />
                  <span>WiFi programmable LED displays &amp; ready neon art</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-600 shrink-0" />
                  <span>Local pickup at Powerline Rd or express courier delivery</span>
                </li>
              </ul>
            </div>

            <div className="pt-8">
              <Link
                href="/custom-signs"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-slate-900 to-slate-800 hover:from-black hover:to-slate-900 text-white font-black uppercase tracking-wider rounded-xl transition-all shadow-md font-poppins text-sm group"
              >
                <ShoppingBag className="w-4 h-4 text-[#00e5ff]" />
                SHOP NOW (BROWSE CATALOG)
                <ArrowRight className="w-4 h-4 text-[#00e5ff] group-hover:translate-x-1 transition-transform" />
              </Link>
              <p className="text-center text-[11px] text-slate-500 mt-2">
                Instant pricing, secure credit card checkout &amp; fast turnaround
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. DIRECT ONLINE SHOPPING SECTION ──────────────────────── */}
      <section className="py-16 bg-slate-50 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-cyan-100 text-cyan-800 uppercase tracking-wider font-poppins mb-2">
                <ShoppingBag className="w-3.5 h-3.5 text-cyan-600" /> Direct E-Commerce Store
              </div>
              <h2 className="text-3xl md:text-4xl font-black font-poppins text-slate-900 tracking-tight">
                Shop Signs &amp; Products Online
              </h2>
              <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-2xl">
                Browse popular sign products and order directly through our secure online store. Customize your dimensions, review instant pricing, and select shop pickup or delivery.
              </p>
            </div>

            {/* Prominent Shop Now Button */}
            <div className="shrink-0">
              <Link
                href="/custom-signs"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-gradient-to-r from-[#ff2d78] to-[#b020ff] hover:opacity-90 text-white font-black uppercase tracking-wider rounded-xl shadow-lg transition-all font-poppins text-sm"
              >
                <ShoppingBag className="w-4 h-4" />
                EXPLORE ALL PRODUCTS
              </Link>
            </div>
          </div>

          {/* Product Grid with Real Products and Working Cart Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {READY_TO_ORDER_PRODUCTS.map((prod) => (
              <div
                key={prod.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl hover:border-pink-300 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="relative aspect-[4/3] w-full bg-slate-100 overflow-hidden">
                    <Image
                      src={prod.image}
                      alt={`${prod.name} available at Nano Signs Fort Lauderdale FL`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {prod.badge && (
                      <span className="absolute top-2.5 left-2.5 bg-slate-900/90 text-white font-poppins font-bold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full border border-slate-700">
                        {prod.badge}
                      </span>
                    )}
                  </div>

                  <div className="p-5">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-poppins">
                      {prod.category}
                    </span>
                    <h3 className="font-bold text-slate-900 text-base font-poppins mt-1 group-hover:text-[#ff2d78] transition-colors leading-snug">
                      {prod.name}
                    </h3>
                    <p className="text-slate-500 text-xs mt-2 line-clamp-2 leading-relaxed">
                      {prod.highlights}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-slate-100 flex items-center justify-between mt-3">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase block font-semibold">Starting At</span>
                    <span className="text-base font-black text-slate-900 font-poppins text-[#ff2d78]">
                      {prod.price}
                    </span>
                  </div>

                  <Link
                    href={prod.href}
                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-[#ff2d78] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors font-poppins"
                  >
                    View Product
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Direct Category Links Banner */}
          <div className="mt-12 bg-white rounded-2xl border border-slate-200 p-6 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h4 className="font-bold text-slate-900 font-poppins text-base">Looking for a specific category?</h4>
              <p className="text-xs text-slate-500">Jump directly to individual online departments:</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link href="/custom-banners" className="px-3 py-1.5 bg-slate-100 hover:bg-pink-50 hover:text-[#ff2d78] text-slate-700 rounded-lg text-xs font-bold transition-colors">
                Banners &amp; Flags →
              </Link>
              <Link href="/custom-signs" className="px-3 py-1.5 bg-slate-100 hover:bg-pink-50 hover:text-[#ff2d78] text-slate-700 rounded-lg text-xs font-bold transition-colors">
                Yard &amp; Business Signs →
              </Link>
              <Link href="/led-display-signs" className="px-3 py-1.5 bg-slate-100 hover:bg-pink-50 hover:text-[#ff2d78] text-slate-700 rounded-lg text-xs font-bold transition-colors">
                Programmable LED Signs →
              </Link>
              <Link href="/neon-signs" className="px-3 py-1.5 bg-slate-100 hover:bg-pink-50 hover:text-[#ff2d78] text-slate-700 rounded-lg text-xs font-bold transition-colors">
                Custom Neon Signs →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. WHY BUSINESSES CHOOSE NANO SIGNS (TRUST SECTION) ───── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-pink-100 text-[#ff2d78] uppercase tracking-wider font-poppins mb-2">
            <Award className="w-3.5 h-3.5" /> Established Fort Lauderdale Sign Shop
          </div>
          <h2 className="text-3xl md:text-4xl font-black font-poppins text-slate-900 tracking-tight">
            Why Businesses Choose Nano Signs
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            From regional franchise rollouts to local downtown boutiques, South Florida companies count on our dedicated in-house production plant.
          </p>
        </div>

        {/* 6 Verified Trust Elements */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-pink-50 text-[#ff2d78] flex items-center justify-center mb-4">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-slate-900 font-poppins mb-2">Real Physical Workshop</h3>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              We operate a physical commercial facility at 4567 Powerline Rd. Walk in Monday through Friday to inspect substrate samples, compare illuminated LED diodes, and consult directly with our pre-press designers.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-cyan-50 text-[#00e5ff] flex items-center justify-center mb-4">
              <ShieldCheck className="w-6 h-6 text-cyan-600" />
            </div>
            <h3 className="font-bold text-lg text-slate-900 font-poppins mb-2">Florida Hurricane-Rated Signage</h3>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              All exterior channel letters, monument signs, and pylon cabinets are engineered in compliance with the Florida Building Code High-Velocity Hurricane Zone (HVHZ) standards to endure heat, UV rays, and gale-force coastal winds.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-[#b020ff] flex items-center justify-center mb-4">
              <ThumbsUp className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-bold text-lg text-slate-900 font-poppins mb-2">Direct In-House Fabrication</h3>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              No middleman brokers or outsourced markups. We cut, bend, wire, weld, and print your signs in-house on wide-format UV flatbed presses, translating into lower costs and tighter quality control.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-slate-900 font-poppins mb-2">Fast Turnaround &amp; Rush Service</h3>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Need trade show banners or job site real estate signs tomorrow? We offer standard 2 to 4-day turnarounds and 24-hour rush production for urgent event deadlines and grand openings across Broward.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
              <Phone className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-slate-900 font-poppins mb-2">Direct Local Customer Support</h3>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              When you call (305) 967-1005, you reach real sign craftsmen and graphic technicians who understand city codes, vector resolutions, and mounting hardware—not a detached call center.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-lg text-slate-900 font-poppins mb-2">Seamless Online &amp; Offline Buying</h3>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Purchase standard products with instant credit card checkout online, or request custom on-site surveys, municipal permit drawings, and installation service with zero hassle.
            </p>
          </div>
        </div>

        {/* Authentic Facility Gallery */}
        <div className="mt-14 pt-12 border-t border-slate-200">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-black uppercase tracking-wider text-[#ff2d78] font-poppins">
              Fabrication &amp; Showroom
            </span>
            <h3 className="text-2xl sm:text-3xl font-black font-poppins text-slate-900 mt-1">
              Designed, Printed &amp; Fabricated In-House
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Real photographs of our local workshop, CNC routing floor, physical sample consultation desk, and wide-format production facility on Powerline Road.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {WORKSHOP_PHOTOS.map((photo, i) => (
              <div key={i} className="group rounded-2xl border border-slate-200 bg-white p-3 shadow-xs hover:shadow-md transition-all">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-slate-100">
                  <Image
                    src={photo.src}
                    alt={photo.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="mt-3 text-center">
                  <p className="font-bold text-xs text-slate-800 font-poppins">{photo.title}</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">{photo.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. PROMINENT REAL BUSINESS CONTACT SECTION ────────────── */}
      <section id="visit-store" className="py-14 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white scroll-mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            {/* Left: Info & Buttons */}
            <div className="lg:col-span-6 space-y-6">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-[#ff2d78]/20 text-[#ff2d78] uppercase tracking-widest border border-[#ff2d78]/30 font-poppins">
                Verified Local Business
              </span>
              <h2 className="text-3xl sm:text-4xl font-black font-poppins text-white">
                Visit or Call Our Fort Lauderdale Sign Shop
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                We are conveniently located directly on Powerline Road, minutes from Commercial Boulevard, I-95, and downtown Fort Lauderdale.
              </p>

              <div className="bg-slate-850/80 rounded-2xl p-6 border border-slate-800 space-y-3.5 text-sm">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#ff2d78] shrink-0 mt-0.5" />
                  <div>
                    <span className="block font-bold text-white text-base font-poppins">Nano Signs</span>
                    <span className="text-slate-300">4567 Powerline Rd</span><br />
                    <span className="text-slate-300">Fort Lauderdale, FL 33309</span>
                    <span className="block text-xs text-slate-500 mt-0.5">
                      (Also designated on city street records as 4567 NW 9th Ave)
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2 border-t border-slate-800">
                  <Phone className="w-5 h-5 text-emerald-400 shrink-0" />
                  <div>
                    <span className="text-xs text-slate-400 block font-semibold">Direct Telephone</span>
                    <a href={PHONE_LINK} className="text-lg font-black text-white hover:text-[#ff2d78] transition-colors font-poppins">
                      {PHONE_NUMBER}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-2 border-t border-slate-800">
                  <Clock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs text-slate-400 block font-semibold">Operating Hours</span>
                    <span className="text-slate-200">Monday – Friday: 9:00 AM – 6:00 PM</span><br />
                    <span className="text-xs text-slate-400">Saturday: By Appointment • Sunday: Closed</span>
                  </div>
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex flex-wrap gap-3.5 pt-2">
                <a
                  href={PHONE_LINK}
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-sm font-poppins transition-colors shadow-md"
                >
                  <Phone className="w-4 h-4" />
                  Call the Shop: {PHONE_NUMBER}
                </a>

                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold rounded-xl text-sm font-poppins transition-colors"
                >
                  <Compass className="w-4 h-4 text-[#00e5ff]" />
                  Get Directions (Google Maps)
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </a>

                <Link
                  href="/contact-us"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-pink-500/20 hover:bg-pink-500/30 border border-pink-500/40 text-pink-300 font-bold rounded-xl text-sm font-poppins transition-colors"
                >
                  <MapPin className="w-4 h-4 text-[#ff2d78]" />
                  Visit Our Showroom
                </Link>
              </div>
            </div>

            {/* Right: Embedded Google Map */}
            <div className="lg:col-span-6">
              <div className="rounded-2xl overflow-hidden border-2 border-slate-800 shadow-xl h-[380px] w-full bg-slate-900">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d7160.8801455159755!2d-80.15735434976504!3d26.182359067699164!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e0!4m0!4m5!1s0x88d903da421a5ec5%3A0xdd627ecbac01c685!2s4567%20Powerline%20Rd%2C%20Fort%20Lauderdale%2C%20FL%2033309!3m2!1d26.1835062!2d-80.1554943!5e0!3m2!1sen!2sus!4v1781380571760!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Nano Signs Google Maps Location in Fort Lauderdale FL"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. COMPREHENSIVE COMMERCIAL SERVICES SECTION ───────────── */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-black uppercase tracking-wider text-[#ff2d78] font-poppins">
            Comprehensive Capabilities
          </span>
          <h2 className="text-3xl md:text-4xl font-black font-poppins text-slate-900 tracking-tight mt-1">
            Commercial Sign &amp; Large-Format Printing Services
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Every business signage category designed, permitted, fabricated, and installed under one roof in Broward County.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {COMMERCIAL_SERVICES.map((srv, idx) => (
            <Link
              key={idx}
              href={srv.href}
              className="group rounded-2xl border border-slate-200 overflow-hidden bg-white shadow-xs hover:shadow-xl hover:border-pink-300 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/10] w-full bg-slate-100 overflow-hidden">
                  <Image
                    src={srv.image}
                    alt={`${srv.title} by Nano Signs Fort Lauderdale FL`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                  <span className="absolute bottom-3 left-3 text-white font-bold text-xs bg-slate-900/80 backdrop-blur-xs px-2.5 py-1 rounded-md font-poppins">
                    {srv.title}
                  </span>
                </div>

                <div className="p-5">
                  <h3 className="font-bold text-slate-900 text-lg font-poppins group-hover:text-[#ff2d78] transition-colors flex items-center justify-between">
                    <span>{srv.title}</span>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#ff2d78] group-hover:translate-x-1 transition-all" />
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm mt-2 leading-relaxed">
                    {srv.desc}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <span className="inline-flex items-center gap-1 text-xs font-bold text-[#ff2d78] font-poppins group-hover:underline">
                  View Options &amp; Specifications →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── 7. CUSTOMER REVIEWS & SOCIAL PROOF ─────────────────────── */}
      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 uppercase tracking-wider font-poppins mb-2">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" /> Customer Reviews &amp; Social Proof
              </div>
              <h2 className="text-3xl md:text-4xl font-black font-poppins text-slate-900 tracking-tight">
                Trusted by South Florida Business Owners
              </h2>
              <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-2xl">
                Authentic feedback from commercial sign and print clients across Fort Lauderdale, Oakland Park, and Broward County.
              </p>
            </div>

            {/* Google Reviews Badge & Action */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="bg-white border border-slate-200 rounded-xl px-4 py-2.5 shadow-xs flex items-center gap-3">
                <div className="flex gap-0.5 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <div className="text-xs">
                  <span className="font-bold text-slate-900 block">4.9 / 5.0 Rating</span>
                  <span className="text-slate-500">Verified Client Feedback</span>
                </div>
              </div>

              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 bg-white hover:bg-slate-100 border border-slate-300 text-slate-800 font-bold text-xs uppercase tracking-wider rounded-xl transition-colors font-poppins shadow-xs"
              >
                Read Our Google Reviews
                <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
              </a>
            </div>
          </div>

          {/* Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {VERIFIED_REVIEWS.map((rev, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between shadow-xs hover:border-pink-300 hover:shadow-md transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-0.5 text-amber-400">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    {rev.verified && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
                        <CheckCircle2 className="w-3 h-3" /> Verified Order
                      </span>
                    )}
                  </div>

                  <h3 className="font-bold text-slate-900 text-base font-poppins mb-2 leading-snug">
                    {rev.title}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                    &ldquo;{rev.comment}&rdquo;
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <p className="font-bold text-xs text-slate-800 font-poppins">{rev.author}</p>
                  <p className="text-[11px] text-slate-500">{rev.location} • {rev.projectType}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. LOCAL SEO & SERVICE AREA DETAILS ───────────────────── */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-200">
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7 space-y-5">
            <span className="text-xs font-black uppercase tracking-wider text-[#ff2d78] font-poppins">
              Local South Florida Coverage
            </span>
            <h2 className="text-2xl sm:text-3xl font-black font-poppins text-slate-900">
              Serving Fort Lauderdale &amp; Surrounding Broward Communities
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Nano Signs operates from our central manufacturing hub on Powerline Road, providing fast on-site consultations, municipal sign permitting, and professional bucket-truck installation across the entire region:
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2 text-xs font-semibold text-slate-700 font-poppins">
              <span className="p-2.5 bg-slate-50 rounded-lg border border-slate-200/70 flex items-center gap-1.5">
                <span className="text-[#ff2d78]">•</span> Downtown Fort Lauderdale
              </span>
              <span className="p-2.5 bg-slate-50 rounded-lg border border-slate-200/70 flex items-center gap-1.5">
                <span className="text-[#ff2d78]">•</span> Las Olas Boulevard
              </span>
              <span className="p-2.5 bg-slate-50 rounded-lg border border-slate-200/70 flex items-center gap-1.5">
                <span className="text-[#ff2d78]">•</span> Oakland Park
              </span>
              <span className="p-2.5 bg-slate-50 rounded-lg border border-slate-200/70 flex items-center gap-1.5">
                <span className="text-[#ff2d78]">•</span> Pompano Beach
              </span>
              <span className="p-2.5 bg-slate-50 rounded-lg border border-slate-200/70 flex items-center gap-1.5">
                <span className="text-[#ff2d78]">•</span> Wilton Manors
              </span>
              <span className="p-2.5 bg-slate-50 rounded-lg border border-slate-200/70 flex items-center gap-1.5">
                <span className="text-[#ff2d78]">•</span> Hollywood &amp; Dania Beach
              </span>
              <span className="p-2.5 bg-slate-50 rounded-lg border border-slate-200/70 flex items-center gap-1.5">
                <span className="text-[#ff2d78]">•</span> Plantation &amp; Sunrise
              </span>
              <span className="p-2.5 bg-slate-50 rounded-lg border border-slate-200/70 flex items-center gap-1.5">
                <span className="text-[#ff2d78]">•</span> Coral Springs &amp; Parkland
              </span>
              <span className="p-2.5 bg-slate-50 rounded-lg border border-slate-200/70 flex items-center gap-1.5">
                <span className="text-[#ff2d78]">•</span> Boca Raton &amp; South Palm
              </span>
            </div>
          </div>

          <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-2xl p-6 sm:p-8 space-y-4">
            <h3 className="font-bold text-xl font-poppins text-white">
              Ready to Start Your Sign Project?
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Our pre-press technicians and sign fabricators are available Monday through Friday. Call our shop directly or request a free guaranteed line-item quote online.
            </p>

            <div className="space-y-3 pt-2">
              <Link
                href="/get-a-quote"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#ff2d78] hover:bg-[#e02467] text-white font-bold rounded-xl text-sm font-poppins transition-colors"
              >
                <FileText className="w-4 h-4" /> Request a Free Quote
              </Link>

              <Link
                href="/custom-signs"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white text-slate-950 hover:bg-slate-100 font-bold rounded-xl text-sm font-poppins transition-colors"
              >
                <ShoppingBag className="w-4 h-4 text-[#ff2d78]" /> Browse Online Store
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 9. MOBILE STICKY CTA BAR ──────────────────────────────── */}
      <aside aria-label="Quick Actions" className="fixed bottom-0 left-0 right-0 z-50 bg-slate-950/95 backdrop-blur-md border-t border-slate-800 p-2 md:hidden shadow-[0_-4px_20px_rgba(0,0,0,0.4)]">
        <div className="grid grid-cols-3 gap-1.5 max-w-md mx-auto">
          {/* Shop Online */}
          <Link
            href="/custom-signs"
            className="flex flex-col items-center justify-center py-2 px-1 bg-cyan-500/20 text-[#00e5ff] rounded-lg text-center font-bold text-[11px] font-poppins border border-cyan-500/30 active:scale-95 transition-transform"
          >
            <ShoppingBag className="w-4 h-4 mb-0.5" />
            <span>SHOP ONLINE</span>
          </Link>

          {/* Visit Store (scrolls to #visit-store) */}
          <a
            href="#visit-store"
            className="flex flex-col items-center justify-center py-2 px-1 bg-[#ff2d78] text-white rounded-lg text-center font-bold text-[11px] font-poppins shadow-md active:scale-95 transition-transform"
          >
            <MapPin className="w-4 h-4 mb-0.5" />
            <span>VISIT STORE</span>
          </a>

          {/* Call Now */}
          <a
            href="tel:+13059671005"
            className="flex flex-col items-center justify-center py-2 px-1 bg-emerald-600/30 text-emerald-300 rounded-lg text-center font-bold text-[11px] font-poppins border border-emerald-500/40 active:scale-95 transition-transform"
          >
            <Phone className="w-4 h-4 mb-0.5" />
            <span>CALL NOW</span>
          </a>
        </div>
      </aside>
    </div>
  );
}
