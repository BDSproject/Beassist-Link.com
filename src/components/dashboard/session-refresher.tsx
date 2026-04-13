"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";

/**
 * Force un refresh du JWT NextAuth au montage du dashboard.
 * Cela garantit que le plan/username lu depuis la DB en JWT callback
 * est bien reflété dans la session côté client (sans déconnexion).
 */
export function SessionRefresher() {
  const { update } = useSession();

  useEffect(() => {
    update();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return null;
}
