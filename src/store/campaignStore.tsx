import { create } from "zustand";
import { CampaignId } from "../types/campaigns";

interface CampaignState {
  activeCampaignId: CampaignId | null;
  setActiveCampaignId: (id: CampaignId | null) => void;
}

export const useCampaignStore = create<CampaignState>((set) => ({
  activeCampaignId: null,
  setActiveCampaignId: (id) => set({ activeCampaignId: id }),
}));
