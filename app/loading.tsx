import { Compass } from "lucide-react";

export default function Loading() {
  return (
    <div className="grid min-h-[60vh] place-items-center" role="status" aria-label="Loading page">
      <div className="flex flex-col items-center gap-4">
        <span className="grid size-14 animate-pulse-soft place-items-center rounded-2xl bg-primary/10 text-primary">
          <Compass className="size-7" strokeWidth={2.2} />
        </span>
        <div className="h-0.5 w-40 overflow-hidden rounded-full bg-secondary">
          <div className="h-full w-1/2 animate-pulse rounded-full bg-gradient-to-r from-brand-600 to-brand-400" />
        </div>
      </div>
    </div>
  );
}
