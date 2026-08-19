"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import type { MapProject } from "@/types";

const ProjectMap = dynamic(() => import("./project-map"), {
  ssr: false,
  loading: () => <Skeleton className="h-[420px] w-full rounded-2xl" />,
});

export function ProjectMapLoader(props: React.ComponentProps<typeof ProjectMap>) {
  // Dynamic import boundary — Leaflet requires a browser environment.
  return <ProjectMap {...(props as { projects: MapProject[] })} />;
}
