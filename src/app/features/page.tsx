import { MarketingLayout } from "@/components/landing/marketing-layout";

export default function FeaturesPage() {
  return (
    <MarketingLayout
      category="Fonctionnalités"
      title="Tout ce dont vous avez besoin pour convertir votre audience"
      description="BeassistLink combine simplicité, design et performance pour vous aider à développer votre activité en ligne."
      updatedAt="13 avril 2026"
    >
      <div className="space-y-4">
        {[
          ["Éditeur de page bio", "Thèmes, couleurs, avatar, liens sociaux et aperçu en direct."],
          ["Gestion des liens courts", "Création, édition, suppression et suivi des clics en temps réel."],
          ["QR Code Generator", "Personnalisation couleur/taille, export PNG HD, usage pro."],
          ["Plans évolutifs", "Passez de FREE à STARTER/PRO selon vos besoins."],
          ["Performance", "Application Next.js rapide, responsive et pensée pour le mobile."],
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
