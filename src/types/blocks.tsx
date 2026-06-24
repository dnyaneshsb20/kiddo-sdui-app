import { ActionObject } from "./actions";

export interface ProductItem {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  mrp?: number;
  action: ActionObject;
}

export interface BannerHeroBlock {
  id: string;
  type: "BANNER_HERO";
  imageUrl: string;
  action?: ActionObject;
}

export interface ProductGrid2x2Block {
  id: string;
  type: "PRODUCT_GRID_2X2";
  title?: string;
  items: ProductItem[]; // exactly 4 expected; render defensively if fewer/more arrive
}

export interface DynamicCollectionBlock {
  id: string;
  type: "DYNAMIC_COLLECTION";
  title: string;
  contextTag: string; // e.g. "summer_essentials", "snacks_under_99"
  items: ProductItem[];
}

export interface FullScreenOverlayBlock {
  type: "FULL_SCREEN_OVERLAY";
  animation_url: string;
}

export type KnownHomepageBlock =
  | BannerHeroBlock
  | ProductGrid2x2Block
  | DynamicCollectionBlock;

// Server can send a type the client doesn't know about yet.
export type HomepageBlock = KnownHomepageBlock | { id: string; type: string; [key: string]: unknown };
