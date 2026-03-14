import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const SOCIALS = [
  { icon: "fab fa-github",     href: "https://github.com/aadhar41",               title: "GitHub"   },
  { icon: "fab fa-linkedin-in",href: "https://www.linkedin.com/in/aadhar-gaur-php",title: "LinkedIn" },
  { icon: "fas fa-envelope",   href: "mailto:aadhar41@gmail.com",                 title: "Email"    },
];

// `path`  → dedicated page (navigates + scrolls top)
// `hash`  → home-page section anchor (hash-scrolls)
const NAV_LINKS = [
  { label: "Home",       hash: "hero"       },
  { label: "About",      path: "/about"     },
  { label: "Skills",     hash: "skills"     },
  { label: "Experience", hash: "experience" },
  { label: "Projects",   path: "/projects"  },
  { label: "Blog",       path: "/blog"      },
  { label: "Contact",    path: "/contact"   },
];

function smoothScrollTo(id) {
  const el = document.getElementById(id);
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo({ top, behavior: "smooth" });
  }
}

export default function Footer() {
  const [showTop, setShowTop] = useState(false);
  const navigate  = useNavigate();
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const handleNav = (e, item) => {
    e.preventDefault();

    if (item.path) {
      // Dedicated page → navigate then instantly scroll top
      navigate(item.path);
      window.scrollTo({ top: 0, behavior: "instant" });
    } else {
      // Hash anchor → on home scroll to section; elsewhere go home then scroll
      if (isHome) {
        smoothScrollTo(item.hash);
      } else {
        navigate("/");
        setTimeout(() => smoothScrollTo(item.hash), 120);
      }
    }
  };

  return (
    <>
      <footer className="bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Brand */}
            <div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-3">
                Aadhar Gaur
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-5">
                Senior PHP Developer specializing in Laravel &amp; Yii. Building
                scalable web applications with 10+ years of experience.
              </p>
              <div className="flex gap-3">
                {SOCIALS.map((s) => (
                  <a
                    key={s.href}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    title={s.title}
                    className="w-9 h-9 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 hover:bg-indigo-600 hover:border-indigo-600 hover:text-white transition-all duration-200"
                  >
                    <i className={`${s.icon} text-sm`} />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick links */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-widest text-slate-400 mb-4">
                Quick Links
              </h4>
              <ul className="space-y-2.5">
                {NAV_LINKS.map((n) => (
                  <li key={n.label}>
                    <a
                      href={n.path ?? `/#${n.hash}`}
                      onClick={(e) => handleNav(e, n)}
                      className="text-slate-400 text-sm hover:text-indigo-400 transition-colors duration-200 flex items-center gap-1.5 group"
                    >
                      <i className="fas fa-chevron-right text-xs text-slate-600 group-hover:text-indigo-400 transition-colors" />
                      {n.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-widest text-slate-400 mb-4">
                Get In Touch
              </h4>
              <p className="text-slate-400 text-sm mb-5 leading-relaxed">
                Open to full-time, freelance, and remote opportunities.
              </p>
              <a
                href="mailto:aadhar41@gmail.com"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:shadow-[0_4px_14px_rgba(99,102,241,0.4)] hover:-translate-y-0.5 transition-all duration-200"
              >
                <i className="fas fa-envelope" /> Say Hello
              </a>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-12 pt-7 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-slate-500 text-sm">
              © {new Date().getFullYear()} Aadhar Gaur. All rights reserved.
            </p>
            <div className="flex items-center gap-1.5 text-slate-500 text-xs">
              <span>Built with</span>
              <i className="fas fa-heart text-red-400 text-xs" />
              <span>React &amp; Tailwind CSS</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to top */}
      <button
        onClick={scrollToTop}
        className={`scroll-top-btn ${showTop ? "show" : ""}`}
        aria-label="Back to top"
      >
        <i className="fas fa-arrow-up" />
      </button>
    </>
  );
}

