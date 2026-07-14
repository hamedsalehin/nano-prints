"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "@/components/AuthContext";
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
  Hash
} from "lucide-react";

export default function QuotePageClient() {
  const { user, setShowAuthModal } = useAuth();
  // Form states
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [quantity, setQuantity] = useState(1);

  // File upload states
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [fileUploading, setFileUploading] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);

  // Submission states
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [emailsInitialized, setEmailsInitialized] = useState(true);
  const [emailErrors, setEmailErrors] = useState<{ admin?: any; customer?: any } | null>(null);

  // Handle local file selection and Supabase storage upload
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (!user) {
      setFileError("Please sign in or create an account to upload artwork.");
      setShowAuthModal(true);
      e.target.value = "";
      return;
    }

    // Validate size (max 25MB)
    if (selectedFile.size > 25 * 1024 * 1024) {
      setFileError("File size exceeds 25MB limit.");
      return;
    }

    setFile(selectedFile);
    setFileError(null);
    setFileUploading(true);

    try {
      const fileExt = selectedFile.name.split(".").pop();
      const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
      const filePath = `quotes/${fileName}`;

      // Upload file to Supabase storage bucket 'quote-attachments'
      const { error: uploadError } = await supabase.storage
        .from("quote-attachments")
        .upload(filePath, selectedFile);

      if (uploadError) {
        throw uploadError;
      }

      // Retrieve public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from("quote-attachments").getPublicUrl(filePath);

      setFileUrl(publicUrl);
    } catch (err) {
      console.error("Storage upload failed:", err);
      setFileError(
        err instanceof Error
          ? err.message
          : "Failed to upload file. Please try again."
      );
      setFile(null);
    } finally {
      setFileUploading(false);
    }
  };

  // Handle db & email submission via API
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
          fileUrl: fileUrl,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to submit quote request.");
      }

      setEmailsInitialized(data.emailsInitialized !== false);
      setEmailErrors({
        admin: data.adminEmailError || null,
        customer: data.customerEmailError || null,
      });
      setSubmitSuccess(true);
    } catch (err) {
      console.error("Quote submission failed:", err);
      setSubmitError(
        err instanceof Error
          ? err.message
          : "An unexpected error occurred. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Header />

      <main className="flex-grow py-12">
        {/* Breadcrumb */}
        <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 mb-8 flex items-center gap-2 text-sm text-slate-500 font-['Open_Sans']">
          <Link href="/" className="hover:text-[#ff2d78] transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="font-semibold text-slate-800">Get a Quote</span>
        </div>

        {/* Form section - Expanded & minimal light theme */}
        <section className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 w-full">
          {!submitSuccess ? (
            <div className="space-y-8">
              {/* Form Header */}
              <div className="border-b border-slate-100 pb-6">
                <span className="text-[10px] md:text-xs font-extrabold uppercase tracking-widest text-[#ff2d78] flex items-center gap-1.5 mb-2">
                  <Sparkles className="w-3.5 h-3.5" /> <span className="text-black">WE PRINT EVERYTHING</span>
                </span>
                <h1 className="text-3xl md:text-4xl font-black font-poppins text-slate-800 leading-tight">
                  Custom Signage &amp; Print Quote in Fort Lauderdale
                </h1>
                <p className="text-sm text-slate-500 font-medium leading-relaxed mt-2 font-opensans max-w-3xl">
                  Need premium custom signs, LED signs, banners, business cards, or other marketing materials in Fort Lauderdale and Broward County? Specify your dimensions and upload your artwork files below. Our print specialists will email you a layout proof and pricing quote within 12 hours.
                </p>


              </div>

              {submitError && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex gap-3 text-xs md:text-sm text-red-800 font-semibold">
                  <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <span>{submitError}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                {/* Left Column: Input Fields */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-slate-400" /> Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#ff2d78] focus:ring-1 focus:ring-[#ff2d78] transition-all font-semibold text-slate-700"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-slate-400" /> Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="john@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#ff2d78] focus:ring-1 focus:ring-[#ff2d78] transition-all font-semibold text-slate-700"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Phone */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-slate-400" /> Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="305-555-0199"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#ff2d78] focus:ring-1 focus:ring-[#ff2d78] transition-all font-semibold text-slate-700"
                      />
                    </div>

                    {/* Quantity */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                        <Hash className="w-3.5 h-3.5 text-slate-400" /> Quantity *
                      </label>
                      <input
                        type="number"
                        required
                        min="1"
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value) || 1)}
                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#ff2d78] focus:ring-1 focus:ring-[#ff2d78] transition-all font-semibold text-slate-700"
                      />
                    </div>
                  </div>

                  {/* Dimensions (Size) */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                      <Scale className="w-3.5 h-3.5 text-slate-400" /> Dimensions (Optional)
                    </label>
                    <div className="grid grid-cols-2 gap-5">
                      <input
                        type="text"
                        placeholder="Width (e.g. 24 inches)"
                        value={width}
                        onChange={(e) => setWidth(e.target.value)}
                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#ff2d78] focus:ring-1 focus:ring-[#ff2d78] transition-all font-semibold text-slate-700"
                      />
                      <input
                        type="text"
                        placeholder="Height (e.g. 36 inches)"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#ff2d78] focus:ring-1 focus:ring-[#ff2d78] transition-all font-semibold text-slate-700"
                      />
                    </div>
                  </div>
                </div>

                {/* Right Column: Textarea & File Upload */}
                <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
                  {/* Description */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-slate-400" /> What do you need printed? *
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Describe your project requirements (e.g. materials, shape, double-sided, stakes, or custom finishing)."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#ff2d78] focus:ring-1 focus:ring-[#ff2d78] transition-all font-semibold text-slate-700 resize-y min-h-[120px]"
                    />
                  </div>

                  {/* File Upload */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Attach Artwork or Sketch</label>
                    {fileError && (
                      <p className="text-xs text-red-600 font-semibold">{fileError}</p>
                    )}

                    {!fileUrl ? (
                      <div className="relative group border-2 border-dashed border-slate-200 hover:border-[#ff2d78] rounded-xl p-5 text-center bg-slate-50/30 transition-colors cursor-pointer flex flex-col items-center justify-center gap-1.5">
                        <input
                          type="file"
                          accept="application/pdf,image/png,image/jpeg,image/jpg"
                          onChange={handleFileChange}
                          onClick={(e) => {
                            if (!user) {
                              e.preventDefault();
                              setFileError("Please sign in or create an account to upload artwork.");
                              setShowAuthModal(true);
                            }
                          }}
                          disabled={fileUploading}
                          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                        />
                        {fileUploading ? (
                          <>
                            <Loader2 className="w-6 h-6 text-[#ff2d78] animate-spin" />
                            <p className="text-xs text-slate-500 font-semibold">Uploading artwork...</p>
                          </>
                        ) : (
                          <>
                            <UploadCloud className="w-6 h-6 text-slate-400 group-hover:text-[#ff2d78] transition-colors" />
                            <p className="text-xs text-slate-600 font-bold">
                              Drag &amp; drop or <span className="text-[#ff2d78] underline font-bold">browse file</span>
                            </p>
                            <p className="text-[9px] text-slate-400 font-medium">PDF, PNG, JPG up to 25MB</p>
                          </>
                        )}
                      </div>
                    ) : (
                      <div className="p-3.5 bg-green-50/40 border border-green-200 rounded-xl flex items-center justify-between shadow-sm">
                        <div className="flex items-center gap-3">
                          <CheckCircle2 className="w-5 h-5 text-green-600" />
                          <div>
                            <p className="text-xs font-bold text-green-950 truncate max-w-[180px]">
                              {file?.name}
                            </p>
                            <p className="text-[9px] text-green-600 font-medium">Uploaded successfully</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setFile(null);
                            setFileUrl(null);
                          }}
                          className="text-xs text-red-500 hover:text-red-700 underline font-bold"
                        >
                          Remove
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={submitting || fileUploading}
                    className="w-full text-center border-2 border-[#ff2d78] text-[#ff2d78] hover:bg-[#ff2d78] hover:text-white bg-transparent active:scale-[0.99] font-extrabold py-3.5 rounded-xl transition-all text-xs md:text-sm uppercase tracking-wider flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Submitting Request...
                      </>
                    ) : (
                      "Submit Quote Request"
                    )}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            /* SUCCESS CONFIRMATION BLOCK */
            <div className="bg-white rounded-2xl border border-slate-100 shadow-md p-10 max-w-xl mx-auto text-center space-y-6">
              <div className="w-16 h-16 bg-green-50 text-green-500 border border-green-200 rounded-full flex items-center justify-center shadow-md mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black font-poppins text-slate-800 leading-tight">
                  Request Received!
                </h3>
                <p className="text-[#ff2d78] font-extrabold uppercase tracking-wider text-xs">
                  We will get back to you shortly
                </p>
              </div>

              <div className="p-5 bg-slate-50 border border-slate-100 rounded-xl space-y-3 text-sm text-slate-600 text-left font-opensans">
                <p className="leading-relaxed">
                  Thank you, <span className="font-extrabold text-slate-800">{fullName}</span>. Your custom quote request has been saved.
                </p>
                <p className="leading-relaxed">
                  Our formatting and layout specialists will review your specs and details. We will email you a print proof and pricing breakdown at <span className="font-bold text-slate-800">{email}</span> within <span className="font-bold text-[#ff2d78]">12 hours</span>.
                </p>

                {!emailsInitialized && (
                  <div className="mt-3 p-3.5 bg-amber-55/60 border border-amber-200 rounded-xl text-xs text-amber-800 leading-normal flex gap-2 items-start font-sans">
                    <AlertCircle className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
                    <div>
                      <span className="font-bold">⚠️ Server Notification:</span> Email confirmation was skipped because the server does not have <code>RESEND_API_KEY</code> configured. Please configure it in your Netlify settings.
                    </div>
                  </div>
                )}
                {emailsInitialized && (emailErrors?.admin || emailErrors?.customer) && (
                  <div className="mt-3 p-3.5 bg-red-55/60 border border-red-200 rounded-xl text-xs text-red-800 leading-normal flex gap-2 items-start font-sans">
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-600 mt-0.5" />
                    <div>
                      <span className="font-bold">❌ Email Confirmation Failed:</span>
                      <ul className="list-disc list-inside mt-1 space-y-1">
                        {emailErrors.admin && <li>Admin Notify: {emailErrors.admin.message || JSON.stringify(emailErrors.admin)}</li>}
                        {emailErrors.customer && <li>Customer Confirm: {emailErrors.customer.message || JSON.stringify(emailErrors.customer)}</li>}
                      </ul>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4 justify-center">
                <Link
                  href="/"
                  className="px-6 py-3 border-2 border-[#ff2d78] text-[#ff2d78] hover:bg-[#ff2d78] hover:text-white bg-transparent font-bold text-xs uppercase tracking-wider rounded-xl transition-all text-center"
                >
                  Back to Homepage
                </Link>
                <button
                  onClick={() => {
                    setSubmitSuccess(false);
                    setFullName("");
                    setEmail("");
                    setPhone("");
                    setDescription("");
                    setWidth("");
                    setHeight("");
                    setQuantity(1);
                    setFile(null);
                    setFileUrl(null);
                  }}
                  className="px-6 py-3 border-2 border-slate-200 hover:border-[#ff2d78] hover:text-[#ff2d78] text-slate-500 font-bold text-xs uppercase tracking-wider rounded-xl transition-all bg-white"
                >
                  Submit Another Quote
                </button>
              </div>
            </div>
          )}
        </section>
      </main>

      <Footer light={true} />
    </div>
  );
}
