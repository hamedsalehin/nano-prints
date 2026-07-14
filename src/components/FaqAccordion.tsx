"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FaqItem {
  q: string;
  a: string;
}

interface FaqAccordionProps {
  faqs: FaqItem[];
}

export function FaqAccordion({ faqs }: FaqAccordionProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => {
        const isOpen = openFaqIndex === index;
        return (
          <div
            key={index}
            className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm"
          >
            <button
              onClick={() => toggleFaq(index)}
              className="w-full flex items-center justify-between p-5 text-left font-bold text-base lg:text-lg text-gray-900 hover:bg-gray-50 transition-colors"
            >
              <span>{faq.q}</span>
              {isOpen ? (
                <ChevronUp className="w-5 h-5 text-gray-500 shrink-0" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500 shrink-0" />
              )}
            </button>
            {isOpen && (
              <div className="p-5 border-t border-gray-100 bg-gray-50/50">
                <p className="text-gray-650 leading-relaxed text-sm lg:text-base font-medium">
                  {faq.a}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
