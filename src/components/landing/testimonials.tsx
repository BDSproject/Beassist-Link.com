"use client";

import { useLanguage } from "@/contexts/language-context";

const TESTIMONIAL_DATA = [
  { name: "Amira Benali", handle: "@amira.creates", avatar: "A", color: "#E1306C", followers: "127K", platform: "Instagram" },
  { name: "Thomas Mercier", handle: "@thomasmkt", avatar: "T", color: "#8F00FF", followers: "8.4K", platform: "LinkedIn" },
  { name: "Sarah Okonkwo", handle: "@sarah.lifestyle", avatar: "S", color: "#FF0000", followers: "312K", platform: "YouTube" },
  { name: "Lucas Fontaine", handle: "@lucas.tech", avatar: "L", color: "#1DA1F2", followers: "22K", platform: "Twitter/X" },
  { name: "Maya Rousseau", handle: "@maya_art", avatar: "M", color: "#000000", followers: "89K", platform: "TikTok" },
  { name: "Pierre Blanchard", handle: "@pierre.blanchard.dj", avatar: "P", color: "#9146FF", followers: "45K", platform: "Twitch" },
];


export function Testimonials() {
  const { t, lang } = useLanguage();
  return (
    <section className="py-28 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* En-tête */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#F5EBFF] border border-[#EAD6FF] text-sm font-medium text-[#8F00FF] mb-6">
            {t.testimonials.badge}
          </div>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-gray-900 mb-4">
            {t.testimonials.heading1}
            <br />
            {t.testimonials.heading2}
          </h2>
          <p className="text-lg text-gray-500">{t.testimonials.subheading}</p>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {TESTIMONIAL_DATA.map((person, i) => (
            <div
              key={person.handle}
              className="bg-white rounded-2xl p-6 border border-gray-100 hover:border-[#EAD6FF] hover:shadow-md transition-all duration-300"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((s) => (
                  <span key={s} className="text-yellow-400 text-sm">
                    ★
                  </span>
                ))}
              </div>

              {/* Text */}
              <p className="text-gray-700 text-sm leading-relaxed mb-5">
                &ldquo;{t.testimonials.items[i]?.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                  style={{ backgroundColor: person.color }}
                >
                  {person.avatar}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">
                    {person.name}
                  </p>
                  <p className="text-xs text-gray-400">
                    {person.handle} · {person.followers}{" "}
                    {lang === "fr" ? "abonnés" : "followers"} · {person.platform}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
