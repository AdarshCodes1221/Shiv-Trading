import detailMarble from "@/assets/detail-marble.jpg";
import detailFittings from "@/assets/detail-fittings.jpg";
import showroomInterior from "@/assets/showroom-interior.jpg";
import { Reveal } from "@/components/site/Reveal";
import { useI18n } from "@/lib/i18n";

export function MaterialDetail() {
  const { t } = useI18n();

  return (
    <section className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-[1560px] px-5 sm:px-8 lg:px-12">
        <Reveal>
          <p className="eyebrow text-muted-foreground">{t("detail.eyebrow")}</p>
          <h2 className="display-lg mt-5 max-w-2xl text-foreground">{t("detail.title")}</h2>
          <p className="mt-5 max-w-lg text-sm text-muted-foreground">{t("detail.lede")}</p>
        </Reveal>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          <Reveal>
            <figure className="group relative overflow-hidden bg-onyx">
              <img
                src={detailMarble}
                alt="Close-up of polished white marble veining"
                loading="lazy"
                width={1200}
                height={1504}
                className="aspect-3/4 w-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.04]"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-linear-to-t from-onyx/85 to-transparent p-6 text-primary-foreground">
                <p className="font-display text-2xl">{t("detail.stoneTitle")}</p>
                <p className="mt-2 max-w-xs text-xs text-primary-foreground/75">
                  {t("detail.stoneText")}
                </p>
              </figcaption>
            </figure>
          </Reveal>

          <Reveal delay={0.08}>
            <figure className="group relative overflow-hidden bg-onyx">
              <img
                src={detailFittings}
                alt="Bronze tap on a stone basin against large-format matt tile"
                loading="lazy"
                width={1200}
                height={1504}
                className="aspect-3/4 w-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.04]"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-linear-to-t from-onyx/85 to-transparent p-6 text-primary-foreground">
                <p className="font-display text-2xl">{t("detail.fitTitle")}</p>
                <p className="mt-2 max-w-xs text-xs text-primary-foreground/75">
                  {t("detail.fitText")}
                </p>
              </figcaption>
            </figure>
          </Reveal>

          <Reveal delay={0.16}>
            <figure className="group relative overflow-hidden bg-onyx">
              <img
                src={showroomInterior}
                alt="Shiv Trading showroom interior with vertical slab displays"
                loading="lazy"
                width={1600}
                height={1008}
                className="aspect-3/4 w-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.04]"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-linear-to-t from-onyx/85 to-transparent p-6 text-primary-foreground">
                <p className="font-display text-2xl">{t("footer.showroom")}</p>
                <p className="mt-2 max-w-xs text-xs text-primary-foreground/75">
                  Biratnagar, Nepal
                </p>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
