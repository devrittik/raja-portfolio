import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

/** Consistent eyebrow/title/intro block used above every section. */
export function SectionHeader({ eyebrow, title, description, align = "left", className }: SectionHeaderProps) {
  return (
    <Reveal
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <p className="mb-3 inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.2em] text-primary">
          <span className="h-px w-6 bg-primary/60" aria-hidden />
          {eyebrow}
          {align === "center" && <span className="h-px w-6 bg-primary/60" aria-hidden />}
        </p>
      )}
      <h2 className="font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-[15.5px] leading-relaxed text-muted-foreground text-pretty">{description}</p>
      )}
    </Reveal>
  );
}
