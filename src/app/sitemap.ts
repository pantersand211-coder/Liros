import type { MetadataRoute } from "next";
import { site } from "@/content/site";
export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/product", "/product/integrations", "/book-demo", "/try"].map((p) => ({ url: `${site.url}${p}` }));
}
