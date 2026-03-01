import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const NAV = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About" },
  { path: "/projects", label: "Projects" },
  { path: "/blog", label: "Blog" },
  { path: "/contact", label: "Contact" },
];

export default function Header() {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className="navbar"
      style={{ boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.12)" : "none" }}
    >
      <div className="container">
        <div className="navbar-inner">
          <Link to="/" className="navbar-brand">
            Aadhar Gaur
          </Link>

          {/* Desktop nav */}
          <nav>
            <ul className="nav-menu" style={{ display: "flex" }}>
              {NAV.map((n) => (
                <li key={n.path}>
                  <Link
                    to={n.path}
                    className={`nav-link${pathname === n.path ? " active" : ""}`}
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="nav-hamburger"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            <span
              style={{
                transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "",
              }}
            />
            <span style={{ opacity: menuOpen ? 0 : 1 }} />
            <span
              style={{
                transform: menuOpen
                  ? "rotate(-45deg) translate(5px, -5px)"
                  : "",
              }}
            />
          </button>
        </div>

        {/* Mobile dropdown */}
        {/* <ul className={`nav-menu${menuOpen ? " open" : ""}`}>
          {NAV.map((n) => (
            <li key={n.path}>
              <Link
                to={n.path}
                className={`nav-link${pathname === n.path ? " active" : ""}`}
              >
                {n.label}
              </Link>
            </li>
          ))}
        </ul> */}
      </div>
    </header>
  );
}
