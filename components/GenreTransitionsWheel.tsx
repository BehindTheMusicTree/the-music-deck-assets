"use client";

import { useMemo, useState } from "react";
import {
  GENRE_NAMES,
  GENRE_THEMES,
  WHEEL_GENRES,
  genreIntensityColor,
  genreIntensityIn,
  genreIntensityOut,
  type GenreName,
  type Intensity,
  type NonMainstreamGenreName,
} from "@/lib/genres";

type Node = {
  genre: GenreName;
  intensity: Intensity;
  colour: string;
  x: number;
  y: number;
};

const TRANSITION_WHEEL_SCALE = 1.0;
const TRANSITION_WHEEL_BASE_CENTER = 630;
const TRANSITION_WHEEL_BASE_OUTER_LABEL_MARGIN = 26;
const TRANSITION_WHEEL_BASE_RING_RADIUS: Record<Intensity, number> = {
  pop: 225,
  soft: 330,
  experimental: 435,
  hardcore: 540,
};

function polarToXY(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180;
  const x = cx + Math.cos(rad) * r;
  const y = cy + Math.sin(rad) * r;
  return {
    x: Number(x.toFixed(4)),
    y: Number(y.toFixed(4)),
  };
}

function circleRadiusForNode(n: { genre: GenreName }): number {
  return n.genre === "Mainstream" ? 20 : 14;
}

