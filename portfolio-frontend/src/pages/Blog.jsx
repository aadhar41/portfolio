import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getBlogs } from "../services/api";
import FrontendLoader from "../components/FrontendLoader";

const STATIC_TAGS = ["PHP", "Laravel", "Database", "APIs", "Tips & Tricks", "Tutorials"];

const Badge = ({ children, active, onClick }) => (
  <button
    onClick={onClick}
    className={`clay-button-secondary px-6 py-2.5 text-xs ${
      active ? "!bg-indigo-600 !text-white !border-transparent shadow-indigo-200" : ""
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
      <section className="relative bg-white pt-40 pb-24 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-indigo-50 rounded-full blur-[100px]" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-50 rounded-full blur-[120px]" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 px-5 py-2 rounded-2xl mb-8 shadow-sm">
            <i className="fas fa-pen-nib text-indigo-500" />
            <span className="text-indigo-600 text-[10px] font-black uppercase tracking-[0.2em]">Engineering Blog</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-slate-800 mb-8 tracking-tight">Insights & Tutorials</h1>
          <p className="text-slate-500 text-xl max-w-2xl font-medium leading-relaxed">
            Deep dives into PHP engineering, Laravel architecture, and modern web philosophies.
          </p>
        </div>
      </section>

      {/* ── Content ── */}
      <section className="py-24 relative overflow-hidden bg-slate-50 min-h-screen">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-100/30 rounded-full blur-[120px] translate-x-1/4 -translate-y-1/4" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Filter + Search */}
          <div className="clay-surface mb-16 p-4 flex flex-col md:flex-row items-center gap-6 md:gap-8 border-white/60 bg-white/40 backdrop-blur-md">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs font-black text-slate-400 uppercase tracking-widest mr-2">Topics:</span>
              <div className="flex flex-wrap gap-3">
                <Badge active={tag === ""} onClick={() => { setTag(""); setPage(1); }}>All Articles</Badge>
                {displayTags.map((t) => (
                  <Badge key={t} active={tag === t} onClick={() => { setTag(t); setPage(1); }}>{t}</Badge>
                ))}
              </div>
            </div>
            
            <div className="md:ml-auto w-full md:w-80 group">
              <div className="clay-surface bg-white/80 p-0 overflow-hidden flex items-center border-slate-100 focus-within:border-indigo-500/50 transition-all duration-300">
                <div className="pl-6 pr-4">
                  <i className="fas fa-search text-slate-400 text-sm group-focus-within:text-indigo-500 transition-colors" />
                </div>
                <input
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                  placeholder="Find an article..."
                  className="w-full bg-transparent py-4 text-sm text-slate-700 outline-none placeholder:text-slate-400 font-medium"
                />
              </div>
            </div>
          </div>

          {/* Grid */}
          {loading ? (
            <FrontendLoader />
          ) : blogs.length === 0 ? (
            <div className="clay-card py-32 text-center text-slate-400 bg-white/50 border-dashed border-2 border-slate-200">
              <div className="w-20 h-20 rounded-[28px] bg-slate-100 flex items-center justify-center text-slate-300 text-3xl mx-auto mb-6 shadow-inner">
                <i className="fas fa-pen-nib" />
              </div>
              <p className="text-2xl font-black text-slate-500">No articles found</p>
              <p className="text-slate-400 mt-2 font-medium">I'm currently writing more content. Check back soon!</p>
              <button 
                onClick={() => { setTag(""); setSearch(""); setPage(1); }}
                className="mt-10 clay-button-primary px-8"
              >
                Reset Search
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {blogs.map((blog) => (
                <article key={blog.id} className="clay-card overflow-hidden flex flex-col group hover:scale-[1.02] transition-all duration-500 bg-white">
                  {/* Cover */}
                  <div className="overflow-hidden h-56 relative">
                    {blog.cover_image
                      ? <img src={blog.cover_image} alt={blog.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      : <div className="w-full h-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white text-3xl font-black">{blog.tags?.[0] ?? "Blog"}</div>
                    }
                    <div className="absolute inset-0 bg-indigo-900/10 group-hover:bg-transparent transition-colors duration-500" />
                  </div>

                  {/* Body */}
                  <div className="p-8 flex flex-col flex-1">
                    <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6">
                      <span className="flex items-center gap-2">
                        <i className="fas fa-calendar-alt text-indigo-400" />
                        {formatDate(blog.published_at)}
                      </span>
                      {blog.tags?.[0] && (
                        <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-lg border border-indigo-100">
                          {blog.tags[0]}
                        </span>
                      )}
                    </div>
                    <h3 className="text-2xl font-black text-slate-800 leading-tight mb-4 group-hover:text-indigo-600 transition-colors line-clamp-2">
                      <Link to={`/blog/${blog.slug}`}>{blog.title}</Link>
                    </h3>
                    <p className="text-slate-500 text-base leading-relaxed flex-1 mb-8 line-clamp-3 font-medium">{blog.excerpt}</p>
                    <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                      <Link to={`/blog/${blog.slug}`}
                        className="clay-button-secondary px-6 py-2.5 text-xs">
                        Read Full Article <i className="fas fa-arrow-right text-[10px] ml-2" />
                      </Link>
                      {blog.read_time && (
                        <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
                          <i className="fas fa-clock text-indigo-300" /> {blog.read_time} min
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
            <div className="flex justify-center items-center gap-4 mt-20">
              <button 
                onClick={() => { setPage((p) => Math.max(1, p - 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
                disabled={page === 1}
                className="w-14 h-14 clay-button-secondary flex items-center justify-center disabled:opacity-30 disabled:hover:scale-100 transition-all"
              >
                <i className="fas fa-chevron-left text-sm" />
              </button>
              
              <div className="flex gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button 
                    key={p} 
                    onClick={() => { setPage(p); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className={`w-14 h-14 clay-card flex items-center justify-center text-sm font-black transition-all ${
                      page === p
                        ? "!bg-indigo-600 !text-white !border-transparent shadow-indigo-200 scale-110"
                        : "bg-white text-slate-600 border-slate-100 hover:border-indigo-300"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>

              <button 
                onClick={() => { setPage((p) => Math.min(totalPages, p + 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
                disabled={page === totalPages}
                className="w-14 h-14 clay-button-secondary flex items-center justify-center disabled:opacity-30 disabled:hover:scale-100 transition-all"
              >
                <i className="fas fa-chevron-right text-sm" />
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
