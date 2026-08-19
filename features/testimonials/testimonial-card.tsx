import { Quote, Star, StarHalf } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Testimonial } from "@/types";

export function RatingStars({ rating, className }: { rating: number; className?: string }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <span className={cn("inline-flex items-center gap-0.5 text-brand-500", className)} aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: full }, (_, i) => (
        <Star key={i} className="size-4" fill="currentColor" strokeWidth={0} />
      ))}
      {half && <StarHalf className="size-4" fill="currentColor" strokeWidth={0} />}
      {Array.from({ length: Math.max(0, 5 - full - (half ? 1 : 0)) }, (_, i) => (
        <Star key={`e${i}`} className="size-4 opacity-25" fill="currentColor" strokeWidth={0} />
      ))}
    </span>
  );
}

export function TestimonialCard({ t, className }: { t: Testimonial; className?: string }) {
  return (
    <figure className={cn("relative flex h-full flex-col rounded-2xl border border-border bg-card p-7 shadow-soft", className)}>
      <Quote className="size-7 text-primary/35" fill="currentColor" strokeWidth={0} aria-hidden />
      <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-foreground/90">
        “{t.quote}”
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-5">
        <span className="grid size-11 shrink-0 place-items-center rounded-full bg-steel-600/10 font-display text-sm font-bold text-steel-600 dark:text-steel-300">
          {t.initials}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-semibold">{t.name}</span>
          <span className="block truncate text-xs text-muted-foreground">
            {t.role}, {t.company}
          </span>
        </span>
        <RatingStars rating={t.rating} />
      </figcaption>
    </figure>
  );
}
