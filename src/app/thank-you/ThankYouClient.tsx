"use client";

import React, { useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CheckCircle2, ArrowLeft, RefreshCw } from "lucide-react";

function ThankYouContent() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "Valued Customer";
  const email = searchParams.get("email") || "your email";

  useEffect(() => {
    // Trigger Google Ads & Analytics Conversion event when Thank You page loads
    if (typeof window !== "undefined") {
      const win = window as unknown as { gtag?: (...args: unknown[]) => void };
      if (win.gtag) {
        // Generic pageview conversion
        win.gtag("event", "conversion", {
          send_to: "AW-CONVERSION_ID/CONVERSION_LABEL", // Ready for user's Google Ads tag
        });
        win.gtag("event", "generate_lead", {
          value: 1,
          currency: "USD",
        });
      }
    }
  }, []);

  return (
    <main className="flex-grow py-12 bg-white">
      {/* Breadcrumb */}
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 mb-8 flex items-center gap-2 text-sm text-slate-500 font-['Open_Sans']">
        <Link href="/" className="hover:text-[#ff2d78] transition-colors">
          Home
        </Link>
        <span>/</span>
        <span className="font-semibold text-slate-800">Thank You</span>
      </div>

      {/* SUCCESS CONFIRMATION CARD */}
      <section className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 w-full py-6">
        <div className="bg-white rounded-2xl border border-slate-100 shadow-xl p-8 md:p-12 max-w-xl mx-auto text-center space-y-6">
          <div className="w-20 h-20 bg-green-50 text-green-500 border border-green-200 rounded-full flex items-center justify-center shadow-sm mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-black font-poppins text-slate-800 leading-tight">
              Request Received!
            </h1>
            <p className="text-[#ff2d78] font-extrabold uppercase tracking-wider text-xs">
              WE WILL GET BACK TO YOU SHORTLY
            </p>
          </div>

          <div className="p-6 bg-slate-50 border border-slate-100 rounded-xl space-y-3 text-sm text-slate-600 text-left font-opensans leading-relaxed">
            <p>
              Thank you, <span className="font-extrabold text-slate-800">{name}</span>. Your custom quote request has been saved.
            </p>
            <p>
              Our formatting and layout specialists will review your specs and details. We will email you a print proof and pricing breakdown at{" "}
              <span className="font-bold text-slate-800">{email}</span> within <span className="font-bold text-[#ff2d78]">12 hours</span>.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2 font-opensans">
            <Link
              href="/"
              className="px-6 py-3.5 border-2 border-[#ff2d78] text-[#ff2d78] hover:bg-pink-50 rounded-xl font-extrabold text-xs uppercase tracking-wider transition-all shadow-sm flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              BACK TO HOMEPAGE
            </Link>
            <Link
              href="/get-a-quote"
              className="px-6 py-3.5 border border-slate-200 text-slate-600 hover:bg-slate-50 rounded-xl font-extrabold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              SUBMIT ANOTHER QUOTE
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function ThankYouClient() {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Header />
      <Suspense fallback={<div className="flex-grow flex items-center justify-center min-h-[400px]">Loading...</div>}>
        <ThankYouContent />
      </Suspense>
      <Footer />
    </div>
  );
}
