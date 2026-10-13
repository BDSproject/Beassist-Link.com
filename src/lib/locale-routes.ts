// Correspondances entre l'arbre français (à la racine) et l'arbre anglais
// (sous /en). Le site utilise deux URL distinctes pour les deux langues : une
// page anglaise doit donc rester anglaise, et changer de langue depuis /en doit
// renvoyer vers l'URL française équivalente.
//
// Toute page absente de ces tables n'a pas d'équivalent dans l'autre langue :
// dans ce cas on change la langue côté client sans toucher à l'URL.

export type Locale = "fr" | "en";

const FR_TO_EN: Record<string, string> = {
  "/": "/en",
  "/features": "/en/features",
  "/pricing": "/en/pricing",
  "/blog": "/en/blog",
  "/privacy": "/en/privacy",
  "/cookies": "/en/cookies",
  "/cgu": "/en/terms",
};

const EN_TO_FR: Record<string, string> = {
  "/en": "/",
  "/en/features": "/features",
  "/en/pricing": "/pricing",
  "/en/blog": "/blog",
  "/en/privacy": "/privacy",
  "/en/cookies": "/cookies",
  "/en/terms": "/cgu",
};

export function isEnglishPath(pathname: string): boolean {
  return pathname === "/en" || pathname.startsWith("/en/");
}

/**
 * URL à visiter pour passer dans `target`, ou null si la page courante n'a pas
 * d'équivalent : l'appelant se contente alors de changer la langue sur place.
 */
export function localeTargetPath(
  pathname: string,
  target: Locale
): string | null {
  const path = pathname || "/";

  if (target === "en") {
    if (isEnglishPath(path)) return null;
    return FR_TO_EN[path] ?? null;
  }

  if (!isEnglishPath(path)) return null;
  if (EN_TO_FR[path]) return EN_TO_FR[path];
  // Les articles de blog ont des slugs entièrement différents d'une langue à
  // l'autre : on renvoie vers l'index plutôt que vers une URL inexistante.
  if (path.startsWith("/en/blog/")) return "/blog";
  return "/";
}
