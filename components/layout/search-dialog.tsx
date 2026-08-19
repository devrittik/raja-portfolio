"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, FileText, Folder, Landmark, Layout, Search } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import type { SearchItem } from "@/types";

const typeIcon = { Project: Folder, Service: Landmark, Article: FileText, Page: Layout };

/** Command-palette style search across projects, services, articles and pages. */
export function SearchDialog({
  open,
  onOpenChange,
  items,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: SearchItem[];
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items.slice(0, 8);
    return items
      .filter((i) => `${i.title} ${i.description} ${i.type}`.toLowerCase().includes(q))
      .slice(0, 10);
  }, [query, items]);

  useEffect(() => setCursor(0), [query]);
  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  const go = (item: SearchItem) => {
    onOpenChange(false);
    router.push(item.href);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setCursor((c) => Math.min(c + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setCursor((c) => Math.max(c - 1, 0));
    } else if (e.key === "Enter" && results[cursor]) {
      go(results[cursor]);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="top-[18%] max-w-xl translate-y-0 gap-0 overflow-hidden p-0 sm:top-[24%]">
        <DialogTitle className="sr-only">Search the site</DialogTitle>
        <div className="flex items-center gap-3 border-b border-border px-5 py-4">
          <Search className="size-5 text-muted-foreground" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Search projects, services, articles…"
            className="w-full bg-transparent text-[15px] outline-none placeholder:text-muted-foreground/70"
            aria-label="Search query"
            role="combobox"
            aria-expanded="true"
            aria-controls="search-results"
            aria-activedescendant={results[cursor] ? `search-item-${cursor}` : undefined}
          />
          <kbd className="rounded-md border border-border bg-secondary px-1.5 py-0.5 text-[10px] font-semibold">
            ESC
          </kbd>
        </div>
        <div ref={listRef} id="search-results" role="listbox" className="max-h-[340px] overflow-y-auto p-2">
          {results.length === 0 && (
            <p className="px-4 py-8 text-center text-sm text-muted-foreground">
              No results for “{query}”. Try “civil”, “GIS” or “survey”.
            </p>
          )}
          <AnimatePresence mode="popLayout">
            {results.map((item, i) => {
              const Icon = typeIcon[item.type];
              return (
                <motion.button
                  layout
                  id={`search-item-${i}`}
                  role="option"
                  aria-selected={cursor === i}
                  key={item.href}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.12 }}
                  onClick={() => go(item)}
                  onMouseEnter={() => setCursor(i)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-left transition-colors",
                    cursor === i ? "bg-secondary" : "bg-transparent",
                  )}
                >
                  <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="size-4" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold">{item.title}</span>
                    <span className="block truncate text-xs text-muted-foreground">{item.description}</span>
                  </span>
                  <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                    {item.type}
                    {cursor === i && <ArrowRight className="size-3.5 text-primary" />}
                  </span>
                </motion.button>
              );
            })}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
}
