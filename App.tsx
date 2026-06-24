import React, { useState } from "react";
import { IntroScreen } from "./src/screens/IntroScreen";
import { HomeScreen } from "./src/screens/HomeScreen";
import { ThemeProvider } from "./src/context/ThemeContext";
import { mockHomepagePayload } from "./src/data/mockHomepagePayload";
import { mockCampaigns } from "./src/data/mockCampaigns";
import { useCampaignStore } from "./src/store/campaignStore";
// @ts-ignore
import "./global.css";

export default function App() {
  const [appState, setAppState] = useState<"intro" | "ready">("intro");
  
  const activeCampaignId = useCampaignStore((s) => s.activeCampaignId);
  const baseTheme = mockHomepagePayload.theme;
  
  const currentTheme = activeCampaignId ? mockCampaigns[activeCampaignId]?.theme : baseTheme;

  return (
    <ThemeProvider theme={currentTheme || baseTheme}>
      {appState === "intro" ? (
        <IntroScreen onReady={() => setAppState("ready")} />
      ) : (
        <HomeScreen />
      )}
    </ThemeProvider>
  );
}
