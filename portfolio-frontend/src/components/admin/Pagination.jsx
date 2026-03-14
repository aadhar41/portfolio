/**
 * Shared Pagination component for all admin listing pages.
 *
 * Props:
 *  pagination  – { current_page, last_page, total }
 *  page        – current page number (controlled)
 *  onPageChange – (pageNumber) => void
 */
export default function Pagination({ pagination, page, onPageChange }) {
  if (!pagination || pagination.last_page <= 1) return null;

  const { current_page, last_page, total } = pagination;

  // Build the page number sequence with ellipsis
  const getPages = () => {
    const pages = [];
    const delta = 1; // pages around current

    const left  = Math.max(2, current_page - delta);
    const right = Math.min(last_page - 1, current_page + delta);

    pages.push(1);                     // always first

    if (left > 2) pages.push("...");  // left ellipsis

    for (let i = left; i <= right; i++) pages.push(i);

    if (right < last_page - 1) pages.push("..."); // right ellipsis

    if (last_page > 1) pages.push(last_page);     // always last

    return pages;
  };

  const btnBase =
    "min-w-[32px] h-8 px-2.5 flex items-center justify-center rounded-lg text-xs font-medium transition-all duration-150";
  const btnActive =
    "bg-indigo-600 text-white shadow-[0_2px_8px_rgba(99,102,241,0.4)]";
  const btnDefault =
    "border border-slate-200 text-slate-600 hover:border-indigo-400 hover:text-indigo-600";
  const btnDisabled =
    "border border-slate-100 text-slate-300 cursor-not-allowed";

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 mt-5">
      {/* Info */}
      <p className="text-xs text-slate-500">
        Page <strong className="text-slate-700">{current_page}</strong> of{" "}
        <strong className="text-slate-700">{last_page}</strong> &mdash;{" "}
        <span className="text-slate-400">{total} total</span>
      </p>

      {/* Page buttons */}
      <div className="flex items-center gap-1">
        {/* Previous */}
        <button
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
          className={`${btnBase} gap-1 ${page === 1 ? btnDisabled : btnDefault}`}
        >
          <i className="fas fa-chevron-left text-[10px]" /> Prev
        </button>

        {/* Numbered pages */}
        {getPages().map((p, i) =>
          p === "..." ? (
            <span key={`ellipsis-${i}`} className="px-1 text-slate-400 text-xs select-none">
              …
            </span>
          ) : (
            <button
              key={p}
              onClick={() => onPageChange(p)}
              className={`${btnBase} ${p === current_page ? btnActive : btnDefault}`}
            >
              {p}
            </button>
          )
        )}

        {/* Next */}
        <button
          disabled={page === last_page}
          onClick={() => onPageChange(page + 1)}
          className={`${btnBase} gap-1 ${page === last_page ? btnDisabled : btnDefault}`}
        >
          Next <i className="fas fa-chevron-right text-[10px]" />
        </button>
      </div>
    </div>
  );
}
