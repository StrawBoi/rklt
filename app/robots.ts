import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: ["GPTBot", "ChatGPT-User", "PerplexityBot", "ClaudeBot", "Google-Extended"],
        allow: ["/", "/llms.txt"],
      },
    ],
    sitemap: "https://rklt.ltd/sitemap.xml",
    host: "https://rklt.ltd",
  };
}
