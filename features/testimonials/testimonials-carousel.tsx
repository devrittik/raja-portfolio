"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TestimonialCard } from "./testimonial-card";
import { cn } from "@/lib/utils";
import type { Testimonial } from "@/types";

/** Embla-powered testimonial slider with arrows and dots. */
export function TestimonialsCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [selected, setSelected] = useState(0);
  const [count, setCount] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setCount(emblaApi.scrollSnapList().length);
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!emblaApi) return;
    const timer = setInterval(() => emblaApi.scrollNext(), 6500);
    const el = emblaApi.rootNode();
    const stop = () => clearInterval(timer);
    el.addEventListener("pointerenter", stop);
    return () => {
      clearInterval(timer);
      el.removeEventListener("pointerenter", stop);
    };
  }, [emblaApi]);

  return (
    <div className="relative">
      <div ref={emblaRef} className="overflow-hidden" aria-roledescription="carousel" aria-label="Client testimonials">
        <div className="flex gap-5">
          {testimonials.map((t) => (
            <div key={t.id} className="min-w-0 flex-[0_0_100%] sm:flex-[0_0_50%] xl:flex-[0_0_33.333%]" role="group" aria-roledescription="slide">
              <TestimonialCard t={t} className="h-full" />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 flex items-center justify-center gap-4">
        <button
          onClick={() => emblaApi?.scrollPrev()}
          aria-label="Previous testimonials"
          className="grid size-10 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
        >
          <ChevronLeft className="size-5" />
        </button>
        <div className="flex gap-2">
          {Array.from({ length: count }, (_, i) => (
            <button
              key={i}
              onClick={() => emblaApi?.scrollTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                i === selected ? "w-6 bg-primary" : "w-2 bg-border hover:bg-muted-foreground/40",
              )}
            />
          ))}
        </div>
        <button
          onClick={() => emblaApi?.scrollNext()}
          aria-label="Next testimonials"
          className="grid size-10 place-items-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
        >
          <ChevronRight className="size-5" />
        </button>
      </div>
    </div>
  );
}
