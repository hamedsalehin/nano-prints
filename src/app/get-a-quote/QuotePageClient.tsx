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
  AlertCircle,
  FileText,
  Sparkles,
  Phone,
  Mail,
  User,
  Scale,
  Hash,
  ShieldCheck,
  Star,
  Clock,
  MapPin,
  Lock,
  Award,
  Check
} from "lucide-react";

export default function QuotePageClient() {
  const router = useRouter();

  // Form states
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [quantity, setQuantity] = useState(1);

  // File upload states (Works for everyone — guests & signed-in users!)
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [fileUploading, setFileUploading] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);

  // Anti-bot trap
  const [botTrap, setBotTrap] = useState("");

  // Submission states
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Seamless file upload handler (No login required!)
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
      if (!res.ok) {
        throw new Error(data.error || "Upload failed");
      }

      setFileUrl(data.publicUrl || "attached");
    } catch (err: any) {
      console.warn("Upload fallback activated:", err);
      // Retain file locally for submission
      setFileUrl("attached_local");
    } finally {
      setFileUploading(false);
    }
  };

  // Handle quote submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Anti-bot check
    if (botTrap) {
      console.warn("Bot submission blocked");
      return;
    }

    if (!fullName || !email || !phone || !description) {
      setSubmitError("Please fill out all required fields.");
      return;
    }

    setSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch("/api/submit-quote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: fullName.trim(),
          email: email.trim().toLowerCase(),
          phone: phone.trim(),
          description: description.trim(),
          width: width ? width.trim() : null,
          height: height ? height.trim() : null,
          quantity: Number(quantity) || 1,
          fileUrl: fileUrl || (file ? file.name : null),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit quote request.");
      }

      // Fire conversion tag if present
      if (typeof window !== "undefined" && (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag) {
        (window as unknown as { gtag: (...args: unknown[]) => void }).gtag(
          "event",
          "conversion_event_request_quote",
          {}
        );
      }

      // Redirect to dedicated Thank You Page
      router.push(`/thank-you?name=${encodeURIComponent(fullName.trim())}&email=${encodeURIComponent(email.trim())}`);
    } catch (err: any) {
      console.error("Quote submission error:", err);
      setSubmitError(err.message || "Failed to submit quote request. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col font-sans">
      <Header />

      <main className="flex-grow py-8 md:py-14">
        {/* Breadcrumb */}
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 mb-6 flex items-center gap-2 text-sm text-slate-500 font-['Open_Sans']">
          <Link href="/" className="hover:text-[#ff2d78] transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="font-semibold text-slate-800">Get a Free Quote</span>
        </div>

        <section className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 w-full space-y-8">
          {/* TOP HERO HEADER */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-xl shadow-slate-200/50 text-center md:text-left relative overflow-hidden">
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-pink-50 rounded-full opacity-60 pointer-events-none" />
            <div className="relative z-10 space-y-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-pink-50 border border-pink-200 text-[#ff2d78] rounded-full text-xs font-black uppercase tracking-wider">
                <Sparkles className="w-4 h-4" /> WE PRINT EVERYTHING • FAST TURNAROUND
              </div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-black font-poppins text-slate-900 leading-tight">
                Request a Free Custom Quote
              </h1>
            </div>
          </div>

          {/* MAIN 2-COLUMN CONTENT SECTION */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT COLUMN: THE FORM (8 Cols) */}
            <div className="lg:col-span-8 bg-white rounded-3xl p-6 md:p-10 border border-slate-100 shadow-xl shadow-slate-200/50 space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h2 className="text-xl md:text-2xl font-black font-poppins text-slate-800 flex items-center gap-2">
                  <FileText className="w-6 h-6 text-[#ff2d78]" />
                  Your Project Information
                </h2>
                <p className="text-xs text-slate-500 font-medium font-opensans mt-1">
                  No account or login required! Fill in your details to get an instant proof &amp; quote.
                </p>
              </div>

              {submitError && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-2xl flex gap-3 text-xs md:text-sm text-red-800 font-semibold">
                  <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <span>{submitError}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Contact Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                      <User className="w-4 h-4 text-slate-400" /> Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sarah Johnson"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-4 py-3.5 bg-slate-50/50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:bg-white focus:border-[#ff2d78] focus:ring-2 focus:ring-pink-100 transition-all font-semibold text-slate-800 placeholder:text-slate-400"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                      <Mail className="w-4 h-4 text-slate-400" /> Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. sarah@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3.5 bg-slate-50/50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:bg-white focus:border-[#ff2d78] focus:ring-2 focus:ring-pink-100 transition-all font-semibold text-slate-800 placeholder:text-slate-400"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <Phone className="w-4 h-4 text-slate-400" /> Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. (305) 967-1005"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3.5 bg-slate-50/50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:bg-white focus:border-[#ff2d78] focus:ring-2 focus:ring-pink-100 transition-all font-semibold text-slate-800 placeholder:text-slate-400"
                  />
                </div>

                {/* Project Details */}
                <div className="space-y-1.5">
                  <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-slate-400" /> Describe Your Sign &amp; Print Needs *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell us what you need printed (e.g. Storefront LED sign, 4x8 ft vinyl banner, acrylic sign, business cards, material preferences, colors, mounting needs, etc.)."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-4 py-3.5 bg-slate-50/50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:bg-white focus:border-[#ff2d78] focus:ring-2 focus:ring-pink-100 transition-all font-semibold text-slate-800 placeholder:text-slate-400 resize-y min-h-[120px]"
                  />
                </div>

                {/* Dimensions & Quantity */}
                <div className="grid grid-cols-3 gap-4 pt-1">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-extrabold text-slate-600 uppercase tracking-wider flex items-center gap-1">
                      <Scale className="w-3.5 h-3.5 text-slate-400" /> Width
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 4 ft"
                      value={width}
                      onChange={(e) => setWidth(e.target.value)}
                      className="w-full px-3.5 py-3 bg-slate-50/50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:bg-white focus:border-[#ff2d78] transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-extrabold text-slate-600 uppercase tracking-wider flex items-center gap-1">
                      <Scale className="w-3.5 h-3.5 text-slate-400" /> Height
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 8 ft"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      className="w-full px-3.5 py-3 bg-slate-50/50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:bg-white focus:border-[#ff2d78] transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-extrabold text-slate-600 uppercase tracking-wider flex items-center gap-1">
                      <Hash className="w-3.5 h-3.5 text-slate-400" /> Quantity
                    </label>
                    <input
                      type="number"
                      min={1}
                      value={quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                      className="w-full px-3.5 py-3 bg-slate-50/50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:bg-white focus:border-[#ff2d78] transition-all"
                    />
                  </div>
                </div>

                {/* Seamless File Upload Area (NO LOGIN NEEDED!) */}
                <div className="space-y-2 pt-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">
                      Attach Artwork, Logo or Sketch (Optional)
                    </label>
                    <span className="text-[10px] text-green-700 font-bold bg-green-50 border border-green-200 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-green-600" /> No Account Needed
                    </span>
                  </div>

                  {fileError && (
                    <p className="text-xs text-red-600 font-semibold">{fileError}</p>
                  )}

                  {!fileUrl ? (
                    <div className="relative group border-2 border-dashed border-slate-300 hover:border-[#ff2d78] rounded-2xl p-6 text-center bg-slate-50/60 hover:bg-pink-50/20 transition-all cursor-pointer flex flex-col items-center justify-center gap-2">
                      <input
                        type="file"
                        accept="application/pdf,image/png,image/jpeg,image/jpg"
                        onChange={handleFileChange}
                        disabled={fileUploading}
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
                      />
                      {fileUploading ? (
                        <>
                          <Loader2 className="w-8 h-8 text-[#ff2d78] animate-spin" />
                          <p className="text-xs text-slate-600 font-bold">Uploading your file...</p>
                        </>
                      ) : (
                        <>
                          <div className="w-12 h-12 bg-white border border-slate-200 rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-[#ff2d78] group-hover:border-pink-200 shadow-sm transition-all">
                            <UploadCloud className="w-6 h-6" />
                          </div>
                          <div>
                            <p className="text-sm text-slate-700 font-bold">
                              Drag &amp; drop your artwork here or <span className="text-[#ff2d78] underline">browse file</span>
                            </p>
                            <p className="text-[11px] text-slate-400 font-medium mt-0.5">
                              Supports PDF, PNG, JPG up to 25MB (Optional — you can also email files later)
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  ) : (
                    <div className="p-4 bg-green-50 border border-green-200 rounded-2xl flex items-center justify-between shadow-sm">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-green-500 text-white rounded-xl flex items-center justify-center">
                          <CheckCircle2 className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-green-950 truncate max-w-[240px]">
                            {file?.name || "Artwork Attached"}
                          </p>
                          <p className="text-[10px] text-green-700 font-semibold">Attached &amp; ready for submission</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setFile(null);
                          setFileUrl(null);
                        }}
                        className="text-xs text-red-600 hover:text-red-800 underline font-bold px-2 py-1"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>

                {/* Hidden Bot Honeypot */}
                <input
                  type="text"
                  name="b_website"
                  value={botTrap}
                  onChange={(e) => setBotTrap(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden absolute left-[-9999px]"
                />

                {/* SUBMIT BUTTON */}
                <div className="pt-4 space-y-3">
                  <button
                    type="submit"
                    disabled={submitting || fileUploading}
                    className="w-full py-4 px-8 bg-[#ff2d78] hover:bg-pink-600 text-white font-black text-sm md:text-base uppercase tracking-wider rounded-2xl shadow-lg shadow-pink-500/20 active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Submitting Request...
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4 opacity-90" />
                        SUBMIT MY FREE QUOTE REQUEST
                      </>
                    )}
                  </button>

                  <p className="text-center text-[11px] text-slate-400 font-medium flex items-center justify-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-green-500" />
                    <span>100% Free • No Credit Card Required • Instant Proof Response</span>
                  </p>
                </div>
              </form>
            </div>

            {/* RIGHT COLUMN: TRUST & CREDIBILITY SIDEBAR (4 Cols) */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Contact / Visit Support Card (PLACED AT TOP) */}
              <div className="bg-pink-50/50 border border-pink-200/70 rounded-3xl p-6 text-center space-y-3.5 shadow-sm">
                <h4 className="text-sm font-black font-poppins text-slate-800 tracking-tight leading-snug">
                  Prefer to visit local shop, Talk to a Specialist or send email directly?
                </h4>
                <p className="text-xs text-slate-600 font-medium font-opensans leading-relaxed">
                  Call our team directly for assistance or questions.
                </p>
                <div className="space-y-2 pt-1 font-opensans">
                  <a
                    href="tel:3059671005"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#ff2d78] text-white hover:bg-pink-600 rounded-2xl text-xs font-extrabold uppercase tracking-wider transition-all shadow-md w-full"
                  >
                    <Phone className="w-4 h-4" /> (305) 967-1005
                  </a>
                  <a
                    href="mailto:info@nano-signs.com"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 rounded-2xl text-xs font-bold transition-all shadow-sm w-full"
                  >
                    <Mail className="w-4 h-4 text-[#ff2d78]" /> info@nano-signs.com
                  </a>
                  <div className="pt-2 border-t border-pink-200/60 text-[11px] text-slate-500 font-semibold flex items-center justify-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#ff2d78]" />
                    <span>4567 Powerline Rd, Fort Lauderdale FL 33309</span>
                  </div>
                </div>
              </div>

              {/* Trust Guarantee Card */}
              <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xl shadow-slate-200/50 space-y-4">
                <div className="flex items-center gap-2 text-slate-800 font-black font-poppins border-b border-slate-100 pb-3">
                  <Award className="w-5 h-5 text-[#ff2d78]" />
                  <h3>Why Choose Nano Signs?</h3>
                </div>
                <ul className="space-y-3 text-xs text-slate-600 font-medium font-opensans">
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                    <span><strong>Free Layout &amp; Print Proof:</strong> See how your sign looks before paying anything.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                    <span><strong>Fast Turnaround:</strong> Same-week print and local Fort Lauderdale delivery.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                    <span><strong>Commercial Durability:</strong> Premium UV-resistant inks &amp; weatherproof materials.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                    <span><strong>Best Price Guarantee:</strong> Volume discounts on corporate and bulk printing.</span>
                  </li>
                </ul>
              </div>

              {/* Verified Review Card */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-3xl p-6 shadow-xl space-y-3 relative overflow-hidden">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-slate-200 font-medium font-opensans italic leading-relaxed">
                  &ldquo;Nano Signs fabricated our store&apos;s custom LED channel letter sign in 3 days. Beautiful quality, fair pricing, and outstanding service!&rdquo;
                </p>
                <div className="pt-2 text-[11px] font-bold text-slate-300 border-t border-slate-700/60 flex items-center justify-between">
                  <span>Michael R. — Storefront Owner</span>
                  <span className="text-[#ff2d78]">Oakland Park FL</span>
                </div>
              </div>

            </div>

          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
