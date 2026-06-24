import React from "react";
import { View, Text } from "react-native";
import { useCartStore } from "../../store/cartStore";
import { AppIcon } from "./AppIcon";
import { useTheme } from "../../context/ThemeContext";

export const CartBadge = () => {
  const totalCount = useCartStore((s) => s.totalCount);
  const theme = useTheme();

  return (
    <View className="relative p-2">
      <AppIcon name="cart" size={28} />
      {totalCount > 0 && (
        <View 
          className="absolute top-0 right-0 rounded-full w-5 h-5 items-center justify-center"
          style={{ backgroundColor: theme.primary }}
        >
          <Text className="text-white text-xs font-bold">{totalCount}</Text>
        </View>
      )}
    </View>
  );
};
