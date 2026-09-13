import { useI18n, type Lang } from "@/lib/i18n";

const options: { code: Lang; label: string }[] = [
  { code: "en", label: "EN" },
  { code: "ne", label: "ने" },
];

export function LangToggle({ className = "" }: { className?: string }) {
  const { lang, setLang } = useI18n();

  return (
    <div
      className={`flex items-center border border-current/30 ${className}`}
      role="group"
      aria-label="Language"
    >
      {options.map((o) => (
        <button
          key={o.code}
          type="button"
          aria-pressed={lang === o.code}
          onClick={() => setLang(o.code)}
          className={`px-2.5 py-1.5 text-[10px] tracking-[0.18em] uppercase transition-opacity duration-300 ${
            lang === o.code ? "bg-bronze text-primary-foreground" : "opacity-60 hover:opacity-100"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
