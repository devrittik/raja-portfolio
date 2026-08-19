import type { Metadata } from "next";
import { PageHeader } from "@/components/shared/page-header";
import { CtaBanner } from "@/components/shared/cta-banner";
import { getGallery } from "@/notion/data";
import { pageMeta } from "@/lib/seo";
import { GalleryArchive } from "@/features/gallery/gallery-archive";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  return pageMeta({
    title: "Gallery — Civil Engineering, GIS & Field Work",
    description:
      "A visual collection of civil engineering, construction, surveying, GIS, geospatial analysis and field work from Raja Dey's professional journey.",
    path: "/gallery",
  });
}

export default async function GalleryPage() {
  const items = await getGallery();

  return (
    <>
      <PageHeader
        eyebrow="Visual archive"
        title="Engineering beyond the drawing board."
        description="A collection of field photographs, project work, GIS visualizations, surveying and professional moments from across civil engineering and geoinformatics."
        breadcrumbs={[{ label: "Gallery", href: "/gallery" }]}
      />

      <section className="container-shell py-16">
        <GalleryArchive items={items} />
      </section>

      <CtaBanner title="Have a project or opportunity to discuss?" />
    </>
  );
}
