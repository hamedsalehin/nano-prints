import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, description, content, image, originalSlug, category } = body;

    if (!title || !content) {
      return NextResponse.json({ error: "Title and Content are required." }, { status: 400 });
    }

    const newSlug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    const todayDate = new Date().toISOString().split("T")[0];

    const { cleanRawContent, normalizeImagePath } = await import("@/lib/blogUtils");
    const { content: cleanedContent, extractedData } = cleanRawContent(content);

    const finalTitle = title || extractedData.title || newSlug.replace(/-/g, " ");
    const finalDescription = description || extractedData.description || "";
    const finalImage = normalizeImagePath(image || extractedData.image);
    const finalCategory = category || extractedData.category || "General Signage";

    // Save to Supabase (primary, survives all redeploys)
    const { supabase } = await import("@/lib/supabaseClient");

    // If slug changed, delete old entry
    if (originalSlug && originalSlug !== newSlug) {
      await supabase.from("blog_posts").delete().eq("slug", originalSlug);
    }

    const { error: dbError } = await supabase.from("blog_posts").upsert(
      {
        slug: newSlug,
        title: finalTitle,
        description: finalDescription,
        content: cleanedContent,
        image: finalImage,
        category: finalCategory,
        published: true,
        date: todayDate,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "slug" }
    );

    if (dbError) {
      console.error("Supabase upsert error:", dbError);
      return NextResponse.json(
        { error: `Database save failed: ${dbError.message}` },
        { status: 500 }
      );
    }

    // Also try to commit to GitHub if token is available (optional bonus)
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
    if (GITHUB_TOKEN) {
      try {
        const GITHUB_REPO = process.env.GITHUB_REPO || "hamedsalehin/nano-prints";
        const GITHUB_BRANCH = process.env.GITHUB_BRANCH || "main";
        const escapedTitle = finalTitle.replace(/"/g, '\\"');
        const escapedDesc = finalDescription.replace(/"/g, '\\"');
        const escapedCat = finalCategory.replace(/"/g, '\\"');
        const fileContent = [
          "---",
          `title: "${escapedTitle}"`,
          `date: "${todayDate}"`,
          `description: "${escapedDesc}"`,
          `image: "${finalImage}"`,
          `category: "${escapedCat}"`,
          'type: "post"',
          "---",
          "",
          cleanedContent,
          "",
        ].join("\n");
        const ghFilePath = `src/content/blog/${newSlug}.md`;
        const fileContentB64 = Buffer.from(fileContent, "utf8").toString("base64");
        const apiBase = `https://api.github.com/repos/${GITHUB_REPO}/contents/${ghFilePath}`;
        const headers: HeadersInit = {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          "Content-Type": "application/json",
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
        };
        let existingSha: string | undefined;
        const checkRes = await fetch(`${apiBase}?ref=${GITHUB_BRANCH}`, { headers });
        if (checkRes.ok) {
          const checkData = await checkRes.json();
          existingSha = checkData.sha;
        }
        const commitBody: Record<string, unknown> = {
          message: `feat(blog): publish "${finalTitle}"`,
          content: fileContentB64,
          branch: GITHUB_BRANCH,
        };
        if (existingSha) commitBody.sha = existingSha;
        await fetch(apiBase, { method: "PUT", headers, body: JSON.stringify(commitBody) });
      } catch {
        // GitHub backup is optional — Supabase is the source of truth
      }
    }

    return NextResponse.json({
      success: true,
      message: `Blog post "${finalTitle}" saved successfully!`,
      slug: newSlug,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to save post.";
    console.error("Failed to publish blog post:", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
