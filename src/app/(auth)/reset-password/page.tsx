import { Suspense } from "react";
import { ResetPasswordForm } from "./reset-password-form";

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="bg-white rounded-3xl border border-gray-100 shadow-xl p-8 sm:p-10 h-64 animate-pulse" />
      }
    >
      <ResetPasswordForm />
    </Suspense>
  );
}
