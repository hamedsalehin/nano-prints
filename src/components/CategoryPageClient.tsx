"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SeoContentBlock } from "@/components/SeoContentBlock";

interface ProductItem {
  id: string;
  name: string;
  image: string;
  hoverImage?: string;
}

interface FaqItem {
  q: string;
  a: string;
}

interface CategoryPageClientProps {
  categorySlug: string;
  title: string;
  breadcrumbLabel: string;
  heroSubtitle: string;
  heroImage: string;
  tabletHeroImage?: string;
  mobileHeroImage?: string;
  heroVariant?: "neon" | "default";
  products: ProductItem[];
  categoryDescriptionText?: string;
  categorySecondaryImage?: string;
  faqs: FaqItem[];
  reviewRating?: string;
  reviewCount?: string;
  reviewQuote?: string;
  ctaProduct1?: { name: string; href: string };
  ctaProduct2?: { name: string; href: string };
}

function DynamicCategorySeo({ title, subtitle, products }: { title: string; subtitle: string; products: ProductItem[] }) {
  const productNames = products.slice(0, 5).map(p => p.name).join(", ");
  
  return (
    <section className="bg-slate-50 py-12 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-sm text-slate-600 leading-relaxed font-opensans space-y-4">
        <h2 className="text-xl font-bold text-slate-800 font-poppins mb-4">
          High-Quality {title} in Fort Lauderdale
        </h2>
        <p>
          Welcome to our comprehensive selection of <strong>{title}</strong>. 
          {subtitle && ` ${subtitle}`} At Nano Signs, we specialize in providing businesses and individuals across Fort Lauderdale and Broward County with top-tier custom printing solutions. 
          Our {title.toLowerCase()} category includes popular items such as {productNames}, all manufactured using premium materials and cutting-edge printing technology.
        </p>
        <h3 className="text-lg font-bold text-slate-800 font-poppins mt-6 mb-2">
          Premium Materials and Durability
        </h3>
        <p>
          When you browse our <strong>{title}</strong>, you are looking at products designed for maximum impact and longevity. 
          We source only the highest quality substrates and utilize UV-resistant, weatherproof inks to ensure your custom prints remain vibrant even in harsh Florida weather conditions. 
          Whether you need temporary event displays or permanent architectural signage, our products are engineered to exceed your expectations.
        </p>

        {(title.toLowerCase().includes("neon") || title.toLowerCase().includes("led")) && (
          <>
            <h3 className="text-lg font-bold text-slate-800 font-poppins mt-6 mb-2">
              Transform Your Space with Custom LED Neon Signage
            </h3>
            <p>
              When you invest in our <strong>custom LED neon signs</strong>, you are getting the perfect fusion of vintage aesthetics and modern technology. 
              Traditional glass neon is fragile, expensive to run, and requires high-voltage transformers. Our <strong>custom neon led signs</strong> completely eliminate those issues. 
              Manufactured with durable, flexible LED tubing, our neon led products are lightweight, shatter-resistant, and incredibly energy-efficient. 
              They are perfect for bringing your brand logo to life, illuminating a storefront, or adding a personalized touch to your bedroom or wedding venue. 
              With brilliant colors that pop both day and night, an LED neon sign is one of the most effective and stylish ways to capture attention in Fort Lauderdale and beyond.
            </p>
          </>
        )}

        <h3 className="text-lg font-bold text-slate-800 font-poppins mt-6 mb-2">
          Order Your Custom {title} Today
        </h3>
        <p>
          Enhance your brand visibility and communicate your message effectively with our expertly crafted {title.toLowerCase()}. 
          We offer flexible sizing, bulk corporate pricing, and lightning-fast turnaround times to meet your deadlines. 
          Explore our complete range of products above, and feel free to reach out to our dedicated support team if you require assistance with custom orders or artwork preparation.
        </p>
      </div>
    </section>
  );
}

