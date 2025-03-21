/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
      DATABASE_URL: process.env.DATABASE_URL,
      GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
      JWT_SECRET: process.env.JWT_SECRET,
    },
};

export default nextConfig;
