import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function GET(req: NextRequest) {
  const resendApiKey = process.env.RESEND_API_KEY;
  const adminEmail = process.env.ADMIN_EMAIL || "";
  const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
  const fromName = process.env.RESEND_FROM_NAME || "Nano Signs";
  const FROM = `${fromName} <${fromEmail}>`;

  // Mask the API key for security
  let resendApiKeyMasked = "NOT_SET";
  if (resendApiKey) {
    if (resendApiKey.length > 8) {
      resendApiKeyMasked = `${resendApiKey.substring(0, 5)}...${resendApiKey.substring(resendApiKey.length - 4)}`;
    } else {
      resendApiKeyMasked = "SET_BUT_TOO_SHORT";
    }
  }

  const diagnostics = {
    hasResendApiKey: !!resendApiKey,
    resendApiKeyMasked,
    resendApiKeyLength: resendApiKey ? resendApiKey.length : 0,
    adminEmail,
    fromEmail,
    fromName,
    FROM,
    nodeVersion: process.version,
    envKeys: Object.keys(process.env).filter(key => key.includes("RESEND") || key.includes("EMAIL") || key.includes("SUPABASE")),
  };

  if (!resendApiKey) {
    return NextResponse.json({
      success: false,
      message: "Resend API key is not configured on this host.",
      diagnostics,
    }, { status: 400 });
  }

  try {
    const resend = new Resend(resendApiKey);
    console.log("Sending diagnostic test email...");
    const { data, error } = await resend.emails.send({
      from: FROM,
      to: [adminEmail || "tahasalehine@gmail.com"],
      subject: "🔍 Live Site Diagnostic Email Test",
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #ccc; max-width: 600px;">
          <h2>Diagnostic Email Test</h2>
          <p>This email was triggered by visiting the diagnostic endpoint on your live website.</p>
          <h3>Configuration details:</h3>
          <ul>
            <li><strong>Resend API Key:</strong> <code>${resendApiKeyMasked}</code></li>
            <li><strong>Admin Email:</strong> <code>${adminEmail}</code></li>
            <li><strong>From Address:</strong> <code>${FROM}</code></li>
          </ul>
          <p>If you received this, Resend email dispatch on your host is configured and working perfectly!</p>
        </div>
      `,
    });

    return NextResponse.json({
      success: !error,
      message: error ? "Resend returned an error during send." : "Resend API call completed.",
      resendResponse: { data, error },
      diagnostics,
    });
  } catch (err) {
    console.error("Diagnostic endpoint exception:", err);
    return NextResponse.json({
      success: false,
      message: "Exception occurred during Resend API execution.",
      error: err instanceof Error ? err.message : String(err),
      diagnostics,
    }, { status: 500 });
  }
}
