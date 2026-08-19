"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Compass } from "lucide-react";

/** One-time branded splash that lifts after the page settles. */
export function SplashLoader({ siteName }: { siteName: string }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShow(false), 900);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="no-print fixed inset-0 z-[60] grid place-items-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.45, ease: "easeInOut" } }}
          aria-label="Loading"
          role="status"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center gap-4"
          >
            <motion.span
              animate={{ rotate: [0, 8, -8, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              className="grid size-14 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-lift"
            >
              <Compass className="size-7" strokeWidth={2.2} />
            </motion.span>
            <p className="font-display text-sm font-bold uppercase tracking-[0.3em] text-muted-foreground">
              {siteName}
            </p>
            <div className="h-0.5 w-40 overflow-hidden rounded-full bg-secondary">
              <motion.div
                className="h-full w-full bg-gradient-to-r from-brand-600 to-brand-400"
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
