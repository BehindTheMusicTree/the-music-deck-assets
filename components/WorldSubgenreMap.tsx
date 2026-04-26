"use client";

import { createRoot, type Root } from "react-dom/client";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import {
  SUBGENRES,
  type CountrySubgenre,
  WORLD_THEMES,
} from "@/lib/genres";
import { COUNTRY_MAP_POINT } from "@/lib/countries";
import type {
  Map as MaplibreMap,
  MapLayerMouseEvent,
  StyleSpecification,
} from "maplibre-gl";
import type { GenreTheme } from "@/components/Card";
import type { Feature, FeatureCollection } from "geojson";

const OSM_RASTER_STYLE: StyleSpecification = {
  version: 8,
  name: "osm-tiles",
  glyphs: "https://demotiles.maplibre.org/font/{fontstack}/{range}.pbf",
  sources: {
    osm: {
      type: "raster",
      tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
      tileSize: 256,
      maxzoom: 19,
      attribution:
        "© <a href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\" rel=\"noreferrer\">OpenStreetMap</a> contributors",
    },
  },
  layers: [
    { id: "osm", type: "raster", source: "osm" },
  ],
};

/** SW then NE (lng, lat) for `fitBounds`. */
const WORLD_FIT: [[number, number], [number, number]] = [
  [-175, -58],
  [175, 70],
];

const MIN_MAP_PX = 80;

function fitWorldInView(
  map: MaplibreMap,
  container: HTMLElement,
): boolean {
  const w = container.clientWidth;
  const h = container.clientHeight;
  if (w < MIN_MAP_PX || h < MIN_MAP_PX) return false;
  map.resize();
  map.fitBounds(WORLD_FIT, {
    padding: 32,
    duration: 0,
    maxZoom: 6,
  });
  return true;
}

const SUBGENRE_SOURCE_ID = "subgenres";
const CLUSTER_LAYER_ID = "subgenre-clusters";
const CLUSTER_COUNT_LAYER_ID = "subgenre-cluster-count";
const POINT_LAYER_ID = "subgenre-point";

type ClusterGeoSource = {
  type: "geojson";
  getClusterExpansionZoom: (clusterId: number) => Promise<number>;
  getClusterLeaves: (
    clusterId: number,
    limit: number,
    offset: number,
  ) => Promise<GeoJSON.Feature[]>;
};

function countrySubsToGeoJson(subs: CountrySubgenre[]): FeatureCollection {
  const features: Feature[] = [];
  for (const s of subs) {
    const geo = COUNTRY_MAP_POINT[s.parentA as keyof typeof COUNTRY_MAP_POINT];
    if (!geo) continue;
    features.push({
      type: "Feature",
      id: s.n,
      properties: {
        subgenre: s.n,
        country: s.parentA,
        hex: s.color,
      },
      geometry: {
        type: "Point",
        coordinates: [geo.lon, geo.lat],
      },
    });
  }
  return { type: "FeatureCollection", features };
}

function ClusterLeavesPopup({ leaves }: { leaves: Feature[] }) {
  return (
    <div
      className="max-h-[min(50vh,280px)] overflow-y-auto py-1 font-mono text-[11px] text-white/90"
      style={{ minWidth: 220 }}
    >
      {leaves.map((leaf, i) => {
        const p = leaf.properties as {
          subgenre?: string;
          country?: string;
          hex?: string;
        } | null;
        if (!p?.subgenre) return null;
        return (
          <button
            key={`${p.subgenre}-${i}`}
            type="button"
            className="block w-full border-0 bg-transparent px-2 py-1.5 text-left text-white/90 hover:bg-white/10 cursor-pointer rounded"
            onClick={() => {
              if (p.hex) void navigator.clipboard.writeText(p.hex);
            }}
          >
            <span className="text-gold/90">{p.subgenre}</span>
            <span className="text-muted"> · </span>
            <span className="text-white/70">{p.country}</span>
            <span className="block font-mono text-[10px] text-muted mt-0.5">
              {p.hex} — click row to copy hex
            </span>
          </button>
        );
      })}
    </div>
  );
}

