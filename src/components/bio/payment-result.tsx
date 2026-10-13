"use client";

import Link from "next/link";
import { CheckCircle2, Clock, XCircle, AlertCircle, ArrowLeft } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { formatAmount } from "@/lib/payment";

export interface PaymentResultData {
  status: "COMPLETED" | "PENDING" | "FAILED" | "CANCELLED" | "UNKNOWN";
  amount: number | null;
  currency: string | null;
  description: string | null;
  receiptUrl: string | null;
  username: string | null;
}

export function PaymentResult({ payment }: { payment: PaymentResultData }) {
  const { t } = useLanguage();

  const config = {
    COMPLETED: {
      icon: CheckCircle2,
      tone: "text-emerald-600",
      ring: "bg-emerald-50 border-emerald-200",
      message: t.pay.returnCompleted,
    },
    PENDING: {
      icon: Clock,
      tone: "text-amber-600",
      ring: "bg-amber-50 border-amber-200",
      message: t.pay.returnPending,
    },
    FAILED: {
      icon: XCircle,
      tone: "text-red-600",
      ring: "bg-red-50 border-red-200",
      message: t.pay.returnFailed,
    },
    CANCELLED: {
      icon: XCircle,
      tone: "text-red-600",
      ring: "bg-red-50 border-red-200",
      message: t.pay.returnCancelled,
    },
    UNKNOWN: {
      icon: AlertCircle,
      tone: "text-gray-500",
      ring: "bg-gray-50 border-gray-200",
      message: t.pay.returnUnknown,
    },
  }[payment.status];

  const Icon = config.icon;

  return (
    <div className="max-w-md mx-auto px-6 py-16 text-center">
      <div className={`w-16 h-16 mx-auto rounded-2xl border flex items-center justify-center ${config.ring}`}>
        <Icon className={`w-8 h-8 ${config.tone}`} />
      </div>

      <h1 className="mt-6 text-xl font-bold text-gray-900">{t.pay.returnTitle}</h1>
      <p className="mt-2 text-sm text-gray-600">{config.message}</p>

      {payment.amount !== null && payment.amount > 0 && (
        <p className="mt-4 text-2xl font-black text-gray-900">
          {formatAmount(payment.amount, payment.currency)}
        </p>
      )}
      {payment.description && (
        <p className="mt-1 text-sm text-gray-500">{payment.description}</p>
      )}

      <div className="mt-8 flex flex-col items-center gap-3">
        {payment.receiptUrl && (
          <a
            href={payment.receiptUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-[#8F00FF] hover:underline"
          >
            {t.pay.receipt}
          </a>
        )}
        <Link
          href={payment.username ? `/${payment.username}` : "/"}
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {t.pay.returnTo}
        </Link>
      </div>
    </div>
  );
}
