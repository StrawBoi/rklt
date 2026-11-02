import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://rklt.ltd";
  const routes = [
    { path: "", priority: 1.0 },
    { path: "/services", priority: 0.9 },
    { path: "/corridors", priority: 0.9 },
    { path: "/about", priority: 0.8 },
    { path: "/tracking", priority: 0.8 },
    { path: "/contact", priority: 0.85 },
  ];
  const locales = ["en", "ar"];

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const route of routes) {
      entries.push({
        url: `${baseUrl}/${locale}${route.path}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: route.priority,
        alternates: {
          languages: {
            en: `${baseUrl}/en${route.path}`,
            ar: `${baseUrl}/ar${route.path}`,
            "en-JO": `${baseUrl}/en${route.path}`,
            "ar-JO": `${baseUrl}/ar${route.path}`,
          },
        },
      });
    }
  }

  return entries;
}
