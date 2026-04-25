import Link from "next/link";
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
    subgenre: "Country",
    typeStripPrimaryBorder: "#B22234",
    ability: "Heartland",
    abilityDesc: "Restores 10 HP to all allied cards when played.",
    power: 70,
    pop: 78,
    rarity: "Rare",
    country: "USA",
    artwork: `${ART}artwork.example-take-me-home-country-roads-v1.png`,
  },
  {
    id: 24,
    title: "Les Lacs du Connemara",
    artist: "Michel Sardou",
    year: 1981,
    subgenre: "French Variety",
    typeStripPrimaryBorder: "#0055A4",
    ability: "Melancholy",
    abilityDesc: "Draws 2 cards from the deck when played after a Legendary.",
    power: 80,
    pop: 74,
    rarity: "Rare",
    country: "France",
    artwork: `${ART}artwork.example-michel-sardou-les-lacs-du-connemara-v1.png`,
  },
  {
    id: 26,
    title: "Tri Martolod",
    artist: "Traditional",
    year: 1972,
    subgenre: "Folk Breton",
    typeStripPrimaryBorder: "#222222",
    ability: "Rising Tide",
    abilityDesc: "Gain +10 power for each allied World card in play.",
    power: 72,
    pop: 58,
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
    subgenre: "Rap",
    typeStripPrimaryBorder: "#0055A4",
    ability: "Street Anthem",
    abilityDesc:
      "Allied Hip-Hop cards gain +12 popularity on the turn this card is played.",
    power: 84,
    pop: 90,
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
    subgenre: "Religious",
    typeStripPrimaryBorder: "#B22234",
    ability: "Redemption",
    abilityDesc: "Revives one defeated allied card with 30 HP.",
    power: 74,
    pop: 72,
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
    subgenre: "Anthem",
    typeStripPrimaryBorder: "#0055A4",
    ability: "Liberty",
    abilityDesc: "Grants +15 power to all allied cards on the next turn.",
    power: 88,
    pop: 68,
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
    subgenre: "Ska Punk",
    typeStripPrimaryBorder: "#AA151B",
    ability: "Contraband",
    abilityDesc:
      "Opponent discards one card at random when this card enters play.",
    power: 76,
    pop: 62,
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
    subgenre: "Pop Rock",
    ability: "Anthemic",
    abilityDesc: "Doubles momentum on any track with a guitar solo.",
    power: 95,
    pop: 92,
    rarity: "Legendary",
    artwork: `${ART}artwork.example-bohemian-rhapsody-v2.png`,
  },
  Mainstream: {
    id: 2,
    title: "Billie Jean",
    artist: "Michael Jackson",
    year: 1982,
    subgenre: "Disco Pop",
    ability: "Crossover",
    abilityDesc: "Gains +10 popularity when played after a dance track.",
    power: 91,
    pop: 97,
    rarity: "Legendary",
    artwork: `${ART}artwork.example-billy-jean-v2.png`,
  },
  Electronic: {
    id: 3,
    title: "One More Time",
    artist: "Daft Punk",
    year: 2000,
    subgenre: "House",
    ability: "Loop Sync",
    abilityDesc: "Repeats its effect once if experimental is above 60.",
    power: 82,
    pop: 88,
    rarity: "Epic",
    artwork: `${ART}artwork.example-daft-punk-one-more-time-v1.png`,
  },
  "Reggae/Dub": {
    id: 4,
    title: "Is This Love",
    artist: "Bob Marley",
    year: 1978,
    subgenre: "Roots",
    ability: "Roots",
    abilityDesc: "Heals 20 HP when adjacent to a World genre card.",
    power: 74,
    pop: 82,
    rarity: "Epic",
    artwork: `${ART}artwork.example-is-this-love-v1.png`,
  },
  "Hip-Hop": {
    id: 5,
    title: "HUMBLE.",
    artist: "Kendrick Lamar",
    year: 2017,
    subgenre: "R&B Soul",
    ability: "Lyrical",
    abilityDesc:
      "Drains 15 power from the opponent when popularity exceeds 70.",
    power: 88,
    pop: 86,
    rarity: "Legendary",
    artwork: `${ART}artwork.example-kendrick-lamar-humble-v1.png`,
  },
  "Disco/Funk": {
    id: 6,
    title: "Night Fever",
    artist: "Bee Gees",
    year: 1977,
    subgenre: "Disco",
    ability: "Groove",
    abilityDesc: "Boosts all Funk cards on the field by +5 popularity.",
    power: 72,
    pop: 90,
    rarity: "Rare",
    artwork: `${ART}artwork.example-night-fever-v1.png`,
  },
  Classical: {
    id: 7,
    title: "Ride of the Valkyries",
    artist: "Wagner",
    year: 1876,
    subgenre: "Soul",
    ability: "Fortissimo",
    abilityDesc: "Deals damage in three separate strikes of 60% power each.",
    power: 90,
    pop: 58,
    rarity: "Legendary",
    artwork: `${ART}artwork.example-wagner-ride-of-the-valkyries-v1.png`,
  },
  Vintage: {
    id: 8,
    title: "So What",
    artist: "Miles Davis",
    year: 1959,
    subgenre: "Jazz",
    ability: "Modal",
    abilityDesc: "Random multiplier between ×1 and ×3 on each use.",
    power: 77,
    pop: 55,
    rarity: "Epic",
    artwork: `${ART}artwork.example-miles-davis-so-what-v1.png`,
  },
};

