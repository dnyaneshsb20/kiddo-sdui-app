import { create } from "zustand";

interface CartState {
  itemsById: Record<string, number>;
  totalCount: number;
  addToCart: (id: string) => void;
}

export const useCartStore = create<CartState>((set) => ({
  itemsById: {},
  totalCount: 0,
  addToCart: (id) =>
    set((state) => {
      const currentQty = state.itemsById[id] ?? 0;
      return {
        itemsById: { ...state.itemsById, [id]: currentQty + 1 },
        totalCount: state.totalCount + 1,
      };
    }),
}));
