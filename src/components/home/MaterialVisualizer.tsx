import { useState, lazy, Suspense } from "react";
import {
  RotateCcw,
  Eye,
  Box,
  Layers,
  MessageCircle,
  Phone,
  ShieldCheck,
  ChevronRight,
  Check,
  SlidersHorizontal,
} from "lucide-react";
import { company, visualizerMaterials } from "@/data/catalog";
import type { VisualizerMaterial, MaterialApplication } from "@/data/catalog";
import type { ViewAngle, LightingMode } from "@/components/three/MaterialScene";
import { useHydrated } from "@/components/site/useHydrated";
import { Reveal } from "@/components/site/Reveal";
import { EnquiryModal } from "@/components/home/EnquiryModal";

// Real Product Cutouts & Verified Showroom Assets (NO room photos in product thumbnails)
import prodWashbasin from "@/assets/products/prod-washbasin.jpg";
import prodToilet from "@/assets/products/prod-toilet.jpg";
import prodFaucet from "@/assets/products/prod-faucet.jpg";
import prodPaintsSwatches from "@/assets/products/prod-paints-swatches.jpg";
import prodCpvcFittings from "@/assets/products/prod-cpvc-fittings.jpg";
import detailFittings from "@/assets/detail-fittings.jpg";
import colSanitary from "@/assets/col-sanitary.jpg";

const MaterialScene = lazy(() => import("@/components/three/MaterialScene"));

