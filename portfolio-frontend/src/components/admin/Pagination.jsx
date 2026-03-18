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
    "bg-indigo-500 text-white shadow-lg shadow-indigo-500/20";
  const btnDefault =
    "border border-theme text-theme-muted hover:border-indigo-400 hover:text-indigo-400 bg-theme";
  const btnDisabled =
    "border border-theme text-theme-muted/30 cursor-not-allowed bg-theme opacity-50";

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 mt-5">
      {/* Info */}
      <p className="text-xs text-theme-muted">
        Page <strong className="text-theme">{current_page}</strong> of{" "}
        <strong className="text-theme">{last_page}</strong> &mdash;{" "}
        <span className="text-theme-muted/60">{total} total</span>
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
            <span key={`ellipsis-${i}`} className="px-1 text-theme-muted text-xs select-none">
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
