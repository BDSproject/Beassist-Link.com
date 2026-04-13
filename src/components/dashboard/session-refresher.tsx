"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";

/**
 * Force un refresh du JWT NextAuth au montage du dashboard.
 * Lit le plan directement depuis l'API DB puis appelle update() avec
 * les vraies valeurs pour garantir la cohérence session ↔ base de données.
 */
export function SessionRefresher() {
  const { update } = useSession();

  useEffect(() => {
    fetch("/api/user/plan")
      .then((r) => r.json())
      .then((data) => {
        if (data.plan) {
          update({ plan: data.plan, username: data.username, name: data.name });
        }
      })
      .catch(() => {/* silencieux */});
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return null;
}
