import Link from "next/link";
import Image from "next/image";
import { Phone, MessageSquare, MapPin } from "lucide-react";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function SpanishHeader() {
  return (
    <header className="w-full bg-white border-b border-pink-100 shadow-sm sticky top-0 z-50">
      {/* Top utility notification bar */}
      <div className="bg-slate-900 text-white text-xs py-1.5 px-4 font-poppins">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-semibold text-pink-300">¡Hablamos Español!</span>
            <span className="hidden sm:inline text-slate-300">Taller directo en Fort Lauderdale / Oakland Park, FL</span>
          </div>
          <div className="flex items-center gap-4 text-slate-200">
            <Link href="/es/ubicaciones/fort-lauderdale" className="hover:text-pink-300 transition-colors flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-pink-400" />
              <span className="hidden md:inline">4567 Powerline Rd</span>
            </Link>
            <a href="tel:305-967-1005" className="hover:text-pink-300 transition-colors font-bold text-white flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-emerald-400" />
              (305) 967-1005
            </a>
            <LanguageSwitcher variant="dark" />
          </div>
        </div>
      </div>

      {/* Main logo and actions bar */}
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between gap-4">
        <Link href="/es" className="flex-shrink-0 flex items-center gap-2">
          <Image
            src="/images/nano logo complete.webp"
            alt="Nano Signs - Letreros e Impresión Comercial Fort Lauderdale"
            width={170}
            height={60}
            className="h-10 md:h-12 w-auto object-contain"
            priority
            unoptimized
          />
        </Link>

        {/* Desktop Quick Nav */}
        <nav className="hidden lg:flex items-center gap-6 font-poppins text-sm font-bold text-slate-800">
          <Link href="/es/letreros-comerciales" className="hover:text-[#ff2d78] transition-colors">
            Letreros Comerciales
          </Link>
          <Link href="/es/banners-y-pancartas" className="hover:text-[#ff2d78] transition-colors">
            Banners & Roll-Ups
          </Link>
          <Link href="/es/letreros-led-y-neon" className="hover:text-[#ff2d78] transition-colors">
            Pantallas LED
          </Link>
          <Link href="/es/letreros-de-neon" className="hover:text-[#ff2d78] transition-colors">
            Neón Personalizado
          </Link>
          <Link href="/es/ubicaciones/fort-lauderdale" className="hover:text-[#ff2d78] transition-colors">
            Ubicación / Taller
          </Link>
        </nav>

        {/* Action CTAs */}
        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href="tel:305-967-1005"
            className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-white font-bold text-xs sm:text-sm bg-emerald-600 hover:bg-emerald-700 transition-all shadow-sm"
          >
            <Phone className="w-3.5 h-3.5 fill-current" />
            <span>Llamar</span>
          </a>
          <Link
            href="/es/cotizacion"
            className="flex items-center gap-1.5 px-3.5 py-1.5 sm:px-5 sm:py-2 rounded-full text-white font-bold text-xs sm:text-sm brand-gradient shadow-md hover:opacity-95 transition-all"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Cotizar Gratis</span>
          </Link>
          <LanguageSwitcher className="lg:hidden" />
        </div>
      </div>

      {/* Mobile Horizontal Subnav */}
      <div className="lg:hidden border-t border-slate-100 bg-slate-50 px-4 py-2 overflow-x-auto whitespace-nowrap hide-scrollbar flex items-center gap-4 text-xs font-bold text-slate-700">
        <Link href="/es" className="hover:text-[#ff2d78]">Inicio</Link>
        <Link href="/es/letreros-comerciales" className="hover:text-[#ff2d78]">Letreros Comerciales</Link>
        <Link href="/es/banners-y-pancartas" className="hover:text-[#ff2d78]">Banners & Roll-Up</Link>
        <Link href="/es/letreros-led-y-neon" className="hover:text-[#ff2d78]">Pantallas LED</Link>
        <Link href="/es/letreros-de-neon" className="hover:text-[#ff2d78]">Neón</Link>
        <Link href="/es/ubicaciones/fort-lauderdale" className="hover:text-[#ff2d78]">Fort Lauderdale</Link>
      </div>
    </header>
  );
}

