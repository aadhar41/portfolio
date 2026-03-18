import { useState, useEffect } from "react";
import { getProfile, updateProfile } from "../../services/api";
import FileUpload from "../../components/admin/FileUpload";
import PageLoader from "../../components/admin/PageLoader";
import { toast } from "react-toastify";

const inputCls = "w-full border border-theme rounded-xl px-3.5 py-2.5 text-sm text-theme focus:outline-none focus:ring-2 focus:focus-ring-accent focus:border-transparent transition-all bg-theme";
function Field({ label, icon, children }) {
  return (
    <div className="mb-4">
      <label className="flex items-center gap-1.5 text-xs font-semibold text-theme-muted uppercase tracking-wide mb-1.5">
        {icon && <i className={`${icon} text-indigo-400`} />} {label}
      </label>
      {children}
    </div>
  );
}
function Section({ title, icon, children }) {
  return (
    <div className="bg-surface rounded-2xl border border-theme shadow-sm p-6 mb-5">
      <div className="flex items-center gap-2 mb-5 pb-4 border-b border-theme">
        <div className="w-7 h-7 rounded-lg bg-theme flex items-center justify-center border border-theme">
          <i className={`${icon} text-indigo-400 text-xs`} />
        </div>
        <h3 className="text-sm font-bold text-theme">{title}</h3>
      </div>
      {children}
    </div>
  );
}

export default function ProfileManagement() {
  const [formData, setFormData] = useState({ name: "", title: "", bio: "", email: "", phone: "", location: "", github_url: "", linkedin_url: "", avatar: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fd = (patch) => setFormData((p) => ({ ...p, ...patch }));

  useEffect(() => {
    (async () => {
      try {
        const res = await getProfile();
        const p = res.data.profile;
        setFormData({ name: p.name, title: p.title, bio: p.bio, email: p.email, phone: p.phone || "", location: p.location || "", github_url: p.github_url || "", linkedin_url: p.linkedin_url || "", avatar: p.avatar || "" });
      } catch (err) { console.error("Failed to fetch profile", err); }
      finally { setLoading(false); }
    })();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try { await updateProfile(formData); toast.success("Profile updated successfully!"); }
    catch { toast.error("Update failed. Please check the form."); }
    finally { setSaving(false); }
  };

  if (loading) return <PageLoader />;

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
      <Section title="Personal Information" icon="fas fa-user">
        <div className="grid grid-cols-2 gap-4">
          <Field label="Full Name" icon="fas fa-id-card"><input className={inputCls} value={formData.name} onChange={(e) => fd({ name: e.target.value })} required /></Field>
          <Field label="Professional Title" icon="fas fa-briefcase"><input className={inputCls} value={formData.title} onChange={(e) => fd({ title: e.target.value })} required /></Field>
        </div>
        <Field label="Bio / About Me" icon="fas fa-align-left">
          <textarea className={inputCls} rows={5} value={formData.bio} onChange={(e) => fd({ bio: e.target.value })} required />
        </Field>
      </Section>

      <Section title="Contact Details" icon="fas fa-address-card">
        <div className="grid grid-cols-3 gap-4">
          <Field label="Email" icon="fas fa-envelope"><input className={inputCls} type="email" value={formData.email} onChange={(e) => fd({ email: e.target.value })} required /></Field>
          <Field label="Phone" icon="fas fa-phone"><input className={inputCls} value={formData.phone} onChange={(e) => fd({ phone: e.target.value })} /></Field>
          <Field label="Location" icon="fas fa-map-marker-alt"><input className={inputCls} value={formData.location} onChange={(e) => fd({ location: e.target.value })} /></Field>
        </div>
      </Section>

      <Section title="Social Links" icon="fas fa-link">
        <div className="grid grid-cols-2 gap-4">
          <Field label="GitHub URL" icon="fab fa-github"><input className={inputCls} type="url" value={formData.github_url} onChange={(e) => fd({ github_url: e.target.value })} placeholder="https://github.com/…" /></Field>
          <Field label="LinkedIn URL" icon="fab fa-linkedin"><input className={inputCls} type="url" value={formData.linkedin_url} onChange={(e) => fd({ linkedin_url: e.target.value })} placeholder="https://linkedin.com/in/…" /></Field>
        </div>
      </Section>

      <Section title="Profile Picture" icon="fas fa-image">
        <div className="flex items-center gap-6">
          {formData.avatar && (
            <div className="shrink-0 w-20 h-20 rounded-2xl overflow-hidden border-2 border-theme shadow-md">
              <img src={formData.avatar} alt="Avatar" className="w-full h-full object-cover" />
            </div>
          )}
          <div className="flex-1">
            <FileUpload label="Avatar Image" currentImage={formData.avatar} onUploadSuccess={(url) => fd({ avatar: url })} folder="avatars" />
          </div>
        </div>
      </Section>

      <div className="flex justify-end">
        <button type="submit" disabled={saving} className="clay-button-primary flex items-center gap-2 px-6 py-3 !rounded-xl font-semibold hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none transition-all duration-200">
          {saving ? <><svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="white" strokeWidth="3" strokeDasharray="40 20" /></svg> Saving…</> : <><i className="fas fa-save" /> Save Changes</>}
        </button>
      </div>
    </form>
  );
}
