import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";
import { FullScreenOverlayBlock } from "../../types/blocks";
import { fetchAndCacheLottie } from "../../utils/assetCache";

export const FullScreenOverlay = ({ block }: { block: FullScreenOverlayBlock }) => {
  const [lottieSource, setLottieSource] = useState<any>(null);

  useEffect(() => {
    let active = true;
    if (block?.animation_url) {
      fetchAndCacheLottie(block.animation_url).then((data) => {
        if (active && data) setLottieSource(data);
      });
    }
    return () => { active = false; };
  }, [block?.animation_url]);

  if (!lottieSource) return null;

  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill} className="z-50 items-center justify-center">
      <LottieView
        source={lottieSource}
        autoPlay
        loop
        style={{ width: "100%", height: "100%" }}
        resizeMode="cover"
      />
    </View>
  );
};
