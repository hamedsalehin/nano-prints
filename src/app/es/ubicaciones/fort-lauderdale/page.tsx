import React from "react";
import { LOCATIONS_REGISTRY } from "@/lib/locationsRegistry";
import { Metadata } from "next";
import { SpanishHeader, SpanishFooter } from "@/components/SpanishHeaderFooter";
import SpanishQuoteForm from "@/components/SpanishQuoteForm";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Taller de Letreros e Imprenta en Fort Lauderdale y Oakland Park | Nano Signs",
  description:
    "Su taller local de letreros comerciales, banners, letreros LED y rotulación en 4567 Powerline Rd, Oakland Park / Fort Lauderdale, FL 33309. Presupuesto sin compromiso.",
  alternates: {
    canonical: "https://nano-signs.com/es/ubicaciones/fort-lauderdale",
    languages: {
      es: "https://nano-signs.com/es/ubicaciones/fort-lauderdale",
      en: "https://nano-signs.com/locations/fort-lauderdale",
      "x-default": "https://nano-signs.com/locations/fort-lauderdale",
    },
  },
  openGraph: {
    title: "Nano Signs Fort Lauderdale & Oakland Park | Letreros e Imprenta Comercial",
    description:
      "Taller físico en 4567 Powerline Rd. Atención personalizada en español para negocios de Fort Lauderdale y el condado de Broward.",
    url: "https://nano-signs.com/es/ubicaciones/fort-lauderdale",
    siteName: "Nano Signs",
    locale: "es_US",
    type: "website",
  },
};

