import { Navigate, Outlet, Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { logout } from "../../services/api";

export default function AdminLayout() {
  const { user, loading, logoutUser } = useAuth();
  const location = useLocation();

  if (loading)
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        Loading Admin Panel...
      </div>
    );
  if (!user)
    return <Navigate to="/admin/login" state={{ from: location }} replace />;

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error("Logout failed", err);
    }
    logoutUser();
  };

  const navItems = [
    { label: "Dashboard", path: "/admin", icon: "fas fa-tachometer-alt" },
    {
      label: "Projects",
      path: "/admin/projects",
      icon: "fas fa-project-diagram",
    },
    { label: "Blog", path: "/admin/blog", icon: "fas fa-blog" },
    {
      label: "Experience",
      path: "/admin/experience",
      icon: "fas fa-briefcase",
    },
    {
      label: "Education",
      path: "/admin/education",
      icon: "fas fa-graduation-cap",
    },
    { label: "Skills", path: "/admin/skills", icon: "fas fa-tools" },
    { label: "Profile", path: "/admin/profile", icon: "fas fa-user-circle" },
    { label: "Contacts", path: "/admin/contacts", icon: "fas fa-envelope" },
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f1f5f9" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: 280,
          background: "#1e293b",
          color: "white",
          display: "flex",
          flexDirection: "column",
          boxShadow: "4px 0 10px rgba(0,0,0,0.05)",
          zIndex: 10,
        }}
      >
        <div
          style={{
            padding: "2.5rem 1.5rem",
            background:
              "linear-gradient(135deg, var(--primary-color), var(--secondary-color))",
            clipPath: "polygon(0 0, 100% 0, 100% 85%, 0 100%)",
            marginBottom: "1rem",
          }}
        >
          <h3
            style={{
              margin: 0,
              fontSize: "1.3rem",
              fontWeight: 700,
              letterSpacing: -0.5,
            }}
          >
            Aadhar Admin
          </h3>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginTop: 5,
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#4ade80",
              }}
            ></span>
            <small
              style={{
                color: "rgba(255,255,255,0.8)",
                textTransform: "capitalize",
                fontSize: "0.75rem",
              }}
            >
              {user.role} Account
            </small>
          </div>
        </div>

        <nav style={{ flexGrow: 1, padding: "1rem 0.75rem" }}>
          {navItems.map((item) => {
            const isActive =
              location.pathname === item.path ||
              (item.path !== "/admin" &&
                location.pathname.startsWith(item.path));
            return (
              <Link
                key={item.path}
                to={item.path}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "0.85rem 1.25rem",
                  color: isActive ? "white" : "rgba(255,255,255,0.6)",
                  textDecoration: "none",
                  borderRadius: 12,
                  background: isActive
                    ? "rgba(255,255,255,0.1)"
                    : "transparent",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  fontSize: "0.95rem",
                  fontWeight: isActive ? 600 : 400,
                  marginBottom: 4,
                }}
                className="admin-nav-item"
              >
                <i
                  className={item.icon}
                  style={{
                    width: 24,
                    marginRight: 12,
                    color: isActive ? "white" : "rgba(255,255,255,0.4)",
                    fontSize: "1.1rem",
                  }}
                ></i>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div
          style={{
            padding: "1.5rem",
            borderTop: "1px solid rgba(255,255,255,0.05)",
            background: "rgba(0,0,0,0.1)",
          }}
        >
          <button
            onClick={handleLogout}
            style={{
              width: "100%",
              background: "rgba(239, 68, 68, 0.15)",
              border: "1px solid rgba(239, 68, 68, 0.2)",
              color: "#f87171",
              padding: "0.75rem",
              borderRadius: 12,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              fontWeight: 600,
              transition: "0.3s",
            }}
          >
            <i className="fas fa-sign-out-alt"></i> Logout
          </button>
          <Link
            to="/"
            style={{
              display: "block",
              textAlign: "center",
              marginTop: "1.2rem",
              color: "rgba(255,255,255,0.4)",
              fontSize: "0.85rem",
              textDecoration: "none",
              transition: "0.3s",
            }}
          >
            <i
              className="fas fa-arrow-left"
              style={{ fontSize: "0.7rem", marginRight: 5 }}
            ></i>
            Back to Website
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main
        style={{
          flexGrow: 1,
          padding: "2.5rem",
          paddingBottom: "5rem",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <header
          style={{
            marginBottom: "2rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2 style={{ margin: 0 }}>
            {navItems.find((i) => i.path === location.pathname)?.label ||
              "Admin Panel"}
          </h2>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: "0.9rem", color: "var(--text-light)" }}>
              Welcome, {user.name}
            </span>
            <div
              style={{
                width: 35,
                height: 35,
                background: "var(--secondary-color)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontWeight: 700,
              }}
            >
              {user.name.charAt(0)}
            </div>
          </div>
        </header>

        <Outlet />
      </main>
    </div>
  );
}
