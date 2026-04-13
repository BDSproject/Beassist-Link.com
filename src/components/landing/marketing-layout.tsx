import Link from "next/link";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";

interface MarketingLayoutProps {
  category: string;
  title: string;
  description: string;
  updatedAt?: string;
  children: React.ReactNode;
}

export function MarketingLayout({
  category,
  title,
  description,
  updatedAt,
  children,
}: MarketingLayoutProps) {
  return (
    <main className="overflow-hidden bg-white min-h-screen">
      <Navbar />

      <section className="pt-28 pb-8 border-b border-gray-100 bg-gradient-to-b from-[#F9F5FF] to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <p className="inline-flex px-3 py-1 rounded-full bg-[#8F00FF]/10 text-[#8F00FF] text-xs font-semibold tracking-wide uppercase">
            {category}
          </p>
          <h1 className="mt-4 text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            {title}
          </h1>
          <p className="mt-4 text-base sm:text-lg text-gray-600 leading-relaxed">
            {description}
          </p>
          {updatedAt && (
            <p className="mt-3 text-sm text-gray-400">Dernière mise à jour: {updatedAt}</p>
          )}
        </div>
      </section>

      <section className="py-10 sm:py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">{children}</div>
      </section>

      <section className="pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="rounded-2xl border border-[#8F00FF]/20 bg-[#8F00FF]/5 p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Prêt à passer à l'action ?</h2>
              <p className="text-sm text-gray-600 mt-1">
                Créez votre lien bio en quelques minutes et commencez à convertir vos visiteurs.
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                href="/register"
                className="px-5 py-2.5 rounded-xl bg-[#8F00FF] text-white font-semibold hover:bg-[#7200CC] transition-colors"
              >
                Commencer
              </Link>
              <Link
                href="/contact"
                className="px-5 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
              >
                Nous contacter
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
