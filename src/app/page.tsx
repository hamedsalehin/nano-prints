import dynamic from 'next/dynamic';
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";

const CategoryCarousel = dynamic(() => import('@/components/CategoryCarousel').then(mod => mod.CategoryCarousel));
const CustomerFavorites = dynamic(() => import('@/components/CustomerFavorites').then(mod => mod.CustomerFavorites));
const ExpertsSection = dynamic(() => import('@/components/ExpertsSection').then(mod => mod.ExpertsSection));
const ProductsGrid = dynamic(() => import('@/components/ProductsGrid').then(mod => mod.ProductsGrid));
const ValuePropositions = dynamic(() => import('@/components/ValuePropositions').then(mod => mod.ValuePropositions));
const CustomerHighlights = dynamic(() => import('@/components/CustomerHighlights').then(mod => mod.CustomerHighlights));
const SeoContentBlock = dynamic(() => import('@/components/SeoContentBlock').then(mod => mod.SeoContentBlock));
const Footer = dynamic(() => import('@/components/Footer').then(mod => mod.Footer));

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <CategoryCarousel />
      <CustomerFavorites />
      <ExpertsSection />
      <ProductsGrid />
      <ValuePropositions />
      <CustomerHighlights />
      <SeoContentBlock />
      <Footer />
    </main>
  );
}
