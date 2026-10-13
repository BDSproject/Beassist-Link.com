"use client";

import { useCallback, useEffect, useState } from "react";
import {
  AlertCircle,
  CheckCircle2,
  ExternalLink,
  Loader2,
  RefreshCw,
  ShieldCheck,
  Trash2,
  Wallet,
} from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/language-context";
import { formatAmount } from "@/lib/payment";

interface PaymentAccountView {
  id: string;
  provider: string;
  providerLabel: string;
  label: string | null;
  mode: "SANDBOX" | "LIVE";
  active: boolean;
  createdAt: string;
  paymentsCount: number;
  hint: Record<string, string>;
}

interface ProviderView {
  id: string;
  label: string;
  supportedCurrencies: string[];
  credentialFields: { key: string; label: string; hint?: string; secret?: boolean }[];
}

interface PaymentRow {
  id: string;
  amount: number;
  currency: string;
  status: "PENDING" | "COMPLETED" | "FAILED" | "CANCELLED";
  description: string | null;
  payerName: string | null;
  payerPhone: string | null;
  receiptUrl: string | null;
  createdAt: string;
  paidAt: string | null;
  bioLink: { title: string } | null;
}

const EMPTY_FORM: Record<string, string> = {};

export default function PaymentsPage() {
  const { t, lang } = useLanguage();
  const d = t.dashboard.payments;

  const [loading, setLoading] = useState(true);
  const [accounts, setAccounts] = useState<PaymentAccountView[]>([]);
  const [providers, setProviders] = useState<ProviderView[]>([]);
  const [payments, setPayments] = useState<PaymentRow[]>([]);
  const [totals, setTotals] = useState<{
    completedCount: number;
    completedAmountByCurrency: Record<string, number>;
    pendingCount: number;
  } | null>(null);

  const [showForm, setShowForm] = useState(false);
  const [mode, setMode] = useState<"SANDBOX" | "LIVE">("SANDBOX");
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const account = accounts.find((a) => a.active) ?? accounts[0] ?? null;
  const [selectedProviderId, setSelectedProviderId] = useState<string | null>(null);
  const provider =
    providers.find((p) => p.id === selectedProviderId) ?? providers[0] ?? null;

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/payments/accounts");
      if (res.ok) {
        const data = await res.json();
        setAccounts(data.accounts ?? []);
        setProviders(data.providers ?? []);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const loadPayments = useCallback(async (refresh = false) => {
    const res = await fetch(`/api/payments${refresh ? "?refresh=1" : ""}`);
    if (res.ok) {
      const data = await res.json();
      setPayments(data.payments ?? []);
      setTotals(data.totals ?? null);
    }
  }, []);

  useEffect(() => {
    load();
    loadPayments(true);
  }, [load, loadPayments]);

  async function handleSave() {
    setSaving(true);
    try {
      const res = await fetch("/api/payments/accounts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          provider: provider?.id,
          mode,
          credentials: Object.fromEntries(
            Object.entries(form).map(([k, v]) => [k, v.trim()])
          ),
          verify: true,
        }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        toast.error(data?.message || d.savedError);
        return;
      }

      toast.success(d.savedOk);
      setForm(EMPTY_FORM);
      setShowForm(false);
      await load();
      await loadPayments();
    } catch {
      toast.error(d.savedError);
    } finally {
      setSaving(false);
    }
  }

  async function handleRemove(id: string) {
    if (!window.confirm(d.removeConfirm)) return;
    const res = await fetch(`/api/payments/accounts?id=${encodeURIComponent(id)}`, {
      method: "DELETE",
    });
    if (res.ok) {
      await load();
    } else {
      toast.error(d.savedError);
    }
  }

  async function handleRefresh() {
    setRefreshing(true);
    await loadPayments(true);
    setRefreshing(false);
  }

  const STATUS_LABEL: Record<PaymentRow["status"], string> = {
    PENDING: d.statusPending,
    COMPLETED: d.statusCompleted,
    FAILED: d.statusFailed,
    CANCELLED: d.statusCancelled,
  };

  const STATUS_TONE: Record<PaymentRow["status"], "success" | "warning" | "danger" | "outline"> = {
    COMPLETED: "success",
    PENDING: "warning",
    FAILED: "danger",
    CANCELLED: "outline",
  };

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Wallet className="w-6 h-6 text-[#8F00FF]" />
          {d.title}
        </h1>
        <p className="text-gray-500 mt-1">{d.subtitle}</p>
      </div>

      {/* Compte d'encaissement */}
      <Card className="p-6 mb-6">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h2 className="font-semibold text-gray-900">{d.accountTitle}</h2>
            <p className="text-sm text-gray-500 mt-1 max-w-xl">{d.accountDesc}</p>
          </div>
          {account ? (
            <Badge variant={account.mode === "LIVE" ? "success" : "warning"} size="sm">
              {account.mode === "LIVE" ? d.modeLive : d.modeSandbox}
            </Badge>
          ) : null}
        </div>

        {loading ? (
          <div className="flex items-center gap-2 text-sm text-gray-500 mt-6">
            <Loader2 className="w-4 h-4 animate-spin" /> …
          </div>
        ) : account && !showForm ? (
          <div className="mt-5">
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
              <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                {d.connectedAs} : {account.providerLabel}
              </div>
              <dl className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                {Object.entries(account.hint).map(([key, value]) => (
                  <div key={key}>
                    <dt className="text-gray-400 uppercase tracking-wide">
                      {provider?.credentialFields.find((f) => f.key === key)?.label ?? key}
                    </dt>
                    <dd className="font-mono text-gray-700 mt-0.5">{value || "—"}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-3 text-xs text-gray-500">
                {account.paymentsCount} {d.paymentsCount}
              </p>
            </div>

            <div className="flex items-center gap-3 mt-4 flex-wrap">
              <Button variant="outline" size="sm" onClick={() => setShowForm(true)}>
                {d.replace}
              </Button>
              <button
                type="button"
                onClick={() => handleRemove(account.id)}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-red-600 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
                {d.remove}
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-5">
            {!showForm && (
              <div className="rounded-xl border border-dashed border-gray-300 p-6 text-center">
                <AlertCircle className="w-6 h-6 text-gray-400 mx-auto" />
                <p className="mt-2 font-medium text-gray-900">{d.noAccountTitle}</p>
                <p className="text-sm text-gray-500 mt-1 max-w-md mx-auto">{d.noAccountDesc}</p>
                <Button className="mt-4" size="sm" onClick={() => setShowForm(true)}>
                  {d.connect}
                </Button>
              </div>
            )}

            {showForm && (
              <div className="rounded-xl border border-gray-200 p-5">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      {d.mode}
                    </label>
                    <div className="inline-flex rounded-xl bg-gray-100 p-1">
                      {(["SANDBOX", "LIVE"] as const).map((m) => (
                        <button
                          key={m}
                          type="button"
                          onClick={() => setMode(m)}
                          className={`px-4 py-2 text-sm font-semibold rounded-lg transition-colors ${
                            mode === m ? "bg-white shadow-sm text-gray-900" : "text-gray-500"
                          }`}
                        >
                          {m === "SANDBOX" ? d.modeSandbox : d.modeLive}
                        </button>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-2">{d.modeHint}</p>
                  </div>
                  {provider && (
                    <div className="text-xs text-gray-500">
                      <p className="font-medium text-gray-700">{d.provider}</p>
                      {providers.length > 1 ? (
                        <select
                          value={provider.id}
                          onChange={(e) => {
                            setSelectedProviderId(e.target.value);
                            setForm(EMPTY_FORM);
                          }}
                          className="mt-1 rounded-lg border border-gray-300 px-2 py-1.5 text-sm text-gray-900"
                        >
                          {providers.map((p) => (
                            <option key={p.id} value={p.id}>
                              {p.label}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <p className="mt-0.5">{provider.label}</p>
                      )}
                      <p className="mt-1">
                        {d.currencies} : {provider.supportedCurrencies.join(", ")}
                      </p>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-5">
                  {provider?.credentialFields.map((field) => (
                    <Input
                      key={field.key}
                      type="password"
                      label={field.label}
                      hint={field.hint}
                      autoComplete="off"
                      value={form[field.key] ?? ""}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, [field.key]: e.target.value }))
                      }
                    />
                  ))}
                </div>

                <div className="flex items-center gap-3 mt-5 flex-wrap">
                  <Button
                    onClick={handleSave}
                    disabled={
                      saving ||
                      !provider ||
                      provider.credentialFields.some((f) => !form[f.key]?.trim())
                    }
                  >
                    {saving ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" /> {d.saving}
                      </>
                    ) : (
                      d.save
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setShowForm(false);
                      setForm(EMPTY_FORM);
                    }}
                    disabled={saving}
                  >
                    {d.cancel}
                  </Button>
                </div>

                <div
                  className={`mt-6 rounded-xl bg-gray-50 border border-gray-200 p-4 ${
                    provider?.id === "PAYDUNYA" ? "" : "hidden"
                  }`}
                >
                  <p className="text-sm font-medium text-gray-900">{d.howToTitle}</p>
                  <ol className="mt-2 space-y-1 text-xs text-gray-600 list-decimal list-inside">
                    <li>{d.howTo1}</li>
                    <li>{d.howTo2}</li>
                    <li>{d.howTo3}</li>
                  </ol>
                  <a
                    href="https://app.paydunya.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-3 text-xs font-semibold text-[#8F00FF] hover:underline"
                  >
                    {d.howToLink}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            )}
          </div>
        )}
      </Card>

      {/* Paiements reçus */}
      <Card className="p-6">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h2 className="font-semibold text-gray-900">{d.receivedTitle}</h2>
            {totals && (
              <p className="text-sm text-gray-500 mt-1">
                {d.totalReceived} :{" "}
                {Object.keys(totals.completedAmountByCurrency).length === 0
                  ? formatAmount(0, lang === "fr" ? "EUR" : "USD")
                  : Object.entries(totals.completedAmountByCurrency)
                      .map(([currency, amount]) => formatAmount(amount, currency))
                      .join(" · ")}
                {totals.pendingCount > 0 ? ` · ${totals.pendingCount} ${d.statusPending}` : ""}
              </p>
            )}
          </div>
          <Button variant="outline" size="sm" onClick={handleRefresh} disabled={refreshing}>
            {refreshing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> {d.refreshing}
              </>
            ) : (
              <>
                <RefreshCw className="w-4 h-4" /> {d.refresh}
              </>
            )}
          </Button>
        </div>

        {payments.length === 0 ? (
          <p className="text-sm text-gray-500 mt-6">{d.receivedEmpty}</p>
        ) : (
          <div className="mt-5 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs uppercase tracking-wide text-gray-400 border-b border-gray-100">
                  <th className="py-2 pr-4 font-medium">{d.colDate}</th>
                  <th className="py-2 pr-4 font-medium">{d.colAmount}</th>
                  <th className="py-2 pr-4 font-medium">{d.colStatus}</th>
                  <th className="py-2 pr-4 font-medium">{d.colLink}</th>
                  <th className="py-2 pr-4 font-medium">{d.colPayer}</th>
                  <th className="py-2 font-medium">{d.receipt}</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((p) => (
                  <tr key={p.id} className="border-b border-gray-50 last:border-0">
                    <td className="py-3 pr-4 text-gray-500 whitespace-nowrap">
                      {new Date(p.createdAt).toLocaleDateString(
                        lang === "fr" ? "fr-FR" : "en-US",
                        { day: "2-digit", month: "short", year: "numeric" }
                      )}
                    </td>
                    <td className="py-3 pr-4 font-semibold text-gray-900 whitespace-nowrap">
                      {formatAmount(p.amount, p.currency)}
                    </td>
                    <td className="py-3 pr-4">
                      <Badge variant={STATUS_TONE[p.status]} size="sm">
                        {STATUS_LABEL[p.status]}
                      </Badge>
                    </td>
                    <td className="py-3 pr-4 text-gray-600 max-w-[220px] truncate">
                      {p.bioLink?.title ?? p.description ?? "—"}
                    </td>
                    <td className="py-3 pr-4 text-gray-600">
                      {p.payerName || p.payerPhone || "—"}
                    </td>
                    <td className="py-3">
                      {p.receiptUrl ? (
                        <a
                          href={p.receiptUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#8F00FF] hover:underline"
                        >
                          {d.receipt}
                        </a>
                      ) : (
                        <span className="text-gray-300">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {accounts.length > 0 && totals && totals.completedCount > 0 && (
        <p className="flex items-center gap-2 text-xs text-gray-400 mt-4">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
          {totals.completedCount} {d.statusCompleted}
        </p>
      )}
    </div>
  );
}
