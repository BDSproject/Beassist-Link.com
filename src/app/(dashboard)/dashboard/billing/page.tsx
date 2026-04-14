import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/database/client";
import { redirect } from "next/navigation";
import { type PlanName } from "@/lib/plans";
import { BillingContent } from "@/components/dashboard/billing-content";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function BillingPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  // Lire le plan directement depuis la table User (toujours à jour via webhook Stripe)
  const [user, subscription] = await Promise.all([
    db.user.findUnique({ where: { id: session.user.id }, select: { plan: true } }),
    db.subscription.findUnique({ where: { userId: session.user.id } }),
  ]);

  const currentPlan = ((user?.plan ?? subscription?.plan) as PlanName) || "FREE";

  return (
    <BillingContent
      currentPlan={currentPlan}
      subscriptionEnd={subscription?.currentPeriodEnd ?? null}
    />
  );
}
