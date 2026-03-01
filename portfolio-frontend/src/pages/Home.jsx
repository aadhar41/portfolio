import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProfile, getProjects, getBlogs } from "../services/api";

export default function Home() {
  const [profile, setProfile] = useState(null);
  const [skills, setSkills] = useState({});
  const [experiences, setExperiences] = useState([]);
  const [educations, setEducations] = useState([]);
  const [projects, setProjects] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [contactStatus, setContactStatus] = useState(null);
  const [contactLoading, setContactLoading] = useState(false);

  useEffect(() => {
    getProfile().then((res) => {
      setProfile(res.data.profile);
      setSkills(res.data.skills ?? {});
      setExperiences(res.data.experiences ?? []);
      setEducations(res.data.educations ?? []);
    });
    getProjects({}).then((res) => setProjects(res.data.slice(0, 6)));
    getBlogs({}).then((res) => setBlogs(res.data.slice(0, 3)));
  }, []);

  const handleContact = async (e) => {
    e.preventDefault();
    setContactLoading(true);
    try {
      const { sendContact } = await import("../services/api");
      await sendContact(contactForm);
      setContactStatus("success");
      setContactForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setContactStatus("error");
    } finally {
      setContactLoading(false);
    }
  };

  // Static fallbacks
  const staticSkills = {
    "Programming Languages": [
      "PHP",
      "JavaScript",
      "HTML5",
      "CSS3",
      "SQL",
      "Java",
    ],
    "Frameworks & Libraries": [
      "Laravel",
      "Yii Framework",
      "CodeIgniter",
      "CakePHP",
      "jQuery",
      "Bootstrap",
    ],
    "Databases & Tools": [
      "MySQL",
      "MongoDB",
      "RESTful APIs",
      "Git/GitHub",
      "WordPress",
      "MVC Architecture",
    ],
  };

  const staticExperiences = [
    {
      position: "Senior PHP Developer",
      company: "RG InfoTech",
      date: "Jan 2024 – Mar 2025",
      desc: "Led development of 6-7 concurrent Laravel projects, ensuring 100% on-time delivery. Designed and implemented RESTful APIs for third-party service integration.",
      techs: ["PHP", "Laravel", "MySQL", "RESTful APIs"],
    },
    {
      position: "Senior Software Engineer",
      company: "SimplifyVMS",
      date: "Jun 2022 – Dec 2023",
      desc: "Engineered backend services for large-scale Vendor Management System serving 10,000+ users. Optimized database queries improving system performance by 40%.",
      techs: ["PHP", "MySQL", "RESTful APIs", "Agile"],
    },
    {
      position: "Software Engineer III",
      company: "Matellio Inc.",
      date: "Nov 2021 – Jun 2022",
      desc: "Developed and maintained client-based applications using PHP. Created and integrated APIs for seamless data exchange.",
      techs: [],
    },
    {
      position: "PHP Developer",
      company: "The NineHertz",
      date: "May 2019 – Nov 2020",
      desc: "Developed web applications using Yii 1 framework and CakePHP. Contributed to both frontend and backend development.",
      techs: [],
    },
  ];

  const staticEducations = [
    {
      degree: "B.Tech in Information Technology",
      institution: "Rajasthan Technical University, Kota",
      years: "2008 – 2012",
    },
    {
      degree: "Senior Secondary in Science and Mathematics",
      institution: "D.B.N. School, Ajmer",
      years: "2006 – 2008",
    },
  ];

  const staticCerts = [
    "British Council English Score",
    "Learn SQL Course",
    "Learn Git Course",
    "Learn Command Line Course",
    "Learn Java Course",
  ];

  const displaySkills = Object.keys(skills).length > 0 ? skills : staticSkills;
  const displayExps =
    experiences.length > 0
      ? experiences.map((e) => ({
          position: e.position,
          company: e.company,
          date: `${e.start_date} – ${e.is_current ? "Present" : e.end_date}`,
          desc: e.description,
          techs: e.technologies ?? [],
        }))
      : staticExperiences;
  const displayEdus =
    educations.length > 0
      ? educations.map((e) => ({
          degree: `${e.degree} in ${e.field_of_study}`,
          institution: e.institution,
          years: `${e.start_year} – ${e.end_year ?? "Present"}`,
        }))
      : staticEducations;

  return (
    <>
      {/* ── Hero ── */}
      <section className="hero">
        <div className="container">
          <div className="hero-row hero-content">
            <div>
              <h1>{profile?.name ?? "Aadhar Gaur"}</h1>
              <p className="lead">
                {profile?.title ??
                  "Senior PHP Developer | Backend Specialist | Laravel & Yii Expert"}
              </p>
              <p>
                {profile?.bio ??
                  "Results-driven developer with 10+ years of experience in backend development, specializing in scalable web applications and RESTful API development."}
              </p>
              <div className="hero-buttons">
                <a href="#contact" className="btn btn-light">
                  <i className="fas fa-envelope" /> Get In Touch
                </a>
                <a href="#projects" className="btn btn-outline-light">
                  <i className="fas fa-code" /> View Projects
                </a>
              </div>
            </div>
            <div className="profile-img-container">
              <img
                src={profile?.avatar ?? "/avatar.png"}
                alt={profile?.name ?? "Aadhar Gaur"}
                className="profile-img"
                onError={(e) => {
                  e.target.src =
                    "https://ui-avatars.com/api/?name=Aadhar+Gaur&size=220&background=667eea&color=fff&rounded=true";
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── About ── */}
      <section id="about" className="section bg-white">
        <div className="container">
          <h2 className="section-title">About Me</h2>
          <div className="row row-2">
            <div>
              <h3 style={{ marginBottom: "1rem" }}>Professional Summary</h3>
              <p
                style={{
                  color: "var(--text-light)",
                  lineHeight: 1.8,
                  marginBottom: "1rem",
                }}
              >
                Results-driven Senior PHP Developer with 10+ years of experience
                in backend development, specializing in scalable web
                applications and RESTful API development. Proven expertise in
                PHP, Laravel, Yii framework, and MySQL with a track record of
                successfully delivering 15+ enterprise-level projects.
              </p>
              <p style={{ color: "var(--text-light)", lineHeight: 1.8 }}>
                Strong background in agile methodologies, code optimization, and
                cross-functional team leadership.
              </p>
            </div>
            <div>
              <h3 style={{ marginBottom: "1rem" }}>Key Achievements</h3>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {[
                  "Led development of 6-7 diverse Laravel projects simultaneously at RG InfoTech",
                  "Engineered high-performance backend services for large-scale Vendor Management System",
                  "Mentored 5+ junior developers and improved team productivity by 25%",
                  "Successfully delivered 15+ enterprise-level projects",
                ].map((a) => (
                  <li
                    key={a}
                    style={{
                      marginBottom: "0.75rem",
                      color: "var(--text-light)",
                    }}
                  >
                    <i
                      className="fas fa-check-circle"
                      style={{
                        color: "var(--secondary-color)",
                        marginRight: 8,
                      }}
                    />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Skills ── */}
      <section id="skills" className="section bg-light">
        <div className="container">
          <h2 className="section-title">Technical Skills</h2>
          <div className="row row-3">
            {Object.entries(displaySkills).map(([cat, items], i) => {
              const icons = [
                "fas fa-code",
                "fas fa-layer-group",
                "fas fa-database",
              ];
              const arr = Array.isArray(items) ? items : items.map ? items : [];
              return (
                <div key={cat} className="card">
                  <div className="card-header">
                    <h5>
                      <i
                        className={icons[i] ?? "fas fa-star"}
                        style={{ marginRight: 8 }}
                      />
                      {cat}
                    </h5>
                  </div>
                  <div className="card-body">
                    {arr.map((s) => (
                      <div
                        key={typeof s === "string" ? s : s.name}
                        className="skill-item-pill"
                        style={{
                          display: "block",
                          marginBottom: 8,
                          borderRadius: 8,
                          background: "var(--bg-light)",
                          boxShadow: "none",
                          padding: "0.5rem 0.75rem",
                        }}
                      >
                        {typeof s === "string" ? s : s.name}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CV Download ── */}
      <section
        id="cv-download"
        className="section bg-white"
        style={{ textAlign: "center" }}
      >
        <div className="container">
          <h2 className="section-title">Download My Resume</h2>
          <p
            className="text-muted"
            style={{ maxWidth: 560, margin: "0 auto 2rem", lineHeight: 1.7 }}
          >
            Access my full professional resume for a comprehensive overview of
            my experience, skills, and qualifications.
          </p>
          <div className="flex gap-2 justify-center">
            <a
              href="/assets/docs/Aadhar_Gaur_CV.pdf"
              download
              className="btn btn-gradient"
            >
              <i className="fas fa-download" /> Download CV
            </a>
            <a
              href="/assets/docs/Aadhar_Gaur_Projects.pdf"
              download
              className="btn btn-outline-primary"
            >
              <i className="fas fa-file-pdf" /> Projects List
            </a>
          </div>
        </div>
      </section>

      {/* ── Experience ── */}
      <section id="experience" className="section bg-light">
        <div className="container">
          <h2 className="section-title">Professional Experience</h2>
          <div className="timeline">
            {displayExps.map((exp, i) => (
              <div key={i} className="timeline-item">
                <div className="timeline-card">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      flexWrap: "wrap",
                      gap: "0.5rem",
                      marginBottom: "0.5rem",
                    }}
                  >
                    <div>
                      <h5 style={{ fontWeight: 700, margin: 0 }}>
                        {exp.position}
                      </h5>
                      <p
                        style={{
                          color: "var(--text-light)",
                          margin: "2px 0",
                          fontSize: "0.9rem",
                        }}
                      >
                        {exp.company}
                      </p>
                    </div>
                    <span
                      style={{
                        color: "var(--text-light)",
                        fontSize: "0.85rem",
                      }}
                    >
                      {exp.date}
                    </span>
                  </div>
                  <p
                    style={{
                      color: "var(--text-light)",
                      fontSize: "0.9rem",
                      marginBottom: exp.techs?.length ? "0.75rem" : 0,
                    }}
                  >
                    {exp.desc}
                  </p>
                  {exp.techs?.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {exp.techs.map((t) => (
                        <span key={t} className="badge badge-primary">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Projects ── */}
      <section id="projects" className="section bg-white">
        <div className="container">
          <h2 className="section-title">Featured Projects</h2>
          <div className="row row-3">
            {projects.length > 0
              ? projects.map((p) => (
                  <div key={p.id} className="card">
                    <div className="card-header">
                      <h5>{p.title}</h5>
                      <small className="text-capitalize">{p.category}</small>
                    </div>
                    <div
                      className="card-body"
                      style={{ display: "flex", flexDirection: "column" }}
                    >
                      <p
                        style={{
                          color: "var(--text-light)",
                          fontSize: "0.9rem",
                          marginBottom: "1rem",
                          flexGrow: 1,
                        }}
                      >
                        {p.description}
                      </p>
                      <div
                        className="flex flex-wrap gap-1"
                        style={{ marginBottom: "1rem" }}
                      >
                        {p.technologies?.slice(0, 3).map((t) => (
                          <span key={t} className="badge badge-primary">
                            {t}
                          </span>
                        ))}
                      </div>
                      <Link
                        to={`/projects/${p.id}`}
                        className="btn btn-outline-primary btn-sm"
                        style={{ alignSelf: "flex-start" }}
                      >
                        View Details <i className="fas fa-arrow-right" />
                      </Link>
                    </div>
                  </div>
                ))
              : [
                  {
                    title: "Vendor Management System",
                    client: "SimplifyVMS",
                    desc: "A comprehensive VMS serving 10,000+ concurrent users with optimized performance and 99.9% uptime.",
                    techs: ["Laravel", "REST APIs", "Mobile Backend"],
                    color: "#e74c3c",
                  },
                  {
                    title: "HRMS System",
                    client: "RG InfoTech",
                    desc: "Optimized and restructured HRMS code for enhanced performance and maintainability with custom modules.",
                    techs: ["Laravel", "MySQL", "UI/UX"],
                    color: "#95a5a6",
                  },
                  {
                    title: "Gaming Platform",
                    client: "Gamepro11 & Vision11",
                    desc: "Integrated third-party Evoplay services and implemented 2FA security with invoice generation.",
                    techs: ["Laravel", "Third-party APIs", "Security"],
                    color: "#3498db",
                  },
                  {
                    title: "Medical Staff Recruitment",
                    client: "Appinop Technologies",
                    desc: "Comprehensive web application for recruiting medical staff with job postings and applicant tracking.",
                    techs: ["PHP", "JavaScript", "MySQL"],
                    color: "#27ae60",
                  },
                  {
                    title: "Car Rental Management",
                    client: "Multiple Companies",
                    desc: "Efficient car rental management system with vehicle reservations, returns, and customer management.",
                    techs: ["PHP", "CodeIgniter", "Bootstrap"],
                    color: "#f39c12",
                  },
                  {
                    title: "Mobile App APIs",
                    client: "Various Projects",
                    desc: "Built RESTful APIs for mobile applications including React Native and iOS apps with Laravel backend.",
                    techs: ["PHP", "MySQL", "REST APIs"],
                    color: "#9b59b6",
                  },
                ].map((p, i) => (
                  <div key={i} className="card">
                    <div
                      className="card-header"
                      style={{
                        background: `linear-gradient(135deg, ${p.color}, ${p.color}cc)`,
                      }}
                    >
                      <h5>{p.title}</h5>
                      <small>{p.client}</small>
                    </div>
                    <div
                      className="card-body"
                      style={{ display: "flex", flexDirection: "column" }}
                    >
                      <p
                        style={{
                          color: "var(--text-light)",
                          fontSize: "0.9rem",
                          marginBottom: "1rem",
                          flexGrow: 1,
                        }}
                      >
                        {p.desc}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {p.techs.map((t) => (
                          <span key={t} className="badge badge-primary">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
          </div>
          <div className="text-center mt-3">
            <Link to="/projects" className="btn btn-secondary">
              View All Projects <i className="fas fa-arrow-right" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Education & Certifications ── */}
      <section id="education" className="section bg-light">
        <div className="container">
          <h2 className="section-title">Education &amp; Certifications</h2>
          <div className="row row-2">
            <div className="card">
              <div className="card-header">
                <h5>
                  <i
                    className="fas fa-graduation-cap"
                    style={{ marginRight: 8 }}
                  />
                  Education
                </h5>
              </div>
              <div className="card-body">
                {displayEdus.map((edu, i) => (
                  <div
                    key={i}
                    style={{
                      marginBottom: i < displayEdus.length - 1 ? "1.5rem" : 0,
                    }}
                  >
                    <h6 style={{ fontWeight: 700 }}>{edu.degree}</h6>
                    <p style={{ color: "var(--text-light)", margin: "2px 0" }}>
                      {edu.institution}
                    </p>
                    <small style={{ color: "var(--text-light)" }}>
                      {edu.years}
                    </small>
                  </div>
                ))}
              </div>
            </div>
            <div className="card">
              <div className="card-header">
                <h5>
                  <i
                    className="fas fa-certificate"
                    style={{ marginRight: 8 }}
                  />
                  Certifications
                </h5>
              </div>
              <div className="card-body">
                <ul style={{ listStyle: "none", padding: 0 }}>
                  {staticCerts.map((c) => (
                    <li
                      key={c}
                      style={{
                        marginBottom: "0.75rem",
                        color: "var(--text-light)",
                      }}
                    >
                      <i
                        className="fas fa-award"
                        style={{
                          color: "var(--secondary-color)",
                          marginRight: 8,
                        }}
                      />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Latest Blog Posts ── */}
      <section id="blog" className="section bg-white">
        <div className="container">
          <h2 className="section-title">Latest Blog Posts</h2>
          <div className="row row-3" style={{ marginTop: "2rem" }}>
            {blogs.map((blog) => (
              <article
                key={blog.id}
                className="card blog-card"
                style={{ overflow: "hidden" }}
              >
                {blog.cover_image ? (
                  <div style={{ overflow: "hidden" }}>
                    <img
                      src={blog.cover_image}
                      alt={blog.title}
                      className="blog-card-img"
                    />
                  </div>
                ) : (
                  <div
                    style={{
                      height: 180,
                      background: "var(--gradient)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "white",
                      fontSize: "1.5rem",
                      fontWeight: 700,
                    }}
                  >
                    {blog.tags?.[0] ?? "Blog"}
                  </div>
                )}
                <div
                  className="card-body"
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <div
                    style={{
                      fontSize: "0.8rem",
                      color: "var(--text-light)",
                      marginBottom: "0.5rem",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <span>
                      <i
                        className="fas fa-calendar-alt"
                        style={{ marginRight: 4 }}
                      />
                      {blog.published_at
                        ? new Date(blog.published_at).toLocaleDateString(
                            "en-IN",
                            { month: "short", day: "numeric", year: "numeric" },
                          )
                        : ""}
                    </span>
                    <span
                      className="badge badge-primary"
                      style={{ fontSize: "0.75rem" }}
                    >
                      <i className="fas fa-tag" style={{ marginRight: 3 }} />
                      {blog.tags?.[0]}
                    </span>
                  </div>
                  <h3
                    style={{
                      fontSize: "0.95rem",
                      fontWeight: 600,
                      marginBottom: "0.5rem",
                      color: "var(--primary-color)",
                    }}
                  >
                    <Link
                      to={`/blog/${blog.slug}`}
                      style={{ color: "inherit" }}
                    >
                      {blog.title}
                    </Link>
                  </h3>
                  <p
                    style={{
                      fontSize: "0.85rem",
                      color: "var(--text-light)",
                      flexGrow: 1,
                      marginBottom: "1rem",
                    }}
                  >
                    {blog.excerpt}
                  </p>
                  <Link
                    to={`/blog/${blog.slug}`}
                    className="btn btn-outline-primary btn-sm"
                    style={{ alignSelf: "flex-start" }}
                  >
                    Read More <i className="fas fa-arrow-right" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
          <div className="text-center mt-3">
            <Link to="/blog" className="btn btn-secondary">
              View All Posts <i className="fas fa-arrow-right" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Get In Touch ── */}
      <section id="contact" className="section bg-light">
        <div className="container">
          <h2 className="section-title">Get In Touch</h2>
          <div className="row row-2" style={{ alignItems: "flex-start" }}>
            {/* Contact Info */}
            <div className="contact-info">
              <h4 style={{ fontWeight: 700, marginBottom: "1.5rem" }}>
                Contact Information
              </h4>
              {[
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
              ].map((item) => (
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

            {/* Contact Form */}
            <div className="card">
              <div className="card-header">
                <h5>Send a Message</h5>
              </div>
              <div className="card-body">
                {contactStatus === "success" && (
                  <div
                    className="alert-success"
                    style={{ marginBottom: "1rem" }}
                  >
                    Message sent! I'll reply soon.
                  </div>
                )}
                {contactStatus === "error" && (
                  <div className="alert-error" style={{ marginBottom: "1rem" }}>
                    Something went wrong. Try again.
                  </div>
                )}
                <form onSubmit={handleContact}>
                  <div
                    className="row row-2"
                    style={{ gap: "1rem", marginBottom: "1rem" }}
                  >
                    <div>
                      <label className="form-label">First Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={contactForm.name.split(" ")[0] ?? ""}
                        onChange={(e) =>
                          setContactForm({
                            ...contactForm,
                            name: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div>
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        value={contactForm.email}
                        onChange={(e) =>
                          setContactForm({
                            ...contactForm,
                            email: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Subject</label>
                    <input
                      type="text"
                      className="form-control"
                      value={contactForm.subject}
                      onChange={(e) =>
                        setContactForm({
                          ...contactForm,
                          subject: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Message</label>
                    <textarea
                      className="form-control"
                      rows={4}
                      value={contactForm.message}
                      onChange={(e) =>
                        setContactForm({
                          ...contactForm,
                          message: e.target.value,
                        })
                      }
                      required
                      style={{ resize: "none" }}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={contactLoading}
                    className="btn btn-gradient"
                    style={{ opacity: contactLoading ? 0.7 : 1 }}
                  >
                    <i className="fas fa-paper-plane" />{" "}
                    {contactLoading ? "Sending..." : "Send Message"}
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
