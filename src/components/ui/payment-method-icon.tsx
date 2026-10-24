import {
  Banknote,
  CreditCard,
  Smartphone,
  Wallet,
  Waves,
  type LucideIcon,
} from "lucide-react";
import { getPaymentMethod } from "@/lib/payment";

const ICONS: Record<string, LucideIcon> = {
  wallet: Wallet,
  waves: Waves,
  smartphone: Smartphone,
  card: CreditCard,
  banknote: Banknote,
};

/**
 * Icône monochrome neutre d'une méthode de paiement. Remplace les emojis
 * colorés : la reconnaissance passe par le libellé, l'icône ne fait que
 * signaler « c'est un moyen de paiement », dans un seul style de trait.
 */
export function PaymentMethodIcon({
  method,
  className,
}: {
  method?: string | null;
  className?: string;
}) {
  const Icon = ICONS[getPaymentMethod(method).icon] ?? Banknote;
  return <Icon className={className} aria-hidden="true" />;
}