export function MaterialVisualizer() {
  const hydrated = useHydrated();
  const [selectedMaterialId, setSelectedMaterialId] = useState<string>("carrara-white");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedColorFilter, setSelectedColorFilter] = useState<string>("All");
  const [selectedFinishFilter, setSelectedFinishFilter] = useState<string>("All");
  const [viewAngle, setViewAngle] = useState<ViewAngle>("perspective");
  const [lightingMode, setLightingMode] = useState<LightingMode>("daylight");
  const [activeApplicationType, setActiveApplicationType] = useState<"floor" | "wall" | "kitchen" | "bathroom">("floor");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedFinish, setSelectedFinish] = useState<string>("");
  const [isEnquiryOpen, setIsEnquiryOpen] = useState<boolean>(false);
  const [activePaintSwatch, setActivePaintSwatch] = useState<{ name: string; hex: string; tone: string }>({
    name: "Royal Ivory",
    hex: "#F7F4EB",
    tone: "Warm Neutral",
  });

  const currentMaterial: VisualizerMaterial =
    visualizerMaterials.find((m) => m.id === selectedMaterialId) ?? visualizerMaterials[0]!;

  const currentColor = selectedColor || currentMaterial.color;
  const currentFinish = selectedFinish || currentMaterial.finish;

  // Real-time PBR feedback for 3D viewer based on selected finish
  const finishRoughnessMap: Record<string, { roughness: number; clearcoat: number }> = {
    "High Gloss": { roughness: 0.07, clearcoat: 0.95 },
    Satin: { roughness: 0.25, clearcoat: 0.35 },
    Matt: { roughness: 0.52, clearcoat: 0.0 },
    Textured: { roughness: 0.68, clearcoat: 0.0 },
    Rustic: { roughness: 0.8, clearcoat: 0.0 },
  };

  const pbrParams = finishRoughnessMap[currentFinish] ?? {
    roughness: currentMaterial.roughness,
    clearcoat: currentMaterial.clearcoat,
  };

  const categories = [
    "All",
    "Marble & Granite",
    "Floor Tiles",
    "Wall Tiles",
    "Kitchen",
    "Bathroom",
    "Decorative Tiles",
    "Sanitaryware",
    "Basins",
    "Toilets",
    "Faucets",
    "Paints & Colours",
    "CPVC & Fittings",
  ];

  const colorFilters = [
    "All",
    "White",
    "Beige",
    "Grey",
    "Black",
    "Green",
    "Blue",
    "Gold",
    "Wood",
  ];

  const finishFilters = [
    "All",
    "High Gloss",
    "Satin",
    "Matt",
    "Textured",
    "Rustic",
  ];

  // Multi-tier filtering
  const filteredMaterials = visualizerMaterials.filter((mat) => {
    // 1. Category filter
    let matchesCat = true;
    if (selectedCategory === "All") {
      matchesCat = true;
    } else if (selectedCategory === "Marble & Granite") {
      matchesCat = mat.category === "Marble & Granite";
    } else if (selectedCategory === "Floor Tiles") {
      matchesCat = mat.category === "Floor Tiles";
    } else if (selectedCategory === "Wall Tiles") {
      matchesCat = mat.category === "Wall Tiles";
    } else if (selectedCategory === "Kitchen") {
      matchesCat = mat.suitableFor.includes("Kitchen");
    } else if (selectedCategory === "Bathroom") {
      matchesCat = mat.suitableFor.includes("Bathroom");
    } else if (selectedCategory === "Decorative Tiles") {
      matchesCat = mat.suitableFor.includes("Decorative") || mat.category === "Decorative Tiles";
    } else {
      matchesCat = false;
    }

    // 2. Color filter
    let matchesColor = true;
    if (selectedColorFilter !== "All") {
      matchesColor =
        mat.color === selectedColorFilter ||
        mat.availableColors.includes(selectedColorFilter);
    }

    // 3. Finish filter
    let matchesFinish = true;
    if (selectedFinishFilter !== "All") {
      matchesFinish =
        mat.finish === selectedFinishFilter ||
        mat.availableFinishes.includes(selectedFinishFilter as any);
    }

    return matchesCat && matchesColor && matchesFinish;
  });

  const currentApplication: MaterialApplication =
    currentMaterial.applications[activeApplicationType] ?? currentMaterial.applications.floor;

  const handleSelectMaterial = (material: VisualizerMaterial) => {
    setSelectedMaterialId(material.id);
    setSelectedColor(material.color);
    setSelectedFinish(material.finish);
    setViewAngle("perspective");

    // Smoothly scroll to 3D inspection studio
    const inspectorElem = document.getElementById("material-inspector");
    if (inspectorElem) {
      inspectorElem.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const directWhatsAppUrl = `https://wa.me/9779816300663?text=${encodeURIComponent(
    `Hello Shiv Trading, I am interested in ${currentMaterial.name} (${currentFinish}, ${currentMaterial.dimensions.display}). Please share showroom availability and pricing in Biratnagar.`
  )}`;

  // Dedicated Sanitaryware Items (Product Cutouts on Neutral Backgrounds - NO Room Photos)
  const sanitarywareItems = [
    {
      id: "san-basin-1",
      categoryType: "Basins",
      name: "Artisan Countertop Ceramic Vessel Basin",
      nepaliName: "काउन्टरटप आर्ट बेसिन",
      brand: "Parryware / Somany",
      finish: "Alpine White / Micro-Glaze",
      type: "Vitreous China Vessel Basin",
      image: prodWashbasin,
      desc: "Glazed non-porous ceramic vessel with stain-resistant micro-coating and clean minimalist curves.",
    },
    {
      id: "san-basin-2",
      categoryType: "Basins",
      name: "Oval Slim-Rim Vitreous China Basin",
      nepaliName: "स्लिम रिम ओभल बेसिन",
      brand: "Parryware",
      finish: "Gloss Alpine White",
      type: "Slim-Rim Countertop Vessel",
      image: colSanitary,
      desc: "Ultra-thin 5mm rim profile engineered from high-density vitreous china. Deep bowl prevents water splashing.",
    },
    {
      id: "san-toilet-1",
      categoryType: "Toilets",
      name: "Wall-Hung Rimless Flushing Commode",
      nepaliName: "वाल-हंग रिमलेस ट्वाइलेट",
      brand: "Parryware",
      finish: "Gloss Alpine White",
      type: "Rimless 360° Cyclone Flush",
      image: prodToilet,
      desc: "Concealed trapway wall-hung commode with soft-close urea-formaldehyde seat and water-saving dual flush.",
    },
    {
      id: "san-toilet-2",
      categoryType: "Toilets",
      name: "Floor-Mounted Tornado Flush One-Piece Suite",
      nepaliName: "फ्लोर माउन्टेड टर्नाडो ट्वाइलेट",
      brand: "Parryware",
      finish: "Pure Vitreous White",
      type: "One-Piece Monolithic Commode",
      image: prodToilet,
      desc: "Fully glazed internal S-trap prevents clogs. Siphon jet flushing cleans bowl silently with minimal water.",
    },
    {
      id: "san-faucet-1",
      categoryType: "Faucets",
      name: "Brushed Bronze Single-Lever Basin Mixer",
      nepaliName: "ब्रास बेसिन मिक्सर ट्याप",
      brand: "Plumber",
      finish: "Champagne Bronze PVD",
      type: "Forged Brass Ceramic Disc",
      image: prodFaucet,
      desc: "Quarter-turn ceramic disc cartridge tested to 500,000 cycles with anti-calc honeycomb aerator nozzle.",
    },
    {
      id: "san-shower-1",
      categoryType: "Faucets",
      name: "Thermostatic Rain Shower Column System",
      nepaliName: "थर्मोस्टेटिक सावर स्तम्भ",
      brand: "Plumber",
      finish: "Brushed Bronze & Matte Black",
      type: "Solid Brass Exposed System",
      image: detailFittings,
      desc: "38°C safety stop thermostatic diverter cartridge with ultra-thin stainless steel rainfall showerhead.",
    },
  ];

  const filteredSanitaryware =
    selectedCategory === "Sanitaryware" || selectedCategory === "All"
      ? sanitarywareItems
      : sanitarywareItems.filter((item) => item.categoryType === selectedCategory);

  // 12 Dedicated Architectural Paint Swatches
  const paintSwatches = [
    { name: "Royal Ivory", hex: "#F7F4EB", tone: "Warm Neutral" },
    { name: "Himalayan Mist", hex: "#F3F5F6", tone: "Cool Contemporary" },
    { name: "Warm Sand", hex: "#E5DAC6", tone: "Warm Ochre" },
    { name: "Desert Beige", hex: "#D9CCA8", tone: "Natural Earth" },
    { name: "Soft Taupe", hex: "#C5B8A8", tone: "Architectural Neutral" },
    { name: "Stone Grey", hex: "#8E8D8A", tone: "Midtone Neutral" },
    { name: "Graphite Charcoal", hex: "#2C2D30", tone: "Dramatic Dark" },
    { name: "Kashmiri Sage", hex: "#7D8B78", tone: "Organic Botanical" },
    { name: "Forest Green", hex: "#4D6652", tone: "Deep Botanical" },
    { name: "Nordic Blue", hex: "#4A6274", tone: "Deep Accent" },
    { name: "Terracotta Earth", hex: "#B85D43", tone: "Warm Accent" },
    { name: "Royal Ochre Gold", hex: "#D4AF37", tone: "Rich Accent" },
  ];

  const isSanitaryCategory =
    selectedCategory === "Sanitaryware" ||
    selectedCategory === "Basins" ||
    selectedCategory === "Toilets" ||
    selectedCategory === "Faucets";

  const isPaintsCategory = selectedCategory === "Paints & Colours";
  const isCpvcCategory = selectedCategory === "CPVC & Fittings";

  return (
    <section id="visualizer" className="relative bg-background py-20 sm:py-28 border-b border-border">
      <div className="mx-auto max-w-[1560px] px-5 sm:px-8 lg:px-12">
        {/* Section Header */}
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <p className="eyebrow text-primary">02 — Architectural Material Library</p>
              <h2 className="display-lg mt-3 max-w-3xl">
                Explore Real Materials.
              </h2>
              <p className="mt-3 max-w-2xl text-sm sm:text-base text-muted-foreground leading-relaxed">
                Browse our real physical collection of vitrified tiles, marble slabs, granites, and sanitaryware.
                Presented in a balanced 4 × 4 architectural grid with authentic 1:1 square material samples.
                Select any material to inspect its true bevels and reflectivity in interactive 3D.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <span className="inline-flex items-center gap-2 border border-border bg-card px-3.5 py-2 text-xs text-muted-foreground font-medium shadow-2xs">
                <ShieldCheck className="size-4 text-primary" />
                <span>Biratnagar Showroom Verified Stock</span>
              </span>
            </div>
          </div>
        </Reveal>

        {/* Primary Category Filter Bar */}
        <Reveal delay={0.05}>
          <div className="mt-10 flex flex-col gap-4 border-b border-border pb-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              {/* Category Pills */}
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar w-full md:w-auto py-1">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => {
                      setSelectedCategory(cat);
                    }}
                    className={`shrink-0 px-3.5 py-2 text-xs tracking-wider uppercase transition-all ${
                      selectedCategory === cat
                        ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                        : "border border-border bg-card text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* 4x4 Grid Badge */}
              <div className="flex items-center gap-2 border border-border px-3 py-1.5 bg-card shrink-0">
                <span className="size-2 rounded-full bg-primary" />
                <span className="text-[11px] uppercase tracking-wider text-foreground font-semibold">
                  4 × 4 Material Grid
                </span>
              </div>
            </div>

            {/* Sub-Filters: Tone/Colour & Surface Finish */}
            {!isSanitaryCategory && !isPaintsCategory && !isCpvcCategory && (
              <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-border/60 text-xs">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-[11px] uppercase tracking-widest text-muted-foreground flex items-center gap-1">
                    <SlidersHorizontal className="size-3" /> Colour:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {colorFilters.map((col) => (
                      <button
                        key={col}
                        type="button"
                        onClick={() => setSelectedColorFilter(col)}
                        className={`px-2.5 py-1 text-[11px] transition-colors ${
                          selectedColorFilter === col
                            ? "bg-foreground text-background font-medium"
                            : "border border-border/80 text-muted-foreground hover:text-foreground bg-card"
                        }`}
                      >
                        {col}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-[11px] uppercase tracking-widest text-muted-foreground">
                    Finish:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {finishFilters.map((fin) => (
                      <button
                        key={fin}
                        type="button"
                        onClick={() => setSelectedFinishFilter(fin)}
                        className={`px-2.5 py-1 text-[11px] transition-colors ${
                          selectedFinishFilter === fin
                            ? "bg-foreground text-background font-medium"
                            : "border border-border/80 text-muted-foreground hover:text-foreground bg-card"
                        }`}
                      >
                        {fin}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </Reveal>

        {/* ======================================================== */}
        {/* PRODUCT GRID BROWSING AREA (Strict 4x4, Square 1:1 Aspect - No Long/Tall Cards) */}
        {/* ======================================================== */}
        {!isSanitaryCategory && !isPaintsCategory && !isCpvcCategory && (
          <Reveal delay={0.08} className="mt-8">
            {filteredMaterials.length === 0 ? (
              <div className="py-16 text-center border border-dashed border-border p-8">
                <p className="text-muted-foreground">No materials match the selected colour and finish filter.</p>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedColorFilter("All");
                    setSelectedFinishFilter("All");
                    setSelectedCategory("All");
                  }}
                  className="mt-3 text-xs uppercase tracking-wider text-primary font-semibold underline"
                >
                  Reset all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
                {filteredMaterials.map((mat) => {
                  const isSelected = mat.id === currentMaterial.id;
                  return (
                    <button
                      key={mat.id}
                      type="button"
                      onClick={() => handleSelectMaterial(mat)}
                      className={`group flex flex-col border text-left bg-card overflow-hidden transition-all duration-300 ${
                        isSelected
                          ? "border-primary ring-2 ring-primary shadow-md"
                          : "border-border hover:border-foreground/40 hover:shadow-xs"
                      }`}
                    >
                      {/* Material Texture / Slab Sample (Square 1:1 4x4 Aspect Ratio - NOT Elongated or Long) */}
                      <div className="relative aspect-square w-full overflow-hidden bg-muted/60 border-b border-border">
                        <img
                          src={mat.previewImage}
                          alt={mat.name}
                          loading="lazy"
                          className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-106"
                        />
                        {isSelected && (
                          <div className="absolute top-2.5 right-2.5 bg-primary text-primary-foreground text-[10px] uppercase tracking-widest px-2.5 py-0.5 font-semibold shadow-xs flex items-center gap-1">
                            <Check className="size-3" />
                            <span>Active in 3D</span>
                          </div>
                        )}
                        <div className="absolute bottom-2 left-2 bg-background/85 backdrop-blur-xs px-2 py-0.5 text-[10px] font-mono text-muted-foreground border border-border/50">
                          {mat.dimensions.display}
                        </div>
                      </div>

                      {/* Compact Card Typography */}
                      <div className="p-3.5 flex flex-col justify-between flex-1">
                        <div>
                          <div className="flex items-center justify-between text-[10px] text-muted-foreground uppercase tracking-widest">
                            <span className="font-semibold text-primary">{mat.category}</span>
                            <span>{mat.finish}</span>
                          </div>
                          <h4
                            className={`font-display text-base mt-1 line-clamp-1 transition-colors ${
                              isSelected ? "text-primary font-semibold" : "text-foreground group-hover:text-primary"
                            }`}
                          >
                            {mat.name}
                          </h4>
                          {mat.nepaliName && (
                            <p className="text-xs text-muted-foreground font-nepali line-clamp-1">
                              {mat.nepaliName}
                            </p>
                          )}
                        </div>

                        <div className="mt-3 pt-2.5 border-t border-border/60 flex items-center justify-between text-[11px] text-muted-foreground">
                          <span className="text-[10px] tracking-wide uppercase text-muted-foreground/80">
                            {mat.color} Tone
                          </span>
                          <span className="text-primary text-[11px] font-medium group-hover:underline inline-flex items-center">
                            Inspect 3D <ChevronRight className="size-3 ml-0.5" />
                          </span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </Reveal>
        )}

        {/* SPECIAL CATEGORY: SANITARYWARE / BASINS / TOILETS / FAUCETS */}
        {isSanitaryCategory && (
          <Reveal delay={0.08} className="mt-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
              {filteredSanitaryware.map((item) => (
                <div
                  key={item.id}
                  className="border border-border bg-card p-4 flex flex-col justify-between group hover:border-primary transition-colors"
                >
                  <div>
                    {/* Clean product cutout photo on neutral background */}
                    <div className="aspect-square w-full overflow-hidden bg-muted/40 border border-border mb-3.5">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] tracking-widest uppercase font-semibold text-primary">
                        {item.brand}
                      </span>
                      <span className="text-[10px] text-muted-foreground uppercase">{item.finish}</span>
                    </div>
                    <h4 className="font-display text-base sm:text-lg text-foreground mt-1 line-clamp-1">
                      {item.name}
                    </h4>
                    <p className="text-xs text-muted-foreground font-nepali">{item.nepaliName}</p>
                    <p className="text-xs text-muted-foreground mt-2 leading-relaxed line-clamp-2">
                      {item.desc}
                    </p>
                  </div>

                  <a
                    href={`https://wa.me/9779816300663?text=${encodeURIComponent(
                      `Hello Shiv Trading, I would like to enquire about ${item.name} (${item.brand}). Please share showroom pricing and stock in Biratnagar.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 flex items-center justify-center gap-2 border border-border bg-background py-2.5 text-xs font-medium text-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <MessageCircle className="size-3.5 text-[#25D366]" />
                    <span>Enquire via WhatsApp</span>
                  </a>
                </div>
              ))}
            </div>
          </Reveal>
        )}

        {/* SPECIAL CATEGORY: PAINTS & COLOURS */}
        {isPaintsCategory && (
          <Reveal delay={0.08} className="mt-8">
            <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] items-stretch">
              <div className="border border-border bg-card p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between border-b border-border pb-4">
                    <span className="text-xs font-semibold tracking-widest uppercase text-primary">
                      12 Architectural Paint Shades
                    </span>
                    <span className="text-xs text-muted-foreground font-mono">
                      Selected: {activePaintSwatch.name}
                    </span>
                  </div>

                  {/* 12 Color Swatches Grid */}
                  <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3.5">
                    {paintSwatches.map((swatch) => {
                      const isSelected = activePaintSwatch.name === swatch.name;
                      return (
                        <button
                          key={swatch.name}
                          type="button"
                          onClick={() => setActivePaintSwatch(swatch)}
                          className={`flex flex-col border text-left p-3 transition-all ${
                            isSelected
                              ? "border-primary ring-2 ring-primary bg-primary/5"
                              : "border-border hover:border-foreground/30 bg-background"
                          }`}
                        >
                          <div
                            className="h-14 w-full border border-border/40 shadow-xs mb-2.5"
                            style={{ backgroundColor: swatch.hex }}
                          />
                          <p className="text-xs font-medium text-foreground line-clamp-1">
                            {swatch.name}
                          </p>
                          <p className="text-[10px] text-muted-foreground uppercase">{swatch.tone}</p>
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-6 border-t border-border pt-4">
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Available in Washable Velvet Sheen, High-Cover Matte, and Exterior Weather-Shield. Formulated with zero added lead and low odor.
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-border flex flex-wrap gap-3">
                  <a
                    href={`https://wa.me/9779816300663?text=${encodeURIComponent(
                      `Hello Shiv Trading, I would like to order paint in ${activePaintSwatch.name} (${activePaintSwatch.tone}). Please share bucket pricing.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-primary py-3.5 text-center text-xs font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                  >
                    Enquire for {activePaintSwatch.name}
                  </a>
                  <a
                    href={company.whatsappLinks[0]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-border bg-background px-4 py-3.5 text-xs font-medium text-foreground hover:bg-muted transition-colors"
                  >
                    Request Full Fan Deck
                  </a>
                </div>
              </div>

              {/* Paint Application Visual */}
              <div className="relative aspect-4/3 sm:aspect-auto overflow-hidden border border-border bg-onyx flex flex-col justify-end p-6 sm:p-8">
                <img
                  src={prodPaintsSwatches}
                  alt="Shiv Trading Paint Swatches & Fan Deck"
                  className="absolute inset-0 size-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/30 to-transparent" />
                <div className="relative z-10 text-white">
                  <span className="bg-primary/90 px-2.5 py-1 text-[10px] tracking-widest uppercase font-semibold text-primary-foreground">
                    Color Consultation
                  </span>
                  <h4 className="font-display text-2xl text-white mt-2">
                    Custom Tinting & On-Site Sampling
                  </h4>
                  <p className="text-xs text-white/80 mt-2 max-w-md leading-relaxed">
                    Bring your floor tile sample to our Biratnagar showroom. Our colour consultants will formulate the exact coordinating wall hue for natural lighting conditions.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        )}

        {/* SPECIAL CATEGORY: CPVC & FITTINGS */}
        {isCpvcCategory && (
          <Reveal delay={0.08} className="mt-8">
            <div className="border border-border bg-card p-6 sm:p-10 grid gap-8 lg:grid-cols-2 items-center">
              <div>
                <span className="text-[10px] tracking-widest uppercase font-semibold text-primary">
                  Plumbing & Hydraulic Infrastructure
                </span>
                <h3 className="font-display text-3xl text-foreground mt-2">
                  Certified SDR-11 CPVC Pressure Pipes & Diverters
                </h3>
                <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                  Beautiful surface tiles demand leak-free plumbing behind the walls. Shiv Trading stocks
                  certified Plumber and supreme-grade CPVC pipes, forged brass concealed diverter valves,
                  and industrial solvent cement rated for hot and cold high-pressure domestic supply.
                </p>

                <div className="mt-6 grid grid-cols-2 gap-4 border-t border-border pt-6">
                  <div>
                    <dt className="text-xs font-semibold text-foreground uppercase">Pressure Rating</dt>
                    <dd className="text-sm text-muted-foreground mt-0.5">SDR-11 (Class 1 & 2)</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold text-foreground uppercase">Temperature Range</dt>
                    <dd className="text-sm text-muted-foreground mt-0.5">Up to 93°C (Hot Water)</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold text-foreground uppercase">Joint Integrity</dt>
                    <dd className="text-sm text-muted-foreground mt-0.5">Chemical Solvent Cold-Weld</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold text-foreground uppercase">Certification</dt>
                    <dd className="text-sm text-muted-foreground mt-0.5">IS 15778 / ASTM D2846</dd>
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href={`https://wa.me/9779816300663?text=${encodeURIComponent(
                      "Hello Shiv Trading, I need an estimate for CPVC plumbing pipes and diverter fittings for a building project. Please connect with sales."
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-primary px-6 py-3.5 text-xs font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                  >
                    Request Contractor Plumbing Quote
                  </a>
                </div>
              </div>

              <div className="aspect-4/3 w-full overflow-hidden border border-border bg-onyx">
                <img
                  src={prodCpvcFittings}
                  alt="High-pressure CPVC pipes and plumbing fittings"
                  className="size-full object-cover"
                />
              </div>
            </div>
          </Reveal>
        )}

        {/* ======================================================== */}
        {/* ACTIVE MATERIAL 3D INSPECTOR & ARCHITECTURAL VERIFICATION */}
        {/* ======================================================== */}
        {!isSanitaryCategory && !isPaintsCategory && !isCpvcCategory && (
          <div id="material-inspector" className="mt-20 border-t border-border pt-16 scroll-mt-24">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-semibold tracking-widest uppercase text-primary">
                  Interactive 3D Material Studio
                </span>
                <h3 className="font-display text-2xl sm:text-3xl text-foreground mt-1">
                  Inspect: {currentMaterial.name}
                </h3>
              </div>
              <span className="text-xs text-muted-foreground font-mono">
                Standard 4 × 4 Format · {currentMaterial.dimensions.display}
              </span>
            </div>

            <div className="grid gap-10 lg:grid-cols-[1.35fr_1fr] items-stretch">
              {/* Left Column: Interactive 3D Tile & Slab Viewer */}
              <div className="flex flex-col">
                <div className="relative aspect-4/3 w-full overflow-hidden border border-border bg-linear-to-b from-card to-muted/30 shadow-inner sm:aspect-16/11 flex items-center justify-center">
                  {hydrated ? (
                    <Suspense
                      fallback={
                        <div className="flex size-full items-center justify-center">
                          <img
                            src={currentMaterial.previewImage}
                            alt={currentMaterial.name}
                            className="size-full object-contain p-12"
                          />
                        </div>
                      }
                    >
                      <div className="size-full touch-none">
                        <MaterialScene
                          textureUrl={currentMaterial.texture}
                          width={currentMaterial.dimensions.width}
                          height={currentMaterial.dimensions.height}
                          thickness={currentMaterial.dimensions.thickness}
                          roughness={pbrParams.roughness}
                          clearcoat={pbrParams.clearcoat}
                          metalness={currentMaterial.metalness}
                          viewAngle={viewAngle}
                          lightingMode={lightingMode}
                        />
                      </div>
                    </Suspense>
                  ) : (
                    <img
                      src={currentMaterial.previewImage}
                      alt={currentMaterial.name}
                      className="size-full object-contain p-12"
                    />
                  )}

                  {/* View Control Buttons (Overlay top-right) */}
                  <div className="absolute top-4 right-4 flex flex-wrap gap-1.5 bg-background/90 p-1.5 backdrop-blur-md border border-border shadow-md">
                    <button
                      type="button"
                      onClick={() => setViewAngle("perspective")}
                      className={`px-3 py-1.5 text-[11px] tracking-wider uppercase transition-colors ${
                        viewAngle === "perspective"
                          ? "bg-primary text-primary-foreground font-semibold"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                      title="Angled 3D view"
                    >
                      <Box className="inline size-3 mr-1" />
                      Perspective
                    </button>
                    <button
                      type="button"
                      onClick={() => setViewAngle("front")}
                      className={`px-3 py-1.5 text-[11px] tracking-wider uppercase transition-colors ${
                        viewAngle === "front"
                          ? "bg-primary text-primary-foreground font-semibold"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                      title="Front face view"
                    >
                      <Eye className="inline size-3 mr-1" />
                      Front
                    </button>
                    <button
                      type="button"
                      onClick={() => setViewAngle("side")}
                      className={`px-3 py-1.5 text-[11px] tracking-wider uppercase transition-colors ${
                        viewAngle === "side"
                          ? "bg-primary text-primary-foreground font-semibold"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                      title="Edge thickness view"
                    >
                      <Layers className="inline size-3 mr-1" />
                      Edge
                    </button>
                    <button
                      type="button"
                      onClick={() => setViewAngle("reset")}
                      className="p-1.5 text-muted-foreground hover:text-foreground transition-colors"
                      title="Reset Camera"
                    >
                      <RotateCcw className="size-3.5" />
                    </button>
                  </div>

                  {/* Interactive Hints Overlay bottom */}
                  <div className="pointer-events-none absolute bottom-4 inset-x-4 flex items-center justify-between text-[11px] text-muted-foreground/80 tracking-wider uppercase">
                    <span className="bg-background/80 px-2.5 py-1 backdrop-blur-xs border border-border/50 font-mono">
                      4 × 4 Square Format (1:1 Ratio)
                    </span>
                    <span className="hidden sm:inline bg-background/80 px-2.5 py-1 backdrop-blur-xs border border-border/50">
                      Drag to rotate · Scroll to zoom
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Material Information, Finishes, & Enquire */}
              <div className="flex flex-col justify-between">
                <div className="flex flex-col gap-6">
                  {/* Category & Brand Header */}
                  <div className="flex items-center justify-between border-b border-border pb-4">
                    <span className="text-xs font-semibold tracking-widest uppercase text-primary">
                      {currentMaterial.category} · {currentMaterial.brandPartner ?? "Shiv Trading"}
                    </span>
                    <span className="text-xs text-muted-foreground font-mono">
                      {currentMaterial.dimensions.display}
                    </span>
                  </div>

                  {/* Product Titles */}
                  <div>
                    <h3 className="font-display text-3xl sm:text-4xl text-foreground">
                      {currentMaterial.name}
                    </h3>
                    {currentMaterial.nepaliName && (
                      <p className="mt-1 text-sm text-muted-foreground font-nepali">
                        {currentMaterial.nepaliName}
                      </p>
                    )}
                    <p className="mt-1.5 text-xs text-muted-foreground tracking-wider uppercase">
                      {currentMaterial.subcategory}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {currentMaterial.description}
                  </p>

                  {/* Finish Selector (Updates 3D reflectivity in real-time) */}
                  <div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-foreground tracking-wider uppercase">
                        Surface Finish:
                      </span>
                      <span className="text-primary font-semibold">{currentFinish}</span>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {currentMaterial.availableFinishes.map((f) => {
                        const isSelected = f === currentFinish;
                        return (
                          <button
                            key={f}
                            type="button"
                            onClick={() => setSelectedFinish(f)}
                            className={`px-3.5 py-2 text-xs tracking-wider uppercase transition-all ${
                              isSelected
                                ? "border-primary bg-primary text-primary-foreground font-semibold shadow-xs"
                                : "border border-border text-muted-foreground hover:text-foreground hover:border-foreground/30 bg-card"
                            }`}
                          >
                            {f}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Studio Lighting Environment Selector (Daylight, Warm Showroom, Cool Studio, Golden Hour) */}
                  <div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-foreground tracking-wider uppercase">
                        Studio Lighting:
                      </span>
                      <span className="text-primary font-semibold">
                        {lightingMode === "daylight"
                          ? "Daylight (6500K Sun)"
                          : lightingMode === "warm"
                          ? "Warm Showroom (3000K)"
                          : lightingMode === "cool"
                          ? "Cool Studio (5500K)"
                          : "Golden Hour (Sunset)"}
                      </span>
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                      {[
                        { id: "daylight", label: "Daylight", sub: "Natural Sun" },
                        { id: "warm", label: "Warm Showroom", sub: "3000K Halogen" },
                        { id: "cool", label: "Cool Studio", sub: "5500K LED" },
                        { id: "golden", label: "Golden Hour", sub: "Warm Sunset" },
                      ].map((light) => {
                        const isSelected = lightingMode === light.id;
                        return (
                          <button
                            key={light.id}
                            type="button"
                            onClick={() => setLightingMode(light.id as LightingMode)}
                            className={`p-2.5 text-left transition-all border ${
                              isSelected
                                ? "border-primary bg-primary text-primary-foreground font-semibold shadow-xs"
                                : "border border-border text-muted-foreground hover:text-foreground bg-card hover:border-foreground/30"
                            }`}
                          >
                            <div className="text-xs tracking-wider uppercase">{light.label}</div>
                            <div
                              className={`text-[10px] mt-0.5 ${
                                isSelected ? "text-primary-foreground/80" : "text-muted-foreground"
                              }`}
                            >
                              {light.sub}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* CTAs */}
                <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={() => setIsEnquiryOpen(true)}
                    className="flex flex-1 items-center justify-center gap-2 bg-primary px-6 py-4 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm"
                  >
                    <span>Enquire About This Material</span>
                    <ChevronRight className="size-4" />
                  </button>
                  <a
                    href={directWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 border border-border bg-card px-5 py-4 text-sm font-medium text-foreground hover:bg-muted transition-colors"
                    title="WhatsApp consultation"
                  >
                    <MessageCircle className="size-4 text-[#25D366]" />
                    <span className="hidden sm:inline">WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>

            {/* ======================================================== */}
            {/* SEE IT IN A SPACE — 4 Verified Architectural Application Previews */}
            {/* ======================================================== */}
            <div className="mt-20 border-t border-border pt-16">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                <div>
                  <p className="eyebrow text-primary">Spatial Architecture</p>
                  <h3 className="display-sm mt-3">See It In A Space</h3>
                  <p className="mt-2 text-sm text-muted-foreground max-w-xl">
                    Inspect verified architectural installations of {currentMaterial.name}. Every preview
                    demonstrates authentic lighting reflection, grout spacing, and spatial proportion.
                  </p>
                </div>

                {/* 4 Application Selector Tabs: [ FLOOR ] [ WALL ] [ KITCHEN ] [ BATHROOM ] */}
                <div className="flex flex-wrap gap-1.5 border border-border p-1 bg-card">
                  {(["floor", "wall", "kitchen", "bathroom"] as const).map((appType) => (
                    <button
                      key={appType}
                      type="button"
                      onClick={() => setActiveApplicationType(appType)}
                      className={`px-3.5 py-2 text-xs tracking-wider uppercase transition-all ${
                        activeApplicationType === appType
                          ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {appType}
                    </button>
                  ))}
                </div>
              </div>

              {/* Large Primary Application View */}
              <div className="mt-8">
                <div className="relative aspect-16/9 w-full overflow-hidden border border-border bg-onyx group">
                  <img
                    src={currentApplication.image}
                    alt={`${currentMaterial.name} in ${currentApplication.roomName}`}
                    className="size-full object-cover transition-transform duration-700 group-hover:scale-101"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

                  {/* Caption Overlay */}
                  <div className="absolute bottom-6 inset-x-6 sm:bottom-8 sm:inset-x-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-white">
                    <div className="max-w-2xl">
                      <span className="inline-block bg-primary/90 px-2.5 py-1 text-[11px] tracking-widest uppercase font-semibold text-primary-foreground">
                        {currentApplication.tag}
                      </span>
                      <h4 className="font-display text-2xl sm:text-3xl mt-2 text-white">
                        {currentApplication.roomName}
                      </h4>
                      <p className="mt-2 text-xs sm:text-sm text-white/85 leading-relaxed">
                        {currentApplication.description}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsEnquiryOpen(true)}
                      className="self-start sm:self-auto bg-white/90 text-black px-5 py-2.5 text-xs font-semibold tracking-wider uppercase hover:bg-white transition-colors"
                    >
                      Consult Showroom
                    </button>
                  </div>
                </div>
              </div>

              {/* 4-Image Thumbnail Strip */}
              <div className="mt-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold tracking-wider uppercase text-muted-foreground">
                    All 4 Verified Applications for {currentMaterial.name}
                  </span>
                  <span className="text-xs text-muted-foreground">Click thumbnail to switch preview</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {(["floor", "wall", "kitchen", "bathroom"] as const).map((appKey) => {
                    const app = currentMaterial.applications[appKey];
                    const isActive = activeApplicationType === appKey;
                    return (
                      <button
                        key={appKey}
                        type="button"
                        onClick={() => setActiveApplicationType(appKey)}
                        className={`group relative overflow-hidden border text-left transition-all ${
                          isActive
                            ? "border-primary ring-2 ring-primary"
                            : "border-border opacity-75 hover:opacity-100 bg-card"
                        }`}
                      >
                        <div className="aspect-16/10 w-full overflow-hidden bg-muted">
                          <img
                            src={app.image}
                            alt={app.roomName}
                            className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        <div className="p-2.5 bg-card">
                          <p className="text-[10px] tracking-widest uppercase font-semibold text-primary">
                            {app.tag}
                          </p>
                          <p className="text-xs font-medium text-foreground line-clamp-1 mt-0.5">
                            {app.roomName}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Showroom Direct Contact Bar */}
        <Reveal delay={0.2} className="mt-16">
          <div className="border border-border bg-card p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="font-display text-xl sm:text-2xl text-foreground">
                Visit our Biratnagar Showroom to inspect full-size slabs.
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {company.address}, Nepal · Open 6 days a week for architects, contractors, and homeowners.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href={`tel:${company.phoneTel}`}
                className="flex items-center gap-2 border border-border bg-background px-4 py-2.5 text-xs font-medium text-foreground hover:bg-muted transition-colors"
              >
                <Phone className="size-3.5" />
                <span>Call {company.phone}</span>
              </a>
              <a
                href={company.whatsappLinks[0]}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-[#25D366] px-4 py-2.5 text-xs font-medium text-white hover:opacity-90 transition-opacity"
              >
                <MessageCircle className="size-3.5 fill-white" />
                <span>WhatsApp Specialists</span>
              </a>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Enquiry Modal */}
      <EnquiryModal
        material={currentMaterial}
        selectedColor={currentColor}
        selectedFinish={currentFinish}
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
      />
    </section>
  );
}
