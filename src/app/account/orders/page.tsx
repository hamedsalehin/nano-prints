"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/components/AuthContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { supabase } from "@/lib/supabaseClient";
import {
  FileText,
  Loader2,
  Calendar,
  ShoppingBag,
  ExternalLink,
  ArrowRight,
  UserPlus,
  CheckCircle,
  Package,
  Clock,
  ShieldAlert,
} from "lucide-react";
import Link from "next/link";

interface Order {
  id: string;
  product_title: string;
  product_size: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  design_url: string | null;
  design_filename: string | null;
  custom_options: Record<string, string>;
  status: string;
  created_at: string;
}

export default function OrdersPage() {
  const { user, loading: authLoading, setShowAuthModal } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      setLoading(false);
      return;
    }

    const fetchOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data, error } = await supabase
          .from("orders")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        setOrders(data || []);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError(
          err instanceof Error
            ? err.message
            : "Failed to load orders. Please try again.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, authLoading]);

  // Formats date nicely
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const getStatusBadge = (status: string) => {
    const baseClasses =
      "px-3 py-1 rounded-full text-xs font-bold font-poppins capitalize flex items-center gap-1.5 w-fit";
    switch (status.toLowerCase()) {
      case "completed":
        return (
          <span
            className={`${baseClasses} bg-green-50 text-green-700 border border-green-200`}
          >
            <CheckCircle className="w-3.5 h-3.5" />
            Completed
          </span>
        );
      case "shipped":
        return (
          <span
            className={`${baseClasses} bg-blue-50 text-blue-700 border border-blue-200`}
          >
            <Package className="w-3.5 h-3.5" />
            Shipped
          </span>
        );
      case "processing":
        return (
          <span
            className={`${baseClasses} bg-amber-50 text-amber-700 border border-amber-200`}
          >
            <Clock className="w-3.5 h-3.5 animate-pulse" />
            Processing
          </span>
        );
      default: // pending
        return (
          <span
            className={`${baseClasses} bg-gray-50 text-gray-700 border border-gray-200`}
          >
            <Clock className="w-3.5 h-3.5" />
            Pending Check
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col">
      <Header />

      <main className="flex-grow max-w-7xl mx-auto px-4 py-12 w-full font-opensans">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-slate-950 font-poppins">
            My Account
          </h1>
          <p className="text-gray-500 mt-1">
            Manage your printing orders and uploaded finished designs.
          </p>
        </div>

        {authLoading || (loading && user) ? (
          /* Loading State */
          <div className="py-24 text-center flex flex-col items-center justify-center space-y-4">
            <Loader2 className="w-10 h-10 text-[#ff2d78] animate-spin" />
            <p className="text-gray-500 font-semibold">
              Loading your order history...
            </p>
          </div>
        ) : !user ? (
          /* Access Denied / Log In Prompt */
          <div className="max-w-md mx-auto bg-white rounded-3xl border border-pink-100 shadow-xl p-8 text-center my-12 animate-in fade-in duration-300">
            <div className="w-16 h-16 bg-pink-50 text-[#ff2d78] rounded-full flex items-center justify-center mx-auto mb-6 border border-pink-100">
              <ShieldAlert className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold font-poppins text-slate-950">
              Authentication Required
            </h2>
            <p className="text-sm text-gray-500 mt-2.5 leading-relaxed">
              Please sign in to your account or create a new account to view
              your past printing orders and upload designs.
            </p>
            <div className="mt-8 space-y-3">
              <button
                onClick={() => setShowAuthModal(true)}
                className="w-full active:scale-[0.98] text-white font-extrabold py-3.5 rounded-2xl transition-all text-sm uppercase tracking-wider shadow-md font-poppins flex items-center justify-center gap-2 hover:opacity-90"
                style={{
                  background:
                    "linear-gradient(135deg, #ff2d78, #b020ff, #00e5ff)",
                  boxShadow: "0 4px 15px rgba(255,45,120,0.2)",
                }}
              >
                Sign In / Create Account
                <ArrowRight className="w-4 h-4" />
              </button>
              <Link
                href="/"
                className="block text-center text-xs text-gray-400 font-bold hover:text-gray-600 transition-colors py-2"
              >
                Return to Homepage
              </Link>
            </div>
          </div>
        ) : error ? (
          /* Error State */
          <div className="max-w-xl mx-auto bg-red-50 border border-red-200 rounded-3xl p-6 text-red-800 text-center my-12 animate-in fade-in duration-300">
            <h2 className="text-lg font-bold">Failed to Fetch Orders</h2>
            <p className="text-sm mt-2 text-red-700">{error}</p>
          </div>
        ) : orders.length === 0 ? (
          /* Empty Orders State */
          <div className="bg-white rounded-3xl border border-pink-100 shadow-md p-12 text-center max-w-xl mx-auto my-12 animate-in fade-in duration-300">
            <div className="w-16 h-16 bg-slate-50 text-gray-400 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-slate-950 font-poppins">
              No Orders Placed Yet
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              You haven't ordered any custom signs, banners, or flags yet.
              Customize a product and upload your finished design to get
              started!
            </p>
            <div className="mt-8">
              <Link
                href="/custom-signs"
                className="inline-flex items-center gap-2 active:scale-[0.98] text-white font-extrabold px-8 py-3.5 rounded-2xl transition-all text-xs uppercase tracking-wider shadow-md font-poppins hover:opacity-90"
                style={{
                  background:
                    "linear-gradient(135deg, #ff2d78, #b020ff, #00e5ff)",
                  boxShadow: "0 4px 15px rgba(255,45,120,0.2)",
                }}
              >
                Browse Signs
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ) : (
          /* Orders List */
          <div className="grid gap-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-3xl border border-gray-150 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden animate-in fade-in duration-300"
              >
                {/* Order Header / Card Top bar */}
                <div className="bg-slate-50 border-b border-gray-100 px-6 py-4.5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-semibold text-gray-500">
                    <div>
                      <span className="uppercase text-[10px] tracking-wider text-gray-400 block mb-0.5">
                        Order Placed
                      </span>
                      <span className="text-slate-800 font-bold flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-gray-400" />
                        {formatDate(order.created_at)}
                      </span>
                    </div>
                    <div>
                      <span className="uppercase text-[10px] tracking-wider text-gray-400 block mb-0.5">
                        Order Total
                      </span>
                      <span className="text-slate-900 font-extrabold text-sm font-poppins">
                        ${order.total_price.toFixed(2)}
                      </span>
                    </div>
                    <div>
                      <span className="uppercase text-[10px] tracking-wider text-gray-400 block mb-0.5">
                        Order ID
                      </span>
                      <code className="text-[11px] font-bold text-gray-600 bg-white border rounded-lg px-2 py-0.5">
                        {order.id}
                      </code>
                    </div>
                  </div>
                  <div>{getStatusBadge(order.status)}</div>
                </div>

                {/* Order Body */}
                <div className="p-6 md:p-8 flex flex-col md:flex-row justify-between gap-8">
                  {/* Order Specs */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-slate-950 font-poppins truncate">
                      {order.product_title}
                    </h3>
                    <p className="text-xs text-gray-500 font-semibold mt-1">
                      Size: {order.product_size} • Quantity: {order.quantity} ($
                      {order.unit_price.toFixed(2)} each)
                    </p>

                    {/* Specifications grid */}
                    {Object.entries(order.custom_options).filter(([key]) => key !== "Design Data").length > 0 && (
                      <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
                        {Object.entries(order.custom_options)
                          .filter(([key]) => key !== "Design Data")
                          .map(([key, val]) => (
                            <div key={key} className="text-xs">
                              <span className="text-gray-400 font-semibold block uppercase text-[9px] tracking-wider">
                                {key}
                              </span>
                              <span className="text-slate-800 font-bold block mt-0.5 leading-tight">
                                {val}
                              </span>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>

                  {/* Artwork / Finished Design */}
                  <div className="md:w-64 shrink-0 flex flex-col justify-center gap-3 bg-slate-50 border border-slate-100 rounded-2xl p-5">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider block">
                      Customer Artwork
                    </h4>

                    {order.design_url ? (
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-xs text-green-800 font-bold bg-green-50 border border-green-200/50 rounded-xl p-2.5">
                          <FileText className="w-4 h-4 text-green-600 shrink-0" />
                          <span
                            className="truncate max-w-[150px]"
                            title={
                              order.design_filename || "Finished Design.pdf"
                            }
                          >
                            {order.design_filename || "Finished Design.pdf"}
                          </span>
                        </div>
                        <a
                          href={order.design_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full text-center bg-white border border-gray-200 hover:border-slate-300 text-gray-800 font-bold py-2 px-4 rounded-xl transition-all text-xs flex items-center justify-center gap-1.5 shadow-sm active:scale-[0.98]"
                        >
                          View PDF
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    ) : (
                      <div className="text-xs text-gray-400 italic py-2 flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-300 shrink-0" />
                        Artwork customized via online canvas editor
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
