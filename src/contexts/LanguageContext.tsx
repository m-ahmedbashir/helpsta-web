"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export type Language = "en" | "de";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    comingSoon: "Coming Soon",
    revolutionary: "The Revolutionary",
    mobileApp: "Mobile Application",
    description:
      "Helpsta is coming to revolutionize how we connect and help each other. Be the first to experience the future of instant assistance.",
    stayTuned: "Stay tuned for the launch!",
    appStore: "App Store",
    googlePlay: "Google Play",
    notifyMe: "Notify Me",
    joinWaitlist: "Join Waitlist",
    switchLanguage: "Deutsch",
  },
  de: {
    comingSoon: "Bald Verfügbar",
    revolutionary: "Die Revolutionäre",
    mobileApp: "Mobile Anwendung",
    description:
      "Helpsta wird revolutionieren, wie wir uns vernetzen und einander helfen. Seien Sie der Erste, der die Zukunft der sofortigen Hilfe erlebt.",
    stayTuned: "Bleiben Sie dran für den Launch!",
    appStore: "App Store",
    googlePlay: "Google Play",
    notifyMe: "Benachrichtigen",
    joinWaitlist: "Warteliste Beitreten",
    switchLanguage: "English",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: string): string => {
    return (
      translations[language][key as keyof (typeof translations)["en"]] || key
    );
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
