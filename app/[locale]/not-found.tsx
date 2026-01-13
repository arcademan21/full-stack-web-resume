"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

export default function NotFound() {
  const t = useTranslations("NotFound");

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-background overflow-hidden">
      {/* Grid Background */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-9xl font-bold tracking-tighter sm:text-[12rem] text-primary/10 select-none animate-in fade-in zoom-in duration-1000">
          404
        </h1>
        <div className="space-y-6 -mt-12 sm:-mt-20 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            {t("title")}
          </h2>
          <p className="text-muted-foreground text-lg max-w-[500px]">
            {t("description")}
          </p>
          <Button
            asChild
            size="lg"
            className="gap-2 shadow-lg hover:shadow-primary/25 transition-all"
          >
            <Link href="/">
              <Home className="w-4 h-4" />
              {t("backButton")}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
