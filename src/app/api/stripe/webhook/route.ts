import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/lib/stripe";
import { db } from "@/database/client";
import type Stripe from "stripe";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = headers().get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    console.error("Webhook signature error:", error);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const { userId, plan, billing } = session.metadata || {};

        if (!userId || !plan) break;

        const subscription = await stripe.subscriptions.retrieve(
          session.subscription as string
        );

        await db.subscription.upsert({
          where: { userId },
          update: {
            stripeSubscriptionId: subscription.id,
            stripePriceId: subscription.items.data[0].price.id,
            plan: plan as any,
            billingCycle: billing === "yearly" ? "YEARLY" : "MONTHLY",
            status: "ACTIVE",
            currentPeriodStart: new Date(
              subscription.current_period_start * 1000
            ),
            currentPeriodEnd: new Date(subscription.current_period_end * 1000),
          },
          create: {
            userId,
            stripeCustomerId: session.customer as string,
            stripeSubscriptionId: subscription.id,
            stripePriceId: subscription.items.data[0].price.id,
            plan: plan as any,
            billingCycle: billing === "yearly" ? "YEARLY" : "MONTHLY",
            status: "ACTIVE",
            currentPeriodStart: new Date(
              subscription.current_period_start * 1000
            ),
            currentPeriodEnd: new Date(subscription.current_period_end * 1000),
          },
        });

        // Mettre à jour le plan de l'utilisateur
        await db.user.update({
          where: { id: userId },
          data: { plan: plan as any },
        });

        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        const dbSub = await db.subscription.findUnique({
          where: { stripeSubscriptionId: subscription.id },
        });

        if (!dbSub) break;

        const status =
          subscription.status === "active"
            ? "ACTIVE"
            : subscription.status === "canceled"
            ? "CANCELED"
            : subscription.status === "past_due"
            ? "PAST_DUE"
            : "ACTIVE";

        await db.subscription.update({
          where: { stripeSubscriptionId: subscription.id },
          data: {
            status: status as any,
            cancelAtPeriodEnd: subscription.cancel_at_period_end,
            currentPeriodEnd: new Date(subscription.current_period_end * 1000),
          },
        });

        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        const dbSub = await db.subscription.findUnique({
          where: { stripeSubscriptionId: subscription.id },
        });

        if (!dbSub) break;

        // Rétrograder au plan FREE
        await Promise.all([
          db.subscription.update({
            where: { stripeSubscriptionId: subscription.id },
            data: {
              plan: "FREE",
              status: "CANCELED",
              stripeSubscriptionId: null,
              stripePriceId: null,
            },
          }),
          db.user.update({
            where: { id: dbSub.userId },
            data: { plan: "FREE" },
          }),
        ]);

        break;
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook processing error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}
