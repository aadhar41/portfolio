export default function FrontendLoader({ fullPage = false }) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-5 ${
        fullPage ? "min-h-screen" : "py-16 w-full"
      }`}
    >
      {/* Animated indigo/purple spinner ring */}
      <div className="relative w-14 h-14">
        {/* Outer rotating gradient ring */}
        <svg
          className="animate-spin"
          viewBox="0 0 56 56"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: 56, height: 56 }}
        >
          <circle
            cx="28"
            cy="28"
            r="24"
            stroke="url(#spin-grad)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="100 52"
          />
          <defs>
            <linearGradient id="spin-grad" x1="0" y1="0" x2="56" y2="56" gradientUnits="userSpaceOnUse">
              <stop stopColor="#6366f1" />
              <stop offset="1" stopColor="#a855f7" stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </svg>

        {/* Inner pulsing dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 animate-pulse shadow-[0_0_12px_rgba(99,102,241,0.5)]" />
        </div>
      </div>

      {/* Dots strip */}
      <div className="flex items-center gap-1.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-indigo-400"
            style={{
              animation: "bounce 1.2s infinite",
              animationDelay: `${i * 0.18}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
