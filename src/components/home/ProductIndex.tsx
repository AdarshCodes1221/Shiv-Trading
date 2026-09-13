import { products } from "@/data/catalog";
import { Reveal } from "@/components/site/Reveal";

export function ProductIndex() {
  return (
    <section className="border-t border-border py-24 sm:py-32">
      <div className="mx-auto max-w-[1560px] px-5 sm:px-8 lg:px-12">
        <Reveal>
          <p className="eyebrow">04 — Selected products</p>
          <h2 className="display-lg mt-5 max-w-2xl">Formats large enough to disappear.</h2>
        </Reveal>

        <ul className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.04}>
              <li>
                <div className="relative aspect-3/4 overflow-hidden bg-muted">
                  <img
                    src={p.image}
                    alt={`${p.name} — ${p.category}`}
                    loading="lazy"
                    width={900}
                    height={1200}
                    className="size-full object-cover"
                  />
                </div>
                <div className="mt-5 flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-2xl">{p.name}</h3>
                  <span className="eyebrow">{p.size}</span>
                </div>
                <p className="mt-1 text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
                  {p.category}
                </p>
                <p className="mt-3 text-sm text-muted-foreground">{p.description}</p>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
