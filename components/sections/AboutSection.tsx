"use client";

import { useTranslations } from "next-intl";
import HHKB3D from "@/components/hhkb-3d";
import { Quote } from "lucide-react";

export const AboutSection = () => {
  const t = useTranslations();

  return (
    <section
      id="about"
      className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 min-h-screen grid content-center"
    >
      <div className="max-w-7xl min-h-160 mt-12 lg:mt-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end">
          <div className="flex flex-col gap-6 self-baseline">
            <h2 className="text-3xl sm:text-4xl font-bold">
              {t("About.title")}
            </h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-muted-foreground leading-relaxed">
                {t.rich("About.p1", {
                  strong: (chunks) => (
                    <strong className="text-foreground font-bold">
                      {chunks}
                    </strong>
                  ),
                })}
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                {t.rich("About.p2", {
                  strong: (chunks) => (
                    <strong className="text-foreground font-bold">
                      {chunks}
                    </strong>
                  ),
                })}
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                {t.rich("About.p3", {
                  strong: (chunks) => (
                    <strong className="text-foreground font-bold">
                      {chunks}
                    </strong>
                  ),
                })}
              </p>
            </div>
          </div>
          <div className="relative flex justify-center lg:justify-start w-full h-64 sm:h-80 lg:h-96">
            <HHKB3D />
          </div>
        </div>

        <div className="mt-12 w-full relative">
          <div className="absolute -top-7 left-4 text-blue-500/20">
            <Quote size={48} />
          </div>
          <div className="bg-blue-500/5 border-l-4 border-blue-500/40 p-6 md:p-8">
            <p className="text-blue-900/80 dark:text-blue-100/80 leading-relaxed italic relative z-10 font-light text-lg">
              {t("About.quote")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
