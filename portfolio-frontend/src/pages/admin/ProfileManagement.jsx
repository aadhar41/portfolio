import { useState, useEffect } from "react";
import { getProfile, updateProfile } from "../../services/api";
import FileUpload from "../../components/admin/FileUpload";

export default function ProfileManagement() {
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    bio: "",
    email: "",
    phone: "",
    location: "",
    github_url: "",
    linkedin_url: "",
    avatar: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await getProfile();
      const p = res.data.profile;
      setFormData({
        name: p.name,
        title: p.title,
        bio: p.bio,
        email: p.email,
        phone: p.phone || "",
        location: p.location || "",
        github_url: p.github_url || "",
        linkedin_url: p.linkedin_url || "",
        avatar: p.avatar || "",
      });
    } catch (err) {
      console.error("Failed to fetch profile", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: "", text: "" });
    try {
      await updateProfile(formData);
      setMessage({ type: "success", text: "Profile updated successfully!" });
    } catch (err) {
      setMessage({
        type: "error",
        text: "Update failed. Please check the form.",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Loading profile data...</div>;

  return (
    <div
      className="card"
      style={{
        maxWidth: 800,
        padding: "2rem",
        margin: "0 auto",
        height: "auto",
        overflow: "visible",
      }}
    >
      <h4 style={{ marginBottom: "1.5rem" }}>Personal Information</h4>

      {message.text && (
        <div
          style={{
            padding: "1rem",
            borderRadius: 8,
            marginBottom: "1.5rem",
            background: message.type === "success" ? "#dcfce7" : "#fee2e2",
            color: message.type === "success" ? "#166534" : "#991b1b",
            fontSize: "0.9rem",
          }}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div
          className="row row-2"
          style={{ gap: "1.5rem", marginBottom: "1rem" }}
        >
          <div>
            <label>Full Name</label>
            <input
              className="form-control"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </div>
          <div>
            <label>Professional Title</label>
            <input
              className="form-control"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
            />
          </div>
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label>Bio / About Me</label>
          <textarea
            className="form-control"
            rows="5"
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            required
          />
        </div>

        <div
          className="row row-3"
          style={{ gap: "1rem", marginBottom: "1rem" }}
        >
          <div>
            <label>Email</label>
            <input
              className="form-control"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>
          <div>
            <label>Phone</label>
            <input
              className="form-control"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
          </div>
          <div>
            <label>Location</label>
            <input
              className="form-control"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
            />
          </div>
        </div>

        <div
          className="row row-3"
          style={{ gap: "1rem", marginBottom: "1.5rem" }}
        >
          <div>
            <label>GitHub URL</label>
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
            <label>LinkedIn URL</label>
            <input
              className="form-control"
              type="url"
              value={formData.linkedin_url}
              onChange={(e) =>
                setFormData({ ...formData, linkedin_url: e.target.value })
              }
            />
          </div>
        </div>

        <FileUpload
          label="Profile Picture (Avatar)"
          currentImage={formData.avatar}
          onUploadSuccess={(url) => setFormData({ ...formData, avatar: url })}
          folder="avatars"
        />

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button type="submit" className="btn btn-gradient" disabled={saving}>
            {saving ? "Updating..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
