"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X, Cookie } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { getConsent, setConsent } from "@/lib/consent";

const TEXT = {
  fr: {
    title: "🍪 Cookies",
    message:
      "Nous utilisons des cookies essentiels au fonctionnement du site et des cookies analytiques anonymisés pour améliorer votre expérience.",
    policy: "Politique de cookies",
    accept: "Tout accepter",
    decline: "Essentiels uniquement",
  },
  en: {
    title: "🍪 Cookies",
    message:
      "We use essential cookies for the site to work and anonymised analytics cookies to improve your experience.",
    policy: "Cookie policy",
    accept: "Accept all",
    decline: "Essential only",
  },
};

export function CookieBanner() {
  const { lang } = useLanguage();
  const t = TEXT[lang];
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!getConsent()) setVisible(true);
  }, []);

  function handleAccept() {
    setConsent("all");
    setVisible(false);
  }

  function handleDecline() {
    setConsent("essential");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6 pointer-events-none">
      <div className="pointer-events-auto max-w-2xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.12)] p-5 flex flex-col sm:flex-row sm:items-center gap-4">
        {/* Icon + text */}
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-[#F5EBFF] flex items-center justify-center flex-shrink-0 mt-0.5">
            <Cookie size={18} className="text-[#8F00FF]" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-gray-900 mb-0.5">{t.title}</p>
            <p className="text-xs text-gray-500 leading-relaxed">
              {t.message}{" "}
              <Link
                href="/cookies"
                className="text-[#8F00FF] hover:underline font-medium whitespace-nowrap"
              >
                {t.policy}
              </Link>
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={handleDecline}
            className="text-xs font-medium text-gray-500 hover:text-gray-800 transition-colors px-3 py-2 rounded-xl hover:bg-gray-100"
          >
            {t.decline}
          </button>
          <button
            onClick={handleAccept}
            className="text-xs font-bold text-white px-4 py-2 rounded-xl transition-all duration-200 hover:opacity-90 active:scale-95"
            style={{ background: "linear-gradient(135deg, #8F00FF, #6200CC)" }}
          >
            {t.accept}
          </button>
          <button
            onClick={handleDecline}
            className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-100"
            aria-label="Fermer"
          >
            <X size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
