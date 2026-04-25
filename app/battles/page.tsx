import BattlesSubTabs from "@/components/BattlesSubTabs";

export default function BattlesPage() {
  return (
    <>
      <BattlesSubTabs />
      <div className="min-h-[calc(100vh-56px)] bg-bg px-6 py-12 sm:py-[60px] max-w-4xl mx-auto">
        <div className="font-mono tracking-[3px] text-muted mb-4 uppercase text-sm">
          Game
        </div>
        <h1 className="font-cinzel text-3xl font-bold tracking-[4px] text-white mb-3">
          Battles
        </h1>
        <p className="font-garamond italic text-muted mb-8 max-w-[560px]">
          Battle rules, formats, and scoring concepts — how players face off using their music decks.
        </p>

        <div id="vibe" className="border border-ui-border rounded px-6 py-5 bg-card mb-8 max-w-[560px]">
          <div className="font-mono tracking-[2px] text-muted text-xs uppercase mb-2">Vibe</div>
          <ul className="font-garamond text-muted leading-normal m-0 pl-5 space-y-1.5">
            <li>
              The score is a single <span className="text-white">Vibe</span> gauge, not a detached number on its
              own.
            </li>
            <li>
              The gauge runs from <span className="text-white">100% on player 1&apos;s side</span> to{" "}
              <span className="text-white">100% on player 2&apos;s side</span>, with a{" "}
              <span className="text-white">smooth progressive gradient</span> between the two.
            </li>
            <li>
              At the start of the match it reads <span className="text-white">0</span> — neutral (no lead). The
              indicator then shifts along the bar as Vibe changes.
            </li>
          </ul>
        </div>

        <div className="border border-ui-border rounded px-6 py-5 bg-card mb-8 max-w-[560px]">
          <div className="font-mono tracking-[2px] text-muted text-xs uppercase mb-3">Vibe gauge (reference)</div>
          <div className="flex items-center justify-between font-mono text-[10px] text-muted tracking-wide mb-1.5">
            <span>P1 100%</span>
            <span>P2 100%</span>
          </div>
          <div
            className="relative h-4 w-full max-w-full rounded-full overflow-hidden border border-ui-border"
            style={{
              background:
                "linear-gradient(90deg, var(--gold-hi) 0%, var(--color-surface) 50%, #4058a0 100%)",
            }}
            role="img"
            aria-label="Vibe gradient from player 1 to player 2; start at centre (0)"
          >
            <div
              className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/90 shadow-[0_0_6px_rgba(255,255,255,0.6)]"
              aria-hidden
            />
          </div>
          <p className="font-garamond text-xs text-muted mt-2.5 m-0 leading-normal">
            Centre mark = 0 at battle start. The fill or needle moves from there toward one player or the other.
          </p>
        </div>

        <div id="initialisation-phase" className="border border-ui-border rounded px-6 py-5 bg-card mb-8 max-w-[560px]">
          <div className="font-mono tracking-[2px] text-muted text-xs uppercase mb-2">Initialisation phase</div>
          <ul className="font-garamond text-muted leading-normal m-0 pl-5 space-y-1.5">
            <li>Both players load one saved track list (exactly 60 cards).</li>
            <li>The game validates the list, then sets the Vibe gauge at 0 (neutral centre).</li>
            <li>Opening hand, first player, and any pre-battle effects are resolved before turn 1 starts.</li>
          </ul>
        </div>

        <div id="turns" className="border border-ui-border rounded px-6 py-5 bg-card mb-8 max-w-[560px]">
          <div className="font-mono tracking-[2px] text-muted text-xs uppercase mb-2">Game turns</div>
          <ul className="font-garamond text-muted leading-normal m-0 pl-5 space-y-1.5">
            <li>Each turn follows a fixed order: draw, play, resolve effects, then end phase.</li>
            <li>Stacks, synergies, and matchup modifiers are applied during effect resolution.</li>
            <li>Vibe shifts after each resolution window based on the turn outcome.</li>
          </ul>
        </div>

        <div id="formats" className="border border-ui-border rounded px-8 py-10 bg-card text-muted font-garamond italic text-lg text-center max-w-[560px]">
          Further battle rules and formats coming soon.
        </div>
      </div>
    </>
  );
}
