import type { NextConfig } from "next";
import site from "./content/site.json";

const nextConfig: NextConfig = {
  output: "export",
  basePath: new URL(site.identity.siteUrl).pathname.replace(/\/$/, ""),
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
