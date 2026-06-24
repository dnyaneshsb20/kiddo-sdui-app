import React, { useRef } from "react";
import { View, Image, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  interpolate,
  Extrapolate,
  withDelay
} from "react-native-reanimated";
import Icon from '@expo/vector-icons/Ionicons';
import { BannerHeroBlock } from "../../types/blocks";
import { handleAction } from "../../actions/actionDispatcher";

const { width } = Dimensions.get('window');
const BANNER_HEIGHT = width * 0.5;

const BannerHeroComponent = ({ block }: { block: BannerHeroBlock }) => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);
  const glowOpacity = useSharedValue(0);

  // Overlay animation values
  const overlayOpacity = useSharedValue(0);
  const overlayScale = useSharedValue(0.8);

  const handlePressIn = () => {
    scale.value = withSpring(0.97, { damping: 20, stiffness: 300 });
    opacity.value = withTiming(0.9, { duration: 150 });
    glowOpacity.value = withTiming(1, { duration: 200 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 20, stiffness: 300 });
    opacity.value = withTiming(1, { duration: 150 });
    glowOpacity.value = withTiming(0, { duration: 300 });
  };

  const handlePress = () => {
    // Haptic-like press animation
    overlayOpacity.value = withTiming(1, { duration: 200 });
    overlayScale.value = withSpring(1, { damping: 15, stiffness: 150 });

    // Reset overlay after delay
    setTimeout(() => {
      overlayOpacity.value = withTiming(0, { duration: 300 });
      overlayScale.value = withTiming(0.8, { duration: 300 });
    }, 300);

    if (block.action) {
      handleAction(block.action);
    }
  };

  const containerStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const glowStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
  }));

  const overlayStyle = useAnimatedStyle(() => ({
    opacity: overlayOpacity.value,
    transform: [{ scale: overlayScale.value }],
  }));

  return (
    <Animated.View style={[styles.container, containerStyle]}>
      <TouchableOpacity
        activeOpacity={0.95}
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.touchable}
      >
        {/* Banner Image */}
        <View style={styles.imageWrapper}>
          <Image
            source={{ uri: block.imageUrl }}
            style={styles.image}
            resizeMode="cover"
          />

          {/* Gradient Overlay */}
          <View style={styles.gradientOverlay} />

          {/* Animated Glow Effect */}
          <Animated.View style={[styles.glowEffect, glowStyle]} />

          {/* Premium Badge */}
          {/* <View style={styles.badgeContainer}>
            <View style={styles.badge}>
              <Icon name="sparkles" size={14} color="#FFFFFF" />
              <Text style={styles.badgeText}>Featured</Text>
            </View>
          </View> */}

          {/* Decorative Corner Elements */}
          <View style={[styles.corner, styles.cornerTL]} />
          <View style={[styles.corner, styles.cornerTR]} />
          <View style={[styles.corner, styles.cornerBL]} />
          <View style={[styles.corner, styles.cornerBR]} />
        </View>

        {/* Action Overlay */}
        <Animated.View style={[styles.actionOverlay, overlayStyle]}>
          <View style={styles.actionContent}>
            <Icon name="arrow-forward" size={32} color="#FFFFFF" />
          </View>
        </Animated.View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 4,
    marginBottom: 16,
    marginHorizontal: 16,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 6,
  },
  touchable: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  imageWrapper: {
    width: '100%',
    height: BANNER_HEIGHT,
    backgroundColor: '#F0F0F5',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.02)',
  },
  glowEffect: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 107, 138, 0.1)',
    borderRadius: 16,
  },
  badgeContainer: {
    position: 'absolute',
    top: 12,
    left: 12,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 107, 138, 0.9)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    shadowColor: '#FF6B8A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 3,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
    marginLeft: 4,
    letterSpacing: 0.5,
  },
  corner: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderColor: 'rgba(255,255,255,0.3)',
    opacity: 0.6,
  },
  cornerTL: {
    top: 12,
    left: 12,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderTopLeftRadius: 4,
  },
  cornerTR: {
    top: 12,
    right: 12,
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderTopRightRadius: 4,
  },
  cornerBL: {
    bottom: 12,
    left: 12,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderBottomLeftRadius: 4,
  },
  cornerBR: {
    bottom: 12,
    right: 12,
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderBottomRightRadius: 4,
  },
  actionOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 16,
  },
  actionContent: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
});

// Import Text for badge
import { Text } from "react-native";

export const BannerHero = React.memo(BannerHeroComponent, (prev, next) => prev.block.id === next.block.id);