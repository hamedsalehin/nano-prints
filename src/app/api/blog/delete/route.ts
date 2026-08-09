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
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
    const GITHUB_REPO = process.env.GITHUB_REPO || "hamedsalehin/nano-prints";
    const GITHUB_BRANCH = process.env.GITHUB_BRANCH || "main";

    if (!GITHUB_TOKEN) {
      return NextResponse.json(
        { error: "GITHUB_TOKEN environment variable is not set." },
        { status: 500 }
      );
    }

    const ghFilePath = `src/content/blog/${safeSlug}.md`;
    const apiUrl = `https://api.github.com/repos/${GITHUB_REPO}/contents/${ghFilePath}`;
    const headers: HeadersInit = {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      "Content-Type": "application/json",
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    };

    // Get the file SHA first (required for DELETE)
    const getRes = await fetch(`${apiUrl}?ref=${GITHUB_BRANCH}`, { headers });
    if (!getRes.ok) {
      return NextResponse.json(
        { error: `Blog post "${safeSlug}" not found in GitHub repo.` },
        { status: 404 }
      );
    }
    const fileData = await getRes.json();

    const delRes = await fetch(apiUrl, {
      method: "DELETE",
      headers,
      body: JSON.stringify({
        message: `chore(blog): delete post ${safeSlug}`,
        sha: fileData.sha,
        branch: GITHUB_BRANCH,
      }),
    });

    if (!delRes.ok) {
      const errBody = await delRes.text();
      return NextResponse.json(
        { error: `GitHub delete failed (${delRes.status}): ${errBody}` },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Deleted "${safeSlug}" from GitHub. Site will rebuild in ~1-2 minutes.`,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to delete post.";
    console.error("Failed to delete blog post:", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
