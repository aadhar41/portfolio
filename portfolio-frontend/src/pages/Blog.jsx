import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getBlogs } from "../services/api";
import FrontendLoader from "../components/FrontendLoader";

const STATIC_TAGS = ["PHP", "Laravel", "Database", "APIs", "Tips & Tricks", "Tutorials"];

const Badge = ({ children, active, onClick }) => (
  <button
    onClick={onClick}
    className={`px-4 py-1.5 rounded-full text-sm font-semibold capitalize transition-all duration-200 ${
      active
        ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-[0_4px_12px_rgba(99,102,241,0.35)]"
        : "bg-white text-slate-600 border border-slate-200 hover:border-indigo-300 hover:text-indigo-600"
    }`}
  >
    {children}
  </button>
);

function formatDate(str) {
  if (!str) return "";
  return new Date(str).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" });
}

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tag, setTag] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const PER_PAGE = 9;

  useEffect(() => {
    setLoading(true);
    getBlogs({ tag, search, page, per_page: PER_PAGE })
      .then((res) => {
        const data = res.data.data || res.data;
        setBlogs(Array.isArray(data) ? data : []);
        if (res.data.last_page) setTotalPages(res.data.last_page);
      })
      .finally(() => setLoading(false));
  }, [tag, search, page]);

  const allTags = [...new Set(blogs.flatMap((b) => b.tags ?? []))];
  const displayTags = allTags.length > 0 ? allTags : STATIC_TAGS;

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-violet-700 text-white pt-28 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_2px_2px,rgba(255,255,255,0.1)_1px,transparent_0)] bg-[length:28px_28px]" />
        <div className="absolute right-16 top-1/2 -translate-y-1/2 text-[7rem] text-white/10 font-black leading-none select-none hidden lg:block">
          <i className="fas fa-rss" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/80 text-sm px-4 py-1.5 rounded-full mb-5">
            <i className="fas fa-pen-nib" /> Blog
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 max-w-xl">Tech Blog</h1>
          <p className="text-white/70 text-lg max-w-lg leading-relaxed">
            Insights, tutorials, and thoughts on PHP development, Laravel, and modern web technologies.
          </p>
        </div>
      </section>

      {/* ── Content ── */}
      <section className="py-16 bg-slate-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Filter + Search */}
          <div className="flex flex-wrap items-center gap-3 mb-10">
            <Badge active={tag === ""} onClick={() => { setTag(""); setPage(1); }}>All</Badge>
            {displayTags.map((t) => (
              <Badge key={t} active={tag === t} onClick={() => { setTag(t); setPage(1); }}>{t}</Badge>
            ))}
            <div className="ml-auto flex items-center gap-2 bg-white border border-slate-200 rounded-full px-4 py-2 focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-500/20 transition-all">
              <i className="fas fa-search text-slate-400 text-sm" />
              <input
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                placeholder="Search posts..."
                className="outline-none text-sm text-slate-700 bg-transparent w-40"
              />
            </div>
          </div>

          {/* Grid */}
          {loading ? (
            <FrontendLoader />
          ) : blogs.length === 0 ? (
            <div className="text-center py-24 text-slate-400">
              <i className="fas fa-pen-nib text-4xl mb-4 block text-slate-200" />
              <p className="text-lg font-medium">No posts found.</p>
              <p className="text-sm mt-1">Try a different search or tag filter.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.map((blog) => (
                <article key={blog.id} className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-slate-100 overflow-hidden flex flex-col hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(99,102,241,0.12)] hover:border-indigo-100 transition-all duration-300 group">
                  {/* Cover */}
                  <div className="overflow-hidden h-44">
                    {blog.cover_image
                      ? <img src={blog.cover_image} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      : <div className="w-full h-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white text-2xl font-black">{blog.tags?.[0] ?? "Blog"}</div>
                    }
                  </div>

                  {/* Body */}
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                      <span className="flex items-center gap-1.5">
                        <i className="fas fa-calendar-alt" />
                        {formatDate(blog.published_at)}
                      </span>
                      {blog.tags?.[0] && (
                        <span className="bg-indigo-50 text-indigo-600 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                          {blog.tags[0]}
                        </span>
                      )}
                    </div>
                    <h3 className="font-bold text-slate-800 text-base leading-snug mb-2 group-hover:text-indigo-600 transition-colors">
                      <Link to={`/blog/${blog.slug}`}>{blog.title}</Link>
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed flex-1 mb-4 line-clamp-3">{blog.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <Link to={`/blog/${blog.slug}`}
                        className="inline-flex items-center gap-1.5 border border-indigo-600 text-indigo-600 text-sm font-semibold px-4 py-1.5 rounded-full hover:bg-indigo-600 hover:text-white transition-all duration-200">
                        Read More <i className="fas fa-arrow-right text-xs" />
                      </Link>
                      {blog.read_time && (
                        <span className="text-slate-400 text-xs flex items-center gap-1">
                          <i className="fas fa-clock" /> {blog.read_time} min
                        </span>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-12">
              <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}
                className="w-10 h-10 rounded-xl border border-slate-200 bg-white text-slate-600 hover:border-indigo-400 hover:text-indigo-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all">
                <i className="fas fa-chevron-left text-sm" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button key={p} onClick={() => setPage(p)}
                  className={`w-10 h-10 rounded-xl text-sm font-semibold transition-all ${
                    page === p
                      ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-[0_4px_12px_rgba(99,102,241,0.35)]"
                      : "border border-slate-200 bg-white text-slate-600 hover:border-indigo-400 hover:text-indigo-600"
                  }`}>
                  {p}
                </button>
              ))}
              <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                className="w-10 h-10 rounded-xl border border-slate-200 bg-white text-slate-600 hover:border-indigo-400 hover:text-indigo-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all">
                <i className="fas fa-chevron-right text-sm" />
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
