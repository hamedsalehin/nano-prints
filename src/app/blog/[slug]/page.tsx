import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Calendar, Clock, ArrowLeft, ShoppingCart, Tag, ArrowRight, Share2 } from "lucide-react";
import { BLOG_REGISTRY } from "@/lib/blogRegistry";
import { getMarkdownBlogPost, getMarkdownBlogPosts } from "@/lib/blogUtils";
import { PRODUCTS_REGISTRY } from "@/lib/productsRegistry";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const markdownSlugs = getMarkdownBlogPosts().map((p) => ({ slug: p.slug }));
  const registrySlugs = Object.keys(BLOG_REGISTRY).map((slug) => ({ slug }));
  const all = [...markdownSlugs, ...registrySlugs];
  const seen = new Set<string>();
  return all.filter((s) => { if (seen.has(s.slug)) return false; seen.add(s.slug); return true; });
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_REGISTRY[slug] ?? getMarkdownBlogPost(slug);
  if (!post) return { title: "Post Not Found" };

  const description = (post.excerpt || "").slice(0, 155);
  const canonicalUrl = `https://nano-signs.com/blog/${slug}`;

  return {
    title: `${post.title} | Nano Signs`,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: `${post.title} | Nano Signs`, description, url: canonicalUrl,
      images: [{ url: post.image.startsWith("/") ? `https://nano-signs.com${post.image}` : post.image, alt: post.title }],
      type: "article",
    },
    twitter: {
      card: "summary_large_image", title: `${post.title} | Nano Signs`, description,
      images: [post.image.startsWith("/") ? `https://nano-signs.com${post.image}` : post.image],
    },
  };
}

const CATEGORY_TO_PRODUCTS: Record<string, { registryKey: string }[]> = {
  "Neon Signs":       [{ registryKey: "neon-signs" }],
  "LED Signs":        [{ registryKey: "led-display-signs" }, { registryKey: "custom-signs" }],
  "Print & Signs":    [{ registryKey: "custom-banners" }, { registryKey: "custom-signs" }],
  "Vehicle Signs":    [{ registryKey: "vehicle-signs" }],
  "Local Guides":     [{ registryKey: "custom-signs" }, { registryKey: "neon-signs" }],
  "General Signage":  [{ registryKey: "custom-signs" }, { registryKey: "neon-signs" }],
};

