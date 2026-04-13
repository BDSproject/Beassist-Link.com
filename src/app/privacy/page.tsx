import { MarketingLayout } from "@/components/landing/marketing-layout";

export default function PrivacyPage() {
  return (
    <MarketingLayout
      category="Confidentialité"
      title="Politique de confidentialité"
      description="Nous protégeons vos données et appliquons des standards élevés de sécurité et de transparence."
      updatedAt="13 avril 2026"
    >
      <div className="rounded-2xl border border-gray-200 p-6 text-sm text-gray-700 leading-relaxed space-y-3">
        <p>Nous collectons uniquement les données nécessaires au fonctionnement du service (compte, usage, facturation).</p>
        <p>Vos données ne sont jamais revendues. Elles sont hébergées sur des infrastructures sécurisées.</p>
        <p>Vous pouvez demander la modification ou suppression de vos données via la page Contact.</p>
      </div>
    </MarketingLayout>
  );
}
