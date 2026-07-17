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
  title: "Order Custom Signs, Banners & LED Signage | Nano Signs",
  description:
    "Order custom signs, LED signage, banners & marketing materials in Fort Lauderdale FL. Fastest turnaround in Broward County.",
  icons: {
    icon: "/images/nano logo O.png",
    apple: "/images/nano logo O.png",
  },
  alternates: {
    canonical: "https://nano-signs.com",
  },
  openGraph: {
    title: "Custom Signs, Banners & LED Signage | Nano Signs",
    description: "Order custom signs, LED signage, banners & marketing materials in Fort Lauderdale FL. Fastest turnaround in Broward County.",
    url: "https://nano-signs.com",
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
    title: "Custom Signs, Banners & LED Signage | Nano Signs",
    description: "Order custom signs, LED signage, banners & marketing materials in Fort Lauderdale FL. Fastest turnaround in Broward County.",
    images: [
      "https://nano-signs.com/images/nano%20logo%20complete.png",
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${openSans.variable} ${poppins.variable}`}>
      <head>
        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-FJ30HE8KYQ"
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-FJ30HE8KYQ');
          `}
        </Script>
        {/* Local Business Schema Markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Nano Signs",
              "image": "https://nano-signs.com/images/nano%20logo%20complete.png",
              "@id": "https://nano-signs.com/#localbusiness",
              "url": "https://nano-signs.com",
              "telephone": "305-967-1005",
              "priceRange": "$$",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "4567 Powerline Rd",
                "addressLocality": "Oakland Park",
                "addressRegion": "FL",
                "postalCode": "33309",
                "addressCountry": "US"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 26.1835062,
                "longitude": -80.1554943
              },
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday"
                ],
                "opens": "09:00",
                "closes": "18:00"
              }
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
