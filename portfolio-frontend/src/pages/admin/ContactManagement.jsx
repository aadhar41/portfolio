import { useState, useEffect } from "react";
import { getContacts } from "../../services/api";
import AdminFilterBar from "../../components/admin/AdminFilterBar";
import LoadingOverlay from "../../components/admin/LoadingOverlay";
import PageLoader from "../../components/admin/PageLoader";
import Pagination from "../../components/admin/Pagination";

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

  const handleClearFilters = () => {
    setSearch("");
    setPage(1);
    setPerPage(10);
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
        onClear={handleClearFilters}
      />

      <div className="relative min-h-[200px]">
        <LoadingOverlay active={loading && messages.length > 0} />
        {messages.length === 0 ? (
          <div className="bg-surface rounded-2xl border border-theme shadow-sm p-16 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-theme flex items-center justify-center mb-4 border border-theme">
              <i className="fas fa-inbox text-theme-muted text-2xl" />
            </div>
            <h3 className="font-semibold text-theme mb-1">No messages yet</h3>
            <p className="text-theme-muted text-sm">They'll show up here when someone contacts you.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {messages.map((msg) => (
              <div key={msg.id} className="bg-surface rounded-2xl border border-theme shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between px-5 py-4 cursor-pointer" onClick={() => setExpanded(expanded === msg.id ? null : msg.id)}>
                  <div className="flex items-center gap-4 min-w-0">
                    <div className="shrink-0 w-9 h-9 rounded-full bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                      {msg.name?.charAt(0) ?? "?"}
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-theme text-sm truncate">{msg.name}</p>
                      <p className="text-xs text-indigo-400 truncate">{msg.email}</p>
                    </div>
                    <div className="hidden sm:block ml-4 min-w-0">
                      <p className="text-sm text-theme-muted truncate">{msg.subject || "No Subject"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0 ml-3">
                    <span className="hidden sm:block text-xs text-theme-muted">{new Date(msg.created_at).toLocaleDateString()}</span>
                    <i className={`fas fa-chevron-${expanded === msg.id ? "up" : "down"} text-theme-muted text-xs`} />
                  </div>
                </div>
                {expanded === msg.id && (
                  <div className="px-5 pb-5 border-t border-theme">
                    <p className="text-xs font-semibold text-theme-muted uppercase tracking-wide mt-3 mb-2">Message</p>
                    <div className="bg-theme rounded-xl px-4 py-3 border-l-4 border-indigo-300 text-sm text-theme leading-relaxed">
                      {msg.message}
                    </div>
                    <a href={`mailto:${msg.email}`} className="inline-flex items-center gap-2 mt-3 text-xs font-semibold text-indigo-400 hover:text-indigo-600 transition-colors">
                      <i className="fas fa-reply" /> Reply via Email
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <Pagination pagination={pagination} page={page} onPageChange={setPage} />
    </>
  );
}
