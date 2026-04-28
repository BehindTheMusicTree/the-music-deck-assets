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
  from: Node,
  to: Node,
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

function isLightHex(hex: string): boolean {
  const s = hex.replace("#", "");
  const normalized =
    s.length === 3
      ? s
          .split("")
          .map((c) => c + c)
          .join("")
      : s;
  const r = Number.parseInt(normalized.slice(0, 2), 16);
  const g = Number.parseInt(normalized.slice(2, 4), 16);
  const b = Number.parseInt(normalized.slice(4, 6), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 160;
}

function labelNode(n: { genre: GenreName; intensity: Intensity }) {
  return `${n.genre} (${n.intensity})`;
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
    const cx = 630;
    const cy = 630;
    const ringRadius: Record<Intensity, number> = {
      pop: 225,
      soft: 330,
      experimental: 435,
      hardcore: 540,
    };
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
    return { cx, cy, ringRadius, nodes, normalLinks, mainstreamPopLinks };
  }, []);

  return (
    <div className="flex items-start justify-center gap-6">
      <svg width={1470} height={1470} viewBox="0 0 1470 1470">
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
            className="font-mono text-[18px] uppercase tracking-[0.08em] fill-white/70"
          >
            {label}
          </text>
        ))}
        {WHEEL_GENRES.map((g, idx) => {
          const a = (idx / WHEEL_GENRES.length) * 360 - 90;
          const p = polarToXY(
            wheel.cx,
            wheel.cy,
            wheel.ringRadius.hardcore + 26,
            a,
          );
          return (
            <text
              key={`genre-transition-genre-${g.n}`}
              x={p.x}
              y={p.y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="font-mono text-[24px] tracking-[0.06em] fill-white/85"
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
              stroke={hovered ? "rgba(255,255,255,.26)" : "rgba(255,255,255,.5)"}
              strokeWidth={isOut || isIn ? 4 : 2.8}
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
              stroke={hovered ? "rgba(246,246,242,.26)" : "rgba(246,246,242,.9)"}
              strokeWidth={isOut || isIn ? 4.6 : 3.4}
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
        className="sticky top-24 w-[420px] min-h-[420px] rounded border border-ui-border/80 px-4 py-3 bg-[#12121a]/70"
        style={
          hovered
            ? {
                background: hovered.colour,
                color: isLightHex(hovered.colour)
                  ? "rgba(10,10,10,.92)"
                  : "rgba(255,255,255,.96)",
              }
            : undefined
        }
      >
        {hovered ? (
          <>
            <div className="font-mono text-[20px] uppercase tracking-[0.08em]">
              {hovered.genre} · {hovered.intensity}
            </div>
            <div className="font-mono text-[18px] mt-2">Out:</div>
            <ul className="m-0 mt-1 pl-6 list-disc">
              {genreIntensityOut(hovered).map((n) => (
                <li
                  key={`out-${n.genre}-${n.intensity}`}
                  className="font-mono text-[18px]"
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
