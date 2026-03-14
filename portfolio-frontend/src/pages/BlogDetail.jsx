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

  if (loading) return <div className="pt-24"><FrontendLoader /></div>;

  if (!blog) return (
    <div className="pt-24 min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="text-center">
        <i className="fas fa-file-slash text-4xl text-slate-200 mb-4 block" />
        <p className="text-slate-600 font-medium mb-4">Blog post not found.</p>
        <Link to="/blog"
          className="inline-flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-indigo-700 transition-colors">
          <i className="fas fa-arrow-left" /> Back to Blog
        </Link>
      </div>
    </div>
  );

  const tagLabel = blog.tags?.[0] ?? "";

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-violet-700 text-white pt-28 pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_2px_2px,rgba(255,255,255,0.1)_1px,transparent_0)] bg-[length:28px_28px]" />
        <div className="absolute -bottom-1 left-0 right-0 h-16 bg-slate-50" style={{ clipPath: "ellipse(55% 100% at 50% 100%)" }} />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          {/* Tags */}
          {blog.tags?.length > 0 && (
            <div className="flex flex-wrap justify-center gap-2 mb-5">
              {blog.tags.map((t) => (
                <span key={t} className="bg-white/15 border border-white/20 text-white/90 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                  {t}
                </span>
              ))}
            </div>
          )}
          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-5">{blog.title}</h1>
          {/* Meta row */}
          <div className="flex items-center justify-center flex-wrap gap-5 text-white/70 text-sm">
            {blog.published_at && (
              <span className="flex items-center gap-1.5">
                <i className="fas fa-calendar-alt text-xs" />
                {formatDate(blog.published_at)}
              </span>
            )}
            {blog.read_time && (
              <span className="flex items-center gap-1.5">
                <i className="fas fa-clock text-xs" />
                {blog.read_time} min read
              </span>
            )}
            {blog.author && (
              <span className="flex items-center gap-1.5">
                <i className="fas fa-user text-xs" />
                {blog.author}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* ── Content ── */}
      <section className="bg-slate-50 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          {/* Back link */}
          <div className="flex items-center justify-between mb-8 pt-6">
            <Link to="/blog"
              className="inline-flex items-center gap-2 text-indigo-600 text-sm font-medium hover:text-indigo-800 transition-colors">
              <i className="fas fa-arrow-left text-xs" /> Back to Blog
            </Link>
            {/* Share hint */}
            <div className="flex items-center gap-2 text-slate-400 text-xs">
              <i className="fas fa-share-alt" />
              <span>Share</span>
              <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(blog.title)}`}
                target="_blank" rel="noreferrer"
                className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-sky-50 hover:text-sky-500 flex items-center justify-center transition-colors">
                <i className="fab fa-twitter text-xs" />
              </a>
              <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                target="_blank" rel="noreferrer"
                className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-indigo-50 hover:text-indigo-500 flex items-center justify-center transition-colors">
                <i className="fab fa-linkedin-in text-xs" />
              </a>
            </div>
          </div>

          {/* Main card */}
          <div className="bg-white rounded-2xl shadow-[0_4px_32px_rgba(0,0,0,0.08)] border border-slate-100 overflow-hidden">
            {/* Cover image */}
            {blog.cover_image ? (
              <div className="w-full h-72 md:h-96 overflow-hidden">
                <img src={blog.cover_image} alt={blog.title} className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className="w-full h-40 bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white text-3xl font-black">
                {tagLabel || blog.title.charAt(0)}
              </div>
            )}

            {/* Excerpt intro */}
            {blog.excerpt && (
              <div className="px-8 pt-7 pb-4 border-b border-slate-50">
                <p className="text-slate-600 text-base leading-relaxed italic border-l-4 border-indigo-500 pl-4">
                  {blog.excerpt}
                </p>
              </div>
            )}

            {/* Article body */}
            <div className="px-8 py-7">
              {blog.content && blog.content.includes("<") && blog.content.includes(">") ? (
                <div className="blog-content" dangerouslySetInnerHTML={{ __html: blog.content }} />
              ) : (
                <div className="blog-content">
                  {blog.content?.split("\n").map((line, i) => line.trim() ? (
                    <p key={i} className="text-slate-600 leading-relaxed mb-4">{line}</p>
                  ) : <br key={i} />)}
                </div>
              )}
            </div>

            {/* Footer: tags + back */}
            <div className="px-8 pb-8 border-t border-slate-100 pt-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                {blog.tags?.map((t) => (
                  <span key={t} className="bg-indigo-50 text-indigo-600 text-xs font-semibold px-3 py-1 rounded-full">{t}</span>
                ))}
              </div>
              <Link to="/blog"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:shadow-[0_4px_14px_rgba(99,102,241,0.4)] hover:-translate-y-0.5 transition-all duration-200">
                <i className="fas fa-arrow-left" /> Back to Blog
              </Link>
            </div>
          </div>

          {/* Author card (if available) */}
          {blog.author && (
            <div className="mt-6 bg-white rounded-2xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-slate-100 flex items-center gap-4">
              <div className="shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                {blog.author.charAt(0)}
              </div>
              <div>
                <p className="text-sm text-slate-400 font-medium">Written by</p>
                <p className="font-bold text-slate-800">{blog.author}</p>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
