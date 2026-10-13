import { db } from "@/database/client";
import { syncPaymentStatus } from "@/lib/payments";
import { PaymentResult, type PaymentResultData } from "@/components/bio/payment-result";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Paiement annulé | BeassistLink",
  robots: { index: false, follow: false },
};

// Le payeur a quitté le tunnel de paiement. On vérifie quand même l'état réel :
// si le prestataire considère le paiement comme abouti, on ne va pas afficher
// un mensonge au payeur.
export default async function PaymentCancelPage({
  searchParams,
}: {
  searchParams: { p?: string };
}) {
  const paymentId = searchParams.p;

  let data: PaymentResultData = {
    status: "CANCELLED",
    amount: null,
    currency: null,
    description: null,
    receiptUrl: null,
    username: null,
  };

  if (paymentId) {
    const synced = await syncPaymentStatus(paymentId);
    if (synced) {
      data = {
        status: synced.status === "COMPLETED" ? "COMPLETED" : "CANCELLED",
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
