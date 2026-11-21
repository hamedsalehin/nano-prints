"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/components/AuthContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import {
  Mail,
  Lock,
  User as UserIcon,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

function parseAuthError(err: unknown): string {
  if (!err) return "An unexpected error occurred.";
  if (err instanceof Error) {
    const msg = err.message?.trim();
    if (!msg || msg === "{}" || msg === "{}") {
      return "Sign-up failed. This is usually because email delivery isn't configured yet. Please contact the site administrator or try again later.";
    }
    if (msg.toLowerCase().includes("email rate limit")) {
      return "Too many sign-up attempts. Please wait a few minutes and try again.";
    }
    if (msg.toLowerCase().includes("user already registered")) {
      return "An account with this email already exists. Please sign in instead.";
    }
    if (msg.toLowerCase().includes("invalid login credentials")) {
      return "Incorrect email or password. Please try again.";
    }
    if (msg.toLowerCase().includes("email not confirmed")) {
      return "Please verify your email address before signing in. Check your inbox for a verification link.";
    }
    if (msg.toLowerCase().includes("password should be")) {
      return "Password must be at least 6 characters long.";
    }
    return msg;
  }
  const str = String(err);
  if (str === "[object Object]" || str === "{}") {
    return "Sign-up failed. Email delivery may not be configured. Please contact the site administrator.";
  }
  return str || "An unexpected error occurred.";
}

export default function LoginPageClient() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // If already logged in, redirect to home or account
  useEffect(() => {
    if (!authLoading && user) {
      router.push("/account/orders");
    }
  }, [user, authLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);
    setLoading(true);

    try {
      if (mode === "login") {
        const { error: signInErr } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (signInErr) throw signInErr;
        router.push("/account/orders");
      } else {
        const { error: signUpErr } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
            },
          },
        });
        if (signUpErr) throw signUpErr;
        setSuccessMsg(
          "Account created successfully! Check your email to confirm your account, or sign in now."
        );
        setMode("login");
      }
    } catch (err: unknown) {
      setError(parseAuthError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-opensans">
      <Header />

      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl max-w-md w-full p-8 sm:p-10">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold text-slate-900 font-poppins">
              {mode === "login" ? "Welcome Back" : "Create Account"}
            </h1>
            <p className="text-slate-500 text-sm mt-2">
              {mode === "login"
                ? "Sign in to track orders, save designs & manage quotes."
                : "Register for fast checkout, design history & order tracking."}
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3 text-red-700 text-sm">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-red-500" />
              <span>{error}</span>
            </div>
          )}

          {successMsg && (
            <div className="mb-6 p-4 rounded-xl bg-green-50 border border-green-200 flex items-start gap-3 text-green-700 text-sm">
              <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5 text-green-500" />
              <span>{successMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "register" && (
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5 font-poppins">
                  Full Name
                </label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#ff2d78] transition-colors"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5 font-poppins">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@business.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#ff2d78] transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5 font-poppins">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#ff2d78] transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 bg-[#ff2d78] hover:bg-[#e0265f] text-white font-bold py-3 rounded-xl text-sm transition-colors flex items-center justify-center gap-2 font-poppins shadow-lg shadow-pink-500/20 disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : mode === "login" ? (
                <>
                  Sign In <ArrowRight className="w-4 h-4" />
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            {mode === "login" ? (
              <p className="text-sm text-slate-600">
                Don&apos;t have an account?{" "}
                <button
                  onClick={() => {
                    setMode("register");
                    setError(null);
                  }}
                  className="text-[#ff2d78] font-bold hover:underline"
                >
                  Create one now
                </button>
              </p>
            ) : (
              <p className="text-sm text-slate-600">
                Already have an account?{" "}
                <button
                  onClick={() => {
                    setMode("login");
                    setError(null);
                  }}
                  className="text-[#ff2d78] font-bold hover:underline"
                >
                  Sign in
                </button>
              </p>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
