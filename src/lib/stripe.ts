import Stripe from "stripe";

// Lazy initialization : Stripe n'est instancié qu'à l'exécution, jamais au build
let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!_stripe) {
    const key = process.env.STRIPE_SECRET_KEY || "sk_test_placeholder_not_configured";
    _stripe = new Stripe(key, {
      apiVersion: "2025-02-24.acacia",
      typescript: true,
    });
  }
  return _stripe;
}

// Export direct pour la compatibilité avec le code existant
export const stripe = new Proxy({} as Stripe, {
  get(_target, prop) {
    return (getStripe() as any)[prop];
  },
});

// Constantes Stripe Price IDs
export const STRIPE_PRICE_IDS = {
  // EUR (défaut)
  STARTER_MONTHLY: process.env.STRIPE_STARTER_MONTHLY_PRICE_ID ?? "",
  STARTER_YEARLY: process.env.STRIPE_STARTER_YEARLY_PRICE_ID ?? "",
  PRO_MONTHLY: process.env.STRIPE_PRO_MONTHLY_PRICE_ID ?? "",
  PRO_YEARLY: process.env.STRIPE_PRO_YEARLY_PRICE_ID ?? "",
  // USD
  STARTER_MONTHLY_USD: process.env.STRIPE_STARTER_MONTHLY_PRICE_ID_USD ?? "",
  STARTER_YEARLY_USD: process.env.STRIPE_STARTER_YEARLY_PRICE_ID_USD ?? "",
  PRO_MONTHLY_USD: process.env.STRIPE_PRO_MONTHLY_PRICE_ID_USD ?? "",
  PRO_YEARLY_USD: process.env.STRIPE_PRO_YEARLY_PRICE_ID_USD ?? "",
};

/** Retourne le bon Price ID selon la devise */
export function getPriceId(
  plan: "STARTER" | "PRO",
  billing: "monthly" | "yearly",
  currency: "eur" | "usd" | "gbp" = "eur"
): string {
  const suffix = billing === "yearly" ? "_YEARLY" : "_MONTHLY";
  const curr = currency.toUpperCase();
  const key = curr === "USD"
    ? `${plan}${suffix}_USD`
    : `${plan}${suffix}`;
  return STRIPE_PRICE_IDS[key as keyof typeof STRIPE_PRICE_IDS] ?? "";
}
