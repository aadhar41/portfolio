export default function AdminFilterBar({
  search,
  onSearchChange,
  perPage,
  onPerPageChange,
  onAddNew,
  addNewText = "Add New",
  filters = [],
  onFilterChange,
  onClear,
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 bg-surface rounded-2xl px-4 py-3 shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-theme mb-5">
      {/* Left: Search + filters */}
      <div className="flex flex-wrap items-center gap-2 flex-1 min-w-0">
        {/* Search */}
        <div className="relative">
          <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-theme-muted text-xs" />
          <input
            type="text"
            placeholder="Search records…"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-8 pr-4 py-2 text-sm border border-theme rounded-xl bg-theme text-theme placeholder-theme-muted focus:outline-none focus:ring-2 focus:focus-ring-accent focus:border-transparent transition-all w-52"
          />
        </div>

        {/* Per-page */}
        <select
          value={perPage}
          onChange={(e) => onPerPageChange(Number(e.target.value))}
          className="py-2 px-3 text-sm border border-theme rounded-xl bg-theme text-theme-muted focus:outline-none focus:ring-2 focus:focus-ring-accent focus:border-transparent transition-all"
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
            className="py-2 px-3 text-sm border border-theme rounded-xl bg-theme text-theme-muted focus:outline-none focus:ring-2 focus:focus-ring-accent focus:border-transparent transition-all"
          >
            <option value="">{filter.label}</option>
            {filter.options.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        ))}

        {/* Clear Filters */}
        {onClear && (
          <button
            onClick={onClear}
            className="flex items-center gap-2 px-3 py-2 text-xs font-black text-theme-muted hover:text-indigo-400 uppercase tracking-widest transition-all group"
          >
            <i className="fas fa-undo-alt text-[10px] group-hover:-rotate-180 transition-transform duration-500" />
            Reset Filters
          </button>
        )}
      </div>

      {/* Right: Add button */}
      <button
        onClick={onAddNew}
        className="clay-button-primary flex items-center gap-2 text-sm font-semibold px-4 py-2.5 rounded-xl! transition-all duration-200 shrink-0"
      >
        <i className="fas fa-plus text-xs" /> {addNewText}
      </button>
    </div>
  );
}
