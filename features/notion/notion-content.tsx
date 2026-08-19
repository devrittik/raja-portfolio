"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { NotionRenderer } from "react-notion-x";
import type { ExtendedRecordMap } from "notion-types";
import "react-notion-x/src/styles.css";
import "prismjs/themes/prism-tomorrow.css";

// Code/collection/modal renderers are client-only and heavy — load on demand.
const Code = dynamic(() => import("react-notion-x/build/third-party/code").then((m) => m.Code));
const Collection = dynamic(() =>
  import("react-notion-x/build/third-party/collection").then((m) => m.Collection),
);
const Modal = dynamic(
  () => import("react-notion-x/build/third-party/modal").then((m) => m.Modal),
  { ssr: false },
);

/**
 * Rich Notion page body renderer, wired to next/image and next/link.
 * Only rendered when NOTION_TOKEN is configured and the page has content.
 */
export function NotionContent({ recordMap }: { recordMap: ExtendedRecordMap }) {
  return (
    <div className="prose-content [&_.notion-h2]:scroll-mt-28 [&_.notion-h3]:scroll-mt-28">
      <NotionRenderer
        recordMap={recordMap}
        fullPage={false}
        darkMode={false}
        previewImages
        showTableOfContents={false}
        components={{ Code, Collection, Modal, nextImage: Image, nextLink: Link }}
      />
    </div>
  );
}
