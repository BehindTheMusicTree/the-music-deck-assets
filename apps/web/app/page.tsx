import Link from "next/link";
import type { Metadata } from "next";
export const metadata: Metadata = { title: "Overview" };

const sections = [
  {
    href: "/cards",
    index: "01",
    label: "Cards",
    desc: "Card frame anatomy and all genre variants",
  },
  {
    href: "/genres",
    index: "02",
    label: "Genres",
    desc: "Genre colour system and the wheel",
  },
  {
    href: "/rarities",
    index: "03",
    label: "Rarities",
    desc: "Legendary, Classic, Banger, Niche",
  },
  {
    href: "/collection",
    index: "04",
    label: "Collection",
    desc: "Cards you own, segmented by genre",
  },
  {
    href: "/catalog",
    index: "05",
    label: "Catalog",
    desc: "All available cards across genres and rarities",
  },
  {
    href: "/tracklists",
    index: "06",
    label: "Song Lists",
    desc: "Deck building — 60 cards per track list",
  },
  {
    href: "/battles",
    index: "07",
    label: "Battles",
    desc: "Battle rules, formats, and scoring concepts",
  },
  {
    href: "/charter",
    index: "08",
    label: "Charter",
    desc: "Colour palette, typography, and design tokens",
  },
];

export default function IndexPage() {
  return (
    <div className="min-h-[calc(100vh-56px)] bg-bg flex flex-col items-center justify-center px-6 py-12 sm:py-[60px]">
      <div className="page-kicker mb-4">Game Reference</div>
      <h1 className="font-cinzel text-4xl font-bold tracking-[6px] text-white mb-2 text-center">
        THE <em className="text-gold not-italic">MUSIC DECK</em>
      </h1>
      <p className="font-garamond italic text-muted mb-14 text-center max-w-[480px]">
        Battle rules, genre mechanics, deck building, and visual design system.
      </p>

      <div className="w-full max-w-[900px] space-y-8">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-4">
          {sections.map(({ href, index, label, desc }) => (
            <Link key={href} href={href} className="no-underline">
              <div className="bg-card border border-ui-border rounded px-6 py-7">
                <div className="page-index mb-2.5">{index}</div>
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
    </div>
  );
}
