import { Link } from "@tanstack/react-router";
import { Phone, MessageSquare, MapPin, QrCode, Navigation } from "lucide-react";
import { company } from "@/data/catalog";
import logo from "@/assets/logo-shiv-official.png";
import { useI18n } from "@/lib/i18n";
import { LangToggle } from "@/components/site/LangToggle";

const footerNav = [
  { to: "/", labelKey: "nav.home", hash: undefined },
  { to: "/", labelKey: "nav.visualizer", hash: "visualizer" },
  { to: "/collections", labelKey: "nav.collections", hash: undefined },
  { to: "/partners", labelKey: "nav.partners", hash: undefined },
  { to: "/testimonials", labelKey: "nav.testimonials", hash: undefined },
  { to: "/about", labelKey: "nav.about", hash: undefined },
  { to: "/contact", labelKey: "nav.contact", hash: undefined },
] as const;

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="border-t border-primary-foreground/10 bg-onyx text-primary-foreground">
      <div className="mx-auto max-w-[1560px] px-5 py-20 sm:px-8 lg:px-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.2fr_0.7fr_0.9fr_1.1fr_0.8fr]">
          {/* Brand Col */}
          <div className="space-y-4">
            <Link to="/" className="inline-flex items-center gap-3">
              <img
                src={logo}
                alt={`${company.name} official logo`}
                loading="lazy"
                width={1024}
                height={1024}
                className="size-14 object-contain drop-shadow-md rounded-full"
              />
              <div className="flex flex-col">
                <span className="font-display text-2xl tracking-[0.16em] uppercase font-bold text-primary-foreground">
                  {company.name}
                </span>
                <span className="text-[10px] tracking-[0.16em] uppercase opacity-75 font-medium">
                  {company.tagline}
                </span>
              </div>
            </Link>

            <p className="font-display text-sm italic tracking-wide text-bronze">
              "{company.tagline}"
            </p>

            <p className="text-sm leading-relaxed opacity-75 max-w-sm">
              Premium vitrified tiles, marble slabs, granites, CPVC fittings, and contemporary sanitary solutions based in Biratnagar.
            </p>

            <div className="pt-2">
              <LangToggle className="w-fit" />
            </div>
          </div>

          {/* Navigation Col */}
          <nav className="flex flex-col gap-3">
            <p className="eyebrow opacity-60">Navigation</p>
            {footerNav.map((item) => (
              <Link
                key={`footer-${item.to}-${item.hash ?? ""}`}
                to={item.to}
                {...(item.hash ? { hash: item.hash } : {})}
                className="text-sm opacity-80 transition-colors hover:opacity-100 hover:text-bronze w-fit"
              >
                {t(item.labelKey as any)}
              </Link>
            ))}
          </nav>

          {/* Social Media Col (Matching Reference Screenshot with circular badges) */}
          <div className="flex flex-col gap-4">
            <p className="eyebrow opacity-60">Connect With Us</p>
            <div className="flex flex-col gap-3.5 pt-1">
              {/* Instagram */}
              <a
                href=""
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-3.5 text-sm opacity-85 hover:opacity-100 transition-opacity w-fit"
              >
                <div className="flex size-9 items-center justify-center rounded-full bg-white shadow-sm transition-transform duration-300 group-hover:scale-110 shrink-0">
                  <svg className="size-5" viewBox="0 0 24 24">
                    <defs>
                      <linearGradient id="ig-grad-footer" x1="0%" y1="100%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#fdf497" />
                        <stop offset="5%" stopColor="#fdf497" />
                        <stop offset="45%" stopColor="#fd5949" />
                        <stop offset="60%" stopColor="#d6249f" />
                        <stop offset="90%" stopColor="#285AEB" />
                      </linearGradient>
                    </defs>
                    <path
                      fill="url(#ig-grad-footer)"
                      d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
                    />
                  </svg>
                </div>
                <span className="font-medium text-sm text-primary-foreground">Instagram</span>
              </a>

              {/* Facebook */}
              <a
                href="https://www.facebook.com/ShivTiles.98520"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-3.5 text-sm opacity-85 hover:opacity-100 transition-opacity w-fit"
              >
                <div className="flex size-9 items-center justify-center rounded-full bg-white shadow-sm transition-transform duration-300 group-hover:scale-110 shrink-0">
                  <svg className="size-5" viewBox="0 0 24 24" fill="#1877F2">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </div>
                <span className="font-medium text-sm text-primary-foreground">Facebook</span>
              </a>

              {/* Youtube */}
              <a
                href="https://www.youtube.com/@ShivTrading-109"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-3.5 text-sm opacity-85 hover:opacity-100 transition-opacity w-fit"
              >
                <div className="flex size-9 items-center justify-center rounded-full bg-white shadow-sm transition-transform duration-300 group-hover:scale-110 shrink-0">
                  <svg className="size-5" viewBox="0 0 24 24" fill="#FF0000">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </div>
                <span className="font-medium text-sm text-primary-foreground">Youtube</span>
              </a>

              {/* Tiktok */}
              <a
                href="https://www.tiktok.com/@www.shivtradingbiratnag1"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-3.5 text-sm opacity-85 hover:opacity-100 transition-opacity w-fit"
              >
                <div className="flex size-9 items-center justify-center rounded-full bg-white shadow-sm transition-transform duration-300 group-hover:scale-110 shrink-0">
                  <svg className="size-5" viewBox="0 0 24 24" fill="#000000">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-1.01-.03 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                  </svg>
                </div>
                <span className="font-medium text-sm text-primary-foreground">Tiktok</span>
              </a>
            </div>
          </div>

          {/* Contact Col */}
          <div className="flex flex-col gap-4">
            <p className="eyebrow opacity-60">Contact & Showroom</p>

            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="size-4 text-bronze shrink-0 mt-0.5" />
                <div>
                  <span className="opacity-90 block font-medium">{company.address}</span>
                  <a
                    href={company.directionsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-bronze hover:underline mt-0.5 font-medium"
                  >
                    <Navigation className="size-3" /> Get Directions
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="size-4 text-bronze shrink-0" />
                <a
                  href={company.phoneTel}
                  className="opacity-85 hover:opacity-100 hover:text-bronze transition-colors font-medium"
                >
                  {company.phoneDisplay}
                </a>
              </div>

              <div className="flex flex-col gap-1.5 pt-1">
                <span className="text-xs uppercase tracking-wider text-bronze font-semibold flex items-center gap-1.5">
                  <MessageSquare className="size-3.5" /> WhatsApp Support
                </span>
                <div className="flex flex-col gap-1 pl-5">
                  {company.whatsapp.map((num, i) => (
                    <a
                      key={num}
                      href={company.whatsappLinks[i]}
                      target="_blank"
                      rel="noreferrer"
                      className="opacity-85 hover:opacity-100 hover:text-[#25D366] transition-colors"
                    >
                      +977 {num}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <Link to="/contact" className="mt-2 text-xs uppercase tracking-[0.16em] text-bronze hover:underline font-semibold w-fit">
              {t("cta.requestConsultation")} →
            </Link>
          </div>

          {/* QR Code Col */}
          <div className="flex flex-col items-start gap-3 border-t border-primary-foreground/15 pt-8 sm:border-t-0 sm:pt-0">
            <div className="flex items-center gap-2 text-bronze">
              <QrCode className="size-4" />
              <p className="eyebrow text-bronze tracking-[0.18em]">Visit our Website</p>
            </div>

            <div className="rounded-none border-2 border-primary-foreground/20 bg-white p-2.5 shadow-lg">
              <img
                src={company.qrCode}
                alt="QR Code to visit Shiv Trading website"
                loading="lazy"
                width={122}
                height={122}
                className="size-28 object-contain"
              />
            </div>
            <p className="text-[11px] opacity-60 leading-tight">
              Scan with your smartphone camera to access our digital catalog & 3D visualizer.
            </p>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-primary-foreground/15 pt-8 text-[11px] tracking-[0.18em] uppercase opacity-70 sm:flex-row sm:items-center sm:justify-between">
          <span>Shiv Trading © {new Date().getFullYear()} · All Rights Reserved</span>
          <span>{company.tagline}</span>
          <span>{company.city}, {company.country}</span>
        </div>
      </div>
    </footer>
  );
}
