import { useState, useEffect } from "react";
import { adminBlogs, getBlogs } from "../../services/api";
import FileUpload from "../../components/admin/FileUpload";
import AdminFilterBar from "../../components/admin/AdminFilterBar";
import LoadingOverlay from "../../components/admin/LoadingOverlay";
import PageLoader from "../../components/admin/PageLoader";
import { toast } from "react-toastify";

export default function BlogManagement() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    total: 0,
  });
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [statusFilter, setStatusFilter] = useState(""); // draft, published
  const [isActiveFilter, setIsActiveFilter] = useState(""); // "1", "0"
  const [modalOpen, setModalOpen] = useState(false);
  const [currentBlog, setCurrentBlog] = useState(null);
  const [formData, setFormData] = useState({
    is_active: true,
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    status: "draft",
    tags: "",
    cover_image: "",
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchBlogs();
    }, 300); // Debounce search
    return () => clearTimeout(timer);
  }, [search, page, perPage, statusFilter, isActiveFilter]);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await adminBlogs.list({
        search,
        page,
        per_page: perPage,
        status: statusFilter,
        is_active: isActiveFilter,
      });
      // If server returned pagination object
      if (res.data.data) {
        setBlogs(res.data.data);
        setPagination({
          current_page: res.data.current_page,
          last_page: res.data.last_page,
          total: res.data.total,
        });
      } else {
        setBlogs(res.data);
      }
    } catch (err) {
      console.error("Failed to fetch blogs", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1); // Reset to first page on search
  };

  const handleEdit = (blog) => {
    setCurrentBlog(blog);
    setFormData({
      is_active: blog.is_active,
      title: blog.title,
      slug: blog.slug,
      excerpt: blog.excerpt,
      content: blog.content,
      status: blog.status,
      tags: (blog.tags || []).join(", "),
      cover_image: blog.cover_image || "",
    });
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog post?"))
      return;
    try {
      await adminBlogs.delete(id);
      fetchBlogs();
      toast.success("Blog post deleted successfully!");
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      ...formData,
      tags:
        typeof formData.tags === "string"
          ? formData.tags
              .split(",")
              .map((t) => t.trim())
              .filter((t) => t)
          : formData.tags,
    };

    try {
      if (currentBlog) {
        await adminBlogs.update(currentBlog.id, data);
      } else {
        await adminBlogs.create(data);
      }
      setModalOpen(false);
      fetchBlogs();
      toast.success(
        currentBlog
          ? "Blog post updated successfully!"
          : "Blog post created successfully!",
      );
    } catch (err) {
      toast.error(
        "Save failed: " + (err.response?.data?.message || "Unknown error"),
      );
    }
  };

  if (loading && blogs.length === 0) return <PageLoader />;

  return (
    <>
      <AdminFilterBar
        search={search}
        onSearchChange={setSearch}
        perPage={perPage}
        onPerPageChange={(val) => {
          setPerPage(val);
          setPage(1);
        }}
        onAddNew={() => {
          setCurrentBlog(null);
          setFormData({
            is_active: true,
            title: "",
            slug: "",
            excerpt: "",
            content: "",
            status: "draft",
            tags: "",
            cover_image: "",
          });
          setModalOpen(true);
        }}
        addNewText="New Post"
        filters={[
          {
            name: "status",
            label: "All Status",
            value: statusFilter,
            options: [
              { label: "Draft", value: "draft" },
              { label: "Published", value: "published" },
            ],
          },
          {
            name: "is_active",
            label: "Visibility",
            value: isActiveFilter,
            options: [
              { label: "Active", value: "1" },
              { label: "Inactive", value: "0" },
            ],
          },
        ]}
        onFilterChange={(name, val) => {
          if (name === "status") setStatusFilter(val);
          if (name === "is_active") setIsActiveFilter(val);
          setPage(1);
        }}
      />

      <div
        className="card"
        style={{ overflow: "hidden", position: "relative" }}
      >
        <LoadingOverlay active={loading && blogs.length > 0} />
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            textAlign: "left",
            fontSize: "0.9rem",
          }}
        >
          <thead
            style={{ background: "#f1f5f9", borderBottom: "1px solid #e2e8f0" }}
          >
            <tr>
              <th style={{ padding: "1rem" }}>Title</th>
              <th style={{ padding: "1rem" }}>Status</th>
              <th style={{ padding: "1rem" }}>Date</th>
              <th style={{ padding: "1rem", textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((b) => (
              <tr key={b.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                <td style={{ padding: "1rem", fontWeight: 600 }}>{b.title}</td>
                <td style={{ padding: "1rem" }}>
                  <span
                    className={`badge ${b.status === "published" ? "badge-gradient" : "badge-primary"}`}
                    style={{ fontSize: "0.7rem" }}
                  >
                    {b.status}
                  </span>
                  <span
                    className={`badge ${b.is_active ? "badge-success" : "badge-secondary"} ml-1`}
                    style={{ fontSize: "0.7rem" }}
                  >
                    {b.is_active ? "Active" : "Inactive"}
                  </span>
                </td>
                <td style={{ padding: "1rem", color: "var(--text-light)" }}>
                  {b.published_at
                    ? new Date(b.published_at).toLocaleDateString()
                    : "Draft"}
                </td>
                <td style={{ padding: "1rem", textAlign: "right" }}>
                  <button
                    onClick={() => handleEdit(b)}
                    title="Edit"
                    style={{
                      border: "none",
                      background: "none",
                      color: "#6366f1",
                      cursor: "pointer",
                      marginRight: 10,
                    }}
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                  <button
                    onClick={() => handleDelete(b.id)}
                    title="Delete"
                    style={{
                      border: "none",
                      background: "none",
                      color: "#ef4444",
                      cursor: "pointer",
                    }}
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {pagination.last_page > 1 && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "1.5rem",
          }}
        >
          <div style={{ fontSize: "0.85rem", color: "var(--text-light)" }}>
            Showing page {pagination.current_page} of {pagination.last_page} (
            {pagination.total} total)
          </div>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button
              className="btn btn-sm btn-outline-primary"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              Previous
            </button>
            <button
              className="btn btn-sm btn-outline-primary"
              disabled={page === pagination.last_page}
              onClick={() => setPage(page + 1)}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            className="card"
            style={{
              maxWidth: 800,
              width: "95%",
              padding: "2rem",
              maxHeight: "90vh",
              overflowY: "auto",
            }}
          >
            <h4 style={{ marginBottom: "1.5rem" }}>
              {currentBlog ? "Edit Post" : "New Post"}
            </h4>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: "1rem" }}>
                <label style={{ display: "block", marginBottom: "0.4rem" }}>
                  Title
                </label>
                <input
                  className="form-control"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                />
              </div>
              <div
                className="row row-2"
                style={{ gap: "1rem", marginBottom: "1rem" }}
              >
                <div>
                  <label style={{ display: "block", marginBottom: "0.4rem" }}>
                    Slug (optional)
                  </label>
                  <input
                    className="form-control"
                    value={formData.slug}
                    onChange={(e) =>
                      setFormData({ ...formData, slug: e.target.value })
                    }
                    placeholder="post-title"
                  />
                </div>
                <div>
                  <label style={{ display: "block", marginBottom: "0.4rem" }}>
                    Status
                  </label>
                  <select
                    className="form-control"
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>
              </div>
              <div style={{ marginBottom: "1rem" }}>
                <label style={{ display: "block", marginBottom: "0.4rem" }}>
                  Excerpt
                </label>
                <textarea
                  className="form-control"
                  rows="2"
                  value={formData.excerpt}
                  onChange={(e) =>
                    setFormData({ ...formData, excerpt: e.target.value })
                  }
                  required
                />
              </div>
              <div style={{ marginBottom: "1rem" }}>
                <label style={{ display: "block", marginBottom: "0.4rem" }}>
                  Content (Markdown supported)
                </label>
                <textarea
                  className="form-control"
                  rows="8"
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                  required
                />
              </div>
              <div
                className="row row-2"
                style={{ gap: "1rem", marginBottom: "1.5rem" }}
              >
                <div>
                  <label style={{ display: "block", marginBottom: "0.4rem" }}>
                    Tags (comma separated)
                  </label>
                  <input
                    className="form-control"
                    value={formData.tags}
                    onChange={(e) =>
                      setFormData({ ...formData, tags: e.target.value })
                    }
                  />
                </div>
              </div>

              <FileUpload
                label="Cover Image"
                currentImage={formData.cover_image}
                onUploadSuccess={(url) =>
                  setFormData({ ...formData, cover_image: url })
                }
                folder="blogs"
              />

              <div style={{ marginBottom: "1.5rem" }}>
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    cursor: "pointer",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={formData.is_active}
                    onChange={(e) =>
                      setFormData({ ...formData, is_active: e.target.checked })
                    }
                    style={{ width: "auto" }}
                  />
                  <span style={{ fontSize: "0.9rem" }}>
                    Visible on Portfolio
                  </span>
                </label>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "1rem",
                }}
              >
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-gradient">
                  Save Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
