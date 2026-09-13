import { Suspense, lazy, useState } from "react";
import { products, finishes, slabs } from "@/data/catalog";
import { useHydrated } from "@/components/site/useHydrated";
import { Reveal } from "@/components/site/Reveal";
import { useI18n, type TKey } from "@/lib/i18n";
import type { LightingPreset } from "@/components/three/TileScene";

const TileScene = lazy(() => import("@/components/three/TileScene"));

/** Finish names come from Shiv Trading's published finish list; the roughness
 * values are only a visual approximation for the 3D preview. */
const finishRoughness: Record<string, number> = {
  "High Gloss": 0.06,
  Satin: 0.22,
  Matt: 0.55,
  Textured: 0.72,
  Rustic: 0.85,
};

const lightingPresets: LightingPreset[] = ["studio", "daylight", "evening"];

export function TileStudio() {
  const { t } = useI18n();
  const productTiles = (products ?? [])
    .filter((p) => p.texture)
    .map((p) => ({
      id: p.id,
      name: p.name,
      category: p.categoryLabel || p.category,
      size: p.size,
      image: p.image,
      texture: p.texture!,
    }));

  const slabTiles = (slabs ?? []).map((s) => ({
    id: s.id,
    name: s.name,
    category: s.category,
    size: "120 × 240 cm",
    image: s.image,
    texture: s.texture,
  }));

  const tiles = productTiles.length > 0 ? productTiles : slabTiles;
  const [tileId, setTileId] = useState(tiles[0]?.id ?? "white");
  const [finish, setFinish] = useState<string>("High Gloss");
  const [lighting, setLighting] = useState<LightingPreset>("studio");
  const hydrated = useHydrated();

  const tile = tiles.find((t) => t.id === tileId) ?? tiles[0] ?? {
    id: "default",
    name: "Statuario White",
    category: "Marble & Granite",
    size: "120 × 240 cm",
    image: "",
    texture: "",
  };
  const roughness = finishRoughness[finish] ?? 0.3;

  const chip = (active: boolean) =>
    `border px-4 py-2.5 text-[11px] tracking-[0.2em] uppercase transition-colors duration-300 ${
      active
        ? "border-bronze bg-bronze text-primary-foreground"
        : "border-primary-foreground/25 text-primary-foreground/70 hover:border-primary-foreground/60"
    }`;

  return (
    <section className="bg-charcoal py-24 text-primary-foreground sm:py-32">
      <div className="mx-auto max-w-[1560px] px-5 sm:px-8 lg:px-12">
        <Reveal>
          <p className="eyebrow text-primary-foreground/50">{t("studio.eyebrow")}</p>
          <h2 className="display-lg mt-5 max-w-2xl">{t("studio.title")}</h2>
          <p className="mt-5 max-w-lg text-sm text-primary-foreground/60">{t("studio.lede")}</p>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div className="relative aspect-4/3 w-full overflow-hidden bg-onyx">
            {hydrated ? (
              <Suspense
                fallback={
                  <img src={tile.image} alt={`${tile.name} tile`} className="size-full object-cover" />
                }
              >
                <TileScene
                  texture={tile.texture!}
                  roughness={roughness}
                  repeat={2}
                  preset={lighting}
                />
              </Suspense>
            ) : (
              <img
                src={tile.image}
                alt={`${tile.name} tile`}
                loading="lazy"
                className="size-full object-cover"
              />
            )}
            <span className="pointer-events-none absolute bottom-4 left-4 text-[10px] tracking-[0.22em] uppercase text-primary-foreground/60">
              {t("studio.drag")}
            </span>
          </div>

          <div className="flex flex-col gap-8">
            <div>
              <p className="eyebrow text-primary-foreground/45">{t("studio.tile")}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {tiles.map((tl) => (
                  <button
                    key={tl.id}
                    type="button"
                    onClick={() => setTileId(tl.id)}
                    className={chip(tl.id === tile.id)}
                  >
                    {tl.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="eyebrow text-primary-foreground/45">{t("studio.finish")}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {finishes.map((f) => (
                  <button
                    key={f.name}
                    type="button"
                    onClick={() => setFinish(f.name)}
                    className={chip(f.name === finish)}
                  >
                    {t(`finish.${f.name}` as TKey)}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="eyebrow text-primary-foreground/45">{t("studio.lighting")}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {lightingPresets.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setLighting(p)}
                    className={chip(p === lighting)}
                  >
                    {t(`light.${p}` as TKey)}
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t border-primary-foreground/15 pt-6">
              <p className="font-display text-3xl">{tile.name}</p>
              <p className="mt-2 text-sm text-primary-foreground/60">
                {tile.category} · {tile.size}
              </p>
              <p className="mt-4 max-w-sm text-sm text-primary-foreground/70">
                {t(`finishText.${finish}` as TKey)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
