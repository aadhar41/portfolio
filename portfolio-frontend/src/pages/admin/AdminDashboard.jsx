import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getProfile, getProjects, getBlogs, getContacts } from "../../services/api";

const STAT_CARDS = [
  { key: "projects", label: "Projects",         icon: "fas fa-project-diagram", from: "from-indigo-500",  to: "to-violet-600",  link: "/admin/projects"  },
  { key: "blogs",    label: "Blog Posts",        icon: "fas fa-blog",            from: "from-emerald-500", to: "to-teal-600",    link: "/admin/blog"      },
  { key: "messages", label: "Messages",          icon: "fas fa-envelope",        from: "from-amber-500",   to: "to-orange-500",  link: "/admin/contacts"  },
  { key: "skills",   label: "Skills Tracked",   icon: "fas fa-tools",           from: "from-pink-500",    to: "to-rose-600",    link: "/admin/skills"    },
];

const QUICK_ACTIONS = [
  { label: "Add Project",    icon: "fas fa-plus-circle",   to: "/admin/projects",  color: "text-indigo-600 bg-indigo-50"  },
  { label: "New Blog Post",  icon: "fas fa-pen",           to: "/admin/blog",      color: "text-emerald-600 bg-emerald-50" },
  { label: "Edit Profile",   icon: "fas fa-user-edit",     to: "/admin/profile",   color: "text-violet-600 bg-violet-50"  },
  { label: "View Messages",  icon: "fas fa-inbox",         to: "/admin/contacts",  color: "text-amber-600 bg-amber-50"    },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState({ projects: 0, blogs: 0, messages: 0, skills: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const [profileRes, projectsRes, blogsRes, contactsRes] = await Promise.all([
          getProfile(), getProjects(), getBlogs(), getContacts(),
        ]);
        const skillCount = Object.values(profileRes.data?.skills || {}).flat().length;
        setStats({
          projects: projectsRes.data.total ?? projectsRes.data.length ?? 0,
          blogs:    blogsRes.data.total    ?? blogsRes.data.length    ?? 0,
          messages: contactsRes.data.total ?? contactsRes.data.length ?? 0,
          skills:   skillCount,
        });
      } catch (err) {
        console.error("Failed to fetch stats", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="space-y-10 max-w-7xl mx-auto">
      {/* Welcome banner */}
      <div className="relative clay-surface bg-gradient-to-br from-indigo-600 to-purple-800 p-10 md:p-12 overflow-hidden border-none text-white group">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:scale-125 transition-transform duration-1000" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[10px] font-black uppercase tracking-widest text-white/70 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Authentication Secured
            </div>
            <h2 className="text-4xl font-black mb-2 tracking-tight">System Access Restoration Complete. 👋</h2>
            <p className="text-white/60 text-lg font-medium max-w-lg">Welcome back to the command center. All systems are operational and awaiting your instructions.</p>
          </div>
          <div className="shrink-0 flex gap-4">
            <Link to="/" target="_blank" className="clay-button-primary !bg-white !text-indigo-600 px-6 py-3 text-sm font-black">
              Monitor Live Node
            </Link>
          </div>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {STAT_CARDS.map((s) => (
          <Link
            key={s.key}
            to={s.link}
            className="group clay-card p-8 bg-white hover:scale-105 transition-all duration-300 block border-slate-50"
          >
            <div className="flex items-center justify-between mb-6">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${s.from} ${s.to} flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform`}>
                <i className={`${s.icon} text-white text-xl`} />
              </div>
              <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 shadow-inner group-hover:bg-indigo-50 group-hover:text-indigo-400 transition-colors">
                <i className="fas fa-arrow-right text-[10px]" />
              </div>
            </div>
            <div className="text-4xl font-black text-slate-800 tracking-tighter mb-1">
              {loading ? (
                <span className="inline-block w-16 h-10 bg-slate-50 rounded-xl animate-pulse" />
              ) : (
                stats[s.key]
              )}
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{s.label}</p>
          </Link>
        ))}
      </div>

      {/* Content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <div className="lg:col-span-2 clay-card p-10 bg-white border-slate-50">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-black text-slate-800 tracking-tight flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-500 shadow-inner">
                <i className="fas fa-bolt" />
              </div>
              Accelerated Operations
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {QUICK_ACTIONS.map((a) => (
              <Link
                key={a.label}
                to={a.to}
                className="flex items-center justify-between p-6 rounded-3xl bg-slate-50/50 hover:bg-white border border-transparent hover:border-slate-100 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl ${a.color} flex items-center justify-center shadow-sm font-bold`}>
                    <i className={`${a.icon}`} />
                  </div>
                  <span className="text-sm font-black text-slate-700 uppercase tracking-widest leading-tight">{a.label}</span>
                </div>
                <i className="fas fa-chevron-right text-slate-300 group-hover:translate-x-1 transition-transform" />
              </Link>
            ))}
          </div>
        </div>

        {/* Intelligence / Tips */}
        <div className="clay-card p-10 bg-white border-slate-50">
          <h3 className="text-lg font-black text-slate-800 tracking-tight flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-500 shadow-inner">
              <i className="fas fa-brain" />
            </div>
            Node Intelligence
          </h3>
          <ul className="space-y-6">
            {[
              "Synchronize repository clusters.",
              "Update bio-metric profile metadata.",
              "Monitor intercepted transmissions.",
              "Maintain tech-stack compatibility.",
            ].map((tip, i) => (
              <li key={i} className="flex items-start gap-4">
                <div className="shrink-0 w-6 h-6 rounded-lg bg-emerald-50 flex items-center justify-center mt-0.5 text-emerald-500">
                  <i className="fas fa-check text-[10px]" />
                </div>
                <p className="text-sm text-slate-500 font-bold tracking-tight leading-relaxed">{tip}</p>
              </li>
            ))}
          </ul>
          
          <div className="mt-10 p-6 rounded-[32px] bg-indigo-50/50 border border-indigo-100/50">
            <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em] mb-2">Protocol Hint</p>
            <p className="text-xs font-bold text-slate-600 leading-relaxed italic">"Regular maintenance of the education and experience blocks increases node credibility by 40%."</p>
          </div>
        </div>
      </div>

      {/* Analytics placeholder */}
      <div className="clay-surface bg-white p-12 overflow-hidden relative group border-slate-50 flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 rounded-[32px] bg-slate-50 flex items-center justify-center mb-6 shadow-inner text-slate-200 group-hover:text-indigo-200 transition-colors">
          <i className="fas fa-chart-line text-3xl" />
        </div>
        <h4 className="text-2xl font-black text-slate-800 tracking-tight mb-2">Grid Traffic Analytics</h4>
        <p className="text-slate-400 text-lg font-medium max-w-xl mx-auto mb-8">Google Global Analytics integration is currently in transition. Real-time data visualization will be restored shortly.</p>
        <div className="px-6 py-2 rounded-full bg-slate-50 text-[10px] font-black text-slate-400 border border-slate-100 uppercase tracking-widest flex items-center gap-2">
          <i className="fas fa-shield-halved text-emerald-400" /> Secure Protocol Pending
        </div>
      </div>
    </div>
  );
}
