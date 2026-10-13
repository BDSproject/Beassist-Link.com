"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { translations, type Language, type Translations } from "@/lib/i18n";

interface LanguageContextType {
  lang: Language;
  setLang: (l: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "fr",
  setLang: () => {},
  t: translations.fr,
});

export function LanguageProvider({
  children,
  initialLang = "fr",
}: {
  children: ReactNode;
  initialLang?: Language;
}) {
  const [lang, setLang] = useState<Language>(initialLang);

  // Load persisted language or auto-detect browser language on first visit.
  // Skipped when the language is forced (ex. routes /en).
  useEffect(() => {
    if (initialLang === "en") return;
    try {
      const saved = localStorage.getItem("beassist-lang") as Language | null;
      if (saved === "fr" || saved === "en") {
        setLang(saved);
      } else {
        // Auto-detect: use browser language if no preference saved
        const browserLang = navigator.language?.toLowerCase() || "";
        const detected: Language = browserLang.startsWith("fr") ? "fr" : "en";
        setLang(detected);
      }
    } catch {}
  }, [initialLang]);

  const handleSetLang = (l: Language) => {
    setLang(l);
    try {
      localStorage.setItem("beassist-lang", l);
    } catch {}
  };

  return (
    <LanguageContext.Provider
      value={{ lang, setLang: handleSetLang, t: translations[lang] }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
