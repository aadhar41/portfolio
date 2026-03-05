import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getBlogs } from "../services/api";

// Category → gradient color mapping
const CAT_COLORS = {
  laravel: "linear-gradient(135deg, #667eea, #764ba2)",
  api: "linear-gradient(135deg, #764ba2, #8e44ad)",
  database: "linear-gradient(135deg, #e74c3c, #c0392b)",
  mysql: "linear-gradient(135deg, #e74c3c, #c0392b)",
  php: "linear-gradient(135deg, #3498db, #2980b9)",
  docker: "linear-gradient(135deg, #2980b9, #1abc9c)",
  security: "linear-gradient(135deg, #27ae60, #2ecc71)",
  tips: "linear-gradient(135deg, #27ae60, #16a085)",
  tutorials: "linear-gradient(135deg, #f39c12, #e67e22)",
  default: "linear-gradient(135deg, #667eea, #764ba2)",
};

function getCatColor(tags) {
  const tag = (tags?.[0] ?? "").toLowerCase();
  return CAT_COLORS[tag] ?? CAT_COLORS.default;
}

const STATIC_TAGS = [
  "PHP",
  "Laravel",
  "Database",
  "APIs",
  "Tips & Tricks",
  "Tutorials",
];

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tag, setTag] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const PER_PAGE = 6;

  useEffect(() => {
    setLoading(true);
    getBlogs(tag ? { tag } : {})
      .then((res) => {
        const data = res.data.data || res.data;
        setBlogs(Array.isArray(data) ? data : []);
        setPage(1);
      })
      .finally(() => setLoading(false));
  }, [tag]);

  const filtered = search
    ? blogs.filter(
        (b) =>
          b.title.toLowerCase().includes(search.toLowerCase()) ||
          b.excerpt?.toLowerCase().includes(search.toLowerCase()),
      )
    : blogs;

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  const allTags = [...new Set(blogs.flatMap((b) => b.tags ?? []))];
  const displayTags = allTags.length > 0 ? allTags : STATIC_TAGS;

  return (
    <>
      {/* ── Page Hero ── */}
      <section
        className="page-hero"
        style={{ textAlign: "left", paddingBottom: 60 }}
      >
        <div
          className="container"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <h1 style={{ textAlign: "left" }}>Tech Blog</h1>
            <p style={{ opacity: 0.9, marginBottom: "0.5rem" }}>
              Insights, tutorials, and thoughts on PHP development, Laravel, and
              modern web technologies
            </p>
            <p style={{ opacity: 0.75, fontSize: "0.95rem" }}>
              Stay updated with the latest trends in backend development, best
              practices, and real-world solutions.
            </p>
          </div>
          <div
            style={{
              fontSize: "5rem",
              opacity: 0.2,
              fontWeight: 900,
              lineHeight: 1,
            }}
          >
            <i className="fas fa-rss" />
          </div>
        </div>
      </section>

      <section className="section bg-white">
        <div className="container">
          {/* Search + Tags */}
          <div
            className="flex align-center gap-2 flex-wrap"
            style={{ marginBottom: "2rem" }}
          >
            <div
              style={{
                display: "flex",
                flex: 1,
                minWidth: 220,
                position: "relative",
                maxWidth: 420,
              }}
            >
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search articles..."
                className="form-control"
                style={{ paddingRight: "3rem", borderRadius: 50 }}
              />
              <button
                style={{
                  position: "absolute",
                  right: 4,
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "var(--gradient)",
                  border: "none",
                  borderRadius: "50%",
                  width: 34,
                  height: 34,
                  color: "white",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <i className="fas fa-search" style={{ fontSize: "0.85rem" }} />
              </button>
            </div>
            <div className="flex flex-wrap gap-1">
              <button
                onClick={() => setTag("")}
                className={`btn btn-sm ${tag === "" ? "btn-gradient" : ""}`}
                style={
                  tag === ""
                    ? {}
                    : {
                        background: "var(--bg-light)",
                        color: "var(--primary-color)",
                        border: "none",
                      }
                }
              >
                All
              </button>
              {displayTags.map((t) => (
                <button
                  key={t}
                  onClick={() => setTag(t)}
                  className={`btn btn-sm ${tag === t ? "btn-gradient" : ""}`}
                  style={
                    tag === t
                      ? {}
                      : {
                          background: "var(--bg-light)",
                          color: "var(--primary-color)",
                          border: "none",
                        }
                  }
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Latest Articles Title */}
          <h2 className="section-title" style={{ marginBottom: "2.5rem" }}>
            Latest Articles
          </h2>

          {loading ? (
            <p className="text-center text-muted">Loading...</p>
          ) : paginated.length === 0 ? (
            <p className="text-center text-muted">No posts found.</p>
          ) : (
            <div className="row row-3">
              {paginated.map((blog) => {
                const tagLabel = blog.tags?.[0] ?? "";
                return (
                  <article
                    key={blog.id}
                    className="card blog-card"
                    style={{ overflow: "hidden", borderRadius: 12 }}
                  >
                    {/* Image / Color block */}
                    <div style={{ position: "relative", overflow: "hidden" }}>
                      {blog.cover_image ? (
                        <img
                          src={blog.cover_image}
                          alt={blog.title}
                          className="blog-card-img"
                        />
                      ) : (
                        <div
                          style={{
                            height: 180,
                            background: getCatColor(blog.tags),
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "white",
                            fontSize: "1.4rem",
                            fontWeight: 700,
                          }}
                        >
                          {tagLabel || blog.title.split(" ")[0]}
                        </div>
                      )}
                      {tagLabel && (
                        <span
                          className="badge badge-gradient"
                          style={{
                            position: "absolute",
                            top: 12,
                            right: 12,
                            fontSize: "0.7rem",
                            textTransform: "uppercase",
                            letterSpacing: "0.05em",
                          }}
                        >
                          {tagLabel}
                        </span>
                      )}
                    </div>

                    <div
                      className="card-body"
                      style={{ display: "flex", flexDirection: "column" }}
                    >
                      <h3
                        style={{
                          fontSize: "0.95rem",
                          fontWeight: 700,
                          marginBottom: "0.5rem",
                          color: "var(--primary-color)",
                          lineHeight: 1.4,
                        }}
                      >
                        <Link
                          to={`/blog/${blog.slug}`}
                          style={{ color: "inherit" }}
                        >
                          {blog.title}
                        </Link>
                      </h3>
                      <p
                        style={{
                          fontSize: "0.82rem",
                          color: "var(--text-light)",
                          flexGrow: 1,
                          marginBottom: "0.75rem",
                          lineHeight: 1.6,
                        }}
                      >
                        {blog.excerpt}
                      </p>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          fontSize: "0.78rem",
                          color: "var(--text-light)",
                        }}
                      >
                        <span>
                          <i
                            className="fas fa-calendar-alt"
                            style={{ marginRight: 4 }}
                          />
                          {blog.published_at
                            ? new Date(blog.published_at).toLocaleDateString(
                                "en-IN",
                                {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                },
                              )
                            : ""}
                        </span>
                        <span>
                          <i
                            className="fas fa-clock"
                            style={{ marginRight: 4 }}
                          />
                          {blog.read_time} min read
                        </span>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div
              className="flex justify-center gap-1"
              style={{ marginTop: "2.5rem" }}
            >
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  className="btn btn-sm"
                  style={{
                    background:
                      page === p ? "var(--gradient)" : "var(--bg-light)",
                    color: page === p ? "white" : "var(--primary-color)",
                    border: "none",
                    minWidth: 38,
                  }}
                >
                  {p}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