const RARITY_LABEL: Record<"Legendary" | "Epic" | "Rare" | "Common", string> = {
  Legendary: "Legendary",
  Epic: "Classic",
  Rare: "Banger",
  Common: "Niche",
};

export default function CardsPage() {
  const intensityExamples: Array<{
    level: "pop" | "soft" | "experimental" | "hardcore";
    card: CardData;
  }> = [
    {
      level: "pop",
      card: { ...MOCK_CARDS.Mainstream, id: 9701, title: "Intensity Pop" },
    },
    {
      level: "soft",
      card: { ...MOCK_CARDS.Rock, id: 9702, title: "Intensity Soft" },
    },
    {
      level: "experimental",
      card: {
        ...MOCK_CARDS.Electronic,
        id: 9703,
        title: "Intensity Experimental",
      },
    },
    {
      level: "hardcore",
      card: { ...MOCK_CARDS.Vintage, id: 9704, title: "Intensity Hardcore" },
    },
  ];

  const popularityExamples: Array<{ note: number; card: CardData }> = Array.from(
    { length: 9 },
    (_, i) => {
      const note = i + 1;
      const pop = note === 1 ? 1 : Math.floor(((note - 1) * 100) / 9) + 1;
      return {
        note,
        card: {
          ...MOCK_CARDS.Rock,
          id: 9800 + note,
          title: `Popularity ${note}`,
          pop,
          power: 70 + note,
          rarity: note >= 8 ? "Legendary" : note >= 5 ? "Epic" : "Rare",
        },
      };
    },
  );

  const themeRuleExamples: Array<{
    key: string;
    title: string;
    left: string;
    right: string;
    border: string;
    card: CardData;
    theme: (typeof APP_GENRE_THEMES)[AppGenreName];
    genreName?: string;
  }> = [
    {
      key: "genre-subgenre-pop",
      title: "Genre-subgenre (pop intensity)",
      left: "Parent genre (displayed as Pop for Mainstream and pop-intensity).",
      right: "Disco Pop.",
      border:
        "Border uses the subgenre-derived colour theme (no country flag layer).",
      card: MOCK_CARDS.Mainstream,
      theme: APP_GENRE_THEMES.Mainstream,
    },
    {
      key: "genre-subgenre-non-pop",
      title: "Genre-subgenre (non-pop intensity)",
      left: "Parent genre.",
      right: "House.",
      border:
        "Border uses the subgenre-derived colour theme (no country flag layer).",
      card: MOCK_CARDS.Electronic,
      theme: APP_GENRE_THEMES.Electronic,
    },
    {
      key: "country-subgenre",
      title: "Country-subgenre",
      left: "Country/region.",
      right: "Country-subgenre.",
      border:
        "Border and full theme always come from the country/region theme.",
      card: WORLD_FLAG_CARDS[0],
      theme: worldThemeForCountry(WORLD_FLAG_CARDS[0].country!),
    },
    {
      key: "region-subgenre",
      title: "Country/region (region example)",
      left: "Country/region.",
      right: "Country-subgenre.",
      border:
        "Border and full theme always come from the region theme (same rule as country-subgenre).",
      card: WORLD_FLAG_CARDS[2],
      theme: worldThemeForCountry(WORLD_FLAG_CARDS[2].country!),
    },
    {
      key: "country-plus-genre",
      title: "Country/region + genre",
      left: "Country/region.",
      right: "Genre.",
      border: "Border fades from country flag (left) to genre colour (right).",
      card: {
        id: 9101,
        title: "La Macarena",
        artist: "Los Del Rio",
        year: 1993,
        ability: "Festival Pulse",
        abilityDesc: "Gain +10 popularity when played after a World card.",
        power: 83,
        pop: 94,
        rarity: "Epic",
        artwork: `${ART}artwork.example-los-del-rio-la-macarena-v1.png`,
        country: "Spain",
        subgenre: undefined,
        flagStyle: undefined,
      },
      theme: worldThemeForCountry("Spain"),
      genreName: "Electronic",
    },
    {
      key: "country-plus-genre-subgenre",
      title: "Country/region + genre-subgenre",
      left: "Country/region.",
      right: "Genre-subgenre.",
      border:
        "Border fades from country flag (left) to subgenre/genre colour (right).",
      card: WORLD_MIXED_CARDS[0],
      theme: worldThemeForCountry(WORLD_MIXED_CARDS[0].country!),
    },
  ];

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
              <Card
                card={MOCK_CARDS.Mainstream}
                theme={APP_GENRE_THEMES.Mainstream}
              />
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
                  "Matchup strip",
                  "Same parchment base and clipped shape as the type strip, directly beneath it. Left half has a reddish wash and lists genres this card is weak against (colour diamond left, genre name right). Right half has a greenish wash and lists advantage targets (name left, diamond right, like the type strip). Data is canonical in lib/genres.ts (GENRE_BATTLE_MATCHUP). Pure world cards (no resolved genre) show an em dash on each side.",
                ],
                [
                  "Ability box",
                  "Parchment (#f4edd8) — ability name and flavour description",
                ],
                [
                  "Stats",
                  "Single row: left — popularity as award symbols only (no text label, no 1–9 number). Right — intensity as a right triangle (triangle rectangle) with the right angle on the right at 100% (bottom edge × right edge). The full triangle is visible in a dull (terne) grey; the filled band uses a green→red gradient for 1/4 (pop) through 4/4 (hardcore); a vertical cursor marks the fill edge, with the same fill percentage (25%–100%) under that position.",
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
            </div>
          </div>
        </div>

        <div id="theme" className="w-full max-w-[1100px] mb-14">
          <div className="font-mono tracking-[2px] text-muted uppercase mb-5">
            Theme
          </div>
          <div className="rounded-[6px] border border-ui-border bg-[#0f0f14]/35 px-5 py-4 flex flex-col gap-4">
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {themeRuleExamples.map((item) => (
                  <div
                    key={item.key}
                    className="rounded-[6px] border border-ui-border bg-[#12121a]/45 p-3 flex gap-3 items-start"
                  >
                    <div className="shrink-0">
                      <Card
                        card={item.card}
                        theme={item.theme}
                        genreName={item.genreName}
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="font-cinzel text-[15px] tracking-[1px] text-white mb-1">
                        {item.title}
                      </div>
                      <ul className="font-garamond text-muted text-[16px] leading-[1.5] list-none pl-0 flex flex-col gap-0.5">
                        <li>
                          <span className="text-white">Type strip — primary:</span>{" "}
                          {item.left}
                        </li>
                        <li>
                          <span className="text-white">Type strip — secondary:</span>{" "}
                          {item.right}
                        </li>
                        <li>
                          <span className="text-white">Frame border:</span>{" "}
                          {item.border}
                        </li>
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="font-mono text-[11px] tracking-[0.16em] text-gold uppercase mb-1.5">
                Display conventions
              </div>
              <ul className="font-garamond text-muted leading-[1.6] list-disc pl-5 flex flex-col gap-1">
                <li>
                  Mainstream is displayed as Pop; pop-intensity subgenres also
                  display Pop on the left label.
                </li>
                <li>Genre and genre-subgenre use colour diamonds.</li>
                <li>
                  Country and country-subgenre use country identity: symbol when
                  available, otherwise flag diamond.
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div id="advantage-weakness" className="w-full max-w-[1100px] mb-14">
          <div className="font-mono tracking-[2px] text-muted uppercase mb-5">
            Advantage &amp; Weakness
          </div>
          <div className="rounded-[6px] border border-ui-border bg-[#0f0f14]/35 px-5 py-4">
            <p className="font-garamond text-muted leading-[1.6] mb-4">
              In battles, genres form a matchup layer: each archetype is strong
              against one genre and weak against another. Your card&apos;s
              genre (from its subgenre) determines when you gain an edge or take
              a penalty against an opponent&apos;s card.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <div className="font-mono text-[11px] tracking-[0.16em] text-gold uppercase mb-1.5">
                  Advantage
                </div>
                <p className="font-garamond text-muted leading-[1.6] m-0">
                  When your genre counters the opponent&apos;s genre, battle
                  modifiers favour you (see the battle rules for exact values).
                </p>
              </div>
              <div>
                <div className="font-mono text-[11px] tracking-[0.16em] text-gold uppercase mb-1.5">
                  Weakness
                </div>
                <p className="font-garamond text-muted leading-[1.6] m-0">
                  When your genre is weak against the opponent&apos;s genre, you
                  take the corresponding penalty — plan sideboard and tempo
                  around bad matchups.
                </p>
              </div>
            </div>
            <p className="font-garamond text-muted leading-[1.6] mt-4 mb-0">
              Full per-genre columns:{" "}
              <Link
                href="/genres#associations"
                className="text-gold underline-offset-2 hover:underline"
              >
                Genres — Associations
              </Link>{" "}
              (&quot;Advantage vs&quot; and &quot;Weak vs&quot;). Numeric battle
              modifiers:{" "}
              <Link
                href="/battles"
                className="text-gold underline-offset-2 hover:underline"
              >
                Battles
              </Link>
              .
            </p>
          </div>
        </div>

        <div id="popularity" className="w-full max-w-[1100px] mb-14">
          <div className="font-mono tracking-[2px] text-muted uppercase mb-5">
            Popularity
          </div>
          <div className="rounded-[6px] border border-ui-border bg-[#0f0f14]/35 px-5 py-4">
            <p className="font-garamond text-muted leading-[1.6] mb-3">
              Popularity is shown as a 1-9 award note instead of a bar.
              It reflects how broadly a track connects with the audience.
            </p>
            <ul className="font-garamond text-muted leading-[1.6] list-disc pl-5 flex flex-col gap-1">
              <li>1-3: gold awards (one to three symbols).</li>
              <li>4-6: platinum awards (one to three symbols).</li>
              <li>7-9: diamond awards (one to three symbols).</li>
              <li>Popularity and Intensity are independent stats and can both be high.</li>
            </ul>
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {popularityExamples.map(({ note, card }) => (
                <div key={note} className="flex flex-col items-center gap-2">
                  <div
                    style={{
                      width: 298,
                      height: 440,
                      overflow: "hidden",
                    }}
                  >
                    <div style={{ transform: "scale(2)", transformOrigin: "top left" }}>
                      <Card card={card} theme={APP_GENRE_THEMES.Rock} small />
                    </div>
                  </div>
                  <div className="font-mono tracking-[1px] text-muted">
                    NOTE {note}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div id="intensity" className="w-full max-w-[1100px] mb-14">
          <div className="font-mono tracking-[2px] text-muted uppercase mb-5">
            Intensity
          </div>
          <div className="rounded-[6px] border border-ui-border bg-[#0f0f14]/35 px-5 py-4">
            <p className="font-garamond text-muted leading-[1.6] mb-3">
              Intensity replaces the old experimental gauge with four canonical levels.
              On the card it reads as a right-triangle volume gauge (right angle at the
              bottom-right at 100% width): the empty shape stays visible in dull grey; the
              saturated green→red band fills
              ¼ to 4/4 of its width (pop…hardcore), with a cursor and the matching percentage
              (25%–100%) at the fill edge. The spectrum is always anchored: red is fixed at the
              full 100% width, so lower levels only reveal the left (greener) part of that same ramp.
            </p>
            <ul className="font-garamond text-muted leading-[1.6] list-disc pl-5 flex flex-col gap-1">
              <li>Pop (1): low edge, broad accessibility.</li>
              <li>Soft (2): moderate experimentation.</li>
              <li>Experimental (3): strong stylistic risk.</li>
              <li>Hardcore (4): maximal edge and extremity.</li>
            </ul>
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {intensityExamples.map(({ level, card }) => (
                <div key={level} className="flex flex-col items-center gap-2">
                  <div
                    style={{
                      width: 298,
                      height: 440,
                      overflow: "hidden",
                    }}
                  >
                    <div style={{ transform: "scale(2)", transformOrigin: "top left" }}>
                      <Card card={card} theme={APP_GENRE_THEMES.Rock} small />
                    </div>
                  </div>
                  <div className="font-mono tracking-[1px] text-muted">
                    {level.toUpperCase()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Rarity variants */}
        <div id="rarities" className="w-full max-w-[1100px] mb-14">
          <div className="font-mono tracking-[2px] text-muted uppercase mb-5">
            Rarity Variants
          </div>
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {(["Common", "Rare", "Epic", "Legendary"] as const).map(
              (rarity) => (
                <div key={rarity} className="flex flex-col items-center gap-2">
                  <div
                    style={{
                      width: 298,
                      height: 440,
                      overflow: "hidden",
                    }}
                  >
                    <div style={{ transform: "scale(2)", transformOrigin: "top left" }}>
                      <Card
                        card={{ ...MOCK_CARDS.Rock, rarity }}
                        theme={APP_GENRE_THEMES.Rock}
                        small
                      />
                    </div>
                  </div>
                  <div className="font-mono tracking-[1px] text-muted">
                    {RARITY_LABEL[rarity].toUpperCase()}
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