function getRelatedProducts(category: string, count = 4) {
  const mappings = CATEGORY_TO_PRODUCTS[category] ?? CATEGORY_TO_PRODUCTS["General Signage"];
  const results: { id: string; name: string; description: string; image: string; price: string; categoryKey: string }[] = [];
  for (const { registryKey } of mappings) {
    const cat = PRODUCTS_REGISTRY[registryKey as keyof typeof PRODUCTS_REGISTRY];
    if (!cat) continue;
    for (const product of cat.products) {
      if (results.length >= count) break;
      results.push({ id: product.id, name: product.name, description: product.description, image: product.image, price: product.price, categoryKey: registryKey });
    }
    if (results.length >= count) break;
  }
  return results.slice(0, count);
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const registryPost = BLOG_REGISTRY[slug];
  const mdPost = !registryPost ? getMarkdownBlogPost(slug) : null;
  const post = registryPost ?? mdPost;
  if (!post) notFound();

  const readTime = "readTime" in post ? post.readTime : "3 min read";
  const date = post.date;
  const relatedProducts = getRelatedProducts(post.category ?? "General Signage");
  const firstCategoryKey = CATEGORY_TO_PRODUCTS[post.category ?? "General Signage"]?.[0]?.registryKey ?? "custom-signs";

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-opensans">
      <Header />

      {/* ── Article Header Section (Clean & Fancy Dark Theme) ───────────────── */}
      <section className="bg-slate-950 pt-28 pb-16 px-4 border-b border-slate-800">
        <div className="max-w-4xl mx-auto text-center">
          <Link href="/blog" className="inline-flex items-center gap-2 text-pink-400 hover:text-pink-300 transition-colors font-bold text-sm mb-6 font-poppins">
            <ArrowLeft className="w-4 h-4" /> Back to Articles
          </Link>
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="inline-block bg-[#ff2d78] text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest font-poppins shadow-[0_0_20px_rgba(255,45,120,0.4)]">
              {post.category}
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white font-poppins leading-[1.12] mb-6 tracking-tight">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400 font-medium">
            <div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-[#ff2d78]" />{date}</div>
            <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
            <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-[#ff2d78]" />{readTime}</div>
          </div>
        </div>
      </section>

      {/* ── Featured Image Section (Full Picture, Clear & Fancy) ─────────────── */}
      <div className="max-w-4xl mx-auto px-4 -mt-8 relative z-10 w-full">
        <div className="relative h-[320px] sm:h-[420px] md:h-[520px] w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover object-center"
            priority
            sizes="(max-width: 1024px) 100vw, 1024px"
          />
        </div>
      </div>

      {/* ── Article Content ─────────────────────────────────────────────────── */}
      <main className="max-w-3xl mx-auto px-4 py-14 w-full flex-1">
        <article
          className="prose prose-slate prose-lg max-w-none 
            prose-headings:font-poppins prose-headings:font-bold prose-headings:text-slate-900 
            prose-h2:text-2xl md:prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-5 prose-h2:border-b prose-h2:border-slate-200 prose-h2:pb-3
            prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 
            prose-p:text-slate-700 prose-p:leading-relaxed prose-p:my-5 prose-p:text-base md:prose-p:text-lg
            prose-strong:text-slate-900 prose-strong:font-bold
            prose-a:text-[#ff2d78] hover:prose-a:text-pink-700 prose-a:font-semibold
            prose-ul:my-5 prose-li:text-slate-700 prose-li:my-1.5
            prose-img:rounded-2xl prose-img:shadow-xl prose-img:border prose-img:border-slate-200 prose-img:w-full prose-img:my-8"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </main>

      {/* ── Related Products ────────────────────────────────────────────────── */}
      {relatedProducts.length > 0 && (
        <section className="bg-white border-t border-gray-100 py-16">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-center justify-between mb-10">
              <div>
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#ff2d78] uppercase tracking-widest bg-pink-50 px-3 py-1 rounded-full mb-3 font-poppins">
                  <Tag className="w-3 h-3" /> Related Products
                </span>
                <h2 className="text-2xl md:text-3xl font-black text-slate-900 font-poppins">
                  Shop {post.category} at Nano Signs
                </h2>
                <p className="text-slate-500 mt-1 text-sm">Premium quality, fast turnaround — Fort Lauderdale &amp; nationwide shipping.</p>
              </div>
              <Link href={`/${firstCategoryKey}`} className="hidden md:inline-flex items-center gap-2 text-sm font-bold text-[#ff2d78] hover:gap-3 transition-all font-poppins">
                View All <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
              {relatedProducts.map((product) => (
                <Link key={`${product.categoryKey}-${product.id}`} href={`/${product.categoryKey}/${product.id}`}
                  className="group bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
                  <div className="relative h-44 overflow-hidden bg-gray-50">
                    <Image src={product.image} alt={product.name} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    <h3 className="text-sm font-bold text-slate-900 font-poppins leading-snug mb-1 group-hover:text-[#ff2d78] transition-colors line-clamp-2">{product.name}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed line-clamp-2 flex-1 mb-3">{product.description}</p>
                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-base font-black text-slate-900 font-poppins">{product.price}</span>
                      <span className="inline-flex items-center gap-1 bg-[#ff2d78] text-white text-[11px] font-bold px-2.5 py-1 rounded-lg group-hover:bg-pink-600 transition-colors">
                        <ShoppingCart className="w-3 h-3" /> Order
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-10 text-center">
              <Link href="/get-a-quote" className="inline-flex items-center gap-2 bg-[#ff2d78] hover:bg-pink-600 text-white font-bold px-8 py-4 rounded-xl text-sm uppercase tracking-wider font-poppins transition-colors shadow-lg shadow-pink-500/30">
                Get a Free Custom Quote
              </Link>
              <p className="text-xs text-slate-400 mt-3">Fast turnaround · Nationwide shipping · Fort Lauderdale, FL</p>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}