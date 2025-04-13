import dotenv from "dotenv";
/** @type {import('next').NextConfig} */
dotenv.config({ path: "../../.env" });

const nextConfig = {
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
};

export default nextConfig;
