"use client";

import { useLanguage } from "@/contexts/language-context";
import { MarketingLayout } from "@/components/landing/marketing-layout";

// Cartes prédéfinies pour chaque langue
const CARDS_EN = [
  ["Smart bio page", "Showcase your offers, social networks and key content."],
  ["Short links", "Create short, clean and easy-to-share URLs."],
  ["Pro QR Codes", "Generate custom QR codes ready for your print materials."],
  ["Conversion & analytics", "Understand what works and optimize your strategy."],
];

const CARDS_FR = [
  ["Page bio intelligente", "Mets en avant tes offres, réseaux sociaux et contenus clés."],
  ["Liens raccourcis", "Crée des URLs courtes, propres et simples à partager."],
  ["QR Codes pro", "Génère des QR codes personnalisés prêts pour tes supports imprimés."],
  ["Conversion & analytics", "Comprends ce qui fonctionne et optimise ta stratégie."],
];

export default function ProductPage() {
  const { lang } = useLanguage();
  const en = lang === "en";
  const cards = en ? CARDS_EN : CARDS_FR;

  // Métadonnées dynamiques selon la langue
  const pageTitle = en
    ? "Pricing plans for your link in bio — BeassistLink"
    : "Tarifs de ton lien en bio — BeassistLink";
  const pageDescription = en
    ? "Compare FREE, STARTER and PRO plans to grow your link in bio with advanced analytics, customization and conversion features."
    : "Compare les offres FREE, STARTER et PRO pour développer ton lien en bio avec analytics avancées, personnalisation et conversion.";
  const canonicalUrl = "https://www.beassist-link.com/pricing";

  // Données structurées JSON-LD de type SoftwareApplication (ou Product)
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "BeassistLink",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: canonicalUrl,
    description: pageDescription,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "EUR",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "1250",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />

      <MarketingLayout
        category={en ? "Pricing" : "Tarifs"}
        title={pageTitle}
        description={pageDescription}
        updatedAt={en ? "April 13, 2026" : "13 avril 2026"}
      >
        <div
          className="grid sm:grid-cols-2 gap-4"
          role="list"
          aria-label={en ? "Product features" : "Fonctionnalités du produit"}
        >
          {cards.map(([title, text]) => (
            <div
              key={title}
              role="listitem"
              className="rounded-2xl border border-gray-200 p-5 bg-white"
            >
              <h3 className="font-bold text-gray-900">{title}</h3>
              <p className="text-sm text-gray-600 mt-2 leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </MarketingLayout>
    </>
  );
}