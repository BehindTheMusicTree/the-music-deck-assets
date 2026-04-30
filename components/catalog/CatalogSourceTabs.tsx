"use client";

export default function CatalogSourceTabs({
  catalogPanel,
  onSelectDeck,
  onSelectWishlist,
}: {
  catalogPanel: "deck" | "wishlist";
  onSelectDeck: () => void;
  onSelectWishlist: () => void;
}) {
  const viewToggleBtn =
    "px-3 py-1.5 font-cinzel text-[10px] sm:text-[11px] tracking-[0.14em] rounded-[4px] transition-colors";
  const viewToggleInactive =
    "text-muted hover:text-white/90 hover:bg-white/5 border border-transparent";
  const viewToggleActive =
    "text-gold bg-gold/10 border border-gold/35 shadow-[inset_0_0_0_1px_rgba(200,160,64,0.12)]";

  return (
    <div
      className="inline-flex items-center gap-0.5 rounded-md border border-ui-border bg-[#12121a]/55 p-0.5 mb-4"
      role="tablist"
      aria-label="Catalog source"
    >
      <button
        type="button"
        className={[
          viewToggleBtn,
          catalogPanel === "deck" ? viewToggleActive : viewToggleInactive,
        ].join(" ")}
        role="tab"
        aria-selected={catalogPanel === "deck"}
        id="catalog-tab-deck"
        aria-controls="catalog-panel-deck"
        onClick={onSelectDeck}
      >
        Shipped deck
      </button>
      <button
        type="button"
        className={[
          viewToggleBtn,
          catalogPanel === "wishlist" ? viewToggleActive : viewToggleInactive,
        ].join(" ")}
        role="tab"
        aria-selected={catalogPanel === "wishlist"}
        id="catalog-tab-wishlist"
        aria-controls="catalog-panel-wishlist"
        onClick={onSelectWishlist}
      >
        Wishlist
      </button>
    </div>
  );
}
