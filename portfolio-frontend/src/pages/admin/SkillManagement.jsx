import { useState, useEffect } from "react";
import { adminSkills, getProfile } from "../../services/api";
import AdminFilterBar from "../../components/admin/AdminFilterBar";
import LoadingOverlay from "../../components/admin/LoadingOverlay";
import PageLoader from "../../components/admin/PageLoader";
import { toast } from "react-toastify";

export default function SkillManagement() {
  const [skills, setSkills] = useState([]);
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
  const [modalOpen, setModalOpen] = useState(false);
  const [currentSkill, setCurrentSkill] = useState(null);
  const [formData, setFormData] = useState({
    is_active: true,
    name: "",
    category: "backend",
    icon_class: "",
    proficiency: 80,
    sort_order: 0,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchSkills();
    }, 300); // Debounce search
    return () => clearTimeout(timer);
  }, [search, page, perPage, statusFilter]);

  const fetchSkills = async () => {
    setLoading(true);
    try {
      // Use specific admin list params to trigger pagination and search
      const res = await adminSkills.list({
        search,
        page,
        per_page: perPage,
        is_active: statusFilter,
      });
      if (res.data.data) {
        setSkills(res.data.data);
        setPagination({
          current_page: res.data.current_page,
          last_page: res.data.last_page,
          total: res.data.total,
        });
      } else {
        setSkills(res.data);
      }
    } catch (err) {
      console.error("Failed to fetch skills", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1); // Reset to first page on search
  };

  const handleEdit = (skill) => {
    setCurrentSkill(skill);
    setFormData({
      is_active: skill.is_active,
      name: skill.name,
      category: skill.category,
      icon_class: skill.icon_class || "",
      proficiency: skill.proficiency,
      sort_order: skill.sort_order,
    });
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await adminSkills.delete(id);
      fetchSkills();
      toast.success("Skill deleted successfully!");
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentSkill) {
        await adminSkills.update(currentSkill.id, formData);
      } else {
        await adminSkills.create(formData);
      }
      setModalOpen(false);
      fetchSkills();
      toast.success(
        currentSkill
          ? "Skill updated successfully!"
          : "Skill created successfully!",
      );
    } catch (err) {
      toast.error("Save failed. Please check the form.");
    }
  };

  if (loading && skills.length === 0) return <PageLoader />;

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
          setCurrentSkill(null);
          setFormData({
            is_active: true,
            name: "",
            category: "backend",
            icon_class: "",
            proficiency: 80,
            sort_order: 0,
          });
          setModalOpen(true);
        }}
        addNewText="Add Skill"
        filters={[
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
          setStatusFilter(val);
          setPage(1);
        }}
      />

      <div
        className="card"
        style={{ overflow: "hidden", position: "relative" }}
      >
        <LoadingOverlay active={loading && skills.length > 0} />
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
              <th style={{ padding: "1rem" }}>Skill Name</th>
              <th style={{ padding: "1rem" }}>Category</th>
              <th style={{ padding: "1rem" }}>Status</th>
              <th style={{ padding: "1rem" }}>Proficiency</th>
              <th style={{ padding: "1rem", textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {skills.map((skill) => (
              <tr key={skill.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                <td style={{ padding: "1rem", fontWeight: 600 }}>
                  <i
                    className={`${skill.icon_class} mr-1`}
                    style={{ width: 20 }}
                  ></i>{" "}
                  {skill.name}
                </td>
                <td style={{ padding: "1rem", textTransform: "capitalize" }}>
                  {skill.category}
                </td>
                <td style={{ padding: "1rem" }}>
                  <span
                    className={`badge ${skill.is_active ? "badge-gradient" : "badge-secondary"}`}
                    style={{ fontSize: "0.7rem" }}
                  >
                    {skill.is_active ? "Active" : "Inactive"}
                  </span>
                </td>
                <td style={{ padding: "1rem" }}>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 10 }}
                  >
                    <div
                      style={{
                        flex: 1,
                        height: 6,
                        background: "#e2e8f0",
                        borderRadius: 3,
                        maxWidth: 100,
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          width: `${skill.proficiency}%`,
                          background: "var(--gradient)",
                          borderRadius: 3,
                        }}
                      ></div>
                    </div>
                    <span>{skill.proficiency}%</span>
                  </div>
                </td>
                <td style={{ padding: "1rem", textAlign: "right" }}>
                  <button
                    onClick={() => handleEdit(skill)}
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
                    onClick={() => handleDelete(skill.id)}
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
            style={{ maxWidth: 450, width: "95%", padding: "2rem" }}
          >
            <h4>{currentSkill ? "Edit Skill" : "New Skill"}</h4>
            <form onSubmit={handleSubmit} style={{ marginTop: "1.5rem" }}>
              <div style={{ marginBottom: "1rem" }}>
                <label>Skill Name</label>
                <input
                  className="form-control"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>
              <div
                className="row row-2"
                style={{ gap: "1rem", marginBottom: "1rem" }}
              >
                <div>
                  <label>Category</label>
                  <select
                    className="form-control"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                  >
                    <option value="frontend">Frontend</option>
                    <option value="backend">Backend</option>
                    <option value="database">Database</option>
                    <option value="devops">DevOps</option>
                    <option value="tools">Tools</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label>Proficiency (%)</label>
                  <input
                    type="number"
                    className="form-control"
                    value={formData.proficiency}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        proficiency: parseInt(e.target.value),
                      })
                    }
                    min="0"
                    max="100"
                  />
                </div>
              </div>
              <div style={{ marginBottom: "1.5rem" }}>
                <label>Icon Class (FontAwesome)</label>
                <input
                  className="form-control"
                  value={formData.icon_class}
                  onChange={(e) =>
                    setFormData({ ...formData, icon_class: e.target.value })
                  }
                  placeholder="fab fa-react"
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
                  Save Skill
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
