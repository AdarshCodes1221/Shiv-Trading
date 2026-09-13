import { Link } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { partners } from "@/data/catalog";
import { Reveal } from "@/components/site/Reveal";

export function PartnersSection() {
  return (
    <section className="border-t border-border bg-limestone/40 py-24 sm:py-32">
      <div className="mx-auto max-w-[1560px] px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <div className="flex items-center gap-2 text-bronze">
              <ShieldCheck className="size-4" />
              <p className="eyebrow tracking-[0.2em] text-bronze">Quality Assurance</p>
            </div>
            <h2 className="display-lg mt-3 max-w-xl font-display">Trusted Partners</h2>
            <p className="mt-4 max-w-xl text-base text-muted-foreground leading-relaxed">
              We work with established brands to bring quality products and reliable solutions to every project.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <Link
              to="/partners"
              className="btn-outline-stone inline-flex items-center gap-2 group w-fit"
            >
              <span>Explore All Partners</span>
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-5">
          {partners.map((partner, index) => (
            <Reveal key={partner.id} delay={index * 0.08}>
              <div className="group relative flex flex-col items-center justify-between rounded-none border border-border/80 bg-card p-6 text-center transition-all duration-300 hover:border-bronze hover:shadow-md h-full">
                <div className="flex h-20 w-full items-center justify-center p-2">
                  <img
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    loading="lazy"
                    className="max-h-12 w-auto max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                <div className="mt-4 border-t border-border/60 pt-4 w-full">
                  <h3 className="text-xs font-semibold tracking-[0.16em] uppercase text-foreground">
                    {partner.name}
                  </h3>
                  <p className="mt-1 text-[11px] text-muted-foreground line-clamp-1">
                    {partner.category}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
