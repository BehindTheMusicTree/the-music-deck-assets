"use client";

import { useMemo, useState } from "react";
import {
  GENRE_NAMES,
  GENRE_THEMES,
  genreIntensityColor,
  type Intensity,
} from "@/lib/genres";

type ArtworksTabId = "format" | "dominant-colour" | "style" | "mix" | "prompt";

const ARTWORK_TABS: { id: ArtworksTabId; label: string }[] = [
  { id: "format", label: "1. Format" },
  { id: "dominant-colour", label: "2. Dominant colour" },
  { id: "style", label: "3. Style" },
  { id: "mix", label: "4. Mixed influences" },
  { id: "prompt", label: "5. Prompt examples" },
];

const INTENSITIES: Intensity[] = ["pop", "soft", "experimental", "hardcore"];

const GENRE_STYLE_GUIDE: {
  genre: string;
  style: string;
  notes: string;
}[] = [
  {
    genre: "Mainstream (Pop)",
    style: "Heroic fantasy illustration",
    notes: "Grand silhouettes, uplifting light beams, mythic composition.",
  },
  {
    genre: "Rock",
    style: "Gritty stage realism with painterly grain",
    notes:
      "Raw concert energy, dramatic contrast, tactile texture, grounded atmosphere.",
  },
  {
    genre: "Hip-Hop",
    style: "Early-2000s cel-shaded street mural aesthetic",
    notes:
      "Thick ink outlines, bold urban perspective, stylised heat and attitude.",
  },
  {
    genre: "Disco/Funk",
    style: "Neon beachfront nightlife poster aesthetic",
    notes:
      "Warm neon haze, chrome reflections, palm silhouettes, dance-floor motion.",
  },
  {
    genre: "Reggae/Dub",
    style: "Caribbean vintage poster style",
    notes:
      "Warm faded colours, soft grain, retro paper texture, vertical composition.",
  },
  {
    genre: "Vintage",
    style: "Old photographs",
    notes:
      "Aged tones, soft blur, subtle scratches and film response; documentary mood.",
  },
  {
    genre: "Electronic",
    style: "Futurist techno-ritual concept art",
    notes:
      "Geometric light structures, controlled abstraction, high-contrast synthetic glow.",
  },
  {
    genre: "Classical",
    style: "Epic paintings",
    notes:
      "Orchestral grandeur, dramatic sky-lighting, monumental framing and symbolism.",
  },
];

const PROMPT_EXAMPLES: {
  genre: string;
  intensity: Intensity;
  prompt: string;
}[] = [
  {
    genre: "Mainstream",
    intensity: "pop",
    prompt:
      "Heroic fantasy illustration, vertical 2:3. A radiant central performer rises above a cheering crowd under golden-white light, cinematic symmetry, uplifting emotion, no text or logos.",
  },
  {
    genre: "Rock",
    intensity: "soft",
    prompt:
      "Gritty stage realism with painterly grain, vertical 2:3. A lone guitarist under warm amber sidelights, smoky depth, worn textures, emotionally restrained power, no text or logos.",
  },
  {
    genre: "Electronic",
    intensity: "experimental",
    prompt:
      "Futurist techno-ritual concept art, vertical 2:3. Abstract performer silhouette inside geometric neon architecture, layered fog, synthetic reflections, controlled chaos, no text or logos.",
  },
  {
    genre: "Hip-Hop",
    intensity: "experimental",
    prompt:
      "Early-2000s cel-shaded street mural aesthetic, vertical 2:3. Anonymous rapper silhouette in a tilted city canyon, bold outlines, vivid shadows, urban tension, no text or logos.",
  },
  {
    genre: "Disco/Funk",
    intensity: "pop",
    prompt:
      "Neon beachfront nightlife poster aesthetic, vertical 2:3. Dance silhouettes under warm magenta-cyan lights, chrome highlights, retro exuberance, no text or logos.",
  },
  {
    genre: "Reggae/Dub",
    intensity: "soft",
    prompt:
      "Caribbean vintage poster style, warm faded colours, soft grain, retro paper texture, vertical 2:3. Anonymous singer near coastal architecture and drifting haze, no text or logos.",
  },
  {
    genre: "Vintage",
    intensity: "soft",
    prompt:
      "Old-photograph style, vertical 2:3. Anonymous quartet in a dim jazz room, subtle film wear, desaturated palette, nostalgic stillness, no text or logos.",
  },
  {
    genre: "Classical",
    intensity: "hardcore",
    prompt:
      "Epic painting style, vertical 2:3. Monumental orchestra silhouettes in storm-lit architecture, deep chiaroscuro, sacred grandeur, no text or logos.",
  },
];

