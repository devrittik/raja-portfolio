"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

/** Newsletter signup posting to /api/subscribe. */
export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setState("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setState(res.ok ? "done" : "error");
    } catch {
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <p className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-forest-600 dark:text-forest-200">
        <CheckCircle2 className="size-4" /> You&apos;re on the list. See you in the next issue.
      </p>
    );
  }

  return (
    <form onSubmit={submit} className="mt-3 flex max-w-sm items-center gap-2">
      <Input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@company.com"
        aria-label="Email address for newsletter"
        className="h-10"
      />
      <Button type="submit" size="sm" disabled={state === "loading"} aria-label="Subscribe">
        {state === "loading" ? <Loader2 className="animate-spin" /> : <Send />}
      </Button>
      {state === "error" && <span className="text-xs text-destructive">Try again.</span>}
    </form>
  );
}
