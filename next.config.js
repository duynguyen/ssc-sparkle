/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Recommended for the `pages` directory, default in `app`.
  swcMinify: true,
  experimental: {
    // Required:
    appDir: true,
  },
  images: {
    minimumCacheTTL: 12000,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'publish-p81252-e700817.adobeaemcloud.com',
        // port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
