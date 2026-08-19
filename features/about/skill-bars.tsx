"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { SkillGroup } from "@/types";

/** Animated skill bars grouped by discipline. */
export function SkillBars({ groups }: { groups: SkillGroup[] }) {
  const reduce = useReducedMotion();
  return (
    <div className="grid gap-8 md:grid-cols-2">
      {groups.map((group) => (
        <div key={group.name} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
          <h3 className="font-display text-[15px] font-bold tracking-tight">{group.name}</h3>
          <div className="mt-5 space-y-4">
            {group.items.map((skill) => (
              <div key={skill.name}>
                <div className="flex items-center justify-between text-[13px]">
                  <span className="font-medium text-foreground/90">{skill.name}</span>
                  <span className="tabular-nums text-muted-foreground">{skill.level}%</span>
                </div>
                <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-secondary">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-brand-600 to-brand-400"
                    initial={reduce ? false : { width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true, margin: "-30px" }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
