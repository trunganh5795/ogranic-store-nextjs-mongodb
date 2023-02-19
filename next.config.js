/**  @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        port: '',
        pathname: '**',
      },
    ],
  },
  i18n: {
    /**
     * Provide the locales you want to support in your application
     */
    locales: ['en', 'vi'],
    /**
     * This is the default locale you want to be used when visiting
     * a non-locale prefixed path.
     */
    defaultLocale: 'en',
    localeDetection: false,
  },
};

module.exports = nextConfig;
