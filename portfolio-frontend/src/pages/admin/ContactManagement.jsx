import { useState, useEffect } from "react";
import { getContacts } from "../../services/api";
import AdminFilterBar from "../../components/admin/AdminFilterBar";
import LoadingOverlay from "../../components/admin/LoadingOverlay";
import PageLoader from "../../components/admin/PageLoader";

export default function ContactManagement() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    current_page: 1,
    last_page: 1,
    total: 0,
  });
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchMessages();
    }, 300); // Debounce search
    return () => clearTimeout(timer);
  }, [search, page, perPage]);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await getContacts({ search, page, per_page: perPage });
      // If server returned pagination object
      if (res.data.data) {
        setMessages(res.data.data);
        setPagination({
          current_page: res.data.current_page,
          last_page: res.data.last_page,
          total: res.data.total,
        });
      } else {
        setMessages(res.data);
      }
    } catch (err) {
      console.error("Failed to fetch messages", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1); // Reset to first page on search
  };

  if (loading && messages.length === 0) return <PageLoader />;

  return (
    <>
      <AdminFilterBar
        search={search}
        onSearchChange={setSearch}
        perPage={perPage}
        onPerPageChange={(val) => {
          setPerPage(val);
          setPage(1);
        }}
        showAddNew={false}
      />

      <div style={{ position: "relative", minHeight: "200px" }}>
        <LoadingOverlay active={loading && messages.length > 0} />
        <div style={{ display: "grid", gap: "1rem" }}>
          {messages.length === 0 ? (
            <div
              className="card"
              style={{
                padding: "3rem",
                textAlign: "center",
                color: "var(--text-light)",
              }}
            >
              <i
                className="fas fa-inbox fa-3x"
                style={{ marginBottom: "1rem", opacity: 0.3 }}
              ></i>
              <p>
                No messages yet. They'll show up here when someone contacts you.
              </p>
            </div>
          ) : (
            messages.map((msg) => (
              <div key={msg.id} className="card" style={{ padding: "1.5rem" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "1rem",
                  }}
                >
                  <div>
                    <h5 style={{ margin: 0 }}>{msg.name}</h5>
                    <small
                      style={{ color: "var(--primary-color)", fontWeight: 600 }}
                    >
                      {msg.email}
                    </small>
                  </div>
                  <small style={{ color: "var(--text-light)" }}>
                    {new Date(msg.created_at).toLocaleString()}
                  </small>
                </div>
                <div style={{ marginBottom: "1rem" }}>
                  <strong
                    style={{
                      fontSize: "0.85rem",
                      color: "var(--text-light)",
                      display: "block",
                      marginBottom: 4,
                    }}
                  >
                    Subject:
                  </strong>
                  <div>{msg.subject || "No Subject"}</div>
                </div>
                <div
                  style={{
                    background: "#f8fafc",
                    padding: "1rem",
                    borderRadius: 8,
                    fontSize: "0.95rem",
                    borderLeft: "4px solid #e2e8f0",
                  }}
                >
                  {msg.message}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Pagination Controls */}
      {pagination.last_page > 1 && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "1.5rem",
          }}
        >
          <div style={{ fontSize: "0.85rem", color: "var(--text-light)" }}>
            Showing page {pagination.current_page} of {pagination.last_page} (
            {pagination.total} total)
          </div>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button
              className="btn btn-sm btn-outline-primary"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              Previous
            </button>
            <button
              className="btn btn-sm btn-outline-primary"
              disabled={page === pagination.last_page}
              onClick={() => setPage(page + 1)}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </>
  );
}
