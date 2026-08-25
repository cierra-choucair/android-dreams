/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // The Sunday Letter IS the newsletter — one destination.
      { source: "/newsletter", destination: "/sunday-letter", permanent: true },
      // Pre-launch: the front doors funnel to the beehiiv signups.
      // Temporary (307) on purpose — permanent redirects get cached by
      // browsers and search engines, and these come off at launch.
      {
        source: "/",
        destination: "https://android-dreams.beehiiv.com/subscribe",
        permanent: false,
      },
      {
        source: "/qfrontline",
        destination: "https://qfrontline.beehiiv.com/subscribe",
        permanent: false,
      },
      {
        source: "/qfrontline/the-future-of-quantum-computing-depends-on-programmers",
        destination: "https://qfrontline.beehiiv.com/subscribe",
        permanent: false,
      },
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
