"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PLANS, type PlanName } from "@/lib/plans";
import { formatPrice } from "@/lib/utils";
import { useLanguage } from "@/contexts/language-context";

const planOrder: PlanName[] = ["FREE", "STARTER", "PRO"];

export function Pricing() {
  const { t } = useLanguage();
  const [yearly, setYearly] = useState(false);

  return (
    <section id="pricing" className="py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* En-tête */}
        <div className="text-center max-w-2xl mx-auto mb-16">
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

          {/* Toggle mensuel/annuel */}
          <div className="mt-8 inline-flex items-center gap-4 bg-gray-100 rounded-2xl p-1.5">
            <button
              onClick={() => setYearly(false)}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                !yearly
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {t.pricing.monthly}
            </button>
            <button
              onClick={() => setYearly(true)}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
                yearly
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {t.pricing.yearly}
              <span className="bg-[#8F00FF] text-white text-xs px-2 py-0.5 rounded-full font-bold">
                -10%
              </span>
            </button>
          </div>
        </div>

        {/* Cartes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {planOrder.map((planKey) => {
            const plan = PLANS[planKey];
            const price = yearly
              ? plan.price.yearlyPerMonth
              : plan.price.monthly;
            const isHighlighted = plan.highlighted;

            return (
              <div
                key={planKey}
                className={`relative rounded-3xl p-8 flex flex-col transition-all duration-300 ${
                  isHighlighted
                    ? "bg-[#8F00FF] text-white shadow-[0_20px_60px_rgba(143,0,255,0.35)] md:scale-105"
                    : "bg-white border border-gray-200 hover:border-[#8F00FF]/40 hover:shadow-lg"
                }`}
              >
                {/* Badge populaire */}
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-white text-[#8F00FF] text-xs font-bold px-4 py-1.5 rounded-full shadow-lg border border-[#EAD6FF] whitespace-nowrap">
                      {plan.badge}
                    </span>
                  </div>
                )}

                {/* Nom */}
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

                {/* Prix */}
                <div className="mb-8">
                  <div className="flex items-end gap-1">
                    <span
                      className={`text-5xl font-black ${
                        isHighlighted ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {price === 0 ? "Gratuit" : formatPrice(price)}
                    </span>
                    {price > 0 && (
                      <span
                        className={`text-sm mb-2 ${
                          isHighlighted ? "text-purple-200" : "text-gray-400"
                        }`}
                      >
                        /mois
                      </span>
                    )}
                  </div>
                  {yearly && plan.price.savings > 0 && (
                    <p
                      className={`text-xs mt-1 ${
                        isHighlighted ? "text-purple-200" : "text-[#8F00FF]"
                      }`}
                    >
                      {t.pricing.billedYearly} {formatPrice(plan.price.yearly)}{t.pricing.perYear} • {t.pricing.save}{" "}
                      {plan.price.savings}%
                    </p>
                  )}
                  {!yearly && plan.price.savings > 0 && (
                    <p
                      className={`text-xs mt-1 font-medium ${
                        isHighlighted ? "text-green-300" : "text-green-600"
                      }`}
                    >
                      💰 Passez en annuel et économisez {plan.price.savings}%
                    </p>
                  )}
                </div>

                {/* CTA */}
                <Link href="/register" className="mb-8">
                  <Button
                    variant={isHighlighted ? "secondary" : "outline"}
                    size="lg"
                    fullWidth
                    className={
                      isHighlighted
                        ? "bg-white text-[#8F00FF] hover:bg-gray-50 border-0 font-bold"
                        : ""
                    }
                  >
                    {t.pricing.plans[planKey].ctaLabel}
                  </Button>
                </Link>

                {/* Features */}
                <ul className="space-y-3 flex-1">
                  {t.pricing.plans[planKey].features.map((feature) => (
                    <li
                      key={feature.label}
                      className="flex items-start gap-3 text-sm"
                    >
                      {feature.included ? (
                        <Check
                          size={16}
                          className={`mt-0.5 flex-shrink-0 ${
                            isHighlighted ? "text-white" : "text-[#8F00FF]"
                          }`}
                        />
                      ) : (
                        <X
                          size={16}
                          className={`mt-0.5 flex-shrink-0 ${
                            isHighlighted ? "text-purple-300" : "text-gray-300"
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

        {/* Note */}
        <p className="text-center text-sm text-gray-400 mt-10">
          {t.pricing.note}
        </p>
      </div>
    </section>
  );
}
