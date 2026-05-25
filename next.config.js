/** @type {import("next").NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Images
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [],
  },

  // Turbopack for faster dev
  turbopack: {},
};

module.exports = nextConfig;
