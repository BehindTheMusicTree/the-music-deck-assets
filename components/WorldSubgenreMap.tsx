"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  SUBGENRES,
  type CountrySubgenre,
  WORLD_THEMES,
} from "@/lib/genres";
import { COUNTRY_MAP_POINT, countryToMapSvg } from "@/lib/countries";
import type { GenreTheme } from "@/components/Card";

const WORLD_W = 360;
const WORLD_H = 180;
const MIN_VIEW_W = 48;
const ZOOM_SENS = 0.00135;

type ViewBoxRect = {
  minX: number;
  minY: number;
  width: number;
  height: number;
};

function clampViewBox(vb: ViewBoxRect): ViewBoxRect {
  const width = Math.min(WORLD_W, Math.max(MIN_VIEW_W, vb.width));
  const height = width * (WORLD_H / WORLD_W);
  const minX = Math.min(WORLD_W - width, Math.max(0, vb.minX));
  const minY = Math.min(WORLD_H - height, Math.max(0, vb.minY));
  return { minX, minY, width, height };
}

const INITIAL_VB: ViewBoxRect = {
  minX: 0,
  minY: 0,
  width: WORLD_W,
  height: WORLD_H,
};

function isLightHex(hex: string) {
  if (!/^#[0-9a-fA-F]{6}$/.test(hex)) return false;
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 128;
}

const MAP_LABEL_B = 2.2;

/**
 * Renders the same country-flag border treatment as `Card` world shells
 * (`frameBorder` / `frameBg`, rotate for USA) inside a map chip, behind text.
 */
function MapMarkerFlagBorder({ theme }: { theme: GenreTheme }) {
  const flagLayer = theme.frameBorder;
  const flagBg = theme.frameBg;
  const worldFrameFilter = theme.frameFilter;
  const worldFrameOpacity = theme.frameOpacity;
  const flagUsR90 = Boolean(
    theme.frameRotateR90 && (flagLayer || flagBg),
  );

  if (flagUsR90 && (flagBg ?? flagLayer)) {
    const src = (flagBg ?? flagLayer) as string;
    return (
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 3,
          background: "rgba(4,6,9,0.9)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: 160,
            height: 100,
            transform: "translate(-50%,-50%) rotate(-90deg)",
            borderRadius: 2,
            backgroundImage: `linear-gradient(${"transparent"}, ${"transparent"}), ${src}`,
            backgroundSize: "100% 100%, cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundClip: "padding-box, border-box",
            backgroundOrigin: "padding-box, border-box",
            border: `${MAP_LABEL_B}px solid transparent`,
            boxSizing: "border-box",
            filter: worldFrameFilter,
            opacity: worldFrameOpacity,
          }}
        />
      </div>
    );
  }

  if (flagLayer) {
    return (
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 3,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(4,5,9,0.92)",
            borderRadius: 3,
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: 3,
            background: `linear-gradient(${"transparent"}, ${"transparent"}) padding-box, ${flagLayer} border-box`,
            backgroundClip: "padding-box, border-box",
            backgroundOrigin: "padding-box, border-box",
            border: `${MAP_LABEL_B}px solid transparent`,
            boxSizing: "border-box",
            filter: worldFrameFilter,
            opacity: worldFrameOpacity,
          }}
        />
      </div>
    );
  }

  return null;
}

/**
 * Renders a marker at the origin; parent `g` must apply translate(worldX, worldY) and
 * an inverse map zoom scale so pin/label stay a constant screen size.
 */
