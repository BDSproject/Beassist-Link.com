"use client";

import { useLanguage } from "@/contexts/language-context";
import { MarketingLayout } from "@/components/landing/marketing-layout";

export default function DocsPage() {
  const { lang } = useLanguage();
  const en = lang === "en";

  const sections = en
    ? [
        ["Quick start", "Create an account, configure your profile and publish your bio page."],
        ["Link management", "Create short links, track clicks and optimize performance."],
        ["Customization", "Edit themes, colors, buttons and social networks."],
        ["Billing", "Understand plans and account upgrades."],
      ]
    : [
        ["Démarrage rapide", "Créer un compte, configurer son profil et publier sa page bio."],
        ["Gestion des liens", "Créer des short links, suivre les clics et optimiser les performances."],
        ["Personnalisation", "Modifier thèmes, couleurs, boutons et réseaux sociaux."],
        ["Facturation", "Comprendre les plans et les upgrades de compte."],
      ];

  return (
    <MarketingLayout
      category="Documentation"
      title={en ? "BeassistLink Documentation" : "Documentation BeassistLink"}
      description={
        en
          ? "All the resources to get up and running with the platform quickly."
          : "Toutes les ressources pour prendre en main la plateforme rapidement."
      }
      updatedAt={en ? "April 13, 2026" : "13 avril 2026"}
    >
      <div className="space-y-4">
        {sections.map(([title, text]) => (
          <div key={title} className="rounded-2xl border border-gray-200 p-5">
            <h3 className="font-semibold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-600 mt-2">{text}</p>
          </div>
        ))}
      </div>
    </MarketingLayout>
  );
}

  return (
    <MarketingLayout
      category="Documentation"
      title="Documentation BeassistLink"
      description="Toutes les ressources pour prendre en main la plateforme rapidement."
      updatedAt="13 avril 2026"
    >
      <div className="space-y-4">
        {[
          ["Démarrage rapide", "Créer un compte, configurer son profil et publier sa page bio."],
          ["Gestion des liens", "Créer des short links, suivre les clics et optimiser les performances."],
          ["Personnalisation", "Modifier thèmes, couleurs, boutons et réseaux sociaux."],
          ["Facturation", "Comprendre les plans et les upgrades de compte."],
        ].map(([title, text]) => (
          <div key={title} className="rounded-2xl border border-gray-200 p-5">
            <h3 className="font-semibold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-600 mt-2">{text}</p>
          </div>
        ))}
      </div>
    </MarketingLayout>
  );
}
