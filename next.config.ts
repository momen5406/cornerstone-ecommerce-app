import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL("https://ecommerce.routemisr.com/Route-Academy-*/**"),
    ],
  },
};

export default nextConfig;
