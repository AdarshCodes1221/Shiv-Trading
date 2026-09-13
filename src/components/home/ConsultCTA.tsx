import { Link } from "@tanstack/react-router";
import { company } from "@/data/catalog";
import { Reveal } from "@/components/site/Reveal";

export function ConsultCTA() {
  return (
    <section className="border-t border-border bg-limestone py-24 sm:py-32">
      <div className="mx-auto max-w-[1560px] px-5 sm:px-8 lg:px-12">
        <Reveal className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow">08 — Visit us</p>
            <h2 className="display-lg mt-5 max-w-xl">
              Come see the slabs in daylight.
            </h2>
            <p className="mt-6 max-w-md text-sm text-muted-foreground">
              {company.name} — {company.city}, {company.country}. Bring your plans and we will
              specify tiles, stone and fittings with you.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/contact" hash="enquiry" className="btn-stone">
              Request a consultation
            </Link>
            <Link to="/showroom" className="btn-outline-stone">
              Showroom
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
