import { NextRequest, NextResponse } from "next/server";
import { calculateShippingRates } from "@/lib/shippingCalculator";

export async function POST(req: NextRequest) {
  try {
    const json = await req.json();
    const { items, zipCode, residential, liftgate } = json;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "Cart items are required for calculation." },
        { status: 400 }
      );
    }

    if (!zipCode) {
      return NextResponse.json(
        { error: "Destination ZIP code is required." },
        { status: 400 }
      );
    }

    const rates = calculateShippingRates(items, zipCode, {
      residential: residential !== false,
      liftgate: !!liftgate,
    });

    return NextResponse.json({ success: true, rates });
  } catch (err) {
    console.error("Shipping rates calculation endpoint error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Internal server error" },
      { status: 500 }
    );
  }
}
