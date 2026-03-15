import { useEffect, useState } from "react";
import { getProfile } from "../services/api";
import FrontendLoader from "../components/FrontendLoader";

const SKILL_ICONS = {
  php: "fab fa-php", laravel: "fab fa-laravel", yii: "fas fa-layer-group",
  codeigniter: "fas fa-fire", lumen: "fas fa-bolt", cakephp: "fas fa-birthday-cake",
  wordpress: "fab fa-wordpress", mysql: "fas fa-database", mongodb: "fas fa-leaf",
  restful: "fas fa-server", api: "fas fa-server", git: "fab fa-git-alt",
  github: "fab fa-github", docker: "fab fa-docker", linux: "fab fa-linux",
  html5: "fab fa-html5", css3: "fab fa-css3-alt", javascript: "fab fa-js-square",
  jquery: "fab fa-js", bootstrap: "fab fa-bootstrap", react: "fab fa-react",
  node: "fab fa-node-js", python: "fab fa-python", aws: "fab fa-aws",
  figma: "fab fa-figma", vue: "fab fa-vuejs", angular: "fab fa-angular",
  security: "fas fa-shield-alt", agile: "fas fa-running", team: "fas fa-users",
};
function getIcon(skill) {
  if (skill.icon) return skill.icon;
  const name = typeof skill === "string" ? skill : skill.name;
  const key = name.toLowerCase().split(/[\s/]/)[0];
  return SKILL_ICONS[key] ?? "fas fa-code";
}

/* ── Shared helpers ── */
const SectionHeading = ({ children, light = false }) => (
  <div className="flex flex-col items-center mb-16 group">
    <h2 className={`text-4xl md:text-5xl font-black mb-6 tracking-tight ${light ? "text-white" : "text-slate-800"}`}>
      {children}
    </h2>
    <div className={`h-2.5 w-24 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 group-hover:w-32 transition-all duration-500 shadow-sm ${light ? "from-white/40 to-white/20" : ""}`} />
  </div>
);

const Badge = ({ children }) => (
  <span className="inline-block px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest bg-indigo-50 text-indigo-700 border border-indigo-100 shadow-sm">{children}</span>
);

