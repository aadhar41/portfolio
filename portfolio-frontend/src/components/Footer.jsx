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
      <footer className="relative bg-[#f8fafc] pt-20 pb-10 overflow-hidden">
        {/* Decorative background blobs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-100/50 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-100/50 rounded-full blur-2xl translate-x-1/4 translate-y-1/4" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="clay-surface p-10 md:p-14 mb-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 sm:gap-16">
              {/* Brand */}
              <div className="flex flex-col items-center md:items-start text-center md:text-left">
                <h3 className="text-3xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4 tracking-tight">
                  Aadhar Gaur
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-8 max-w-xs">
                  Senior PHP Developer specializing in Laravel &amp; Yii. Building
                  scalable web applications with 10+ years of experience.
                </p>
                <div className="flex gap-4">
                  {SOCIALS.map((s) => (
                    <a
                      key={s.href}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      title={s.title}
                      className="w-11 h-11 rounded-2xl bg-white/60 border border-white/40 flex items-center justify-center text-slate-500 hover:clay-button-primary hover:text-white transition-all duration-300 shadow-sm"
                    >
                      <i className={`${s.icon} text-lg`} />
                    </a>
                  ))}
                </div>
              </div>

              {/* Quick links */}
              <div className="flex flex-col items-center md:items-start">
                <h4 className="text-sm font-bold uppercase tracking-widest text-slate-800 mb-6">
                  Navigate
                </h4>
                <ul className="grid grid-cols-2 gap-x-8 gap-y-3">
                  {NAV_LINKS.map((n) => (
                    <li key={n.label}>
                      <a
                        href={n.path ?? `/#${n.hash}`}
                        onClick={(e) => handleNav(e, n)}
                        className="text-slate-500 text-sm font-medium hover:text-indigo-600 transition-colors duration-200 flex items-center gap-2 group"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-200 group-hover:bg-indigo-600 transition-colors" />
                        {n.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <div className="flex flex-col items-center md:items-start text-center md:text-left">
                <h4 className="text-sm font-bold uppercase tracking-widest text-slate-800 mb-6">
                  Let's Connect
                </h4>
                <p className="text-slate-500 text-sm mb-8 leading-relaxed">
                  Open to full-time, freelance, and remote opportunities.
                </p>
                <a
                  href="mailto:aadhar41@gmail.com"
                  className="clay-button-primary"
                >
                  <i className="fas fa-envelope" /> Say Hello
                </a>
              </div>
            </div>

            <div className="border-t border-slate-100 mt-14 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-slate-400 text-sm font-medium">
                © {new Date().getFullYear()} Aadhar Gaur. All rights reserved.
              </p>
              <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold">
                <span>Made with</span>
                <i className="fas fa-heart text-red-400 animate-pulse" />
                <span className="bg-white/80 px-2 py-1 rounded-lg border border-white/40">React</span>
                <span className="bg-white/80 px-2 py-1 rounded-lg border border-white/40">Tailwind</span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to top */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 w-12 h-12 rounded-2xl clay-button-primary z-[1000] transition-all duration-500 ${
          showTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12 pointer-events-none"
        }`}
        aria-label="Back to top"
      >
        <i className="fas fa-arrow-up" />
      </button>
    </>
  );
}

