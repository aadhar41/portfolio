import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { login } from "../../services/api";
import { toast } from "react-toastify";

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
      const msg = err.response?.data?.message || "Login failed. Please check your credentials.";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6 relative overflow-hidden">
      {/* Dynamic background elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-50 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-50 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.03)_0%,transparent_100%)] pointer-events-none" />

      <div className="relative w-full max-w-md">
        {/* Logo Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-[32px] clay-surface bg-gradient-to-br from-indigo-600 to-purple-600 shadow-[0_20px_40px_rgba(79,70,229,0.3)] mb-6 group hover:rotate-12 transition-transform duration-500">
            <i className="fas fa-shield-halved text-white text-3xl" />
          </div>
          <h1 className="text-4xl font-black text-slate-800 tracking-tighter mb-2">Secure Node Access</h1>
          <p className="text-slate-400 text-sm font-black uppercase tracking-[0.2em]">Authentication Required</p>
        </div>

        {/* Login Card */}
        <div className="clay-card p-10 md:p-12 bg-white/70 backdrop-blur-md border-white">
          {error && (
            <div className="flex items-center gap-4 bg-red-50 border border-red-100 text-red-500 text-xs font-black uppercase tracking-widest px-5 py-4 rounded-2xl mb-8 animate-[shake_0.5s_ease-in-out]">
              <i className="fas fa-circle-exclamation text-lg" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-3">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">
                Node Identity (Email)
              </label>
              <div className="relative group">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors">
                  <i className="fas fa-at text-sm" />
                </div>
                <input
                  type="email"
                  required
                  value={credentials.email}
                  onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                  placeholder="admin@node.local"
                  className="w-full bg-slate-50/50 border-2 border-slate-100/50 text-slate-800 placeholder-slate-300 rounded-[24px] pl-12 pr-6 py-4 text-sm font-bold focus:outline-none focus:border-indigo-500/30 focus:bg-white transition-all shadow-inner"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">
                Access Protocol (Password)
              </label>
              <div className="relative group">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors">
                  <i className="fas fa-lock text-sm" />
                </div>
                <input
                  type="password"
                  required
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full bg-slate-50/50 border-2 border-slate-100/50 text-slate-800 placeholder-slate-300 rounded-[24px] pl-12 pr-6 py-4 text-sm font-bold focus:outline-none focus:border-indigo-500/30 focus:bg-white transition-all shadow-inner"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full clay-button-primary py-5 text-sm font-black group"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-3">
                  <i className="fas fa-circle-notch animate-spin" />
                  <span>Verifying Node...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-3">
                  <span>Initialize Authentication</span>
                  <i className="fas fa-chevron-right text-[10px] group-hover:translate-x-1 transition-transform" />
                </div>
              )}
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-slate-50 flex items-center justify-center">
            <Link to="/" className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] hover:text-indigo-600 transition-all flex items-center gap-2 group">
              <i className="fas fa-arrow-left group-hover:-translate-x-1 transition-transform" /> Back to public interface
            </Link>
          </div>
        </div>
        
        {/* Footer info */}
        <p className="text-center mt-8 text-[9px] font-black text-slate-300 uppercase tracking-[0.3em]">
          Standard Encryption Protocols Active
        </p>
      </div>
    </div>
  );
}
