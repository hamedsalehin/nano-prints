import React from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Metadata } from "next";
import { MapPin, ArrowRight } from "lucide-react";
import { LOCATIONS_REGISTRY } from "@/lib/locationsRegistry";

export const metadata: Metadata = {
  title: "Service Areas | Nano Signs — Custom Signs Locations",
  description:
    "Find a Nano Signs location near you. We provide custom signs, banners, LED displays, and more across Florida.",
  alternates: { canonical: "https://nano-signs.com/locations" },
};

export default function LocationsPage() {
  const locations = Object.values(LOCATIONS_REGISTRY);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-opensans">
      <Header />

      {/* Hero */}
      <section
        className="relative text-white py-20 md:py-28"
        style={{ background: "linear-gradient(135deg, #0d0d1a 0%, #1a0a2f 50%, #00222a 100%)" }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <span className="inline-block bg-pink-500/20 border border-pink-500/30 text-pink-300 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-5 font-poppins">
            Locations
          </span>
          <h1 className="text-4xl md:text-6xl font-black font-poppins tracking-tight mb-5">
            Service <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff2d78] to-[#ff9a00]">Areas</span>
          </h1>
          <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Nano Signs provides high-quality custom signs, banners, and LED displays to businesses across Florida. Find a location near you.
          </p>
        </div>
      </section>

      {/* Locations Grid */}
      <main className="max-w-7xl mx-auto px-4 py-14 flex-1 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {locations.map((loc) => (
            <Link
              href={`/locations/${loc.id}`}
              key={loc.id}
              className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              <div className="p-8 flex flex-col flex-1 relative overflow-hidden">
                <div className="absolute top-0 right-0 -mr-6 -mt-6 bg-pink-50 w-24 h-24 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-500 ease-out" />
                <div className="flex items-center gap-3 mb-4 relative z-10">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#ff2d78] to-[#ff9a00] flex items-center justify-center text-white shrink-0 shadow-md">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 font-poppins leading-tight">
                      {loc.cityName}, {loc.state}
                    </h2>
                    <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mt-0.5">
                      Service Area
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-500 leading-relaxed flex-1 mb-6 relative z-10">
                  {loc.description}
                </p>
                <div className="flex items-center justify-between border-t border-gray-100 pt-4 relative z-10">
                  <span className="text-xs font-bold text-gray-400">
                    {loc.services.length} Services Available
                  </span>
                  <div className="flex items-center gap-1 text-sm font-bold text-[#ff2d78] group-hover:text-[#b020ff] transition-colors">
                    View Details
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
