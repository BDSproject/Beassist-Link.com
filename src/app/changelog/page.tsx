import { MarketingLayout } from "@/components/landing/marketing-layout";

export default function ChangelogPage() {
  return (
    <MarketingLayout
      category="Changelog"
      title="Suivi des améliorations produit"
      description="Nous publions régulièrement des nouveautés pour améliorer l'expérience BeassistLink."
      updatedAt="13 avril 2026"
    >
      <div className="space-y-4">
        <div className="rounded-2xl border border-gray-200 p-5">
          <p className="text-xs font-semibold text-[#8F00FF]">v1.9.0 · Avril 2026</p>
          <h3 className="font-bold text-gray-900 mt-1">QR Code Generator + Paywalls FREE</h3>
          <ul className="mt-2 text-sm text-gray-600 space-y-1">
            <li>• Générateur QR avec export PNG HD</li>
            <li>• Blocage FREE sur QR et thèmes premium</li>
            <li>• Sélecteur de langue amélioré</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-gray-200 p-5">
          <p className="text-xs font-semibold text-[#8F00FF]">v1.8.0 · Mars 2026</p>
          <h3 className="font-bold text-gray-900 mt-1">Nouveau builder de page bio</h3>
          <ul className="mt-2 text-sm text-gray-600 space-y-1">
            <li>• Éditeur multi-onglets avec aperçu live</li>
            <li>• Thèmes, typographies, styles de boutons</li>
            <li>• Gestion des liens sociaux</li>
          </ul>
        </div>
      </div>
    </MarketingLayout>
  );
}
