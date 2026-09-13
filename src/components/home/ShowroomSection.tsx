import { Link } from "@tanstack/react-router";
import { MapPin, Phone, MessageSquare, Navigation, Sparkles, Clock, CheckCircle2 } from "lucide-react";
import { company } from "@/data/catalog";
import { Reveal } from "@/components/site/Reveal";

export function ShowroomSection() {
  return (
    <section className="border-t border-border bg-limestone/30 py-24 sm:py-32">
      <div className="mx-auto max-w-[1560px] px-5 sm:px-8 lg:px-12">
        <Reveal>
          <div className="flex items-center gap-2 text-bronze">
            <Sparkles className="size-4" />
            <p className="eyebrow tracking-[0.2em] text-bronze">Physical Showroom Experience</p>
          </div>
          <h2 className="display-lg mt-3 max-w-2xl font-display">
            Visit Our Showroom.
          </h2>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground leading-relaxed">
            See our surfaces, tiles, sanitaryware and materials in person. Walk through real slab displays, test surface finishes under daylight, and consult with our material specialists.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1.25fr_0.75fr] items-center">
          {/* Real Showroom Exterior Photo */}
          <Reveal>
            <div className="group relative overflow-hidden border border-border shadow-xl bg-card">
              <img
                src={company.showroomExterior}
                alt="Shiv Trading showroom exterior building in Biratnagar-13, showing Somany Tiles, Bathware, and Plumber displays"
                loading="lazy"
                width={1024}
                height={723}
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs">
                <span className="font-display tracking-wider uppercase font-semibold bg-onyx/80 backdrop-blur-sm px-3 py-1.5 border border-white/20">
                  Biratnagar-13 Showroom
                </span>
                <span className="hidden sm:inline-block text-white/80 bg-onyx/70 backdrop-blur-sm px-3 py-1.5">
                  Somany · Plumber · Natural Stone
                </span>
              </div>
            </div>
          </Reveal>

          {/* Showroom Details & Action CTAs */}
          <Reveal delay={0.1}>
            <div className="flex flex-col justify-between space-y-8 border border-border/80 bg-card p-8 sm:p-10">
              <div>
                <p className="eyebrow text-bronze">Showroom Location</p>
                <h3 className="font-display text-3xl font-bold text-foreground mt-2">
                  {company.name}
                </h3>
                <p className="mt-1 text-xs italic tracking-wider text-bronze">
                  "{company.tagline}"
                </p>

                <div className="mt-6 space-y-4 text-sm">
                  <div className="flex items-start gap-3">
                    <MapPin className="size-5 text-bronze shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-foreground text-base">
                        {company.address}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        Near Veterinary Hospital · Biratnagar, Nepal
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock className="size-5 text-bronze shrink-0" />
                    <div>
                      <p className="font-medium text-foreground">Sunday – Friday</p>
                      <p className="text-xs text-muted-foreground">9:00 AM – 7:30 PM</p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-border/60">
                    <p className="text-xs text-muted-foreground">
                      We showcase full-format vitrified slabs, authentic North & South Indian marble samples, kitchen sinks, chimneys, and complete bathroom fitting suites.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3 pt-2">
                <a
                  href={company.directionsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-stone inline-flex items-center justify-center gap-2 text-center text-xs tracking-[0.16em]"
                >
                  <Navigation className="size-4" />
                  <span>Get Directions on Google Maps</span>
                </a>

                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={`tel:${company.phoneTel}`}
                    className="inline-flex items-center justify-center gap-2 border border-border py-3 text-xs tracking-[0.14em] uppercase font-semibold text-foreground hover:bg-muted transition-colors"
                  >
                    <Phone className="size-3.5 text-bronze" />
                    <span>Call Showroom</span>
                  </a>

                  <a
                    href={company.whatsappLinks[0]}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white py-3 text-xs tracking-[0.14em] uppercase font-semibold hover:bg-[#20bd5a] transition-colors"
                  >
                    <MessageSquare className="size-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
