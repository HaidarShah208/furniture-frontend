"use client";

import { createContext, useContext, useState, useCallback, useMemo } from "react";
import type { Language, Direction, LanguageContextType } from "@/types/common";
import { translations } from "@/data/translations";

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

function getNestedValue(obj: Record<string, unknown>, path: string): string {
  const keys = path.split(".");
  let current: unknown = obj;
  for (const key of keys) {
    if (current && typeof current === "object" && key in (current as Record<string, unknown>)) {
      current = (current as Record<string, unknown>)[key];
    } else {
      return path;
    }
  }
  return typeof current === "string" ? current : path;
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  const direction: Direction = language === "ur" ? "rtl" : "ltr";

  const t = useCallback(
    (key: string): string => {
      return getNestedValue(
        translations[language] as unknown as Record<string, unknown>,
        key
      );
    },
    [language]
  );

  const value = useMemo(
    () => ({ language, direction, setLanguage, t }),
    [language, direction, t]
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
