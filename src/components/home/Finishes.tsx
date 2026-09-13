import { company, finishes } from "@/data/catalog";
import { Reveal } from "@/components/site/Reveal";

export function Finishes() {
  return (
    <section className="border-t border-border py-24 sm:py-32">
      <div className="mx-auto max-w-[1560px] px-5 sm:px-8 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <p className="eyebrow">03 — Finishes</p>
            <h2 className="display-lg mt-5 max-w-sm">Choose the finish, then the tile.</h2>
            <p className="mt-6 max-w-sm text-sm text-muted-foreground">{company.finishNote}</p>
          </Reveal>

          <Reveal delay={0.1}>
            <dl>
              {finishes.map((f) => (
                <div
                  key={f.name}
                  className="grid gap-2 border-t border-border py-7 sm:grid-cols-[200px_1fr] sm:gap-8"
                >
                  <dt className="font-display text-2xl">{f.name}</dt>
                  <dd className="text-sm text-muted-foreground">{f.text}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
