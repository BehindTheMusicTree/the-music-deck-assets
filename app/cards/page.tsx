import Card, { type CardData, type GenreTheme } from "@/components/Card";
import CardSubTabs from "@/components/CardSubTabs";

const GENRES: Record<string, GenreTheme> = {
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
  Pop: {
    border: "#c0b8d0",
    cardBg: "#1a1820",
    headerBg: "#141218",
    textMain: "#e8e4f4",
    textBody: "#ccc8dc",
    barPop: ["#706880", "#e0d0f0"],
    barExp: ["#504860", "#a890b8"],
    barGlowPop: "rgba(224,208,240,.8)",
    barGlowExp: "rgba(168,144,184,.7)",
    icon: '<svg width="16" height="16" viewBox="0 0 16 16"><polygon points="8,1 10,6 15,6 11,9.5 12.5,14.5 8,11.5 3.5,14.5 5,9.5 1,6 6,6" fill="currentColor"/></svg>',
    sym: "✨",
    bg0: "#201624",
    bg1: "#0c0814",
    accent: "#c0a0c8",
  },
  Electro: {
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
  Reggae: {
    border: "#3a9030",
    cardBg: "#081a06",
    headerBg: "#061404",
    textMain: "#70d058",
    textBody: "#50b038",
    barPop: ["#185010", "#48c030"],
    barExp: ["#103a08", "#309820"],
    barGlowPop: "rgba(72,192,48,.8)",
    barGlowExp: "rgba(48,152,32,.7)",
    icon: '<svg width="16" height="16" viewBox="0 0 16 16"><ellipse cx="8" cy="9" rx="5" ry="5.5" fill="none" stroke="currentColor" stroke-width="1.2"/><line x1="8" y1="3.5" x2="8" y2="1" stroke="currentColor" stroke-width="1.2"/><path d="M5 7 Q6.5 5 8 7 Q9.5 5 11 7" fill="none" stroke="currentColor" stroke-width="1"/></svg>',
    sym: "🌿",
    bg0: "#0e2014",
    bg1: "#040c08",
    accent: "#5ab878",
  },
  HipHop: {
    border: "#c8960a",
    cardBg: "#1c1600",
    headerBg: "#140e00",
    textMain: "#f0b800",
    textBody: "#c89000",
    barPop: ["#7a5400", "#f0b000"],
    barExp: ["#503800", "#c08800"],
    barGlowPop: "rgba(240,176,0,.8)",
    barGlowExp: "rgba(192,136,0,.75)",
    icon: '<svg width="16" height="16" viewBox="0 0 16 16"><path d="M10.5 5.5Q10.5 3.5 8 3.5Q5.5 3.5 5.5 6Q5.5 8 8 8Q10.5 8 10.5 10.5Q10.5 12.5 8 12.5Q5.5 12.5 5.5 10.5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><line x1="8" y1="2" x2="8" y2="3.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><line x1="8" y1="12.5" x2="8" y2="14" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
    sym: "🎤",
    bg0: "#221600",
    bg1: "#0a0800",
    accent: "#f0b800",
  },
  Funk: {
    border: "#c0387a",
    cardBg: "#200812",
    headerBg: "#18060e",
    textMain: "#e868a0",
    textBody: "#c84880",
    barPop: ["#701840", "#e05088"],
    barExp: ["#501030", "#b03868"],
    barGlowPop: "rgba(224,104,160,.8)",
    barGlowExp: "rgba(176,56,104,.7)",
    icon: '<svg width="16" height="16" viewBox="0 0 16 16"><circle cx="8" cy="8" r="5.5" fill="none" stroke="currentColor" stroke-width="1.2"/><circle cx="8" cy="8" r="2" fill="none" stroke="currentColor" stroke-width="1"/><line x1="8" y1="2.5" x2="8" y2="0" stroke="currentColor" stroke-width="1.2"/><rect x="3" y="4" width="3" height="2" rx=".5" fill="currentColor" opacity=".5"/><rect x="10" y="4" width="3" height="2" rx=".5" fill="currentColor" opacity=".5"/></svg>',
    sym: "🕺",
    bg0: "#200e30",
    bg1: "#0a0418",
    accent: "#a060c8",
  },
  Classic: {
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
    icon: '<svg width="16" height="16" viewBox="0 0 16 16"><circle cx="8" cy="8" r="7" fill="currentColor" opacity=".85"/><circle cx="8" cy="8" r="5" fill="none" stroke="rgba(0,0,0,0.2)" stroke-width="0.6"/><circle cx="8" cy="8" r="2.2" fill="rgba(0,0,0,0.45)"/><circle cx="8" cy="8" r="0.8" fill="rgba(255,255,255,0.55)"/></svg>',
    sym: "🎷",
    bg0: "#201610",
    bg1: "#0a0806",
    accent: "#b09878",
  },
  World: {
    border: "#a01818",
    cardBg: "#1e0808",
    headerBg: "#180404",
    textMain: "#d85858",
    textBody: "#b83838",
    barPop: ["#780808", "#e03030"],
    barExp: ["#580808", "#b02020"],
    barGlowPop: "rgba(224,48,48,.75)",
    barGlowExp: "rgba(176,32,32,.7)",
    icon: '<svg width="16" height="16" viewBox="0 0 16 16"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.2"/><ellipse cx="8" cy="8" rx="3" ry="6" fill="none" stroke="currentColor" stroke-width=".8"/><line x1="2" y1="8" x2="14" y2="8" stroke="currentColor" stroke-width=".8"/></svg>',
    sym: "🌍",
    bg0: "#2a1208",
    bg1: "#0c0400",
    accent: "#c05040",
  },
  Metal: {
    border: "#7a0810",
    cardBg: "#180404",
    headerBg: "#100202",
    textMain: "#b03030",
    textBody: "#882020",
    barPop: ["#480408", "#980c18"],
    barExp: ["#300204", "#700810"],
    barGlowPop: "rgba(152,12,24,.8)",
    barGlowExp: "rgba(112,8,16,.7)",
    icon: '<svg width="16" height="16" viewBox="0 0 16 16"><polygon points="9,1 6,8 9,8 5,15 12,6 8,6" fill="currentColor"/></svg>',
    sym: "🤘",
    bg0: "#180404",
    bg1: "#060100",
    accent: "#901020",
  },
};

const WORLD_GLOBE_ICON =
  '<svg width="16" height="16" viewBox="0 0 16 16"><circle cx="8" cy="8" r="6" fill="none" stroke="currentColor" stroke-width="1.2"/><ellipse cx="8" cy="8" rx="3" ry="6" fill="none" stroke="currentColor" stroke-width=".8"/><line x1="2" y1="8" x2="14" y2="8" stroke="currentColor" stroke-width=".8"/></svg>';

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
      icon: WORLD_GLOBE_ICON,
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
      icon: WORLD_GLOBE_ICON,
      sym: "♦",
      bg0: "#0a1830",
      bg1: "#040810",
      accent: "#ffffff",
    };
  return GENRES.World;
}

