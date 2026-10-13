"use client";

import { useState, type ReactNode } from "react";
import { Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { useLanguage } from "@/contexts/language-context";

interface PayButtonProps {
  linkId: string;
  /** false => le créateur n'a pas connecté de compte : on garde le lien simple */
  enabled: boolean;
  className?: string;
  children: ReactNode;
}

/**
 * Déclenche la création d'une facture chez le prestataire du créateur puis
 * redirige le payeur vers la page de paiement.
 *
 * Aucun montant ne transite par ce composant : le serveur relit le montant en
 * base à partir de l'identifiant du lien.
 */
export function PayButton({ linkId, enabled, className, children }: PayButtonProps) {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);

  if (!enabled) return <>{children}</>;

  async function handleClick() {
    if (loading) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/pay/${linkId}`, { method: "POST" });
      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data?.checkoutUrl) {
        toast.error(data?.message || t.pay.unavailable);
        setLoading(false);
        return;
      }

      // On garde le bouton en chargement : la navigation va suivre.
      window.location.href = data.checkoutUrl as string;
    } catch {
      toast.error(t.pay.networkError);
      setLoading(false);
    }
  }

  return (
    <button type="button" onClick={handleClick} disabled={loading} className={className}>
      <span className="relative flex items-center justify-center w-full">
        {children}
        {loading && (
          <span className="absolute inset-0 flex items-center justify-center bg-black/10 rounded-[inherit]">
            <Loader2 className="w-5 h-5 animate-spin" />
          </span>
        )}
      </span>
    </button>
  );
}
