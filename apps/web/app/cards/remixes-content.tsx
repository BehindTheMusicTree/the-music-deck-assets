export function CardsRemixesContent() {
  return (
    <div className="px-6 py-10 flex flex-col items-center min-h-screen">
      <div className="page-index mb-2">05</div>
      <div className="page-eyebrow mb-4">Remix card layer</div>
      <h2 className="font-cinzel text-3xl tracking-[4px] text-white mb-2">
        <em className="text-gold not-italic">REMIX</em> CARDS
      </h2>
      <p className="font-garamond italic text-muted max-w-[600px] text-center mb-14">
        Remix cards are an optional layer. Content for this view will follow the
        same design charter as song cards, with structure and theming specific
        to remix presentation.
      </p>

      <div id="remix-anatomy" className="w-full max-w-[1100px] mb-14 scroll-mt-32">
        <div className="section-title mb-5">Anatomy</div>
        <div className="rounded-[6px] border border-ui-border bg-[#0f0f14]/35 px-5 py-4">
          <p className="font-garamond text-muted leading-[1.6] m-0">
            Frame anatomy for remix cards (layout, stats, and how they
            differ from or stack with the base song card) will be documented
            here.
          </p>
        </div>
      </div>

      <div id="remix-by-genre" className="w-full max-w-[1100px] mb-14 scroll-mt-32">
        <div className="section-title mb-5">By Genre</div>
        <div className="rounded-[6px] border border-ui-border bg-[#0f0f14]/35 px-5 py-4">
          <p className="font-garamond text-muted leading-[1.6] m-0">
            How remixes map to genre and subgenre themes, and any special rules
            for Genre strip, border, and matchup — placeholder until the deck is
            specified.
          </p>
        </div>
      </div>
    </div>
  );
}
