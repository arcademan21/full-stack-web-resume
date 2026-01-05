import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "../globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Tu Nombre - Senior Full Stack Developer | Next.js, React, NestJS",
  description:
    "Senior Full Stack Developer con +10 años de experiencia en Next.js, React, TypeScript y NestJS. Especializado en arquitecturas escalables y desarrollo web moderno.",
  keywords: ["Full Stack Developer", "Senior Developer", "Next.js", "React", "NestJS", "TypeScript", "Node.js"],
  authors: [{ name: "Tu Nombre" }],
  generator: "v0.app",
  icons: {
    icon: "/favicon.svg",
    apple: "/apple-icon.png",
  },
}

import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { ThemeProvider } from "@/components/theme-provider"

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!['en', 'es'].includes(locale)) {
    notFound();
  }
 
  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();
 
  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`font-sans antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
