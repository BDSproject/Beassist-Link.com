import { db } from "@/database/client";
import type { Prisma } from "@prisma/client";

// ─── Find ────────────────────────────────────────────────────────────────────

export const findSubscriptionByUserId = (userId: string) =>
  db.subscription.findUnique({ where: { userId } });

export const findSubscriptionByStripeCustomerId = (stripeCustomerId: string) =>
  db.subscription.findUnique({ where: { stripeCustomerId } });

export const findSubscriptionByStripeSubscriptionId = (stripeSubscriptionId: string) =>
  db.subscription.findUnique({ where: { stripeSubscriptionId } });

// ─── Upsert / Update ─────────────────────────────────────────────────────────

export const upsertSubscription = (
  userId: string,
  create: Prisma.SubscriptionCreateInput,
  update: Prisma.SubscriptionUpdateInput
) => db.subscription.upsert({ where: { userId }, create, update });

export const updateSubscription = (
  userId: string,
  data: Prisma.SubscriptionUpdateInput
) => db.subscription.update({ where: { userId }, data });

export const cancelSubscriptionAtPeriodEnd = (userId: string) =>
  db.subscription.update({
    where: { userId },
    data: { cancelAtPeriodEnd: true },
  });
