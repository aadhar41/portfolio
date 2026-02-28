export default function Footer() {
  return (
    <footer className="border-t border-slate-700 py-8 text-center text-slate-400 text-sm">
      <p>
        Designed & Built by <span className="text-blue-400">Aadhar Gaur</span>
      </p>
      <div className="flex justify-center gap-6 mt-3">
        <a
          href="https://github.com/aadhargaur"
          className="hover:text-white transition"
        >
          GitHub
        </a>
        <a
          href="https://linkedin.com/in/aadhargaur"
          className="hover:text-white transition"
        >
          LinkedIn
        </a>
      </div>
    </footer>
  );
}
