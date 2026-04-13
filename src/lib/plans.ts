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
    yearly: number; // prix annuel total
    yearlyPerMonth: number; // prix annuel / 12
    savings: number; // % d'économie
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
      "Idéal pour découvrir la plateforme et créer votre première page bio.",
    price: {
      monthly: 0,
      yearly: 0,
      yearlyPerMonth: 0,
      savings: 0,
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
      yearly: 65, // 6 * 12 * 0.9
      yearlyPerMonth: 5.4,
      savings: 10,
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
      yearly: 130, // 12 * 12 * 0.9
      yearlyPerMonth: 10.8,
      savings: 10,
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
    { label: "1 page bio", included: true },
    { label: "5 liens sociaux", included: true },
    { label: "3 liens raccourcis", included: true },
    { label: "1 thème de base", included: true },
    { label: "Branding BeassistLink", included: true },
    { label: "Analytiques", included: false },
    { label: "QR Code", included: false },
    { label: "Supprimer le branding", included: false },
    { label: "Alias personnalisé", included: false },
    { label: "Domaine personnalisé", included: false },
  ],
  STARTER: [
    { label: "3 pages bio", included: true },
    { label: "20 liens sociaux", included: true },
    { label: "20 liens raccourcis", included: true },
    { label: "5 thèmes premium", included: true },
    { label: "Supprimer le branding", included: true },
    { label: "Analytiques de base", included: true },
    { label: "Génération de QR codes", included: true },
    { label: "Alias personnalisé", included: true },
    { label: "Liens programmés", included: false },
    { label: "Domaine personnalisé", included: false },
  ],
  PRO: [
    { label: "Pages bio illimitées", included: true },
    { label: "Liens sociaux illimités", included: true },
    { label: "Liens raccourcis illimités", included: true },
    { label: "Tous les thèmes + couleurs custom", included: true },
    { label: "Supprimer le branding", included: true },
    { label: "Analytiques avancées", included: true },
    { label: "QR codes illimités", included: true },
    { label: "Alias illimités", included: true },
    { label: "Liens programmés", included: true },
    { label: "Domaine personnalisé", included: true },
    { label: "Accès API", included: true },
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
