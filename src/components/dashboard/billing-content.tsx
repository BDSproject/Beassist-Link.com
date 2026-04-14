"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Check, AlertCircle, CheckCircle2, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PLANS, PLAN_FEATURE_LISTS, type PlanName } from "@/lib/plans";
import { formatDate, formatPrice } from "@/lib/utils";
import { useLanguage } from "@/contexts/language-context";

interface Props {
  currentPlan: PlanName;
  subscriptionEnd?: Date | null;
}

export function BillingContent({ currentPlan, subscriptionEnd }: Props) {
  const { t, lang } = useLanguage();
  const d = t.dashboard.billing;
  const fp = (amount: number) =>
    lang === "en" ? formatPrice(amount, "USD", "en-US") : formatPrice(amount, "EUR", "fr-FR");
  const [yearly, setYearly] = useState(false);
  const [visible, setVisible] = useState(false);
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const searchParams = useSearchParams();
  const isSuccess = searchParams.get("success") === "true";
  const isCanceled = searchParams.get("canceled") === "true";

  async function handleCheckout(planKey: string) {
    setLoadingPlan(planKey);
    setCheckoutError(null);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: planKey, billing: yearly ? "yearly" : "monthly" }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) {
        setCheckoutError(data.error || "Une erreur est survenue");
        setLoadingPlan(null);
        return;
      }
      window.location.href = data.url;
    } catch {
      setCheckoutError("Impossible de contacter le serveur");
      setLoadingPlan(null);
    }
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto">
      {/* Keyframes shared with landing pricing */}
      <style>{`
        @keyframes pricePop {
          0% { transform: scale(0.85); opacity: 0; }
          60% { transform: scale(1.05); }
          100% { transform: scale(1); opacity: 1; }
        }
        .price-pop { animation: pricePop 0.35s cubic-bezier(0.34,1.56,0.64,1) forwards; }
        @keyframes savingsFade {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .savings-fade { animation: savingsFade 0.3s ease-out forwards; }
      `}</style>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-black text-gray-900">{d.title}</h1>
        <p className="text-gray-500 mt-1">{d.subtitle}</p>
      </div>

      {/* Alerts */}
      {isSuccess && (
        <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-2xl p-4 mb-6 text-green-800">
          <CheckCircle2 size={20} className="flex-shrink-0 text-green-600" />
          <p className="font-semibold text-sm">🎉 Paiement réussi ! Votre plan a été mis à jour.</p>
        </div>
      )}
      {isCanceled && (
        <div className="flex items-center gap-3 bg-yellow-50 border border-yellow-200 rounded-2xl p-4 mb-6 text-yellow-800">
          <XCircle size={20} className="flex-shrink-0 text-yellow-600" />
          <p className="font-semibold text-sm">Paiement annulé. Votre abonnement n&apos;a pas été modifié.</p>
        </div>
      )}
      {checkoutError && (
        <div className="flex items-center gap-3 bg-red-50 border border-red-200 rounded-2xl p-4 mb-6 text-red-800">
          <AlertCircle size={20} className="flex-shrink-0 text-red-600" />
          <p className="font-semibold text-sm">{checkoutError}</p>
        </div>
      )}

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

      {/* Section title + slide toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-2">
        <h2 className="text-xl font-black text-gray-900">
          {currentPlan === "FREE" ? d.choosePlan : d.changePlan}
        </h2>

        {/* Slide toggle pill — same mechanic as landing pricing */}
        <div className="relative inline-grid grid-cols-2 bg-gray-100 rounded-2xl p-1.5">
          <div
            className="absolute left-1.5 top-1.5 bottom-1.5 w-[calc(50%-6px)] rounded-xl bg-white shadow-sm transition-transform duration-300 ease-out pointer-events-none"
            style={{ transform: yearly ? "translateX(100%)" : "translateX(0)" }}
          />
          <button
            onClick={() => setYearly(false)}
            className={`relative z-10 px-5 py-2 text-sm font-semibold rounded-xl transition-colors duration-200 text-center ${
              !yearly ? "text-gray-900" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {t.pricing.monthly}
          </button>
          <button
            onClick={() => setYearly(true)}
            className={`relative z-10 px-5 py-2 text-sm font-semibold rounded-xl transition-colors duration-200 flex items-center justify-center gap-2 ${
              yearly ? "text-gray-900" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {t.pricing.yearly}
            <span
              className={`text-xs px-1.5 py-0.5 rounded-full font-bold transition-all duration-300 ${
                yearly ? "bg-green-500 text-white shadow-sm" : "bg-green-100 text-green-700"
              }`}
            >
              -10%
            </span>
          </button>
        </div>
      </div>

      {/* Annual savings hint */}
      {yearly && (
        <p className="savings-fade text-sm text-green-600 font-medium mb-5">
          🎉 {t.pricing.saveAnnual}
        </p>
      )}
      {!yearly && <div className="mb-5" />}

      {/* Plan cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {(["FREE", "STARTER", "PRO"] as PlanName[]).map((planKey, index) => {
          const plan = PLANS[planKey];
          const features = PLAN_FEATURE_LISTS[planKey];
          const isCurrentPlan = planKey === currentPlan;
          const price = yearly ? plan.price.yearlyPerMonth : plan.price.monthly;

          return (
            <div
              key={planKey}
              className={`rounded-2xl p-6 border-2 flex flex-col transition-all duration-500 group ${
                isCurrentPlan
                  ? "border-[#8F00FF] bg-[#F5EBFF]"
                  : plan.highlighted
                  ? "border-[#8F00FF]/40 bg-white hover:border-[#8F00FF] hover:shadow-xl hover:-translate-y-1.5"
                  : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-lg hover:-translate-y-1.5"
              } ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: visible ? `${index * 100}ms` : "0ms" }}
            >
              {/* Yearly savings badge */}
              {yearly && plan.price.savings > 0 && (
                <div className="flex justify-end -mt-1 mb-2">
                  <span className="savings-fade text-xs font-bold px-2.5 py-0.5 rounded-full bg-green-500 text-white shadow-sm">
                    -{plan.price.savings}%
                  </span>
                </div>
              )}

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

                {/* Animated price */}
                <div className="flex items-end gap-1">
                  <span
                    key={`${planKey}-${yearly}`}
                    className="price-pop text-3xl font-black text-gray-900"
                  >
                    {price === 0 ? d.free : fp(price)}
                  </span>
                  {price > 0 && (
                    <span className="text-gray-400 text-sm mb-1">{t.pricing.perMonth}</span>
                  )}
                </div>

                {yearly && plan.price.savings > 0 && (
                  <p className="savings-fade text-xs text-[#8F00FF] font-medium mt-1">
                    {t.pricing.billedYearly} {fp(plan.price.yearly)}{t.pricing.perYear} · {t.pricing.save} {plan.price.savings}%
                  </p>
                )}
                {!yearly && plan.price.savings > 0 && (
                  <p className="text-xs text-green-600 font-medium mt-1">
                    💰 {t.pricing.saveAnnual}
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
                <div className="mb-5">
                  <button
                    type="button"
                    onClick={() => handleCheckout(planKey)}
                    disabled={loadingPlan === planKey}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#8F00FF] text-white text-sm font-bold hover:bg-[#7200CC] transition-all duration-200 group-hover:shadow-md disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loadingPlan === planKey ? (
                      <>
                        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                        Chargement...
                      </>
                    ) : d.upgrade}
                  </button>
                </div>
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
        <h3 className="font-bold text-gray-900 mb-4">{d.faqTitle}</h3>
        <div className="space-y-4">
          {d.faq.map((item) => (
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
