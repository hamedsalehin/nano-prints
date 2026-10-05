import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2022-11-15" as any,
    })
  : null;

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabaseAdmin = (supabaseUrl && supabaseServiceKey)
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null;

export async function POST(req: NextRequest) {
  try {
    if (!stripe) {
      return NextResponse.json({ error: "Stripe not configured" }, { status: 500 });
    }

    if (!supabaseAdmin) {
      return NextResponse.json({ error: "Database admin not configured" }, { status: 500 });
    }

    const body = await req.text();
    const signature = req.headers.get("stripe-signature") || "";

    let event: Stripe.Event;

    // Verify webhook signature if secret is configured
    if (webhookSecret) {
      try {
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
      } catch (err: any) {
        console.error(`❌ Webhook signature verification failed: ${err.message}`);
        return NextResponse.json({ error: `Signature verification failed: ${err.message}` }, { status: 400 });
      }
    } else {
      // Direct parsing for development testing when webhook secret is not set yet
      console.warn("⚠️ STRIPE_WEBHOOK_SECRET is not set. Parsing event without verification (dev mode).");
      event = JSON.parse(body);
    }

    console.log(`🔔 Stripe webhook event received: ${event.type}`);

    if (event.type === "payment_intent.succeeded") {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      const metadata = paymentIntent.metadata || {};
      
      const orderIdsRaw = metadata.orderIds || "";
      const orderIds = orderIdsRaw.split(",").map((id: string) => id.trim()).filter(Boolean);
      
      const userEmail = metadata.userEmail || "";
      
      console.log(`💰 Payment Intent succeeded: ${paymentIntent.id}. Processing orders:`, orderIds);

      if (orderIds.length > 0) {
        for (const orderId of orderIds) {
          // Fetch existing order to merge options
          const { data: order } = await supabaseAdmin
            .from("orders")
            .select("custom_options")
            .eq("id", orderId)
            .single();

          const existingOptions = order?.custom_options || {};

          // Update order status to paid and append payment details to custom options
          const { error: updateError } = await supabaseAdmin
            .from("orders")
            .update({
              status: "paid",
              custom_options: {
                ...existingOptions,
                "Stripe Payment ID": paymentIntent.id,
                "Shipping Cost": `$${metadata.shippingCost || "0.00"}`,
                "Tax Paid": `$${metadata.taxAmount || "0.00"}`,
                "Discount Applied": `$${metadata.discountAmount || "0.00"}`,
                "Shipping Method": metadata.shippingRateId || "Standard",
              }
            })
            .eq("id", orderId);

          if (updateError) {
            console.error(`❌ Failed to update order ${orderId} in Supabase:`, updateError);
          } else {
            console.log(`✅ Order ${orderId} marked as PAID.`);
          }
        }

        // Trigger order confirmation emails via Resend
        try {
          const emailResponse = await fetch(`${req.nextUrl.origin}/api/send-order-emails`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              orderIds,
              userEmail,
            }),
          });
          
          if (!emailResponse.ok) {
            console.error("❌ Failed to trigger send-order-emails:", await emailResponse.text());
          } else {
            console.log("📨 Order confirmation emails triggered successfully.");
          }
        } catch (emailErr) {
          console.error("❌ Exception during send-order-emails invocation:", emailErr);
        }
      }
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("❌ Stripe Webhook handler error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Internal server error" },
      { status: 500 }
    );
  }
}
export const config = {
  api: {
    bodyParser: false, // Stripe Webhook verification needs the raw body
  },
};
