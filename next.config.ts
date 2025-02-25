import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/profiles",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
