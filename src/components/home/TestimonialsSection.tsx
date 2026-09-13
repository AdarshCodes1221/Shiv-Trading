import { Link } from "@tanstack/react-router";
import { Star, ArrowRight, Quote } from "lucide-react";
import { ratingSummary, testimonials } from "@/data/catalog";
import { Reveal } from "@/components/site/Reveal";

export function TestimonialsSection() {
  const featured = testimonials.slice(0, 3);

  return (
    <section className="border-t border-border py-24 sm:py-32">
      <div className="mx-auto max-w-[1560px] px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <p className="eyebrow text-bronze">Customer Feedback</p>
            <h2 className="display-lg mt-3 max-w-xl font-display">Client Satisfaction</h2>
            <p className="mt-3 max-w-xl text-base text-muted-foreground leading-relaxed">
              Read how homeowners, architects, and builders experience our surfaces, materials, and consultation support.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2 border border-border bg-card px-4 py-2.5">
                <div className="flex gap-1 text-[#E5A93C]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="size-4 fill-current" />
                  ))}
                </div>
                <span className="font-display text-lg font-bold">{ratingSummary.overall} / 5.0</span>
                <span className="text-xs text-muted-foreground">({ratingSummary.totalReviews} reviews)</span>
              </div>

              <Link
                to="/testimonials"
                className="btn-outline-stone inline-flex items-center gap-2 group"
              >
                <span>All Testimonials</span>
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {featured.map((item, index) => (
            <Reveal key={item.id} delay={index * 0.08}>
              <div className="flex h-full flex-col justify-between border border-border/80 bg-card p-8 transition-colors duration-300 hover:border-bronze">
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1 text-[#E5A93C]">
                      {[...Array(Math.floor(item.rating))].map((_, i) => (
                        <Star key={i} className="size-4 fill-current" />
                      ))}
                    </div>
                    <Quote className="size-5 text-muted-foreground/30" />
                  </div>

                  <p className="mt-6 text-sm leading-relaxed text-foreground/90 font-normal italic">
                    "{item.text}"
                  </p>
                </div>

                <div className="mt-8 border-t border-border/60 pt-5">
                  <p className="font-display text-base font-semibold text-foreground">
                    {item.name}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {item.role} · {item.location}
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
