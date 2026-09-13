import { createFileRoute } from "@tanstack/react-router";
import { spaces } from "@/data/catalog";
import { PageHeader } from "@/components/site/PageHeader";
import { MaterialVisualizer } from "@/components/home/MaterialVisualizer";
import { Reveal } from "@/components/site/Reveal";
import spaceLiving from "@/assets/space-living.jpg";

const title = "Spaces — Living, Bath, Kitchen & Exterior | Shiv Trading";
const description =
  "See Shiv Trading materials in place: living rooms, bathrooms, kitchens and exteriors, plus interactive 3D material inspection.";

export const Route = createFileRoute("/spaces")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: SpacesPage,
});

function SpacesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Spaces"
        title="Material, in place."
        lead="How large-format tile and polished stone read across a home — from a living floor to an exterior facade."
        image={spaceLiving}
      />

      <section className="mx-auto max-w-[1560px] px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="grid gap-x-8 gap-y-16 sm:grid-cols-2">
          {spaces.map((s, i) => (
            <Reveal key={s.name} delay={i * 0.04}>
              <figure>
                <div className="aspect-4/3 overflow-hidden bg-muted">
                  <img
                    src={s.image}
                    alt={s.name}
                    loading="lazy"
                    className="size-full object-cover"
                  />
                </div>
                <figcaption className="mt-5">
                  <h2 className="font-display text-3xl">{s.name}</h2>
                  <p className="mt-2 max-w-lg text-sm text-muted-foreground">{s.text}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      <MaterialVisualizer />
    </>
  );
}
