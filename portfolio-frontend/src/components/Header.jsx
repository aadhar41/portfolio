import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const NAV = [
  { label: "Home",        hash: "hero" },
  { label: "About",       hash: "about" },
  { label: "Skills",      hash: "skills" },
  { label: "Resume",      hash: "cv-download" },
  { label: "Experience",  hash: "experience" },
  { label: "Projects",    hash: "projects" },
  { label: "Education",   hash: "education" },
  { label: "Blog",        hash: "blog" },
  { label: "Contact",     hash: "contact" },
];

function scrollTo(id) {
  const el = document.getElementById(id);
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo({ top, behavior: "smooth" });
  }
}

export default function Header() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeHash, setActiveHash] = useState("hero");
  const menuRef = useRef(null);
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isHome) return;
    const ids = NAV.filter((n) => n.hash).map((n) => n.hash);
    const onScroll = () => {
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveHash(ids[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  useEffect(() => {
    setMenuOpen(false);
    if (!isHome) setActiveHash("");
    else setActiveHash("hero");
  }, [pathname, isHome]);

  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target))
        setMenuOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen]);

  const handleNavClick = (item, e) => {
    e.preventDefault();
    setMenuOpen(false);
    if (!item.hash) { navigate(item.path); return; }
    if (isHome) scrollTo(item.hash);
    else { navigate("/"); setTimeout(() => scrollTo(item.hash), 100); }
  };

  const isActive = (item) => {
    if (!item.hash) return pathname === item.path;
    return isHome && activeHash === item.hash;
  };

  return (
    <header
      ref={menuRef}
      className={`fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl z-50 transition-all duration-500 ${
        scrolled
          ? "top-2"
          : "top-4"
      }`}
    >
      <div className={`clay-surface px-6 py-3 flex items-center justify-between transition-all duration-300 ${
        scrolled ? "rounded-2xl py-2" : "rounded-[32px]"
      }`}>
        {/* Brand */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            if (isHome) scrollTo("hero");
            else navigate("/");
          }}
          className="font-extrabold text-xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent tracking-tight hover:opacity-80 transition-opacity"
        >
          Aadhar Gaur
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-2">
          {NAV.map((item) => (
            <a
              key={item.label}
              href={item.hash ? `/#${item.hash}` : item.path}
              onClick={(e) => handleNavClick(item, e)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300 ${
                isActive(item)
                  ? "bg-indigo-600 text-white shadow-[inset_2px_2px_4px_rgba(255,255,255,0.3)] shadow-indigo-200"
                  : "text-slate-600 hover:text-indigo-600 hover:bg-white/50"
              }`}
            >
              {item.label}
            </a>
          ))}
          <a
            href="/#contact"
            onClick={(e) => { e.preventDefault(); if (isHome) scrollTo("contact"); else { navigate("/"); setTimeout(() => scrollTo("contact"), 100); } }}
            className="ml-2 clay-button-primary scale-90"
          >
            Hire Me
          </a>
        </nav>

        {/* Hamburger */}
        <button
          className="lg:hidden flex flex-col justify-center items-center w-10 h-10 rounded-2xl bg-white/50 border border-white/40 shadow-sm gap-1.5 transition-all hover:bg-white active:scale-95"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <span className={`w-5 h-0.5 bg-slate-700 rounded transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`w-5 h-0.5 bg-slate-700 rounded transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`w-5 h-0.5 bg-slate-700 rounded transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden mt-3 clay-surface p-4 animate-[fadeInUp_0.3s_ease_both]">
          <nav className="flex flex-col gap-1">
            {NAV.map((item) => (
              <a
                key={item.label}
                href={item.hash ? `/#${item.hash}` : item.path}
                onClick={(e) => handleNavClick(item, e)}
                className={`block px-4 py-3 rounded-2xl text-sm font-semibold transition-all ${
                  isActive(item)
                    ? "bg-indigo-600 text-white shadow-lg"
                    : "text-slate-700 hover:bg-white/50 hover:text-indigo-600"
                }`}
              >
                {item.label}
              </a>
            ))}
            <a
              href="/#contact"
              onClick={(e) => { e.preventDefault(); if (isHome) scrollTo("contact"); else { navigate("/"); setTimeout(() => scrollTo("contact"), 100); } setMenuOpen(false); }}
              className="mt-2 clay-button-primary w-full text-center"
            >
              Hire Me
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
