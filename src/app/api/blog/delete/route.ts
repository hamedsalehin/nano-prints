import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");

    if (!slug) {
      return NextResponse.json({ error: "Slug parameter is required." }, { status: 400 });
    }

    const safeSlug = slug.toLowerCase().replace(/[^a-z0-9-]+/g, "");

    // Delete from Supabase
    const { supabase } = await import("@/lib/supabaseClient");
    const { error } = await supabase.from("blog_posts").delete().eq("slug", safeSlug);

    if (error) {
      console.error("Supabase delete error:", error);
      return NextResponse.json({ error: `Delete failed: ${error.message}` }, { status: 500 });
    }

    // Also try GitHub if token available
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
    if (GITHUB_TOKEN) {
      try {
        const GITHUB_REPO = process.env.GITHUB_REPO || "hamedsalehin/nano-prints";
        const GITHUB_BRANCH = process.env.GITHUB_BRANCH || "main";
        const oldPath = `src/content/blog/${safeSlug}.md`;
        const headers: HeadersInit = {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          "Content-Type": "application/json",
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
        };
        const oldCheck = await fetch(
          `https://api.github.com/repos/${GITHUB_REPO}/contents/${oldPath}?ref=${GITHUB_BRANCH}`,
          { headers }
        );
        if (oldCheck.ok) {
          const oldData = await oldCheck.json();
          await fetch(`https://api.github.com/repos/${GITHUB_REPO}/contents/${oldPath}`, {
            method: "DELETE",
            headers,
            body: JSON.stringify({
              message: `chore(blog): delete post ${safeSlug}`,
              sha: oldData.sha,
              branch: GITHUB_BRANCH,
            }),
          });
        }
      } catch {
        // GitHub deletion is optional
      }
    }

    return NextResponse.json({
      success: true,
      message: `Successfully deleted "${safeSlug}".`,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to delete post.";
    console.error("Failed to delete blog post:", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
