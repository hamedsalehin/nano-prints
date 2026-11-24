import React from "react";
import { PRODUCTS_REGISTRY } from "@/lib/productsRegistry";
import { CategoryPageClient } from "@/components/CategoryPageClient";
import { SpanishHeader, SpanishFooter } from "@/components/SpanishHeaderFooter";
import SpanishQuoteForm from "@/components/SpanishQuoteForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Letreros Comerciales de Fachada en Fort Lauderdale | Nano Signs",
  description:
    "Fabricación e instalación de letreros comerciales, channel letters 3D iluminadas y cajas de luz para negocios en Fort Lauderdale y Oakland Park, FL. Cotización gratis.",
  alternates: {
    canonical: "https://nano-signs.com/es/letreros-comerciales",
    languages: {
      es: "https://nano-signs.com/es/letreros-comerciales",
      en: "https://nano-signs.com/custom-signs",
      "x-default": "https://nano-signs.com/custom-signs",
    },
  },
  openGraph: {
    title: "Letreros Comerciales de Fachada y Edificio | Nano Signs Fort Lauderdale",
    description:
      "Atracción garantizada para su tienda u oficina: channel letters 3D, acrílicos dimensionales y letreros de fachada aprobados para permisos en Broward.",
    url: "https://nano-signs.com/es/letreros-comerciales",
    siteName: "Nano Signs",
    locale: "es_US",
    type: "website",
  },
};

export default function LetrerosComercialesPage() {
  const categoryData = PRODUCTS_REGISTRY["custom-signs"];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: "Letreros Comerciales de Fachada y Negocios",
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
          "Wilton Manors",
          "Broward County",
        ],
        description:
          "Fabricación, permisos e instalación de letreros exteriores para tiendas, restaurantes y oficinas: channel letters, cajas de luz y placas de acrílico.",
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
            name: "Letreros Comerciales",
            item: "https://nano-signs.com/es/letreros-comerciales",
          },
        ],
      },
    ],
  };

  const spanishFaqs = [
    {
      q: "¿Qué tipos de letreros comerciales fabrican?",
      a: "Fabricamos letras tridimensionales iluminadas (channel letters), cajas de luz (lightboxes), letreros de aluminio compuesto (ACM), placas de acrílico con separadores, letreros tipo A-frame y señalización direccional.",
    },
    {
      q: "¿Ayudan con los permisos de la ciudad en Broward?",
      a: "Sí. Proporcionamos planos técnicos y especificaciones eléctricas requeridas por las oficinas de zonificación de Oakland Park, Fort Lauderdale y ciudades aledañas.",
    },
    {
      q: "¿Cuánto dura un letrero de aluminio o acrílico en exteriores?",
      a: "Nuestros letreros de aluminio y channel letters están diseñados para resistir el sol intenso, lluvia y salitre de Florida durante 5 a 10+ años gracias a pinturas poliuretánicas y sellos IP65.",
    },
    {
      q: "¿Realizan la instalación profesional en mi local?",
      a: "Sí, contamos con equipo propio de grúas, técnicos certificados y seguro de responsabilidad para instalaciones en fachadas altas o centros comerciales.",
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CategoryPageClient
        categorySlug="custom-signs"
        title="Letreros Comerciales y Señalización"
        breadcrumbLabel="Letreros Comerciales"
        heroSubtitle="Letreros de fachada, channel letters 3D y señalización resistente construidos en Fort Lauderdale."
        heroImage={categoryData?.heroImage || "/images/products/main-page/nano_hero_signs_section-oakland-park-printing-fl.webp"}
        tabletHeroImage={categoryData?.tabletHeroImage}
        mobileHeroImage={categoryData?.mobileHeroImage}
        products={categoryData?.products || []}
        categoryDescriptionText="Explore nuestra línea completa de señalización comercial y letreros para tiendas, oficinas y desarrollos inmobiliarios. Desde letreros de jardín y paneles de venta inmobiliaria hasta letras tridimensionales con iluminación LED de alta potencia."
        categorySecondaryImage={categoryData?.categorySecondaryImage}
        faqs={spanishFaqs}
        reviewRating={categoryData?.reviewRating || "4.9"}
        reviewCount={categoryData?.reviewCount || "8,420"}
        reviewQuote="La calidad de las letras 3D para nuestra tienda superó las expectativas. Proceso rápido y asesoría completa en español."
        customHeader={<SpanishHeader />}
        customFooter={
          <>
            {/* Embedded Spanish Quote Form */}
            <section id="cotizacion" className="py-14 md:py-20 bg-slate-50 border-t border-slate-200">
              <div className="max-w-4xl mx-auto px-4">
                <div className="text-center mb-10">
                  <span className="text-[#ff2d78] font-bold text-xs uppercase tracking-wider">
                    Respuesta en Menos de 4 Horas
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black font-poppins text-slate-900 mt-1">
                    Solicite Su Presupuesto de Letreros Comerciales
                  </h2>
                  <p className="text-sm text-slate-600 mt-2">
                    Suba las fotos de su fachada o medidas para recibir una cotización detallada.
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
