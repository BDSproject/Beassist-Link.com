import { NextRequest, NextResponse } from "next/server";
import { db } from "@/database/client";
import { z } from "zod";
import { randomBytes } from "crypto";
import { Resend } from "resend";

const schema = z.object({ email: z.string().email() });

const BASE_URL = process.env.NEXTAUTH_URL || "https://www.beassist-link.com";
const FROM = "BeassistLink <noreply@beassist-link.com>";

function resetEmailHtml({ resetUrl }: { resetUrl: string }): string {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Réinitialisation de mot de passe</title>
</head>
<body style="margin:0;padding:0;background:#F9FAFB;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F9FAFB;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.06);">
          <tr>
            <td style="background:linear-gradient(135deg,#8F00FF,#6200CC);padding:40px 40px 32px;text-align:center;">
              <p style="margin:0;font-size:26px;font-weight:800;color:#ffffff;letter-spacing:-0.5px;">
                Beassist<span style="opacity:0.75;">Link</span>
              </p>
              <p style="margin:8px 0 0;font-size:13px;color:rgba(255,255,255,0.7);">Ton lien unique, ton identité.</p>
            </td>
          </tr>
          <tr>
            <td style="padding:40px 40px 32px;">
              <h1 style="margin:0 0 12px;font-size:22px;font-weight:700;color:#111827;">
                Réinitialisation de mot de passe 🔐
              </h1>
              <p style="margin:0 0 24px;font-size:15px;line-height:1.7;color:#4B5563;">
                Nous avons reçu une demande de réinitialisation de mot de passe pour ton compte. Clique sur le bouton ci-dessous pour choisir un nouveau mot de passe.
              </p>
              <p style="margin:0 0 8px;font-size:13px;color:#6B7280;">
                Ce lien est valable pendant <strong>1 heure</strong>.
              </p>
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:24px;margin-bottom:32px;">
                <tr>
                  <td align="center">
                    <a href="${resetUrl}" style="display:inline-block;background:linear-gradient(135deg,#8F00FF,#6200CC);color:#ffffff;font-size:15px;font-weight:700;text-decoration:none;padding:14px 36px;border-radius:12px;">
                      Réinitialiser mon mot de passe →
                    </a>
                  </td>
                </tr>
              </table>
              <p style="margin:0;font-size:13px;color:#9CA3AF;line-height:1.6;">
                Si tu n'as pas demandé cette réinitialisation, ignore cet email. Ton mot de passe restera inchangé.
              </p>
            </td>
          </tr>
          <tr>
            <td style="background:#F9FAFB;padding:24px 40px;border-top:1px solid #E5E7EB;">
              <p style="margin:0;font-size:12px;color:#9CA3AF;text-align:center;line-height:1.6;">
                <a href="${BASE_URL}" style="color:#8F00FF;text-decoration:none;">beassist-link.com</a>
                &nbsp;·&nbsp;
                <a href="${BASE_URL}/legal" style="color:#9CA3AF;text-decoration:none;">Mentions légales</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = schema.parse(body);

    // Check if user exists — but don't leak info: always return 200
    const user = await db.user.findUnique({ where: { email } });

    if (user && user.password) {
      // Delete any existing token for this email
      await db.passwordResetToken.deleteMany({ where: { email } });

      // Generate secure token
      const token = randomBytes(32).toString("hex");
      const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

      await db.passwordResetToken.create({
        data: { email, token, expires },
      });

      const resetUrl = `${BASE_URL}/reset-password?token=${token}`;

      if (process.env.RESEND_API_KEY) {
        const resend = new Resend(process.env.RESEND_API_KEY);
        const { error } = await resend.emails.send({
          from: FROM,
          to: email,
          subject: "Réinitialisation de ton mot de passe BeassistLink",
          html: resetEmailHtml({ resetUrl }),
        });
        if (error) {
          console.error(`[forgot-password] Échec envoi email de réinitialisation à ${email}:`, error);
        }
      }
    }

    // Always return success to prevent email enumeration
    return NextResponse.json({
      message:
        "Si un compte existe avec cet email, tu recevras un lien de réinitialisation.",
    });
  } catch (err) {
    console.error("[forgot-password]", err);
    return NextResponse.json({ message: "Erreur" }, { status: 400 });
  }
}
