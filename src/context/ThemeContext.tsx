import React, { createContext, useContext } from "react";
import { View } from "react-native";
import { vars } from "nativewind";
import { ThemeTokens } from "../types/theme";

const ThemeContext = createContext<ThemeTokens | null>(null);

export const ThemeProvider = ({ theme, children }: { theme: ThemeTokens; children: React.ReactNode }) => {
  const themeVars = vars({
    "--color-primary": theme.primary,
    "--color-background": theme.background,
  });

  return (
    <ThemeContext.Provider value={theme}>
      <View style={themeVars} className="flex-1">
        {children}
      </View>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
};
