import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/database/client";
import Stripe from "stripe";

export const dynamic = "force-dynamic";

export async function DELETE() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Non autorisé" }, { status: 401 });
  }

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
      apiVersion: "2025-02-24.acacia",
    });
    // Cancel Stripe subscription if exists
    const subscription = await db.subscription.findUnique({
      where: { userId: session.user.id },
    });

    if (subscription?.stripeSubscriptionId) {
      try {
        await stripe.subscriptions.cancel(subscription.stripeSubscriptionId);
      } catch {
        // Continue even if Stripe cancel fails
      }
    }

    // Delete user (cascades in Prisma to all related records)
    await db.user.delete({ where: { id: session.user.id } });

    return NextResponse.json({ message: "Compte supprimé" });
  } catch {
    return NextResponse.json(
      { message: "Erreur lors de la suppression du compte" },
      { status: 500 }
    );
  }
}
