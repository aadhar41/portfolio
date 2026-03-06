import { useState, useEffect } from "react";
import { adminProjects, getProjects } from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import FileUpload from "../../components/admin/FileUpload";
import AdminFilterBar from "../../components/admin/AdminFilterBar";
import LoadingOverlay from "../../components/admin/LoadingOverlay";
import PageLoader from "../../components/admin/PageLoader";
import { toast } from "react-toastify";

export default function ProjectManagement() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    total: 0,
  });
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [statusFilter, setStatusFilter] = useState(""); // "" for all, "1" for active, "0" for inactive
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [formData, setFormData] = useState({
    is_active: true,
    title: "",
    description: "",
    category: "web",
    technologies: "",
    github_url: "",
    live_url: "",
    image: "",
    featured: false,
  });
  const { user } = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProjects();
    }, 300); // Debounce search
    return () => clearTimeout(timer);
  }, [search, page, perPage, statusFilter, categoryFilter]);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await adminProjects.list({
        search,
        page,
        per_page: perPage,
        is_active: statusFilter,
        category: categoryFilter,
      });
      // If server returned pagination object
      if (res.data.data) {
        setProjects(res.data.data);
        setPagination({
          current_page: res.data.current_page,
          last_page: res.data.last_page,
          total: res.data.total,
        });
      } else {
        setProjects(res.data);
      }
    } catch (err) {
      console.error("Failed to fetch projects", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1); // Reset to first page on search
  };

  // ... (handleEdit, handleDelete, handleSubmit remain similar)
  const handleEdit = (project) => {
    setCurrentProject(project);
    setFormData({
      is_active: project.is_active,
      title: project.title,
      description: project.description,
      category: project.category,
      technologies: project.technologies.join(", "),
      github_url: project.github_url || "",
      live_url: project.live_url || "",
      image: project.image || "",
      featured: project.featured,
    });
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?"))
      return;
    try {
      await adminProjects.delete(id);
      fetchProjects();
      toast.success("Project deleted successfully!");
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      ...formData,
      technologies:
        typeof formData.technologies === "string"
          ? formData.technologies
              .split(",")
              .map((t) => t.trim())
              .filter((t) => t)
          : formData.technologies,
      featured: !!formData.featured,
    };

    try {
      if (currentProject) {
        await adminProjects.update(currentProject.id, data);
      } else {
        await adminProjects.create(data);
      }
      setModalOpen(false);
      fetchProjects();
      toast.success(
        currentProject
          ? "Project updated successfully!"
          : "Project created successfully!",
      );
    } catch (err) {
      toast.error(
        "Save failed: " + (err.response?.data?.message || "Unknown error"),
      );
    }
  };

  if (loading && projects.length === 0) return <PageLoader />;

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
          setCurrentProject(null);
          setFormData({
            is_active: true,
            title: "",
            description: "",
            category: "web",
            technologies: "",
            github_url: "",
            live_url: "",
            image: "",
            featured: false,
          });
          setModalOpen(true);
        }}
        addNewText="Add Project"
        filters={[
          {
            name: "category",
            label: "All Categories",
            value: categoryFilter,
            options: [
              { label: "Web", value: "web" },
              { label: "Mobile", value: "mobile" },
              { label: "API", value: "api" },
            ],
          },
          {
            name: "is_active",
            label: "All Status",
            value: statusFilter,
            options: [
              { label: "Active", value: "1" },
              { label: "Inactive", value: "0" },
            ],
          },
        ]}
        onFilterChange={(name, val) => {
          if (name === "category") setCategoryFilter(val);
          if (name === "is_active") setStatusFilter(val);
          setPage(1);
        }}
      />

      <div
        className="card"
        style={{ overflow: "hidden", position: "relative" }}
      >
        <LoadingOverlay active={loading && projects.length > 0} />
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
              <th style={{ padding: "1rem" }}>Category</th>
              <th style={{ padding: "1rem" }}>Technologies</th>
              <th style={{ padding: "1rem" }}>Status</th>
              <th style={{ padding: "1rem", textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p) => (
              <tr key={p.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                <td style={{ padding: "1rem", fontWeight: 600 }}>{p.title}</td>
                <td style={{ padding: "1rem", textTransform: "capitalize" }}>
                  {p.category}
                </td>
                <td style={{ padding: "1rem" }}>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                    {p.technologies.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="badge badge-primary"
                        style={{ fontSize: "0.7rem" }}
                      >
                        {t}
                      </span>
                    ))}
                    {p.technologies.length > 3 && <span>...</span>}
                  </div>
                </td>
                <td style={{ padding: "1rem" }}>
                  <div
                    style={{ display: "flex", flexDirection: "column", gap: 4 }}
                  >
                    {p.featured && (
                      <span
                        className="badge badge-gradient"
                        style={{ fontSize: "0.7rem" }}
                      >
                        ★ Featured
                      </span>
                    )}
                    <span
                      className={`badge ${p.is_active ? "badge-success" : "badge-secondary"}`}
                      style={{ fontSize: "0.7rem" }}
                    >
                      {p.is_active ? "Active" : "Inactive"}
                    </span>
                  </div>
                </td>
                <td style={{ padding: "1rem", textAlign: "right" }}>
                  <button
                    onClick={() => handleEdit(p)}
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
                    onClick={() => handleDelete(p.id)}
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

      {/* Simple Modal */}
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
              maxWidth: 600,
              width: "95%",
              padding: "2rem",
              maxHeight: "90vh",
              overflowY: "auto",
            }}
          >
            <h4 style={{ marginBottom: "1.5rem" }}>
              {currentProject ? "Edit Project" : "New Project"}
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
              <div style={{ marginBottom: "1rem" }}>
                <label style={{ display: "block", marginBottom: "0.4rem" }}>
                  Description
                </label>
                <textarea
                  className="form-control"
                  rows="3"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  required
                />
              </div>
              <FileUpload
                label="Project Thumbnail"
                currentImage={formData.image}
                onUploadSuccess={(url) =>
                  setFormData({ ...formData, image: url })
                }
                folder="projects"
              />
              <div
                className="row row-2"
                style={{ gap: "1rem", marginBottom: "1rem" }}
              >
                <div>
                  <label style={{ display: "block", marginBottom: "0.4rem" }}>
                    Category
                  </label>
                  <select
                    className="form-control"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                  >
                    <option value="web">Web</option>
                    <option value="mobile">Mobile</option>
                    <option value="api">API</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: "block", marginBottom: "0.4rem" }}>
                    Featured
                  </label>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      height: "42px",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) =>
                        setFormData({ ...formData, featured: e.target.checked })
                      }
                      style={{ width: 20, height: 20 }}
                    />
                    <span style={{ marginLeft: 8 }}>Highlight Project</span>
                  </div>
                </div>
              </div>
              <div style={{ marginBottom: "1rem" }}>
                <label style={{ display: "block", marginBottom: "0.4rem" }}>
                  Technologies (comma separated)
                </label>
                <input
                  className="form-control"
                  value={formData.technologies}
                  onChange={(e) =>
                    setFormData({ ...formData, technologies: e.target.value })
                  }
                  placeholder="React, Laravel, MySQL"
                />
              </div>
              <div
                className="row row-2"
                style={{ gap: "1rem", marginBottom: "1.5rem" }}
              >
                <div>
                  <label style={{ display: "block", marginBottom: "0.4rem" }}>
                    GitHub URL
                  </label>
                  <input
                    className="form-control"
                    type="url"
                    value={formData.github_url}
                    onChange={(e) =>
                      setFormData({ ...formData, github_url: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label style={{ display: "block", marginBottom: "0.4rem" }}>
                    Live URL
                  </label>
                  <input
                    className="form-control"
                    type="url"
                    value={formData.live_url}
                    onChange={(e) =>
                      setFormData({ ...formData, live_url: e.target.value })
                    }
                  />
                </div>
              </div>

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
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
