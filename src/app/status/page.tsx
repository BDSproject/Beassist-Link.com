import { MarketingLayout } from "@/components/landing/marketing-layout";

export default function StatusPage() {
  const services = [
    ["Application web", "Opérationnel"],
    ["API principale", "Opérationnel"],
    ["Base de données", "Opérationnel"],
    ["Paiements Stripe", "Opérationnel"],
  ];

  return (
    <MarketingLayout
      category="Statut"
      title="État des services"
      description="Surveillez la disponibilité des composants critiques de BeassistLink."
      updatedAt="13 avril 2026"
    >
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
        <p className="text-emerald-800 font-semibold">Tous les systèmes sont opérationnels.</p>
      </div>
      <div className="space-y-3">
        {services.map(([name, status]) => (
          <div key={name} className="rounded-xl border border-gray-200 p-4 flex items-center justify-between">
            <p className="font-medium text-gray-900">{name}</p>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700">
              {status}
            </span>
          </div>
        ))}
      </div>
    </MarketingLayout>
  );
}
