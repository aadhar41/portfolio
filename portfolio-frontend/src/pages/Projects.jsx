import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProjects } from "../services/api";

const CATEGORIES = ["all", "web", "mobile", "api"];

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    setLoading(true);
    getProjects({ category, search })
      .then((res) => setProjects(res.data))
      .finally(() => setLoading(false));
  }, [category, search]);

  return (
    <div className="max-w-6xl mx-auto px-4 pt-24 pb-16">
      <h1 className="text-4xl font-bold text-white mb-8">Projects</h1>
      <div className="flex gap-3 mb-8 flex-wrap items-center">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`px-4 py-2 rounded-full text-sm capitalize transition ${
              category === c
                ? "bg-blue-600 text-white"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700"
            }`}
          >
            {c}
          </button>
        ))}
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search projects..."
          className="ml-auto px-4 py-2 bg-slate-800 text-white rounded-full text-sm outline-none border border-slate-700"
        />
      </div>
      {loading ? (
        <p className="text-slate-400">Loading...</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <Link
              key={p.id}
              to={`/projects/${p.id}`}
              className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700 hover:border-blue-500 transition"
            >
              {p.image && (
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-5">
                {p.featured && (
                  <span className="text-xs text-blue-400 font-medium">
                    Featured
                  </span>
                )}
                <h3 className="text-lg font-semibold text-white mt-1 mb-2">
                  {p.title}
                </h3>
                <p className="text-slate-400 text-sm mb-4">{p.description}</p>
                <div className="flex flex-wrap gap-2">
                  {p.technologies?.slice(0, 4).map((t) => (
                    <span
                      key={t}
                      className="text-xs px-2 py-1 bg-blue-900/40 text-blue-300 rounded"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
