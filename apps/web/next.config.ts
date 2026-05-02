import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  reactCompiler: process.env.NODE_ENV === 'production',
  outputFileTracingRoot: path.join(__dirname, "../.."),
};

export default nextConfig;
