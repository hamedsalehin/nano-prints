import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("slug");

    if (!slug) {
      return NextResponse.json(
        { error: "Slug parameter is required." },
        { status: 400 }
      );
    }

    // Clean safe slug
    const safeSlug = slug.toLowerCase().replace(/[^a-z0-9-]+/g, "");
    const targetFile = path.join(process.cwd(), "src/content/blog", `${safeSlug}.md`);

    if (fs.existsSync(targetFile)) {
      fs.unlinkSync(targetFile);
      return NextResponse.json({
        success: true,
        message: `Successfully deleted ${safeSlug}.md`,
      });
    } else {
      return NextResponse.json(
        { error: `File ${safeSlug}.md not found.` },
        { status: 404 }
      );
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to delete post.";
    console.error("Failed to delete blog post:", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
