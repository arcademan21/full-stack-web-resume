"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import {
  Code,
  Code2,
  User,
  LayoutTemplate,
  Bot,
  Briefcase,
  GraduationCap,
  Mail,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ModeToggle } from "@/components/mode-toggle";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useActiveSection } from "@/hooks/useActiveSection";

export const Navigation = () => {
  const t = useTranslations();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { key: "about", icon: User },
    { key: "projects", icon: LayoutTemplate },
    { key: "skills", icon: Bot },
    { key: "experience", icon: Briefcase },
    { key: "education", icon: GraduationCap },
    { key: "contact", icon: Mail },
  ];

  // Extract IDs for the hook
  const sectionIds = navItems.map((item) => item.key);
  const activeSection = useActiveSection(sectionIds);

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            {/* Scroll to Top Logo (Desktop Only) */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="hidden lg:flex items-center justify-center p-2 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors group relative w-10 h-10 cursor-pointer"
              aria-label="Scroll to top"
            >
              <Code className="w-6 h-6 text-primary transition-all scale-100 rotate-0 group-hover:scale-0 group-hover:rotate-90 absolute" />
              <Code2 className="w-6 h-6 text-primary transition-all scale-0 -rotate-90 group-hover:scale-110 group-hover:rotate-0 absolute" />
            </button>

            {/* Mobile Navigation Trigger (Mobile Only) */}
            <div className="lg:hidden">
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <button
                    className="flex items-center justify-center p-2 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors group relative w-10 h-10 cursor-pointer"
                    aria-label="Toggle menu"
                  >
                    <Code className="w-6 h-6 text-primary transition-all scale-100 rotate-0 group-hover:scale-0 group-hover:rotate-90 absolute" />
                    <Code2 className="w-6 h-6 text-primary transition-all scale-0 -rotate-90 group-hover:scale-110 group-hover:rotate-0 absolute" />
                  </button>
                </SheetTrigger>
                <SheetContent
                  side="left"
                  hideClose
                  className="border-r border-border/40 w-[50vw] sm:w-[350px] bg-background"
                >
                  {/* Reverse Grid Background */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_top,#4f4f4f2e_1px,transparent_1px)] bg-size-[18px_24px] pointer-events-none -z-10 mask-[linear-gradient(to_bottom,transparent,black)]"></div>

                  <SheetHeader>
                    <SheetTitle className="text-left font-bold">
                      <button
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center justify-center p-2 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors w-10 h-10 cursor-pointer"
                      >
                        <Code2 className="w-6 h-6 text-primary" />
                      </button>
                    </SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col gap-6 mt-12 pl-4">
                    {navItems.map((item) => {
                      const Icon = item.icon;
                      const isActive = activeSection === item.key;
                      return (
                        <button
                          key={item.key}
                          onClick={() => scrollTo(item.key)}
                          className={`flex items-center gap-4 text-2xl font-medium transition-colors text-left cursor-pointer ${
                            isActive
                              ? "text-primary font-bold"
                              : "text-muted-foreground hover:text-foreground"
                          }`}
                        >
                          <Icon
                            className={`w-6 h-6 ${
                              isActive ? "text-primary" : ""
                            }`}
                          />
                          {t(`Navigation.${item.key}`)}
                        </button>
                      );
                    })}
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6 ml-6">
              {navItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => scrollTo(item.key)}
                  className={`text-sm font-medium transition-colors cursor-pointer ${
                    activeSection === item.key
                      ? "text-primary font-bold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {t(`Navigation.${item.key}`)}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <ModeToggle />
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </nav>
  );
};
