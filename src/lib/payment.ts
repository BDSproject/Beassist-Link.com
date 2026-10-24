// Monnaies et méthodes de paiement « francophone-friendly »
// Utilisé par la page bio publique (serveur) et le dashboard (client).

export type PaymentMethodId =
  | "lydia"
  | "paypal"
  | "wave"
  | "orange-money"
  | "mtn"
  | "stripe"
  | "other";

// Clé d'icône neutre pour chaque méthode : rendue en icône monochrome (lucide)
// côté interface. Voir src/components/ui/payment-method-icon.tsx.
export type PaymentMethodIcon = "wallet" | "waves" | "smartphone" | "card" | "banknote";

export const PAYMENT_METHODS: {
  id: PaymentMethodId;
  label: string;
  icon: PaymentMethodIcon;
}[] = [
  { id: "lydia", label: "Lydia", icon: "wallet" },
  { id: "paypal", label: "PayPal", icon: "wallet" },
  { id: "wave", label: "Wave", icon: "waves" },
  { id: "orange-money", label: "Orange Money", icon: "smartphone" },
  { id: "mtn", label: "MTN Mobile Money", icon: "smartphone" },
  { id: "stripe", label: "Carte bancaire", icon: "card" },
  { id: "other", label: "Autre", icon: "banknote" },
];

export const CURRENCIES: { code: string; label: string }[] = [
  { code: "EUR", label: "€ — Euro" },
  { code: "CAD", label: "$ — Dollar canadien" },
  { code: "USD", label: "$ — Dollar US" },
  { code: "CHF", label: "CHF — Franc suisse" },
  { code: "GBP", label: "£ — Livre sterling" },
  { code: "XOF", label: "FCFA — Afrique de l'Ouest" },
  { code: "XAF", label: "FCFA — Afrique centrale" },
  { code: "MAD", label: "MAD — Dirham marocain" },
  { code: "DZD", label: "DZD — Dinar algérien" },
  { code: "TND", label: "TND — Dinar tunisien" },
];

export function getPaymentMethod(id?: string | null) {
  return PAYMENT_METHODS.find((m) => m.id === id) ?? PAYMENT_METHODS[PAYMENT_METHODS.length - 1];
}

export function formatAmount(amount: number, currency?: string | null): string {
  if (!currency) currency = "EUR";
  // FCFA n'est pas géré proprement par Intl — formatage manuel
  if (currency === "XOF" || currency === "XAF") {
    return `${new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 }).format(amount)} FCFA`;
  }
  try {
    return new Intl.NumberFormat("fr-FR", { style: "currency", currency }).format(amount);
  } catch {
    return `${amount} ${currency}`;
  }
}
