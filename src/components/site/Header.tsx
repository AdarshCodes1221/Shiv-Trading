import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { company } from "@/data/catalog";
import logo from "@/assets/logo-shiv-official.png";
import { useI18n } from "@/lib/i18n";
import { LangToggle } from "@/components/site/LangToggle";

const navItems = [
  { to: "/", labelKey: "nav.home", hash: undefined },
  { to: "/", labelKey: "nav.visualizer", hash: "visualizer" },
  { to: "/collections", labelKey: "nav.collections", hash: undefined },
  { to: "/partners", labelKey: "nav.partners", hash: undefined },
  { to: "/testimonials", labelKey: "nav.testimonials", hash: undefined },
  { to: "/about", labelKey: "nav.about", hash: undefined },
  { to: "/contact", labelKey: "nav.contact", hash: undefined },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const overHero = pathname === "/";
  const { t } = useI18n();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const solid = scrolled || !overHero || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,color,border-color,backdrop-filter] duration-700 ${
        solid
          ? "border-b border-border/70 bg-background/90 text-foreground backdrop-blur-md"
          : "border-b border-transparent text-primary-foreground"
      }`}
    >
      <div className="mx-auto flex h-[76px] max-w-[1560px] items-center justify-between px-5 sm:px-8 lg:px-12">
        <Link to="/" className="group flex items-center gap-3">
          <img
            src={logo}
            alt={`${company.name} official logo`}
            width={1024}
            height={1024}
            className="size-11 sm:size-12 object-contain transition-transform duration-300 group-hover:scale-105 drop-shadow-sm shrink-0"
          />
          <div className="flex flex-col">
            <span className="font-display text-lg tracking-[0.18em] uppercase leading-tight font-bold">
              {company.name}
            </span>
            <span className="text-[9px] tracking-[0.16em] uppercase opacity-75 font-medium">
              {company.tagline}
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 xl:gap-8 lg:flex">
          {navItems.map((item) => (
            <Link
              key={`${item.to}-${item.hash ?? ""}`}
              to={item.to}
              {...(item.hash ? { hash: item.hash } : {})}
              className="link-underline text-[11px] font-medium tracking-[0.18em] uppercase opacity-80 transition-opacity hover:opacity-100"
              {...(!item.hash ? { activeProps: { className: "opacity-100 text-bronze" } } : {})}
            >
              {t(item.labelKey as any)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={`tel:${company.phoneTel}`}
            aria-label={`Call ${company.name} at ${company.phoneDisplay}`}
            className="hidden items-center gap-1.5 px-3 py-2 text-[11px] font-semibold tracking-[0.14em] uppercase text-muted-foreground transition-colors hover:text-foreground md:inline-flex"
          >
            <Phone className="size-3.5 text-bronze" />
            <span>{company.phoneDisplay}</span>
          </a>

          <LangToggle />

          <Link
            to="/contact"
            hash="enquiry"
            className={`hidden px-5 py-2.5 text-[11px] font-medium tracking-[0.2em] uppercase transition-colors duration-500 sm:inline-flex ${
              solid
                ? "bg-charcoal text-primary-foreground hover:bg-bronze"
                : "border border-current hover:bg-primary-foreground hover:text-charcoal"
            }`}
          >
            {t("cta.enquire")}
          </Link>

          <button
            type="button"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setOpen((v) => !v)}
            className="p-2 lg:hidden"
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-border bg-background lg:hidden shadow-xl">
          <div className="flex flex-col px-5 py-6">
            {navItems.map((item) => (
              <Link
                key={`mobile-${item.to}-${item.hash ?? ""}`}
                to={item.to}
                {...(item.hash ? { hash: item.hash } : {})}
                onClick={() => setOpen(false)}
                className="border-b border-border/60 py-3.5 font-display text-xl text-foreground transition-colors hover:text-bronze"
              >
                {t(item.labelKey as any)}
              </Link>
            ))}

            <div className="mt-6 flex flex-col gap-3">
              <a
                href={`tel:${company.phoneTel}`}
                className="flex items-center justify-center gap-2 border border-border py-3 text-xs tracking-[0.16em] uppercase font-semibold text-foreground hover:bg-muted"
              >
                <Phone className="size-4 text-bronze" /> Call {company.phoneDisplay}
              </a>

              <a
                href={company.whatsappLinks[0]}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 bg-[#25D366] text-white py-3 text-xs tracking-[0.16em] uppercase font-semibold hover:bg-[#20bd5a] transition-colors"
              >
                WhatsApp: +977 {company.whatsapp[0]}
              </a>

              <Link
                to="/contact"
                hash="enquiry"
                onClick={() => setOpen(false)}
                className="btn-stone mt-2 text-center"
              >
                {t("cta.enquire")}
              </Link>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
