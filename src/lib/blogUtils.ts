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
      const { data, content } = matter(fileContents);

      const category = data.category || "General Signage";
      const rawDate = data.date || new Date().toISOString().split("T")[0];

      // Format date nicely if it's in YYYY-MM-DD format
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
        title: data.title || slug,
        excerpt: data.description || content.replace(/<[^>]+>/g, "").slice(0, 160),
        content,
        image: data.image || "/images/products/outdoor-fixed-led-display.jpg",
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
  const { data, content } = matter(fileContents);

  const category = data.category || "General Signage";
  const rawDate = data.date || new Date().toISOString().split("T")[0];

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
    title: data.title || slug,
    excerpt: data.description || content.replace(/<[^>]+>/g, "").slice(0, 160),
    content,
    image: data.image || "/images/products/outdoor-fixed-led-display.jpg",
    category,
    date: formattedDate,
    readTime: estimateReadTime(content),
    color: CATEGORY_COLORS[category] || "from-slate-800 to-slate-900",
  };
}
