"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ProjectCard } from "./project-card";
import type { Project } from "@/types";

interface ProjectFiltersProps {
  projects: Project[];
  initialCategory?: string;
}

/** Client-side search + category + status filtering over the project archive. */
export function ProjectFilters({ projects, initialCategory }: ProjectFiltersProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(initialCategory || "All");
  const [status, setStatus] = useState("All");

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(projects.map((p) => p.category))).sort()],
    [projects],
  );
  const statuses = ["All", "Completed", "In Progress", "Design"];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((p) => {
      if (category !== "All" && p.category !== category) return false;
      if (status !== "All" && p.status !== status) return false;
      if (q && !`${p.title} ${p.category} ${p.location} ${p.tags.join(" ")} ${p.software.join(" ")}`.toLowerCase().includes(q))
        return false;
      return true;
    });
  }, [projects, query, category, status]);

  return (
    <div>
      {/* Controls */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title, tag or software…"
            aria-label="Search projects"
            className="pl-10"
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-1" role="group" aria-label="Filter by category">
          <SlidersHorizontal className="size-4 shrink-0 text-muted-foreground" aria-hidden />
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
            </button>
          ))}
        </div>
      </div>
      <div className="mt-3 flex items-center gap-2 overflow-x-auto" role="group" aria-label="Filter by status">
        {statuses.map((s) => (
          <button
            key={s}
            onClick={() => setStatus(s)}
            aria-pressed={status === s}
            className={cn(
              "whitespace-nowrap rounded-full border px-3.5 py-1.5 text-[12px] font-medium transition-colors",
              status === s
                ? "border-primary bg-primary/10 text-primary"
                : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground",
            )}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Results */}
      <p className="mt-6 text-[13px] text-muted-foreground" aria-live="polite">
        {filtered.length} {filtered.length === 1 ? "project" : "projects"}
        {category !== "All" && ` in ${category}`}
        {query && ` matching “${query}”`}
      </p>
      <AnimatePresence mode="popLayout">
        {filtered.length ? (
          <motion.div layout className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((project, i) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="h-full"
              >
                <ProjectCard project={project} index={i} priority={i < 3} className="h-full" />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-12 rounded-2xl border border-dashed border-border p-16 text-center"
          >
            <p className="font-display text-lg font-semibold">Nothing in the archive matches.</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Try clearing the category, or search for broader terms like “survey” or “design”.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
