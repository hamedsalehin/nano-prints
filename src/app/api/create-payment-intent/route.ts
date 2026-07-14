import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { calculateShippingRates } from "@/lib/shippingCalculator";

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2022-11-15" as any,
    })
  : null;

export async function POST(req: NextRequest) {
  try {
    if (!stripe) {
      console.warn("create-payment-intent: STRIPE_SECRET_KEY is not configured.");
      // Fallback/Warning for development if key is missing
      return NextResponse.json(
        { error: "Stripe payment gateway is not configured on the server." },
        { status: 500 }
      );
    }

    const json = await req.json();
    const { items, shippingRateId, shippingAddress, discountApplied, freightOptions } = json;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "Cart items are required." },
        { status: 400 }
      );
    }

    if (!shippingRateId) {
      return NextResponse.json(
        { error: "Shipping rate selection is required." },
        { status: 400 }
      );
    }

    if (!shippingAddress || !shippingAddress.postal) {
      return NextResponse.json(
        { error: "Shipping address with ZIP code is required." },
        { status: 400 }
      );
    }

    // 1. Calculate subtotal
    const subtotal = items.reduce((acc: number, item: any) => acc + (item.totalPrice || 0), 0);

    // 2. Apply 10% discount if eligible
    const discount = discountApplied ? subtotal * 0.1 : 0.0;
    const itemsTotal = subtotal - discount;

    // 3. Calculate shipping cost on server
    const rates = calculateShippingRates(items, shippingAddress.postal, {
      residential: freightOptions?.residential !== false,
      liftgate: !!freightOptions?.liftgate,
    });
    const selectedRate = rates.find(r => r.id === shippingRateId);

    if (!selectedRate) {
      return NextResponse.json(
        { error: "Invalid shipping rate selection." },
        { status: 400 }
      );
    }

    const shippingCost = selectedRate.price;

    // 4. Calculate sales tax (7% if in Florida, 0% otherwise)
    const isFlorida = shippingAddress.postal.trim().startsWith("32") || shippingAddress.postal.trim().startsWith("33") || shippingAddress.postal.trim().startsWith("34");
    const taxRate = isFlorida ? 0.07 : 0.0;
    const taxAmount = Math.round(itemsTotal * taxRate * 100) / 100;

    // 5. Total cost
    const baseTotal = itemsTotal + shippingCost + taxAmount;
    const totalToCharge = (baseTotal + 0.30) / (1 - 0.029);
    const stripeFee = totalToCharge - baseTotal;
    const finalTotal = totalToCharge;
    const finalTotalCents = Math.round(finalTotal * 100);

    // Create Stripe PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: finalTotalCents,
      currency: "usd",
      payment_method_types: ["card"],
      metadata: {
        zipCode: shippingAddress.postal,
        shippingRateId,
        shippingCost: String(shippingCost),
        taxAmount: String(taxAmount),
        discountAmount: String(discount),
        stripeFee: String(stripeFee),
        subtotal: String(subtotal),
        finalTotal: String(finalTotal),
        userId: json.userId || "anonymous",
        userEmail: json.userEmail || "",
        itemsSummary: items.map(item => `${item.productTitle} (Qty: ${item.quantity})`).join(", ").slice(0, 500),
      },
    });

    return NextResponse.json({
      success: true,
      clientSecret: paymentIntent.client_secret,
      subtotal,
      discount,
      shippingCost,
      taxAmount,
      finalTotal,
    });
  } catch (err) {
    console.error("Stripe create-payment-intent API error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Internal payment gateway error" },
      { status: 500 }
    );
  }
}
