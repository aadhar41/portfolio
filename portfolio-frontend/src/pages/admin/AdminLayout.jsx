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
    <div style={{ display: "flex", minHeight: "100vh", background: "#f8fafc" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: 260,
          background: "var(--primary-color)",
          color: "white",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            padding: "2rem 1.5rem",
            borderBottom: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <h3 style={{ margin: 0, fontSize: "1.2rem" }}>Aadhar Admin</h3>
          <small
            style={{
              color: "rgba(255,255,255,0.6)",
              textTransform: "capitalize",
            }}
          >
            Role: {user.role}
          </small>
        </div>

        <nav style={{ flexGrow: 1, padding: "1rem 0" }}>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "0.85rem 1.5rem",
                color:
                  location.pathname === item.path
                    ? "white"
                    : "rgba(255,255,255,0.7)",
                textDecoration: "none",
                background:
                  location.pathname === item.path
                    ? "rgba(255,255,255,0.1)"
                    : "transparent",
                transition: "0.2s",
                fontSize: "0.95rem",
              }}
            >
              <i
                className={item.icon}
                style={{ width: 24, marginRight: 10 }}
              ></i>
              {item.label}
            </Link>
          ))}
        </nav>

        <div
          style={{
            padding: "1.5rem",
            borderTop: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <button
            onClick={handleLogout}
            style={{
              width: "100%",
              background: "rgba(255,255,255,0.1)",
              border: "none",
              color: "white",
              padding: "0.75rem",
              borderRadius: 8,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
            }}
          >
            <i className="fas fa-sign-out-alt"></i> Logout
          </button>
          <Link
            to="/"
            style={{
              display: "block",
              textAlign: "center",
              marginTop: "1rem",
              color: "rgba(255,255,255,0.5)",
              fontSize: "0.85rem",
              textDecoration: "none",
            }}
          >
            View Site{" "}
            <i
              className="fas fa-external-link-alt"
              style={{ fontSize: "0.7rem" }}
            ></i>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main
        style={{
          flexGrow: 1,
          padding: "2rem",
          overflowY: "auto",
          maxHeight: "100vh",
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
