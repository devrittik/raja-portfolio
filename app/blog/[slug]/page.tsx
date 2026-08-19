import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CalendarDays, Clock, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Reveal } from "@/components/shared/reveal";
import { BlogCard } from "@/features/blog/blog-card";
import { TableOfContents } from "@/features/blog/table-of-contents";
import { NotionContent } from "@/features/notion/notion-content";
import { getPostBySlug, getPosts, getSiteSettings } from "@/notion/data";
import { getRecordMap } from "@/notion/record-map";
import { isCmsConfigured } from "@/notion/client";
import { extractHeadings, formatDate, readingMinutes, withHeadingIds } from "@/lib/format";
import { pageMeta } from "@/lib/seo";
import { JsonLd, articleSchema } from "@/lib/json-ld";

export const revalidate = 3600;
export const dynamicParams = true;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return pageMeta({
    title: post.seo?.title ?? post.title,
    description: post.seo?.description ?? post.excerpt,
    path: `/blog/${post.slug}`,
    image: post.featuredImage.src,
    keywords: post.tags,
    type: "article",
    publishedTime: post.date,
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const [post, settings, posts] = await Promise.all([getPostBySlug(slug), getSiteSettings(), getPosts()]);
  if (!post) notFound();

  const recordMap = isCmsConfigured ? await getRecordMap(post.id) : null;
  const html = post.html ? withHeadingIds(post.html) : "";
  const headings = extractHeadings(post.html ?? "");
  const readMinutes = post.readMinutes || readingMinutes(post.html ?? post.excerpt);
  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <JsonLd data={articleSchema(post, settings)} />

      {/* Header */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="bg-grid absolute inset-0 opacity-60 [mask-image:radial-gradient(70%_70%_at_50%_0%,black,transparent)]" aria-hidden />
        <div className="container-shell relative pb-14 pt-16 md:pt-24">
          <Breadcrumbs
            items={[
              { label: "Blog", href: "/blog" },
              { label: post.title, href: `/blog/${post.slug}` },
            ]}
          />
          <Reveal className="mt-8 max-w-3xl">
            <Link href="/blog" className="inline-flex items-center gap-1.5 text-[13px] font-medium text-muted-foreground hover:text-primary">
              <ArrowLeft className="size-3.5" /> All articles
            </Link>
            <div className="mt-5 flex flex-wrap items-center gap-2">
              <Badge>{post.category}</Badge>
              {post.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="normal-case tracking-normal">
                  {tag}
                </Badge>
              ))}
            </div>
            <h1 className="mt-5 font-display text-3xl font-extrabold leading-[1.08] tracking-tight text-balance sm:text-4xl md:text-[3rem]">
              {post.title}
            </h1>
            <p className="mt-4 max-w-2xl text-[15.5px] leading-relaxed text-muted-foreground">{post.excerpt}</p>
            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px] text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <span className="grid size-8 place-items-center rounded-full bg-primary/10 text-primary">
                  <User className="size-4" />
                </span>
                <span>
                  <span className="block font-semibold text-foreground">{post.author}</span>
                  {post.role && <span className="text-[12px]">{post.role}</span>}
                </span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CalendarDays className="size-3.5 text-primary" /> {formatDate(post.date)}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="size-3.5 text-primary" /> {readMinutes} min read
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Featured image */}
      <section className="container-shell -mt-2 pt-10">
        <Reveal>
          <div className="relative aspect-[21/9] overflow-hidden rounded-3xl border border-border shadow-lift">
            <Image
              src={post.featuredImage.src}
              alt={post.featuredImage.alt || post.title}
              fill
              priority
              sizes="(min-width: 1280px) 1152px, 100vw"
              className="object-cover"
            />
          </div>
        </Reveal>
      </section>

      {/* Body */}
      <div className="container-shell grid gap-12 py-14 lg:grid-cols-[1fr_280px]">
        <article className="min-w-0">
          {recordMap ? (
            <NotionContent recordMap={recordMap} />
          ) : (
            <div
              className="prose-content"
              // Sampled CMS content rendered server-side; sanitized at authoring time.
              dangerouslySetInnerHTML={{ __html: html }}
            />
          )}

          {/* Share / footer */}
          <div className="mt-14 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border bg-card p-6 shadow-soft">
            <p className="font-display text-[15px] font-bold">Enjoyed this one?</p>
            <div className="flex items-center gap-3">
              <Button asChild size="sm" variant="outline">
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/blog/${post.slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Share on LinkedIn
                </a>
              </Button>
              <Button asChild size="sm">
                <Link href="/contact">Discuss a project</Link>
              </Button>
            </div>
          </div>
        </article>

        <aside className="no-print space-y-6 lg:sticky lg:top-28 lg:self-start">
          <TableOfContents headings={headings} />
          <div className="rounded-2xl bg-gradient-to-br from-steel-800 to-steel-950 p-6 text-white shadow-lift">
            <p className="font-display font-bold">Field notes, monthly.</p>
            <p className="mt-2 text-[13px] leading-relaxed text-steel-200/90">
              New case studies and practice notes. Straight to your inbox.
            </p>
            <Button asChild size="sm" className="mt-4">
              <Link href="/blog">Browse the journal <ArrowRight /></Link>
            </Button>
          </div>
        </aside>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="border-t border-border bg-secondary/40 py-16">
          <div className="container-shell">
            <h2 className="font-display text-2xl font-bold tracking-tight">Keep reading</h2>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {related.map((p, i) => (
                <Reveal key={p.id} delay={i * 0.06} className="h-full">
                  <BlogCard post={p} className="h-full" />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
