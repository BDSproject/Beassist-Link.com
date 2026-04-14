import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/database/client";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    select: { plan: true },
  });

  if (user?.plan !== "PRO") {
    return NextResponse.json({ error: "Pro plan required" }, { status: 403 });
  }

  const { customDomain } = await req.json();

  // Allow removing the domain
  if (!customDomain || customDomain.trim() === "") {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (db.user as any).update({
      where: { id: session.user.id },
      data: { customDomain: null },
    });
    return NextResponse.json({ success: true, customDomain: null });
  }

  // Basic domain format validation
  const domainRegex = /^([a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,}$/i;
  if (!domainRegex.test(customDomain.trim())) {
    return NextResponse.json({ error: "Invalid domain format" }, { status: 400 });
  }

  const domain = customDomain.trim().toLowerCase();

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (db.user as any).update({
      where: { id: session.user.id },
      data: { customDomain: domain },
    });
    return NextResponse.json({ success: true, customDomain: domain });
  } catch {
    return NextResponse.json({ error: "Domain already in use" }, { status: 409 });
  }
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const user = await (db.user as any).findUnique({
    where: { id: session.user.id },
    select: { customDomain: true, plan: true },
  });

  return NextResponse.json({ customDomain: user?.customDomain ?? null, plan: user?.plan });
}
