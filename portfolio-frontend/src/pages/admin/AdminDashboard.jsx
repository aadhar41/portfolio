import { useState, useEffect } from "react";
import {
  getProfile,
  getProjects,
  getBlogs,
  getContacts,
} from "../../services/api";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    projects: 0,
    blogs: 0,
    messages: 0,
    skills: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [profileRes, projectsRes, blogsRes, contactsRes] =
          await Promise.all([
            getProfile(),
            getProjects(),
            getBlogs(),
            getContacts(),
          ]);

        // Count skills from profile res
        const skillCount = Object.values(profileRes.data.skills || {}).flat()
          .length;

        setStats({
          projects: projectsRes.data.length,
          blogs: blogsRes.data.length,
          messages: contactsRes.data.length,
          skills: skillCount,
        });
      } catch (err) {
        console.error("Failed to fetch stats", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      label: "Projects",
      value: stats.projects,
      icon: "fas fa-project-diagram",
      color: "#6366f1",
    },
    {
      label: "Blog Posts",
      value: stats.blogs,
      icon: "fas fa-blog",
      color: "#10b981",
    },
    {
      label: "Unread Messages",
      value: stats.messages,
      icon: "fas fa-envelope",
      color: "#f59e0b",
    },
    {
      label: "Total Skills",
      value: stats.skills,
      icon: "fas fa-tools",
      color: "#ef4444",
    },
  ];

  if (loading) return <div>Loading dashboard stats...</div>;

  return (
    <div>
      <div
        className="row row-4"
        style={{ gap: "1.5rem", marginBottom: "2rem" }}
      >
        {statCards.map((s) => (
          <div
            key={s.label}
            className="card"
            style={{
              padding: "1.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
              position: "relative",
              overflow: "hidden",
              minHeight: 120,
              justifyContent: "center",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: -10,
                right: -10,
                fontSize: "5rem",
                opacity: 0.05,
                transform: "rotate(-15deg)",
                color: s.color,
              }}
            >
              <i className={s.icon}></i>
            </div>
            <small
              style={{
                color: "var(--text-light)",
                fontWeight: 600,
                textTransform: "uppercase",
                fontSize: "0.7rem",
                letterSpacing: 1,
              }}
            >
              {s.label}
            </small>
            <h4
              style={{
                margin: 0,
                fontSize: "2rem",
                fontWeight: 800,
                color: "#1e293b",
              }}
            >
              {s.value}
            </h4>
            <div
              style={{
                width: 40,
                height: 4,
                background: s.color,
                borderRadius: 2,
              }}
            ></div>
          </div>
        ))}
      </div>

      <div className="row row-2" style={{ gap: "1.5rem" }}>
        <div className="card" style={{ padding: "1.5rem" }}>
          <h5 style={{ marginBottom: "1rem" }}>Latest Activity</h5>
          <p style={{ color: "var(--text-light)", fontSize: "0.9rem" }}>
            Welcome to your new portfolio admin panel! From here you can manage
            all aspects of your professional presence.
          </p>
          <ul style={{ listStyle: "none", padding: 0, fontSize: "0.9rem" }}>
            <li
              style={{ padding: "0.75rem 0", borderBottom: "1px solid #eee" }}
            >
              <i
                className="fas fa-info-circle"
                style={{ color: "#6366f1", marginRight: 10 }}
              ></i>
              Quickly add new projects from the Projects tab.
            </li>
            <li
              style={{ padding: "0.75rem 0", borderBottom: "1px solid #eee" }}
            >
              <i
                className="fas fa-info-circle"
                style={{ color: "#6366f1", marginRight: 10 }}
              ></i>
              Update your profile and contact details anytime.
            </li>
            <li style={{ padding: "0.75rem 0" }}>
              <i
                className="fas fa-info-circle"
                style={{ color: "#6366f1", marginRight: 10 }}
              ></i>
              Check the Contacts section for new inquiries.
            </li>
          </ul>
        </div>

        <div
          className="card"
          style={{
            padding: "1.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <div>
            <i
              className="fas fa-chart-line fa-3x"
              style={{ color: "#e2e8f0", marginBottom: "1rem" }}
            ></i>
            <h5 style={{ margin: 0 }}>Traffic Analytics</h5>
            <p style={{ color: "var(--text-light)", fontSize: "0.85rem" }}>
              Integration with Google Analytics coming soon.
            </p>
            <button className="btn btn-outline-primary btn-sm" disabled>
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
