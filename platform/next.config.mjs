/** @type {import('next').NextConfig} */
const nextConfig = {
  // Self-contained MVP: no external services. The graph ships as committed
  // JSON and is queried server-side, so the whole app deploys as a static-ish
  // Next build with zero infrastructure. Neo4j/Supabase slot in later behind
  // the GraphStore interface without touching the UI.
  reactStrictMode: true,
};

export default nextConfig;
