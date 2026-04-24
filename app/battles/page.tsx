export default function BattlesPage() {
  return (
    <div className="min-h-[calc(100vh-56px)] bg-bg px-6 py-12 sm:py-[60px] max-w-4xl mx-auto">
      <div className="font-mono tracking-[3px] text-muted mb-4 uppercase text-sm">
        Game
      </div>
      <h1 className="font-cinzel text-3xl font-bold tracking-[4px] text-white mb-3">
        Battles
      </h1>
      <p className="font-garamond italic text-muted mb-12 max-w-[560px]">
        Battle rules, formats, and scoring concepts — how players face off using their music decks.
      </p>

      <div className="border border-ui-border rounded px-8 py-10 bg-card text-muted font-garamond italic text-lg text-center">
        Battle rules and formats coming soon.
      </div>
    </div>
  );
}
