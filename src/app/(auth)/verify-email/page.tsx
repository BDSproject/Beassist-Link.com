"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { XCircle, Clock, Mail } from "lucide-react";

const btnPrimary =
  "w-full flex items-center justify-center px-6 py-3 text-base font-semibold rounded-xl h-12 bg-[#8F00FF] text-white hover:bg-[#7200CC] transition-colors shadow-[0_4px_20px_rgba(143,0,255,0.3)]";
const btnSecondary =
  "w-full flex items-center justify-center px-6 py-3 text-base font-semibold rounded-xl h-12 bg-black text-white hover:bg-gray-900 transition-colors";

function VerifyEmailContent() {
  const params = useSearchParams();
  const error = params.get("error");
  const email = params.get("email");

  if (error === "expired") {
    return (
      <div className="bg-white rounded-3xl border border-gray-100 shadow-xl p-8 sm:p-10 text-center">
        <div className="flex justify-center mb-5">
          <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center">
            <Clock className="w-8 h-8 text-orange-500" />
          </div>
        </div>
        <h1 className="text-2xl font-black text-gray-900 mb-2">Lien expiré</h1>
        <p className="text-gray-500 text-sm mb-6">
          Ce lien de vérification a expiré (valide 24h). Crée un nouveau compte pour recevoir un nouvel email.
        </p>
        <Link href="/register" className={btnPrimary}>Créer un compte</Link>
      </div>
    );
  }

  if (error === "invalid" || error === "missing") {
    return (
      <div className="bg-white rounded-3xl border border-gray-100 shadow-xl p-8 sm:p-10 text-center">
        <div className="flex justify-center mb-5">
          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
            <XCircle className="w-8 h-8 text-red-500" />
          </div>
        </div>
        <h1 className="text-2xl font-black text-gray-900 mb-2">Lien invalide</h1>
        <p className="text-gray-500 text-sm mb-6">
          Ce lien de vérification est invalide ou a déjà été utilisé.
        </p>
        <div className="flex flex-col gap-3">
          <Link href="/login" className={btnPrimary}>Se connecter</Link>
          <Link href="/register" className={btnSecondary}>Créer un compte</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-xl p-8 sm:p-10 text-center">
      <div className="flex justify-center mb-5">
        <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center">
          <Mail className="w-8 h-8 text-[#8F00FF]" />
        </div>
      </div>
      <h1 className="text-2xl font-black text-gray-900 mb-2">Vérifie ton email</h1>
      <p className="text-gray-500 text-sm mb-2">Un email de confirmation a été envoyé à</p>
      {email && (
        <p className="font-semibold text-gray-800 text-sm mb-4">{decodeURIComponent(email)}</p>
      )}
      <p className="text-gray-400 text-xs mb-8">
        Clique sur le lien dans l&apos;email pour activer ton compte.
        Le lien est valable <strong>24 heures</strong>.
      </p>
      <div className="bg-gray-50 rounded-xl p-4 text-left mb-6">
        <p className="text-xs text-gray-500 font-medium mb-2">Tu n&apos;as pas reçu l&apos;email ?</p>
        <ul className="text-xs text-gray-400 space-y-1 list-disc list-inside">
          <li>Vérifie tes spams / courrier indésirable</li>
          <li>Attends quelques minutes</li>
          <li>L&apos;email vient de <span className="text-gray-600">noreply@beassist-link.com</span></li>
        </ul>
      </div>
      <Link href="/login" className={btnSecondary}>Retour à la connexion</Link>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={null}>
      <VerifyEmailContent />
    </Suspense>
  );
}
