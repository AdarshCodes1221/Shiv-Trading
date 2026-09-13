import { Suspense, lazy, useState } from "react";
import { slabs } from "@/data/catalog";
import { useHydrated } from "@/components/site/useHydrated";
import { Reveal } from "@/components/site/Reveal";

const SlabScene = lazy(() => import("@/components/three/SlabScene"));

export function MarbleExperience() {
  const [active, setActive] = useState(slabs[1]!.id);
  const hydrated = useHydrated();
  const current = slabs.find((s) => s.id === active) ?? slabs[0]!;

  return (
    <section className="bg-onyx py-24 text-primary-foreground sm:py-32">
      <div className="mx-auto max-w-[1560px] px-5 sm:px-8 lg:px-12">
        <Reveal>
          <p className="eyebrow text-primary-foreground/50">05 — Marble experience</p>
          <h2 className="display-lg mt-5 max-w-2xl">A gallery of stone, lit like one.</h2>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.55fr_1fr] lg:items-stretch">
          <div className="relative aspect-4/3 w-full overflow-hidden bg-charcoal sm:aspect-16/10">
            {/* Static slab imagery is the mobile / no-WebGL fallback. */}
            <div className="absolute inset-0 flex md:hidden">
              {slabs.map((slab) => (
                <img
                  key={slab.id}
                  src={slab.image}
                  alt={`${slab.name} — ${slab.origin} slab`}
                  loading="lazy"
                  width={800}
                  height={1400}
                  className={`h-full flex-1 object-cover transition-opacity duration-700 ${
                    slab.id === active ? "opacity-100" : "opacity-45"
                  }`}
                />
              ))}
            </div>
            <div className="absolute inset-0 hidden md:block">
              {hydrated ? (
                <Suspense
                  fallback={
                    <img
                      src={current.image}
                      alt={`${current.name} slab`}
                      className="size-full object-cover"
                    />
                  }
                >
                  <SlabScene
                    slabs={slabs.map((s) => ({ id: s.id, texture: s.texture }))}
                    activeId={active}
                  />
                </Suspense>
              ) : (
                <img
                  src={current.image}
                  alt={`${current.name} slab`}
                  loading="lazy"
                  className="size-full object-cover"
                />
              )}
            </div>
          </div>

          <div className="flex flex-col justify-between">
            <div className="flex flex-col">
              {slabs.map((slab) => (
                <button
                  key={slab.id}
                  type="button"
                  onMouseEnter={() => setActive(slab.id)}
                  onFocus={() => setActive(slab.id)}
                  onClick={() => setActive(slab.id)}
                  className={`border-t border-primary-foreground/15 py-6 text-left transition-colors duration-500 ${
                    slab.id === active ? "text-primary-foreground" : "text-primary-foreground/45"
                  }`}
                >
                  <span className="font-display text-3xl">{slab.name}</span>
                  <span className="mt-1 block text-[11px] tracking-[0.2em] uppercase">
                    {slab.origin}
                  </span>
                </button>
              ))}
            </div>
            <p className="mt-10 max-w-sm text-sm text-primary-foreground/60">
              Move between materials to see how veining, tone and polish change under the same light.
              Every slab is selected in person at the Biratnagar showroom.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
