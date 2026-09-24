import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/**
 * POST /api/blog/upload-image
 * Body: { filename: string, base64: string } (base64 is the raw base64 without data URL prefix)
 * Returns: { url: string } — the public URL of the uploaded image
 *
 * Uploads a blog cover image to public/images/blog/ in the GitHub repo so it
 * survives Netlify redeploys and doesn't embed giant base64 strings in markdown.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { filename, base64 } = body;

    if (!filename || !base64) {
      return NextResponse.json({ error: "filename and base64 are required." }, { status: 400 });
    }

    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
    const GITHUB_REPO = process.env.GITHUB_REPO || "hamedsalehin/nano-prints";
    const GITHUB_BRANCH = process.env.GITHUB_BRANCH || "main";

    if (!GITHUB_TOKEN) {
      return NextResponse.json(
        { error: "GITHUB_TOKEN not set. Add it to Netlify environment variables." },
        { status: 500 }
      );
    }

    // Sanitise filename and build the public path
    const safeFilename = filename
      .toLowerCase()
      .replace(/[^a-z0-9._-]/g, "-")
      .replace(/-+/g, "-");
    const ghFilePath = `public/images/blog/${safeFilename}`;
    const publicUrl = `/images/blog/${safeFilename}`;

    const apiUrl = `https://api.github.com/repos/${GITHUB_REPO}/contents/${ghFilePath}`;
    const headers: HeadersInit = {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      "Content-Type": "application/json",
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    };

    // Check if file already exists (get SHA for update)
    let existingSha: string | undefined;
    const checkRes = await fetch(`${apiUrl}?ref=${GITHUB_BRANCH}`, { headers });
    if (checkRes.ok) {
      const checkData = await checkRes.json();
      existingSha = checkData.sha;
    }

    const commitBody: Record<string, unknown> = {
      message: `feat(blog): add cover image ${safeFilename}`,
      content: base64,
      branch: GITHUB_BRANCH,
    };
    if (existingSha) commitBody.sha = existingSha;

    const commitRes = await fetch(apiUrl, {
      method: "PUT",
      headers,
      body: JSON.stringify(commitBody),
    });

    if (!commitRes.ok) {
      const errBody = await commitRes.text();
      console.error("GitHub image upload failed:", commitRes.status, errBody);
      return NextResponse.json(
        { error: `GitHub upload failed (${commitRes.status}): ${errBody}` },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true, url: publicUrl });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Upload failed.";
    console.error("Blog image upload error:", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
