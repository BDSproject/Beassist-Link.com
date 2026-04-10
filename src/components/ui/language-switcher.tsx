"use client";

import { useLanguage } from "@/contexts/language-context";

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { lang, setLang } = useLanguage();

  return (
    <div className={`flex items-center gap-1 bg-gray-100 rounded-xl p-1 ${className}`}>
      <button
        onClick={() => setLang("fr")}
        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
          lang === "fr"
            ? "bg-white text-gray-900 shadow-sm"
            : "text-gray-500 hover:text-gray-700"
        }`}
        aria-label="Français"
      >
        <span className="text-base leading-none">🇫🇷</span>
        <span>FR</span>
      </button>
      <button
        onClick={() => setLang("en")}
        className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 ${
          lang === "en"
            ? "bg-white text-gray-900 shadow-sm"
            : "text-gray-500 hover:text-gray-700"
        }`}
        aria-label="English"
      >
        <span className="text-base leading-none">🇬🇧</span>
        <span>EN</span>
      </button>
    </div>
  );
}
