"use client";

import { useState, useEffect } from "react";
import { Globe, CheckCircle2, AlertTriangle, Loader2, ExternalLink, Trash2, Lock } from "lucide-react";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { useLanguage } from "@/contexts/language-context";
import { usePlan } from "@/hooks/use-plan";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function CustomDomainSection() {
  const { t } = useLanguage();
  const d = t.dashboard.settings;
  const { plan } = usePlan();
  const isPro = plan === "PRO";

  const [domain, setDomain] = useState("");
  const [savedDomain, setSavedDomain] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [removing, setRemoving] = useState(false);

  useEffect(() => {
    fetch("/api/user/domain")
      .then((r) => r.json())
      .then((data) => setSavedDomain(data.customDomain ?? null));
  }, []);

  const saveDomain = async () => {
    if (!domain.trim()) return;
    setSaving(true);
    try {
      const res = await fetch("/api/user/domain", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customDomain: domain }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setSavedDomain(data.customDomain);
      setDomain("");
      toast.success(d.domainSaved);
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : d.domainError);
    } finally {
      setSaving(false);
    }
  };

  const removeDomain = async () => {
    setRemoving(true);
    try {
      const res = await fetch("/api/user/domain", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customDomain: "" }),
      });
      if (!res.ok) throw new Error();
      setSavedDomain(null);
      toast.success(d.domainRemoved);
    } catch {
      toast.error(d.domainError);
    } finally {
      setRemoving(false);
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-9 h-9 bg-[#8F00FF]/10 rounded-xl flex items-center justify-center">
          <Globe className="w-5 h-5 text-[#8F00FF]" />
        </div>
        <div>
          <h2 className="font-semibold text-gray-900 flex items-center gap-2">
            {d.domainTitle}
            {!isPro && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-100 text-amber-700 text-xs font-bold rounded-full">
                <Lock size={10} /> Pro
              </span>
            )}
          </h2>
          <p className="text-sm text-gray-500">{d.domainDesc}</p>
        </div>
      </div>

      {!isPro ? (
        <div className="rounded-xl bg-amber-50 border border-amber-200 p-4">
          <p className="text-sm text-amber-800 font-medium mb-3">{d.domainProOnly}</p>
          <Link href="/dashboard/billing">
            <Button size="sm" style={{ backgroundColor: "#8F00FF" }} className="text-white hover:opacity-90">
              {d.domainUpgrade} →
            </Button>
          </Link>
        </div>
      ) : (
        <>
          {/* DNS instructions */}
          <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 mb-5 space-y-2">
            <p className="text-xs font-bold text-slate-700 uppercase tracking-wide">DNS Setup</p>
            <p className="text-sm text-slate-600">{d.domainStep1}</p>
            <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-3 py-2 font-mono text-sm text-slate-800">
              <Globe size={14} className="text-slate-400 shrink-0" />
              <span>CNAME → <strong>cname.vercel-dns.com</strong></span>
            </div>
            <p className="text-xs text-slate-500">{d.domainStep3}</p>
          </div>

          {/* Active domain */}
          {savedDomain && (
            <div className="flex items-center justify-between gap-3 mb-4 p-3 bg-green-50 border border-green-200 rounded-xl">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-green-600 shrink-0" />
                <div>
                  <p className="text-xs text-green-700 font-medium">{d.domainActive}</p>
                  <a href={`https://${savedDomain}`} target="_blank" rel="noopener noreferrer"
                    className="text-sm font-semibold text-green-800 hover:underline flex items-center gap-1">
                    {savedDomain}
                    <ExternalLink size={12} />
                  </a>
                </div>
              </div>
              <Button
                size="sm"
                variant="outline"
                loading={removing}
                onClick={removeDomain}
                className="text-red-600 border-red-200 hover:bg-red-50"
              >
                <Trash2 size={14} className="mr-1" />
                {d.domainRemove}
              </Button>
            </div>
          )}

          {/* Domain input */}
          {!savedDomain && (
            <div className="flex gap-2">
              <div className="flex-1">
                <Input
                  label={d.domainLabel}
                  placeholder={d.domainPlaceholder}
                  value={domain}
                  onChange={(e) => setDomain(e.target.value.toLowerCase())}
                  onKeyDown={(e) => e.key === "Enter" && saveDomain()}
                />
              </div>
              <div className="flex items-end">
                <Button
                  onClick={saveDomain}
                  loading={saving}
                  disabled={!domain.trim()}
                  style={{ backgroundColor: "#8F00FF" }}
                  className="text-white hover:opacity-90 disabled:opacity-50"
                >
                  {saving ? <Loader2 size={16} className="animate-spin" /> : d.domainSave}
                </Button>
              </div>
            </div>
          )}

          {/* Warning */}
          <div className="mt-4 flex items-start gap-2 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-3">
            <AlertTriangle size={14} className="shrink-0 mt-0.5" />
            <p>
              {`Your domain must point to BeassistLink's servers via CNAME before it will resolve. On Vercel, the domain also needs to be added to the project settings.`}
            </p>
          </div>
        </>
      )}
    </Card>
  );
}
