import { CampaignConfig } from "../types/campaigns";

export const mockCampaigns: Record<string, CampaignConfig> = {
  BACK_TO_SCHOOL: {
    id: "BACK_TO_SCHOOL",
    label: "Back to School",
    theme: {
      primary: "#0052FF",
      background: "#FFF4B2",
    },
    overlay: {
      type: "FULL_SCREEN_OVERLAY",
      animation_url: "https://raw.githubusercontent.com/LottieFiles/lottie-react-native/master/example/assets/PinJump.json",
    },
    injectedBlock: {
      id: "campaign_bts_1",
      type: "DYNAMIC_COLLECTION",
      title: "Lunchboxes & Bags",
      contextTag: "lunchboxes_bags",
      items: [
        { id: "bts_p1", name: "Dino Lunchbox", imageUrl: "https://dummyimage.com/150/000/fff", price: 499, action: { type: "ADD_TO_CART", payload: { id: "bts_p1" } } },
        { id: "bts_p2", name: "Space Backpack", imageUrl: "https://dummyimage.com/150/000/fff", price: 1299, action: { type: "ADD_TO_CART", payload: { id: "bts_p2" } } },
        { id: "bts_p3", name: "Unicorn Bottle", imageUrl: "https://dummyimage.com/150/000/fff", price: 399, action: { type: "ADD_TO_CART", payload: { id: "bts_p3" } } },
      ],
    },
  },
  SUMMER_PLAYHOUSE: {
    id: "SUMMER_PLAYHOUSE",
    label: "Summer Playhouse",
    theme: {
      primary: "#0077B6",
      background: "#E0F7FA",
    },
    overlay: {
      type: "FULL_SCREEN_OVERLAY",
      animation_url: "https://raw.githubusercontent.com/LottieFiles/lottie-react-native/master/example/assets/Watermelon.json", 
    },
    injectedBlock: {
      id: "campaign_sp_1",
      type: "DYNAMIC_COLLECTION",
      title: "Petting Zoo Tickets",
      contextTag: "petting_zoo",
      items: [
        { id: "sp_p1", name: "Weekend Pass", imageUrl: "https://dummyimage.com/150/000/fff", price: 299, action: { type: "BOOK_EVENT", payload: { id: "sp_p1" } } },
        { id: "sp_p2", name: "Family Pass", imageUrl: "https://dummyimage.com/150/000/fff", price: 999, action: { type: "BOOK_EVENT", payload: { id: "sp_p2" } } },
      ],
    },
  },
  MYSTERY_GIFT_CARNIVAL: {
    id: "MYSTERY_GIFT_CARNIVAL",
    label: "Mystery Gift Carnival",
    theme: {
      primary: "#D32F2F", // Intense Carnival Red
      background: "#FFEBEE",
    },
    overlay: {
      type: "FULL_SCREEN_OVERLAY",
      animation_url: "https://raw.githubusercontent.com/LottieFiles/lottie-react-native/master/example/assets/LottieLogo1.json",
    },
    injectedBlock: {
      id: "campaign_mg_1",
      type: "DYNAMIC_COLLECTION",
      title: "Carnival Specials",
      contextTag: "carnival_specials",
      items: [
        { id: "mg_p1", name: "Mystery Box Small", imageUrl: "https://dummyimage.com/150/000/fff", price: 199, action: { type: "ADD_TO_CART", payload: { id: "mg_p1" } } },
        { id: "mg_p2", name: "Mystery Gift Coupon", imageUrl: "https://dummyimage.com/150/000/fff", price: 99, action: { type: "APPLY_MYSTERY_GIFT_COUPON", payload: { id: "mg_p2", code: "CARNIVAL20" } } },
      ],
    },
  },
};
