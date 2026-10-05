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

export default function LoginPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Redirect if already logged in
  useEffect(() => {
    if (!authLoading && user) {
      router.push("/account/orders");
    }
  }, [user, authLoading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      if (isSignUp) {
        // Sign Up
        const { error, data } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
            },
          },
        });

        if (error) throw error;

        if (data?.user?.identities?.length === 0) {
          setError(
            "An account with this email already exists. Try signing in.",
          );
        } else {
          setSuccess(
            "Account created successfully! Check your email for a verification link.",
          );
          setEmail("");
          setPassword("");
          setFullName("");
        }
      } else {
        // Sign In
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        router.push("/account/orders");
      }
    } catch (err) {
      setError(parseAuthError(err));
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Header />
        <div className="flex-grow flex items-center justify-center py-24">
          <div className="text-center flex flex-col items-center gap-3">
            <Loader2 className="w-10 h-10 text-[#ff2d78] animate-spin" />
            <p className="text-gray-500 font-semibold">
              Checking authentication status...
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-opensans">
      <Header />

      <main className="flex-grow flex items-center justify-center px-4 py-16 md:py-24">
        <div className="relative bg-white rounded-3xl shadow-xl border border-pink-100 max-w-lg w-full overflow-hidden transform transition-all duration-300">
          {/* Accent Line */}
          <div className="h-2 w-full brand-gradient" />

          <div className="p-8 md:p-10">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold font-poppins text-gray-900">
                {isSignUp ? "Create Account" : "Sign In"}
              </h1>
              <p className="text-sm text-gray-500 mt-2">
                {isSignUp
                  ? "Sign up to start tracking orders and upload finished sign designs"
                  : "Sign in to manage your signs, orders, and details"}
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl flex gap-3 text-sm text-red-800 animate-in fade-in duration-200">
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">Error</p>
                  <p className="text-red-700 leading-normal mt-0.5">{error}</p>
                </div>
              </div>
            )}

            {success && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-2xl flex gap-3 text-sm text-green-800 animate-in fade-in duration-200">
                <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">Success</p>
                  <p className="text-green-700 leading-normal mt-0.5">
                    {success}
                  </p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {isSignUp && (
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                      <UserIcon className="w-4.5 h-4.5" />
                    </span>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="John Doe"
                      disabled={loading}
                      className="w-full bg-slate-50 border border-gray-200 rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff2d78] focus:border-transparent transition-all"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <Mail className="w-4.5 h-4.5" />
                  </span>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    disabled={loading}
                    className="w-full bg-slate-50 border border-gray-200 rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff2d78] focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Password
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <Lock className="w-4.5 h-4.5" />
                  </span>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    disabled={loading}
                    className="w-full bg-slate-50 border border-gray-200 rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff2d78] focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full active:scale-[0.98] text-white font-extrabold py-4 rounded-2xl transition-all text-sm uppercase tracking-wider shadow-md font-poppins flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-50"
                style={{
                  background:
                    "linear-gradient(135deg, #ff2d78, #b020ff, #00e5ff)",
                  boxShadow: "0 4px 15px rgba(255,45,120,0.15)",
                }}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    {isSignUp ? "Sign Up" : "Sign In"}
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 text-center text-sm text-gray-500 font-opensans border-t pt-5">
              {isSignUp ? (
                <p>
                  Already have an account?{" "}
                  <button
                    onClick={() => {
                      setIsSignUp(false);
                      setError(null);
                      setSuccess(null);
                    }}
                    className="font-bold text-[#ff2d78] hover:underline transition-colors"
                  >
                    Sign In
                  </button>
                </p>
              ) : (
                <p>
                  Don't have an account yet?{" "}
                  <button
                    onClick={() => {
                      setIsSignUp(true);
                      setError(null);
                      setSuccess(null);
                    }}
                    className="font-bold text-[#ff2d78] hover:underline transition-colors"
                  >
                    Sign Up
                  </button>
                </p>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
