import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */ 
    output: "export",
    basePath: process.env.NODE_ENV === "production" ? "/fake-store" : "",
    images: { 
      unoptimized: true,
      remotePatterns: [{ hostname: "fakestoreapi.com" }]}
};

export default nextConfig;
