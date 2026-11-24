import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Permanent (308/301) redirects for legacy or restructured URLs identified in Google Search Console
const LEGACY_REDIRECTS: Record<string, string> = {
  // Overlapping locations service URLs redirected to primary canonical category/product routes
  "/locations/roll-up-banners": "/custom-banners/roll-up-banners",
  "/locations/roll-up-banners/": "/custom-banners/roll-up-banners",
  "/locations/sign-shop": "/locations/fort-lauderdale",
  "/locations/sign-shop/": "/locations/fort-lauderdale",
  "/locations/neon-led-signs": "/neon-signs",
  "/locations/neon-led-signs/": "/neon-signs",
  "/locations/programmable-led-signs": "/led-display-signs/programmable-led-sign",
  "/locations/programmable-led-signs/": "/led-display-signs/programmable-led-sign",

  // Legacy trade-show / product duplicate redirects
  "/trade-show/roll-up-banners": "/custom-banners/roll-up-banners",
  "/trade-show/roll-up-banners/": "/custom-banners/roll-up-banners",
  "/trade-show/retractable-banner": "/custom-banners/roll-up-banners",
  "/trade-show/retractable-banner/": "/custom-banners/roll-up-banners",
  "/trade-show/business-cards": "/marketing-materials/business-cards",
  "/trade-show/business-cards/": "/marketing-materials/business-cards",

  // Legacy programmable LED signs paths
  "/led-signs-for-sale": "/led-display-signs",
  "/led-signs-for-sale/": "/led-display-signs",
  "/programmable-led-signs": "/led-display-signs/programmable-led-sign",
  "/programmable-led-signs/": "/led-display-signs/programmable-led-sign",
  "/custom-signs/programmable-led-sign": "/led-display-signs/programmable-led-sign",
  "/custom-signs/programmable-led-sign/": "/led-display-signs/programmable-led-sign",
  "/programmable-led-signs/sphere-led-display": "/led-display-signs/sphere-led-display",
  "/programmable-led-signs/shop-window-led-display": "/led-display-signs/shop-window-led-display",
  "/programmable-led-signs/flexible-led-display": "/led-display-signs/flexible-led-display",
  "/programmable-led-signs/mobile-truck-led-display": "/led-display-signs/mobile-truck-led-display",

  // Miscellaneous legacy URLs
  "/about-nano-signs-neon-led-custom-signs-roll-up-signs": "/about-us",
  "/about-nano-signs-neon-led-custom-signs-roll-up-signs/": "/about-us",
  "/custom-signs/lawn-bag-signs": "/custom-signs",
  "/custom-signs/lawn-bag-signs/": "/custom-signs",
};

/**
 * Middleware — runs on the Edge before any page renders.
 */
export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // 1. Resolve host and protocol robustly across Hostinger / reverse-proxy environments
  const hostHeader = request.headers.get("x-forwarded-host") || request.headers.get("host") || request.nextUrl.host || "";
  const host = hostHeader.split(":")[0].toLowerCase();

  const forwardedProto = request.headers.get("x-forwarded-proto");
  const isHttp = forwardedProto === "http" || (!forwardedProto && request.nextUrl.protocol === "http:");
  const isWww = host.startsWith("www.");
  const isLocalhost = host === "localhost" || host === "127.0.0.1" || host.startsWith("192.168.") || host.startsWith("10.");

  // If incoming request arrives over HTTP or on a www subdomain, enforce canonical HTTPS non-www (skip on local dev)
  if (!isLocalhost && (isHttp || isWww)) {
    const cleanHost = host.replace(/^www\./, "");
    const targetHost = cleanHost.includes("nano-signs.com") ? "nano-signs.com" : (cleanHost || "nano-signs.com");
    const targetUrl = `https://${targetHost}${pathname}${search}`;
    return NextResponse.redirect(targetUrl, 308);
  }

  // 2. Trailing slash normalization (strip trailing slash except for root "/")
  if (pathname.length > 1 && pathname.endsWith("/")) {
    const cleanPath = pathname.slice(0, -1);
    const targetUrl = new URL(`${cleanPath}${search}`, request.url);
    return NextResponse.redirect(targetUrl, 308);
  }

  // 3. Handle legacy URL redirects
  if (LEGACY_REDIRECTS[pathname]) {
    const targetUrl = new URL(`${LEGACY_REDIRECTS[pathname]}${search}`, request.url);
    return NextResponse.redirect(targetUrl, 308);
  }

  // 4. Block indexing of all PrintDesignExperience pages
  if (pathname.startsWith("/PrintDesignExperience")) {
    const response = NextResponse.next();
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
