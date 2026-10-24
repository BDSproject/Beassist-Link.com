"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { CONSENT_CHANGE_EVENT, CONSENT_STORAGE_KEY, hasAnalyticsConsent } from "@/lib/consent";

/** Google Analytics 4 measurement ID. */
const GA_MEASUREMENT_ID = "G-CPKYNWWJ75";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

/**
 * Loads the Google Analytics (gtag.js) tag : but only once the visitor has
 * explicitly accepted analytics cookies via the cookie banner.
 *
 * Nothing is requested from googletagmanager.com before that consent, so the
 * "Essentiels uniquement" choice really means no analytics at all.
 */
export function GoogleAnalytics() {
  const [analyticsAllowed, setAnalyticsAllowed] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    function sync() {
      setAnalyticsAllowed(hasAnalyticsConsent());
    }

    sync();

    // Same-tab changes (banner buttons) and cross-tab changes (other tabs).
    function onStorageChange(event: StorageEvent) {
      if (event.key === CONSENT_STORAGE_KEY || event.key === null) sync();
    }

    window.addEventListener(CONSENT_CHANGE_EVENT, sync);
    window.addEventListener("storage", onStorageChange);

    return () => {
      window.removeEventListener(CONSENT_CHANGE_EVENT, sync);
      window.removeEventListener("storage", onStorageChange);
    };
  }, []);

  useEffect(() => {
    if (analyticsAllowed) {
      setHasLoaded(true);
      return;
    }

    // Consent withdrawn after the tag already loaded: stop Google from storing data.
    if (hasLoaded) {
      window.gtag?.("consent", "update", { analytics_storage: "denied" });
    }
  }, [analyticsAllowed, hasLoaded]);

  if (!analyticsAllowed) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
    </>
  );
}
