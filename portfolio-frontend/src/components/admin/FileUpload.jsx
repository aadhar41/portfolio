import { useState } from "react";
import { uploadFile } from "../../services/api";

export default function FileUpload({ onUploadSuccess, currentImage, folder = "uploads", label = "Image" }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) { setError("Please select an image file."); return; }
    if (file.size > 2 * 1024 * 1024) { setError("File too large (max 2 MB)."); return; }
    setUploading(true); setError(null);
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
    <div className="mb-4">
      <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-2">{label}</label>
      <div className="flex items-center gap-3">
        {currentImage && (
          <div className="shrink-0 w-14 h-14 rounded-xl overflow-hidden border border-slate-200 bg-slate-50">
            <img src={currentImage} alt="Preview" className="w-full h-full object-cover" />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <label className={`flex items-center gap-2 px-4 py-2.5 border-2 border-dashed rounded-xl cursor-pointer transition-colors ${uploading ? "border-indigo-300 bg-indigo-50" : "border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50"}`}>
            {uploading ? (
              <>
                <svg className="animate-spin w-4 h-4 text-indigo-600 shrink-0" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="40 20" />
                </svg>
                <span className="text-sm text-indigo-600 font-medium">Uploading…</span>
              </>
            ) : (
              <>
                <i className="fas fa-cloud-upload-alt text-slate-400 shrink-0" />
                <span className="text-sm text-slate-500 truncate">{currentImage ? "Click to change image" : "Click to upload"}</span>
              </>
            )}
            <input type="file" accept="image/*" onChange={handleFileChange} disabled={uploading} className="hidden" />
          </label>
          {error && <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1"><i className="fas fa-exclamation-circle" />{error}</p>}
        </div>
      </div>
    </div>
  );
}
