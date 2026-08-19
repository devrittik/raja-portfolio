"use client";

import { useEffect } from "react";
import Link from "next/link";
import { RotateCcw, TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container-shell grid min-h-[70vh] place-items-center py-24 text-center">
      <div>
        <span className="mx-auto grid size-16 place-items-center rounded-3xl bg-destructive/10 text-destructive">
          <TriangleAlert className="size-8" strokeWidth={2} />
        </span>
        <h1 className="mt-8 font-display text-2xl font-bold">A load path failed.</h1>
        <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-muted-foreground">
          Something unexpected happened while rendering this page. It&apos;s been logged — try again,
          and if it persists, tell us what broke.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <Button onClick={reset}>
            <RotateCcw /> Try again
          </Button>
          <Button asChild variant="outline">
            <Link href="/contact">Report the issue</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
