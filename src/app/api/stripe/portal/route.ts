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

  try {
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: subscription.stripeCustomerId,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billing`,
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
