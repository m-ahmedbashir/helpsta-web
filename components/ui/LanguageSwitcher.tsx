"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import React, { useState } from "react";

interface LanguageSwitcherProps {
  className?: string;
  dropdownClassName?: string;
  optionClassName?: string;
}

const SUPPORTED_LOCALES = [
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "en", label: "English", flag: "🇺🇸" },
];

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  className = "",
  dropdownClassName = "",
  optionClassName = "",
}) => {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const current = SUPPORTED_LOCALES.find((lng) => lng.code === locale) || SUPPORTED_LOCALES[0];

  const handleSwitch = (newLocale: string) => {
    setOpen(false);
    if (locale === newLocale) return;
    let segments = pathname.split("/").filter(Boolean);
    if (SUPPORTED_LOCALES.map(l => l.code).includes(segments[0])) {
      segments[0] = newLocale;
    } else {
      segments = [newLocale, ...segments];
    }
    const newPath = "/" + segments.join("/");
    router.push(newPath);
  };

  return (
    <div className={`relative inline-block ${className}`}
      tabIndex={0}
      onBlur={() => setTimeout(() => setOpen(false), 100)}
    >
      <button
        className={`flex items-center gap-2 px-3 py-1 rounded-full transition-colors bg-white/10 hover:bg-white/20 text-gray-400 min-w-[90px] ${dropdownClassName}`}
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="text-lg">{current.flag}</span>
        <span className="text-xs font-medium">{current.label}</span>
        <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
      </button>
      {open && (
        <ul className="absolute right-0 mt-2 w-36 bg-white text-gray-900 rounded shadow-lg z-50 border border-gray-200" role="listbox">
          {SUPPORTED_LOCALES.map((lng) => (
            <li
              key={lng.code}
              className={`flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-orange-main/80 hover:text-white transition-colors ${optionClassName} ${locale === lng.code ? "bg-orange-main text-white" : ""}`}
              onClick={() => handleSwitch(lng.code)}
              role="option"
              aria-selected={locale === lng.code}
            >
              <span className="text-lg">{lng.flag}</span>
              <span className="text-xs font-medium">{lng.label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
