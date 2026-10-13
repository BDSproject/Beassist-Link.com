import { NextRequest, NextResponse } from "next/server";
import { db } from "@/database/client";
import { recordSimulatedOutcome, syncPaymentStatus } from "@/lib/payments";

// Enregistre le résultat choisi sur la page de simulation, puis déclenche la
// même vérification que celle utilisée en production (confirm côté serveur).
// Route inexistante si la simulation n'est pas activée.
export async function POST(req: NextRequest) {
  if (process.env.PAYMENT_SIMULATION !== "true") {
    return NextResponse.json({ message: "Indisponible" }, { status: 404 });
  }

  const body = await req.json().catch(() => null);
  const token = typeof body?.token === "string" ? body.token : null;
  const outcome = body?.outcome;

  if (!token || !["COMPLETED", "FAILED", "CANCELLED"].includes(outcome)) {
    return NextResponse.json({ message: "Requête invalide" }, { status: 400 });
  }

  const payment = await db.payment.findFirst({
    where: { providerToken: token, provider: "SIMULATION" },
    select: { id: true, amount: true, currency: true, description: true },
  });

  if (!payment) {
    return NextResponse.json({ message: "Transaction inconnue" }, { status: 404 });
  }

  recordSimulatedOutcome(token, {
    status: outcome,
    amount: payment.amount,
    currency: payment.currency,
    description: payment.description ?? "",
    customer: { name: "Client test", phone: "770000000" },
  });

  // Relecture par le chemin canonique : on ne se contente pas de pousser un
  // statut, on relit ce que le prestataire déclare.
  await syncPaymentStatus(payment.id);

  return NextResponse.json({ ok: true, returnUrl: `/paiement/retour?p=${payment.id}` });
}
