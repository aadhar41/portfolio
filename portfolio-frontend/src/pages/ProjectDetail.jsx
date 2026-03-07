import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProject } from "../services/api";
import FrontendLoader from "../components/FrontendLoader";

export default function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProject(id)
      .then((res) => setProject(res.data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div style={{ paddingTop: 100 }}>
        <FrontendLoader />
      </div>
    );
  }

  if (!project) {
    return (
      <div style={{ paddingTop: 100 }}>
        <div className="container section text-center">
          <p>
            Project not found.{" "}
            <Link to="/projects" style={{ color: "var(--secondary-color)" }}>
              ← Back to Projects
            </Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* ── Page Hero ── */}
      <section className="page-hero">
        <div className="container">
          <div
            className="flex gap-2 justify-center"
            style={{ marginBottom: "0.75rem" }}
          >
            {project.featured && (
              <span className="badge badge-gradient">★ Featured</span>
            )}
            <span
              className="badge"
              style={{
                background: "rgba(255,255,255,0.2)",
                color: "white",
                textTransform: "capitalize",
              }}
            >
              {project.category}
            </span>
          </div>
          <h1>{project.title}</h1>
          <p>{project.description}</p>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container" style={{ maxWidth: 860 }}>
          <Link
            to="/projects"
            style={{
              color: "var(--secondary-color)",
              display: "inline-block",
              marginBottom: "2rem",
              fontSize: "0.9rem",
            }}
          >
            <i className="fas fa-arrow-left" style={{ marginRight: 6 }} /> Back
            to Projects
          </Link>

          {project.image && (
            <div
              style={{
                width: "100%",
                maxHeight: 400,
                backgroundColor: "#f0f2f5",
                borderRadius: 15,
                marginBottom: "2rem",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
              }}
            >
              <img
                src={project.image}
                alt={project.title}
                style={{
                  width: "100%",
                  height: "100%",
                  maxHeight: 400,
                  objectFit: "cover",
                }}
                onError={(e) => {
                  const repoName = project.github_url?.split("/").pop();
                  const ogUrl = `https://opengraph.githubassets.com/1/aadhar41/${repoName}`;
                  if (e.target.src !== ogUrl) {
                    e.target.src = ogUrl;
                  } else {
                    e.target.style.display = "none";
                    e.target.parentElement.innerHTML = `<div style="text-align:center;color:#bdc3c7;padding:4rem;"><i class="fas fa-code fa-5x"></i></div>`;
                  }
                }}
              />
            </div>
          )}

          {project.long_description && (
            <p
              style={{
                color: "var(--text-light)",
                lineHeight: 1.9,
                marginBottom: "2rem",
                fontSize: "1rem",
                whiteSpace: "pre-line",
              }}
            >
              {project.long_description}
            </p>
          )}

          {/* Tech stack */}
          <div className="card" style={{ marginBottom: "2rem" }}>
            <div className="card-header">
              <h5>
                <i className="fas fa-code" style={{ marginRight: 8 }} />
                Tech Stack
              </h5>
            </div>
            <div className="card-body">
              <div className="flex flex-wrap gap-1">
                {project.technologies?.map((t) => (
                  <span
                    key={t}
                    className="badge badge-primary"
                    style={{ fontSize: "0.85rem", padding: "6px 14px" }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="flex gap-2 flex-wrap">
            {project.live_url && (
              <a
                href={project.live_url}
                target="_blank"
                rel="noreferrer"
                className="btn btn-gradient"
              >
                <i className="fas fa-external-link-alt" /> Live Demo
              </a>
            )}
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline-primary"
              >
                <i className="fab fa-github" /> GitHub
              </a>
            )}
            <Link to="/projects" className="btn btn-secondary">
              ← All Projects
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
