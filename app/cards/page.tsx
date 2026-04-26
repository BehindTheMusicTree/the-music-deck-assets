import Link from "next/link";
import Card, { type CardData } from "@/components/Card";
import CatalogDeckTable from "@/components/CatalogDeckTable";
import CardSubTabs from "@/components/CardSubTabs";
import {
  type AppGenreName,
  APP_GENRE_THEMES,
  themeForCountry as worldThemeForCountry,
} from "@/lib/genres";
import {
  MOCK_CARDS,
  WORLD_FLAG_CARDS,
  WORLD_MIXED_CARDS,
  CARD_ARTWORK_BASE,
  CARD_RARITY_ORDER,
} from "@/lib/cards";

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

  const popularityExamples: Array<{ note: number; card: CardData }> =
    Array.from({ length: 9 }, (_, i) => {
      const note = i + 1;
      const pop = note;
      return {
        note,
        card: {
          ...MOCK_CARDS.Rock,
          id: 9800 + note,
          title: `Popularity ${note}`,
          pop,
          rarity: note >= 8 ? "Legendary" : note >= 5 ? "Classic" : "Banger",
        },
      };
    });

  const themeRuleExamples: Array<{
    key: string;
    title: string;
    left: string;
    right: string;
    border: string;
    card: CardData;
    theme: (typeof APP_GENRE_THEMES)[AppGenreName];
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
        pop: 9,
        rarity: "Classic",
        artwork: `${CARD_ARTWORK_BASE}artwork.los-del-rio-la-macarena-v1.png`,
        country: "Spain",
        genre: "Electronic",
      },
      theme: worldThemeForCountry("Spain"),
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
        <div className="page-index mb-2">05</div>
        <div className="page-eyebrow mb-4">Card frame anatomy</div>
        <h2 className="font-cinzel text-3xl tracking-[4px] text-white mb-2">
          THE <em className="text-gold not-italic">CARDS</em>
        </h2>
        <p className="font-garamond italic text-muted max-w-[600px] text-center mb-14">
          Each card adapts its colour theme to its genre. The frame anatomy —
          header, artwork, type strip, ability box, stats, and footer — remains
          constant across all genres and rarities.
        </p>

        <div id="catalog" className="w-full max-w-[1200px] mb-14 scroll-mt-28">
          <div className="section-title mb-5">Catalog</div>
          <p className="font-garamond text-muted leading-[1.6] mb-4 max-w-[800px]">
            Every shipped card with artwork, in one place. Each row has a
            catalogue number within its series: by genre, except for
            country-native subgenres (then by country or region). Use the filters
            and sort buttons in each column header. Click a preview to zoom
            (backdrop or Esc to close).
          </p>
          <CatalogDeckTable />
        </div>

        {/* Anatomy legend */}
        <div id="anatomy" className="w-full max-w-[1100px] mb-14">
          <div className="section-title mb-5">Frame Anatomy</div>
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
                  "Genre icon · title · artist (optional) · popularity note (integer 1–9) in the header; glow scales with that same value used for award symbols. If artist is missing, title is vertically centered.",
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
                  "Artwork prompt",
                  "Optional strip (only when `artworkPrompt` is set on the card): uppercase label and monospace body, line-clamped; full text on hover `title`.",
                ],
                [
                  "Stats Left - Popularity",
                  "Award symbols only (no text label, no 1–9 number).",
                ],
                [
                  "Stats Right - Intensity",
                  "Right triangle with the right angle on the right. The full triangle is visible in a dull (terne) grey; the filled band uses a green→red gradient for 1/4 (pop) through 4/4 (hardcore); a vertical cursor marks the fill edge, with the same fill percentage (25%–100%) under that position.",
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
          <div className="section-title mb-5">Theme</div>
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
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="font-cinzel text-[15px] tracking-[1px] text-white mb-1">
                        {item.title}
                      </div>
                      <ul className="font-garamond text-muted text-[16px] leading-[1.5] list-none pl-0 flex flex-col gap-0.5">
                        <li>
                          <span className="text-white">
                            Type strip — primary:
                          </span>{" "}
                          {item.left}
                        </li>
                        <li>
                          <span className="text-white">
                            Type strip — secondary:
                          </span>{" "}
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
              <div className="section-label-accent mb-1.5">
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
          <div className="section-title mb-5">Advantage &amp; Weakness</div>
          <div className="rounded-[6px] border border-ui-border bg-[#0f0f14]/35 px-5 py-4">
            <p className="font-garamond text-muted leading-[1.6] mb-4">
              In battles, genres form a matchup layer: each archetype is strong
              against one genre and weak against another. Your card&apos;s genre
              (from its subgenre) determines when you gain an edge or take a
              penalty against an opponent&apos;s card.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <div className="section-label-accent mb-1.5">Advantage</div>
                <p className="font-garamond text-muted leading-[1.6] m-0">
                  When your genre counters the opponent&apos;s genre, battle
                  modifiers favour you (see the battle rules for exact values).
                </p>
              </div>
              <div>
                <div className="section-label-accent mb-1.5">Weakness</div>
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
          <div className="section-title mb-5">Popularity</div>
          <div className="rounded-[6px] border border-ui-border bg-[#0f0f14]/35 px-5 py-4">
            <p className="font-garamond text-muted leading-[1.6] mb-3">
              Popularity is shown as a 1-9 award note instead of a bar. It
              reflects how broadly a track connects with the audience.
            </p>
            <ul className="font-garamond text-muted leading-[1.6] list-disc pl-5 flex flex-col gap-1">
              <li>1-3: gold awards (one to three symbols).</li>
              <li>4-6: platinum awards (one to three symbols).</li>
              <li>7-9: diamond awards (one to three symbols).</li>
              <li>
                Popularity and Intensity are independent stats and can both be
                high.
              </li>
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
                    <div
                      style={{
                        transform: "scale(2)",
                        transformOrigin: "top left",
                      }}
                    >
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
          <div className="section-title mb-5">Intensity</div>
          <div className="rounded-[6px] border border-ui-border bg-[#0f0f14]/35 px-5 py-4">
            <p className="font-garamond text-muted leading-[1.6] mb-3">
              Intensity replaces the old experimental gauge with four canonical
              levels. On the card it reads as a right-triangle volume gauge
              (right angle at the bottom-right at 100% width): the empty shape
              stays visible in dull grey; the saturated green→red band fills ¼
              to 4/4 of its width (pop…hardcore), with a cursor and the matching
              percentage (25%–100%) at the fill edge. The spectrum is always
              anchored: red is fixed at the full 100% width, so lower levels
              only reveal the left (greener) part of that same ramp.
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
                    <div
                      style={{
                        transform: "scale(2)",
                        transformOrigin: "top left",
                      }}
                    >
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
          <div className="section-title mb-5">Rarity Variants</div>
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {CARD_RARITY_ORDER.map((rarity) => (
              <div key={rarity} className="flex flex-col items-center gap-2">
                <div
                  style={{
                    width: 298,
                    height: 440,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      transform: "scale(2)",
                      transformOrigin: "top left",
                    }}
                  >
                    <Card
                      card={{ ...MOCK_CARDS.Rock, rarity }}
                      theme={APP_GENRE_THEMES.Rock}
                      small
                    />
                  </div>
                </div>
                <div className="font-mono tracking-[1px] text-muted">
                  {rarity.toUpperCase()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
