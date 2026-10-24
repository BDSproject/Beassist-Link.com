import {
  PaymentProviderError,
  type ConfirmedPayment,
  type CreateCheckoutInput,
  type CreateCheckoutResult,
  type NormalizedStatus,
  type PaymentProvider,
  type ProviderCredentials,
  type ProviderMode,
} from "../types";

// Adaptateur PayDunya : API « PAR » (Paiement Avec Redirection).
// Doc : https://developers.paydunya.com/doc/FR/http_json
//
// Flux : POST checkout-invoice/create -> on redirige le payeur vers l'URL
// renvoyée. L'état réel du paiement est ensuite lu via
// GET checkout-invoice/confirm/{token}.
//
// NOTE DE SÉCURITÉ : la documentation PayDunya décrit un champ `hash` dans les
// notifications, mais aucun SDK officiel n'en implémente la vérification et la
// construction exacte du hash n'est pas spécifiée publiquement. On ne s'appuie
// donc jamais sur le contenu de la notification : elle sert uniquement de
// signal, et `confirmPayment` reste l'unique source de vérité.

const BASES: Record<ProviderMode, string> = {
  SANDBOX: "https://app.paydunya.com/sandbox-api/v1",
  LIVE: "https://app.paydunya.com/api/v1",
};

const TIMEOUT_MS = 15_000;

function headers(credentials: ProviderCredentials): HeadersInit {
  const masterKey = credentials.masterKey?.trim();
  const privateKey = credentials.privateKey?.trim();
  const token = credentials.token?.trim();

  if (!masterKey || !privateKey || !token) {
    throw new PaymentProviderError(
      "Identifiants PayDunya incomplets : clé principale, clé privée et token sont requis",
      "PAYDUNYA"
    );
  }

  return {
    "Content-Type": "application/json",
    "PAYDUNYA-MASTER-KEY": masterKey,
    "PAYDUNYA-PRIVATE-KEY": privateKey,
    "PAYDUNYA-TOKEN": token,
  };
}

function toAmount(value: unknown): number | null {
  if (value === null || value === undefined) return null;
  const n = typeof value === "number" ? value : Number(String(value).replace(/[^\d.-]/g, ""));
  return Number.isFinite(n) ? n : null;
}

function mapStatus(raw: unknown): NormalizedStatus {
  switch (String(raw ?? "").toLowerCase()) {
    case "completed":
    case "complete":
    case "success":
    case "successful":
      return "COMPLETED";
    case "pending":
    case "pending_payment":
    case "processing":
      return "PENDING";
    case "cancelled":
    case "canceled":
      return "CANCELLED";
    case "failed":
    case "fail":
    case "error":
      return "FAILED";
    default:
      return "UNKNOWN";
  }
}

async function request(
  url: string,
  init: RequestInit,
  mode: ProviderMode
): Promise<{ ok: boolean; status: number; body: any; text: string }> {
  let res: Response;
  try {
    res = await fetch(url, { ...init, signal: AbortSignal.timeout(TIMEOUT_MS), cache: "no-store" });
  } catch (err) {
    throw new PaymentProviderError(
      err instanceof Error && err.name === "TimeoutError"
        ? "PayDunya n'a pas répondu dans le délai imparti"
        : "Impossible de joindre PayDunya",
      "PAYDUNYA",
      err
    );
  }

  const text = await res.text();
  let body: any = null;
  try {
    body = text ? JSON.parse(text) : null;
  } catch {
    // PayDunya renvoie parfois du texte brut sur les erreurs de proxy
  }

  if (!res.ok) {
    throw new PaymentProviderError(
      `PayDunya a renvoyé une erreur HTTP ${res.status}${mode === "SANDBOX" ? " (mode test)" : ""}`,
      "PAYDUNYA",
      body ?? text,
      res.status
    );
  }

  return { ok: res.ok, status: res.status, body, text };
}

