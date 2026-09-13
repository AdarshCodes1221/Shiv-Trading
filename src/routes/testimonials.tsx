import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Star, Quote, CheckCircle2, MessageSquare, ThumbsUp } from "lucide-react";
import { ratingSummary, testimonials } from "@/data/catalog";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import spaceLiving from "@/assets/space-living.jpg";

const title = "Customer Testimonials & Ratings — Shiv Trading | Biratnagar";
const description =
  "Read customer ratings and feedback from homeowners, interior designers, and contractors who trust Shiv Trading for luxury tiles, marble, and sanitaryware in Biratnagar.";

export const Route = createFileRoute("/testimonials")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: TestimonialsPage,
});

function TestimonialsPage() {
  const [filter, setFilter] = useState<string>("All");

  const filteredTestimonials =
    filter === "All"
      ? testimonials
      : testimonials.filter((t) => t.projectType === filter);

  return (
    <>
      <PageHeader
        eyebrow="Feedback & Ratings"
        title="Customer Reviews."
        lead="Genuine satisfaction across residential villas, commercial showrooms, and renovation projects."
        image={spaceLiving}
      />

      <section className="mx-auto max-w-[1560px] px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        {/* Rating Overview Card */}
        <div className="grid gap-10 border border-border/80 bg-card p-8 sm:p-12 lg:grid-cols-[1fr_1.3fr] items-center">
          <Reveal>
            <div>
              <p className="eyebrow text-bronze">Aggregate Satisfaction</p>
              <div className="mt-4 flex items-baseline gap-4">
                <span className="font-display text-6xl font-bold tracking-tight text-foreground sm:text-7xl">
                  {ratingSummary.overall}
                </span>
                <div className="space-y-1">
                  <div className="flex gap-1 text-[#E5A93C]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="size-5 fill-current" />
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Based on {ratingSummary.totalReviews} customer reviews
                  </p>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-2 text-sm text-foreground/80">
                <ThumbsUp className="size-4 text-bronze" />
                <span>
                  <strong>{ratingSummary.recommendationRate}</strong> of clients recommend Shiv Trading
                </span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="space-y-4 border-t border-border/60 pt-6 lg:border-t-0 lg:border-l lg:pl-10 lg:pt-0">
              <p className="text-xs font-semibold tracking-[0.16em] uppercase text-foreground">
                Rating Breakdown by Category
              </p>
              <div className="space-y-3">
                {ratingSummary.breakdown.map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">{item.label}</span>
                      <span className="font-semibold text-foreground">{item.score} / 5.0</span>
                    </div>
                    <div className="mt-1.5 h-2 w-full overflow-hidden bg-muted">
                      <div
                        className="h-full bg-bronze transition-all duration-700"
                        style={{ width: `${(item.score / 5) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* Filter Buttons */}
        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6">
          <div className="flex flex-wrap gap-2">
            {["All", "Residential", "Commercial", "Renovation"].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 text-xs font-semibold tracking-[0.16em] uppercase transition-colors ${
                  filter === cat
                    ? "bg-charcoal text-primary-foreground"
                    : "border border-border bg-card text-muted-foreground hover:border-foreground hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <p className="text-xs text-muted-foreground">
            Showing {filteredTestimonials.length} reviews
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredTestimonials.map((item, index) => (
            <Reveal key={item.id} delay={index * 0.05}>
              <div className="flex h-full flex-col justify-between border border-border/80 bg-card p-8 transition-colors duration-300 hover:border-bronze">
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1 text-[#E5A93C]">
                      {[...Array(Math.floor(item.rating))].map((_, i) => (
                        <Star key={i} className="size-4 fill-current" />
                      ))}
                      {item.rating % 1 !== 0 && (
                        <Star className="size-4 fill-current opacity-60" />
                      )}
                    </div>
                    <span className="eyebrow text-[10px] text-muted-foreground">{item.projectType}</span>
                  </div>

                  <p className="mt-6 text-sm leading-relaxed text-foreground/90 font-normal italic">
                    "{item.text}"
                  </p>
                </div>

                <div className="mt-8 border-t border-border/60 pt-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-display text-base font-semibold text-foreground">
                        {item.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {item.role} · {item.location}
                      </p>
                    </div>
                    <Quote className="size-5 text-muted-foreground/20" />
                  </div>
                  <p className="mt-2 text-[10px] tracking-[0.14em] uppercase text-muted-foreground/60">
                    {item.date}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Note on Sample/Verified Content & Share experience CTA */}
        <div className="mt-20 border border-dashed border-border p-8 text-center sm:p-12">
          <Reveal>
            <p className="eyebrow text-bronze">Share Your Feedback</p>
            <h3 className="display-md mt-3 font-display">Have you collaborated with Shiv Trading?</h3>
            <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
              We value client feedback on our surfaces, tiles, and installation coordination. Your experience helps us continually improve our quality and service in Biratnagar.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link to="/contact" hash="enquiry" className="btn-stone">
                Send Your Feedback
              </Link>
              <a href="/#visualizer" className="btn-outline-stone">
                Try 3D Surface Visualizer
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
