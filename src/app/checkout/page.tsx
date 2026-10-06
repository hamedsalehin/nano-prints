"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useCart } from "@/components/CartContext";
import { useAuth } from "@/components/AuthContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { supabase } from "@/lib/supabaseClient";
import {
  ShoppingBag,
  MapPin,
  Truck,
  CreditCard,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Building2,
  Home,
  Check,
  ShieldCheck,
} from "lucide-react";
import { getItemPhysicalSpecs } from "@/lib/shippingCalculator";

// Initialize Stripe client-side loading
const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "";
const stripePromise = stripePublishableKey ? loadStripe(stripePublishableKey) : null;

export default function CheckoutPage() {
  const { items, clearCart, discountApplied } = useCart();
  const { user, setShowAuthModal } = useAuth();

  const [shippingAddress, setShippingAddress] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    state: "FL",
    postal: "",
    phone: "",
  });

  const [freightOptions, setFreightOptions] = useState({
    residential: true,
    liftgate: false,
  });

  const [shippingRates, setShippingRates] = useState<any[]>([]);
  const [selectedRateId, setSelectedRateId] = useState<string>("");
  const [calculatingRates, setCalculatingRates] = useState(false);
  const [rateError, setRateError] = useState<string | null>(null);

  // Stripe clientSecret and UI State
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [intentLoading, setIntentLoading] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [successOrderIds, setSuccessOrderIds] = useState<string[]>([]);

  // Calculate pricing breakdown
  const subtotal = items.reduce((acc, item) => acc + item.totalPrice, 0);
  const discount = discountApplied ? subtotal * 0.1 : 0.0;
  const itemsTotal = subtotal - discount;

  const selectedRate = shippingRates.find((r) => r.id === selectedRateId);
  const shippingCost = selectedRate ? selectedRate.price : 0;

  const isFlorida = shippingAddress.postal.trim().startsWith("32") || shippingAddress.postal.trim().startsWith("33") || shippingAddress.postal.trim().startsWith("34");
  const taxRate = isFlorida ? 0.07 : 0.0;
  const taxAmount = Math.round(itemsTotal * taxRate * 100) / 100;

  const baseTotal = itemsTotal + shippingCost + taxAmount;
  const totalToCharge = (baseTotal + 0.30) / (1 - 0.029);
  const stripeFee = totalToCharge - baseTotal;
  const finalTotal = totalToCharge;
  // Determine if freight LTL is required for cart items
  const isFreightEligible = useMemo(() => {
    let hasFreight = false;
    let totalWeight = 0;
    let maxDim = 0;

    for (const item of items) {
      const specs = getItemPhysicalSpecs(item.productTitle, item.size, item.customOptions);
      totalWeight += specs.weightLbs * item.quantity;
      if (specs.isFreight) hasFreight = true;
      const itemMax = Math.max(specs.lengthInches, specs.widthInches);
      if (itemMax > maxDim) maxDim = itemMax;
    }

    return hasFreight || totalWeight > 150 || maxDim > 96;
  }, [items]);

  // Removed forced auth redirect to allow guest checkout
  useEffect(() => {
    // Authentication is optional now
  }, [user, setShowAuthModal]);

  // Fetch shipping rates when address or ZIP changes
  const fetchRates = useCallback(async () => {
    if (!shippingAddress.postal || shippingAddress.postal.length < 5) return;
    setCalculatingRates(true);
    setRateError(null);

    try {
      const res = await fetch("/api/shipping-rates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items,
          zipCode: shippingAddress.postal,
          residential: freightOptions.residential,
          liftgate: freightOptions.liftgate,
        }),
      });

      const data = await res.json();
      if (!res.ok || data.error) throw new Error(data.error || "Failed to calculate shipping.");

      setShippingRates(data.rates || []);
      // Pre-select first non-pickup rate if available, otherwise local pickup
      if (data.rates && data.rates.length > 0) {
        const firstRate = data.rates.find((r: any) => r.id !== "local_pickup") || data.rates[0];
        setSelectedRateId(firstRate.id);
      }
    } catch (err: any) {
      setRateError(err.message || "Failed to load shipping rates.");
      setShippingRates([]);
    } finally {
      setCalculatingRates(false);
    }
  }, [shippingAddress.postal, freightOptions.residential, freightOptions.liftgate, items]);

  // Re-fetch rates on ZIP change or freight option change
  useEffect(() => {
    if (items.length > 0 && shippingAddress.postal.length >= 5) {
      fetchRates();
    }
  }, [shippingAddress.postal, freightOptions.residential, freightOptions.liftgate, items, fetchRates]);

  // Create payment intent from backend
  const handleInitiatePayment = async () => {
    const checkoutEmail = user?.email || shippingAddress.email;
    if (!checkoutEmail) {
      setPaymentError("Please provide an email address in the shipping form.");
      return;
    }

    if (!selectedRateId) {
      setPaymentError("Please select a shipping method first.");
      return;
    }

    setIntentLoading(true);
    setPaymentError(null);

    try {
      const res = await fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items,
          shippingRateId: selectedRateId,
          shippingAddress,
          discountApplied,
          freightOptions,
          userId: user?.id || null,
          userEmail: checkoutEmail,
        }),
      });

      const data = await res.json();
      if (!res.ok || data.error) throw new Error(data.error || "Failed to initiate payment gateway.");

      setClientSecret(data.clientSecret || "simulated_secret");
    } catch (err: any) {
      setPaymentError(err.message || "Stripe gateway error. Please try again.");
    } finally {
      setIntentLoading(false);
    }
  };

  // Handle local mockup submission if Stripe publishable key is missing
  const handleSimulatePayment = async () => {
    const checkoutEmail = user?.email || shippingAddress.email;
    if (!checkoutEmail) {
      setPaymentError("Please provide an email address.");
      return;
    }
    setIntentLoading(true);
    setPaymentError(null);

    try {
      const orderIds: string[] = [];

      for (const item of items) {
        const finalUnitPrice = discountApplied ? item.unitPrice * 0.9 : item.unitPrice;
        const finalTotalPrice = discountApplied ? item.totalPrice * 0.9 : item.totalPrice;

        const { data, error } = await supabase
          .from("orders")
          .insert({
            user_id: user?.id || null,
            product_title: item.productTitle,
            product_size: item.size,
            quantity: item.quantity,
            unit_price: finalUnitPrice,
            total_price: finalTotalPrice,
            design_url: item.designUrl || null,
            design_filename: item.designFilename || null,
            custom_options: {
              ...item.customOptions,
              "Stripe Payment ID": `simulated_${Date.now()}`,
              "Shipping Cost": `$${shippingCost.toFixed(2)}`,
              "Tax Paid": `$${taxAmount.toFixed(2)}`,
              "Discount Applied": `$${discount.toFixed(2)}`,
              "Stripe Processing Fee": `$${stripeFee.toFixed(2)}`,
              "Shipping Method": selectedRateId,
            },
            shipping_name: shippingAddress.name,
            shipping_address: shippingAddress.address,
            shipping_city: `${shippingAddress.city}, ${shippingAddress.state}`,
            shipping_postal: shippingAddress.postal,
            status: "paid", // directly paid in sandbox
          })
          .select("id")
          .single();

        if (error) throw error;
        if (data) orderIds.push(data.id);
      }

      // Mark discount as used if applicable
      if (discountApplied && checkoutEmail) {
        try {
          await supabase
            .from("discount_claims")
            .update({ used_at: new Date().toISOString() })
            .eq("email", checkoutEmail.trim().toLowerCase())
            .is("used_at", null);
        } catch (dbErr) {
          console.warn("Failed to update discount claim status:", dbErr);
        }
      }

      // Send confirmation emails
      if (orderIds.length > 0 && checkoutEmail) {
        fetch("/api/send-order-emails", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderIds, userEmail: checkoutEmail }),
        }).catch(err => console.error("Simulated send email failed:", err));
      }

      setSuccessOrderIds(orderIds);
      setPaymentSuccess(true);
      clearCart();
    } catch (err: any) {
      setPaymentError(err.message || "Simulated payment failed.");
    } finally {
      setIntentLoading(false);
    }
  };

  if (paymentSuccess) {
    return (
      <div className="flex flex-col min-h-screen bg-slate-50 font-opensans">
        <Header />
        <main className="flex-grow max-w-2xl mx-auto w-full px-4 py-16 text-center">
          <div className="bg-white rounded-3xl p-8 shadow-md border border-emerald-100 flex flex-col items-center space-y-6">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-full flex items-center justify-center shadow-sm">
              <CheckCircle2 className="w-10 h-10 animate-bounce" />
            </div>
            <div>
              <h2 className="text-2xl font-bold font-poppins text-slate-900">Payment Completed!</h2>
              <p className="text-sm text-gray-500 mt-2">
                Thank you for your order. A confirmation email with details has been sent to <span className="font-semibold text-slate-800">{user?.email || shippingAddress.email}</span>.
              </p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 w-full text-left space-y-2 text-sm font-semibold">
              <p className="text-gray-600">Order Reference IDs:</p>
              {successOrderIds.map((id) => (
                <code key={id} className="block text-xs bg-white border rounded px-2 py-1 text-[#ff2d78] overflow-x-auto">
                  {id}
                </code>
              ))}
            </div>
            <Link
              href="/account/orders"
              className="w-full text-center bg-black hover:bg-gray-900 text-white font-bold py-4 rounded-xl transition-all text-sm uppercase tracking-wider font-poppins"
            >
              View My Orders
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 font-opensans">
      <Header />

      {/* Hero Header */}
      <section className="relative text-white py-12" style={{
        background: "linear-gradient(135deg, #0d0d1a 0%, #1a0a2f 50%, #00222a 100%)"
      }}>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 text-center z-10">
          <h1 className="text-3xl md:text-4xl font-poppins font-black tracking-tight leading-tight">
            Checkout & Payment
          </h1>
          <p className="max-w-xl mx-auto text-xs md:text-sm text-gray-300 font-medium mt-1">
            Complete your order securely using our Stripe and Freight integrated system.
          </p>
        </div>
      </section>

      <main className="flex-grow max-w-7xl mx-auto w-full px-4 py-8 md:py-12">
        {items.length === 0 ? (
          <div className="text-center py-16 bg-white border rounded-3xl p-8 max-w-md mx-auto shadow">
            <ShoppingBag className="w-16 h-16 text-gray-200 mx-auto" />
            <p className="text-gray-500 font-medium mt-4">Your shopping cart is empty.</p>
            <Link href="/" className="text-sm font-bold text-[#ff2d78] hover:underline mt-2 inline-block">
              Return to Homepage
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Forms (Lg: 7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Shipping Address Box */}
              <div className="bg-white rounded-3xl p-6 md:p-8 shadow-md border border-gray-150 space-y-5">
                <h2 className="text-lg font-bold font-poppins text-slate-800 flex items-center gap-2 border-b pb-3">
                  <MapPin className="w-5 h-5 text-[#ff2d78]" />
                  1. Shipping Information
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-poppins">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">
                      Recipient Name
                    </label>
                    <input
                      type="text"
                      required
                      value={shippingAddress.name}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#ff2d78] transition-colors"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={shippingAddress.email}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, email: e.target.value })}
                      placeholder="jane@example.com"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#ff2d78] transition-colors"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">
                      Street Address
                    </label>
                    <input
                      type="text"
                      required
                      value={shippingAddress.address}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })}
                      placeholder="123 Printing Ave"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#ff2d78] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">
                      City
                    </label>
                    <input
                      type="text"
                      required
                      value={shippingAddress.city}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                      placeholder="Fort Lauderdale"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#ff2d78] transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">
                        State
                      </label>
                      <input
                        type="text"
                        required
                        value={shippingAddress.state}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, state: e.target.value })}
                        placeholder="FL"
                        maxLength={2}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#ff2d78] transition-colors uppercase"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">
                        ZIP Code
                      </label>
                      <input
                        type="text"
                        required
                        value={shippingAddress.postal}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, postal: e.target.value })}
                        placeholder="33309"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#ff2d78] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-600 mb-1.5 uppercase tracking-wide">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={shippingAddress.phone}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })}
                      placeholder="305-967-1005"
                      pattern="[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}"
                      title="Please enter a valid phone number (e.g., 305-967-1005)"
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#ff2d78] transition-colors"
                    />
                  </div>
                </div>

                {/* Freight Options if eligible */}
                {isFreightEligible && (
                  <div className="mt-4 p-4 bg-amber-50/70 border border-amber-200/50 rounded-2xl space-y-3 font-poppins">
                    <div className="flex items-start gap-2.5">
                      <Truck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-bold text-slate-800">Oversized / Heavy Items Detected</h4>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Some items in your cart exceed standard courier weight or dimensional limits and require Freight LTL transport.
                        </p>
                      </div>
                    </div>

                    <div className="border-t border-amber-200/50 pt-3 space-y-2">
                      <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={freightOptions.residential}
                          onChange={(e) => setFreightOptions({ ...freightOptions, residential: e.target.checked })}
                          className="w-4 h-4 rounded text-amber-600 border-gray-300 focus:ring-amber-500"
                        />
                        <span>Delivery Address is Residential (Adds $55.00 surcharge)</span>
                      </label>

                      <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={freightOptions.liftgate}
                          onChange={(e) => setFreightOptions({ ...freightOptions, liftgate: e.target.checked })}
                          className="w-4 h-4 rounded text-amber-600 border-gray-300 focus:ring-amber-500"
                        />
                        <span>Liftgate Service Required at Unload (Adds $45.00 surcharge)</span>
                      </label>
                    </div>
                  </div>
                )}
              </div>

              {/* Shipping Rate Options */}
              <div className="bg-white rounded-3xl p-6 md:p-8 shadow-md border border-gray-150 space-y-5">
                <h2 className="text-lg font-bold font-poppins text-slate-800 flex items-center gap-2 border-b pb-3">
                  <Truck className="w-5 h-5 text-[#ff2d78]" />
                  2. Choose Shipping Method
                </h2>

                {calculatingRates ? (
                  <div className="flex items-center justify-center py-8 gap-2.5">
                    <Loader2 className="w-6 h-6 animate-spin text-[#ff2d78]" />
                    <span className="text-sm font-semibold text-slate-500">Calculating shipping quotes...</span>
                  </div>
                ) : rateError ? (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-2xl flex gap-2 text-xs text-red-700">
                    <AlertCircle className="w-4.5 h-4.5 shrink-0 mt-0.5" />
                    <span>{rateError} Enter a valid ZIP code to load rates.</span>
                  </div>
                ) : shippingRates.length === 0 ? (
                  <p className="text-slate-400 text-xs text-center py-6">
                    Enter your recipient name, address, and ZIP code above to calculate shipping rates.
                  </p>
                ) : (
                  <div className="space-y-3 font-poppins">
                    {shippingRates.map((rate) => (
                      <label
                        key={rate.id}
                        onClick={() => setSelectedRateId(rate.id)}
                        className={`flex items-start justify-between p-4 border rounded-2xl cursor-pointer hover:border-pink-300 transition-all ${
                          selectedRateId === rate.id ? "border-[#ff2d78] bg-pink-50/20" : "border-gray-200"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <input
                            type="radio"
                            name="shipping_rate"
                            value={rate.id}
                            checked={selectedRateId === rate.id}
                            onChange={() => {}}
                            className="mt-1 text-[#ff2d78] focus:ring-[#ff2d78]"
                          />
                          <div>
                            <p className="text-sm font-bold text-slate-800">{rate.name}</p>
                            <p className="text-xs text-slate-500 mt-0.5">{rate.description}</p>
                            <p className="text-[10px] text-pink-600 font-bold mt-1">
                              Estimate: {rate.deliveryEstimate}
                            </p>
                          </div>
                        </div>
                        <span className="font-extrabold text-sm text-slate-900">
                          {rate.price === 0 ? "FREE" : `$${rate.price.toFixed(2)}`}
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {subtotal < 29 && (
                <div className="bg-amber-50 rounded-3xl p-6 md:p-8 shadow-md border border-amber-200 space-y-3">
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-8 h-8 text-amber-600" />
                    <div>
                      <h2 className="text-lg font-bold font-poppins text-amber-900">Minimum Order Not Met</h2>
                      <p className="text-sm text-amber-800 mt-1">
                        A minimum order of $29.00 is required to checkout. Please add ${(29 - subtotal).toFixed(2)} more to your cart.
                      </p>
                    </div>
                  </div>
                  <Link href="/" className="inline-block mt-2 px-5 py-2.5 bg-amber-600 text-white text-sm font-bold rounded-xl hover:bg-amber-700 transition-colors">
                    Continue Shopping
                  </Link>
                </div>
              )}

              {/* Stripe Payment Form */}
              <div className={`bg-white rounded-3xl p-6 md:p-8 shadow-md border border-gray-150 space-y-5 ${subtotal < 29 ? 'opacity-50 pointer-events-none' : ''}`}>
                <h2 className="text-lg font-bold font-poppins text-slate-800 flex items-center gap-2 border-b pb-3">
                  <CreditCard className="w-5 h-5 text-[#ff2d78]" />
                  3. Secure Payment
                </h2>

                {paymentError && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-2xl flex gap-2 text-xs text-red-700">
                    <AlertCircle className="w-4.5 h-4.5 shrink-0 mt-0.5" />
                    <span>{paymentError}</span>
                  </div>
                )}

                {/* If Stripe is configured and clientSecret is loaded, display Card Form */}
                {clientSecret && stripePromise ? (
                  <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <StripeElementsForm
                      shippingAddress={shippingAddress}
                      shippingCost={shippingCost}
                      taxAmount={taxAmount}
                      discount={discount}
                      selectedRateId={selectedRateId}
                      items={items}
                      discountApplied={discountApplied}
                      clearCart={clearCart}
                      setPaymentSuccess={setPaymentSuccess}
                      setSuccessOrderIds={setSuccessOrderIds}
                      setPaymentError={setPaymentError}
                      clientSecret={clientSecret}
                    />
                  </Elements>
                ) : (
                  <div className="space-y-4">
                    {/* Sandbox Simulator button if publishable key is missing, or Stripe elements is not loaded */}
                    {!stripePublishableKey ? (
                      <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-2xl space-y-3 font-poppins">
                        <div className="flex gap-2">
                          <AlertCircle className="w-5 h-5 text-indigo-600 shrink-0" />
                          <div>
                            <h4 className="text-sm font-bold text-indigo-900">Sandbox Mode</h4>
                            <p className="text-xs text-indigo-700 leading-normal mt-0.5">
                              No Stripe Publishable Key is configured on the server. You can finalize your order using our Stripe Sandbox payment simulator.
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={handleSimulatePayment}
                          disabled={intentLoading || !shippingAddress.name || !shippingAddress.address || !selectedRateId || !shippingAddress.email}
                          className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow disabled:opacity-50"
                        >
                          {intentLoading ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              Placing simulated order...
                            </>
                          ) : (
                            <>Submit Order &amp; Simulate Payment</>
                          )}
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <button
                          onClick={handleInitiatePayment}
                          disabled={intentLoading || !shippingAddress.name || !shippingAddress.address || !selectedRateId || !shippingAddress.email}
                          className="w-full py-3.5 bg-gradient-to-r from-[#ff2d78] to-[#b020ff] hover:opacity-95 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow disabled:opacity-50 font-poppins uppercase tracking-wide"
                        >
                          {intentLoading ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              Loading payment form...
                            </>
                          ) : (
                            <>Proceed to Card Payment</>
                          )}
                        </button>
                        
                        <Link
                          href="/get-a-quote"
                          className="w-full py-3.5 bg-white border-2 border-[#ff2d78] text-[#ff2d78] hover:bg-pink-50 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm font-poppins uppercase tracking-wide text-center block"
                        >
                          Need a Custom Design? Get a Quote
                        </Link>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Order Summary (Lg: 5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="bg-white rounded-3xl p-6 md:p-8 shadow-md border border-gray-150 space-y-6">
                <h2 className="text-lg font-bold font-poppins text-slate-800 flex items-center gap-2 border-b pb-3">
                <ShoppingBag className="w-5 h-5 text-[#ff2d78]" />
                Order Summary
              </h2>

              {/* Items List */}
              <div className="divide-y max-h-[300px] overflow-y-auto pr-1">
                {items.map((item) => (
                  <div key={item.id} className="py-3.5 flex justify-between gap-3 text-xs">
                    <div>
                      <p className="font-bold text-slate-800 font-poppins">{item.productTitle}</p>
                      <p className="text-slate-400 font-semibold mt-0.5">
                        Size: {item.size} • Qty: {item.quantity}
                      </p>
                      {item.designFilename && (
                        <p className="text-[10px] text-green-700 font-semibold mt-1">
                          📄 {item.designFilename}
                        </p>
                      )}
                    </div>
                    <span className="font-extrabold text-slate-700">${item.totalPrice.toFixed(2)}</span>
                  </div>
                ))}
              </div>

              {/* Prices breakdown */}
              <div className="border-t pt-4 space-y-3 font-poppins text-xs font-bold text-slate-500">
                <div className="flex items-center justify-between">
                  <span>Subtotal</span>
                  <span className="text-slate-700">${subtotal.toFixed(2)}</span>
                </div>

                {discountApplied && (
                  <div className="flex items-center justify-between text-green-600">
                    <span>10% Promo Discount</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <span>Shipping &amp; Delivery</span>
                  <span className="text-slate-700">
                    {selectedRate ? `$${shippingCost.toFixed(2)}` : "Select shipping method"}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span>Estimated Sales Tax (FL)</span>
                  <span className="text-slate-700">${taxAmount.toFixed(2)}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span>Stripe Processing Fee</span>
                  <span className="text-slate-700">${stripeFee.toFixed(2)}</span>
                </div>

                <div className="flex items-center justify-between border-t border-slate-200/60 pt-3.5">
                  <span className="text-sm text-slate-900 font-extrabold">Total</span>
                  <span className="text-xl text-[#ff2d78] font-black">${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Features block */}
              <div className="border-t border-slate-100 pt-4 space-y-2.5 text-[11px] text-slate-400 font-semibold leading-relaxed">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Free manual design resolution checks included.</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>UV resistant weather-proof print process.</span>
                </div>
              </div>
            </div>
            
            {/* Trust Bar below Order Summary */}
            <div className="mt-4 rounded-3xl border border-gray-150 bg-white overflow-hidden shadow-md space-y-0">
              <div className="px-4 pt-4 pb-2 text-center bg-slate-50/50">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Need Help? Talk to a Real Person</p>
              </div>
              <div className="grid grid-cols-3 divide-x divide-gray-100 border-y border-gray-100">
                {/* Get a Quote */}
                <Link
                  href="/get-a-quote"
                  className="flex flex-col items-center gap-1.5 py-4 px-2 hover:bg-pink-50 transition-colors group"
                >
                  <span className="w-10 h-10 rounded-full bg-[#ff2d78]/10 flex items-center justify-center group-hover:bg-[#ff2d78]/20 transition-colors">
                    <svg className="w-5 h-5 text-[#ff2d78]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-3-3v6M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                  </span>
                  <span className="text-[10px] font-extrabold text-slate-700 uppercase tracking-wide leading-tight text-center">Get a<br/>Quote</span>
                </Link>
                {/* Call Us */}
                <a
                  href="tel:305-967-1005"
                  className="flex flex-col items-center gap-1.5 py-4 px-2 hover:bg-blue-50 transition-colors group"
                >
                  <span className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                    <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                  </span>
                  <span className="text-[10px] font-extrabold text-slate-700 uppercase tracking-wide leading-tight text-center">Call Us<br/><span className="text-blue-600 normal-case font-bold">305-967-1005</span></span>
                </a>
                {/* Email Us */}
                <a
                  href="mailto:info@nano-signs.com"
                  className="flex flex-col items-center gap-1.5 py-4 px-2 hover:bg-purple-50 transition-colors group"
                >
                  <span className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center group-hover:bg-purple-500/20 transition-colors">
                    <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                  </span>
                  <span className="text-[10px] font-extrabold text-slate-700 uppercase tracking-wide leading-tight text-center">Email<br/><span className="text-purple-600 normal-case font-bold">Us</span></span>
                </a>
              </div>
              {/* Trust badges */}
              <div className="flex items-center justify-center gap-3 px-4 py-3 bg-slate-50 flex-wrap">
                <span className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500">
                  <svg className="w-3.5 h-3.5 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/></svg>
                  Secure Payment
                </span>
                <span className="text-slate-200">|</span>
                <span className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500">
                  <svg className="w-3.5 h-3.5 text-[#ff2d78]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                  Free Artwork Check
                </span>
                <span className="text-slate-200">|</span>
                <span className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500">
                  <svg className="w-3.5 h-3.5 text-blue-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/></svg>
                  Florida Local Shop
                </span>
              </div>
              </div>
            </div>

          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

// ── Stripe Elements Card Form Component ──────────────────────────────────────
interface StripeElementsFormProps {
  shippingAddress: any;
  shippingCost: number;
  taxAmount: number;
  discount: number;
  selectedRateId: string;
  items: any[];
  discountApplied: boolean;
  clearCart: () => void;
  setPaymentSuccess: (success: boolean) => void;
  setSuccessOrderIds: (orderIds: string[]) => void;
  setPaymentError: (error: string | null) => void;
  clientSecret: string;
}

function StripeElementsForm({
  shippingAddress,
  shippingCost,
  taxAmount,
  discount,
  selectedRateId,
  items,
  discountApplied,
  clearCart,
  setPaymentSuccess,
  setSuccessOrderIds,
  setPaymentError,
  clientSecret,
}: StripeElementsFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setPaymentError(null);

    try {
      // 1. Insert order rows into Supabase first (status: awaiting_payment)
      let orderIds: string[] = [];
      const res = await fetch("/api/create-checkout-orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items,
          shippingAddress,
          shippingCost,
          taxAmount,
          discount,
          selectedRateId,
          discountApplied,
          userId: user?.id || null,
        }),
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error || "Failed to create order records.");
      }
      orderIds = data.orderIds || [];

      // 2. Associate the order ids to the payment intent metadata via backend updates
      // This ensures when webhook fires it has the exact order ids to fulfill.
      // We pass the paymentIntent ID to stripe confirmation below
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) throw new Error("Stripe Elements card inputs not found.");

      // 3. Confirm card payment with Stripe
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: shippingAddress.name,
            phone: shippingAddress.phone,
            address: {
              line1: shippingAddress.address,
              city: shippingAddress.city,
              state: shippingAddress.state,
              postal_code: shippingAddress.postal,
              country: "US",
            },
          },
        },
      });

      if (result.error) {
        throw new Error(result.error.message || "Payment confirmation failed.");
      }

      if (result.paymentIntent?.status === "succeeded") {
        // Stripe webhook will process payment_intent.succeeded and update order status in Supabase.
        // We will also update locally immediately for better UI experience.
        for (const orderId of orderIds) {
          await supabase
            .from("orders")
            .update({ status: "paid" })
            .eq("id", orderId);
        }

        // Send emails immediately
        fetch("/api/send-order-emails", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderIds, userEmail: user?.email ?? "" }),
        }).catch(err => console.error("Email API failed:", err));

        setSuccessOrderIds(orderIds);
        setPaymentSuccess(true);
        clearCart();
      } else {
        throw new Error("Payment was not completed successfully.");
      }
    } catch (err: any) {
      console.error("Payment submission failure:", err);
      setPaymentError(err.message || "Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 font-poppins">
      <div className="p-4 border border-gray-200 rounded-2xl bg-slate-50/50">
        <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wide">
          Credit or Debit Card
        </label>
        <div className="p-3 bg-white border border-gray-200 rounded-xl">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "14px",
                  color: "#1e293b",
                  fontFamily: "Inter, sans-serif",
                  "::placeholder": {
                    color: "#94a3b8",
                  },
                },
                invalid: {
                  color: "#e11d48",
                },
              },
            }}
          />
        </div>
      </div>

      <div className="space-y-3">
        <button
          type="submit"
          disabled={loading || !stripe}
          className="w-full py-4 bg-gradient-to-r from-[#ff2d78] to-[#b020ff] hover:opacity-95 text-white rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 shadow disabled:opacity-50 uppercase tracking-wide"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Processing secure payment...
            </>
          ) : (
            <>Pay Order Securely</>
          )}
        </button>

        <Link
          href="/get-a-quote"
          className="w-full py-4 bg-white border-2 border-slate-200 hover:border-[#ff2d78] hover:text-[#ff2d78] text-slate-600 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 uppercase tracking-wide text-center block"
        >
          Need a Custom Design? Get a Quote
        </Link>
      </div>
    </form>
  );
}
