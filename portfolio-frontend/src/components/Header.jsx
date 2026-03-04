import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

/**
 * NAV config:
 *   - `hash`  → scroll to this section ID on the home page
 *   - `path`  → hard route (dedicated page)
 */
const NAV = [
  { label: "Home", hash: "hero" },
  { label: "About", hash: "about" },
  { label: "Skills", hash: "skills" },
  { label: "Download CV", hash: "cv-download" },
  { label: "Experience", hash: "experience" },
  { label: "Projects", hash: "projects" },
  { label: "Education", hash: "education" },
  // { label: "Blog", path: "blog" },
  { label: "Blog", hash: "blog" },
  { label: "Contact", hash: "contact" },
];

function scrollTo(id) {
  const el = document.getElementById(id);
  if (el) {
    const offset = 70; // navbar height
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
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

  // Shadow on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight active section while scrolling on home page
  useEffect(() => {
    if (!isHome) return;
    const sectionIds = NAV.filter((n) => n.hash).map((n) => n.hash);
    const onScroll = () => {
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveHash(sectionIds[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  // Close on route change
  useEffect(() => {
    setMenuOpen(false);
    if (!isHome) setActiveHash("");
    else setActiveHash("hero");
  }, [pathname, isHome]);

  // Close on outside click
  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen]);

  const handleNavClick = (item, e) => {
    e.preventDefault();
    setMenuOpen(false);

    if (!item.hash) {
      // Dedicated route (e.g. /blog)
      navigate(item.path);
      return;
    }

    if (isHome) {
      // Already on home — just scroll
      scrollTo(item.hash);
    } else {
      // Navigate to home first, then scroll after render
      navigate("/");
      setTimeout(() => scrollTo(item.hash), 100);
    }
  };

  const isActive = (item) => {
    if (!item.hash) return pathname === item.path;
    return isHome && activeHash === item.hash;
  };

  return (
    <header
      className="navbar"
      style={{ boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.12)" : "none" }}
      ref={menuRef}
    >
      <div className="container">
        <div className="navbar-inner">
          {/* Brand — scrolls to top */}
          <a
            href="/"
            className="navbar-brand"
            onClick={(e) => {
              e.preventDefault();
              if (isHome) scrollTo("hero");
              else navigate("/");
            }}
          >
            Aadhar Gaur
          </a>

          {/* Desktop nav */}
          <nav className="nav-desktop">
            <ul className="nav-menu">
              {NAV.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.hash ? `/#${item.hash}` : item.path}
                    className={`nav-link${isActive(item) ? " active" : ""}`}
                    onClick={(e) => handleNavClick(item, e)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="nav-hamburger"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            <span
              style={{
                transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "",
                transition: "transform 0.3s ease",
              }}
            />
            <span
              style={{
                opacity: menuOpen ? 0 : 1,
                transition: "opacity 0.3s ease",
              }}
            />
            <span
              style={{
                transform: menuOpen
                  ? "rotate(-45deg) translate(5px, -5px)"
                  : "",
                transition: "transform 0.3s ease",
              }}
            />
          </button>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <ul className="nav-mobile-menu">
            {NAV.map((item) => (
              <li key={item.label}>
                <a
                  href={item.hash ? `/#${item.hash}` : item.path}
                  className={`nav-link${isActive(item) ? " active" : ""}`}
                  onClick={(e) => handleNavClick(item, e)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </header>
  );
}
