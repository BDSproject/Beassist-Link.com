import { NextRequest, NextResponse } from "next/server";
import { db } from "@/database/client";
import { sendWelcomeEmail } from "@/lib/email";

export const dynamic = "force-dynamic";

const APP_URL = "https://www.beassist-link.com";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.redirect(`${APP_URL}/verify-email?error=missing`);
  }

  // Chercher le token
  const verificationToken = await db.verificationToken.findUnique({
    where: { token },
  });

  if (!verificationToken) {
    return NextResponse.redirect(`${APP_URL}/verify-email?error=invalid`);
  }

  // Vérifier l'expiration
  if (verificationToken.expires < new Date()) {
    await db.verificationToken.delete({ where: { token } });
    return NextResponse.redirect(`${APP_URL}/verify-email?error=expired`);
  }

  // Trouver l'utilisateur
  const user = await db.user.findUnique({
    where: { email: verificationToken.identifier },
    select: { id: true, name: true, email: true, username: true, emailVerified: true },
  });

  if (!user) {
    return NextResponse.redirect(`${APP_URL}/verify-email?error=invalid`);
  }

  // Si déjà vérifié, rediriger directement
  if (user.emailVerified) {
    await db.verificationToken.delete({ where: { token } });
    return NextResponse.redirect(`${APP_URL}/login?verified=true`);
  }

  // Marquer l'email comme vérifié + supprimer le token
  await Promise.all([
    db.user.update({
      where: { id: user.id },
      data: { emailVerified: new Date() },
    }),
    db.verificationToken.delete({ where: { token } }),
  ]);

  // Envoyer l'email de bienvenue (fire-and-forget)
  void sendWelcomeEmail({
    name: user.name || user.username,
    email: user.email,
    username: user.username,
  });

  return NextResponse.redirect(`${APP_URL}/login?verified=true`);
}
