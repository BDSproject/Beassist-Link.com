"use client";

import { useState, useRef, useEffect } from "react";
import { Globe, Check } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const options = [
    { value: "fr" as const, label: "Français", flag: "🇫🇷" },
    { value: "en" as const, label: "English", flag: "🇬🇧" },
  ];

  return (
    <div ref={ref} className={"relative " + className}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
        aria-label="Switch language"
      >
        <Globe className="w-4 h-4" />
        <span className="text-xs font-medium uppercase">{lang}</span>
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-1 w-36 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50">
          {options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => { setLang(opt.value); setOpen(false); }}
              className={
                "w-full flex items-center gap-2 px-3 py-2 text-sm transition-colors " +
                (lang === opt.value
                  ? "text-[#8F00FF] font-semibold bg-[#8F00FF]/5"
                  : "text-gray-700 hover:bg-gray-50")
              }
            >
              <span>{opt.flag}</span>
              <span>{opt.label}</span>
              {lang === opt.value && (
                <Check className="w-3.5 h-3.5 ml-auto text-[#8F00FF]" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
