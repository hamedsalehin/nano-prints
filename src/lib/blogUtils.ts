import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface MarkdownBlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  date: string;
  readTime: string;
  color: string;
}

export function slugToTitle(slug: string): string {
  return slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());
}

export function formatTitle(title?: string, slug?: string): string {
  if (!title && slug) return slugToTitle(slug);
  if (!title) return "Blog Article";
  // If title is equal to slug format (e.g. all lowercase/dashes)
  if (/^[a-z0-9-]+$/.test(title) && title.includes("-")) {
    return slugToTitle(title);
  }
  return title;
}

export function normalizeImagePath(imageStr?: string): string {
  if (!imageStr || imageStr.trim() === "") {
    return "/images/products/neon/nano-signs-cocktails-neon-usa.webp";
  }
  let clean = imageStr.replace(/\\/g, "/").trim();
  if (clean.startsWith("data:") || clean.startsWith("http")) return clean;
  if (!clean.startsWith("/")) clean = "/" + clean;

  const hasExt = /\.(jpg|jpeg|png|webp|svg|gif|avif)$/i.test(clean);
  if (!hasExt) {
    clean += ".webp";
  }
  return clean;
}

export function cleanRawContent(rawContent: string): { content: string; extractedData: Record<string, string> } {
  let text = (rawContent || "").trim();
  const extractedData: Record<string, string> = {};

  if (text.startsWith("---")) {
    try {
      const parsed = matter(text);
      text = parsed.content;
      if (parsed.data.title) extractedData.title = parsed.data.title;
      if (parsed.data.description) extractedData.description = parsed.data.description;
      if (parsed.data.image) extractedData.image = parsed.data.image;
      if (parsed.data.category) extractedData.category = parsed.data.category;
      if (parsed.data.date) extractedData.date = parsed.data.date;
    } catch {
      text = text.replace(/^---[\s\S]*?---\s*/, "");
    }
  }

  
  // Strip document level HTML tags, head, title, body wrappers to prevent duplicate title tags
  text = text.replace(/<!DOCTYPE[^>]*>/gi, "");
  text = text.replace(/<html[^>]*>/gi, "").replace(/<\/html>/gi, "");
  text = text.replace(/<head[^>]*>[\s\S]*?<\/head>/gi, "");
  text = text.replace(/<title[^>]*>[\s\S]*?<\/title>/gi, "");
  text = text.replace(/<body[^>]*>/gi, "").replace(/<\/body>/gi, "");

  return { content: text.trim(), extractedData };
}

function estimateReadTime(content: string): string {
  const wordCount = content.replace(/<[^>]+>/g, "").split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(wordCount / 200));
  return `${minutes} min read`;
}

const CATEGORY_COLORS: Record<string, string> = {
  "LED Signs": "from-blue-900 to-cyan-900",
  "Neon Signs": "from-pink-900 to-purple-900",
  "Print & Signs": "from-orange-900 to-yellow-900",
  "Vehicle Signs": "from-green-900 to-teal-900",
  "Local Guides": "from-violet-900 to-indigo-900",
};

export function getMarkdownBlogPosts(): MarkdownBlogPost[] {
  const postsDirectory = path.join(process.cwd(), "src/content/blog");
  if (!fs.existsSync(postsDirectory)) return [];

  const fileNames = fs.readdirSync(postsDirectory);
  const posts = fileNames
    .filter((file) => file.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content: rawBody } = matter(fileContents);
      const { content, extractedData } = cleanRawContent(rawBody);

      const title = formatTitle(data.title || extractedData.title, slug);
      const category = data.category || extractedData.category || "General Signage";
      const rawDate = data.date || extractedData.date || new Date().toISOString().split("T")[0];
      const image = normalizeImagePath(data.image || extractedData.image);

      let formattedDate = rawDate;
      try {
        const d = new Date(rawDate);
        if (!isNaN(d.getTime())) {
          formattedDate = d.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          });
        }
      } catch {}

      return {
        slug,
        title,
        excerpt: data.description || extractedData.description || content.replace(/<[^>]+>/g, "").slice(0, 160),
        content,
        image,
        category,
        date: formattedDate,
        rawDate,
        readTime: estimateReadTime(content),
        color: CATEGORY_COLORS[category] || "from-slate-800 to-slate-900",
      };
    })
    .sort((a, b) => (a.rawDate < b.rawDate ? 1 : -1));

  return posts;
}

export function getMarkdownBlogPost(slug: string): MarkdownBlogPost | null {
  const filePath = path.join(process.cwd(), "src/content/blog", `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content: rawBody } = matter(fileContents);
  const { content, extractedData } = cleanRawContent(rawBody);

  const title = formatTitle(data.title || extractedData.title, slug);
  const category = data.category || extractedData.category || "General Signage";
  const rawDate = data.date || extractedData.date || new Date().toISOString().split("T")[0];
  const image = normalizeImagePath(data.image || extractedData.image);

  let formattedDate = rawDate;
  try {
    const d = new Date(rawDate);
    if (!isNaN(d.getTime())) {
      formattedDate = d.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    }
  } catch {}

  return {
    slug,
    title,
    excerpt: data.description || extractedData.description || content.replace(/<[^>]+>/g, "").slice(0, 160),
    content,
    image,
    category,
    date: formattedDate,
    readTime: estimateReadTime(content),
    color: CATEGORY_COLORS[category] || "from-slate-800 to-slate-900",
  };
}
