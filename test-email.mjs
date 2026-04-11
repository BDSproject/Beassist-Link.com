// Script de test Resend — node test-email.mjs <ton@email.com>
import { Resend } from "resend";
import { readFileSync } from "fs";

// Charger .env.local manuellement
const env = readFileSync(".env.local", "utf-8");
for (const line of env.split("\n")) {
  const match = line.match(/^([^#=\s]+)\s*=\s*"?([^"]*)"?\s*$/);
  if (match) process.env[match[1]] = match[2];
}

const toEmail = process.argv[2];
if (!toEmail) {
  console.error("Usage: node test-email.mjs <destination@email.com>");
  process.exit(1);
}

const resend = new Resend(process.env.RESEND_API_KEY);

const { data, error } = await resend.emails.send({
  from: "BeassistLink <noreply@beassist-link.com>",
  to: toEmail,
  subject: "🎉 Bienvenue sur BeassistLink, Test User !",
  html: `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"/></head>
<body style="margin:0;padding:0;background:#F9FAFB;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F9FAFB;padding:40px 20px;">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.06);">
        <tr>
          <td style="background:linear-gradient(135deg,#8F00FF,#6200CC);padding:40px;text-align:center;">
            <p style="margin:0;font-size:26px;font-weight:800;color:#ffffff;">Beassist<span style="opacity:0.75;">Link</span></p>
            <p style="margin:8px 0 0;font-size:13px;color:rgba(255,255,255,0.7);">Votre lien unique, votre identité.</p>
          </td>
        </tr>
        <tr>
          <td style="padding:40px;">
            <h1 style="margin:0 0 12px;font-size:22px;font-weight:700;color:#111827;">Bienvenue Test User ! 🎉</h1>
            <p style="margin:0 0 24px;font-size:15px;line-height:1.7;color:#4B5563;">
              Votre compte BeassistLink a été créé avec succès. Vous pouvez dès maintenant personnaliser votre page bio, créer vos liens raccourcis et partager votre lien unique.
            </p>
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#F5F3FF;border-radius:12px;margin-bottom:28px;">
              <tr><td style="padding:16px 20px;">
                <p style="margin:0 0 4px;font-size:11px;font-weight:600;color:#7C3AED;text-transform:uppercase;">Votre lien bio</p>
                <a href="https://beassist-link.com/testuser" style="font-size:15px;font-weight:700;color:#8F00FF;text-decoration:none;">beassist-link.com/testuser</a>
              </td></tr>
            </table>
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:24px;">
              <tr><td align="center">
                <a href="https://www.beassist-link.com/dashboard" style="display:inline-block;background:linear-gradient(135deg,#8F00FF,#6200CC);color:#ffffff;font-size:15px;font-weight:700;text-decoration:none;padding:14px 36px;border-radius:12px;">
                  Accéder à mon tableau de bord →
                </a>
              </td></tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="background:#F9FAFB;padding:24px 40px;border-top:1px solid #E5E7EB;">
            <p style="margin:0;font-size:12px;color:#9CA3AF;text-align:center;">
              Email de test envoyé depuis BeassistLink · <a href="https://beassist-link.com" style="color:#8F00FF;text-decoration:none;">beassist-link.com</a>
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`,
});

if (error) {
  console.error("❌ Erreur Resend:", JSON.stringify(error, null, 2));
  process.exit(1);
} else {
  console.log("✅ Email envoyé avec succès !");
  console.log("   ID:", data?.id);
  console.log("   Destinataire:", toEmail);
}
