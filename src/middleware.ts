import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Permanent (301) redirects for legacy or restructured URLs identified in Google Search Console
const LEGACY_REDIRECTS: Record<string, string> = {
  "/led-signs-for-sale": "/led-display-signs",
  "/programmable-led-signs": "/led-display-signs/programmable-led-sign",
  "/custom-signs/programmable-led-sign": "/led-display-signs/programmable-led-sign",
  "/custom-signs/lawn-bag-signs": "/custom-signs",
  "/trade-show/business-cards": "/marketing-materials/business-cards",
  "/trade-show/roll-up-banners": "/custom-banners/roll-up-banners",
  "/programmable-led-signs/sphere-led-display": "/led-display-signs/sphere-led-display",
  "/programmable-led-signs/shop-window-led-display": "/led-display-signs/shop-window-led-display",
  "/programmable-led-signs/flexible-led-display": "/led-display-signs/flexible-led-display",
  "/programmable-led-signs/mobile-truck-led-display": "/led-display-signs/mobile-truck-led-display",
};

/**
 * Middleware — runs on the Edge before any page renders.
 */
export function middleware(request: NextRequest) {
  const { pathname, search, host } = request.nextUrl;

  // 1. Enforce canonical domain (WWW to non-WWW 301 Permanent Redirect)
  if (host.startsWith("www.")) {
    const targetUrl = `https://nano-signs.com${pathname}${search}`;
    return NextResponse.redirect(targetUrl, 301);
  }

  // 2. Trailing slash normalization (strip trailing slash except for root "/")
  if (pathname.length > 1 && pathname.endsWith("/")) {
    const cleanPath = pathname.slice(0, -1);
    const targetUrl = new URL(`${cleanPath}${search}`, request.url);
    return NextResponse.redirect(targetUrl, 301);
  }

  // 3. Handle legacy URL redirects
  if (LEGACY_REDIRECTS[pathname]) {
    const targetUrl = new URL(`${LEGACY_REDIRECTS[pathname]}${search}`, request.url);
    return NextResponse.redirect(targetUrl, 301);
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