export function CategoryPageClient({
  categorySlug,
  title,
  breadcrumbLabel,
  heroSubtitle,
  heroImage,
  tabletHeroImage,
  mobileHeroImage,
  heroVariant = "default",
  products,
  categoryDescriptionText,
  categorySecondaryImage,
  faqs,
  reviewRating,
  reviewCount,
  reviewQuote,
  ctaProduct1,
  ctaProduct2,
}: CategoryPageClientProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  // ── Neon-style full-width hero (split layout) ──────────────────────────────
  const NeonHero = (
    <section
      className="w-full relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #050a10 0%, #0d1a0f 50%, #050810 100%)" }}
    >
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff04_1px,transparent_1px),linear-gradient(to_bottom,#ffffff04_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 py-12 lg:py-0 flex flex-col lg:flex-row items-center gap-8 lg:gap-0 min-h-[420px] lg:min-h-[520px]">
        {/* Left — Text */}
        <div className="flex-1 z-10 flex flex-col justify-center py-10 lg:py-16">
          <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#ff2d78] mb-4 font-poppins">
            ✦ Handcrafted &amp; Premium
          </span>
          <h1 className="text-4xl lg:text-5xl xl:text-6xl font-black text-white leading-tight font-poppins mb-4">
            Custom LED Neon Signs<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff2d78] via-[#ff9900] to-[#00e5ff]">
              &amp; Logo Lights
            </span>
          </h1>
          <p className="text-gray-300 text-base lg:text-lg leading-relaxed max-w-md mb-2 font-opensans">
            {heroSubtitle} Create a vibrant, customized atmosphere for your business storefront, wedding backdrop, home décor, or events.
          </p>
          <p className="text-sm text-gray-400 mb-8 font-opensans">
            Built by hand using energy-efficient, safe-to-touch LED neon flex technology.
          </p>
          <div className="flex flex-wrap gap-3">
            {ctaProduct1 && (
              <Link
                href={ctaProduct1.href}
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-white font-bold text-sm font-poppins shadow-lg hover:scale-105 transition-transform"
                style={{ background: "linear-gradient(135deg, #ff2d78, #b020ff)" }}
              >
                {ctaProduct1.name} →
              </Link>
            )}
            <Link
              href="/get-a-quote"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm font-poppins border-2 border-[#00e5ff] text-[#00e5ff] hover:bg-[#00e5ff]/10 transition-colors"
            >
              Upload Design &amp; Get Quote ↑
            </Link>
          </div>
          <p className="text-xs text-gray-500 mt-3 font-opensans">⏱ Get your quote under 12 hours</p>
        </div>

        {/* Right — Hero Image */}
        <div className="flex-1 flex items-center justify-center lg:justify-end relative z-10">
          <div className="relative w-full max-w-[500px] lg:max-w-none aspect-[4/3] lg:h-[520px] lg:w-[580px]">
            {/* Glow effect */}
            <div className="absolute inset-0 blur-3xl opacity-30 rounded-3xl"
              style={{ background: "radial-gradient(ellipse at center, #ff2d78 0%, #00e5ff 50%, transparent 70%)" }}
            />
            <Image
              src={heroImage}
              alt="Custom LED Neon Signs by Nano Signs"
              fill
              className="object-cover rounded-2xl"
              priority
              sizes="(max-width: 1024px) 100vw, 580px"
            />
          </div>
        </div>
      </div>

      {/* Trust badges bar */}
      <div className="border-t border-white/10 bg-black/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-5 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: "🎨", title: "12H Free Proof", desc: "Digital design proof within 12 hours" },
            { icon: "🚚", title: "Fast Delivery", desc: "Express shipping to your doorstep in 3–7 days" },
            { icon: "💬", title: "24/7 Support", desc: "Round-the-clock expert customer service" },
            { icon: "🏆", title: "7+ Yrs Experience", desc: "Crafting premium custom neon signs since 2017" },
          ].map((badge) => (
            <div key={badge.title} className="flex items-start gap-3">
              <span className="text-2xl flex-shrink-0">{badge.icon}</span>
              <div>
                <p className="text-white text-sm font-bold font-poppins">{badge.title}</p>
                <p className="text-gray-400 text-xs leading-tight font-opensans">{badge.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Header />

      <main className="flex-grow">
        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-[20px] lg:px-[48px] 3xl:px-[96px] py-3 flex items-center gap-2 text-sm text-gray-500 font-['Open_Sans']">
            <Link href="/" className="hover:text-[#ff2d78] transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="font-semibold text-gray-900">
              {breadcrumbLabel}
            </span>
          </div>
        </div>

        {/* Hero — conditional on variant */}
        {heroVariant === "neon" ? NeonHero : (
          <section className="relative w-full lg:px-[48px] 3xl:px-[96px] pt-1">
            <div className="relative overflow-hidden rounded-xl">
              <picture>
                {tabletHeroImage && (
                  <source srcSet={heroImage} media="(min-width: 992px)" />
                )}
                {tabletHeroImage && (
                  <source srcSet={tabletHeroImage} media="(min-width: 481px)" />
                )}
                <img
                  className="w-full h-[220px] lg:h-[480px] object-cover object-top pointer-events-none"
                  src={mobileHeroImage || tabletHeroImage || heroImage}
                  alt={`${title} Banner`}
                  width={1200}
                  height={480}
                />
              </picture>

              {/* Desktop Card Overlay */}
              <div className="hidden lg:block absolute top-1/2 transform -translate-y-1/2 left-[48px] z-10">
                <div className="bg-white rounded-xl shadow-xl p-10 flex flex-col items-center justify-center w-[450px] border border-gray-100">
                  <div className="text-center font-poppins mb-6">
                    <h1 className="text-3xl font-extrabold text-gray-900 mb-2 leading-none">
                      {title}
                    </h1>
                    <p className="text-lg text-gray-700 font-semibold leading-normal">
                      {heroSubtitle}
                    </p>
                  </div>
                  <div className="flex gap-3 w-full">
                    {ctaProduct1 && (
                      <Link
                        href={ctaProduct1.href}
                        className="flex-1 text-white font-extrabold px-5 py-3.5 rounded-lg text-center text-sm font-poppins shadow-md hover:opacity-90 transition-opacity"
                        style={{
                          background: "linear-gradient(135deg, #ff2d78, #b020ff)",
                        }}
                      >
                        {ctaProduct1.name}
                      </Link>
                    )}
                    {ctaProduct2 && (
                      <Link
                        href={ctaProduct2.href}
                        className="flex-1 border-2 font-extrabold px-5 py-3.5 rounded-lg text-center transition-colors text-sm font-poppins"
                        style={{ borderColor: "#00e5ff", color: "#00e5ff" }}
                      >
                        {ctaProduct2.name}
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:hidden w-full bg-white p-5 text-center border-b">
              <h1 className="text-2xl font-bold font-poppins text-gray-900 mb-1">
                {title}
              </h1>
              <p className="text-base text-gray-600 font-semibold font-poppins mb-4">
                {heroSubtitle}
              </p>
              <div className="flex gap-3 max-w-sm mx-auto">
                {ctaProduct1 && (
                  <Link
                    href={ctaProduct1.href}
                    className="flex-1 text-white font-bold px-4 py-3 rounded-lg text-center text-sm font-poppins shadow hover:opacity-90 transition-opacity"
                    style={{
                      background: "linear-gradient(135deg, #ff2d78, #b020ff)",
                    }}
                  >
                    {ctaProduct1.name}
                  </Link>
                )}
                {ctaProduct2 && (
                  <Link
                    href={ctaProduct2.href}
                    className="flex-1 border-2 font-bold px-4 py-3 rounded-lg text-center transition-colors text-sm font-poppins"
                    style={{ borderColor: "#00e5ff", color: "#00e5ff" }}
                  >
                    {ctaProduct2.name}
                  </Link>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Browse Products Grid */}
        <section className="w-full px-[20px] lg:px-[48px] 3xl:px-[96px] py-10">
          <div className="mb-6">
            <h2 className="font-poppins font-semibold text-2xl lg:text-3xl text-gray-900">
              Browse Products
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 font-opensans">
            {products.map((p) => (
              <Link
                key={p.id}
                href={`/${categorySlug}/${p.id}`}
                className="flex flex-col items-center justify-start group text-center cursor-pointer"
              >
                {/* Image Container with premium scale-on-hover effect */}
                <div className="browse-item-hover relative w-full aspect-square rounded-xl transition-all duration-300 ease-in-out flex items-center justify-center overflow-hidden p-5 bg-slate-50/50">
                  <div className="relative w-full h-full">
                    <Image
                      alt={p.name}
                      src={p.image}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                      unoptimized
                      className="object-contain transition-all duration-500 ease-in-out group-hover:scale-105"
                    />
                  </div>
                </div>
                {/* Product Name */}
                <div className="mt-3 flex items-center justify-center min-h-[40px]">
                  <h3 className="text-base font-bold text-gray-900 leading-snug group-hover:text-[#ff2d78] transition-colors">
                    {p.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Two-Column Copy Section */}
        {categoryDescriptionText && (
          <section className="py-12 px-[20px] lg:px-[48px] 3xl:px-[96px] bg-white border-t border-gray-150">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              {/* Text description */}
              <div className="flex flex-col text-left">
                <h4 className="font-poppins font-bold text-2xl lg:text-3xl text-gray-900 mb-4">
                  {title}
                </h4>
                <div
                  className="text-gray-700 leading-relaxed text-base font-opensans space-y-4"
                  dangerouslySetInnerHTML={{ __html: categoryDescriptionText }}
                />
              </div>
              {/* Secondary Image */}
              {categorySecondaryImage && (
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-md max-w-[532px] w-full justify-self-center lg:justify-self-end">
                  <Image
                    src={categorySecondaryImage}
                    alt={`${title} Visual Layout`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 550px"
                    unoptimized
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          </section>
        )}

        {/* FAQs Accordion Section */}
        {true && (
          <section className="py-12 px-[20px] lg:px-[48px] 3xl:px-[96px] bg-gray-50 border-t border-b border-gray-100">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-poppins font-bold text-2xl lg:text-3xl text-gray-900 text-center mb-8">
                {title} Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {[
                  ...(faqs || []),
                  { q: "How long does shipping and production take?", a: "We offer some of the fastest turnaround times in the industry. Depending on the product, most orders are produced within 1-3 business days. Delivery times vary based on your location and the shipping method selected at checkout. Rush options are available!" },
                  { q: "Can I get a custom size or shape?", a: "Yes! We specialize in custom printing. While our website lists standard sizes, we can produce signs, banners, and decals in virtually any custom size or contour shape. Please contact us or request a custom quote." },
                  { q: "What file formats do you accept for artwork?", a: "For the highest quality print, we recommend vector files (.AI, .EPS, .SVG, or .PDF). We also accept high-resolution images (.JPG, .PNG) at 300 DPI. Our team provides a free artwork check before printing." },
                  { q: "Do you offer bulk or wholesale discounts?", a: "Absolutely. We offer competitive corporate pricing and volume discounts on large orders. The more you buy, the more you save. Please reach out to our team for bulk pricing details." },
                  { q: "Are your outdoor signs weather-resistant?", a: "Yes! Most of our outdoor signage products—including aluminum, coroplast, and outdoor vinyl banners—are fully weatherproof, UV-resistant, and designed to withstand rain, wind, and harsh sun." }
                ].map((faq, index) => {
                  const isOpen = openFaqIndex === index;
                  return (
                    <div
                      key={index}
                      className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm transition-all"
                    >
                      <button
                        onClick={() => toggleFaq(index)}
                        className="w-full flex items-center justify-between p-5 text-left font-bold text-base lg:text-lg text-gray-800 hover:bg-gray-50 transition-colors"
                      >
                        <span>{faq.q}</span>
                        {isOpen ? (
                          <ChevronUp className="w-5 h-5 text-gray-500 shrink-0" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-500 shrink-0" />
                        )}
                      </button>
                      {isOpen && (
                        <div className="p-5 border-t border-gray-100 bg-gray-50/50">
                          <p className="text-gray-700 leading-relaxed text-sm lg:text-base font-opensans">
                            {faq.a}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Customer Highlights Snippet */}
        {reviewRating && reviewCount && (
          <section className="py-10 px-[20px] lg:px-[48px] 3xl:px-[96px] bg-white text-center">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold font-poppins mb-6">
                Customer Highlights
              </h3>
              <div className="flex justify-center items-center gap-1.5 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className="w-5 h-5 text-[#ff2d78] fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="text-sm font-semibold text-gray-500 ml-2">
                  {reviewRating} / 5 ({reviewCount} Reviews)
                </span>
              </div>
              {reviewQuote && (
                <p className="text-gray-500 text-sm italic font-opensans">
                  &quot;{reviewQuote}&quot;
                </p>
              )}
            </div>
          </section>
        )}
      </main>

      <DynamicCategorySeo title={title} subtitle={heroSubtitle} products={products} />
      <Footer />
    </div>
  );
}
