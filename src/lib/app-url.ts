import type { NextRequest } from "next/server";

// URL publique de l'application, utilisée pour construire les URL de retour et
// de notification envoyées aux prestataires de paiement.
export function appBaseUrl(req: NextRequest): string {
  const configured = process.env.NEXTAUTH_URL?.replace(/\/$/, "");
  if (configured) return configured;
  return new URL(req.url).origin;
}
