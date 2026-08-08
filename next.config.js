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
      // Legacy WooCommerce /product/ URL redirects seen in Bing Webmaster Tools
      {
        source: "/product/digital-display-screen",
        destination: "/led-display-signs/digital-display-screen",
        permanent: true,
      },
      {
        source: "/product/flyer",
        destination: "/marketing-materials/flyers",
        permanent: true,
      },
      {
        source: "/product/full-color-custom-led-sign-board",
        destination: "/led-display-signs",
        permanent: true,
      },
      {
        source: "/product/full-color-electronic-signs",
        destination: "/led-display-signs",
        permanent: true,
      },
      {
        source: "/product/full-color-led-display-screen",
        destination: "/led-display-signs",
        permanent: true,
      },
      {
        source: "/product/led-poster",
        destination: "/led-display-signs",
        permanent: true,
      },
      {
        source: "/product/:slug",
        destination: "/custom-signs",
        permanent: true,
      },
      // Legacy WooCommerce /product-category/ URL redirects
      {
        source: "/product-category/led-products",
        destination: "/led-display-signs",
        permanent: true,
      },
      {
        source: "/product-category/:slug",
        destination: "/:slug",
        permanent: true,
      },
      // Additional legacy WordPress pages seen in Bing Webmaster Tools
      {
        source: "/homepage-2",
        destination: "/",
        permanent: true,
      },
      {
        source: "/about-nano-signs-neon-led-custom-signs-roll-up-signs",
        destination: "/about-us",
        permanent: true,
      },
      {
        source: "/blog-best-signs-in-hollywood-printing",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/product-tag/:path*",
        destination: "/custom-signs",
        permanent: true,
      },
      {
        source: "/category/:path*",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/team-member/:path*",
        destination: "/about-us",
        permanent: true,
      },
      {
        source: "/programmable-led-signs",
        destination: "/locations/programmable-led-signs",
        permanent: true,
      },
      {
        source: "/programmable-led-signs/:path*",
        destination: "/locations/programmable-led-signs",
        permanent: true,
      },
      // Specific 404 URLs found in Bing Webmaster Tools Site Explorer
      {
        source: "/marketing-materials/presentation-folders",
        destination: "/marketing-materials",
        permanent: true,
      },
      {
        source: "/marketing-materials/rack-cards",
        destination: "/marketing-materials",
        permanent: true,
      },
      {
        source: "/category/uncategorized",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/custom-signs/lawn-bag-signs",
        destination: "/custom-signs/plastic-yard-sign",
        permanent: true,
      },
      {
        source: "/custom-signs/bag-yard-signs",
        destination: "/custom-signs/plastic-yard-sign",
        permanent: true,
      },
      {
        source: "/custom-signs/programmable-led-sign",
        destination: "/led-display-signs/programmable-led-sign",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;

