import React from "react";
import { BannerHero } from "../components/blocks/BannerHero";
import { ProductGrid2x2 } from "../components/blocks/ProductGrid2x2";
import { DynamicCollection } from "../components/blocks/DynamicCollection";

export const componentRegistry: Record<string, React.ComponentType<any>> = {
  BANNER_HERO: BannerHero,
  PRODUCT_GRID_2X2: ProductGrid2x2,
  DYNAMIC_COLLECTION: DynamicCollection,
};

export function resolveBlockComponent(type: string): React.ComponentType<any> | null {
  return componentRegistry[type] ?? null;
}
