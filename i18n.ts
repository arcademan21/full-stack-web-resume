import { getRequestConfig } from "next-intl/server";

export const locales = ["en", "es"];

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  // Ensure that a valid locale is used
  if (!locale || !locales.includes(locale as any)) {
    locale = locales[0];
  }

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
