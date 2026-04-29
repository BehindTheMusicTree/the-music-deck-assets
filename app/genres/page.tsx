import GenreWheel from "@/components/GenreWheel";
import WorldSubgenreMap from "@/components/WorldSubgenreMap";
import GenreSubTabs from "@/components/GenreSubTabs";
import GenreAssociations from "@/components/GenreAssociations";
import GenreThemePreview from "@/components/GenreThemePreview";
import GenreTransitionsWheel from "@/components/GenreTransitionsWheel";
import GenreMashupWheel from "@/components/GenreMashupWheel";
import IntensityGauge from "@/components/IntensityGauge";
import {
  APP_GENRE_NAMES,
  APP_GENRE_THEMES,
  SUBGENRE_COLOR,
  appGenreIntensity,
  displayGenreLabel,
  intensityLevelIndex,
} from "@/lib/genres";

function textOnBg(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 160 ? "#0a1020" : "#c8d8f0";
}

export default function GenresPage() {
  return (
    <>
      <GenreSubTabs />
      <div className="px-6 py-10 flex flex-col items-center">
        <div id="overview" className="page-index mb-2">
          02
        </div>
        <div className="page-eyebrow mb-4">Genre colour system</div>
        <h2 className="font-cinzel text-3xl tracking-[4px] text-white mb-2">
          THE <em className="text-gold not-italic">GENRES</em>
        </h2>
        <p className="font-garamond italic text-muted max-w-[600px] text-center">
          Each genre owns a border colour scale tied to intensity. World is the
          exception — its border carries the flag of the card&apos;s country or
          region rather than a solid colour.
        </p>

        <div className="w-full max-w-[860px] mt-6 mb-2.5 border border-ui-border rounded-[6px] bg-white/[0.02] overflow-hidden">
          <div className="px-[18px] pt-4 pb-3">
            <div className="section-title mb-1">Intensity Scale</div>
            <p className="font-garamond italic text-muted leading-[1.45] m-0">
              Each genre spans an intensity scale — from pop intensity to
              hardcore intensity.
            </p>
          </div>

          {/* Spectrum row: Electronic */}
          <div className="px-[18px] pb-4">
            <div className="section-title-sub mb-2">Example — Electronic</div>
            <div className="flex gap-0 rounded-[4px] overflow-hidden h-10">
              {(["Electropop", "EDM", "Techno", "Psytrance"] as const).map(
                (label) => {
                  const bg = SUBGENRE_COLOR[label];
                  return (
                    <div
                      key={label}
                      className="flex-1 flex items-center justify-center font-mono tracking-[1px]"
                      style={{ background: bg, color: textOnBg(bg) }}
                    >
                      {label}
                    </div>
                  );
                },
              )}
            </div>
            <div className="flex justify-between mt-1 px-0.5">
              <span className="font-mono  text-muted opacity-50 tracking-[1px]">
                ← POP INTENSITY
              </span>
              <span className="font-mono  text-muted opacity-50 tracking-[1px]">
                HARDCORE INTENSITY →
              </span>
            </div>
          </div>
        </div>

        <div className="w-full max-w-[860px] mt-2 mb-2.5 border border-ui-border rounded-[6px] bg-white/[0.02] overflow-hidden">
          {/* Mix rule */}
          <div className="px-[18px] py-4">
            <div className="section-title-sub mb-3">
              Cross-genre colour mixing
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              {/* Metal swatch */}
              <div className="flex flex-col items-center gap-1">
                <div
                  className="w-10 h-10 rounded-[4px]"
                  style={{ background: SUBGENRE_COLOR["Metal"] }}
                />
                <span className="font-mono tracking-[1px] text-muted">
                  Metal
                </span>
              </div>
              <span className="font-mono text-[18px] text-muted opacity-40">
                +
              </span>
              {/* Hip-hop swatch */}
              <div className="flex flex-col items-center gap-1">
                <div
                  className="w-10 h-10 rounded-[4px]"
                  style={{ background: APP_GENRE_THEMES["Hip-Hop"].border }}
                />
                <span className="font-mono tracking-[1px] text-muted">
                  Hip-Hop
                </span>
              </div>
              <span className="font-mono text-[18px] text-muted opacity-40">
                =
              </span>
              {/* Result swatch */}
              <div className="flex flex-col items-center gap-1">
                <div
                  className="w-10 h-10 rounded-[4px]"
                  style={{ background: SUBGENRE_COLOR["Nu Metal"] }}
                />
                <span className="font-mono tracking-[1px] text-muted">
                  Nu Metal
                </span>
              </div>
              <p className="font-garamond italic text-muted leading-[1.5] ml-2 max-w-[340px]">
                Crimson + gold yellow blend into{" "}
                <span style={{ color: SUBGENRE_COLOR["Nu Metal"] }}>
                  amber orange
                </span>{" "}
                — the hue inherits influence from both parent genres.
              </p>
            </div>
          </div>
        </div>

        <div id="genre-wheel" className="w-full flex justify-center">
          <GenreWheel />
        </div>
        <div id="genre-transitions" className="w-full max-w-[1800px] mt-3 mb-2.5 border border-ui-border rounded-[6px] bg-white/[0.02] overflow-visible px-[18px] py-4">
          <div className="section-title-sub mb-2">Transitions</div>
          <div className="mb-4 max-w-[900px]">
            <p className="font-garamond italic text-muted leading-[1.45] mb-2">
              A transition node is a genre + intensity pair. Current out rules:
            </p>
            <ul className="list-disc pl-6 font-garamond italic text-muted leading-[1.45]">
              <li>
                Mainstream (pop) fans out to every genre at pop intensity.
              </li>
              <li>
                For any non-mainstream node (genre A, intensity B), out includes
                self: (A, B).
              </li>
              <li>Same genre intensity branches: (A, B + 1) and (A, B - 1).</li>
              <li>
                Neighbour genre branches at same intensity: (next(A), B) and
                (previous(A), B).
              </li>
              <li>
                Neighbour genre branches at lower intensity: (next(A), B - 1)
                and (previous(A), B - 1).
              </li>
              <li>
                Some subgenres add an influence bridge (bidirectional). Example:
                Turntablism includes a Hip-Hop (experimental) influence, so this
                pair adds extra transitions in both directions.
              </li>
            </ul>
          </div>
          <GenreTransitionsWheel />
        </div>
        <div id="genre-mashup" className="w-full max-w-[1800px] mt-3 mb-2.5 border border-ui-border rounded-[6px] bg-white/[0.02] overflow-visible px-[18px] py-4">
          <div className="section-title-sub mb-2">Genre Mashups</div>
          <div className="mb-4 max-w-[900px]">
            <p className="font-garamond italic text-muted leading-[1.45] mb-2">
              Matchup wheel rules are circular on the outer ring:
            </p>
            <ul className="list-disc pl-6 font-garamond italic text-muted leading-[1.45]">
              <li>Mainstream has no advantage and no weakness.</li>
              <li>
                For genre A, advantage targets are A + 2 and A - 3 on the wheel.
              </li>
              <li>
                For genre A, weakness targets are A - 2 and A + 3 on the wheel.
              </li>
              <li>
                If a subgenre of A has influence genre X, X is removed from A weak
                targets (when present).
              </li>
            </ul>
          </div>
          <GenreMashupWheel />
        </div>

        <div id="world-genres" className="w-full flex justify-center">
          <WorldSubgenreMap />
        </div>

        <div id="genre-intensity" className="w-full max-w-[1100px] mt-10 mb-10">
          <div className="section-title mb-2">Genre-level intensity</div>
          <p className="font-garamond italic text-muted leading-[1.45] mb-4 max-w-[680px]">
            When a card has a subgenre, intensity comes from that subgenre. When
            there is no subgenre (genre-only card), intensity is taken from the
            genre row below: <span className="text-white/80">Electronic</span>{" "}
            is <span className="text-white/80">hardcore</span>,{" "}
            <span className="text-white/80">Hip-Hop</span> is{" "}
            <span className="text-white/80">soft</span>,{" "}
            <span className="text-white/80">Classical</span>,{" "}
            <span className="text-white/80">Rock</span>, and{" "}
            <span className="text-white/80">Reggae/Dub</span> are{" "}
            <span className="text-white/80">experimental</span>, and all other
            genres are <span className="text-white/80">pop</span>.
          </p>
          <p className="font-garamond italic text-muted leading-[1.45] mb-4 max-w-[680px]">
            <span className="text-white/80">Mainstream</span> (shown as{" "}
            <span className="text-white/80">Pop</span> on cards) is only the
            centre of the colour wheel — it is{" "}
            <span className="text-white/80">never</span> the parent of a
            subgenre. Chart-pop and catalogue hits use a musical family parent
            (for example <span className="text-white/80">Vintage</span> or{" "}
            <span className="text-white/80">Disco/Funk</span>) instead.
          </p>
          <div className="border border-ui-border rounded-[6px] overflow-hidden">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-ui-border bg-white/[0.02]">
                  <th className="font-mono text-[12px] tracking-[2px] uppercase text-muted px-4 py-3">
                    Genre
                  </th>
                  <th className="font-mono text-[12px] tracking-[2px] uppercase text-muted px-4 py-3">
                    Intensity (no subgenre)
                  </th>
                </tr>
              </thead>
              <tbody>
                {[...APP_GENRE_NAMES]
                  .sort(
                    (a, b) =>
                      intensityLevelIndex(appGenreIntensity(a)) -
                      intensityLevelIndex(appGenreIntensity(b)),
                  )
                  .map((g) => (
                    <tr
                      key={g}
                      className="border-b border-ui-border last:border-0 odd:bg-transparent even:bg-white/[0.02]"
                    >
                      <td className="px-4 py-3 font-mono text-[11px] tracking-[1px] text-white/90">
                        {displayGenreLabel(g)}
                      </td>
                      <td className="px-4 py-3 align-middle">
                        <div className="max-w-[148px]">
                          <IntensityGauge intensity={appGenreIntensity(g)} />
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>

        <div id="genre-themes" className="w-full max-w-[1100px] mt-4 mb-10">
          <div className="section-title mb-2">Genre Themes</div>
          <p className="font-garamond italic text-muted leading-[1.45] mb-6 max-w-[600px]">
            Each genre defines a full colour theme used across the card frame.
            You can preview a subgenre alone, a country or region alone, or
            combine a subgenre with a country to apply the World/Genre border
            rule automatically.
          </p>
          <GenreThemePreview />
        </div>
      </div>

      <GenreAssociations />
    </>
  );
}
