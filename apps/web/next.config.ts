import type { NextConfig } from "next";
import path from "path";

const REQUIRED_ENV_VARS = ["BACKEND_URL", "ADMIN_API_TOKEN"] as const;
const missing = REQUIRED_ENV_VARS.filter((k) => !process.env[k]?.trim());
if (missing.length) {
  throw new Error(
    `Missing required environment variables: ${missing.join(", ")}`,
  );
}

const nextConfig: NextConfig = {
  reactCompiler: process.env.NODE_ENV === "production",
  outputFileTracingRoot: path.join(__dirname, "../.."),
  cacheComponents: true,
};

export default nextConfig;
