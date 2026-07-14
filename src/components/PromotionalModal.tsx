"use client";

import { useEffect, useState } from "react";
import { X, Gift, Mail, ArrowRight, CheckCircle2, AlertCircle, Sparkles, HelpCircle } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { usePathname } from "next/navigation";

export function PromotionalModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [showBusinessTooltip, setShowBusinessTooltip] = useState(false);

  useEffect(() => {
    // 1. Check if discount has already been claimed or if modal was previously dismissed
    const claimed = localStorage.getItem("nano_promo_claimed") === "true";
    const dismissed = localStorage.getItem("nano_promo_dismissed") === "true";

    // If already claimed, we set state but keep it minimized so the blob is available
    if (claimed) {
      setSuccess(true);
      setIsMinimized(true);
      return;
    }

    // If dismissed, we keep it minimized so they can open it later
    if (dismissed) {
      setIsMinimized(true);
      return;
    }

    // 2. Track first visit time in sessionStorage to persist across page navigations
    let firstVisit = sessionStorage.getItem("nano_promo_first_visit");
    if (!firstVisit) {
      firstVisit = Date.now().toString();
      sessionStorage.setItem("nano_promo_first_visit", firstVisit);
    }

    const elapsed = Date.now() - parseInt(firstVisit);
    const targetDelay = 40000; // 40 seconds

    if (elapsed >= targetDelay) {
      setIsOpen(true);
    } else {
      const remaining = targetDelay - elapsed;
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, remaining);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClaim = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // 1. Save claim in Supabase discount_claims table
      const { error: dbError } = await supabase
        .from("discount_claims")
        .insert({ email: email.trim().toLowerCase() });

      if (dbError) {
        // Duplicate key / Unique constraint violation code is "23505"
        if (dbError.code === "23505") {
          setError("This email has already claimed the 10% discount.");
          setLoading(false);
          return;
        }
        throw dbError;
      }

      // 2. Successfully registered in database
      localStorage.setItem("nano_promo_claimed", "true");
      localStorage.setItem("nano_promo_claimed_email", email.trim().toLowerCase());
      setSuccess(true);
      
      // Dispatch custom event to let CartContext know about the discount
      window.dispatchEvent(new Event("nano_discount_claimed"));
    } catch (err) {
      console.warn("Supabase discount_claims insert failed, falling back to local storage:", err);
      // Fallback: Proceed even if table doesn't exist yet, so user experience isn't broken
      localStorage.setItem("nano_promo_claimed", "true");
      localStorage.setItem("nano_promo_claimed_email", email.trim().toLowerCase());
      setSuccess(true);
      window.dispatchEvent(new Event("nano_discount_claimed"));
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsMinimized(true);
    localStorage.setItem("nano_promo_dismissed", "true");
  };

  const handleOpen = () => {
    setIsMinimized(false);
    setIsOpen(true);
  };

  const pathname = usePathname();
  if (pathname === "/design" || pathname?.startsWith("/PrintDesignExperience")) {
    return null;
  }

  if (!isOpen && !isMinimized) return null;

  return (
    <>
      {/* ─── FLOATING HOVERING BLOB ─── */}
      {isMinimized && (
        <button
          onClick={handleOpen}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-3 bg-[#0a0a0c] text-white border border-pink-500/30 rounded-full shadow-2xl hover:border-pink-500 transition-all duration-300 group hover:scale-105 active:scale-95 animate-bounce"
          style={{
            boxShadow: "0 0 15px rgba(255,45,120,0.3), 0 0 30px rgba(0,229,255,0.1)",
          }}
          aria-label="Open promotional offer"
        >
          <div className="relative">
            <Gift className="w-5 h-5 text-[#ff2d78] group-hover:rotate-12 transition-transform duration-300" />
            <span className="absolute -top-1.5 -right-1.5 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00e5ff] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00e5ff]"></span>
            </span>
          </div>
          <span className="text-xs font-bold uppercase tracking-wider font-poppins">
            {success ? "Your 10% OFF" : "Claim 10% OFF"}
          </span>
        </button>
      )}

      {/* ─── MODAL DIALOG ─── */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-4 overflow-y-auto">
          {/* Backdrop with low blur as requested */}
          <div
            className="absolute inset-0 bg-black/55 backdrop-blur-[2px] transition-opacity duration-300"
            onClick={handleClose}
          />

          {/* Modal Container */}
          <div
            className="relative w-full max-w-md md:max-w-3xl bg-[#030303] text-white rounded-2xl overflow-hidden border border-slate-800/80 shadow-2xl z-10 animate-in zoom-in-95 duration-300 flex flex-col md:flex-row"
            style={{
              boxShadow: "0 10px 40px rgba(0,0,0,0.9), 0 0 25px rgba(255,45,120,0.15), 0 0 50px rgba(0,229,255,0.08)",
            }}
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-3 right-3 md:top-4 md:right-4 z-20 p-2 text-slate-400 hover:text-white rounded-full bg-black/40 hover:bg-white/10 transition-colors"
              aria-label="Close promotion"
            >
              <X className="w-5 h-5" />
            </button>

            {/* LEFT COLUMN: Promo details */}
            <div className="md:w-5/12 bg-gradient-to-br from-[#0d0714] via-[#050b16] to-[#040404] p-5 md:p-10 border-b md:border-b-0 md:border-r border-slate-800/60 flex flex-col justify-between relative overflow-hidden">
              {/* Background glows */}
              <div className="absolute top-[-20%] left-[-20%] w-[100%] h-[100%] rounded-full bg-[#ff2d78]/8 blur-[80px]" />
              <div className="absolute bottom-[-20%] right-[-20%] w-[100%] h-[100%] rounded-full bg-[#00e5ff]/6 blur-[80px]" />

              <div className="relative space-y-3 md:space-y-6">
                {/* Brand Logo */}
                <div className="w-24 md:w-36 h-auto">
                  <img
                    src="/images/nano_logo_modal.png"
                    alt="Nano Signs Logo"
                    className="w-full h-auto object-contain brightness-110 drop-shadow-[0_0_8px_rgba(255,45,120,0.3)]"
                  />
                </div>

                <div className="space-y-1.5 pt-2 md:pt-4">
                  <span className="text-[10px] md:text-xs font-extrabold uppercase tracking-widest text-[#00e5ff] font-poppins flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" /> Welcome Special
                  </span>
                  <h3 className="text-2xl md:text-5xl font-black font-poppins tracking-tight leading-none">
                    <span className="block text-white">GET</span>
                    <span className="block pink-cyan-text drop-shadow-[0_0_15px_rgba(176,32,255,0.5)]">10% OFF</span>
                  </h3>
                  <p className="text-[10px] md:text-xs text-slate-400 font-semibold tracking-wide uppercase pt-1">
                    On your first order
                  </p>
                </div>
              </div>

              {/* Bullet List - Hidden on mobile to keep modal compact */}
              <div className="hidden md:block relative pt-8 space-y-3.5 text-xs text-slate-300 font-medium">
                <div className="flex items-center gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#ff2d78]" />
                  <span>Custom Signs &amp; Banners</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#b020ff]" />
                  <span>Fast Florida-Wide Delivery</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#00e5ff]" />
                  <span>100% Quality Print Guarantee</span>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Form or Success State */}
            <div className="md:w-7/12 p-5 md:p-10 flex flex-col justify-center bg-[#070709] relative">
              {!success ? (
                /* EMAIL CAPTURE STATE */
                <div className="space-y-4 md:space-y-6">
                  <div className="space-y-1.5 md:space-y-2">
                    <h4 className="text-lg md:text-2xl font-bold font-poppins text-white">
                      Unlock Your Discount
                    </h4>
                    <p className="text-xs md:text-sm text-slate-400 font-medium leading-relaxed">
                      Enter your email below to claim your 10% coupon code, which will be automatically applied at checkout!
                    </p>
                  </div>

                  <form onSubmit={handleClaim} className="space-y-3 md:space-y-4">
                    {error && (
                      <div className="p-3 md:p-3.5 bg-red-950/40 border border-red-800/40 rounded-xl flex gap-2.5 text-xs text-red-200">
                        <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                        <span>{error}</span>
                      </div>
                    )}

                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-slate-500" />
                      <input
                        type="email"
                        required
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 md:pl-12 pr-4 py-2.5 md:py-3.5 bg-[#121216] border border-slate-800 rounded-xl text-xs md:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#00e5ff] focus:ring-1 focus:ring-[#00e5ff] transition-all"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full active:scale-[0.99] text-white font-bold py-2.5 md:py-3.5 rounded-xl transition-all text-xs md:text-sm uppercase tracking-wider brand-gradient shadow-lg flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-50"
                      style={{
                        boxShadow: "0 4px 15px rgba(255,45,120,0.25)",
                      }}
                    >
                      {loading ? "Claiming..." : (
                        <>
                          Claim My 10% Off
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>

                  <button
                    onClick={handleClose}
                    className="block text-center text-xs text-slate-500 hover:text-slate-400 underline transition-colors"
                  >
                    No thanks, I prefer paying full price
                  </button>
                </div>
              ) : (
                /* SUCCESS STATE */
                <div className="space-y-4 md:space-y-6 text-center md:text-left">
                  <div className="flex flex-col md:flex-row items-center gap-3 md:gap-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-green-950/50 text-green-400 border border-green-800/50 rounded-full flex items-center justify-center shadow-lg shadow-green-950/30 shrink-0">
                      <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 animate-pulse" />
                    </div>
                    <div>
                      <h4 className="text-lg md:text-2xl font-bold font-poppins text-white">
                        Congratulations!
                      </h4>
                      <p className="text-[10px] md:text-xs text-[#00e5ff] font-bold uppercase tracking-wider mt-0.5">
                        Your 10% Discount is Active
                      </p>
                    </div>
                  </div>

                  <div className="p-3 md:p-4 bg-[#121216] border border-slate-800 rounded-xl space-y-1.5 md:space-y-2 text-xs md:text-sm text-slate-300 text-left">
                    <p className="font-semibold text-white">How to redeem your discount:</p>
                    <p className="leading-relaxed">
                      Make sure to purchase your order while <span className="text-white font-bold">logged into your account</span> using the same email you just entered. 
                    </p>
                    <p className="leading-relaxed text-slate-400 text-[10px] md:text-xs mt-1">
                      Our system will detect your email and automatically apply the 10% discount at checkout.
                    </p>
                  </div>

                  <button
                    onClick={handleClose}
                    className="w-full bg-[#1e1e24] hover:bg-[#2a2a32] text-white font-bold py-2.5 md:py-3 rounded-xl transition-all text-xs uppercase tracking-wider"
                  >
                    Start Shopping
                  </button>
                </div>
              )}

              {/* FINE PRINT: NEW BUSINESS TOOLTIP */}
              <div className="mt-4 md:mt-8 pt-3 md:pt-5 border-t border-slate-800/60 relative">
                <div className="flex justify-center md:justify-start">
                  <button
                    onMouseEnter={() => setShowBusinessTooltip(true)}
                    onMouseLeave={() => setShowBusinessTooltip(false)}
                    onClick={() => setShowBusinessTooltip(!showBusinessTooltip)}
                    className="text-slate-500 hover:text-slate-400 text-[11px] font-semibold underline flex items-center gap-1.5 cursor-help select-none"
                  >
                    <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
                    Do you own a new business?
                  </button>
                </div>

                {/* PREMIUM TOOLTIP OVERLAY */}
                {showBusinessTooltip && (
                  <div
                    className="absolute bottom-8 left-1/2 md:left-0 -translate-x-1/2 md:translate-x-0 w-80 md:w-96 bg-[#0c0c10] border border-pink-500/40 rounded-xl p-4.5 shadow-2xl z-30 space-y-2.5 text-xs text-slate-300 font-medium animate-in fade-in slide-in-from-bottom-2 duration-200"
                    style={{
                      boxShadow: "0 10px 25px rgba(0,0,0,0.8), 0 0 15px rgba(255,45,120,0.1)",
                    }}
                  >
                    <h5 className="font-bold text-white text-sm font-poppins flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-[#ff2d78]" />
                      Congratulations!
                    </h5>
                    <p className="leading-relaxed">
                      You qualify for another discount starting at <span className="text-white font-bold">10% or more</span>!
                    </p>
                    <p className="leading-relaxed">
                      To receive your discount, simply email us at{" "}
                      <a
                        href="mailto:nanosigns1@gmail.com?subject=New Business Startup Discount Request"
                        className="text-[#00e5ff] hover:underline font-bold"
                      >
                        nanosigns1@gmail.com
                      </a>{" "}
                      with the name of your business and the list of products you will be needing. The more you order, the higher the discount!
                    </p>
                    <p className="leading-relaxed">
                      Then we will email you back with instructions on how to claim your huge discount at checkout. We are here to help new businesses grow, and we will be there every step of the way!
                    </p>
                    <p className="leading-relaxed text-[#ff2d78] font-bold uppercase tracking-wider">
                      Contact us NOW!
                    </p>
                    <p className="leading-relaxed text-[10px] text-slate-400">
                      We can also simply give you a quote if needed for all your business startup needs, because planning is also very important for new businesses.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
