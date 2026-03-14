import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProfile, getProjects, getBlogs } from "../services/api";

/* ── Helpers ── */
const skillIcons = [
  "fas fa-code",
  "fas fa-layer-group",
  "fas fa-database",
  "fas fa-server",
  "fas fa-tools",
  "fas fa-cloud",
];

const CONTACTS = [
  { icon: "fas fa-envelope", label: "Email", value: "aadhar41@gmail.com", href: "mailto:aadhar41@gmail.com" },
  { icon: "fas fa-phone", label: "Phone", value: "+91-7737138843", href: "tel:+917737138843" },
  { icon: "fas fa-map-marker-alt", label: "Location", value: "Jaipur, Rajasthan, India", href: null },
  { icon: "fab fa-linkedin", label: "LinkedIn", value: "linkedin.com/in/aadhar-gaur-php", href: "https://www.linkedin.com/in/aadhar-gaur-php" },
  { icon: "fab fa-github", label: "GitHub", value: "github.com/aadhar41", href: "https://github.com/aadhar41" },
];

export default function Home() {
  const [profile, setProfile] = useState(null);
  const [skills, setSkills] = useState({});
  const [experiences, setExperiences] = useState([]);
  const [educations, setEducations] = useState([]);
  const [projects, setProjects] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [contactForm, setContactForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [contactStatus, setContactStatus] = useState(null);
  const [contactLoading, setContactLoading] = useState(false);

  useEffect(() => {
    getProfile().then((res) => {
      setProfile(res.data.profile);
      setSkills(res.data.skills ?? {});
      setExperiences(res.data.experiences ?? []);
      setEducations(res.data.educations ?? []);
    }).catch(() => {});
    getProjects({}).then((res) => {
      const d = res.data.data || res.data;
      setProjects(Array.isArray(d) ? d.slice(0, 6) : []);
    }).catch(() => {});
    getBlogs({}).then((res) => {
      const d = res.data.data || res.data;
      setBlogs(Array.isArray(d) ? d.slice(0, 3) : []);
    }).catch(() => {});
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

  /* ── Static fallbacks ── */
  const staticSkills = {
    "Programming Languages": ["PHP", "JavaScript", "HTML5", "CSS3", "SQL", "Java"],
    "Frameworks & Libraries": ["Laravel", "Yii Framework", "CodeIgniter", "CakePHP", "jQuery", "Bootstrap"],
    "Databases & Tools": ["MySQL", "MongoDB", "RESTful APIs", "Git/GitHub", "WordPress", "MVC Architecture"],
  };
  const staticExps = [
    { position: "Senior PHP Developer", company: "RG InfoTech", date: "Jan 2024 – Mar 2025", desc: "Led development of 6-7 concurrent Laravel projects, ensuring 100% on-time delivery. Designed and implemented RESTful APIs.", techs: ["PHP", "Laravel", "MySQL", "RESTful APIs"] },
    { position: "Senior Software Engineer", company: "SimplifyVMS", date: "Jun 2022 – Dec 2023", desc: "Engineered backend services for large-scale Vendor Management System serving 10,000+ users. Optimised DB by 40%.", techs: ["PHP", "MySQL", "RESTful APIs", "Agile"] },
    { position: "Software Engineer III", company: "Matellio Inc.", date: "Nov 2021 – Jun 2022", desc: "Developed and maintained client-based applications using PHP. Created and integrated APIs.", techs: [] },
    { position: "PHP Developer", company: "The NineHertz", date: "May 2019 – Nov 2020", desc: "Developed web applications using Yii 1 framework and CakePHP.", techs: [] },
  ];
  const staticEdus = [
    { degree: "B.Tech in Information Technology", institution: "Rajasthan Technical University, Kota", years: "2008 – 2012" },
    { degree: "Senior Secondary in Science & Maths", institution: "D.B.N. School, Ajmer", years: "2006 – 2008" },
  ];
  const staticCerts = [
    "British Council English Score",
    "Learn SQL Course",
    "Learn Git Course",
    "Learn Command Line Course",
    "Learn Java Course",
  ];
  const staticProjects = [
    { title: "Vendor Management System", client: "SimplifyVMS", desc: "Comprehensive VMS serving 10,000+ users with 99.9% uptime.", techs: ["Laravel", "REST APIs", "Mobile Backend"], color: "#6366f1" },
    { title: "HRMS System", client: "RG InfoTech", desc: "Optimised HRMS code for enhanced performance with custom modules.", techs: ["Laravel", "MySQL", "UI/UX"], color: "#8b5cf6" },
    { title: "Gaming Platform", client: "Gamepro11 & Vision11", desc: "Integrated Evoplay services and implemented 2FA security.", techs: ["Laravel", "Third-party APIs", "Security"], color: "#06b6d4" },
    { title: "Medical Staff Recruitment", client: "Appinop Technologies", desc: "Web app for recruiting medical staff with applicant tracking.", techs: ["PHP", "JavaScript", "MySQL"], color: "#10b981" },
    { title: "Car Rental Management", client: "Multiple Companies", desc: "Car rental system with vehicle reservations and customer management.", techs: ["PHP", "CodeIgniter", "Bootstrap"], color: "#f59e0b" },
    { title: "Mobile App APIs", client: "Various Projects", desc: "RESTful APIs for React Native and iOS apps with Laravel backend.", techs: ["PHP", "MySQL", "REST APIs"], color: "#ec4899" },
  ];

  const displaySkills = Object.keys(skills).length > 0 ? skills : staticSkills;
  const displayExps = experiences.length > 0
    ? experiences.map((e) => ({ position: e.position, company: e.company, date: `${e.start_date} – ${e.is_current ? "Present" : e.end_date}`, desc: e.description, techs: e.technologies ?? [] }))
    : staticExps;
  const displayEdus = educations.length > 0
    ? educations.map((e) => ({ degree: `${e.degree} in ${e.field_of_study}`, institution: e.institution, years: `${e.start_year} – ${e.end_year ?? "Present"}` }))
    : staticEdus;

  /* ── Shared helpers ── */
  const SectionHeading = ({ children }) => (
    <div className="text-center mb-14">
      <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">{children}</h2>
      <span className="inline-block w-16 h-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500" />
    </div>
  );

  const Badge = ({ children, variant = "primary" }) => {
    const cls = variant === "gradient"
      ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white"
      : "bg-indigo-50 text-indigo-600";
    return <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${cls}`}>{children}</span>;
  };

  return (
    <>
      {/* ────────────────────────────────── HERO ── */}
      <section
        id="hero"
        className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-violet-700 text-white pt-32 pb-24 overflow-hidden hero-pattern"
      >
        {/* Decorative blobs */}
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-indigo-300/10 rounded-full blur-2xl" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex flex-col-reverse md:flex-row items-center gap-12 md:gap-16">
            {/* Text */}
            <div className="flex-1 text-center md:text-left animate-[fadeInUp_0.8s_ease_both]">
              <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/90 text-sm font-medium px-4 py-1.5 rounded-full mb-6 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" /> Available for opportunities
              </span>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4 tracking-tight">
                {profile?.name ?? "Aadhar Gaur"}
              </h1>
              <p className="text-lg md:text-xl text-white/80 font-medium mb-4">
                {profile?.title ?? "Senior PHP Developer | Backend Specialist | Laravel & Yii Expert"}
              </p>
              <p className="text-white/70 text-base md:text-lg leading-relaxed max-w-xl mx-auto md:mx-0 mb-8">
                {profile?.bio ?? "Results-driven developer with 10+ years of experience in backend development, specializing in scalable web applications and RESTful API development."}
              </p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <a href="#contact" className="inline-flex items-center gap-2 bg-white text-indigo-700 font-semibold px-6 py-3 rounded-full hover:shadow-[0_8px_24px_rgba(255,255,255,0.35)] hover:-translate-y-0.5 transition-all duration-200">
                  <i className="fas fa-envelope" /> Get In Touch
                </a>
                <a href="#projects" className="inline-flex items-center gap-2 bg-white/10 border border-white/30 text-white font-semibold px-6 py-3 rounded-full hover:bg-white/20 hover:-translate-y-0.5 transition-all duration-200">
                  <i className="fas fa-code" /> View Projects
                </a>
              </div>
              {/* Social row */}
              <div className="flex items-center gap-3 mt-8 justify-center md:justify-start">
                {[
                  { icon: "fab fa-github", href: "https://github.com/aadhar41" },
                  { icon: "fab fa-linkedin-in", href: "https://www.linkedin.com/in/aadhar-gaur-php" },
                  { icon: "fas fa-envelope", href: "mailto:aadhar41@gmail.com" },
                ].map((s) => (
                  <a key={s.href} href={s.href} target="_blank" rel="noreferrer"
                    className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-indigo-600 transition-all duration-200">
                    <i className={`${s.icon} text-sm`} />
                  </a>
                ))}
              </div>
            </div>

            {/* Avatar */}
            <div className="shrink-0 animate-[fadeInRight_0.9s_ease_0.3s_both]">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/30 to-transparent blur-xl scale-110" />
                <img
                  src={profile?.avatar ?? "/avatar.png"}
                  alt={profile?.name ?? "Aadhar Gaur"}
                  className="relative w-40 h-40 md:w-56 md:h-56 rounded-full object-cover border-4 border-white/30 shadow-2xl"
                  onError={(e) => { e.target.src = "https://ui-avatars.com/api/?name=Aadhar+Gaur&size=220&background=6366f1&color=fff&rounded=true"; }}
                />
                <span className="absolute bottom-3 right-1 bg-green-400 w-5 h-5 rounded-full border-2 border-white shadow-sm" />
              </div>
            </div>
          </div>

          {/* Stats strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-16 pt-10 border-t border-white/15">
            {[
              { num: "10+", label: "Years Experience" },
              { num: "15+", label: "Enterprise Projects" },
              { num: "40%", label: "Performance Boost" },
              { num: "10K+", label: "Users Served" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-3xl font-bold text-white">{s.num}</p>
                <p className="text-white/60 text-sm mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────────────────────── ABOUT ── */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading>About Me</SectionHeading>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-start">
            <div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">Professional Summary</h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                Results-driven Senior PHP Developer with 10+ years of experience in backend development, specializing in scalable web applications and RESTful API development. Proven expertise in PHP, Laravel, Yii framework, and MySQL with a track record of successfully delivering 15+ enterprise-level projects.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Strong background in agile methodologies, code optimization, and cross-functional team leadership.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">Key Achievements</h3>
              <ul className="space-y-4">
                {[
                  "Led development of 6-7 diverse Laravel projects simultaneously at RG InfoTech",
                  "Engineered high-performance backend services for large-scale Vendor Management System",
                  "Mentored 5+ junior developers and improved team productivity by 25%",
                  "Successfully delivered 15+ enterprise-level projects",
                ].map((a) => (
                  <li key={a} className="flex items-start gap-3 text-slate-600">
                    <div className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center">
                      <i className="fas fa-check text-indigo-600 text-xs" />
                    </div>
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────── SKILLS ── */}
      <section id="skills" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading>Technical Skills</SectionHeading>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(displaySkills).map(([cat, items], i) => {
              const arr = Array.isArray(items) ? items : [];
              return (
                <div key={cat} className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.06)] overflow-hidden hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(99,102,241,0.12)] transition-all duration-300">
                  <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-5">
                    <h5 className="text-white font-semibold text-base flex items-center gap-2.5">
                      <i className={skillIcons[i] ?? "fas fa-star"} />
                      {cat}
                    </h5>
                  </div>
                  <div className="p-5 flex flex-wrap gap-2">
                    {arr.map((s) => {
                      const name = typeof s === "string" ? s : s.name;
                      return (
                        <span key={name} className="bg-slate-50 text-slate-700 text-sm font-medium px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-indigo-50 hover:text-indigo-700 hover:border-indigo-200 transition-colors duration-200">
                          {name}
                        </span>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ────────────────────────────────── RESUME ── */}
      <section id="cv-download" className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <SectionHeading>Download My Resume</SectionHeading>
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl border border-indigo-100 p-10">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <i className="fas fa-file-alt text-white text-2xl" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-3">Aadhar Gaur — CV</h3>
            <p className="text-slate-600 mb-8 leading-relaxed">
              Access my full professional resume for a comprehensive overview of my experience, skills, and qualifications.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="/docs/Aadhar_Gaur_CV.pdf" download="Aadhar_Gaur_CV.pdf"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold px-7 py-3 rounded-full hover:shadow-[0_6px_20px_rgba(99,102,241,0.4)] hover:-translate-y-0.5 transition-all duration-200">
                <i className="fas fa-download" /> Download CV
              </a>
              <a href="/docs/Aadhar_Gaur_Projects.pdf" download="Aadhar_Gaur_Projects.pdf"
                className="inline-flex items-center gap-2 border-2 border-indigo-600 text-indigo-600 font-semibold px-7 py-3 rounded-full hover:bg-indigo-600 hover:text-white hover:-translate-y-0.5 transition-all duration-200">
                <i className="fas fa-file-pdf" /> Projects List
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────── EXPERIENCE ── */}
      <section id="experience" className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <SectionHeading>Professional Experience</SectionHeading>
          <div className="relative timeline-line pl-10">
            {displayExps.map((exp, i) => (
              <div key={i} className="relative mb-8 group">
                {/* dot */}
                <div className="absolute left-[-2.45rem] top-1.5 w-5 h-5 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 border-4 border-white shadow-md shadow-indigo-200" />

                <div className="bg-white rounded-2xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-slate-100 hover:shadow-[0_8px_32px_rgba(99,102,241,0.10)] hover:border-indigo-100 transition-all duration-300">
                  <div className="flex flex-wrap justify-between gap-2 mb-3">
                    <div>
                      <h5 className="font-bold text-slate-800 text-lg leading-tight">{exp.position}</h5>
                      <p className="text-indigo-600 font-medium text-sm mt-0.5">{exp.company}</p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-slate-400 text-sm bg-slate-50 px-3 py-1 rounded-full h-fit border border-slate-200">
                      <i className="fas fa-calendar-alt text-xs" /> {exp.date}
                    </span>
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed mb-4">{exp.desc}</p>
                  {exp.techs?.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {exp.techs.map((t) => <Badge key={t}>{t}</Badge>)}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────────────────────── PROJECTS ── */}
      <section id="projects" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading>Featured Projects</SectionHeading>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.length > 0
              ? projects.map((p) => (
                  <div key={p.id} className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.07)] border border-slate-100 overflow-hidden flex flex-col hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(99,102,241,0.12)] hover:border-indigo-100 transition-all duration-300 group">
                    <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-5">
                      <h5 className="text-white font-semibold">{p.title}</h5>
                      <small className="text-white/70 text-xs capitalize">{p.category}</small>
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      {p.image && (
                        <div className="h-36 bg-slate-100 rounded-xl mb-4 overflow-hidden">
                          <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            onError={(e) => {
                              const rn = p.github_url?.split("/").pop();
                              const og = `https://opengraph.githubassets.com/1/aadhar41/${rn}`;
                              if (e.target.src !== og) e.target.src = og;
                              else { e.target.style.display = "none"; e.target.parentElement.innerHTML = `<div class="w-full h-full flex items-center justify-center text-slate-400"><i class="fas fa-code fa-2x"></i></div>`; }
                            }} />
                        </div>
                      )}
                      <p className="text-slate-600 text-sm leading-relaxed flex-1 mb-4">{p.description}</p>
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {p.technologies?.slice(0, 3).map((t) => <Badge key={t}>{t}</Badge>)}
                      </div>
                      <Link to={`/projects/${p.id}`}
                        className="self-start inline-flex items-center gap-1.5 border border-indigo-600 text-indigo-600 text-sm font-semibold px-4 py-2 rounded-full hover:bg-indigo-600 hover:text-white transition-all duration-200">
                        View Details <i className="fas fa-arrow-right text-xs" />
                      </Link>
                    </div>
                  </div>
                ))
              : staticProjects.map((p, i) => (
                  <div key={i} className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.07)] border border-slate-100 overflow-hidden flex flex-col hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,0,0,0.12)] transition-all duration-300">
                    <div className="p-5 text-white" style={{ background: `linear-gradient(135deg, ${p.color}, ${p.color}c0)` }}>
                      <h5 className="font-semibold">{p.title}</h5>
                      <small className="text-white/70 text-xs">{p.client}</small>
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <p className="text-slate-600 text-sm leading-relaxed flex-1 mb-4">{p.desc}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {p.techs.map((t) => <Badge key={t}>{t}</Badge>)}
                      </div>
                    </div>
                  </div>
                ))}
          </div>
          <div className="text-center mt-10">
            <Link to="/projects"
              className="inline-flex items-center gap-2 bg-slate-800 text-white font-semibold px-7 py-3 rounded-full hover:bg-slate-700 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200">
              View All Projects <i className="fas fa-arrow-right" />
            </Link>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────── EDUCATION ── */}
      <section id="education" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading>Education & Certifications</SectionHeading>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Education */}
            <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.06)] overflow-hidden">
              <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-5 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
                  <i className="fas fa-graduation-cap text-white" />
                </div>
                <h5 className="text-white font-semibold">Education</h5>
              </div>
              <div className="p-6 space-y-5">
                {displayEdus.map((edu, i) => (
                  <div key={i} className={i < displayEdus.length - 1 ? "pb-5 border-b border-slate-100" : ""}>
                    <h6 className="font-bold text-slate-800 leading-snug">{edu.degree}</h6>
                    <p className="text-indigo-600 text-sm font-medium mt-0.5">{edu.institution}</p>
                    <small className="text-slate-400 text-xs">{edu.years}</small>
                  </div>
                ))}
              </div>
            </div>
            {/* Certifications */}
            <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.06)] overflow-hidden">
              <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-5 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
                  <i className="fas fa-certificate text-white" />
                </div>
                <h5 className="text-white font-semibold">Certifications</h5>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  {staticCerts.map((c) => (
                    <li key={c} className="flex items-center gap-3 text-slate-600 text-sm">
                      <div className="shrink-0 w-7 h-7 rounded-lg bg-indigo-50 flex items-center justify-center">
                        <i className="fas fa-award text-indigo-500 text-xs" />
                      </div>
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────── BLOG ── */}
      <section id="blog" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading>Latest Blog Posts</SectionHeading>
          {blogs.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.map((blog) => (
                <article key={blog.id} className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-slate-100 overflow-hidden flex flex-col hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(99,102,241,0.12)] hover:border-indigo-100 transition-all duration-300 group">
                  <div className="overflow-hidden h-44">
                    {blog.cover_image
                      ? <img src={blog.cover_image} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      : <div className="w-full h-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white text-xl font-bold">{blog.tags?.[0] ?? "Blog"}</div>
                    }
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                      <span className="flex items-center gap-1.5">
                        <i className="fas fa-calendar-alt" />
                        {blog.published_at ? new Date(blog.published_at).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" }) : ""}
                      </span>
                      {blog.tags?.[0] && <Badge>{blog.tags[0]}</Badge>}
                    </div>
                    <h3 className="text-slate-800 font-bold text-base leading-snug mb-2 group-hover:text-indigo-600 transition-colors">
                      <Link to={`/blog/${blog.slug}`}>{blog.title}</Link>
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed flex-1 mb-4">{blog.excerpt}</p>
                    <Link to={`/blog/${blog.slug}`}
                      className="self-start inline-flex items-center gap-1.5 border border-indigo-600 text-indigo-600 text-sm font-semibold px-4 py-2 rounded-full hover:bg-indigo-600 hover:text-white transition-all duration-200">
                      Read More <i className="fas fa-arrow-right text-xs" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-slate-400">
              <i className="fas fa-pen-nib text-4xl mb-4 block text-indigo-200" />
              <p>Blog posts coming soon!</p>
            </div>
          )}
          <div className="text-center mt-10">
            <Link to="/blog"
              className="inline-flex items-center gap-2 bg-slate-800 text-white font-semibold px-7 py-3 rounded-full hover:bg-slate-700 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200">
              View All Posts <i className="fas fa-arrow-right" />
            </Link>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────── CONTACT ── */}
      <section id="contact" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading>Get In Touch</SectionHeading>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Info panel */}
            <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-8 text-white">
              <h4 className="text-xl font-bold mb-2">Contact Information</h4>
              <p className="text-white/70 text-sm mb-8">Fill in the form or reach out directly via one of the channels below.</p>
              <div className="space-y-5">
                {CONTACTS.map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="shrink-0 w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center text-white">
                      <i className={item.icon} />
                    </div>
                    <div>
                      <p className="text-white/60 text-xs font-medium uppercase tracking-wider">{item.label}</p>
                      {item.href
                        ? <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="text-white text-sm hover:text-indigo-200 transition-colors">{item.value}</a>
                        : <p className="text-white text-sm">{item.value}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.07)] p-8">
              <h4 className="text-xl font-bold text-slate-800 mb-6">Send a Message</h4>
              {contactStatus === "success" && (
                <div className="bg-green-50 border border-green-200 text-green-700 rounded-xl p-4 mb-5 flex items-center gap-2 text-sm">
                  <i className="fas fa-check-circle" /> Message sent! I'll reply soon.
                </div>
              )}
              {contactStatus === "error" && (
                <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 mb-5 flex items-center gap-2 text-sm">
                  <i className="fas fa-exclamation-triangle" /> Something went wrong. Try again.
                </div>
              )}
              <form onSubmit={handleContact} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">First Name</label>
                    <input type="text" required
                      value={contactForm.name.split(" ")[0] ?? ""}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-800 bg-white outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
                    <input type="email" required
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-800 bg-white outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Subject</label>
                  <input type="text"
                    value={contactForm.subject}
                    onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                    className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-800 bg-white outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Message</label>
                  <textarea rows={5} required style={{ resize: "none" }}
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm text-slate-800 bg-white outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all" />
                </div>
                <button type="submit" disabled={contactLoading}
                  className={`w-full inline-flex justify-center items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-3 rounded-xl hover:shadow-[0_6px_20px_rgba(99,102,241,0.4)] hover:-translate-y-0.5 transition-all duration-200 ${contactLoading ? "opacity-70 cursor-not-allowed" : ""}`}>
                  <i className="fas fa-paper-plane" /> {contactLoading ? "Sending…" : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
