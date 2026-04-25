import { GENRE_THEMES } from "@/lib/genres";

const GENRE_COLOR: Record<string, string> = Object.fromEntries(
  Object.entries(GENRE_THEMES).map(([name, theme]) => [name, theme.border]),
);

type Row = {
  genre: string;
  strengths: string[];
  weaknesses: string[];
  affinities: string[];
  advantageVs: string[];
  weakVs: string[];
};

const ROWS: Row[] = [
  {
    genre: "Mainstream",
    strengths: ["Early (low cost)"],
    weaknesses: ["Low power"],
    affinities: [
      "Rock",
      "Electronic",
      "Hip-Hop",
      "Disco/Funk",
      "Reggae/Dub",
      "Classical",
      "Vintage",
    ],
    advantageVs: [],
    weakVs: [],
  },
  {
    genre: "Rock",
    strengths: ["High attack", "Crowd energy", "Versatile tempo"],
    weaknesses: ["Low subtlety", "Weak in solo play"],
    affinities: ["Metal", "Vintage"],
    advantageVs: ["Classical", "Reggae/Dub"],
    weakVs: ["Disco/Funk", "Vintage"],
  },
  {
    genre: "Electronic",
    strengths: ["Precision timing", "Layer stacking", "Range control"],
    weaknesses: ["Low warmth", "Fragile live feel"],
    affinities: ["Hip-Hop", "Disco/Funk"],
    advantageVs: ["Vintage", "Classical"],
    weakVs: ["Hip-Hop", "Metal"],
  },
  {
    genre: "Hip-Hop",
    strengths: ["Rhythm dominance", "Sample leverage", "Cultural reach"],
    weaknesses: ["Narrow tonal range", "Low melodic depth"],
    affinities: ["Electronic", "Disco/Funk"],
    advantageVs: ["Classical", "Metal"],
    weakVs: ["Classical", "Vintage"],
  },
  {
    genre: "Disco/Funk",
    strengths: ["Groove power", "Combo chaining", "Dance multiplier"],
    weaknesses: ["Low aggression", "Era-locked feel"],
    affinities: ["Hip-Hop", "Electronic"],
    advantageVs: ["Metal", "Rock"],
    weakVs: ["Classical", "Metal"],
  },
  {
    genre: "Reggae/Dub",
    strengths: ["Tempo control", "Defence bonus", "Vibration depth"],
    weaknesses: ["Low burst damage", "Slow build"],
    affinities: ["Vintage", "Disco/Funk"],
    advantageVs: ["Rock", "Metal"],
    weakVs: ["Electronic", "Classical"],
  },
  {
    genre: "Classical",
    strengths: ["Harmonic complexity", "Sustained power", "Prestige bonus"],
    weaknesses: ["Slow ramp", "Low crowd energy"],
    affinities: ["Vintage", "Electronic"],
    advantageVs: ["Hip-Hop", "Disco/Funk"],
    weakVs: ["Rock", "Electronic"],
  },
  {
    genre: "Vintage",
    strengths: ["Nostalgia bonus", "Wide affinity pool", "Authenticity"],
    weaknesses: ["Low tech ceiling", "Era vulnerability"],
    affinities: ["Rock", "Classical", "Reggae/Dub"],
    advantageVs: ["Electronic", "Hip-Hop"],
    weakVs: ["Rock", "Metal"],
  },
];

function Pill({ label, color }: { label: string; color: string }) {
  return (
    <span
      className="inline-block font-mono  tracking-[1px] px-2 py-0.5 rounded-[3px] mr-1 mb-1 whitespace-nowrap"
      style={{
        background: `${color}22`,
        color,
        border: `1px solid ${color}44`,
      }}
    >
      {label}
    </span>
  );
}

export default function GenreAssociations() {
  return (
    <div id="associations" className="w-full max-w-[1000px] mx-auto px-6 pb-14">
      <div className="font-mono tracking-[2px] text-muted uppercase mb-2">
        Associations
      </div>
      <p className="font-garamond italic text-muted leading-[1.5] mb-6 max-w-[600px]">
        Each genre carries inherent strengths, weaknesses, natural affinities,
        and the genres it tends to counter.
      </p>

      <div className="overflow-x-auto">
        <div className="border border-ui-border rounded-[6px] overflow-hidden min-w-[980px]">
          <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-ui-border bg-white/[0.02]">
              {[
                "Genre",
                "Strengths",
                "Weaknesses",
                "Affinities",
                "Advantage vs",
                "Weak vs",
              ].map((h) => (
                <th
                  key={h}
                  className="text-left font-mono text-[13px] tracking-[2px] uppercase text-muted px-4 py-3"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row, i) => {
              const color = GENRE_COLOR[row.genre] ?? "#888";
              return (
                <tr
                  key={row.genre}
                  className="border-b border-ui-border last:border-0"
                  style={{
                    background:
                      i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.01)",
                  }}
                >
                  <td className="px-4 py-3 align-top">
                    <span className="flex items-center gap-2 whitespace-nowrap">
                      <span
                        className="inline-block w-2 h-2 rounded-full shrink-0"
                        style={{ background: color }}
                      />
                      <span className="font-mono text-[11px] tracking-[1px] font-semibold text-white/90">
                        {row.genre.toUpperCase()}
                      </span>
                    </span>
                  </td>
                  <td className="px-4 py-3 align-top">
                    <ul className="m-0 p-0 list-none space-y-0.5">
                      {row.strengths.map((s) => (
                        <li
                          key={s}
                          className="font-garamond italic text-white/70 leading-snug"
                        >
                          {s}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="px-4 py-3 align-top">
                    <ul className="m-0 p-0 list-none space-y-0.5">
                      {row.weaknesses.map((w) => (
                        <li
                          key={w}
                          className="font-garamond italic text-white/40 leading-snug"
                        >
                          {w}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="px-4 py-3 align-top">
                    <div className="flex flex-wrap">
                      {row.affinities.map((a) => (
                        <Pill
                          key={a}
                          label={a}
                          color={GENRE_COLOR[a] ?? "#888"}
                        />
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 align-top">
                    <div className="flex flex-wrap">
                      {row.advantageVs.map((a) => (
                        <Pill
                          key={a}
                          label={a}
                          color={GENRE_COLOR[a] ?? "#888"}
                        />
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 align-top">
                    <div className="flex flex-wrap">
                      {row.weakVs.map((w) => (
                        <Pill
                          key={w}
                          label={w}
                          color={GENRE_COLOR[w] ?? "#888"}
                        />
                      ))}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
