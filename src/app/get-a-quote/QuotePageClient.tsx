"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { Header } from "@/components/Header";

const Footer = dynamic(() => import("@/components/Footer").then((mod) => mod.Footer), {
  ssr: true,
});
import {
  UploadCloud,
  Loader2,
  CheckCircle2,
  Sparkles,
  Phone,
  MessageSquare,
  Zap,
  ShieldCheck,
  Star,
  Camera,
  Check,
  Send,
  MapPin,
  Clock,
  Award,
  Lock,
  Mail,
  User,
  Ruler,
  ChevronDown,
} from "lucide-react";

const CATEGORIES = [
  { id: "custom-led-signs", label: "Custom LED Signs", defaultUnit: "ft" },
  { id: "led-display-signs", label: "LED Digital Video Displays", defaultUnit: "ft" },
  { id: "channel-letters", label: "Storefront Channel Letters", defaultUnit: "ft" },
  { id: "neon-signs", label: "Custom LED Neon Signs", defaultUnit: "in" },
  { id: "banners-flags", label: "Vinyl Banners & Flags", defaultUnit: "ft" },
  { id: "tradeshow", label: "Tradeshow & Retractable Banners", defaultUnit: "ft" },
  { id: "vehicle-graphics", label: "Vehicle Wraps & Decals", defaultUnit: "ft" },
  { id: "promotional-materials", label: "Marketing Materials & Swag", defaultUnit: "in" },
  { id: "custom-other", label: "Other / Custom Signage", defaultUnit: "ft" },
];

