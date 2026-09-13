import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Lang = "en" | "ne";

/** UI copy only. Product names, sizes and materials stay as published. */
const dict = {
  "nav.home": { en: "Home", ne: "गृहपृष्ठ" },
  "nav.visualizer": { en: "Visualizer", ne: "भिजुअलाइजर" },
  "nav.collections": { en: "Products", ne: "उत्पादनहरू" },
  "nav.marble": { en: "Marble", ne: "मार्बल" },
  "nav.tiles": { en: "Tiles", ne: "टाइल्स" },
  "nav.partners": { en: "Partners", ne: "साझेदारहरू" },
  "nav.testimonials": { en: "Testimonials", ne: "प्रतिक्रियाहरू" },
  "nav.spaces": { en: "Spaces", ne: "स्पेस" },
  "nav.about": { en: "About", ne: "हाम्रोबारे" },
  "nav.showroom": { en: "Showroom", ne: "शोरुम" },
  "nav.contact": { en: "Contact", ne: "सम्पर्क" },
  "cta.enquire": { en: "Enquire", ne: "सोधपुछ" },
  "cta.viewCollections": { en: "Explore Products", ne: "उत्पादनहरू हेर्नुहोस्" },
  "cta.exploreVisualizer": { en: "Try the Visualizer", ne: "भिजुअलाइजर सुरु गर्नुहोस्" },
  "cta.consultation": { en: "Book Consultation", ne: "परामर्श बुक गर्नुहोस्" },
  "cta.requestConsultation": { en: "Request a consultation", ne: "परामर्शको अनुरोध" },
  "hero.eyebrow": { en: "PREMIUM SURFACES FOR BEAUTIFUL SPACES", ne: "सुन्दर स्थानहरूको लागि प्रिमियम सतहहरू" },
  "hero.title1": { en: "See Your Space", ne: "आफ्नो स्थान हेर्नुहोस्" },
  "hero.title2": { en: "Before You Build.", ne: "निर्माण गर्नु अगावै।" },
  "hero.lede": {
    en: "Explore our collection of tiles, marble, sanitaryware, fittings, paints and more in realistic spaces.",
    ne: "टाइल्स, मार्बल, सेनेटरीवेयर, फिटिङ्स, पेन्ट्स र थप सामग्रीहरू यथार्थपरक स्पेसहरूमा अन्वेषण गर्नुहोस्।",
  },
  "detail.eyebrow": { en: "Material detail", ne: "सामग्री विवरण" },
  "detail.title": { en: "Looked at closely, it still holds.", ne: "नजिकबाट हेर्दा पनि उत्तिकै राम्रो।" },
  "detail.lede": {
    en: "Vein, grain and finish are checked slab by slab before anything reaches the showroom floor.",
    ne: "शोरुममा आउनु अघि प्रत्येक स्ल्याबको भेन, ग्रेन र फिनिश जाँचिन्छ।",
  },
  "detail.stoneTitle": { en: "Marble & granite", ne: "मार्बल र ग्रेनाइट" },
  "detail.stoneText": {
    en: "North Indian, Rajasthani and South Indian stone, selected for veining and tone.",
    ne: "भेनिङ र रङका आधारमा छानिएका उत्तर भारतीय, राजस्थानी र दक्षिण भारतीय ढुङ्गा।",
  },
  "detail.fitTitle": { en: "Sanitary & CP fittings", ne: "स्यानिटरी र सीपी फिटिङ" },
  "detail.fitText": {
    en: "Sanitaryware, CP and CPVC fittings and kitchen chimneys, specified alongside the surfaces.",
    ne: "स्यानिटरीवेयर, सीपी र सीपीभीसी फिटिङ तथा किचन चिम्नी — सतहसँगै छनौट।",
  },
  "footer.explore": { en: "Explore", ne: "अन्वेषण" },
  "footer.showroom": { en: "Showroom", ne: "शोरुम" },
  "footer.follow": { en: "Follow", ne: "फलो" },
  "studio.eyebrow": { en: "Tile studio", ne: "टाइल स्टुडियो" },
  "studio.title": {
    en: "See the finish before you specify it.",
    ne: "छनौट गर्नुअघि फिनिश हेर्नुहोस्।",
  },
  "studio.tile": { en: "Tile", ne: "टाइल" },
  "studio.finish": { en: "Finish", ne: "फिनिश" },
  "studio.drag": { en: "Drag to rotate", ne: "घुमाउन ड्र्याग गर्नुहोस्" },
  "studio.lede": {
    en: "Choose a tile and a finish, then drag to turn the surface under studio light.",
    ne: "टाइल र फिनिश छान्नुहोस्, त्यसपछि स्टुडियो प्रकाशमा सतह घुमाउन ड्र्याग गर्नुहोस्।",
  },
  "studio.lighting": { en: "Lighting", ne: "प्रकाश" },
  "light.studio": { en: "Studio", ne: "स्टुडियो" },
  "light.daylight": { en: "Daylight", ne: "दिनको उज्यालो" },
  "light.evening": { en: "Evening", ne: "साँझ" },
  "finish.High Gloss": { en: "High Gloss", ne: "हाई ग्लोस" },
  "finish.Matt": { en: "Matt", ne: "म्याट" },
  "finish.Rustic": { en: "Rustic", ne: "रस्टिक" },
  "finish.Satin": { en: "Satin", ne: "स्याटिन" },
  "finish.Textured": { en: "Textured", ne: "टेक्स्चर्ड" },
  "finishText.High Gloss": {
    en: "Mirror-like shine for vibrant colour and a more spacious feel — ideal for smaller areas.",
    ne: "ऐना जस्तै चमक, रङ उज्यालो देखाउँछ र ठाउँ फराकिलो महसुस गराउँछ — साना क्षेत्रका लागि उत्तम।",
  },
  "finishText.Matt": {
    en: "Luxurious, scratch-proof and understated, with minimal shine that hides imperfections.",
    ne: "आकर्षक, कोर्न नसक्ने र सरल — कम चमक, दाग लुकाउँछ।",
  },
  "finishText.Rustic": {
    en: "Embraces natural variation for an authentic, timeless look — ideal for kitchens or hallways.",
    ne: "प्राकृतिक विविधता समेटेर मौलिक र सधैंको लुक — भान्सा वा गल्लीका लागि उत्तम।",
  },
  "finishText.Satin": {
    en: "A soft sheen between gloss and matt — warm light with an even, calm surface.",
    ne: "ग्लोस र म्याटको बीचको नरम चमक — समान र शान्त सतह।",
  },
  "finishText.Textured": {
    en: "Surface relief that adds grip and depth, catching light across the tile.",
    ne: "सतहमा उठान — पकड र गहिराइ थप्छ, प्रकाश समेट्छ।",
  },
} as const;


export type TKey = keyof typeof dict;

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (k: TKey) => string };

const I18nContext = createContext<Ctx>({ lang: "en", setLang: () => {}, t: (k) => dict[k].en });

const STORAGE_KEY = "shiv-lang";

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "ne" || stored === "en") setLangState(stored);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    window.localStorage.setItem(STORAGE_KEY, l);
  }, []);


  const t = useCallback((k: TKey) => dict[k][lang] ?? dict[k].en, [lang]);

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  return useContext(I18nContext);
}
