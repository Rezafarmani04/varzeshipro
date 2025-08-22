import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  typescript: {},
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
