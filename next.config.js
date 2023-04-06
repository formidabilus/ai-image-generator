/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["aiimagegeneratordaad6cb8.blob.core.windows.net"],
  },
};

module.exports = nextConfig;
