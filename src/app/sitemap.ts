import type { MetadataRoute } from "next";
import { buildMetadata } from "@/app/utils";

const SITE_URL = "https://www.ajayposhak.in";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/books/technical`, lastModified: now, changeFrequency: "monthly", priority: 0.3 },
    { url: `${SITE_URL}/books/general`, lastModified: now, changeFrequency: "monthly", priority: 0.3 },
  ];

  const articles: MetadataRoute.Sitemap = buildMetadata().map((article) => {
    const published = new Date(article.metadata.publishedAt);
    return {
      url: `${SITE_URL}/articles/${article.fileNameWithoutExtension}`,
      lastModified: Number.isNaN(published.getTime()) ? now : published,
      changeFrequency: "yearly",
      priority: 0.8,
    };
  });

  return [...staticRoutes, ...articles];
}
