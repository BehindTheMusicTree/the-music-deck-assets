const rarities = [
  {
    name: "Legendary",
    hex: "#c8a040",
    desc: "The rarest cards. Gold accent, prestige halo. Only found in premium boosters or as enigma rewards.",
    examples: ["Iconic artists", "Milestone albums", "Limited editions"],
  },
  {
    name: "Classic",
    hex: "#a070e0",
    desc: "Powerful and distinctive. Purple signals strong competitive value and special mechanics.",
    examples: ["Genre-defining albums", "Cult artists", "Era-defining tracks"],
  },
  {
    name: "Banger",
    hex: "#6090e0",
    desc: "Reliable and collectible. Blue tones indicate meaningful cards worth building around.",
    examples: ["Influential tracks", "Known artists", "Acclaimed albums"],
  },
  {
    name: "Niche",
    hex: "#8888a0",
    desc: "Not mainstream, but meaningful — cult cuts, local scenes, and under-the-radar tracks. Neutral grey, accessible to collect.",
    examples: [
      "Cult and regional scenes",
      "Deep catalogue cuts",
      "Before-they-were-huge picks",
    ],
  },
];

export default function RaritiesPage() {
  return (
    <div className="px-6 py-10 flex flex-col items-center">
      <div className="font-mono tracking-[3px] text-muted mb-2">04</div>
      <div className="font-mono tracking-[2px] text-muted mb-4">
        Card rarity tiers
      </div>
      <h2 className="font-cinzel text-3xl tracking-[4px] text-white mb-2">
        THE <em className="text-gold not-italic">RARITIES</em>
      </h2>
      <p className="font-garamond italic text-muted max-w-[600px] text-center mb-14">
        Four tiers (Niche, Banger, Classic, Legendary), each with a fixed accent
        colour independent of genre. Rarity signals both collector value and
        competitive power.
      </p>

      <div className="w-full max-w-[700px] flex flex-col gap-4">
        {rarities.map(({ name, hex, desc, examples }) => (
          <div
            key={name}
            className="bg-card border border-ui-border rounded-[4px] px-6 pt-6 pb-5"
            style={{ borderLeft: `3px solid ${hex}` }}
          >
            <div className="flex items-center gap-3.5 mb-3">
              <div
                className="w-2.5 h-2.5 rounded-full"
                style={{ background: hex, boxShadow: `0 0 8px ${hex}` }}
              />
              <span
                className="font-cinzel text-base tracking-[3px]"
                style={{ color: hex }}
              >
                {name.toUpperCase()}
              </span>
              <span className="font-mono text-muted ml-1">{hex}</span>
            </div>
            <p className="font-garamond text-base text-white leading-[1.6] mb-3">
              {desc}
            </p>
            <div className="flex gap-2 flex-wrap">
              {examples.map((ex) => (
                <span
                  key={ex}
                  className="font-mono tracking-[1px] text-muted bg-surface border border-ui-border rounded-sm px-2 py-0.5"
                >
                  {ex}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
