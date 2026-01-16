"use client";

// Hooks
import { useMessages, useLocale } from "next-intl";
import { useSectionStepperScroll } from "@/hooks/useSectionStepperScroll";

// Data
import { getResumeData } from "@/data/resumeData";

// Components
import { GameOfLifeGrid } from "@/components/GameOfLifeGrid";
import { ProjectsSection } from "@/components/ProjectsSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { EducationSection } from "@/components/sections/EducationSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

export default function CVPage() {
  const locale = useLocale();
  const messages = useMessages() as any;
  const resumeData = getResumeData(messages);

  useSectionStepperScroll({
    selector: "section",
    topOffsetSelector: "header",
    lockMs: 650,
    excludedIds: ["experience"],
  });

  return (
    <div className="relative min-h-screen bg-background">
      {/* Game of Life Background */}
      <GameOfLifeGrid />

      {/* Grid Background */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:18px_24px] bg-position-[0px_16px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

      {/* Content */}
      <div className="relative z-10 selection:bg-primary/20">
        <Navigation />
        <HeroSection resumeData={resumeData} />
        <AboutSection />
        <ProjectsSection locale={locale} />
        <SkillsSection skills={resumeData.skills} />
        <ExperienceSection />
        <EducationSection />
        <ContactSection />
        <Footer />
      </div>
    </div>
  );
}
