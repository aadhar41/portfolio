import { useState } from "react";
import { sendContact } from "../services/api";

const CONTACT_INFO = [
  { icon: "fas fa-envelope", label: "Direct Email", value: "aadhar41@gmail.com", href: "mailto:aadhar41@gmail.com" },
  { icon: "fas fa-phone", label: "Phone & WhatsApp", value: "+91-7737138843", href: "tel:+917737138843" },
  { icon: "fas fa-map-marker-alt", label: "Current Base", value: "Jaipur, Rajasthan, India", href: null },
  { icon: "fab fa-linkedin", label: "Professional Profile", value: "linkedin.com/in/aadhar-gaur-php", href: "https://www.linkedin.com/in/aadhar-gaur-php" },
  { icon: "fab fa-github", label: "Technical Portfolio", value: "github.com/aadhar41", href: "https://github.com/aadhar41" },
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
    <div className="group">
      <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 ml-4">
        {label}
      </label>
      <div className="clay-surface bg-white/80 p-0 overflow-hidden flex items-center border-slate-100 focus-within:border-indigo-500/50 transition-all duration-300">
        <input
          type={type}
          name={name}
          required={required}
          value={form[name]}
          onChange={handleChange}
          className={`w-full bg-transparent px-6 py-4 text-slate-800 outline-none placeholder:text-slate-300 font-bold transition-all
            ${errors?.[name] ? "text-red-500" : ""}`}
        />
      </div>
      {errors?.[name] && <p className="text-red-500 text-[10px] font-black mt-2 ml-4 uppercase">{errors[name][0]}</p>}
    </div>
  );

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative bg-white pt-40 pb-24 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-indigo-50 rounded-full blur-[100px]" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-50 rounded-full blur-[120px]" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 px-5 py-2 rounded-2xl mb-8 shadow-sm">
            <i className="fas fa-paper-plane text-indigo-500" />
            <span className="text-indigo-600 text-[10px] font-black uppercase tracking-[0.2em]">Open For Innovation</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black text-slate-800 mb-8 tracking-tight">Let's Connect</h1>
          <p className="text-slate-500 text-xl max-w-2xl mx-auto font-medium leading-relaxed">
            Whether it's a revolutionary startup idea or an enterprise scale architecture, I'm ready to listen and build.
          </p>
        </div>
      </section>

      {/* ── Main ── */}
      <section className="py-24 relative overflow-hidden bg-slate-50">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-100/30 rounded-full blur-[120px] translate-x-1/4 -translate-y-1/4" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

            {/* Left: Info panel */}
            <div className="space-y-8">
              <div className="clay-surface bg-gradient-to-br from-indigo-600 to-purple-800 p-8 md:p-12 text-white border-none relative overflow-hidden group">
                <div className="absolute -top-10 -right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700" />
                <div className="relative z-10">
                  <h4 className="text-3xl font-black mb-4 tracking-tight">Contact Portal</h4>
                  <p className="text-white/70 text-lg mb-12 font-medium">Reach out directly via the following channels for priority response.</p>
                  
                  <div className="space-y-8">
                    {CONTACT_INFO.map((item) => (
                      <div key={item.label} className="flex items-center gap-6 group/item">
                        <div className="shrink-0 w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center shadow-inner group-hover/item:bg-white group-hover/item:text-indigo-600 transition-all">
                          <i className={`${item.icon} text-lg`} />
                        </div>
                        <div>
                          <p className="text-white/40 text-[10px] font-black uppercase tracking-widest mb-1">{item.label}</p>
                          {item.href
                            ? <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="text-white text-lg font-black hover:text-indigo-200 transition-colors break-all tracking-tight">{item.value}</a>
                            : <p className="text-white text-lg font-black tracking-tight">{item.value}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Availability card */}
              <div className="clay-card p-8 bg-white border-white flex items-center gap-6 group hover:scale-[1.02] transition-all">
                <div className="relative">
                  <div className="w-16 h-16 rounded-[24px] bg-emerald-50 flex items-center justify-center shadow-inner">
                    <i className="fas fa-briefcase text-emerald-500 text-2xl" />
                  </div>
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-emerald-400 border-4 border-white animate-pulse" />
                </div>
                <div>
                  <h5 className="text-xl font-black text-slate-800 tracking-tight mb-1">Status: Open For Collaboration</h5>
                  <p className="text-slate-500 font-medium leading-relaxed">
                    Available for senior engineering roles, remote consultations, and architectural oversight.
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Form */}
            <div className="clay-card p-8 md:p-12 bg-white border-white">
              <div className="mb-10">
                <h4 className="text-3xl font-black text-slate-800 tracking-tight mb-2">Send a Message</h4>
                <p className="text-slate-400 text-lg font-medium">Drop me a line and I'll respond within 24 hours.</p>
              </div>

              {status === "success" && (
                <div className="clay-surface bg-emerald-50 border-emerald-100 text-emerald-700 p-6 mb-8 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-500 shadow-inner">
                    <i className="fas fa-check-circle" />
                  </div>
                  <p className="font-bold">Mission Accomplished! Your message is in my inbox.</p>
                </div>
              )}
              {status === "error" && (
                <div className="clay-surface bg-red-50 border-red-100 text-red-700 p-6 mb-8 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center text-red-500 shadow-inner">
                    <i className="fas fa-exclamation-triangle" />
                  </div>
                  <p className="font-bold">Deployment Failed. Please check your connection and try again.</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <InputField label="Identity" name="name" required errors={errors} />
                  <InputField label="Electronic Mail" name="email" type="email" required errors={errors} />
                </div>
                <InputField label="Reason for contact" name="subject" errors={errors} />
                <div className="group">
                  <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2 ml-4">
                    Message Body
                  </label>
                  <div className="clay-surface bg-white/80 p-0 overflow-hidden border-slate-100 focus-within:border-indigo-500/50 transition-all duration-300">
                    <textarea
                      name="message"
                      rows={6}
                      required
                      value={form.message}
                      onChange={handleChange}
                      style={{ resize: "none" }}
                      className={`w-full bg-transparent px-6 py-4 text-slate-800 outline-none placeholder:text-slate-300 font-bold transition-all
                        ${errors?.message ? "text-red-500" : ""}`}
                    />
                  </div>
                  {errors?.message && <p className="text-red-500 text-[10px] font-black mt-2 ml-4 uppercase">{errors.message[0]}</p>}
                </div>
                
                <button
                  type="submit"
                  disabled={loading}
                  className="clay-button-primary w-full py-5 text-lg"
                >
                  <i className={`fas ${loading ? "fa-circle-notch fa-spin" : "fa-paper-plane"} mr-3`} />
                  {loading ? "Transmitting..." : "Initiate Communication"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
