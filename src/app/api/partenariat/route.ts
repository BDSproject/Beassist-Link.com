import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  handle: z.string().min(1),
  platform: z.string().min(1),
  audience: z.string().optional(),
  message: z.string().optional(),
});

const FROM = "BeassistLink <noreply@beassist-link.com>";
const NOTIFY_TO = "contact@beassist-link.com";

function candidatureHtml(data: z.infer<typeof schema>): string {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Nouvelle candidature partenariat</title>
</head>
<body style="margin:0;padding:0;background:#F9FAFB;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F9FAFB;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.06);">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#8F00FF,#6200CC);padding:36px 40px 28px;text-align:center;">
              <p style="margin:0;font-size:26px;font-weight:800;color:#ffffff;letter-spacing:-0.5px;">
                Beassist<span style="opacity:0.75;">Link</span>
              </p>
              <p style="margin:8px 0 0;font-size:13px;color:rgba(255,255,255,0.7);">Programme ambassadeur</p>
            </td>
          </tr>

          <!-- Corps -->
          <tr>
            <td style="padding:36px 40px 28px;">
              <h1 style="margin:0 0 8px;font-size:20px;font-weight:700;color:#111827;">
                🎉 Nouvelle candidature partenariat
              </h1>
              <p style="margin:0 0 28px;font-size:14px;color:#6B7280;">Reçue le ${new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}</p>

              <!-- Infos candidat -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#F5F3FF;border-radius:12px;margin-bottom:20px;">
                <tr><td style="padding:20px 24px;">
                  <table width="100%" cellpadding="0" cellspacing="0">
                    ${[
                      ["Nom", data.name],
                      ["Email", data.email],
                      ["Plateforme", data.platform],
                      ["Handle / Chaîne", data.handle],
                      ["Audience", data.audience || "Non précisé"],
                    ]
                      .map(
                        ([label, value]) => `
                    <tr>
                      <td style="padding:5px 0;font-size:13px;font-weight:600;color:#7C3AED;width:140px;">${label}</td>
                      <td style="padding:5px 0;font-size:14px;color:#111827;">${value}</td>
                    </tr>`
                      )
                      .join("")}
                  </table>
                </td></tr>
              </table>

              ${
                data.message
                  ? `<div style="background:#F9FAFB;border-left:3px solid #8F00FF;padding:16px 20px;border-radius:0 8px 8px 0;margin-bottom:20px;">
                <p style="margin:0 0 6px;font-size:12px;font-weight:600;color:#7C3AED;text-transform:uppercase;letter-spacing:0.5px;">Message</p>
                <p style="margin:0;font-size:14px;color:#374151;line-height:1.6;">${data.message.replace(/\n/g, "<br>")}</p>
              </div>`
                  : ""
              }

              <p style="margin:0;font-size:13px;color:#6B7280;">
                Réponds directement à <a href="mailto:${data.email}" style="color:#8F00FF;">${data.email}</a> pour valider ou refuser la candidature.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#F9FAFB;padding:20px 40px;border-top:1px solid #E5E7EB;">
              <p style="margin:0;font-size:12px;color:#9CA3AF;text-align:center;">
                <a href="https://www.beassist-link.com" style="color:#8F00FF;text-decoration:none;">beassist-link.com</a>
                &nbsp;·&nbsp; Email interne : ne pas transférer
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

function confirmationHtml(name: string): string {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Candidature reçue - BeassistLink</title>
</head>
<body style="margin:0;padding:0;background:#F9FAFB;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F9FAFB;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.06);">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#8F00FF,#6200CC);padding:36px 40px 28px;text-align:center;">
              <p style="margin:0;font-size:26px;font-weight:800;color:#ffffff;letter-spacing:-0.5px;">
                Beassist<span style="opacity:0.75;">Link</span>
              </p>
              <p style="margin:8px 0 0;font-size:13px;color:rgba(255,255,255,0.7);">Ton lien unique, ton identité.</p>
            </td>
          </tr>

          <!-- Corps -->
          <tr>
            <td style="padding:40px 40px 32px;">
              <h1 style="margin:0 0 12px;font-size:22px;font-weight:700;color:#111827;">
                Candidature reçue, ${name} ! 🎉
              </h1>
              <p style="margin:0 0 20px;font-size:15px;line-height:1.7;color:#4B5563;">
                Merci d'avoir postulé au programme ambassadeur BeassistLink. Notre équipe examine ta candidature et te répond sous <strong>48 heures</strong>.
              </p>

              <!-- Rappel de l'offre -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#F5F3FF;border-radius:12px;margin-bottom:28px;">
                <tr>
                  <td style="padding:20px 24px;">
                    <p style="margin:0 0 10px;font-size:13px;font-weight:700;color:#7C3AED;">Ce qui t'attend si ta candidature est acceptée :</p>
                    <p style="margin:3px 0;font-size:14px;color:#374151;">✓ Accès complet au plan Pro</p>
                    <p style="margin:3px 0;font-size:14px;color:#374151;">✓ Validité à vie, sans condition supplémentaire</p>
                    <p style="margin:3px 0;font-size:14px;color:#374151;">✓ Toutes les fonctionnalités futures incluses</p>
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 24px;font-size:14px;color:#6B7280;line-height:1.6;">
                En attendant, tu peux déjà créer ton compte gratuit et découvrir la plateforme par toi-même.
              </p>

              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <a href="https://www.beassist-link.com/register" style="display:inline-block;background:linear-gradient(135deg,#8F00FF,#6200CC);color:#ffffff;font-size:15px;font-weight:700;text-decoration:none;padding:14px 36px;border-radius:12px;">
                      Créer mon compte gratuit →
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
                <a href="https://www.beassist-link.com" style="color:#8F00FF;text-decoration:none;">beassist-link.com</a>
                &nbsp;·&nbsp; Une question ? <a href="mailto:contact@beassist-link.com" style="color:#8F00FF;text-decoration:none;">contact@beassist-link.com</a>
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
    const data = schema.parse(body);

    const resend = new Resend(process.env.RESEND_API_KEY);

    // Envoyer les deux emails en parallèle
    const [notif, confirm] = await Promise.all([
      // 1. Notification interne
      resend.emails.send({
        from: FROM,
        to: NOTIFY_TO,
        replyTo: data.email,
        subject: `🎉 Nouvelle candidature partenariat : ${data.name} (${data.platform})`,
        html: candidatureHtml(data),
      }),
      // 2. Confirmation au candidat
      resend.emails.send({
        from: FROM,
        to: data.email,
        subject: "Candidature reçue - Programme ambassadeur BeassistLink",
        html: confirmationHtml(data.name),
      }),
    ]);

    if (notif.error || confirm.error) {
      console.error("[partenariat] Échec envoi emails:", notif.error, confirm.error);
      return NextResponse.json({ error: "Erreur lors de l'envoi de l'email" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[partenariat]", err);
    return NextResponse.json({ error: "Erreur lors de l'envoi" }, { status: 500 });
  }
}
