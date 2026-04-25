const GENRES = [
  "Rock",
  "Mainstream",
  "Jazz",
  "Hip-Hop",
  "Electronic",
  "Classical",
  "R&B",
  "Metal",
  "Folk",
  "World",
];

export default function CollectionPage() {
  return (
    <div className="px-6 py-10 flex flex-col items-center">
      <div className="font-mono tracking-[3px] text-muted mb-2">04</div>
      <div className="font-mono tracking-[2px] text-muted mb-4">
        Your cards
      </div>
      <h2 className="font-cinzel text-3xl tracking-[4px] text-white mb-2">
        COLLEC<em className="text-gold not-italic">TION</em>
      </h2>
      <p className="font-garamond italic text-muted max-w-[600px] text-center mb-12">
        Cards you own, grouped by genre. Each genre forms its own pool for deck
        building.
      </p>

      <div className="w-full max-w-[800px] flex flex-col gap-3">
        {GENRES.map((genre) => (
          <div
            key={genre}
            className="bg-card border border-ui-border rounded px-6 py-4 flex items-center justify-between"
          >
            <span className="font-cinzel text-sm tracking-[2px] text-white uppercase">
              {genre}
            </span>
            <span className="font-mono text-xs text-muted tracking-[1px]">
              0 cards
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
