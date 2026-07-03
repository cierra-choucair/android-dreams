/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // The Sunday Letter IS the newsletter — one destination.
      { source: "/newsletter", destination: "/sunday-letter", permanent: true },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
