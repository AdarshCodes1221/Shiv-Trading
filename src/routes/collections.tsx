import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import {
  Search,
  Filter,
  Eye,
  MessageSquare,
  Phone,
  X,
  Sparkles,
  CheckCircle2,
  Layers,
  ArrowRight,
} from "lucide-react";
import {
  products,
  collections,
  colourOptions,
  finishes,
  company,
  type Product,
  type ProductCategory,
} from "@/data/catalog";
import { PageHeader } from "@/components/site/PageHeader";
import { Reveal } from "@/components/site/Reveal";
import { Button } from "@/components/ui/button";
import colMarble from "@/assets/col-marble.jpg";

const title = "Products & Materials — Tiles, Marble, Sanitary & Paints | Shiv Trading";
const description =
  "Explore Shiv Trading's comprehensive product catalog in Biratnagar: Glazed vitrified tiles, marble slabs, bathroom suites, CPVC plumbing, and architectural paints.";

type SearchParams = {
  category?: string;
  color?: string;
  finish?: string;
};

export const Route = createFileRoute("/collections")({
  validateSearch: (search: Record<string, unknown>): SearchParams => {
    return {
      category: (search["category"] as string) || "all",
      color: (search["color"] as string) || "All",
      finish: (search["finish"] as string) || "All",
    };
  },
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: CollectionsPage,
});

