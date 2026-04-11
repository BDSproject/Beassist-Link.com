import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { type PlanName } from "@/lib/plans";
import { BillingContent } from "@/components/dashboard/billing-content";

export default async function BillingPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/login");

  const subscription = await db.subscription.findUnique({
    where: { userId: session.user.id },
  });

  const currentPlan = (session.user.plan as PlanName) || "FREE";

  return (
    <BillingContent
      currentPlan={currentPlan}
      subscriptionEnd={subscription?.currentPeriodEnd ?? null}
    />
  );
}
