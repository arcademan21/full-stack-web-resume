"use client";

import { useTranslations } from "next-intl";

export const Footer = () => {
  const t = useTranslations();
  return (
    <footer className="border-t border-border/40 bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center">
          <p className="text-sm text-muted-foreground text-center">
            © {new Date().getFullYear()} {t("Contact.footer_rights")}
          </p>
        </div>
      </div>
    </footer>
  );
};
