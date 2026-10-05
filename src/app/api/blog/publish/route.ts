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

    const { cleanRawContent, normalizeImagePath, formatTitle } = await import("@/lib/blogUtils");
    const { content: cleanedContent, extractedData } = cleanRawContent(content);

    const finalTitle = title || extractedData.title || newSlug.replace(/-/g, " ");
    const finalDescription = description || extractedData.description || "";
    const finalImage = normalizeImagePath(image || extractedData.image);
    const finalCategory = category || extractedData.category || "General Signage";

    // Markdown file template
    const fileContent = `---
title: "${finalTitle.replace(/"/g, '\\"')}"
date: "${todayDate}"
description: "${finalDescription.replace(/"/g, '\\"')}"
image: "${finalImage}"
category: "${finalCategory.replace(/"/g, '\\"')}"
type: "post"
---

${cleanedContent}
`;

    const filePath = path.join(targetDir, `${newSlug}.md`);
    try {
      fs.writeFileSync(filePath, fileContent, "utf8");

      // Auto-sync into src/lib/blogRegistry.ts if running in Node environment
      const registryPath = path.join(process.cwd(), "src/lib/blogRegistry.ts");
      if (fs.existsSync(registryPath)) {
        let regContent = fs.readFileSync(registryPath, "utf8");
        const entryKey = `"${newSlug}":`;
        const newEntry = `  "${newSlug}": {
    slug: "${newSlug}",
    title: "${finalTitle.replace(/"/g, '\\"')}",
    excerpt: "${finalDescription.replace(/"/g, '\\"')}",
    image: "${finalImage}",
    category: "${finalCategory.replace(/"/g, '\\"')}",
    date: "${todayDate}",
    readTime: "4 min read",
    color: "from-blue-900 to-cyan-900",
    content: \`\n${cleanedContent}\n\`
  },`;

        if (regContent.includes(entryKey)) {
          // Replace existing entry
          const keyIdx = regContent.indexOf(entryKey);
          const nextKeyIdx = regContent.indexOf('\n  "', keyIdx + entryKey.length);
          const endBraceIdx = regContent.indexOf("\n};", keyIdx);
          const replaceEnd = (nextKeyIdx !== -1 && nextKeyIdx < endBraceIdx) ? nextKeyIdx : endBraceIdx;
          regContent = regContent.slice(0, keyIdx - 2) + newEntry + regContent.slice(replaceEnd);
        } else {
          // Append before ending };
          const lastBraceIdx = regContent.lastIndexOf("};");
          if (lastBraceIdx !== -1) {
            regContent = regContent.slice(0, lastBraceIdx) + newEntry + "\n};";
          }
        }
        fs.writeFileSync(registryPath, regContent, "utf8");
      }
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
