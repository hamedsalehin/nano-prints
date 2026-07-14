"use client";

import { useState } from "react";
import {
  X,
  Mail,
  Lock,
  User as UserIcon,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { useAuth } from "./AuthContext";
import { supabase } from "@/lib/supabaseClient";

function parseAuthError(err: unknown): string {
  if (!err) return "An unexpected error occurred.";
  if (err instanceof Error) {
    const msg = err.message?.trim();
    // Supabase returns '{}' when email delivery fails (SMTP not configured / rate limited)
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

export function AuthModal() {
  const { showAuthModal, setShowAuthModal } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  if (!showAuthModal) return null;

  const handleClose = () => {
    setShowAuthModal(false);
    setError(null);
    setSuccess(null);
    setEmail("");
    setPassword("");
    setFullName("");
  };

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
          // User already exists
          setError(
            "An account with this email already exists. Try signing in.",
          );
        } else {
          setSuccess(
            "Account created successfully! Check your email for a verification link.",
          );
          setTimeout(() => {
            setIsSignUp(false);
            setPassword("");
            setSuccess(null);
          }, 3000);
        }
      } else {
        // Sign In
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        handleClose();
      }
    } catch (err) {
      setError(parseAuthError(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={handleClose}
      />

      {/* Modal Content */}
      <div className="relative bg-white rounded-3xl shadow-2xl border border-pink-100 max-w-md w-full overflow-hidden z-10 transform transition-all duration-300 scale-100 animate-in fade-in zoom-in-95">
        {/* Top Gradient Banner */}
        <div className="h-2 w-full brand-gradient" />

        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold font-poppins text-gray-900">
              {isSignUp ? "Create Account" : "Welcome Back"}
            </h2>
            <p className="text-sm text-gray-500 mt-1.5 font-opensans">
              {isSignUp
                ? "Sign up to track orders & upload custom designs"
                : "Sign in to manage your signs & orders"}
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

          <form onSubmit={handleSubmit} className="space-y-4 font-opensans">
            {isSignUp && (
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <UserIcon className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="John Doe"
                    disabled={loading}
                    className="w-full bg-slate-50 border border-gray-200 rounded-2xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff2d78] focus:border-transparent transition-all"
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
                  <Mail className="w-4 h-4" />
                </span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  disabled={loading}
                  className="w-full bg-slate-50 border border-gray-200 rounded-2xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff2d78] focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <Lock className="w-4 h-4" />
                </span>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  disabled={loading}
                  className="w-full bg-slate-50 border border-gray-200 rounded-2xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#ff2d78] focus:border-transparent transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full active:scale-[0.98] text-white font-extrabold py-3.5 rounded-2xl transition-all text-sm uppercase tracking-wider shadow-md font-poppins flex items-center justify-center gap-2 hover:opacity-90 disabled:opacity-50"
              style={{
                background:
                  "linear-gradient(135deg, #ff2d78, #b020ff, #00e5ff)",
                boxShadow: "0 4px 15px rgba(255,45,120,0.2)",
              }}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Processing...
                </>
              ) : isSignUp ? (
                "Sign Up"
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Toggle link */}
          <div className="mt-6 text-center text-sm text-gray-500 font-opensans border-t pt-4">
            {isSignUp ? (
              <p>
                Already have an account?{" "}
                <button
                  onClick={() => {
                    setIsSignUp(false);
                    setError(null);
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
    </div>
  );
}
