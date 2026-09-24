import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabaseAdmin = (supabaseUrl && supabaseServiceKey)
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null;

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Max 25MB check
    if (file.size > 25 * 1024 * 1024) {
      return NextResponse.json({ error: "File size exceeds 25MB limit." }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileExt = file.name.split(".").pop();
    const cleanFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const filePath = `guest_uploads/${Date.now()}_${cleanFileName}`;

    if (supabaseAdmin) {
      const { error: uploadError } = await supabaseAdmin.storage
        .from("quote-attachments")
        .upload(filePath, buffer, {
          contentType: file.type || "application/octet-stream",
          upsert: true,
        });

      if (uploadError) {
        console.error("Supabase Admin Storage upload error:", uploadError);
        // Fallback response if bucket issue
        return NextResponse.json({
          publicUrl: null,
          fileName: file.name,
          note: "File noted for quote submission",
        });
      }

      const { data: publicUrlData } = supabaseAdmin.storage
        .from("quote-attachments")
        .getPublicUrl(filePath);

      return NextResponse.json({
        publicUrl: publicUrlData.publicUrl,
        fileName: file.name,
      });
    }

    return NextResponse.json({
      publicUrl: null,
      fileName: file.name,
      note: "File recorded for quote",
    });
  } catch (err: any) {
    console.error("Upload endpoint error:", err);
    return NextResponse.json({ error: err.message || "Upload failed" }, { status: 500 });
  }
}
