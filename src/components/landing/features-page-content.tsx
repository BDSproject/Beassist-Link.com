"use client";

import { useLanguage } from "@/contexts/language-context";
import { MarketingLayout } from "@/components/landing/marketing-layout";

export function FeaturesPageContent() {
  const { lang } = useLanguage();
  const en = lang === "en";

  const items = en
    ? [
        ["Bio page editor", "Themes, colors, avatar, social links and live preview for a branded link in bio page."],
        ["Short link management", "Create, edit, delete and track branded short links with clear click stats."],
        ["QR code generator", "Customize colors and size, then export a high-definition PNG for print or web."],
        ["Scalable plans", "Start free, then upgrade to Starter or Pro when you need more customization and stats."],
        ["Performance", "Fast, mobile-first experience built with Next.js for creators, freelancers and businesses."],
      ]
    : [
        ["Éditeur de page bio", "Personnalise ton lien en bio avec thèmes, couleurs, avatar, réseaux sociaux et aperçu en direct."],
        ["Gestion des liens courts", "Crée, modifie et suis tes liens raccourcis avec des statistiques de clics claires."],
        ["Générateur de QR code", "Choisis la couleur, la taille et exporte un PNG haute définition pour le print et le web."],
        ["Plans évolutifs", "Commence gratuitement puis passe à Starter ou Pro selon tes besoins en personnalisation et statistiques."],
        ["Performance", "Une expérience rapide, responsive et pensée mobile-first pour les créateurs, freelances et entreprises."],
      ];

  return (
    <MarketingLayout
      category={en ? "Features" : "Fonctionnalités"}
      title={
        en
          ? "Everything you need to grow with one link in bio"
          : "Toutes les fonctionnalités pour créer un lien en bio efficace"
      }
      description={
        en
          ? "BeassistLink combines design, simplicity and performance to help creators centralize their audience, share every destination and convert more visitors."
          : "BeassistLink réunit design, simplicité et performance pour aider les créateurs à centraliser leur audience, partager tous leurs liens et convertir plus de visiteurs."
      }
      updatedAt={en ? "August 26, 2026" : "26 août 2026"}
    >
      <div className="space-y-6 text-gray-700 leading-7">
        <p>
          {en
            ? "BeassistLink is built for creators who want a fast, elegant and conversion-focused link in bio page. From social links to branded short URLs and QR codes, every feature is designed to make your profile easier to share and more effective to monetize."
            : "BeassistLink est conçu pour les créateurs qui veulent une page de lien en bio rapide, élégante et pensée pour la conversion. Des réseaux sociaux aux liens raccourcis en passant par les QR codes, chaque fonctionnalité aide à mieux partager ton univers et à mieux monétiser ton audience."}
        </p>

        <div className="grid gap-4">
          {items.map(([title, text]) => (
            <section key={title} className="rounded-2xl border border-gray-200 p-5">
              <h2 className="font-semibold text-gray-900 text-lg">{title}</h2>
              <p className="text-sm text-gray-600 mt-2">{text}</p>
            </section>
          ))}
        </div>

        <section className="rounded-2xl bg-[#F9F5FF] border border-[#EAD6FF] p-6">
          <h2 className="text-xl font-bold text-gray-900">
            {en ? "Why these features improve Google visibility and clicks" : "Pourquoi ces fonctionnalités améliorent la visibilité Google et les clics"}
          </h2>
          <p className="mt-3 text-sm text-gray-700">
            {en
              ? "A clear bio page helps people find you on Google, makes navigation easier between your social channels, and drives more clicks to your key offers and content. With fast loading and a mobile-first experience, visitors stay longer and interact more."
              : "Une page bio claire aide tes clients à te trouver sur Google, facilite la navigation entre tes réseaux et génère plus de clics vers tes contenus et offres importantes. Avec un chargement rapide et une expérience pensée mobile, tes visiteurs restent plus longtemps et interagissent davantage."}
          </p>
        </section>
      </div>
    </MarketingLayout>
  );
}
