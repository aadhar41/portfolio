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
            <div style={{ width: 20, height: 20, marginTop: "0.2rem" }}>
              <svg
                fill="hsl(228, 97%, 42%)"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
                  opacity=".25"
                />
                <path d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z">
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    dur="0.75s"
                    values="0 12 12;360 12 12"
                    repeatCount="indefinite"
                  />
                </path>
              </svg>
            </div>
          )}
          {error && (
            <small style={{ color: "var(--danger-color)" }}>{error}</small>
          )}
        </div>
      </div>
    </div>
  );
}
