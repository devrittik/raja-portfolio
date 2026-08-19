"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import "leaflet/dist/leaflet.css";
import type { MapProject } from "@/types";
import { cn } from "@/lib/utils";

interface ProjectMapProps {
  projects: MapProject[];
  className?: string;
  /** Single-project detail maps pin and zoom to that point. */
  zoom?: number;
  center?: [number, number];
  scrollWheelZoom?: boolean;
}

/**
 * Interactive Leaflet map with project pins.
 * Tiles switch between CARTO light/dark with the active theme.
 * SSR-safe via next/dynamic in the consuming file.
 */
export default function ProjectMap({
  projects,
  className,
  zoom = 7,
  center,
  scrollWheelZoom = false,
}: ProjectMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    let map: import("leaflet").Map | undefined;
    let cancelled = false;

    (async () => {
      const L = await import("leaflet");
      if (cancelled || !containerRef.current) return;

      const withCoords = projects.filter((p) => p.latitude != null && p.longitude != null);
      if (!containerRef.current || withCoords.length === 0) return;

      const isDark = resolvedTheme === "dark";
      map = L.map(containerRef.current, {
        scrollWheelZoom,
        zoomControl: true,
        attributionControl: true,
      });

      L.tileLayer(
        `https://{s}.basemaps.cartocdn.com/${isDark ? "dark_all" : "light_all"}/{z}/{x}/{y}{r}.png`,
        {
          attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> © <a href="https://carto.com/">CARTO</a>',
          maxZoom: 19,
        },
      ).addTo(map);

      const bounds = L.latLngBounds(withCoords.map((p) => [p.latitude!, p.longitude!] as [number, number]));
      if (center) {
        map.setView(center, zoom);
      } else if (withCoords.length === 1) {
        map.setView([withCoords[0].latitude!, withCoords[0].longitude!], zoom);
      } else {
        map.fitBounds(bounds.pad(0.35));
      }

      const primary = getComputedStyle(document.documentElement).getPropertyValue("--primary").trim() || "#f97316";

      withCoords.forEach((p, i) => {
        const marker = L.marker([p.latitude!, p.longitude!], {
          icon: L.divIcon({
            className: "",
            html: `<div style="
                width:30px;height:30px;border-radius:50% 50% 50% 4px;
                background:${primary};transform:rotate(-45deg);
                display:grid;place-items:center;
                box-shadow:0 6px 16px rgba(0,0,0,.35);
                border:2px solid rgba(255,255,255,.9)
              "><span style="transform:rotate(45deg);color:#fff;font:700 12px/1 system-ui">${i + 1}</span></div>`,
            iconSize: [30, 30],
            iconAnchor: [15, 28],
            popupAnchor: [0, -26],
          }),
          keyboard: true,
          title: p.title,
        }).addTo(map!);

        const img = p.heroImage?.src
          ? `<img src="${p.heroImage.src}" alt="" style="width:100%;height:110px;object-fit:cover;border-radius:10px;margin-bottom:8px" loading="lazy" />`
          : "";
        marker.bindPopup(`
          <div style="min-width:220px;max-width:260px">
            ${img}
            <p style="margin:0 0 2px;font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;opacity:.6">${p.category}</p>
            <p style="margin:0 0 4px;font-size:14px;font-weight:700;line-height:1.3">${p.title}</p>
            <p style="margin:0 0 8px;font-size:12px;opacity:.65">${p.location}</p>
            <a href="/projects/${p.slug}" style="font-size:12.5px;font-weight:700;color:${primary}">View case study →</a>
          </div>
        `);
      });
    })();

    return () => {
      cancelled = true;
      map?.remove();
    };
  }, [projects, resolvedTheme, center, zoom, scrollWheelZoom]);

  return (
    <div
      ref={containerRef}
      role="application"
      aria-label="Interactive project map"
      className={cn("relative z-0 h-[420px] w-full overflow-hidden rounded-2xl border border-border shadow-soft", className)}
    />
  );
}
