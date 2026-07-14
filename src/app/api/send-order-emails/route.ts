import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const resendApiKey = process.env.RESEND_API_KEY;

const supabaseAdmin = (supabaseUrl && supabaseServiceKey)
  ? createClient(supabaseUrl, supabaseServiceKey)
  : (null as any);

const resend = resendApiKey ? new Resend(resendApiKey) : (null as any);

const FROM = `${process.env.RESEND_FROM_NAME || "Nano Signs"} <${process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev"}>`;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "";

export async function POST(req: NextRequest) {
  try {
    if (!supabaseAdmin) {
      return NextResponse.json({ error: "Supabase admin client not initialized" }, { status: 500 });
    }
    if (!resend) {
      return NextResponse.json({ error: "Resend client not initialized" }, { status: 500 });
    }

    const body = await req.json();
    const { orderIds, userEmail } = body;

    if (!orderIds || !Array.isArray(orderIds) || orderIds.length === 0) {
      return NextResponse.json({ error: "Missing or invalid orderIds array" }, { status: 400 });
    }

    console.log("send-order-emails: Received request", {
      orderIds,
      userEmail,
      ADMIN_EMAIL,
      FROM,
    });

    const emailPromises = [];
    const results = [];

    for (const orderId of orderIds) {
      // Fetch order details
      const { data: order, error: fetchError } = await supabaseAdmin
        .from("orders")
        .select("*")
        .eq("id", orderId)
        .single();

      if (fetchError || !order) {
        console.error(`send-order-emails: Error fetching order ${orderId}:`, fetchError);
        results.push({ orderId, status: "error", error: "Order not found or fetch failed" });
        continue;
      }

      const shortId = order.id.slice(0, 8).toUpperCase();
      const productTitle = order.product_title;
      const productSize = order.product_size;
      const quantity = order.quantity;
      const unitPrice = Number(order.unit_price) || 0;
      const totalPrice = Number(order.total_price) || 0;
      const customOptions = order.custom_options || {};
      const designUrl = order.design_url;
      const designFilename = order.design_filename;
      
      const shippingName = order.shipping_name;
      const shippingAddress = order.shipping_address;
      const shippingCity = order.shipping_city;
      const shippingPostal = order.shipping_postal;

      // Build attachments using remote path for Resend API
      const emailAttachments = [];
      if (designUrl) {
        emailAttachments.push({
          filename: designFilename || "design.pdf",
          path: designUrl,
        });
      }

      // 1. Build Admin Email HTML
      const adminHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0f172a; color: #f1f5f9; padding: 32px; border-radius: 12px;">
          <div style="text-align: center; margin-bottom: 28px;">
            <h1 style="color: #ff2d78; font-size: 28px; margin: 0; letter-spacing: -0.5px;">NANO SIGNS</h1>
            <p style="color: #94a3b8; margin: 4px 0 0;">New Order Received</p>
          </div>

          <div style="background: #1e293b; border-radius: 10px; padding: 20px; margin-bottom: 20px;">
            <h2 style="margin: 0 0 16px; font-size: 16px; color: #e2e8f0; border-bottom: 1px solid #334155; padding-bottom: 10px;">
              📦 Order #${shortId}
            </h2>
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr><td style="padding: 6px 0; color: #94a3b8; width: 40%;">Product:</td><td style="color: #f1f5f9; font-weight: bold;">${productTitle}</td></tr>
              <tr><td style="padding: 6px 0; color: #94a3b8;">Size:</td><td style="color: #f1f5f9;">${productSize || "—"}</td></tr>
              <tr><td style="padding: 6px 0; color: #94a3b8;">Quantity:</td><td style="color: #f1f5f9;">${quantity} unit(s)</td></tr>
              <tr><td style="padding: 6px 0; color: #94a3b8;">Unit Price:</td><td style="color: #f1f5f9;">$${unitPrice.toFixed(2)}</td></tr>
              <tr><td style="padding: 6px 0; color: #94a3b8;">Total:</td><td style="color: #ff2d78; font-weight: bold; font-size: 16px;">$${totalPrice.toFixed(2)}</td></tr>
            </table>
          </div>

          ${Object.entries(customOptions).filter(([key]) => key !== "Design Data").length > 0
          ? `
          <div style="background: #1e293b; border-radius: 10px; padding: 20px; margin-bottom: 20px;">
            <h3 style="margin: 0 0 12px; font-size: 14px; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em;">Custom Options</h3>
            <table style="width: 100%; font-size: 13px;">
              ${Object.entries(customOptions)
            .filter(([k]) => k !== "Design Data")
            .map(
              ([k, v]) => `
                <tr><td style="padding: 4px 0; color: #64748b; width: 40%;">${k}:</td><td style="color: #e2e8f0;">${v}</td></tr>
              `,
            )
            .join("")}
            </table>
          </div>
          `
          : ""
        }

          <div style="background: #1e293b; border-radius: 10px; padding: 20px; margin-bottom: 20px;">
            <h3 style="margin: 0 0 12px; font-size: 14px; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em;">Shipping Details</h3>
            <p style="margin: 0; font-size: 14px; color: #e2e8f0; line-height: 1.6;">
              ${shippingName || "—"}<br/>
              ${shippingAddress || "—"}<br/>
              ${shippingCity || ""} ${shippingPostal || ""}
            </p>
          </div>

          ${designUrl
          ? `
          <div style="background: #1e293b; border-radius: 10px; padding: 20px; margin-bottom: 20px;">
            <h3 style="margin: 0 0 12px; font-size: 14px; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em;">Customer Artwork</h3>
            <p style="margin: 0 0 10px; font-size: 13px; color: #cbd5e1;">Filename: ${designFilename}</p>
            <a href="${designUrl}" style="display: inline-block; background: #ff2d78; color: white; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-size: 13px; font-weight: bold;">
              Download Design File
            </a>
          </div>
          `
          : `
          <div style="background: #1e293b; border-radius: 10px; padding: 20px; margin-bottom: 20px; border: 1px dashed #334155;">
            <p style="margin: 0; font-size: 13px; color: #64748b;">⚙️ Design was created via the online canvas editor — no file upload.</p>
          </div>
          `
        }

          <div style="text-align: center; padding-top: 20px; border-top: 1px solid #1e293b;">
            <p style="font-size: 12px; color: #475569; margin: 0;">Customer: ${userEmail || "N/A"}</p>
            <p style="font-size: 12px; color: #475569; margin: 4px 0 0;">Order ID: ${order.id}</p>
          </div>
        </div>
      `;

      // 2. Build Customer Email HTML
      const customerHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; padding: 0; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0;">
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #ff2d78, #b020ff, #00e5ff); padding: 32px; text-align: center;">
            <h1 style="color: white; font-size: 32px; margin: 0; letter-spacing: -0.5px; font-weight: 900;">NANO SIGNS</h1>
            <p style="color: rgba(255,255,255,0.85); margin: 6px 0 0; font-size: 14px;">Your order is confirmed and in our queue!</p>
          </div>

          <!-- Body -->
          <div style="padding: 32px;">
            <div style="display: flex; align-items: center; gap: 12px; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 10px; padding: 16px; margin-bottom: 24px;">
              <span style="font-size: 24px;">✅</span>
              <div>
                <p style="margin: 0; font-weight: bold; color: #166534; font-size: 15px;">Order Placed Successfully!</p>
                <p style="margin: 4px 0 0; color: #15803d; font-size: 13px;">Our team will review your artwork and begin production shortly.</p>
              </div>
            </div>

            <h2 style="font-size: 16px; color: #0f172a; margin: 0 0 16px;">Order Summary</h2>
            <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 24px;">
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 10px 0; color: #64748b;">Order ID</td>
                <td style="padding: 10px 0; color: #0f172a; font-family: monospace; font-weight: bold;">#${shortId}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 10px 0; color: #64748b;">Product</td>
                <td style="padding: 10px 0; color: #0f172a; font-weight: 600;">${productTitle}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 10px 0; color: #64748b;">Size</td>
                <td style="padding: 10px 0; color: #0f172a;">${productSize || "—"}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 10px 0; color: #64748b;">Quantity</td>
                <td style="padding: 10px 0; color: #0f172a;">${quantity} unit(s)</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #64748b; font-weight: bold;">Total Charged</td>
                <td style="padding: 10px 0; color: #ff2d78; font-size: 18px; font-weight: 900;">$${totalPrice.toFixed(2)}</td>
              </tr>
            </table>

            ${shippingName
            ? `
            <h2 style="font-size: 16px; color: #0f172a; margin: 0 0 12px;">Shipping To</h2>
            <div style="background: #f8fafc; border-radius: 8px; padding: 14px; font-size: 14px; color: #334155; line-height: 1.6; margin-bottom: 24px;">
              <strong>${shippingName}</strong><br/>
              ${shippingAddress || ""}<br/>
              ${shippingCity || ""} ${shippingPostal || ""}
            </div>
            `
            : ""
          }

            <div style="background: #fef9ff; border: 1px solid #e9d5ff; border-radius: 10px; padding: 16px; margin-bottom: 24px;">
              <p style="margin: 0; font-size: 13px; color: #7e22ce; font-weight: bold;">🎨 Free Artwork Review Included</p>
              <p style="margin: 6px 0 0; font-size: 12px; color: #6b21a8;">Our in-house team checks alignment, colors, and resolution before we print — free of charge.</p>
            </div>

            ${designUrl
            ? `
            <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 20px; margin-bottom: 24px; text-align: center;">
              <h3 style="margin: 0 0 8px; font-size: 14px; color: #0f172a; text-transform: uppercase; letter-spacing: 0.05em; font-weight: bold;">Your Custom Design File</h3>
              <p style="margin: 0 0 12px; font-size: 12px; color: #64748b;">Filename: ${designFilename || "online_design.pdf"}</p>
              <a href="${designUrl}" style="display: inline-block; background: #0f172a; color: white; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-size: 13px; font-weight: bold; border: 1px solid #0f172a;">
                📥 Download Design PDF
              </a>
            </div>
            `
            : ""
            }

            <div style="text-align: center;">
              <p style="font-size: 13px; color: #64748b; margin: 0 0 16px;">Expected delivery: <strong style="color: #0f172a;">Next Business Day</strong></p>
              <a href="${process.env.NEXT_PUBLIC_SUPABASE_URL?.replace("supabase.co", "") || ""}account/orders" style="display: inline-block; background: linear-gradient(135deg, #ff2d78, #b020ff); color: white; padding: 12px 28px; border-radius: 50px; text-decoration: none; font-size: 13px; font-weight: bold;">
                View My Orders
              </a>
            </div>
          </div>

          <!-- Footer -->
          <div style="background: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;">
            <p style="font-size: 12px; color: #94a3b8; margin: 0;">Nano Signs • Your custom sign partner</p>
            <p style="font-size: 11px; color: #cbd5e1; margin: 4px 0 0;">Questions? Reply to this email or contact us.</p>
          </div>
        </div>
      `;

      // ── Push Admin Email Promise ─────────────────────────────────────────
      if (ADMIN_EMAIL) {
        const adminSendParams: any = {
          from: FROM,
          to: [ADMIN_EMAIL],
          subject: `🖨️ New Order #${shortId} — ${productTitle}`,
          html: adminHtml,
        };
        if (emailAttachments.length > 0) {
          adminSendParams.attachments = emailAttachments;
        }

        emailPromises.push(
          resend.emails.send(adminSendParams)
            .then((res: any) => {
              if (res.error) {
                console.error(`send-order-emails: Admin email error for ${orderId}:`, res.error);
                return { orderId, type: "admin", success: false, error: res.error };
              }
              console.log(`send-order-emails: Admin email sent for ${orderId}`);
              return { orderId, type: "admin", success: true };
            })
            .catch((err: any) => {
              console.error(`send-order-emails: Admin email exception for ${orderId}:`, err);
              return { orderId, type: "admin", success: false, error: String(err) };
            })
        );
      }

      // ── Push Customer Email Promise ──────────────────────────────────────
      if (userEmail) {
        const customerSendParams: any = {
          from: FROM,
          to: [userEmail],
          subject: `✅ Your Order #${shortId} is Confirmed — Nano Signs`,
          html: customerHtml,
        };
        if (emailAttachments.length > 0) {
          customerSendParams.attachments = emailAttachments;
        }

        emailPromises.push(
          resend.emails.send(customerSendParams)
            .then((res: any) => {
              if (res.error) {
                console.error(`send-order-emails: Customer email error for ${orderId}:`, res.error);
                return { orderId, type: "customer", success: false, error: res.error };
              }
              console.log(`send-order-emails: Customer email sent for ${orderId}`);
              return { orderId, type: "customer", success: true };
            })
            .catch((err: any) => {
              console.error(`send-order-emails: Customer email exception for ${orderId}:`, err);
              return { orderId, type: "customer", success: false, error: String(err) };
            })
        );
      }
    }

    if (emailPromises.length > 0) {
      const emailResults = await Promise.all(emailPromises);
      results.push(...emailResults);
    }

    return NextResponse.json({
      success: true,
      message: "Order emails processed.",
      results,
    });
  } catch (err) {
    console.error("send-order-emails endpoint error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Internal server error" },
      { status: 500 }
    );
  }
}
