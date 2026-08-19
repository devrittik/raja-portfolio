"use client";

import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

/** Opens the pre-built CV PDF in a new browser tab. */
export function PrintButton({
  label = "View CV",
}: {
  label?: string;
}) {
  return (
    <Button
      asChild
      variant="outline"
      size="sm"
      className="no-print gap-2"
    >
      <a
        href="/cv/Er_Raja_Dey.pdf"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FileText />
        {label}
      </a>
    </Button>
  );
}
