import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { SpanishHeader, SpanishFooter } from "@/components/SpanishHeaderFooter";
import SpanishQuoteForm from "@/components/SpanishQuoteForm";
import {
  Clock,
  ShieldCheck,
  CheckCircle2,
  Phone,
  MessageSquare,
  MapPin,
  Lock,
  Award,
  Sparkles,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Cotización Gratis de Letreros e Impresión Comercial | Nano Signs",
  description:
    "Presupuesto rápido para letreros comerciales de fachada, banners de vinil, roll-up stands, letreros LED y neón en Fort Lauderdale. Respuesta en 4 horas.",
  alternates: {
    canonical: "https://nano-signs.com/es/cotizacion",
    languages: {
      es: "https://nano-signs.com/es/cotizacion",
      en: "https://nano-signs.com/get-a-quote",
      "x-default": "https://nano-signs.com/get-a-quote",
    },
  },
  openGraph: {
    title: "Cotización de Letreros en Fort Lauderdale | Nano Signs",
    description:
      "Precios directos de fábrica sin intermediarios en Fort Lauderdale y Oakland Park, FL. Suba su diseño o medidas.",
    url: "https://nano-signs.com/es/cotizacion",
    siteName: "Nano Signs",
    locale: "es_US",
    type: "website",
  },
};

export default function CotizacionSpanishPage() {
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
        name: "Cotización",
        item: "https://nano-signs.com/es/cotizacion",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <SpanishHeader />

      <main className="bg-slate-50 min-h-screen py-10 sm:py-14 font-opensans">
        <div className="max-w-6xl mx-auto px-4">
          {/* Header intro */}
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="inline-block bg-pink-500/10 text-[#ff2d78] text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full mb-3 border border-pink-500/20">
              Presupuesto Sin Compromiso • Respuesta en 4 Horas
            </span>
            <h1 className="text-3xl sm:text-4xl font-black font-poppins text-slate-900 tracking-tight">
              Solicite Su Cotización de Letreros
            </h1>
            <p className="text-sm sm:text-base text-slate-600 mt-2.5">
              Complete los detalles de su proyecto y nuestro equipo técnico en Fort Lauderdale le enviará precios detallados y opciones de materiales.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Form Column */}
            <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-10 shadow-lg border border-slate-200/80">
              <SpanishQuoteForm />
            </div>

            {/* Sidebar with Workshop Image & Trust Signals */}
            <div className="lg:col-span-4 space-y-6">
              {/* Showroom visual card */}
              <div className="bg-slate-900 text-white rounded-2xl overflow-hidden border border-slate-800 shadow-md">
                <div className="relative h-44 w-full">
                  <Image
                    src="/images/about/interior_2.webp"
                    alt="Sala de producción de letreros en Oakland Park"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  <span className="absolute bottom-3 left-3 text-white font-poppins font-bold text-xs bg-slate-900/90 px-2.5 py-1 rounded-full border border-slate-700">
                    Taller Físico en Oakland Park
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-poppins font-bold text-white text-base mb-1">
                    ¿Prefiere Hablar Directamente?
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    Nuestro equipo habla español e inglés. Responderemos sus preguntas sobre medidas, iluminación y normativas de ciudad.
                  </p>
                  <a
                    href="tel:305-967-1005"
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition-colors shadow-sm"
                  >
                    <Phone className="w-4 h-4 fill-current" />
                    <span>Llamar al (305) 967-1005</span>
                  </a>
                </div>
              </div>

              {/* Trust Box */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
                <h4 className="font-poppins font-bold text-slate-900 text-sm border-b border-slate-100 pb-2">
                  Garantías de Nano Signs
                </h4>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-slate-900">Respuesta Rápida Garantizada</p>
                    <p className="text-[11px] text-slate-500">Recibirá su propuesta técnica en un máximo de 4 horas hábiles.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-[#ff2d78] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-slate-900">Precios Claros Sin Cargos Ocultos</p>
                    <p className="text-[11px] text-slate-500">Desglose transparente por material, medidas e instalación.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#00e5ff] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold text-slate-900">Retiro Local en Powerline Rd</p>
                    <p className="text-[11px] text-slate-500">4567 Powerline Rd, Fort Lauderdale, FL 33309.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <SpanishFooter />
    </>
  );
}
