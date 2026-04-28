"use client";

import { useMemo, useState } from "react";
import {
  GENRE_THEMES,
  SUBGENRES,
  WHEEL_GENRES,
  genreIntensityColor,
  genreIntensityIn,
  genreIntensityOut,
  type GenreName,
  type Intensity,
  type NonMainstreamGenreName,
} from "@/lib/genres";
import {
  R_EXPERIMENTAL_HARDCORE_LINE,
  R_POP_SOFT_LINE,
  R_SOFT_EXPERIMENTAL_LINE,
  WHEEL_CX,
  WHEEL_CY,
  WHEEL_RADIAL_DIVIDER_EXTRA,
  WHEEL_VIEWBOX_HEIGHT,
  WHEEL_VIEWBOX_Y_TRIM,
  WHEEL_VIEW_SIZE,
  wheelSubgenreRadius,
} from "@/lib/genre-wheel-geometry";
import { computeWheelSubgenrePlacements } from "@/lib/wheel-subgenre-layout";

type Node = {
  genre: GenreName;
  intensity: Intensity;
  colour: string;
  x: number;
  y: number;
};

type HoverState = {
  node: Node;
  subgenreLabel?: string;
  bridge?: {
    from: Node;
    to: Node;
  };
};

function polarToXY(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180;
  const x = cx + Math.cos(rad) * r;
  const y = cy + Math.sin(rad) * r;
  return { x: Number(x.toFixed(4)), y: Number(y.toFixed(4)) };
}

function annularSectorPath(
  cx: number,
  cy: number,
  innerR: number,
  outerR: number,
  startAngleDeg: number,
  endAngleDeg: number,
): string {
  const outerStart = polarToXY(cx, cy, outerR, startAngleDeg);
  const outerEnd = polarToXY(cx, cy, outerR, endAngleDeg);
  const innerEnd = polarToXY(cx, cy, innerR, endAngleDeg);
  const innerStart = polarToXY(cx, cy, innerR, startAngleDeg);
  const span = ((endAngleDeg - startAngleDeg) % 360 + 360) % 360;
  const largeArc = span > 180 ? 1 : 0;
  if (innerR <= 0) {
    return [
      `M ${cx} ${cy}`,
      `L ${outerStart.x} ${outerStart.y}`,
      `A ${outerR} ${outerR} 0 ${largeArc} 1 ${outerEnd.x} ${outerEnd.y}`,
      "Z",
    ].join(" ");
  }
  return [
    `M ${outerStart.x} ${outerStart.y}`,
    `A ${outerR} ${outerR} 0 ${largeArc} 1 ${outerEnd.x} ${outerEnd.y}`,
    `L ${innerEnd.x} ${innerEnd.y}`,
    `A ${innerR} ${innerR} 0 ${largeArc} 0 ${innerStart.x} ${innerStart.y}`,
    "Z",
  ].join(" ");
}

function isSameNode(
  a: { genre: GenreName; intensity: Intensity },
  b: { genre: GenreName; intensity: Intensity },
) {
  return a.genre === b.genre && a.intensity === b.intensity;
}

function circleRadiusForNode(n: { genre: GenreName }) {
  return n.genre === "Mainstream" ? 24 : 16;
}

function lineToCircleEdge(
  from: { genre: GenreName; x: number; y: number },
  to: { genre: GenreName; x: number; y: number },
) {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const d = Math.hypot(dx, dy) || 1;
  const ux = dx / d;
  const uy = dy / d;
  const rFrom = circleRadiusForNode(from);
  const rTo = circleRadiusForNode(to);
  return {
    x1: from.x + ux * rFrom,
    y1: from.y + uy * rFrom,
    x2: to.x - ux * rTo,
    y2: to.y - uy * rTo,
  };
}

function labelNode(n: { genre: GenreName; intensity: Intensity }) {
  return `${n.genre} (${n.intensity})`;
}

function colourForNode(n: { genre: GenreName; intensity: Intensity }) {
  return n.genre === "Mainstream"
    ? GENRE_THEMES.Mainstream.border
    : genreIntensityColor(n.genre as NonMainstreamGenreName, n.intensity);
}

