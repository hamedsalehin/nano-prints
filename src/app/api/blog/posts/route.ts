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

    // 2. Read posts from Supabase DB (persistent across deployments)
    const dbPosts: typeof markdownPosts = [];
    try {
      const { supabase } = await import("@/lib/supabaseClient");
      const { data: dbData } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: false });

      if (dbData && dbData.length > 0) {
        for (const item of dbData) {
          dbPosts.push({
            id: item.slug,
            slug: item.slug,
            title: item.title,
            category: item.category || "General Signage",
            description: item.description || "",
            image: item.image || "/images/products/outdoor-fixed-led-display.jpg",
            content: item.content || "",
            published: true,
            date: item.date || item.created_at?.split("T")[0] || "",
            fromRegistry: false,
          });
        }
      }
    } catch (dbErr) {
      console.warn("Supabase blog posts fetch notice:", dbErr);
    }

    // 3. Add BLOG_REGISTRY posts that don't already exist in markdown or DB
    const existingSlugs = new Set([
      ...markdownPosts.map((p) => p.slug),
      ...dbPosts.map((p) => p.slug),
    ]);

    const registryPosts = Object.values(BLOG_REGISTRY)
      .filter((p) => !existingSlugs.has(p.slug))
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

    // Merge: DB posts + Markdown posts + Registry posts
    const allSlugs = new Set<string>();
    const allPosts: typeof markdownPosts = [];
    for (const post of [...dbPosts, ...markdownPosts, ...registryPosts]) {
      if (!allSlugs.has(post.slug)) {
        allSlugs.add(post.slug);
        allPosts.push(post);
      }
    }

    return NextResponse.json({ posts: allPosts });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Failed to list blog posts:", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
