"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  UploadCloud,
  Loader2,
  CheckCircle2,
  Sparkles,
  Phone,
  Mail,
  User,
  ShieldCheck,
  Star,
  Clock,
  MapPin,
  ArrowRight,
  ArrowLeft,
  Camera,
  MessageSquare,
  Zap,
  Check,
  Info,
  Tv,
  Layers,
  Flag,
  Car,
  Award,
  Maximize2
} from "lucide-react";

// Visual Sign Types for Step 1
const SIGN_TYPES = [
  { id: "led-display", label: "LED & Ticker Signs", icon: Tv, badge: "Popular" },
  { id: "acrylic-sign", label: "Custom Acrylic & 3D Logo", icon: Layers, badge: "Best Seller" },
  { id: "neon-signs", label: "LED Neon Flex Signs", icon: Sparkles, badge: "Trending" },
  { id: "banners-flags", label: "Banners & Feather Flags", icon: Flag, badge: "Fast Print" },
  { id: "vehicle-graphics", label: "Vehicle Signs & Wraps", icon: Car, badge: "High ROI" },
  { id: "tradeshow", label: "Tradeshow Tents & Displays", icon: Award, badge: "Event Ready" },
];

export default function QuoteV2Client() {
  const router = useRouter();

  // Wizard Step state (1, 2, or 3)
  const [step, setStep] = useState<number>(1);

  // Form states
  const [selectedType, setSelectedType] = useState<string>("led-display");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [description, setDescription] = useState("");

  // Contact info
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // File upload states
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [fileUploading, setFileUploading] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);

  // Submission states
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Handle File Upload
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (selectedFile.size > 25 * 1024 * 1024) {
      setFileError("File size exceeds 25MB limit.");
      return;
    }

    setFile(selectedFile);
    setFileError(null);
    setFileUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const res = await fetch("/api/upload-artwork", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Upload failed");
      setFileUrl(data.publicUrl || "attached");
    } catch (err: any) {
      setFileUrl("attached_local");
    } finally {
      setFileUploading(false);
    }
  };

  // Step Validation & Navigation
  const nextStep = () => {
    if (step === 1 && !selectedType) return;
    if (step === 2 && !description.trim()) {
      setSubmitError("Please provide a brief description of your project or sign needs.");
      return;
    }
    setSubmitError(null);
    setStep((prev) => Math.min(prev + 1, 3));
    if (typeof window !== "undefined") window.scrollTo({ top: 150, behavior: "smooth" });
  };

  const prevStep = () => {
    setSubmitError(null);
    setStep((prev) => Math.max(prev - 1, 1));
  };

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName || !email || !phone) {
      setSubmitError("Please complete your name, email, and phone number.");
      return;
    }

    setSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch("/api/submit-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: fullName.trim(),
          email: email.trim().toLowerCase(),
          phone: phone.trim(),
          description: `[Category: ${selectedType}] ${description.trim()}`,
          width: width ? width.trim() : null,
          height: height ? height.trim() : null,
          quantity: Number(quantity) || 1,
          fileUrl: fileUrl || (file ? file.name : null),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Submission failed");

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

      {/* ── Top Hero Banner (Mobile Optimized) ─────────────────────────── */}
      <section className="bg-gradient-to-b from-slate-900 to-slate-950 pt-28 pb-8 px-4 border-b border-slate-800">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-pink-500/10 border border-pink-500/30 text-pink-400 text-xs font-bold px-3.5 py-1.5 rounded-full mb-4 uppercase tracking-widest font-poppins">
            <Zap className="w-3.5 h-3.5 text-pink-400" /> Fast 12-Hour Mobile Quote Guarantee
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white font-poppins leading-tight tracking-tight mb-3">
            Get Your Custom <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-400">Sign Quote</span>
          </h1>
          <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            Fill out 3 quick steps below or call <a href="tel:3059671005" className="text-pink-400 font-bold hover:underline">305-967-1005</a> for instant phone assistance in Fort Lauderdale &amp; Oakland Park, FL.
          </p>

          {/* Trust Badges Bar */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-6 text-xs text-slate-300 font-medium">
            <div className="flex items-center gap-1.5 bg-slate-900/80 border border-slate-800 px-3 py-1.5 rounded-lg">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" /> 4.9/5 Rated Sign Shop
            </div>
            <div className="flex items-center gap-1.5 bg-slate-900/80 border border-slate-800 px-3 py-1.5 rounded-lg">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> 100% Free &amp; No Obligation
            </div>
            <div className="flex items-center gap-1.5 bg-slate-900/80 border border-slate-800 px-3 py-1.5 rounded-lg">
              <MapPin className="w-3.5 h-3.5 text-pink-400" /> Local South FL Facility
            </div>
          </div>
        </div>
      </section>

      {/* ── Main Wizard Container ───────────────────────────────────────── */}
      <main className="max-w-2xl mx-auto px-4 py-8 w-full flex-1">
        
        {/* Step Indicator Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-xs font-bold font-poppins text-slate-400 mb-2 uppercase tracking-wider">
            <span>Step {step} of 3</span>
            <span className="text-pink-400">
              {step === 1 && "Select Sign Type"}
              {step === 2 && "Project Details & Artwork"}
              {step === 3 && "Contact Info & Submit"}
            </span>
          </div>

          {/* Animated Progress Bar */}
          <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700/50">
            <div
              className="h-full bg-gradient-to-r from-pink-500 to-rose-400 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-5 sm:p-8 shadow-2xl shadow-slate-950 backdrop-blur-md">
          
          {submitError && (
            <div className="mb-6 p-4 rounded-xl bg-red-950/60 border border-red-800/80 text-red-200 text-sm flex items-start gap-3">
              <Info className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <span>{submitError}</span>
            </div>
          )}

          {/* ── STEP 1: Select Sign Type & Dimensions ───────────────────── */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-white font-poppins mb-1">What kind of sign do you need?</h2>
                <p className="text-xs text-slate-400">Tap a product category below to get started.</p>
              </div>

              {/* Grid of Sign Types */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {SIGN_TYPES.map((type) => {
                  const IconComp = type.icon;
                  const isSelected = selectedType === type.id;
                  return (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setSelectedType(type.id)}
                      className={`relative flex flex-col items-center justify-center p-4 rounded-2xl border text-center transition-all duration-200 ${
                        isSelected
                          ? "bg-gradient-to-b from-pink-950/40 to-slate-900 border-pink-500 shadow-[0_0_20px_rgba(255,45,120,0.25)] scale-[1.02]"
                          : "bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900"
                      }`}
                    >
                      {type.badge && (
                        <span className="absolute top-2 right-2 text-[10px] font-bold bg-pink-500/20 text-pink-300 border border-pink-500/30 px-2 py-0.5 rounded-full">
                          {type.badge}
                        </span>
                      )}
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 ${
                        isSelected ? "bg-[#ff2d78] text-white shadow-lg shadow-pink-500/30" : "bg-slate-800 text-slate-400"
                      }`}>
                        <IconComp className="w-6 h-6" />
                      </div>
                      <span className="text-xs sm:text-sm font-bold text-white font-poppins leading-tight">
                        {type.label}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Optional Dimensions Section */}
              <div className="pt-4 border-t border-slate-800">
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 font-poppins">
                  Estimated Size (Optional)
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <input
                      type="text"
                      placeholder='Width (e.g. 48")'
                      value={width}
                      onChange={(e) => setWidth(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-pink-500 rounded-xl px-3.5 py-3 text-sm text-white focus:outline-none"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder='Height (e.g. 24")'
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-pink-500 rounded-xl px-3.5 py-3 text-sm text-white focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Next Button */}
              <button
                type="button"
                onClick={nextStep}
                className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold py-4 px-6 rounded-2xl font-poppins transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-pink-500/30 text-base"
              >
                Continue to Step 2 <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          )}

          {/* ── STEP 2: Project Description & Artwork Upload ─────────────── */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-white font-poppins mb-1">Tell us about your project</h2>
                <p className="text-xs text-slate-400">Describe your sign text, colors, or mounting location.</p>
              </div>

              {/* Description Input */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 font-poppins">
                  Project Description <span className="text-pink-500">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Example: We need a double-sided illuminated exterior storefront sign for our restaurant in Fort Lauderdale. Wording: 'LUIGI'S PIZZA'."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-pink-500 rounded-xl p-4 text-sm text-white focus:outline-none leading-relaxed"
                />
              </div>

              {/* File / Camera Upload */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 font-poppins">
                  Attach Artwork or Site Photo (Optional)
                </label>
                <label className="relative flex flex-col items-center justify-center p-6 rounded-2xl border-2 border-dashed border-slate-700 bg-slate-950/80 hover:border-pink-500 hover:bg-slate-950 cursor-pointer transition-all">
                  <input
                    type="file"
                    accept="image/*,.pdf,.eps,.ai,.psd,.zip"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  {fileUploading ? (
                    <div className="flex items-center gap-3 text-pink-400 text-sm font-medium">
                      <Loader2 className="w-5 h-5 animate-spin" /> Uploading file...
                    </div>
                  ) : fileUrl || file ? (
                    <div className="flex items-center gap-2 text-emerald-400 text-sm font-bold">
                      <CheckCircle2 className="w-5 h-5" /> {file?.name || "File attached successfully"}
                    </div>
                  ) : (
                    <div className="text-center space-y-2">
                      <div className="w-12 h-12 rounded-full bg-pink-500/10 text-pink-400 flex items-center justify-center mx-auto border border-pink-500/20">
                        <Camera className="w-6 h-6" />
                      </div>
                      <p className="text-xs text-slate-300 font-medium">
                        Tap to select file or <span className="text-pink-400 font-bold">Take Photo</span> with phone camera
                      </p>
                      <p className="text-[11px] text-slate-500">Supports PNG, JPG, PDF, AI, Vector up to 25MB</p>
                    </div>
                  )}
                </label>
                {fileError && <p className="text-xs text-red-400 mt-1">{fileError}</p>}
              </div>

              {/* Navigation Buttons */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={prevStep}
                  className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold py-3.5 px-4 rounded-xl text-sm font-poppins transition-colors flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  className="flex-[2] bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold py-3.5 px-6 rounded-xl text-sm font-poppins transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-pink-500/30"
                >
                  Continue to Contact Info <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ── STEP 3: Contact Details & Instant Submit ────────────────── */}
          {step === 3 && (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <h2 className="text-xl font-bold text-white font-poppins mb-1">Where should we send your quote?</h2>
                <p className="text-xs text-slate-400">Our sign specialists will respond within 12 business hours.</p>
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 font-poppins">
                  Full Name <span className="text-pink-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-pink-500 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none"
                  />
                </div>
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 font-poppins">
                  Email Address <span className="text-pink-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    required
                    placeholder="john@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-pink-500 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none"
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5 font-poppins">
                  Phone Number <span className="text-pink-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                  <input
                    type="tel"
                    required
                    placeholder="(954) 555-0199"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-pink-500 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none"
                  />
                </div>
              </div>

              {/* Privacy Callout */}
              <p className="text-[11px] text-slate-400 flex items-center gap-1.5 pt-1">
                <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" /> Your information is 100% private &amp; never shared with third parties.
              </p>

              {/* Submit Button */}
              <div className="flex items-center gap-3 pt-3">
                <button
                  type="button"
                  onClick={prevStep}
                  disabled={submitting}
                  className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold py-4 px-4 rounded-xl text-sm font-poppins transition-colors flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold py-4 px-6 rounded-xl font-poppins text-base transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-pink-500/30 disabled:opacity-50"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" /> Submitting Request...
                    </>
                  ) : (
                    <>
                      Submit Free Quote Request <Check className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </main>

      {/* ── Persistent Floating Action Bar for Mobile Users ─────────────── */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-slate-900/95 border-t border-slate-800 p-3 backdrop-blur-lg md:hidden">
        <div className="max-w-md mx-auto grid grid-cols-2 gap-2">
          <a
            href="tel:3059671005"
            className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs py-3 px-3 rounded-xl border border-slate-700 font-poppins transition-colors"
          >
            <Phone className="w-4 h-4 text-pink-400" /> Call 305-967-1005
          </a>
          <a
            href="sms:3059671005?body=Hi%20Nano%20Signs%2C%20I%20would%20like%20a%20quick%20quote%20for%20a%20custom%20sign."
            className="flex items-center justify-center gap-2 bg-[#ff2d78] hover:bg-pink-600 text-white font-bold text-xs py-3 px-3 rounded-xl font-poppins shadow-md shadow-pink-500/20 transition-colors"
          >
            <MessageSquare className="w-4 h-4 text-white" /> Quick SMS Quote
          </a>
        </div>
      </div>

      <Footer />
    </div>
  );
}
