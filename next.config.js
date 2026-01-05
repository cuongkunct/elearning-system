/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "elearningnew.cybersoft.edu.vn",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "elearningnew.cybersoft.edu.vn",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
