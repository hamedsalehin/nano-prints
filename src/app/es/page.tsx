import dynamic from 'next/dynamic';
import { SpanishHeader, SpanishFooter } from "@/components/SpanishHeaderFooter";
import { HeroSection } from "@/components/HeroSection";
import type { Metadata } from "next";

const CategoryCarousel = dynamic(() => import('@/components/CategoryCarousel').then(mod => mod.CategoryCarousel));
const CustomerFavorites = dynamic(() => import('@/components/CustomerFavorites').then(mod => mod.CustomerFavorites));
const ExpertsSection = dynamic(() => import('@/components/ExpertsSection').then(mod => mod.ExpertsSection));
const ProductsGrid = dynamic(() => import('@/components/ProductsGrid').then(mod => mod.ProductsGrid));
const ValuePropositions = dynamic(() => import('@/components/ValuePropositions').then(mod => mod.ValuePropositions));
const TrustReviewSection = dynamic(() => import('@/components/TrustReviewSection').then(mod => mod.TrustReviewSection));
const HomepageFaq = dynamic(() => import('@/components/HomepageFaq').then(mod => mod.HomepageFaq));
const SpanishQuoteForm = dynamic(() => import('@/components/SpanishQuoteForm').then(mod => mod.SpanishQuoteForm));

export const metadata: Metadata = {
  title: "Letreros e Imprenta en Fort Lauderdale y Oakland Park FL | Nano Signs",
  description:
    "Fabricación de letreros comerciales, banners vinílicos, pantallas LED y neón en Fort Lauderdale y Oakland Park, FL. Atención 100% en español. Llame al (305) 967-1005.",
  alternates: {
    canonical: "https://nano-signs.com/es",
    languages: {
      es: "https://nano-signs.com/es",
      en: "https://nano-signs.com/",
      "x-default": "https://nano-signs.com/",
    },
  },
  openGraph: {
    title: "Letreros e Impresión Comercial en Fort Lauderdale FL | Nano Signs Español",
    description:
      "Taller físico de letreros, banners y rotulación en Oakland Park / Fort Lauderdale. Diseños de alto impacto, permisos locales y atención personalizada en español.",
    url: "https://nano-signs.com/es",
    siteName: "Nano Signs",
    locale: "es_US",
    type: "website",
  },
};

export default function SpanishHomePage() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://nano-signs.com/#localbusiness-es",
    name: "Nano Signs - Imprenta y Letreros Comerciales",
    alternateName: "Nano Signs Fort Lauderdale & Oakland Park",
    description:
      "Fabricación de letreros comerciales de fachada, letras en relieve (channel letters), banners vinílicos, pantallas LED programables, letreros de neón y rotulación de vehículos en Fort Lauderdale y Oakland Park, FL.",
    url: "https://nano-signs.com/es",
    telephone: "(305) 967-1005",
    email: "info@nano-signs.com",
    image: "https://nano-signs.com/images/hero-image.webp",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: "4567 Powerline Rd (4567 NW 9th Ave)",
      addressLocality: "Oakland Park",
      addressRegion: "FL",
      postalCode: "33309",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 26.1835062,
      longitude: -80.1554943,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    areaServed: [
      { "@type": "City", name: "Fort Lauderdale" },
      { "@type": "City", name: "Oakland Park" },
      { "@type": "City", name: "Pompano Beach" },
      { "@type": "City", name: "Wilton Manors" },
      { "@type": "City", name: "Hollywood" },
      { "@type": "AdministrativeArea", name: "Broward County" },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Inicio",
        item: "https://nano-signs.com/es",
      },
    ],
  };

  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Homepage LCP Hero Image Preload */}
      <link
        rel="preload"
        as="image"
        href="/images/hero-image-mobile.webp"
        type="image/webp"
        media="(max-width: 768px)"
        fetchPriority="high"
      />
      <link
        rel="preload"
        as="image"
        href="/images/hero-image.webp"
        type="image/webp"
        media="(min-width: 769px)"
        fetchPriority="high"
      />

      <SpanishHeader />
      <HeroSection />
      <CategoryCarousel isSpanish={true} />
      <CustomerFavorites isSpanish={true} />
      <ExpertsSection isSpanish={true} />
      <ProductsGrid isSpanish={true} />
      <ValuePropositions isSpanish={true} />

      {/* Spanish Quote Form Section */}
      <section id="cotizacion" className="py-14 md:py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-[#ff2d78] font-bold text-xs uppercase tracking-wider">
              Presupuesto Rápido y Personalizado
            </span>
            <h2 className="text-2xl sm:text-3xl font-black font-poppins text-slate-900 mt-2">
              Solicite Su Cotización en Español
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Taller directo en 4567 Powerline Rd. Le respondemos en menos de 4 horas o llámenos al (305) 967-1005.
            </p>
          </div>
          <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-200/80">
            <SpanishQuoteForm />
          </div>
        </div>
      </section>

      <TrustReviewSection />
      <HomepageFaq isSpanish={true} />

      {/* SEO Local Content in Spanish */}
      <section className="bg-slate-50 py-12 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-sm text-slate-600 leading-relaxed font-opensans space-y-4">
          <h2 className="text-xl font-bold text-slate-800 font-poppins mb-2">
            Fábrica de Letreros Comerciales e Imprenta en Fort Lauderdale y Oakland Park, FL
          </h2>
          <p>
            En <strong>Nano Signs</strong> diseñamos, producimos e instalamos todo tipo de señalización exterior e interior para negocios en el condado de Broward. Desde <strong>channel letters tridimensionales iluminadas con LED</strong> hasta banners vinílicos para eventos, lonas para cercas de construcción, pantallas LED electrónicas programables y letreros decorativos de neón.
          </p>
          <p>
            Visite nuestra sala de muestras y taller en <strong>4567 Powerline Rd (4567 NW 9th Ave), Oakland Park / Fort Lauderdale, FL 33309</strong>. Brindamos asesoría en español sobre normativas de ciudad, planos técnicos para permisos y muestras reales de materiales resistentes al clima tropical de Florida.
          </p>
        </div>
      </section>

      <SpanishFooter />
    </main>
  );
}
