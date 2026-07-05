import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const projectRoot = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Pin the workspace root so a stray lockfile in a parent directory doesn't
  // confuse Next's file-tracing during builds.
  outputFileTracingRoot: projectRoot,
};

export default nextConfig;
