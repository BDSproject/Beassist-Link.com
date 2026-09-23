"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/language-context";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { Logo } from "@/components/shared/logo";
import { ArrowLeft } from "lucide-react";

type CookieRow = {
  name: string;
  purpose: string;
  duration: string;
  type: string;
};

type Section = {
  title: string;
  text?: string;
  bullets?: string[];
  table?: CookieRow[];
};

const CONTENT = {
  fr: {
    title: "Politique de cookies",
    updatedAt: "Dernière mise à jour : avril 2026",
    intro:
      "Le site BeassistLink (beassist-link.com) utilise des cookies et technologies similaires pour assurer le bon fonctionnement du service, améliorer ton expérience et mesurer l'audience. Cette page t'explique ce qu'est un cookie, quels cookies nous utilisons et comment tu peux les gérer.",
    sections: [
      {
        title: "1. Qu'est-ce qu'un cookie ?",
        text: "Un cookie est un petit fichier texte déposé sur ton terminal (ordinateur, smartphone, tablette) lors de ta visite sur un site web. Il permet au site de mémoriser tes actions et préférences (identifiant de session, langue, etc.) sur une période donnée, afin que tu n'aies pas à les saisir de nouveau à chaque visite.",
      },
      {
        title: "2. Cookies que nous utilisons",
        table: [
          {
            name: "next-auth.session-token",
            purpose: "Maintenir ta session utilisateur après connexion",
            duration: "30 jours",
            type: "Essentiel",
          },
          {
            name: "next-auth.csrf-token",
            purpose: "Protection contre les attaques CSRF lors des formulaires",
            duration: "Session",
            type: "Essentiel",
          },
          {
            name: "next-auth.callback-url",
            purpose: "Redirection après authentification",
            duration: "Session",
            type: "Essentiel",
          },
          {
            name: "cookie_consent",
            purpose: "Mémoriser ton choix concernant les cookies",
            duration: "12 mois",
            type: "Fonctionnel",
          },
          {
            name: "_vercel_insights",
            purpose: "Mesure d'audience anonymisée (si Vercel Analytics activé)",
            duration: "Session",
            type: "Analytique",
          },
        ],
      },
      {
        title: "3. Catégories de cookies",
        bullets: [
          "Cookies essentiels — indispensables au fonctionnement du site (authentification, sécurité). Ils ne peuvent pas être désactivés sans impacter le service.",
          "Cookies fonctionnels — permettent de mémoriser tes préférences (langue, consentement cookie). Ils améliorent ton expérience sans t'identifier personnellement.",
          "Cookies analytiques — utilisés pour mesurer le nombre de visiteurs et comprendre comment le site est utilisé. Les données sont anonymisées et ne permettent pas de t'identifier.",
          "Cookies marketing / tiers — BeassistLink n'utilise pas de cookies publicitaires ou de tracking tiers à des fins commerciales.",
        ],
      },
      {
        title: "4. Base légale",
        text: "Conformément au RGPD (Règlement UE 2016/679) et à la directive ePrivacy, les cookies strictement nécessaires sont déposés sans ton consentement préalable car ils sont indispensables au service. Pour les cookies fonctionnels et analytiques, nous recueillons ton consentement via la bannière qui s'affiche lors de ta première visite.",
      },
      {
        title: "5. Durée de conservation",
        text: "Les cookies de session sont supprimés à la fermeture du navigateur. Les cookies persistants ont une durée de vie maximale de 12 mois. Au-delà de cette durée, un nouveau consentement t'est demandé.",
      },
      {
        title: "6. Tes droits et comment gérer les cookies",
        bullets: [
          "Via notre bandeau : tu peux accepter ou refuser les cookies non essentiels lors de ta première visite. Tu peux modifier ton choix à tout moment en cliquant sur « Gérer les cookies » en bas de page.",
          "Via ton navigateur : la plupart des navigateurs te permettent de bloquer ou supprimer les cookies. Consulte l'aide de ton navigateur (Chrome, Firefox, Safari, Edge) pour plus d'informations.",
          "Via des outils tiers : tu peux t'opposer à Google Analytics sur https://tools.google.com/dlpage/gaoptout.",
          "Attention : désactiver certains cookies essentiels peut empêcher le bon fonctionnement du site (connexion impossible, perte de session).",
        ],
      },
      {
        title: "7. Cookies tiers",
        text: "Le site peut faire appel à des services tiers (hébergement Vercel, paiement Stripe) qui peuvent déposer leurs propres cookies. Ces cookies sont soumis aux politiques de confidentialité respectives de ces prestataires. Stripe dépose des cookies nécessaires au traitement sécurisé des paiements uniquement lors des pages de checkout.",
      },
      {
        title: "8. Mise à jour de la politique",
        text: "Beassisted SASU se réserve le droit de modifier la présente politique de cookies à tout moment pour s'adapter aux évolutions réglementaires ou techniques. La date de dernière mise à jour figure en haut de cette page. Nous t'encourageons à la consulter régulièrement.",
      },
      {
        title: "9. Contact",
        text: "Pour toute question relative à notre utilisation des cookies ou à tes données personnelles, contacte-nous à : contact@beassist-link.com — Beassisted SASU, 9 Rue de Paris, 94450 Limeil-Brévannes, France.",
      },
    ] as Section[],
    tableHeaders: ["Nom du cookie", "Finalité", "Durée", "Type"],
    backLabel: "Retour à l'accueil",
  },
  en: {
    title: "Cookie Policy",
    updatedAt: "Last updated: April 2026",
    intro:
      "The BeassistLink website (beassist-link.com) uses cookies and similar technologies to ensure the service works properly, improve your experience and measure audience. This page explains what a cookie is, which cookies we use and how you can manage them.",
    sections: [
      {
        title: "1. What is a cookie?",
        text: "A cookie is a small text file placed on your device (computer, smartphone, tablet) when you visit a website. It allows the site to remember your actions and preferences (session ID, language, etc.) over a period of time, so you don't have to re-enter them on every visit.",
      },
      {
        title: "2. Cookies we use",
        table: [
          {
            name: "next-auth.session-token",
            purpose: "Maintain your user session after login",
            duration: "30 days",
            type: "Essential",
          },
          {
            name: "next-auth.csrf-token",
            purpose: "Protection against CSRF attacks on forms",
            duration: "Session",
            type: "Essential",
          },
          {
            name: "next-auth.callback-url",
            purpose: "Redirect after authentication",
            duration: "Session",
            type: "Essential",
          },
          {
            name: "cookie_consent",
            purpose: "Remember your cookie preference",
            duration: "12 months",
            type: "Functional",
          },
          {
            name: "_vercel_insights",
            purpose: "Anonymised audience measurement (if Vercel Analytics enabled)",
            duration: "Session",
            type: "Analytics",
          },
        ],
      },
      {
        title: "3. Cookie categories",
        bullets: [
          "Essential cookies — required for the site to function (authentication, security). They cannot be disabled without impacting the service.",
          "Functional cookies — remember your preferences (language, cookie consent). They improve your experience without identifying you personally.",
          "Analytics cookies — used to count visitors and understand how the site is used. Data is anonymised and cannot be used to identify you.",
          "Marketing / third-party cookies — BeassistLink does not use advertising or third-party tracking cookies for commercial purposes.",
        ],
      },
      {
        title: "4. Legal basis",
        text: "In accordance with the GDPR (EU Regulation 2016/679) and the ePrivacy Directive, strictly necessary cookies are placed without your prior consent as they are essential to the service. For functional and analytics cookies, we collect your consent via the banner displayed on your first visit.",
      },
      {
        title: "5. Retention period",
        text: "Session cookies are deleted when you close your browser. Persistent cookies have a maximum lifespan of 12 months. After this period, your consent is requested again.",
      },
      {
        title: "6. Your rights and how to manage cookies",
        bullets: [
          "Via our banner: you can accept or refuse non-essential cookies on your first visit. You can change your choice at any time by clicking 'Manage cookies' at the bottom of the page.",
          "Via your browser: most browsers allow you to block or delete cookies. Check your browser's help (Chrome, Firefox, Safari, Edge) for more information.",
          "Via third-party tools: you can opt out of Google Analytics at https://tools.google.com/dlpage/gaoptout.",
          "Note: disabling certain essential cookies may prevent the site from functioning correctly (unable to log in, session loss).",
        ],
      },
      {
        title: "7. Third-party cookies",
        text: "The site may use third-party services (Vercel hosting, Stripe payments) that may set their own cookies. These cookies are subject to the respective privacy policies of these providers. Stripe sets cookies required for secure payment processing only on checkout pages.",
      },
      {
        title: "8. Policy updates",
        text: "Beassisted SASU reserves the right to update this cookie policy at any time to comply with regulatory or technical changes. The last updated date is shown at the top of this page. We encourage you to consult it regularly.",
      },
      {
        title: "9. Contact",
        text: "For any questions regarding our use of cookies or your personal data, contact us at: contact@beassist-link.com — Beassisted SASU, 9 Rue de Paris, 94450 Limeil-Brévannes, France.",
      },
    ] as Section[],
    tableHeaders: ["Cookie name", "Purpose", "Duration", "Type"],
    backLabel: "Back to home",
  },
};