export default function QuotePageClient() {
  const router = useRouter();

  // Selected Category State
  const [selectedCatId, setSelectedCatId] = useState<string>("custom-led-signs");
  const activeCategory = CATEGORIES.find((c) => c.id === selectedCatId) || CATEGORIES[0];

  // Optional Dimensions
  const [showDimensions, setShowDimensions] = useState(false);
  const [width, setWidth] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [unit, setUnit] = useState<"ft" | "in">(activeCategory.defaultUnit as "ft" | "in");

  // Project Specs & Description
  const [description, setDescription] = useState<string>("");

  // Rush Order State
  const [isRushOrder, setIsRushOrder] = useState<boolean>(false);

  // Contact Info
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  // File Upload State
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [fileUploading, setFileUploading] = useState<boolean>(false);
  const [fileError, setFileError] = useState<string | null>(null);

  // Form Submission State
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleCategoryChange = (catId: string) => {
    setSelectedCatId(catId);
    const cat = CATEGORIES.find((c) => c.id === catId);
    if (cat) {
      setUnit(cat.defaultUnit as "ft" | "in");
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (selectedFile.size > 25 * 1024 * 1024) {
      setFileError("File exceeds 25MB limit. You can email it to info@nano-signs.com.");
      return;
    }

    setFile(selectedFile);
    setFileError(null);
    setFileUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      const res = await fetch("/api/upload-artwork", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      setFileUrl(data.publicUrl || "attached");
    } catch {
      setFileUrl("attached_local");
    } finally {
      setFileUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim() || !email.trim() || !description.trim()) {
      setSubmitError("Please provide your name, email, and project details.");
      return;
    }

    setSubmitting(true);
    setSubmitError(null);

    const formattedDimensions = width || height ? `${width || "?"} x ${height || "?"} ${unit}` : null;
    const rushPrefix = isRushOrder ? "[⚡ RUSH ORDER NEEDED] " : "";

    try {
      const res = await fetch("/api/submit-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: fullName.trim(),
          email: email.trim().toLowerCase(),
          phone: phone.trim() || "Not provided",
          description: `${rushPrefix}[Category: ${activeCategory.label}] ${formattedDimensions ? `[Size: ${formattedDimensions}] ` : ""}${description.trim()}`,
          width: width ? `${width} ${unit}` : null,
          height: height ? `${height} ${unit}` : null,
          quantity: 1,
          fileUrl: fileUrl || (file ? file.name : null),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to submit quote request.");

      router.push(`/thank-you?name=${encodeURIComponent(fullName.trim())}&email=${encodeURIComponent(email.trim())}`);
    } catch (err: any) {
      setSubmitError(err.message || "Failed to submit quote. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100 font-opensans pb-20 md:pb-0">
      <Header />

      {/* ── Top Hero Header ─────────────────────────────────────────────── */}
      <section className="bg-gradient-to-b from-slate-900 to-slate-950 pt-16 sm:pt-20 pb-4 px-4 text-center border-b border-slate-800">
        <div className="max-w-2xl mx-auto space-y-1.5">
          <div className="inline-flex items-center gap-1.5 bg-pink-500/10 border border-pink-500/30 text-pink-400 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider font-poppins">
            <Zap className="w-3 h-3 text-pink-400" /> Guaranteed 4-Hour Response
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white font-poppins tracking-tight">
            Get a Fast <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-400">Custom Quote</span>
          </h1>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Free digital proof &amp; line-item pricing for your sign or print project.
          </p>
        </div>
      </section>

      {/* ── Main Streamlined Form Container ─────────────────────────────── */}
      <main className="max-w-5xl mx-auto px-3 sm:px-4 py-4 sm:py-6 w-full flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

          {/* ── SHORTENED HIGH-CONVERSION FORM (8 Cols) ─────────────────── */}
          <div className="lg:col-span-7">
            <div className="bg-slate-900/95 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-2xl backdrop-blur-md">
              
              {submitError && (
                <div className="mb-4 p-3 rounded-xl bg-red-950/70 border border-red-800/80 text-red-200 text-xs flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                  <span>{submitError}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">

                {/* 1. Category Dropdown & Quick Selector */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 font-poppins">
                    1. Product Category <span className="text-pink-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={selectedCatId}
                      onChange={(e) => handleCategoryChange(e.target.value)}
                      className="w-full appearance-none bg-slate-950 border border-slate-800 focus:border-pink-500 text-white rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold focus:outline-none cursor-pointer pr-10"
                    >
                      {CATEGORIES.map((cat) => (
                        <option key={cat.id} value={cat.id} className="bg-slate-900 text-white">
                          {cat.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                {/* 2. What do you need? (Unified project details) */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider font-poppins">
                      2. Project Details <span className="text-pink-500">*</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowDimensions(!showDimensions)}
                      className="text-[11px] font-bold text-pink-400 hover:text-pink-300 transition-colors flex items-center gap-1"
                    >
                      <Ruler className="w-3 h-3" />
                      {showDimensions ? "Hide Dimensions" : "+ Add Exact Dimensions"}
                    </button>
                  </div>

                  {showDimensions && (
                    <div className="grid grid-cols-2 gap-2 mb-2 p-2.5 bg-slate-950/80 border border-slate-800 rounded-xl">
                      <div className="relative">
                        <input
                          type="number"
                          step="any"
                          placeholder={`Width (${unit})`}
                          value={width}
                          onChange={(e) => setWidth(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 focus:border-pink-500 rounded-lg pl-2.5 pr-7 py-1.5 text-xs text-white focus:outline-none"
                        />
                        <span className="absolute right-2 top-2 text-[10px] text-slate-400 uppercase font-bold">{unit}</span>
                      </div>
                      <div className="relative">
                        <input
                          type="number"
                          step="any"
                          placeholder={`Height (${unit})`}
                          value={height}
                          onChange={(e) => setHeight(e.target.value)}
                          className="w-full bg-slate-900 border border-slate-800 focus:border-pink-500 rounded-lg pl-2.5 pr-7 py-1.5 text-xs text-white focus:outline-none"
                        />
                        <span className="absolute right-2 top-2 text-[10px] text-slate-400 uppercase font-bold">{unit}</span>
                      </div>
                    </div>
                  )}

                  <textarea
                    rows={2}
                    required
                    placeholder="Tell us what you need (sign size, text, colors, indoor or outdoor)..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-pink-500 rounded-xl p-3 text-xs sm:text-sm text-white focus:outline-none leading-relaxed"
                  />
                </div>

                {/* 3. Compact Optional Artwork Upload */}
                <div>
                  <label className="relative flex items-center justify-between p-2.5 rounded-xl border border-dashed border-slate-800 bg-slate-950 hover:border-pink-500 cursor-pointer transition-all group">
                    <input
                      type="file"
                      accept="image/*,.pdf,.eps,.ai,.psd,.zip"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <div className="flex items-center gap-2">
                      <Camera className="w-4 h-4 text-pink-400 shrink-0" />
                      <span className="text-xs text-slate-300 font-medium truncate max-w-[220px] sm:max-w-xs">
                        {fileUploading ? "Uploading..." : file ? file.name : "Attach logo or site photo (Optional)"}
                      </span>
                    </div>
                    <span className="text-[11px] font-bold text-pink-400 uppercase tracking-wider font-poppins px-2 py-0.5 rounded bg-pink-500/10">
                      {file ? "Change" : "Browse"}
                    </span>
                  </label>
                  {fileError && <p className="text-[11px] text-red-400 mt-1">{fileError}</p>}
                </div>

                {/* 4. Contact Details (Clean & fast) */}
                <div className="pt-2 border-t border-slate-800/80 space-y-2.5">
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider font-poppins">
                    3. Contact Details
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div className="relative">
                      <User className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        required
                        placeholder="Your Name *"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 focus:border-pink-500 rounded-xl pl-8 pr-3 py-2 text-xs sm:text-sm text-white focus:outline-none"
                      />
                    </div>

                    <div className="relative">
                      <Mail className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
                      <input
                        type="email"
                        required
                        placeholder="Email (for quote) *"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 focus:border-pink-500 rounded-xl pl-8 pr-3 py-2 text-xs sm:text-sm text-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <Phone className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
                    <input
                      type="tel"
                      placeholder="Phone Number (Optional, for instant SMS proof)"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-pink-500 rounded-xl pl-8 pr-3 py-2 text-xs sm:text-sm text-white focus:outline-none"
                    />
                  </div>
                </div>

                {/* Rush Order Checkbox */}
                <div className="flex items-center gap-2 pt-1">
                  <label className="inline-flex items-center gap-2 text-xs text-slate-300 font-semibold cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isRushOrder}
                      onChange={(e) => setIsRushOrder(e.target.checked)}
                      className="w-4 h-4 rounded text-pink-500 focus:ring-pink-500 bg-slate-900 border-slate-700 cursor-pointer"
                    />
                    <span className="flex items-center gap-1">
                      <Zap className="w-3.5 h-3.5 text-amber-400" /> Rush order needed (Same-day / 1-2 days)
                    </span>
                  </label>
                </div>

                {/* High-Impact CTA Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-gradient-to-r from-[#ff2d78] to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-black py-3.5 px-6 rounded-xl font-poppins text-sm sm:text-base transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,45,120,0.4)] disabled:opacity-50 cursor-pointer"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" /> Submitting...
                      </>
                    ) : (
                      <>
                        Get My Free Quote (Within 4 Hours) 🚀
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-center text-slate-400 mt-2 font-medium flex items-center justify-center gap-1">
                    <Lock className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                    100% Free Proof • No Obligation • Fast South Florida Response
                  </p>
                </div>

              </form>
            </div>
          </div>

          {/* ── SIDEBAR (5 Cols) ────────────────────────────────────────── */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Quick Contact Box */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-xl backdrop-blur-md">
              <h3 className="text-xs font-bold text-white font-poppins mb-2 flex items-center gap-2 uppercase tracking-wider">
                <Phone className="w-3.5 h-3.5 text-pink-400" /> Need Immediate Pricing?
              </h3>
              
              <div className="space-y-2 text-xs font-poppins">
                <a
                  href="tel:3059671005"
                  className="flex items-center justify-between bg-slate-950 hover:bg-slate-800 border border-slate-800 p-2.5 rounded-xl transition-colors text-white font-bold"
                >
                  <span className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-pink-400" /> (305) 967-1005
                  </span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-semibold">Live Shop</span>
                </a>

                <a
                  href="sms:3059671005?body=Hi%20Nano%20Signs%2C%20I%20need%20a%20quote."
                  className="flex items-center justify-between bg-gradient-to-r from-pink-500/20 to-rose-500/20 hover:from-pink-500/30 border border-pink-500/40 p-2.5 rounded-xl transition-colors text-pink-300 font-bold"
                >
                  <span className="flex items-center gap-2">
                    <MessageSquare className="w-3.5 h-3.5 text-pink-400" /> Instant SMS Quote
                  </span>
                  <span className="text-[10px] bg-[#ff2d78] text-white px-2 py-0.5 rounded font-semibold">Text Us</span>
                </a>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 sm:p-5 space-y-3">
              <div className="flex items-center gap-2.5 pb-2 border-b border-slate-800">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
                <span className="text-xs font-bold text-white font-poppins">4.9/5 Star Rated in South Florida</span>
              </div>

              <div className="space-y-2.5 text-xs text-slate-300">
                <div className="flex items-start gap-2">
                  <Clock className="w-3.5 h-3.5 text-pink-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white">4-Hour Response:</span>
                    <span className="text-slate-400 text-[11px] block">Line-item quote &amp; proof delivered in 4 business hours.</span>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white">Local Oakland Park Shop:</span>
                    <span className="text-slate-400 text-[11px] block">4567 Powerline Rd. Pickup, delivery &amp; install available.</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </main>

      {/* Mobile Sticky Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-slate-900/95 border-t border-slate-800 p-2.5 backdrop-blur-lg md:hidden">
        <div className="max-w-md mx-auto grid grid-cols-2 gap-2">
          <a
            href="tel:3059671005"
            className="flex items-center justify-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs py-2.5 px-3 rounded-xl border border-slate-700 font-poppins transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-pink-400" /> Call Now
          </a>
          <a
            href="sms:3059671005?body=Hi%20Nano%20Signs%2C%20I%20need%20a%20quote."
            className="flex items-center justify-center gap-1.5 bg-[#ff2d78] hover:bg-pink-600 text-white font-bold text-xs py-2.5 px-3 rounded-xl font-poppins shadow-md shadow-pink-500/20 transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5 text-white" /> SMS Quote
          </a>
        </div>
      </div>

      <Footer />
    </div>
  );
}
