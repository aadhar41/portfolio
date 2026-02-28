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
  return (
    <header className="fixed top-0 w-full z-50 bg-slate-900/95 backdrop-blur border-b border-slate-700">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        <Link to="/" className="text-xl font-bold text-white">
          AG<span className="text-blue-400">.</span>
        </Link>
        <nav className="hidden md:flex gap-6">
          {NAV.map((n) => (
            <Link
              key={n.path}
              to={n.path}
              className={`text-sm transition-colors ${
                pathname === n.path
                  ? "text-blue-400"
                  : "text-slate-300 hover:text-white"
              }`}
            >
              {n.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
