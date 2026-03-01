import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/projects", label: "Projects" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
];

export default function Footer() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 300);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <footer className="footer">
        <div className="container">
          <div className="footer-inner">
            {/* Brand */}
            <div className="footer-brand">
              <h5>Aadhar Gaur</h5>
              <p>
                Senior PHP Developer sharing knowledge and insights about web
                development.
              </p>
            </div>

            {/* Nav + Social */}
            <div className="footer-right">
              <nav className="footer-nav">
                {NAV_LINKS.map((l) => (
                  <Link key={l.to} to={l.to} className="footer-link">
                    {l.label}
                  </Link>
                ))}
              </nav>
              <div className="social-links">
                <a
                  href="mailto:aadhar41@gmail.com"
                  className="social-btn"
                  title="Email"
                >
                  <i className="fas fa-envelope" />
                </a>
                <a
                  href="https://www.linkedin.com/in/aadhar-gaur-php"
                  target="_blank"
                  rel="noreferrer"
                  className="social-btn"
                  title="LinkedIn"
                >
                  <i className="fab fa-linkedin-in" />
                </a>
                <a
                  href="tel:+917737138843"
                  className="social-btn"
                  title="Phone"
                >
                  <i className="fas fa-phone" />
                </a>
                <a
                  href="https://github.com/aadhar41"
                  target="_blank"
                  rel="noreferrer"
                  className="social-btn"
                  title="GitHub"
                >
                  <i className="fab fa-github" />
                </a>
              </div>
            </div>
          </div>

          <hr className="footer-divider" />
          <p className="footer-copy">
            © {new Date().getFullYear()} Aadhar Gaur. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Scroll to top */}
      <button
        className={`scroll-top-btn${showTop ? " show" : ""}`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Scroll to top"
      >
        <i className="fas fa-arrow-up" />
      </button>
    </>
  );
}
