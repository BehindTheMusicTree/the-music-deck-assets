import { Fragment } from "react";
import GenreWheel from "@/components/GenreWheel";
import Card, { type CardData, type GenreTheme } from "@/components/Card";

const GLOBE_ICON =
  '<svg width="16" height="16" viewBox="0 0 16 16"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.2"/><ellipse cx="8" cy="8" rx="3" ry="6" fill="none" stroke="currentColor" stroke-width=".8"/><line x1="2" y1="8" x2="14" y2="8" stroke="currentColor" stroke-width=".8"/></svg>';

const GENRE_THEMES: Record<string, GenreTheme> = {
  Rock: {
    border: "#d01828",
    cardBg: "#200608",
    headerBg: "#180404",
    textMain: "#f04858",
    textBody: "#d02838",
    barPop: ["#800810", "#e82030"],
    barExp: ["#600610", "#b81828"],
    barGlowPop: "rgba(232,32,48,.85)",
    barGlowExp: "rgba(184,24,40,.75)",
    icon: '<svg width="16" height="16" viewBox="0 0 16 16"><polygon points="9,1 6,8 9,8 5,15 12,6 8,6" fill="currentColor"/></svg>',
    sym: "🎸",
    bg0: "#0e1a4a",
    bg1: "#040a1e",
    accent: "#4060d8",
  },
  Electronic: {
    border: "#2850c8",
    cardBg: "#0a1020",
    headerBg: "#060c18",
    textMain: "#6888e8",
    textBody: "#4868c8",
    barPop: ["#102060", "#3060e0"],
    barExp: ["#0c1848", "#2048b0"],
    barGlowPop: "rgba(48,96,224,.8)",
    barGlowExp: "rgba(32,72,176,.7)",
    icon: '<svg width="16" height="16" viewBox="0 0 16 16"><path d="M1 8L3 8L5 3L7 13L9 5L11 11L13 8L15 8" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    sym: "💿",
    bg0: "#0e1828",
    bg1: "#040810",
    accent: "#60a0c0",
  },
  "Disco/Funk": {
    border: "#c0387a",
    cardBg: "#200812",
    headerBg: "#18060e",
    textMain: "#e868a0",
    textBody: "#c84880",
    barPop: ["#701840", "#e05088"],
    barExp: ["#501030", "#b03868"],
    barGlowPop: "rgba(224,104,160,.8)",
    barGlowExp: "rgba(176,56,104,.7)",
    icon: '<svg width="16" height="16" viewBox="0 0 16 16"><circle cx="8" cy="8" r="5.5" fill="none" stroke="currentColor" stroke-width="1.2"/><circle cx="8" cy="8" r="2" fill="none" stroke="currentColor" stroke-width="1"/><line x1="8" y1="2.5" x2="8" y2="0" stroke="currentColor" stroke-width="1.2"/></svg>',
    sym: "🕺",
    bg0: "#200e30",
    bg1: "#0a0418",
    accent: "#a060c8",
  },
  "Hip-hop": {
    border: "#c8960a",
    cardBg: "#1c1600",
    headerBg: "#140e00",
    textMain: "#f0b800",
    textBody: "#c89000",
    barPop: ["#7a5400", "#f0b000"],
    barExp: ["#503800", "#c08800"],
    barGlowPop: "rgba(240,176,0,.8)",
    barGlowExp: "rgba(192,136,0,.75)",
    icon: '<svg width="16" height="16" viewBox="0 0 16 16"><path d="M10.5 5.5Q10.5 3.5 8 3.5Q5.5 3.5 5.5 6Q5.5 8 8 8Q10.5 8 10.5 10.5Q10.5 12.5 8 12.5Q5.5 12.5 5.5 10.5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
    sym: "🎤",
    bg0: "#221600",
    bg1: "#0a0800",
    accent: "#f0b800",
  },
  "Reggae/Dub": {
    border: "#3a9030",
    cardBg: "#081a06",
    headerBg: "#061404",
    textMain: "#70d058",
    textBody: "#50b038",
    barPop: ["#185010", "#48c030"],
    barExp: ["#103a08", "#309820"],
    barGlowPop: "rgba(72,192,48,.8)",
    barGlowExp: "rgba(48,152,32,.7)",
    icon: '<svg width="16" height="16" viewBox="0 0 16 16"><ellipse cx="8" cy="9" rx="5" ry="5.5" fill="none" stroke="currentColor" stroke-width="1.2"/><line x1="8" y1="3.5" x2="8" y2="1" stroke="currentColor" stroke-width="1.2"/></svg>',
    sym: "🌿",
    bg0: "#0e2014",
    bg1: "#040c08",
    accent: "#5ab878",
  },
  Classical: {
    border: "#5c2a0a",
    cardBg: "#130800",
    headerBg: "#0d0500",
    textMain: "#b86832",
    textBody: "#8a4a1a",
    barPop: ["#4a1a02", "#a85020"],
    barExp: ["#321202", "#7a3a14"],
    barGlowPop: "rgba(168,80,32,.8)",
    barGlowExp: "rgba(122,58,20,.75)",
    icon: '<svg width="16" height="16" viewBox="0 0 16 16"><text x="2" y="13" font-size="14" font-family="serif" fill="currentColor">𝄞</text></svg>',
    sym: "🎻",
    bg0: "#200a00",
    bg1: "#080200",
    accent: "#a85020",
  },
  Vintage: {
    border: "#787878",
    cardBg: "#121212",
    headerBg: "#0e0e0e",
    textMain: "#b0b0b0",
    textBody: "#888888",
    barPop: ["#404040", "#a0a0a0"],
    barExp: ["#282828", "#686868"],
    barGlowPop: "rgba(176,176,176,.65)",
    barGlowExp: "rgba(104,104,104,.6)",
    icon: '<svg width="16" height="16" viewBox="0 0 16 16"><circle cx="8" cy="8" r="7" fill="currentColor" opacity=".85"/><circle cx="8" cy="8" r="2.2" fill="rgba(0,0,0,0.45)"/></svg>',
    sym: "🎷",
    bg0: "#201610",
    bg1: "#0a0806",
    accent: "#b09878",
  },
};

