"use client";

import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";

// Sub-component for individual project image carousel to handle autoplay independently
function ProjectImageCarousel({
  project,
  locale,
  t,
}: {
  project: any;
  locale: string;
  t: any;
}) {
  const [api, setApi] = useState<CarouselApi>();

  // Autoplay Effect
  useEffect(() => {
    if (!api) return;

    const interval = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        api.scrollTo(0); // Loop back to start
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [api]);

  return (
    <Carousel
      setApi={setApi}
      className="w-full h-full"
      opts={{ watchDrag: false }} // Disable swipe interaction
    >
      <CarouselContent>
        {Array.from({ length: project.imageCount }).map((_, imgIndex) => {
          const langPrefix = locale === "es" ? "es" : "en";
          const imgNum = String(imgIndex + 1).padStart(2, "0");
          const imgPath = `/projects/${project.imageFolder}/${langPrefix}-${imgNum}.png`;

          return (
            <CarouselItem key={imgIndex}>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full h-full cursor-pointer"
              >
                <div className="relative w-full h-full aspect-video">
                  <Image
                    src={imgPath}
                    alt={`${t(`${project.id}.title`)} screenshot ${
                      imgIndex + 1
                    }`}
                    fill
                    className="object-cover"
                  />
                </div>
              </a>
            </CarouselItem>
          );
        })}
      </CarouselContent>
    </Carousel>
  );
}

export function ProjectsSection({ locale }: { locale: string }) {
  const t = useTranslations("Projects");
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    const handleUpdate = () => {
      setCount(api.scrollSnapList().length);
      setCurrent(api.selectedScrollSnap() + 1);
    };

    handleUpdate();

    api.on("select", handleUpdate);
    api.on("reInit", handleUpdate);

    return () => {
      api.off("select", handleUpdate);
      api.off("reInit", handleUpdate);
    };
  }, [api]);

  const projects = [
    {
      id: "editor_cv",
      imageFolder: "editor-cv",
      imageCount: 2,
      url: "https://editor-cv.com",
      tagCount: 5,
    },
    {
      id: "find_persons",
      imageFolder: "find-persons",
      imageCount: 2,
      url: "https://find-persons.com",
      tagCount: 4,
    },
    {
      id: "all_remove_bg",
      imageFolder: "all-remove-bg",
      imageCount: 2,
      url: "https://allremovebg.com",
      tagCount: 2,
    },
    {
      id: "iq_test_online",
      imageFolder: "iq-test-online",
      imageCount: 2,
      url: "https://iqtestonline.com",
      tagCount: 4,
    },
  ];

  const itemsPerPage = 1;
  const pages = [];
  for (let i = 0; i < projects.length; i += itemsPerPage) {
    pages.push(projects.slice(i, i + itemsPerPage));
  }

  return (
    <section
      id="projects"
      className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 min-h-screen grid content-center"
    >
      <div className="max-w-[28rem] lg:max-w-7xl w-full min-h-160">
        <div className="flex flex-col space-y-4  mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold">{t("title")}</h2>
        </div>

        <Carousel setApi={setApi} className="w-full">
          <CarouselContent>
            {pages.map((page, pageIndex) => (
              <CarouselItem key={pageIndex}>
                <div className="grid gap-12">
                  {page.map((project) => (
                    <div
                      key={project.id}
                      className="grid lg:grid-cols-2 gap-8 items-center"
                    >
                      {/* Project Info (Left) */}
                      <div className="flex flex-col gap-4 order-2 lg:order-1">
                        <div className="space-y-2">
                          <h3 className="text-3xl font-bold">
                            {t(`${project.id}.title`)}
                          </h3>
                          <p className="text-xl text-primary font-semibold">
                            {t(`${project.id}.role`)}
                          </p>
                        </div>

                        <p className="text-muted-foreground text-lg leading-relaxed">
                          {t(`${project.id}.description`)}
                        </p>

                        <div className="flex flex-wrap gap-2 my-2">
                          {Array.from({ length: project.tagCount }).map(
                            (_, i) => (
                              <Badge key={i} variant="secondary">
                                {t(`${project.id}.tags.${i}`)}
                              </Badge>
                            )
                          )}
                        </div>
                      </div>

                      {/* Project Images (Right) */}
                      <div className="order-1 lg:order-2">
                        <div className="relative aspect-video overflow-hidden bg-transparent mask-[linear-gradient(to_bottom,black_90%,transparent_100%)]">
                          <div className="w-full h-full mask-[linear-gradient(to_right,black_90%,transparent_100%)]">
                            <ProjectImageCarousel
                              project={project}
                              locale={locale}
                              t={t}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Pagination Dots */}
          {count > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: count }).map((_, i) => (
                <button
                  key={i}
                  className={`h-4 w-4 rounded-full transition-all ${
                    current === i + 1
                      ? "bg-primary scale-125"
                      : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                  onClick={() => api?.scrollTo(i)}
                  aria-label={`Go to project page ${i + 1}`}
                />
              ))}
            </div>
          )}
        </Carousel>
      </div>
    </section>
  );
}
