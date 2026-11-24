import React from "react";
import { notFound } from "next/navigation";
import { LOCATIONS_REGISTRY } from "@/lib/locationsRegistry";
import { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Link from "next/link";

interface PageProps {
  params: Promise<{ city: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city } = await params;
  const decodedCity = decodeURIComponent(city);
  const locationData = LOCATIONS_REGISTRY[decodedCity];

  if (!locationData) return {};

  const rawTitle = locationData.metaTitle && locationData.metaTitle.length <= 60
    ? locationData.metaTitle
    : `${locationData.title} | Nano Signs`;
  const title = rawTitle.length <= 60
    ? rawTitle
    : `${locationData.cityName} Signs & Printing | Nano Signs`;

  const alternates: Metadata["alternates"] = {
    canonical: `https://nano-signs.com/locations/${decodedCity}`,
    ...(decodedCity === "fort-lauderdale"
      ? {
          languages: {
            en: "https://nano-signs.com/locations/fort-lauderdale",
            es: "https://nano-signs.com/es/ubicaciones/fort-lauderdale",
            "x-default": "https://nano-signs.com/locations/fort-lauderdale",
          },
        }
      : {}),
  };

  return {
    title,
    description: locationData.description,
    alternates,
    openGraph: {
      title,
      description: locationData.description,
      url: `https://nano-signs.com/locations/${decodedCity}`,
      type: "website",
    },
  };
}

export async function generateStaticParams() {
  const cities = Object.keys(LOCATIONS_REGISTRY);
  return cities.map((city) => ({
    city: city,
  }));
}

export const dynamicParams = false;

export default async function LocationPage({ params }: PageProps) {
  const { city } = await params;
  const decodedCity = decodeURIComponent(city);
  const locationData = LOCATIONS_REGISTRY[decodedCity];

  if (!locationData) {
    notFound();
  }

  // Primary workshop address: 4567 Powerline Rd (also referenced on city records as 4567 NW 9th Ave), Fort Lauderdale, FL 33309
  const singleLocalBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Nano Signs",
    "alternateName": "Nano Signs Fort Lauderdale & Oakland Park",
    "category": "Sign Shop",
    "description": locationData.description,
    "image": "https://nano-signs.com/images/nano%20logo%20complete.png",
    "@id": `https://nano-signs.com/locations/${decodedCity}`,
    "url": `https://nano-signs.com/locations/${decodedCity}`,
    "telephone": "(305) 967-1005",
    "priceRange": "$$",
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
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "18:00"
      }
    ],
    "areaServed": [
      {
        "@type": "City",
        "name": "Fort Lauderdale",
        "sameAs": "https://en.wikipedia.org/wiki/Fort_Lauderdale,_Florida"
      },
      {
        "@type": "City",
        "name": "Oakland Park",
        "sameAs": "https://en.wikipedia.org/wiki/Oakland_Park,_Florida"
      },
      {
        "@type": "AdministrativeArea",
        "name": "Broward County"
      }
    ]
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://nano-signs.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Locations",
        "item": "https://nano-signs.com/locations"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": `${locationData.cityName}, FL`,
        "item": `https://nano-signs.com/locations/${decodedCity}`
      }
    ]
  };

  const faqSchema = locationData.faqs && locationData.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": locationData.faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a,
      },
    })),
  } : null;

  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* Schema Markup: Single Clean LocalBusiness + Breadcrumb + FAQ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(singleLocalBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {/* Hero Section */}
      <section
        className="w-full py-24 text-center px-4"
        style={{
          background: "linear-gradient(135deg, #0d0d1a 0%, #1a0a2f 50%, #00222a 100%)",
        }}
      >
        <div className="max-w-4xl mx-auto">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-[#ff2d78]/20 text-[#ff2d78] mb-4 uppercase tracking-widest border border-[#ff2d78]/30 font-poppins">
            Nano Signs — {locationData.cityName}, FL
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4 font-poppins">
            {locationData.title}
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8 font-opensans leading-relaxed">
            {locationData.heroSubtitle}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/get-a-quote"
              className="inline-block px-8 py-4 bg-[#ff2d78] text-white font-black uppercase tracking-wider rounded-xl shadow-lg transition-all duration-300 hover:bg-white hover:text-[#ff2d78] font-poppins text-sm"
            >
              Get a Free Quote
            </Link>
            <a
              href="tel:3059671005"
              className="inline-block px-8 py-4 bg-white/10 border border-white/20 text-white font-black uppercase tracking-wider rounded-xl transition-all duration-300 hover:bg-white hover:text-slate-900 font-poppins text-sm"
            >
              Call (305) 967-1005
            </a>
          </div>
        </div>
      </section>

      {/* Body Content */}
      <section className="py-14 px-4 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Left: Text + Services */}
          <div>
            <h2 className="text-3xl font-bold mb-6 font-poppins text-slate-900">
              Commercial Sign &amp; Print Services in {locationData.cityName}
            </h2>
            {locationData.bodyContent && (
              <div className="text-gray-700 text-base leading-relaxed space-y-4 mb-8">
                {locationData.bodyContent.split("\n\n").map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            )}
            {!locationData.bodyContent && (
              <p className="text-gray-700 text-lg mb-6 leading-relaxed">
                {locationData.description}
              </p>
            )}

            <h3 className="text-xl font-bold mb-4 font-poppins text-slate-900">
              Our Capabilities &amp; Services:
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-8">
              {locationData.services.map((service, index) => {
                const name = typeof service === "string" ? service : service.name;
                const href = typeof service === "string" ? "/" : service.href;
                return (
                  <li key={index}>
                    <Link
                      href={href}
                      className="flex items-center gap-2 text-gray-800 hover:text-[#ff2d78] transition-colors text-sm font-medium"
                    >
                      <span className="text-[#ff2d78] font-bold">✓</span>
                      {name}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Verified Address & Dual Street Name Card */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
              <h3 className="font-bold text-lg mb-3 font-poppins text-slate-900">📍 Direct Manufacturing Facility &amp; Showroom</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                <strong>Nano Signs</strong><br />
                4567 Powerline Rd<br />
                Fort Lauderdale, FL 33309<br /><br />
                <strong>Hours:</strong> Monday – Friday: 9:00 AM – 6:00 PM<br />
                <strong>Direct Phone:</strong>{" "}
                <a href="tel:3059671005" className="text-[#ff2d78] font-bold hover:underline">
                  (305) 967-1005
                </a>
              </p>
            </div>
          </div>

          {/* Right: FAQ */}
          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 shadow-sm">
            <h3 className="text-2xl font-black uppercase tracking-wide mb-6 border-b pb-4 font-poppins text-slate-900">
              Frequently Asked Questions
            </h3>
            <div className="space-y-6">
              {locationData.faqs.map((faq, index) => (
                <div key={index} className="border-b border-gray-200 pb-5 last:border-0 last:pb-0">
                  <h4 className="font-bold text-base mb-2 text-slate-800">{faq.q}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 py-20 text-center px-4">
        <h2 className="text-3xl md:text-4xl font-black mb-4 text-white font-poppins">
          Ready to elevate your business presence in {locationData.cityName}?
        </h2>
        <p className="text-xl text-gray-300 mb-8 max-w-xl mx-auto">
          Contact Nano Signs today for a free design consultation and fast line-item quote.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/get-a-quote"
            className="inline-block px-8 py-4 bg-[#ff2d78] text-white font-black uppercase tracking-wider rounded-xl shadow-lg transition-all duration-300 hover:opacity-90 font-poppins text-sm"
          >
            Get a Free Quote
          </Link>
          <Link
            href="/contact-us"
            className="inline-block px-8 py-4 bg-white/10 border border-white/20 text-white font-black uppercase tracking-wider rounded-xl transition-all duration-300 hover:bg-white hover:text-slate-900 font-poppins text-sm"
          >
            Contact Our Team
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
