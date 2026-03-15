import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProjects } from "../services/api";
import FrontendLoader from "../components/FrontendLoader";

const CATEGORIES = ["all", "web", "mobile", "api"];

const Badge = ({ children }) => (
  <span className="inline-block px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-widest bg-indigo-50 text-indigo-700 border border-indigo-100 shadow-sm">{children}</span>
);

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const PER_PAGE = 9;

  useEffect(() => {
    setLoading(true);
    getProjects({ category, search, page, per_page: PER_PAGE })
      .then((res) => {
        const data = res.data.data || res.data;
        setProjects(Array.isArray(data) ? data : []);
        if (res.data.last_page) setTotalPages(res.data.last_page);
      })
      .finally(() => setLoading(false));
  }, [category, search, page]);

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative bg-white pt-40 pb-24 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-indigo-50 rounded-full blur-[100px]" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-50 rounded-full blur-[120px]" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 px-5 py-2 rounded-2xl mb-8 shadow-sm">
            <i className="fas fa-rocket text-indigo-500" />
            <span className="text-indigo-600 text-[10px] font-black uppercase tracking-[0.2em]">Portfolio Showcase</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-slate-800 mb-8 tracking-tight">My Projects</h1>
          <p className="text-slate-500 text-xl max-w-2xl mx-auto font-medium leading-relaxed">
            A collective showcase of websites, APIs, and full-stack applications built over a decade of professional development.
          </p>
        </div>
      </section>

      {/* ── Content ── */}
      <section className="py-24 relative overflow-hidden bg-slate-50 min-h-screen">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-100/30 rounded-full blur-[120px] translate-x-1/4 -translate-y-1/4" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Filters bar */}
          <div className="clay-surface mb-16 p-4 flex flex-col md:flex-row items-center gap-6 md:gap-8 border-white/60 bg-white/40 backdrop-blur-md">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs font-black text-slate-400 uppercase tracking-widest mr-2">Filter By:</span>
              <div className="flex flex-wrap gap-3">
                {CATEGORIES.map((c) => (
                  <button
                    key={c}
                    onClick={() => { setCategory(c); setPage(1); }}
                    className={`clay-button-secondary px-6 py-2.5 text-xs ${
                      category === c ? "!bg-indigo-600 !text-white !border-transparent shadow-indigo-200" : ""
                    }`}
                  >
                    {c}
                  </button>
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
                  placeholder="Find a specific project..."
                  className="w-full bg-transparent py-4 text-sm text-slate-700 outline-none placeholder:text-slate-400 font-medium"
                />
              </div>
            </div>
          </div>

          {/* Grid */}
          {loading ? (
            <FrontendLoader />
          ) : projects.length === 0 ? (
            <div className="clay-card py-32 text-center text-slate-400 bg-white/50 border-dashed border-2 border-slate-200">
              <div className="w-20 h-20 rounded-[28px] bg-slate-100 flex items-center justify-center text-slate-300 text-3xl mx-auto mb-6 shadow-inner">
                <i className="fas fa-search" />
              </div>
              <p className="text-2xl font-black text-slate-500">No projects found</p>
              <p className="text-slate-400 mt-2 font-medium">Try adjusting your filters or search query.</p>
              <button 
                onClick={() => { setCategory("all"); setSearch(""); setPage(1); }}
                className="mt-10 clay-button-primary px-8"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {projects.map((p) => (
                <div key={p.id} className="clay-card overflow-hidden flex flex-col group hover:scale-[1.03] transition-all duration-500 bg-white">
                  {/* Image / header */}
                  <div className="h-56 overflow-hidden relative">
                    {p.image ? (
                      <img
                        src={p.image}
                        alt={p.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        onError={(e) => {
                          const rn = p.github_url?.split("/").pop();
                          const og = `https://opengraph.githubassets.com/1/aadhar41/${rn}`;
                          if (e.target.src !== og) e.target.src = og;
                          else { e.target.style.display = "none"; e.target.parentElement.innerHTML = `<div class="w-full h-full flex items-center justify-center text-slate-300 bg-slate-50"><i class="fas fa-code fa-3x"></i></div>`; }
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white/20">
                        <i className="fas fa-code text-7xl" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-indigo-900/10 group-hover:bg-transparent transition-colors duration-500" />
                    
                    {p.featured && (
                      <div className="absolute top-4 right-4 flex items-center gap-2 bg-white/90 backdrop-blur-sm border border-white px-3 py-1.5 rounded-xl shadow-lg animate-bounce duration-[2s]">
                        <i className="fas fa-star text-amber-500 text-[10px]" />
                        <span className="text-slate-800 text-[10px] font-black uppercase tracking-widest">Featured</span>
                      </div>
                    )}
                  </div>

                  {/* Body */}
                  <div className="p-8 flex flex-col flex-1">
                    <div className="mb-6">
                      <span className="text-indigo-600 text-[10px] font-black uppercase tracking-[0.2em] block mb-2">{p.category}</span>
                      <h5 className="text-2xl font-black text-slate-800 leading-tight group-hover:text-indigo-600 transition-colors line-clamp-1">{p.title}</h5>
                    </div>
                    
                    <p className="text-slate-600 text-base leading-relaxed flex-1 mb-8 font-medium line-clamp-3">{p.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-8">
                      {p.technologies?.slice(0, 4).map((t) => <Badge key={t}>{t}</Badge>)}
                    </div>

                    <div className="flex gap-4 pt-6 border-t border-slate-50">
                      <Link to={`/projects/${p.id}`}
                        className="flex-1 clay-button-secondary py-3 text-xs">
                        View Details
                      </Link>
                      {p.live_url && (
                        <a href={p.live_url} target="_blank" rel="noreferrer"
                          className="flex-1 clay-button-primary py-3 text-xs">
                          Live Site <i className="fas fa-external-link-alt text-[10px] ml-1.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
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
