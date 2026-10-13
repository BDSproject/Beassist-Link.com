import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/database/client";
import { z } from "zod";
import {
  PROVIDERS,
  decryptCredentials,
  encryptCredentials,
  getProvider,
  maskSecret,
} from "@/lib/payments";

const createSchema = z.object({
  provider: z.string().trim().min(1).max(40),
  label: z.string().trim().max(60).optional(),
  mode: z.enum(["SANDBOX", "LIVE"]).default("SANDBOX"),
  // Les champs dépendent du prestataire : la validation fine est faite plus bas
  // à partir de la liste déclarée par l'adaptateur.
  credentials: z.record(z.string().trim().max(300)).default({}),
  verify: z.boolean().default(true),
});

// GET — liste des comptes marchands du créateur. Aucun secret ne sort d'ici.
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ message: "Non autorisé" }, { status: 401 });
  }

  const accounts = await db.paymentAccount.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      provider: true,
      label: true,
      mode: true,
      active: true,
      createdAt: true,
      credentials: true,
      _count: { select: { payments: true } },
    },
  });

  return NextResponse.json({
    providers: PROVIDERS.map((p) => ({
      id: p.id,
      label: p.label,
      supportedCurrencies: p.supportedCurrencies,
      credentialFields: p.credentialFields,
    })),
    accounts: accounts.map((a) => {
      let hint: Record<string, string> = {};
      try {
        const creds = decryptCredentials<Record<string, string>>(a.credentials);
        hint = Object.fromEntries(
          Object.entries(creds).map(([k, v]) => [k, maskSecret(String(v ?? ""))])
        );
      } catch {
        hint = {};
      }
      return {
        id: a.id,
        provider: a.provider,
        providerLabel: getProvider(a.provider)?.label ?? a.provider,
        label: a.label,
        mode: a.mode,
        active: a.active,
        createdAt: a.createdAt,
        paymentsCount: a._count.payments,
        hint,
      };
    }),
  });
}

// POST — enregistre (ou remplace) le compte marchand du créateur.
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ message: "Non autorisé" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ message: "Requête invalide" }, { status: 400 });
  }

  const parsed = createSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { message: "Identifiants incomplets", errors: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const { provider: providerId, label, mode, credentials, verify } = parsed.data;
  const provider = getProvider(providerId);
  if (!provider) {
    return NextResponse.json({ message: "Prestataire inconnu" }, { status: 400 });
  }

  // Tous les champs annoncés par le prestataire doivent être fournis.
  const missing = provider.credentialFields.filter((f) => !credentials[f.key]);
  if (missing.length > 0) {
    return NextResponse.json(
      { message: `Champs manquants : ${missing.map((f) => f.label).join(", ")}` },
      { status: 400 }
    );
  }

  if (verify && provider.verifyCredentials) {
    const result = await provider.verifyCredentials({ credentials, mode });
    if (!result.ok) {
      return NextResponse.json({ message: result.message, verification: result }, { status: 400 });
    }
  }

  const providerKind = providerId as "PAYDUNYA" | "SIMULATION";

  // Un seul compte actif par prestataire : on désactive les précédents.
  await db.paymentAccount.updateMany({
    where: { userId: session.user.id, provider: providerKind },
    data: { active: false },
  });

  const account = await db.paymentAccount.create({
    data: {
      userId: session.user.id,
      provider: providerKind,
      label: label || provider.label,
      mode,
      credentials: encryptCredentials(credentials),
      active: true,
    },
    select: { id: true, provider: true, label: true, mode: true, active: true, createdAt: true },
  });

  return NextResponse.json({ account, currencyNote: provider.supportedCurrencies }, { status: 201 });
}

// DELETE — supprime un compte marchand. Les paiements déjà enregistrés sont
// conservés (paymentAccountId passe à null) pour ne pas perdre l'historique.
export async function DELETE(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ message: "Non autorisé" }, { status: 401 });
  }

  const id = new URL(req.url).searchParams.get("id");
  if (!id) {
    return NextResponse.json({ message: "Identifiant manquant" }, { status: 400 });
  }

  const existing = await db.paymentAccount.findFirst({
    where: { id, userId: session.user.id },
    select: { id: true },
  });
  if (!existing) {
    return NextResponse.json({ message: "Compte introuvable" }, { status: 404 });
  }

  await db.paymentAccount.delete({ where: { id: existing.id } });
  return NextResponse.json({ ok: true });
}
