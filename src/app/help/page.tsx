import { MarketingLayout } from "@/components/landing/marketing-layout";

export default function HelpPage() {
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
