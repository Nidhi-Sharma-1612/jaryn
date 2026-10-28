import type { MetadataRoute } from "next";
import { getListings } from "@/lib/services/listings";
import { site } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const listings = await getListings();
  const page = (path: string, priority: number, changeFrequency: "daily" | "weekly" | "monthly" | "yearly") => ({
    url: `${site.url}${path}`,
    changeFrequency,
    priority,
  });

  return [
    page("/", 1, "weekly"),
    page("/properties", 0.9, "daily"),
    ...listings.map((l) => page(`/properties/${l.id}`, 0.8, "weekly")),
    page("/about", 0.7, "monthly"),
    page("/berkshire-guide", 0.7, "monthly"),
    page("/property-management", 0.7, "monthly"),
    page("/contact", 0.6, "yearly"),
    page("/privacy-policy", 0.2, "yearly"),
    page("/terms-and-conditions", 0.2, "yearly"),
  ];
}
