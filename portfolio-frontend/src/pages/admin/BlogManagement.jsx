import { useState, useEffect } from "react";
import { adminBlogs } from "../../services/api";
import FileUpload from "../../components/admin/FileUpload";
import AdminFilterBar from "../../components/admin/AdminFilterBar";
import LoadingOverlay from "../../components/admin/LoadingOverlay";
import PageLoader from "../../components/admin/PageLoader";
import Pagination from "../../components/admin/Pagination";
import { toast } from "react-toastify";

// ── shared helpers ──────────────────────────────
const EMPTY_FORM = { is_active: true, title: "", slug: "", excerpt: "", content: "", status: "draft", tags: "", cover_image: "" };

function Modal({ open, onClose, children }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[92vh] overflow-y-auto shadow-2xl">
        {children}
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div className="mb-4">
      <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1.5">{label}</label>
      {children}
    </div>
  );
}

const inputCls = "w-full border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all bg-slate-50";
// ────────────────────────────────────────────────

export default function BlogManagement() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ current_page: 1, last_page: 1, total: 0 });
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [statusFilter, setStatusFilter] = useState("");
  const [isActiveFilter, setIsActiveFilter] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [currentBlog, setCurrentBlog] = useState(null);
  const [formData, setFormData] = useState(EMPTY_FORM);

  const fd = (patch) => setFormData((p) => ({ ...p, ...patch }));

  useEffect(() => {
    const t = setTimeout(fetchBlogs, 300);
    return () => clearTimeout(t);
  }, [search, page, perPage, statusFilter, isActiveFilter]);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await adminBlogs.list({ search, page, per_page: perPage, status: statusFilter, is_active: isActiveFilter });
      if (res.data.data) {
        setBlogs(res.data.data);
        setPagination({ current_page: res.data.current_page, last_page: res.data.last_page, total: res.data.total });
      } else { setBlogs(res.data); }
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const openCreate = () => { setCurrentBlog(null); setFormData(EMPTY_FORM); setModalOpen(true); };
  const openEdit = (b) => {
    setCurrentBlog(b);
    setFormData({ is_active: b.is_active, title: b.title, slug: b.slug, excerpt: b.excerpt, content: b.content, status: b.status, tags: (b.tags || []).join(", "), cover_image: b.cover_image || "" });
    setModalOpen(true);
  };
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this blog post?")) return;
    try { await adminBlogs.delete(id); fetchBlogs(); toast.success("Post deleted!"); }
    catch { toast.error("Delete failed"); }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { ...formData, tags: typeof formData.tags === "string" ? formData.tags.split(",").map((t) => t.trim()).filter(Boolean) : formData.tags };
    try {
      if (currentBlog) { await adminBlogs.update(currentBlog.id, data); } else { await adminBlogs.create(data); }
      setModalOpen(false); fetchBlogs();
      toast.success(currentBlog ? "Post updated!" : "Post created!");
    } catch (err) { toast.error("Save failed: " + (err.response?.data?.message || "Unknown error")); }
  };

  if (loading && blogs.length === 0) return <PageLoader />;

  return (
    <>
      <AdminFilterBar
        search={search} onSearchChange={setSearch}
        perPage={perPage} onPerPageChange={(v) => { setPerPage(v); setPage(1); }}
        onAddNew={openCreate} addNewText="New Post"
        filters={[
          { name: "status", label: "All Status", value: statusFilter, options: [{ label: "Draft", value: "draft" }, { label: "Published", value: "published" }] },
          { name: "is_active", label: "Visibility", value: isActiveFilter, options: [{ label: "Active", value: "1" }, { label: "Inactive", value: "0" }] },
        ]}
        onFilterChange={(name, val) => { if (name === "status") setStatusFilter(val); if (name === "is_active") setIsActiveFilter(val); setPage(1); }}
      />

      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden relative">
        <LoadingOverlay active={loading && blogs.length > 0} />
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              {["Title", "Status", "Date", "Actions"].map((h, i) => (
                <th key={h} className={`px-4 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide ${i === 3 ? "text-right" : ""}`}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {blogs.map((b) => (
              <tr key={b.id} className="hover:bg-slate-50/60 transition-colors">
                <td className="px-4 py-3 font-semibold text-slate-800">{b.title}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide mr-1 ${b.status === "published" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>{b.status}</span>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${b.is_active ? "bg-indigo-100 text-indigo-700" : "bg-slate-100 text-slate-500"}`}>{b.is_active ? "Active" : "Hidden"}</span>
                </td>
                <td className="px-4 py-3 text-slate-500 text-xs">{b.published_at ? new Date(b.published_at).toLocaleDateString() : "—"}</td>
                <td className="px-4 py-3 text-right">
                  <button onClick={() => openEdit(b)} className="p-1.5 rounded-lg text-indigo-500 hover:bg-indigo-50 transition-colors mr-1" title="Edit"><i className="fas fa-edit text-sm" /></button>
                  <button onClick={() => handleDelete(b.id)} className="p-1.5 rounded-lg text-red-400 hover:bg-red-50 transition-colors" title="Delete"><i className="fas fa-trash text-sm" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination pagination={pagination} page={page} onPageChange={setPage} />

      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-800">{currentBlog ? "Edit Post" : "New Post"}</h3>
          <button onClick={() => setModalOpen(false)} className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 transition-colors"><i className="fas fa-times" /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-1">
          <Field label="Title"><input className={inputCls} value={formData.title} onChange={(e) => fd({ title: e.target.value })} required /></Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Slug (optional)"><input className={inputCls} value={formData.slug} onChange={(e) => fd({ slug: e.target.value })} placeholder="post-slug" /></Field>
            <Field label="Status">
              <select className={inputCls} value={formData.status} onChange={(e) => fd({ status: e.target.value })}>
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </Field>
          </div>
          <Field label="Excerpt"><textarea className={inputCls} rows={2} value={formData.excerpt} onChange={(e) => fd({ excerpt: e.target.value })} required /></Field>
          <Field label="Content (Markdown supported)"><textarea className={`${inputCls} font-mono text-xs`} rows={8} value={formData.content} onChange={(e) => fd({ content: e.target.value })} required /></Field>
          <Field label="Tags (comma separated)"><input className={inputCls} value={formData.tags} onChange={(e) => fd({ tags: e.target.value })} /></Field>
          <FileUpload label="Cover Image" currentImage={formData.cover_image} onUploadSuccess={(url) => fd({ cover_image: url })} folder="blogs" />
          <label className="flex items-center gap-2.5 cursor-pointer py-1">
            <input type="checkbox" checked={formData.is_active} onChange={(e) => fd({ is_active: e.target.checked })} className="w-4 h-4 accent-indigo-600" />
            <span className="text-sm text-slate-600 font-medium">Visible on Portfolio</span>
          </label>
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 mt-4">
            <button type="button" onClick={() => setModalOpen(false)} className="px-4 py-2 text-sm font-medium text-slate-600 bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors">Cancel</button>
            <button type="submit" className="px-5 py-2 text-sm font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all">Save Post</button>
          </div>
        </form>
      </Modal>
    </>
  );
}
