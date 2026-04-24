"use client";

const GENRES = [
  { n: "Reggae/Dub", h: "#3a9030" },
  { n: "Electronic", h: "#2850c8" },
  { n: "Disco/Funk", h: "#c0387a" },
  { n: "Hip-hop", h: "#ffd700" },
  { n: "Rock", h: "#d01828" },
  { n: "Classical", h: "#5c2a0a" },
  { n: "Vintage", h: "#787878" },
];

const CX = 620,
  CY = 620,
  R_POP_SUBGENRES = 130,
  R_POPPY_SUBGENRES = 230,
  R_POP_EXPERIMENTAL_LINE = 340,
  R_EXPERIMENTAL_SUBGENRES = 505,
  R_EXPERIMENTAL_HARDCORE_LINE = 620,
  R_HARDCORE_SUBGENRES = 720;

function repeat(str: string, times: number) {
  return Array(times).fill(str).join(" · ") + " ·";
}

function polarToXY(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: cx + Math.cos(rad) * r, y: cy + Math.sin(rad) * r };
}

function Rect({
  x,
  y,
  label,
  hex,
  small,
}: {
  x: number;
  y: number;
  label: string;
  hex: string;
  small?: boolean;
}) {
  const w = small ? 120 : 160;
  const h = small ? 64 : 92;
  const fs = small ? 10.5 : 14;
  const fsh = small ? 8.5 : 11;
  const isDark = isLight(hex);
  const tc = isDark ? "rgba(10,10,10,.85)" : "rgba(255,255,255,.92)";
  const hc = isDark ? "rgba(10,10,10,.5)" : "rgba(255,255,255,.55)";
  return (
    <g
      transform={`translate(${x},${y})`}
      style={{ cursor: "pointer" }}
      onClick={() => navigator.clipboard.writeText(hex)}
    >
      <rect
        x={-w / 2}
        y={-h / 2}
        width={w}
        height={h}
        rx={4}
        fill={hex}
        filter={`drop-shadow(0 2px 8px ${hex}88)`}
      />
      <text
        x={0}
        y={-8}
        textAnchor="middle"
        fontFamily="Cinzel, serif"
        fontWeight={700}
        fontSize={fs}
        letterSpacing={1}
        fill={tc}
      >
        {label}
      </text>
      <text
        x={0}
        y={10}
        textAnchor="middle"
        fontFamily="Space Mono, monospace"
        fontSize={fsh}
        fill={hc}
      >
        {hex}
      </text>
    </g>
  );
}

function isLight(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 128;
}

