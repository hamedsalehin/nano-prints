/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ["*.preview.same-app.com"],
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react'],
  },
  images: {
    domains: [
      "source.unsplash.com",
      "images.unsplash.com",
      "ext.same-assets.com",
      "ugc.same-assets.com",
      "wpbfwgwxxcplaclkdbzi.supabase.co",
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "source.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ext.same-assets.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ugc.same-assets.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "wpbfwgwxxcplaclkdbzi.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/signs",
        destination: "/custom-signs",
        permanent: true,
      },
      {
        source: "/banners",
        destination: "/custom-banners",
        permanent: true,
      },
      {
        source: "/flags",
        destination: "/custom-flags",
        permanent: true,
      },
      {
        source: "/tradeshow",
        destination: "/trade-show",
        permanent: true,
      },
      {
        source: "/stickers-decals",
        destination: "/custom-decals",
        permanent: true,
      },
      {
        source: "/sign-holders",
        destination: "/sign-accessories",
        permanent: true,
      },
      {
        source: "/signs/:path*",
        destination: "/custom-signs/:path*",
        permanent: true,
      },
      {
        source: "/banners/:path*",
        destination: "/custom-banners/:path*",
        permanent: true,
      },
      {
        source: "/led-signs-for-sale",
        destination: "/led-display-signs",
        permanent: true,
      },
      // Legacy URL seen in GSC — /contactus/ (without hyphen)
      {
        source: "/contactus",
        destination: "/contact-us",
        permanent: true,
      },
      {
        source: "/contactus/",
        destination: "/contact-us",
        permanent: true,
      },
      // Trailing-slash variant seen in GSC
      {
        source: "/led-signs-for-sale/",
        destination: "/led-display-signs",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;

