"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { Eye, EyeOff, Mail, Lock, User, AtSign } from "lucide-react";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/language-context";

type RegisterForm = { name: string; username: string; email: string; password: string };

export default function RegisterPage() {
  const router = useRouter();
  const { t, lang } = useLanguage();
  const a = t.auth.register;
  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);

  const registerSchema = useMemo(
    () =>
      z.object({
        name: z.string().min(2, a.nameMin),
        username: z
          .string()
          .min(3, a.usernameMin)
          .max(30, a.usernameMax)
          .regex(/^[a-z0-9_.-]+$/, a.usernameRegex),
        email: z.string().email(a.emailInvalid),
        password: z
          .string()
          .min(8, a.passwordMin)
          .regex(/[A-Z]/, a.passwordUppercase)
          .regex(/[0-9]/, a.passwordNumber),
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [lang]
  );

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const password = watch("password", "");
  const usernameValue = watch("username", "");

  const passwordStrength = () => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  };

  const strengthColors = ["bg-red-400", "bg-orange-400", "bg-yellow-400", "bg-green-400"];

  const onSubmit = async (data: RegisterForm) => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || a.errorGeneral);
      }

      toast.success(a.successRegister);
      router.push("/login?registered=true");
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : a.errorGeneral);
    } finally {
      setLoading(false);
    }
  };

  const strength = passwordStrength();

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-xl p-8 sm:p-10">
      {/* En-tête */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-black text-gray-900">{a.heading}</h1>
        <p className="text-gray-500 mt-2 text-sm">{a.subtitle}</p>
      </div>

      {/* Boutons OAuth */}
      <div className="space-y-3 mb-6">
        <button
          type="button"
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all duration-200"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          {a.continueGoogle}
        </button>
        <button
          type="button"
          onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
          className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-all duration-200"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          {a.continueGithub}
        </button>
      </div>

      {/* Séparateur */}
      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200" />
        </div>
        <div className="relative flex justify-center text-xs text-gray-400 bg-white px-3">
          {a.orEmail}
        </div>
      </div>

      {/* Formulaire */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label={a.nameLabel}
          type="text"
          placeholder={a.namePlaceholder}
          leftIcon={<User size={16} />}
          error={errors.name?.message}
          {...register("name")}
        />

        <div>
          <Input
            label={a.usernameLabel}
            type="text"
            placeholder="juliedupont"
            leftIcon={
              <div className="flex items-center gap-1 text-xs text-gray-400">
                <AtSign size={14} />
              </div>
            }
            hint={a.usernameHint.replace("{username}", usernameValue || "juliedupont")}
            error={errors.username?.message}
            {...register("username")}
          />
        </div>

        <Input
          label={a.emailLabel}
          type="email"
          placeholder="vous@exemple.com"
          leftIcon={<Mail size={16} />}
          error={errors.email?.message}
          {...register("email")}
        />

        <div>
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

          {/* Indicateur de force */}
          {password.length > 0 && (
            <div className="mt-2">
              <div className="flex gap-1 h-1">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className={`flex-1 rounded-full transition-all duration-300 ${
                      i <= strength ? strengthColors[strength - 1] : "bg-gray-100"
                    }`}
                  />
                ))}
              </div>
              {strength > 0 && (
                <p className={`text-xs mt-1 ${strength <= 2 ? "text-orange-500" : "text-green-600"}`}>
                  {a.strengthPrefix} {a.strengthLabels[strength - 1]}
                </p>
              )}
            </div>
          )}
        </div>

        <Button type="submit" variant="primary" size="lg" fullWidth loading={loading}>
          {a.submitBtn}
        </Button>

        <p className="text-center text-xs text-gray-400 leading-relaxed">
          {a.termsText}{" "}
          <Link href="/terms" className="text-[#8F00FF] hover:underline">
            {a.termsLink}
          </Link>{" "}
          {a.privacyConjunction}{" "}
          <Link href="/privacy" className="text-[#8F00FF] hover:underline">
            {a.privacyLink}
          </Link>
          .
        </p>
      </form>

      {/* Connexion */}
      <p className="text-center text-sm text-gray-500 mt-6">
        {a.hasAccount}{" "}
        <Link href="/login" className="font-semibold text-[#8F00FF] hover:underline">
          {a.signInLink}
        </Link>
      </p>
    </div>
  );
}
