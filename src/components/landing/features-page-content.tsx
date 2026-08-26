"use client";

import { useLanguage } from "@/contexts/language-context";
import { MarketingLayout } from "@/components/landing/marketing-layout";

export function FeaturesPageContent() {
  const { lang } = useLanguage();
  const en = lang === "en";

  const items = en
    ? [
        ["Bio page editor", "Themes, colors, avatar, social links and live preview for a branded link in bio page."],
        ["Short link management", "Create, edit, delete and track branded short links with click analytics."],
        ["QR code generator", "Customize colors and size, then export a high-definition PNG for print or web."],
        ["Scalable plans", "Start free, then upgrade to Starter or Pro when you need more customization and analytics."],
        ["Performance", "Fast, mobile-first experience built with Next.js for creators, freelancers and businesses."],
      ]
    : [
        ["Éditeur de page bio", "Personnalisez votre lien en bio avec thèmes, couleurs, avatar, réseaux sociaux et aperçu en direct."],
        ["Gestion des liens courts", "Créez, modifiez et suivez vos liens raccourcis avec des statistiques de clics claires."],
        ["Générateur de QR code", "Choisissez la couleur, la taille et exportez un PNG haute définition pour le print et le web."],
        ["Plans évolutifs", "Commencez gratuitement puis passez à Starter ou Pro selon vos besoins en personnalisation et analytics."],
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
            : "BeassistLink est conçu pour les créateurs qui veulent une page de lien en bio rapide, élégante et pensée pour la conversion. Des réseaux sociaux aux liens raccourcis en passant par les QR codes, chaque fonctionnalité aide à mieux partager votre univers et à mieux monétiser votre audience."}
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
            {en ? "Why these features matter for SEO and conversion" : "Pourquoi ces fonctionnalités comptent pour le SEO et la conversion"}
          </h2>
          <p className="mt-3 text-sm text-gray-700">
            {en
              ? "A clean link in bio page improves discoverability, makes internal linking easier across your channels and gives visitors a clearer path to your most important content, offers or social profiles. Combined with fast loading times and mobile-first design, these features help both search visibility and user engagement."
              : "Une page de lien en bio claire améliore la découvrabilité, facilite le maillage entre vos canaux et donne aux visiteurs un accès direct à vos contenus, offres et profils sociaux les plus importants. Associées à un chargement rapide et à un design mobile-first, ces fonctionnalités renforcent à la fois la visibilité SEO et l’engagement utilisateur."}
          </p>
        </section>
      </div>
    </MarketingLayout>
  );
}
