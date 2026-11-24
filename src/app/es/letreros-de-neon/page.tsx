import React from "react";
import { PRODUCTS_REGISTRY } from "@/lib/productsRegistry";
import { CategoryPageClient } from "@/components/CategoryPageClient";
import { SpanishHeader, SpanishFooter } from "@/components/SpanishHeaderFooter";
import SpanishQuoteForm from "@/components/SpanishQuoteForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Letreros de Neón Personalizados en Fort Lauderdale | Nano Signs",
  description:
    "Fabricación de letreros de neón LED personalizados para negocios, restaurantes, oficinas y eventos en Fort Lauderdale, Oakland Park y el condado de Broward, FL.",
  alternates: {
    canonical: "https://nano-signs.com/es/letreros-de-neon",
    languages: {
      es: "https://nano-signs.com/es/letreros-de-neon",
      en: "https://nano-signs.com/neon-signs",
      "x-default": "https://nano-signs.com/neon-signs",
    },
  },
  openGraph: {
    title: "Letreros de Neón Personalizados para Negocios y Eventos | Nano Signs",
    description:
      "Cree una atmósfera vibrante y elegante con letreros de neón LED personalizados. Diseños únicos para logotipos, bares, bodas y locales comerciales en Florida.",
    url: "https://nano-signs.com/es/letreros-de-neon",
    siteName: "Nano Signs",
    locale: "es_US",
    type: "website",
  },
};

export default function LetrerosDeNeonPage() {
  const categoryData = PRODUCTS_REGISTRY["neon-signs"];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: "Letreros de Neón Personalizados",
        provider: {
          "@type": "LocalBusiness",
          name: "Nano Signs",
          telephone: "(305) 967-1005",
          address: {
            "@type": "PostalAddress",
            streetAddress: "4567 Powerline Rd",
            addressLocality: "Fort Lauderdale",
            addressRegion: "FL",
            postalCode: "33309",
            addressCountry: "US",
          },
        },
        areaServed: [
          "Fort Lauderdale",
          "Oakland Park",
          "Pompano Beach",
          "Broward County",
          "Miami-Dade",
        ],
        description:
          "Diseño y fabricación personalizada de letreros de neón LED para negocios, vitrinas, bares, salones de belleza, oficinas y eventos sociales en South Florida. Manguera de silicona irrompible de bajo consumo.",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Inicio",
            item: "https://nano-signs.com/es",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Letreros de Neón",
            item: "https://nano-signs.com/es/letreros-de-neon",
          },
        ],
      },
    ],
  };

  const spanishFaqs = [
    {
      q: "¿El neón LED se calienta o se puede romper?",
      a: "No. A diferencia del vidrio tradicional con gas que se quiebra fácilmente, el neón LED utiliza manguera de silicona flexible con tecnología de 12V: no quema al tacto, no se rompe y ahorra hasta un 80% de electricidad.",
    },
    {
      q: "¿Pueden fabricar el logotipo exacto de mi empresa en neón?",
      a: "Sí. Fabricamos logotipos empresariales, firmas, nombres y frases en neón sobre base acrílica transparente cortada a la silueta (contour cut) o rectangular con soporte de montaje.",
    },
    {
      q: "¿Incluye transformador y accesorios de instalación?",
      a: "Todos nuestros letreros de neón incluyen adaptador de corriente de 12V para enchufe convencional de pared, regulador de intensidad (dimmer) y kit de montaje rápido para colgar o atornillar en paredes.",
    },
    {
      q: "¿Cuánto dura un letrero de neón LED?",
      a: "Los diodos LED de alta calidad tienen una vida útil promedio de 50,000 horas de uso continuo (más de 5 a 8 años de operación diaria en su negocio).",
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CategoryPageClient
        categorySlug="neon-signs"
        title="Letreros de Neón Personalizados para Negocios y Eventos"
        breadcrumbLabel="Letreros de Neón"
        heroSubtitle="Letreros de neón LED brillante y personalizados a la medida para negocios, bares, restaurantes, bodas y oficinas en South Florida. Cree ambientes modernos con iluminación atractiva y eficiente."
        heroImage="/images/products/neon/nano-signs-cocktails-neon-usa.webp"
        tabletHeroImage="/images/products/neon/nano-signs-cocktails-neon-usa.webp"
        mobileHeroImage="/images/products/neon/nano-signs-cocktails-neon-usa.webp"
        heroVariant="neon"
        products={categoryData?.products || []}
        categoryDescriptionText="Ilumine y transforme cualquier espacio comercial o social. Nuestros letreros de neón LED combinan la belleza estética del neón clásico con la máxima durabilidad, seguridad y bajo consumo de la tecnología LED moderna sobre respaldo de acrílico cristalino."
        categorySecondaryImage="/images/products/neon/nano-signs-good-vibes-neon-usa.webp"
        faqs={spanishFaqs}
        reviewRating={categoryData?.reviewRating || "4.9"}
        reviewCount={categoryData?.reviewCount || "184"}
        reviewQuote="El letrero de neón para nuestro restaurante en Fort Lauderdale quedó espectacular. Los clientes no paran de tomarse fotos para Instagram."
        customHeader={<SpanishHeader />}
        customFooter={
          <>
            {/* Quote Form */}
            <section id="cotizacion" className="py-14 md:py-20 bg-slate-50 border-t border-slate-200">
              <div className="max-w-4xl mx-auto px-4">
                <div className="text-center mb-10">
                  <span className="text-[#ff2d78] font-bold text-xs uppercase tracking-wider">
                    Presupuesto Rápido
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black font-poppins text-slate-900 mt-1">
                    Cotice Su Letrero de Neón Personalizado
                  </h2>
                  <p className="text-sm text-slate-600 mt-2">
                    Envíenos su frase, tamaño estimado o suba el archivo de su logotipo para recibir una cotización rápida.
                  </p>
                </div>
                <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm">
                  <SpanishQuoteForm />
                </div>
              </div>
            </section>
            <SpanishFooter />
          </>
        }
        isSpanish={true}
      />
    </>
  );
}