function MapMarker({
  subgenre,
  region,
  hex,
  country,
}: {
  subgenre: string;
  region: string;
  hex: string;
  country: string;
}) {
  const w = 78;
  const h = 22;
  const light = isLightHex(hex);
  const theme = WORLD_THEMES[country];
  const hasCardBorder = Boolean(
    theme &&
    (theme.frameBorder ?? (theme.frameRotateR90 && theme.frameBg)),
  );
  const labelLine = subgenre.length > 22 ? `${subgenre.slice(0, 20)}…` : subgenre;
  return (
    <g>
      <line
        x1={0}
        y1={0}
        x2={0}
        y2={10}
        stroke="rgba(255,255,255,.35)"
        strokeWidth={0.6}
      />
      <circle
        cx={0}
        cy={0}
        r={2.8}
        fill={hex}
        stroke="rgba(255,255,255,.45)"
        strokeWidth={0.45}
        filter={`drop-shadow(0 1px 3px ${hex}99)`}
      />
      <g
        data-map-label
        transform={`translate(0,${-(h + 14)})`}
        style={{ cursor: "pointer" }}
        onClick={() => navigator.clipboard.writeText(hex)}
      >
        <title>{`${subgenre} — ${region} (${hex}) — click to copy hex`}</title>
        <foreignObject x={-w / 2} y={-h / 2} width={w} height={h}>
          <div
            style={{
              position: "relative",
              width: w,
              height: h,
              boxSizing: "border-box",
              boxShadow: hasCardBorder
                ? `0 0 0 0.4px ${hex}99, 0 2px 7px rgba(0,0,0,.5)`
                : `0 2px 6px ${hex}88, 0 0 0 0.35px ${hex}66`,
              borderRadius: 3,
            }}
          >
            {hasCardBorder && theme ? (
              <MapMarkerFlagBorder theme={theme} />
            ) : !hasCardBorder ? (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: 3,
                  background: hex,
                  boxShadow: `0 0 0 0.3px ${hex}cc, inset 0 0 10px ${hex}44`,
                }}
              />
            ) : null}
            <div
              style={{
                position: "relative",
                zIndex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                height: "100%",
                padding: "0 2px",
                lineHeight: 1.1,
                pointerEvents: "none",
              }}
            >
              <span
                style={{
                  fontFamily: "Cinzel, serif",
                  fontWeight: 700,
                  fontSize: 5.2,
                  letterSpacing: 0.4,
                  color: hex,
                  textShadow: light
                    ? "0 0 1px #000,0 0.5px 2px rgba(0,0,0,0.85),0 1px 2px #000a"
                    : "0 0.5px 1.5px rgba(0,0,0,0.5)",
                }}
              >
                {labelLine}
              </span>
              <span
                style={{
                  fontFamily: "ui-monospace, monospace",
                  fontSize: 4.2,
                  color: "rgba(255,255,255,0.82)",
                  textShadow: "0 0 2px #000,0 1px 1px #0006",
                }}
              >
                {region}
              </span>
            </div>
          </div>
        </foreignObject>
      </g>
    </g>
  );
}

function clientToSvg(
  clientX: number,
  clientY: number,
  rect: DOMRect,
  vb: ViewBoxRect,
): { x: number; y: number } {
  const u = (clientX - rect.left) / rect.width;
  const v = (clientY - rect.top) / rect.height;
  return {
    x: vb.minX + u * vb.width,
    y: vb.minY + v * vb.height,
  };
}

