import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { stripe, STRIPE_PRICE_IDS } from "@/lib/stripe";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const formData = await req.formData();
    const plan = formData.get("plan") as string;
    const billing = formData.get("billing") as "monthly" | "yearly";

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
      return NextResponse.json({ message: "Plan invalide" }, { status: 400 });
    }

    // Créer la session Stripe Checkout
    const checkoutSession = await stripe.checkout.sessions.create({
      customer: stripeCustomerId,
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing?canceled=true`,
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

    return NextResponse.redirect(checkoutSession.url!, { status: 303 });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.redirect(
      new URL("/dashboard/billing?error=true", req.url)
    );
  }
}
