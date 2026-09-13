import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, Phone, MessageSquare } from "lucide-react";
import { company, partners } from "@/data/catalog";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import heroInterior from "@/assets/hero-interior.jpg";

const title = "Our Partners — Shiv Trading | Biratnagar";
const description =
  "Shiv Trading collaborates with renowned manufacturers including Somany, Plumber, Spera Vitrified, SN, and Parryware to deliver exceptional tiles, surfaces, and sanitary solutions.";

export const Route = createFileRoute("/partners")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: PartnersPage,
});

function PartnersPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our Network"
        title="Trusted Partners."
        lead="We work with established brands to bring quality products and reliable solutions to every project."
        image={heroInterior}
      />

      <section className="mx-auto max-w-[1560px] px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <p className="eyebrow text-bronze">Brand Collaboration</p>
            <h2 className="display-lg mt-3 max-w-md font-display">
              Built on standards, delivered with care.
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="text-base leading-relaxed text-muted-foreground">
              At {company.name}, our commitment to "Innovation, Construction & Satisfaction" is reflected in the brands we choose to partner with. We source ceramic and vitrified surfaces, bathroom fittings, and plumbing hardware from industry pioneers who maintain rigorous quality control, durable finishes, and progressive design standards.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Whether you are an architect designing a signature residence, a developer planning commercial spaces, or a homeowner embarking on a renovation, our curated portfolio gives you direct access to certified materials backed by warranty and technical guidance.
            </p>
          </Reveal>
        </div>

        <div className="mt-20 space-y-12">
          {partners.map((partner, index) => (
            <Reveal key={partner.id} delay={index * 0.05}>
              <div className="grid items-center gap-8 border border-border/80 bg-card p-6 sm:p-10 lg:grid-cols-[300px_1fr_220px] transition-colors hover:border-bronze">
                <div className="flex flex-col items-center justify-center border-b border-border/60 pb-6 sm:pb-8 lg:border-b-0 lg:border-r lg:pr-8">
                  <div className="flex h-24 w-full items-center justify-center p-3 bg-muted/20">
                    <img
                      src={partner.logo}
                      alt={`${partner.name} logo`}
                      loading="lazy"
                      className="max-h-16 w-auto max-w-full object-contain"
                    />
                  </div>
                  {partner.badgeSubtitle && (
                    <span className="mt-3 text-[11px] font-medium tracking-[0.14em] uppercase text-muted-foreground">
                      {partner.badgeSubtitle}
                    </span>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="flex flex-wrap items-baseline gap-3">
                    <h3 className="font-display text-2xl text-foreground font-semibold">
                      {partner.name}
                    </h3>
                    <span className="eyebrow text-bronze text-[11px]">{partner.category}</span>
                  </div>

                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {partner.description}
                  </p>

                  <div className="pt-2">
                    <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-foreground">
                      Featured Products & Systems:
                    </p>
                    <div className="mt-2.5 flex flex-wrap gap-2">
                      {partner.products.map((prod) => (
                        <span
                          key={prod}
                          className="inline-flex items-center gap-1.5 border border-border bg-background px-3 py-1 text-xs text-foreground/85"
                        >
                          <CheckCircle2 className="size-3 text-bronze shrink-0" />
                          <span>{prod}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-3 border-t border-border/60 pt-6 sm:pt-0 lg:border-t-0 lg:border-l lg:pl-8">
                  <Link
                    to="/contact"
                    hash="enquiry"
                    className="btn-stone text-center text-xs tracking-[0.16em]"
                  >
                    Enquire Brand
                  </Link>
                  <a
                    href={`https://wa.me/977${company.whatsapp[0]}?text=Hello%20Shiv%20Trading,%20I%20am%20interested%20in%20${encodeURIComponent(partner.name)}%20products.`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 border border-[#25D366]/40 py-2.5 text-xs tracking-[0.14em] uppercase font-semibold text-[#25D366] hover:bg-[#25D366]/10 transition-colors"
                  >
                    <MessageSquare className="size-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-20 border-t border-border bg-limestone/50 p-8 sm:p-14 text-center">
          <Reveal>
            <p className="eyebrow text-bronze">Ready to visualize in your space?</p>
            <h2 className="display-md mt-3 font-display">Experience partner materials in 3D.</h2>
            <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground">
              Use our interactive surface visualizer to see how different finishes look across living rooms, bathrooms, kitchens, and outdoor spaces.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a href="/#visualizer" className="btn-stone">
                Explore Surface Visualizer
              </a>
              <Link to="/contact" className="btn-outline-stone">
                Contact Showroom
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
