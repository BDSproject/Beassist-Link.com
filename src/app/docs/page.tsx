"use client";

import { useLanguage } from "@/contexts/language-context";
import { MarketingLayout } from "@/components/landing/marketing-layout";

export default function DocsPage() {
  const { lang } = useLanguage();
  const en = lang === "en";

  const sections = en
    ? [
        ["Quick start", "Create an account, set up your profile, and publish your bio page."],
        ["Link management", "Create short links, see clicks, and improve what works."],
        ["Customization", "Change themes, colors, buttons, and social links in a few clicks."],
        ["Plans and payments", "Compare plans and switch anytime."],
      ]
    : [
        ["Démarrage rapide", "Créer un compte, préparer votre profil et publier votre page bio."],
        ["Gestion des liens", "Créer des liens courts, voir les clics et améliorer ce qui fonctionne."],
        ["Personnalisation", "Changer le thème, les couleurs, les boutons et vos réseaux en quelques clics."],
        ["Plans et paiements", "Comparer les plans et changer quand vous voulez."],
      ];

  return (
    <MarketingLayout
      category={en ? "Guides" : "Guides"}
      title={en ? "BeassistLink Guides" : "Guides BeassistLink"}
      description={
        en
          ? "Simple guides to start quickly and use BeassistLink without technical terms."
          : "Des guides simples pour démarrer vite et utiliser BeassistLink sans jargon technique."
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
