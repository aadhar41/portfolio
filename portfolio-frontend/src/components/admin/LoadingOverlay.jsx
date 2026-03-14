export default function LoadingOverlay({ active, transparent = false }) {
  if (!active) return null;
  return (
    <div className={`absolute inset-0 z-50 flex items-center justify-center rounded-[inherit] ${transparent ? "" : "bg-white/70 backdrop-blur-[2px]"}`}>
      <svg className="animate-spin w-9 h-9" viewBox="0 0 56 56" fill="none">
        <circle cx="28" cy="28" r="24" stroke="url(#overlay-spin)" strokeWidth="4" strokeLinecap="round" strokeDasharray="100 52" />
        <defs>
          <linearGradient id="overlay-spin" x1="0" y1="0" x2="56" y2="56" gradientUnits="userSpaceOnUse">
            <stop stopColor="#6366f1" />
            <stop offset="1" stopColor="#a855f7" stopOpacity="0.15" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
