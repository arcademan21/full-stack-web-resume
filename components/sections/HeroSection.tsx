"use client";

import { useTranslations, useLocale } from "next-intl";
import { useTheme } from "next-themes";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Github, Linkedin, Mail, FileDown, FileText } from "lucide-react";
import CodeTyperBackground from "@/components/CodeTyperBackground";
import { ResumePDF } from "@/components/ResumePDF";
import { downloadResumeTXT } from "@/helpers/download";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

// PDF Loading Component
function PDFLoading() {
  const t = useTranslations();
  return (
    <Button disabled className="gap-2">
      <FileDown className="h-4 w-4" />
      {t("Hero.loading")}
    </Button>
  );
}

// Dynamically import PDFDownloadLink
const PDFDownloadLink = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
  {
    ssr: false,
    loading: PDFLoading,
  }
);

interface HeroSectionProps {
  resumeData: any;
}

export const HeroSection = ({ resumeData }: HeroSectionProps) => {
  const t = useTranslations();
  const locale = useLocale();
  const { theme } = useTheme();
  const [isClient, setIsClient] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setMounted(true);
  }, []);

  return (
    <header className="container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16 min-h-screen grid content-center">
      <div className="max-w-7xl min-h-178">
        <div className="flex flex-col lg:flex-row items-start lg:items-start justify-between gap-10 lg:gap-16 mb-6">
          <div className="flex-1">
            <h1 className="text-[2.75rem] sm:text-6xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-balance mb-4">
              <span className="text-[#3f80ff]">Harold</span>y{" "}
              <span className="text-[#f15976]">Arturo</span> Pérez Rodríguez
            </h1>
            <p className="text-xl sm:text-2xl text-primary font-medium">
              {t("Hero.role")}
            </p>
            <div className="flex flex-wrap items-center gap-2 mt-4 mb-6">
              <Badge variant="secondary">
                {t("Hero.highlight_experience")}
              </Badge>
              <Badge variant="secondary">{t("Hero.highlight_fullstack")}</Badge>
              <Badge variant="secondary">
                {t("Hero.highlight_leadership")}
              </Badge>
              <Badge variant="secondary">{t("Hero.highlight_ai")}</Badge>
            </div>

            <div className="flex flex-wrap items-center gap-2 mb-6">
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-6 max-w-92 sm:max-w-2xl">
                {t("Hero.description")}
              </p>

              {/* Social Links */}
              <div className="flex flex-wrap items-center gap-4 mb-8">
                <Button variant="outline" size="sm" asChild>
                  <a
                    href="https://www.linkedin.com/in/haroldyarturo/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gap-2"
                  >
                    <Linkedin className="h-5 w-5" />
                    LinkedIn
                  </a>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <a href="mailto:haroldyarturo@gmail.com" className="gap-2">
                    <Mail className="h-5 w-5" />
                    Email
                  </a>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <a
                    href="https://github.com/ARCADEMAN21"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gap-2"
                  >
                    <Github className="h-5 w-5" />
                    GitHub
                  </a>
                </Button>
              </div>

              <Card className="p-6 bg-accent/50 border-accent w-auto sm:w-full max-w-2xl">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-1">
                      {t("Hero.downloadCV")}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {t("Hero.downloadFormat")}
                    </p>
                  </div>
                  <div className="flex gap-3">
                    {isClient ? (
                      <Button size="lg" className="gap-2" asChild>
                        <PDFDownloadLink
                          document={<ResumePDF data={resumeData} />}
                          fileName="CV_Haroldy_Arturo_Perez_Rodriguez.pdf"
                        >
                          {({ loading }: any) => (
                            <>
                              <FileDown className="h-4 w-4" />
                              {loading
                                ? "Generating..."
                                : t("Hero.downloadPDF")}
                            </>
                          )}
                        </PDFDownloadLink>
                      </Button>
                    ) : (
                      <Button size="lg" disabled className="gap-2">
                        <FileDown className="h-4 w-4" />
                        {t("Hero.downloadPDF")}
                      </Button>
                    )}
                    <Button
                      onClick={() => downloadResumeTXT(resumeData)}
                      variant="outline"
                      size="lg"
                      className="gap-2 bg-transparent cursor-pointer"
                    >
                      <FileText className="h-4 w-4" />
                      {t("Hero.downloadTXT")}
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Photo Placeholder */}
          <div className="relative w-full max-w-md lg:max-w-[500px] aspect-square lg:ml-auto -my-8 lg:my-0">
            <div className="absolute inset-0">
              <CodeTyperBackground
                locale={locale}
                className="absolute inset-0 p-6 sm:p-8"
              />
            </div>
            <img
              src={
                mounted && theme === "dark"
                  ? "/dev-profile-dark.png"
                  : "/dev-profile.png"
              }
              alt="Haroldy Arturo Pérez Rodríguez"
              className="relative z-10 w-full h-full object-cover transition-all duration-500 mask-[linear-gradient(to_bottom,black_50%,transparent_100%)] opacity-95"
            />
            {/* Branding Phrase */}
            <div className="w-full lg:w-auto mt-8">
              <p className="text-sm font-['fantasy'] tracking-wide text-muted-foreground/90 dark:text-foreground/90 leading-relaxed max-w-md mx-4">
                {t.rich("Hero.brand_phrase", {
                  bold: (chunks) => (
                    <span className="font-bold text-foreground">{chunks}</span>
                  ),
                  harold: (chunks) => (
                    <span className="text-[#3f80ff] font-['fantasy'] text-base">
                      {chunks}
                    </span>
                  ),
                  arturo: (chunks) => (
                    <span className="text-[#f15976] font-['fantasy'] text-base">
                      {chunks}
                    </span>
                  ),
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
