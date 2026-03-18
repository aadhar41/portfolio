import { useState, useEffect } from "react";
import { adminProjects } from "../../services/api";
import FileUpload from "../../components/admin/FileUpload";
import AdminFilterBar from "../../components/admin/AdminFilterBar";
import LoadingOverlay from "../../components/admin/LoadingOverlay";
import PageLoader from "../../components/admin/PageLoader";
import Pagination from "../../components/admin/Pagination";
import { toast } from "react-toastify";

const EMPTY_FORM = { is_active: true, title: "", description: "", category: "web", technologies: "", github_url: "", live_url: "", image: "", featured: false };

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

export default function ProjectManagement() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ current_page: 1, last_page: 1, total: 0 });
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [statusFilter, setStatusFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [formData, setFormData] = useState(EMPTY_FORM);

  const fd = (patch) => setFormData((p) => ({ ...p, ...patch }));

  useEffect(() => {
    const t = setTimeout(fetchProjects, 300);
    return () => clearTimeout(t);
  }, [search, page, perPage, statusFilter, categoryFilter]);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await adminProjects.list({ search, page, per_page: perPage, is_active: statusFilter, category: categoryFilter });
      if (res.data.data) { setProjects(res.data.data); setPagination({ current_page: res.data.current_page, last_page: res.data.last_page, total: res.data.total }); }
      else { setProjects(res.data); }
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const openCreate = () => { setCurrentProject(null); setFormData(EMPTY_FORM); setModalOpen(true); };
  const openEdit = (p) => {
    setCurrentProject(p);
    setFormData({ is_active: p.is_active, title: p.title, description: p.description, category: p.category, technologies: p.technologies.join(", "), github_url: p.github_url || "", live_url: p.live_url || "", image: p.image || "", featured: p.featured });
    setModalOpen(true);
  };
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this project?")) return;
    try { await adminProjects.delete(id); fetchProjects(); toast.success("Project deleted!"); }
    catch { toast.error("Delete failed"); }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { ...formData, technologies: typeof formData.technologies === "string" ? formData.technologies.split(",").map((t) => t.trim()).filter(Boolean) : formData.technologies, featured: !!formData.featured };
    try {
      if (currentProject) { await adminProjects.update(currentProject.id, data); } else { await adminProjects.create(data); }
      setModalOpen(false); fetchProjects();
      toast.success(currentProject ? "Project updated!" : "Project created!");
    } catch (err) { toast.error("Save failed: " + (err.response?.data?.message || "Unknown error")); }
  };

  const handleClearFilters = () => {
    setSearch("");
    setPage(1);
    setStatusFilter("");
    setCategoryFilter("all");
    setPerPage(10);
  };

  if (loading && projects.length === 0) return <PageLoader />;

  return (
    <>
      <AdminFilterBar
        search={search} onSearchChange={setSearch}
        perPage={perPage} onPerPageChange={(v) => { setPerPage(v); setPage(1); }}
        onAddNew={openCreate} addNewText="Add Project"
        onClear={handleClearFilters}
        filters={[
          { name: "category", label: "All Categories", value: categoryFilter, options: [{ label: "Web", value: "web" }, { label: "Mobile", value: "mobile" }, { label: "API", value: "api" }] },
          { name: "is_active", label: "All Status", value: statusFilter, options: [{ label: "Active", value: "1" }, { label: "Inactive", value: "0" }] },
        ]}
        onFilterChange={(name, val) => { if (name === "category") setCategoryFilter(val); if (name === "is_active") setStatusFilter(val); setPage(1); }}
      />

      <div className="bg-surface rounded-2xl border border-theme shadow-sm overflow-hidden relative">
        <LoadingOverlay active={loading && projects.length > 0} />
        <table className="w-full text-sm text-left">
          <thead className="bg-theme border-b border-theme">
            <tr>{["Title", "Category", "Technologies", "Status", "Actions"].map((h, i) => <th key={h} className={`px-4 py-3 text-xs font-semibold text-theme-muted uppercase tracking-wide ${i === 4 ? "text-right" : ""}`}>{h}</th>)}</tr>
          </thead>
          <tbody className="divide-y border-theme">
            {projects.map((p) => (
              <tr key={p.id} className="hover:bg-theme/60 transition-colors">
                <td className="px-4 py-3 font-semibold text-theme">{p.title}</td>
                <td className="px-4 py-3 capitalize text-theme-muted text-xs">{p.category}</td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-1">
                    {p.technologies.slice(0, 3).map((t) => <span key={t} className="bg-indigo-50/50 text-indigo-400 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-indigo-100/50">{t}</span>)}
                    {p.technologies.length > 3 && <span className="text-theme-muted text-xs">+{p.technologies.length - 3}</span>}
                  </div>
                </td>
                <td className="px-4 py-3">
                  {p.featured && <span className="bg-amber-100/20 text-amber-500 text-[10px] font-bold px-2 py-0.5 rounded-full mr-1 border border-amber-200/20">★ Featured</span>}
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${p.is_active ? "bg-emerald-100/20 text-emerald-500 border border-emerald-200/20" : "bg-theme text-theme-muted border border-theme"}`}>{p.is_active ? "Active" : "Inactive"}</span>
                </td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => openEdit(p)} className="p-1.5 rounded-lg text-indigo-500 hover:bg-indigo-50 transition-colors mr-1"><i className="fas fa-edit text-sm" /></button>
                  <button onClick={() => handleDelete(p.id)} className="p-1.5 rounded-lg text-red-400 hover:bg-red-50 transition-colors"><i className="fas fa-trash text-sm" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination pagination={pagination} page={page} onPageChange={setPage} />

      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <div className="px-6 py-5 border-b border-theme flex items-center justify-between">
          <h3 className="text-base font-bold text-theme">{currentProject ? "Edit Project" : "New Project"}</h3>
          <button onClick={() => setModalOpen(false)} className="p-1.5 rounded-lg text-theme-muted hover:bg-theme transition-colors"><i className="fas fa-times" /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-1">
          <Field label="Title"><input className={inputCls} value={formData.title} onChange={(e) => fd({ title: e.target.value })} required /></Field>
          <Field label="Description"><textarea className={inputCls} rows={3} value={formData.description} onChange={(e) => fd({ description: e.target.value })} required /></Field>
          <FileUpload label="Project Thumbnail" currentImage={formData.image} onUploadSuccess={(url) => fd({ image: url })} folder="projects" />
          <div className="grid grid-cols-2 gap-4">
            <Field label="Category">
              <select className={inputCls} value={formData.category} onChange={(e) => fd({ category: e.target.value })}>
                <option value="web">Web</option><option value="mobile">Mobile</option><option value="api">API</option>
              </select>
            </Field>
            <Field label="Featured">
              <div className="flex items-center gap-2 h-10"><input type="checkbox" checked={formData.featured} onChange={(e) => fd({ featured: e.target.checked })} className="w-4 h-4 accent-indigo-600" /><span className="text-sm text-theme-muted">Highlight Project</span></div>
            </Field>
          </div>
          <label className="flex items-center gap-2.5 cursor-pointer py-1"><input type="checkbox" checked={formData.is_active} onChange={(e) => fd({ is_active: e.target.checked })} className="w-4 h-4 accent-indigo-600" /><span className="text-sm text-theme-muted font-medium">Visible on Portfolio</span></label>
          <div className="flex justify-end gap-3 pt-4 border-t border-theme mt-4">
            <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 text-sm font-medium text-theme-muted bg-theme rounded-xl hover:bg-surface transition-colors border border-theme">Cancel</button>
            <button type="submit" className="clay-button-primary px-5 py-2 text-sm font-semibold !rounded-xl">Save Project</button>
          </div>
        </form>
      </Modal>
    </>
  );
}
