export default function TrackListsPage() {
  return (
    <div className="min-h-[calc(100vh-56px)] bg-bg px-6 py-12 sm:py-[60px] max-w-4xl mx-auto">
      <div className="page-kicker mb-4">Game</div>
      <h1 className="font-cinzel text-3xl font-bold tracking-[4px] text-white mb-3">
        Track Lists
      </h1>
      <p className="font-garamond italic text-muted mb-8 max-w-[560px]">
        Deck building — assemble your track list before a battle. Choose your tracks, genres, and strategy.
      </p>

      <div className="border border-ui-border rounded px-6 py-5 bg-card mb-8 max-w-[560px]">
        <div className="section-title mb-2">Specification</div>
        <ul className="font-garamond text-muted leading-normal m-0 pl-5 space-y-1">
          <li>Each track list is built from <span className="text-white">exactly 60 cards</span>.</li>
          <li>You can create as many track lists as you want.</li>
          <li>Each track list can have its own custom name.</li>
        </ul>
      </div>

      <div className="border border-ui-border rounded px-8 py-10 bg-card text-muted font-garamond italic text-lg text-center">
        Track list builder coming soon.
      </div>
    </div>
  );
}
