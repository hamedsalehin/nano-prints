import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Metadata } from "next";
import { Calendar, Clock, ArrowRight, Tag } from "lucide-react";
import { getMarkdownBlogPosts } from "@/lib/blogUtils";

export const metadata: Metadata = {
  title: "Nano Signs | Sign & Print Tips Blog – LED Signs, Neon & Banners",
  description:
    "Expert tips on custom signs, LED displays, neon signs, banner printing & vehicle wraps from Nano Signs — Fort Lauderdale's local sign shop in Broward County.",
  alternates: { canonical: "https://nano-signs.com/blog" },
  openGraph: {
    title: "Nano Signs | Sign & Print Tips Blog – LED Signs, Neon & Banners",
    description:
      "Expert tips on custom signs, LED displays, neon signs, banner printing & vehicle wraps from Nano Signs — Fort Lauderdale's local sign shop in Broward County.",
    url: "https://nano-signs.com/blog",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nano Signs | Sign & Print Tips Blog – LED Signs, Neon & Banners",
    description:
      "Expert tips on custom signs, LED displays, neon signs, banner printing & vehicle wraps from Nano Signs — Fort Lauderdale's local sign shop.",
  },
};

import { BLOG_REGISTRY } from "@/lib/blogRegistry";

const categories = ["All", "LED Signs", "Neon Signs", "Print & Signs", "Vehicle Signs", "Local Guides"];

export const dynamic = "force-dynamic";

export default function BlogPage() {
  // Merge markdown posts (admin-published) with static registry posts.
  // Markdown posts come first so newly published articles appear at the top.
  const markdownPosts = getMarkdownBlogPosts();
  const markdownSlugs = new Set(markdownPosts.map((p) => p.slug));
  const registryPosts = Object.values(BLOG_REGISTRY).filter(
    (p) => !markdownSlugs.has(p.slug)
  );
  const blogPosts = [...markdownPosts, ...registryPosts];
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-opensans">
      <Header />

      {/* Hero */}
      <section
        className="relative text-white py-20 md:py-28"
        style={{ background: "linear-gradient(135deg, #0d0d1a 0%, #1a0a2f 50%, #00222a 100%)" }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <span className="inline-block bg-pink-500/20 border border-pink-500/30 text-pink-300 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-5 font-poppins">
            Nano Signs Blog
          </span>
          <h1 className="text-4xl md:text-6xl font-black font-poppins tracking-tight mb-5">
            Sign Industry{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff2d78] to-[#ff9a00]">
              Insights & Tips
            </span>
          </h1>
          <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Expert guides on LED displays, neon signs, vehicle wraps, and everything in between — from the Nano Signs team in Fort Lauderdale, FL.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-2 overflow-x-auto scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`flex-shrink-0 text-xs font-bold px-4 py-2 rounded-full border transition-all font-poppins ${
                cat === "All"
                  ? "bg-[#ff2d78] text-white border-[#ff2d78]"
                  : "bg-white text-gray-600 border-gray-200 hover:border-[#ff2d78] hover:text-[#ff2d78]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Posts Grid */}
      <main className="max-w-7xl mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article
              key={post.slug}
              className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              {/* Image */}
              <div className={`relative h-52 overflow-hidden bg-gradient-to-br ${post.color}`}>
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  unoptimized={post.image.startsWith("data:") || post.image.startsWith("/api/") || post.image.startsWith("http")}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <span className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                  <Tag className="w-3 h-3" />
                  {post.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-4 text-xs text-gray-400 mb-3 font-poppins">
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{post.date}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
                </div>
                <h2 className="text-lg font-bold text-gray-900 font-poppins leading-snug mb-3 group-hover:text-[#ff2d78] transition-colors">
                  {post.title}
                </h2>
                <p className="text-sm text-gray-500 leading-relaxed flex-1 mb-4">
                  {post.excerpt}
                </p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#ff2d78] hover:gap-3 transition-all font-poppins"
                >
                  Read Article <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 bg-gradient-to-br from-gray-900 to-slate-800 rounded-3xl p-10 md:p-14 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-black font-poppins mb-4">
            Ready to Order Your Sign?
          </h2>
          <p className="text-slate-300 mb-8 text-lg max-w-xl mx-auto">
            Nano Signs delivers premium custom signage across Fort Lauderdale and Broward County — from LED billboards to neon décor.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/get-a-quote"
              className="bg-[#ff2d78] hover:bg-[#e0265f] text-white font-bold px-8 py-4 rounded-xl text-sm uppercase tracking-wider font-poppins transition-colors"
            >
              Get a Free Quote
            </Link>
            <Link
              href="/custom-signs"
              className="bg-white/10 hover:bg-white/20 text-white font-bold px-8 py-4 rounded-xl text-sm uppercase tracking-wider font-poppins transition-colors border border-white/20"
            >
              Browse Products
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
