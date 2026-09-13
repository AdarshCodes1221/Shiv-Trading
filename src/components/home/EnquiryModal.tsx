import { Phone, MessageCircle, X, ShieldCheck } from "lucide-react";
import { company } from "@/data/catalog";
import type { VisualizerMaterial } from "@/data/catalog";

interface EnquiryModalProps {
  material: VisualizerMaterial | null;
  selectedColor?: string;
  selectedFinish?: string;
  isOpen: boolean;
  onClose: () => void;
}

export function EnquiryModal({
  material,
  selectedColor,
  selectedFinish,
  isOpen,
  onClose,
}: EnquiryModalProps) {
  if (!isOpen || !material) return null;

  const color = selectedColor || material.color;
  const finish = selectedFinish || material.finish;

  const enquiryText = `Hello Shiv Trading, I am interested in ${material.name} (${finish} finish, ${material.dimensions.display}, Color: ${color}). Please share pricing, batch availability, and delivery details in Biratnagar.`;
  const whatsappUrl = `https://wa.me/9779816300663?text=${encodeURIComponent(enquiryText)}`;
  const callUrl = `tel:${company.phoneTel}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg overflow-hidden border border-border bg-card p-6 shadow-2xl sm:p-8 rounded-sm"
        role="dialog"
        aria-modal="true"
        aria-labelledby="enquiry-title"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
          aria-label="Close dialog"
        >
          <X className="size-5" />
        </button>

        <div className="flex items-center gap-2 text-xs font-semibold tracking-widest text-primary uppercase">
          <ShieldCheck className="size-4" />
          <span>Showroom Direct Consultation</span>
        </div>

        <h2 id="enquiry-title" className="font-display text-2xl sm:text-3xl mt-2 text-foreground">
          Enquire About Material
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Connect directly with Shiv Trading's material specialists in Biratnagar.
        </p>

        {/* Selected Product Summary Card */}
        <div className="mt-6 flex gap-4 border border-border bg-muted/40 p-4">
          <img
            src={material.previewImage}
            alt={material.name}
            className="size-20 shrink-0 object-cover border border-border"
          />
          <div className="flex flex-col justify-center">
            <span className="text-[10px] tracking-widest uppercase text-muted-foreground font-semibold">
              {material.category} · {material.brandPartner ?? "Shiv Trading"}
            </span>
            <p className="font-display text-lg font-medium leading-snug mt-0.5 text-foreground">
              {material.name}
            </p>
            {material.nepaliName && (
              <p className="text-xs text-muted-foreground font-nepali">{material.nepaliName}</p>
            )}
            <div className="mt-2 flex flex-wrap gap-2 text-[11px] text-muted-foreground">
              <span className="bg-background px-2 py-0.5 border border-border">
                {material.dimensions.display}
              </span>
              <span className="bg-background px-2 py-0.5 border border-border font-medium text-foreground">
                {finish}
              </span>
              <span className="bg-background px-2 py-0.5 border border-border">{color}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-2 bg-[#25D366] px-5 py-3.5 text-sm font-medium text-white transition-opacity hover:opacity-90 shadow-sm"
          >
            <MessageCircle className="size-4 fill-white" />
            <span>WhatsApp Shiv Trading</span>
          </a>
          <a
            href={callUrl}
            className="flex flex-1 items-center justify-center gap-2 border border-border bg-primary px-5 py-3.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <Phone className="size-4" />
            <span>Call Showroom ({company.phone})</span>
          </a>
        </div>

        <div className="mt-6 border-t border-border pt-4 text-center">
          <p className="text-xs text-muted-foreground">
            Showroom Location: {company.address}, Biratnagar, Nepal
          </p>
        </div>
      </div>
    </div>
  );
}
