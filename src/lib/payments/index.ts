import { db } from "@/database/client";
import { decryptCredentials, encryptCredentials } from "./crypto";
import { paydunyaProvider } from "./providers/paydunya";
import { simulationProvider } from "./providers/simulation";
import {
  PaymentProviderError,
  type PaymentProvider,
  type ProviderMode,
} from "./types";

export * from "./types";
export { encryptCredentials, decryptCredentials, maskSecret } from "./crypto";
export { recordSimulatedOutcome, clearSimulatedOutcome } from "./providers/simulation";

const REGISTRY: Record<string, PaymentProvider> = {
  PAYDUNYA: paydunyaProvider,
};

// Le prestataire de simulation n'existe que s'il est explicitement activé.
// En production la variable n'est pas définie : il est donc absent du registre,
// et un compte « SIMULATION » en base ne pourrait pas être utilisé puisqu'aucun
// adaptateur ne serait enregistré pour lui.
if (process.env.PAYMENT_SIMULATION === "true") {
  REGISTRY.SIMULATION = simulationProvider;
}

export const PROVIDERS = Object.values(REGISTRY);

export function getProvider(id: string): PaymentProvider | null {
  // Les URL utilisent l'identifiant en minuscules, l'énum Prisma est en majuscules.
  return REGISTRY[id?.toUpperCase()] ?? null;
}

export function providerLabel(id: string): string {
  return getProvider(id)?.label ?? id;
}

/** Devises pour lesquelles au moins un prestataire est disponible. */
export function supportedCurrencies(): string[] {
  return Array.from(new Set(PROVIDERS.flatMap((p) => p.supportedCurrencies)));
}

export function isCurrencySupported(currency: string): boolean {
  return supportedCurrencies().includes(currency.toUpperCase());
}

/**
 * Interroge le prestataire pour connaître l'état réel d'un paiement et met la
 * ligne à jour. C'est l'unique chemin d'écriture du statut : les notifications
 * entrantes ne font que déclencher cet appel.
 */
export async function syncPaymentStatus(paymentId: string) {
  const payment = await db.payment.findUnique({
    where: { id: paymentId },
    include: { paymentAccount: true },
  });

  if (!payment) return null;
  if (!payment.providerToken || !payment.paymentAccount) return payment;
  // Un paiement déjà tranché ne change plus
  if (payment.status === "COMPLETED" || payment.status === "CANCELLED") return payment;

  const provider = getProvider(payment.provider);
  if (!provider) return payment;

  let confirmed;
  try {
    confirmed = await provider.confirmPayment({
      credentials: decryptCredentials(payment.paymentAccount.credentials),
      mode: payment.paymentAccount.mode as ProviderMode,
      token: payment.providerToken,
    });
  } catch (err) {
    console.error("[payments] confirm a échoué", payment.id, err);
    return payment;
  }

  // Le prestataire est la source de vérité : on n'écrase jamais un montant
  // confirmé par un montant déclaré côté client.
  const data: Record<string, unknown> = {
    status: confirmed.status === "UNKNOWN" ? payment.status : confirmed.status,
    payerName: confirmed.customer.name ?? payment.payerName,
    payerEmail: confirmed.customer.email ?? payment.payerEmail,
    payerPhone: confirmed.customer.phone ?? payment.payerPhone,
    receiptUrl: confirmed.receiptUrl ?? payment.receiptUrl,
    failureReason: confirmed.failureReason ?? payment.failureReason,
  };

  if (confirmed.amount !== null && confirmed.amount > 0) {
    data.amount = confirmed.amount;
  }
  if (confirmed.currency) {
    data.currency = confirmed.currency;
  }
  if (confirmed.status === "COMPLETED" && !payment.paidAt) {
    data.paidAt = new Date();
  }

  return db.payment.update({ where: { id: payment.id }, data });
}

export { PaymentProviderError };
