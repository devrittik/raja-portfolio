"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { PhotoGallery } from "@/features/media/photo-gallery";
import type { GalleryItem } from "@/types";

/** Pinterest-style gallery with category chips and lightbox. */
export function GalleryArchive({ items }: { items: GalleryItem[] }) {
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(items.map((i) => i.category))).sort()],
    [items],
  );
  const [category, setCategory] = useState("All");

  const filtered = category === "All" ? items : items.filter((i) => i.category === category);

  return (
    <div>
      <div className="flex items-center gap-2 overflow-x-auto pb-1" role="group" aria-label="Filter gallery by category">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            aria-pressed={category === c}
            className={cn(
              "whitespace-nowrap rounded-full px-4 py-2 text-[13px] font-semibold transition-colors",
              category === c
                ? "bg-primary text-primary-foreground shadow-soft"
                : "bg-secondary text-muted-foreground hover:text-foreground",
            )}
          >
            {c}
            <span className="ml-1.5 opacity-60">
              {c === "All" ? items.length : items.filter((i) => i.category === c).length}
            </span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={category}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3 }}
          className="mt-8"
        >
          <PhotoGallery images={filtered.map((g) => ({ ...g.image, alt: g.caption || g.image.alt }))} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
