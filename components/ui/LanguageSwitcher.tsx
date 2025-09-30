"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import React from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

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

  const handleSwitch = (newLocale: string) => {
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
    <Select value={locale} onValueChange={handleSwitch}>
      <SelectTrigger className={`min-w-[120px] ${dropdownClassName} ${className}`} aria-label="Select language">
        <SelectValue>
          <span className="flex items-center gap-2">
            {SUPPORTED_LOCALES.find((lng) => lng.code === locale)?.flag}
            <span className="text-xs font-medium">
              {SUPPORTED_LOCALES.find((lng) => lng.code === locale)?.label}
            </span>
          </span>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {SUPPORTED_LOCALES.map((lng) => (
          <SelectItem key={lng.code} value={lng.code} className={`flex items-center gap-2 ${optionClassName}`}>
            <span className="text-lg">{lng.flag}</span>
            <span className="text-xs font-medium">{lng.label}</span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
