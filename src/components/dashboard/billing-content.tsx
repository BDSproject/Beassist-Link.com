"use client";

import Link from "next/link";
import { Check, Crown, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PLANS, PLAN_FEATURE_LISTS, type PlanName } from "@/lib/plans";
import { formatDate, formatPrice } from "@/lib/utils";
import { useLanguage } from "@/contexts/language-context";

interface Props {
  currentPlan: PlanName;
  subscriptionEnd?: Date | null;
}

export function BillingContent({ currentPlan, subscriptionEnd }: Props) {
  const { t } = useLanguage();
  const d = t.dashboard.billing;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-black text-gray-900">{d.title}</h1>
        <p className="text-gray-500 mt-1">{d.subtitle}</p>
      </div>

      {/* Current plan banner */}
      <div className="bg-gradient-to-r from-[#8F00FF] to-[#6200CC] rounded-3xl p-6 text-white mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-8 translate-x-8" />
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-purple-200 text-sm font-medium mb-1">{d.currentPlan}</p>
            <div className="flex items-center gap-3">
              <h2 className="text-3xl font-black">{PLANS[currentPlan].name}</h2>
              <Badge variant="outline" className="border-white/40 text-white bg-white/10">
                {currentPlan}
              </Badge>
            </div>
            {subscriptionEnd && (
              <p className="text-purple-200 text-sm mt-2">
                {d.nextRenewal} {formatDate(subscriptionEnd)}
              </p>
            )}
          </div>
          {currentPlan !== "FREE" && (
            <form action="/api/stripe/portal" method="POST">
              <button
                type="submit"
                className="px-5 py-2.5 bg-white text-[#8F00FF] font-bold text-sm rounded-xl hover:bg-gray-100 transition-colors"
              >
                {d.manageSubscription}
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Available plans */}
      <h2 className="text-xl font-black text-gray-900 mb-6">
        {currentPlan === "FREE" ? d.choosePlan : d.changePlan}
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
              {/* Plan header */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-black text-gray-900 text-lg">{plan.name}</h3>
                  {isCurrentPlan && (
                    <Badge variant="primary" size="sm">
                      <Check size={10} /> {d.active}
                    </Badge>
                  )}
                  {plan.badge && !isCurrentPlan && (
                    <Badge variant="primary" size="sm">{plan.badge}</Badge>
                  )}
                </div>
                <div className="flex items-end gap-1">
                  <span className="text-3xl font-black text-gray-900">
                    {plan.price.monthly === 0
                      ? d.free
                      : formatPrice(plan.price.monthly)}
                  </span>
                  {plan.price.monthly > 0 && (
                    <span className="text-gray-400 text-sm mb-1">/mois</span>
                  )}
                </div>
                {plan.price.savings > 0 && (
                  <p className="text-xs text-green-600 font-medium mt-1">
                    💰 Annuel : {formatPrice(plan.price.yearlyPerMonth)}/mois — <span className="font-bold">-{plan.price.savings}% d'économie</span>
                  </p>
                )}
              </div>

              {/* CTA */}
              {isCurrentPlan ? (
                <div className="w-full text-center py-2.5 px-4 rounded-xl bg-[#8F00FF] text-white text-sm font-bold mb-5">
                  ✓ {d.currentPlanBtn}
                </div>
              ) : planKey === "FREE" ? (
                <div className="w-full text-center py-2.5 px-4 rounded-xl bg-gray-100 text-gray-500 text-sm font-medium mb-5">
                  {d.choosePlan}
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
                      className="flex-1 py-2.5 px-3 rounded-xl border-2 border-green-500 bg-green-50 text-green-700 text-xs font-bold hover:bg-green-100 transition-colors flex items-center justify-center gap-1"
                    >
                      Annuel
                      <span className="bg-green-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-black">
                        -10%
                      </span>
                    </button>
                  </div>
                </form>
              )}

              {/* Features */}
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

      {/* FAQ */}
      <div className="mt-10 bg-gray-50 rounded-2xl p-6">
        <h3 className="font-bold text-gray-900 mb-4">FAQ</h3>
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