function worldThemeForCountry(country: string): GenreTheme {
  if (country === "USA")
    return {
      border: "#B22234",
      cardBg: "#08101e",
      headerBg: "#060c18",
      textMain: "#ffffff",
      textBody: "#cccccc",
      barPop: ["#B22234", "#e84455"],
      barExp: ["#3C3B6E", "#6060cc"],
      barGlowPop: "rgba(178,34,52,.85)",
      barGlowExp: "rgba(96,96,204,.75)",
      icon: GLOBE_ICON,
      sym: "★",
      bg0: "#1a2050",
      bg1: "#060a1e",
      accent: "#ffffff",
    };
  if (country === "France")
    return {
      border: "#0055A4",
      cardBg: "#060d1e",
      headerBg: "#04091a",
      textMain: "#ffffff",
      textBody: "#cccccc",
      barPop: ["#0055A4", "#4488ee"],
      barExp: ["#EF4135", "#ff7066"],
      barGlowPop: "rgba(0,85,164,.85)",
      barGlowExp: "rgba(239,65,53,.75)",
      icon: GLOBE_ICON,
      sym: "♦",
      bg0: "#0a1830",
      bg1: "#040810",
      accent: "#ffffff",
    };
  return GENRE_THEMES.Rock;
}

const ART = "/cards/artworks/examples/";

