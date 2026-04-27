import Link from "next/link";
import Card, { type CardData } from "@/components/Card";
import {
  type AppGenreName,
  APP_GENRE_THEMES,
  themeForCountry as worldThemeForCountry,
} from "@/lib/genres";
import {
  MOCK_CARDS,
  DECK_SPOTLIGHT_CARDS,
  WORLD_FLAG_CARDS,
  WORLD_MIXED_CARDS,
  CARD_ARTWORK_BASE,
  CARD_RARITY_ORDER,
} from "@/lib/cards";

export function CardsSongsContent() {
  const fourTetOpusBase = DECK_SPOTLIGHT_CARDS.find((c) => c.id === 85)!;
  const anatomyCard = {
    ...fourTetOpusBase,
    transitionIn: { title: "Opus", artist: "Eric Prydz", themeColor: "#7090e8" },
    transitionOut: { title: "Opus", artist: "Lunatic", themeColor: "#141c34" },
  };

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

      <div id="remix" className="w-full max-w-[1100px] mb-14">
        <div className="section-title mb-5">Remix</div>
        <div className="rounded-[6px] border border-ui-border bg-[#0f0f14]/35 px-5 py-4">
          <p className="font-garamond text-muted leading-[1.6] m-0">
            Remix cards are documented separately, with their own anatomy and
            genre-specific layer:{" "}
            <Link
              href="/cards/remixes#remix-anatomy"
              className="text-gold underline-offset-2 hover:underline"
            >
              Cards — Remixes
            </Link>
            .
          </p>
        </div>
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
              card={anatomyCard}
              theme={APP_GENRE_THEMES.Electronic}
            />
          </div>
          <div className="flex flex-col gap-3 pt-2 flex-1">
            {[
              [
                "Header",
                "Icon: Genre icon.\nTitle: Song title.\nArtist: Omit if the song is traditional with no attributed artist, or if rights are not cleared.\nPop: Integer 1-9.\nGlow: Scales with pop (same value used for award symbols).\nAlignment: If artist is missing, title is vertically centered.",
              ],
              [
                "Artwork",
                "Image: Required real asset image.\nPrompt: Required if AI-generated.\nDominant palette: Prefer genre colour (e.g. white/pink for Disco Pop).\nMood: Mystical.\nRights safety: Avoid copyrighted or overly identifiable elements when rights are not cleared (faces, brands, logos, signature items such as Michael Jackson's gold glove).",
              ],
              [
                "Type strip",
                "Base: Parchment (#ede4cc).\nLeft side: Genre diamond + genre name.\nRight side: Subgenre name + subgenre diamond.\nTheme rule: Both diamonds and the full card chrome use the subgenre theme when one exists.\nReadability: Very light diamonds get a subtle dark border.",
              ],
              [
                "Matchup strip",
                "Base: Same parchment and clipped shape as the type strip, directly beneath it.\nLeft half: Reddish wash, lists weakness targets (colour diamond left, genre name right).\nRight half: Greenish wash, lists advantage targets (name left, diamond right, like the type strip).\nData source: lib/genres.ts (GENRE_BATTLE_MATCHUP).\nWorld cards: Pure world cards (no resolved genre) show an em dash on each side.",
              ],
              [
                "Ability box",
                "Base: Parchment (#f4edd8).\nContent: Ability name + flavour description.",
              ],
              [
                "Stats Left - Popularity",
                "Display: Award symbols only.\nNo text: No text label.\nNo number: No 1-9 numeric display.",
              ],
              [
                "Stats Right - Intensity",
                "Shape: Right triangle with the right angle on the right.\nBackground: Full triangle visible in dull grey.\nFill: Green-to-red gradient for 1/4 (pop) through 4/4 (hardcore).\nCursor: Vertical cursor marks the fill edge.\nPercentage: Fill percentage under cursor matches position (25%-100%).",
              ],
              [
                "Footer",
                "Year: Release year.\nRarity: SVG shape + rarity name.",
              ],
              [
                "Border",
                "Mode normal: 10px solid border.\nMode bleed: No border; artwork bleeds to the card edge.\nColour rule (normal mode): Subgenre canonical colour if available, otherwise genre border colour.\nWorld cards (normal mode): Country flag in landscape.\nMixed World/Genre (normal mode): Fade from flag (left) to genre colour (right).",
              ],
              [
                "Track Transition",
                "Optional. Two right-pointing arrow strips overlapping the header/artwork boundary.\nIn: The preceding track that mixes into this card — left strip. Colour: genre theme of the incoming track.\nOut: The track this card transitions into — right strip. Colour: genre theme of the outgoing track.\nGap: The two strips never touch; a clear zone separates them in the centre.",
              ],
            ].map(([name, desc]) => (
              <div key={name} className="flex gap-3">
                <div className="w-[120px] shrink-0 font-cinzel tracking-[1px] text-gold pt-px">
                  {name}
                </div>
                <div className="font-garamond text-muted leading-[1.5]">
                  {desc.split("\n").map((line, idx) => {
                    if (!line.trim()) return <div key={idx} className="h-2" />;
                    const colonIndex = line.indexOf(":");
                    if (colonIndex <= 0) return <div key={idx}>{line}</div>;
                    const label = line.slice(0, colonIndex + 1);
                    const value = line.slice(colonIndex + 1).trimStart();
                    return (
                      <div key={idx}>
                        <span className="text-white">{label}</span>{" "}
                        {value}
                      </div>
                    );
                  })}
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
                    <Card card={item.card} theme={item.theme} />
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
                take the corresponding penalty — plan sideboard and tempo around
                bad matchups.
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
            levels. On the card it reads as a right-triangle volume gauge (right
            angle at the bottom-right at 100% width): the empty shape stays
            visible in dull grey; the saturated green→red band fills ¼ to 4/4 of
            its width (pop…hardcore), with a cursor and the matching percentage
            (25%–100%) at the fill edge. The spectrum is always anchored: red is
            fixed at the full 100% width, so lower levels only reveal the left
            (greener) part of that same ramp.
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
  );
}
