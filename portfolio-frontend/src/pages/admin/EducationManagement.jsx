import { useState, useEffect } from "react";
import { adminEducation } from "../../services/api";

export default function EducationManagement() {
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    total: 0,
  });
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentEdu, setCurrentEdu] = useState(null);
  const [formData, setFormData] = useState({
    is_active: true,
    institution: "",
    degree: "",
    field_of_study: "",
    start_year: "",
    end_year: "",
    grade: "",
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchEducation();
    }, 300); // Debounce search
    return () => clearTimeout(timer);
  }, [search, page]);

  const fetchEducation = async () => {
    setLoading(true);
    try {
      const res = await adminEducation.list({ search, page, per_page: 10 });
      // If server returned pagination object
      if (res.data.data) {
        setEducation(res.data.data);
        setPagination({
          current_page: res.data.current_page,
          last_page: res.data.last_page,
          total: res.data.total,
        });
      } else {
        setEducation(res.data);
      }
    } catch (err) {
      console.error("Failed to fetch education", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1); // Reset to first page on search
  };

  const handleEdit = (edu) => {
    setCurrentEdu(edu);
    setFormData({
      is_active: edu.is_active,
      institution: edu.institution,
      degree: edu.degree,
      field_of_study: edu.field_of_study,
      start_year: edu.start_year,
      end_year: edu.end_year || "",
      grade: edu.grade || "",
    });
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await adminEducation.delete(id);
      fetchEducation();
    } catch (err) {
      alert("Delete failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentEdu) {
        await adminEducation.update(currentEdu.id, formData);
      } else {
        await adminEducation.create(formData);
      }
      setModalOpen(false);
      fetchEducation();
    } catch (err) {
      alert("Save failed");
    }
  };

  if (loading && education.length === 0)
    return <div>Loading education history...</div>;

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
            placeholder="Search education..."
            value={search}
            onChange={handleSearchChange}
            style={{ borderRadius: 50, padding: "8px 20px" }}
          />
        </div>
        <button
          className="btn btn-gradient"
          onClick={() => {
            setCurrentEdu(null);
            setFormData({
              is_active: true,
              institution: "",
              degree: "",
              field_of_study: "",
              start_year: "",
              end_year: "",
              grade: "",
            });
            setModalOpen(true);
          }}
        >
          <i className="fas fa-plus"></i> Add Education
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
              <th style={{ padding: "1rem" }}>Degree & Institution</th>
              <th style={{ padding: "1rem" }}>Status</th>
              <th style={{ padding: "1rem" }}>Duration</th>
              <th style={{ padding: "1rem", textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {education.map((edu) => (
              <tr key={edu.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                <td style={{ padding: "1rem" }}>
                  <div style={{ fontWeight: 600 }}>
                    {edu.degree} in {edu.field_of_study}
                  </div>
                  <div
                    style={{ fontSize: "0.8rem", color: "var(--text-light)" }}
                  >
                    {edu.institution}
                  </div>
                </td>
                <td style={{ padding: "1rem" }}>
                  <span
                    className={`badge ${edu.is_active ? "badge-success" : "badge-secondary"}`}
                    style={{ fontSize: "0.7rem" }}
                  >
                    {edu.is_active ? "Active" : "Inactive"}
                  </span>
                </td>
                <td style={{ padding: "1rem" }}>
                  {edu.start_year} - {edu.end_year || "Present"}
                </td>
                <td style={{ padding: "1rem", textAlign: "right" }}>
                  <button
                    onClick={() => handleEdit(edu)}
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
                    onClick={() => handleDelete(edu.id)}
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
            style={{ maxWidth: 500, width: "95%", padding: "2rem" }}
          >
            <h4>{currentEdu ? "Edit Education" : "New Education"}</h4>
            <form onSubmit={handleSubmit} style={{ marginTop: "1.5rem" }}>
              <div style={{ marginBottom: "1rem" }}>
                <label>Institution</label>
                <input
                  className="form-control"
                  value={formData.institution}
                  onChange={(e) =>
                    setFormData({ ...formData, institution: e.target.value })
                  }
                  required
                />
              </div>
              <div
                className="row row-2"
                style={{ gap: "1rem", marginBottom: "1rem" }}
              >
                <div>
                  <label>Degree</label>
                  <input
                    className="form-control"
                    value={formData.degree}
                    onChange={(e) =>
                      setFormData({ ...formData, degree: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <label>Field of Study</label>
                  <input
                    className="form-control"
                    value={formData.field_of_study}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        field_of_study: e.target.value,
                      })
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
                  <label>Start Year</label>
                  <input
                    className="form-control"
                    value={formData.start_year}
                    onChange={(e) =>
                      setFormData({ ...formData, start_year: e.target.value })
                    }
                    placeholder="2020"
                    required
                  />
                </div>
                <div>
                  <label>End Year (optional)</label>
                  <input
                    className="form-control"
                    value={formData.end_year}
                    onChange={(e) =>
                      setFormData({ ...formData, end_year: e.target.value })
                    }
                    placeholder="2024"
                  />
                </div>
              </div>
              <div style={{ marginBottom: "1.5rem" }}>
                <label>Grade / CGPA (optional)</label>
                <input
                  className="form-control"
                  value={formData.grade}
                  onChange={(e) =>
                    setFormData({ ...formData, grade: e.target.value })
                  }
                  placeholder="3.8/4.0"
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
                  Save Education
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
