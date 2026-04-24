export default function CatalogPage() {
  return (
    <div className="px-6 py-10 flex flex-col items-center">
      <div className="font-mono tracking-[3px] text-muted mb-2">05</div>
      <div className="font-mono tracking-[2px] text-muted mb-4">
        Available cards
      </div>
      <h2 className="font-cinzel text-3xl tracking-[4px] text-white mb-2">
        CATA<em className="text-gold not-italic">LOG</em>
      </h2>
      <p className="font-garamond italic text-muted max-w-[600px] text-center mb-12">
        The full set of cards available in The Music Deck, across all genres and
        rarities.
      </p>

      <div className="w-full max-w-[800px] bg-card border border-ui-border rounded px-6 py-8 flex flex-col items-center justify-center min-h-[200px]">
        <span className="font-mono text-muted tracking-[2px] text-sm">
          NO CARDS YET
        </span>
      </div>
    </div>
  );
}
