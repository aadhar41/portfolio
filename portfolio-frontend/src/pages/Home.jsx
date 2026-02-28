import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProfile } from "../services/api";

export default function Home() {
  const [profile, setProfile] = useState(null);
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    getProfile().then((res) => {
      setProfile(res.data.profile);
      setSkills(res.data.skills);
    });
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center pt-16 px-4">
      <div className="max-w-3xl text-center">
        <p className="text-blue-400 mb-3 text-lg">Hello, I am</p>
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
          {profile?.name ?? "Loading..."}
        </h1>
        <p className="text-2xl text-blue-300 mb-6">{profile?.title}</p>
        <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto">
          {profile?.bio}
        </p>
        <div className="flex gap-4 justify-center mb-16">
          <Link
            to="/projects"
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition"
          >
            View Projects
          </Link>
          <Link
            to="/contact"
            className="px-8 py-3 border border-blue-400 text-blue-400 hover:bg-blue-400/10 rounded-lg font-medium transition"
          >
            Hire Me
          </Link>
        </div>
        <div className="flex flex-wrap gap-3 justify-center">
          {skills.slice(0, 8).map((s) => (
            <span
              key={s.id}
              className="px-4 py-2 bg-slate-800 border border-slate-700 text-slate-300 rounded-full text-sm"
            >
              {s.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
