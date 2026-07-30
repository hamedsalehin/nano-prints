import React from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Nano Signs | Corporate & Bulk Sign Pricing Fort Lauderdale FL",
  description:
    "Volume discounts on custom signs & printing for Fort Lauderdale & Oakland Park FL businesses. Dedicated account manager & fast turnaround. Call 305-967-1005.",
  alternates: {
    canonical: "https://nano-signs.com/corporate-pricing",
  },
  openGraph: {
    title: "Nano Signs | Corporate & Bulk Sign Pricing Fort Lauderdale FL",
    description:
      "Volume discounts on custom signs & printing for Fort Lauderdale & Oakland Park FL businesses. Dedicated account manager & fast turnaround. Call 305-967-1005.",
    url: "https://nano-signs.com/corporate-pricing",
    type: "website",
  },
};

const benefits = [
  "Up to 30% off standard retail pricing",
  "Dedicated account manager",
  "Free artwork adjustments",
  "Net-30 payment terms available",
  "Priority production and shipping",
  "Tax-exempt purchasing support",
];

export default function CorporatePricingPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Header />

      <main className="flex-grow pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
              Corporate & Wholesale Pricing
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Scale your brand effortlessly with our dedicated corporate programs. We offer aggressive discounts for agencies, franchises, and large businesses.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center bg-white rounded-3xl shadow-xl overflow-hidden p-8 md:p-12">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Partner Benefits</h2>
              <ul className="space-y-4 mb-8">
                {benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-slate-700">
                    <CheckCircle2 className="w-6 h-6 text-[#00e5ff] flex-shrink-0" />
                    <span className="text-lg">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-[linear-gradient(135deg,#130a1f_0%,#0d0d1a_100%)] rounded-2xl p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#ff2d78] blur-[80px] rounded-full opacity-30"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#00e5ff] blur-[80px] rounded-full opacity-30"></div>
              
              <div className="relative z-10 text-center">
                <h3 className="text-2xl font-bold mb-4">Apply for an Account</h3>
                <p className="text-slate-300 mb-8">
                  Fill out our quick application and a dedicated manager will contact you within 24 hours.
                </p>
                <Link
                  href="/contact-us"
                  className="inline-block bg-[linear-gradient(90deg,#ff2d78_0%,#b020ff_100%)] text-white font-bold text-lg py-4 px-8 rounded-full shadow-[0_0_20px_rgba(255,45,120,0.3)] hover:shadow-[0_0_30px_rgba(255,45,120,0.5)] transition-all hover:-translate-y-1 w-full"
                >
                  Contact Sales Team
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