export const paydunyaProvider: PaymentProvider = {
  id: "PAYDUNYA",
  label: "PayDunya",
  // La FAQ PayDunya indique que le FCFA est la seule devise de compte marchand.
  // XAF apparaît via MTN Cameroun mais n'est pas confirmé comme devise de compte.
  supportedCurrencies: ["XOF", "XAF"],

  credentialFields: [
    {
      key: "masterKey",
      label: "Clé principale (Master Key)",
      hint: "Visible dans votre tableau de bord PayDunya, section API",
      secret: true,
    },
    {
      key: "privateKey",
      label: "Clé privée (Private Key)",
      hint: "Commence par test_private_ en mode test, live_private_ en production",
      secret: true,
    },
    {
      key: "token",
      label: "Token",
      hint: "Token de votre application PayDunya",
      secret: true,
    },
  ],

  async createCheckout(input: CreateCheckoutInput): Promise<CreateCheckoutResult> {
    const amount = Math.round(input.amount);
    if (!Number.isFinite(amount) || amount <= 0) {
      throw new PaymentProviderError("Montant de paiement invalide", "PAYDUNYA");
    }

    const payload = {
      invoice: {
        items: {},
        taxes: {},
        total_amount: amount,
        description: input.description.slice(0, 200),
        ...(input.customer && (input.customer.name || input.customer.email || input.customer.phone)
          ? {
              customer: {
                name: input.customer.name ?? "",
                email: input.customer.email ?? "",
                phone: input.customer.phone ?? "",
              },
            }
          : {}),
      },
      store: {
        name: input.storeName,
        tagline: "",
        postal_address: "",
        phone: "",
        logo_url: "",
        website_url: "",
      },
      custom_data: input.customData ?? {},
      actions: {
        callback_url: input.callbackUrl,
        return_url: input.returnUrl,
        cancel_url: input.cancelUrl,
      },
    };

    const { body } = await request(
      `${BASES[input.mode]}/checkout-invoice/create`,
      { method: "POST", headers: headers(input.credentials), body: JSON.stringify(payload) },
      input.mode
    );

    if (body?.response_code !== "00" || !body?.response_text) {
      throw new PaymentProviderError(
        body?.description || body?.response_text || "Création de facture refusée par PayDunya",
        "PAYDUNYA",
        body
      );
    }

    return {
      // response_text porte l'URL de checkout, token la référence de facture
      token: String(body.token ?? ""),
      checkoutUrl: String(body.response_text),
      raw: body,
    };
  },

  async confirmPayment({ credentials, mode, token }): Promise<ConfirmedPayment> {
    if (!token) {
      throw new PaymentProviderError("Token de facture manquant", "PAYDUNYA");
    }

    const { body } = await request(
      `${BASES[mode]}/checkout-invoice/confirm/${encodeURIComponent(token)}`,
      { method: "GET", headers: headers(credentials) },
      mode
    );

    const data = body?.data && typeof body.data === "object" ? body.data : body;
    const invoice = data?.invoice ?? {};
    const customer = data?.customer ?? {};

    return {
      status: mapStatus(data?.status),
      amount: toAmount(invoice.total_amount),
      currency: invoice.currency ? String(invoice.currency) : null,
      description: invoice.description ? String(invoice.description) : null,
      customer: {
        name: customer.name ? String(customer.name) : null,
        email: customer.email ? String(customer.email) : null,
        phone: customer.phone ? String(customer.phone) : null,
      },
      receiptUrl: data?.receipt_url ? String(data.receipt_url) : null,
      failureReason: data?.fail_reason ? String(data.fail_reason) : null,
      customData:
        data?.custom_data && typeof data.custom_data === "object" ? data.custom_data : null,
      raw: body,
    };
  },

  /**
   * Teste les identifiants sans créer de facture réelle.
   * On interroge `confirm` avec un token volontairement inexistant :
   * l'authentification est vérifiée avant la recherche de la ressource, donc
   * une réponse JSON structurée prouve que les clés sont acceptées, tandis
   * qu'un 401/403 prouve qu'elles sont refusées.
   */
  async verifyCredentials({ credentials, mode }) {
    try {
      const { body } = await request(
        `${BASES[mode]}/checkout-invoice/confirm/BEASSISTLINK000000CHECK`,
        { method: "GET", headers: headers(credentials) },
        mode
      );
      const code = body?.response_code;
      return {
        ok: true,
        message:
          code && code !== "00"
            ? `Identifiants acceptés (PayDunya répond : ${body?.response_text ?? code})`
            : "Identifiants acceptés",
      };
    } catch (err) {
      if (err instanceof PaymentProviderError) {
        const status = err.httpStatus;
        if (status === 401 || status === 403) {
          return {
            ok: false,
            httpStatus: status,
            message: "PayDunya refuse ces identifiants (401/403). Vérifiez les trois clés.",
          };
        }
        return {
          ok: false,
          httpStatus: status,
          message: err.message,
        };
      }
      return { ok: false, message: "Vérification impossible pour le moment" };
    }
  },
};
