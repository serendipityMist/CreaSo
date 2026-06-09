import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

const POSTS = [
  {
    slug: "better-creative-briefs",
    title: "Write Better Creative Briefs",
    category: "Process",
    date: "2026-02-10",
    readMinutes: 6,
    excerpt: "A simple framework to align faster and reduce revision loops when working with designers or agencies.",
  },
  {
    slug: "landing-page-checklist",
    title: "Landing Page Checklist",
    category: "Conversion",
    date: "2026-01-28",
    readMinutes: 8,
    excerpt: "From hierarchy to forms and performance, this checklist helps you ship pages that feel premium and convert.",
  },
  {
    slug: "ads-that-do-not-look-like-ads",
    title: "Ads That Do Not Look Like Ads",
    category: "Creative",
    date: "2026-01-05",
    readMinutes: 5,
    excerpt: "A few patterns that consistently improve CTR while keeping the brand voice intact.",
  },
  {
    slug: "consistent-brand-system",
    title: "How to Build a Consistent Brand System",
    category: "Brand",
    date: "2025-12-11",
    readMinutes: 7,
    excerpt: "A compact system that keeps your visuals coherent across posts, ads, and landing pages.",
  },
];

export default function Blog() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const categories = useMemo(() => {
    const set = new Set(["All"]);
    for (const post of POSTS) set.add(post.category);
    return Array.from(set);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return POSTS.filter((post) => {
      const matchesCategory = category === "All" || post.category === category;
      const matchesQuery =
        q.length === 0 ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.category.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    }).sort((a, b) => (a.date < b.date ? 1 : -1));
  }, [category, query]);

  return (
    <main className="pt-16 bg-white">
      <section className="px-4 py-14">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs tracking-widest uppercase text-gray-500">Blog</p>
          <h1 className="mt-3 text-3xl md:text-4xl font-black text-gray-900">Notes on process, brand, and conversion</h1>
          <p className="mt-3 text-sm text-gray-600 max-w-2xl">
            Short, practical posts. If you want help implementing any of this, we can plan a package for you.
          </p>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-gray-700 mb-2" htmlFor="blog-search">
                Search
              </label>
              <input
                id="blog-search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-black/10"
                placeholder="Try: landing page, brand, process..."
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-2" htmlFor="blog-category">
                Category
              </label>
              <select
                id="blog-category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm bg-white outline-none focus:ring-2 focus:ring-black/10"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map((post) => (
              <article key={post.slug} className="rounded-2xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-semibold text-gray-600">{post.category}</span>
                  <span className="text-xs text-gray-500">{post.readMinutes} min read</span>
                </div>
                <h2 className="mt-3 text-xl font-bold text-gray-900">{post.title}</h2>
                <p className="mt-2 text-sm text-gray-600">{post.excerpt}</p>
                <div className="mt-4 flex items-center justify-between gap-3">
                  <time className="text-xs text-gray-500" dateTime={post.date}>
                    {post.date}
                  </time>
                  <Link to="/contact" className="text-sm font-semibold text-gray-900 hover:underline">
                    Discuss a project
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="mt-10 rounded-2xl border border-gray-200 p-8 text-center">
              <p className="text-sm text-gray-600">No posts match that filter.</p>
              <button type="button" className="mt-4 text-sm font-semibold text-gray-900 underline" onClick={() => (setQuery(""), setCategory("All"))}>
                Reset filters
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

