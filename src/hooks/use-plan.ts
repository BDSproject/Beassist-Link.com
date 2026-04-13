"use client";

import { useState, useEffect } from "react";

/**
 * Hook qui récupère le plan de l'utilisateur DIRECTEMENT depuis la base de données
 * via l'API, en contournant complètement le JWT/session qui peut être périmé.
 */
export function usePlan() {
  const [plan, setPlan] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/user/plan")
      .then((r) => r.json())
      .then((data) => {
        if (data.plan) setPlan(data.plan);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return { plan: plan ?? "FREE", loading };
}
