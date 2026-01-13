"use client";

import dynamic from "next/dynamic";
import HHKB3D from "@/components/hhkb-3d";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useState, useEffect } from "react";
import { useTranslations, useMessages, useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ModeToggle } from "@/components/mode-toggle";
import { ResumePDF } from "@/components/ResumePDF";
import CodeTyperBackground from "@/components/CodeTyperBackground";
import {
  Github,
  Linkedin,
  Mail,
  FileDown,
  FileText,
  LayoutTemplate,
  Server,
  Bot,
  Database,
  Cloud,
  History,
  Quote,
  Code,
  Code2,
  User,
  Briefcase,
  GraduationCap,
  Languages,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

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

// Dynamically import PDFDownloadLink to avoid SSR issues
const PDFDownloadLink = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
  {
    ssr: false,
    loading: PDFLoading,
  }
);

export default function CVPage() {
  const t = useTranslations();
  const locale = useLocale();
  const messages = useMessages() as any; // Access raw messages quite safely
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Helper to safely get message and strip HTML for PDF
  const getRaw = (key: string) => {
    if (!messages) return "";
    const keys = key.split(".");
    let value = messages;
    for (const k of keys) {
      if (!value) return "";
      value = value[k];
    }
    return typeof value === "string" ? value.replace(/<[^>]*>/g, "") : "";
  };

  const resumeData = {
    hero: {
      name: "Haroldy Arturo Pérez Rodríguez",
      role: getRaw("Hero.role"),
      description: getRaw("Hero.description"),
    },
    contact: {
      email: "haroldyarturo@gmail.com",
      linkedin: "https://www.linkedin.com/in/haroldyarturo/",
      github: "https://github.com/ARCADEMAN21",
    },
    contactSection: {
      title: getRaw("Contact.title"),
      description: getRaw("Contact.description"),
      emailLabel: getRaw("Contact.emailLabel"),
      linkedinLabel: getRaw("Contact.linkedinLabel"),
      githubLabel: getRaw("Contact.githubLabel"),
    },
    about: {
      title: getRaw("About.title"),
      p1: getRaw("About.p1"),
      p2: getRaw("About.p2"),
      p3: getRaw("About.p3"),
    },
    experience: {
      title: getRaw("Experience.title"),
      jobs: [
        {
          role: getRaw("Experience.jobs.adsdigital.role"),
          company: getRaw("Experience.jobs.adsdigital.company"),
          date: `2018 - ${getRaw("Experience.present")}`,
          desc: [
            getRaw("Experience.jobs.adsdigital.desc1"),
            getRaw("Experience.jobs.adsdigital.desc2"),
            getRaw("Experience.jobs.adsdigital.desc3"),
            getRaw("Experience.jobs.adsdigital.desc4"),
          ],
        },
        {
          role: getRaw("Experience.jobs.nwc10.role"),
          company: getRaw("Experience.jobs.nwc10.company"),
          date: "2015 - 2016",
          desc: [
            getRaw("Experience.jobs.nwc10.desc1"),
            getRaw("Experience.jobs.nwc10.desc2"),
            getRaw("Experience.jobs.nwc10.desc3"),
          ],
        },
        {
          role: getRaw("Experience.jobs.onepingpong.role"),
          company: getRaw("Experience.jobs.onepingpong.company"),
          date: "2014 - 2015",
          desc: [
            getRaw("Experience.jobs.onepingpong.desc1"),
            getRaw("Experience.jobs.onepingpong.desc2"),
            getRaw("Experience.jobs.onepingpong.desc3"),
          ],
        },
      ],
    },
    skills: {
      title: getRaw("Skills.title"),
      categories: [
        {
          name: getRaw("Skills.frontend"),
          items: [
            "Next.js",
            "React",
            "TypeScript",
            "Tailwind CSS",
            "Redux",
            "Vite",
          ],
        },
        {
          name: getRaw("Skills.backend"),
          items: ["Node.js", "Express", "NestJS", "Prisma ORM", "REST APIs"],
        },
        {
          name: getRaw("Skills.ai_automation"),
          items: [
            getRaw("Skills.badges.ai_prompting"),
            getRaw("Skills.badges.mcp_protocol"),
            getRaw("Skills.badges.n8n_automation"),
            getRaw("Skills.badges.chatgpt_api"),
            getRaw("Skills.badges.ai_assisted"),
          ],
        },
        { name: getRaw("Skills.database"), items: ["PostgreSQL", "MongoDB"] },
        {
          name: getRaw("Skills.infrastructure"),
          items: [
            "Docker",
            "Kubernetes",
            "CI/CD",
            "GitHub Actions",
            "AWS",
            "Google Cloud",
            "Vercel",
            "Microservicios",
          ],
        },
        {
          name: getRaw("Skills.legacy_stack"),
          items: ["Linux", "Apache", "MySQL", "PHP", "WordPress", "jQuery"],
        },
      ],
    },
    education: {
      title: getRaw("Education.title"),
      cert: {
        title: getRaw("Education.cert_title"),
        desc: getRaw("Education.cert_desc"),
        inst: getRaw("Education.cert_inst"),
      },
      languages: {
        title: getRaw("Education.languages_title"),
        es: getRaw("Education.languages_es"),
        en: getRaw("Education.languages_en"),
      },
    },
  };

  const handleDownloadTXT = () => {
    const { hero, contact, about, experience, skills, education } = resumeData;

    const cvText = `
${hero.name.toUpperCase()}
${hero.role}
Email: ${
      contact.email
    } | LinkedIn: linkedin.com/in/haroldyarturo | GitHub: github.com/ARCADEMAN21

${about.title.toUpperCase()}
${"-".repeat(about.title.length)}
${about.p1}
${about.p2}
${about.p3 ? about.p3 : ""}

${experience.title.toUpperCase()}
${"-".repeat(experience.title.length)}
${experience.jobs
  .map(
    (job) => `
${job.role}
${job.company} | ${job.date}
${job.desc.map((d) => `- ${d}`).join("\n")}
`
  )
  .join("")}

${skills.title.toUpperCase()}
${"-".repeat(skills.title.length)}
${skills.categories
  .map(
    (cat) => `
${cat.name}:
  ${cat.items.join(", ")}
`
  )
  .join("")}

${education.title.toUpperCase()}
${"-".repeat(education.title.length)}
${education.cert.title}
${education.cert.desc}
${education.cert.inst}

${education.languages.title}:
${education.languages.es}
${education.languages.en}
`;
    const blob = new Blob([cvText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "cv-haroldy-arturo-perez-rodriguez.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="relative min-h-screen bg-background">
      {/* Grid Background */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:18px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

      {/* Content */}
      <div className="relative z-10">
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-sm">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center gap-8">
                <button
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                  className="flex items-center justify-center p-2 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors group relative w-10 h-10 cursor-pointer"
                  aria-label="Scroll to top"
                >
                  <Code className="w-6 h-6 text-primary transition-all scale-100 rotate-0 group-hover:scale-0 group-hover:rotate-90 absolute" />
                  <Code2 className="w-6 h-6 text-primary transition-all scale-0 -rotate-90 group-hover:scale-110 group-hover:rotate-0 absolute" />
                </button>
                <button
                  onClick={() =>
                    document
                      .getElementById("about")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  {t("Navigation.about")}
                </button>
                <button
                  onClick={() =>
                    document
                      .getElementById("skills")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  {t("Navigation.skills")}
                </button>
                <button
                  onClick={() =>
                    document
                      .getElementById("experience")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  {t("Navigation.experience")}
                </button>
                <button
                  onClick={() =>
                    document
                      .getElementById("education")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  {t("Navigation.education")}
                </button>
                <button
                  onClick={() =>
                    document
                      .getElementById("contact")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  {t("Navigation.contact")}
                </button>
              </div>

              {/* Mobile Navigation */}
              <div className="flex lg:hidden items-center">
                <Sheet
                  open={isMobileMenuOpen}
                  onOpenChange={setIsMobileMenuOpen}
                >
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
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_top,#4f4f4f2e_1px,transparent_1px)] bg-[size:18px_24px] pointer-events-none -z-10 [mask-image:linear-gradient(to_bottom,transparent,black)]"></div>

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
                      <button
                        onClick={() => {
                          document
                            .getElementById("about")
                            ?.scrollIntoView({ behavior: "smooth" });
                          setIsMobileMenuOpen(false);
                        }}
                        className="flex items-center gap-4 text-2xl font-medium text-muted-foreground hover:text-foreground transition-colors text-left cursor-pointer"
                      >
                        <User className="w-6 h-6" />
                        {t("Navigation.about")}
                      </button>
                      <button
                        onClick={() => {
                          document
                            .getElementById("skills")
                            ?.scrollIntoView({ behavior: "smooth" });
                          setIsMobileMenuOpen(false);
                        }}
                        className="flex items-center gap-4 text-2xl font-medium text-muted-foreground hover:text-foreground transition-colors text-left cursor-pointer"
                      >
                        <Bot className="w-6 h-6" />
                        {t("Navigation.skills")}
                      </button>
                      <button
                        onClick={() => {
                          document
                            .getElementById("experience")
                            ?.scrollIntoView({ behavior: "smooth" });
                          setIsMobileMenuOpen(false);
                        }}
                        className="flex items-center gap-4 text-2xl font-medium text-muted-foreground hover:text-foreground transition-colors text-left cursor-pointer"
                      >
                        <Briefcase className="w-6 h-6" />
                        {t("Navigation.experience")}
                      </button>
                      <button
                        onClick={() => {
                          document
                            .getElementById("education")
                            ?.scrollIntoView({ behavior: "smooth" });
                          setIsMobileMenuOpen(false);
                        }}
                        className="flex items-center gap-4 text-2xl font-medium text-muted-foreground hover:text-foreground transition-colors text-left cursor-pointer"
                      >
                        <GraduationCap className="w-6 h-6" />
                        {t("Navigation.education")}
                      </button>
                      <button
                        onClick={() => {
                          document
                            .getElementById("contact")
                            ?.scrollIntoView({ behavior: "smooth" });
                          setIsMobileMenuOpen(false);
                        }}
                        className="flex items-center gap-4 text-2xl font-medium text-muted-foreground hover:text-foreground transition-colors text-left cursor-pointer"
                      >
                        <Mail className="w-6 h-6" />
                        {t("Navigation.contact")}
                      </button>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
              <div className="flex items-center gap-2">
                <ModeToggle />
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <header className="container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16 min-h-screen grid content-center">
          <div className="max-w-7xl">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10 lg:gap-16 mb-6">
              <div className="flex-1">
                <h1 className="text-5xl sm:text-6xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-balance mb-4">
                  Haroldy Arturo Pérez Rodríguez
                </h1>
                <p className="text-xl sm:text-2xl text-primary font-medium">
                  {t("Hero.role")}
                </p>
                <div className="flex flex-wrap items-center gap-2 mt-4">
                  <Badge variant="secondary">
                    {t("Hero.highlight_experience")}
                  </Badge>
                  <Badge variant="secondary">
                    {t("Hero.highlight_fullstack")}
                  </Badge>
                  <Badge variant="secondary">
                    {t("Hero.highlight_leadership")}
                  </Badge>
                  <Badge variant="secondary">{t("Hero.highlight_ai")}</Badge>
                </div>
              </div>

              {/* Photo Placeholder */}
              {/* 3D HHKB */}
              <div className="relative w-full h-64 sm:h-72 lg:h-72 lg:w-full max-w-md lg:max-w-[500px] flex items-center justify-center -my-8 lg:my-0 lg:ml-auto">
                <HHKB3D />
              </div>
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-2xl">
              {t("Hero.description")}
            </p>

            {/* Social Links */}
            <div className="flex flex-wrap items-center gap-4 mb-12">
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
            </div>

            {/* Download Section */}
            <Card className="p-6 bg-accent/50 border-accent max-w-2xl">
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
                        {({ loading }) => (
                          <>
                            <FileDown className="h-4 w-4" />
                            {loading ? "Generating..." : t("Hero.downloadPDF")}
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
                    onClick={handleDownloadTXT}
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
        </header>

        {/* About Section */}
        <section
          id="about"
          className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 min-h-screen grid content-center"
        >
          <div className="max-w-7xl">
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
              <div className="relative flex justify-center lg:justify-start">
                <div className="relative w-full max-w-2xl aspect-square overflow-hidden">
                  <div className="absolute inset-0">
                    <CodeTyperBackground
                      locale={locale}
                      className="absolute inset-0 p-6 sm:p-8"
                    />
                  </div>
                  <img
                    src="/dev-profile.png"
                    alt="Haroldy Arturo Pérez Rodríguez"
                    className="relative z-10 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500 [mask-image:linear-gradient(to_bottom,black_50%,transparent_100%)] opacity-95"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section
          id="skills"
          className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 min-h-screen grid content-center"
        >
          <div className="max-w-7xl">
            <h2 className="text-3xl sm:text-4xl font-bold mb-12">
              {t("Skills.title")}
            </h2>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {/* Frontend */}
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-secondary rounded-lg">
                    <LayoutTemplate className="h-6 w-6 text-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold">
                    {t("Skills.frontend")}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Next.js</Badge>
                  <Badge variant="secondary">React</Badge>
                  <Badge variant="secondary">TypeScript</Badge>
                  <Badge variant="secondary">Tailwind CSS</Badge>
                  <Badge variant="secondary">Redux</Badge>
                  <Badge variant="secondary">Vite</Badge>
                </div>
              </Card>

              {/* Backend */}
              {/* Backend */}
              <Card className="p-6">
                <div className="flex items-start justify-between gap-3 flex-wrap mb-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="p-2 bg-secondary rounded-lg">
                      <Server className="h-6 w-6 text-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold leading-tight min-w-0">
                      {t("Skills.backend")}
                    </h3>
                  </div>
                  <Badge
                    variant="secondary"
                    className="shrink-0 whitespace-nowrap text-[10px] sm:text-xs bg-blue-500/10 text-blue-700 dark:bg-blue-500/20 dark:text-blue-200 hover:bg-blue-500/20 dark:hover:bg-blue-500/30 border-blue-500/30 border"
                  >
                    {t("Skills.specialty")}
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Node.js</Badge>
                  <Badge variant="secondary">Express</Badge>
                  <Badge variant="secondary">NestJS</Badge>
                  <Badge variant="secondary">Prisma ORM</Badge>
                  <Badge variant="secondary">REST APIs</Badge>
                </div>
              </Card>

              {/* AI & Automation */}
              {/* AI & Automation */}
              <Card className="p-6">
                <div className="flex items-start justify-between gap-3 flex-wrap mb-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="p-2 bg-secondary rounded-lg">
                      <Bot className="h-6 w-6 text-foreground" />
                    </div>
                    <h3 className="text-xl font-semibold leading-tight min-w-0">
                      {t("Skills.ai_automation")}
                    </h3>
                  </div>
                  <Badge
                    variant="secondary"
                    className="shrink-0 whitespace-nowrap text-[10px] sm:text-xs bg-blue-500/10 text-blue-700 dark:bg-blue-500/20 dark:text-blue-200 hover:bg-blue-500/20 dark:hover:bg-blue-500/30 border-blue-500/30 border"
                  >
                    {t("Skills.highlight")}
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">
                    {t("Skills.badges.ai_prompting")}
                  </Badge>
                  <Badge variant="secondary">
                    {t("Skills.badges.mcp_protocol")}
                  </Badge>
                  <Badge variant="secondary">
                    {t("Skills.badges.n8n_automation")}
                  </Badge>
                  <Badge variant="secondary">
                    {t("Skills.badges.chatgpt_api")}
                  </Badge>
                  <Badge variant="secondary">
                    {t("Skills.badges.ai_assisted")}
                  </Badge>
                </div>
              </Card>

              {/* Database */}
              {/* Database */}
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-secondary rounded-lg">
                    <Database className="h-6 w-6 text-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold">
                    {t("Skills.database")}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">PostgreSQL</Badge>
                  <Badge variant="secondary">MongoDB</Badge>
                </div>
              </Card>

              {/* Infrastructure */}
              {/* Infrastructure */}
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-secondary rounded-lg">
                    <Cloud className="h-6 w-6 text-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold">
                    {t("Skills.infrastructure")}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Docker</Badge>
                  <Badge variant="secondary">Kubernetes</Badge>
                  <Badge variant="secondary">CI/CD</Badge>
                  <Badge variant="secondary">GitHub Actions</Badge>
                  <Badge variant="secondary">AWS</Badge>
                  <Badge variant="secondary">Google Cloud</Badge>
                  <Badge variant="secondary">Vercel</Badge>
                  <Badge variant="secondary">Microservicios</Badge>
                </div>
              </Card>

              {/* LAMP Stack */}
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-secondary rounded-lg">
                    <History className="h-6 w-6 text-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold">
                    {t("Skills.legacy_stack")}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Linux</Badge>
                  <Badge variant="secondary">Apache</Badge>
                  <Badge variant="secondary">MySQL</Badge>
                  <Badge variant="secondary">PHP</Badge>
                  <Badge variant="secondary">WordPress</Badge>
                  <Badge variant="secondary">jQuery</Badge>
                  <Badge variant="secondary">Vanilla JS</Badge>
                </div>
              </Card>
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

        {/* Experience Section */}
        <section
          id="experience"
          className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 min-h-screen grid content-center"
        >
          <div className="max-w-7xl">
            <h2 className="text-3xl sm:text-4xl font-bold mb-12">
              {t("Experience.title")}
            </h2>

            <div className="space-y-12 max-w-5xl">
              {/* Job 1 */}
              <div className="relative pl-8 border-l-2 border-primary/30">
                <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-primary"></div>

                <div className="mb-4">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 mb-2">
                    <h3 className="text-2xl font-semibold">
                      {t("Experience.jobs.adsdigital.role")}
                    </h3>
                    <span className="text-sm text-muted-foreground">
                      2018 - {t("Experience.present")}
                    </span>
                  </div>
                  <p className="text-muted-foreground font-medium">
                    {t("Experience.jobs.adsdigital.company")}
                  </p>
                </div>

                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex gap-3">
                    <span className="text-primary mt-1.5">•</span>
                    <span>
                      {t.rich("Experience.jobs.adsdigital.desc1", {
                        strong: (chunks) => (
                          <strong className="text-foreground font-bold">
                            {chunks}
                          </strong>
                        ),
                      })}
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary mt-1.5">•</span>
                    <span>
                      {t.rich("Experience.jobs.adsdigital.desc2", {
                        strong: (chunks) => (
                          <strong className="text-foreground font-bold">
                            {chunks}
                          </strong>
                        ),
                        link: (chunks) => (
                          <a
                            href="https://www.editor-cv.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline font-bold"
                          >
                            {chunks}
                          </a>
                        ),
                      })}
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary mt-1.5">•</span>
                    <span>
                      {t.rich("Experience.jobs.adsdigital.desc3", {
                        strong: (chunks) => (
                          <strong className="text-foreground font-bold">
                            {chunks}
                          </strong>
                        ),
                        link: (chunks) => (
                          <a
                            href="https://www.find-persons.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline font-bold"
                          >
                            {chunks}
                          </a>
                        ),
                      })}
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary mt-1.5">•</span>
                    <span>
                      {t.rich("Experience.jobs.adsdigital.desc4", {
                        strong: (chunks) => (
                          <strong className="text-foreground font-bold">
                            {chunks}
                          </strong>
                        ),
                        link: (chunks) => (
                          <a
                            href="https://www.allremovebg.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline font-bold"
                          >
                            {chunks}
                          </a>
                        ),
                        link2: (chunks) => (
                          <a
                            href="https://iq-testonline.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline font-bold"
                          >
                            {chunks}
                          </a>
                        ),
                      })}
                    </span>
                  </li>
                </ul>
              </div>

              {/* Job 2 */}
              <div className="relative pl-8 border-l-2 border-border">
                <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-muted"></div>

                <div className="mb-4">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 mb-2">
                    <h3 className="text-2xl font-semibold">
                      {t("Experience.jobs.nwc10.role")}
                    </h3>
                    <span className="text-sm text-muted-foreground">
                      2015 - 2016
                    </span>
                  </div>
                  <p className="text-muted-foreground font-medium">
                    {t("Experience.jobs.nwc10.company")}
                  </p>
                </div>

                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex gap-3">
                    <span className="text-primary mt-1.5">•</span>
                    <span>
                      {t.rich("Experience.jobs.nwc10.desc1", {
                        strong: (chunks) => (
                          <strong className="text-foreground font-bold">
                            {chunks}
                          </strong>
                        ),
                      })}
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary mt-1.5">•</span>
                    <span>
                      {t.rich("Experience.jobs.nwc10.desc2", {
                        strong: (chunks) => (
                          <strong className="text-foreground font-bold">
                            {chunks}
                          </strong>
                        ),
                      })}
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary mt-1.5">•</span>
                    <span>
                      {t.rich("Experience.jobs.nwc10.desc3", {
                        strong: (chunks) => (
                          <strong className="text-foreground font-bold">
                            {chunks}
                          </strong>
                        ),
                        link: (chunks) => (
                          <a
                            href="https://www.muchacomida.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline font-bold"
                          >
                            {chunks}
                          </a>
                        ),
                      })}
                    </span>
                  </li>
                </ul>
              </div>

              {/* Job 3 */}
              <div className="relative pl-8 border-l-2 border-border">
                <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-muted"></div>

                <div className="mb-4">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 mb-2">
                    <h3 className="text-2xl font-semibold">
                      {t("Experience.jobs.onepingpong.role")}
                    </h3>
                    <span className="text-sm text-muted-foreground">
                      2014 - 2015
                    </span>
                  </div>
                  <p className="text-muted-foreground font-medium">
                    {t("Experience.jobs.onepingpong.company")}
                  </p>
                </div>

                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex gap-3">
                    <span className="text-primary mt-1.5">•</span>
                    <span>
                      {t.rich("Experience.jobs.onepingpong.desc1", {
                        strong: (chunks) => (
                          <strong className="text-foreground font-bold">
                            {chunks}
                          </strong>
                        ),
                      })}
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary mt-1.5">•</span>
                    <span>
                      {t.rich("Experience.jobs.onepingpong.desc2", {
                        strong: (chunks) => (
                          <strong className="text-foreground font-bold">
                            {chunks}
                          </strong>
                        ),
                      })}
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary mt-1.5">•</span>
                    <span>
                      {t.rich("Experience.jobs.onepingpong.desc3", {
                        strong: (chunks) => (
                          <strong className="text-foreground font-bold">
                            {chunks}
                          </strong>
                        ),
                      })}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Education & Certifications */}
        {/* Education & Certifications */}
        <section
          id="education"
          className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 min-h-screen grid content-center"
        >
          <div className="max-w-7xl">
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

        {/* Contact Section */}
        <section
          id="contact"
          className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 pb-32 min-h-screen grid content-center"
        >
          <div className="max-w-4xl">
            <h2 className="text-3xl sm:text-4xl font-bold mb-8">
              {t("Contact.title")}
            </h2>
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-muted-foreground leading-relaxed">
                {t("Contact.description")}
              </p>
              <div className="flex flex-col gap-4 mt-8">
                <a
                  href="mailto:haroldyarturo@gmail.com"
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Mail className="h-5 w-5" />
                  <span className="text-lg">haroldyarturo@gmail.com</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/haroldyarturo/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                  <span className="text-lg">linkedin.com/in/haroldyarturo</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border/40 bg-background/80 backdrop-blur-sm">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center justify-center">
              <p className="text-sm text-muted-foreground text-center">
                © {new Date().getFullYear()} {t("Contact.footer_rights")}
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
