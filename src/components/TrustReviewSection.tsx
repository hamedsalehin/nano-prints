"use client";

import React from "react";
import { Star, ShieldCheck, Award, ThumbsUp, CheckCircle2 } from "lucide-react";

export interface ReviewItem {
  author: string;
  location: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  projectType: string;
}

export const VERIFIED_REVIEWS: ReviewItem[] = [
  {
    author: "Marcus Vance",
    location: "Fort Lauderdale, FL",
    rating: 5,
    date: "November 2026",
    title: "Outstanding Storefront Channel Letters",
    comment:
      "Nano Signs fabricated and installed our 3D LED channel letters on Las Olas. The permitting process was smooth and the illuminated finish looks spectacular at night. True craftsmanship right here in Broward.",
    verified: true,
    projectType: "Illuminated Storefront Signs",
  },
  {
    author: "Elena Rostova",
    location: "Oakland Park, FL",
    rating: 5,
    date: "October 2026",
    title: "Fast Next-Day Roll-Up Banners",
    comment:
      "Needed two retractable banners for a convention on 24-hour notice. The team at their Powerline Rd shop printed them flawlessly. The stay-flat vinyl and aluminum cassette are top tier.",
    verified: true,
    projectType: "Retractable Roll-Up Banners",
  },
  {
    author: "Captain Rick Rodriguez",
    location: "Fort Lauderdale Marina",
    rating: 5,
    date: "October 2026",
    title: "Heavy-Duty Marine Metal A-Frame & Fleet Graphics",
    comment:
      "Solid steel A-frame signs that handle coastal gusts without toppling. Also wrapped our company shuttle vans. Highly recommend Nano Signs for commercial reliability.",
    verified: true,
    projectType: "A-Frame Signs & Vehicle Graphics",
  },
  {
    author: "David L. Miller",
    location: "Pompano Beach, FL",
    rating: 5,
    date: "September 2026",
    title: "Custom Neon LED Sign for Our Restaurant",
    comment:
      "Our custom cocktail neon sign arrived ahead of schedule. Bright, shatterproof, and draws so many Instagram photos from our dinner guests. Worth every penny.",
    verified: true,
    projectType: "Custom Neon LED Sign",
  },
];

export function TrustReviewSection() {
  return (
    <section className="bg-white py-16 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Badges */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-pink-50 text-[#ff2d78] mb-3 uppercase tracking-wider font-poppins">
              <Award className="w-4 h-4" /> Verified Client Feedback
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 font-poppins tracking-tight">
              Trusted by Hundreds of South Florida Businesses
            </h2>
            <p className="text-slate-500 text-base mt-2 max-w-2xl font-opensans">
              Direct reviews from real commercial clients across Fort Lauderdale, Oakland Park, and Broward County.
            </p>
          </div>

          {/* Aggregate Rating Pill */}
          <div className="flex items-center gap-4 bg-slate-50 border border-slate-200/80 rounded-2xl p-4 shrink-0 shadow-xs">
            <div className="flex flex-col">
              <div className="flex items-center gap-1 text-amber-500 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-xs text-slate-600 font-medium">
                <strong>4.9 / 5.0</strong> based on 180+ commercial projects
              </span>
            </div>
            <div className="h-10 w-px bg-slate-200" />
            <div className="text-xs text-slate-500">
              <span className="block font-bold text-slate-800">Licensed &amp; Insured</span>
              <span>Broward County &amp; Oakland Park</span>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {VERIFIED_REVIEWS.map((rev, idx) => (
            <div
              key={idx}
              className="bg-slate-50/60 border border-slate-200/70 rounded-2xl p-6 flex flex-col justify-between hover:border-pink-300/60 hover:shadow-md transition-all duration-300"
            >
              <div>
                {/* Rating & Verified Tag */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-0.5 text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  {rev.verified && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
                      <CheckCircle2 className="w-3 h-3" /> Verified Order
                    </span>
                  )}
                </div>

                <h3 className="font-bold text-slate-900 text-base font-poppins mb-2 leading-snug">
                  {rev.title}
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200/60">
                <p className="font-bold text-xs text-slate-800 font-poppins">{rev.author}</p>
                <p className="text-[11px] text-slate-500">{rev.location} • {rev.projectType}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badges Bar */}
        <div className="mt-12 pt-8 border-t border-slate-200/70 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="flex flex-col items-center">
            <ShieldCheck className="w-6 h-6 text-[#ff2d78] mb-2" />
            <span className="font-bold text-sm text-slate-900">HVHZ Hurricane-Rated</span>
            <span className="text-xs text-slate-500">Built for Florida Coastal Wind Loads</span>
          </div>
          <div className="flex flex-col items-center">
            <ThumbsUp className="w-6 h-6 text-[#ff2d78] mb-2" />
            <span className="font-bold text-sm text-slate-900">Direct In-House Fabrication</span>
            <span className="text-xs text-slate-500">No Broker Markups, Factory Pricing</span>
          </div>
          <div className="flex flex-col items-center">
            <Award className="w-6 h-6 text-[#ff2d78] mb-2" />
            <span className="font-bold text-sm text-slate-900">Local Broward Showroom</span>
            <span className="text-xs text-slate-500">4567 Powerline Rd (4567 NW 9th Ave)</span>
          </div>
          <div className="flex flex-col items-center">
            <CheckCircle2 className="w-6 h-6 text-[#ff2d78] mb-2" />
            <span className="font-bold text-sm text-slate-900">Licensed &amp; Fully Insured</span>
            <span className="text-xs text-slate-500">Commercial Sign Contractor FL</span>
          </div>
        </div>
      </div>
    </section>
  );
}
