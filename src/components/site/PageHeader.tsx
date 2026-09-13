import { Reveal } from "@/components/site/Reveal";

type Props = { eyebrow: string; title: string; lead?: string; image?: string };

export function PageHeader({ eyebrow, title, lead, image }: Props) {
  return (
    <section className="relative overflow-hidden bg-onyx pt-40 pb-20 text-primary-foreground sm:pt-48 sm:pb-28">
      {image && (
        <>
          <img
            src={image}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 size-full object-cover opacity-45"
          />
          <div className="veil absolute inset-0" />
        </>
      )}
      <div className="relative mx-auto max-w-[1560px] px-5 sm:px-8 lg:px-12">
        <Reveal>
          <p className="eyebrow text-primary-foreground/60">{eyebrow}</p>
          <h1 className="display-xl mt-5 max-w-3xl">{title}</h1>
          {lead && <p className="mt-8 max-w-xl text-sm text-primary-foreground/75">{lead}</p>}
        </Reveal>
      </div>
    </section>
  );
}
