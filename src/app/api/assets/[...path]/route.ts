import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  props: { params: Promise<{ path: string[] }> }
) {
  try {
    const params = await props.params;
    const pathSegments = params.path;
    if (!pathSegments || pathSegments.length === 0) {
      return new NextResponse("Bad Request: Missing path segments", { status: 400 });
    }

    const pathString = pathSegments.join("/");

    // Reconstruct the original buildasign URL
    const targetUrl = `https://www.buildasign.com/${pathString}`;

    // Fetch the image from buildasign CDN/server
    const response = await fetch(targetUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
      next: {
        revalidate: 86400, // cache for 1 day in Next.js data cache
      }
    });

    if (!response.ok) {
      console.warn(`Asset proxy failed for: ${targetUrl}. Status: ${response.status}`);
      return new NextResponse("Asset not found", { status: response.status });
    }

    // Get the image buffer and content-type
    const contentType = response.headers.get("content-type") || "image/png";
    const buffer = await response.arrayBuffer();

    // Return the image with proper headers
    return new NextResponse(buffer, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("Asset proxy error:", error);
    return new NextResponse("Error fetching asset", { status: 500 });
  }
}
