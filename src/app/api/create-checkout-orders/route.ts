import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabaseAdmin = (supabaseUrl && supabaseServiceKey)
  ? createClient(supabaseUrl, supabaseServiceKey)
  : (null as any);

export async function POST(req: NextRequest) {
  try {
    if (!supabaseAdmin) {
      console.error("create-checkout-orders: supabaseAdmin not initialized. Missing environment variables.");
      return NextResponse.json(
        { error: "Database configuration error. Please contact the administrator." },
        { status: 500 }
      );
    }

    const { items, shippingAddress, shippingCost, taxAmount, discount, selectedRateId, discountApplied, userId } = await req.json();

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "Order items are required." },
        { status: 400 }
      );
    }

    const orderIds: string[] = [];

    for (const item of items) {
      const finalUnitPrice = discountApplied ? item.unitPrice * 0.9 : item.unitPrice;
      const finalTotalPrice = discountApplied ? item.totalPrice * 0.9 : item.totalPrice;

      const { data, error } = await supabaseAdmin
        .from("orders")
        .insert({
          user_id: userId || null,
          product_title: item.productTitle,
          product_size: item.size,
          quantity: item.quantity,
          unit_price: finalUnitPrice,
          total_price: finalTotalPrice,
          design_url: item.designUrl || null,
          design_filename: item.designFilename || null,
          custom_options: {
            ...item.customOptions,
            "Shipping Cost": `$${shippingCost.toFixed(2)}`,
            "Tax Paid": `$${taxAmount.toFixed(2)}`,
            "Discount Applied": `$${discount.toFixed(2)}`,
            "Shipping Method": selectedRateId,
          },
          shipping_name: shippingAddress.name,
          shipping_address: shippingAddress.address,
          shipping_city: `${shippingAddress.city}, ${shippingAddress.state}`,
          shipping_postal: shippingAddress.postal,
          status: "pending", // awaiting payment confirmation
        })
        .select("id")
        .single();

      if (error) throw error;
      if (data) orderIds.push(data.id);
    }

    return NextResponse.json({
      success: true,
      orderIds,
    });
  } catch (err) {
    console.error("create-checkout-orders error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Internal server error" },
      { status: 500 }
    );
  }
}
