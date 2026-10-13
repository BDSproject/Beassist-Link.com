"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { CheckCircle2, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PLANS, type PlanName } from "@/lib/plans";
import { formatPrice } from "@/lib/utils";
import { useLanguage } from "@/contexts/language-context";

const planOrder: PlanName[] = ["FREE", "STARTER", "PRO"];

export function Pricing() {
  const { t, lang } = useLanguage();
  const fp = (amount: number) =>
    lang === "en" ? formatPrice(amount, "USD", "en-US") : formatPrice(amount, "EUR", "fr-FR");
  const [yearly, setYearly] = useState(false);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="pricing" className="py-28 bg-white overflow-hidden">
      {/* Keyframe for price pop animation */}
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div
          className={`text-center max-w-2xl mx-auto mb-16 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F5EBFF] border border-[#EAD6FF] text-sm font-medium text-[#8F00FF] mb-6">
            {t.pricing.badge}
          </div>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-gray-900 mb-4">
            {t.pricing.heading1}
            <br />
            <span
              style={{
                background: "linear-gradient(135deg, #8F00FF, #6200CC)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {t.pricing.heading2}
            </span>
          </h2>
          <p className="text-lg text-gray-500">{t.pricing.subheading}</p>

          {/* Slide toggle pill */}
          <div className="mt-8 relative inline-grid grid-cols-2 bg-gray-100 rounded-2xl p-1.5">
            {/* Sliding white background — left-1.5 aligns with inner padding, translateX(100%) moves exactly one column */}
            <div
              className="absolute left-1.5 top-1.5 bottom-1.5 w-[calc(50%-6px)] rounded-xl bg-white shadow-sm transition-transform duration-300 ease-out pointer-events-none"
              style={{ transform: yearly ? "translateX(100%)" : "translateX(0)" }}
            />
            <button
              onClick={() => setYearly(false)}
              className={`relative z-10 px-6 py-2.5 text-sm font-semibold rounded-xl transition-colors duration-200 text-center ${
                !yearly ? "text-gray-900" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {t.pricing.monthly}
            </button>
            <button
              onClick={() => setYearly(true)}
              className={`relative z-10 px-6 py-2.5 text-sm font-semibold rounded-xl transition-colors duration-200 flex items-center justify-center gap-2 ${
                yearly ? "text-gray-900" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {t.pricing.yearly}
              <span
                className={`text-xs px-2 py-0.5 rounded-full font-bold transition-all duration-300 ${
                  yearly
                    ? "bg-green-500 text-white shadow-sm"
                    : "bg-green-100 text-green-700"
                }`}
              >
                -10%
              </span>
            </button>
          </div>

          {/* Annual savings hint */}
          {yearly && (
            <p className="savings-fade text-sm text-green-600 font-medium mt-3">
              🎉 {t.pricing.saveAnnual}
            </p>
          )}
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {planOrder.map((planKey, index) => {
            const plan = PLANS[planKey];
            // Les montants USD sont distincts des montants EUR (voir PLANS.price.usd)
            const amounts =
              lang === "en"
                ? {
                    monthly: plan.price.usd.monthly,
                    yearly: plan.price.usd.yearly,
                    yearlyPerMonth: plan.price.usd.yearlyPerMonth,
                  }
                : {
                    monthly: plan.price.monthly,
                    yearly: plan.price.yearly,
                    yearlyPerMonth: plan.price.yearlyPerMonth,
                  };
            const price = yearly ? amounts.yearlyPerMonth : amounts.monthly;
            const isHighlighted = plan.highlighted;

            return (
              <div
                key={planKey}
                className={`relative rounded-3xl p-6 sm:p-8 flex flex-col transition-all duration-500 group cursor-default ${
                  isHighlighted
                    ? "bg-[#8F00FF] text-white shadow-[0_20px_60px_rgba(143,0,255,0.35)] md:scale-105 hover:shadow-[0_32px_80px_rgba(143,0,255,0.55)] hover:-translate-y-2"
                    : "bg-white border border-gray-200 hover:border-[#8F00FF]/40 hover:shadow-2xl hover:-translate-y-2"
                } ${
                  visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                }`}
                style={{ transitionDelay: visible ? `${index * 130}ms` : "0ms" }}
              >
                {/* Yearly savings badge (floating top-right on paid plans) */}
                {yearly && plan.price.savings > 0 && (
                  <div className="savings-fade absolute -top-3 right-5 z-20">
                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-full shadow-md ${
                        isHighlighted
                          ? "bg-green-300 text-green-900"
                          : "bg-green-500 text-white"
                      }`}
                    >
                      -{plan.price.savings}%
                    </span>
                  </div>
                )}

                {/* Popular badge */}
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-white text-[#8F00FF] text-xs font-bold px-4 py-1.5 rounded-full shadow-lg border border-[#EAD6FF] whitespace-nowrap">
                      {lang === "en" && plan.badgeEn ? plan.badgeEn : plan.badge}
                    </span>
                  </div>
                )}

                {/* Plan name + description */}
                <div className="mb-6">
                  <h3
                    className={`text-xl font-black mb-1 ${
                      isHighlighted ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {plan.name}
                  </h3>
                  <p
                    className={`text-sm leading-relaxed ${
                      isHighlighted ? "text-purple-200" : "text-gray-500"
                    }`}
                  >
                    {t.pricing.plans[planKey].description}
                  </p>
                </div>

                {/* Price — key changes on toggle to retrigger pop animation */}
                <div className="mb-8">
                  <div className="flex items-end gap-1">
                    <span
                      key={`${planKey}-${yearly}`}
                      className={`price-pop text-5xl font-black tabular-nums ${
                        isHighlighted ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {price === 0 ? t.pricing.free : fp(price)}
                    </span>
                    {price > 0 && (
                      <span
                        className={`text-sm mb-2 ${
                          isHighlighted ? "text-purple-200" : "text-gray-400"
                        }`}
                      >
                        {t.pricing.perMonth}
                      </span>
                    )}
                  </div>

                  {/* Annual billing info */}
                  {yearly && plan.price.savings > 0 && (
                    <p
                      className={`savings-fade text-xs mt-1 ${
                        isHighlighted ? "text-purple-200" : "text-[#8F00FF]"
                      }`}
                    >
                      {t.pricing.billedYearly} {fp(amounts.yearly)}
                      {t.pricing.perYear} · {t.pricing.save} {plan.price.savings}%
                    </p>
                  )}

                  {/* Monthly upsell hint */}
                  {!yearly && plan.price.savings > 0 && (
                    <p
                      className={`text-xs mt-1 font-medium ${
                        isHighlighted ? "text-green-300" : "text-green-600"
                      }`}
                    >
                      💰 {t.pricing.saveAnnual}
                    </p>
                  )}
                </div>

                {/* CTA button */}
                <div className="flex justify-center mb-8">
                  <Link href="/register">
                    <Button
                      variant={isHighlighted ? "secondary" : "outline"}
                      size="lg"
                      className={`transition-transform duration-200 group-hover:scale-[1.02] ${
                        isHighlighted
                          ? "bg-white text-[#8F00FF] hover:bg-gray-50 border-0 font-bold"
                          : ""
                      }`}
                    >
                      {t.pricing.plans[planKey].ctaLabel}
                    </Button>
                  </Link>
                </div>

                {/* Feature list */}
                <ul className="space-y-3 flex-1">
                  {t.pricing.plans[planKey].features.map((feature) => (
                    <li key={feature.label} className="flex items-start gap-3 text-sm">
                      {feature.included ? (
                        <CheckCircle2
                          size={16}
                          className={`mt-0.5 flex-shrink-0 ${
                            isHighlighted ? "text-white" : "text-[#8F00FF]"
                          }`}
                        />
                      ) : (
                        <Minus
                          size={16}
                          className={`mt-0.5 flex-shrink-0 ${
                            isHighlighted ? "text-purple-400/50" : "text-gray-300"
                          }`}
                        />
                      )}
                      <span
                        className={
                          feature.included
                            ? isHighlighted
                              ? "text-white"
                              : "text-gray-700"
                            : isHighlighted
                            ? "text-purple-300"
                            : "text-gray-400"
                        }
                      >
                        {feature.label}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Bottom note */}
        <p
          className={`text-center text-sm text-gray-400 mt-10 transition-all duration-700 ${
            visible ? "opacity-100" : "opacity-0"
          }`}
          style={{ transitionDelay: visible ? "450ms" : "0ms" }}
        >
          {t.pricing.note}
        </p>
      </div>
    </section>
  );
}
