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
    <div className="text-center mb-20 group">
      <h2 className="text-4xl md:text-5xl font-black text-slate-800 mb-6 tracking-tight group-hover:scale-105 transition-transform duration-500">{children}</h2>
      <div className="flex justify-center items-center gap-2">
        <span className="w-12 h-2.5 rounded-full bg-indigo-100 shadow-inner" />
        <span className="w-20 h-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 shadow-lg" />
        <span className="w-12 h-2.5 rounded-full bg-purple-100 shadow-inner" />
      </div>
    </div>
  );

  const Badge = ({ children, variant = "primary" }) => {
    const cls = variant === "gradient"
      ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white border-transparent"
      : "bg-indigo-50 text-indigo-700 border-indigo-100/50";
    return <span className={`inline-block px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border shadow-sm ${cls}`}>{children}</span>;
  };

  return (
    <>
      {/* ────────────────────────────────── HERO ── */}
      <section
        id="hero"
        className="relative pt-40 pb-24 overflow-hidden"
      >
        {/* Decorative background blobs */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-indigo-200/40 rounded-full blur-[100px]" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200/40 rounded-full blur-[120px]" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="clay-surface p-8 md:p-16 flex flex-col-reverse md:flex-row items-center gap-12 md:gap-20">
            {/* Text Content */}
            <div className="flex-1 text-center md:text-left relative">
              <div className="inline-flex items-center gap-2 bg-white/60 border border-white/50 px-4 py-2 rounded-2xl mb-8 shadow-sm backdrop-blur-md">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-slate-600 text-xs font-bold uppercase tracking-wider">Available for new opportunities</span>
              </div>
              
              <h1 className="text-4xl md:text-7xl font-extrabold leading-[1.1] mb-6 tracking-tight text-slate-900">
                {profile?.name ?? "Aadhar Gaur"}
              </h1>
              
              <p className="text-xl md:text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6">
                {profile?.title ?? "Senior PHP Developer | Backend Specialist | Laravel & Yii Expert"}
              </p>
              
              <p className="text-slate-500 text-lg md:text-xl leading-relaxed max-w-2xl mb-10 font-medium">
                {profile?.bio ?? "Results-driven developer with 10+ years of experience in backend development, specializing in scalable web applications and RESTful API development."}
              </p>
              
              <div className="flex flex-wrap gap-5 justify-center md:justify-start">
                <a href="#projects" className="clay-button-primary px-8">
                  <i className="fas fa-code" /> View Projects
                </a>
                <a href="/docs/Aadhar_Gaur_CV.pdf" download className="clay-button-secondary px-8">
                  <i className="fas fa-download" /> My Resume
                </a>
              </div>

              {/* Social links row */}
              <div className="flex items-center gap-4 mt-12 justify-center md:justify-start">
                {[
                  { icon: "fab fa-github", href: "https://github.com/aadhar41" },
                  { icon: "fab fa-linkedin-in", href: "https://www.linkedin.com/in/aadhar-gaur-php" },
                  { icon: "fas fa-envelope", href: "mailto:aadhar41@gmail.com" },
                ].map((s) => (
                  <a 
                    key={s.href} 
                    href={s.href} 
                    target="_blank" 
                    rel="noreferrer"
                    className="w-12 h-12 rounded-2xl bg-white/60 border border-white/40 flex items-center justify-center text-slate-600 hover:text-indigo-600 hover:bg-white transition-all duration-300 shadow-sm"
                  >
                    <i className={`${s.icon} text-lg`} />
                  </a>
                ))}
              </div>
            </div>

            {/* Profile Image Container */}
            <div className="shrink-0 relative">
              <div className="clay-card p-4 rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="relative w-48 h-48 md:w-80 md:h-80 rounded-[32px] overflow-hidden border-2 border-white/40 shadow-inner">
                  <img
                    src={profile?.avatar ?? "/avatar.png"}
                    alt={profile?.name ?? "Aadhar Gaur"}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.src = "https://ui-avatars.com/api/?name=Aadhar+Gaur&size=400&background=6366f1&color=fff&bold=true"; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/20 to-transparent pointer-events-none" />
                </div>
              </div>
              
              {/* Accessory icons */}
              <div className="absolute -top-4 -right-4 w-12 h-12 clay-surface flex items-center justify-center text-indigo-600 text-xl animate-bounce duration-[3000ms]">
                <i className="fab fa-laravel" />
              </div>
              <div className="absolute -bottom-4 -left-4 w-12 h-12 clay-surface flex items-center justify-center text-purple-600 text-xl animate-bounce duration-[2500ms]">
                <i className="fab fa-php" />
              </div>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {[
              { num: "10+", label: "Years Experience", icon: "fas fa-briefcase" },
              { num: "15+", label: "Enterprise Projects", icon: "fas fa-project-diagram" },
              { num: "40%", label: "Performance Boost", icon: "fas fa-bolt" },
              { num: "10K+", label: "Users Served", icon: "fas fa-users" },
            ].map((s) => (
              <div key={s.label} className="clay-card p-6 flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 mb-3 shadow-inner">
                  <i className={s.icon} />
                </div>
                <p className="text-2xl font-black text-slate-800 tracking-tight">{s.num}</p>
                <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────────────────────── ABOUT ── */}
      <section id="about" className="py-24 relative overflow-hidden bg-white">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-indigo-50 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <SectionHeading>About Me</SectionHeading>
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            <div className="flex-1">
              <div className="clay-card p-8 md:p-10 mb-8 border-indigo-100/50 bg-indigo-50/20">
                <h3 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600 text-sm">
                    <i className="fas fa-user-tie" />
                  </span>
                  Professional Summary
                </h3>
                <p className="text-slate-600 leading-relaxed mb-6 font-medium text-lg">
                  Results-driven Senior PHP Developer with 10+ years of experience in backend development, specializing in scalable web applications and RESTful API development. Proven expertise in PHP, Laravel, Yii framework, and MySQL with a track record of successfully delivering 15+ enterprise-level projects.
                </p>
                <p className="text-slate-600 leading-relaxed font-medium text-lg italic border-l-4 border-indigo-200 pl-6 py-2">
                  Strong background in agile methodologies, code optimization, and cross-functional team leadership.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <a href="#projects" className="clay-button-secondary">
                  <i className="fas fa-eye" /> View Work
                </a>
                <a href="#contact" className="clay-button-primary">
                  <i className="fas fa-paper-plane" /> Hire Me
                </a>
              </div>
            </div>

            <div className="w-full lg:w-[450px]">
              <div className="clay-card p-10 border-purple-100/50 bg-purple-50/20">
                <h3 className="text-2xl font-black text-slate-800 mb-8 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-xl bg-purple-100 flex items-center justify-center text-purple-600 text-sm">
                    <i className="fas fa-trophy" />
                  </span>
                  Key Achievements
                </h3>
                <ul className="space-y-6">
                  {[
                    "Led development of 6-7 diverse Laravel projects simultaneously at RG InfoTech",
                    "Engineered high-performance backend services for large-scale Vendor Management System",
                    "Mentored 5+ junior developers and improved team productivity by 25%",
                    "Successfully delivered 15+ enterprise-level projects",
                  ].map((a) => (
                    <li key={a} className="flex items-start gap-4 text-slate-600 group">
                      <div className="mt-1 shrink-0 w-6 h-6 rounded-full bg-white border border-indigo-100 flex items-center justify-center shadow-sm group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                        <i className="fas fa-check text-[10px]" />
                      </div>
                      <span className="font-bold text-slate-700 leading-snug">{a}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────── SKILLS ── */}
      <section id="skills" className="py-24 relative overflow-hidden bg-slate-50">
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-100/30 rounded-full blur-[120px] translate-x-1/4 translate-y-1/4" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <SectionHeading>Technical Skills</SectionHeading>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(displaySkills).map(([cat, items], i) => {
              const arr = Array.isArray(items) ? items : [];
              return (
                <div key={cat} className="clay-card overflow-hidden group hover:scale-[1.02] transition-all duration-500">
                  <div className="bg-gradient-to-br from-indigo-600/90 to-purple-600/90 p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:scale-150 transition-transform duration-700" />
                    <h5 className="text-white font-black text-xl flex items-center gap-3 relative z-10">
                      <span className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-inner">
                        <i className={skillIcons[i] ?? "fas fa-star"} />
                      </span>
                      {cat}
                    </h5>
                  </div>
                  <div className="p-8 flex flex-wrap gap-3">
                    {arr.map((s) => {
                      const name = typeof s === "string" ? s : s.name;
                      return (
                        <span key={name} className="bg-white text-slate-700 text-sm font-black px-4 py-2.5 rounded-2xl border border-slate-100 shadow-sm hover:clay-button-primary hover:text-white hover:border-transparent transition-all duration-300 cursor-default">
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
      <section id="cv-download" className="py-24 relative overflow-hidden bg-white">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-indigo-50 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
        
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <SectionHeading>Download My Resume</SectionHeading>
          <div className="clay-card p-10 md:p-16 border-indigo-100/50 bg-indigo-50/20 group">
            <div className="w-20 h-20 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-[28px] flex items-center justify-center mx-auto mb-8 shadow-lg group-hover:scale-110 transition-transform duration-500">
              <i className="fas fa-file-alt text-white text-3xl" />
            </div>
            <h3 className="text-3xl font-black text-slate-800 mb-4 tracking-tight">Aadhar Gaur — CV</h3>
            <p className="text-slate-600 mb-12 leading-relaxed text-lg font-medium max-w-xl mx-auto">
              Access my full professional resume for a comprehensive overview of my experience, skills, and qualifications.
            </p>
            <div className="flex flex-wrap gap-6 justify-center">
              <a href="/docs/Aadhar_Gaur_CV.pdf" download="Aadhar_Gaur_CV.pdf"
                className="clay-button-primary px-10 py-4 text-lg">
                <i className="fas fa-download mr-2" /> Download CV
              </a>
              <a href="/docs/Aadhar_Gaur_Projects.pdf" download="Aadhar_Gaur_Projects.pdf"
                className="clay-button-secondary px-10 py-4 text-lg">
                <i className="fas fa-file-pdf mr-2" /> Projects List
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────── EXPERIENCE ── */}
      <section id="experience" className="py-24 relative overflow-hidden bg-slate-50">
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-50 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2" />
        
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <SectionHeading>Professional Experience</SectionHeading>
          <div className="relative pl-8 md:pl-0">
            {/* Center line for desktop */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-slate-200 -translate-x-1/2 rounded-full" />
            {/* Left line for mobile */}
            <div className="md:hidden absolute left-0 top-0 bottom-0 w-1 bg-slate-200 rounded-full" />

            {displayExps.map((exp, i) => (
              <div key={i} className={`relative mb-16 flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center`}>
                {/* Dot */}
                <div className="absolute left-[-2.45rem] md:left-1/2 top-6 w-6 h-6 rounded-full bg-white border-4 border-indigo-600 shadow-sm z-20 -translate-x-1/2" />
                
                {/* Content Card */}
                <div className={`w-full md:w-[45%] ${i % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                  <div className="clay-card p-8 hover:scale-[1.02] transition-all duration-500 bg-white">
                    <div className="flex flex-col gap-3 mb-6">
                      <div className="flex items-center justify-between gap-4">
                        <h5 className="font-black text-slate-800 text-xl leading-tight">{exp.position}</h5>
                        <div className="shrink-0 w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 shadow-inner">
                          <i className="fas fa-briefcase text-sm" />
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-indigo-600 font-black text-sm uppercase tracking-wider">{exp.company}</span>
                        <span className="h-4 w-px bg-slate-200" />
                        <span className="inline-flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest bg-slate-50 px-3 py-1 rounded-lg border border-slate-100">
                          <i className="fas fa-calendar-alt" /> {exp.date}
                        </span>
                      </div>
                    </div>
                    <p className="text-slate-600 text-base leading-relaxed mb-6 font-medium">{exp.desc}</p>
                    {exp.techs?.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-50">
                        {exp.techs.map((t) => (
                          <span key={t} className="bg-indigo-50 text-indigo-700 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg border border-indigo-100/50 shadow-sm">
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                {/* Empty space for desktop */}
                <div className="hidden md:block w-[10%]" />
                <div className="hidden md:block w-[45%]" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────────────────────── PROJECTS ── */}
      <section id="projects" className="py-24 relative overflow-hidden bg-white">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-indigo-50 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <SectionHeading>Featured Projects</SectionHeading>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.length > 0
              ? projects.map((p) => (
                  <div key={p.id} className="clay-card overflow-hidden flex flex-col group hover:scale-[1.02] transition-all duration-500">
                    <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-6 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:scale-150 transition-transform duration-700" />
                      <h5 className="text-white font-black text-lg relative z-10 truncate">{p.title}</h5>
                      <small className="text-white/70 text-xs font-bold uppercase tracking-widest relative z-10">{p.category}</small>
                    </div>
                    <div className="p-6 flex flex-col flex-1 bg-white/40">
                      {p.image ? (
                        <div className="h-44 rounded-2xl mb-6 overflow-hidden border-2 border-white/60 shadow-inner group/img relative">
                          <img 
                            src={p.image} 
                            alt={p.title} 
                            className="w-full h-full object-cover group-hover/img:scale-110 transition-transform duration-700"
                            onError={(e) => {
                              const rn = p.github_url?.split("/").pop();
                              const og = `https://opengraph.githubassets.com/1/aadhar41/${rn}`;
                              if (e.target.src !== og) e.target.src = og;
                              else { e.target.style.display = "none"; e.target.parentElement.innerHTML = `<div class="w-full h-full flex items-center justify-center text-slate-300 bg-slate-50"><i class="fas fa-code fa-2x"></i></div>`; }
                            }} 
                          />
                          <div className="absolute inset-0 bg-indigo-900/10 group-hover/img:bg-transparent transition-colors duration-500" />
                        </div>
                      ) : (
                        <div className="h-44 rounded-2xl mb-6 bg-slate-50 border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-300">
                          <i className="fas fa-code fa-2x" />
                        </div>
                      )}
                      <p className="text-slate-600 text-sm leading-relaxed flex-1 mb-6 font-medium line-clamp-3">
                        {p.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {p.technologies?.slice(0, 3).map((t) => (
                          <span key={t} className="bg-white/80 text-indigo-700 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg border border-indigo-100/50 shadow-sm">
                            {t}
                          </span>
                        ))}
                      </div>
                      <Link to={`/projects/${p.id}`}
                        className="clay-button-secondary w-full py-2.5 text-sm">
                        View Details <i className="fas fa-arrow-right text-[10px] ml-2" />
                      </Link>
                    </div>
                  </div>
                ))
              : staticProjects.map((p, i) => (
                  <div key={i} className="clay-card overflow-hidden flex flex-col group hover:scale-[1.02] transition-all duration-500">
                    <div className="p-6 text-white relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${p.color}, ${p.color}c0)` }}>
                      <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:scale-150 transition-transform duration-700" />
                      <h5 className="font-black text-lg relative z-10 truncate">{p.title}</h5>
                      <small className="text-white/70 text-xs font-bold uppercase tracking-widest relative z-10">{p.client}</small>
                    </div>
                    <div className="p-6 flex flex-col flex-1 bg-white/40">
                      <p className="text-slate-600 text-sm leading-relaxed flex-1 mb-6 font-medium">
                        {p.desc}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {p.techs.map((t) => (
                          <span key={t} className="bg-white/80 text-indigo-700 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg border border-indigo-100/50 shadow-sm">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
          </div>
          <div className="text-center mt-16">
            <Link to="/projects"
              className="clay-button-primary px-10">
              View All Projects <i className="fas fa-th-large ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────── EDUCATION ── */}
      <section id="education" className="py-24 relative overflow-hidden bg-slate-50">
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-50 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <SectionHeading>Education & Certifications</SectionHeading>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Education */}
            <div className="clay-card bg-white p-0 overflow-hidden group">
              <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-8 flex items-center gap-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:scale-150 transition-transform duration-700" />
                <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-inner relative z-10">
                  <i className="fas fa-graduation-cap text-white text-xl" />
                </div>
                <h5 className="text-white font-black text-2xl relative z-10">Academic Background</h5>
              </div>
              <div className="p-8 space-y-10">
                {displayEdus.map((edu, i) => (
                  <div key={i} className="relative pl-10 group/item">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-50 rounded-full group-hover/item:bg-indigo-600 transition-colors" />
                    <div className="absolute left-[-0.7rem] top-1 w-6 h-6 rounded-full bg-white border-4 border-indigo-50 shadow-sm group-hover/item:border-indigo-600 transition-colors" />
                    
                    <h6 className="font-black text-slate-800 text-lg leading-tight mb-2">{edu.degree}</h6>
                    <p className="text-indigo-600 font-bold text-sm mb-3 uppercase tracking-wider">{edu.institution}</p>
                    <span className="inline-flex items-center gap-2 text-slate-400 text-xs font-black uppercase tracking-widest bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                      <i className="fas fa-calendar-alt" /> {edu.years}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div className="clay-card bg-white p-0 overflow-hidden group">
              <div className="bg-gradient-to-br from-purple-600 to-indigo-600 p-8 flex items-center gap-4 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:scale-150 transition-transform duration-700" />
                <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-inner relative z-10">
                  <i className="fas fa-certificate text-white text-xl" />
                </div>
                <h5 className="text-white font-black text-2xl relative z-10">Certifications</h5>
              </div>
              <div className="p-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {staticCerts.map((c) => (
                  <div key={c} className="clay-card p-4 bg-slate-50 border-slate-100 flex items-center gap-4 hover:bg-white hover:border-indigo-100 transition-all duration-300">
                    <div className="shrink-0 w-10 h-10 rounded-xl bg-white flex items-center justify-center text-indigo-500 shadow-sm">
                      <i className="fas fa-award" />
                    </div>
                    <span className="text-slate-700 text-sm font-bold leading-snug">{c}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────── BLOG ── */}
      <section id="blog" className="py-24 relative overflow-hidden bg-white">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-indigo-50 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <SectionHeading>Latest Blog Posts</SectionHeading>
          {blogs.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog) => (
                <article key={blog.id} className="clay-card overflow-hidden flex flex-col group hover:scale-[1.02] transition-all duration-500 bg-white">
                  <div className="overflow-hidden h-52 relative">
                    {blog.cover_image
                      ? <img src={blog.cover_image} alt={blog.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      : <div className="w-full h-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white text-3xl font-black">{blog.tags?.[0] ?? "Blog"}</div>
                    }
                    <div className="absolute inset-0 bg-indigo-900/10 group-hover:bg-transparent transition-colors duration-500" />
                  </div>
                  <div className="p-8 flex flex-col flex-1">
                    <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">
                      <span className="flex items-center gap-2">
                        <i className="fas fa-calendar-alt text-indigo-400" />
                        {blog.published_at ? new Date(blog.published_at).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" }) : ""}
                      </span>
                      {blog.tags?.[0] && <span className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-lg border border-indigo-100">{blog.tags[0]}</span>}
                    </div>
                    <h3 className="text-slate-800 font-extrabold text-xl leading-tight mb-4 group-hover:text-indigo-600 transition-colors line-clamp-2">
                      <Link to={`/blog/${blog.slug}`}>{blog.title}</Link>
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed flex-1 mb-8 font-medium line-clamp-3">{blog.excerpt}</p>
                    <Link to={`/blog/${blog.slug}`}
                      className="clay-button-secondary w-full py-2.5 text-sm">
                      Read Full Article <i className="fas fa-arrow-right text-[10px] ml-2" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="clay-surface p-16 text-center text-slate-400">
              <div className="w-20 h-20 rounded-[28px] bg-indigo-50 flex items-center justify-center text-indigo-300 text-3xl mx-auto mb-6 shadow-inner">
                <i className="fas fa-pen-nib" />
              </div>
              <p className="text-xl font-bold text-slate-500">Blog posts coming soon!</p>
              <p className="mt-2 font-medium">I'm currently drafting some exciting technical articles.</p>
            </div>
          )}
          <div className="text-center mt-16">
            <Link to="/blog"
              className="clay-button-primary px-10">
              View All Posts <i className="fas fa-newspaper ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────── CONTACT ── */}
      <section id="contact" className="py-24 relative overflow-hidden bg-slate-50">
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-100/30 rounded-full blur-[120px] translate-x-1/4 translate-y-1/4" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <SectionHeading>Get In Touch</SectionHeading>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Info panel */}
            <div className="lg:col-span-5 clay-surface bg-gradient-to-br from-indigo-600 to-purple-700 p-10 md:p-12 text-white border-none relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:scale-150 transition-transform duration-1000" />
              
              <div className="relative z-10">
                <h4 className="text-3xl font-black mb-4 tracking-tight">Contact Information</h4>
                <p className="text-white/80 text-lg mb-12 font-medium">Fill in the form or reach out directly via one of the channels below.</p>
                
                <div className="space-y-8">
                  {CONTACTS.map((item) => (
                    <div key={item.label} className="flex items-center gap-6 group/item">
                      <div className="shrink-0 w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center text-white text-xl shadow-inner group-hover/item:bg-white group-hover/item:text-indigo-600 transition-all duration-300">
                        <i className={item.icon} />
                      </div>
                      <div>
                        <p className="text-white/50 text-xs font-black uppercase tracking-widest mb-1">{item.label}</p>
                        {item.href
                          ? <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="text-white text-lg font-bold hover:text-indigo-200 transition-colors">{item.value}</a>
                          : <p className="text-white text-lg font-bold">{item.value}</p>}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-16 pt-10 border-t border-white/10">
                  <h5 className="text-sm font-black uppercase tracking-widest text-white/50 mb-6">Connect with me</h5>
                  <div className="flex gap-4">
                    {[
                      { icon: "fab fa-github", href: "https://github.com/aadhar41" },
                      { icon: "fab fa-linkedin-in", href: "https://www.linkedin.com/in/aadhar-gaur-php" },
                    ].map((s) => (
                      <a key={s.href} href={s.href} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-2xl bg-white/15 flex items-center justify-center text-white hover:bg-white hover:text-indigo-600 transition-all duration-300">
                        <i className={s.icon} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-7 clay-card p-10 md:p-12 bg-white">
              <h4 className="text-2xl font-black text-slate-800 mb-8 tracking-tight">Send a Message</h4>
              
              {contactStatus === "success" && (
                <div className="clay-surface bg-green-50 border-green-200 text-green-700 p-5 mb-8 flex items-center gap-4 font-bold text-sm animate-[fadeInDown_0.5s_ease_both]">
                  <i className="fas fa-check-circle text-xl" /> Message sent successfully! I'll get back to you soon.
                </div>
              )}
              {contactStatus === "error" && (
                <div className="clay-surface bg-red-50 border-red-200 text-red-700 p-5 mb-8 flex items-center gap-4 font-bold text-sm animate-[fadeInDown_0.5s_ease_both]">
                  <i className="fas fa-exclamation-triangle text-xl" /> Something went wrong. Please try again.
                </div>
              )}

              <form onSubmit={handleContact} className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest ml-1">First Name</label>
                    <input type="text" required
                      placeholder="e.g. John Doe"
                      value={contactForm.name.split(" ")[0] ?? ""}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      className="w-full bg-slate-50 border-2 border-slate-100 rounded-[20px] px-6 py-4 text-slate-800 outline-none focus:border-indigo-500/50 focus:bg-white transition-all shadow-inner" />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                    <input type="email" required
                      placeholder="e.g. john@example.com"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      className="w-full bg-slate-50 border-2 border-slate-100 rounded-[20px] px-6 py-4 text-slate-800 outline-none focus:border-indigo-500/50 focus:bg-white transition-all shadow-inner" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Subject</label>
                  <input type="text"
                    placeholder="What's this about?"
                    value={contactForm.subject}
                    onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-[20px] px-6 py-4 text-slate-800 outline-none focus:border-indigo-500/50 focus:bg-white transition-all shadow-inner" />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Message</label>
                  <textarea rows={5} required style={{ resize: "none" }}
                    placeholder="Tell me more about your project..."
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-[24px] px-6 py-4 text-slate-800 outline-none focus:border-indigo-500/50 focus:bg-white transition-all shadow-inner" />
                </div>
                
                <button type="submit" disabled={contactLoading}
                  className={`w-full clay-button-primary py-4 text-lg ${contactLoading ? "opacity-70 cursor-not-allowed" : ""}`}>
                  {contactLoading ? (
                    <><i className="fas fa-spinner animate-spin mr-3" /> Sending Message...</>
                  ) : (
                    <><i className="fas fa-paper-plane mr-3" /> Send Message</>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
