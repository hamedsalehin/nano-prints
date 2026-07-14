import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : (null as any);

const FROM = `${process.env.RESEND_FROM_NAME || "Nano Signs"} <${process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev"}>`;
const ADMIN_EMAIL = "citylightsign@gmail.com";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Missing required fields: name, email, subject, and message are required." },
        { status: 400 }
      );
    }

    if (!resend) {
      console.warn("Contact API: Resend client not initialized. Missing RESEND_API_KEY.");
      return NextResponse.json(
        { error: "Email service is not configured. Please contact support directly." },
        { status: 503 }
      );
    }

    // 1. Send Admin Email Notification
    const adminEmailRes = await resend.emails.send({
      from: FROM,
      to: [ADMIN_EMAIL],
      subject: `✉️ New Contact Message: ${subject} — ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0f172a; color: #f1f5f9; padding: 32px; border-radius: 12px;">
          <div style="text-align: center; margin-bottom: 28px;">
            <h1 style="color: #ff2d78; font-size: 28px; margin: 0; letter-spacing: -0.5px;">NANO SIGNS</h1>
            <p style="color: #94a3b8; margin: 4px 0 0;">New Inquiry from Contact Form</p>
          </div>

          <div style="background: #1e293b; border-radius: 10px; padding: 20px; margin-bottom: 20px;">
            <h2 style="margin: 0 0 16px; font-size: 16px; color: #e2e8f0; border-bottom: 1px solid #334155; padding-bottom: 10px;">
              👤 Contact Information
            </h2>
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr>
                <td style="padding: 6px 0; color: #94a3b8; width: 30%;">Name:</td>
                <td style="color: #f1f5f9; font-weight: bold;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #94a3b8;">Email:</td>
                <td style="color: #f1f5f9;">
                  <a href="mailto:${email}" style="color: #00e5ff; text-decoration: none;">${email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #94a3b8;">Subject:</td>
                <td style="color: #f1f5f9; font-weight: bold;">${subject}</td>
              </tr>
            </table>
          </div>

          <div style="background: #1e293b; border-radius: 10px; padding: 20px;">
            <h3 style="margin: 0 0 12px; font-size: 14px; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em;">Message</h3>
            <p style="margin: 0; font-size: 14px; color: #e2e8f0; line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>
        </div>
      `
    });

    if (adminEmailRes.error) {
      console.error("Contact API: Admin email send error:", adminEmailRes.error);
      return NextResponse.json({ error: adminEmailRes.error.message }, { status: 500 });
    }

    // 2. Send Customer Confirmation Email (optional, best-effort)
    try {
      await resend.emails.send({
        from: FROM,
        to: [email],
        subject: `✉️ Message Received: We'll be in touch! — Nano Signs`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; padding: 0; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0;">
            <div style="background: linear-gradient(135deg, #ff2d78, #b020ff, #00e5ff); padding: 32px; text-align: center;">
              <h1 style="color: white; font-size: 32px; margin: 0; letter-spacing: -0.5px; font-weight: 900;">NANO SIGNS</h1>
              <p style="color: rgba(255,255,255,0.85); margin: 6px 0 0; font-size: 14px;">Thank you for contacting us!</p>
            </div>
            <div style="padding: 32px;">
              <p style="font-size: 14px; color: #334155; line-height: 1.6; margin-bottom: 20px;">
                Hello ${name},<br/><br/>
                We have received your message regarding <strong>"${subject}"</strong>. Our support team is reviewing your inquiry and will email you back within 12 hours.
              </p>
              <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 16px; font-size: 13px; color: #475569;">
                <strong>Your Message:</strong><br/>
                <span style="white-space: pre-wrap; font-style: italic;">"${message}"</span>
              </div>
            </div>
            <div style="background: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="font-size: 12px; color: #94a3b8; margin: 0;">Nano Signs • Oakland Park, FL</p>
            </div>
          </div>
        `
      });
    } catch (custErr) {
      console.warn("Contact API: Customer confirmation email failed to send (non-fatal):", custErr);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Internal server error" },
      { status: 500 }
    );
  }
}
