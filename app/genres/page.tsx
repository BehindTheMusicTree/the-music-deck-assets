import GenreWheel from "@/components/GenreWheel";
import GenreSubTabs from "@/components/GenreSubTabs";
import GenreAssociations from "@/components/GenreAssociations";
import { COLOUR_TOKEN_GROUPS } from "@/lib/genres";

export default function GenresPage() {
  return (
    <>
      <GenreSubTabs />
      <div className="px-6 py-10 flex flex-col items-center">
        <div id="overview" className="font-mono tracking-[3px] text-muted mb-2">
          02
        </div>
        <div className="font-mono tracking-[2px] text-muted mb-4">
          Genre colour system
        </div>
        <h2 className="font-cinzel text-3xl tracking-[4px] text-white mb-2">
          THE <em className="text-gold not-italic">GENRES</em>
        </h2>
        <p className="font-garamond italic text-muted max-w-[600px] text-center">
          Each genre owns a border colour that spans a spectrum from its
          poppiest subgenre to its most extreme. World is the exception — its
          border carries the flag of the card&apos;s country or region rather
          than a solid colour.
        </p>

        <div className="w-full max-w-[860px] mt-6 mb-2.5 border border-ui-border rounded-[6px] bg-white/[0.02] overflow-hidden">
          <div className="px-[18px] pt-4 pb-3">
            <div className="font-mono tracking-[2px] uppercase text-muted mb-1">
              Colour variations
            </div>
            <p className="font-garamond italic text-muted text-[16px] leading-[1.45] m-0">
              Each genre spans a spectrum — light to dark — from its poppiest
              subgenre to its most extreme.
            </p>
          </div>

          {/* Spectrum row: Electronic */}
          <div className="px-[18px] pb-4">
            <div className="font-mono text-[11px] tracking-[2px] text-muted uppercase mb-2 opacity-60">
              Example — Electronic
            </div>
            <div className="flex gap-0 rounded-[4px] overflow-hidden h-10">
              {[
                { label: "Electropop", color: "#b8d4f0", text: "#0a1020" },
                { label: "EDM", color: "#5070d0" },
                { label: "Techno", color: "#2850c8" },
                { label: "Psytrance", color: "#080f2a" },
              ].map(({ label, color, text }) => (
                <div
                  key={label}
                  className="flex-1 flex items-center justify-center font-mono  tracking-[1px]"
                  style={{ background: color, color: text ?? "#c8d8f0" }}
                >
                  {label}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-1 px-0.5">
              <span className="font-mono  text-muted opacity-50 tracking-[1px]">
                ← POP
              </span>
              <span className="font-mono  text-muted opacity-50 tracking-[1px]">
                HARDCORE →
              </span>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-ui-border mx-[18px]" />

          {/* Mix rule */}
          <div className="px-[18px] py-4">
            <div className="font-mono text-[11px] tracking-[2px] text-muted uppercase mb-3 opacity-60">
              Cross-genre colour mixing
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              {/* Metal swatch */}
              <div className="flex flex-col items-center gap-1">
                <div
                  className="w-10 h-10 rounded-[4px]"
                  style={{ background: "#7a0810" }}
                />
                <span className="font-mono  tracking-[1px] text-muted">
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
                  style={{ background: "#c8960a" }}
                />
                <span className="font-mono  tracking-[1px] text-muted">
                  Hip-hop
                </span>
              </div>
              <span className="font-mono text-[18px] text-muted opacity-40">
                =
              </span>
              {/* Result swatch */}
              <div className="flex flex-col items-center gap-1">
                <div
                  className="w-10 h-10 rounded-[4px]"
                  style={{ background: "#b84008" }}
                />
                <span className="font-mono  tracking-[1px] text-muted">
                  Nu Metal
                </span>
              </div>
              <p className="font-garamond italic text-muted leading-[1.5] ml-2 max-w-[340px]">
                Crimson + gold yellow blend into{" "}
                <span style={{ color: "#c85010" }}>amber orange</span> — the hue
                inherits influence from both parent genres.
              </p>
            </div>
          </div>
        </div>

        <div id="colour-wheel" className="w-full flex justify-center">
          <GenreWheel />
        </div>

        {/* Colour token hierarchy */}
        <div id="colour-tokens" className="w-full max-w-[860px] mt-4 mb-10">
          <div className="font-mono tracking-[2px] text-muted uppercase mb-2">Colour Tokens</div>
          <p className="font-garamond italic text-muted text-[16px] leading-[1.45] mb-6 max-w-[600px]">
            Every genre and subgenre maps to a single hex token. Subgenres are ordered pop → hardcore within each genre.
          </p>
          <div className="flex flex-col gap-6">
            {COLOUR_TOKEN_GROUPS.map(({ genre, hex, subs }) => (
              <div key={genre} className="border border-ui-border rounded-[6px] overflow-hidden">
                {/* Genre header row */}
                <div className="flex items-center gap-3 px-4 py-2.5" style={{ borderLeft: `4px solid ${hex}`, background: "#ede4cc" }}>
                  <div className="w-4 h-4 shrink-0 rotate-45 rounded-[2px]" style={{ background: hex }} />
                  <span className="font-cinzel text-sm tracking-[2px]" style={{ color: "#2e2010" }}>{genre}</span>
                  <span className="font-mono text-xs ml-auto" style={{ color: "#8a7050" }}>{hex}</span>
                </div>
                {/* Subgenre rows */}
                {subs.length > 0 && (
                  <div className="divide-y divide-[#d8cca8] border-t border-[#d8cca8]">
                    {subs.map(({ n, h, ring }) => (
                      <div key={n} className="flex items-center gap-3 pl-9 pr-4 py-2" style={{ background: "#f4edd8" }}>
                        <div className="w-3 h-3 shrink-0 rotate-45 rounded-[1px]" style={{ background: h }} />
                        <span className="font-garamond text-sm flex-1" style={{ color: "#5a4a30" }}>{n}</span>
                        <span className="font-mono text-[10px] tracking-wide uppercase" style={{ color: "#a89060" }}>{ring}</span>
                        <span className="font-mono text-xs" style={{ color: "#8a7050" }}>{h}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* World — countries/regions */}
            <div className="border border-ui-border rounded-[6px] overflow-hidden">
              <div className="flex items-center gap-3 px-4 py-2.5" style={{ borderLeft: "4px solid #a01818", background: "#ede4cc" }}>
                <div className="w-4 h-4 shrink-0 rotate-45 rounded-[2px]" style={{ background: "#a01818" }} />
                <span className="font-cinzel text-sm tracking-[2px]" style={{ color: "#2e2010" }}>World</span>
                <span className="font-mono text-xs ml-auto" style={{ color: "#8a7050" }}>flag per country / region</span>
              </div>
              <div className="divide-y divide-[#d8cca8] border-t border-[#d8cca8]">
                {[
                  { n: "USA",    pip: <span style={{ fontSize: 10, color: "#1a1a2e", lineHeight: 1 }}>★</span> },
                  { n: "France", pip: <span style={{ fontSize: 13, color: "#1a2a0a", lineHeight: 1 }}>⚜</span> },
                  { n: "Spain",  pip: <div className="w-3 h-3 shrink-0 rotate-45 rounded-[1px]" style={{ backgroundImage: "linear-gradient(135deg, #AA151B 25%, #F1BF00 25%, #F1BF00 75%, #AA151B 75%)" }} /> },
                ].map(({ n, pip }) => (
                  <div key={n} className="flex items-center gap-3 pl-9 pr-4 py-2" style={{ background: "#f4edd8" }}>
                    <div className="w-5 flex items-center justify-center shrink-0">{pip}</div>
                    <span className="font-garamond text-sm flex-1" style={{ color: "#5a4a30" }}>{n}</span>
                    <span className="font-mono text-[10px] tracking-wide uppercase" style={{ color: "#a89060" }}>country</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <GenreAssociations />
    </>
  );
}
