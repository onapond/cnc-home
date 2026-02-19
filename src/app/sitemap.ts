import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://cnctechlab.co.kr";

  return [
    {
      url: baseUrl,
      lastModified: new Date("2026-02-19"),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/products/`,
      lastModified: new Date("2026-02-19"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/training/`,
      lastModified: new Date("2026-02-19"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/catering/`,
      lastModified: new Date("2026-02-19"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/b2b/`,
      lastModified: new Date("2026-02-19"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact/`,
      lastModified: new Date("2026-02-19"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];
}
