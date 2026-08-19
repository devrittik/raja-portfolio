"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { BlogCard } from "./blog-card";
import type { BlogPost } from "@/types";

/** Client-side search + category filtering for the journal. */
export function BlogFilters({ posts, initialCategory }: { posts: BlogPost[]; initialCategory?: string }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(initialCategory && initialCategory !== "" ? initialCategory : "All");

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(posts.map((p) => p.category))).sort()],
    [posts],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((p) => {
      if (category !== "All" && p.category !== category) return false;
      if (q && !`${p.title} ${p.excerpt} ${p.category} ${p.tags.join(" ")}`.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [posts, query, category]);

  return (
    <div>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search articles…"
            aria-label="Search articles"
            className="pl-10"
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-1" role="group" aria-label="Filter by topic">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              aria-pressed={category === c}
              className={cn(
                "whitespace-nowrap rounded-full px-4 py-2 text-[13px] font-semibold transition-colors",
                category === c ? "bg-primary text-primary-foreground shadow-soft" : "bg-secondary text-muted-foreground hover:text-foreground",
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {filtered.length ? (
        <motion.div layout className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((post, i) => (
              <motion.div
                layout
                key={post.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25 }}
                className="h-full"
              >
                <BlogCard post={post} priority={i < 3} className="h-full" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="mt-12 rounded-2xl border border-dashed border-border p-16 text-center">
          <p className="font-display text-lg font-semibold">No articles match.</p>
          <p className="mt-1 text-sm text-muted-foreground">Try another topic or clear the search.</p>
        </div>
      )}
    </div>
  );
}
