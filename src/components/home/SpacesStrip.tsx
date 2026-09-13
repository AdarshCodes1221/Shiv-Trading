import { spaces } from "@/data/catalog";
import { Reveal } from "@/components/site/Reveal";

export function SpacesStrip() {
  return (
    <section className="border-t border-border py-24 sm:py-32">
      <div className="mx-auto max-w-[1560px] px-5 sm:px-8 lg:px-12">
        <Reveal>
          <p className="eyebrow">06 — Spaces</p>
          <h2 className="display-lg mt-5 max-w-2xl">Where the material ends up.</h2>
        </Reveal>
      </div>

      <div className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 sm:px-8 lg:px-12">
        {spaces.map((s) => (
          <figure key={s.name} className="w-[78vw] shrink-0 snap-start sm:w-[46vw] lg:w-[32vw]">
            <div className="aspect-4/5 overflow-hidden bg-muted">
              <img
                src={s.image}
                alt={s.name}
                loading="lazy"
                width={1100}
                height={1375}
                className="size-full object-cover"
              />
            </div>
            <figcaption className="mt-5">
              <h3 className="font-display text-2xl">{s.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
