export type ActionType =
  | "ADD_TO_CART"
  | "DEEP_LINK"
  | "APPLY_MYSTERY_GIFT_COUPON"
  | "BOOK_EVENT";

export interface ActionObject<P = Record<string, unknown>> {
  type: ActionType;
  payload: P;
}
