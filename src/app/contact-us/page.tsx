"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  HelpCircle,
  ShieldCheck,
  Scale,
  ExternalLink
} from "lucide-react";

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to send message.");
      }

      setSubmitSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err: any) {
      console.error("Failed to send contact message:", err);
      setSubmitError(err.message || "Failed to submit. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-opensans">
      <Header />

      {/* Hero Header */}
      <section className="relative text-white py-16 md:py-20" style={{
        background: "linear-gradient(135deg, #0d0d1a 0%, #1a0a2f 50%, #00222a 100%)"
      }}>
        {/* Decorative Grid Patterns */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
        
        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 text-center z-10">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-pink-500/20 text-[#ff2d78] mb-4 uppercase tracking-widest border border-pink-500/30">
            Contact Support
          </span>
          <h1 className="text-4xl md:text-5xl font-poppins font-black mb-4 tracking-tight leading-tight">
            How Can We Help You?
          </h1>
          <p className="max-w-2xl mx-auto text-sm md:text-base text-gray-300 font-medium">
            Have a question about a custom print or want to check progress? Reach out to us via direct chat, phone, email, or visit our Oakland Park office.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 py-12 md:py-16">
        
        {/* Giant Chat Channels Section */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-poppins font-black text-slate-800">
              Connect With Us Instantly
            </h2>
            <p className="text-sm text-slate-500 font-medium mt-1.5">
              Click below to start a live chat with our printing experts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* WhatsApp Card */}
            <a
              href="https://wa.me/13059671005?text=Hello%20Nano%20Signs!%20I%20have%20a%20question%20about%20an%20order."
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden bg-white border border-emerald-100 rounded-3xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex items-center gap-6"
            >
              {/* WhatsApp background highlight on hover */}
              <div className="absolute inset-0 bg-emerald-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              
              <div className="relative z-10 w-16 h-16 rounded-2xl bg-emerald-100/80 flex items-center justify-center text-emerald-600 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                <MessageCircle className="w-9 h-9" />
              </div>
              <div className="relative z-10 flex-grow">
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">
                  Live Chat
                </span>
                <h3 className="text-xl md:text-2xl font-poppins font-extrabold text-slate-800 mt-0.5">
                  WhatsApp Support
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Connect on WhatsApp for real-time order updates, proof approvals, and direct quotes.
                </p>
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 mt-3 group-hover:underline">
                  Chat on WhatsApp <ExternalLink className="w-3.5 h-3.5" />
                </div>
              </div>
            </a>

            {/* Facebook Messenger Card */}
            <a
              href="https://m.me/signsnano"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden bg-white border border-blue-100 rounded-3xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex items-center gap-6"
            >
              {/* Messenger background highlight on hover */}
              <div className="absolute inset-0 bg-blue-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              
              <div className="relative z-10 w-16 h-16 rounded-2xl bg-blue-100/80 flex items-center justify-center text-blue-600 flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                <MessageCircle className="w-9 h-9" />
              </div>
              <div className="relative z-10 flex-grow">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">
                  Facebook
                </span>
                <h3 className="text-xl md:text-2xl font-poppins font-extrabold text-slate-800 mt-0.5">
                  Messenger Chat
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Send a DM to our Facebook page. We usually reply in a few minutes during business hours.
                </p>
                <div className="flex items-center gap-1.5 text-xs font-bold text-blue-600 mt-3 group-hover:underline">
                  Chat on Messenger <ExternalLink className="w-3.5 h-3.5" />
                </div>
              </div>
            </a>
          </div>
        </section>

        {/* Contact Form and Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
          
          {/* Left: Contact Form (Lg: 7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 shadow-md border border-gray-150">
            <h2 className="text-xl md:text-2xl font-poppins font-black text-slate-800 mb-2">
              Send Us a Message
            </h2>
            <p className="text-sm text-slate-500 mb-6 font-medium">
              Fill out this form and our support agents will email you back within 12 hours.
            </p>

            {submitError && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl p-4 mb-4 font-semibold font-poppins">
                ⚠️ {submitError}
              </div>
            )}

            {submitSuccess ? (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-2xl p-6 flex flex-col items-center text-center animate-in zoom-in-95 duration-200">
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mb-3">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="font-poppins font-bold text-lg">Message Sent Successfully!</h3>
                <p className="text-xs text-emerald-700 max-w-sm mt-1">
                  Thank you for reaching out. A representative will contact you at your email address shortly.
                </p>
                <button
                  onClick={() => setSubmitSuccess(false)}
                  className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 font-poppins">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="John Doe"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#ff2d78] transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#ff2d78] transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Questions regarding design approval..."
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#ff2d78] transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Enter details of your inquiry..."
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#ff2d78] transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 bg-gradient-to-r from-[#ff2d78] to-[#b020ff] hover:opacity-90 transition-opacity text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-md disabled:opacity-55"
                >
                  {submitting ? (
                    <>Sending Message...</>
                  ) : (
                    <>
                      <Send className="w-4 h-4" /> Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Right: Contact Details (Lg: 5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Quick Contact Box */}
            <div className="bg-white rounded-3xl p-8 shadow-md border border-gray-150 space-y-6">
              <h2 className="text-xl font-poppins font-black text-slate-800">
                Contact Details
              </h2>

              <div className="space-y-4">
                <a
                  href="tel:305-967-1005"
                  className="flex items-start gap-4 p-1 hover:bg-slate-50 rounded-xl transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-pink-50 text-[#ff2d78] flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                      Main Phone Support
                    </h4>
                    <p className="text-sm font-bold text-slate-700 group-hover:text-[#ff2d78] transition-colors">
                      305-967-1005
                    </p>
                  </div>
                </a>

                <a
                  href="tel:305-967-9654"
                  className="flex items-start gap-4 p-1 hover:bg-slate-50 rounded-xl transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-pink-50 text-[#ff2d78] flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                      Secondary Support Line
                    </h4>
                    <p className="text-sm font-bold text-slate-700 group-hover:text-[#ff2d78] transition-colors">
                      305-967-9654
                    </p>
                  </div>
                </a>

                <a
                  href="mailto:info@nano-signs.com"
                  className="flex items-start gap-4 p-1 hover:bg-slate-50 rounded-xl transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-cyan-50 text-[#00e5ff] flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                      Email Inquiries
                    </h4>
                    <p className="text-sm font-bold text-slate-700 group-hover:text-[#00e5ff] transition-colors">
                      Send Email
                    </p>
                  </div>
                </a>

                <div className="flex items-start gap-4 p-1">
                  <div className="w-10 h-10 rounded-lg bg-purple-50 text-[#b020ff] flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                      Headquarters
                    </h4>
                    <p className="text-sm font-bold text-slate-700">
                      4567 Powerline Rd, Oakland Park, FL 33309
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-1">
                  <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                      Business Hours
                    </h4>
                    <p className="text-sm font-bold text-slate-700">
                      Mon - Fri: 9:00 AM - 6:00 PM
                    </p>
                    <p className="text-xs text-slate-500 font-semibold mt-0.5">
                      Sat: 10:00 AM - 4:00 PM | Sun: Closed
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Return Policy Highlight Card */}
            <div className="bg-gradient-to-r from-indigo-900 to-slate-900 rounded-3xl p-8 text-white shadow-md border border-indigo-950 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-indigo-400 mb-4">
                  <Scale className="w-5 h-5" />
                </div>
                <h3 className="font-poppins font-black text-lg mb-2">
                  Need to Make a Return?
                </h3>
                <p className="text-xs text-gray-300 mb-5 leading-relaxed font-semibold">
                  We maintain strict eligibility conditions on all print materials. Please read our Return Policy carefully before submitting a request.
                </p>
              </div>
              <Link
                href="/return-policy"
                className="w-full py-3 bg-white text-indigo-900 rounded-xl text-center text-xs font-bold hover:bg-slate-100 transition-colors shadow"
              >
                View Return Policy
              </Link>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <section className="mt-16 bg-white rounded-3xl overflow-hidden shadow-md border border-gray-150 p-4">
          <div className="flex items-center gap-2 mb-4 px-2">
            <MapPin className="w-5 h-5 text-[#ff2d78]" />
            <h3 className="font-poppins font-black text-slate-800 text-lg">
              Visit Our Print Shop
            </h3>
          </div>
          <div className="rounded-2xl overflow-hidden h-[350px] border border-gray-200">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d7160.8801455159755!2d-80.15735434976504!3d26.182359067699164!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e0!4m0!4m5!1s0x88d903da421a5ec5%3A0xdd627ecbac01c685!2s4567%20Powerline%20Rd%2C%20Oakland%20Park%2C%20FL%2033309!3m2!1d26.1835062!2d-80.1554943!5e0!3m2!1sen!2sus!4v1781380571760!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Nano Signs Headquarters Location"
            ></iframe>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
