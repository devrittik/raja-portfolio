import { Client } from "@notionhq/client";
import { NotionCompatAPI } from "notion-compat";

/**
 * Official Notion SDK client (database queries, property reads)
 * plus the compatibility adapter used to build react-notion-x record maps.
 * Both are null-safe: without NOTION_TOKEN the site runs on fallback content.
 */
const token = process.env.NOTION_TOKEN;

export const notion = token ? new Client({ auth: token }) : null;
export const notionCompat = notion ? new NotionCompatAPI(notion) : null;

export const isCmsConfigured = Boolean(token);
