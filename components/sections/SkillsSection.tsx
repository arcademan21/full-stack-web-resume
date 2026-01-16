"use client";

import { useTranslations } from "next-intl";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  LayoutTemplate,
  Server,
  Bot,
  Database,
  Cloud,
  History,
} from "lucide-react";

interface SkillsSectionProps {
  skills: any;
}

export const SkillsSection = ({ skills }: SkillsSectionProps) => {
  const t = useTranslations();

  const getIcon = (categoryName: string) => {
    // Basic logic to map category name or index to icon
    // Since we rely on translations for names, this is tricky.
    // Better to map by index or add a key to resumeData.
    // Let's assume the order is fixed: Frontend, Backend, AI, DB, Infra, Legacy
    return null; // Handled below
  };

  // We can render based on the 'categories' array from resumeData
  // but we need to map icons.
  const icons = [LayoutTemplate, Server, Bot, Database, Cloud, History];

  return (
    <section
      id="skills"
      className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 min-h-screen grid content-center"
    >
      <div className="max-w-7xl min-h-160">
        <h2 className="text-3xl sm:text-4xl font-bold mb-12">
          {t("Skills.title")}
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {skills.categories.map((cat: any, index: number) => {
            const Icon = icons[index] || LayoutTemplate;

            return (
              <Card key={index} className="p-6">
                <div className="flex items-start justify-between gap-3 flex-wrap mb-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="p-2 bg-secondary rounded-lg">
                      <Icon className="h-6 w-6 text-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold leading-tight min-w-0">
                      {cat.name}
                    </h3>
                  </div>
                  {/* Highlight AI & Backend badges if matches index */}
                  {index === 2 && ( // AI
                    <Badge
                      variant="secondary"
                      className="shrink-0 whitespace-nowrap text-[10px] sm:text-xs bg-blue-500/10 text-blue-700 dark:bg-blue-500/20 dark:text-blue-200 hover:bg-blue-500/20 dark:hover:bg-blue-500/30 border-blue-500/30 border"
                    >
                      {t("Skills.highlight")}
                    </Badge>
                  )}
                  {index === 1 && ( // Backend
                    <Badge
                      variant="secondary"
                      className="shrink-0 whitespace-nowrap text-[10px] sm:text-xs bg-blue-500/10 text-blue-700 dark:bg-blue-500/20 dark:text-blue-200 hover:bg-blue-500/20 dark:hover:bg-blue-500/30 border-blue-500/30 border"
                    >
                      {t("Skills.specialty")}
                    </Badge>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((item: string, i: number) => (
                    <Badge key={i} variant="secondary">
                      {item}
                    </Badge>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
