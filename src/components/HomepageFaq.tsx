"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const homepageFaqs: FAQItem[] = [
  {
    question: "What types of custom signs and banners do you produce in Fort Lauderdale?",
    answer:
      "Nano Signs specializes in a full range of commercial signage including storefront channel letters, programmable LED displays, custom neon signs, outdoor vinyl banners, acrylic signs, yard signs, vehicle graphics & magnets, trade show displays, and marketing materials throughout Fort Lauderdale and Broward County.",
  },
  {
    question: "How quickly can I get my custom sign or banner printed?",
    answer:
      "We offer rapid turnaround times with many standard vinyl banners, yard signs, and print orders completed within 24 to 48 hours. Express same-day or next-day printing options are also available for urgent Fort Lauderdale project deadlines.",
  },
  {
    question: "Do I need an account to request a custom quote or layout proof?",
    answer:
      "No account is required! You can fill out your specs, dimensions, and requirements on our Get a Quote page in seconds without logging in. Our team will email your custom pricing quote within 12 hours.",
  },
  {
    question: "Can I upload my own artwork or logo file?",
    answer:
      "Yes! You can attach your PDF, PNG, or JPG artwork files directly with your quote request or email them to info@nano-signs.com. Our pre-press layout specialists perform a complimentary artwork check to ensure high-resolution print quality before production.",
  },
  {
    question: "Are your outdoor signs and banners weatherproof for Florida weather?",
    answer:
      "Absolultely. All our outdoor signs, vehicle magnets, and banners use commercial-grade UV-resistant inks, rust-proof aluminum or heavy-duty Coroplast, and weather-resistant vinyl engineered to withstand Florida heat, rain, and humidity.",
  },
  {
    question: "Where is Nano Signs located, and do you offer local pickup?",
    answer:
      "Our print shop is conveniently located at 4567 Powerline Rd, Fort Lauderdale, FL 33309 (Oakland Park). We offer fast local shop pickup as well as local delivery and shipping throughout Florida.",
  },
];

export function HomepageFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Structured Data for Google AI Overviews & Search (FAQPage Schema)
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": homepageFaqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };

  return (
    <section className="py-14 bg-white border-t border-slate-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-pink-50 text-[#ff2d78] rounded-full text-xs font-extrabold uppercase tracking-wider">
            <HelpCircle className="w-4 h-4" /> Frequently Asked Questions
          </div>
          <h2 className="text-2xl md:text-3xl font-black font-poppins text-slate-900">
            Got Questions About Custom Signage &amp; Printing?
          </h2>
          <p className="text-sm text-slate-600 font-opensans max-w-xl mx-auto">
            Everything you need to know about ordering custom signs, banners, turnarounds, and artwork prep in Fort Lauderdale.
          </p>
        </div>

        <div className="space-y-3 font-opensans">
          {homepageFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="border border-slate-200 rounded-2xl overflow-hidden transition-all bg-slate-50/40 hover:bg-white hover:shadow-md"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-4 text-left font-bold text-slate-800 flex items-center justify-between text-sm md:text-base gap-4 cursor-pointer"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#ff2d78] shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100/80 pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
