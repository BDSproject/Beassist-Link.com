import { Resend } from "resend";

const FROM = "BeassistLink <noreply@beassist-link.com>";
const BASE_URL = process.env.NEXTAUTH_URL || "https://www.beassist-link.com";

// ---------------------------------------------------------------------------
// Template HTML — email de vérification
// ---------------------------------------------------------------------------
function verificationEmailHtml({
  name,
  verificationUrl,
}: {
  name: string;
  verificationUrl: string;
}): string {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Vérifiez votre email — BeassistLink</title>
</head>
<body style="margin:0;padding:0;background:#F9FAFB;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F9FAFB;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.06);">
          <!-- Header violet -->
          <tr>
            <td style="background:linear-gradient(135deg,#8F00FF,#6200CC);padding:40px 40px 32px;text-align:center;">
              <p style="margin:0;font-size:26px;font-weight:800;color:#ffffff;letter-spacing:-0.5px;">
                Beassist<span style="opacity:0.75;">Link</span>
              </p>
              <p style="margin:8px 0 0;font-size:13px;color:rgba(255,255,255,0.7);">Votre lien unique, votre identité.</p>
            </td>
          </tr>
          <!-- Corps -->
          <tr>
            <td style="padding:40px 40px 32px;">
              <h1 style="margin:0 0 12px;font-size:22px;font-weight:700;color:#111827;">
                Confirmez votre adresse email 📧
              </h1>
              <p style="margin:0 0 24px;font-size:15px;line-height:1.7;color:#4B5563;">
                Bonjour ${name},<br/><br/>
                Merci de vous être inscrit sur BeassistLink ! Pour activer votre compte, veuillez confirmer votre adresse email en cliquant sur le bouton ci-dessous.
              </p>
              <!-- CTA -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                <tr>
                  <td align="center">
                    <a href="${verificationUrl}" style="display:inline-block;background:linear-gradient(135deg,#8F00FF,#6200CC);color:#ffffff;text-decoration:none;font-size:15px;font-weight:700;padding:14px 36px;border-radius:12px;letter-spacing:0.2px;">
                      ✅ Vérifier mon email
                    </a>
                  </td>
                </tr>
              </table>
              <!-- Info expiry -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#FFF7ED;border-radius:12px;margin-bottom:20px;">
                <tr>
                  <td style="padding:14px 20px;">
                    <p style="margin:0;font-size:13px;color:#92400E;">
                      ⏰ Ce lien expire dans <strong>24 heures</strong>. Si vous n'avez pas créé de compte, ignorez cet email.
                    </p>
                  </td>
                </tr>
              </table>
              <!-- Fallback URL -->
              <p style="margin:0;font-size:12px;color:#9CA3AF;line-height:1.6;">
                Si le bouton ne fonctionne pas, copiez ce lien dans votre navigateur :<br/>
                <a href="${verificationUrl}" style="color:#8F00FF;word-break:break-all;">${verificationUrl}</a>
              </p>
            </td>
          </tr>
          <!-- Footer -->
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

// ---------------------------------------------------------------------------
// Template HTML — email de bienvenue (post-vérification)
// ---------------------------------------------------------------------------
function welcomeEmailHtml({
  name,
  username,
}: {
  name: string;
  username: string;
}): string {
  const bioUrl = `${BASE_URL}/${username}`;
  const dashboardUrl = `${BASE_URL}/dashboard`;

  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Bienvenue sur BeassistLink</title>
</head>
<body style="margin:0;padding:0;background:#F9FAFB;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F9FAFB;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.06);">

          <!-- Header violet -->
          <tr>
            <td style="background:linear-gradient(135deg,#8F00FF,#6200CC);padding:40px 40px 32px;text-align:center;">
              <p style="margin:0;font-size:26px;font-weight:800;color:#ffffff;letter-spacing:-0.5px;">
                Beassist<span style="opacity:0.75;">Link</span>
              </p>
              <p style="margin:8px 0 0;font-size:13px;color:rgba(255,255,255,0.7);">Votre lien unique, votre identité.</p>
            </td>
          </tr>

          <!-- Corps -->
          <tr>
            <td style="padding:40px 40px 32px;">
              <h1 style="margin:0 0 12px;font-size:22px;font-weight:700;color:#111827;">
                Bienvenue ${name} ! 🎉
              </h1>
              <p style="margin:0 0 24px;font-size:15px;line-height:1.7;color:#4B5563;">
                Votre compte BeassistLink a été créé avec succès. Vous pouvez dès maintenant personnaliser votre page bio, créer vos liens raccourcis et partager votre lien unique avec le monde.
              </p>

              <!-- Card lien bio -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#F5F3FF;border-radius:12px;margin-bottom:28px;">
                <tr>
                  <td style="padding:16px 20px;">
                    <p style="margin:0 0 4px;font-size:11px;font-weight:600;color:#7C3AED;text-transform:uppercase;letter-spacing:0.5px;">Votre lien bio</p>
                    <a href="${bioUrl}" style="font-size:15px;font-weight:700;color:#8F00FF;text-decoration:none;">${bioUrl}</a>
                  </td>
                </tr>
              </table>

              <!-- 3 étapes -->
              <p style="margin:0 0 16px;font-size:14px;font-weight:600;color:#111827;">Pour bien démarrer :</p>
              <table width="100%" cellpadding="0" cellspacing="0">
                ${[
                  ["1", "Personnalisez votre page bio", "Ajoutez votre photo, bio et liens sociaux"],
                  ["2", "Créez vos liens raccourcis", "Partagez des URLs courtes et mémorables"],
                  ["3", "Analysez vos performances", "Suivez les clics et l'engagement (Starter+)"],
                ]
                  .map(
                    ([num, title, desc]) => `
                <tr>
                  <td style="padding:8px 0;">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="vertical-align:top;padding-right:14px;">
                          <div style="width:28px;height:28px;border-radius:50%;background:#8F00FF;color:#fff;font-size:13px;font-weight:700;text-align:center;line-height:28px;">${num}</div>
                        </td>
                        <td style="vertical-align:middle;">
                          <p style="margin:0;font-size:14px;font-weight:600;color:#111827;">${title}</p>
                          <p style="margin:2px 0 0;font-size:13px;color:#6B7280;">${desc}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>`
                  )
                  .join("")}
              </table>

              <!-- CTA -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:32px;">
                <tr>
                  <td align="center">
                    <a href="${dashboardUrl}" style="display:inline-block;background:linear-gradient(135deg,#8F00FF,#6200CC);color:#ffffff;font-size:15px;font-weight:700;text-decoration:none;padding:14px 36px;border-radius:12px;">
                      Accéder à mon tableau de bord →
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#F9FAFB;padding:24px 40px;border-top:1px solid #E5E7EB;">
              <p style="margin:0;font-size:12px;color:#9CA3AF;text-align:center;line-height:1.6;">
                Vous recevez cet email car vous venez de créer un compte sur BeassistLink.<br/>
                Si vous n'êtes pas à l'origine de cette inscription, ignorez cet email.<br/><br/>
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

// ---------------------------------------------------------------------------
// Fonction exportée : envoi de l'email de bienvenue
// ---------------------------------------------------------------------------
export async function sendWelcomeEmail({
  name,
  email,
  username,
}: {
  name: string;
  email: string;
  username: string;
}): Promise<void> {
  if (!process.env.RESEND_API_KEY) {
    console.warn("[email] RESEND_API_KEY manquante — email non envoyé");
    return;
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    await resend.emails.send({
      from: FROM,
      to: email,
      subject: `Bienvenue sur BeassistLink, ${name} ! 🎉`,
      html: welcomeEmailHtml({ name, username }),
    });
  } catch (err) {
    console.error("[email] Erreur envoi welcome email:", err);
  }
}

// ---------------------------------------------------------------------------
// Fonction exportée : envoi de l'email de vérification
// ---------------------------------------------------------------------------
export async function sendVerificationEmail({
  name,
  email,
  token,
}: {
  name: string;
  email: string;
  token: string;
}): Promise<void> {
  if (!process.env.RESEND_API_KEY) {
    console.warn("[email] RESEND_API_KEY manquante — email non envoyé");
    return;
  }

  const verificationUrl = `${BASE_URL}/api/auth/verify-email?token=${token}`;
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    await resend.emails.send({
      from: FROM,
      to: email,
      subject: "Vérifiez votre email BeassistLink 📧",
      html: verificationEmailHtml({ name, verificationUrl }),
    });
  } catch (err) {
    console.error("[email] Erreur envoi verification email:", err);
  }
}
