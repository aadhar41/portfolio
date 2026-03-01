import { useState } from "react";
import { sendContact } from "../services/api";

const CONTACT_INFO = [
  {
    icon: "fas fa-envelope",
    label: "Email",
    value: "aadhar41@gmail.com",
    href: "mailto:aadhar41@gmail.com",
  },
  {
    icon: "fas fa-phone",
    label: "Phone",
    value: "+91-7737138843",
    href: "tel:+917737138843",
  },
  {
    icon: "fas fa-map-marker-alt",
    label: "Location",
    value: "Jaipur, Rajasthan, India",
    href: null,
  },
  {
    icon: "fab fa-linkedin",
    label: "LinkedIn",
    value: "linkedin.com/in/aadhar-gaur-php",
    href: "https://www.linkedin.com/in/aadhar-gaur-php",
  },
  {
    icon: "fab fa-github",
    label: "GitHub",
    value: "github.com/aadhar41",
    href: "https://github.com/aadhar41",
  },
];

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

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

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
      if (err.response?.status === 422) {
        setErrors(err.response.data.errors ?? {});
      } else {
        setStatus("error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* ── Page Hero ── */}
      <section className="page-hero">
        <div className="container">
          <h1>Get In Touch</h1>
          <p>
            Have a project in mind or just want to say hello? I'd love to hear
            from you.
          </p>
        </div>
      </section>

      <section className="section bg-light">
        <div className="container">
          <div className="row row-2" style={{ alignItems: "flex-start" }}>
            {/* Left — Contact Info */}
            <div className="contact-info">
              <h4
                style={{
                  fontWeight: 700,
                  marginBottom: "1.5rem",
                  color: "var(--primary-color)",
                }}
              >
                Contact Information
              </h4>
              {CONTACT_INFO.map((item) => (
                <div key={item.label} className="contact-item">
                  <div className="contact-icon">
                    <i className={item.icon} />
                  </div>
                  <div>
                    <h6
                      style={{ fontWeight: 600, margin: 0, fontSize: "0.9rem" }}
                    >
                      {item.label}
                    </h6>
                    {item.href ? (
                      <a
                        href={item.href}
                        target={
                          item.href.startsWith("http") ? "_blank" : undefined
                        }
                        rel="noreferrer"
                        style={{
                          color: "var(--secondary-color)",
                          fontSize: "0.9rem",
                        }}
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p
                        style={{
                          margin: 0,
                          color: "var(--text-light)",
                          fontSize: "0.9rem",
                        }}
                      >
                        {item.value}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Right — Contact Form */}
            <div className="card">
              <div className="card-header">
                <h5>
                  <i
                    className="fas fa-paper-plane"
                    style={{ marginRight: 8 }}
                  />
                  Send a Message
                </h5>
              </div>
              <div className="card-body">
                {status === "success" && (
                  <div className="alert-success">
                    <i
                      className="fas fa-check-circle"
                      style={{ marginRight: 8 }}
                    />
                    Message sent successfully! I'll reply soon.
                  </div>
                )}
                {status === "error" && (
                  <div className="alert-error">
                    <i
                      className="fas fa-exclamation-triangle"
                      style={{ marginRight: 8 }}
                    />
                    Something went wrong. Please try again later.
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="row row-2">
                    <div className="form-group">
                      <label className="form-label">Name *</label>
                      <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        type="text"
                        required
                        className="form-control"
                        placeholder="Your full name"
                      />
                      {errors.name && (
                        <p className="form-error">{errors.name[0]}</p>
                      )}
                    </div>
                    <div className="form-group">
                      <label className="form-label">Email *</label>
                      <input
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        type="email"
                        required
                        className="form-control"
                        placeholder="your@email.com"
                      />
                      {errors.email && (
                        <p className="form-error">{errors.email[0]}</p>
                      )}
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Subject</label>
                    <input
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      type="text"
                      className="form-control"
                      placeholder="What's this about?"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Message *</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={5}
                      required
                      className="form-control"
                      placeholder="Write your message here..."
                      style={{ resize: "none" }}
                    />
                    {errors.message && (
                      <p className="form-error">{errors.message[0]}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-gradient"
                    style={{
                      width: "100%",
                      justifyContent: "center",
                      opacity: loading ? 0.7 : 1,
                    }}
                  >
                    <i className="fas fa-paper-plane" />
                    {loading ? " Sending..." : " Send Message"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
