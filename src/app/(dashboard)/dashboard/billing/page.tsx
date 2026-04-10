import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { Check, Crown, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PLANS, PLAN_FEATURE_LISTS, type PlanName } from "@/lib/plans";
import { formatDate, formatPrice } from "@/lib/utils";
import Link from "next/link";

export default async function BillingPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const subscription = await db.subscription.findUnique({
    where: { userId: session.user.id },
  });

  const currentPlan = (session.user.plan as PlanName) || "FREE";

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
      {/* En-tête */}
      <div className="mb-8">
        <h1 className="text-2xl font-black text-gray-900">Facturation</h1>
        <p className="text-gray-500 mt-1">Gérez votre abonnement et vos paiements</p>
      </div>

      {/* Plan actuel */}
      <div className="bg-gradient-to-r from-[#8F00FF] to-[#6200CC] rounded-3xl p-6 text-white mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-8 translate-x-8" />
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-purple-200 text-sm font-medium mb-1">Plan actuel</p>
            <div className="flex items-center gap-3">
              <h2 className="text-3xl font-black">{PLANS[currentPlan].name}</h2>
              <Badge variant="outline" className="border-white/40 text-white bg-white/10">
                {currentPlan}
              </Badge>
            </div>
            {subscription?.currentPeriodEnd && (
              <p className="text-purple-200 text-sm mt-2">
                Prochain renouvellement : {formatDate(subscription.currentPeriodEnd)}
              </p>
            )}
          </div>
          {currentPlan !== "FREE" && (
            <form action="/api/stripe/portal" method="POST">
              <button
                type="submit"
                className="px-5 py-2.5 bg-white text-[#8F00FF] font-bold text-sm rounded-xl hover:bg-gray-100 transition-colors"
              >
                Gérer l&apos;abonnement
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Plans disponibles */}
      <h2 className="text-xl font-black text-gray-900 mb-6">
        {currentPlan === "FREE" ? "Choisissez votre plan" : "Changer de plan"}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {(["FREE", "STARTER", "PRO"] as PlanName[]).map((planKey) => {
          const plan = PLANS[planKey];
          const features = PLAN_FEATURE_LISTS[planKey];
          const isCurrentPlan = planKey === currentPlan;

          return (
            <div
              key={planKey}
              className={`rounded-2xl p-6 border-2 flex flex-col transition-all duration-300 ${
                isCurrentPlan
                  ? "border-[#8F00FF] bg-[#F5EBFF]"
                  : plan.highlighted
                  ? "border-[#8F00FF]/40 bg-white hover:border-[#8F00FF] hover:shadow-lg"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              {/* En-tête plan */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-black text-gray-900 text-lg">{plan.name}</h3>
                  {isCurrentPlan && (
                    <Badge variant="primary" size="sm">
                      <Check size={10} /> Actif
                    </Badge>
                  )}
                  {plan.badge && !isCurrentPlan && (
                    <Badge variant="primary" size="sm">{plan.badge}</Badge>
                  )}
                </div>
                <div className="flex items-end gap-1">
                  <span className="text-3xl font-black text-gray-900">
                    {plan.price.monthly === 0
                      ? "Gratuit"
                      : formatPrice(plan.price.monthly)}
                  </span>
                  {plan.price.monthly > 0 && (
                    <span className="text-gray-400 text-sm mb-1">/mois</span>
                  )}
                </div>
                {plan.price.savings > 0 && (
                  <p className="text-xs text-[#8F00FF] mt-1">
                    ou {formatPrice(plan.price.yearlyPerMonth)}/mois en annuel
                    (économisez {plan.price.savings}%)
                  </p>
                )}
              </div>

              {/* CTA */}
              {isCurrentPlan ? (
                <div className="w-full text-center py-2.5 px-4 rounded-xl bg-[#8F00FF] text-white text-sm font-bold mb-5">
                  ✓ Plan actuel
                </div>
              ) : planKey === "FREE" ? (
                <div className="w-full text-center py-2.5 px-4 rounded-xl bg-gray-100 text-gray-500 text-sm font-medium mb-5">
                  Rétrograder
                </div>
              ) : (
                <form action="/api/stripe/checkout" method="POST">
                  <input type="hidden" name="plan" value={planKey} />
                  <input type="hidden" name="billing" value="monthly" />
                  <div className="flex gap-2 mb-5">
                    <button
                      type="submit"
                      name="billing"
                      value="monthly"
                      className="flex-1 py-2.5 px-3 rounded-xl bg-[#8F00FF] text-white text-xs font-bold hover:bg-[#7200CC] transition-colors"
                    >
                      Mensuel
                    </button>
                    <button
                      type="submit"
                      name="billing"
                      value="yearly"
                      className="flex-1 py-2.5 px-3 rounded-xl border-2 border-[#8F00FF] text-[#8F00FF] text-xs font-bold hover:bg-[#F5EBFF] transition-colors"
                    >
                      Annuel -10%
                    </button>
                  </div>
                </form>
              )}

              {/* Fonctionnalités */}
              <ul className="space-y-2">
                {features.slice(0, 6).map((f) => (
                  <li key={f.label} className="flex items-start gap-2 text-xs">
                    <Check
                      size={13}
                      className={`mt-0.5 flex-shrink-0 ${
                        f.included ? "text-[#8F00FF]" : "text-gray-300"
                      }`}
                    />
                    <span className={f.included ? "text-gray-700" : "text-gray-400"}>
                      {f.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {/* FAQ facturation */}
      <div className="mt-10 bg-gray-50 rounded-2xl p-6">
        <h3 className="font-bold text-gray-900 mb-4">Questions fréquentes</h3>
        <div className="space-y-4">
          {[
            {
              q: "Puis-je annuler à tout moment ?",
              a: "Oui, sans engagement. Votre plan reste actif jusqu'à la fin de la période payée.",
            },
            {
              q: "Comment fonctionne le paiement annuel ?",
              a: "Le montant annuel est débité en une seule fois avec une réduction de 10% par rapport au tarif mensuel.",
            },
            {
              q: "Puis-je changer de plan en cours de période ?",
              a: "Oui, vous pouvez upgrader immédiatement. Le prorata sera calculé automatiquement.",
            },
          ].map((item) => (
            <div key={item.q}>
              <p className="font-semibold text-gray-900 text-sm">{item.q}</p>
              <p className="text-gray-500 text-sm mt-1">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
