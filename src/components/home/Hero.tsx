import { Link } from "@tanstack/react-router";
import { Sparkles, Eye, ArrowDown, Compass } from "lucide-react";
import heroCinematic from "@/assets/hero-cinematic.jpg";
import { company } from "@/data/catalog";
import { useI18n } from "@/lib/i18n";

export function Hero() {
  const { t } = useI18n();

  return (
    <section className="relative min-h-[94svh] w-full overflow-hidden bg-onyx">
      {/* High-Resolution Cinematic Interior Background */}
      <img
        src={heroCinematic}
        alt="Shiv Trading luxury architectural interior featuring polished marble floors, fluted stone wall, and modern kitchen surfaces"
        width={1920}
        height={1080}
        fetchPriority="high"
        className="absolute inset-0 size-full object-cover object-center"
      />

      {/* Sophisticated Architectural Dark Overlay for Optimal Readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/30" />
      <div className="absolute inset-0 bg-black/20" />

      {/* Hero Content Container */}
      <div className="relative mx-auto flex min-h-[94svh] max-w-[1560px] flex-col justify-end px-5 pt-32 pb-16 text-primary-foreground sm:px-8 lg:px-12 lg:pb-24">
        {/* Small Eyebrow Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/25 bg-onyx/60 px-4 py-1.5 backdrop-blur-md w-fit">
          <Sparkles className="size-3.5 text-bronze" />
          <span className="text-[11px] font-semibold tracking-[0.22em] text-primary-foreground/90 uppercase">
            {t("hero.eyebrow")}
          </span>
        </div>

        {/* Large Heading */}
        <h1 className="display-xl mt-6 max-w-4xl font-display font-bold tracking-tight">
          {t("hero.title1")}
          <span className="block italic text-limestone font-light">
            {t("hero.title2")}
          </span>
        </h1>

        {/* Supporting Message & Direct CTAs */}
        <div className="mt-8 flex flex-col gap-8 border-t border-primary-foreground/20 pt-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-2 max-w-xl">
            <p className="text-base sm:text-lg leading-relaxed text-primary-foreground/90 font-medium">
              {t("hero.lede")}
            </p>
            <p className="text-xs text-stone-300/80">
              {company.name} • {company.nepaliName} • {company.district}, Near Veterinary Hospital
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#visualizer"
              className="btn-stone inline-flex items-center gap-2 bg-primary-foreground! text-charcoal! hover:bg-bronze! hover:text-primary-foreground! shadow-lg"
            >
              <Eye className="size-4" />
              <span>{t("cta.exploreVisualizer")}</span>
              <ArrowDown className="size-3.5 opacity-60" />
            </a>

            <Link
              to="/collections"
              className="btn-outline-stone inline-flex items-center gap-2 backdrop-blur-sm"
            >
              <Compass className="size-4 text-bronze" />
              <span>{t("cta.viewCollections")}</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
