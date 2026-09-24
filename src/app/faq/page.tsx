import React from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign & Print FAQs | Turnaround, Pricing & Design | Nano Signs",
  description:
    "Get quick answers to FAQ regarding custom sign pricing, turnaround times, banner printing & neon sign installation in Fort Lauderdale FL. Call 305-967-1005.",
  alternates: {
    canonical: "https://nano-signs.com/faq",
  },
  openGraph: {
    title: "Sign & Print FAQs | Turnaround, Pricing & Design | Nano Signs",
    description:
      "Get quick answers to FAQ regarding custom sign pricing, turnaround times, banner printing & neon sign installation in Fort Lauderdale FL. Call 305-967-1005.",
    url: "https://nano-signs.com/faq",
    type: "website",
  },
};


const faqs = [
  {
    question: "What is your standard turnaround time?",
    answer: "Our standard production turnaround time is 4-5 business days after artwork approval. We also offer expedited options for many of our products if you need your custom signs faster."
  },
  {
    question: "Do you offer installation services?",
    answer: "Yes, we offer professional sign installation services within Broward County and the surrounding South Florida areas. Contact our team for an installation quote."
  },
  {
    question: "Can I get help with my design?",
    answer: "Absolutely! Our in-house design team can help bring your vision to life. We offer free artwork checks on all submitted files, and custom design services for a small fee."
  },
  {
    question: "Do you offer bulk discounts?",
    answer: "Yes, we offer competitive corporate pricing and bulk discounts for large orders. Check out our Corporate Pricing page or contact us directly to set up a wholesale account."
  },
  {
    question: "What type of file should I upload for my artwork?",
    answer: "For the highest quality print, we recommend uploading vector files (.AI, .EPS, .SVG) or high-resolution PDFs. We also accept high-res PNG and JPEG files (300 DPI)."
  }
];

export default function FAQPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Header />
      
      {/* Schema.org JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="flex-grow pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Everything you need to know about ordering custom signs, printing processes, and shipping.
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-start gap-3">
                  <span className="text-[#ff2d78]">Q.</span> {faq.question}
                </h2>
                <p className="text-slate-600 leading-relaxed pl-7">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
