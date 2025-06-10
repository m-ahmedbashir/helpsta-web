"use client";

import { useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { FaApple, FaGooglePlay } from "react-icons/fa";
import ParticleBackground from "./ParticleBackground";

export default function Home() {
  const { language, setLanguage, t } = useLanguage();

  // Set default language to German on mount
  useEffect(() => {
    setLanguage("de");
    // eslint-disable-next-line
  }, []);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center helpsta-gradient relative overflow-hidden">
      <ParticleBackground />
      {/* Language Switcher */}
      <div className="absolute top-6 right-6 z-10">
        <button
          onClick={() => setLanguage(language === "en" ? "de" : "en")}
          className="bg-white/20 text-white px-4 py-2 rounded-full font-medium shadow hover:bg-white/30 transition-all"
        >
          {t("switchLanguage")}
        </button>
      </div>

      {/* Logo */}
      <div className="mb-8 flex items-center justify-center">
        <div className="rounded-full bg-white/90 w-20 h-20 flex items-center justify-center shadow-lg">
          <span className="text-4xl font-extrabold text-[#ff7c2b] tracking-tight">
            H
          </span>
        </div>
      </div>

      {/* Headline */}
      <h1 className="text-5xl md:text-7xl font-extrabold text-white text-center drop-shadow-lg mb-4 tracking-tight">
        {t("comingSoon")}
      </h1>
      <h2 className="text-2xl md:text-3xl font-semibold text-white/80 text-center mb-10 tracking-tight">
        Helpsta
      </h2>

      {/* App Store Badges with official icons and black background */}
      <div className="flex flex-col sm:flex-row gap-4 mt-2">
        <div className="flex items-center justify-center bg-black text-white px-6 py-3 rounded-xl min-w-[180px] font-semibold text-base gap-2 shadow-lg">
          <FaApple size={24} className="inline-block" />
          <span className="text-left">
            <span className="block text-xs font-normal opacity-80">
              {t("comingSoon")}
            </span>
            <span className="block text-base font-semibold">App Store</span>
          </span>
        </div>
        <div className="flex items-center justify-center bg-black text-white px-6 py-3 rounded-xl min-w-[180px] font-semibold text-base gap-2 shadow-lg">
          <FaGooglePlay size={24} className="inline-block" />
          <span className="text-left">
            <span className="block text-xs font-normal opacity-80">
              {t("comingSoon")}
            </span>
            <span className="block text-base font-semibold">Google Play</span>
          </span>
        </div>
      </div>

      {/* Footer with LinkedIn */}
      <footer className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 text-xs tracking-wide flex flex-col items-center gap-1">
        <span>© {new Date().getFullYear()} Helpsta</span>
        <a
          href="https://www.linkedin.com/company/helpsta/posts/?feedView=all"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-white/80 transition-colors"
        >
          LinkedIn
        </a>
      </footer>
    </main>
  );
}
