export type PlanName = "FREE" | "STARTER" | "PRO";
export type BillingCycle = "MONTHLY" | "YEARLY";

export interface PlanLimits {
  maxBioLinks: number; // -1 = illimité
  maxShortLinks: number;
  maxBioPages: number;
  maxThemes: number;
  hasCustomDomain: boolean;
  analyticsLevel: "none" | "basic" | "advanced";
  hasQrCode: boolean;
  hasRemoveBranding: boolean;
  hasCustomAlias: boolean;
  hasScheduledLinks: boolean;
  hasApiAccess: boolean;
  hasPrioritySupport: boolean;
}

export interface Plan {
  name: string;
  slug: PlanName;
  description: string;
  price: {
    monthly: number;
    yearly: number;
    yearlyPerMonth: number;
    savings: number;
    usd: {
      monthly: number;
      yearly: number;
      yearlyPerMonth: number;
    };
  };
  limits: PlanLimits;
  badge?: string;
  highlighted?: boolean;
  ctaLabel: string;
}

export const PLANS: Record<PlanName, Plan> = {
  FREE: {
    name: "Free",
    slug: "FREE",
    description:
      "Idéal pour créer ton premier lien en bio et découvrir la plateforme.",
    price: {
      monthly: 0,
      yearly: 0,
      yearlyPerMonth: 0,
      savings: 0,
      usd: { monthly: 0, yearly: 0, yearlyPerMonth: 0 },
    },
    limits: {
      maxBioLinks: 5,
      maxShortLinks: 3,
      maxBioPages: 1,
      maxThemes: 1,
      hasCustomDomain: false,
      analyticsLevel: "none",
      hasQrCode: false,
      hasRemoveBranding: false,
      hasCustomAlias: false,
      hasScheduledLinks: false,
      hasApiAccess: false,
      hasPrioritySupport: false,
    },
    ctaLabel: "Commencer gratuitement",
  },
  STARTER: {
    name: "Starter",
    slug: "STARTER",
    description:
      "Pour les créateurs de contenu qui souhaitent se démarquer et analyser leurs performances.",
    price: {
      monthly: 6,
      yearly: 65,
      yearlyPerMonth: 5.4,
      savings: 10,
      usd: { monthly: 7, yearly: 76, yearlyPerMonth: 6.33 },
    },
    limits: {
      maxBioLinks: 20,
      maxShortLinks: 20,
      maxBioPages: 3,
      maxThemes: 5,
      hasCustomDomain: false,
      analyticsLevel: "basic",
      hasQrCode: true,
      hasRemoveBranding: true,
      hasCustomAlias: true,
      hasScheduledLinks: false,
      hasApiAccess: false,
      hasPrioritySupport: false,
    },
    badge: "⭐ Populaire",
    highlighted: true,
    ctaLabel: "Commencer avec Starter",
  },
  PRO: {
    name: "Pro",
    slug: "PRO",
    description:
      "La solution complète pour les professionnels et agences qui veulent tout contrôler.",
    price: {
      monthly: 12,
      yearly: 130,
      yearlyPerMonth: 10.8,
      savings: 10,
      usd: { monthly: 13, yearly: 140, yearlyPerMonth: 11.67 },
    },
    limits: {
      maxBioLinks: -1,
      maxShortLinks: -1,
      maxBioPages: -1,
      maxThemes: -1,
      hasCustomDomain: true,
      analyticsLevel: "advanced",
      hasQrCode: true,
      hasRemoveBranding: true,
      hasCustomAlias: true,
      hasScheduledLinks: true,
      hasApiAccess: true,
      hasPrioritySupport: true,
    },
    ctaLabel: "Passer au Pro",
  },
};

// Listes de fonctionnalités pour l'affichage
export const PLAN_FEATURE_LISTS: Record<PlanName, { label: string; included: boolean }[]> = {
  FREE: [
    { label: "1 lien en bio", included: true },
    { label: "5 liens sur la page bio", included: true },
    { label: "3 liens raccourcis", included: true },
    { label: "Icônes sociales (Instagram, TikTok…)", included: true },
    { label: "Thème par défaut", included: true },
    { label: "Couleurs & image de fond", included: false },
    { label: "Analytics de créatrice", included: false },
    { label: "QR Code", included: false },
    { label: "Supprimer le branding", included: false },
    { label: "Alias personnalisé", included: false },
  ],
  STARTER: [
    { label: "3 liens en bio", included: true },
    { label: "20 liens sur la page bio", included: true },
    { label: "20 liens raccourcis", included: true },
    { label: "Thèmes premium + couleurs custom", included: true },
    { label: "Image de fond personnalisée", included: true },
    { label: "Toutes les typographies", included: true },
    { label: "Supprimer le branding", included: true },
    { label: "Analytics de créatrice", included: true },
    { label: "QR Code", included: true },
    { label: "Alias personnalisé", included: true },
  ],
  PRO: [
    { label: "Liens en bio illimités", included: true },
    { label: "Liens raccourcis illimités", included: true },
    { label: "Tous les thèmes + couleurs + images", included: true },
    { label: "Toutes les typographies", included: true },
    { label: "Plateformes adultes (OF, MYM, Fansly…)", included: true },
    { label: "Analytics avancées", included: true },
    { label: "QR codes illimités", included: true },
    { label: "Alias illimités", included: true },
    { label: "Supprimer le branding", included: true },
    { label: "Liens programmés", included: true },
    { label: "Support prioritaire", included: true },
  ],
};

export function canUserDo(
  plan: PlanName,
  action: keyof PlanLimits,
  currentCount?: number
): boolean {
  const limits = PLANS[plan].limits;
  const limit = limits[action];

  if (typeof limit === "boolean") return limit;
  if (typeof limit === "string") return true;
  if (limit === -1) return true;
  if (currentCount !== undefined) return currentCount < (limit as number);
  return true;
}

/** Retourne la devise selon la langue du navigateur */
export type Currency = "eur" | "usd";

export function getCurrencyFromLocale(lang: string): Currency {
  return lang === "en" ? "usd" : "eur";
}

/** Retourne le prix du plan dans la bonne devise */
export function getPlanPrice(
  plan: PlanName,
  billing: "monthly" | "yearly",
  currency: Currency
): number {
  const p = PLANS[plan].price;
  if (p.monthly === 0) return 0;
  if (currency === "usd") {
    return billing === "yearly" ? p.usd.yearly : p.usd.monthly;
  }
  return billing === "yearly" ? p.yearly : p.monthly;
}

export function getPlanPricePerMonth(
  plan: PlanName,
  currency: Currency
): number {
  const p = PLANS[plan].price;
  if (p.monthly === 0) return 0;
  return currency === "usd" ? p.usd.yearlyPerMonth : p.yearlyPerMonth;
}
