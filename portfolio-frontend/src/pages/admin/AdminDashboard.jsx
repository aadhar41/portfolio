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
    <div className="space-y-6">
      {/* Welcome banner */}
      <div className="relative bg-gradient-to-r from-indigo-600 to-purple-700 rounded-2xl p-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_2px_2px,rgba(255,255,255,0.07)_1px,transparent_0)] bg-[length:24px_24px]" />
        <div className="relative">
          <h2 className="text-white text-xl font-bold mb-1">Welcome back! 👋</h2>
          <p className="text-white/70 text-sm">Here's an overview of your portfolio content.</p>
        </div>
        <div className="absolute -bottom-4 -right-4 w-28 h-28 bg-white/5 rounded-full" />
        <div className="absolute -top-6 right-10 w-16 h-16 bg-white/5 rounded-full" />
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STAT_CARDS.map((s) => (
          <Link
            key={s.key}
            to={s.link}
            className="group bg-white rounded-2xl p-5 shadow-[0_2px_16px_rgba(0,0,0,0.06)] border border-slate-100 hover:shadow-[0_4px_24px_rgba(0,0,0,0.1)] hover:-translate-y-0.5 transition-all duration-200 block"
          >
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.from} ${s.to} flex items-center justify-center mb-3 shadow-md`}>
              <i className={`${s.icon} text-white text-sm`} />
            </div>
            <div className="text-2xl font-extrabold text-slate-800 mb-0.5">
              {loading ? (
                <span className="inline-block w-10 h-6 bg-slate-100 rounded animate-pulse" />
              ) : (
                stats[s.key]
              )}
            </div>
            <p className="text-xs text-slate-500 font-medium">{s.label}</p>
          </Link>
        ))}
      </div>

      {/* Content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Quick Actions */}
        <div className="bg-white rounded-2xl p-6 shadow-[0_2px_16px_rgba(0,0,0,0.06)] border border-slate-100">
          <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
            <i className="fas fa-bolt text-amber-400" /> Quick Actions
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {QUICK_ACTIONS.map((a) => (
              <Link
                key={a.label}
                to={a.to}
                className={`flex items-center gap-3 p-3.5 rounded-xl ${a.color} hover:opacity-80 transition-opacity`}
              >
                <i className={`${a.icon} text-sm`} />
                <span className="text-sm font-semibold leading-tight">{a.label}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Tips */}
        <div className="bg-white rounded-2xl p-6 shadow-[0_2px_16px_rgba(0,0,0,0.06)] border border-slate-100">
          <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
            <i className="fas fa-lightbulb text-indigo-500" /> Getting Started
          </h3>
          <ul className="space-y-3">
            {[
              "Add new projects from the Projects tab.",
              "Update your profile and contact details anytime.",
              "Check the Contacts section for new inquiries.",
              "Use Skills tab to keep your tech stack current.",
            ].map((tip, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                <div className="shrink-0 w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center mt-0.5">
                  <i className="fas fa-check text-indigo-600 text-[9px]" />
                </div>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Analytics placeholder */}
      <div className="bg-white rounded-2xl p-8 shadow-[0_2px_16px_rgba(0,0,0,0.06)] border border-slate-100 flex flex-col items-center justify-center text-center">
        <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mb-3">
          <i className="fas fa-chart-line text-slate-300 text-2xl" />
        </div>
        <h4 className="font-bold text-slate-700 mb-1">Traffic Analytics</h4>
        <p className="text-slate-400 text-sm mb-4">Google Analytics integration coming soon.</p>
        <span className="inline-flex items-center gap-1.5 bg-indigo-50 text-indigo-500 text-xs font-semibold px-3 py-1.5 rounded-full">
          <i className="fas fa-clock text-[10px]" /> Coming Soon
        </span>
      </div>
    </div>
  );
}
