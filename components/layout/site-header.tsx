import { getNavigation, getSearchIndex, getSiteSettings } from "@/notion/data";
import { HeaderClient } from "./header-client";

/**
 * Sticky site header. Server component: pulls navigation, search index
 * and settings from the CMS layer, then hands off to the client shell.
 */
export async function SiteHeader() {
  const [nav, searchItems, settings] = await Promise.all([getNavigation(), getSearchIndex(), getSiteSettings()]);
  return <HeaderClient nav={nav} searchItems={searchItems} siteName={settings.name} />;
}
