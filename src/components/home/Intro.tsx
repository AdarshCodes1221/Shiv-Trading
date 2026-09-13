import { company } from "@/data/catalog";
import { Reveal } from "@/components/site/Reveal";

export function Intro() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-[1560px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <p className="eyebrow">01 — The showroom</p>
            <h2 className="display-lg mt-5 max-w-md">
              A one-stop destination for material.
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="flex flex-col gap-10">
            <p className="max-w-xl text-base leading-relaxed text-muted-foreground">
              {company.about}
            </p>
            <dl className="grid grid-cols-1 gap-8 border-t border-border pt-8 sm:grid-cols-3">
              {(company.figures ?? []).map((f) => (
                <div key={f.label}>
                  <dt className="font-display text-5xl">{f.value}</dt>
                  <dd className="eyebrow mt-2">{f.label}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
