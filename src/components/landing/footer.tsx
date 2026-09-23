"use client";

import Link from "next/link";
import Head from "next/head";
import { Logo } from "@/components/shared/logo";
import { Facebook } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

// Icônes SVG personnalisées — Instagram & TikTok (absentes de lucide)
function IconInstagram({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  );
}

function IconTikTok({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/>
    </svg>
  );
}

const FOOTER_LINKS_CONFIG = {
  Produit: [
    { key: "Fonctionnalités", href: "/features" },
    { key: "Tarifs", href: "/pricing" },
  ],
  Entreprise: [
    { key: "À propos", href: "/about" },
    { key: "Blog", href: "/blog" },
    { key: "Partenariat", href: "/partenariat" },
  ],
  Support: [
    { key: "Documentation", href: "/docs" },
    { key: "Centre d'aide", href: "/help" },
    { key: "Contact", href: "/contact" },
  ],
  Légal: [
    { key: "Confidentialité", href: "/privacy" },
    { key: "CGU", href: "/cgu" },
    { key: "Cookies", href: "/cookies" },
    { key: "RGPD", href: "/gdpr" },
  ],
} as const;

type FooterCategory = keyof typeof FOOTER_LINKS_CONFIG;

const FOOTER_CATEGORY_HREFS: Record<FooterCategory, string> = {
  Produit: "/product",
  Entreprise: "/about",
  Support: "/support",
  Légal: "/legal",
};

const FOOTER_CATEGORIES = Object.keys(FOOTER_LINKS_CONFIG) as FooterCategory[];

export function Footer() {
  const { t, lang } = useLanguage();

  // Données structurées JSON-LD pour l'organisation
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "BeassistLink",
    url: "https://www.beassist-link.com",
    logo: "https://www.beassist-link.com/icon.svg",
    sameAs: [
      "https://www.facebook.com/beassistlink",
      "https://www.instagram.com/beassistlink",
      "https://www.tiktok.com/@beassistlink",
    ],
  };

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </Head>

      <footer className="bg-[#0A0A0A] text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 pb-12 border-b border-white/10">
            {/* Brand & Social */}
            <div className="col-span-2 md:col-span-1">
              <Logo size="md" variant="white" />
              <p className="mt-4 text-sm text-gray-400 leading-relaxed max-w-xs">
                {t.footer.tagline}
              </p>
              <div className="flex gap-3 mt-6">
                <a
                  href="https://www.facebook.com/profile.php?id=61572091325570"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#1877F2]/20 hover:border-[#1877F2]/40 transition-all duration-200"
                >
                  <Facebook size={16} aria-hidden="true" />
                </a>
                <a
                  href="https://www.instagram.com/beassistlink"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-[#E1306C]/20 hover:border-[#E1306C]/40 transition-all duration-200"
                >
                  <IconInstagram size={16} />
                </a>
              </div>
            </div>

            {/* Navigation liens */}
            <nav aria-label="Navigation du pied de page" className="contents">
              {FOOTER_CATEGORIES.map((category) => (
                <div key={category}>
                  <Link
                    href={FOOTER_CATEGORY_HREFS[category]}
                    className="text-sm font-semibold text-white mb-4 inline-block hover:text-[#CFA8FF] transition-colors"
                  >
                    {t.footer.categories[category]}
                  </Link>
                  <ul className="space-y-3">
                    {FOOTER_LINKS_CONFIG[category].map((link) => (
                      <li key={link.key}>
                        <Link
                          href={link.href}
                          className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                        >
                          {t.footer.links[link.key]}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </div>

          {/* Bottom */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} BeassistLink. {t.footer.copyright}
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-3 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                {t.footer.madeWith}{" "}
                <span className="text-[#8F00FF] mx-1" aria-hidden="true">♥</span>{" "}
                {lang === "fr" ? "par" : "by"}{" "}
                <span className="font-semibold text-white ml-1">Beassist</span>
              </span>
              <span className="hidden sm:inline text-gray-700" aria-hidden="true">·</span>
              <Link
                href="/legal"
                className="hover:text-white transition-colors duration-200"
              >
                {t.footer.legalNotice}
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}