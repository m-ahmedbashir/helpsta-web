"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { GermanFlag, USFlag } from './FlagIcons';

interface LanguageSwitcherProps {
  className?: string;
  dropdownClassName?: string;
  optionClassName?: string;
}

const SUPPORTED_LOCALES = [
  { 
    code: "de", 
    label: "Deutsch", 
    flag: GermanFlag,
    country: "Germany"
  },
  { 
    code: "en", 
    label: "English", 
    flag: USFlag,
    country: "United States"
  },
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

  const currentLocale = SUPPORTED_LOCALES.find((l) => l.code === locale) || SUPPORTED_LOCALES[0];

  return (
    <Select value={locale} onValueChange={handleSwitch}>
      <SelectTrigger className={`w-[140px] ${className}`}>
        <SelectValue>
          <div className="flex items-center gap-2">
            <currentLocale.flag size={16} />
            <span>{currentLocale.label}</span>
          </div>
        </SelectValue>
      </SelectTrigger>
      <SelectContent className={dropdownClassName}>
        {SUPPORTED_LOCALES.map((localeOption) => (
          <SelectItem 
            key={localeOption.code} 
            value={localeOption.code}
            className={optionClassName}
          >
            <div className="flex items-center gap-2">
              <localeOption.flag size={16} />
              <span>{localeOption.label}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
