import { useState, useEffect } from "react";
import { adminSkills, getProfile } from "../../services/api";

export default function SkillManagement() {
  const [skillsByGroup, setSkillsByGroup] = useState({});
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentSkill, setCurrentSkill] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "backend",
    icon_class: "",
    proficiency: 80,
    sort_order: 0,
  });

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    setLoading(true);
    try {
      const res = await getProfile();
      setSkillsByGroup(res.data.skills);
    } catch (err) {
      console.error("Failed to fetch skills", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (skill) => {
    setCurrentSkill(skill);
    setFormData({
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
    } catch (err) {
      alert("Delete failed");
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
    } catch (err) {
      alert("Save failed");
    }
  };

  if (loading && Object.keys(skillsByGroup).length === 0)
    return <div>Loading skills...</div>;

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "1.5rem",
        }}
      >
        <p style={{ color: "var(--text-light)" }}>
          Manage your technical skills
        </p>
        <button
          className="btn btn-gradient"
          onClick={() => {
            setCurrentSkill(null);
            setFormData({
              name: "",
              category: "backend",
              icon_class: "",
              proficiency: 80,
              sort_order: 0,
            });
            setModalOpen(true);
          }}
        >
          <i className="fas fa-plus"></i> Add Skill
        </button>
      </div>

      {Object.entries(skillsByGroup).map(([category, skills]) => (
        <div
          key={category}
          className="card"
          style={{ marginBottom: "2rem", padding: "1.5rem" }}
        >
          <h5
            style={{
              textTransform: "capitalize",
              marginBottom: "1rem",
              borderBottom: "1px solid #eee",
              paddingBottom: "0.5rem",
            }}
          >
            {category}
          </h5>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: "1rem",
            }}
          >
            {skills.map((skill) => (
              <div
                key={skill.id}
                style={{
                  padding: "1rem",
                  background: "#f8fafc",
                  borderRadius: "8px",
                  border: "1px solid #e2e8f0",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <div style={{ fontWeight: 600 }}>{skill.name}</div>
                  <small style={{ color: "var(--text-light)" }}>
                    {skill.proficiency}% Proficiency
                  </small>
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                  <i
                    className="fas fa-edit"
                    onClick={() => handleEdit(skill)}
                    style={{ color: "#6366f1", cursor: "pointer" }}
                  ></i>
                  <i
                    className="fas fa-trash"
                    onClick={() => handleDelete(skill.id)}
                    style={{ color: "#ef4444", cursor: "pointer" }}
                  ></i>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

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
    </div>
  );
}
