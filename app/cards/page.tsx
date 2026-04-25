import Card, { type CardData } from "@/components/Card";
import CardSubTabs from "@/components/CardSubTabs";
import {
  type AppGenreName,
  APP_GENRE_THEMES,
  themeForCountry as worldThemeForCountry,
} from "@/lib/genres";

const ART = "/cards/artworks/examples/";

const WORLD_FLAG_CARDS: CardData[] = [
  {
    id: 20,
    title: "Take Me Home, Country Roads",
    artist: "John Denver",
    year: 1971,
    genre: "USA",
    subgenre: "Country",
    typeStripPrimaryBorder: "#B22234",
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
    id: 24,
    title: "Les Lacs du Connemara",
    artist: "Michel Sardou",
    year: 1981,
    genre: "France",
    subgenre: "French Variety",
    typeStripPrimaryBorder: "#0055A4",
    ability: "Melancholy",
    abilityDesc: "Draws 2 cards from the deck when played after a Legendary.",
    power: 80,
    pop: 74,
    exp: 48,
    rarity: "Rare",
    country: "France",
    artwork: `${ART}artwork.example-michel-sardou-les-lacs-du-connemara-v1.png`,
  },
  {
    id: 26,
    title: "Tri Martolod",
    artist: "Traditional",
    year: 1972,
    genre: "Bretagne",
    subgenre: "Folk Breton",
    typeStripPrimaryBorder: "#222222",
    ability: "Rising Tide",
    abilityDesc: "Gain +10 power for each allied World card in play.",
    power: 72,
    pop: 58,
    exp: 66,
    rarity: "Rare",
    country: "Bretagne",
    artwork: `${ART}artwork.example-tri-martolod-v1.png`,
  },
];

const WORLD_MIXED_CARDS: CardData[] = [
  {
    id: 27,
    title: "Bande Organisée",
    artist: "13 Organisé",
    year: 2020,
    genre: "France",
    subgenre: "Rap",
    typeStripPrimaryBorder: "#0055A4",
    ability: "Street Anthem",
    abilityDesc:
      "Allied Hip-Hop cards gain +12 popularity on the turn this card is played.",
    power: 84,
    pop: 90,
    exp: 61,
    rarity: "Epic",
    country: "France",
    artwork: `${ART}artwork.example-13-organises-bande-organisee-v1.png`,
    flagStyle: "fade",
  },
  {
    id: 21,
    title: "Amazing Grace",
    artist: "Traditional",
    year: 1779,
    genre: "USA",
    subgenre: "Religious",
    typeStripPrimaryBorder: "#B22234",
    ability: "Redemption",
    abilityDesc: "Revives one defeated allied card with 30 HP.",
    power: 74,
    pop: 72,
    exp: 28,
    rarity: "Epic",
    country: "USA",
    artwork: `${ART}artwork.example-amazing-grace-v1.png`,
    flagStyle: "fade",
  },
  {
    id: 23,
    title: "La Marseillaise",
    artist: "Rouget de Lisle",
    year: 1792,
    genre: "France",
    subgenre: "Anthem",
    typeStripPrimaryBorder: "#0055A4",
    ability: "Liberty",
    abilityDesc: "Grants +15 power to all allied cards on the next turn.",
    power: 88,
    pop: 68,
    exp: 55,
    rarity: "Legendary",
    country: "France",
    artwork: `${ART}artwork.example-rouget-de-lisle-la-marseillaise-v1.png`,
    flagStyle: "fade",
  },
  {
    id: 25,
    title: "Cannabis",
    artist: "Ska-P",
    year: 1998,
    genre: "Spain",
    subgenre: "Ska Punk",
    typeStripPrimaryBorder: "#AA151B",
    ability: "Contraband",
    abilityDesc:
      "Opponent discards one card at random when this card enters play.",
    power: 76,
    pop: 62,
    exp: 84,
    rarity: "Rare",
    country: "Spain",
    artwork: `${ART}artwork.example-ska-p-cannabis-v1.png`,
    flagStyle: "fade",
  },
];

