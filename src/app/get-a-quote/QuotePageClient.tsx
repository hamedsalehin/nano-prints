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
  AlertTriangle
} from "lucide-react";

// Product Categories Updated per Customer Conversion Focus
const CATEGORIES = [
  {
    id: "custom-led-signs",
    label: "Custom LED Signs",
    hint: "Programmable RGB tickers, moving text displays, outdoor LED boards & window screens.",
    defaultUnit: "ft",
  },
  {
    id: "led-display-signs",
    label: "LED Display Signs",
    hint: "Full-color video displays, digital screens, poster boards & indoor LED panels.",
    defaultUnit: "ft",
  },
  {
    id: "channel-letters",
    label: "Channel Letters",
    hint: "3D illuminated storefront letters, halo-lit channel letters & front-lit LED building logos.",
    defaultUnit: "ft",
  },
  {
    id: "promotional-materials",
    label: "Promotional Materials",
    hint: "Business cards, flyers, rack cards, custom postcards, presentation folders & stickers.",
    defaultUnit: "in",
  },
  {
    id: "neon-signs",
    label: "LED Neon Sign",
    hint: "Custom LED neon flex signs for restaurants, bars, events, weddings & home decor.",
    defaultUnit: "in",
  },
  {
    id: "banners-flags",
    label: "Banner or Flag",
    hint: "Heavy-duty vinyl banners, retractable roll-up stands, mesh banners & feather flags.",
    defaultUnit: "ft",
  },
  {
    id: "vehicle-graphics",
    label: "Vehicle Graphics",
    hint: "Custom car door magnets, vehicle lettering, perforated window graphics & full wraps.",
    defaultUnit: "ft",
  },
  {
    id: "tradeshow",
    label: "Tradeshow Display",
    hint: "Custom table covers, step & repeat backdrops, canopy tents & event pop-up banners.",
    defaultUnit: "ft",
  },
  {
    id: "custom-other",
    label: "Other / Custom",
    hint: "Custom metal plaques, yard signs, architectural signage & special print projects.",
    defaultUnit: "in",
  },
];

