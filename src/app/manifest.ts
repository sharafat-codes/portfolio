import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.title,
    short_name: siteConfig.name,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#0a0c10",
    theme_color: "#0a0c10",
    icons: [
      { src: "/icon", sizes: "512x512", type: "image/png" },
    ],
  };
}
