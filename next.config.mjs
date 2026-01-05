import createNextIntlPlugin from 'next-intl/plugin';
 
const withNextIntl = createNextIntlPlugin('./i18n.ts');
 
/** @type {import('next').NextConfig} */
// Force restart 2026-01-05
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default withNextIntl(nextConfig);
