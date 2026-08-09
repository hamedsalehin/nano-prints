import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

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

    const { cleanRawContent, normalizeImagePath } = await import("@/lib/blogUtils");
    const { content: cleanedContent, extractedData } = cleanRawContent(content);

    const finalTitle = title || extractedData.title || newSlug.replace(/-/g, " ");
    const finalDescription = description || extractedData.description || "";
    const finalImage = normalizeImagePath(image || extractedData.image);
    const finalCategory = category || extractedData.category || "General Signage";

    // Build the .md file content
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

    // GitHub API Commit
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
    const GITHUB_REPO = process.env.GITHUB_REPO || "hamedsalehin/nano-prints";
    const GITHUB_BRANCH = process.env.GITHUB_BRANCH || "main";
    const ghFilePath = `src/content/blog/${newSlug}.md`;
    const fileContentB64 = Buffer.from(fileContent, "utf8").toString("base64");

    if (!GITHUB_TOKEN) {
      return NextResponse.json(
        {
          error:
            "GITHUB_TOKEN environment variable is not set. Please add it to Netlify: Site Settings > Environment Variables.",
        },
        { status: 500 }
      );
    }

    const apiBase = `https://api.github.com/repos/${GITHUB_REPO}/contents/${ghFilePath}`;
    const headers: HeadersInit = {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      "Content-Type": "application/json",
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    };

    // Check if file already exists (get SHA for update)
    let existingSha: string | undefined;
    const checkRes = await fetch(`${apiBase}?ref=${GITHUB_BRANCH}`, { headers });
    if (checkRes.ok) {
      const checkData = await checkRes.json();
      existingSha = checkData.sha;
    }

    // If editing and slug changed, delete old file
    if (originalSlug && originalSlug !== newSlug) {
      const oldPath = `src/content/blog/${originalSlug}.md`;
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
            message: `chore(blog): remove old post ${originalSlug}`,
            sha: oldData.sha,
            branch: GITHUB_BRANCH,
          }),
        });
      }
    }

    // Commit new/updated file to GitHub
    const commitBody: Record<string, unknown> = {
      message: `feat(blog): publish "${finalTitle}"`,
      content: fileContentB64,
      branch: GITHUB_BRANCH,
    };
    if (existingSha) {
      commitBody.sha = existingSha;
    }

    const commitRes = await fetch(apiBase, {
      method: "PUT",
      headers,
      body: JSON.stringify(commitBody),
    });

    if (!commitRes.ok) {
      const errBody = await commitRes.text();
      console.error("GitHub commit failed:", commitRes.status, errBody);
      return NextResponse.json(
        { error: `GitHub commit failed (${commitRes.status}): ${errBody}` },
        { status: 502 }
      );
    }

    // Optionally trigger Netlify rebuild hook
    const NETLIFY_HOOK = process.env.NETLIFY_BUILD_HOOK;
    if (NETLIFY_HOOK) {
      try {
        await fetch(NETLIFY_HOOK, { method: "POST" });
      } catch {
        // Non-fatal
      }
    }

    return NextResponse.json({
      success: true,
      message: `Blog post "${finalTitle}" saved to GitHub. Site will rebuild in ~1-2 minutes.`,
      slug: newSlug,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to save post.";
    console.error("Failed to publish blog post:", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
