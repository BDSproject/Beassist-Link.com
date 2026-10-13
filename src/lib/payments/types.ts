// Contrat commun à tous les prestataires de paiement.
// Ajouter un prestataire = implémenter cette interface et l'enregistrer
// dans src/lib/payments/index.ts, sans toucher au reste de l'application.

export type ProviderId = "PAYDUNYA" | "SIMULATION";

export type ProviderMode = "SANDBOX" | "LIVE";

export type NormalizedStatus = "COMPLETED" | "PENDING" | "FAILED" | "CANCELLED" | "UNKNOWN";

export interface ProviderCredentials {
  [key: string]: string | undefined;
}

export interface CredentialField {
  key: string;
  label: string;
  hint?: string;
  secret?: boolean;
}

export interface Customer {
  name?: string | null;
  email?: string | null;
  phone?: string | null;
}

export interface CreateCheckoutInput {
  credentials: ProviderCredentials;
  mode: ProviderMode;
  /** Montant dans la devise du compte, en unité entière (XOF n'a pas de décimales) */
  amount: number;
  currency: string;
  description: string;
  storeName: string;
  customer?: Customer;
  callbackUrl: string;
  returnUrl: string;
  cancelUrl: string;
  customData?: Record<string, unknown>;
}

export interface CreateCheckoutResult {
  token: string;
  checkoutUrl: string;
  raw?: unknown;
}

export interface ConfirmedPayment {
  status: NormalizedStatus;
  amount: number | null;
  currency: string | null;
  description: string | null;
  customer: Customer;
  receiptUrl: string | null;
  failureReason: string | null;
  customData: Record<string, unknown> | null;
  raw?: unknown;
}

export interface PaymentProvider {
  id: ProviderId;
  label: string;
  /** Devises réellement supportées par le prestataire */
  supportedCurrencies: string[];
  /** Champs d'identifiants demandés au créateur dans le tableau de bord */
  credentialFields: CredentialField[];
  createCheckout(input: CreateCheckoutInput): Promise<CreateCheckoutResult>;
  /**
   * Source canonique de vérité sur l'état d'un paiement.
   * Toujours appelée après réception d'une notification : on ne fait jamais
   * confiance au statut poussé par le prestataire.
   */
  confirmPayment(input: {
    credentials: ProviderCredentials;
    mode: ProviderMode;
    token: string;
  }): Promise<ConfirmedPayment>;
  /**
   * Teste les identifiants saisis par le créateur. Optionnel : tous les
   * prestataires n'exposent pas d'endpoint de vérification.
   */
  verifyCredentials?(input: {
    credentials: ProviderCredentials;
    mode: ProviderMode;
  }): Promise<VerifyResult>;
}

export interface VerifyResult {
  ok: boolean;
  message: string;
  httpStatus?: number;
}

export class PaymentProviderError extends Error {
  constructor(
    message: string,
    readonly provider: ProviderId,
    readonly details?: unknown,
    readonly httpStatus?: number
  ) {
    super(message);
    this.name = "PaymentProviderError";
  }
}