export default function WorldSubgenreMap() {
  const countrySubs = SUBGENRES.filter(
    (s): s is CountrySubgenre => s.kind === "country",
  );

  const [viewBox, setViewBox] = useState<ViewBoxRect>(INITIAL_VB);
  const vbRef = useRef(viewBox);
  vbRef.current = viewBox;

  const svgRef = useRef<SVGSVGElement>(null);
  const panRef = useRef<{
    active: boolean;
    pointerId: number;
    lastClientX: number;
    lastClientY: number;
  } | null>(null);

  useEffect(() => {
    const el = svgRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const rect = el.getBoundingClientRect();
      const vb = vbRef.current;
      const pt = clientToSvg(e.clientX, e.clientY, rect, vb);
      const scale = Math.exp(-e.deltaY * ZOOM_SENS);
      const newW = vb.width * scale;
      const newH = newW * (WORLD_H / WORLD_W);
      const next = clampViewBox({
        minX: pt.x - (pt.x - vb.minX) * (newW / vb.width),
        minY: pt.y - (pt.y - vb.minY) * (newH / vb.height),
        width: newW,
        height: newH,
      });
      setViewBox(next);
    };

    let pinchLastD = 0;
    let pinchMid = { x: 0, y: 0 };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        const [a, b] = [e.touches[0]!, e.touches[1]!];
        pinchLastD = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
        pinchMid = {
          x: (a.clientX + b.clientX) / 2,
          y: (a.clientY + b.clientY) / 2,
        };
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length !== 2 || pinchLastD <= 0) return;
      e.preventDefault();
      const [a, b] = [e.touches[0]!, e.touches[1]!];
      const d = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
      const ratio = d / pinchLastD;
      pinchLastD = d;
      const rect = el.getBoundingClientRect();
      const vb = vbRef.current;
      const pt = clientToSvg(pinchMid.x, pinchMid.y, rect, vb);
      const newW = vb.width / ratio;
      const newH = newW * (WORLD_H / WORLD_W);
      setViewBox(
        clampViewBox({
          minX: pt.x - (pt.x - vb.minX) * (newW / vb.width),
          minY: pt.y - (pt.y - vb.minY) * (newH / vb.height),
          width: newW,
          height: newH,
        }),
      );
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (e.touches.length < 2) pinchLastD = 0;
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    el.addEventListener("touchend", onTouchEnd);
    el.addEventListener("touchcancel", onTouchEnd);
    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
      el.removeEventListener("touchcancel", onTouchEnd);
    };
  }, []);

  const onPointerDown = useCallback((e: React.PointerEvent<SVGSVGElement>) => {
    if (e.button !== 0 && e.button !== 1) return;
    const target = e.target as Element | null;
    if (target?.closest?.("[data-map-label]")) return;

    panRef.current = {
      active: true,
      pointerId: e.pointerId,
      lastClientX: e.clientX,
      lastClientY: e.clientY,
    };
    e.currentTarget.setPointerCapture(e.pointerId);
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent<SVGSVGElement>) => {
    const pan = panRef.current;
    if (!pan?.active || e.pointerId !== pan.pointerId) return;

    const el = svgRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const vb = vbRef.current;

    const dxPx = e.clientX - pan.lastClientX;
    const dyPx = e.clientY - pan.lastClientY;
    pan.lastClientX = e.clientX;
    pan.lastClientY = e.clientY;

    const dxSvg = (-dxPx / rect.width) * vb.width;
    const dySvg = (-dyPx / rect.height) * vb.height;

    setViewBox(
      clampViewBox({
        minX: vb.minX + dxSvg,
        minY: vb.minY + dySvg,
        width: vb.width,
        height: vb.height,
      }),
    );
  }, []);

  const endPan = useCallback((e: React.PointerEvent<SVGSVGElement>) => {
    const pan = panRef.current;
    if (pan && e.pointerId === pan.pointerId) {
      panRef.current = null;
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
        /* already released */
      }
    }
  }, []);

  const onDoubleClick = useCallback((e: React.MouseEvent<SVGSVGElement>) => {
    const t = e.target as Element | null;
    if (t?.closest?.("[data-map-label]")) return;
    setViewBox(INITIAL_VB);
  }, []);

  /** Maps world (equirectangular) coords to root 0..360/0..180, same as the old viewBox zoom. */
  const sMap = WORLD_W / viewBox.width;
  const mapGroupTransform = `matrix(${sMap} 0 0 ${sMap} ${-sMap * viewBox.minX} ${-sMap * viewBox.minY})`;
  const markerSizeScale = viewBox.width / WORLD_W;

  return (
    <div className="w-full max-w-[min(100%,1400px)] mx-auto flex flex-col items-center gap-5 mt-14 mb-6 px-3 sm:px-4">
      <div className="text-center max-w-[720px]">
        <div className="section-title mb-1.5">World map</div>
        <p className="font-garamond italic text-muted text-[16px] leading-[1.45] m-0">
          Country-native subgenres are placed at an approximate geographic point
          for their country or region (equirectangular projection). Unlike the
          colour wheel, only geography is encoded — intensity rings do not apply
          here.
        </p>
      </div>

      <svg
        ref={svgRef}
        viewBox={`0 0 ${WORLD_W} ${WORLD_H}`}
        className="w-full h-auto rounded-[6px] border border-ui-border bg-[#060910] shadow-[inset_0_0_80px_rgba(0,0,0,.45)] select-none"
        style={{ touchAction: "none" }}
        role="img"
        aria-label="World map with country-native subgenre markers. Scroll to zoom, drag to pan, double-click background to reset."
        preserveAspectRatio="xMidYMid meet"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endPan}
        onPointerCancel={endPan}
        onDoubleClick={onDoubleClick}
      >
        <defs>
          <linearGradient id="worldMapOcean" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0a1428" />
            <stop offset="100%" stopColor="#05080e" />
          </linearGradient>
        </defs>

        {/* Map (ocean, land, graticule) is inside the zoom group; outside: fixed screen-size lon labels. */}
        <g transform={mapGroupTransform} style={{ pointerEvents: "auto" }}>
          <rect width={WORLD_W} height={WORLD_H} fill="url(#worldMapOcean)" />

          {/* Landmasses: plate carrée 360×180, simplified from Natural Earth–style country polygons */}
          <image
            href="/world-land-equirect.svg"
            x={0}
            y={0}
            width={WORLD_W}
            height={WORLD_H}
            preserveAspectRatio="none"
            opacity={0.78}
            style={{ pointerEvents: "none" }}
          />

          {[-120, -60, 0, 60, 120].map((lon) => (
            <line
              key={lon}
              x1={lon + 180}
              y1={0}
              x2={lon + 180}
              y2={WORLD_H}
              stroke="rgba(255,255,255,.05)"
              strokeWidth={0.4}
            />
          ))}
          {[60, 30, 0, -30, -60].map((lat) => {
            const y = 90 - lat;
            return (
              <line
                key={lat}
                x1={0}
                y1={y}
                x2={WORLD_W}
                y2={y}
                stroke="rgba(255,255,255,.05)"
                strokeWidth={0.4}
              />
            );
          })}

          {countrySubs.map((s) => {
            const geo = COUNTRY_MAP_POINT[s.parentA as keyof typeof COUNTRY_MAP_POINT];
            if (!geo) return null;
            const { x, y } = countryToMapSvg(geo.lon, geo.lat);
            return (
              <g
                key={s.n}
                transform={`translate(${x} ${y}) scale(${markerSizeScale})`}
              >
                <MapMarker
                  subgenre={s.n}
                  region={s.parentA}
                  country={s.parentA}
                  hex={s.color}
                />
              </g>
            );
          })}
        </g>

        <text
          x={8}
          y={172}
          fill="rgba(255,255,255,.28)"
          fontFamily="ui-monospace, monospace"
          fontSize={4.5}
        >
          180°W
        </text>
        <text
          x={176}
          y={172}
          fill="rgba(255,255,255,.28)"
          fontFamily="ui-monospace, monospace"
          fontSize={4.5}
        >
          0°
        </text>
        <text
          x={332}
          y={172}
          fill="rgba(255,255,255,.28)"
          fontFamily="ui-monospace, monospace"
          fontSize={4.5}
        >
          180°E
        </text>

      </svg>
      <p className="font-mono text-[10px] tracking-wide text-muted/80 m-0 text-center">
        Scroll or pinch to zoom toward the cursor · drag the map to pan · double-click
        empty ocean to reset · click a label to copy its hex colour.
      </p>
      <p className="font-mono text-[9px] tracking-wide text-muted/50 m-0 text-center max-w-[560px]">
        Coastlines are simplified land polygons (decimated) in the same equirectangular
        space as the graticule — not a political boundary product.
      </p>
    </div>
  );
}
