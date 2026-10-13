import { NextRequest, NextResponse } from "next/server";
import { db } from "@/database/client";
import { decryptCredentials, getProvider, syncPaymentStatus } from "@/lib/payments";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { appBaseUrl } from "@/lib/app-url";

// Initiation d'un paiement depuis une page bio publique.
//
// Règle de sécurité centrale : le montant, la devise et le compte marchand
// viennent TOUJOURS de la base, jamais de la requête. Le client ne peut rien
// choisir, sinon n'importe qui pourrait payer 1 FCFA pour un article à 50 000.

export async function POST(
  req: NextRequest,
  { params }: { params: { linkId: string } }
) {
  const ip = clientIp(req.headers);
  const limit = rateLimit(`pay:${ip}`, 10, 60_000);
  if (!limit.ok) {
    return NextResponse.json(
      { message: "Trop de tentatives. Réessaie dans une minute." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } }
    );
  }

  const link = await db.bioLink.findUnique({
    where: { id: params.linkId },
    select: {
      id: true,
      title: true,
      kind: true,
      amount: true,
      currency: true,
      active: true,
      bioPage: {
        select: {
          active: true,
          username: true,
          user: {
            select: {
              id: true,
              name: true,
              paymentAccounts: {
                where: { active: true },
                orderBy: { createdAt: "desc" },
                take: 1,
              },
            },
          },
        },
      },
    },
  });

  if (!link || !link.bioPage.active) {
    return NextResponse.json({ message: "Lien introuvable" }, { status: 404 });
  }
  if (!link.active) {
    return NextResponse.json({ message: "Ce lien est désactivé" }, { status: 409 });
  }
  if (link.kind !== "payment" && link.kind !== "tip") {
    return NextResponse.json(
      { message: "Ce lien n'accepte pas de paiement" },
      { status: 400 }
    );
  }

  const account = link.bioPage.user.paymentAccounts[0];
  if (!account || !account.active) {
    return NextResponse.json(
      { message: "Le créateur n'a pas encore connecté de compte de paiement" },
      { status: 409 }
    );
  }

  const amount = Math.round(Number(link.amount ?? 0));
  if (!Number.isFinite(amount) || amount <= 0) {
    return NextResponse.json({ message: "Montant non configuré" }, { status: 409 });
  }

  const currency = (link.currency || "XOF").toUpperCase();
  const provider = getProvider(account.provider);
  if (!provider) {
    return NextResponse.json({ message: "Prestataire indisponible" }, { status: 409 });
  }
  if (!provider.supportedCurrencies.includes(currency)) {
    return NextResponse.json(
      { message: `${provider.label} ne gère pas la devise ${currency}` },
      { status: 409 }
    );
  }

  const base = appBaseUrl(req);
  const description = link.title.slice(0, 200);

  // Ligne créée avant l'appel au prestataire : on garde une trace même si
  // PayDunya ne répond jamais.
  const payment = await db.payment.create({
    data: {
      userId: link.bioPage.user.id,
      paymentAccountId: account.id,
      bioLinkId: link.id,
      provider: account.provider,
      amount,
      currency,
      description,
      status: "PENDING",
    },
    select: { id: true },
  });

  try {
    const checkout = await provider.createCheckout({
      credentials: decryptCredentials(account.credentials),
      mode: account.mode as "SANDBOX" | "LIVE",
      amount,
      currency,
      description,
      storeName: link.bioPage.user.name || `@${link.bioPage.username}`,
      customer: {},
      callbackUrl: `${base}/api/payments/callback/${account.provider}`,
      returnUrl: `${base}/paiement/retour?p=${payment.id}`,
      cancelUrl: `${base}/paiement/annule?p=${payment.id}`,
      customData: { paymentId: payment.id, username: link.bioPage.username },
    });

    await db.payment.update({
      where: { id: payment.id },
      data: { providerToken: checkout.token || null, providerRef: checkout.token || null },
    });

    return NextResponse.json({ checkoutUrl: checkout.checkoutUrl, paymentId: payment.id });
  } catch (err) {
    await db.payment.update({
      where: { id: payment.id },
      data: { status: "FAILED", failureReason: "Initialisation refusée par le prestataire" },
    });
    console.error("[payments] createCheckout a échoué", payment.id, err);
    return NextResponse.json(
      { message: "Le paiement n'a pas pu être initialisé. Réessaie plus tard." },
      { status: 502 }
    );
  }
}

// Utilisé par la page de retour pour rafraîchir l'état sans attendre l'IPN.
export async function GET(
  req: NextRequest,
  { params }: { params: { linkId: string } }
) {
  const payment = await db.payment.findFirst({
    where: { bioLinkId: params.linkId },
    orderBy: { createdAt: "desc" },
    select: { id: true },
  });
  if (!payment) return NextResponse.json({ message: "Aucun paiement" }, { status: 404 });
  const updated = await syncPaymentStatus(payment.id);
  return NextResponse.json({ status: updated?.status ?? "UNKNOWN" });
}
