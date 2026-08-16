import type { MetadataRoute } from "next";
import { seo, site } from "@/lib/data";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — ${site.role}`,
    short_name: site.name,
    description: seo.description,
    start_url: "/",
    display: "standalone",
    background_color: "#090A0D",
    theme_color: "#090A0D",
  };
}
