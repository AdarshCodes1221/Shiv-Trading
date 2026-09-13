import { createFileRoute } from "@tanstack/react-router";
import {
  Building2,
  CheckCircle2,
  Phone,
  MessageSquare,
  Navigation,
  Layers,
  Sparkles,
  Droplets,
  Wrench,
  Compass,
} from "lucide-react";
import { company } from "@/data/catalog";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import { PartnersSection } from "@/components/home/PartnersSection";
import spaceBath from "@/assets/space-bath.jpg";

const title = "About Us — Shiv Trading | Innovation, Construction & Satisfaction";
const description =
  "Shiv Trading is Biratnagar's premier destination for premium tiles, marble, granite, CPVC fittings, and sanitaryware. Operating under the motto: Innovation, Construction & Satisfaction.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: AboutPage,
});

const corePillars = [
  {
    title: "Innovation",
    desc: "Bringing high-performance large-format glazed vitrified tiles, precision manufacturing, and interactive digital 3D visualization to our clients.",
  },
  {
    title: "Construction",
    desc: "Supplying enduring materials—from certified CPVC pressure fittings to structural granites and commercial-grade porcelain surfaces.",
  },
  {
    title: "Satisfaction",
    desc: "Guiding homeowners, contractors, and architects through personalized material matching, authentic warranties, and dependable delivery.",
  },
];

const productDomains = [
  {
    icon: Layers,
    title: "Vitrified & Ceramic Tiles",
    desc: "Floor tiles, wall tiles, digital glazed vitrified slabs, outdoor pavers, and high-gloss polished surfaces from leading Indian manufacturers like Somany.",
  },
  {
    icon: Sparkles,
    title: "Natural Marble & Slabs",
    desc: "Imported and Indian natural marble, bookmatched vein slabs, and durable architectural granite countertops for kitchens and staircases.",
  },
  {
    icon: Droplets,
    title: "Sanitaryware & Bath Suites",
    desc: "Vitreous china washbasins, wall-hung water closets, vanity sinks, and integrated bath furniture for contemporary bathrooms.",
  },
  {
    icon: Wrench,
    title: "CPVC & Plumbing Fittings",
    desc: "High-grade CPVC pipes, brass quarter-turn taps, shower mixers, diverters, and heavy-duty drainage plumbing solutions from trusted brands like Plumber.",
  },
  {
    icon: Compass,
    title: "Decorative Surfaces & Cladding",
    desc: "Exterior wall elevation tiles, interior feature wall cladding, and textured stone finishes engineered for tropical weather resilience.",
  },
  {
    icon: Building2,
    title: "Construction & Interior Essentials",
    desc: "Adhesives, epoxy grouts, edge profiles, and waterproofing complements essential for long-term crack-free installations.",
  },
];

function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="Company Overview"
        title="Innovation, Construction & Satisfaction."
        lead="Shiv Trading is Biratnagar's dedicated destination for premium architectural surfaces, sanitary suites, and dependable building materials."
        image={spaceBath}
      />

      {/* Real Showroom Identity Section */}
      <section className="mx-auto max-w-[1560px] px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 items-center">
          {/* Left: Real Showroom Photograph */}
          <div className="lg:col-span-6">
            <Reveal>
              <div className="group relative overflow-hidden border border-border/80 bg-card shadow-2xl">
                <img
                  src={company.showroomExterior}
                  alt="Shiv Trading physical showroom in Biratnagar-13 with Somany Tiles and Plumber Bathware signs"
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  width={1024}
                  height={768}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="inline-block bg-bronze px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider">
                    Our Premises
                  </span>
                  <p className="mt-1 font-display text-lg font-bold">
                    Shiv Trading — Biratnagar-13
                  </p>
                  <p className="text-xs text-stone-300">
                    Located near Veterinary Hospital, Biratnagar
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right: Who We Are & Heritage */}
          <div className="lg:col-span-6 space-y-6">
            <Reveal delay={0.1}>
              <p className="text-[11px] font-semibold tracking-[0.24em] text-bronze uppercase">
                Who We Are
              </p>
              <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                A physical showroom grounded in Biratnagar.
              </h2>
              <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted-foreground">
                <p>
                  Shiv Trading operates from our dedicated multi-story showroom located at Biratnagar-13, near the Veterinary Hospital. We bridge top-tier architectural manufacturers with homeowners, contractors, and builders across Koshi Province.
                </p>
                <p>
                  Rather than selecting materials from small catalogs, our showroom allows clients to walk on actual vitrified tile samples, inspect full-scale marble slab veining, test sanitary fixtures, and consult directly on technical plumbing requirements.
                </p>
              </div>

              {/* Verified Pillars */}
              <div className="mt-8 grid gap-4 sm:grid-cols-3 border-t border-border/80 pt-6">
                {corePillars.map((pillar) => (
                  <div key={pillar.title} className="space-y-1">
                    <h3 className="font-display text-base font-semibold text-foreground">
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Core Product Capabilities */}
      <section className="border-t border-border/80 bg-card/40 py-20 sm:py-28">
        <div className="mx-auto max-w-[1560px] px-5 sm:px-8 lg:px-12">
          <Reveal>
            <div className="max-w-2xl">
              <p className="text-[11px] font-semibold tracking-[0.24em] text-bronze uppercase">
                Product Domains
              </p>
              <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                What we supply and represent.
              </h2>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                Shiv Trading specializes in complete surface and plumbing solutions, ensuring cohesive design and structural reliability for modern construction.
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {productDomains.map((domain) => {
                const Icon = domain.icon;
                return (
                  <div
                    key={domain.title}
                    className="border border-border/80 bg-card p-6 transition-all hover:border-bronze"
                  >
                    <div className="flex size-10 items-center justify-center bg-bronze/10 text-bronze">
                      <Icon className="size-5" />
                    </div>
                    <h3 className="mt-4 font-display text-lg font-semibold text-foreground">
                      {domain.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                      {domain.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Partner Brands */}
      <PartnersSection />

      {/* Showroom Visit CTA */}
      <section className="border-t border-border bg-card py-16 text-center">
        <div className="mx-auto max-w-3xl px-5">
          <p className="text-[11px] font-semibold tracking-[0.24em] text-bronze uppercase">
            Experience It Live
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-foreground sm:text-4xl">
            See our materials in person at our Biratnagar showroom.
          </h2>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
            Our showroom team is available Sunday through Friday to walk you through finishes, mockups, and quantity estimations.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href={`tel:${company.phoneTel}`}
              className="btn-stone inline-flex items-center gap-2"
            >
              <Phone className="size-4" />
              <span>Call Showroom ({company.phone})</span>
            </a>
            <a
              href={company.whatsappLinks[0]}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] px-6 py-3 text-xs font-semibold tracking-wider text-white uppercase transition-opacity hover:opacity-90"
            >
              <MessageSquare className="size-4" />
              <span>Chat on WhatsApp</span>
            </a>
            <a
              href={company.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-stone inline-flex items-center gap-2"
            >
              <Navigation className="size-4 text-bronze" />
              <span>Get Directions</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
