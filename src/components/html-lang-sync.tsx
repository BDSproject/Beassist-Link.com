"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Synchronise l'attribut `lang` de <html> avec la route courante :
 * "en" pour les routes /en, "fr" sinon. Exécuté côté client (après hydratation),
 * ce qui est lu par les robots qui rendent le JavaScript (Googlebot).
 */
export function HtmlLangSync() {
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.lang = pathname?.startsWith("/en") ? "en" : "fr";
  }, [pathname]);

  return null;
}
