"use client";

import { useTranslations } from "next-intl";

const JOBS = [
  { id: "adsdigital", descCount: 4, dateKey: "present" }, // Special handling for date
  { id: "nwc10", descCount: 3, dateKey: null, dateFixed: "2015 - 2016" },
  { id: "onepingpong", descCount: 3, dateKey: null, dateFixed: "2014 - 2015" },
];

export const ExperienceSection = () => {
  const t = useTranslations();

  return (
    <section
      id="experience"
      className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 min-h-screen grid content-center"
    >
      <div className="max-w-7xl">
        <h2 className="text-3xl sm:text-4xl font-bold mb-12">
          {t("Experience.title")}
        </h2>

        <div className="space-y-12 max-w-5xl">
          {JOBS.map((job, index) => (
            <div
              key={job.id}
              className={`relative pl-8 border-l-2 ${
                index === 0 ? "border-primary/30" : "border-border"
              }`}
            >
              <div
                className={`absolute -left-2 top-0 w-4 h-4 rounded-full ${
                  index === 0 ? "bg-primary" : "bg-muted"
                }`}
              ></div>

              <div className="mb-4">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-2 mb-2">
                  <h3 className="text-2xl font-semibold">
                    {t(`Experience.jobs.${job.id}.role`)}
                  </h3>
                  <span className="text-sm text-muted-foreground">
                    {job.dateKey
                      ? `2018 - ${t(`Experience.${job.dateKey}`)}`
                      : job.dateFixed}
                  </span>
                </div>
                <p className="text-muted-foreground font-medium">
                  {t(`Experience.jobs.${job.id}.company`)}
                </p>
              </div>

              <ul className="space-y-3 text-muted-foreground">
                {Array.from({ length: job.descCount }).map((_, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="text-primary mt-1.5">•</span>
                    <span>
                      {t.rich(`Experience.jobs.${job.id}.desc${i + 1}`, {
                        strong: (chunks) => (
                          <strong className="text-foreground font-bold">
                            {chunks}
                          </strong>
                        ),
                        link: (chunks) => (
                          <a
                            href={
                              job.id === "adsdigital" && i === 1
                                ? "https://www.editor-cv.com/"
                                : job.id === "adsdigital" && i === 2
                                  ? "https://www.find-persons.com/"
                                  : job.id === "adsdigital" && i === 3
                                    ? "https://www.allremovebg.com/"
                                    : "#"
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline font-bold"
                          >
                            {chunks}
                          </a>
                        ),
                        link2: (chunks) => (
                          <a
                            href="https://iq-testonline.es/"
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
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
