import { useState, useEffect } from "react";
import { adminExperience } from "../../services/api";

export default function ExperienceManagement() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    total: 0,
  });
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentExp, setCurrentExp] = useState(null);
  const [formData, setFormData] = useState({
    is_active: true,
    company: "",
    position: "",
    description: "",
    start_date: "",
    end_date: "",
    is_current: false,
    technologies: "",
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchExperiences();
    }, 300); // Debounce search
    return () => clearTimeout(timer);
  }, [search, page]);

  const fetchExperiences = async () => {
    setLoading(true);
    try {
      const res = await adminExperience.list({ search, page, per_page: 10 });
      // If server returned pagination object
      if (res.data.data) {
        setExperiences(res.data.data);
        setPagination({
          current_page: res.data.current_page,
          last_page: res.data.last_page,
          total: res.data.total,
        });
      } else {
        setExperiences(res.data);
      }
    } catch (err) {
      console.error("Failed to fetch experiences", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1); // Reset to first page on search
  };

  const handleEdit = (exp) => {
    setCurrentExp(exp);
    setFormData({
      is_active: exp.is_active,
      company: exp.company,
      position: exp.position,
      description: exp.description,
      start_date: exp.start_date,
      end_date: exp.end_date || "",
      is_current: exp.is_current,
      technologies: (exp.technologies || []).join(", "),
    });
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await adminExperience.delete(id);
      fetchExperiences();
    } catch (err) {
      alert("Delete failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      ...formData,
      technologies: formData.technologies
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t),
    };

    try {
      if (currentExp) {
        await adminExperience.update(currentExp.id, data);
      } else {
        await adminExperience.create(data);
      }
      setModalOpen(false);
      fetchExperiences();
    } catch (err) {
      alert("Save failed");
    }
  };

  if (loading && experiences.length === 0)
    return <div>Loading professional history...</div>;

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1.5rem",
          gap: "1rem",
        }}
      >
        <div style={{ flex: 1, maxWidth: 300 }}>
          <input
            className="form-control"
            placeholder="Search experience..."
            value={search}
            onChange={handleSearchChange}
            style={{ borderRadius: 50, padding: "8px 20px" }}
          />
        </div>
        <button
          className="btn btn-gradient"
          onClick={() => {
            setCurrentExp(null);
            setFormData({
              is_active: true,
              company: "",
              position: "",
              description: "",
              start_date: "",
              end_date: "",
              is_current: false,
              technologies: "",
            });
            setModalOpen(true);
          }}
        >
          <i className="fas fa-plus"></i> Add Experience
        </button>
      </div>

      <div className="card" style={{ overflow: "hidden" }}>
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
              <th style={{ padding: "1rem" }}>Position & Company</th>
              <th style={{ padding: "1rem" }}>Status</th>
              <th style={{ padding: "1rem" }}>Duration</th>
              <th style={{ padding: "1rem", textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {experiences.map((exp) => (
              <tr key={exp.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                <td style={{ padding: "1rem" }}>
                  <div style={{ fontWeight: 600 }}>{exp.position}</div>
                  <div
                    style={{ fontSize: "0.8rem", color: "var(--text-light)" }}
                  >
                    {exp.company}
                  </div>
                </td>
                <td style={{ padding: "1rem" }}>
                  <span
                    className={`badge ${exp.is_active ? "badge-success" : "badge-secondary"}`}
                    style={{ fontSize: "0.7rem" }}
                  >
                    {exp.is_active ? "Active" : "Inactive"}
                  </span>
                </td>
                <td style={{ padding: "1rem" }}>
                  {exp.start_date} - {exp.is_current ? "Present" : exp.end_date}
                </td>
                <td style={{ padding: "1rem", textAlign: "right" }}>
                  <button
                    onClick={() => handleEdit(exp)}
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
                    onClick={() => handleDelete(exp.id)}
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
              maxWidth: 600,
              width: "95%",
              padding: "2rem",
              maxHeight: "90vh",
              overflowY: "auto",
            }}
          >
            <h4>{currentExp ? "Edit Experience" : "New Experience"}</h4>
            <form onSubmit={handleSubmit} style={{ marginTop: "1.5rem" }}>
              <div
                className="row row-2"
                style={{ gap: "1rem", marginBottom: "1rem" }}
              >
                <div>
                  <label>Company</label>
                  <input
                    className="form-control"
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <label>Position</label>
                  <input
                    className="form-control"
                    value={formData.position}
                    onChange={(e) =>
                      setFormData({ ...formData, position: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
              <div
                className="row row-2"
                style={{ gap: "1rem", marginBottom: "1rem" }}
              >
                <div>
                  <label>Start Date</label>
                  <input
                    className="form-control"
                    value={formData.start_date}
                    onChange={(e) =>
                      setFormData({ ...formData, start_date: e.target.value })
                    }
                    placeholder="January 2024"
                    required
                  />
                </div>
                <div>
                  <label>End Date</label>
                  <input
                    className="form-control"
                    value={formData.end_date}
                    onChange={(e) =>
                      setFormData({ ...formData, end_date: e.target.value })
                    }
                    placeholder="March 2025"
                    disabled={formData.is_current}
                  />
                  <div
                    style={{
                      marginTop: 5,
                      display: "flex",
                      alignItems: "center",
                      fontSize: "0.8rem",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={formData.is_current}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          is_current: e.target.checked,
                          end_date: e.target.checked ? "" : formData.end_date,
                        })
                      }
                    />
                    <span style={{ marginLeft: 5 }}>I currently work here</span>
                  </div>
                </div>
              </div>
              <div style={{ marginBottom: "1rem" }}>
                <label>Description (Amesome achievements)</label>
                <textarea
                  className="form-control"
                  rows="4"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  required
                />
              </div>
              <div style={{ marginBottom: "1.5rem" }}>
                <label>Technologies (comma separated)</label>
                <input
                  className="form-control"
                  value={formData.technologies}
                  onChange={(e) =>
                    setFormData({ ...formData, technologies: e.target.value })
                  }
                  placeholder="Laravel, React, AWS"
                />
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
                  Save Experience
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
