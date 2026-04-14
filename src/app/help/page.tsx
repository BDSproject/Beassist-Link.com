"use client";

import { useLanguage } from "@/contexts/language-context";
import { MarketingLayout } from "@/components/landing/marketing-layout";

export default function HelpPage() {
  const { lang } = useLanguage();
  const en = lang === "en";

  const faq = en
    ? [
        ["How do I create my bio page?", "From the dashboard, open the Bio tab then customize your sections."],
        ["Why are some features locked?", "Certain options (QR code, premium themes) are reserved for paid plans."],
        ["Can I cancel my subscription?", "Yes, at any time from the Billing tab."],
        ["How do I contact support?", "Use the Contact page to get a response from the team."],
      ]
    : [
        ["Comment créer ma page bio ?", "Depuis le dashboard, ouvrez l'onglet Bio puis personnalisez vos sections."],
        ["Pourquoi certaines fonctionnalités sont bloquées ?", "Certaines options (QR code, thèmes premium) sont réservées aux plans payants."],
        ["Puis-je annuler mon abonnement ?", "Oui, à tout moment depuis l'onglet Facturation."],
        ["Comment contacter le support ?", "Utilisez la page Contact pour obtenir une réponse de l'équipe."],
      ];

  return (
    <MarketingLayout
      category={en ? "Help center" : "Centre d'aide"}
      title={en ? "Frequently asked questions" : "Questions fréquentes"}
      description={
        en
          ? "Quick answers to common questions about using BeassistLink."
          : "Réponses rapides aux questions courantes sur l'utilisation de BeassistLink."
      }
      updatedAt={en ? "April 13, 2026" : "13 avril 2026"}
    >
      <div className="space-y-3">
        {faq.map(([q, a]) => (
          <div key={q} className="rounded-2xl border border-gray-200 p-5">
            <h3 className="font-semibold text-gray-900">{q}</h3>
            <p className="text-sm text-gray-600 mt-2">{a}</p>
          </div>
        ))}
      </div>
    </MarketingLayout>
  );
}

  return (
    <MarketingLayout
      category="Centre d'aide"
      title="Questions fréquentes"
      description="Réponses rapides aux questions courantes sur l'utilisation de BeassistLink."
      updatedAt="13 avril 2026"
    >
      <div className="space-y-3">
        {[
          ["Comment créer ma page bio ?", "Depuis le dashboard, ouvrez l'onglet Bio puis personnalisez vos sections."],
          ["Pourquoi certaines fonctionnalités sont bloquées ?", "Certaines options (QR code, thèmes premium) sont réservées aux plans payants."],
          ["Puis-je annuler mon abonnement ?", "Oui, à tout moment depuis l'onglet Facturation."],
          ["Comment contacter le support ?", "Utilisez la page Contact pour obtenir une réponse de l'équipe."],
        ].map(([q, a]) => (
          <div key={q} className="rounded-2xl border border-gray-200 p-5">
            <h3 className="font-semibold text-gray-900">{q}</h3>
            <p className="text-sm text-gray-600 mt-2">{a}</p>
          </div>
        ))}
      </div>
    </MarketingLayout>
  );
}