export default function FortLauderdaleSpanishLocationPage() {
  const locationData = LOCATIONS_REGISTRY["fort-lauderdale"];

  const singleLocalBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Nano Signs",
    alternateName: "Nano Signs Fort Lauderdale & Oakland Park",
    category: "Sign Shop",
    description:
      "Fábrica y taller de letreros comerciales, letras dimensionales, banners vinílicos, rótulos de neón y pantallas LED en Fort Lauderdale y Oakland Park FL.",
    image: "https://nano-signs.com/images/hero-image.webp",
    "@id": "https://nano-signs.com/es/ubicaciones/fort-lauderdale",
    url: "https://nano-signs.com/es/ubicaciones/fort-lauderdale",
    telephone: "(305) 967-1005",
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
      {
        "@type": "ListItem",
        position: 2,
        name: "Ubicaciones",
        item: "https://nano-signs.com/es",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Fort Lauderdale & Oakland Park",
        item: "https://nano-signs.com/es/ubicaciones/fort-lauderdale",
      },
    ],
  };

  const spanishServices = [
    { name: "Letreros de Fachada y Edificios", href: "/es/letreros-comerciales" },
    { name: "Letras Tridimensionales (Channel Letters)", href: "/es/letreros-comerciales" },
    { name: "Banners Vinílicos Gran Formato", href: "/es/banners-y-pancartas" },
    { name: "Exhibidores Retráctiles Roll-Up", href: "/es/banners-y-pancartas" },
    { name: "Banderas Publicitarias Feather", href: "/es/banners-y-pancartas" },
    { name: "Pantallas LED Programables WiFi", href: "/es/letreros-led-y-neon" },
    { name: "Letreros de Neón Personalizados", href: "/es/letreros-led-y-neon" },
    { name: "Rotulación de Vehículos y Magnéticos", href: "/es/cotizacion" },
    { name: "Letreros para Jardín (Yard Signs)", href: "/es/cotizacion" },
    { name: "Tarjetas y Material Promocional", href: "/es/cotizacion" },
  ];

  const spanishFaqs = [
    {
      q: "¿Dónde está ubicado exactamente su taller de letreros?",
      a: "Estamos convenientemente ubicados en 4567 Powerline Rd (también conocida en el mapa como 4567 NW 9th Ave), en el límite entre Oakland Park y Fort Lauderdale, FL 33309. Puede visitarnos de lunes a viernes de 9:00 AM a 6:00 PM.",
    },
    {
      q: "¿Qué ciudades y áreas de South Florida atienden?",
      a: "Servimos a todo el condado de Broward (Fort Lauderdale, Oakland Park, Pompano Beach, Wilton Manors, Coral Springs, Hollywood, Sunrise, Davie) y condados vecinos como Palm Beach y Miami-Dade.",
    },
    {
      q: "¿Ofrecen cotizaciones y asesoría en persona?",
      a: "¡Sí! Puede traer sus medidas o visitarnos para ver nuestra sala de muestras con acrílicos, metales compuestos, lonas vinílicas y letras luminosas reales.",
    },
    {
      q: "¿Tienen servicio de instalación con permisos?",
      a: "Sí, nuestro equipo cuenta con personal calificado, grúas y seguros para gestionar planos ante la ciudad e instalar su letrero de manera segura.",
    },
  ];

  return (
    <main className="min-h-screen bg-white font-opensans">
      <SpanishHeader />

      {/* Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(singleLocalBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Hero Section matching English location structure */}
      <section
        className="w-full py-20 md:py-24 text-center px-4"
        style={{
          background: "linear-gradient(135deg, #0d0d1a 0%, #1a0a2f 50%, #00222a 100%)",
        }}
      >
        <div className="max-w-4xl mx-auto">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-[#ff2d78]/20 text-[#ff2d78] mb-4 uppercase tracking-widest border border-[#ff2d78]/30 font-poppins">
            Nano Signs — Fort Lauderdale &amp; Oakland Park, FL
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-4 font-poppins">
            Fábrica de Letreros Comerciales e Imprenta en Fort Lauderdale
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8 font-opensans leading-relaxed">
            Señalización de alta visibilidad, channel letters 3D, lonas vinílicas y pantallas LED construidas localmente con atención 100% en español.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="#cotizacion"
              className="inline-block px-8 py-4 bg-[#ff2d78] text-white font-black uppercase tracking-wider rounded-xl shadow-lg transition-all duration-300 hover:bg-white hover:text-[#ff2d78] font-poppins text-sm"
            >
              Pedir Cotización Gratis
            </a>
            <a
              href="tel:3059671005"
              className="inline-block px-8 py-4 bg-white/10 border border-white/20 text-white font-black uppercase tracking-wider rounded-xl transition-all duration-300 hover:bg-white hover:text-slate-900 font-poppins text-sm"
            >
              Llamar al (305) 967-1005
            </a>
          </div>
        </div>
      </section>

      {/* Body Content */}
      <section className="py-14 px-4 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left Column: Services & Showroom Info */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 font-poppins text-slate-900">
              Servicios de Señalización e Imprenta en Broward
            </h2>
            <div className="text-gray-700 text-base leading-relaxed space-y-4 mb-8">
              <p>
                En <strong>Nano Signs</strong> transformamos la imagen de su comercio con rótulos llamativos y resistentes. Somos fabricantes directos, lo que significa que usted obtiene mejores precios, control de calidad garantizado y entregas puntuales sin sobrecostos de intermediarios.
              </p>
              <p>
                Ya sea que necesite renovar la fachada de su restaurante, instalar un letrero luminoso en una plaza comercial o imprimir cientos de banners para un evento de fin de semana, nuestro equipo en Fort Lauderdale está listo para ayudarle.
              </p>
            </div>

            <h3 className="text-xl font-bold mb-4 font-poppins text-slate-900">
              Nuestros Productos y Especialidades:
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-8">
              {spanishServices.map((s, index) => (
                <li key={index}>
                  <Link
                    href={s.href}
                    className="flex items-center gap-2 text-gray-800 hover:text-[#ff2d78] transition-colors text-sm font-semibold"
                  >
                    <span className="text-[#ff2d78] font-bold">✓</span>
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Verified Address & Dual Street Name Card */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-2xs">
              <h3 className="font-bold text-lg mb-3 font-poppins text-slate-900">
                📍 Taller Físico y Sala de Muestras
              </h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                <strong>Nano Signs</strong><br />
                4567 Powerline Rd (4567 NW 9th Ave)<br />
                Oakland Park / Fort Lauderdale, FL 33309<br /><br />
                <strong>Horario de Atención:</strong> Lunes a Viernes: 9:00 AM – 6:00 PM<br />
                <strong>Teléfono Directo:</strong>{" "}
                <a href="tel:3059671005" className="text-[#ff2d78] font-bold hover:underline">
                  (305) 967-1005
                </a>
              </p>
            </div>
          </div>

          {/* Right Column: FAQ */}
          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 shadow-sm">
            <h3 className="text-2xl font-black uppercase tracking-wide mb-6 border-b pb-4 font-poppins text-slate-900">
              Preguntas Frecuentes
            </h3>
            <div className="space-y-6">
              {spanishFaqs.map((faq, index) => (
                <div key={index} className="border-b border-gray-200 pb-5 last:border-0 last:pb-0">
                  <h4 className="font-bold text-base mb-2 text-slate-800">{faq.q}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Google Maps Location */}
      <section className="pb-14 max-w-6xl mx-auto px-4">
        <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-lg h-80 w-full">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d7160.8801455159755!2d-80.15735434976504!3d26.182359067699164!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e0!4m0!4m5!1s0x88d903da421a5ec5%3A0xdd627ecbac01c685!2s4567%20Powerline%20Rd%2C%20Fort%20Lauderdale%2C%20FL%2033309!3m2!1d26.1835062!2d-80.1554943!5e0!3m2!1sen!2sus!4v1781380571760!5m2!1sen!2sus"
            width="100%"
            height="100%"
            className="border-0"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Nano Signs Fort Lauderdale Location"
          />
        </div>
      </section>

      {/* Quote Form Section */}
      <section id="cotizacion" className="py-14 md:py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-10">
            <span className="text-[#ff2d78] font-bold text-xs uppercase tracking-wider">
              Atención Local en Fort Lauderdale
            </span>
            <h2 className="text-2xl sm:text-3xl font-black font-poppins text-slate-900 mt-1">
              Solicite Su Presupuesto Rápido
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Indíquenos las medidas aproximadas o el tipo de letrero que busca.
            </p>
          </div>
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-sm">
            <SpanishQuoteForm />
          </div>
        </div>
      </section>

      <SpanishFooter />
    </main>
  );
}
