/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Force Webpack instead of Turbopack for builds.
  // Turbopack produces chunk paths that Netlify's edge bundler can't resolve
  // on Windows (path separator mismatch in the edge runtime).
  experimental: {
    turbo: undefined,
  },
};

module.exports = nextConfig;
