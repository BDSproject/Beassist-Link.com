"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { Eye, EyeOff, Lock, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/language-context";

type ResetForm = { password: string; confirm: string };

export default function ResetPasswordPage() {
  const { t, lang } = useLanguage();
  const a = t.auth.resetPassword;
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [success, setSuccess] = useState(false);

  const schema = useMemo(
    () =>
      z
        .object({
          password: z
            .string()
            .min(8, a.passwordMin)
            .regex(/[A-Z]/, a.passwordUppercase)
            .regex(/[0-9]/, a.passwordNumber),
          confirm: z.string(),
        })
        .refine((d) => d.password === d.confirm, {
          message: a.passwordMismatch,
          path: ["confirm"],
        }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [lang]
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetForm>({ resolver: zodResolver(schema) });

  if (!token) {
    return (
      <div className="bg-white rounded-3xl border border-gray-100 shadow-xl p-8 sm:p-10 text-center">
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center">
            <AlertCircle size={28} className="text-red-500" />
          </div>
        </div>
        <h1 className="text-xl font-black text-gray-900 mb-2">{a.invalidToken}</h1>
        <Link href="/forgot-password" className="text-sm font-semibold text-[#8F00FF] hover:underline">
          {a.backToLogin}
        </Link>
      </div>
    );
  }

  const onSubmit = async (data: ResetForm) => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password: data.password }),
      });

      if (!res.ok) {
        const err = await res.json();
        toast.error(err.message || a.errorGeneral);
        return;
      }

      setSuccess(true);
      setTimeout(() => router.push("/login"), 3000);
    } catch {
      toast.error(a.errorGeneral);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-white rounded-3xl border border-gray-100 shadow-xl p-8 sm:p-10 text-center">
        <div className="flex justify-center mb-5">
          <div className="w-16 h-16 rounded-2xl bg-green-50 flex items-center justify-center">
            <CheckCircle2 size={32} className="text-green-500" />
          </div>
        </div>
        <h1 className="text-2xl font-black text-gray-900 mb-3">✅ {a.successMessage}</h1>
        <p className="text-gray-400 text-sm">Redirection automatique…</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-xl p-8 sm:p-10">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-black text-gray-900">{a.heading}</h1>
        <p className="text-gray-500 mt-2 text-sm">{a.subtitle}</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label={a.passwordLabel}
          type={showPwd ? "text" : "password"}
          placeholder="••••••••"
          leftIcon={<Lock size={16} />}
          rightIcon={
            <button
              type="button"
              onClick={() => setShowPwd(!showPwd)}
              className="hover:text-gray-600"
            >
              {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          }
          error={errors.password?.message}
          {...register("password")}
        />

        <Input
          label={a.confirmLabel}
          type={showConfirm ? "text" : "password"}
          placeholder="••••••••"
          leftIcon={<Lock size={16} />}
          rightIcon={
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="hover:text-gray-600"
            >
              {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          }
          error={errors.confirm?.message}
          {...register("confirm")}
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

      <p className="text-center mt-6">
        <Link href="/login" className="text-sm font-semibold text-[#8F00FF] hover:underline">
          {a.backToLogin}
        </Link>
      </p>
    </div>
  );
}
