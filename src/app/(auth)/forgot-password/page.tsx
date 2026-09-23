"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, ArrowLeft, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/language-context";

type ForgotForm = { email: string };

export default function ForgotPasswordPage() {
  const { t, lang } = useLanguage();
  const a = t.auth.forgot;
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const schema = useMemo(
    () => z.object({ email: z.string().email(a.emailInvalid) }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [lang]
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotForm>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: ForgotForm) => {
    setLoading(true);
    try {
      await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: data.email }),
      });
      setSent(true);
    } catch {
      setSent(true); // Always show success to prevent email enumeration
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-xl p-8 sm:p-10">
      {sent ? (
        /* Success state */
        <div className="text-center py-4">
          <div className="flex justify-center mb-5">
            <div className="w-16 h-16 rounded-2xl bg-green-50 flex items-center justify-center">
              <CheckCircle2 size={32} className="text-green-500" />
            </div>
          </div>
          <h1 className="text-2xl font-black text-gray-900 mb-3">Email envoyé ✉️</h1>
          <p className="text-gray-500 text-sm leading-relaxed mb-8">{a.successMessage}</p>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#8F00FF] hover:underline"
          >
            <ArrowLeft size={14} />
            {a.backToLogin}
          </Link>
        </div>
      ) : (
        <>
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-black text-gray-900">{a.heading}</h1>
            <p className="text-gray-500 mt-2 text-sm">{a.subtitle}</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label={a.emailLabel}
              type="email"
              placeholder="exemple@exemple.com"
              leftIcon={<Mail size={16} />}
              error={errors.email?.message}
              {...register("email")}
            />

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              loading={loading}
            >
              {a.submitBtn}
            </Button>
          </form>

          {/* Back to login */}
          <p className="text-center mt-6">
            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#8F00FF] hover:underline"
            >
              <ArrowLeft size={14} />
              {a.backToLogin}
            </Link>
          </p>
        </>
      )}
    </div>
  );
}
