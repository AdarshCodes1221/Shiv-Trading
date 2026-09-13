import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { collections, products } from "@/data/catalog";
import { Reveal } from "@/components/site/Reveal";

export function CollectionsGrid() {
  return (
    <section className="border-t border-border bg-card/20 py-24 sm:py-32">
      <div className="mx-auto max-w-[1560px] px-5 sm:px-8 lg:px-12">
        <Reveal>
          <div className="flex items-center gap-2 text-bronze">
            <Sparkles className="size-4" />
            <p className="eyebrow tracking-[0.2em] text-bronze">
              Product Categories & Materials
            </p>
          </div>
          <h2 className="display-lg mt-3 max-w-2xl font-display">
            Everything your space needs.
          </h2>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground leading-relaxed">
            From large-format glazed vitrified tiles and natural Indian marble slabs to
            designer sanitaryware, certified CPVC plumbing, and architectural paints.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {collections.map((c, i) => {
            const count = products.filter((p) => p.category === c.slug).length;
            return (
              <Reveal key={c.slug} delay={i * 0.05}>
                <Link
                  to="/collections"
                  search={{ category: c.slug }}
                  className="group block border border-border/70 bg-card transition-all duration-500 hover:border-bronze hover:shadow-xl"
                >
                  <div className="relative aspect-4/3 w-full overflow-hidden bg-muted">
                    <img
                      src={c.image}
                      alt={c.name}
                      loading="lazy"
                      width={1200}
                      height={900}
                      className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-40" />
                    <span className="absolute top-4 left-4 inline-block bg-onyx/85 px-3 py-1 text-[11px] font-semibold tracking-wider text-white uppercase backdrop-blur-sm border border-white/10">
                      {c.line}
                    </span>
                    <span className="absolute bottom-3 right-3 flex size-8 items-center justify-center rounded-full bg-white text-black shadow-md transition-transform group-hover:scale-110">
                      <ArrowUpRight className="size-4 text-bronze" />
                    </span>
                  </div>

                  <div className="p-6">
                    <div className="flex items-baseline justify-between gap-4">
                      <div>
                        <h3 className="font-display text-2xl font-bold text-foreground group-hover:text-bronze transition-colors">
                          {c.name}
                        </h3>
                        <p className="text-xs text-bronze font-medium mt-0.5">
                          {c.nepaliName}
                        </p>
                      </div>
                      <span className="text-[11px] tracking-wider text-muted-foreground uppercase">
                        {count > 0 ? `${count} items` : "Explore"}
                      </span>
                    </div>
                    <p className="mt-3 text-xs leading-relaxed text-muted-foreground line-clamp-2">
                      {c.description}
                    </p>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