export default function GenreTransitionsWheel() {
  const [hovered, setHovered] = useState<HoverState | null>(null);
  const subgenrePlacement = useMemo(
    () => computeWheelSubgenrePlacements(SUBGENRES),
    [],
  );

  const data = useMemo(() => {
    const intensityLevels: Intensity[] = [
      "pop",
      "soft",
      "experimental",
      "hardcore",
    ];
    const pointFor = (genre: GenreName, intensity: Intensity) => {
      if (genre === "Mainstream") return { x: WHEEL_CX, y: WHEEL_CY };
      const idx = WHEEL_GENRES.findIndex((g) => g.n === genre);
      const angle = (idx / WHEEL_GENRES.length) * 360 - 90;
      return polarToXY(WHEEL_CX, WHEEL_CY, wheelSubgenreRadius(intensity), angle);
    };

    const nodes: Node[] = [
      {
        genre: "Mainstream",
        intensity: "pop",
        colour: GENRE_THEMES.Mainstream.border,
        x: WHEEL_CX,
        y: WHEEL_CY,
      },
      ...WHEEL_GENRES.flatMap((g) =>
        intensityLevels.map((intensity) => ({
          genre: g.n,
          intensity,
          colour: genreIntensityColor(g.n as NonMainstreamGenreName, intensity),
          ...pointFor(g.n, intensity),
        })),
      ),
    ];

    const byKey: Record<string, Node> = Object.fromEntries(
      nodes.map((n) => [`${n.genre}|${n.intensity}`, n]),
    );

    const subgenreNodes = SUBGENRES.filter(
      (s) => s.kind === "genre" && Boolean(s.influence),
    )
      .map((s) => {
        const placement = subgenrePlacement.get(s.n);
        if (!placement) return null;
        const r = wheelSubgenreRadius(s.intensity) + placement.rOffset;
        const pos = polarToXY(WHEEL_CX, WHEEL_CY, r, placement.angleDeg);
        const node = byKey[`${s.parentA}|${s.intensity}`];
        const influenceNode = s.influence
          ? byKey[`${s.influence.genre}|${s.influence.intensity}`]
          : null;
        if (!node || !influenceNode) return null;
        return {
          label: s.n,
          x: pos.x,
          y: pos.y,
          node,
          influenceNode,
          colour: node.colour,
        };
      })
      .filter((s): s is NonNullable<typeof s> => s !== null);

    return { byKey, subgenreNodes };
  }, [subgenrePlacement]);

  const hoveredNode = hovered?.node ?? null;
  const hoveredOut = hoveredNode ? genreIntensityOut(hoveredNode) : [];
  const hoveredIn = hoveredNode ? genreIntensityIn(hoveredNode) : [];

  const outLinks = hovered?.bridge
    ? [hovered.bridge]
    : hoveredNode
      ? hoveredOut
        .map((to) => {
          const toNode = data.byKey[`${to.genre}|${to.intensity}`];
          if (!toNode || isSameNode(hoveredNode, toNode)) return null;
          return { from: hoveredNode, to: toNode };
        })
        .filter((l): l is NonNullable<typeof l> => l !== null)
      : [];

  const inLinks = hovered?.bridge
    ? [{ from: hovered.bridge.to, to: hovered.bridge.from }]
    : hoveredNode
      ? hoveredIn
        .map((from) => {
          const fromNode = data.byKey[`${from.genre}|${from.intensity}`];
          if (!fromNode || isSameNode(hoveredNode, fromNode)) return null;
          return { from: fromNode, to: hoveredNode };
        })
        .filter((l): l is NonNullable<typeof l> => l !== null)
      : [];

  const wheelSlice = 360 / WHEEL_GENRES.length;
  const intensityBands: Array<{
    intensity: Intensity;
    inner: number;
    outer: number;
    opacity: number;
  }> = [
    { intensity: "pop", inner: 0, outer: R_POP_SOFT_LINE, opacity: 0.2 },
    {
      intensity: "soft",
      inner: R_POP_SOFT_LINE,
      outer: R_SOFT_EXPERIMENTAL_LINE,
      opacity: 0.2,
    },
    {
      intensity: "experimental",
      inner: R_SOFT_EXPERIMENTAL_LINE,
      outer: R_EXPERIMENTAL_HARDCORE_LINE,
      opacity: 0.18,
    },
    {
      intensity: "hardcore",
      inner: R_EXPERIMENTAL_HARDCORE_LINE,
      outer: R_EXPERIMENTAL_HARDCORE_LINE + WHEEL_RADIAL_DIVIDER_EXTRA,
      opacity: 0.16,
    },
  ];

  return (
    <div className="flex flex-col xl:flex-row items-start justify-center gap-6 w-full">
      <svg
        width="100%"
        height="100%"
        viewBox={`0 ${WHEEL_VIEWBOX_Y_TRIM} ${WHEEL_VIEW_SIZE} ${WHEEL_VIEWBOX_HEIGHT}`}
        className="w-full h-auto max-w-[1200px] shrink-0 overflow-visible"
      >
        <defs>
          <marker
            id="genre-transition-arrow-out"
            markerWidth="10"
            markerHeight="10"
            refX="8"
            refY="5"
            orient="auto"
          >
            <path d="M0,0 L10,5 L0,10 Z" fill="rgba(34,197,94,.95)" />
          </marker>
          <marker
            id="genre-transition-arrow-in"
            markerWidth="10"
            markerHeight="10"
            refX="8"
            refY="5"
            orient="auto"
          >
            <path d="M0,0 L10,5 L0,10 Z" fill="rgba(59,130,246,.95)" />
          </marker>
        </defs>

        {WHEEL_GENRES.flatMap((g, i) => {
          const start = i * wheelSlice - 90 - wheelSlice / 2;
          const end = i * wheelSlice - 90 + wheelSlice / 2;
          return intensityBands.map((band) => {
            const isHovered =
              hoveredNode != null &&
              hoveredNode.genre === g.n &&
              hoveredNode.intensity === band.intensity;
            return (
              <path
                key={`${g.n}-${band.intensity}`}
                d={annularSectorPath(
                  WHEEL_CX,
                  WHEEL_CY,
                  band.inner,
                  band.outer,
                  start,
                  end,
                )}
                fill={genreIntensityColor(
                  g.n as NonMainstreamGenreName,
                  band.intensity,
                )}
                fillOpacity={isHovered ? 0.42 : band.opacity}
                style={{ cursor: "pointer" }}
                onMouseEnter={() => {
                  const node = data.byKey[`${g.n}|${band.intensity}`];
                  if (node) setHovered({ node });
                }}
                onMouseLeave={() => setHovered(null)}
              />
            );
          });
        })}

        <circle
          cx={WHEEL_CX}
          cy={WHEEL_CY}
          r={Math.round(R_POP_SOFT_LINE * 0.35)}
          fill={GENRE_THEMES.Mainstream.border}
          fillOpacity={hoveredNode?.genre === "Mainstream" ? 1 : 0.9}
          style={{ cursor: "pointer" }}
          onMouseEnter={() => {
            const node = data.byKey["Mainstream|pop"];
            if (node) setHovered({ node });
          }}
          onMouseLeave={() => setHovered(null)}
        />

        {[R_POP_SOFT_LINE, R_SOFT_EXPERIMENTAL_LINE, R_EXPERIMENTAL_HARDCORE_LINE].map(
          (r) => (
            <circle
              key={`genre-transition-ring-${r}`}
              cx={WHEEL_CX}
              cy={WHEEL_CY}
              r={r}
              fill="none"
              stroke="rgba(255,255,255,.12)"
              strokeDasharray="4 6"
            />
          ),
        )}
        {WHEEL_GENRES.map((_, i) => {
          const angle = ((i + 0.5) / WHEEL_GENRES.length) * 360 - 90;
          const inner = polarToXY(WHEEL_CX, WHEEL_CY, 0, angle);
          const outer = polarToXY(
            WHEEL_CX,
            WHEEL_CY,
            R_EXPERIMENTAL_HARDCORE_LINE + WHEEL_RADIAL_DIVIDER_EXTRA,
            angle,
          );
          return (
            <line
              key={i}
              x1={inner.x}
              y1={inner.y}
              x2={outer.x}
              y2={outer.y}
              stroke="rgba(255, 255, 255, 0.22)"
              strokeWidth={1}
            />
          );
        })}

        {outLinks.map((l, i) => {
          const edge = lineToCircleEdge(l.from, l.to);
          return (
            <line
              key={`out-link-${i}`}
              x1={edge.x1}
              y1={edge.y1}
              x2={edge.x2}
              y2={edge.y2}
              stroke="rgba(255,255,255,.52)"
              strokeWidth={2.4}
              markerEnd="url(#genre-transition-arrow-out)"
            />
          );
        })}
        {inLinks.map((l, i) => {
          const edge = lineToCircleEdge(l.from, l.to);
          return (
            <line
              key={`in-link-${i}`}
              x1={edge.x1}
              y1={edge.y1}
              x2={edge.x2}
              y2={edge.y2}
              stroke="rgba(255,255,255,.42)"
              strokeWidth={2.2}
              markerEnd="url(#genre-transition-arrow-in)"
            />
          );
        })}

        {Object.values(data.byKey).map((n) => (
          <circle
            key={`node-${n.genre}-${n.intensity}`}
            cx={n.x}
            cy={n.y}
            r={circleRadiusForNode(n)}
            fill={n.colour}
            stroke="rgba(255,255,255,.45)"
            strokeWidth={hoveredNode && isSameNode(hoveredNode, n) ? 2.6 : 1.6}
            style={{ cursor: "pointer" }}
            onMouseEnter={() => setHovered({ node: n })}
            onMouseLeave={() => setHovered(null)}
          />
        ))}
        {data.subgenreNodes.map((s) => (
          <circle
            key={`subgenre-${s.label}`}
            cx={s.x}
            cy={s.y}
            r={8}
            fill={s.colour}
            stroke="rgba(255,255,255,.55)"
            strokeWidth={1.2}
            style={{ cursor: "pointer" }}
            onMouseEnter={() =>
              setHovered({
                node: s.node,
                subgenreLabel: s.label,
                bridge: { from: s.node, to: s.influenceNode },
              })
            }
            onMouseLeave={() => setHovered(null)}
          />
        ))}
      </svg>

      <aside className="xl:sticky xl:top-24 w-full xl:w-[560px] h-[720px] rounded border border-ui-border/80 px-4 py-3 bg-[#12121a]/70 overflow-y-auto">
        {hoveredNode ? (
          <>
            {hovered?.subgenreLabel ? (
              <div className="font-mono text-[15px] text-muted uppercase tracking-[0.08em] mb-1">
                Subgenre: {hovered.subgenreLabel}
              </div>
            ) : null}
            <div
              className="font-mono text-[20px] uppercase tracking-[0.08em]"
              style={{ color: hoveredNode.colour }}
            >
              {hoveredNode.genre} · {hoveredNode.intensity}
            </div>
            <div className="font-mono text-[18px] mt-2">Out:</div>
            <ul className="m-0 mt-1 pl-6 list-disc">
              {hoveredOut.map((n) => (
                <li
                  key={`out-${n.genre}-${n.intensity}`}
                  className="font-mono text-[18px]"
                  style={{ color: colourForNode(n) }}
                >
                  {labelNode(n)}
                </li>
              ))}
            </ul>
            <div className="font-mono text-[18px] mt-2">In:</div>
            <ul className="m-0 mt-1 pl-6 list-disc">
              {hoveredIn.map((n) => (
                <li
                  key={`in-${n.genre}-${n.intensity}`}
                  className="font-mono text-[18px]"
                  style={{ color: colourForNode(n) }}
                >
                  {labelNode(n)}
                </li>
              ))}
            </ul>
          </>
        ) : (
          <div className="font-mono text-[18px] text-muted">
            Hover a genre/intensity sector or a subgenre dot to display transition
            arrows.
          </div>
        )}
      </aside>
    </div>
  );
}
