"use client";

export default function CatalogLayoutToolbar({
  viewMode,
  visibleCount,
  onSelectTable,
  onSelectGrid,
}: {
  viewMode: "table" | "grid";
  visibleCount: number;
  onSelectTable: () => void;
  onSelectGrid: () => void;
}) {
  const viewToggleBtn =
    "px-3 py-1.5 font-cinzel text-[10px] sm:text-[11px] tracking-[0.14em] rounded-[4px] transition-colors";
  const viewToggleInactive =
    "text-muted hover:text-white/90 hover:bg-white/5 border border-transparent";
  const viewToggleActive =
    "text-gold bg-gold/10 border border-gold/35 shadow-[inset_0_0_0_1px_rgba(200,160,64,0.12)]";

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 mb-3 min-w-0">
      <div
        className="inline-flex items-center gap-0.5 rounded-md border border-ui-border bg-[#12121a]/55 p-0.5"
        role="group"
        aria-label="Catalog layout"
      >
        <button
          type="button"
          className={[
            viewToggleBtn,
            viewMode === "table" ? viewToggleActive : viewToggleInactive,
          ].join(" ")}
          aria-pressed={viewMode === "table"}
          onClick={onSelectTable}
        >
          Table
        </button>
        <button
          type="button"
          className={[
            viewToggleBtn,
            viewMode === "grid" ? viewToggleActive : viewToggleInactive,
          ].join(" ")}
          aria-pressed={viewMode === "grid"}
          onClick={onSelectGrid}
        >
          Grid
        </button>
      </div>
      <span className="font-mono text-[11px] text-muted tabular-nums shrink-0">
        {visibleCount} card{visibleCount === 1 ? "" : "s"}
      </span>
    </div>
  );
}
