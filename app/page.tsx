import Link from "next/link";

const sections = [
  {
    href: "/battles",
    index: "01",
    label: "Battles",
    desc: "Battle rules, formats, and scoring concepts",
    group: "game",
  },
  {
    href: "/tracklists",
    index: "02",
    label: "Track Lists",
    desc: "Deck building — prepare your tracklist for a battle",
    group: "game",
  },
  {
    href: "/genres",
    index: "03",
    label: "Genres",
    desc: "Genre colour system and the wheel",
    group: "game",
  },
  {
    href: "/cards",
    index: "04",
    label: "Cards",
    desc: "Card frame anatomy and all genre variants",
    group: "charter",
  },
  {
    href: "/palette",
    index: "05",
    label: "Colour Palette",
    desc: "Base design tokens and UI colours",
    group: "charter",
  },
  {
    href: "/typography",
    index: "06",
    label: "Typography",
    desc: "Cinzel, Cormorant Garamond, Space Mono",
    group: "charter",
  },
  {
    href: "/rarities",
    index: "07",
    label: "Rarities",
    desc: "Legendary, Epic, Rare, Common",
    group: "charter",
  },
];

export default function IndexPage() {
  return (
    <div className="min-h-[calc(100vh-56px)] bg-bg flex flex-col items-center justify-center px-6 py-12 sm:py-[60px]">
      <div className="font-mono tracking-[3px] text-muted mb-4 uppercase">
        Game Reference
      </div>
      <h1 className="font-cinzel text-4xl font-bold tracking-[6px] text-white mb-2 text-center">
        THE <em className="text-gold not-italic">MUSIC DECK</em>
      </h1>
      <p className="font-garamond italic text-muted mb-14 text-center max-w-[480px]">
        Battle rules, genre mechanics, deck building, and visual design system.
      </p>

      <div className="w-full max-w-[900px] space-y-8">
        {(["game", "charter"] as const).map((group) => (
          <div key={group}>
            <div className="font-mono text-[11px] tracking-[3px] text-muted uppercase mb-3">
              {group === "game" ? "Game" : "Design Charter"}
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4">
              {sections.filter((s) => s.group === group).map(({ href, index, label, desc }) => (
                <Link key={href} href={href} className="no-underline">
                  <div className="bg-card border border-ui-border rounded px-6 py-7">
                    <div className="font-mono tracking-[3px] text-muted mb-2.5">
                      {index}
                    </div>
                    <div className="font-cinzel text-sm tracking-[2px] text-gold mb-2 uppercase">
                      {label}
                    </div>
                    <div className="font-garamond text-sm text-muted leading-[1.5]">
                      {desc}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
