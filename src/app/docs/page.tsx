import { MarketingLayout } from "@/components/landing/marketing-layout";

export default function DocsPage() {
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
