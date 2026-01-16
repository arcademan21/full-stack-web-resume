export const getResumeData = (messages: any) => {
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

  return {
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
};
