import { useState, useEffect } from "react";
import { adminEducation } from "../../services/api";
import AdminFilterBar from "../../components/admin/AdminFilterBar";
import LoadingOverlay from "../../components/admin/LoadingOverlay";
import PageLoader from "../../components/admin/PageLoader";
import Pagination from "../../components/admin/Pagination";
import { toast } from "react-toastify";

const EMPTY_FORM = { is_active: true, institution: "", degree: "", field_of_study: "", start_year: "", end_year: "", grade: "" };

function Modal({ open, onClose, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="bg-surface rounded-2xl w-full max-w-lg max-h-[92vh] overflow-y-auto shadow-2xl border border-theme">{children}</div>
    </div>
  );
}
const inputCls = "w-full border border-theme rounded-xl px-3.5 py-2.5 text-sm text-theme focus:outline-none focus:ring-2 focus:focus-ring-accent focus:border-transparent transition-all bg-theme";
function Field({ label, children }) {
  return <div className="mb-4"><label className="block text-xs font-semibold text-theme-muted uppercase tracking-wide mb-1.5">{label}</label>{children}</div>;
}

export default function EducationManagement() {
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ current_page: 1, last_page: 1, total: 0 });
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [statusFilter, setStatusFilter] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [currentEdu, setCurrentEdu] = useState(null);
  const [formData, setFormData] = useState(EMPTY_FORM);

  const fd = (patch) => setFormData((p) => ({ ...p, ...patch }));

  useEffect(() => { const t = setTimeout(fetchEducation, 300); return () => clearTimeout(t); }, [search, page, perPage, statusFilter]);

  const fetchEducation = async () => {
    setLoading(true);
    try {
      const res = await adminEducation.list({ search, page, per_page: perPage, is_active: statusFilter });
      if (res.data.data) { setEducation(res.data.data); setPagination({ current_page: res.data.current_page, last_page: res.data.last_page, total: res.data.total }); }
      else { setEducation(res.data); }
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const openCreate = () => { setCurrentEdu(null); setFormData(EMPTY_FORM); setModalOpen(true); };
  const openEdit = (edu) => {
    setCurrentEdu(edu);
    setFormData({ is_active: edu.is_active, institution: edu.institution, degree: edu.degree, field_of_study: edu.field_of_study, start_year: edu.start_year, end_year: edu.end_year || "", grade: edu.grade || "" });
    setModalOpen(true);
  };
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this education record?")) return;
    try { await adminEducation.delete(id); fetchEducation(); toast.success("Education deleted!"); }
    catch { toast.error("Delete failed"); }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentEdu) { await adminEducation.update(currentEdu.id, formData); } else { await adminEducation.create(formData); }
      setModalOpen(false); fetchEducation();
      toast.success(currentEdu ? "Education updated!" : "Education created!");
    } catch { toast.error("Save failed"); }
  };

  const handleClearFilters = () => {
    setSearch("");
    setPage(1);
    setStatusFilter("");
    setPerPage(10);
  };

  if (loading && education.length === 0) return <PageLoader />;

  return (
    <>
      <AdminFilterBar
        search={search} onSearchChange={setSearch}
        perPage={perPage} onPerPageChange={(v) => { setPerPage(v); setPage(1); }}
        onAddNew={openCreate} addNewText="Add Education"
        onClear={handleClearFilters}
        filters={[{ name: "is_active", label: "All Status", value: statusFilter, options: [{ label: "Active", value: "1" }, { label: "Inactive", value: "0" }] }]}
        onFilterChange={(_, val) => { setStatusFilter(val); setPage(1); }}
      />

      <div className="bg-surface rounded-2xl border border-theme shadow-sm overflow-hidden relative">
        <LoadingOverlay active={loading && education.length > 0} />
        <table className="w-full text-sm text-left">
          <thead className="bg-theme border-b border-theme">
            <tr>{["Degree & Institution", "Status", "Duration", "Grade", "Actions"].map((h, i) => <th key={h} className={`px-4 py-3 text-xs font-semibold text-theme-muted uppercase tracking-wide ${i === 4 ? "text-right" : ""}`}>{h}</th>)}</tr>
          </thead>
          <tbody className="divide-y border-theme">
            {education.map((edu) => (
              <tr key={edu.id} className="hover:bg-theme/60 transition-colors">
                <td className="px-4 py-3">
                  <p className="font-semibold text-theme">{edu.degree} in {edu.field_of_study}</p>
                  <p className="text-xs text-indigo-400 mt-0.5">{edu.institution}</p>
                </td>
                <td className="px-4 py-3"><span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${edu.is_active ? "bg-emerald-100/20 text-emerald-500 border border-emerald-200/20" : "bg-theme text-theme-muted border border-theme"}`}>{edu.is_active ? "Active" : "Inactive"}</span></td>
                <td className="px-4 py-3 text-theme-muted text-xs">{edu.start_year} — {edu.end_year || "Present"}</td>
                <td className="px-4 py-3 text-theme-muted text-xs">{edu.grade || "—"}</td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => openEdit(edu)} className="p-1.5 rounded-lg text-indigo-500 hover:bg-indigo-50 transition-colors mr-1"><i className="fas fa-edit text-sm" /></button>
                  <button onClick={() => handleDelete(edu.id)} className="p-1.5 rounded-lg text-red-400 hover:bg-red-50 transition-colors"><i className="fas fa-trash text-sm" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination pagination={pagination} page={page} onPageChange={setPage} />

      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <div className="px-6 py-5 border-b border-theme flex items-center justify-between">
          <h3 className="text-base font-bold text-theme">{currentEdu ? "Edit Education" : "New Education"}</h3>
          <button onClick={() => setModalOpen(false)} className="p-1.5 rounded-lg text-theme-muted hover:bg-theme transition-colors"><i className="fas fa-times" /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-1">
          <Field label="Institution"><input className={inputCls} value={formData.institution} onChange={(e) => fd({ institution: e.target.value })} required /></Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Degree"><input className={inputCls} value={formData.degree} onChange={(e) => fd({ degree: e.target.value })} required /></Field>
            <Field label="Field of Study"><input className={inputCls} value={formData.field_of_study} onChange={(e) => fd({ field_of_study: e.target.value })} required /></Field>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <Field label="Start Year"><input className={inputCls} value={formData.start_year} onChange={(e) => fd({ start_year: e.target.value })} placeholder="2020" required /></Field>
            <Field label="End Year"><input className={inputCls} value={formData.end_year} onChange={(e) => fd({ end_year: e.target.value })} placeholder="2024" /></Field>
            <Field label="Grade / CGPA"><input className={inputCls} value={formData.grade} onChange={(e) => fd({ grade: e.target.value })} placeholder="3.8/4.0" /></Field>
          </div>
          <label className="flex items-center gap-2.5 cursor-pointer py-1"><input type="checkbox" checked={formData.is_active} onChange={(e) => fd({ is_active: e.target.checked })} className="w-4 h-4 accent-indigo-600" /><span className="text-sm text-theme-muted font-medium">Visible on Portfolio</span></label>
          <div className="flex justify-end gap-3 pt-4 border-t border-theme mt-4">
            <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 text-sm font-medium text-theme-muted bg-theme rounded-xl hover:bg-surface transition-colors border border-theme">Cancel</button>
            <button type="submit" className="clay-button-primary px-5 py-2 text-sm font-semibold !rounded-xl">Save Education</button>
          </div>
        </form>
      </Modal>
    </>
  );
}
