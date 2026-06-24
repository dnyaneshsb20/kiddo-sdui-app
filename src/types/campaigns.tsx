import { ThemeTokens } from "./theme";
import { FullScreenOverlayBlock, DynamicCollectionBlock } from "./blocks";

export type CampaignId = "BACK_TO_SCHOOL" | "SUMMER_PLAYHOUSE" | "MYSTERY_GIFT_CARNIVAL";

export interface CampaignConfig {
  id: CampaignId;
  label: string;
  theme: ThemeTokens;
  overlay: FullScreenOverlayBlock;
  injectedBlock: DynamicCollectionBlock; // the campaign-specific row spliced into the feed
}
