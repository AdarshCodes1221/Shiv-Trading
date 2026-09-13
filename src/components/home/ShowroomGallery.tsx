import { useState } from "react";
import { ExternalLink, Layers, CheckCircle2 } from "lucide-react";
import { company, showroomGallery, type ShowroomItem } from "@/data/catalog";
import { Reveal } from "@/components/site/Reveal";

export function ShowroomGallery() {
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", "Showroom", "Tiles & Surfaces", "Bathrooms", "Interiors"];

  const filteredItems =
    activeCategory === "All"
      ? showroomGallery
      : showroomGallery.filter((item) => item.category === activeCategory);

  return (
    <section className="border-t border-border py-24 sm:py-32">
      <div className="mx-auto max-w-[1560px] px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <div className="flex items-center gap-2 text-bronze">
              <Layers className="size-4" />
              <p className="eyebrow tracking-[0.2em] text-bronze">Showroom & Material Gallery</p>
            </div>
            <h2 className="display-lg mt-3 max-w-xl font-display">
              Explore Our Work.
            </h2>
            <p className="mt-3 max-w-xl text-base text-muted-foreground leading-relaxed">
              Browse real photographs of our Biratnagar showroom exterior, surface showcases, bathroom displays, and large-format vitrified tile layouts.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 text-xs font-semibold tracking-[0.14em] uppercase transition-colors ${
                    activeCategory === cat
                      ? "bg-charcoal text-primary-foreground shadow-sm"
                      : "border border-border bg-card text-muted-foreground hover:border-foreground hover:text-foreground"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Image Grid */}
        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
          {filteredItems.map((item, index) => (
            <Reveal key={item.id} delay={index * 0.08}>
              <div className="group relative flex flex-col overflow-hidden border border-border/80 bg-card transition-all duration-500 hover:border-bronze hover:shadow-lg">
                <div className="relative aspect-16/10 w-full overflow-hidden bg-muted">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    width={1024}
                    height={600}
                    className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40 transition-opacity group-hover:opacity-70" />

                  {item.badge && (
                    <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 bg-onyx/85 px-3 py-1 text-[11px] font-medium tracking-wider uppercase text-white backdrop-blur-sm border border-white/20">
                      <CheckCircle2 className="size-3 text-bronze" />
                      {item.badge}
                    </span>
                  )}
                </div>

                <div className="flex flex-1 flex-col justify-between p-6 sm:p-8">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="eyebrow text-bronze text-[11px]">{item.category}</span>
                    </div>
                    <h3 className="font-display text-xl font-bold text-foreground mt-2 group-hover:text-bronze transition-colors">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center justify-between border-t border-border/60 pt-4 text-xs">
                    <span className="text-muted-foreground">Shiv Trading · Biratnagar-13</span>
                    <a
                      href={company.whatsappLinks[0]}
                      target="_blank"
                      rel="noreferrer"
                      className="font-semibold text-bronze hover:underline inline-flex items-center gap-1"
                    >
                      Enquire Slabs <ExternalLink className="size-3" />
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Facebook link note */}
        <div className="mt-14 border border-border/60 bg-muted/20 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-display text-lg font-semibold text-foreground">
              More Showroom & Project Photography
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Explore additional photo updates, newly arrived tile batches, and bathroom collections on our official Facebook gallery.
            </p>
          </div>
          <a
            href={company.facebookPhotosUrl}
            target="_blank"
            rel="noreferrer"
            className="btn-outline-stone text-xs whitespace-nowrap"
          >
            Visit Facebook Gallery →
          </a>
        </div>
      </div>
    </section>
  );
}
