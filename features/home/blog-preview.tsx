import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { RevealGroup, RevealItem } from "@/components/shared/reveal";
import { SectionHeader } from "@/components/shared/section-header";
import { getPosts } from "@/notion/data";
import { BlogCard } from "@/features/blog/blog-card";

/** Latest three journal articles on the home page. */
export async function BlogPreview() {
  const posts = (await getPosts()).slice(0, 3);

  return (
    <section className="container-shell py-24 md:py-32">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeader
          eyebrow="Engineering notes"
          title="Learning from the field. Exploring what's next."
          description="A collection of notes on civil engineering, geoinformatics, GIS, field work, and emerging technologies such as GeoAI."
        />
        <Link href="/blog" className="group inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
          Read all articles
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
      <RevealGroup className="mt-12 grid gap-6 md:grid-cols-3">
        {posts.map((post) => (
          <RevealItem key={post.id} className="h-full">
            <BlogCard post={post} className="h-full" />
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
