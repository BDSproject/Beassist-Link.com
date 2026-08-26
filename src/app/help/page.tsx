"use client";

import { useLanguage } from "@/contexts/language-context";
import { MarketingLayout } from "@/components/landing/marketing-layout";

// FAQ prédéfinie pour chaque langue
const FAQ_EN = [
  ["How do I create my bio page?", "From the dashboard, open the Bio tab then customize your sections."],
  ["Why are some features locked?", "Certain options (QR code, premium themes) are reserved for paid plans."],
  ["Can I cancel my subscription?", "Yes, at any time from the Billing tab."],
  ["How do I contact support?", "Use the Contact page to get a response from the team."],
];

const FAQ_FR = [
  ["Comment créer ma page bio ?", "Depuis le dashboard, ouvrez l'onglet Bio puis personnalisez vos sections."],
  ["Pourquoi certaines fonctionnalités sont bloquées ?", "Certaines options (QR code, thèmes premium) sont réservées aux plans payants."],
  ["Puis-je annuler mon abonnement ?", "Oui, à tout moment depuis l'onglet Facturation."],
  ["Comment contacter le support ?", "Utilisez la page Contact pour obtenir une réponse de l'équipe."],
];

export default function HelpPage() {
  const { lang } = useLanguage();
  const en = lang === "en";
  const faq = en ? FAQ_EN : FAQ_FR;

  // Métadonnées dynamiques
  const pageTitle = en
    ? "Frequently asked questions about our tool BeassistLink"
    : "Questions fréquentes à propos de notre outil BeassistLink";
  const pageDescription = en
    ? "Quick answers to common questions about using our BeassistLink tool that we've already addressed just for our customers or for future reference."
    : "Réponses rapides aux questions courantes sur l'utilisation de notre outil BeassistLink auxquels nous avons déjà répondu.";
  const canonicalUrl = "https://www.beassist-link.com/help";

  // Données structurées FAQ
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map(([q, a]) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: {
        "@type": "Answer",
        text: a,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <MarketingLayout
        category={en ? "Help center" : "Centre d'aide"}
        title={en ? "Frequently asked questions" : "Questions fréquentes"}
        description={pageDescription}
        updatedAt={en ? "April 13, 2026" : "13 avril 2026"}
      >
        <section aria-label={en ? "Frequently asked questions" : "Questions fréquentes"}>
          <div className="space-y-3">
            {faq.map(([q, a]) => (
              <article
                key={q}
                className="rounded-2xl border border-gray-200 p-5"
              >
                <h2 className="font-semibold text-gray-900">{q}</h2>
                <p className="text-sm text-gray-600 mt-2">{a}</p>
              </article>
            ))}
          </div>
        </section>
      </MarketingLayout>
    </>
  );
}