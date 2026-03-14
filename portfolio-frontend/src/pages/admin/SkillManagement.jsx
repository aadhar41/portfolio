import { useState, useEffect } from "react";
import { adminSkills } from "../../services/api";
import AdminFilterBar from "../../components/admin/AdminFilterBar";
import LoadingOverlay from "../../components/admin/LoadingOverlay";
import PageLoader from "../../components/admin/PageLoader";
import Pagination from "../../components/admin/Pagination";
import { toast } from "react-toastify";

const EMPTY_FORM = { is_active: true, name: "", category: "backend", icon: "", proficiency: 80, sort_order: 0 };

function Modal({ open, onClose, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="bg-white rounded-2xl w-full max-w-lg max-h-[92vh] overflow-y-auto shadow-2xl">{children}</div>
    </div>
  );
}
const inputCls = "w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all bg-slate-50";
function Field({ label, children }) {
  return <div className="mb-4"><label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5">{label}</label>{children}</div>;
}

export default function SkillManagement() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ current_page: 1, last_page: 1, total: 0 });
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [statusFilter, setStatusFilter] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [currentSkill, setCurrentSkill] = useState(null);
  const [formData, setFormData] = useState(EMPTY_FORM);

  const fd = (patch) => setFormData((p) => ({ ...p, ...patch }));

  useEffect(() => {
    const t = setTimeout(fetchSkills, 300);
    return () => clearTimeout(t);
  }, [search, page, perPage, statusFilter]);

  const fetchSkills = async () => {
    setLoading(true);
    try {
      const res = await adminSkills.list({ search, page, per_page: perPage, is_active: statusFilter });
      if (res.data.data) { setSkills(res.data.data); setPagination({ current_page: res.data.current_page, last_page: res.data.last_page, total: res.data.total }); }
      else { setSkills(res.data); }
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const openCreate = () => { setCurrentSkill(null); setFormData(EMPTY_FORM); setModalOpen(true); };
  const openEdit = (s) => { setCurrentSkill(s); setFormData({ is_active: s.is_active, name: s.name, category: s.category, icon: s.icon || "", proficiency: s.proficiency, sort_order: s.sort_order }); setModalOpen(true); };
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this skill?")) return;
    try { await adminSkills.delete(id); fetchSkills(); toast.success("Skill deleted!"); }
    catch { toast.error("Delete failed"); }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentSkill) { await adminSkills.update(currentSkill.id, formData); } else { await adminSkills.create(formData); }
      setModalOpen(false); fetchSkills();
      toast.success(currentSkill ? "Skill updated!" : "Skill created!");
    } catch { toast.error("Save failed. Please check the form."); }
  };

  if (loading && skills.length === 0) return <PageLoader />;

  return (
    <>
      <AdminFilterBar
        search={search} onSearchChange={setSearch}
        perPage={perPage} onPerPageChange={(v) => { setPerPage(v); setPage(1); }}
        onAddNew={openCreate} addNewText="Add Skill"
        filters={[{ name: "is_active", label: "All Status", value: statusFilter, options: [{ label: "Active", value: "1" }, { label: "Inactive", value: "0" }] }]}
        onFilterChange={(_, val) => { setStatusFilter(val); setPage(1); }}
      />

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden relative">
        <LoadingOverlay active={loading && skills.length > 0} />
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>{["Skill", "Category", "Status", "Proficiency", "Actions"].map((h, i) => <th key={h} className={`px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide ${i === 4 ? "text-right" : ""}`}>{h}</th>)}</tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {skills.map((s) => (
              <tr key={s.id} className="hover:bg-slate-50/60 transition-colors">
                <td className="px-4 py-3 font-semibold text-slate-800 flex items-center gap-2"><i className={`${s.icon} text-indigo-400 w-4`} />{s.name}</td>
                <td className="px-4 py-3 capitalize text-slate-600 text-xs">{s.category}</td>
                <td className="px-4 py-3"><span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${s.is_active ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"}`}>{s.is_active ? "Active" : "Inactive"}</span></td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-slate-200 rounded-full max-w-[80px]"><div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full" style={{ width: `${s.proficiency}%` }} /></div>
                    <span className="text-xs text-slate-500 font-medium">{s.proficiency}%</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => openEdit(s)} className="p-1.5 rounded-lg text-indigo-500 hover:bg-indigo-50 transition-colors mr-1"><i className="fas fa-edit text-sm" /></button>
                  <button onClick={() => handleDelete(s.id)} className="p-1.5 rounded-lg text-red-400 hover:bg-red-50 transition-colors"><i className="fas fa-trash text-sm" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination pagination={pagination} page={page} onPageChange={setPage} />

      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-800">{currentSkill ? "Edit Skill" : "New Skill"}</h3>
          <button onClick={() => setModalOpen(false)} className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 transition-colors"><i className="fas fa-times" /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-1">
          <Field label="Skill Name"><input className={inputCls} value={formData.name} onChange={(e) => fd({ name: e.target.value })} required /></Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Category">
              <select className={inputCls} value={formData.category} onChange={(e) => fd({ category: e.target.value })}>
                {["API Development", "Backend Development", "Best Practices", "Database Management", "Frontend Technologies", "Leadership", "Software Development", "Tools & Platforms", "other"].map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </Field>
            <Field label="Proficiency (%)">
              <input type="number" className={inputCls} value={formData.proficiency} onChange={(e) => fd({ proficiency: parseInt(e.target.value) })} min="0" max="100" />
            </Field>
          </div>
          <Field label="Icon Class (FontAwesome)"><input className={inputCls} value={formData.icon} onChange={(e) => fd({ icon: e.target.value })} placeholder="fab fa-react" /></Field>
          {/* Live preview */}
          {formData.icon && (
            <div className="flex items-center gap-2 bg-slate-50 rounded-xl px-4 py-2.5 border border-slate-200 text-sm text-slate-600">
              <i className={formData.icon} /> <span>Icon preview</span>
            </div>
          )}
          <label className="flex items-center gap-2.5 cursor-pointer py-1"><input type="checkbox" checked={formData.is_active} onChange={(e) => fd({ is_active: e.target.checked })} className="w-4 h-4 accent-indigo-600" /><span className="text-sm text-slate-600 font-medium">Visible on Portfolio</span></label>
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 mt-4">
            <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors">Cancel</button>
            <button type="submit" className="px-5 py-2 text-sm font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all">Save Skill</button>
          </div>
        </form>
      </Modal>
    </>
  );
}
