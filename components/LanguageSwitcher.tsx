"use client";

import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Button } from "@/components/ui/button";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const toggleLanguage = () => {
    const nextLocale = locale === "es" ? "en" : "es";
    startTransition(() => {
      // Simple regex replace for the locale, assuming simple path structure like /es or /en/...
      // A robust solution uses next-intl Navigation APIs (Link, useRouter, usePathname)
      // For now, let's use window location replacement or simple href logic for simplicity if router push is tricky with preserved params.

      // Actually, with middleware, simply changing the first segment works.
      const newPath = window.location.pathname.replace(
        `/${locale}`,
        `/${nextLocale}`
      );
      router.push(newPath);
    });
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      disabled={isPending}
      className="font-medium cursor-pointer disabled:cursor-not-allowed"
    >
      {locale === "es" ? "EN" : "ES"}
    </Button>
  );
}
