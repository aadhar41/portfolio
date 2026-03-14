import { useState } from "react";
import { sendContact } from "../services/api";

const CONTACT_INFO = [
  { icon: "fas fa-envelope", label: "Email", value: "aadhar41@gmail.com", href: "mailto:aadhar41@gmail.com" },
  { icon: "fas fa-phone", label: "Phone", value: "+91-7737138843", href: "tel:+917737138843" },
  { icon: "fas fa-map-marker-alt", label: "Location", value: "Jaipur, Rajasthan, India", href: null },
  { icon: "fab fa-linkedin", label: "LinkedIn", value: "linkedin.com/in/aadhar-gaur-php", href: "https://www.linkedin.com/in/aadhar-gaur-php" },
  { icon: "fab fa-github", label: "GitHub", value: "github.com/aadhar41", href: "https://github.com/aadhar41" },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    setErrors({});
    try {
      await sendContact(form);
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      if (err.response?.status === 422) setErrors(err.response.data.errors ?? {});
      else setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  const InputField = ({ label, name, type = "text", required = false, errors }) => (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1.5">{label}</label>
      <input
        type={type}
        name={name}
        required={required}
        value={form[name]}
        onChange={handleChange}
        className={`w-full border rounded-xl px-4 py-3 text-sm text-slate-800 bg-white outline-none transition-all
          ${errors?.[name] ? "border-red-400 focus:ring-2 focus:ring-red-300/30" : "border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"}`}
      />
      {errors?.[name] && <p className="text-red-500 text-xs mt-1">{errors[name][0]}</p>}
    </div>
  );

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-violet-700 text-white pt-28 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_2px_2px,rgba(255,255,255,0.1)_1px,transparent_0)] bg-[length:28px_28px]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/80 text-sm px-4 py-1.5 rounded-full mb-5">
            <i className="fas fa-envelope" /> Contact
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Get In Touch</h1>
          <p className="text-white/70 text-lg max-w-xl mx-auto">
            Open to full-time, freelance, and remote opportunities. Let's build something great together.
          </p>
        </div>
      </section>

      {/* ── Main ── */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">

            {/* Left: Info panel */}
            <div>
              <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-8 text-white mb-6">
                <h4 className="text-xl font-bold mb-2">Contact Information</h4>
                <p className="text-white/70 text-sm mb-8">Reach out directly via any of the channels below or fill in the form.</p>
                <div className="space-y-5">
                  {CONTACT_INFO.map((item) => (
                    <div key={item.label} className="flex items-start gap-4">
                      <div className="shrink-0 w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center">
                        <i className={`${item.icon} text-sm`} />
                      </div>
                      <div>
                        <p className="text-white/60 text-xs font-medium uppercase tracking-wider">{item.label}</p>
                        {item.href
                          ? <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="text-white text-sm hover:text-indigo-200 transition-colors break-all">{item.value}</a>
                          : <p className="text-white text-sm">{item.value}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Availability card */}
              <div className="bg-white rounded-2xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-slate-100">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
                  <h5 className="font-bold text-slate-800">Available for Work</h5>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Currently open to full-time, freelance, and consulting opportunities. Response time is usually within 24 hours.
                </p>
              </div>
            </div>

            {/* Right: Form */}
            <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.07)] p-8">
              <h4 className="text-2xl font-bold text-slate-800 mb-1">Send a Message</h4>
              <p className="text-slate-400 text-sm mb-6">I'll get back to you as soon as possible.</p>

              {status === "success" && (
                <div className="bg-green-50 border border-green-200 text-green-700 rounded-xl p-4 mb-5 flex items-center gap-2 text-sm">
                  <i className="fas fa-check-circle text-green-500" /> Your message was sent! I'll reply soon.
                </div>
              )}
              {status === "error" && (
                <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 mb-5 flex items-center gap-2 text-sm">
                  <i className="fas fa-exclamation-triangle" /> Something went wrong. Please try again.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <InputField label="Your Name" name="name" required errors={errors} />
                  <InputField label="Email Address" name="email" type="email" required errors={errors} />
                </div>
                <InputField label="Subject" name="subject" errors={errors} />
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Message</label>
                  <textarea
                    name="message"
                    rows={6}
                    required
                    value={form.message}
                    onChange={handleChange}
                    style={{ resize: "none" }}
                    className={`w-full border rounded-xl px-4 py-3 text-sm text-slate-800 bg-white outline-none transition-all
                      ${errors?.message ? "border-red-400 focus:ring-2 focus:ring-red-300/30" : "border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"}`}
                  />
                  {errors?.message && <p className="text-red-500 text-xs mt-1">{errors.message[0]}</p>}
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full inline-flex justify-center items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-3.5 rounded-xl transition-all duration-200
                    ${loading ? "opacity-70 cursor-not-allowed" : "hover:shadow-[0_6px_20px_rgba(99,102,241,0.4)] hover:-translate-y-0.5"}`}
                >
                  <i className="fas fa-paper-plane" />
                  {loading ? "Sending…" : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
