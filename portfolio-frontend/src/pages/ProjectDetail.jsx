import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProject } from "../services/api";
import FrontendLoader from "../components/FrontendLoader";

const Badge = ({ children }) => (
  <span className="inline-block px-3 py-1 rounded-full text-sm font-semibold bg-indigo-50 text-indigo-600">{children}</span>
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

  if (loading) return <div className="pt-24"><FrontendLoader /></div>;

  if (!project) return (
    <div className="pt-24 min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="text-center">
        <i className="fas fa-exclamation-circle text-4xl text-slate-300 mb-4 block" />
        <p className="text-slate-600 font-medium mb-4">Project not found.</p>
        <Link to="/projects" className="inline-flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-indigo-700 transition-colors">
          <i className="fas fa-arrow-left" /> Back to Projects
        </Link>
      </div>
    </div>
  );

  return (
    <>
      {/* ── Page Hero ── */}
      <section className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-violet-700 text-white pt-28 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_2px_2px,rgba(255,255,255,0.1)_1px,transparent_0)] bg-[length:28px_28px]" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {project.featured && (
              <span className="inline-flex items-center gap-1 bg-gradient-to-r from-amber-400 to-orange-400 text-white text-xs font-bold px-3 py-1 rounded-full">
                <i className="fas fa-star text-[10px]" /> Featured
              </span>
            )}
            <span className="bg-white/10 border border-white/20 text-white/80 text-xs font-semibold px-3 py-1 rounded-full capitalize">
              {project.category}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">{project.title}</h1>
          <p className="text-white/70 text-lg max-w-2xl leading-relaxed">{project.description}</p>
        </div>
      </section>

      {/* ── Detail ── */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* Back link */}
          <Link to="/projects"
            className="inline-flex items-center gap-2 text-indigo-600 text-sm font-medium hover:text-indigo-800 transition-colors mb-8">
            <i className="fas fa-arrow-left text-xs" /> Back to Projects
          </Link>

          {/* Project image */}
          {project.image && (
            <div className="w-full max-h-[420px] overflow-hidden rounded-2xl mb-8 shadow-[0_12px_40px_rgba(0,0,0,0.12)] bg-slate-100">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const rn = project.github_url?.split("/").pop();
                  const og = `https://opengraph.githubassets.com/1/aadhar41/${rn}`;
                  if (e.target.src !== og) e.target.src = og;
                  else e.target.style.display = "none";
                }}
              />
            </div>
          )}

          {/* Content grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Main description */}
            <div className="md:col-span-2 space-y-6">
              {project.long_description && (
                <div className="bg-white rounded-2xl p-7 shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-slate-100">
                  <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <i className="fas fa-align-left text-indigo-500" /> Overview
                  </h3>
                  <div className="text-slate-600 text-sm leading-relaxed blog-content"
                    dangerouslySetInnerHTML={{ __html: project.long_description }} />
                </div>
              )}

              {/* Technologies */}
              {project.technologies?.length > 0 && (
                <div className="bg-white rounded-2xl p-7 shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-slate-100">
                  <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <i className="fas fa-code text-indigo-500" /> Technologies Used
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((t) => <Badge key={t}>{t}</Badge>)}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              {/* Metadata card */}
              <div className="bg-white rounded-2xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-slate-100">
                <h4 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">Project Info</h4>
                <div className="space-y-3">
                  {[
                    { icon: "fas fa-tag", label: "Category", value: project.category },
                    { icon: "fas fa-calendar", label: "Year", value: project.year },
                    { icon: "fas fa-user", label: "Client", value: project.client },
                  ].filter((r) => r.value).map((row) => (
                    <div key={row.label} className="flex items-start gap-3">
                      <div className="shrink-0 w-7 h-7 rounded-lg bg-indigo-50 flex items-center justify-center mt-0.5">
                        <i className={`${row.icon} text-indigo-600 text-xs`} />
                      </div>
                      <div>
                        <p className="text-xs text-slate-400 font-medium">{row.label}</p>
                        <p className="text-sm font-semibold text-slate-700 capitalize">{row.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Links */}
              <div className="space-y-2.5">
                {project.live_url && (
                  <a href={project.live_url} target="_blank" rel="noreferrer"
                    className="flex justify-center items-center gap-2 w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-[0_6px_20px_rgba(99,102,241,0.4)] hover:-translate-y-0.5 transition-all duration-200 text-sm">
                    <i className="fas fa-external-link-alt" /> View Live Demo
                  </a>
                )}
                {project.github_url && (
                  <a href={project.github_url} target="_blank" rel="noreferrer"
                    className="flex justify-center items-center gap-2 w-full py-3 bg-slate-800 text-white font-semibold rounded-xl hover:bg-slate-700 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200 text-sm">
                    <i className="fab fa-github" /> View on GitHub
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
