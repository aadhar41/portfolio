import { useState } from "react";
import { sendContact } from "../services/api";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    try {
      await sendContact(form);
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      if (err.response?.status === 422) {
        setErrors(err.response.data.errors);
      } else {
        setStatus("error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 pt-24 pb-16">
      <h1 className="text-4xl font-bold text-white mb-2">Contact Me</h1>
      <p className="text-slate-400 mb-8">
        Have a project in mind? Let us talk.
      </p>
      {status === "success" && (
        <div className="mb-6 p-4 bg-green-900/40 border border-green-700 text-green-300 rounded-lg">
          Message sent! I will reply soon.
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-5">
        {["name", "email", "subject"].map((f) => (
          <div key={f}>
            <label className="block text-slate-300 text-sm mb-1 capitalize">
              {f}
            </label>
            <input
              name={f}
              value={form[f]}
              onChange={handleChange}
              type={f === "email" ? "email" : "text"}
              required={f !== "subject"}
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 text-white rounded-lg outline-none focus:border-blue-500 transition"
            />
            {errors[f] && (
              <p className="text-red-400 text-xs mt-1">{errors[f][0]}</p>
            )}
          </div>
        ))}
        <div>
          <label className="block text-slate-300 text-sm mb-1">Message</label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            rows={6}
            required
            className="w-full px-4 py-3 bg-slate-800 border border-slate-700 text-white rounded-lg outline-none focus:border-blue-500 transition resize-none"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition disabled:opacity-50"
        >
          {loading ? "Sending..." : "Send Message"}
        </button>
      </form>
    </div>
  );
}
