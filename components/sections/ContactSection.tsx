"use client";

import { useTranslations } from "next-intl";
import { ContactForm } from "@/components/ContactForm";
import { Phone, Send } from "lucide-react";

export const ContactSection = () => {
  const t = useTranslations();

  return (
    <section
      id="contact"
      className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 pb-32 min-h-screen grid content-center"
    >
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center mb-16 px-4">
        <div className="space-y-8 relative min-h-[27.3rem]">
          <div className="space-y-6 relative z-10">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              {t("Contact.title")}
            </h2>
            <div className="space-y-6">
              <p className="text-xl sm:text-2xl text-muted-foreground leading-relaxed font-medium max-w-lg">
                {t("Contact.description")}
              </p>
              <div className="flex items-center gap-4 text-2xl font-semibold text-primary">
                <div className="p-3 rounded-full bg-primary/10">
                  <Phone className="h-6 w-6" />
                </div>
                <span>+34 624 276 971</span>
              </div>
            </div>
          </div>

          {/* Background Decor - Large Paper Plane */}
          <div className="absolute right-0 sm:-right-12 top-1/2 -translate-y-1/2 opacity-[0.03] dark:opacity-[0.05] pointer-events-none scale-100 sm:scale-150">
            <Send className="w-48 h-48 sm:w-96 sm:h-96 -rotate-12" />
          </div>
        </div>

        <div className="w-full space-y-6">
          <p className="text-muted-foreground text-lg font-medium">
            {t("Contact.email_alternative")}
          </p>
          <ContactForm />
        </div>
      </div>
    </section>
  );
};