function intensityColourRow(genre: string, intensity: Intensity): string {
  if (genre === "Mainstream") return GENRE_THEMES.Mainstream.border;
  return genreIntensityColor(genre, intensity);
}

export default function CardsArtworksSection() {
  const [activeTab, setActiveTab] = useState<ArtworksTabId>("format");

  const dominantColourByGenre = useMemo(
    () =>
      GENRE_NAMES.map((genre) => {
        const intensities = genre === "Mainstream" ? (["pop"] as const) : INTENSITIES;
        return {
          genre,
          entries: intensities.map((intensity) => ({
            intensity,
            colour: intensityColourRow(genre, intensity),
          })),
        };
      }),
    [],
  );

  const dominantColourWheel = useMemo(() => {
    const outer = dominantColourByGenre.filter((g) => g.genre !== "Mainstream");
    const cx = 210;
    const cy = 210;
    const labelR = 190;
    return outer.map((g, i) => {
      const angleDeg = -90 + (i * 360) / outer.length;
      const angle = (angleDeg * Math.PI) / 180;
      return {
        ...g,
        angleDeg,
        x: cx + labelR * Math.cos(angle),
        y: cy + labelR * Math.sin(angle),
      };
    });
  }, [dominantColourByGenre]);

  return (
    <div className="rounded-[6px] border border-ui-border bg-[#0f0f14]/35 px-5 py-4">
      <nav
        className="flex gap-0 -mx-1 overflow-x-auto [&::-webkit-scrollbar]:h-0 border-b border-ui-border mb-6"
        aria-label="Artwork guidance sections"
      >
        {ARTWORK_TABS.map((tab) => {
          const on = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              className={[
                "whitespace-nowrap font-mono text-[11px] sm:text-[12px] tracking-[0.12em] px-3 py-2 border-b-2 -mb-px",
                on
                  ? "text-gold border-gold"
                  : "text-muted border-transparent hover:text-white",
              ].join(" ")}
              onClick={() => setActiveTab(tab.id)}
              aria-current={on ? "page" : undefined}
            >
              {tab.label}
            </button>
          );
        })}
      </nav>

      {activeTab === "format" ? (
        <section>
          <div className="section-label-accent mb-2">Artwork format</div>
          <ul className="font-garamond text-sm text-muted leading-[1.8] pl-5 list-disc">
            <li>Master format: vertical 2:3.</li>
            <li>
              Lower ~60% is usually covered by UI: place key elements in the upper
              third.
            </li>
            <li>No text, logos, or signatures in final artwork.</li>
            <li>
              Keep faces anonymised unless rights are explicitly cleared for
              recognisable likeness.
            </li>
          </ul>
        </section>
      ) : null}

      {activeTab === "dominant-colour" ? (
        <section>
          <div className="section-label-accent mb-2">Dominant colour system</div>
          <p className="font-garamond text-sm text-muted mb-4">
            Dominant colour comes from genre + intensity. Country-native subgenre
            cards follow country/region visual identity instead of this wheel.
          </p>
          <div className="flex justify-center">
            <svg
              width={440}
              height={440}
              viewBox="0 0 440 440"
              className="overflow-visible"
            >
              <circle cx={220} cy={220} r={84} fill="none" stroke="rgba(255,255,255,.16)" strokeDasharray="4 6" />
              <circle cx={220} cy={220} r={116} fill="none" stroke="rgba(255,255,255,.16)" strokeDasharray="4 6" />
              <circle cx={220} cy={220} r={148} fill="none" stroke="rgba(255,255,255,.16)" strokeDasharray="4 6" />
              <circle cx={220} cy={220} r={180} fill="none" stroke="rgba(255,255,255,.16)" strokeDasharray="4 6" />

              {dominantColourWheel.map((g) => {
                const rad = (g.angleDeg * Math.PI) / 180;
                const rayX = 220 + 180 * Math.cos(rad);
                const rayY = 220 + 180 * Math.sin(rad);
                return (
                  <g key={g.genre}>
                    <line
                      x1={220}
                      y1={220}
                      x2={rayX}
                      y2={rayY}
                      stroke="rgba(255,255,255,.22)"
                      strokeWidth={1}
                    />
                    {g.entries.map((entry) => {
                      const radius =
                        entry.intensity === "pop"
                          ? 84
                          : entry.intensity === "soft"
                            ? 116
                            : entry.intensity === "experimental"
                              ? 148
                              : 180;
                      const x = 220 + radius * Math.cos(rad);
                      const y = 220 + radius * Math.sin(rad);
                      return (
                        <circle
                          key={`${g.genre}-${entry.intensity}`}
                          cx={x}
                          cy={y}
                          r={6}
                          fill={entry.colour}
                          stroke="rgba(255,255,255,.25)"
                          strokeWidth={1}
                        >
                          <title>{`${g.genre} · ${entry.intensity}: ${entry.colour}`}</title>
                        </circle>
                      );
                    })}
                    <text
                      x={g.x}
                      y={g.y}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="font-mono text-[10px] tracking-[0.08em] fill-white/65"
                    >
                      {g.genre}
                    </text>
                  </g>
                );
              })}

              <circle
                cx={220}
                cy={220}
                r={26}
                fill={GENRE_THEMES.Mainstream.border}
                stroke="rgba(255,255,255,.25)"
                strokeWidth={1.5}
              >
                <title>{`Mainstream · pop: ${GENRE_THEMES.Mainstream.border}`}</title>
              </circle>
              <text
                x={220}
                y={220}
                textAnchor="middle"
                dominantBaseline="middle"
                className="font-cinzel text-[10px] tracking-[0.08em] fill-black/70"
              >
                Mainstream
              </text>
            </svg>
          </div>
        </section>
      ) : null}

      {activeTab === "style" ? (
        <section>
          <div className="section-label-accent mb-2">Genre style guide</div>
          <div className="flex flex-col gap-3">
            {GENRE_STYLE_GUIDE.map((row) => (
              <div
                key={row.genre}
                className="rounded border border-ui-border/70 bg-[#12121a]/45 px-4 py-3"
              >
                <div className="font-cinzel text-[13px] tracking-widest text-gold">
                  {row.genre}
                </div>
                <div className="font-garamond text-sm text-white/90 mt-1">
                  {row.style}
                </div>
                <div className="font-garamond text-[13px] text-muted mt-1">
                  {row.notes}
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {activeTab === "mix" ? (
        <section>
          <div className="section-label-accent mb-2">Mixed influences</div>
          <p className="font-garamond text-sm text-muted leading-[1.8] mb-3">
            Subgenres with influence metadata should blend both parent identities
            in one coherent visual system.
          </p>
          <p className="font-garamond text-sm text-muted leading-[1.8]">
            Example: <span className="text-white/90">Nu Metal</span> keeps Rock
            hardcore as primary anchor (palette, texture, aggression), then adds
            Hip-Hop hardcore cues (rhythmic graphic language, urban forms,
            silhouette attitude).
          </p>
        </section>
      ) : null}

      {activeTab === "prompt" ? (
        <section>
          <div className="section-label-accent mb-2">Prompt examples</div>
          <div className="flex flex-col gap-3">
            {PROMPT_EXAMPLES.map((row) => (
              <div
                key={`${row.genre}-${row.intensity}`}
                className="rounded border border-ui-border/70 bg-[#12121a]/45 px-4 py-3"
              >
                <div className="font-mono text-[11px] tracking-[0.12em] text-gold uppercase mb-1">
                  {row.genre} · {row.intensity}
                </div>
                <div className="font-garamond text-sm text-white/90 leading-[1.7]">
                  {row.prompt}
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
