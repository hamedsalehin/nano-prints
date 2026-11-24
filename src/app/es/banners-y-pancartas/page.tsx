import React from "react";
import { PRODUCTS_REGISTRY } from "@/lib/productsRegistry";
import { CategoryPageClient } from "@/components/CategoryPageClient";
import { SpanishHeader, SpanishFooter } from "@/components/SpanishHeaderFooter";
import SpanishQuoteForm from "@/components/SpanishQuoteForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Banners Vinílicos y Roll-Up Banners en Fort Lauderdale | Nano Signs",
  description:
    "Impresión de banners de vinil para exteriores, exhibidores retráctiles roll-up para ferias y banderas publicitarias en Fort Lauderdale y Broward. Entrega rápida en 24-48h.",
  alternates: {
    canonical: "https://nano-signs.com/es/banners-y-pancartas",
    languages: {
      es: "https://nano-signs.com/es/banners-y-pancartas",
      en: "https://nano-signs.com/custom-banners",
      "x-default": "https://nano-signs.com/custom-banners",
    },
  },
  openGraph: {
    title: "Banners Vinílicos, Roll-Ups y Pancartas | Nano Signs Fort Lauderdale",
    description:
      "Lonas vinílicas reforzadas con ojales, banners retráctiles de fácil armado y banderas publicitarias feather para negocios y eventos en el sur de la Florida.",
    url: "https://nano-signs.com/es/banners-y-pancartas",
    siteName: "Nano Signs",
    locale: "es_US",
    type: "website",
  },
};

export default function BannersYPancartasPage() {
  const categoryData = PRODUCTS_REGISTRY["custom-banners"];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: "Impresión de Banners y Pancartas Vinílicas",
        provider: {
          "@type": "LocalBusiness",
          name: "Nano Signs",
          telephone: "(305) 967-1005",
          address: {
            "@type": "PostalAddress",
            streetAddress: "4567 Powerline Rd (4567 NW 9th Ave)",
            addressLocality: "Fort Lauderdale / Oakland Park",
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
        ],
        description:
          "Impresión gran formato de pancartas de vinil 13oz y 18oz, exhibidores roll-up retráctiles para exposiciones y banderas publicitarias con entrega en 24-48 horas.",
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
            name: "Banners y Pancartas",
            item: "https://nano-signs.com/es/banners-y-pancartas",
          },
        ],
      },
    ],
  };

  const spanishFaqs = [
    {
      q: "¿Cuál es la diferencia entre los banners de vinil y de tela?",
      a: "El vinil es impermeable y ultra resistente, perfecto para exteriores, vallas y construcciones. La tela poliéster ofrece un acabado sin reflejos ideal para eventos bajo techo y ferias.",
    },
    {
      q: "¿Los banners vienen listos para colgar?",
      a: "Sí, todos nuestros banners exteriores incluyen dobladillo termosellado perimetral y ojales de latón resistentes a la corrosión cada 2 pies sin costo adicional.",
    },
    {
      q: "¿En cuánto tiempo entregan un banner o roll-up?",
      a: "Ofrecemos producción exprés en 24 a 48 horas con retiro local en nuestro taller de 4567 Powerline Rd o entrega a domicilio en Broward.",
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CategoryPageClient
        categorySlug="custom-banners"
        title="Banners Vinílicos y Pancartas"
        breadcrumbLabel="Banners y Pancartas"
        heroSubtitle="Banners de vinil de alta resistencia, exhibidores retráctiles roll-up y banderas feather impresos en Fort Lauderdale."
        heroImage={categoryData?.heroImage || "/images/products/main-page/banners_hero_image-oakland-park-printing-fl.webp"}
        tabletHeroImage={categoryData?.tabletHeroImage}
        mobileHeroImage={categoryData?.mobileHeroImage}
        products={categoryData?.products || []}
        categoryDescriptionText="Impresión gran formato de pancartas para negocios y eventos. Lonas vinílicas reforzadas de 13oz y 18oz, malla microperforada mesh para cercas con viento, telas sublimadas y displays retráctiles roll-up con bolsa de transporte."
        categorySecondaryImage={categoryData?.categorySecondaryImage}
        faqs={spanishFaqs}
        reviewRating={categoryData?.reviewRating || "4.9"}
        reviewCount={categoryData?.reviewCount || "2,680"}
        reviewQuote="Excelente nitidez y colores vibrantes. Los banners llegaron a tiempo para la inauguración de nuestra tienda."
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
                    Calcule Su Cotización de Banners
                  </h2>
                  <p className="text-sm text-slate-600 mt-2">
                    Indique medidas en pies o pulgadas y adjunte su arte para revisar resolución gratis.
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
