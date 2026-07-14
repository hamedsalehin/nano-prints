import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const resendApiKey = process.env.RESEND_API_KEY;

// ── Server-side Supabase client (uses service role to bypass RLS) ────────────
const supabaseAdmin = (supabaseUrl && supabaseServiceKey)
  ? createClient(supabaseUrl, supabaseServiceKey)
  : (null as any);

const resend = resendApiKey ? new Resend(resendApiKey) : (null as any);

const FROM = `${process.env.RESEND_FROM_NAME || "Nano Signs"} <${process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev"}>`;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "";

// ── POST /api/submit-quote ───────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    if (!supabaseAdmin) {
      console.error("submit-quote POST: supabaseAdmin not initialized. Missing environment variables.");
      return NextResponse.json(
        { error: "Database configuration error. Please contact the administrator." },
        { status: 500 },
      );
    }

    const body = await req.json();
    const { fullName, email, phone, description, width, height, quantity, fileUrl } = body;

    if (!fullName || !email || !phone || !description) {
      return NextResponse.json(
        { error: "Missing required fields: fullName, email, phone, and description are required." },
        { status: 400 },
      );
    }

    // Extract filename from URL if possible
    let fileName = null;
    if (fileUrl) {
      try {
        const urlParts = fileUrl.split("/");
        fileName = urlParts[urlParts.length - 1];
        // Strip out timestamp prefix (if any) e.g., 1781460158709_
        if (fileName.includes("_")) {
          fileName = fileName.substring(fileName.indexOf("_") + 1);
        }
      } catch {
        fileName = "Attachment";
      }
    }

    // ── Insert quote request into Supabase ──────────────────────────────────────
    const { data: quoteData, error: dbError } = await supabaseAdmin
      .from("quote_requests")
      .insert({
        full_name: fullName,
        email: email,
        phone: phone,
        description: description,
        width: width || null,
        height: height || null,
        quantity: Number(quantity) || 1,
        file_url: fileUrl || null,
      })
      .select("id")
      .single();

    if (dbError) {
      console.error("DB insert error for quote request:", dbError);
      return NextResponse.json({ error: dbError.message }, { status: 500 });
    }

    const quoteId = quoteData?.id ?? "N/A";
    const shortId = quoteId.slice(0, 8).toUpperCase();

    let adminEmailError: any = null;
    let customerEmailError: any = null;

    // ── Send Admin Notification Email ─────────────────────────────────────────
    if (ADMIN_EMAIL) {
      if (!resend) {
        console.warn("submit-quote POST: resend client not initialized. Skipping admin notification email.");
      } else {
        const adminEmailRes = await resend.emails.send({
          from: FROM,
          to: [ADMIN_EMAIL],
          subject: `📋 New Quote Request #${shortId} — ${fullName}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0f172a; color: #f1f5f9; padding: 32px; border-radius: 12px;">
              <div style="text-align: center; margin-bottom: 28px;">
                <h1 style="color: #ff2d78; font-size: 28px; margin: 0; letter-spacing: -0.5px;">NANO SIGNS</h1>
                <p style="color: #94a3b8; margin: 4px 0 0;">New Custom Quote Request</p>
              </div>

              <div style="background: #1e293b; border-radius: 10px; padding: 20px; margin-bottom: 20px;">
                <h2 style="margin: 0 0 16px; font-size: 16px; color: #e2e8f0; border-bottom: 1px solid #334155; padding-bottom: 10px;">
                  📋 Request Info #${shortId}
                </h2>
                <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
                  <tr><td style="padding: 6px 0; color: #94a3b8; width: 40%;">Client Name:</td><td style="color: #f1f5f9; font-weight: bold;">${fullName}</td></tr>
                  <tr><td style="padding: 6px 0; color: #94a3b8;">Email:</td><td style="color: #f1f5f9;"><a href="mailto:${email}" style="color: #00e5ff; text-decoration: none;">${email}</a></td></tr>
                  <tr><td style="padding: 6px 0; color: #94a3b8;">Phone:</td><td style="color: #f1f5f9;"><a href="tel:${phone}" style="color: #f1f5f9; text-decoration: none;">${phone}</a></td></tr>
                  <tr><td style="padding: 6px 0; color: #94a3b8;">Est. Quantity:</td><td style="color: #f1f5f9;">${quantity} unit(s)</td></tr>
                  <tr>
                    <td style="padding: 6px 0; color: #94a3b8;">Dimensions:</td>
                    <td style="color: #f1f5f9;">
                      ${width || height ? `${width || "—"} W x ${height || "—"} H` : "Not specified"}
                    </td>
                  </tr>
                </table>
              </div>

              <div style="background: #1e293b; border-radius: 10px; padding: 20px; margin-bottom: 20px;">
                <h3 style="margin: 0 0 12px; font-size: 14px; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em;">Project Description</h3>
                <p style="margin: 0; font-size: 14px; color: #e2e8f0; line-height: 1.6; white-space: pre-wrap;">${description}</p>
              </div>

              ${fileUrl
              ? `
              <div style="background: #1e293b; border-radius: 10px; padding: 20px; margin-bottom: 20px;">
                <h3 style="margin: 0 0 12px; font-size: 14px; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em;">Attached Artwork</h3>
                <p style="margin: 0 0 10px; font-size: 13px; color: #cbd5e1;">Filename: ${fileName}</p>
                <a href="${fileUrl}" style="display: inline-block; background: #ff2d78; color: white; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-size: 13px; font-weight: bold;">
                  Download Attachment
                </a>
              </div>
              `
              : `
              <div style="background: #1e293b; border-radius: 10px; padding: 20px; margin-bottom: 20px; border: 1px dashed #334155;">
                <p style="margin: 0; font-size: 13px; color: #64748b;">⚙️ No design files or sketches were attached.</p>
              </div>
              `
              }

              <div style="text-align: center; padding-top: 20px; border-top: 1px solid #1e293b;">
                <p style="font-size: 12px; color: #475569; margin: 0;">Request ID: ${quoteId}</p>
              </div>
            </div>
          `,
        });

        if (adminEmailRes.error) {
          console.error("submit-quote: admin email send error:", adminEmailRes.error);
          adminEmailError = adminEmailRes.error;
        } else {
          console.log("submit-quote: admin email send success:", adminEmailRes.data);
        }
      }
    }

    // ── Send Customer Confirmation Email ──────────────────────────────────────
    if (email) {
      if (!resend) {
        console.warn("submit-quote POST: resend client not initialized. Skipping customer confirmation email.");
      } else {
        const customerEmailRes = await resend.emails.send({
          from: FROM,
          to: [email],
          subject: `✅ We Received Your Custom Quote Request — Nano Signs`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; padding: 0; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0;">
              <!-- Header -->
              <div style="background: linear-gradient(135deg, #ff2d78, #b020ff, #00e5ff); padding: 32px; text-align: center;">
                <h1 style="color: white; font-size: 32px; margin: 0; letter-spacing: -0.5px; font-weight: 900;">NANO SIGNS</h1>
                <p style="color: rgba(255,255,255,0.85); margin: 6px 0 0; font-size: 14px;">We are preparing your custom print quote!</p>
              </div>

              <!-- Body -->
              <div style="padding: 32px;">
                <div style="display: flex; align-items: center; gap: 12px; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 10px; padding: 16px; margin-bottom: 24px;">
                  <span style="font-size: 24px;">📝</span>
                  <div>
                    <p style="margin: 0; font-weight: bold; color: #166534; font-size: 15px;">Quote Request Confirmed</p>
                    <p style="margin: 4px 0 0; color: #15803d; font-size: 13px;">Our print specialists are reviewing your files and details.</p>
                  </div>
                </div>

                <p style="font-size: 14px; color: #334155; line-height: 1.6; margin-bottom: 20px;">
                  Hello ${fullName},<br/><br/>
                  Thank you for requesting a custom signage quote! We have received your specifications and our team will get to work formatting a layout proof and pricing estimate. 
                </p>

                <h2 style="font-size: 16px; color: #0f172a; margin: 24px 0 12px; border-bottom: 1px solid #f1f5f9; padding-bottom: 6px;">Request Details</h2>
                <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 24px;">
                  <tr style="border-bottom: 1px solid #f1f5f9;">
                    <td style="padding: 10px 0; color: #64748b; width: 40%;">Request ID</td>
                    <td style="padding: 10px 0; color: #0f172a; font-family: monospace; font-weight: bold;">#${shortId}</td>
                  </tr>
                  <tr style="border-bottom: 1px solid #f1f5f9;">
                    <td style="padding: 10px 0; color: #64748b;">Quantity</td>
                    <td style="padding: 10px 0; color: #0f172a;">${quantity} unit(s)</td>
                  </tr>
                  ${width || height
                  ? `
                  <tr style="border-bottom: 1px solid #f1f5f9;">
                    <td style="padding: 10px 0; color: #64748b;">Dimensions</td>
                    <td style="padding: 10px 0; color: #0f172a;">${width || "—"} W x ${height || "—"} H</td>
                  </tr>
                  `
                  : ""
                  }
                  ${fileName
                  ? `
                  <tr style="border-bottom: 1px solid #f1f5f9;">
                    <td style="padding: 10px 0; color: #64748b;">Attached Artwork</td>
                    <td style="padding: 10px 0; color: #0f172a; font-size: 13px;">${fileName}</td>
                  </tr>
                  `
                  : ""
                  }
                </table>

                <div style="background: #fef9ff; border: 1px solid #e9d5ff; border-radius: 10px; padding: 16px; margin-bottom: 24px;">
                  <p style="margin: 0; font-size: 13px; color: #7e22ce; font-weight: bold;">🎨 What happens next?</p>
                  <p style="margin: 6px 0 0; font-size: 12px; color: #6b21a8; line-height: 1.5;">
                    1. Our formatting team reviews your design's resolution and dimensions.<br/>
                    2. We will email you a digital print proof and pricing options within <strong>12 hours</strong>.<br/>
                    3. If you approve, we will convert it to a production order!
                  </p>
                </div>

                <div style="text-align: center; padding-top: 10px;">
                  <p style="font-size: 13px; color: #64748b; margin: 0;">If you have any questions or would like to add files, simply reply to this email.</p>
                </div>
              </div>

              <!-- Footer -->
              <div style="background: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;">
                <p style="font-size: 12px; color: #94a3b8; margin: 0;">Nano Signs • Your custom sign partner</p>
                <p style="font-size: 11px; color: #cbd5e1; margin: 4px 0 0;">Fort Lauderdale, FL</p>
              </div>
            </div>
          `,
        });

        if (customerEmailRes.error) {
          console.error("submit-quote: customer email send error:", customerEmailRes.error);
          customerEmailError = customerEmailRes.error;
        } else {
          console.log("submit-quote: customer email send success:", customerEmailRes.data);
        }
      }
    }

    return NextResponse.json({
      success: true,
      quoteId,
      shortId,
      message: resend
        ? "Quote request submitted and confirmation emails sent."
        : "Quote request submitted. Warning: Resend email sending skipped (missing RESEND_API_KEY).",
      emailsInitialized: !!resend,
      adminEmailError,
      customerEmailError,
    });

  } catch (err) {
    console.error("submit-quote error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Internal server error" },
      { status: 500 },
    );
  }
}
