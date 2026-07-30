"use client";

import React, { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  Sparkles,
  RefreshCw,
  CheckCircle,
  Eye,
  Send,
  FileText,
  AlertCircle,
  Globe,
  Lock,
  PlusCircle,
  Edit3,
  Trash2,
  Image as ImageIcon,
  Video,
  Upload,
} from "lucide-react";

interface DraftArticle {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  content: string;
  published: boolean;
  fromRegistry?: boolean; // true = lives in blogRegistry.ts, not a .md file
}

const INITIAL_DRAFTS: DraftArticle[] = [
  {
    id: "draft-1",
    category: "LED Signs",
    title: "5 High-Converting Sign Designs for Fort Lauderdale Businesses in 2026",
    description:
      "Learn how modern LED channel letters and acrylic logo signs dramatically increase walk-in customers across Broward County.",
    image: "/images/products/outdoor-fixed-led-display.jpg",
    published: false,
    content: `<h2>Why Signage is Your Store's #1 Salesperson in Fort Lauderdale</h2>
<p>First impressions matter more than ever in busy retail areas like Fort Lauderdale, Hollywood, and Pompano Beach. Custom 3D acrylic signs and illuminated LED channel letters create an immediate feeling of trust and quality.</p>

<h3>1. High-Contrast Illumination</h3>
<p>Bright LED lighting ensures your business is visible 24/7, even during dark South Florida evenings and rainy seasons.</p>

<h3>2. Durable Weatherproofing</h3>
<p>Using premium aluminum casing and UV-resistant acrylics ensures your sign remains vibrant against Florida rain, humidity, and summer heat.</p>

<p>For custom signage quotes, visit <strong>Nano Signs</strong> at <strong>3341 NW 9th Ave, Fort Lauderdale, FL 33309</strong>.</p>`,
  },
  {
    id: "draft-2",
    category: "Neon Signs",
    title: "Why Neon LED Signs Are the #1 Restaurant Marketing Tool in 2026",
    description:
      "Social media has changed everything. Discover why custom neon signs are the highest ROI piece of decor a restaurant can invest in.",
    image: "/images/products/neon/nano-signs-cocktails-neon-usa.webp",
    published: false,
    content: `<h2>The Instagram Effect</h2>
<p>In 2026, the success of a new cafe or restaurant is not just about the menu -- it is about the aesthetic. A cleverly lit custom Neon LED sign provides the perfect Instagrammable moment.</p>

<h3>Why LED Neon vs. Traditional Glass Neon?</h3>
<ul>
  <li><strong>Durability:</strong> LED flex neon is shatterproof, unlike fragile glass tubes.</li>
  <li><strong>Energy Efficiency:</strong> LED neon consumes up to 80% less power.</li>
  <li><strong>Safety:</strong> LED neon runs cool to the touch and contains no toxic gases.</li>
</ul>

<p>Explore our neon sign options at <strong>Nano Signs</strong> in Fort Lauderdale, FL.</p>`,
  },
];

