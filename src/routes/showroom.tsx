import { createFileRoute, Link } from "@tanstack/react-router";
import { company, collections, finishes } from "@/data/catalog";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import { TileStudio } from "@/components/home/TileStudio";
import heroInterior from "@/assets/hero-interior.jpg";

const title = "Showroom — Visit Shiv Trading in Biratnagar, Nepal";
const description =
  "Walk the Shiv Trading showroom in Biratnagar: tiles, marble, granite, sanitaryware and CP fittings shown full size, with an interactive 3D finish studio.";

export const Route = createFileRoute("/showroom")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: ShowroomPage,
});

function ShowroomPage() {
  return (
    <>
      <PageHeader
        eyebrow="Showroom"
        title="One address for the whole specification."
        lead={`${company.name} — ${company.city}, ${company.country}`}
        image={heroInterior}
      />

      <section className="mx-auto max-w-[1560px] px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <h2 className="display-lg max-w-sm">What you'll find inside</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="text-base leading-relaxed text-muted-foreground">{company.about}</p>
            <ul className="mt-12 grid gap-px border-t border-border bg-border sm:grid-cols-2">
              {collections.map((c) => (
                <li key={c.slug} className="bg-background p-6">
                  <p className="eyebrow text-muted-foreground">{c.line}</p>
                  <p className="mt-3 font-display text-2xl">{c.name}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{c.description}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <TileStudio />

      <section className="mx-auto max-w-[1560px] px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <Reveal>
          <p className="eyebrow text-muted-foreground">Finishes on display</p>
          <h2 className="display-lg mt-5 max-w-xl">{company.finishNote}</h2>
        </Reveal>
        <div className="mt-12 grid gap-px border-t border-border bg-border md:grid-cols-3">
          {finishes.map((f) => (
            <div key={f.name} className="bg-background p-6">
              <p className="font-display text-2xl">{f.name}</p>
              <p className="mt-2 text-sm text-muted-foreground">{f.text}</p>
            </div>
          ))}
        </div>

        <Reveal>
          <div className="mt-16 border-t border-border pt-10">
            <p className="max-w-xl text-base text-muted-foreground">
              Planning a visit? Send your drawings or room sizes ahead and we'll have the relevant
              slabs and tiles pulled out before you arrive.
            </p>
            <Link to="/contact" hash="enquiry" className="btn-stone mt-8 inline-flex">
              Request a consultation
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
