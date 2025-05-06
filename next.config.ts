import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    BOT_ID: process.env.BOT_ID,
    BOT_SECRET: process.env.BOT_SECRET,
  }
};

export default nextConfig;
