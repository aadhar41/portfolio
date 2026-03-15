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
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-6">
          <div className="w-16 h-16 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin shadow-inner" />
          <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">Authenticating Portal...</p>
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
  )?.label ?? "Admin Portal";

  return (
    <div className="flex min-h-screen bg-slate-50 overflow-hidden">
      {/* ── Sidebar overlay (mobile) ── */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-indigo-900/20 backdrop-blur-sm z-30 lg:hidden transition-all duration-300" onClick={() => setSidebarOpen(false)} />
      )}

      {/* ── Sidebar ── */}
      <aside className={`
        fixed top-0 left-0 h-screen w-72 bg-white flex flex-col z-40
        transform transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static lg:z-auto lg:h-screen lg:sticky lg:top-0
        border-r border-slate-100/50
      `}>
        {/* Brand */}
        <div className="px-8 py-10 shrink-0">
          <div className="flex items-center gap-4 group">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg group-hover:rotate-12 transition-transform">
              <i className="fas fa-fingerprint text-white text-xl" />
            </div>
            <div>
              <span className="block text-slate-800 font-black text-xl tracking-tight leading-none">Aadhar</span>
              <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">Master Panel</span>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-4 py-4 overflow-y-auto custom-scrollbar">
          <div className="px-5 mb-6">
            <p className="text-slate-300 text-[10px] font-black uppercase tracking-[0.3em]">Management</p>
          </div>
          <div className="space-y-2">
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
                    flex items-center gap-4 px-5 py-3.5 rounded-2xl text-sm font-bold transition-all duration-300 group
                    ${isActive
                      ? "clay-card !bg-indigo-600 text-white shadow-indigo-200"
                      : "text-slate-400 hover:bg-indigo-50/50 hover:text-indigo-600"
                    }
                  `}
                >
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors shadow-inner
                    ${isActive ? "bg-white/20" : "bg-slate-50 group-hover:bg-white"}`}>
                    <i className={`${item.icon} text-sm`} />
                  </div>
                  <span className="tracking-tight">{item.label}</span>
                  {isActive && <i className="fas fa-chevron-right ml-auto text-[10px] animate-pulse" />}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Footer */}
        <div className="p-6 shrink-0 space-y-4">
          <div className="clay-card p-4 bg-slate-50 border-none flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-emerald-500">
              <i className="fas fa-check-circle" />
            </div>
            <div>
              <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Server Status</p>
              <p className="text-xs font-bold text-slate-700">All Systems Online</p>
            </div>
          </div>
          
          <button
            onClick={handleLogout}
            className="w-full clay-card py-4 !bg-red-50 hover:!bg-red-100 !text-red-500 !border-red-100 shadow-sm flex items-center justify-center gap-3 group transition-all"
          >
            <i className="fas fa-power-off group-hover:rotate-90 transition-transform" />
            <span className="text-[10px] font-black uppercase tracking-widest">Terminate Session</span>
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Top bar */}
        <header className="bg-white/80 backdrop-blur-xl px-6 py-5 flex items-center justify-between sticky top-0 z-20 border-b border-slate-100">
          <div className="flex items-center gap-6">
            {/* Mobile hamburger */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden w-12 h-12 clay-card bg-white flex items-center justify-center text-slate-600 hover:text-indigo-600 transition-all shadow-sm"
            >
              <i className="fas fa-bars-staggered text-lg" />
            </button>
            <div className="hidden sm:block">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 text-[10px] font-bold text-slate-400 border border-slate-100 mb-1 uppercase tracking-widest">
                <i className="fas fa-globe mr-1" /> External Portal / {currentLabel}
              </div>
              <h1 className="text-2xl font-black text-slate-800 tracking-tight">{currentLabel}</h1>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/"
              target="_blank"
              className="hidden md:flex items-center gap-2 clay-card !bg-white px-5 py-2.5 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-indigo-600 transition-all border-slate-100 shadow-sm"
            >
              <i className="fas fa-external-link-alt" /> Live Site
            </Link>
            
            {/* User dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen((o) => !o)}
                className="clay-card !p-1.5 flex items-center gap-3 bg-white border-slate-100 shadow-sm hover:border-indigo-200 transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-lg font-black shadow-lg group-hover:scale-110 transition-transform">
                  {user.name?.charAt(0) ?? "A"}
                </div>
                <div className="hidden lg:block text-left pr-2">
                  <p className="text-xs font-black text-slate-800 leading-none mb-1 tracking-tight">{user.name}</p>
                  <p className="text-[9px] font-black text-indigo-500 uppercase tracking-widest">{user.role}</p>
                </div>
                <i className={`fas fa-chevron-down text-[10px] text-slate-300 transition-transform duration-300 lg:mr-2 ${dropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {/* Dropdown panel */}
              {dropdownOpen && (
                <div className="absolute right-0 top-[calc(100%+8px)] w-60 clay-surface bg-white/95 backdrop-blur-md p-2 z-50 animate-[fadeInDown_0.2s_ease]">
                  <div className="px-5 py-4 border-b border-slate-100 mb-2">
                    <p className="text-xs font-black text-slate-800 tracking-tight mb-1">{user.name}</p>
                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{user.email}</p>
                  </div>

                  <div className="space-y-1">
                    {[
                      { label: "Internal Dashboard", icon: "fas fa-tachometer-alt", to: "/admin" },
                      { label: "My Governance", icon: "fas fa-user-shield", to: "/admin/profile" },
                      { label: "Intercepted Inquiries", icon: "fas fa-envelope-open-text", to: "/admin/contacts" },
                      { label: "Public Interface", icon: "fas fa-rocket", to: "/", blank: true },
                    ].map((item) => (
                      <Link
                        key={item.label}
                        to={item.to}
                        target={item.blank ? "_blank" : undefined}
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-xs font-bold text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-xl transition-all group"
                      >
                        <i className={`${item.icon} w-5 text-center text-slate-300 group-hover:text-indigo-400`} />
                        <span className="tracking-tight">{item.label}</span>
                      </Link>
                    ))}
                  </div>

                  <div className="mt-2 pt-2 border-t border-slate-100">
                    <button
                      onClick={() => { setDropdownOpen(false); handleLogout(); }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-xs font-black text-red-500 hover:bg-red-50 rounded-xl transition-all uppercase tracking-widest"
                    >
                      <i className="fas fa-sign-out-alt w-5 text-center" /> Exit Portal
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 lg:p-10 overflow-y-auto bg-slate-50/50 custom-scrollbar">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
