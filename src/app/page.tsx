import dynamic from 'next/dynamic';
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";

const CategoryCarousel = dynamic(() => import('@/components/CategoryCarousel').then(mod => mod.CategoryCarousel));
const CustomerFavorites = dynamic(() => import('@/components/CustomerFavorites').then(mod => mod.CustomerFavorites));
const ExpertsSection = dynamic(() => import('@/components/ExpertsSection').then(mod => mod.ExpertsSection));
const ProductsGrid = dynamic(() => import('@/components/ProductsGrid').then(mod => mod.ProductsGrid));
const ValuePropositions = dynamic(() => import('@/components/ValuePropositions').then(mod => mod.ValuePropositions));
const CustomerHighlights = dynamic(() => import('@/components/CustomerHighlights').then(mod => mod.CustomerHighlights));
const HomepageFaq = dynamic(() => import('@/components/HomepageFaq').then(mod => mod.HomepageFaq));
const SeoContentBlock = dynamic(() => import('@/components/SeoContentBlock').then(mod => mod.SeoContentBlock));
const Footer = dynamic(() => import('@/components/Footer').then(mod => mod.Footer));

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Homepage LCP Hero Image Preload */}
      <link
        rel="preload"
        as="image"
        href="/images/hero-image-mobile.webp"
        type="image/webp"
        media="(max-width: 768px)"
        // @ts-expect-error fetchpriority attribute
        fetchpriority="high"
      />
      <link
        rel="preload"
        as="image"
        href="/images/hero-image.webp"
        type="image/webp"
        media="(min-width: 769px)"
        // @ts-expect-error fetchpriority attribute
        fetchpriority="high"
      />
      <Header />
      <HeroSection />
      <CategoryCarousel />
      <CustomerFavorites />
      <ExpertsSection />
      <ProductsGrid />
      <ValuePropositions />
      <CustomerHighlights />
      <HomepageFaq />
      <SeoContentBlock />
      <Footer />
    </main>
  );
}
