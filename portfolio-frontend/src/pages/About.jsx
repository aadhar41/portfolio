import { useEffect, useState } from "react";
import { getProfile } from "../services/api";

const SKILL_ICONS = {
  php: "fab fa-php",
  laravel: "fab fa-laravel",
  mysql: "fas fa-database",
  javascript: "fab fa-js-square",
  react: "fab fa-react",
  bootstrap: "fab fa-bootstrap",
  git: "fas fa-code-branch",
  github: "fab fa-github",
  docker: "fab fa-docker",
  aws: "fas fa-cloud",
  api: "fas fa-server",
  html: "fab fa-html5",
  css: "fab fa-css3-alt",
  node: "fab fa-node-js",
  python: "fab fa-python",
};
function getIcon(name) {
  const key = name.toLowerCase().split(/[\s/]/)[0];
  return SKILL_ICONS[key] ?? "fas fa-code";
}

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

  const allSkills = Object.values(skills).flat();

  // Static fallbacks
  const staticSkills = [
    { id: 1, name: "PHP" },
    { id: 2, name: "Laravel" },
    { id: 3, name: "MySQL" },
    { id: 4, name: "JavaScript" },
    { id: 5, name: "React" },
    { id: 6, name: "Bootstrap" },
    { id: 7, name: "Git / GitHub" },
    { id: 8, name: "Docker" },
    { id: 9, name: "AWS (Basics)" },
    { id: 10, name: "REST APIs" },
  ];

  // Interleaved timeline: experiences + educations alternating
  const staticTimeline = [
    {
      type: "exp",
      pos: "Senior PHP Developer",
      company: "Company Name XYZ",
      date: "Jan 2022 – Present",
      desc: "Leading back-end development for large-scale web applications, optimizing database performance, and implementing robust API solutions.",
    },
    {
      type: "exp",
      pos: "PHP Developer",
      company: "Company Name ABC",
      date: "Mar 2018 – Dec 2021",
      desc: "Developed and maintained web applications using Laravel, integrated third-party services, and contributed to architectural decisions.",
    },
    {
      type: "edu",
      pos: "Bachelor of Technology in Computer Science",
      company: "University Name",
      date: "2014 – 2018",
      desc: "Graduated with honors, focusing on software engineering principles, data structures, and algorithms.",
    },
    {
      type: "exp",
      pos: "Web Development Intern",
      company: "Startup Tech Solutions",
      date: "June 2017 – Aug 2017",
      desc: "Assisted in front-end and back-end development of a client project, gaining hands-on experience with HTML, CSS, JavaScript, and basic PHP.",
    },
  ];

  const apiTimeline = [
    ...experiences.map((e) => ({
      type: "exp",
      pos: e.position,
      company: e.company,
      date: `${e.start_date} – ${e.is_current ? "Present" : e.end_date}`,
      desc: e.description,
    })),
    ...educations.map((e) => ({
      type: "edu",
      pos: `${e.degree} in ${e.field_of_study}`,
      company: e.institution,
      date: `${e.start_year} – ${e.end_year ?? "Present"}`,
      desc: e.grade ? `Grade: ${e.grade}` : "",
    })),
  ];

  const timeline = apiTimeline.length > 0 ? apiTimeline : staticTimeline;
  const displaySkills = allSkills.length > 0 ? allSkills : staticSkills;

  return (
    <>
      {/* ── Page Hero ── */}
      <section className="page-hero">
        <div className="container">
          <h1>About Aadhar Gaur</h1>
          <p>
            Senior PHP Developer | Crafting robust and scalable web solutions
          </p>
        </div>
      </section>

      {/* ── About Content (two-column) ── */}
      <section className="section bg-white" style={{ paddingTop: 0 }}>
        <div className="container">
          <div
            className="row row-2"
            style={{ alignItems: "flex-start", paddingTop: "3rem" }}
          >
            {/* Left: Photo */}
            <div style={{ textAlign: "center" }}>
              <img
                src={
                  profile?.avatar ??
                  "https://ui-avatars.com/api/?name=Aadhar+Gaur&size=350&background=2c3e50&color=fff"
                }
                alt="Aadhar Gaur"
                style={{
                  width: "100%",
                  maxWidth: 320,
                  borderRadius: 15,
                  boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
                }}
                onError={(e) => {
                  e.target.src =
                    "https://ui-avatars.com/api/?name=Aadhar+Gaur&size=350&background=2c3e50&color=fff";
                }}
              />
              <p
                style={{
                  marginTop: "1rem",
                  color: "var(--text-light)",
                  fontStyle: "italic",
                  fontSize: "0.9rem",
                }}
              >
                "Coding is not just a job; it's a passion for solving complex
                problems."
              </p>
            </div>

            {/* Right: Bio */}
            <div>
              <h2
                style={{
                  fontSize: "1.7rem",
                  fontWeight: 700,
                  marginBottom: "1.25rem",
                }}
              >
                My Journey as a Developer
              </h2>
              <p
                style={{
                  color: "var(--text-light)",
                  lineHeight: 1.85,
                  marginBottom: "1rem",
                }}
              >
                {profile?.bio ??
                  "With over 8 years of experience in web development, I am a seasoned Senior PHP Developer specializing in crafting robust, scalable, and high-performance web applications. My expertise lies primarily in the Laravel framework, complemented by a strong understanding of front-end technologies and database optimization."}
              </p>
              <p
                style={{
                  color: "var(--text-light)",
                  lineHeight: 1.85,
                  marginBottom: "1rem",
                }}
              >
                I thrive on transforming complex business requirements into
                elegant and efficient technical solutions. My career has been
                driven by a continuous pursuit of learning and adopting the
                latest technologies and best practices in the web development
                ecosystem.
              </p>
              <p
                style={{
                  color: "var(--text-light)",
                  lineHeight: 1.85,
                  marginBottom: "1.5rem",
                }}
              >
                I'm passionate about clean code, software architecture, and
                building user-centric applications. Beyond coding, I enjoy
                mentoring junior developers and contributing to the developer
                community through articles and discussions.
              </p>
              <h3
                style={{
                  fontSize: "1.1rem",
                  fontWeight: 700,
                  marginBottom: "1rem",
                }}
              >
                Why Work With Me?
              </h3>
              <ul style={{ listStyle: "none", padding: 0 }}>
                {[
                  [
                    "Expertise",
                    "Deep knowledge in PHP, Laravel, MySQL, and API development.",
                  ],
                  [
                    "Problem Solver",
                    "A knack for debugging and optimizing complex systems.",
                  ],
                  [
                    "Reliability",
                    "Committed to delivering high-quality, well-tested code on time.",
                  ],
                  [
                    "Innovation",
                    "Always exploring new tools and techniques to improve development workflows.",
                  ],
                ].map(([k, v]) => (
                  <li
                    key={k}
                    style={{
                      marginBottom: "0.6rem",
                      color: "var(--text-light)",
                      display: "flex",
                      gap: "0.5rem",
                    }}
                  >
                    <i
                      className="fas fa-check-circle"
                      style={{
                        color: "var(--secondary-color)",
                        marginTop: 3,
                        flexShrink: 0,
                      }}
                    />
                    <span>
                      <strong>"{k}":</strong> {v}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Core Expertise / Skills ── */}
      <section className="section bg-white" style={{ paddingTop: 0 }}>
        <div className="container">
          <h2 className="section-title">My Core Expertise</h2>
          <div className="skill-grid">
            {displaySkills.map((skill) => (
              <div key={skill.id} className="skill-card">
                <i className={getIcon(skill.name)} />
                <h4>{skill.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Experience & Education (alternating two-col timeline) ── */}
      <section className="section bg-light">
        <div className="container">
          <h2 className="section-title">Experience &amp; Education</h2>

          {/* Two-column alternating timeline */}
          <div
            style={{
              position: "relative",
              marginTop: "3rem",
            }}
          >
            {/* Center line */}
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: 0,
                bottom: 0,
                width: 3,
                background: "var(--secondary-color)",
                borderRadius: 2,
                transform: "translateX(-50%)",
              }}
            />

            {timeline.map((item, i) => {
              const isLeft = i % 2 === 0;
              return (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    justifyContent: isLeft ? "flex-start" : "flex-end",
                    marginBottom: "2rem",
                    position: "relative",
                  }}
                >
                  {/* Card */}
                  <div
                    style={{
                      width: "45%",
                      background: "white",
                      borderRadius: 12,
                      padding: "1.25rem",
                      boxShadow: "var(--shadow-card)",
                      transition: "var(--transition)",
                      position: "relative",
                    }}
                  >
                    {/* Arrow */}
                    <div
                      style={{
                        position: "absolute",
                        top: 20,
                        [isLeft ? "right" : "left"]: -10,
                        width: 0,
                        height: 0,
                        borderTop: "10px solid transparent",
                        borderBottom: "10px solid transparent",
                        [isLeft ? "borderLeft" : "borderRight"]:
                          "10px solid white",
                      }}
                    />

                    <h3
                      style={{
                        fontSize: "1.1rem",
                        fontWeight: 700,
                        color: "var(--secondary-color)",
                        margin: "0 0 4px",
                      }}
                    >
                      {item.pos}
                    </h3>
                    <h4
                      style={{
                        fontSize: "0.9rem",
                        color: "var(--accent-color)",
                        margin: "0 0 6px",
                        fontWeight: 600,
                      }}
                    >
                      {item.company}
                    </h4>
                    <span
                      style={{
                        fontSize: "0.82rem",
                        color: "var(--text-light)",
                        display: "block",
                        marginBottom: 8,
                      }}
                    >
                      {item.date}
                    </span>
                    {item.desc && (
                      <p
                        style={{
                          fontSize: "0.88rem",
                          color: "var(--text-light)",
                          margin: 0,
                          lineHeight: 1.6,
                        }}
                      >
                        {item.desc}
                      </p>
                    )}
                  </div>

                  {/* Center dot */}
                  <div
                    style={{
                      position: "absolute",
                      left: "50%",
                      top: 16,
                      transform: "translateX(-50%)",
                      width: 18,
                      height: 18,
                      borderRadius: "50%",
                      background: "var(--gradient)",
                      border: "3px solid white",
                      boxShadow: "0 0 0 3px rgba(102,126,234,0.3)",
                      zIndex: 2,
                    }}
                  />
                </div>
              );
            })}
          </div>

          {/* Responsive single-column override */}
          <style>{`
            @media(max-width:768px){
              .about-timeline > div { width:100% !important; justify-content:flex-start !important; padding-left:40px; }
            }
          `}</style>
        </div>
      </section>
    </>
  );
}
