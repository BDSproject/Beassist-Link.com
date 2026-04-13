import { MarketingLayout } from "@/components/landing/marketing-layout";

export default function ApiDocsPage() {
  return (
    <MarketingLayout
      category="API"
      title="API BeassistLink"
      description="L'API publique est en préparation. Les endpoints internes existent déjà pour la gestion des liens, bio pages et analytics."
      updatedAt="13 avril 2026"
    >
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
        <h3 className="font-bold text-amber-900">Bientôt disponible</h3>
        <p className="text-sm text-amber-800 mt-2">
          Nous finalisons la documentation publique, l'authentification API key et les quotas par plan.
        </p>
      </div>
      <div className="rounded-2xl border border-gray-200 p-5">
        <h3 className="font-semibold text-gray-900">Ce qui est prévu</h3>
        <ul className="text-sm text-gray-600 mt-2 space-y-1">
          <li>• API Links: create / update / delete / stats</li>
          <li>• API Bio: gestion du profil et des social links</li>
          <li>• API QR: génération et tracking</li>
          <li>• Webhooks pour événements clés</li>
        </ul>
      </div>
    </MarketingLayout>
  );
}
