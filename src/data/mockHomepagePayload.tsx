import { HomepageBlock } from "../types/blocks";
import { ThemeTokens } from "../types/theme";

export interface MockPayload {
  theme: ThemeTokens;
  blocks: HomepageBlock[];
}

export const mockHomepagePayload: MockPayload = {
  theme: { primary: "#FF6B8A", background: "#FFF5F7" },
  blocks: [
    { id: "b1", type: "BANNER_HERO", imageUrl: "https://dummyimage.com/600x300/000/fff", action: { type: "DEEP_LINK", payload: { url: "/category/new-arrivals" } } },
    {
      id: "b2",
      type: "PRODUCT_GRID_2X2",
      title: "Trending Now",
      items: [
        { id: "p1", name: "Baby Wipes", imageUrl: "https://dummyimage.com/150/000/fff", price: 199, mrp: 250, action: { type: "ADD_TO_CART", payload: { id: "p1" } } },
        { id: "p2", name: "Cotton Onesie", imageUrl: "https://dummyimage.com/150/000/fff", price: 499, action: { type: "ADD_TO_CART", payload: { id: "p2" } } },
        { id: "p3", name: "Teething Ring", imageUrl: "https://dummyimage.com/150/000/fff", price: 150, action: { type: "ADD_TO_CART", payload: { id: "p3" } } },
        { id: "p4", name: "Soft Towel", imageUrl: "https://dummyimage.com/150/000/fff", price: 299, action: { type: "ADD_TO_CART", payload: { id: "p4" } } },
      ],
    },
    {
      id: "b3",
      type: "DYNAMIC_COLLECTION",
      title: "Summer Essentials",
      contextTag: "summer_essentials",
      items: Array.from({ length: 8 }).map((_, i) => ({
        id: `s_${i}`,
        name: `Summer Item ${i + 1}`,
        imageUrl: "https://dummyimage.com/150/000/fff",
        price: 399 + i * 10,
        action: { type: "ADD_TO_CART", payload: { id: `s_${i}` } }
      })),
    },
    {
      id: "b4",
      type: "DYNAMIC_COLLECTION",
      title: "Snacks under ₹99",
      contextTag: "snacks_under_99",
      items: Array.from({ length: 8 }).map((_, i) => ({
        id: `sn_${i}`,
        name: `Snack ${i + 1}`,
        imageUrl: "https://dummyimage.com/150/000/fff",
        price: 50 + i * 5,
        action: { type: "ADD_TO_CART", payload: { id: `sn_${i}` } }
      })),
    },
    {
      id: "b5",
      type: "DYNAMIC_COLLECTION",
      title: "Toys & Games",
      contextTag: "toys_games",
      items: Array.from({ length: 8 }).map((_, i) => ({
        id: `t_${i}`,
        name: `Toy ${i + 1}`,
        imageUrl: "https://dummyimage.com/150/000/fff",
        price: 599 + i * 50,
        action: { type: "ADD_TO_CART", payload: { id: `t_${i}` } }
      })),
    },
    { id: "b6", type: "NEW_COMPONENT_V2", someFutureField: "value" }, // unknown type to test resilience
  ],
};
