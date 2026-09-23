import { NextRequest, NextResponse } from "next/server";
import { db } from "@/database/client";
import { z } from "zod";
import bcrypt from "bcryptjs";

const schema = z.object({
  token: z.string().min(1),
  password: z
    .string()
    .min(8, "Minimum 8 caractères")
    .regex(/[A-Z]/, "Au moins une majuscule")
    .regex(/[0-9]/, "Au moins un chiffre"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { token, password } = schema.parse(body);

    // Find and validate token
    const resetToken = await db.passwordResetToken.findUnique({
      where: { token },
    });

    if (!resetToken || resetToken.expires < new Date()) {
      await db.passwordResetToken.deleteMany({ where: { token } });
      return NextResponse.json(
        { message: "Lien invalide ou expiré. Réessaie." },
        { status: 400 }
      );
    }

    // Update password
    const hashedPassword = await bcrypt.hash(password, 12);
    await db.user.update({
      where: { email: resetToken.email },
      data: { password: hashedPassword },
    });

    // Delete used token
    await db.passwordResetToken.delete({ where: { token } });

    return NextResponse.json({ message: "Mot de passe mis à jour." });
  } catch (err) {
    console.error("[reset-password]", err);
    return NextResponse.json({ message: "Erreur" }, { status: 400 });
  }
}