function isLightHex(hex: string) {
  if (!/^#[0-9a-fA-F]{6}$/.test(hex)) return false;
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 > 128;
}

const MAP_LABEL_B = 2;

/**
 * Renders the same country-flag border treatment as `Card` world shells, for the OSM marker chip.
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

const LABEL_W = 118;
const LABEL_H = 38;

/**
 * MapLibre `Marker` `element` — geographic point is the bottom centre of the small dot.
 */
function OsmMapMarkerChip({
  subgenre,
  region,
  hex,
  country,
  titleId,
}: {
  subgenre: string;
  region: string;
  hex: string;
  country: string;
  titleId: string;
}) {
  const light = isLightHex(hex);
  const theme = WORLD_THEMES[country];
  const hasCardBorder = Boolean(
    theme && (theme.frameBorder ?? (theme.frameRotateR90 && theme.frameBg)),
  );
  const labelLine =
    subgenre.length > 20 ? `${subgenre.slice(0, 18)}…` : subgenre;

  return (
    <div
      className="flex flex-col items-center"
      onPointerDown={(e) => e.stopPropagation()}
      onClick={(e) => e.stopPropagation()}
    >
      <div
        role="button"
        tabIndex={0}
        onClick={() => {
          void navigator.clipboard.writeText(hex);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            void navigator.clipboard.writeText(hex);
          }
        }}
        className="cursor-pointer"
        style={{ maxWidth: LABEL_W }}
      >
        <span id={titleId} className="sr-only">
          {`${subgenre} — ${region} — ${hex}. Activate to copy hex colour.`}
        </span>
        <div
          className="relative"
          style={{
            width: Math.min(LABEL_W, 132),
            height: LABEL_H,
            boxSizing: "border-box",
            boxShadow: hasCardBorder
              ? `0 0 0 0.4px ${hex}99, 0 2px 7px rgba(0,0,0,.5)`
              : `0 2px 6px ${hex}88, 0 0 0 0.35px ${hex}66`,
            borderRadius: 3,
            overflow: "hidden",
          }}
          aria-labelledby={titleId}
        >
          {hasCardBorder && theme ? (
            <MapMarkerFlagBorder theme={theme} />
          ) : !hasCardBorder ? (
            <div
              className="absolute inset-0 rounded-[3px]"
              style={{
                background: hex,
                boxShadow: `0 0 0 0.3px ${hex}cc, inset 0 0 10px ${hex}44`,
              }}
            />
          ) : null}
          <div
            className="absolute inset-0 z-1 flex flex-col items-center justify-center text-center px-0.5"
            style={{
              lineHeight: 1.1,
              pointerEvents: "none",
            }}
          >
            <span
              className="font-bold"
              style={{
                fontFamily: "var(--font-cinzel, 'Cinzel', serif)",
                fontSize: 11.5,
                letterSpacing: 0.3,
                color: hex,
                textShadow: light
                  ? "0 0 1px #000,0 0.5px 2px rgba(0,0,0,0.85),0 1px 2px #000a"
                  : "0 0.5px 1.5px rgba(0,0,0,0.5)",
              }}
            >
              {labelLine}
            </span>
            <span
              className="font-mono text-white/80"
              style={{ fontSize: 9, textShadow: "0 0 2px #000,0 1px 1px #0006" }}
            >
              {region}
            </span>
          </div>
        </div>
      </div>
      <div
        className="h-2.5 w-px shrink-0"
        style={{ background: "rgba(255,255,255,.4)" }}
        aria-hidden
      />
      <div
        className="h-2 w-2 shrink-0 rounded-full"
        style={{
          background: hex,
          boxShadow: `0 0 0 0.4px rgba(255,255,255,.4),0 0 4px ${hex}99`,
        }}
        aria-hidden
      />
    </div>
  );
}

type MaplibreModule = typeof import("maplibre-gl");
let maplibreRef: MaplibreModule | null = null;
async function loadMaplibre(): Promise<MaplibreModule> {
  if (!maplibreRef) {
    maplibreRef = await import("maplibre-gl");
  }
  return maplibreRef;
}