export default function GenreWheel() {
  const popText = repeat("POP", 40);
  const expText = repeat("EXPERIMENTAL", 14);
  const exp2Text = repeat("EXPERIMENTAL", 24);
  const hardText = repeat("HARDCORE", 32);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 48,
        marginTop: 40,
      }}
    >
      <svg
        width={1240}
        height={1240}
        viewBox="0 0 1240 1240"
        style={{ overflow: "visible", maxWidth: "100%" }}
      >
        <defs>
          <path
            id="arc-pop"
            d={`M ${CX},${CY - (R_POP_EXPERIMENTAL_LINE - 30)} A ${R_POP_EXPERIMENTAL_LINE - 30},${R_POP_EXPERIMENTAL_LINE - 30} 0 1,1 ${CX - 0.1},${CY - (R_POP_EXPERIMENTAL_LINE - 30)}`}
          />
          <path
            id="arc-exp-outer-inner"
            d={`M ${CX},${CY - (R_POP_EXPERIMENTAL_LINE + 20)} A ${R_POP_EXPERIMENTAL_LINE + 20},${R_POP_EXPERIMENTAL_LINE + 20} 0 1,1 ${CX - 0.1},${CY - (R_POP_EXPERIMENTAL_LINE + 20)}`}
          />
          <path
            id="arc-exp-inner-outer"
            d={`M ${CX},${CY - (R_EXPERIMENTAL_HARDCORE_LINE - 30)} A ${R_EXPERIMENTAL_HARDCORE_LINE - 30},${R_EXPERIMENTAL_HARDCORE_LINE - 30} 0 1,1 ${CX - 0.1},${CY - (R_EXPERIMENTAL_HARDCORE_LINE - 30)}`}
          />
          <path
            id="arc-hard"
            d={`M ${CX},${CY - (R_EXPERIMENTAL_HARDCORE_LINE + 30)} A ${R_EXPERIMENTAL_HARDCORE_LINE + 30},${R_EXPERIMENTAL_HARDCORE_LINE + 30} 0 1,1 ${CX - 0.1},${CY - (R_EXPERIMENTAL_HARDCORE_LINE + 30)}`}
          />
        </defs>

        {/* Pop center */}
        <g
          style={{ cursor: "pointer" }}
          onClick={() => navigator.clipboard.writeText("#ffffff")}
        >
          <rect
            x={CX - 48}
            y={CY - 28}
            width={96}
            height={56}
            rx={4}
            fill="#ffffff"
          />
          <text
            x={CX}
            y={CY - 4}
            textAnchor="middle"
            fontFamily="Cinzel, serif"
            fontWeight={700}
            fontSize={9}
            letterSpacing={2}
            fill="#09080d"
          >
            POP
          </text>
          <text
            x={CX}
            y={CY + 10}
            textAnchor="middle"
            fontFamily="Space Mono, monospace"
            fontSize={6.5}
            fill="rgba(9,8,13,.5)"
          >
            #ffffff
          </text>
        </g>

        {/* Pop text — inside inner circle */}
        <circle
          cx={CX}
          cy={CY}
          r={R_POP_EXPERIMENTAL_LINE}
          fill="none"
          stroke="rgba(255,255,255,.14)"
          strokeWidth={1.5}
          strokeDasharray="4 6"
        />
        <text
          fontFamily="Cinzel, serif"
          fontSize={11}
          fill="rgba(255,255,255,.85)"
          letterSpacing={8}
        >
          <textPath href="#arc-pop" startOffset="0%" dy={16}>
            {popText}
          </textPath>
        </text>

        {/* Experimental text — just outside inner circle */}
        <text
          fontFamily="Cinzel, serif"
          fontSize={10}
          fill="rgba(255,255,255,.22)"
          letterSpacing={5}
        >
          <textPath href="#arc-exp-outer-inner" startOffset="0%" dy={16}>
            {expText}
          </textPath>
        </text>
        {/* Experimental text — just inside outer circle */}
        <text
          fontFamily="Cinzel, serif"
          fontSize={10}
          fill="rgba(255,255,255,.22)"
          letterSpacing={5}
        >
          <textPath href="#arc-exp-inner-outer" startOffset="0%" dy={-8}>
            {exp2Text}
          </textPath>
        </text>

        {/* Hardcore circle + text — outside outer circle */}
        <circle
          cx={CX}
          cy={CY}
          r={R_EXPERIMENTAL_HARDCORE_LINE}
          fill="none"
          stroke="rgba(255,255,255,.08)"
          strokeWidth={1.5}
          strokeDasharray="4 6"
        />
        <text
          fontFamily="Cinzel, serif"
          fontSize={10}
          fill="rgba(255,255,255,.15)"
          letterSpacing={5}
        >
          <textPath href="#arc-hard" startOffset="0%" dy={16}>
            {hardText}
          </textPath>
        </text>

        {/* Radial dividers between genre zones */}
        {GENRES.map((_, i) => {
          const angle = ((i + 0.5) / GENRES.length) * 360 - 90;
          const inner = polarToXY(CX, CY, 0, angle);
          const outer = polarToXY(CX, CY, R_EXPERIMENTAL_HARDCORE_LINE, angle);
          return (
            <line
              key={i}
              x1={inner.x}
              y1={inner.y}
              x2={outer.x}
              y2={outer.y}
              stroke="rgba(255,255,255,.18)"
              strokeWidth={1}
            />
          );
        })}

        {/* Base genres on pop/experimental line */}
        {GENRES.map((g, i) => {
          const angle = (i / GENRES.length) * 360 - 90;
          const { x, y } = polarToXY(CX, CY, R_POP_EXPERIMENTAL_LINE, angle);
          return <Rect key={g.n} x={x} y={y} label={g.n} hex={g.h} />;
        })}

        {/* Subgenres by intensity: pop / poppy / experimental / hardcore */}
        {[
          {
            n: "Electropop",
            h: "#e4ebff",
            parent: "Electronic",
            ring: "pop",
          },
          { n: "Disco", h: "#f0a0c0", parent: "Disco/Funk", ring: "poppy" },
          { n: "Disco Pop", h: "#ffd6e8", parent: "Disco/Funk", ring: "pop" },
          { n: "Pop Rock", h: "#f07080", parent: "Rock", ring: "poppy" },
          { n: "EDM", h: "#7090e8", parent: "Electronic", ring: "poppy" },
          { n: "R&B Soul", h: "#ffd060", parent: "Hip-hop", ring: "poppy" },
          { n: "R&B", h: "#ffe94d", parent: "Hip-hop", ring: "poppy" },
          { n: "Roots", h: "#5ab848", parent: "Reggae/Dub", ring: "poppy" },
          { n: "Metal", h: "#7a0810", parent: "Rock", ring: "experimental" },
          {
            n: "Nu Metal",
            h: "#c86010",
            parent: "Rock",
            angleDelta: -14,
            ring: "experimental",
          },
          {
            n: "Dub",
            h: "#28b870",
            parent: "Reggae/Dub",
            ring: "experimental",
          },
          {
            n: "Drum & Bass",
            h: "#3070c8",
            parent: "Electronic",
            ring: "experimental",
          },
          {
            n: "Jungle",
            h: "#288090",
            parentA: "Electronic",
            parentB: "Reggae/Dub",
            t: 0.34,
            ring: "experimental",
          },
          {
            n: "Techno",
            h: "#1a2e6a",
            parent: "Electronic",
            ring: "experimental",
          },
          {
            n: "House",
            h: "#4030a0",
            parentA: "Electronic",
            angleDelta: 12,
            ring: "experimental",
          },
          {
            n: "Jazz",
            h: "#7a5840",
            parent: "Vintage",
            ring: "experimental",
          },
          {
            n: "Soul",
            h: "#9a8f60",
            parent: "Vintage",
            angleDelta: 12,
            ring: "experimental",
          },
          {
            n: "Free Jazz",
            h: "#2a1a0e",
            parent: "Vintage",
            ring: "hardcore",
          },
          {
            n: "Psytrance",
            h: "#0b1f5a",
            parent: "Electronic",
            ring: "hardcore",
          },
        ].map((s) => {
          let angle: number;
          if (s.angleDelta !== undefined) {
            const anchor = s.parentA ?? s.parent;
            const idx = GENRES.findIndex((g) => g.n === anchor);
            angle = (idx / GENRES.length) * 360 - 90 + s.angleDelta;
          } else if (s.parentA && s.parentB) {
            const idxA = GENRES.findIndex((g) => g.n === s.parentA);
            const idxB = GENRES.findIndex((g) => g.n === s.parentB);
            const aA = (idxA / GENRES.length) * 360 - 90;
            const aB = (idxB / GENRES.length) * 360 - 90;
            angle = aA + (aB - aA) * (s.t ?? 0.5);
          } else {
            const idx = GENRES.findIndex((g) => g.n === s.parent);
            angle = (idx / GENRES.length) * 360 - 90;
          }
          const r =
            s.ring === "pop"
              ? R_POP_SUBGENRES
              : s.ring === "poppy"
                ? R_POPPY_SUBGENRES
                : s.ring === "hardcore"
                  ? R_HARDCORE_SUBGENRES
                  : R_EXPERIMENTAL_SUBGENRES;
          const { x, y } = polarToXY(CX, CY, r, angle);
          return <Rect key={s.n} x={x} y={y} label={s.n} hex={s.h} small />;
        })}
      </svg>
    </div>
  );
}
