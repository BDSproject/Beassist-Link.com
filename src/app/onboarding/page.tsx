"use client";

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { User, Building2, MapPin, Mail, ArrowRight, LogOut, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const onboardingSchema = z.object({
  name: z.string().min(2, "Le nom complet est requis (minimum 2 caractères)"),
  company: z.string().optional(),
  billingAddress: z.string().optional(),
});

type OnboardingForm = z.infer<typeof onboardingSchema>;

export default function OnboardingPage() {
  const { data: session, update: updateSession, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<"form" | "success">("form");

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
    if (status === "authenticated" && session?.user?.onboardingCompleted !== false) {
      router.push("/dashboard");
    }
  }, [status, session, router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<OnboardingForm>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      name: session?.user?.name || "",
    },
  });

  const nameValue = watch("name");

  const onSubmit = async (data: OnboardingForm) => {
    setLoading(true);
    try {
      const res = await fetch("/api/user/onboarding", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name.trim(),
          company: data.company?.trim() || undefined,
          billingAddress: data.billingAddress?.trim() || undefined,
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Erreur lors de la sauvegarde");
      }

      await updateSession({ onboardingCompleted: true });

      setStep("success");
      setTimeout(() => {
        router.push("/dashboard");
      }, 1500);
    } catch (err: any) {
      toast.error(err.message || "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-50 to-purple-50">
        <div className="w-8 h-8 border-4 border-violet-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (step === "success") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-50 to-purple-50 p-4">
        <div className="bg-white rounded-3xl border border-gray-100 shadow-xl p-10 text-center max-w-md w-full">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Profil complété !</h2>
          <p className="text-gray-500">Redirection vers ton tableau de bord…</p>
          <div className="mt-6 w-8 h-8 border-4 border-violet-600 border-t-transparent rounded-full animate-spin mx-auto" />
        </div>
      </div>
    );
  }

  return (
    <>
      <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-violet-50 via-purple-50 to-white p-4">
        {/* Logo */}
        <header className="mb-8 flex flex-col items-center">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-600 to-purple-700 flex items-center justify-center shadow-lg mb-4">
            <span className="text-white font-bold text-2xl">B</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Bienvenue !</h1>
          <p className="text-gray-500 mt-2 text-center max-w-sm">
            Complète ton profil pour accéder à ton espace et faciliter la facturation en toute simplicité.
          </p>
        </header>

        {/* Card */}
        <section
          aria-labelledby="onboarding-form-title"
          className="bg-white rounded-3xl border border-gray-100 shadow-xl p-8 sm:p-10 w-full max-w-md"
        >
          {/* Email read-only */}
          <div className="mb-6 p-4 bg-violet-50 rounded-2xl border border-violet-100 flex items-center gap-3">
            <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center shadow-sm flex-shrink-0">
              <Mail className="w-4 h-4 text-violet-600" />
            </div>
            <div className="min-w-0">
              <p className="text-xs text-violet-500 font-medium mb-0.5">Adresse email (compte Google/GitHub)</p>
              <p className="text-sm font-semibold text-gray-900 truncate">{session?.user?.email}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" aria-label="Formulaire d'onboarding">
            {/* Nom complet */}
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                Nom complet <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                <Input
                  id="name"
                  {...register("name")}
                  placeholder="Prénom Nom"
                  className={`pl-10 h-12 rounded-xl border-gray-200 focus:border-violet-500 focus:ring-violet-500 ${errors.name ? "border-red-400 focus:border-red-400 focus:ring-red-400" : ""}`}
                  autoFocus
                  aria-invalid={errors.name ? "true" : "false"}
                />
              </div>
              {errors.name && (
                <p className="mt-1.5 text-xs text-red-500" role="alert">{errors.name.message}</p>
              )}
            </div>

            {/* Société */}
            <div>
              <label htmlFor="company" className="block text-sm font-semibold text-gray-700 mb-2">
                Société <span className="text-gray-400 font-normal text-xs">(optionnel)</span>
              </label>
              <div className="relative">
                <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                <Input
                  id="company"
                  {...register("company")}
                  placeholder="Nom de ta société"
                  className="pl-10 h-12 rounded-xl border-gray-200 focus:border-violet-500 focus:ring-violet-500"
                />
              </div>
            </div>

            {/* Adresse de facturation */}
            <div>
              <label htmlFor="billingAddress" className="block text-sm font-semibold text-gray-700 mb-2">
                Adresse de facturation <span className="text-gray-400 font-normal text-xs">(optionnel)</span>
              </label>
              <div className="relative">
                <MapPin className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400 pointer-events-none" />
                <textarea
                  id="billingAddress"
                  {...register("billingAddress")}
                  placeholder="Rue, Ville, Code postal, Pays"
                  rows={3}
                  className="w-full pl-10 pt-3 pr-4 pb-3 rounded-xl border border-gray-200 text-sm focus:border-violet-500 focus:ring-2 focus:ring-violet-500 focus:outline-none resize-none transition-colors placeholder:text-gray-400"
                />
              </div>
              <p className="mt-1 text-xs text-gray-400">
                Ces informations apparaîtront sur tes factures Stripe.
              </p>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={loading || !nameValue?.trim()}
              className="w-full h-12 rounded-xl bg-gradient-to-r from-violet-600 to-purple-700 hover:from-violet-700 hover:to-purple-800 text-white font-semibold text-base shadow-md shadow-violet-200 transition-all mt-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Sauvegarde…</span>
                </>
              ) : (
                <>
                  <span>Accéder à mon espace</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </form>

          {/* Logout link */}
          <div className="mt-6 text-center">
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="text-xs text-gray-400 hover:text-gray-600 transition-colors flex items-center gap-1.5 mx-auto"
            >
              <LogOut className="w-3.5 h-3.5" aria-hidden="true" />
              Se déconnecter et changer de compte
            </button>
          </div>
        </section>

        {/* Footer note */}
        <footer className="mt-6 text-xs text-gray-400 text-center max-w-sm">
          Ces informations sont sécurisées et utilisées uniquement à des fins de facturation.
        </footer>
      </main>
    </>
  );
}