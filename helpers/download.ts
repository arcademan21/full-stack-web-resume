export const downloadResumeTXT = (resumeData: any) => {
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
    (job: any) => `
${job.role}
${job.company} | ${job.date}
${job.desc.map((d: string) => `- ${d}`).join("\n")}
`
  )
  .join("")}

${skills.title.toUpperCase()}
${"-".repeat(skills.title.length)}
${skills.categories
  .map(
    (cat: any) => `
${cat.name}:
  ${cat.items.join(", ")}
`
  )
  .join("")}

${education.title.toUpperCase()}
${"-".repeat(education.title.length)}
${education.cert.title}
${education.cert.inst}
${education.cert.desc}

${education.languages.title}:
Español: ${education.languages.es}
Inglés: ${education.languages.en}
`;

  const blob = new Blob([cvText], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "CV_Haroldy_Arturo_Perez_Rodriguez.txt";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
