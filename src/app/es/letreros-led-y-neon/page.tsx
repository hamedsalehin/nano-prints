import React from "react";
import { PRODUCTS_REGISTRY } from "@/lib/productsRegistry";
import { CategoryPageClient } from "@/components/CategoryPageClient";
import { SpanishHeader, SpanishFooter } from "@/components/SpanishHeaderFooter";
import SpanishQuoteForm from "@/components/SpanishQuoteForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Letreros LED Programables y Pantallas Electrónicas en Fort Lauderdale | Nano Signs",
  description:
    "Pantallas LED de alto brillo y letreros programables por WiFi para negocios en South Florida. Mensajes dinámicos, control móvil o PC y máxima visibilidad.",
  alternates: {
    canonical: "https://nano-signs.com/es/letreros-led-y-neon",
    languages: {
      es: "https://nano-signs.com/es/letreros-led-y-neon",
      en: "https://nano-signs.com/led-display-signs",
      "x-default": "https://nano-signs.com/led-display-signs",
    },
  },
  openGraph: {
    title: "Letreros LED Programables y Pantallas Electrónicas | Nano Signs Fort Lauderdale",
    description:
      "Atraiga clientes día y noche con pantallas LED electrónicas programables por WiFi. Fabricación local en Broward con diodos de alto brillo.",
    url: "https://nano-signs.com/es/letreros-led-y-neon",
    siteName: "Nano Signs",
    locale: "es_US",
    type: "website",
  },
};

export default function LetrerosLedPage() {
  const categoryData = PRODUCTS_REGISTRY["led-display-signs"];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        name: "Letreros LED Programables y Pantallas Electrónicas",
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
          "Miami-Dade",
        ],
        description:
          "Diseño, programación, fabricación e instalación de pantallas LED comerciales de alto brillo, letreros programables por WiFi y carteleras electrónicas digitales para exteriores e interiores en South Florida.",
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
            name: "Letreros LED Programables",
            item: "https://nano-signs.com/es/letreros-led-y-neon",
          },
        ],
      },
    ],
  };

  const spanishFaqs = [
    {
      q: "¿Cómo actualizo los mensajes de una pantalla LED programable?",
      a: "El control se realiza fácilmente por WiFi desde su teléfono celular (iOS o Android) o por USB/red desde una computadora. Puede cambiar textos, ofertas especiales, promociones del día y horarios en segundos.",
    },
    {
      q: "¿Qué diferencia hay entre resoluciones P3, P5 y P10?",
      a: "El número indica la distancia en milímetros entre cada diodo LED. P3 y P2.6 ofrecen máxima nitidez de cerca para vitrinas interiores; P5 es ideal para tiendas frente a calles peatonales; y P10 es la opción más económica y legible a gran distancia para avenidas y autopistas.",
    },
    {
      q: "¿Las pantallas LED son resistentes a la lluvia y el calor de Florida?",
      a: "Sí, todos nuestros gabinetes de letreros LED para exteriores cuentan con certificación IP65 a prueba de agua, sellado contra humedad tropical y protección contra rayos ultravioleta para soportar el clima de Broward y Miami.",
    },
    {
      q: "¿Qué brillo tienen las pantallas bajo el sol directo?",
      a: "Nuestras pantallas LED comerciales de exteriores alcanzan entre 6,000 y 7,500 nits de brillo, lo que asegura total legibilidad aún bajo el sol de mediodía en Florida.",
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CategoryPageClient
        categorySlug="led-display-signs"
        title="Letreros LED Programables y Pantallas Electrónicas"
        breadcrumbLabel="Letreros LED Programables"
        heroSubtitle="Pantallas LED de alto brillo y letreros programables por WiFi para negocios en South Florida. Atraiga clientes día y noche con mensajes dinámicos, programación sencilla desde su teléfono o PC y fabricación a la medida de alta durabilidad."
        heroImage="/images/products/programmable-led-signs-banner.png"
        tabletHeroImage="/images/products/programmable-led-signs-banner.png"
        mobileHeroImage="/images/products/programmable-led-signs-banner.png"
        products={categoryData?.products || []}
        categoryDescriptionText="Revolucione la visibilidad de su negocio 24/7. Nuestras pantallas LED comerciales y carteleras digitales están construidas con diodos de alto brillo (más de 6,500 nits) que no se desvanecen con el sol directo de mediodía en Florida. Controle textos móviles, promociones en tiempo real y gráficos dinámicos desde cualquier lugar."
        categorySecondaryImage="/images/products/shop-window-led-display.webp"
        faqs={spanishFaqs}
        reviewRating={categoryData?.reviewRating || "4.9"}
        reviewCount={categoryData?.reviewCount || "420"}
        reviewQuote="La pantalla LED para nuestra fachada duplicó la clientela que entra desde la avenida. Muy fácil de programar por teléfono."
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
                    Solicite Su Cotización de Pantalla LED Programable
                  </h2>
                  <p className="text-sm text-slate-600 mt-2">
                    Indíquenos las medidas aproximadas y el tipo de instalación para enviarle precios de fábrica directos.
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
