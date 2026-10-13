import Link from "next/link";
import { Logo } from "@/components/shared/logo";
import { ArrowLeft } from "lucide-react";

function renderLine(line: string, idx: number) {
  const parts = line.split(/\*\*(.*?)\*\*/g);
  return (
    <span key={idx}>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <strong key={i} className="font-semibold text-gray-900">
            {part}
          </strong>
        ) : (
          part
        )
      )}
    </span>
  );
}

export function LegalDoc({
  title,
  updatedAt,
  sections,
}: {
  title: string;
  updatedAt: string;
  sections: { title: string; content: string[] }[];
}) {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-100 bg-white/90 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/en">
            <Logo size="md" />
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        <Link
          href="/en"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#8F00FF] transition-colors mb-10"
        >
          <ArrowLeft size={16} />
          Back to home
        </Link>

        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 mb-3">{title}</h1>
          <p className="text-sm text-gray-400">{updatedAt}</p>
          <div className="mt-4 h-1 w-16 rounded-full bg-[#8F00FF]" />
        </div>

        <div className="mb-12 p-6 rounded-2xl bg-[#F5EBFF] border border-[#EAD6FF]">
          <div className="flex items-start gap-4">
            <div
              className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center text-white font-black text-sm"
              style={{ backgroundColor: "#8F00FF" }}
            >
              B
            </div>
            <div>
              <p className="font-bold text-gray-900">Beassisted SASU</p>
              <p className="text-sm text-gray-600 mt-0.5">SIREN 101 096 154</p>
              <p className="text-sm text-gray-600">9 Rue de Paris, 94450 Limeil-Brévannes, France</p>
            </div>
          </div>
        </div>

        <div className="space-y-12">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                {section.title}
              </h2>
              <div className="space-y-3">
                {section.content.map((line, idx) => (
                  <p key={idx} className="text-gray-600 leading-relaxed text-sm">
                    {renderLine(line, idx)}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-gray-100 text-center">
          <p className="text-xs text-gray-400">© 2026 Beassisted SASU — All rights reserved</p>
          <Link href="/en" className="inline-block mt-3 text-xs text-[#8F00FF] hover:underline">
            ← Back to site
          </Link>
        </div>
      </main>
    </div>
  );
}
