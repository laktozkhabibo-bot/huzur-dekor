import type { SVGProps } from "react";
import type { ServiceIcon as ServiceIconName } from "@/lib/types";
import {
  BathIcon,
  CeilingIcon,
  FloorIcon,
  FurnitureIcon,
  InteriorIcon,
  KitchenIcon,
  LightingIcon,
  PaintIcon,
  TvIcon,
  WardrobeIcon,
} from "./Icons";

export const SERVICE_ICON_MAP: Record<ServiceIconName, (p: SVGProps<SVGSVGElement>) => React.JSX.Element> = {
  interior: InteriorIcon,
  furniture: FurnitureIcon,
  paint: PaintIcon,
  ceiling: CeilingIcon,
  kitchen: KitchenIcon,
  tv: TvIcon,
  bath: BathIcon,
  lighting: LightingIcon,
  floor: FloorIcon,
  wardrobe: WardrobeIcon,
};

/** Turkish names shown in the host panel's icon picker */
export const SERVICE_ICON_LABELS: Record<ServiceIconName, string> = {
  interior: "İç mekân",
  furniture: "Mobilya",
  paint: "Boya rulosu",
  ceiling: "Asma tavan",
  kitchen: "Mutfak",
  tv: "TV",
  bath: "Banyo",
  lighting: "Aydınlatma",
  floor: "Zemin / Parke",
  wardrobe: "Gardırop",
};

export function ServiceIcon({ name, ...props }: { name: ServiceIconName } & SVGProps<SVGSVGElement>) {
  const Icon = SERVICE_ICON_MAP[name] ?? InteriorIcon;
  return <Icon {...props} />;
}
