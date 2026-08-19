"use client";

import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Captions from "yet-another-react-lightbox/plugins/captions";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import type { ImageAsset } from "@/types";

interface PhotoGalleryProps {
  images: ImageAsset[];
  columns?: number;
}

export function PhotoGallery({
  images,
  columns = 3,
}: PhotoGalleryProps) {
  const [index, setIndex] = useState(-1);

  return (
    <>
      <div
        className="grid grid-cols-1 gap-4 sm:grid-cols-2"
        style={{
          gridTemplateColumns:
            columns >= 3 ? undefined : undefined,
        }}
      >
        {images.map((image, i) => (
          <button
            key={image.src}
            type="button"
            onClick={() => setIndex(i)}
            className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-border shadow-soft"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image.src}
              alt={image.alt}
              loading="lazy"
              decoding="async"
              className="size-full cursor-zoom-in object-cover transition-transform duration-300 group-hover:scale-[1.015]"
            />
          </button>
        ))}
      </div>

      <Lightbox
        index={index}
        open={index >= 0}
        close={() => setIndex(-1)}
        slides={images.map((image) => ({
          src: image.src,
          alt: image.alt,
          title: image.alt,
        }))}
        plugins={[Fullscreen, Zoom, Captions]}
        zoom={{
          maxZoomPixelRatio: 3,
          scrollToZoom: true,
        }}
        captions={{
          showToggle: true,
          descriptionTextAlign: "center",
        }}
        carousel={{ finite: true }}
        styles={{
          container: {
            backgroundColor: "rgba(9, 9, 10, 0.92)",
          },
        }}
      />
    </>
  );
}