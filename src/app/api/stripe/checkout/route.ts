import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/database/client";
import { stripe, getPriceId } from "@/lib/stripe";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { plan, billing, currency = "eur" } = body as {
      plan: string;
      billing: "monthly" | "yearly";
      currency?: "eur" | "usd" | "gbp";
    };

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

    // Sélectionner le prix Stripe selon le plan et la devise
    let priceId: string;
    if (plan === "STARTER" || plan === "PRO") {
      priceId = getPriceId(plan, billing, currency);
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

    // Déduire l'URL de l'app de manière robuste
    const origin = req.headers.get("origin")
      || req.headers.get("referer")?.replace(/\/[^/]*$/, "")
      || process.env.NEXT_PUBLIC_APP_URL
      || "https://www.beassist-link.com";
    const appUrl = origin.replace(/\/$/, "");

    // Vérifier que l'URL est absolue (Stripe l'exige)
    if (!/^https?:\/\//.test(appUrl)) {
      console.error("[checkout] appUrl invalide:", appUrl);
      return NextResponse.json(
        { error: "Configuration URL invalide. Contactez le support." },
        { status: 500 }
      );
    }

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
      locale: currency === "usd" || currency === "gbp" ? "en" : "fr",
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    console.error("[stripe/checkout] Erreur:", JSON.stringify(error, null, 2));
    const stripeError = error as any;
    const message =
      stripeError?.raw?.message ||
      stripeError?.message ||
      (error instanceof Error ? error.message : "Erreur lors de la création du paiement");
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
