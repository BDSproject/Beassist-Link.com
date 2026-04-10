import { Logo } from "@/components/shared/logo";
import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5EBFF] via-white to-white flex flex-col">
      {/* Header */}
      <header className="px-6 py-5">
        <Link href="/">
          <Logo size="md" />
        </Link>
      </header>

      {/* Contenu centré */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>

      {/* Footer minimal */}
      <footer className="px-6 py-4 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} BeassistLink · 
        <Link href="/privacy" className="hover:text-[#8F00FF] ml-1">Confidentialité</Link> · 
        <Link href="/terms" className="hover:text-[#8F00FF] ml-1">Conditions</Link>
      </footer>
    </div>
  );
}
