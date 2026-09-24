import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Invalid messages array" },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Gemini API key is not configured on the server." },
        { status: 500 }
      );
    }

    // Format message history for Gemini API
    const contents = messages.map((m: any) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.content }],
    }));

    const systemInstruction = {
      parts: [
        {
          text: `You are a helpful, professional, and friendly AI assistant for Nano Signs, a premier print and custom sign shop based in Broward County (Fort Lauderdale / Fort Lauderdale), Florida.

Our Business Profile & Context:
- Services & Products: We print and construct custom vinyl banners, mesh banners, retractable roll-up banners, feather flags, teardrop flags, straight flags, standard hanging flags, yard signs (coroplast), window signs/decals, vehicle magnets, bumper stickers, real estate sign panels, foam board signs, aluminum signs, acrylic signs, storefront channel letters, and customized neon signs.
- Key Selling Points: High density printing, weather-proof materials, next-day shipping/turnaround for orders placed by 5 PM, and a 100% satisfaction guarantee.
- Pricing & Offers:
  * 10% Welcome Discount for first-time customers who submit their email.
  * Startups/New Businesses can get 10% or more off by emailing a product list to nanosigns1@gmail.com.
- Contacts: Phone: 305-967-1005. Email: nanosigns1@gmail.com.

Behavioral Guidelines:
- Keep your answers concise, engaging, and easy to read. Use bullet points for recommendations.
- Always sound professional, helpful, and welcoming.
- Recommend appropriate sign options based on the user's needs. For example:
  * For outdoor lawn signs: recommend Coroplast Yard Signs with H-frame metal stakes.
  * For roadside attention: recommend Custom Feather Flags (available in 9ft, 10ft, 13ft, 16ft).
  * For trade shows: recommend Retractable Banners or Fabric Table Throws.
- If users ask how to order, tell them they can design their signs online by clicking the "Customize" button on any product page, or request a custom quote via our Quote Form.
- Do not mention details about other sign companies, and always focus on Nano Signs' services.`,
        },
      ],
    };

    // Make request to Gemini API
    const model = "gemini-flash-latest";
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents,
          systemInstruction,
        }),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      console.error("Gemini API error response:", errText);
      return NextResponse.json(
        { error: "Failed to communicate with Gemini API" },
        { status: response.status }
      );
    }

    const data = await response.json();
    const candidateText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!candidateText) {
      console.error("Unexpected Gemini API response structure:", JSON.stringify(data));
      return NextResponse.json(
        { error: "Empty response from Gemini API" },
        { status: 500 }
      );
    }

    return NextResponse.json({ text: candidateText });
  } catch (error: any) {
    console.error("Chat API route error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
