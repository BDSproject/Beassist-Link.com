"use client";

import Link from "next/link";
import { Logo } from "@/components/shared/logo";
import { Facebook } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";

const FOOTER_LINKS_CONFIG = {
  Produit: [
    { key: "Fonctionnalités", href: "/features" },
    { key: "Tarifs", href: "/pricing" },
    { key: "Changelog", href: "/changelog" },
  ],
  Entreprise: [
    { key: "À propos", href: "/about" },
    { key: "Blog", href: "/blog" },
    { key: "Carrières", href: "/careers" },
    { key: "Presse", href: "/press" },
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

export function Footer() {
  const { t, lang } = useLanguage();
  return (
    <footer className="bg-[#0A0A0A] text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 pb-12 border-b border-white/10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Logo size="md" variant="white" />
            <p className="mt-4 text-sm text-gray-400 leading-relaxed max-w-xs">
              {t.footer.tagline}
            </p>
            {/* Réseaux sociaux */}
            <div className="flex gap-3 mt-6">
              <a
                href="https://www.facebook.com/beassistlink"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-200"
              >
                <Facebook size={16} />
              </a>
            </div>
          </div>

          {/* Links */}
          {(Object.keys(FOOTER_LINKS_CONFIG) as FooterCategory[]).map((category) => (
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
        </div>

        {/* Bottom */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} BeassistLink. {t.footer.copyright}
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-3 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              {t.footer.madeWith}{" "}
              <span className="text-[#8F00FF] mx-1">♥</span>{" "}
              {lang === "fr" ? "par" : "by"}{" "}
              <span className="font-semibold text-white ml-1">Beassist</span>
            </span>
            <span className="hidden sm:inline text-gray-700">·</span>
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
  );
}
