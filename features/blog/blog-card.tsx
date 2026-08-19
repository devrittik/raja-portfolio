import Image from "next/image";
import Link from "next/link";
import { Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatDateShort } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { BlogPost } from "@/types";

export function BlogCard({ post, className, priority = false }: { post: BlogPost; className?: string; priority?: boolean }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift",
        className,
      )}
    >
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image
          src={post.featuredImage.src}
          alt={post.featuredImage.alt || post.title}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <Badge className="absolute left-4 top-4 border-transparent bg-black/45 text-white backdrop-blur">
          {post.category}
        </Badge>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="flex items-center gap-2 text-[12px] text-muted-foreground">
          <span>{formatDateShort(post.date)}</span>
          <span aria-hidden>·</span>
          <span className="inline-flex items-center gap-1">
            <Clock className="size-3" /> {post.readMinutes} min
          </span>
        </p>
        <h3 className="mt-2 font-display text-[16.5px] font-bold leading-snug tracking-tight transition-colors group-hover:text-primary">
          {post.title}
        </h3>
        <p className="mt-2 line-clamp-2 flex-1 text-[13.5px] leading-relaxed text-muted-foreground">{post.excerpt}</p>
        <p className="mt-4 text-[12.5px] font-medium text-foreground/70">by {post.author}</p>
      </div>
    </Link>
  );
}
