const GENRE_COLOR: Record<string, string> = {
  Rock: "#d01828",
  Electronic: "#2850c8",
  "Hip-Hop": "#c8960a",
  "Disco/Funk": "#c86000",
  "Reggae/Dub": "#188000",
  Classical: "#8060a0",
  Vintage: "#906030",
  Metal: "#7a0810",
};

type Row = {
  genre: string;
  strengths: string[];
  weaknesses: string[];
  affinities: string[];
  counters: string[];
};

const ROWS: Row[] = [
  {
    genre: "Rock",
    strengths: ["High attack", "Crowd energy", "Versatile tempo"],
    weaknesses: ["Low subtlety", "Weak in solo play"],
    affinities: ["Metal", "Vintage"],
    counters: ["Classical", "Reggae/Dub"],
  },
  {
    genre: "Electronic",
    strengths: ["Precision timing", "Layer stacking", "Range control"],
    weaknesses: ["Low warmth", "Fragile live feel"],
    affinities: ["Hip-Hop", "Disco/Funk"],
    counters: ["Vintage", "Classical"],
  },
  {
    genre: "Hip-Hop",
    strengths: ["Rhythm dominance", "Sample leverage", "Cultural reach"],
    weaknesses: ["Narrow tonal range", "Low melodic depth"],
    affinities: ["Electronic", "Disco/Funk"],
    counters: ["Classical", "Metal"],
  },
  {
    genre: "Disco/Funk",
    strengths: ["Groove power", "Combo chaining", "Dance multiplier"],
    weaknesses: ["Low aggression", "Era-locked feel"],
    affinities: ["Hip-Hop", "Electronic"],
    counters: ["Metal", "Rock"],
  },
  {
    genre: "Reggae/Dub",
    strengths: ["Tempo control", "Defence bonus", "Vibration depth"],
    weaknesses: ["Low burst damage", "Slow build"],
    affinities: ["Vintage", "Disco/Funk"],
    counters: ["Rock", "Metal"],
  },
  {
    genre: "Classical",
    strengths: ["Harmonic complexity", "Sustained power", "Prestige bonus"],
    weaknesses: ["Slow ramp", "Low crowd energy"],
    affinities: ["Vintage", "Electronic"],
    counters: ["Hip-Hop", "Disco/Funk"],
  },
  {
    genre: "Vintage",
    strengths: ["Nostalgia bonus", "Wide affinity pool", "Authenticity"],
    weaknesses: ["Low tech ceiling", "Era vulnerability"],
    affinities: ["Rock", "Classical", "Reggae/Dub"],
    counters: ["Electronic", "Hip-Hop"],
  },
  {
    genre: "Metal",
    strengths: ["Max aggression", "Shred tempo", "Endurance"],
    weaknesses: ["Low crossover appeal", "Narrow combos"],
    affinities: ["Rock", "Electronic"],
    counters: ["Reggae/Dub", "Disco/Funk"],
  },
];

function Pill({ label, color }: { label: string; color: string }) {
  return (
    <span
      className="inline-block font-mono text-[10px] tracking-[1px] px-2 py-0.5 rounded-[3px] mr-1 mb-1 whitespace-nowrap"
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

      <div className="border border-ui-border rounded-[6px] overflow-hidden">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-ui-border bg-white/[0.02]">
              {[
                "Genre",
                "Strengths",
                "Weaknesses",
                "Affinities",
                "Counters",
              ].map((h) => (
                <th
                  key={h}
                  className="text-left font-mono text-[10px] tracking-[2px] uppercase text-muted px-4 py-3"
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
                    <span
                      className="font-mono text-[11px] tracking-[1px] font-semibold whitespace-nowrap"
                      style={{ color }}
                    >
                      {row.genre.toUpperCase()}
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
                      {row.counters.map((c) => (
                        <Pill key={c} label={c} color="#888" />
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
  );
}
