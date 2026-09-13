import { Suspense, lazy, useState } from "react";
import {
  RotateCcw,
  SlidersHorizontal,
  X,
  Layers,
  Sparkles,
  Check,
  CheckCircle2,
} from "lucide-react";
import {
  rooms,
  slabs,
  type SurfacePoint,
  type SurfaceTarget,
  type Material,
} from "@/data/catalog";
import { Reveal } from "@/components/site/Reveal";
import { Button } from "@/components/ui/button";
import { useHydrated } from "@/components/site/useHydrated";
import type { RenderSurfaceItem } from "@/components/three/RoomScene";

const RoomScene = lazy(() => import("@/components/three/RoomScene"));

const firstRoom = rooms[0]!;

export function RoomVisualizer() {
  const [roomId, setRoomId] = useState<string>(firstRoom.id);
  const room = rooms.find((r) => r.id === roomId) ?? firstRoom;

  // Active target surface being styled (e.g., "floor", "wall", "backsplash")
  const [activeSurfaceId, setActiveSurfaceId] = useState<SurfaceTarget>(
    room.surfaces[0]?.id ?? "floor"
  );

  // Deterministic state: map of `${roomId}_${surfaceId}` -> materialId
  const [appliedMaterials, setAppliedMaterials] = useState<Record<string, string>>({
    living_floor: "white",
    living_wall: "fluted-sand",
    bathroom_floor: "beige",
    bathroom_wall: "white",
    kitchen_floor: "charcoal",
    kitchen_backsplash: "beige",
    outdoor_paving: "granite",
    outdoor_wall: "fluted-sand",
  });

  const [customizing, setCustomizing] = useState(false);
  const [customPoints, setCustomPoints] = useState<
    Record<string, [SurfacePoint, SurfacePoint, SurfacePoint, SurfacePoint]>
  >({});
  const [scale, setScale] = useState(100);
  const [rotation, setRotation] = useState(0);
  const [brightness, setBrightness] = useState(100);
  const [opacity, setOpacity] = useState(90);
  const hydrated = useHydrated();

  // Ensure active surface matches current room if switching rooms
  const currentRoomSurfaces = room.surfaces;
  const currentSurfaceConfig =
    currentRoomSurfaces.find((s) => s.id === activeSurfaceId) ??
    currentRoomSurfaces[0]!;

  const currentKey = `${room.id}_${currentSurfaceConfig.id}`;
  const activeMaterialId = appliedMaterials[currentKey] ?? null;
  const activeMaterial = slabs.find((s) => s.id === activeMaterialId) ?? null;

  // Prepare all surfaces for the 3D scene
  const sceneSurfaces: RenderSurfaceItem[] = currentRoomSurfaces.map((surf) => {
    const key = `${room.id}_${surf.id}`;
    const matId = appliedMaterials[key];
    const mat = slabs.find((s) => s.id === matId);
    const pointsKey = `${room.id}_${surf.id}`;
    const points = customPoints[pointsKey] ?? surf.points;

    return {
      id: surf.id,
      label: surf.label,
      points,
      texture: mat?.texture ?? room.image,
      scale: ((surf.defaultScale * (mat?.scale ?? 100)) / 100) * (scale / 100),
      rotation: surf.id === currentSurfaceConfig.id ? rotation : 0,
      brightness: surf.id === currentSurfaceConfig.id ? brightness : 100,
      opacity: surf.id === currentSurfaceConfig.id ? opacity : 90,
      roughness: mat?.roughness ?? surf.defaultRoughness,
      showMaterial: Boolean(mat),
    };
  });

  const handleApplyMaterial = (material: Material) => {
    setAppliedMaterials((prev) => ({
      ...prev,
      [currentKey]: material.id,
    }));
  };

  const handleResetCurrentSurface = () => {
    setAppliedMaterials((prev) => {
      const next = { ...prev };
      delete next[currentKey];
      return next;
    });
  };

  const handleResetAllSurfaces = () => {
    setAppliedMaterials((prev) => {
      const next = { ...prev };
      for (const s of currentRoomSurfaces) {
        delete next[`${room.id}_${s.id}`];
      }
      return next;
    });
    setCustomPoints((prev) => {
      const next = { ...prev };
      for (const s of currentRoomSurfaces) {
        delete next[`${room.id}_${s.id}`];
      }
      return next;
    });
    setScale(100);
    setRotation(0);
    setBrightness(100);
    setOpacity(90);
  };

  const pointsKey = `${room.id}_${currentSurfaceConfig.id}`;
  const activeSurfacePoints = customPoints[pointsKey] ?? currentSurfaceConfig.points;

  return (
    <section
      id="visualizer"
      className="scroll-mt-20 border-t border-border bg-card/20 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-[1560px] px-5 sm:px-8 lg:px-12">
        <Reveal>
          <div className="flex items-center gap-2 text-bronze">
            <Sparkles className="size-4" />
            <p className="eyebrow tracking-[0.2em] text-bronze">
              Interactive 3D Material Studio
            </p>
          </div>
          <h2 className="display-lg mt-3 max-w-2xl font-display">
            See the surface in place.
          </h2>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground leading-relaxed">
            Experience how Shiv Trading's premium glazed vitrified tiles, natural
            marble, and architectural textures interact with light across real floors
            and walls before finalizing your project order.
          </p>
        </Reveal>

        {/* 3D Visualizer Viewport */}
        <Reveal delay={0.1}>
          <div className="relative mt-12 aspect-4/3 w-full overflow-hidden border border-border/80 bg-stone-950 shadow-2xl">
            {/* Background Room Photo */}
            <img
              src={room.image}
              alt={`${room.name} interior space`}
              loading="lazy"
              width={1600}
              height={1100}
              className="absolute inset-0 size-full object-cover"
            />

            {/* Three.js / React Three Fiber Canvas */}
            {hydrated ? (
              <Suspense
                fallback={
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-xs text-white">
                    Loading 3D materials...
                  </div>
                }
              >
                <RoomScene surfaces={sceneSurfaces} />
              </Suspense>
            ) : null}

            {/* Foreground Cutout Mask for Furniture Depth */}
            {room.foreground && (
              <img
                src={room.image}
                alt=""
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-10 size-full object-cover"
                style={{ clipPath: room.foreground }}
              />
            )}

            {/* Interactive Corner Point Calibration */}
            {customizing && activeSurfacePoints && (
              <div className="absolute inset-0 z-20">
                <svg
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 size-full"
                  viewBox="0 0 100 100"
                  preserveAspectRatio="none"
                >
                  <polygon
                    points={activeSurfacePoints
                      .map((p) => `${p.x * 100},${p.y * 100}`)
                      .join(" ")}
                    className="surface-guide"
                  />
                </svg>
                {activeSurfacePoints.map((point, index) => (
                  <Button
                    key={`${pointsKey}-pt-${index}`}
                    type="button"
                    variant="ghost"
                    size="icon"
                    aria-label={`Move ${currentSurfaceConfig.label} corner ${index + 1}`}
                    className="absolute size-7 -translate-x-1/2 -translate-y-1/2 cursor-move rounded-full border-2 border-white bg-bronze p-0 shadow-lg hover:bg-bronze"
                    style={{
                      left: `${point.x * 100}%`,
                      top: `${point.y * 100}%`,
                    }}
                    onPointerDown={(event) => {
                      event.currentTarget.setPointerCapture(event.pointerId);
                    }}
                    onPointerMove={(event) => {
                      if (!event.currentTarget.hasPointerCapture(event.pointerId))
                        return;
                      const bounds =
                        event.currentTarget.parentElement?.getBoundingClientRect();
                      if (!bounds) return;
                      const next = [
                        ...activeSurfacePoints,
                      ] as [SurfacePoint, SurfacePoint, SurfacePoint, SurfacePoint];
                      next[index] = {
                        x: Math.min(
                          1,
                          Math.max(0, (event.clientX - bounds.left) / bounds.width)
                        ),
                        y: Math.min(
                          1,
                          Math.max(0, (event.clientY - bounds.top) / bounds.height)
                        ),
                      };
                      setCustomPoints((current) => ({
                        ...current,
                        [pointsKey]: next,
                      }));
                    }}
                  />
                ))}
              </div>
            )}

            {/* Gradient Veil */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 veil" />

            {/* Floating Top Surface Switcher Badge */}
            <div className="absolute top-5 left-5 z-30 flex flex-wrap items-center gap-2">
              <span className="hidden sm:inline-block bg-onyx/85 px-3 py-1.5 text-[11px] font-semibold tracking-wider text-white uppercase backdrop-blur-md border border-white/10">
                Target Surface:
              </span>
              {currentRoomSurfaces.map((surf) => {
                const isSelected = surf.id === currentSurfaceConfig.id;
                const matId = appliedMaterials[`${room.id}_${surf.id}`];
                const mat = slabs.find((s) => s.id === matId);
                return (
                  <button
                    key={surf.id}
                    type="button"
                    onClick={() => {
                      setActiveSurfaceId(surf.id);
                    }}
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold tracking-wider uppercase transition-all backdrop-blur-md ${
                      isSelected
                        ? "bg-bronze text-white shadow-md border border-bronze"
                        : "bg-black/60 text-white/90 border border-white/20 hover:bg-black/80"
                    }`}
                  >
                    <Layers className="size-3.5" />
                    <span>{surf.label}</span>
                    {mat && (
                      <span className="ml-1 text-[10px] text-white/70">
                        ({mat.name.split(" ")[0]})
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Bottom Status & Controls */}
            <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-4 p-5 sm:p-8">
              <div className="text-white drop-shadow-md">
                <p className="text-[11px] font-semibold tracking-[0.2em] text-bronze uppercase">
                  {room.name} • {currentSurfaceConfig.label}
                </p>
                <h3 className="font-display text-2xl sm:text-3xl font-bold">
                  {activeMaterial ? activeMaterial.name : "Original Surface"}
                </h3>
                {activeMaterial && (
                  <p className="text-xs text-stone-300">
                    {activeMaterial.finish} • {activeMaterial.origin}
                  </p>
                )}
              </div>

              <div className="relative z-30 flex items-center gap-2">
                <Button
                  type="button"
                  onClick={() => setCustomizing((value) => !value)}
                  variant="outline"
                  className="h-10 rounded-none border-white/40 bg-black/40 px-3.5 text-xs tracking-[0.14em] text-white uppercase backdrop-blur-sm hover:bg-white hover:text-charcoal"
                >
                  {customizing ? <X className="size-4" /> : <SlidersHorizontal className="size-4" />}
                  <span className="ml-1.5">{customizing ? "Close" : "Adjust"}</span>
                </Button>
                <Button
                  type="button"
                  onClick={handleResetCurrentSurface}
                  variant="outline"
                  className="size-10 rounded-none border-white/40 bg-black/40 p-0 text-white backdrop-blur-sm hover:bg-white hover:text-charcoal"
                  title="Reset current surface material"
                  aria-label="Reset current surface material"
                >
                  <RotateCcw className="size-4" />
                </Button>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Pattern & Calibration Drawer */}
        {customizing && (
          <div className="border-x border-b border-border bg-card px-5 py-6 sm:px-8">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                ["Pattern Scale", scale, setScale, 60, 180, "%"],
                ["Angle / Rotation", rotation, setRotation, -45, 45, "°"],
                ["Luminance / Light", brightness, setBrightness, 70, 130, "%"],
                ["Blend / Opacity", opacity, setOpacity, 50, 100, "%"],
              ].map(([label, val, setter, min, max, unit]) => (
                <label key={String(label)} className="block">
                  <span className="flex justify-between text-[11px] font-semibold tracking-[0.16em] uppercase">
                    <span>{String(label)}</span>
                    <span className="text-bronze">
                      {Number(val)}
                      {String(unit)}
                    </span>
                  </span>
                  <input
                    className="surface-range mt-3 w-full"
                    type="range"
                    min={Number(min)}
                    max={Number(max)}
                    value={Number(val)}
                    onChange={(e) =>
                      (setter as React.Dispatch<React.SetStateAction<number>>)(
                        Number(e.target.value)
                      )
                    }
                  />
                </label>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-border/80 pt-4 text-xs text-muted-foreground">
              <p>
                Drag corner control points on the preview to align edges to baseboards, walls, or islands.
              </p>
              <Button
                type="button"
                variant="ghost"
                onClick={handleResetAllSurfaces}
                className="rounded-none text-[11px] tracking-[0.16em] uppercase text-bronze hover:text-bronze-dark"
              >
                <RotateCcw className="size-3.5 mr-1" /> Reset Room Surfaces
              </Button>
            </div>
          </div>
        )}

        {/* Room & Material Control Panels */}
        <div className="mt-12 grid gap-10 lg:grid-cols-12">
          {/* Room Selection */}
          <div className="lg:col-span-4 space-y-4">
            <p className="text-[11px] font-semibold tracking-[0.2em] text-bronze uppercase">
              1. Select Room Environment
            </p>
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4 lg:grid-cols-2">
              {rooms.map((r) => {
                const isCurrent = r.id === roomId;
                return (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => {
                      setRoomId(r.id);
                      setActiveSurfaceId(r.surfaces[0]?.id ?? "floor");
                    }}
                    className={`flex flex-col items-start border p-4 text-left transition-all ${
                      isCurrent
                        ? "border-bronze bg-card shadow-md"
                        : "border-border bg-card/40 hover:border-foreground/40 hover:bg-card"
                    }`}
                  >
                    <span
                      className={`text-xs font-bold tracking-wider uppercase ${
                        isCurrent ? "text-bronze" : "text-foreground"
                      }`}
                    >
                      {r.name}
                    </span>
                    <span className="mt-1 text-[10px] text-muted-foreground">
                      {r.surfaces.map((s) => s.label).join(" + ")}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Target Surface Selector for Current Room */}
            <div className="mt-6 border-t border-border/80 pt-5">
              <p className="text-[11px] font-semibold tracking-[0.2em] text-muted-foreground uppercase">
                Active Surface in {room.name}:
              </p>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {currentRoomSurfaces.map((surf) => (
                  <button
                    key={surf.id}
                    type="button"
                    onClick={() => setActiveSurfaceId(surf.id)}
                    className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold tracking-wider uppercase transition-colors ${
                      surf.id === currentSurfaceConfig.id
                        ? "bg-charcoal text-white"
                        : "border border-border bg-card text-muted-foreground hover:border-foreground hover:text-foreground"
                    }`}
                  >
                    <span>{surf.label}</span>
                    {surf.id === currentSurfaceConfig.id && (
                      <Check className="size-3 text-bronze" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Material Swatches Palette */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-[11px] font-semibold tracking-[0.2em] text-bronze uppercase">
                2. Apply Material to {currentSurfaceConfig.label}
              </p>
              {activeMaterial && (
                <button
                  type="button"
                  onClick={handleResetCurrentSurface}
                  className="text-xs text-muted-foreground hover:text-bronze underline"
                >
                  Clear material
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-4">
              {slabs.map((s) => {
                const isApplied = s.id === activeMaterialId;
                const isCompatible = s.compatibleSurfaces.includes(
                  currentSurfaceConfig.id
                );

                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => handleApplyMaterial(s)}
                    aria-label={`Apply ${s.name} to ${currentSurfaceConfig.label}`}
                    className={`group relative flex flex-col overflow-hidden border bg-card p-2 text-left transition-all ${
                      isApplied
                        ? "border-bronze ring-2 ring-bronze ring-offset-2"
                        : isCompatible
                        ? "border-border hover:border-foreground/60"
                        : "border-border/40 opacity-75 hover:opacity-100"
                    }`}
                  >
                    <div className="relative aspect-square w-full overflow-hidden bg-muted">
                      <img
                        src={s.texture}
                        alt={`${s.name} texture preview`}
                        loading="lazy"
                        width={300}
                        height={300}
                        className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {isApplied && (
                        <div className="absolute top-2 right-2 flex size-6 items-center justify-center rounded-full bg-bronze text-white shadow-md">
                          <Check className="size-3.5" />
                        </div>
                      )}
                    </div>
                    <div className="mt-2.5 px-1">
                      <p className="font-display text-xs font-bold text-foreground truncate">
                        {s.name}
                      </p>
                      <p className="text-[10px] text-muted-foreground truncate">
                        {s.finish} • {s.color}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-border/80 pt-3 text-xs text-muted-foreground">
              <span>Authentic North & South Indian Marble, Vitrified Tiles & Natural Stone</span>
              <a
                href="#enquiry"
                className="font-semibold text-bronze hover:underline"
              >
                Request Slabs on WhatsApp →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
