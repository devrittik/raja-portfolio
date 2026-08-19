"use client";

import { useCallback, useRef, useState } from "react";
import { ChevronsLeftRight } from "lucide-react";
import type { ImageAsset } from "@/types";

interface BeforeAfterProps {
  before: ImageAsset;
  after: ImageAsset;
  beforeLabel?: string;
  afterLabel?: string;
}

/**
 * Draggable before/after comparison slider.
 * Pointer + keyboard (slider role) accessible.
 */
export function BeforeAfter({
  before,
  after,
  beforeLabel = "Before",
  afterLabel = "After",
}: BeforeAfterProps) {
  const [pos, setPos] = useState(50);
  const trackRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const setFromClientX = useCallback((clientX: number) => {
    const rect = trackRef.current?.getBoundingClientRect();
    if (!rect) return;
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(97, Math.max(3, pct)));
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    setFromClientX(e.clientX);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (dragging.current) setFromClientX(e.clientX);
  };
  const end = () => {
    dragging.current = false;
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") setPos((p) => Math.max(3, p - 4));
    if (e.key === "ArrowRight") setPos((p) => Math.min(97, p + 4));
  };

  return (
    <div
      ref={trackRef}
      className="relative aspect-[3/2] w-full touch-none select-none overflow-hidden rounded-2xl border border-border shadow-lift"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={end}
      onPointerCancel={end}
    >
      {/* After (base layer) */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={after.src} alt={after.alt} className="absolute inset-0 h-full w-full object-cover" draggable={false} />
      {/* Before (clipped overlay) */}
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={before.src} alt={before.alt} className="h-full w-full object-cover" draggable={false} />
      </div>

      {/* Labels */}
      <span className="absolute left-3 top-3 rounded-full bg-black/55 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white backdrop-blur">
        {beforeLabel}
      </span>
      <span className="absolute right-3 top-3 rounded-full bg-black/55 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white backdrop-blur">
        {afterLabel}
      </span>

      {/* Handle */}
      <div className="absolute inset-y-0" style={{ left: `${pos}%` }}>
        <div className="absolute inset-y-0 -left-px w-0.5 bg-white shadow-[0_0_12px_rgba(0,0,0,0.5)]" />
        <button
          type="button"
          role="slider"
          aria-label="Comparison position"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos)}
          aria-orientation="horizontal"
          onKeyDown={onKeyDown}
          className="absolute top-1/2 -ml-5 grid size-10 -translate-y-1/2 cursor-ew-resize place-items-center rounded-full border-2 border-white bg-primary text-white shadow-lift transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <ChevronsLeftRight className="size-5" />
        </button>
      </div>
    </div>
  );
}
