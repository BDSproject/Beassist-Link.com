import { NextRequest, NextResponse } from "next/server";
import { db } from "@/database/client";
import { getProvider, syncPaymentStatus } from "@/lib/payments";

// Notification serveur à serveur envoyée par le prestataire.
//
// Principe de sécurité : le contenu de cette requête n'est PAS digne de
// confiance. PayDunya documente un champ « hash » mais aucun SDK officiel n'en
// implémente la vérification et la construction exacte n'est pas publiée.
// On se sert donc uniquement de la notification pour identifier le paiement,
// puis on interroge l'endpoint « confirm », seule source de vérité.

async function handle(req: NextRequest, providerId: string) {
  const provider = getProvider(providerId);
  if (!provider) {
    return NextResponse.json({ message: "Prestataire inconnu" }, { status: 404 });
  }

  let token: string | null = null;
  let paymentIdFromBody: string | null = null;

  try {
    const contentType = req.headers.get("content-type") ?? "";

    if (contentType.includes("application/json")) {
      const body = await req.json();
      const data = body?.data ?? body;
      token = data?.invoice?.token ?? data?.token ?? null;
      paymentIdFromBody = data?.custom_data?.paymentId ?? null;
    } else {
      const form = await req.formData();
      const raw = form.get("data");
      let data: any = null;

      if (typeof raw === "string") {
        try {
          data = JSON.parse(raw);
        } catch {
          data = null;
        }
      }
      if (!data) {
        // Repli : certains envois à plat, sans enveloppe « data »
        data = Object.fromEntries(
          Array.from(form.entries()).map(([k, v]) => [k, typeof v === "string" ? v : ""])
        );
      }

      token = data?.invoice?.token ?? data?.token ?? null;
      paymentIdFromBody = data?.custom_data?.paymentId ?? null;
    }
  } catch {
    // Corps illisible : on répond quand même 200 pour éviter les relances
    return NextResponse.json({ received: true });
  }

  let payment = token
    ? await db.payment.findFirst({ where: { providerToken: token }, select: { id: true } })
    : null;

  if (!payment && paymentIdFromBody) {
    payment = await db.payment.findUnique({
      where: { id: paymentIdFromBody },
      select: { id: true },
    });
  }

  if (payment) {
    // Re-vérification canonique : c'est ici, et nulle part ailleurs, que le
    // statut du paiement est décidé.
    await syncPaymentStatus(payment.id);
  }

  return NextResponse.json({ received: true });
}

export async function POST(
  req: NextRequest,
  { params }: { params: { provider: string } }
) {
  return handle(req, params.provider);
}

// Certains prestataires valident l'URL de notification par un GET préalable.
export async function GET(
  _req: NextRequest,
  { params }: { params: { provider: string } }
) {
  const provider = getProvider(params.provider);
  if (!provider) {
    return NextResponse.json({ message: "Prestataire inconnu" }, { status: 404 });
  }
  return NextResponse.json({ ok: true, provider: provider.id });
}
