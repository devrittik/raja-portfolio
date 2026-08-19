import {
  Building2,
  DraftingCompass,
  Globe2,
  HardHat,
  Landmark,
  Mountain,
  Radar,
  Route,
  Ruler,
  Satellite,
  TowerControl,
  Waves,
  type LucideIcon,
} from "lucide-react";

const registry: Record<string, LucideIcon> = {
  landmark: Landmark,
  route: Route,
  radar: Radar,
  globe2: Globe2,
  globe: Globe2,
  waves: Waves,
  hardhat: HardHat,
  building2: Building2,
  draftingcompass: DraftingCompass,
  ruler: Ruler,
  mountain: Mountain,
  satellite: Satellite,
  towercontrol: TowerControl,
};

/** Resolve a lucide icon by the name stored in the CMS. */
export function CmsIcon({ name, className }: { name: string; className?: string }) {
  const Icon = registry[name.toLowerCase().replace(/[\s-]/g, "")] ?? DraftingCompass;
  return <Icon className={className} />;
}
