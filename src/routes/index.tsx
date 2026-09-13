import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/home/Hero";
import { Intro } from "@/components/home/Intro";
import { CollectionsGrid } from "@/components/home/CollectionsGrid";
import { Finishes } from "@/components/home/Finishes";
import { ProductIndex } from "@/components/home/ProductIndex";
import { MaterialVisualizer } from "@/components/home/MaterialVisualizer";
import { MaterialDetail } from "@/components/home/MaterialDetail";
import { SpacesStrip } from "@/components/home/SpacesStrip";
import { PartnersSection } from "@/components/home/PartnersSection";
import { ShowroomGallery } from "@/components/home/ShowroomGallery";
import { ShowroomSection } from "@/components/home/ShowroomSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { ConsultCTA } from "@/components/home/ConsultCTA";

const title = "Shiv Trading | Innovation, Construction & Satisfaction";
const description =
  "Discover premium surfaces, vitrified tiles, natural marble, sanitaryware, and interactive 3D material inspection at Shiv Trading in Biratnagar, Nepal.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <MaterialVisualizer />
      <Intro />
      <CollectionsGrid />
      <PartnersSection />
      <Finishes />
      <ProductIndex />
      <MaterialDetail />
      <ShowroomGallery />
      <SpacesStrip />
      <ShowroomSection />
      <TestimonialsSection />
      <ConsultCTA />
    </>
  );
}
