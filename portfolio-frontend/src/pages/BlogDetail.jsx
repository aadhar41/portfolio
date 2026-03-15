import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getBlog } from "../services/api";
import FrontendLoader from "../components/FrontendLoader";

function formatDate(str) {
  if (!str) return "";
  return new Date(str).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

export default function BlogDetail() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBlog(slug)
      .then((res) => setBlog(res.data))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="pt-40"><FrontendLoader /></div>;

  if (!blog) return (
    <div className="pt-40 pb-24 min-h-screen bg-white flex items-center justify-center">
      <div className="max-w-md w-full px-6">
        <div className="clay-card p-12 text-center bg-white/50">
          <div className="w-20 h-20 rounded-[28px] bg-red-50 flex items-center justify-center text-red-500 text-3xl mx-auto mb-8 shadow-inner">
            <i className="fas fa-file-slash" />
          </div>
          <h2 className="text-2xl font-black text-slate-800 mb-4">Post Not Found</h2>
          <p className="text-slate-500 font-medium mb-10 leading-relaxed">The article you're looking for might have been unpublished or removed.</p>
          <Link to="/blog" className="clay-button-primary w-full py-3.5">
            <i className="fas fa-arrow-left mr-3" /> Browse Library
          </Link>
        </div>
      </div>
    </div>
  );

  const tagLabel = blog.tags?.[0] ?? "";

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative bg-white pt-40 pb-24 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-indigo-50 rounded-full blur-[100px]" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-50 rounded-full blur-[120px]" />
        
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          {/* Tags */}
          {blog.tags?.length > 0 && (
            <div className="flex flex-wrap justify-center gap-3 mb-8 translate-y-[-10px] animate-[fadeInDown_0.6s_ease_both]">
              {blog.tags.map((t) => (
                <span key={t} className="bg-indigo-50 border border-indigo-100 text-indigo-600 text-[10px] font-black uppercase tracking-[0.2em] px-5 py-2 rounded-xl shadow-sm">
                  {t}
                </span>
              ))}
            </div>
          )}
          <h1 className="text-4xl md:text-6xl font-black text-slate-800 leading-tight mb-8 tracking-tight animate-[fadeInLeft_0.8s_ease_both]">{blog.title}</h1>
          
          {/* Meta row */}
          <div className="flex items-center justify-center flex-wrap gap-8 text-slate-400 text-[10px] font-black uppercase tracking-widest animate-[fadeInUp_1s_ease_both]">
            {blog.published_at && (
              <span className="flex items-center gap-3">
                <i className="fas fa-calendar-alt text-indigo-400" />
                {formatDate(blog.published_at)}
              </span>
            )}
            {blog.read_time && (
              <span className="flex items-center gap-3">
                <i className="fas fa-clock text-indigo-400" />
                {blog.read_time} min read
              </span>
            )}
            {blog.author && (
              <span className="flex items-center gap-3">
                <i className="fas fa-user text-indigo-400" />
                By {blog.author}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* ── Content ── */}
      <section className="bg-slate-50 pb-24 relative overflow-hidden min-h-screen">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-100/30 rounded-full blur-[120px] translate-x-1/4 -translate-y-1/4" />
        
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          {/* Back link + Tools */}
          <div className="flex flex-wrap items-center justify-between gap-6 mb-12 group pt-12">
            <Link to="/blog"
              className="inline-flex items-center gap-3 text-slate-400 text-xs font-black uppercase tracking-[0.2em] hover:text-indigo-600 transition-all group">
              <span className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-all">
                <i className="fas fa-arrow-left" />
              </span>
              Back to library
            </Link>
            
            <div className="flex items-center gap-4">
              <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest mr-2">Share post:</span>
              <div className="flex items-center gap-3">
                {[
                  { icon: "fab fa-twitter", href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(blog.title)}`, color: "hover:text-sky-500 hover:bg-sky-50" },
                  { icon: "fab fa-linkedin-in", href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, color: "hover:text-indigo-500 hover:bg-indigo-50" },
                ].map((s) => (
                  <a key={s.href} href={s.href} target="_blank" rel="noreferrer"
                    className={`w-10 h-10 rounded-xl bg-white text-slate-400 flex items-center justify-center shadow-sm transition-all duration-300 ${s.color}`}>
                    <i className={s.icon} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Main article container */}
          <div className="clay-card p-4 bg-white/40 backdrop-blur-md border-white mb-12">
            <div className="bg-white rounded-[32px] overflow-hidden shadow-inner border border-slate-50">
              {/* Cover image */}
              {blog.cover_image ? (
                <div className="w-full h-[400px] md:h-[500px] overflow-hidden relative">
                  <img src={blog.cover_image} alt={blog.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-indigo-900/5 pointer-events-none" />
                </div>
              ) : (
                <div className="w-full h-48 bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center text-white/20">
                  <i className="fas fa-newspaper text-7xl" />
                </div>
              )}

              <div className="p-8 md:p-16">
                {/* Excerpt intro */}
                {blog.excerpt && (
                  <div className="mb-12">
                    <div className="clay-surface bg-indigo-50/50 p-10 border-indigo-100 text-indigo-900 text-xl font-bold leading-relaxed tracking-tight relative overflow-hidden rounded-[28px]">
                      <div className="absolute top-0 left-0 w-2 h-full bg-indigo-400" />
                      <i className="fas fa-quote-left text-indigo-100 text-6xl absolute top-6 right-8 pointer-events-none" />
                      <p className="relative z-10">{blog.excerpt}</p>
                    </div>
                  </div>
                )}

                {/* Article body */}
                <div className="post-content">
                  {blog.content && blog.content.includes("<") && blog.content.includes(">") ? (
                    <div className="blog-content text-slate-600 text-lg leading-[1.8] space-y-8 font-medium" 
                      dangerouslySetInnerHTML={{ __html: blog.content }} />
                  ) : (
                    <div className="blog-content text-slate-600 text-lg leading-[1.8] space-y-8 font-medium">
                      {blog.content?.split("\n").map((line, i) => line.trim() ? (
                        <p key={i}>{line}</p>
                      ) : <div key={i} className="h-4" />)}
                    </div>
                  )}
                </div>

                {/* Post Footer */}
                <div className="mt-16 pt-12 border-t border-slate-50 flex flex-col sm:flex-row items-center justify-between gap-8">
                  <div className="flex flex-wrap gap-3">
                    {blog.tags?.map((t) => (
                      <span key={t} className="bg-slate-50 text-slate-500 text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl border border-slate-100">#{t}</span>
                    ))}
                  </div>
                  <Link to="/blog"
                    className="clay-button-primary px-8 py-3.5 text-sm">
                    <i className="fas fa-book-open mr-2" /> Read More Articles
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Author card */}
          {blog.author && (
            <div className="clay-card p-8 md:p-10 bg-white flex flex-col sm:flex-row items-center gap-8 group">
              <div className="shrink-0 w-24 h-24 rounded-[32px] bg-gradient-to-br from-indigo-500 to-purple-600 p-1 shadow-lg transform group-hover:rotate-6 transition-transform duration-500">
                <div className="w-full h-full rounded-[28px] bg-white flex items-center justify-center text-indigo-600 font-black text-4xl shadow-inner">
                  {blog.author.charAt(0)}
                </div>
              </div>
              <div className="text-center sm:text-left">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Article Author</p>
                <h4 className="text-2xl font-black text-slate-800 tracking-tight mb-2">{blog.author}</h4>
                <p className="text-slate-500 font-medium">Senior Software Engineer & Tech Visionary sharing experiences from over 10 years in the industry.</p>
              </div>
            </div>
          )}

          {/* Newsletter / CTA */}
          <div className="mt-20 clay-surface bg-gradient-to-br from-indigo-600 to-purple-700 p-12 md:p-16 text-center text-white border-none overflow-hidden relative group">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:scale-150 transition-transform duration-1000" />
            <div className="relative z-10">
              <h3 className="text-3xl font-black mb-4 tracking-tight">Stay ahead of the curve</h3>
              <p className="text-white/70 text-lg mb-10 max-w-xl mx-auto font-medium">Get the latest technical insights and development strategies delivered straight to your inbox.</p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input type="email" placeholder="Enter your email" className="flex-1 bg-white/10 border border-white/20 rounded-2xl px-6 py-4 text-white placeholder:text-white/40 outline-none focus:bg-white/20 transition-all font-bold" />
                <button className="clay-button-primary !bg-white !text-indigo-600 px-8">Subscribe</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
