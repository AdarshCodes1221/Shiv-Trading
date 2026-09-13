import { useState } from "react";
import { MapPin, Navigation, ExternalLink, Compass } from "lucide-react";
import { company } from "@/data/catalog";

interface GoogleMapProps {
  className?: string;
  zoom?: number;
  height?: string;
}

export function GoogleMap({
  className = "",
  zoom = 16,
  height = "h-[420px] lg:h-[480px]",
}: GoogleMapProps) {
  const apiKey = import.meta.env["VITE_GOOGLE_MAPS_API_KEY"] as string | undefined;
  const hasValidKey = Boolean(
    apiKey &&
      apiKey.trim() !== "" &&
      apiKey !== "YOUR_KEY_HERE" &&
      apiKey !== "undefined"
  );
  const [hasError, setHasError] = useState(false);

  // Shiv Trading verified coordinates & query from Google Maps place
  const query = encodeURIComponent(
    "Shiv Trading Tiles ( शिव टेडिङ टायल्स ), Biratnagar, Koshi Province 56613, Nepal"
  );

  return (
    <div
      className={`relative flex flex-col overflow-hidden border border-border/80 bg-card ${className}`}
      data-testid="google-map-container"
    >
      {/* Top Map Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/80 bg-card px-5 py-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="flex size-6 items-center justify-center bg-bronze/10 text-bronze">
            <MapPin className="size-3.5" />
          </span>
          <div>
            <span className="font-semibold text-foreground">
              {company.name} ({company.nepaliName})
            </span>
            <span className="text-muted-foreground ml-2 hidden sm:inline">
              Biratnagar-13, Near Veterinary Hospital
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={company.directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-bronze px-3 py-1.5 text-[11px] font-medium tracking-wider text-white uppercase transition-colors hover:bg-bronze-dark"
            title="Get Google Maps turn-by-turn directions to Shiv Trading"
          >
            <Navigation className="size-3" />
            <span>Get Directions</span>
          </a>
          <a
            href={company.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 border border-border px-3 py-1.5 text-[11px] font-medium tracking-wider text-foreground uppercase transition-colors hover:border-bronze hover:text-bronze"
            title="Open Shiv Trading in Google Maps"
          >
            <ExternalLink className="size-3" />
            <span className="hidden sm:inline">Open in Maps</span>
          </a>
        </div>
      </div>

      {/* Map or Fallback Display */}
      <div className={`relative w-full ${height} bg-stone-900/60`}>
        {hasValidKey && !hasError ? (
          <iframe
            title="Shiv Trading Google Maps Location"
            src={`https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${query}&zoom=${zoom}`}
            className="size-full border-0"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            onError={() => setHasError(true)}
          />
        ) : (
          /* Graceful, interactive high-end fallback when API key is missing or not provided */
          <div className="relative flex size-full flex-col items-center justify-center p-6 text-center overflow-hidden">
            {/* Architectural Grid & Radar Aesthetic */}
            <div
              className="pointer-events-none absolute inset-0 opacity-15"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgba(212,175,55,0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(212,175,55,0.2) 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }}
            />
            <div className="pointer-events-none absolute -right-16 -top-16 size-80 rounded-full bg-bronze/5 blur-3xl" />
            <div className="pointer-events-none absolute -left-16 -bottom-16 size-80 rounded-full bg-bronze/5 blur-3xl" />

            {/* Glowing Map Pin Icon */}
            <div className="relative z-10 flex size-14 items-center justify-center rounded-full border border-bronze/40 bg-bronze/10 text-bronze shadow-[0_0_25px_rgba(180,140,75,0.25)]">
              <Compass className="size-7 animate-pulse text-bronze" />
            </div>

            {/* Content Details */}
            <div className="relative z-10 mt-4 max-w-md">
              <span className="inline-block text-[11px] font-semibold tracking-[0.2em] text-bronze uppercase">
                Find Shiv Trading on Google Maps
              </span>
              <h4 className="mt-1 font-display text-xl font-semibold text-foreground sm:text-2xl">
                {company.placeTitle}
              </h4>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                Located at Biratnagar-13, near the Veterinary Hospital. Visit our
                full-scale showroom to touch and inspect Somany tiles, imported
                marble, bathware suites, and CPVC plumbing fittings.
              </p>

              <div className="mt-3 flex items-center justify-center gap-3 text-[11px] text-muted-foreground/80">
                <span>Coordinates: 26.4359° N, 87.2760° E</span>
                <span>•</span>
                <span>Koshi Province 56613, Nepal</span>
              </div>
            </div>

            {/* Prominent Direct Actions */}
            <div className="relative z-10 mt-6 flex flex-wrap items-center justify-center gap-3">
              <a
                href={company.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-bronze px-5 py-2.5 text-xs font-semibold tracking-wider text-white uppercase shadow-md transition-all hover:bg-bronze-dark hover:shadow-lg"
              >
                <MapPin className="size-4" />
                <span>Open in Google Maps</span>
              </a>
              <a
                href={company.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-border bg-card/80 px-5 py-2.5 text-xs font-semibold tracking-wider text-foreground uppercase backdrop-blur transition-all hover:border-bronze hover:text-bronze"
              >
                <Navigation className="size-4 text-bronze" />
                <span>Get Directions</span>
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Context Strip */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border/60 bg-card/60 px-5 py-2.5 text-[11px] text-muted-foreground">
        <span>Landmark: Near Veterinary Hospital, Biratnagar-13 (Postal 56613)</span>
        <span>Open Sunday – Friday • 9:00 AM – 7:30 PM</span>
      </div>
    </div>
  );
}
