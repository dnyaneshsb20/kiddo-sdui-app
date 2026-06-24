import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useCampaignStore } from "../../store/campaignStore";
import { CampaignId } from "../../types/campaigns";
import { useTheme } from "../../context/ThemeContext";

export const CampaignSwitcher = () => {
  const activeCampaignId = useCampaignStore((s) => s.activeCampaignId);
  const setActiveCampaignId = useCampaignStore((s) => s.setActiveCampaignId);
  const theme = useTheme();

  const options: { id: CampaignId | null; label: string }[] = [
    { id: null, label: "None" },
    { id: "BACK_TO_SCHOOL", label: "School" },
    { id: "SUMMER_PLAYHOUSE", label: "Summer" },
    { id: "MYSTERY_GIFT_CARNIVAL", label: "Carnival" },
  ];

  return (
    <View className="flex-row justify-center py-1">
      {options.map((opt) => {
        const isActive = activeCampaignId === opt.id;
        return (
          <TouchableOpacity
            key={opt.id || "none"}
            onPress={() => setActiveCampaignId(opt.id)}
            className="px-3 py-1.5 mx-0.5 rounded-full"
            style={{ backgroundColor: isActive ? theme.primary : '#FFF5F7' }}
          >
            <Text style={{ color: isActive ? 'white' : theme.primary, fontWeight: isActive ? 'bold' : '600', fontSize: 13 }}>
              {opt.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
