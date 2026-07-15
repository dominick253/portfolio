import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // Suppress turbopack root warning
  experimental: {
  },
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