const SAMPLE_CARDS: Record<string, CardData> = {
  Rock: {
    id: 1,
    title: "Bohemian Rhapsody",
    artist: "Queen",
    year: 1975,
    genre: "Rock",
    genreLabel: "Rock — Progressive rock",
    ability: "Anthemic",
    abilityDesc: "Doubles momentum on any track with a guitar solo.",
    power: 95,
    pop: 92,
    exp: 78,
    rarity: "Legendary",
    artwork: `${ART}artwork.example-bohemian-rhapsody-v2.png`,
  },
  Electronic: {
    id: 2,
    title: "One More Time",
    artist: "Daft Punk",
    year: 2000,
    genre: "Electronic",
    genreLabel: "Electronic — French house",
    ability: "Loop Sync",
    abilityDesc: "Repeats its effect once if experimental is above 60.",
    power: 82,
    pop: 88,
    exp: 75,
    rarity: "Epic",
    artwork: `${ART}artwork.example-daft-punk-one-more-time-v1.png`,
  },
  "Disco/Funk": {
    id: 3,
    title: "Night Fever",
    artist: "Bee Gees",
    year: 1977,
    genre: "Disco/Funk",
    genreLabel: "Disco / Funk",
    ability: "Groove",
    abilityDesc: "Boosts all Funk cards on the field by +5 popularity.",
    power: 72,
    pop: 90,
    exp: 50,
    rarity: "Rare",
    artwork: `${ART}artwork.example-night-fever-v1.png`,
  },
  "Hip-hop": {
    id: 4,
    title: "HUMBLE.",
    artist: "Kendrick Lamar",
    year: 2017,
    genre: "Hip-hop",
    genreLabel: "Hip-hop — West Coast",
    ability: "Lyrical",
    abilityDesc:
      "Drains 15 power from the opponent when popularity exceeds 70.",
    power: 88,
    pop: 86,
    exp: 70,
    rarity: "Legendary",
    artwork: `${ART}artwork.example-kendrick-lamar-humble-v1.png`,
  },
  "Reggae/Dub": {
    id: 5,
    title: "Is This Love",
    artist: "Bob Marley",
    year: 1978,
    genre: "Reggae/Dub",
    genreLabel: "Reggae — Roots",
    ability: "Roots",
    abilityDesc: "Heals 20 HP when adjacent to a World genre card.",
    power: 74,
    pop: 82,
    exp: 40,
    rarity: "Epic",
    artwork: `${ART}artwork.example-is-this-love-v1.png`,
  },
  Classical: {
    id: 6,
    title: "Ride of the Valkyries",
    artist: "Wagner",
    year: 1876,
    genre: "Classical",
    genreLabel: "Classical — Late Romantic",
    ability: "Fortissimo",
    abilityDesc: "Deals damage in three separate strikes of 60% power each.",
    power: 90,
    pop: 58,
    exp: 92,
    rarity: "Legendary",
    artwork: `${ART}artwork.example-wagner-ride-of-the-valkyries-v1.png`,
  },
  Vintage: {
    id: 7,
    title: "So What",
    artist: "Miles Davis",
    year: 1959,
    genre: "Vintage",
    genreLabel: "Vintage — Cool jazz",
    ability: "Modal",
    abilityDesc: "Random multiplier between ×1 and ×3 on each use.",
    power: 77,
    pop: 55,
    exp: 88,
    rarity: "Epic",
    artwork: `${ART}artwork.example-miles-davis-so-what-v1.png`,
  },
};

const WORLD_CARDS: CardData[] = [
  {
    id: 20,
    title: "Take Me Home, Country Roads",
    artist: "John Denver",
    year: 1971,
    genre: "World",
    genreLabel: "World — USA",
    typeStripPrimaryBorder: "#a01818",
    ability: "Heartland",
    abilityDesc: "Restores 10 HP to all allied cards when played.",
    power: 70,
    pop: 78,
    exp: 35,
    rarity: "Rare",
    country: "USA",
    artwork: `${ART}artwork.example-take-me-home-country-roads-v1.png`,
  },
  {
    id: 21,
    title: "Amazing Grace",
    artist: "Traditional",
    year: 1779,
    genre: "World",
    genreLabel: "World — USA",
    typeStripPrimaryBorder: "#a01818",
    ability: "Redemption",
    abilityDesc: "Revives one defeated allied card with 30 HP.",
    power: 74,
    pop: 72,
    exp: 28,
    rarity: "Epic",
    country: "USA",
    artwork: `${ART}artwork.example-amazing-grace-v1.png`,
  },
  {
    id: 23,
    title: "La Marseillaise",
    artist: "Rouget de Lisle",
    year: 1792,
    genre: "World",
    genreLabel: "World — France",
    typeStripPrimaryBorder: "#a01818",
    ability: "Liberty",
    abilityDesc: "Grants +15 power to all allied cards on the next turn.",
    power: 88,
    pop: 68,
    exp: 55,
    rarity: "Legendary",
    country: "France",
    artwork: `${ART}artwork.example-rouget-de-lisle-la-marseillaise-v1.png`,
  },
  {
    id: 24,
    title: "Les Lacs du Connemara",
    artist: "Michel Sardou",
    year: 1981,
    genre: "World",
    genreLabel: "World — France",
    typeStripPrimaryBorder: "#a01818",
    ability: "Melancholy",
    abilityDesc: "Draws 2 cards from the deck when played after a Legendary.",
    power: 80,
    pop: 74,
    exp: 48,
    rarity: "Rare",
    country: "France",
    artwork: `${ART}artwork.example-michel-sardou-les-lacs-du-connemara-v1.png`,
  },
];

function genreSampleId(genre: string) {
  return `genre-sample-${genre.replace(/\//g, "-").replace(/\s+/g, "-").toLowerCase()}`;
}

