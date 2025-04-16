/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "via.placeholder.com", // Allow placeholder images
      "maps.googleapis.com", // Allow Google Maps API images
      "maps.gstatic.com", // Allow Google Static Maps images
      "lh3.googleusercontent.com",
      `${process.env.NEXT_API_URL}`, // Allow Google user content images,
      
    ],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
        pathname: "/**",
      },
    ],
  },
  env: {
    NEXT_API_URL: process.env.NEXT_API_URL,
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://backend:5000/api/:path*",
      },
    ];
  },
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: true,
      },
    ];
  },
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      };
    }

    return config;
  },
};

module.exports = nextConfig;
