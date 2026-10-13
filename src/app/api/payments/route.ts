import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/database/client";
import { syncPaymentStatus } from "@/lib/payments";

const SELECT = {
  id: true,
  amount: true,
  currency: true,
  status: true,
  description: true,
  payerName: true,
  payerPhone: true,
  receiptUrl: true,
  providerToken: true,
  createdAt: true,
  paidAt: true,
  bioLink: { select: { title: true } },
} as const;

// GET — paiements reçus par le créateur connecté.
export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ message: "Non autorisé" }, { status: 401 });
  }

  const url = new URL(req.url);
  const refresh = url.searchParams.get("refresh") === "1";
  const limit = Math.min(Number(url.searchParams.get("limit") ?? 100) || 100, 200);
  const where = { userId: session.user.id };

  let payments = await db.payment.findMany({
    where,
    orderBy: { createdAt: "desc" },
    take: limit,
    select: SELECT,
  });

  // À la demande, on réinterroge le prestataire pour les paiements en attente :
  // le créateur voit l'état réel sans attendre la notification serveur.
  if (refresh) {
    const pending = payments.filter((p) => p.status === "PENDING" && p.providerToken).slice(0, 10);
    for (const p of pending) {
      await syncPaymentStatus(p.id);
    }
    if (pending.length > 0) {
      payments = await db.payment.findMany({
        where,
        orderBy: { createdAt: "desc" },
        take: limit,
        select: SELECT,
      });
    }
  }

  const completed = payments.filter((p) => p.status === "COMPLETED");
  const totalsByCurrency: Record<string, number> = {};
  for (const p of completed) {
    totalsByCurrency[p.currency] = (totalsByCurrency[p.currency] ?? 0) + p.amount;
  }

  return NextResponse.json({
    payments,
    totals: {
      completedCount: completed.length,
      completedAmountByCurrency: totalsByCurrency,
      pendingCount: payments.filter((p) => p.status === "PENDING").length,
    },
  });
}
