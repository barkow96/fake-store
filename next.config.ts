import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */ 
    output: "export",
    images: { remotePatterns: [{ hostname: "fakestoreapi.com" }]}
};

export default nextConfig;
