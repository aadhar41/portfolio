export default function AdminFilterBar({
  search,
  onSearchChange,
  perPage,
  onPerPageChange,
  onAddNew,
  addNewText = "Add New",
  filters = [],
  onFilterChange,
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 bg-white rounded-2xl px-4 py-3 shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-slate-100 mb-5">
      {/* Left: Search + filters */}
      <div className="flex flex-wrap items-center gap-2 flex-1 min-w-0">
        {/* Search */}
        <div className="relative">
          <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />
          <input
            type="text"
            placeholder="Search records…"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-8 pr-4 py-2 text-sm border border-slate-200 rounded-xl bg-slate-50 text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all w-52"
          />
        </div>

        {/* Per-page */}
        <select
          value={perPage}
          onChange={(e) => onPerPageChange(Number(e.target.value))}
          className="py-2 px-3 text-sm border border-slate-200 rounded-xl bg-slate-50 text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all"
        >
          {[5, 10, 20, 50].map((n) => (
            <option key={n} value={n}>{n} per page</option>
          ))}
        </select>

        {/* Dynamic filters */}
        {filters.map((filter, i) => (
          <select
            key={i}
            value={filter.value}
            onChange={(e) => onFilterChange(filter.name, e.target.value)}
            className="py-2 px-3 text-sm border border-slate-200 rounded-xl bg-slate-50 text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all"
          >
            <option value="">{filter.label}</option>
            {filter.options.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        ))}
      </div>

      {/* Right: Add button */}
      <button
        onClick={onAddNew}
        className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-sm font-semibold px-4 py-2.5 rounded-xl hover:shadow-[0_4px_14px_rgba(99,102,241,0.4)] hover:-translate-y-0.5 transition-all duration-200 shrink-0"
      >
        <i className="fas fa-plus text-xs" /> {addNewText}
      </button>
    </div>
  );
}
