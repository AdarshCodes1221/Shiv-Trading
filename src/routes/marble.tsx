import { createFileRoute } from "@tanstack/react-router";
import { marbleOrigins, slabs } from "@/data/catalog";
import { PageHeader } from "@/components/site/PageHeader";
import { MarbleExperience } from "@/components/home/MarbleExperience";
import { Reveal } from "@/components/site/Reveal";
import slabWhite from "@/assets/slab-white.jpg";

const title = "Marble & Granite — North Indian, Rajasthani, South Indian | Shiv Trading";
const description =
  "Natural stone at Shiv Trading Biratnagar: North Indian, Rajasthani and South Indian marble plus granite, selected slab by slab.";

export const Route = createFileRoute("/marble")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: MarblePage,
});

function MarblePage() {
  return (
    <>
      <PageHeader
        eyebrow="Marble & granite"
        title="Stone, selected slab by slab."
        lead="Marble from North India, Rajasthan and South India, alongside granite specified where a surface has to take daily traffic."
        image={slabWhite}
      />

      <section className="mx-auto max-w-[1560px] px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <Reveal>
          <p className="eyebrow">Origins</p>
          <div className="mt-6 grid gap-8 sm:grid-cols-3">
            {marbleOrigins.map((o) => (
              <div key={o} className="border-t border-border pt-6">
                <h2 className="font-display text-3xl">{o}</h2>
                <p className="mt-2 text-sm text-muted-foreground">Marble</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <MarbleExperience />

      <section className="mx-auto max-w-[1560px] px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {slabs.map((s, i) => (
            <Reveal key={s.id} delay={i * 0.04}>
              <div className="aspect-3/4 overflow-hidden bg-muted">
                <img
                  src={s.image}
                  alt={`${s.name} — ${s.origin}`}
                  loading="lazy"
                  className="size-full object-cover"
                />
              </div>
              <h3 className="mt-5 font-display text-2xl">{s.name}</h3>
              <p className="eyebrow mt-1">{s.origin}</p>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
