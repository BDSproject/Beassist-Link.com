import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/database/client";

export async function PATCH(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ message: "Non autorisé" }, { status: 401 });
    }

    const body = await req.json();
    const { name, company, billingAddress } = body;

    if (!name || name.trim().length < 2) {
      return NextResponse.json(
        { message: "Le nom complet est requis (minimum 2 caractères)" },
        { status: 400 }
      );
    }

    const trimmedName = name.trim();
    const trimmedCompany = company?.trim() || null;
    const trimmedAddress = billingAddress?.trim() || null;

    // Update user with onboarding data
    await db.user.update({
      where: { id: session.user.id },
      data: {
        name: trimmedName,
        company: trimmedCompany,
        billingAddress: trimmedAddress,
        onboardingCompleted: true,
      } as any,
    });

    // Also update the bioPage title to match the user's name
    await db.bioPage.updateMany({
      where: { userId: session.user.id },
      data: { title: trimmedName },
    });

    return NextResponse.json({ message: "Profil complété avec succès" });
  } catch (error) {
    console.error("[ONBOARDING_PATCH]", error);
    return NextResponse.json(
      { message: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
