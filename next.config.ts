import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /*
   * This app is served under a path on a shared domain:
   *   https://admissions.pathshalahub.com/iiebm
   * The hub project rewrites /iiebm/:path* through to this deployment — a
   * rewrite, not a redirect, so the address bar stays on the hub and this app
   * must genuinely serve its pages under /iiebm.
   *
   * KEEP IN SYNC: BASE_PATH in lib/site.ts must match this exactly.
   */
  basePath: "/iiebm",
};

export default nextConfig;