export default function AdminBlogStudio() {
  const [username, setUsername] = useState("");
  const [passcode, setPasscode] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [drafts, setDrafts] = useState<DraftArticle[]>(INITIAL_DRAFTS);
  const [generating, setGenerating] = useState(false);
  const [previewId, setPreviewId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [customTitle, setCustomTitle] = useState("");
  const [customDescription, setCustomDescription] = useState("");
  const [customCategory, setCustomCategory] = useState("Custom Article");
  const [customImage, setCustomImage] = useState("/images/products/outdoor-fixed-led-display.jpg");
  const [customContent, setCustomContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [loadingPosts, setLoadingPosts] = useState(false);

  const loadExistingPosts = async () => {
    setLoadingPosts(true);
    try {
      const res = await fetch("/api/blog/posts");
      const data = await res.json();
      if (res.ok && data.posts && data.posts.length > 0) {
        setDrafts(data.posts);
      }
    } catch (err) {
      console.error("Failed to load existing blog posts:", err);
    } finally {
      setLoadingPosts(false);
    }
  };

  React.useEffect(() => {
    if (authenticated) {
      loadExistingPosts();
    }
  }, [authenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      (username.trim().toLowerCase() === "nano" || username.trim().toLowerCase() === "admin") &&
      (passcode === "NanoSigns@2026" || passcode === "nano2026")
    ) {
      setAuthenticated(true);
    } else {
      alert("Invalid Username or Password.");
    }
  };

  const handleGenerateNewNews = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      alert("Fetched 2 new trending sign industry topics!");
    }, 1000);
  };

  const openEditModal = (article: DraftArticle) => {
    setEditingId(article.id);
    setCustomTitle(article.title);
    setCustomCategory(article.category);
    setCustomDescription(article.description);
    setCustomImage(article.image || "/images/products/outdoor-fixed-led-display.jpg");
    setCustomContent(article.content);
    setShowForm(true);
  };

  const openNewForm = () => {
    setEditingId(null);
    setCustomTitle("");
    setCustomCategory("Custom Article");
    setCustomDescription("");
    setCustomImage("/images/products/outdoor-fixed-led-display.jpg");
    setCustomContent("");
    setShowForm(!showForm);
  };

  const publishArticleData = async (article: {
    title: string;
    description: string;
    content: string;
    image: string;
    originalSlug?: string;
  }) => {
    const res = await fetch("/api/blog/publish", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(article),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed to save article.");
    return data;
  };

  const handlePublishPost = async (draftId: string) => {
    const target = drafts.find((d) => d.id === draftId);
    if (!target) return;
    try {
      const data = await publishArticleData({
        title: target.title,
        description: target.description,
        content: target.content,
        image: target.image,
      });
      setDrafts((prev) => prev.map((d) => (d.id === draftId ? { ...d, published: true } : d)));
      alert(`Article published! It is live at /blog/${data.slug}`);
    } catch (e: unknown) {
      alert(`Error publishing post: ${e instanceof Error ? e.message : String(e)}`);
    }
  };

  const handleDeletePost = async (draft: DraftArticle) => {
    if (draft.fromRegistry) {
      // Registry posts have no .md file — just remove from the studio UI
      if (!confirm(`Remove "${draft.title}" from this studio view?\n\nNote: This article lives in the static blogRegistry.ts file and will still appear on the blog until you edit & republish it to override the static version.`)) return;
      setDrafts((prev) => prev.filter((d) => d.id !== draft.id));
      return;
    }

    const slug = draft.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
    if (!confirm(`Are you sure you want to delete "${draft.title}"?`)) return;
    try {
      const res = await fetch(`/api/blog/delete?slug=${slug}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete");
      setDrafts((prev) => prev.filter((d) => d.id !== draft.id));
      alert(`Successfully deleted "${draft.title}"`);
    } catch (err: unknown) {
      alert(`Error deleting post: ${err instanceof Error ? err.message : String(err)}`);
    }
  };

  const handleSaveAndPublish = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTitle.trim() || !customContent.trim()) {
      alert("Please fill in both Title and Content.");
      return;
    }
    setSubmitting(true);
    try {
      const existingArticle = drafts.find((d) => d.id === editingId);
      const originalSlug = existingArticle
        ? existingArticle.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "")
        : undefined;
      const data = await publishArticleData({
        title: customTitle,
        description: customDescription,
        content: customContent,
        image: customImage,
        originalSlug,
      });
      if (editingId) {
        setDrafts((prev) =>
          prev.map((d) =>
            d.id === editingId
              ? { ...d, title: customTitle, category: customCategory, description: customDescription, image: customImage, content: customContent, published: true }
              : d
          )
        );
        alert(`Article updated successfully at /blog/${data.slug}`);
      } else {
        const newArticle: DraftArticle = {
          id: `article-${Date.now()}`,
          title: customTitle,
          category: customCategory,
          description: customDescription,
          image: customImage,
          content: customContent,
          published: true,
        };
        setDrafts((prev) => [newArticle, ...prev]);
        alert(`Published successfully! Article is live at /blog/${data.slug}`);
      }
      setShowForm(false);
      setEditingId(null);
    } catch (err: unknown) {
      alert(`Failed to save article: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setSubmitting(false);
    }
  };

  if (!authenticated) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-4">
          <div className="bg-slate-950 border border-slate-800 rounded-3xl p-8 max-w-md w-full shadow-2xl">
            <div className="w-12 h-12 rounded-2xl bg-[#ff2d78]/10 border border-[#ff2d78]/30 text-[#ff2d78] flex items-center justify-center mx-auto mb-4">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold font-poppins text-center mb-2">Admin Blog Studio Login</h1>
            <p className="text-xs text-slate-400 text-center mb-6">Authorized access only. Enter credentials to manage blog content.</p>
            <form onSubmit={handleLogin} className="space-y-4 font-poppins">
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1">Username</label>
                <input type="text" required value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter Username" className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-sm focus:outline-none focus:border-[#ff2d78]" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 mb-1">Password</label>
                <input type="password" required value={passcode} onChange={(e) => setPasscode(e.target.value)} placeholder="..." className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-sm focus:outline-none focus:border-[#ff2d78]" />
              </div>
              <button type="submit" className="w-full py-3.5 bg-[#ff2d78] text-white font-bold rounded-xl text-sm hover:opacity-90 transition-opacity mt-2">Log In to Admin Studio</button>
            </form>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const selectedPreview = drafts.find((d) => d.id === previewId);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 md:px-8 font-poppins">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 bg-slate-900 border border-slate-800 p-6 rounded-3xl">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff2d78]/10 border border-[#ff2d78]/30 text-[#ff2d78] text-xs font-semibold uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                Blog Content Manager
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white">Admin Blog Studio</h1>
              <p className="text-xs text-slate-400 mt-1">
                Write, edit, and publish articles directly to your blog.{" "}
                {loadingPosts && <span className="text-[#ff2d78] animate-pulse">Loading posts...</span>}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button onClick={openNewForm} className="px-4 py-3 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-sm transition-colors flex items-center gap-2 border border-slate-700">
                <PlusCircle className="w-4 h-4 text-[#ff2d78]" />
                {showForm && !editingId ? "Close Form" : "Write Custom Article"}
              </button>
              <button onClick={handleGenerateNewNews} disabled={generating} className="px-5 py-3 bg-[#ff2d78] text-white font-bold rounded-xl text-sm hover:opacity-90 transition-opacity flex items-center gap-2 shadow-lg disabled:opacity-50">
                <RefreshCw className={`w-4 h-4 ${generating ? "animate-spin" : ""}`} />
                {generating ? "Scanning News..." : "Fetch Daily News"}
              </button>
            </div>
          </div>

          {showForm && (
            <div className="mb-8 bg-slate-900 border border-[#ff2d78]/40 rounded-3xl p-6 md:p-8 shadow-xl">
              <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-[#ff2d78]" />
                {editingId ? "Edit Article & Update on Blog" : "Write & Publish New Article"}
              </h2>
              <p className="text-xs text-slate-400 mb-6">
                {editingId ? "Make your changes below and click Update to republish." : "Fill in the details below. Once published, your article will immediately appear at the top of the blog."}
              </p>
              <form onSubmit={handleSaveAndPublish} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Article Title *</label>
                    <input type="text" required value={customTitle} onChange={(e) => setCustomTitle(e.target.value)} placeholder="e.g. Best Neon Signs for Fort Lauderdale Restaurants in 2026" className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-[#ff2d78]" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Category Name</label>
                    <input type="text" value={customCategory} onChange={(e) => setCustomCategory(e.target.value)} placeholder="e.g. Neon Signs / LED Signs / Vehicle Signs" className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-[#ff2d78]" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Short Summary / Meta Description</label>
                  <input type="text" value={customDescription} onChange={(e) => setCustomDescription(e.target.value)} placeholder="Brief overview for search engines (appears in Google results)..." className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-[#ff2d78]" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-bold text-slate-300">Cover Image / Banner URL</label>
                    <label className="text-[11px] text-[#ff2d78] font-bold cursor-pointer hover:underline flex items-center gap-1">
                      <Upload className="w-3.5 h-3.5" />
                      Upload Cover Image
                      <input type="file" accept="image/*" className="hidden" onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        const formData = new FormData();
                        formData.append("file", file);
                        try {
                          const res = await fetch("/api/blog/upload", { method: "POST", body: formData });
                          const data = await res.json();
                          if (data.url) { setCustomImage(data.url); alert("Cover image uploaded successfully!"); }
                        } catch (err: unknown) { alert("Upload failed: " + (err instanceof Error ? err.message : String(err))); }
                      }} />
                    </label>
                  </div>
                  <input type="text" value={customImage} onChange={(e) => setCustomImage(e.target.value)} placeholder="/images/products/outdoor-fixed-led-display.jpg" className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-[#ff2d78]" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-bold text-slate-300">Article Content (HTML: h2, p, ul) *</label>
                    <div className="flex items-center gap-3">
                      <label className="text-[11px] text-cyan-400 font-bold cursor-pointer hover:underline flex items-center gap-1">
                        <ImageIcon className="w-3.5 h-3.5" />
                        + Insert Picture
                        <input type="file" accept="image/*" className="hidden" onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          const formData = new FormData();
                          formData.append("file", file);
                          try {
                            const res = await fetch("/api/blog/upload", { method: "POST", body: formData });
                            const data = await res.json();
                            if (data.url) {
                              setCustomContent((prev) => prev + `\n<img src="${data.url}" alt="${file.name}" class="rounded-xl my-4 w-full object-cover max-h-96" />\n`);
                              alert("Picture added into article!");
                            }
                          } catch (err: unknown) { alert("Upload failed: " + (err instanceof Error ? err.message : String(err))); }
                        }} />
                      </label>
                      <label className="text-[11px] text-purple-400 font-bold cursor-pointer hover:underline flex items-center gap-1">
                        <Video className="w-3.5 h-3.5" />
                        + Insert Video
                        <input type="file" accept="video/*" className="hidden" onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          const formData = new FormData();
                          formData.append("file", file);
                          try {
                            const res = await fetch("/api/blog/upload", { method: "POST", body: formData });
                            const data = await res.json();
                            if (data.url) {
                              setCustomContent((prev) => prev + `\n<video controls class="rounded-xl my-4 w-full max-h-96" src="${data.url}"></video>\n`);
                              alert("Video added into article!");
                            }
                          } catch (err: unknown) { alert("Upload failed: " + (err instanceof Error ? err.message : String(err))); }
                        }} />
                      </label>
                    </div>
                  </div>
                  <textarea required rows={8} value={customContent} onChange={(e) => setCustomContent(e.target.value)} placeholder="<h2>Article Headline</h2><p>Article body content...</p>" className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-[#ff2d78] font-mono resize-none" />
                </div>
                <div className="flex items-center gap-3 pt-2">
                  <button type="submit" disabled={submitting} className="px-6 py-3 bg-[#ff2d78] text-white font-bold rounded-xl text-sm hover:opacity-90 transition-opacity flex items-center gap-2 shadow">
                    <Send className="w-4 h-4" />
                    {submitting ? "Saving..." : editingId ? "Update & Publish Changes" : "Publish Article Now"}
                  </button>
                  <button type="button" onClick={() => { setShowForm(false); setEditingId(null); }} className="px-4 py-3 bg-slate-800 text-slate-300 rounded-xl text-sm font-semibold hover:bg-slate-700 transition-colors">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 space-y-4">
              <h2 className="text-lg font-bold text-slate-200 flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#ff2d78]" /> Manage &amp; Edit Articles
              </h2>
              {drafts.length === 0 && (
                <div className="py-12 text-center text-slate-500 bg-slate-900 border border-slate-800 rounded-2xl">
                  <FileText className="w-8 h-8 mx-auto text-slate-600 mb-2" />
                  <p className="text-sm">No articles yet. Write your first article above!</p>
                </div>
              )}
              {drafts.map((draft) => (
                <div key={draft.id} className={`p-5 rounded-2xl border transition-all ${
                  draft.fromRegistry
                    ? "bg-slate-900/60 border-slate-700"
                    : draft.published
                    ? "bg-emerald-950/20 border-emerald-800/40"
                    : "bg-slate-900 border-slate-800 hover:border-slate-700"
                }`}>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[11px] font-bold text-[#ff2d78] bg-[#ff2d78]/10 px-2.5 py-0.5 rounded-md">{draft.category}</span>
                    <div className="flex items-center gap-2">
                      {draft.fromRegistry && (
                        <span className="text-[10px] font-bold text-slate-400 bg-slate-700 px-2 py-0.5 rounded-md">
                          Static Entry
                        </span>
                      )}
                      {draft.published && !draft.fromRegistry ? (
                        <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5" /> Published</span>
                      ) : !draft.fromRegistry ? (
                        <span className="text-[11px] font-bold text-amber-400">Ready to Review</span>
                      ) : (
                        <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5" /> Live</span>
                      )}
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-white mb-2 leading-snug">{draft.title}</h3>
                  <p className="text-xs text-slate-400 mb-4 line-clamp-2 leading-relaxed">{draft.description}</p>
                  {draft.fromRegistry && (
                    <p className="text-[10px] text-slate-500 mb-3 italic">
                      Edit &amp; publish to create an editable override of this static article.
                    </p>
                  )}
                  <div className="flex items-center gap-3 pt-2 border-t border-slate-800/60 flex-wrap">
                    <button onClick={() => setPreviewId(draft.id)} className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-semibold rounded-lg text-slate-200 flex items-center gap-1.5 transition-colors">
                      <Eye className="w-3.5 h-3.5" /> Preview
                    </button>
                    <button onClick={() => openEditModal(draft)} className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-semibold rounded-lg text-[#ff2d78] flex items-center gap-1.5 transition-colors">
                      <Edit3 className="w-3.5 h-3.5" /> {draft.fromRegistry ? "Edit & Override" : "Edit Article"}
                    </button>
                    <button onClick={() => handleDeletePost(draft)} className="px-3.5 py-1.5 bg-rose-950/60 border border-rose-800/40 hover:bg-rose-900/60 text-xs font-semibold rounded-lg text-rose-400 flex items-center gap-1.5 transition-colors">
                      <Trash2 className="w-3.5 h-3.5" /> {draft.fromRegistry ? "Remove" : "Delete"}
                    </button>
                    {!draft.published && !draft.fromRegistry && (
                      <button onClick={() => handlePublishPost(draft.id)} className="px-4 py-1.5 bg-[#ff2d78] hover:opacity-90 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 transition-colors ml-auto shadow">
                        <Send className="w-3.5 h-3.5" /> Publish Now
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl p-6 h-fit sticky top-6">
              <h2 className="text-base font-bold text-slate-200 mb-4 flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#ff2d78]" /> Article Preview
              </h2>
              {selectedPreview ? (
                <div className="space-y-4 text-slate-300 text-xs">
                  <div className="border-b border-slate-800 pb-3">
                    <span className="text-[10px] uppercase tracking-wider text-[#ff2d78] font-bold">{selectedPreview.category}</span>
                    <h3 className="text-lg font-bold text-white mt-1 leading-snug">{selectedPreview.title}</h3>
                    {selectedPreview.description && <p className="text-xs text-slate-400 mt-1">{selectedPreview.description}</p>}
                  </div>
                  <div className="prose prose-invert prose-xs max-w-none text-slate-300 leading-relaxed" dangerouslySetInnerHTML={{ __html: selectedPreview.content }} />
                  <div className="flex items-center gap-2 pt-2">
                    <button onClick={() => openEditModal(selectedPreview)} className="w-full py-2.5 bg-slate-800 text-[#ff2d78] font-bold rounded-xl text-xs flex items-center justify-center gap-1.5">
                      <Edit3 className="w-4 h-4" /> Edit This Article
                    </button>
                    {!selectedPreview.published && (
                      <button onClick={() => handlePublishPost(selectedPreview.id)} className="w-full py-2.5 bg-[#ff2d78] text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow">
                        <Send className="w-4 h-4" /> Publish Now
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="py-12 text-center text-slate-500 space-y-2">
                  <AlertCircle className="w-8 h-8 mx-auto text-slate-600" />
                  <p className="text-xs">Click "Preview" on any article to inspect its content.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
