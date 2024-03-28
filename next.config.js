/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
      {
        protocol: "http",
        hostname: "*",
      },
    ],
    domains: ["example.com", "img.clerk.com"], // Add the hostname of the external image URL here
  },
};

module.exports = nextConfig;