const TYPE_COLORS: Record<string, string> = {
  Essentiel: "bg-green-50 text-green-700 border-green-200",
  Essential: "bg-green-50 text-green-700 border-green-200",
  Fonctionnel: "bg-blue-50 text-blue-700 border-blue-200",
  Functional: "bg-blue-50 text-blue-700 border-blue-200",
  Analytique: "bg-amber-50 text-amber-700 border-amber-200",
  Analytics: "bg-amber-50 text-amber-700 border-amber-200",
};

export default function CookiesPage() {
  const { lang } = useLanguage();
  const c = CONTENT[lang];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100 bg-white/90 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/">
            <Logo size="md" />
          </Link>
          <LanguageSwitcher />
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        {/* Back */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#8F00FF] transition-colors mb-10"
        >
          <ArrowLeft size={16} />
          {c.backLabel}
        </Link>

        {/* Title */}
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 mb-3">
            {c.title}
          </h1>
          <p className="text-sm text-gray-400">{c.updatedAt}</p>
          <div className="mt-4 h-1 w-16 rounded-full bg-[#8F00FF]" />
        </div>

        {/* Intro */}
        <p className="text-gray-600 leading-relaxed mb-12 text-sm">{c.intro}</p>

        {/* Sections */}
        <div className="space-y-12">
          {c.sections.map((s) => (
            <section key={s.title}>
              <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                {s.title}
              </h2>

              {s.text && (
                <p className="text-gray-600 leading-relaxed text-sm">{s.text}</p>
              )}

              {s.bullets && (
                <ul className="space-y-2.5 mt-2">
                  {s.bullets.map((b, i) => (
                    <li key={i} className="flex gap-2.5 text-sm text-gray-600">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#8F00FF]/60" />
                      {b}
                    </li>
                  ))}
                </ul>
              )}

              {s.table && (
                <div className="overflow-x-auto mt-2 rounded-xl border border-gray-100">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-100">
                        {c.tableHeaders.map((h) => (
                          <th
                            key={h}
                            className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide whitespace-nowrap"
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {s.table.map((row) => (
                        <tr key={row.name} className="hover:bg-gray-50/50 transition-colors">
                          <td className="px-4 py-3 font-mono text-xs text-gray-800 whitespace-nowrap">
                            {row.name}
                          </td>
                          <td className="px-4 py-3 text-gray-600">{row.purpose}</td>
                          <td className="px-4 py-3 text-gray-500 whitespace-nowrap">
                            {row.duration}
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${
                                TYPE_COLORS[row.type] ?? "bg-gray-50 text-gray-600 border-gray-200"
                              }`}
                            >
                              {row.type}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          ))}
        </div>

        {/* Footer note */}
        <div className="mt-16 pt-8 border-t border-gray-100 text-center">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} Beassisted SASU —{" "}
            {lang === "fr" ? "Tous droits réservés" : "All rights reserved"}
          </p>
          <div className="flex items-center justify-center gap-4 mt-3 text-xs text-[#8F00FF]">
            <Link href="/legal" className="hover:underline">
              {lang === "fr" ? "Mentions légales" : "Legal Notice"}
            </Link>
            <span className="text-gray-300">·</span>
            <Link href="/cgu" className="hover:underline">
              {lang === "fr" ? "CGU" : "Terms of Use"}
            </Link>
            <span className="text-gray-300">·</span>
            <Link href="/cgv" className="hover:underline">
              {lang === "fr" ? "CGV" : "Terms of Sale"}
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
