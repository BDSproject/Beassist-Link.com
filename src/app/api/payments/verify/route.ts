import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { z } from "zod";
import { getProvider } from "@/lib/payments";
import { clientIp, rateLimit } from "@/lib/rate-limit";

const schema = z.object({
  provider: z.enum(["PAYDUNYA"]).default("PAYDUNYA"),
  mode: z.enum(["SANDBOX", "LIVE"]).default("SANDBOX"),
  credentials: z.object({
    masterKey: z.string().trim().min(1).max(200),
    privateKey: z.string().trim().min(1).max(200),
    token: z.string().trim().min(1).max(200),
  }),
});

// POST — teste des identifiants marchands sans rien enregistrer.
// Permet de valider les clés avant de les stocker.
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ message: "Non autorisé" }, { status: 401 });
  }

  const limit = rateLimit(`verify-credentials:${session.user.id}:${clientIp(req.headers)}`, 10, 60_000);
  if (!limit.ok) {
    return NextResponse.json(
      { message: "Trop de tentatives. Réessaie dans une minute." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } }
    );
  }

  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ message: "Identifiants incomplets" }, { status: 400 });
  }

  const provider = getProvider(parsed.data.provider);
  if (!provider?.verifyCredentials) {
    return NextResponse.json(
      { message: "Ce prestataire ne permet pas de tester les identifiants" },
      { status: 400 }
    );
  }

  const result = await provider.verifyCredentials({
    credentials: parsed.data.credentials,
    mode: parsed.data.mode,
  });

  return NextResponse.json(result, { status: result.ok ? 200 : 400 });
}