export function SpanishFooter() {
  return (
    <footer className="bg-slate-950 text-slate-300 font-opensans border-t border-slate-800 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
        {/* Col 1: About */}
        <div>
          <div className="mb-4">
            <Image
              src="/images/nano logo complete.webp"
              alt="Nano Signs"
              width={160}
              height={50}
              className="h-9 w-auto brightness-200 contrast-125"
              unoptimized
            />
          </div>
          <p className="text-sm text-slate-400 mb-4 leading-relaxed">
            Fabricante líder de letreros comerciales, banners vinílicos, pantallas LED y neón en Fort Lauderdale y Oakland Park, FL. Atención 100% en español.
          </p>
          <div className="text-xs text-slate-400 space-y-1">
            <p className="font-semibold text-slate-200">Licencia & Seguro en Florida</p>
            <p>Fabricación directa en taller propio sin intermediarios.</p>
          </div>
        </div>

        {/* Col 2: Servicios principales */}
        <div>
          <h4 className="text-white font-poppins font-bold text-base mb-3">Productos & Letreros</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/es/letreros-comerciales" className="hover:text-pink-400 transition-colors">Letreros Comerciales y Fachadas</Link></li>
            <li><Link href="/es/banners-y-pancartas" className="hover:text-pink-400 transition-colors">Banners y Lonas Vinílicas</Link></li>
            <li><Link href="/es/banners-y-pancartas" className="hover:text-pink-400 transition-colors">Banners Retráctiles (Roll-Up)</Link></li>
            <li><Link href="/es/letreros-led-y-neon" className="hover:text-pink-400 transition-colors">Letreros LED Programables</Link></li>
            <li><Link href="/es/letreros-de-neon" className="hover:text-pink-400 transition-colors">Neón LED Personalizado</Link></li>
            <li><Link href="/es/cotizacion" className="hover:text-pink-400 transition-colors">Solicitud de Presupuesto Rápido</Link></li>
          </ul>
        </div>

        {/* Col 3: Zonas de Cobertura */}
        <div>
          <h4 className="text-white font-poppins font-bold text-base mb-3">Área de Servicio</h4>
          <ul className="space-y-2 text-sm text-slate-400">
            <li><strong className="text-slate-200">Fort Lauderdale</strong> (Sede Principal Comercial)</li>
            <li><strong className="text-slate-200">Oakland Park</strong> (Taller de Fabricación)</li>
            <li>Pompano Beach & Deerfield Beach</li>
            <li>Hollywood, Davie & Plantation</li>
            <li>Coral Springs & Sunrise</li>
            <li>Todo el Condado de Broward y Sur de la Florida</li>
          </ul>
        </div>

        {/* Col 4: Contacto */}
        <div>
          <h4 className="text-white font-poppins font-bold text-base mb-3">Taller y Contacto</h4>
          <div className="space-y-3 text-sm">
            <p className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-pink-400 flex-shrink-0 mt-0.5" />
              <span>4567 Powerline Rd (4567 NW 9th Ave), Oakland Park / Fort Lauderdale, FL 33309</span>
            </p>
            <p className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <a href="tel:305-967-1005" className="hover:text-white font-bold text-white text-base">(305) 967-1005</a>
            </p>
            <p className="text-xs text-slate-400">
              Lunes a Viernes: 9:00 AM – 6:00 PM<br />
              Entregas y envíos en 24 a 48 horas disponibles.
            </p>
            <div className="pt-2">
              <Link
                href="/es/cotizacion"
                className="inline-block px-4 py-2 rounded-lg bg-pink-600 hover:bg-pink-700 text-white font-bold text-xs uppercase tracking-wider"
              >
                Pedir Cotización en Español
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-6 border-t border-slate-800 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>© {new Date().getFullYear()} Nano Signs. Todos los derechos reservados. Letreros e impresión comercial en Florida.</p>
        <div className="flex gap-4">
          <Link href="/" className="hover:text-slate-300">English Site</Link>
          <Link href="/es" className="hover:text-slate-300">Español</Link>
          <Link href="/return-policy" className="hover:text-slate-300">Términos y Devoluciones</Link>
        </div>
      </div>
    </footer>
  );
}
