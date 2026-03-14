import { useState, useEffect } from "react";
import { getContacts } from "../../services/api";
import AdminFilterBar from "../../components/admin/AdminFilterBar";
import LoadingOverlay from "../../components/admin/LoadingOverlay";
import PageLoader from "../../components/admin/PageLoader";

function Pagination({ pagination, page, onPrev, onNext }) {
  if (pagination.last_page <= 1) return null;
  return (
    <div className="flex items-center justify-between mt-5">
      <p className="text-xs text-slate-500">
        Page <strong>{pagination.current_page}</strong> of <strong>{pagination.last_page}</strong> &mdash; {pagination.total} total
      </p>
      <div className="flex gap-2">
        <button disabled={page === 1} onClick={onPrev} className="px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-200 text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed hover:border-indigo-400 hover:text-indigo-600 transition-colors">
          ‹ Previous
        </button>
        <button disabled={page === pagination.last_page} onClick={onNext} className="px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-200 text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed hover:border-indigo-400 hover:text-indigo-600 transition-colors">
          Next ›
        </button>
      </div>
    </div>
  );
}

export default function ContactManagement() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ current_page: 1, last_page: 1, total: 0 });
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    const t = setTimeout(fetchMessages, 300);
    return () => clearTimeout(t);
  }, [search, page, perPage]);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await getContacts({ search, page, per_page: perPage });
      if (res.data.data) {
        setMessages(res.data.data);
        setPagination({ current_page: res.data.current_page, last_page: res.data.last_page, total: res.data.total });
      } else {
        setMessages(res.data);
      }
    } catch (err) {
      console.error("Failed to fetch messages", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading && messages.length === 0) return <PageLoader />;

  return (
    <>
      <AdminFilterBar
        search={search}
        onSearchChange={setSearch}
        perPage={perPage}
        onPerPageChange={(v) => { setPerPage(v); setPage(1); }}
        showAddNew={false}
      />

      <div className="relative min-h-[200px]">
        <LoadingOverlay active={loading && messages.length > 0} />
        {messages.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-16 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
              <i className="fas fa-inbox text-slate-300 text-2xl" />
            </div>
            <h3 className="font-semibold text-slate-700 mb-1">No messages yet</h3>
            <p className="text-slate-400 text-sm">They'll show up here when someone contacts you.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {messages.map((msg) => (
              <div key={msg.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between px-5 py-4 cursor-pointer" onClick={() => setExpanded(expanded === msg.id ? null : msg.id)}>
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="shrink-0 w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                      {msg.name?.charAt(0) ?? "?"}
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-slate-800 text-sm truncate">{msg.name}</p>
                      <p className="text-xs text-indigo-600 truncate">{msg.email}</p>
                    </div>
                    <div className="hidden sm:block ml-4 min-w-0">
                      <p className="text-sm text-slate-600 truncate">{msg.subject || "No Subject"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0 ml-3">
                    <span className="hidden sm:block text-xs text-slate-400">{new Date(msg.created_at).toLocaleDateString()}</span>
                    <i className={`fas fa-chevron-${expanded === msg.id ? "up" : "down"} text-slate-400 text-xs`} />
                  </div>
                </div>
                {expanded === msg.id && (
                  <div className="px-5 pb-5 border-t border-slate-100">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mt-3 mb-2">Message</p>
                    <div className="bg-slate-50 rounded-xl px-4 py-3 border-l-4 border-indigo-300 text-sm text-slate-700 leading-relaxed">
                      {msg.message}
                    </div>
                    <a href={`mailto:${msg.email}`} className="inline-flex items-center gap-2 mt-3 text-xs font-semibold text-indigo-600 hover:text-indigo-800 transition-colors">
                      <i className="fas fa-reply" /> Reply via Email
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <Pagination pagination={pagination} page={page} onPrev={() => setPage(page - 1)} onNext={() => setPage(page + 1)} />
    </>
  );
}
