import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'drive.google.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.custom-cursor.com',
      }
    ],
  },
  i18n: {
    locales: ['id', 'en'],
    defaultLocale: 'id',
  },
};

export default nextConfig;
