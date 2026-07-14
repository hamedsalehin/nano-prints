"use client";

import React from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  Scale,
  Mail,
  AlertTriangle,
  FileCheck,
  ShieldAlert,
  ArrowLeft,
  Camera,
  Layers,
  Settings
} from "lucide-react";

export default function ReturnPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-opensans">
      <Header />

      {/* Hero Header */}
      <section className="relative text-white py-16 md:py-20" style={{
        background: "linear-gradient(135deg, #0d0d1a 0%, #1a0a2f 50%, #00222a 100%)"
      }}>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
        
        <div className="relative max-w-7xl mx-auto px-4 text-center z-10">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-400 mb-4 uppercase tracking-widest border border-indigo-500/30">
            Terms & Conditions
          </span>
          <h1 className="text-4xl md:text-5xl font-poppins font-black mb-4 tracking-tight leading-tight">
            Return & Refund Policy
          </h1>
          <p className="max-w-2xl mx-auto text-sm md:text-base text-gray-300 font-medium">
            Please read this document carefully. By ordering from Nano Signs, you agree to these strict return conditions.
          </p>
        </div>
      </section>

      {/* Main Section */}
      <main className="flex-grow max-w-5xl mx-auto w-full px-4 py-12 md:py-16 space-y-12">
        
        {/* Simple Return Procedure Card */}
        <section className="bg-white rounded-3xl p-8 shadow-md border border-gray-150 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50 rounded-bl-full pointer-events-none" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Mail className="w-5 h-5" />
              </div>
              <h2 className="text-xl md:text-2xl font-poppins font-black text-slate-800">
                Simple Return Procedure
              </h2>
            </div>
            
            <p className="text-sm text-slate-650 leading-relaxed mb-6 font-medium">
              If your claim meets our eligibility conditions, you must initiate the return request via email to our support team within the designated time window.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-poppins">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 relative">
                <span className="absolute top-4 right-4 text-xs font-black text-slate-350">STEP 01</span>
                <h3 className="text-sm font-bold text-slate-800 mb-2">Send Email</h3>
                <p className="text-[11px] text-slate-500 leading-relaxed font-semibold">
                  Email us at <a href="mailto:info@nano-signs.com" className="underline font-bold text-indigo-600">support [at] nano-signs.com</a> with the subject line <code className="bg-slate-150 px-1 py-0.5 rounded font-mono text-slate-700">Return Request: Order #[YourOrderNo]</code>.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 relative">
                <span className="absolute top-4 right-4 text-xs font-black text-slate-350">STEP 02</span>
                <h3 className="text-sm font-bold text-slate-800 mb-2">Attach Evidence</h3>
                <p className="text-[11px] text-slate-500 leading-relaxed font-semibold">
                  You must attach your order details, high-resolution digital photos, and a continuous, unedited unboxing video clearly showcasing the shipping label and product defect.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 relative">
                <span className="absolute top-4 right-4 text-xs font-black text-slate-350">STEP 03</span>
                <h3 className="text-sm font-bold text-slate-800 mb-2">Compliance Review</h3>
                <p className="text-[11px] text-slate-500 leading-relaxed font-semibold">
                  Our compliance team will review your evidence within 3–5 business days. If approved, we will issue a Return Merchandise Authorization (RMA) number and shipping instructions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Strict Conditions Section */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 mb-2">
            <ShieldAlert className="w-6 h-6 text-[#ff2d78]" />
            <h2 className="text-2xl font-poppins font-black text-slate-800">
              Strict Eligibility Conditions
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Condition 1: Custom Printed Products */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-150 space-y-3">
              <div className="w-9 h-9 rounded-lg bg-pink-50 text-[#ff2d78] flex items-center justify-center">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h3 className="text-base font-poppins font-black text-slate-800">
                1. Custom Products are Final Sale
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                All customized products (signs, banners, flags, decals, business cards, t-shirts, mugs, etc.) are manufactured on-demand with customer-specific graphics and designs. Under no circumstances are returns, refunds, or exchanges accepted for custom prints.
              </p>
            </div>

            {/* Condition 2: Strict 24-Hour Reporting Window */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-150 space-y-3">
              <div className="w-9 h-9 rounded-lg bg-pink-50 text-[#ff2d78] flex items-center justify-center">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <h3 className="text-base font-poppins font-black text-slate-800">
                2. Mandatory 24-Hour Damage Window
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                In the rare case of transit damage or a physical print defect, you must report it within exactly **24 hours** from timestamped carrier delivery or local store pickup. Requests received after 24 hours are automatically disqualified, and no refunds or reprints will be issued.
              </p>
            </div>

            {/* Condition 3: Evidence Requirements */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-150 space-y-3">
              <div className="w-9 h-9 rounded-lg bg-pink-50 text-[#ff2d78] flex items-center justify-center">
                <Camera className="w-5 h-5" />
              </div>
              <h3 className="text-base font-poppins font-black text-slate-800">
                3. Video & Photo Evidence Clauses
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                Claims for items damaged during shipping require a continuous, unedited unboxing video that shows the package condition, shipping label, and item extraction. Photo-only claims for transit damage will be rejected immediately.
              </p>
            </div>

            {/* Condition 4: Non-Custom Products & Restocking Fee */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-150 space-y-3">
              <div className="w-9 h-9 rounded-lg bg-pink-50 text-[#ff2d78] flex items-center justify-center">
                <FileCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-poppins font-black text-slate-800">
                4. 35% Restocking Fee on Hardware
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                Only blank non-custom accessories (e.g. metal frames, unused posts, empty standoffs, or stakes) are eligible for return. These items must be returned completely unused, in their original, unopened packaging, and are subject to a **35% restocking and processing fee**.
              </p>
            </div>

            {/* Condition 5: Color Matching Disclaimer */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-150 space-y-3">
              <div className="w-9 h-9 rounded-lg bg-pink-50 text-[#ff2d78] flex items-center justify-center">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-base font-poppins font-black text-slate-800">
                5. CMYK Color Variations
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                Please note that digital screens render colors in RGB, whereas commercial printers utilize CMYK. Slight color variations, shade differences, or brightness shifts are inherent to the printing process and are not deemed defects. Returns based on color shifts will be rejected.
              </p>
            </div>

            {/* Condition 6: Customer Design and Layout Approvals */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-150 space-y-3">
              <div className="w-9 h-9 rounded-lg bg-pink-50 text-[#ff2d78] flex items-center justify-center">
                <Settings className="w-5 h-5" />
              </div>
              <h3 className="text-base font-poppins font-black text-slate-800">
                6. Design Layout and Typographical Liability
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed font-semibold">
                Customers assume full responsibility for all content submitted. Spells, typos, grammar errors, low-resolution fuzzy artwork, color mismatching, alignment slips, or orientation selection errors made in the editor or uploaded in templates are completely ineligible for returns.
              </p>
            </div>
          </div>
        </section>

        {/* Closing Notice */}
        <section className="bg-slate-900 rounded-3xl p-8 text-white text-center border border-slate-950 font-poppins">
          <h3 className="font-black text-lg mb-2">Have questions about our return terms?</h3>
          <p className="text-xs text-slate-400 max-w-lg mx-auto mb-6 leading-relaxed font-semibold">
            Our compliance agents can help explain our return parameters or verify if a non-custom item is eligible for return.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link
              href="/contact-us"
              className="inline-flex items-center gap-2 px-5 py-3 bg-white text-slate-900 rounded-xl text-xs font-bold hover:bg-slate-100 transition-colors shadow"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Contact Us
            </Link>
            <a
              href="mailto:info@nano-signs.com"
              className="inline-flex items-center gap-2 px-5 py-3 bg-white/10 hover:bg-white/20 transition-colors text-white rounded-xl text-xs font-bold border border-white/20"
            >
              Email Support
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
