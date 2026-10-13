import { notFound } from "next/navigation";
import { Suspense } from "react";
import { SimulationClient } from "@/components/bio/simulation-client";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Simulation de paiement | BeassistLink",
  robots: { index: false, follow: false },
};

export default function SimulationPage() {
  // Absent du registre en production : la page n'existe pas non plus.
  if (process.env.PAYMENT_SIMULATION !== "true") {
    notFound();
  }

  return (
    <Suspense fallback={null}>
      <SimulationClient />
    </Suspense>
  );
}
