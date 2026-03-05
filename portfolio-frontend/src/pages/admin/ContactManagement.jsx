import { useState, useEffect } from "react";
import { getContacts } from "../../services/api";

export default function ContactManagement() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await getContacts();
      setMessages(res.data);
    } catch (err) {
      console.error("Failed to fetch messages", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading && messages.length === 0) return <div>Loading messages...</div>;

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "1.5rem",
        }}
      >
        <p style={{ color: "var(--text-light)" }}>
          Inquiries from your contact form ({messages.length})
        </p>
        <button
          className="btn btn-outline-primary btn-sm"
          onClick={fetchMessages}
        >
          <i className="fas fa-sync"></i> Refresh
        </button>
      </div>

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
  );
}
