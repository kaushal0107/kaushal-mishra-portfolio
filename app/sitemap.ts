import type { MetadataRoute } from "next";
import { site } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: site.url,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
      images: [`${site.url}/opengraph-image`],
    },
    {
      url: `${site.url}/resume`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    // PDFs are indexed too, and this one ranks for "<name> resume" queries.
    {
      url: `${site.url}${site.resumePath}`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.6,
    },
  ];
}
