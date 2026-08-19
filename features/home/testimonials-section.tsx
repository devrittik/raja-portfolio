import { SectionHeader } from "@/components/shared/section-header";
import { getTestimonials } from "@/notion/data";
import { TestimonialsCarousel } from "@/features/testimonials/testimonials-carousel";
import { JsonLd, reviewSchema } from "@/lib/json-ld";
import { getSiteSettings } from "@/notion/data";

/** Testimonial slider with aggregate review JSON-LD. */
export async function TestimonialsSection() {
  const [testimonials, settings] = await Promise.all([getTestimonials(), getSiteSettings()]);
  if (!testimonials.length) return null;

  return (
    <section className="container-shell py-24 md:py-32">
      <JsonLd data={reviewSchema(testimonials, settings)} />
      <SectionHeader
        eyebrow="Professional perspective"
        title="What working in the field has taught me."
        description="Lessons and perspectives shaped by real project environments, from construction sites and surveying to GIS and technical property assessment."
        align="center"
      />
      <div className="mt-14">
        <TestimonialsCarousel testimonials={testimonials} />
      </div>
    </section>
  );
}