export default function WorldSubgenreMap() {
  const idPrefix = useId();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const onResetRef = useRef<(() => void) | null>(null);

  const countrySubs = useMemo(
    () =>
      SUBGENRES.filter(
        (s): s is CountrySubgenre => s.kind === "country",
      ),
    [],
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let mapInstance: MaplibreMap | null = null;
    let activePopup: import("maplibre-gl").Popup | null = null;
    let activeRoot: Root | null = null;
    let resizeObserver: ResizeObserver | null = null;

    const closeActivePopup = () => {
      activeRoot?.unmount();
      activeRoot = null;
      try {
        activePopup?.remove();
      } catch {
        /* already removed */
      }
      activePopup = null;
    };
    let cancelled = false;

    void (async () => {
      try {
        const M = await loadMaplibre();
        if (cancelled) return;
        const map = new M.Map({
          container,
          style: OSM_RASTER_STYLE,
          center: [0, 15],
          zoom: 0,
          minZoom: 0,
          maxZoom: 18,
        });
        if (cancelled) {
          map.remove();
          return;
        }
        mapInstance = map;

        map.addControl(
          new M.NavigationControl({ showCompass: true }),
          "top-right",
        );

        const scheduleWorldFit = () => {
          if (cancelled) return;
          fitWorldInView(map, container);
          requestAnimationFrame(() => {
            if (cancelled) return;
            fitWorldInView(map, container);
          });
          window.setTimeout(() => {
            if (cancelled) return;
            fitWorldInView(map, container);
          }, 120);
          window.setTimeout(() => {
            if (cancelled) return;
            fitWorldInView(map, container);
          }, 400);
        };

        map.once("load", () => {
          if (cancelled) return;
          map.scrollZoom.enable();
          map.doubleClickZoom.disable();
          scheduleWorldFit();

          const geojson = countrySubsToGeoJson(countrySubs);
          map.addSource(SUBGENRE_SOURCE_ID, {
            type: "geojson",
            data: geojson,
            cluster: true,
            clusterMaxZoom: 15,
            clusterRadius: 52,
          });

          map.addLayer({
            id: CLUSTER_LAYER_ID,
            type: "circle",
            source: SUBGENRE_SOURCE_ID,
            filter: ["has", "point_count"],
            paint: {
              "circle-color": "rgba(52, 86, 132, 0.92)",
              "circle-radius": [
                "step",
                ["get", "point_count"],
                15,
                3,
                18,
                6,
                22,
                12,
                28,
              ],
              "circle-stroke-width": 2,
              "circle-stroke-color": "#e8eef8",
            },
          });

          map.addLayer({
            id: CLUSTER_COUNT_LAYER_ID,
            type: "symbol",
            source: SUBGENRE_SOURCE_ID,
            filter: ["has", "point_count"],
            layout: {
              "text-field": "{point_count}",
              "text-font": ["Open Sans Bold"],
              "text-size": 12,
            },
            paint: {
              "text-color": "#f4f7fc",
            },
          });

          map.addLayer({
            id: POINT_LAYER_ID,
            type: "circle",
            source: SUBGENRE_SOURCE_ID,
            filter: ["!", ["has", "point_count"]],
            paint: {
              "circle-color": ["get", "hex"],
              "circle-radius": 8,
              "circle-stroke-width": 1.5,
              "circle-stroke-color": "rgba(255,255,255,0.88)",
            },
          });

          const clusterLayers = [CLUSTER_LAYER_ID, CLUSTER_COUNT_LAYER_ID];
          for (const lid of [...clusterLayers, POINT_LAYER_ID]) {
            map.on("mouseenter", lid, () => {
              map.getCanvas().style.cursor = "pointer";
            });
            map.on("mouseleave", lid, () => {
              map.getCanvas().style.cursor = "";
            });
          }

          const geoSource = map.getSource(SUBGENRE_SOURCE_ID) as unknown as ClusterGeoSource;

          const openClusterLeavesPopup = (
            clusterId: number,
            coords: [number, number],
          ) => {
            void (async () => {
              try {
                const leaves = await geoSource.getClusterLeaves(
                  clusterId,
                  120,
                  0,
                );
                if (cancelled) return;
                closeActivePopup();
                const el = document.createElement("div");
                activeRoot = createRoot(el);
                activeRoot.render(<ClusterLeavesPopup leaves={leaves} />);
                activePopup = new M.Popup({
                  maxWidth: "320px",
                  closeButton: true,
                  closeOnClick: true,
                })
                  .setLngLat(coords)
                  .setDOMContent(el)
                  .addTo(map);
                activePopup.on("close", () => {
                  activeRoot?.unmount();
                  activeRoot = null;
                });
              } catch {
                /* ignore */
              }
            })();
          };

          const onClusterClick = (e: MapLayerMouseEvent) => {
            const feats = map.queryRenderedFeatures(e.point, {
              layers: clusterLayers,
            });
            const f = feats[0];
            if (!f?.properties || f.properties.cluster_id === undefined) return;
            const clusterId = f.properties.cluster_id as number;
            const coords = (f.geometry as { type: "Point"; coordinates: [number, number] })
              .coordinates;
            void (async () => {
              try {
                const expansionZoom =
                  await geoSource.getClusterExpansionZoom(clusterId);
                if (cancelled) return;
                if (expansionZoom > map.getZoom() + 0.05) {
                  closeActivePopup();
                  map.easeTo({
                    center: coords,
                    zoom: Math.min(
                      expansionZoom,
                      map.getMaxZoom() ?? 18,
                    ),
                  });
                } else {
                  openClusterLeavesPopup(clusterId, coords);
                }
              } catch {
                /* ignore */
              }
            })();
          };

          map.on("click", CLUSTER_LAYER_ID, onClusterClick);
          map.on("click", CLUSTER_COUNT_LAYER_ID, onClusterClick);

          map.on("click", POINT_LAYER_ID, (e) => {
            const feats = map.queryRenderedFeatures(e.point, {
              layers: [POINT_LAYER_ID],
            });
            const f = feats[0];
            if (!f?.properties) return;
            const p = f.properties as {
              subgenre: string;
              country: string;
              hex: string;
            };
            const coords = (f.geometry as { type: "Point"; coordinates: [number, number] })
              .coordinates;
            closeActivePopup();
            const el = document.createElement("div");
            activeRoot = createRoot(el);
            const titleId = `${idPrefix}-p-${p.subgenre}`.replace(/\s/g, "-");
            activeRoot.render(
              <OsmMapMarkerChip
                subgenre={p.subgenre}
                region={p.country}
                country={p.country}
                hex={p.hex}
                titleId={titleId}
              />,
            );
            activePopup = new M.Popup({
              maxWidth: "240px",
              closeButton: true,
              closeOnClick: true,
              offset: 14,
            })
              .setLngLat(coords)
              .setDOMContent(el)
              .addTo(map);
            activePopup.on("close", () => {
              activeRoot?.unmount();
              activeRoot = null;
            });
          });

          map.on("click", (e) => {
            const hit = map.queryRenderedFeatures(e.point, {
              layers: [...clusterLayers, POINT_LAYER_ID],
            });
            if (!hit.length) closeActivePopup();
          });
        });

        onResetRef.current = () => {
          if (!mapInstance) return;
          mapInstance.resize();
          mapInstance.fitBounds(WORLD_FIT, {
            padding: 32,
            maxZoom: 6,
            duration: 450,
          });
        };

        map.on("dblclick", (e) => {
          e.preventDefault();
          onResetRef.current?.();
        });

        resizeObserver = new ResizeObserver(() => {
          if (cancelled || !mapInstance) return;
          mapInstance.resize();
        });
        resizeObserver.observe(container);
      } catch (e) {
        if (!cancelled) {
          setLoadError(
            e instanceof Error ? e.message : "The map could not be loaded",
          );
        }
      }
    })();

    return () => {
      cancelled = true;
      onResetRef.current = null;
      resizeObserver?.disconnect();
      activeRoot?.unmount();
      activeRoot = null;
      try {
        activePopup?.remove();
      } catch {
        /* */
      }
      activePopup = null;
      if (mapInstance) {
        mapInstance.remove();
        mapInstance = null;
      }
    };
  }, [countrySubs, idPrefix]);

  return (
    <div className="w-full max-w-[min(100%,1400px)] mx-auto flex flex-col items-center gap-5 mt-14 mb-6 px-3 sm:px-4">
      <div className="text-center max-w-[720px]">
        <div className="section-title mb-1.5">World map</div>
        <p className="font-garamond italic text-muted text-[16px] leading-[1.45] m-0">
          Country-native subgenres are placed at an approximate representative
          point in each country. The base map uses{" "}
          <span className="not-italic text-white/75">OpenStreetMap</span>{" "}
          (standard tiles, Web Mercator). Unlike the colour wheel, only geography
          is encoded — intensity rings do not apply here.
        </p>
      </div>

      {loadError ? (
        <p
          className="font-mono text-sm text-red-300/90"
          role="alert"
        >
          {loadError}
        </p>
      ) : null}

      <div
        className="w-full min-w-0 min-h-0"
        style={{ aspectRatio: "2.2 / 1" }}
      >
        <div
          ref={containerRef}
          className="h-full w-full min-w-0 min-h-[280px] sm:min-h-[360px] overflow-hidden rounded-[6px] border border-ui-border bg-[#0b1220] shadow-[inset_0_0_80px_rgba(0,0,0,.4)]"
        />
        <p className="mt-1.5 font-mono text-[9px] tracking-wide text-muted/50 text-right pr-0.5 m-0">
          Map data © OpenStreetMap contributors (ODbL) · use per{" "}
          <a
            className="text-white/50 underline offset-1 hover:text-white/70"
            href="https://wiki.openstreetmap.org/wiki/Tile_usage_policy"
            target="_blank"
            rel="noreferrer"
          >
            OpenStreetMap tile policy
          </a>
        </p>
      </div>

      <p className="font-mono text-[10px] tracking-wide text-muted/80 m-0 text-center">
        Scroll to zoom, drag to pan, double-click empty space to fit the world again.
        Overlapping pins cluster — click a cluster to zoom in, or a single pin for the
        full label (click the label to copy hex). Click empty map to close popups.
      </p>
    </div>
  );
}