const ART = "/cards/artworks/examples/";

const WORLD_CARDS: CardData[] = [
  {
    id: 20,
    title: "Take Me Home, Country Roads",
    artist: "John Denver",
    year: 1971,
    genre: "World",
    subgenre: "USA",
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
    subgenre: "USA",
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
    subgenre: "France",
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
    subgenre: "France",
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

const MOCK_CARDS: Record<string, CardData> = {
  Rock: {
    id: 1,
    title: "Bohemian Rhapsody",
    artist: "Queen",
    year: 1975,
    genre: "Rock",
    subgenre: "Progressive rock",
    ability: "Anthemic",
    abilityDesc: "Doubles momentum on any track with a guitar solo.",
    power: 95,
    pop: 92,
    exp: 78,
    rarity: "Legendary",
    artwork: `${ART}artwork.example-bohemian-rhapsody-v2.png`,
  },
  Pop: {
    id: 2,
    title: "Billie Jean",
    artist: "Michael Jackson",
    year: 1982,
    genre: "Pop",
    subgenre: "Dance-Pop",
    ability: "Crossover",
    abilityDesc: "Gains +10 popularity when played after a dance track.",
    power: 91,
    pop: 97,
    exp: 44,
    rarity: "Legendary",
    artwork: `${ART}artwork.example-billy-jean-v2.png`,
  },
  Electro: {
    id: 3,
    title: "One More Time",
    artist: "Daft Punk",
    year: 2000,
    genre: "Electro",
    subgenre: "French house",
    ability: "Loop Sync",
    abilityDesc: "Repeats its effect once if experimental is above 60.",
    power: 82,
    pop: 88,
    exp: 75,
    rarity: "Epic",
    artwork: `${ART}artwork.example-daft-punk-one-more-time-v1.png`,
  },
  Reggae: {
    id: 4,
    title: "Is This Love",
    artist: "Bob Marley",
    year: 1978,
    genre: "Reggae",
    subgenre: "Roots",
    ability: "Roots",
    abilityDesc: "Heals 20 HP when adjacent to a World genre card.",
    power: 74,
    pop: 82,
    exp: 40,
    rarity: "Epic",
    artwork: `${ART}artwork.example-is-this-love-v1.png`,
  },
  HipHop: {
    id: 5,
    title: "HUMBLE.",
    artist: "Kendrick Lamar",
    year: 2017,
    genre: "HipHop",
    subgenre: "West Coast",
    ability: "Lyrical",
    abilityDesc:
      "Drains 15 power from the opponent when popularity exceeds 70.",
    power: 88,
    pop: 86,
    exp: 70,
    rarity: "Legendary",
    artwork: `${ART}artwork.example-kendrick-lamar-humble-v1.png`,
  },
  Funk: {
    id: 6,
    title: "Night Fever",
    artist: "Bee Gees",
    year: 1977,
    genre: "Funk",
    subgenre: "Disco",
    ability: "Groove",
    abilityDesc: "Boosts all Funk cards on the field by +5 popularity.",
    power: 72,
    pop: 90,
    exp: 50,
    rarity: "Rare",
    artwork: `${ART}artwork.example-night-fever-v1.png`,
  },
  Classic: {
    id: 7,
    title: "Ride of the Valkyries",
    artist: "Wagner",
    year: 1876,
    genre: "Classic",
    subgenre: "Late Romantic",
    ability: "Fortissimo",
    abilityDesc: "Deals damage in three separate strikes of 60% power each.",
    power: 90,
    pop: 58,
    exp: 92,
    rarity: "Legendary",
    artwork: `${ART}artwork.example-wagner-ride-of-the-valkyries-v1.png`,
  },
  Vintage: {
    id: 8,
    title: "So What",
    artist: "Miles Davis",
    year: 1959,
    genre: "Vintage",
    subgenre: "Cool jazz",
    ability: "Modal",
    abilityDesc: "Random multiplier between ×1 and ×3 on each use.",
    power: 77,
    pop: 55,
    exp: 88,
    rarity: "Epic",
    artwork: `${ART}artwork.example-miles-davis-so-what-v1.png`,
  },
  World: {
    id: 10,
    title: "Maria Maria",
    artist: "Santana",
    year: 1999,
    genre: "World",
    subgenre: "Latin",
    ability: "Duende",
    abilityDesc: "Draws one card from the World pile when played.",
    power: 68,
    pop: 80,
    exp: 62,
    rarity: "Common",
    artwork: `${ART}artwork.example-carlos-santana-maria-maria-v1.png`,
  },
  Metal: {
    id: 11,
    title: "Enter Sandman",
    artist: "Metallica",
    year: 1991,
    genre: "Metal",
    subgenre: "Thrash",
    ability: "Thrash",
    abilityDesc: "Stuns the opponent for one turn after a critical hit.",
    power: 90,
    pop: 68,
    exp: 76,
    rarity: "Legendary",
    artwork: `${ART}artwork.example-metallica-enter-sandman-v1.png`,
  },
};

export default function CardsPage() {
  const genreEntries = Object.entries(MOCK_CARDS);

  return (
    <>
      <CardSubTabs />
      <div className="px-6 py-10 flex flex-col items-center min-h-screen">
        <div className="font-mono tracking-[3px] text-muted mb-2">05</div>
        <div className="font-mono tracking-[2px] text-muted mb-4">
          Card frame anatomy
        </div>
        <h2 className="font-cinzel text-3xl tracking-[4px] text-white mb-2">
          THE <em className="text-gold not-italic">CARDS</em>
        </h2>
        <p className="font-garamond italic text-muted max-w-[600px] text-center mb-14">
          Each card adapts its colour theme to its genre. The frame anatomy —
          header, artwork, type strip, ability box, stats, and footer — remains
          constant across all genres and rarities.
        </p>

        {/* Anatomy legend */}
        <div id="anatomy" className="w-full max-w-[1100px] mb-14">
          <div className="font-mono tracking-[2px] text-muted uppercase mb-5">
            Frame Anatomy
          </div>
          <div className="flex gap-12 items-start flex-wrap">
            <div
              style={{
                transform: "scale(1.5)",
                transformOrigin: "top left",
                flexShrink: 0,
                width: 408,
                height: 600,
              }}
            >
              <Card card={MOCK_CARDS.Pop} theme={GENRES.Pop} />
            </div>
            <div className="flex flex-col gap-3 pt-2 flex-1">
              {[
                [
                  "Header",
                  "Genre icon · title · artist · power score (glow scales with power)",
                ],
                [
                  "Artwork",
                  "Procedural SVG — radial gradient, scatter dots, bar visualisation, genre symbol",
                ],
                [
                  "Type strip",
                  "Parchment (#ede4cc) with diamond-cut corners; colour diamond then main genre (left), subgenre then colour diamond (right)",
                ],
                [
                  "Ability box",
                  "Parchment (#f4edd8) — ability name and flavour description",
                ],
                [
                  "Stats",
                  "Popularity and Experimental bars — gradient fill with coloured glow per genre",
                ],
                ["Footer", "Year · rarity (SVG shape + name)"],
              ].map(([name, desc]) => (
                <div key={name} className="flex gap-3">
                  <div className="w-[90px] shrink-0 font-cinzel tracking-[1px] text-gold pt-px">
                    {name}
                  </div>
                  <div className="font-garamond text-muted leading-[1.5]">
                    {desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* All genre variants */}
        <div id="genre-variants" className="w-full max-w-[1100px] mb-14">
          <div className="font-mono tracking-[2px] text-muted uppercase mb-5">
            Genre Variants
          </div>
          <div className="flex flex-wrap gap-6">
            {genreEntries.map(([genre, card]) => (
              <div key={genre} className="flex flex-col items-center gap-2">
                <Card card={card} theme={GENRES[genre]} />
                <div className="font-mono tracking-[1px] text-muted">
                  {genre.toUpperCase()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* World — by country */}
        <div id="world" className="w-full max-w-[1100px] mb-14">
          <div className="font-mono tracking-[2px] text-muted uppercase mb-2">
            World — Flags (landscape on border)
          </div>
          <p className="font-garamond italic text-muted leading-[1.5] max-w-[640px] mt-0 mb-5">
            Each World card is tied to a subgenre of that country&apos;s popular
            music. The flag is laid in landscape and wrapped around the border,
            rendered with a tarnished finish so it reads as a worn print rather
            than a digital swatch.
          </p>
          <div className="flex flex-wrap gap-6">
            {WORLD_CARDS.map((card) => (
              <div key={card.id} className="flex flex-col items-center gap-2">
                <Card card={card} theme={worldThemeForCountry(card.country!)} />
                <div className="font-mono tracking-[1px] text-muted">
                  {card.country!.toUpperCase()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Rarity variants */}
        <div id="rarities" className="w-full max-w-[1100px] mb-14">
          <div className="font-mono tracking-[2px] text-muted uppercase mb-5">
            Rarity Variants — Small Size
          </div>
          <div className="flex flex-wrap gap-4 items-end">
            {(["Legendary", "Epic", "Rare", "Common"] as const).map(
              (rarity) => (
                <div key={rarity} className="flex flex-col items-center gap-2">
                  <Card
                    card={{ ...MOCK_CARDS.Rock, rarity }}
                    theme={GENRES.Rock}
                    small
                  />
                  <div className="font-mono tracking-[1px] text-muted">
                    {rarity.toUpperCase()}
                  </div>
                </div>
              ),
            )}
          </div>
        </div>

        {/* Design tokens table */}
        <div id="colour-tokens" className="w-full max-w-[1100px]">
          <div className="font-mono tracking-[2px] text-muted uppercase mb-5">
            Genre Colour Tokens
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse font-mono">
              <thead>
                <tr>
                  {[
                    "Genre",
                    "Border",
                    "Card Bg",
                    "Header Bg",
                    "Text Main",
                    "Bar Pop",
                    "Bar Exp",
                  ].map((h) => (
                    <th
                      key={h}
                      className="text-left px-3 py-2 border-b border-ui-border text-muted tracking-[1px] font-normal"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Object.entries(GENRES).map(([genre, t]) => (
                  <tr
                    key={genre}
                    style={{ borderBottom: "1px solid rgba(30,28,44,.5)" }}
                  >
                    <td
                      className="px-3 py-2 tracking-[1px]"
                      style={{ color: t.textMain }}
                    >
                      {genre}
                    </td>
                    {[t.border, t.cardBg, t.headerBg, t.textMain].map((hex) => (
                      <td key={hex} className="px-3 py-2">
                        <span className="inline-flex items-center gap-1.5">
                          <span
                            className="w-2.5 h-2.5 rounded-sm shrink-0"
                            style={{ background: hex }}
                          />
                          <span className="text-muted">{hex}</span>
                        </span>
                      </td>
                    ))}
                    <td className="px-3 py-2">
                      <span className="inline-flex gap-1">
                        {t.barPop.map((h) => (
                          <span
                            key={h}
                            className="w-2.5 h-2.5 rounded-sm"
                            style={{ background: h }}
                          />
                        ))}
                      </span>
                    </td>
                    <td className="px-3 py-2">
                      <span className="inline-flex gap-1">
                        {t.barExp.map((h) => (
                          <span
                            key={h}
                            className="w-2.5 h-2.5 rounded-sm"
                            style={{ background: h }}
                          />
                        ))}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
