import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getBlog } from "../services/api";

const CAT_COLORS = {
  laravel: "linear-gradient(135deg, #667eea, #764ba2)",
  api: "linear-gradient(135deg, #764ba2, #8e44ad)",
  database: "linear-gradient(135deg, #e74c3c, #c0392b)",
  mysql: "linear-gradient(135deg, #e74c3c, #c0392b)",
  php: "linear-gradient(135deg, #3498db, #2980b9)",
  docker: "linear-gradient(135deg, #2980b9, #1abc9c)",
  security: "linear-gradient(135deg, #27ae60, #2ecc71)",
  default: "linear-gradient(135deg, #667eea, #764ba2)",
};

function getCatColor(tags) {
  const tag = (tags?.[0] ?? "").toLowerCase();
  return CAT_COLORS[tag] ?? CAT_COLORS.default;
}

export default function BlogDetail() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBlog(slug)
      .then((res) => setBlog(res.data))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div style={{ paddingTop: 100 }}>
        <div className="container section text-center text-muted">
          Loading...
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div style={{ paddingTop: 100 }}>
        <div className="container section text-center">
          <p>
            Post not found.{" "}
            <Link to="/blog" style={{ color: "var(--secondary-color)" }}>
              ← Back to Blog
            </Link>
          </p>
        </div>
      </div>
    );
  }

  const tagLabel = blog.tags?.[0] ?? "";

  return (
    <>
      {/* ── Page Hero ── */}
      <section className="page-hero">
        <div className="container" style={{ maxWidth: 860 }}>
          <h1>{blog.title}</h1>
          <p style={{ maxWidth: 680, margin: "0.75rem auto 0", opacity: 0.9 }}>
            {blog.excerpt}
          </p>
        </div>
      </section>

      {/* ── Content Card ── */}
      <section className="section bg-light" style={{ paddingTop: 0 }}>
        <div className="container" style={{ maxWidth: 860 }}>
          {/* White card to hold all content */}
          <div
            style={{
              background: "white",
              borderRadius: 16,
              boxShadow: "var(--shadow-card)",
              overflow: "hidden",
              marginTop: "-40px",
            }}
          >
            {/* Cover image / gradient block */}
            <div style={{ position: "relative" }}>
              {blog.cover_image ? (
                <img
                  src={blog.cover_image}
                  alt={blog.title}
                  style={{
                    width: "100%",
                    maxHeight: 380,
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              ) : (
                <div
                  style={{
                    height: 300,
                    background: getCatColor(blog.tags),
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "white",
                    fontSize: "2.5rem",
                    fontWeight: 700,
                  }}
                >
                  {tagLabel || blog.title.split(" ")[0]}
                </div>
              )}
            </div>

            {/* Meta: tags, date, read time */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                padding: "1.25rem 2rem 0",
                flexWrap: "wrap",
              }}
            >
              {blog.tags?.map((t) => (
                <span
                  key={t}
                  className="badge badge-primary"
                  style={{
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    fontSize: "0.72rem",
                  }}
                >
                  {t}
                </span>
              ))}
              {blog.published_at && (
                <span
                  style={{ fontSize: "0.85rem", color: "var(--text-light)" }}
                >
                  <i
                    className="fas fa-calendar-alt"
                    style={{ marginRight: 5 }}
                  />
                  {new Date(blog.published_at).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              )}
              <span style={{ fontSize: "0.85rem", color: "var(--text-light)" }}>
                <i className="fas fa-clock" style={{ marginRight: 5 }} />
                {blog.read_time} min read
              </span>
            </div>

            {/* Excerpt intro */}
            <div style={{ padding: "1rem 2rem 0" }}>
              <p
                style={{
                  color: "var(--text-light)",
                  lineHeight: 1.75,
                  fontSize: "0.95rem",
                }}
              >
                {blog.excerpt}
              </p>
            </div>

            {/* Article content */}
            {blog.content &&
            blog.content.includes("<") &&
            blog.content.includes(">") ? (
              <div
                style={{ padding: "1.25rem 2rem 2rem" }}
                className="blog-content"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            ) : (
              <div
                style={{ padding: "1.25rem 2rem 2rem" }}
                className="blog-content"
              >
                {blog.content?.split("\n").map((line, i) => (
                  <p
                    key={i}
                    style={{
                      color: "var(--primary-color)",
                      lineHeight: 1.85,
                      marginBottom: "1rem",
                    }}
                  >
                    {line}
                  </p>
                ))}
              </div>
            )}

            {/* Back button */}
            <div style={{ padding: "0 2rem 2rem" }}>
              <Link to="/blog" className="btn btn-gradient">
                <i className="fas fa-arrow-left" /> Back to Blog
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
