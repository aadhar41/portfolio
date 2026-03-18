export default function PageLoader() {
  return (
    <div className="flex flex-col items-center justify-center py-20 min-h-[340px] w-full">
      {/* Spinning ring */}
      <div className="relative w-14 h-14 mb-4">
        <svg className="animate-spin" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" width={56} height={56}>
          <circle cx="28" cy="28" r="24" stroke="url(#admin-spin)" strokeWidth="4" strokeLinecap="round" strokeDasharray="100 52" />
          <defs>
            <linearGradient id="admin-spin" x1="0" y1="0" x2="56" y2="56" gradientUnits="userSpaceOnUse">
              <stop stopColor="#6366f1" />
              <stop offset="1" stopColor="#a855f7" stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3 h-3 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 animate-pulse" />
        </div>
      </div>
      <p className="text-theme-muted text-sm font-medium">Loading…</p>
    </div>
  );
}
