import { useState, useRef, useEffect } from "react";
import { Navigate, Outlet, Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { logout } from "../../services/api";

const NAV_ITEMS = [
  { label: "Dashboard",  path: "/admin",           icon: "fas fa-tachometer-alt"   },
  { label: "Projects",   path: "/admin/projects",  icon: "fas fa-project-diagram"  },
  { label: "Blog",       path: "/admin/blog",      icon: "fas fa-blog"             },
  { label: "Experience", path: "/admin/experience",icon: "fas fa-briefcase"        },
  { label: "Education",  path: "/admin/education", icon: "fas fa-graduation-cap"   },
  { label: "Skills",     path: "/admin/skills",    icon: "fas fa-tools"            },
  { label: "Profile",    path: "/admin/profile",   icon: "fas fa-user-circle"      },
  { label: "Contacts",   path: "/admin/contacts",  icon: "fas fa-envelope"         },
];

export default function AdminLayout() {
  const { user, loading, logoutUser } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  if (loading)
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
          <p className="text-slate-500 text-sm font-medium">Loading Admin Panel…</p>
        </div>
      </div>
    );

  if (!user) return <Navigate to="/admin/login" state={{ from: location }} replace />;

  const handleLogout = async () => {
    try { await logout(); } catch {}
    logoutUser();
  };

  const currentLabel = NAV_ITEMS.find(
    (i) => location.pathname === i.path || (i.path !== "/admin" && location.pathname.startsWith(i.path))
  )?.label ?? "Admin Panel";

  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* ── Sidebar overlay (mobile) ── */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* ── Sidebar ── */}
      <aside className={`
        fixed top-0 left-0 h-screen w-64 bg-slate-900 flex flex-col z-40
        transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static lg:z-auto lg:h-screen lg:sticky lg:top-0
      `}>
        {/* Brand */}
        <div className="px-6 py-6 bg-gradient-to-br from-indigo-600 to-purple-700 shrink-0">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
              <i className="fas fa-shield-alt text-white text-sm" />
            </div>
            <span className="text-white font-bold text-lg tracking-tight">Aadhar Admin</span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-white/70 text-xs capitalize">{user.role} Account</span>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto">
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest px-3 mb-3">Menu</p>
          {NAV_ITEMS.map((item) => {
            const isActive =
              location.pathname === item.path ||
              (item.path !== "/admin" && location.pathname.startsWith(item.path));
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-xl mb-1 text-sm font-medium transition-all duration-150
                  ${isActive
                    ? "bg-indigo-600 text-white shadow-[0_4px_12px_rgba(99,102,241,0.35)]"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                  }
                `}
              >
                <i className={`${item.icon} w-4 text-center text-sm`} />
                {item.label}
                {isActive && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white/60" />}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-4 py-4 border-t border-slate-800 shrink-0 space-y-2">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-2.5 bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-semibold rounded-xl hover:bg-red-500/20 transition-colors"
          >
            <i className="fas fa-sign-out-alt" /> Logout
          </button>
          <Link
            to="/"
            className="flex items-center justify-center gap-2 text-slate-500 text-xs hover:text-slate-300 transition-colors py-1"
          >
            <i className="fas fa-arrow-left text-[10px]" /> Back to Website
          </Link>
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="bg-white border-b border-slate-200 px-5 py-3.5 flex items-center justify-between sticky top-0 z-20 shadow-sm">
          <div className="flex items-center gap-3">
            {/* Mobile hamburger */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors"
            >
              <i className="fas fa-bars text-sm" />
            </button>
            <div>
              <h1 className="text-base font-bold text-slate-800">{currentLabel}</h1>
              <p className="text-xs text-slate-400 hidden sm:block">Portfolio Admin Panel</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/"
              target="_blank"
              className="hidden sm:flex items-center gap-1.5 text-slate-500 text-sm hover:text-indigo-600 transition-colors"
            >
              <i className="fas fa-external-link-alt text-xs" /> View Site
            </Link>
            {/* User dropdown */}
            <div className="relative pl-3 border-l border-slate-200" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen((o) => !o)}
                className="flex items-center gap-2 rounded-xl px-2 py-1 hover:bg-slate-100 transition-colors group"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold shadow shrink-0">
                  {user.name?.charAt(0) ?? "A"}
                </div>
                <span className="hidden sm:block text-sm font-medium text-slate-700">{user.name}</span>
                <i className={`fas fa-chevron-down text-[10px] text-slate-400 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {/* Dropdown panel */}
              {dropdownOpen && (
                <div className="absolute right-0 top-[calc(100%+8px)] w-48 bg-white rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-slate-100 py-1.5 z-50 animate-[fadeInDown_0.15s_ease]">
                  {/* Header */}
                  <div className="px-4 py-2.5 border-b border-slate-100 mb-1">
                    <p className="text-xs font-semibold text-slate-800 truncate">{user.name}</p>
                    <p className="text-[10px] text-slate-400 capitalize truncate">{user.role} Account</p>
                  </div>

                  {[
                    { label: "Dashboard", icon: "fas fa-tachometer-alt", to: "/admin" },
                    { label: "Profile",   icon: "fas fa-user-circle",    to: "/admin/profile" },
                    { label: "Contacts",  icon: "fas fa-envelope",       to: "/admin/contacts" },
                    { label: "View Site", icon: "fas fa-external-link-alt", to: "/", blank: true },
                  ].map((item) => (
                    <Link
                      key={item.label}
                      to={item.to}
                      target={item.blank ? "_blank" : undefined}
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-indigo-600 transition-colors"
                    >
                      <i className={`${item.icon} w-4 text-center text-slate-400 group-hover:text-indigo-400 text-xs`} />
                      {item.label}
                    </Link>
                  ))}

                  <div className="border-t border-slate-100 mt-1 pt-1">
                    <button
                      onClick={() => { setDropdownOpen(false); handleLogout(); }}
                      className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <i className="fas fa-sign-out-alt w-4 text-center text-xs" /> Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-5 lg:p-7 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
