import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "./reveal";
import { getSiteSettings } from "@/notion/data";

/** Gradient call-to-action banner used at the foot of pages. */
export async function CtaBanner({
  title = "Have an engineering project or opportunity to discuss?",
  description,
}: {
  title?: string;
  description?: string;
}) {
  const settings = await getSiteSettings();

  return (
    <section className="container-shell relative z-10">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl bg-steel-950 px-8 py-14 text-center shadow-lift md:px-16 md:py-20">
          <div className="bg-grid absolute inset-0 opacity-[0.15]" aria-hidden />
          <div
            className="absolute -right-24 -top-24 size-96 rounded-full bg-brand-500/25 blur-[120px]"
            aria-hidden
          />
          <div
            className="absolute -bottom-32 -left-16 size-80 rounded-full bg-steel-500/20 blur-[110px]"
            aria-hidden
          />

          <div className="relative">
            <h2 className="mx-auto max-w-2xl font-display text-3xl font-bold tracking-tight text-white text-balance sm:text-4xl">
              {title}
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-steel-200/90">
              {description ??
                `Interested in civil engineering, geospatial work, property assessment, or a related opportunity? ${settings.name} is open to professional conversations and collaborations across India.`}
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg">
                <Link href="/contact">
                  Get in touch <ArrowRight />
                </Link>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/20 bg-white/5 text-white hover:bg-white/10 hover:text-white"
              >
                <Link href="/projects">View projects</Link>
              </Button>
            </div>

            <p className="mt-6 text-[12.5px] text-steel-300/80">
              {settings.officeHours[0]} · {settings.email}
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