export default function GenresPage() {
  return (
    <div className="px-6 py-10 flex flex-col items-center">
      <div className="font-mono text-[15px] tracking-[3px] text-muted mb-2">02</div>
      <div className="font-mono text-[15px] tracking-[2px] text-muted mb-4">Genre colour system</div>
      <h2 className="font-cinzel text-3xl tracking-[4px] text-white mb-2">
        THE <em className="text-gold not-italic">GENRES</em>
      </h2>
      <p className="font-garamond italic text-muted max-w-[600px] text-center">
        Each genre owns a border colour. World is the exception: the border
        shows that country&apos;s real flag, laid in landscape and wrapped
        around the card — not a generic band rule. For the United States, the
        star field reads toward the lower left of the card; for France, the
        vertical tricolour (blue, white, red) is unfolded on the border with the
        hoist (blue) placed according to the actual flag, not an arbitrary
        three-way split.
      </p>

      <div className="w-full max-w-[860px] mt-6 mb-2.5 px-[18px] py-4 border border-ui-border rounded-[6px] bg-white/[0.02] text-muted">
        <div className="font-mono text-[15px] tracking-[2px] uppercase mb-2">Colour variations</div>
        <p className="font-garamond text-[17px] leading-[1.45] m-0">
          Within each genre, we go from the lightest (pop zone) to the darkest
          (hardcore zone). In Electronic, for example: EDM is the commercial
          variant (medium blue, close to periwinkle), Electropop is the pop
          variant (nearly off-white, icy blue), and Psytrance is the hardcore
          variant (deep night blue). You can also mix hues by influence: Nu
          Metal combines Metal + Rap, so crimson + gold yellow, which yields
          amber orange.
        </p>
      </div>

      <GenreWheel />

      <div className="w-full max-w-[1100px] mb-16">
        <div className="font-mono text-[15px] tracking-[2px] text-muted uppercase mb-5">Genre Variants</div>
        <div className="flex flex-wrap gap-6">
          {Object.entries(SAMPLE_CARDS).map(([genre, card]) => (
            <div id={genreSampleId(genre)} key={genre} className="flex flex-col items-center gap-2">
              <Card card={card} theme={GENRE_THEMES[genre]} />
              <div className="font-mono text-[15px] tracking-[1px] text-muted">
                {genre.toUpperCase()}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full max-w-[1100px]">
        <div className="font-mono text-[15px] tracking-[2px] text-muted uppercase mb-1">World — Special case</div>
        <dl className="m-0 mb-8 max-w-[720px] grid grid-cols-[minmax(150px,auto)_1fr] gap-x-7 gap-y-3 items-start">
          {(
            [
              ["Source", "The country of origin's flag, using its real layout (not a generic band pattern)."],
              ["Orientation", "Landscape, unfolded along the card edge."],
              ["United States", "The star field sits toward the lower left of the card."],
              ["France", "Vertical tricolour (blue, white, red) on the border; the blue hoist side is aligned as on the real flag, not as three abstract left–right blocks."],
              ["Border treatment", "Slightly tarnished: desaturated, darkened, light inset wear — reads as a weathered print on a physical card, not a flat screen flag."],
              ["Subgenre", "A subgenre of the source country's popular music is associated with the card — for example: United States: Country, France: variété française, Portugal: fado."],
            ] as const
          ).map(([label, value]) => (
            <Fragment key={label}>
              <dt className="font-mono text-[15px] tracking-[1px] text-muted uppercase m-0">{label}</dt>
              <dd className="font-garamond italic text-muted m-0 text-[16px] leading-[1.45]">{value}</dd>
            </Fragment>
          ))}
        </dl>
        <div className="flex flex-col gap-4">
          {Object.entries(
            WORLD_CARDS.reduce<Record<string, CardData[]>>((acc, card) => {
              const c = card.country!;
              (acc[c] ??= []).push(card);
              return acc;
            }, {}),
          ).map(([country, cards]) => (
            <details key={country} open className="border-t border-ui-border">
              <summary className="font-mono text-[15px] tracking-[2px] text-muted uppercase py-3.5 cursor-pointer list-none flex items-center gap-2.5">
                <span className="opacity-40">▶</span>
                {country}
              </summary>
              <div className="flex flex-wrap gap-6 pb-8">
                {cards.map((card) => (
                  <Card key={card.id} card={card} theme={worldThemeForCountry(card.country!)} />
                ))}
              </div>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}