function CollectionsPage() {
  const searchParams = Route.useSearch();
  const [selectedCategory, setSelectedCategory] = useState<string>(
    searchParams.category ?? "all"
  );
  const [selectedColor, setSelectedColor] = useState<string>(
    searchParams.color ?? "All"
  );
  const [selectedFinish, setSelectedFinish] = useState<string>(
    searchParams.finish ?? "All"
  );
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const categories = useMemo(() => {
    return [
      { id: "all", name: "All Products" },
      { id: "wall-tiles", name: "Wall Tiles" },
      { id: "floor-tiles", name: "Floor Tiles" },
      { id: "kitchen", name: "Kitchen Solutions" },
      { id: "bathroom-sanitary", name: "Bathroom & Sanitary" },
      { id: "marble-granite", name: "Marble & Granite" },
      { id: "cpvc-fittings", name: "CPVC & Fittings" },
      { id: "paints-colours", name: "Paints & Colours" },
    ];
  }, []);

  // Filter products based on active criteria
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category match
      if (selectedCategory !== "all" && p.category !== selectedCategory) {
        return false;
      }
      // Color match
      if (selectedColor !== "All" && p.color !== selectedColor) {
        return false;
      }
      // Finish match
      if (selectedFinish !== "All" && p.finish !== selectedFinish) {
        return false;
      }
      // Text query match
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(query);
        const matchesNepali = p.nepaliName?.toLowerCase().includes(query);
        const matchesMaterial = p.material.toLowerCase().includes(query);
        const matchesDesc = p.description.toLowerCase().includes(query);
        const matchesSubcat = p.subcategory.toLowerCase().includes(query);
        const matchesPartner = p.brandPartner?.toLowerCase().includes(query);
        return (
          matchesName ||
          matchesNepali ||
          matchesMaterial ||
          matchesDesc ||
          matchesSubcat ||
          matchesPartner
        );
      }
      return true;
    });
  }, [selectedCategory, selectedColor, selectedFinish, searchQuery]);

  const resetFilters = () => {
    setSelectedCategory("all");
    setSelectedColor("All");
    setSelectedFinish("All");
    setSearchQuery("");
  };

  return (
    <>
      <PageHeader
        eyebrow="Architectural Catalog"
        title="Everything a space needs."
        lead="Explore glazed vitrified tiles, marble slabs, sanitaryware fixtures, CPVC fittings, and architectural paints available at our Biratnagar-13 showroom."
        image={colMarble}
      />

      <section className="mx-auto max-w-[1560px] px-5 py-16 sm:px-8 sm:py-24 lg:px-12">
        {/* Controls Bar: Search & Category Tabs */}
        <div className="space-y-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            {/* Search Input */}
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tiles, marble, sanitaryware, fittings, paints..."
                className="w-full border border-border bg-card py-2.5 pl-10 pr-4 text-xs font-medium text-foreground outline-none transition-colors focus:border-bronze placeholder:text-muted-foreground/60"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="size-3.5" />
                </button>
              )}
            </div>

            {/* Results count & Clear button */}
            <div className="flex items-center justify-between gap-4 text-xs text-muted-foreground">
              <span>
                Showing <strong className="text-foreground">{filteredProducts.length}</strong>{" "}
                products
              </span>
              {(selectedCategory !== "all" ||
                selectedColor !== "All" ||
                selectedFinish !== "All" ||
                searchQuery !== "") && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="text-bronze hover:underline font-medium"
                >
                  Reset filters
                </button>
              )}
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 border-b border-border/80 pb-4">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 text-xs font-semibold tracking-wider uppercase transition-all ${
                    isActive
                      ? "bg-charcoal text-white shadow-sm"
                      : "border border-border/80 bg-card text-muted-foreground hover:border-foreground hover:text-foreground"
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>

          {/* Secondary Filters: Color & Finish */}
          <div className="flex flex-wrap items-center gap-6 rounded-none border border-border/60 bg-muted/20 p-4 text-xs">
            {/* Color Filter */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-semibold text-foreground uppercase tracking-wider text-[11px]">
                Colour:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {colourOptions.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setSelectedColor(c)}
                    className={`px-2.5 py-1 text-[11px] font-medium transition-colors ${
                      selectedColor === c
                        ? "bg-bronze text-white font-semibold"
                        : "border border-border bg-card text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Finish Filter */}
            <div className="flex flex-wrap items-center gap-2 border-t border-border/40 pt-2 sm:border-t-0 sm:pt-0 sm:border-l sm:pl-6 sm:border-border/60">
              <span className="font-semibold text-foreground uppercase tracking-wider text-[11px]">
                Finish:
              </span>
              <div className="flex flex-wrap gap-1.5">
                <button
                  type="button"
                  onClick={() => setSelectedFinish("All")}
                  className={`px-2.5 py-1 text-[11px] font-medium transition-colors ${
                    selectedFinish === "All"
                      ? "bg-bronze text-white font-semibold"
                      : "border border-border bg-card text-muted-foreground hover:text-foreground"
                  }`}
                >
                  All
                </button>
                {finishes.map((f) => (
                  <button
                    key={f.name}
                    type="button"
                    onClick={() => setSelectedFinish(f.name)}
                    className={`px-2.5 py-1 text-[11px] font-medium transition-colors ${
                      selectedFinish === f.name
                        ? "bg-bronze text-white font-semibold"
                        : "border border-border bg-card text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {f.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="mt-16 border border-dashed border-border p-12 text-center">
            <Layers className="mx-auto size-8 text-muted-foreground" />
            <h3 className="mt-3 font-display text-xl font-semibold">
              No products found
            </h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Try changing your search terms or resetting the color and finish filters.
            </p>
            <Button
              type="button"
              onClick={resetFilters}
              variant="outline"
              className="mt-5 rounded-none text-xs uppercase"
            >
              Reset All Filters
            </Button>
          </div>
        ) : (
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((p, idx) => (
              <Reveal key={p.id} delay={idx * 0.04}>
                <div
                  onClick={() => setSelectedProduct(p)}
                  className="group flex h-full cursor-pointer flex-col overflow-hidden border border-border/80 bg-card transition-all duration-500 hover:border-bronze hover:shadow-xl"
                >
                  {/* Image Container */}
                  <div className="relative aspect-4/3 w-full overflow-hidden bg-muted">
                    <img
                      src={p.image}
                      alt={p.name}
                      loading="lazy"
                      width={800}
                      height={600}
                      className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40 transition-opacity group-hover:opacity-60" />

                    {/* Partner & Category Tag */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                      <span className="bg-onyx/85 px-2.5 py-0.5 text-[10px] font-semibold tracking-wider text-white uppercase backdrop-blur-sm border border-white/15">
                        {p.categoryLabel}
                      </span>
                      {p.brandPartner && (
                        <span className="bg-bronze px-2.5 py-0.5 text-[10px] font-semibold tracking-wider text-white uppercase shadow-sm">
                          {p.brandPartner}
                        </span>
                      )}
                    </div>

                    {/* Try in Visualizer Badge */}
                    {p.inVisualizer && (
                      <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 bg-white/90 px-2.5 py-1 text-[10px] font-semibold tracking-wider text-charcoal uppercase backdrop-blur-sm shadow-md">
                        <Eye className="size-3 text-bronze" /> Try in 3D
                      </span>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="flex flex-1 flex-col justify-between p-6">
                    <div>
                      <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                        <span>{p.subcategory}</span>
                        <span className="text-bronze font-medium">{p.finish}</span>
                      </div>
                      <h3 className="mt-2 font-display text-xl font-bold text-foreground transition-colors group-hover:text-bronze">
                        {p.name}
                      </h3>
                      {p.nepaliName && (
                        <p className="text-xs text-muted-foreground font-medium mt-0.5">
                          {p.nepaliName}
                        </p>
                      )}
                      <p className="mt-2.5 text-xs text-muted-foreground leading-relaxed line-clamp-2">
                        {p.description}
                      </p>
                    </div>

                    <div className="mt-6 border-t border-border/60 pt-4">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-foreground">
                          {p.size}
                        </span>
                        <span className="font-semibold text-bronze uppercase tracking-wider text-[11px] inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                          Details <ArrowRight className="size-3" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </section>

      {/* Polished Product Detail Modal */}
      {selectedProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 sm:p-6 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto border border-border bg-card p-6 sm:p-10 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setSelectedProduct(null)}
              className="absolute right-4 top-4 flex size-9 items-center justify-center rounded-none border border-border bg-background text-foreground hover:bg-muted"
            >
              <X className="size-5" />
            </button>

            <div className="grid gap-8 md:grid-cols-12 items-start">
              {/* Product Large Image */}
              <div className="md:col-span-6 space-y-3">
                <div className="relative aspect-4/3 w-full overflow-hidden border border-border/80 bg-muted">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="size-full object-cover"
                    width={800}
                    height={600}
                  />
                  {selectedProduct.brandPartner && (
                    <span className="absolute top-3 left-3 bg-bronze px-3 py-1 text-xs font-semibold tracking-wider text-white uppercase shadow-md">
                      {selectedProduct.brandPartner}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-muted-foreground italic">
                  Available for inspection at our Biratnagar-13 showroom.
                </p>
              </div>

              {/* Product Specifications & CTAs */}
              <div className="md:col-span-6 space-y-5">
                <div>
                  <span className="text-[11px] font-semibold tracking-[0.2em] text-bronze uppercase">
                    {selectedProduct.categoryLabel} • {selectedProduct.subcategory}
                  </span>
                  <h2 className="mt-1 font-display text-2xl sm:text-3xl font-bold text-foreground">
                    {selectedProduct.name}
                  </h2>
                  {selectedProduct.nepaliName && (
                    <p className="text-sm font-semibold text-bronze mt-1">
                      {selectedProduct.nepaliName}
                    </p>
                  )}
                  <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                    {selectedProduct.description}
                  </p>
                </div>

                {/* Specs Grid */}
                <div className="grid grid-cols-2 gap-3 border-y border-border/80 py-4 text-xs">
                  <div>
                    <span className="text-muted-foreground block text-[10px] uppercase tracking-wider">
                      Material
                    </span>
                    <span className="font-semibold text-foreground">
                      {selectedProduct.material}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-[10px] uppercase tracking-wider">
                      Size / Dimension
                    </span>
                    <span className="font-semibold text-foreground">
                      {selectedProduct.size}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-[10px] uppercase tracking-wider">
                      Finish
                    </span>
                    <span className="font-semibold text-foreground">
                      {selectedProduct.finish}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block text-[10px] uppercase tracking-wider">
                      Color Tone
                    </span>
                    <span className="font-semibold text-foreground">
                      {selectedProduct.color}
                    </span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-muted-foreground block text-[10px] uppercase tracking-wider">
                      Recommended Applications
                    </span>
                    <span className="font-medium text-foreground">
                      {selectedProduct.applications.join(" • ")}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2.5 pt-2">
                  {selectedProduct.inVisualizer && (
                    <Link
                      to="/"
                      hash="visualizer"
                      onClick={() => setSelectedProduct(null)}
                      className="btn-stone flex w-full items-center justify-center gap-2 text-center text-xs tracking-wider uppercase"
                    >
                      <Eye className="size-4" />
                      <span>Try in 3D Surface Visualizer</span>
                    </Link>
                  )}

                  <a
                    href={`https://wa.me/977${company.whatsapp[0]}?text=Hello%20Shiv%20Trading,%20I%20am%20interested%20in%20${encodeURIComponent(
                      selectedProduct.name
                    )}%20(${encodeURIComponent(selectedProduct.size)}).`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 bg-[#25D366] py-2.5 text-xs font-semibold tracking-wider text-white uppercase transition-opacity hover:opacity-90"
                  >
                    <MessageSquare className="size-4" />
                    <span>WhatsApp Inquiry for this Item</span>
                  </a>

                  <a
                    href={`tel:${company.phoneTel}`}
                    className="inline-flex w-full items-center justify-center gap-2 border border-border bg-card py-2 text-xs font-semibold tracking-wider text-foreground uppercase hover:bg-muted"
                  >
                    <Phone className="size-3.5 text-bronze" />
                    <span>Call Showroom ({company.phone})</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