const MOCK_CARDS: Record<AppGenreName, CardData> = {
  Rock: {
    id: 1,
    title: "Bohemian Rhapsody",
    artist: "Queen",
    year: 1975,
    genre: "Rock",
    subgenre: "Pop Rock",
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
    subgenre: "Disco Pop",
    ability: "Crossover",
    abilityDesc: "Gains +10 popularity when played after a dance track.",
    power: 91,
    pop: 97,
    exp: 44,
    rarity: "Legendary",
    artwork: `${ART}artwork.example-billy-jean-v2.png`,
  },
  Electronic: {
    id: 3,
    title: "One More Time",
    artist: "Daft Punk",
    year: 2000,
    genre: "Electronic",
    subgenre: "House",
    ability: "Loop Sync",
    abilityDesc: "Repeats its effect once if experimental is above 60.",
    power: 82,
    pop: 88,
    exp: 75,
    rarity: "Epic",
    artwork: `${ART}artwork.example-daft-punk-one-more-time-v1.png`,
  },
  Roots: {
    id: 4,
    title: "Is This Love",
    artist: "Bob Marley",
    year: 1978,
    genre: "Roots",
    subgenre: "Roots",
    ability: "Roots",
    abilityDesc: "Heals 20 HP when adjacent to a World genre card.",
    power: 74,
    pop: 82,
    exp: 40,
    rarity: "Epic",
    artwork: `${ART}artwork.example-is-this-love-v1.png`,
  },
  "Hip-Hop": {
    id: 5,
    title: "HUMBLE.",
    artist: "Kendrick Lamar",
    year: 2017,
    genre: "Hip-Hop",
    subgenre: "R&B Soul",
    ability: "Lyrical",
    abilityDesc:
      "Drains 15 power from the opponent when popularity exceeds 70.",
    power: 88,
    pop: 86,
    exp: 70,
    rarity: "Legendary",
    artwork: `${ART}artwork.example-kendrick-lamar-humble-v1.png`,
  },
  "Disco/Funk": {
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
  Classical: {
    id: 7,
    title: "Ride of the Valkyries",
    artist: "Wagner",
    year: 1876,
    genre: "Classical",
    subgenre: "Soul",
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
    subgenre: "Jazz",
    ability: "Modal",
    abilityDesc: "Random multiplier between ×1 and ×3 on each use.",
    power: 77,
    pop: 55,
    exp: 88,
    rarity: "Epic",
    artwork: `${ART}artwork.example-miles-davis-so-what-v1.png`,
  },
};

export default function CardsPage() {
  const genreEntries = Object.entries(MOCK_CARDS) as [AppGenreName, CardData][];

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
              <Card card={MOCK_CARDS.Pop} theme={APP_GENRE_THEMES.Pop} />
            </div>
            <div className="flex flex-col gap-3 pt-2 flex-1">
              {[
                [
                  "Header",
                  "Genre icon · title · artist (optional) · power score (glow scales with power). If artist is missing, title is vertically centered.",
                ],
                [
                  "Artwork",
                  "Real asset image (always required); no procedural fallback.",
                ],
                [
                  "Type strip",
                  "Parchment (#ede4cc); left side = genre diamond + genre name, right side = subgenre name + subgenre diamond. Both diamonds and the entire card chrome use the subgenre theme when one exists (see below). Very light diamonds get a subtle dark border for readability.",
                ],
                [
                  "Ability box",
                  "Parchment (#f4edd8) — ability name and flavour description",
                ],
                [
                  "Stats",
                  "Popularity and Experimental bars — gradient fill and glow derived from the active theme (subgenre if known, genre otherwise)",
                ],
                ["Footer", "Year · rarity (SVG shape + name)"],
                [
                  "Border",
                  "10px solid; colour = subgenre canonical colour if the subgenre has one, otherwise genre border colour. World cards use the country flag in landscape; mixed World/Genre cards fade from flag (left) to genre colour (right).",
                ],
              ].map(([name, desc]) => (
                <div key={name} className="flex gap-3">
                  <div className="w-[120px] shrink-0 font-cinzel tracking-[1px] text-gold pt-px">
                    {name}
                  </div>
                  <div className="font-garamond text-muted leading-[1.5]">
                    {desc}
                  </div>
                </div>
              ))}
              <div className="flex gap-3">
                <div className="w-[120px] shrink-0 font-cinzel tracking-[1px] text-gold pt-px">
                  Theme resolution
                </div>
                <div className="font-garamond text-muted leading-[1.5]">
                  If the card&apos;s subgenre matches a canonical entry in
                  SUBGENRES (with a colour), a full theme is derived from that
                  colour: header background, text, stat bars, glow, and border
                  all follow the subgenre colour. The genre icon is inherited
                  from the parent genre. Left diamond always shows the genre
                  colour. Very light diamonds in the strip and in the Genre
                  Themes table automatically receive a subtle dark border for
                  contrast.{" "}
                  <a
                    href="/genres#genre-themes"
                    className="text-gold underline underline-offset-2 hover:text-white transition-colors"
                  >
                    Genre Themes →
                  </a>
                </div>
              </div>
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
                <Card card={card} theme={APP_GENRE_THEMES[genre]} />
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
          <p className="font-garamond italic text-muted leading-[1.5] max-w-[640px] mt-0 mb-3">
            World cards represent a country or region rather than a global
            genre. The flag is laid in landscape and wrapped around the border,
            rendered with a tarnished finish so it reads as a worn print rather
            than a digital swatch.
          </p>
          <ul className="font-garamond text-muted leading-[1.6] max-w-[640px] mb-8 pl-0 list-none flex flex-col gap-1">
            <li>
              <span className="text-white">Genre</span> — country or region name{" "}
              <span className="font-mono text-xs tracking-wide">
                (e.g. USA, Bretagne)
              </span>
            </li>
            <li>
              <span className="text-white">Subgenre</span> — local music style{" "}
              <span className="font-mono text-xs tracking-wide">
                (e.g. Country, Polyphonie, Schlager)
              </span>
            </li>
            <li>
              <span className="text-white">Left diamond</span> — symbol or
              colour representing the country or region flag{" "}
              <span className="font-mono text-xs tracking-wide">
                (typeStripPrimaryBorder)
              </span>
            </li>
            <li>
              <span className="text-white">Right diamond</span> — repeats the
              left symbol, indicating the subgenre is native to the region
            </li>
          </ul>

          <div className="flex flex-wrap gap-6 mb-12">
            {WORLD_FLAG_CARDS.map((card) => (
              <div key={card.id} className="flex flex-col items-center gap-2">
                <Card card={card} theme={worldThemeForCountry(card.country!)} />
                <div className="font-mono tracking-[1px] text-muted">
                  {card.country!.toUpperCase()}
                </div>
              </div>
            ))}
          </div>

          <div className="font-mono tracking-[2px] text-muted uppercase mb-3">
            Mixed World / Genre border
          </div>
          <p className="font-garamond italic text-muted leading-[1.5] max-w-[640px] mt-0 mb-3">
            When a card belongs to a specific country <em>and</em> a global
            genre (e.g. Ska Punk from Spain), the border transitions from the
            country flag on the left to the genre colour on the right. The flag
            is laid in landscape (rotated 90°); the genre colour bleeds in over
            a short central fade zone.
          </p>
          <ul className="font-garamond text-muted leading-[1.6] max-w-[640px] mb-5 pl-0 list-none flex flex-col gap-1">
            <li>
              <span className="text-white">Genre</span> — country or region name{" "}
              <span className="font-mono text-xs tracking-wide">
                (e.g. Spain)
              </span>
            </li>
            <li>
              <span className="text-white">Subgenre</span> — global music genre{" "}
              <span className="font-mono text-xs tracking-wide">
                (e.g. Ska Punk)
              </span>
            </li>
            <li>
              <span className="text-white">Left diamond</span> — colour
              represents the country flag{" "}
              <span className="font-mono text-xs tracking-wide">
                (typeStripPrimaryBorder)
              </span>
            </li>
            <li>
              <span className="text-white">Right diamond</span> — colour
              represents the genre{" "}
              <span className="font-mono text-xs tracking-wide">
                (typeStripSubBorder)
              </span>
            </li>
            <li>
              <span className="text-white">Border left</span> — country flag in
              landscape, tarnished finish
            </li>
            <li>
              <span className="text-white">Border right</span> — genre colour
              fades in over the flag
            </li>
            <li>
              <span className="text-white">Transition</span> — short fade
              centred on the middle of the card
            </li>
          </ul>
          <div className="flex flex-wrap gap-6">
            {WORLD_MIXED_CARDS.map((card) => (
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
                    theme={APP_GENRE_THEMES.Rock}
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
      </div>
    </>
  );
}
