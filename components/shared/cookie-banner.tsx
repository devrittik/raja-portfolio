"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Cookie } from "lucide-react";
import { Button } from "@/components/ui/button";

export const CONSENT_KEY = "tf-consent";

/**
 * Cookie consent banner. Analytics (GA/Clarity) load only after acceptance —
 * see components/shared/analytics.tsx.
 */
export function CookieBanner() {
  const [state, setState] = useState<"pending" | "resolved">("pending");
  const [show, setShow] = useState(false);

  useEffect(() => {
    const existing = localStorage.getItem(CONSENT_KEY);
    if (!existing) {
      const t = setTimeout(() => setShow(true), 1600);
      setState("pending");
      return () => clearTimeout(t);
    }
    setState("resolved");
    window.dispatchEvent(new CustomEvent("tf-consent", { detail: existing }));
  }, []);

  const decide = (value: "accepted" | "declined") => {
    localStorage.setItem(CONSENT_KEY, value);
    setShow(false);
    setState("resolved");
    window.dispatchEvent(new CustomEvent("tf-consent", { detail: value }));
  };

  if (state === "resolved" && !show) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          role="dialog"
          aria-live="polite"
          aria-label="Cookie consent"
          className="no-print glass fixed bottom-5 left-5 z-50 w-[calc(100%-2.5rem)] max-w-md rounded-2xl p-5 shadow-lift"
        >
          <div className="flex items-start gap-3">
            <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
              <Cookie className="size-4.5" />
            </span>
            <div>
              <p className="text-sm font-semibold">A few essential cookies</p>
              <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">
                We use analytics (GA4 / Clarity) to understand which case studies matter to you.
                Nothing is tracked without your consent.
              </p>
              <div className="mt-3 flex gap-2">
                <Button size="sm" onClick={() => decide("accepted")}>
                  Accept
                </Button>
                <Button size="sm" variant="outline" onClick={() => decide("declined")}>
                  Decline
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
