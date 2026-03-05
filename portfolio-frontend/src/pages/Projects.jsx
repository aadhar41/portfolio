import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProjects } from "../services/api";

const CATEGORIES = ["all", "web", "mobile", "api"];

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    setLoading(true);
    getProjects({ category, search })
      .then((res) => setProjects(res.data))
      .finally(() => setLoading(false));
  }, [category, search]);

  return (
    <>
      {/* ── Page Hero ── */}
      <section className="page-hero">
        <div className="container">
          <h1>Projects</h1>
          <p>
            A showcase of my work — websites, APIs, and full-stack applications
          </p>
        </div>
      </section>

      <section className="section bg-light">
        <div className="container">
          {/* Filters */}
          <div
            className="flex flex-wrap gap-2 align-center mb-4"
            style={{ marginBottom: "2rem" }}
          >
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`btn btn-sm ${category === c ? "btn-gradient" : "btn-outline-primary"}`}
                style={{ textTransform: "capitalize" }}
              >
                {c}
              </button>
            ))}
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search projects..."
              className="form-control"
              style={{
                maxWidth: 220,
                marginLeft: "auto",
                borderRadius: 50,
                padding: "8px 18px",
              }}
            />
          </div>

          {/* Grid */}
          {loading ? (
            <p className="text-center text-muted">Loading...</p>
          ) : projects.length === 0 ? (
            <p className="text-center text-muted">No projects found.</p>
          ) : (
            <div className="row row-3">
              {projects.map((p) => (
                <div key={p.id} className="card">
                  <div className="card-header">
                    <h5>{p.title}</h5>
                    <small className="text-capitalize">{p.category}</small>
                  </div>
                  <div
                    className="card-body"
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    {p.image && (
                      <div
                        style={{
                          width: "100%",
                          height: 160,
                          backgroundColor: "#f0f2f5",
                          borderRadius: 8,
                          marginBottom: "1rem",
                          overflow: "hidden",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <img
                          src={p.image}
                          alt={p.title}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                          onError={(e) => {
                            // If conventional image fails, try GitHub OpenGraph image
                            const repoName = p.github_url?.split("/").pop();
                            const ogUrl = `https://opengraph.githubassets.com/1/aadhar41/${repoName}`;
                            if (e.target.src !== ogUrl) {
                              e.target.src = ogUrl;
                            } else {
                              // If even that fails, hide the image or show a placeholder icon
                              e.target.style.display = "none";
                              e.target.parentElement.innerHTML = `<div style="text-align:center;color:#bdc3c7;"><i class="fas fa-code fa-3x"></i></div>`;
                            }
                          }}
                        />
                      </div>
                    )}
                    {p.featured && (
                      <span
                        className="badge badge-gradient"
                        style={{
                          marginBottom: "0.5rem",
                          alignSelf: "flex-start",
                        }}
                      >
                        ★ Featured
                      </span>
                    )}
                    <p
                      style={{
                        color: "var(--text-light)",
                        fontSize: "0.9rem",
                        marginBottom: "1rem",
                        flexGrow: 1,
                      }}
                    >
                      {p.description}
                    </p>
                    <div
                      className="flex flex-wrap gap-1"
                      style={{ marginBottom: "1rem" }}
                    >
                      {p.technologies?.slice(0, 4).map((t) => (
                        <span key={t} className="badge badge-primary">
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-1">
                      <Link
                        to={`/projects/${p.id}`}
                        className="btn btn-outline-primary btn-sm"
                      >
                        Details
                      </Link>
                      {p.live_url && (
                        <a
                          href={p.live_url}
                          target="_blank"
                          rel="noreferrer"
                          className="btn btn-gradient btn-sm"
                        >
                          Live <i className="fas fa-external-link-alt" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
