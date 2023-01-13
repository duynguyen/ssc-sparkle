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
  async rewrites() {
  return [
    {
      source: '/team',
      destination: '/about',
    },
    {
      source: '/about-us',
      destination: '/about',
    },
    // Path Matching - will match `/post/a` but not `/post/a/b`
    {
      source: '/post/:slug',
      destination: '/news/:slug',
    },
    // Wildcard Path Matching - will match `/blog/a` and `/blog/a/b`
    {
      source: '/blog/:slug*',
      destination: '/news/:slug*',
    },
    // Rewriting to an external URL
    {
      source: '/docs/:slug',
      destination: 'http://baidu.com',
    },
  ];
},
};

module.exports = nextConfig;
