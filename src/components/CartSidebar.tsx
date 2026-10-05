"use client";

import { useState } from "react";
import {
  X,
  Trash2,
  ShoppingBag,
  Loader2,
  CheckCircle2,
  ArrowRight,
  AlertCircle,
  FileText,
} from "lucide-react";
import { useCart } from "./CartContext";
import { useAuth } from "./AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function CartSidebar() {
  const router = useRouter();
  const { items, removeItem, cartOpen, setCartOpen, checkout, discountApplied } = useCart();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successOrderIds, setSuccessOrderIds] = useState<string[] | null>(null);

  if (!cartOpen) return null;

  const handleCheckout = () => {
    setCartOpen(false);
    router.push("/checkout");
  };

  const closeSidebar = () => {
    setCartOpen(false);
    // Reset order placement screen upon closing if order was successful
    if (successOrderIds) {
      setSuccessOrderIds(null);
    }
    setError(null);
  };

  const totalCartPrice = items.reduce((acc, item) => acc + item.totalPrice, 0);
  const discountAmount = discountApplied ? totalCartPrice * 0.1 : 0;
  const finalCartPrice = totalCartPrice - discountAmount;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-opensans">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={closeSidebar}
      />

      {/* Sidebar Panel */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-pink-100 flex flex-col shadow-2xl h-full animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="px-6 py-5 border-b flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2 font-poppins">
              <ShoppingBag className="w-5 h-5 text-[#ff2d78]" />
              Your Shopping Cart
            </h2>
            <button
              onClick={closeSidebar}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
            {successOrderIds ? (
              /* Success screen */
              <div className="text-center py-12 flex flex-col items-center justify-center space-y-6">
                <div className="w-16 h-16 bg-green-50 text-green-600 border border-green-200 rounded-full flex items-center justify-center shadow-sm">
                  <CheckCircle2 className="w-10 h-10 animate-bounce" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-950 font-poppins">
                    Order Placed Successfully!
                  </h3>
                  <p className="text-sm text-gray-500 mt-2">
                    Thank you for your business. Your order is now in our
                    printing queue.
                  </p>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 w-full text-left space-y-2 text-sm font-semibold">
                  <p className="text-gray-600">Order Reference IDs:</p>
                  {successOrderIds.map((id) => (
                    <code
                      key={id}
                      className="block text-xs bg-white border rounded px-2 py-1 text-[#ff2d78] overflow-x-auto"
                    >
                      {id}
                    </code>
                  ))}
                </div>
                <Link
                  href="/account/orders"
                  onClick={closeSidebar}
                  className="w-full text-center bg-black hover:bg-gray-900 text-white font-bold py-3.5 rounded-xl transition-all block text-sm"
                >
                  View My Orders
                </Link>
              </div>
            ) : items.length === 0 ? (
              /* Empty state */
              <div className="text-center py-16 flex flex-col items-center justify-center space-y-4">
                <ShoppingBag className="w-16 h-16 text-gray-200" />
                <p className="text-gray-500 font-medium">Your cart is empty.</p>
                <button
                  onClick={closeSidebar}
                  className="text-sm font-bold text-[#ff2d78] hover:underline"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              /* Items list */
              <div className="space-y-5">
                {error && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-2xl flex gap-3 text-sm text-red-800 animate-in fade-in duration-200">
                    <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold">Checkout Error</p>
                      <p className="text-red-700 leading-normal mt-0.5">
                        {error}
                      </p>
                    </div>
                  </div>
                )}

                {items.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex gap-4 relative group"
                  >
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-gray-900 text-sm font-poppins">
                        {item.productTitle}
                      </h4>
                      <p className="text-xs text-gray-500 font-semibold mt-1">
                        Size: {item.size} • Qty: {item.quantity}
                      </p>

                      {item.designFilename && (
                        <div className="mt-2 flex items-center gap-1.5 text-xs text-green-700 font-bold bg-green-50/80 border border-green-200/50 rounded-lg px-2 py-1.5 w-fit">
                          <FileText className="w-3.5 h-3.5 shrink-0" />
                          <span className="truncate max-w-[180px]">
                            {item.designFilename}
                          </span>
                        </div>
                      )}

                      {/* Display specs */}
                      {Object.entries(item.customOptions).filter(([key]) => key !== "Design Data").length > 0 && (
                        <div className="mt-2.5 space-y-0.5">
                          {Object.entries(item.customOptions)
                            .filter(([key]) => key !== "Design Data")
                            .map(([key, val]) => (
                              <div
                                key={key}
                                className="text-[10px] text-gray-400 font-semibold"
                              >
                                <span className="text-gray-500">{key}:</span>{" "}
                                {val}
                              </div>
                            ))}
                        </div>
                      )}

                      <div className="mt-3 font-poppins font-extrabold text-sm text-gray-900">
                        ${item.totalPrice.toFixed(2)}
                      </div>
                    </div>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-1 text-gray-400 hover:text-red-600 self-start hover:bg-red-50 rounded-lg transition-all"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Checkout Footer */}
          {!successOrderIds && items.length > 0 && (
            <div className="border-t px-6 py-6 space-y-4 bg-slate-50">
              <div className="space-y-2.5 font-poppins">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-gray-500">
                    Subtotal
                  </span>
                  <span className="text-base font-bold text-gray-800">
                    ${totalCartPrice.toFixed(2)}
                  </span>
                </div>
                {discountApplied && (
                  <div className="flex items-center justify-between text-green-600">
                    <span className="text-sm font-bold flex items-center gap-1">
                      <span className="inline-block px-1.5 py-0.5 bg-green-100 text-green-800 text-[10px] font-black rounded uppercase tracking-wider">
                        10% OFF
                      </span>
                      Promo Discount
                    </span>
                    <span className="text-sm font-extrabold">
                      -${discountAmount.toFixed(2)}
                    </span>
                  </div>
                )}
                <div className="flex items-center justify-between border-t border-slate-200/60 pt-2.5">
                  <span className="text-sm font-extrabold text-gray-900">
                    Total
                  </span>
                  <span className="text-2xl font-extrabold text-[#ff2d78] drop-shadow-[0_0_8px_rgba(255,45,120,0.1)]">
                    ${finalCartPrice.toFixed(2)}
                  </span>
                </div>
              </div>
              <p className="text-[11px] text-gray-400 font-semibold leading-normal">
                Shipping and taxes will be calculated at printing confirmation.
                Free artwork check included!
              </p>
              {totalCartPrice < 29 && (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex gap-2 text-xs text-amber-800 font-semibold">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>A minimum order of $29.00 is required to checkout. Add ${(29 - totalCartPrice).toFixed(2)} more to your cart.</span>
                </div>
              )}

              <button
                onClick={handleCheckout}
                disabled={totalCartPrice < 29}
                className={`w-full text-white font-extrabold py-4 rounded-xl transition-all text-sm uppercase tracking-wider shadow-md font-poppins flex items-center justify-center gap-2 ${
                  totalCartPrice < 29 ? "opacity-50 cursor-not-allowed bg-gray-400" : "hover:opacity-90 active:scale-[0.98]"
                }`}
                style={
                  totalCartPrice < 29
                    ? {}
                    : {
                        background:
                          "linear-gradient(135deg, #ff2d78, #b020ff, #00e5ff)",
                        boxShadow: "0 4px 15px rgba(255,45,120,0.2)",
                      }
                }
              >
                Proceed to Checkout
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
