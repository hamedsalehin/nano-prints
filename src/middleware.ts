import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Middleware — runs on the Edge before any page renders.
 *
 * Purpose: Prevent search engines from indexing the
 * /PrintDesignExperience/* paths (design studio URLs with query params).
 * These are functional pages, not content pages, and should never
 * appear in search results.
 *
 * The X-Robots-Tag HTTP header is the strongest noindex signal —
 * it works even when JavaScript hasn't run and is respected by all
 * major search engines (Google, Bing, etc.).
 */
export function middleware(request: NextRequest) {
  const { pathname, search, host } = request.nextUrl;

  // 1. Enforce canonical domain (WWW to non-WWW 301 Permanent Redirect)
  if (host.startsWith("www.")) {
    const targetUrl = `https://nano-signs.com${pathname}${search}`;
    return NextResponse.redirect(targetUrl, 301);
  }

  // 2. Block indexing of all PrintDesignExperience pages
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
