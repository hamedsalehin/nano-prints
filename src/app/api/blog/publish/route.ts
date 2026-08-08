import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, description, content, image, originalSlug, category } = body;

    if (!title || !content) {
      return NextResponse.json(
        { error: "Title and Content are required." },
        { status: 400 }
      );
    }

    // Generate safe file slug from title
    const newSlug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    const todayDate = new Date().toISOString().split("T")[0];
    const targetDir = path.join(process.cwd(), "src/content/blog");

    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    // If editing an existing article and the title/slug changed, remove the old file
    if (originalSlug && originalSlug !== newSlug) {
      const oldFilePath = path.join(targetDir, `${originalSlug}.md`);
      if (fs.existsSync(oldFilePath)) {
        fs.unlinkSync(oldFilePath);
      }
    }

    // Markdown file template
    const fileContent = `---
title: "${title.replace(/"/g, '\\"')}"
date: "${todayDate}"
description: "${(description || "").replace(/"/g, '\\"')}"
image: "${image || "/images/products/outdoor-fixed-led-display.jpg"}"
category: "${(category || "General Signage").replace(/"/g, '\\"')}"
type: "post"
---

${content}
`;

    const filePath = path.join(targetDir, `${newSlug}.md`);
    try {
      fs.writeFileSync(filePath, fileContent, "utf8");
    } catch (fsErr) {
      console.warn("Could not write to local filesystem (read-only environment):", fsErr);
    }

    // Persist to Supabase Database for cloud survival across Netlify builds
    try {
      const { supabase } = await import("@/lib/supabaseClient");
      await supabase.from("blog_posts").upsert(
        {
          slug: newSlug,
          title,
          description: description || "",
          content,
          image: image || "/images/products/outdoor-fixed-led-display.jpg",
          category: category || "General Signage",
          published: true,
          date: todayDate,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "slug" }
      );
    } catch (dbErr) {
      console.warn("Supabase blog post sync warning:", dbErr);
    }

    return NextResponse.json({
      success: true,
      message: `Blog post saved successfully as ${newSlug}.md`,
      slug: newSlug,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to save post.";
    console.error("Failed to publish/edit blog post:", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
