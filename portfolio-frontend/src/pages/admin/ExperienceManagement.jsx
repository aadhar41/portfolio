import { useState, useEffect } from "react";
import { adminExperience } from "../../services/api";
import AdminFilterBar from "../../components/admin/AdminFilterBar";
import LoadingOverlay from "../../components/admin/LoadingOverlay";
import PageLoader from "../../components/admin/PageLoader";
import Pagination from "../../components/admin/Pagination";
import { toast } from "react-toastify";

const EMPTY_FORM = { is_active: true, company: "", position: "", description: "", start_date: "", end_date: "", is_current: false, technologies: "" };

function Modal({ open, onClose, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="bg-surface rounded-2xl w-full max-w-2xl max-h-[92vh] overflow-y-auto shadow-2xl border border-theme">{children}</div>
    </div>
  );
}
const inputCls = "w-full border border-theme rounded-xl px-3.5 py-2.5 text-sm text-theme focus:outline-none focus:ring-2 focus:focus-ring-accent focus:border-transparent transition-all bg-theme";
function Field({ label, children }) {
  return <div className="mb-4"><label className="block text-xs font-semibold text-theme-muted uppercase tracking-wide mb-1.5">{label}</label>{children}</div>;
}

export default function ExperienceManagement() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ current_page: 1, last_page: 1, total: 0 });
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [statusFilter, setStatusFilter] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [currentExp, setCurrentExp] = useState(null);
  const [formData, setFormData] = useState(EMPTY_FORM);

  const fd = (patch) => setFormData((p) => ({ ...p, ...patch }));

  useEffect(() => { const t = setTimeout(fetchExperiences, 300); return () => clearTimeout(t); }, [search, page, perPage, statusFilter]);

  const fetchExperiences = async () => {
    setLoading(true);
    try {
      const res = await adminExperience.list({ search, page, per_page: perPage, is_active: statusFilter });
      if (res.data.data) { setExperiences(res.data.data); setPagination({ current_page: res.data.current_page, last_page: res.data.last_page, total: res.data.total }); }
      else { setExperiences(res.data); }
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const openCreate = () => { setCurrentExp(null); setFormData(EMPTY_FORM); setModalOpen(true); };
  const openEdit = (exp) => {
    setCurrentExp(exp);
    setFormData({ is_active: exp.is_active, company: exp.company, position: exp.position, description: exp.description, start_date: exp.start_date, end_date: exp.end_date || "", is_current: exp.is_current, technologies: (exp.technologies || []).join(", ") });
    setModalOpen(true);
  };
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this experience record?")) return;
    try { await adminExperience.delete(id); fetchExperiences(); toast.success("Experience deleted!"); }
    catch { toast.error("Delete failed"); }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { ...formData, technologies: formData.technologies.split(",").map((t) => t.trim()).filter(Boolean) };
    try {
      if (currentExp) { await adminExperience.update(currentExp.id, data); } else { await adminExperience.create(data); }
      setModalOpen(false); fetchExperiences();
      toast.success(currentExp ? "Experience updated!" : "Experience created!");
    } catch { toast.error("Save failed"); }
  };

  const handleClearFilters = () => {
    setSearch("");
    setPage(1);
    setStatusFilter("");
    setPerPage(10);
  };

  if (loading && experiences.length === 0) return <PageLoader />;

  return (
    <>
      <AdminFilterBar
        search={search} onSearchChange={setSearch}
        perPage={perPage} onPerPageChange={(v) => { setPerPage(v); setPage(1); }}
        onAddNew={openCreate} addNewText="Add Experience"
        onClear={handleClearFilters}
        filters={[{ name: "is_active", label: "All Status", value: statusFilter, options: [{ label: "Active", value: "1" }, { label: "Inactive", value: "0" }] }]}
        onFilterChange={(_, val) => { setStatusFilter(val); setPage(1); }}
      />

      <div className="bg-surface rounded-2xl border border-theme shadow-sm overflow-hidden relative">
        <LoadingOverlay active={loading && experiences.length > 0} />
        <table className="w-full text-sm text-left">
          <thead className="bg-theme border-b border-theme">
            <tr>{["Position & Company", "Status", "Duration", "Actions"].map((h, i) => <th key={h} className={`px-4 py-3 text-xs font-semibold text-theme-muted uppercase tracking-wide ${i === 3 ? "text-right" : ""}`}>{h}</th>)}</tr>
          </thead>
          <tbody className="divide-y border-theme">
            {experiences.map((exp) => (
              <tr key={exp.id} className="hover:bg-theme/60 transition-colors">
                <td className="px-4 py-3">
                  <p className="font-semibold text-theme">{exp.position}</p>
                  <p className="text-xs text-indigo-400 mt-0.5">{exp.company}</p>
                </td>
                <td className="px-4 py-3">
                  {exp.is_current && <span className="bg-sky-100/20 text-sky-500 text-[10px] font-bold px-2 py-0.5 rounded-full mr-1 border border-sky-200/20">Current</span>}
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${exp.is_active ? "bg-emerald-100/20 text-emerald-500 border border-emerald-200/20" : "bg-theme text-theme-muted border border-theme"}`}>{exp.is_active ? "Active" : "Inactive"}</span>
                </td>
                <td className="px-4 py-3 text-theme-muted text-xs">{exp.start_date} — {exp.is_current ? "Present" : exp.end_date}</td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => openEdit(exp)} className="p-1.5 rounded-lg text-indigo-500 hover:bg-indigo-50 transition-colors mr-1"><i className="fas fa-edit text-sm" /></button>
                  <button onClick={() => handleDelete(exp.id)} className="p-1.5 rounded-lg text-red-400 hover:bg-red-50 transition-colors"><i className="fas fa-trash text-sm" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination pagination={pagination} page={page} onPageChange={setPage} />

      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <div className="px-6 py-5 border-b border-theme flex items-center justify-between">
          <h3 className="text-base font-bold text-theme">{currentExp ? "Edit Experience" : "New Experience"}</h3>
          <button onClick={() => setModalOpen(false)} className="p-1.5 rounded-lg text-theme-muted hover:bg-theme transition-colors">
            <i className="fas fa-times"></i>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-1">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Company">
              <input className={inputCls} value={formData.company} onChange={(e) => fd({ company: e.target.value })} required />
            </Field>
            <Field label="Position">
              <input className={inputCls} value={formData.position} onChange={(e) => fd({ position: e.target.value })} required />
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Start Date">
              <input className={inputCls} value={formData.start_date} onChange={(e) => fd({ start_date: e.target.value })} placeholder="Jan 2024" required />
            </Field>
            <div className="mb-4">
              <label className="block text-xs font-semibold text-theme-muted uppercase tracking-wide mb-1.5">End Date</label>
              <input className={`${inputCls} ${formData.is_current ? "opacity-40 cursor-not-allowed" : ""}`} value={formData.end_date} onChange={(e) => fd({ end_date: e.target.value })} placeholder="Mar 2025" disabled={formData.is_current} />
              <label className="flex items-center gap-2 mt-2 cursor-pointer">
                <input type="checkbox" checked={formData.is_current} onChange={(e) => fd({ is_current: e.target.checked, end_date: e.target.checked ? "" : formData.end_date })} className="w-3.5 h-3.5 accent-sky-500" />
                <span className="text-xs text-theme-muted">I currently work here</span>
              </label>
            </div>
          </div>
          <Field label="Description">
            <textarea className={inputCls} rows={4} value={formData.description} onChange={(e) => fd({ description: e.target.value })} required />
          </Field>
          <Field label="Technologies (comma separated)">
            <input className={inputCls} value={formData.technologies} onChange={(e) => fd({ technologies: e.target.value })} placeholder="Laravel, React, AWS" />
          </Field>
          <label className="flex items-center gap-2.5 cursor-pointer py-1">
            <input type="checkbox" checked={formData.is_active} onChange={(e) => fd({ is_active: e.target.checked })} className="w-4 h-4 accent-indigo-600" />
            <span className="text-sm text-theme-muted font-medium">Visible on Portfolio</span>
          </label>
          <div className="flex justify-end gap-3 pt-4 border-t border-theme mt-4">
            <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 text-sm font-medium text-theme-muted bg-theme rounded-xl hover:bg-surface transition-colors border border-theme">
              Cancel
            </button>
            <button type="submit" className="clay-button-primary px-5 py-2 text-sm font-semibold rounded-xl!">
              Save Record
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}
