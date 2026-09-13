import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Phone,
  MessageSquare,
  MapPin,
  Navigation,
  ExternalLink,
  Clock,
  Send,
  CheckCircle2,
  Building2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { company, collections, projectTypes } from "@/data/catalog";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import { GoogleMap } from "@/components/site/GoogleMap";
import { PartnersSection } from "@/components/home/PartnersSection";
import spaceBath from "@/assets/space-bath.jpg";

const title = "Contact & Showroom — Shiv Trading | Biratnagar";
const description =
  "Contact Shiv Trading in Biratnagar for premium tiles, marble, granite, sanitaryware, and CPVC fittings. Phone: +977 9852023064 | WhatsApp: +977 9816300663 / +977 9815344564. Located at Biratnagar-13, Near Veterinary Hospital.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <>
      <PageHeader
        eyebrow="Contact & Location"
        title="Contact Shiv Trading"
        lead="Let's build something beautiful. Visit our Biratnagar showroom or connect directly with our materials team for surface selection, architectural consultations, and delivery coordination."
        image={spaceBath}
      />

      {/* Primary Section: Contact Details (Left) + Interactive Google Map (Right) */}
      <section className="mx-auto max-w-[1560px] px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16 items-start">
          {/* Left Column: Official Contact Information */}
          <Reveal>
            <div className="space-y-8">
              <div>
                <p className="text-[11px] font-semibold tracking-[0.24em] text-bronze uppercase">
                  Direct Inquiries & Showroom Desk
                </p>
                <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                  Connect with our team in Biratnagar.
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Whether you are remodeling a residence, sourcing vitrified tiles for a commercial complex, or fitting luxury bathware, our on-site team is here to assist.
                </p>
              </div>

              {/* Polished Location Block */}
              <div className="border border-border/90 bg-card p-6 sm:p-8">
                <div className="flex items-start gap-4">
                  <div className="flex size-11 shrink-0 items-center justify-center bg-bronze/10 text-bronze">
                    <MapPin className="size-5" />
                  </div>
                  <div className="flex-1">
                    <span className="text-[10px] font-semibold tracking-[0.2em] text-bronze uppercase">
                      Official Showroom
                    </span>
                    <h3 className="mt-1 font-display text-2xl font-bold tracking-wide text-foreground">
                      SHIV TRADING
                    </h3>
                    <p className="mt-2 text-base font-medium text-foreground">
                      Biratnagar-13
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Near Veterinary Hospital, Biratnagar, Nepal
                    </p>

                    <div className="mt-4 flex flex-wrap items-center gap-3 pt-2">
                      <a
                        href={company.googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 border border-border px-3.5 py-2 text-xs font-semibold tracking-wider text-foreground uppercase transition-colors hover:border-bronze hover:text-bronze"
                      >
                        <ExternalLink className="size-3.5" />
                        <span>View on Map</span>
                      </a>
                      <a
                        href={company.directionsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 bg-bronze px-4 py-2 text-xs font-semibold tracking-wider text-white uppercase transition-colors hover:bg-bronze-dark"
                      >
                        <Navigation className="size-3.5" />
                        <span>Get Directions</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Phone & WhatsApp Grid */}
              <div className="grid gap-6 sm:grid-cols-2">
                {/* Phone Card */}
                <div className="flex flex-col justify-between border border-border/80 bg-card p-6">
                  <div>
                    <div className="flex size-10 items-center justify-center bg-bronze/10 text-bronze">
                      <Phone className="size-5" />
                    </div>
                    <h4 className="mt-4 font-display text-lg font-semibold text-foreground">
                      Showroom Phone
                    </h4>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Direct voice line for quick questions & orders
                    </p>
                    <p className="mt-4 font-display text-xl font-bold tracking-wide text-foreground">
                      {company.phone}
                    </p>
                  </div>
                  <div className="mt-6">
                    <a
                      href={`tel:${company.phoneTel}`}
                      className="inline-flex w-full items-center justify-center gap-2 bg-foreground px-4 py-2.5 text-xs font-semibold tracking-wider text-background uppercase transition-opacity hover:opacity-90"
                    >
                      <Phone className="size-3.5" />
                      <span>Call {company.phone}</span>
                    </a>
                  </div>
                </div>

                {/* WhatsApp Card */}
                <div className="flex flex-col justify-between border border-border/80 bg-card p-6">
                  <div>
                    <div className="flex size-10 items-center justify-center bg-[#25D366]/10 text-[#25D366]">
                      <MessageSquare className="size-5" />
                    </div>
                    <h4 className="mt-4 font-display text-lg font-semibold text-foreground">
                      WhatsApp Inquiries
                    </h4>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Chat directly, request catalogs, or share site plans
                    </p>
                    <div className="mt-4 space-y-1">
                      {company.whatsapp.map((num) => (
                        <p key={num} className="font-display text-sm font-semibold text-foreground">
                          +977 {num}
                        </p>
                      ))}
                    </div>
                  </div>
                  <div className="mt-6 space-y-2">
                    <a
                      href={company.whatsappLinks[0]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full items-center justify-center gap-2 bg-[#25D366] px-4 py-2 text-xs font-semibold tracking-wider text-white uppercase transition-opacity hover:opacity-90"
                    >
                      <MessageSquare className="size-3.5" />
                      <span>Chat: {company.whatsapp[0]}</span>
                    </a>
                    <a
                      href={company.whatsappLinks[1]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-full items-center justify-center gap-2 border border-[#25D366] px-4 py-1.5 text-xs font-semibold tracking-wider text-[#25D366] uppercase transition-colors hover:bg-[#25D366]/10"
                    >
                      <span>Chat: {company.whatsapp[1]}</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Showroom Hours & Landmark info */}
              <div className="flex items-center justify-between border-t border-border/60 pt-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Clock className="size-4 text-bronze" />
                  <span>Sunday – Friday: 9:00 AM – 7:00 PM</span>
                </div>
                <span>Saturday: On Call / Appointment</span>
              </div>
            </div>
          </Reveal>

          {/* Right Column: Official Google Map */}
          <Reveal delay={0.1}>
            <div className="sticky top-28 space-y-4">
              <GoogleMap height="h-[480px] sm:h-[520px]" />
              <p className="text-right text-[11px] text-muted-foreground">
                Directions target: Shiv Trading, Biratnagar-13 (Near Veterinary Hospital)
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Editorial "Visit Our Showroom" Section with Real Exterior Photo */}
      <section className="border-t border-border/80 bg-card/40 py-20 sm:py-28">
        <div className="mx-auto max-w-[1560px] px-5 sm:px-8 lg:px-12">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            {/* Real Exterior Showroom Photograph */}
            <div className="lg:col-span-7">
              <div className="group relative overflow-hidden border border-border/80 bg-card shadow-2xl">
                <img
                  src={company.showroomExterior}
                  alt="Shiv Trading showroom exterior in Biratnagar-13 with Somany and Plumber signage"
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  width={1024}
                  height={768}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                <div className="absolute bottom-5 left-5 right-5 flex flex-wrap items-center justify-between gap-3 text-white">
                  <div>
                    <span className="inline-block rounded-none bg-bronze px-2.5 py-0.5 text-[10px] font-semibold tracking-widest uppercase">
                      Physical Showroom
                    </span>
                    <p className="mt-1 font-display text-lg font-semibold sm:text-xl">
                      Shiv Trading — Biratnagar-13
                    </p>
                    <p className="text-xs text-stone-300">
                      Somany Tiles & Bathware • Plumber Faucets • Sanitary Suites
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Content & Action Buttons */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <p className="text-[11px] font-semibold tracking-[0.24em] text-bronze uppercase">
                  In-Person Inspection
                </p>
                <h3 className="mt-2 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                  Visit Our Showroom.
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  See our surfaces, tiles, sanitaryware, and materials in person. Experience genuine tile glazes, inspect porcelain slab thickness, and review bathroom fixtures under natural lighting before finalizing your order.
                </p>
              </div>

              {/* Three Specific Actions */}
              <div className="space-y-3 pt-2">
                <a
                  href={`tel:${company.phoneTel}`}
                  className="flex w-full items-center justify-between border border-border bg-card px-5 py-3.5 text-xs font-semibold tracking-wider text-foreground uppercase transition-colors hover:border-bronze hover:text-bronze"
                >
                  <span className="flex items-center gap-2">
                    <Phone className="size-4 text-bronze" /> Call Now ({company.phone})
                  </span>
                  <span className="text-[11px] text-muted-foreground">Direct Line</span>
                </a>

                <a
                  href={company.whatsappLinks[0]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-between bg-[#25D366] px-5 py-3.5 text-xs font-semibold tracking-wider text-white uppercase transition-opacity hover:opacity-90"
                >
                  <span className="flex items-center gap-2">
                    <MessageSquare className="size-4" /> WhatsApp Us (+977 {company.whatsapp[0]})
                  </span>
                  <span className="text-[11px] text-white/80">Instant Chat</span>
                </a>

                <a
                  href={company.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-between bg-bronze px-5 py-3.5 text-xs font-semibold tracking-wider text-white uppercase transition-colors hover:bg-bronze-dark"
                >
                  <span className="flex items-center gap-2">
                    <Navigation className="size-4" /> Get Directions
                  </span>
                  <span className="text-[11px] text-white/90">Via Google Maps</span>
                </a>
              </div>

              {/* Showroom Benefits */}
              <div className="grid grid-cols-2 gap-4 border-t border-border/80 pt-6">
                <div className="flex items-start gap-2.5">
                  <ShieldCheck className="size-4 text-bronze shrink-0 mt-0.5" />
                  <span className="text-xs text-muted-foreground">
                    100% Genuine Partner Warranties
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Building2 className="size-4 text-bronze shrink-0 mt-0.5" />
                  <span className="text-xs text-muted-foreground">
                    Direct Wholesale & Retail Sourcing
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Consultation & Sample Request Form */}
      <section
        id="enquiry"
        className="mx-auto max-w-[1560px] scroll-mt-24 px-5 py-20 sm:px-8 sm:py-24 lg:px-12"
      >
        <div className="grid gap-16 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <p className="text-[11px] font-semibold tracking-[0.24em] text-bronze uppercase">
              Project Consultation
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Tell us about your space.
            </h2>
            <p className="mt-3 max-w-lg text-sm text-muted-foreground leading-relaxed">
              Share your room dimensions, preferred surface look, or partner brands—our team in Biratnagar will review your requirements and provide tailored recommendations.
            </p>

            {sent ? (
              <div className="mt-10 border border-bronze/40 bg-card p-8">
                <div className="flex items-center gap-3 text-bronze">
                  <CheckCircle2 className="size-6" />
                  <p className="font-display text-2xl text-foreground font-semibold">
                    Thank you for your enquiry.
                  </p>
                </div>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  Your request has been received. A materials specialist from our {company.city} showroom will get in touch via phone or WhatsApp shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setSent(false)}
                  className="btn-outline-stone mt-6 text-xs"
                >
                  Submit Another Enquiry
                </button>
              </div>
            ) : (
              <form
                className="mt-8 grid gap-5 sm:grid-cols-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
              >
                <Field label="Full Name" name="name" required placeholder="e.g. Ramesh Karki" />
                <Field label="Phone / Mobile" name="contact" required placeholder="e.g. 98XXXXXXXX" />

                <label className="flex flex-col gap-2 text-[11px] tracking-[0.2em] uppercase text-muted-foreground">
                  Project Type
                  <select
                    name="projectType"
                    className="border border-border bg-background px-4 py-3 text-sm tracking-normal text-foreground normal-case outline-none focus:border-bronze"
                  >
                    {projectTypes.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="flex flex-col gap-2 text-[11px] tracking-[0.2em] uppercase text-muted-foreground">
                  Product Category
                  <select
                    name="interest"
                    className="border border-border bg-background px-4 py-3 text-sm tracking-normal text-foreground normal-case outline-none focus:border-bronze"
                  >
                    {collections.map((c) => (
                      <option key={c.slug} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="flex flex-col gap-2 text-[11px] tracking-[0.2em] uppercase text-muted-foreground sm:col-span-2">
                  Space Details & Requirements
                  <textarea
                    name="details"
                    rows={4}
                    placeholder="Rooms (living room, bathroom, kitchen), approximate area (sq. ft.), finish preference, partner brand choice, or expected timeline."
                    className="border border-border bg-background px-4 py-3 text-sm tracking-normal text-foreground normal-case outline-none placeholder:text-muted-foreground/60 focus:border-bronze"
                  />
                </label>

                <button
                  type="submit"
                  className="btn-stone sm:col-span-2 sm:justify-self-start inline-flex items-center gap-2"
                >
                  <Send className="size-3.5" />
                  <span>Send Showroom Enquiry</span>
                </button>
              </form>
            )}
          </Reveal>

          {/* Right side consultation details & QR */}
          <Reveal delay={0.1}>
            <div className="border-t border-border pt-8 lg:border-t-0 lg:border-l lg:pl-12 space-y-8">
              <div>
                <p className="text-[11px] font-semibold tracking-[0.24em] text-bronze uppercase">
                  Digital Catalog & Visualizer
                </p>
                <h3 className="mt-2 font-display text-2xl font-semibold text-foreground">
                  Scan to explore on your mobile device
                </h3>
                <p className="mt-2 text-xs text-muted-foreground">
                  Access our full surface catalog and real-time 3D room visualizer on any phone or tablet while planning your construction.
                </p>
                <div className="mt-4 inline-block border border-border bg-white p-3 shadow-md">
                  <img
                    src={company.qrCode}
                    alt="Shiv Trading Digital Catalog QR Code"
                    loading="lazy"
                    width={130}
                    height={130}
                    className="size-28 object-contain"
                  />
                </div>
              </div>

              <div className="border-t border-border/80 pt-6">
                <span className="text-[10px] font-semibold tracking-[0.2em] text-bronze uppercase">
                  Direct In-Person Support
                </span>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                  Have architectural blueprints or contractor bill of quantities? Bring them directly to our Biratnagar-13 showroom or send them via WhatsApp to receive precise quantity takeoffs and brand comparisons.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Partner Brands */}
      <PartnersSection />

      {/* Final Call to Action */}
      <section className="border-t border-border bg-card py-16 text-center">
        <div className="mx-auto max-w-3xl px-5">
          <p className="text-[11px] font-semibold tracking-[0.24em] text-bronze uppercase">
            Start Your Project
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-foreground sm:text-4xl">
            Visit Shiv Trading or contact us to explore our collection.
          </h2>
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
            Our Biratnagar showroom is open Sunday through Friday. Touch real marble slabs, explore Somany tile patterns, and test Plumber bath fittings in person.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href={`tel:${company.phoneTel}`}
              className="btn-stone inline-flex items-center gap-2"
            >
              <Phone className="size-4" />
              <span>Call Now ({company.phone})</span>
            </a>
            <a
              href={company.whatsappLinks[0]}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] px-6 py-3 text-xs font-semibold tracking-wider text-white uppercase transition-opacity hover:opacity-90"
            >
              <MessageSquare className="size-4" />
              <span>WhatsApp Us</span>
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

function Field({
  label,
  name,
  required,
  placeholder,
}: {
  label: string;
  name: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="flex flex-col gap-2 text-[11px] tracking-[0.2em] uppercase text-muted-foreground">
      {label}
      <input
        name={name}
        required={required}
        placeholder={placeholder}
        className="border border-border bg-background px-4 py-3 text-sm tracking-normal text-foreground normal-case outline-none focus:border-bronze placeholder:text-muted-foreground/50"
      />
    </label>
  );
}
