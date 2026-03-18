import { useTheme } from "../../context/ThemeContext";

const themeData = [
  { id: "nordic",   label: "Nordic Frost",     color: "#f8faff", accent: "#2563eb" },
  { id: "midnight", label: "Midnight Matrix",  color: "#0f172a", accent: "#22d3ee" },
  { id: "crimson",  label: "Solarized Crimson",color: "#111827", accent: "#ef4444" },
  { id: "emerald",  label: "Emerald Nebula",   color: "#064e3b", accent: "#10b981" },
];

export default function ThemeSwitcher() {
  const { theme: activeTheme, toggleTheme } = useTheme();

  return (
    <div className="flex items-center gap-2 p-2 bg-slate-50/50 rounded-2xl border border-slate-100/50">
      {themeData.map((t) => (
        <button
          key={t.id}
          onClick={() => toggleTheme(t.id)}
          title={t.label}
          className={`
            w-8 h-8 rounded-xl border-2 transition-all duration-300 relative group
            ${activeTheme === t.id ? "border-indigo-500 scale-110 shadow-lg" : "border-transparent opacity-60 hover:opacity-100"}
          `}
          style={{ backgroundColor: t.color }}
        >
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: t.accent }} />
          </div>
          {activeTheme === t.id && (
             <div className="absolute -top-1 -right-1 w-3 h-3 bg-indigo-500 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                <i className="fas fa-check text-[6px] text-white" />
             </div>
          )}
        </button>
      ))}
    </div>
  );
}
