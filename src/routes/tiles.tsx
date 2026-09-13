import { createFileRoute } from "@tanstack/react-router";
import { finishes, products } from "@/data/catalog";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import colFloor from "@/assets/col-floor-tiles.jpg";

const title = "Tiles — Large-Format Floor & Wall Tiles | Shiv Trading";
const description =
  "Glazed vitrified floor tiles up to 120×240 cm and wall tiles in gloss, matt, rustic, satin and textured finishes at Shiv Trading Biratnagar.";

export const Route = createFileRoute("/tiles")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: TilesPage,
});

function TilesPage() {
  const tiles = products.filter((p) => p.category !== "marble-granite");

  return (
    <>
      <PageHeader
        eyebrow="Tiles"
        title="Large formats, quiet joints."
        lead="Glazed vitrified surfaces up to 120 × 240 cm for floors and walls, in five finishes."
        image={colFloor}
      />

      <section className="mx-auto max-w-[1560px] px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {tiles.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.04}>
              <div className="aspect-3/4 overflow-hidden bg-muted">
                <img
                  src={p.image}
                  alt={`${p.name} — ${p.category}`}
                  loading="lazy"
                  className="size-full object-cover"
                />
              </div>
              <div className="mt-5 flex items-baseline justify-between gap-4">
                <h2 className="font-display text-2xl">{p.name}</h2>
                <span className="eyebrow">{p.size}</span>
              </div>
              <p className="eyebrow mt-1">{p.category}</p>
              <p className="mt-3 text-sm text-muted-foreground">{p.description}</p>
              <p className="eyebrow mt-4">{p.applications.join(" · ")}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-limestone py-20 sm:py-28">
        <div className="mx-auto max-w-[1560px] px-5 sm:px-8 lg:px-12">
          <Reveal>
            <p className="eyebrow">Finishes</p>
            <h2 className="display-lg mt-5 max-w-xl">Five ways a surface can behave.</h2>
          </Reveal>
          <dl className="mt-10 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
            {finishes.map((f) => (
              <div key={f.name} className="border-t border-border py-6">
                <dt className="font-display text-2xl">{f.name}</dt>
                <dd className="mt-2 text-sm text-muted-foreground">{f.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