export default function About() {
  const [profile, setProfile] = useState(null);
  const [skills, setSkills] = useState({});
  const [experiences, setExperiences] = useState([]);
  const [educations, setEducations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProfile()
      .then((res) => {
        setProfile(res.data.profile);
        setSkills(res.data.skills ?? {});
        setExperiences(res.data.experiences ?? []);
        setEducations(res.data.educations ?? []);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="pt-40"><FrontendLoader /></div>;

  const allSkills = Object.values(skills).flat();

  const staticSkills = [
    { id: 1, name: "PHP" }, { id: 2, name: "Laravel" }, { id: 3, name: "MySQL" },
    { id: 4, name: "JavaScript" }, { id: 5, name: "React" }, { id: 6, name: "Bootstrap" },
    { id: 7, name: "Git / GitHub" }, { id: 8, name: "Docker" }, { id: 9, name: "AWS (Basics)" },
    { id: 10, name: "REST APIs" }, { id: 11, name: "CodeIgniter" }, { id: 12, name: "Yii Framework" },
  ];

  const staticExps = [
    { type: "exp", pos: "Senior PHP Developer", company: "RG InfoTech", date: "Jan 2024 – Mar 2025", desc: "Led development of 6-7 concurrent Laravel projects. Designed and implemented RESTful APIs for third-party service integration.", techs: ["PHP", "Laravel", "MySQL", "REST APIs"] },
    { type: "exp", pos: "Senior Software Engineer", company: "SimplifyVMS", date: "Jun 2022 – Dec 2023", desc: "Engineered backend services for large-scale VMS serving 10,000+ users. Optimized DB queries by 40%.", techs: ["PHP", "MySQL", "REST APIs", "Agile"] },
    { type: "exp", pos: "Software Engineer III", company: "Matellio Inc.", date: "Nov 2021 – Jun 2022", desc: "Developed and maintained mission-critical client projects using PHP and related technologies.", techs: [] },
    { type: "exp", pos: "PHP Developer", company: "The NineHertz", date: "May 2019 – Nov 2020", desc: "Developed web applications using Yii 1 framework and CakePHP.", techs: [] },
  ];
  const staticEdus = [
    { type: "edu", pos: "B.Tech in Information Technology", company: "Rajasthan Technical University, Kota", date: "2008 – 2012", desc: "" },
    { type: "edu", pos: "Senior Secondary in Science & Maths", company: "D.B.N. School, Ajmer", date: "2006 – 2008", desc: "" },
  ];

  const apiTimeline = [
    ...experiences.map((e) => ({ type: "exp", pos: e.position, company: e.company, date: `${e.start_date} – ${e.is_current ? "Present" : e.end_date}`, desc: e.description, techs: e.technologies ?? [] })),
    ...educations.map((e) => ({ type: "edu", pos: `${e.degree} in ${e.field_of_study}`, company: e.institution, date: `${e.start_year} – ${e.end_year ?? "Present"}`, desc: e.grade ? `Grade: ${e.grade}` : "", techs: [] })),
  ];

  const timeline = apiTimeline.length > 0 ? apiTimeline : [...staticExps, ...staticEdus];
  const displaySkills = allSkills.length > 0 ? allSkills : staticSkills;

  const highlights = [
    { icon: "fas fa-rocket", title: "10+ Years", sub: "Industry Exp" },
    { icon: "fas fa-project-diagram", title: "15+", sub: "Major Projects" },
    { icon: "fas fa-users", title: "5+", sub: "Devs Mentored" },
    { icon: "fas fa-star", title: "40%", sub: "Opt. Boost" },
  ];

  return (
    <>
      {/* ── Page Hero ── */}
      <section className="relative bg-white pt-40 pb-24 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-indigo-50 rounded-full blur-[100px]" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-50 rounded-full blur-[120px]" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 px-5 py-2 rounded-2xl mb-8 shadow-sm">
            <i className="fas fa-id-badge text-indigo-500" />
            <span className="text-indigo-600 text-[10px] font-black uppercase tracking-[0.2em]">Crafting Digital Worlds</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black text-slate-800 mb-8 tracking-tight">Meet Aadhar Gaur</h1>
          <p className="text-slate-500 text-xl md:text-2xl max-w-2xl mx-auto font-medium leading-relaxed">
            Architecting scalable backend ecosystems with PHP, Laravel & Cloud Tech for over a decade.
          </p>
        </div>
      </section>

      {/* ── Stats strip ── */}
      <div className="relative z-20 -mt-10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="clay-surface bg-white/80 backdrop-blur-md p-2 grid grid-cols-2 md:grid-cols-4 gap-2">
            {highlights.map((h) => (
              <div key={h.title} className="clay-card p-6 md:p-8 text-center bg-white border-white/50 hover:bg-indigo-50 transition-colors">
                <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-inner">
                  <i className={`${h.icon} text-indigo-600 text-lg`} />
                </div>
                <p className="text-3xl font-black text-slate-800 tracking-tight">{h.title}</p>
                <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-1">{h.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bio ── */}
      <section className="py-32 relative overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
            {/* Photo + quote */}
            <div className="lg:col-span-5 text-center order-2 lg:order-1">
              <div className="relative inline-block group">
                <div className="absolute -inset-4 rounded-[48px] bg-gradient-to-br from-indigo-500 to-purple-600 blur-2xl opacity-10 group-hover:opacity-20 transition-opacity duration-700" />
                <div className="clay-card p-4 bg-white border-white group-hover:scale-[1.02] transition-transform duration-700">
                  <img
                    src={profile?.avatar ?? "/img/AboutAadhar.jpg"}
                    alt="Aadhar Gaur"
                    className="relative w-full max-w-sm rounded-[32px] shadow-sm object-cover aspect-square"
                    onError={(e) => { e.target.src = "https://ui-avatars.com/api/?name=Aadhar+Gaur&size=400&background=6366f1&color=fff"; }}
                  />
                </div>
                {/* Float Elements */}
                <div className="absolute -top-6 -right-6 w-24 h-24 clay-card bg-indigo-50 flex items-center justify-center p-4 animate-bounce duration-[3s]">
                  <i className="fab fa-laravel text-4xl text-indigo-500" />
                </div>
                <div className="absolute -bottom-6 -left-6 w-20 h-20 clay-card bg-purple-50 flex items-center justify-center p-4 animate-pulse">
                  <i className="fas fa-database text-3xl text-purple-500" />
                </div>
              </div>
              <div className="mt-12 clay-surface bg-slate-50 border-none p-6 text-slate-500 italic text-lg leading-relaxed max-w-sm mx-auto font-medium">
                <i className="fas fa-quote-left text-indigo-100 text-5xl absolute -top-4 -left-4" />
                "Engineering is not just writing code—it's crafting solutions that empower users and scale businesses."
              </div>
            </div>

            {/* Bio text */}
            <div className="lg:col-span-7 order-1 lg:order-2">
              <div className="inline-block px-4 py-1.5 rounded-xl bg-indigo-50 border border-indigo-100 text-indigo-600 text-[10px] font-black uppercase tracking-[0.2em] mb-6">Professional Narrative</div>
              <h2 className="text-4xl md:text-5xl font-black text-slate-800 mb-8 tracking-tight">A十年 of Web Evolution</h2>
              
              <div className="space-y-6 text-slate-600 text-lg leading-relaxed font-medium">
                <p>
                  {profile?.bio ?? "With over a decade of high-level development, I specialize in building mission-critical architectures that combine technical excellence with business scalability. My focus is PHP Engineering, with deep expertise in Laravel ecosystem and legacy Yii modernization."}
                </p>
                <p>
                  I excel at taking complex, abstract business needs and distilling them into high-performance technical architectures. My philosophy centers on clean code, domain-driven design, and creating systems that are as maintainable as they are efficient.
                </p>
              </div>

              <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  ["fas fa-brain", "Engineering Mindset", "Deep mastery of OOP, Design Patterns, and Modern PHP architectures."],
                  ["fas fa-rocket", "Performance First", "Optimizing DB schemas and queries for zero-latency user experiences."],
                  ["fas fa-microchip", "Cloud Ready", "Experience with scalable deployments on AWS and Dockerized workflows."],
                  ["fas fa-users", "Leadership", "Vocal advocate for Agile methodologies and mentoring future engineers."],
                ].map(([icon, title, desc]) => (
                  <div key={title} className="clay-card p-6 bg-white hover:bg-slate-50 transition-all border-slate-50 group">
                    <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center mb-4 shadow-inner group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                      <i className={`${icon} text-lg`} />
                    </div>
                    <h4 className="text-lg font-black text-slate-800 mb-2">{title}</h4>
                    <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Skills grid ── */}
      <section className="py-32 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <SectionHeading>Technical Arsenal</SectionHeading>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {displaySkills.map((s, idx) => {
              const name = typeof s === "string" ? s : s.name;
              const icon = getIcon(s);
              return (
                <div key={name} className="clay-card p-8 flex flex-col items-center gap-4 bg-white group hover:scale-105 transition-all duration-300 border-white/60">
                  <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center shadow-inner group-hover:bg-gradient-to-br group-hover:from-indigo-500 group-hover:to-purple-600 transition-all duration-500">
                    <i className={`${icon} text-indigo-600 text-2xl group-hover:text-white transition-colors duration-500`} />
                  </div>
                  <span className="text-slate-800 text-[10px] font-black uppercase tracking-widest text-center leading-tight">{name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <SectionHeading>Career & Education</SectionHeading>
          
          <div className="relative pl-12 border-l-[3px] border-slate-100 ml-6">
            <div className="absolute top-0 left-[-3px] w-[3px] h-full bg-gradient-to-b from-indigo-500 via-purple-500 to-transparent" />
            
            {timeline.map((item, i) => (
              <div key={i} className="relative mb-16 group last:mb-0">
                {/* Dot */}
                <div className={`absolute left-[-2.45rem] top-4 w-6 h-6 rounded-xl border-[6px] border-white shadow-md transition-all duration-500 group-hover:scale-125
                  ${item.type === "exp"
                    ? "bg-indigo-500 shadow-indigo-200"
                    : "bg-purple-500 shadow-purple-200"}`} />
                
                <div className="clay-card p-8 md:p-10 bg-white hover:bg-slate-50 transition-all border-slate-50">
                  <div className="flex flex-wrap items-center justify-between gap-6 mb-8">
                    <div className="flex-1 min-w-[200px]">
                      <div className="flex items-center gap-4 mb-4">
                        <span className={`text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-xl ${item.type === "exp" ? "bg-indigo-50 text-indigo-600 border border-indigo-100" : "bg-purple-50 text-purple-600 border border-purple-100"}`}>
                          {item.type === "exp" ? "Professional Exp" : "Academic History"}
                        </span>
                        <div className="clay-surface bg-slate-50 border-none px-4 py-1.5 flex items-center gap-2">
                          <i className="fas fa-calendar-alt text-slate-300 text-[10px]" />
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.date}</span>
                        </div>
                      </div>
                      <h5 className="text-3xl font-black text-slate-800 tracking-tight mb-2">{item.pos}</h5>
                      <p className="text-indigo-600 font-black text-lg tracking-tight">{item.company}</p>
                    </div>
                  </div>
                  
                  {item.desc && <p className="text-slate-500 text-lg leading-relaxed mb-8 font-medium max-w-3xl">{item.desc}</p>}
                  
                  {item.techs?.length > 0 && (
                    <div className="flex flex-wrap gap-3">
                      {item.techs.map((t) => <Badge key={t}>{t}</Badge>)}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