export default function QuotePageClient() {
  const router = useRouter();

  // Selected Category State
  const [selectedCatId, setSelectedCatId] = useState<string>("custom-led-signs");
  const activeCategory = CATEGORIES.find((c) => c.id === selectedCatId) || CATEGORIES[0];

  // Dimensions & Unit Toggle System
  const [width, setWidth] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const [unit, setUnit] = useState<"ft" | "in">(activeCategory.defaultUnit as "ft" | "in");

  // Project Specs & Description
  const [description, setDescription] = useState<string>("");

  // Rush Order State
  const [isRushOrder, setIsRushOrder] = useState<boolean>(false);

  // Contact Info Split (3 Distinct Columns)
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

  // Handle Category Selection
  const handleCategoryChange = (catId: string) => {
    setSelectedCatId(catId);
    const cat = CATEGORIES.find((c) => c.id === catId);
    if (cat) {
      setUnit(cat.defaultUnit as "ft" | "in");
    }
  };

  // Handle File Selection & Upload
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (selectedFile.size > 25 * 1024 * 1024) {
      setFileError("File size exceeds 25MB limit. Please email directly to info@nano-signs.com.");
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
    } catch (err: any) {
      setFileUrl("attached_local");
    } finally {
      setFileUploading(false);
    }
  };

  // Form Submission Logic
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim() || !email.trim() || !description.trim()) {
      setSubmitError("Please fill out your Name, Email Address, and Project Details.");
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
          description: `${rushPrefix}[Category: ${activeCategory.label}] [Dimensions: ${formattedDimensions || "Not specified"}] ${description.trim()}`,
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
      <section className="bg-gradient-to-b from-slate-900 to-slate-950 pt-20 pb-4 px-4 text-center border-b border-slate-800">
        <div className="max-w-3xl mx-auto space-y-1.5">
          <div className="inline-flex items-center gap-1.5 bg-pink-500/10 border border-pink-500/30 text-pink-400 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-widest font-poppins">
            <Zap className="w-3 h-3 text-pink-400" /> Fast 4-Hour Custom Quote Guarantee
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white font-poppins tracking-tight">
            Request a Free <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-400">Custom Sign Quote</span>
          </h1>
          <p className="text-xs text-slate-400 max-w-lg mx-auto">
            Get precision pricing, digital proof &amp; local South Florida service in under 4 hours.
          </p>
        </div>
      </section>

      {/* ── Main Compact Form Container ─────────────────────────────────── */}
      <main className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6 w-full flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

          {/* ── MAIN FORM CONTAINER (Left / Primary Focus) ────────────────── */}
          <div className="lg:col-span-8">
            <div className="bg-slate-900/95 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-2xl backdrop-blur-md">
              
              {submitError && (
                <div className="mb-4 p-3 rounded-xl bg-red-950/70 border border-red-800/80 text-red-200 text-xs flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                  <span>{submitError}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">

                {/* ── STEP 1: Product Category Selection ─────────────────── */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider font-poppins flex items-center gap-1.5">
                    <span className="w-4 h-4 rounded-full bg-[#ff2d78] text-white flex items-center justify-center text-[10px]">1</span>
                    Select Product Category <span className="text-pink-500">*</span>
                  </label>

                  {/* Category Chips */}
                  <div
                    role="listbox"
                    aria-label="Product Category Selection"
                    className="flex flex-wrap gap-2"
                  >
                    {CATEGORIES.map((cat) => {
                      const isSelected = selectedCatId === cat.id;
                      return (
                        <button
                          key={cat.id}
                          type="button"
                          role="option"
                          aria-selected={isSelected}
                          onClick={() => handleCategoryChange(cat.id)}
                          className={`text-xs font-bold font-poppins px-3 py-2 rounded-lg border transition-all duration-150 cursor-pointer ${
                            isSelected
                              ? "bg-[#ff2d78] text-white border-pink-400 shadow-[0_0_15px_rgba(255,45,120,0.35)] scale-[1.02]"
                              : "bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700 hover:bg-slate-900 hover:text-white"
                          }`}
                        >
                          {cat.label}
                        </button>
                      );
                    })}
                  </div>

                  {/* Category Hint Box */}
                  {activeCategory.hint && (
                    <div className="p-2.5 rounded-lg bg-slate-950/80 border border-slate-800/80 text-[11px] text-pink-300/90 flex items-center gap-2 font-medium">
                      <Sparkles className="w-3.5 h-3.5 text-pink-400 flex-shrink-0" />
                      <span>{activeCategory.hint}</span>
                    </div>
                  )}
                </div>

                {/* ── STEP 2: Dimensions & Unit Selector System ────────────── */}
                <div className="space-y-2 pt-3 border-t border-slate-800/80">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider font-poppins flex items-center gap-1.5">
                      <Ruler className="w-3.5 h-3.5 text-pink-400" />
                      Dimensions (Optional)
                    </label>

                    {/* Unit Toggle Button [ ft | in ] */}
                    <div className="flex items-center bg-slate-950 border border-slate-800 p-0.5 rounded-lg text-xs">
                      <button
                        type="button"
                        onClick={() => setUnit("ft")}
                        className={`px-2.5 py-0.5 rounded font-bold transition-all text-[11px] ${
                          unit === "ft" ? "bg-pink-500 text-white shadow-sm" : "text-slate-400 hover:text-white"
                        }`}
                      >
                        ft
                      </button>
                      <button
                        type="button"
                        onClick={() => setUnit("in")}
                        className={`px-2.5 py-0.5 rounded font-bold transition-all text-[11px] ${
                          unit === "in" ? "bg-pink-500 text-white shadow-sm" : "text-slate-400 hover:text-white"
                        }`}
                      >
                        in
                      </button>
                    </div>
                  </div>

                  {/* Width & Height Input Fields */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <div className="relative">
                        <input
                          type="number"
                          step="any"
                          placeholder={unit === "ft" ? "Width (e.g. 4 ft)" : "Width (e.g. 48 in)"}
                          value={width}
                          onChange={(e) => setWidth(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 focus:border-pink-500 rounded-xl pl-3 pr-8 py-2 text-xs text-white focus:outline-none font-poppins"
                        />
                        <span className="absolute right-3 top-2 text-[11px] font-bold text-slate-500 uppercase">{unit}</span>
                      </div>
                    </div>

                    <div>
                      <div className="relative">
                        <input
                          type="number"
                          step="any"
                          placeholder={unit === "ft" ? "Height (e.g. 2 ft)" : "Height (e.g. 24 in)"}
                          value={height}
                          onChange={(e) => setHeight(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 focus:border-pink-500 rounded-xl pl-3 pr-8 py-2 text-xs text-white focus:outline-none font-poppins"
                        />
                        <span className="absolute right-3 top-2 text-[11px] font-bold text-slate-500 uppercase">{unit}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ── STEP 3: Project Specifications & Artwork Upload ───────── */}
                <div className="space-y-3 pt-3 border-t border-slate-800/80">
                  <div>
                    <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider mb-1 font-poppins flex items-center gap-1.5">
                      <span className="w-4 h-4 rounded-full bg-[#ff2d78] text-white flex items-center justify-center text-[10px]">2</span>
                      Project Description &amp; Wording <span className="text-pink-500">*</span>
                    </label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Describe text, colors, indoor vs outdoor, or mounting surface."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-pink-500 rounded-xl p-3 text-xs sm:text-sm text-white focus:outline-none leading-relaxed"
                    />
                  </div>

                  {/* Artwork / Photo Upload Bar */}
                  <div>
                    <label className="relative flex items-center justify-between p-3 rounded-xl border border-dashed border-slate-700 bg-slate-950 hover:border-pink-500 cursor-pointer transition-all duration-150 group">
                      <input
                        type="file"
                        accept="image/*,.pdf,.eps,.ai,.psd,.zip"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-pink-500/10 text-pink-400 flex items-center justify-center border border-pink-500/20 flex-shrink-0">
                          <Camera className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-xs font-bold text-white font-poppins block">
                            {fileUploading ? "Uploading..." : file ? file.name : "Attach Artwork, Logo, or Site Photo"}
                          </span>
                        </div>
                      </div>

                      <span className="px-3 py-1 rounded-lg border-2 border-pink-500 text-pink-300 font-bold text-[11px] uppercase tracking-wider font-poppins shadow-[0_0_10px_rgba(255,45,120,0.3)] group-hover:bg-pink-500 group-hover:text-white transition-all">
                        Browse
                      </span>
                    </label>
                    {fileError && <p className="text-xs text-red-400 mt-1 font-semibold">{fileError}</p>}
                  </div>
                </div>

                {/* ── STEP 4: Dedicated 3-Column Contact Form ─────────────── */}
                <div className="space-y-3 pt-3 border-t border-slate-800/80">
                  <label className="block text-xs font-bold text-slate-200 uppercase tracking-wider font-poppins flex items-center gap-1.5">
                    <span className="w-4 h-4 rounded-full bg-[#ff2d78] text-white flex items-center justify-center text-[10px]">3</span>
                    Contact Information <span className="text-pink-500">*</span>
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <div className="relative">
                        <User className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3" />
                        <input
                          type="text"
                          required
                          placeholder="Full Name *"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 focus:border-pink-500 rounded-xl pl-8 pr-3 py-2 text-xs text-white focus:outline-none font-sans"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="relative">
                        <Mail className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3" />
                        <input
                          type="email"
                          required
                          placeholder="Email Address *"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 focus:border-pink-500 rounded-xl pl-8 pr-3 py-2 text-xs text-white focus:outline-none font-sans"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="relative">
                        <Phone className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3" />
                        <input
                          type="tel"
                          placeholder="Phone Number"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 focus:border-pink-500 rounded-xl pl-8 pr-3 py-2 text-xs text-white focus:outline-none font-sans"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* ── Rush Order Option ───────────────────────────────────── */}
                <div className="pt-2">
                  <label className="flex items-center gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-amber-500/50 cursor-pointer transition-colors">
                    <input
                      type="checkbox"
                      checked={isRushOrder}
                      onChange={(e) => setIsRushOrder(e.target.checked)}
                      className="w-4 h-4 rounded text-pink-500 focus:ring-pink-500 bg-slate-900 border-slate-700 cursor-pointer"
                    />
                    <span className="text-xs font-bold text-slate-200 font-poppins flex items-center gap-1.5">
                      <Zap className="w-4 h-4 text-amber-400" />
                      Rush Order Needed (Same-Day / Next-Day Turnaround)
                    </span>
                  </label>
                </div>

                {/* ── High-Contrast Primary CTA Button & Trust Micro-Text ── */}
                <div className="pt-1">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-gradient-to-r from-[#ff2d78] to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-black py-3.5 px-6 rounded-xl font-poppins text-base transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,45,120,0.4)] disabled:opacity-50 cursor-pointer"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" /> Submitting...
                      </>
                    ) : (
                      <>
                        Submit Quote Request 🚀
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-center text-slate-400 mt-2 font-medium flex items-center justify-center gap-1">
                    <Lock className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                    🔒 100% Free Proof • No Obligation • Guaranteed Response Within 4 Hours
                  </p>
                </div>

              </form>
            </div>
          </div>

          {/* ── RIGHT/SIDEBAR CONTAINER ───────────────────────────────────── */}
          <div className="lg:col-span-4 space-y-4">
            
            {/* Direct Contact Assistance Card with Live Shop & Email Button */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl backdrop-blur-md">
              <h3 className="text-sm font-bold text-white font-poppins mb-2 flex items-center gap-2">
                <Phone className="w-4 h-4 text-pink-400" /> Need Instant Help?
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-3">
                Reach our Fort Lauderdale studio team directly:
              </p>
              
              <div className="space-y-2 text-xs font-poppins">
                <a
                  href="tel:3059671005"
                  className="flex items-center justify-between bg-slate-950 hover:bg-slate-800 border border-slate-800 p-2.5 rounded-xl transition-colors text-white font-bold"
                >
                  <span className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-pink-400" /> Call (305) 967-1005
                  </span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-semibold">Live Shop</span>
                </a>

                <a
                  href="mailto:info@nano-signs.com"
                  className="flex items-center justify-between bg-slate-950 hover:bg-slate-800 border border-slate-800 p-2.5 rounded-xl transition-colors text-white font-bold"
                >
                  <span className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-pink-400" /> info@nano-signs.com
                  </span>
                  <span className="text-[10px] bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded font-semibold">Direct Email</span>
                </a>

                <a
                  href="sms:3059671005?body=Hi%20Nano%20Signs%2C%20I%20need%20a%20quote."
                  className="flex items-center justify-between bg-gradient-to-r from-pink-500/20 to-rose-500/20 hover:from-pink-500/30 border border-pink-500/40 p-2.5 rounded-xl transition-colors text-pink-300 font-bold"
                >
                  <span className="flex items-center gap-2">
                    <MessageSquare className="w-3.5 h-3.5 text-pink-400" /> Quick SMS Quote
                  </span>
                  <span className="text-[10px] bg-[#ff2d78] text-white px-2 py-0.5 rounded font-semibold">Instant Text</span>
                </a>
              </div>
            </div>

            {/* Why South Florida Businesses Trust Us */}
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 space-y-3">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-poppins">
                Why Businesses Trust Us:
              </h4>

              <div className="space-y-3 text-xs text-slate-300">
                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-pink-500/20 text-pink-400 border border-pink-500/30 flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Clock className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-white font-poppins text-xs">4-Hour Quote Guarantee</h5>
                    <p className="text-slate-400 text-[11px] leading-normal">Line-item pricing &amp; digital proofs delivered within 4 business hours.</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center flex-shrink-0 shadow-sm">
                    <Award className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-white font-poppins text-xs">Commercial Grade Quality</h5>
                    <p className="text-slate-400 text-[11px] leading-normal">Outdoor acrylics, 6,500+ nit LEDs, and weather-sealed cabinets.</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center flex-shrink-0 shadow-sm">
                    <MapPin className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-white font-poppins text-xs">Local South Florida Shop</h5>
                    <p className="text-slate-400 text-[11px] leading-normal">Oakland Park &amp; Fort Lauderdale storefront, delivery &amp; installation.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Rating Badge */}
            <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                  ))}
                </div>
                <div>
                  <div className="text-xs font-bold text-white font-poppins">4.9/5 Star Rating</div>
                  <div className="text-[10px] text-slate-400">Over 890+ Local Projects</div>
                </div>
              </div>
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </div>

          </div>

        </div>
      </main>

      {/* Persistent Mobile Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-slate-900/95 border-t border-slate-800 p-2.5 backdrop-blur-lg md:hidden">
        <div className="max-w-md mx-auto grid grid-cols-2 gap-2">
          <a
            href="tel:3059671005"
            className="flex items-center justify-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs py-2.5 px-3 rounded-xl border border-slate-700 font-poppins transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-pink-400" /> Call 305-967-1005
          </a>
          <a
            href="sms:3059671005?body=Hi%20Nano%20Signs%2C%20I%20need%20a%20quote."
            className="flex items-center justify-center gap-1.5 bg-[#ff2d78] hover:bg-pink-600 text-white font-bold text-xs py-2.5 px-3 rounded-xl font-poppins shadow-md shadow-pink-500/20 transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5 text-white" /> Quick SMS Quote
          </a>
        </div>
      </div>

      <Footer />
    </div>
  );
}
