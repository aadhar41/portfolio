import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { login } from "../../services/api";

export default function AdminLogin() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await login(credentials);
      loginUser(res.data);
      navigate("/admin");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Login failed. Please check your credentials.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--bg-light)",
        padding: "1rem",
      }}
    >
      <div
        className="card"
        style={{ maxWidth: 400, width: "100%", padding: "2rem" }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "1.5rem",
            color: "var(--primary-color)",
          }}
        >
          Admin Login
        </h2>

        {error && (
          <div
            style={{
              background: "#fee2e2",
              color: "#dc2626",
              padding: "0.75rem",
              borderRadius: 8,
              marginBottom: "1rem",
              fontSize: "0.9rem",
              textAlign: "center",
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "1rem" }}>
            <label
              style={{
                display: "block",
                marginBottom: "0.5rem",
                fontSize: "0.9rem",
              }}
            >
              Email Address
            </label>
            <input
              type="email"
              className="form-control"
              required
              value={credentials.email}
              onChange={(e) =>
                setCredentials({ ...credentials, email: e.target.value })
              }
              placeholder="admin@aadhar.com"
            />
          </div>
          <div style={{ marginBottom: "1.5rem" }}>
            <label
              style={{
                display: "block",
                marginBottom: "0.5rem",
                fontSize: "0.9rem",
              }}
            >
              Password
            </label>
            <input
              type="password"
              className="form-control"
              required
              value={credentials.password}
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="btn btn-gradient"
            style={{ width: "100%" }}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
