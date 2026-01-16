"use client";

import { useTranslations } from "next-intl";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Languages } from "lucide-react";

export const EducationSection = () => {
  const t = useTranslations();

  return (
    <section
      id="education"
      className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 min-h-screen grid content-center"
    >
      <div className="max-w-7xl min-h-160">
        <h2 className="text-3xl sm:text-4xl font-bold mb-12">
          {t("Education.title")}
        </h2>

        <div className="max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Certification - Highlighted */}
          <Card className="p-6 border-blue-500/30 bg-blue-500/5">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138z"
                  />
                </svg>
              </div>
              <div className="space-y-2">
                <Badge className="bg-blue-500 text-white mb-2">
                  {t("Education.cert_official")}
                </Badge>
                <h3 className="text-xl font-bold">
                  {t("Education.cert_title")}
                </h3>
                <p className="text-muted-foreground">
                  {t("Education.cert_desc")}
                </p>
                <p className="text-sm text-muted-foreground/60">
                  {t("Education.cert_inst")}
                </p>
              </div>
            </div>
          </Card>

          {/* Languages */}
          <Card className="p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-secondary">
                <Languages className="w-6 h-6 text-foreground" />
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-bold">
                  {t("Education.languages_title")}
                </h3>
                <div className="space-y-2">
                  <p className="text-muted-foreground">
                    {t("Education.languages_es")}
                  </p>
                  <p className="text-muted-foreground">
                    {t("Education.languages_en")}
                  </p>
                </div>
                <p className="text-sm text-muted-foreground/60 italic pt-2 border-t border-border/50">
                  {t("Education.languages_note")}
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};
