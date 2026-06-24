import { ActionObject, ActionType } from "../types/actions";
import { useCartStore } from "../store/cartStore";

type ActionHandler = (payload: Record<string, unknown>) => void;

const actionHandlers: Record<ActionType, ActionHandler> = {
  ADD_TO_CART: (payload) => useCartStore.getState().addToCart(payload.id as string),
  DEEP_LINK: (payload) => {
    if (__DEV__) console.log("DEEP_LINK ->", payload.url);
  },
  APPLY_MYSTERY_GIFT_COUPON: (payload) => {
    if (__DEV__) console.log("Applied coupon:", payload.code);
  },
  BOOK_EVENT: (payload) => {
    if (__DEV__) console.log("Booked event:", payload.id);
  },
};

export function handleAction(action: ActionObject) {
  const handler = actionHandlers[action.type];
  if (!handler) {
    if (__DEV__) console.warn("Unhandled action type:", action.type);
    return;
  }
  handler(action.payload as Record<string, unknown>);
}
