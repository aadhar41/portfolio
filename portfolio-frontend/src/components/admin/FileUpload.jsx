import { useState } from "react";
import { uploadFile } from "../../services/api";

export default function FileUpload({
  onUploadSuccess,
  currentImage,
  folder = "uploads",
  label = "Image",
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Basic validation
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file.");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setError("File is too large (max 2MB).");
      return;
    }

    setUploading(true);
    setError(null);

    try {
      const res = await uploadFile(file, folder);
      onUploadSuccess(res.data.url);
    } catch (err) {
      setError(err.response?.data?.message || "Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ marginBottom: "1rem" }}>
      <label style={{ display: "block", marginBottom: "0.4rem" }}>
        {label}
      </label>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        {currentImage && (
          <div
            style={{
              width: 60,
              height: 60,
              borderRadius: 8,
              overflow: "hidden",
              border: "1px solid #e2e8f0",
            }}
          >
            <img
              src={currentImage}
              alt="Preview"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        )}
        <div style={{ flex: 1 }}>
          <input
            type="file"
            className="form-control"
            accept="image/*"
            onChange={handleFileChange}
            disabled={uploading}
          />
          {uploading && (
            <small style={{ color: "var(--primary-color)" }}>
              Uploading...
            </small>
          )}
          {error && (
            <small style={{ color: "var(--danger-color)" }}>{error}</small>
          )}
        </div>
      </div>
    </div>
  );
}
