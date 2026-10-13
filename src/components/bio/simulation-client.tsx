"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";

// Page de simulation : rejoue ce que ferait la page de paiement du prestataire.
// Elle n'existe que si PAYMENT_SIMULATION === "true" (voir le registre des
// prestataires) et ne doit jamais être exposée en production.

export function SimulationClient() {
  const params = useSearchParams();
  const token = params.get("token") ?? "";
  const amount = params.get("amount") ?? "";
  const currency = params.get("currency") ?? "";
  const label = params.get("label") ?? "";
  const returnUrl = params.get("return_url") ?? "/";
  const cancelUrl = params.get("cancel_url") ?? "/";

  const [pending, setPending] = useState<string | null>(null);

  async function choose(outcome: "COMPLETED" | "FAILED" | "CANCELLED") {
    setPending(outcome);
    try {
      const res = await fetch("/api/payments/simulation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, outcome }),
      });
      const data = await res.json().catch(() => ({}));
      window.location.href =
        outcome === "CANCELLED" ? cancelUrl : (data?.returnUrl ?? returnUrl);
    } catch {
      setPending(null);
    }
  }

  if (!token) {
    return (
      <div className="max-w-md mx-auto px-6 py-20 text-center">
        <p className="text-sm text-gray-500">Token de simulation manquant.</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-6 py-16">
      <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs font-medium text-amber-800">
        Mode simulation. Aucun argent réel n&apos;est en jeu.
      </div>

      <div className="mt-6 rounded-2xl border border-gray-200 p-6 text-center">
        {label && <p className="text-sm text-gray-500">{label}</p>}
        <p className="mt-2 text-3xl font-black text-gray-900">
          {amount} {currency}
        </p>

        <div className="mt-8 space-y-3">
          <button
            type="button"
            onClick={() => choose("COMPLETED")}
            disabled={pending !== null}
            className="w-full rounded-xl bg-[#8F00FF] px-4 py-3 text-sm font-semibold text-white hover:bg-[#7a00db] disabled:opacity-60 inline-flex items-center justify-center gap-2"
          >
            {pending === "COMPLETED" && <Loader2 className="w-4 h-4 animate-spin" />}
            Simuler un paiement réussi
          </button>
          <button
            type="button"
            onClick={() => choose("FAILED")}
            disabled={pending !== null}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-60 inline-flex items-center justify-center gap-2"
          >
            {pending === "FAILED" && <Loader2 className="w-4 h-4 animate-spin" />}
            Simuler un échec
          </button>
          <button
            type="button"
            onClick={() => choose("CANCELLED")}
            disabled={pending !== null}
            className="w-full rounded-xl px-4 py-3 text-sm font-medium text-gray-500 hover:text-gray-900 disabled:opacity-60 inline-flex items-center justify-center gap-2"
          >
            {pending === "CANCELLED" && <Loader2 className="w-4 h-4 animate-spin" />}
            Annuler et revenir
          </button>
        </div>
      </div>
    </div>
  );
}
