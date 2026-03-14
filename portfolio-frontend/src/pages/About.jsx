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
function getIcon(name) {
  const key = name.toLowerCase().split(/[\s/]/)[0];
  return SKILL_ICONS[key] ?? "fas fa-code";
}

/* ── Shared helpers ── */
const SectionHeading = ({ children, light = false }) => (
  <div className="text-center mb-12">
    <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${light ? "text-white" : "text-slate-800"}`}>{children}</h2>
    <span className={`inline-block w-14 h-1 rounded-full ${light ? "bg-white/40" : "bg-gradient-to-r from-indigo-500 to-purple-500"}`} />
  </div>
);

const Badge = ({ children }) => (
  <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-600">{children}</span>
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

  if (loading) return <div className="pt-24"><FrontendLoader /></div>;

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
    { icon: "fas fa-rocket", title: "10+ Years", sub: "Industry Experience" },
    { icon: "fas fa-project-diagram", title: "15+", sub: "Enterprise Projects" },
    { icon: "fas fa-users", title: "5+", sub: "Devs Mentored" },
    { icon: "fas fa-star", title: "40%", sub: "Performance Boost" },
  ];

  return (
    <>
      {/* ── Page Hero ── */}
      <section className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-violet-700 text-white pt-28 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_2px_2px,rgba(255,255,255,0.1)_1px,transparent_0)] bg-[length:28px_28px]" />
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/80 text-sm px-4 py-1.5 rounded-full mb-5">
            <i className="fas fa-user" /> About Me
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Aadhar Gaur</h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Senior PHP Developer · Backend Specialist · Laravel & Yii Expert
          </p>
        </div>
      </section>

      {/* ── Stats strip ── */}
      <div className="bg-white border-b border-slate-100 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 sm:grid-cols-4">
            {highlights.map((h) => (
              <div key={h.title} className="py-6 text-center border-r border-slate-100 last:border-0">
                <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <i className={`${h.icon} text-indigo-600`} />
                </div>
                <p className="text-2xl font-bold text-slate-800">{h.title}</p>
                <p className="text-slate-400 text-xs mt-0.5">{h.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bio ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-start">
            {/* Photo + quote */}
            <div className="text-center">
              <div className="relative inline-block">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 blur-lg opacity-20 scale-105" />
                <img
                  src={profile?.avatar ?? "/img/AboutAadhar.jpg"}
                  alt="Aadhar Gaur"
                  className="relative w-72 max-w-full rounded-2xl shadow-[0_20px_60px_rgba(99,102,241,0.2)] object-cover"
                  onError={(e) => { e.target.src = "https://ui-avatars.com/api/?name=Aadhar+Gaur&size=300&background=6366f1&color=fff"; }}
                />
              </div>
              <p className="mt-5 text-slate-400 italic text-sm max-w-xs mx-auto leading-relaxed">
                "Coding is not just a job — it's a passion for solving complex problems."
              </p>
            </div>
            {/* Bio text */}
            <div>
              <h2 className="text-3xl font-bold text-slate-800 mb-5">My Journey as a Developer</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                {profile?.bio ?? "With over 10 years of experience in web development, I am a seasoned Senior PHP Developer specializing in crafting robust, scalable, and high-performance web applications. My expertise lies primarily in the Laravel framework, complemented by a strong understanding of front-end technologies and database optimization."}
              </p>
              <p className="text-slate-600 leading-relaxed mb-4">
                I thrive on transforming complex business requirements into elegant and efficient technical solutions. My career has been driven by a continuous pursuit of learning and adopting the latest technologies and best practices.
              </p>
              <p className="text-slate-600 leading-relaxed mb-8">
                I'm passionate about clean code, software architecture, and building user-centric applications. Beyond coding, I enjoy mentoring junior developers and contributing to the developer community.
              </p>
              <h3 className="text-lg font-bold text-slate-800 mb-4">Why Work With Me?</h3>
              <div className="space-y-3">
                {[
                  ["fas fa-brain", "Expertise", "Deep knowledge in PHP, Laravel, MySQL, and API development."],
                  ["fas fa-bolt", "Performance-Driven", "A constant focus on writing clean, efficient, and maintainable code."],
                  ["fas fa-comments", "Great Communicator", "Excellent communication skills for cross-functional teams and client interactions."],
                  ["fas fa-sync-alt", "Continuous Learner", "Always up-to-date with the latest technologies and best practices."],
                ].map(([icon, title, desc]) => (
                  <div key={title} className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                    <div className="shrink-0 w-9 h-9 bg-indigo-50 rounded-lg flex items-center justify-center mt-0.5">
                      <i className={`${icon} text-indigo-600 text-sm`} />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800 text-sm">{title}</p>
                      <p className="text-slate-500 text-sm">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Skills ── */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading>Technical Skills</SectionHeading>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {displaySkills.map((s) => {
              const name = typeof s === "string" ? s : s.name;
              const icon = getIcon(name);
              return (
                <div key={name} className="bg-white rounded-xl p-4 flex flex-col items-center gap-2 shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_24px_rgba(99,102,241,0.12)] hover:-translate-y-1 hover:border-indigo-200 border border-slate-100 transition-all duration-200 cursor-default">
                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl flex items-center justify-center">
                    <i className={`${icon} text-indigo-600 text-lg`} />
                  </div>
                  <span className="text-slate-700 text-xs font-semibold text-center leading-tight">{name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <SectionHeading>Experience & Education</SectionHeading>
          <div className="relative timeline-line pl-10">
            {timeline.map((item, i) => (
              <div key={i} className="relative mb-7 group">
                {/* Dot */}
                <div className={`absolute left-[-2.45rem] top-2 w-5 h-5 rounded-full border-4 border-white shadow-md
                  ${item.type === "exp"
                    ? "bg-gradient-to-br from-indigo-500 to-purple-500 shadow-indigo-200"
                    : "bg-gradient-to-br from-emerald-400 to-teal-400 shadow-teal-100"}`} />
                <div className="bg-white rounded-2xl p-6 shadow-[0_4px_24px_rgba(0,0,0,0.06)] border border-slate-100 hover:shadow-[0_8px_32px_rgba(99,102,241,0.10)] hover:border-indigo-100 transition-all duration-300">
                  <div className="flex flex-wrap justify-between gap-2 mb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${item.type === "exp" ? "bg-indigo-50 text-indigo-600" : "bg-emerald-50 text-emerald-600"}`}>
                          {item.type === "exp" ? "Work" : "Education"}
                        </span>
                      </div>
                      <h5 className="font-bold text-slate-800 text-base mt-1 leading-tight">{item.pos}</h5>
                      <p className="text-indigo-600 font-medium text-sm">{item.company}</p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-slate-400 text-sm bg-slate-50 px-3 py-1 rounded-full border border-slate-200 h-fit">
                      <i className="fas fa-calendar-alt text-xs" /> {item.date}
                    </span>
                  </div>
                  {item.desc && <p className="text-slate-600 text-sm leading-relaxed mt-2 mb-3">{item.desc}</p>}
                  {item.techs?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
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
