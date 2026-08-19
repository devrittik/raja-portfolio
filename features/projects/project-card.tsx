import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";

const statusVariant: Record<string, "forest" | "default" | "steel" | "secondary"> = {
  Completed: "forest",
  "In Progress": "default",
  Design: "steel",
  "On Hold": "secondary",
};

interface ProjectCardProps {
  project: Project;
  index?: number;
  priority?: boolean;
  className?: string;
}

export function ProjectCard({ project, index = 0, priority = false, className }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift",
        className,
      )}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={project.heroImage.src}
          alt={project.heroImage.alt || project.title}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-steel-950/50 via-transparent to-transparent opacity-80" aria-hidden />
        <div className="absolute left-4 top-4 flex gap-2">
          <Badge className="bg-black/45 text-white border-transparent backdrop-blur">{project.category}</Badge>
          <Badge variant={statusVariant[project.status] ?? "secondary"} className="backdrop-blur">
            {project.status}
          </Badge>
        </div>
        <span className="absolute bottom-4 right-4 grid size-10 translate-y-2 place-items-center rounded-full bg-primary text-primary-foreground opacity-0 shadow-lift transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight className="size-5" />
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="flex items-center gap-1.5 text-[12px] font-medium text-muted-foreground">
          <MapPin className="size-3.5 text-primary" />
          {project.location} · {project.year}
        </p>
        <h3 className="mt-2 font-display text-[17px] font-bold leading-snug tracking-tight transition-colors group-hover:text-primary">
          {project.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-[13.5px] leading-relaxed text-muted-foreground">{project.excerpt}</p>
        {project.software.length > 0 && (
          <p className="mt-4 line-clamp-1 text-[12px] text-muted-foreground/80">
            {project.software.slice(0, 4).join(" · ")}
          </p>
        )}
      </div>
    </Link>
  );
}
