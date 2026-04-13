"use client";

import { useLanguage } from "@/contexts/language-context";
import { cn } from "@/lib/utils";

interface LangSwitcherProps {
  className?: string;
}

export function LangSwitcher({ className }: LangSwitcherProps) {
  const { lang, setLang } = useLanguage();

  return (
    <div className={cn("flex items-center p-1 bg-gray-100 rounded-xl", className)}>
      <button
        onClick={() => setLang("fr")}
        aria-label="Français"
        className={cn(
          "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200",
          lang === "fr"
            ? "bg-white text-gray-900 shadow-sm"
            : "text-gray-500 hover:text-gray-700"
        )}
      >
        🇫🇷 FR
      </button>
      <button
        onClick={() => setLang("en")}
        aria-label="English"
        className={cn(
          "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200",
          lang === "en"
            ? "bg-white text-gray-900 shadow-sm"
            : "text-gray-500 hover:text-gray-700"
        )}
      >
        🇬🇧 EN
      </button>
    </div>
  );
}
