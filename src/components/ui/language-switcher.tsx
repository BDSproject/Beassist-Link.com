"use client";

import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/language-context";
import { localeTargetPath, type Locale } from "@/lib/locale-routes";

// Bascule de langue en deux segments, sans menu déroulant.
//
// Un menu déroulant avait été essayé : la navbar est une carte arrondie avec
// `overflow-hidden`, donc le panneau flottant était rogné et invisible. Un
// contrôle segmenté règle le problème et se comprend en un coup d'œil.

const OPTIONS: { value: Locale; label: string; aria: string }[] = [
  { value: "fr", label: "FR", aria: "Français" },
  { value: "en", label: "EN", aria: "English" },
];

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { lang, setLang } = useLanguage();
  const pathname = usePathname();
  const router = useRouter();

  // Change la langue et, quand la langue visée possède sa propre arborescence
  // d'URL, navigue vers l'URL correspondante. Sans ce changement d'URL, une
  // page anglaise resterait anglaise : le fournisseur de langue force
  // l'anglais sur /en.
  const choose = (value: Locale) => {
    if (value === lang) return;
    setLang(value);
    const target = localeTargetPath(pathname || "/", value);
    if (target && target !== pathname) {
      router.push(target);
    }
  };

  return (
    <div
      role="group"
      aria-label={lang === "fr" ? "Langue" : "Language"}
      className={cn(
        "inline-flex items-center gap-0.5 rounded-xl bg-gray-100/90 p-0.5",
        className
      )}
    >
      {OPTIONS.map((opt) => {
        const active = lang === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => choose(opt.value)}
            aria-label={opt.aria}
            aria-pressed={active}
            className={cn(
              "px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors duration-200",
              active
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-800"
            )}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
