import {
  type ConfirmedPayment,
  type CreateCheckoutInput,
  type CreateCheckoutResult,
  type NormalizedStatus,
  type PaymentProvider,
  type ProviderCredentials,
} from "../types";

// Prestataire de simulation.
//
// Objectif : pouvoir dérouler le parcours complet (création de facture,
// redirection du payeur, notification, confirmation, tableau de bord) sans
// compte marchand réel, puisque PayDunya exige un compte Business validé même
// pour le mode test.
//
// Activé uniquement si PAYMENT_SIMULATION === "true". Voir le registre dans
// src/lib/payments/index.ts : en production, la variable n'est pas définie et
// ce prestataire n'existe pas.
//
// L'état des transactions simulées vit en mémoire : suffisant pour un serveur
// de développement, non partagé entre instances serverless.

type SimulatedOutcome = {
  status: NormalizedStatus;
  amount: number;
  currency: string;
  description: string;
  customer: { name?: string | null; email?: string | null; phone?: string | null };
  base: string;
};

const outcomes = new Map<string, SimulatedOutcome>();

export function recordSimulatedOutcome(
  token: string,
  outcome: Partial<SimulatedOutcome> & { status: NormalizedStatus }
) {
  // Fusion avec l'entrée créée lors de l'initiation, pour ne pas perdre le
  // montant ni l'URL de base déjà connus.
  const previous = outcomes.get(token);
  outcomes.set(token, {
    amount: previous?.amount ?? 0,
    currency: previous?.currency ?? "XOF",
    description: previous?.description ?? "",
    customer: previous?.customer ?? {},
    base: previous?.base ?? "",
    ...outcome,
  });
}

export function clearSimulatedOutcome(token: string) {
  outcomes.delete(token);
}

function baseUrlFromCallback(callbackUrl: string): string {
  return callbackUrl.replace(/\/api\/payments\/callback\/[^/]*$/, "");
}

export const simulationProvider: PaymentProvider = {
  id: "SIMULATION",
  label: "Simulation (test)",
  supportedCurrencies: ["XOF", "XAF", "EUR", "USD"],

  credentialFields: [],

  async createCheckout(input: CreateCheckoutInput): Promise<CreateCheckoutResult> {
    const token = `SIM-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
    const base = baseUrlFromCallback(input.callbackUrl);

    outcomes.set(token, {
      status: "PENDING",
      amount: input.amount,
      currency: input.currency,
      description: input.description,
      customer: input.customer ?? {},
      base,
    });

    // Le payeur atterrit sur notre propre page de simulation, qui rejoue le
    // comportement du prestataire (paiement réussi, échoué ou annulé).
    const url = new URL(`${base}/paiement/simulation`);
    url.searchParams.set("token", token);
    url.searchParams.set("amount", String(input.amount));
    url.searchParams.set("currency", input.currency);
    url.searchParams.set("label", input.description);
    url.searchParams.set("return_url", input.returnUrl);
    url.searchParams.set("cancel_url", input.cancelUrl);

    return { token, checkoutUrl: url.toString() };
  },

  async confirmPayment({
    token,
  }: {
    credentials: ProviderCredentials;
    mode: "SANDBOX" | "LIVE";
    token: string;
  }): Promise<ConfirmedPayment> {
    const outcome = outcomes.get(token);

    if (!outcome) {
      // Transaction inconnue de cette instance : on ne prétend rien.
      return {
        status: "UNKNOWN",
        amount: null,
        currency: null,
        description: null,
        customer: {},
        receiptUrl: null,
        failureReason: null,
        customData: null,
      };
    }

    return {
      status: outcome.status,
      amount: outcome.amount,
      currency: outcome.currency,
      description: outcome.description,
      customer: outcome.customer,
      receiptUrl:
        outcome.status === "COMPLETED"
          ? `${outcome.base}/paiement/simulation?token=${token}`
          : null,
      failureReason: outcome.status === "FAILED" ? "Paiement simulé en échec" : null,
      customData: null,
    };
  },

  async verifyCredentials() {
    return { ok: true, message: "Prestataire de simulation toujours disponible" };
  },
};
