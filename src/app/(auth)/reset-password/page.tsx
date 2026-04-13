import dynamic from "next/dynamic";

const ResetPasswordForm = dynamic(
  () =>
    import("./reset-password-form").then((m) => ({
      default: m.ResetPasswordForm,
    })),
  {
    ssr: false,
    loading: () => (
      <div className="bg-white rounded-3xl border border-gray-100 shadow-xl p-8 sm:p-10 h-64 animate-pulse" />
    ),
  }
);

export default function ResetPasswordPage() {
  return <ResetPasswordForm />;
}
