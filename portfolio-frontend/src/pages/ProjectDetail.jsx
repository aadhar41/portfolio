import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProject } from "../services/api";
import FrontendLoader from "../components/FrontendLoader";

const Badge = ({ children }) => (
  <span className="inline-block px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest bg-indigo-50 text-indigo-700 border border-indigo-100 shadow-sm">{children}</span>
);

export default function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProject(id)
      .then((res) => setProject(res.data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="pt-40"><FrontendLoader /></div>;

  if (!project) return (
    <div className="pt-40 pb-24 min-h-screen bg-white flex items-center justify-center">
      <div className="max-w-md w-full px-6">
        <div className="clay-card p-12 text-center bg-white/50">
          <div className="w-20 h-20 rounded-[28px] bg-red-50 flex items-center justify-center text-red-500 text-3xl mx-auto mb-8 shadow-inner">
            <i className="fas fa-exclamation-triangle" />
          </div>
          <h2 className="text-2xl font-black text-slate-800 mb-4">Project Not Found</h2>
          <p className="text-slate-500 font-medium mb-10 leading-relaxed">The project you're looking for might have been moved or deleted.</p>
          <Link to="/projects" className="clay-button-primary w-full py-3.5">
            <i className="fas fa-arrow-left mr-3" /> Explore All Projects
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* ── Page Hero ── */}
      <section className="relative bg-white pt-40 pb-24 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-indigo-50 rounded-full blur-[100px]" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-50 rounded-full blur-[120px]" />
        
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="flex flex-wrap items-center gap-4 mb-8 translate-y-[-10px] animate-[fadeInDown_0.6s_ease_both]">
            {project.featured && (
              <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-600 text-[10px] font-black uppercase tracking-[0.15em] px-4 py-1.5 rounded-xl shadow-sm">
                <i className="fas fa-star" /> Featured Project
              </div>
            )}
            <div className="bg-indigo-50 border border-indigo-100 text-indigo-600 text-[10px] font-black uppercase tracking-[0.15em] px-4 py-1.5 rounded-xl shadow-sm">
              <i className="fas fa-folder-open mr-2" /> {project.category}
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-slate-800 mb-8 tracking-tight animate-[fadeInLeft_0.8s_ease_both]">{project.title}</h1>
          <p className="text-slate-500 text-xl font-medium leading-relaxed max-w-3xl animate-[fadeInUp_1s_ease_both]">{project.description}</p>
        </div>
      </section>

      {/* ── Detail ── */}
      <section className="py-24 relative overflow-hidden bg-slate-50 min-h-[600px]">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-100/30 rounded-full blur-[120px] translate-x-1/4 -translate-y-1/4" />
        
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          {/* Back link */}
          <Link to="/projects"
            className="inline-flex items-center gap-3 text-slate-400 text-xs font-black uppercase tracking-[0.2em] hover:text-indigo-600 transition-all mb-12 group">
            <span className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-all">
              <i className="fas fa-arrow-left" />
            </span>
            Back to archive
          </Link>

          {/* Project image */}
          {project.image && (
            <div className="clay-card p-4 bg-white/40 backdrop-blur-md border-white mb-16 group">
              <div className="w-full h-auto overflow-hidden rounded-[24px] shadow-inner bg-slate-100 relative">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-[2s]"
                  onError={(e) => {
                    const rn = project.github_url?.split("/").pop();
                    const og = `https://opengraph.githubassets.com/1/aadhar41/${rn}`;
                    if (e.target.src !== og) e.target.src = og;
                    else e.target.style.display = "none";
                  }}
                />
                <div className="absolute inset-0 bg-indigo-900/5 pointer-events-none" />
              </div>
            </div>
          )}

          {/* Content grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Main description */}
            <div className="lg:col-span-8 space-y-10">
              {project.long_description ? (
                <div className="clay-card p-10 md:p-12 bg-white">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-500 shadow-inner">
                      <i className="fas fa-align-left text-lg" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-800 tracking-tight">Overview</h3>
                  </div>
                  <div className="text-slate-600 text-lg leading-relaxed space-y-4 font-medium blog-content"
                    dangerouslySetInnerHTML={{ __html: project.long_description }} />
                </div>
              ) : (
                <div className="clay-surface p-12 text-center text-slate-400 bg-white/50 flex flex-col items-center">
                  <i className="fas fa-info-circle text-4xl mb-4 text-indigo-100 shadow-inner rounded-full p-4" />
                  <p className="font-bold text-slate-500">More details coming soon for this project.</p>
                </div>
              )}

              {/* Technologies */}
              {project.technologies?.length > 0 && (
                <div className="clay-card p-10 md:p-12 bg-white">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-purple-50 flex items-center justify-center text-purple-500 shadow-inner">
                      <i className="fas fa-code text-lg" />
                    </div>
                    <h3 className="text-2xl font-black text-slate-800 tracking-tight">Tech Stack</h3>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {project.technologies.map((t) => <Badge key={t}>{t}</Badge>)}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4 space-y-8">
              {/* Metadata card */}
              <div className="clay-card p-8 md:p-10 bg-white">
                <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-8 border-b border-slate-50 pb-4">Project Info</h4>
                <div className="space-y-6">
                  {[
                    { icon: "fas fa-tag", label: "Category", value: project.category },
                    { icon: "fas fa-calendar", label: "Project Year", value: project.year },
                    { icon: "fas fa-user", label: "Client / Brand", value: project.client },
                  ].filter((r) => r.value).map((row) => (
                    <div key={row.label} className="group/item">
                      <div className="flex items-center gap-4 mb-1">
                        <i className={`${row.icon} text-indigo-300 text-[10px] group-hover/item:text-indigo-500 transition-colors`} />
                        <p className="text-[10px] text-slate-400 font-extrabold uppercase tracking-widest">{row.label}</p>
                      </div>
                      <p className="text-slate-800 text-lg font-black capitalize ml-6">{row.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="space-y-4">
                {project.live_url && (
                  <a href={project.live_url} target="_blank" rel="noreferrer"
                    className="clay-button-primary w-full py-4 text-base">
                    Explore Experience <i className="fas fa-external-link-alt ml-2 text-xs" />
                  </a>
                )}
                {project.github_url && (
                  <a href={project.github_url} target="_blank" rel="noreferrer"
                    className="clay-button-secondary w-full py-4 text-base !bg-slate-800 !text-white !border-transparent hover:!bg-indigo-600">
                    <i className="fab fa-github mr-2" /> Source Code
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
