import { db } from "@/database/client";
import { syncPaymentStatus } from "@/lib/payments";
import { PaymentResult, type PaymentResultData } from "@/components/bio/payment-result";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Paiement | BeassistLink",
  robots: { index: false, follow: false },
};

// Page de retour après paiement. On ne fait pas confiance au fait que le
// payeur revienne : on réinterroge le prestataire pour connaître l'état réel.
export default async function PaymentReturnPage({
  searchParams,
}: {
  searchParams: { p?: string };
}) {
  const paymentId = searchParams.p;

  let data: PaymentResultData = {
    status: "UNKNOWN",
    amount: null,
    currency: null,
    description: null,
    receiptUrl: null,
    username: null,
  };

  if (paymentId) {
    // Idempotent : ne fait rien si le paiement est déjà tranché.
    const synced = await syncPaymentStatus(paymentId);

    if (synced) {
      data = {
        status: synced.status,
        amount: synced.amount,
        currency: synced.currency,
        description: synced.description,
        receiptUrl: synced.receiptUrl,
        username: null,
      };

      const link = synced.bioLinkId
        ? await db.bioLink.findUnique({
            where: { id: synced.bioLinkId },
            select: { bioPage: { select: { username: true } } },
          })
        : null;
      data.username = link?.bioPage.username ?? null;
    }
  }

  return <PaymentResult payment={data} />;
}