function lineToCircleEdge(
  from: { genre: GenreName; x: number; y: number },
  to: { genre: GenreName; x: number; y: number },
): { x1: number; y1: number; x2: number; y2: number } {
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

function colourForNode(n: { genre: GenreName; intensity: Intensity }): string {
  return n.genre === "Mainstream"
    ? GENRE_THEMES.Mainstream.border
    : genreIntensityColor(n.genre as NonMainstreamGenreName, n.intensity);
}

function isSameNode(
  a: { genre: GenreName; intensity: Intensity },
  b: { genre: GenreName; intensity: Intensity },
): boolean {
  return a.genre === b.genre && a.intensity === b.intensity;
}

export default function GenreTransitionsWheel() {
  const [hovered, setHovered] = useState<Node | null>(null);

  const wheel = useMemo(() => {
    const cx = Math.round(
      TRANSITION_WHEEL_BASE_CENTER * TRANSITION_WHEEL_SCALE,
    );
    const cy = Math.round(
      TRANSITION_WHEEL_BASE_CENTER * TRANSITION_WHEEL_SCALE,
    );
    const ringRadius: Record<Intensity, number> = {
      pop: Math.round(
        TRANSITION_WHEEL_BASE_RING_RADIUS.pop * TRANSITION_WHEEL_SCALE,
      ),
      soft: Math.round(
        TRANSITION_WHEEL_BASE_RING_RADIUS.soft * TRANSITION_WHEEL_SCALE,
      ),
      experimental: Math.round(
        TRANSITION_WHEEL_BASE_RING_RADIUS.experimental * TRANSITION_WHEEL_SCALE,
      ),
      hardcore: Math.round(
        TRANSITION_WHEEL_BASE_RING_RADIUS.hardcore * TRANSITION_WHEEL_SCALE,
      ),
    };
    const outerLabelMargin = Math.round(
      TRANSITION_WHEEL_BASE_OUTER_LABEL_MARGIN * TRANSITION_WHEEL_SCALE,
    );
    const svgSize = Math.round((ringRadius.hardcore + outerLabelMargin + 64) * 2);
    const pointFor = (genre: GenreName, intensity: Intensity) => {
      if (genre === "Mainstream") return { x: cx, y: cy };
      const idx = WHEEL_GENRES.findIndex((g) => g.n === genre);
      const angle = (idx / WHEEL_GENRES.length) * 360 - 90;
      return polarToXY(cx, cy, ringRadius[intensity], angle);
    };
    const nodes: Node[] = GENRE_NAMES.flatMap((genre) => {
      const levels: Intensity[] =
        genre === "Mainstream"
          ? (["pop"] as const)
          : (["pop", "soft", "experimental", "hardcore"] as const);
      return levels.map((intensity) => ({
        genre,
        intensity,
        colour:
          genre === "Mainstream"
            ? GENRE_THEMES.Mainstream.border
            : genreIntensityColor(genre as NonMainstreamGenreName, intensity),
        ...pointFor(genre, intensity),
      }));
    });
    const links = nodes.flatMap((from) =>
      genreIntensityOut({
        genre: from.genre,
        intensity: from.intensity,
      }).map((to) => ({
        from,
        to: { ...to, ...pointFor(to.genre, to.intensity) },
        fanOut: from.genre === "Mainstream",
      })),
    );
    const mainstream = nodes.find(
      (n) => n.genre === "Mainstream" && n.intensity === "pop",
    );
    const mainstreamPopLinks =
      mainstream == null
        ? []
        : nodes
            .filter((n) => n.genre !== "Mainstream" && n.intensity === "pop")
            .map((n) => ({ from: mainstream, to: n }));
    const normalLinks = links.filter((l) => !l.fanOut);
    return {
      cx,
      cy,
      ringRadius,
      outerLabelMargin,
      svgSize,
      nodes,
      normalLinks,
      mainstreamPopLinks,
    };
  }, []);

  return (
    <div className="flex flex-col xl:flex-row items-start justify-center gap-6 w-full">
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${wheel.svgSize} ${wheel.svgSize}`}
        className="w-full h-auto max-w-[1200px] shrink-0"
      >
        <defs>
          <marker
            id="genre-transition-arrow"
            markerWidth="10"
            markerHeight="10"
            refX="8"
            refY="5"
            orient="auto"
          >
            <path d="M0,0 L10,5 L0,10 Z" fill="rgba(255,255,255,.75)" />
          </marker>
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
        {Object.values(wheel.ringRadius).map((r) => (
          <circle
            key={`genre-transition-ring-${r}`}
            cx={wheel.cx}
            cy={wheel.cy}
            r={r}
            fill="none"
            stroke="rgba(255,255,255,.12)"
            strokeDasharray="4 6"
          />
        ))}
        {(
          [
            ["pop", wheel.ringRadius.pop],
            ["soft", wheel.ringRadius.soft],
            ["experimental", wheel.ringRadius.experimental],
            ["hardcore", wheel.ringRadius.hardcore],
          ] as const
        ).map(([label, r]) => (
          <text
            key={`genre-transition-intensity-${label}`}
            x={wheel.cx + 10}
            y={wheel.cy - r + 12}
            className="font-mono text-[36px] uppercase tracking-[0.08em] fill-white/78"
          >
            {label}
          </text>
        ))}
        {WHEEL_GENRES.map((g, idx) => {
          const a = (idx / WHEEL_GENRES.length) * 360 - 90;
          const p = polarToXY(
            wheel.cx,
            wheel.cy,
            wheel.ringRadius.hardcore + wheel.outerLabelMargin,
            a,
          );
          return (
            <text
              key={`genre-transition-genre-${g.n}`}
              x={p.x}
              y={p.y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="font-mono text-[48px] tracking-[0.06em] fill-white/9"
            >
              {g.n}
            </text>
          );
        })}
        {wheel.normalLinks.map((l, i) => {
          const edge = lineToCircleEdge(l.from, l.to);
          const isIn = hovered ? isSameNode(l.to, hovered) : false;
          const isOut = hovered ? isSameNode(l.from, hovered) : false;
          return (
            <line
              key={`genre-transition-link-${i}`}
              x1={edge.x1}
              y1={edge.y1}
              x2={edge.x2}
              y2={edge.y2}
              stroke="rgba(255,255,255,.5)"
              strokeWidth={2.8}
              markerEnd={
                isOut
                  ? "url(#genre-transition-arrow-out)"
                  : isIn
                    ? "url(#genre-transition-arrow-in)"
                    : "url(#genre-transition-arrow)"
              }
            />
          );
        })}
        {wheel.mainstreamPopLinks.map((l, i) => {
          const edge = lineToCircleEdge(l.from, l.to);
          const isIn = hovered ? isSameNode(l.to, hovered) : false;
          const isOut = hovered ? isSameNode(l.from, hovered) : false;
          return (
            <line
              key={`genre-transition-mainstream-pop-${i}`}
              x1={edge.x1}
              y1={edge.y1}
              x2={edge.x2}
              y2={edge.y2}
              stroke="rgba(246,246,242,.9)"
              strokeWidth={3.4}
              markerEnd={
                isOut
                  ? "url(#genre-transition-arrow-out)"
                  : isIn
                    ? "url(#genre-transition-arrow-in)"
                    : "url(#genre-transition-arrow)"
              }
            />
          );
        })}
        {wheel.nodes.map((n) => (
          <circle
            key={`${n.genre}-${n.intensity}`}
            cx={n.x}
            cy={n.y}
            r={circleRadiusForNode(n)}
            fill={n.colour}
            stroke="rgba(255,255,255,.35)"
            strokeWidth={2}
            onMouseEnter={() => setHovered(n)}
            onMouseLeave={() => setHovered(null)}
          />
        ))}
      </svg>
      <aside
        className="xl:sticky xl:top-24 w-full xl:w-[560px] h-[720px] rounded border border-ui-border/80 px-4 py-3 bg-[#12121a]/70 overflow-y-auto"
      >
        {hovered ? (
          <>
            <div
              className="font-mono text-[20px] uppercase tracking-[0.08em]"
              style={{ color: hovered.colour }}
            >
              {hovered.genre} · {hovered.intensity}
            </div>
            <div className="font-mono text-[18px] mt-2">Out:</div>
            <ul className="m-0 mt-1 pl-6 list-disc">
              {genreIntensityOut(hovered).map((n) => (
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
              {genreIntensityIn(hovered).map((n) => (
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
            Hover a genre/intensity point to inspect transitions.
          </div>
        )}
      </aside>
    </div>
  );
}
