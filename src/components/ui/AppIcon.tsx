import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";

export type IconName = "cart" | "gift" | "ticket" | "chevron-back" | "warning" | "close" | "play";

const iconMap: Record<IconName, keyof typeof Ionicons.glyphMap> = {
  cart: "cart-outline",
  gift: "gift-outline",
  ticket: "ticket-outline",
  "chevron-back": "chevron-back",
  warning: "warning-outline",
  close: "close",
  play: "play-circle-outline",
};

export const AppIcon = ({ name, size = 24, color }: { name: IconName; size?: number; color?: string }) => {
  const theme = useTheme();
  return <Ionicons name={iconMap[name]} size={size} color={color || theme.primary} />;
};
