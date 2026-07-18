import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import { BLOG_REGISTRY } from "@/lib/blogRegistry";
import { Metadata } from "next";

// Next.js 15: params is now a Promise
interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(BLOG_REGISTRY).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_REGISTRY[slug];
  if (!post) return { title: "Post Not Found" };

  return {
    title: `${post.title} | Nano Signs Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
      type: "article",
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = BLOG_REGISTRY[slug];

  if (!post) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-opensans">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden bg-slate-900">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent" />
        
        <div className="relative max-w-4xl mx-auto px-4 mt-8 md:mt-16 text-center">
          <Link href="/blog" className="inline-flex items-center gap-2 text-pink-400 hover:text-pink-300 transition-colors font-bold text-sm mb-6 font-poppins">
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="inline-block bg-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest font-poppins shadow-[0_0_15px_rgba(236,72,153,0.5)]">
              {post.category}
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white font-poppins leading-[1.1] mb-6">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-slate-300 font-medium">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-pink-400" />
              {post.date}
            </div>
            <div className="w-1 h-1 rounded-full bg-slate-600" />
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-pink-400" />
              {post.readTime}
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <main className="max-w-3xl mx-auto px-4 py-16 w-full flex-1">
        <article className="prose prose-slate prose-lg md:prose-xl max-w-none prose-headings:font-poppins prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6 prose-p:text-gray-600 prose-p:leading-relaxed prose-a:text-pink-600 hover:prose-a:text-pink-700 prose-img:rounded-2xl prose-img:shadow-xl" dangerouslySetInnerHTML={{ __html: post.content }} />
      </main>

      <Footer />
    </div>
  );
}
