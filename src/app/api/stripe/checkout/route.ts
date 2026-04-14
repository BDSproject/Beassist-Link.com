import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/database/client";
import { stripe, STRIPE_PRICE_IDS } from "@/lib/stripe";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { plan, billing } = body as { plan: string; billing: "monthly" | "yearly" };

    if (!plan || !billing) {
      return NextResponse.json({ error: "Paramètres manquants" }, { status: 400 });
    }

    // Récupérer ou créer le customer Stripe
    let subscription = await db.subscription.findUnique({
      where: { userId: session.user.id },
    });

    let stripeCustomerId = subscription?.stripeCustomerId;

    if (!stripeCustomerId) {
      const customer = await stripe.customers.create({
        email: session.user.email!,
        name: session.user.name || undefined,
        metadata: { userId: session.user.id },
      });
      stripeCustomerId = customer.id;

      await db.subscription.upsert({
        where: { userId: session.user.id },
        update: { stripeCustomerId },
        create: {
          userId: session.user.id,
          stripeCustomerId,
          plan: "FREE",
        },
      });
    }

    // Sélectionner le prix Stripe
    let priceId: string;
    if (plan === "STARTER") {
      priceId =
        billing === "yearly"
          ? STRIPE_PRICE_IDS.STARTER_YEARLY
          : STRIPE_PRICE_IDS.STARTER_MONTHLY;
    } else if (plan === "PRO") {
      priceId =
        billing === "yearly"
          ? STRIPE_PRICE_IDS.PRO_YEARLY
          : STRIPE_PRICE_IDS.PRO_MONTHLY;
    } else {
      return NextResponse.json({ error: "Plan invalide" }, { status: 400 });
    }

    // Vérifier que le price ID est configuré
    if (!priceId) {
      console.error("[checkout] Price ID manquant pour", plan, billing);
      return NextResponse.json(
        { error: "Prix non configuré. Contactez le support." },
        { status: 500 }
      );
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "https://www.beassist-link.com";

    // Créer la session Stripe Checkout
    const checkoutSession = await stripe.checkout.sessions.create({
      customer: stripeCustomerId,
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${appUrl}/dashboard/billing?success=true`,
      cancel_url: `${appUrl}/dashboard/billing?canceled=true`,
      metadata: {
        userId: session.user.id,
        plan,
        billing,
      },
      subscription_data: {
        metadata: { userId: session.user.id, plan, billing },
      },
      allow_promotion_codes: true,
      locale: "fr",
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    const message =
      error instanceof Error ? error.message : "Erreur lors de la création du paiement";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
