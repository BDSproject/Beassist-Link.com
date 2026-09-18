/**
 * Cookie consent helpers (RGPD).
 *
 * The user's choice is stored in localStorage under `cookie_consent` and is one of:
 *  - "all"       → essential + analytics cookies accepted
 *  - "essential" → essential cookies only (no analytics)
 *
 * Non-analytics features can always run; anything analytics-related (e.g. Google
 * Analytics) must be gated behind `hasAnalyticsConsent()`.
 */

export const CONSENT_STORAGE_KEY = "cookie_consent";

/** Event broadcast on `window` whenever the choice changes in this tab. */
export const CONSENT_CHANGE_EVENT = "cookie-consent-change";

export type ConsentValue = "all" | "essential";

/** Read the stored choice. Returns `null` when the user has not chosen yet. */
export function getConsent(): ConsentValue | null {
  if (typeof window === "undefined") return null;

  try {
    const stored = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    return stored === "all" || stored === "essential" ? stored : null;
  } catch {
    // localStorage can throw (private mode, blocked storage) — treat as "no choice".
    return null;
  }
}

/** Persist the choice and notify listeners so gated scripts can react immediately. */
export function setConsent(value: ConsentValue): void {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, value);
  } catch {
    // Ignore write failures; the in-tab event below still updates the UI.
  }

  window.dispatchEvent(new CustomEvent<ConsentValue>(CONSENT_CHANGE_EVENT, { detail: value }));
}

/** Remove the stored choice (used to re-open the banner / withdraw consent). */
export function clearConsent(): void {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.removeItem(CONSENT_STORAGE_KEY);
  } catch {
    // Ignore.
  }

  window.dispatchEvent(new Event(CONSENT_CHANGE_EVENT));
}

/** `true` only when the user explicitly accepted analytics cookies. */
export function hasAnalyticsConsent(): boolean {
  return getConsent() === "all";
}
