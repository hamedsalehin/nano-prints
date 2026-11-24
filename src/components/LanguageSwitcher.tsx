"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe } from "lucide-react";

/**
 * Bidirectional mapping between English routes and their Spanish equivalents.
 */
const EN_TO_ES_MAP: Record<string, string> = {
  "/": "/es",
  "/get-a-quote": "/es/cotizacion",
  "/custom-signs": "/es/letreros-comerciales",
  "/custom-banners": "/es/banners-y-pancartas",
  "/led-display-signs": "/es/letreros-led-y-neon",
  "/neon-signs": "/es/letreros-de-neon",
  "/locations/fort-lauderdale": "/es/ubicaciones/fort-lauderdale",
};

const ES_TO_EN_MAP: Record<string, string> = {
  "/es": "/",
  "/es/cotizacion": "/get-a-quote",
  "/es/letreros-comerciales": "/custom-signs",
  "/es/banners-y-pancartas": "/custom-banners",
  "/es/letreros-led-y-neon": "/led-display-signs",
  "/es/letreros-de-neon": "/neon-signs",
  "/es/ubicaciones/fort-lauderdale": "/locations/fort-lauderdale",
};

interface LanguageSwitcherProps {
  /**
   * "pill" - pill badge style (e.g. EN | ES)
   * "minimal" - subtle text links
   * "dark" - for dark backgrounds (Spanish header utility bar)
   */
  variant?: "pill" | "minimal" | "dark";
  className?: string;
}

export function LanguageSwitcher({ variant = "pill", className = "" }: LanguageSwitcherProps) {
  const pathname = usePathname() || "/";

  // Determine current active language
  const isSpanish = pathname === "/es" || pathname.startsWith("/es/");
  const activeLang: "en" | "es" = isSpanish ? "es" : "en";

  // Compute destination URLs using 1:1 route mapping with fallbacks
  let targetEs = "/es";
  let targetEn = "/";

  if (isSpanish) {
    targetEs = pathname;
    targetEn = ES_TO_EN_MAP[pathname] || "/";
  } else {
    targetEn = pathname;
    targetEs = EN_TO_ES_MAP[pathname] || "/es";
  }

  // Styles based on variant
  if (variant === "dark") {
    return (
      <div
        className={`inline-flex items-center gap-1 bg-slate-800/90 border border-slate-700 rounded-full px-2 py-0.5 text-xs font-semibold ${className}`}
        role="group"
        aria-label="Selector de idioma / Language Switcher"
      >
        <Globe className="w-3 h-3 text-slate-400" aria-hidden="true" />
        <Link
          href={targetEn}
          hrefLang="en"
          lang="en"
          aria-label="Switch to English"
          aria-current={activeLang === "en" ? "true" : undefined}
          className={`px-1.5 py-0.5 rounded-full transition-colors ${
            activeLang === "en"
              ? "bg-primary text-white font-bold"
              : "text-slate-300 hover:text-white"
          }`}
        >
          EN
        </Link>
        <span className="text-slate-600 text-[10px]">|</span>
        <Link
          href={targetEs}
          hrefLang="es"
          lang="es"
          aria-label="Cambiar a Español"
          aria-current={activeLang === "es" ? "true" : undefined}
          className={`px-1.5 py-0.5 rounded-full transition-colors ${
            activeLang === "es"
              ? "bg-primary text-white font-bold"
              : "text-slate-300 hover:text-white"
          }`}
        >
          ES
        </Link>
      </div>
    );
  }

  return (
    <div
      className={`inline-flex items-center gap-1 bg-gray-100 hover:bg-gray-200/80 border border-gray-200/80 rounded-full p-0.5 text-xs font-semibold transition-colors ${className}`}
      role="group"
      aria-label="Language selector"
    >
      <Globe className="w-3.5 h-3.5 text-gray-400 ml-1.5 hidden sm:inline" aria-hidden="true" />
      <Link
        href={targetEn}
        hrefLang="en"
        lang="en"
        aria-label="Switch to English"
        aria-current={activeLang === "en" ? "true" : undefined}
        className={`px-2 py-0.5 rounded-full transition-all text-[11px] sm:text-xs ${
          activeLang === "en"
            ? "bg-white text-gray-900 font-bold shadow-xs border border-gray-200/60"
            : "text-gray-600 hover:text-gray-900"
        }`}
      >
        EN
      </Link>
      <span className="text-gray-300 text-[10px]">|</span>
      <Link
        href={targetEs}
        hrefLang="es"
        lang="es"
        aria-label="Cambiar a Español"
        aria-current={activeLang === "es" ? "true" : undefined}
        className={`px-2 py-0.5 rounded-full transition-all text-[11px] sm:text-xs ${
          activeLang === "es"
            ? "bg-gradient-to-r from-[#ff2d78] to-[#00e5ff] text-white font-bold shadow-xs"
            : "text-gray-600 hover:text-[#ff2d78]"
        }`}
      >
        ES
      </Link>
    </div>
  );
}

export default LanguageSwitcher;
