"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import React from "react";
import { Button } from '@/components/ui/button';
// We'll use the design system Button for consistent styling

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

  // Determine the next locale to switch to (toggle)
  const other = SUPPORTED_LOCALES.find((l) => l.code !== locale) || SUPPORTED_LOCALES[0];

  const handleClick = () => {
    handleSwitch(other.code);
  };

  return (
    <Button
      type="button"
      variant={"secondary"}
      aria-label={`Switch language to ${other.label}`}
      onClick={handleClick}
      size="sm"
      className={`${className} rounded-full px-3`}
    >
      {other.code.toUpperCase()}
    </Button>
  );
};
