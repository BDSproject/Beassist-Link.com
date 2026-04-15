import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { stripe } from "@/lib/stripe";
import { db } from "@/database/client";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const subscription = await db.subscription.findUnique({
    where: { userId: session.user.id },
  });

  if (!subscription?.stripeCustomerId) {
    return NextResponse.redirect(
      new URL("/dashboard/billing", req.url)
    );
  }

  // Déduire l'URL de l'app de manière robuste
  const origin = req.headers.get("origin")
    || req.headers.get("referer")?.replace(/\/[^/]*$/, "")
    || process.env.NEXT_PUBLIC_APP_URL
    || "https://www.beassist-link.com";
  const appUrl = origin.replace(/\/$/, "");

  try {
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: subscription.stripeCustomerId,
      return_url: `${appUrl}/dashboard/billing`,
    });
    return NextResponse.redirect(portalSession.url, { status: 303 });
  } catch (error) {
    console.error("[stripe/portal] Erreur:", error);
    const msg = (error as any)?.raw?.message || (error instanceof Error ? error.message : "Erreur portail Stripe");
    return NextResponse.redirect(
      new URL(`/dashboard/billing?portal_error=${encodeURIComponent(msg)}`, req.url)
    );
  }
}
