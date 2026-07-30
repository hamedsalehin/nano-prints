import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { BLOG_REGISTRY } from "@/lib/blogRegistry";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const postsDirectory = path.join(process.cwd(), "src/content/blog");

    // 1. Read markdown posts (created via admin studio)
    const markdownPosts: {
      id: string; slug: string; title: string; category: string;
      description: string; image: string; content: string;
      published: boolean; date: string; fromRegistry: boolean;
    }[] = [];

    if (fs.existsSync(postsDirectory)) {
      const fileNames = fs.readdirSync(postsDirectory).filter((f) => f.endsWith(".md"));
      for (const fileName of fileNames) {
        const slug = fileName.replace(/\.md$/, "");
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const matterResult = matter(fileContents);
        markdownPosts.push({
          id: slug,
          slug,
          title: matterResult.data.title || slug,
          category: matterResult.data.category || "General Signage",
          description: matterResult.data.description || "",
          image: matterResult.data.image || "/images/products/outdoor-fixed-led-display.jpg",
          content: matterResult.content || "",
          published: true,
          date: matterResult.data.date || new Date().toISOString().split("T")[0],
          fromRegistry: false,
        });
      }
    }

    // 2. Add BLOG_REGISTRY posts that don't already have a markdown file
    const markdownSlugs = new Set(markdownPosts.map((p) => p.slug));

    const registryPosts = Object.values(BLOG_REGISTRY)
      .filter((p) => !markdownSlugs.has(p.slug))
      .map((p) => ({
        id: p.slug,
        slug: p.slug,
        title: p.title,
        category: p.category,
        description: p.excerpt || "",
        image: p.image,
        content: p.content,
        published: true,
        date: p.date,
        fromRegistry: true,
      }));

    // 3. Merge: markdown posts first (newest), then registry posts
    const allPosts = [
      ...markdownPosts.sort((a, b) => (a.date < b.date ? 1 : -1)),
      ...registryPosts,
    ];

    return NextResponse.json({ posts: allPosts });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Failed to list blog posts:", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
