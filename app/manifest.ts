import type { MetadataRoute } from "next";
import { getSiteSettings } from "@/notion/data";

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const settings = await getSiteSettings();
  return {
    name: settings.name,
    short_name: settings.name.split(" ")[0],
    description: settings.description,
    start_url: "/",
    display: "browser",
    background_color: "#f8f7f5",
    theme_color: "#0f0e0c",
    icons: [{ src: "/images/logo-mark.png", sizes: "512x512", type: "image/png" }],
  };
}
