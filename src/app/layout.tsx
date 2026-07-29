import type { Metadata, Viewport } from "next";
import { Open_Sans, Poppins } from "next/font/google";
import "./globals.css";
import { ClientBody } from "./ClientBody";
import Script from "next/script";

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-open-sans",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#ff2d78",
};

export const metadata: Metadata = {
  title: "Custom LED Signs , Neon Sign Fort Lauderdale FL | Nano Signs",
  description:
    "Oakland Park & Fort Lauderdale's #1 sign & print shop. Custom signs, banner printing, LED display signs & custom neon signs. Same-day quotes. Call 305-967-1005.",
  icons: {
    icon: "/images/nano logo O.png",
    apple: "/images/nano logo O.png",
  },
  metadataBase: new URL("https://nano-signs.com"),
  alternates: {
    canonical: "https://nano-signs.com/",
  },
  openGraph: {
    title: "Custom LED Signs , Neon Sign Fort Lauderdale FL | Nano Signs",
    description: "Oakland Park & Fort Lauderdale's #1 sign & print shop. Custom signs, banner printing, LED display signs & custom neon signs. Same-day quotes. Call 305-967-1005.",
    url: "https://nano-signs.com/",
    siteName: "Nano Signs",
    images: [
      {
        url: "https://nano-signs.com/images/nano%20logo%20complete.png",
        width: 1200,
        height: 630,
        alt: "Nano Signs - Custom Printing & Signage",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom LED Signs , Neon Sign Fort Lauderdale FL | Nano Signs",
    description: "Oakland Park & Fort Lauderdale's #1 sign & print shop. Custom signs, banner printing, LED display signs & custom neon signs. Same-day quotes. Call 305-967-1005.",
    images: [
      "https://nano-signs.com/images/nano%20logo%20complete.png",
    ],
  },
};


type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({
  children,
}: RootLayoutProps) {
  return (
    <html lang="en" className={openSans.variable + " " + poppins.variable}>
      <head>
        {/* Preconnect to external asset CDN — saves 300ms per PageSpeed */}
        <link rel="preconnect" href="https://ext.same-assets.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://ext.same-assets.com" />
        {/* Preload the LCP hero image — must match src in HeroSection exactly */}
        <link
          rel="preload"
          as="image"
          href="/images/hero-image.webp"
          fetchPriority="high"
        />
        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-8N8L6WV8RE"
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-8N8L6WV8RE');
          `}
        </Script>
        {/* Local Business Schema Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": ["LocalBusiness", "PrintShop"],
              "name": "Nano Signs",
              "alternateName": "Nano Signs & Printing",
              "description": "Fort Lauderdale's premier sign company and print shop. We specialize in custom signs, banners, LED displays, neon signs, vehicle wraps, and marketing materials for businesses across Broward County and Fort Lauderdale FL.",
              "image": "https://nano-signs.com/images/nano%20logo%20complete.png",
              "logo": "https://nano-signs.com/images/nano%20logo%20complete.png",
              "@id": "https://nano-signs.com/#localbusiness",
              "url": "https://nano-signs.com",
              "telephone": "305-967-1005",
              "email": "info@nano-signs.com",
              "priceRange": "$$",
              "currenciesAccepted": "USD",
              "paymentAccepted": "Cash, Credit Card, Check",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "4567 Powerline Rd",
                "addressLocality": "Fort Lauderdale",
                "addressRegion": "FL",
                "postalCode": "33309",
                "addressCountry": "US"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 26.1835062,
                "longitude": -80.1554943
              },
              "hasMap": "https://maps.google.com/?q=Nano+Signs+4567+Powerline+Rd+Fort+Lauderdale+FL+33309",
              "areaServed": [
                {"@type": "City", "name": "Fort Lauderdale & Oakland Park", "addressRegion": "FL"},
                {"@type": "City", "name": "Fort Lauderdale & Oakland Park", "addressRegion": "FL"},
                {"@type": "City", "name": "Pompano Beach", "addressRegion": "FL"},
                {"@type": "City", "name": "Deerfield Beach", "addressRegion": "FL"},
                {"@type": "City", "name": "Hollywood", "addressRegion": "FL"},
                {"@type": "County", "name": "Broward County", "addressRegion": "FL"}
              ],
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday"],
                  "opens": "09:00",
                  "closes": "18:00"
                }
              ],
              "sameAs": [
                "https://www.facebook.com/nanosigns",
                "https://nano-signs.com"
              ],
              "knowsAbout": [
                "Custom Signs",
                "Banners",
                "LED Signs",
                "Neon Signs",
                "Vehicle Wraps",
                "Banner Printing Fort Lauderdale",
                "Sign Company Fort Lauderdale",
                "Print Shop Fort Lauderdale FL"
              ]
            })
          }}
        />
              <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `(function(c,l,a,r,i,t,y){
  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "xn5oqaysht");`,
          }}
        ></script>
      </head>
      <ClientBody>{children}</ClientBody>
    </html>
  );
}
