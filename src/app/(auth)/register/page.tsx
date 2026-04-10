"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { Eye, EyeOff, Mail, Lock, User, AtSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const registerSchema = z.object({
  name: z.string().min(2, "Minimum 2 caractères"),
  username: z
    .string()
    .min(3, "Minimum 3 caractères")
    .max(30, "Maximum 30 caractères")
    .regex(/^[a-z0-9_.-]+$/, "Uniquement lettres minuscules, chiffres, -, _, ."),
  email: z.string().email("Email invalide"),
  password: z
    .string()
    .min(8, "Minimum 8 caractères")
    .regex(/[A-Z]/, "Au moins une majuscule")
    .regex(/[0-9]/, "Au moins un chiffre"),
});

type RegisterForm = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const password = watch("password", "");

  const passwordStrength = () => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  };

  const strengthColors = ["bg-red-400", "bg-orange-400", "bg-yellow-400", "bg-green-400"];
  const strengthLabels = ["Faible", "Moyen", "Bon", "Fort"];

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
        throw new Error(err.message || "Erreur lors de l'inscription");
      }

      toast.success("Compte créé avec succès ! 🎉");
      router.push("/login?registered=true");
    } catch (error: any) {
      toast.error(error.message || "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  const strength = passwordStrength();

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-xl p-8 sm:p-10">
      {/* En-tête */}
      <div className="text-center mb-8">
        <h1 className="text-2xl font-black text-gray-900">
          Créez votre compte 🚀
        </h1>
        <p className="text-gray-500 mt-2 text-sm">
          Gratuit pour toujours · Aucune carte requise
        </p>
      </div>

      {/* Formulaire */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Nom complet"
          type="text"
          placeholder="Julie Dupont"
          leftIcon={<User size={16} />}
          error={errors.name?.message}
          {...register("name")}
        />

        <div>
          <Input
            label="Nom d'utilisateur"
            type="text"
            placeholder="juliedupont"
            leftIcon={
              <div className="flex items-center gap-1 text-xs text-gray-400">
                <AtSign size={14} />
              </div>
            }
            hint="Ce sera votre lien : beassistlink.com/juliedupont"
            error={errors.username?.message}
            {...register("username")}
          />
        </div>

        <Input
          label="Email"
          type="email"
          placeholder="vous@exemple.com"
          leftIcon={<Mail size={16} />}
          error={errors.email?.message}
          {...register("email")}
        />

        <div>
          <Input
            label="Mot de passe"
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
                      i <= strength
                        ? strengthColors[strength - 1]
                        : "bg-gray-100"
                    }`}
                  />
                ))}
              </div>
              {strength > 0 && (
                <p
                  className={`text-xs mt-1 ${
                    strength <= 2 ? "text-orange-500" : "text-green-600"
                  }`}
                >
                  Sécurité : {strengthLabels[strength - 1]}
                </p>
              )}
            </div>
          )}
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          loading={loading}
        >
          Créer mon compte gratuitement
        </Button>

        <p className="text-center text-xs text-gray-400 leading-relaxed">
          En créant un compte, vous acceptez nos{" "}
          <Link href="/terms" className="text-[#8F00FF] hover:underline">
            Conditions d&apos;utilisation
          </Link>{" "}
          et notre{" "}
          <Link href="/privacy" className="text-[#8F00FF] hover:underline">
            Politique de confidentialité
          </Link>
          .
        </p>
      </form>

      {/* Connexion */}
      <p className="text-center text-sm text-gray-500 mt-6">
        Déjà un compte ?{" "}
        <Link
          href="/login"
          className="font-semibold text-[#8F00FF] hover:underline"
        >
          Se connecter
        </Link>
      </p>
    </div>
  );
}
