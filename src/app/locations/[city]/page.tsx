import React from "react";
import { notFound } from "next/navigation";
import { LOCATIONS_REGISTRY } from "@/lib/locationsRegistry";
import { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import Script from "next/script";

interface PageProps {
  params: Promise<{ city: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city } = await params;
  const decodedCity = decodeURIComponent(city);
  const locationData = LOCATIONS_REGISTRY[decodedCity];
  
  if (!locationData) return {};
  
  return {
    title: locationData.title,
    description: locationData.description,
    alternates: {
      canonical: `https://nano-signs.com/locations/${decodedCity}`,
    },
    openGraph: {
      title: locationData.title,
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

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": locationData.schemaType,
    "name": "Nano Signs",
    "image": "https://nano-signs.com/logo.png",
    "@id": `https://nano-signs.com/locations/${decodedCity}`,
    "url": `https://nano-signs.com/locations/${decodedCity}`,
    "telephone": "305-967-1005",
    "areaServed": {
      "@type": "City",
      "name": locationData.cityName,
      "addressRegion": locationData.state,
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      <Script id="local-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />

      {/* Hero Section */}
      <section className="w-full bg-slate-950 py-24 text-center px-4">
        <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight mb-4">
          {locationData.title.split('—')[0]} <span className="text-[#ff2d78]">—</span> {locationData.title.split('—')[1] || locationData.title}
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
          {locationData.heroSubtitle}
        </p>
        <Link
          href="/get-a-quote"
          className="inline-block px-8 py-4 bg-[#ff2d78] text-white font-black uppercase tracking-wider rounded shadow-lg transition-all duration-300 hover:bg-white hover:text-[#ff2d78]"
        >
          Request Quote
        </Link>
      </section>

      {/* Content Section */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Expert Sign Services in {locationData.cityName}</h2>
            <p className="text-gray-700 text-lg mb-6 leading-relaxed">
              {locationData.description}
            </p>
            <h3 className="text-2xl font-bold mb-4">Our Services:</h3>
            <ul className="space-y-3">
              {locationData.services.map((service, index) => (
                <li key={index} className="flex items-center text-gray-800">
                  <span className="text-[#ff2d78] mr-3">✓</span> {service}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-gray-100 rounded-xl p-8 border border-gray-200 shadow-sm">
            <h3 className="text-2xl font-black uppercase tracking-wide mb-6 border-b pb-4">Frequently Asked Questions</h3>
            <div className="space-y-6">
              {locationData.faqs.map((faq, index) => (
                <div key={index}>
                  <h4 className="font-bold text-lg mb-2">{faq.q}</h4>
                  <p className="text-gray-600">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-50 py-20 text-center px-4 border-t border-gray-200">
        <h2 className="text-3xl md:text-4xl font-black mb-6">Ready to upgrade your business signage in {locationData.cityName}?</h2>
        <p className="text-xl text-gray-600 mb-8">Contact us today for a free consultation and quote.</p>
        <Link
          href="/contact-us"
          className="inline-block px-8 py-4 bg-slate-950 text-white font-black uppercase tracking-wider rounded shadow-lg transition-all duration-300 hover:bg-[#ff2d78]"
        >
          Contact Us
        </Link>
      </section>

      <Footer />
    </main>
  );
}
