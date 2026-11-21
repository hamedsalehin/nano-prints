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

export default function OrdersPageClient() {
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
        const { data, error: fetchErr } = await supabase
          .from("orders")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (fetchErr) {
          setError(fetchErr.message);
        } else {
          setOrders(data || []);
        }
      } catch (err: any) {
        setError(err.message || "Failed to load orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, authLoading]);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-opensans">
      <Header />

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900 font-poppins">
            My Orders
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Track and manage your custom signage & print orders.
          </p>
        </div>

        {authLoading || loading ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-slate-200">
            <Loader2 className="w-8 h-8 text-[#ff2d78] animate-spin mb-3" />
            <p className="text-slate-600 font-medium text-sm">
              Loading your orders...
            </p>
          </div>
        ) : !user ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center max-w-md mx-auto shadow-sm">
            <div className="w-16 h-16 bg-pink-50 rounded-full flex items-center justify-center mx-auto mb-4 text-[#ff2d78]">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 font-poppins mb-2">
              Sign in to view orders
            </h2>
            <p className="text-slate-500 text-sm mb-6">
              You must be logged in to view and track your order history.
            </p>
            <button
              onClick={() => setShowAuthModal(true)}
              className="w-full bg-[#ff2d78] hover:bg-[#e0265f] text-white font-bold py-3 px-6 rounded-xl text-sm transition-colors flex items-center justify-center gap-2"
            >
              Sign In to Your Account
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center text-red-700">
            <ShieldAlert className="w-8 h-8 mx-auto mb-2 text-red-500" />
            <p className="font-semibold mb-1">Could not load orders</p>
            <p className="text-sm text-red-600">{error}</p>
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-lg mx-auto shadow-sm">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
              <Package className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 font-poppins mb-2">
              No orders yet
            </h2>
            <p className="text-slate-500 text-sm mb-6">
              When you place an order for custom signs or banners, you can track production and shipping right here.
            </p>
            <Link
              href="/custom-signs"
              className="inline-flex items-center gap-2 bg-[#ff2d78] hover:bg-[#e0265f] text-white font-bold py-3 px-6 rounded-xl text-sm transition-colors"
            >
              Browse Products
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                  <div>
                    <span className="text-xs font-mono text-slate-400 block mb-1">
                      Order #{order.id.slice(0, 8).toUpperCase()}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 font-poppins">
                      {order.product_title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                        order.status === "completed"
                          ? "bg-green-100 text-green-700"
                          : order.status === "processing"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      <Clock className="w-3 h-3" />
                      {order.status || "Pending"}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 text-sm">
                  <div>
                    <span className="text-slate-400 text-xs block">Date Placed</span>
                    <span className="font-medium text-slate-700">
                      {new Date(order.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-xs block">Size / Specs</span>
                    <span className="font-medium text-slate-700">
                      {order.product_size || "Custom"}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-xs block">Quantity</span>
                    <span className="font-medium text-slate-700">
                      {order.quantity}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-xs block">Total Price</span>
                    <span className="font-bold text-[#ff2d78]">
                      ${Number(order.total_price).toFixed(2)}
                    </span>
                  </div>
                </div>

                {order.design_url && (
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-500">Artwork File:</span>
                    <a
                      href={order.design_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[#ff2d78] hover:underline font-semibold"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      View Uploaded Artwork
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
