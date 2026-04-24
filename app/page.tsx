import Link from "next/link";

const sections = [
  { href: "/palette",    index: "01", label: "Colour Palette", desc: "Base design tokens and UI colours" },
  { href: "/genres",     index: "02", label: "Genres",         desc: "Genre colour system and the wheel" },
  { href: "/typography", index: "03", label: "Typography",     desc: "Cinzel, Cormorant Garamond, Space Mono" },
  { href: "/rarities",   index: "04", label: "Rarities",       desc: "Legendary, Epic, Rare, Common" },
  { href: "/cards",      index: "05", label: "Cards",          desc: "Card frame anatomy and all genre variants" },
];

export default function IndexPage() {
  return (
    <div className="min-h-[calc(100vh-56px)] bg-bg flex flex-col items-center justify-center px-6 py-12 sm:py-[60px]">
      <div className="font-mono text-[15px] tracking-[3px] text-muted mb-4 uppercase">
        Design charter
      </div>
      <h1 className="font-cinzel text-4xl font-bold tracking-[6px] text-white mb-2 text-center">
        THE <em className="text-gold not-italic">MUSIC DECK</em>
      </h1>
      <p className="font-garamond italic text-muted mb-14 text-center max-w-[480px]">
        Visual identity reference for UI, card frames, and genre theming.
      </p>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4 w-full max-w-[840px]">
        {sections.map(({ href, index, label, desc }) => (
          <Link key={href} href={href} className="no-underline">
            <div className="bg-card border border-ui-border rounded px-6 py-7">
              <div className="font-mono text-[15px] tracking-[3px] text-muted mb-2.5">{index}</div>
              <div className="font-cinzel text-sm tracking-[2px] text-gold mb-2 uppercase">{label}</div>
              <div className="font-garamond text-sm text-muted leading-[1.5]">{desc}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
