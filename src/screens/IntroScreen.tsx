import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, StatusBar, Dimensions } from "react-native";
import LottieView from "lottie-react-native";
import Animated, {
  FadeIn,
  FadeOut,
  ZoomIn,
  SlideInDown,
  SlideInUp,
  withSpring,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing
} from "react-native-reanimated";
import Icon from '@expo/vector-icons/Ionicons';
import { fetchAndCacheLottie } from "../utils/assetCache";
import { mockCampaigns } from "../data/mockCampaigns";

const { width, height } = Dimensions.get('window');

export const IntroScreen = ({ onReady }: { onReady: () => void }) => {
  const [progress, setProgress] = useState(0);
  const progressValue = useSharedValue(0);

  useEffect(() => {
    let isActive = true;
    let interval: ReturnType<typeof setInterval>;

    const loadAssets = async () => {
      // Start smooth animation immediately over 5.5 seconds
      progressValue.value = withTiming(1, {
        duration: 5500,
        easing: Easing.inOut(Easing.ease),
      });

      // Update the text progress independently
      let currentMs = 0;
      interval = setInterval(() => {
        if (isActive) {
          currentMs += 100;
          setProgress(Math.min(currentMs / 5500, 1));
        }
      }, 100);

      // Actually load the real assets in the background
      for (const key in mockCampaigns) {
        const campaign = mockCampaigns[key];
        if (campaign && campaign.overlay.animation_url) {
          await fetchAndCacheLottie(campaign.overlay.animation_url).catch(() => { });
        }
      }

      // Force minimum 6 seconds wait before transitioning
      await new Promise(resolve => setTimeout(resolve, 6000));

      clearInterval(interval);
      if (isActive) {
        setProgress(1);
        onReady();
      }
    };
    loadAssets();
    return () => {
      isActive = false;
      clearInterval(interval);
    };
  }, [onReady]);

  const progressBarStyle = useAnimatedStyle(() => ({
    width: `${progressValue.value * 100}%`,
  }));

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#FF6B8A" />

      {/* Premium Background with Gradient Effect */}
      <View style={styles.gradientBackground} />

      {/* Decorative Circles */}
      <View style={[styles.decorativeCircle, styles.circle1]} />
      <View style={[styles.decorativeCircle, styles.circle2]} />
      <View style={[styles.decorativeCircle, styles.circle3]} />

      {/* Main Content */}
      <View style={styles.contentContainer}>
        {/* Brand Name with Icon */}
        <Animated.View
          entering={ZoomIn.duration(1000).springify().damping(12)}
          style={styles.brandContainer}
        >
          <View style={styles.brandIconContainer}>
            <Icon name="heart" size={28} color="#FFFFFF" />
          </View>
          <Animated.Text
            entering={SlideInUp.duration(800).delay(200)}
            style={styles.brandText}
          >
            Kiddo
          </Animated.Text>
        </Animated.View>

        {/* Tagline */}
        <Animated.Text
          entering={FadeIn.duration(1000).delay(300)}
          style={styles.tagline}
        >
          The best for your kiddo
        </Animated.Text>

        {/* Animated Lottie */}
        <Animated.View
          entering={FadeIn.duration(1200).delay(400)}
          style={styles.lottieContainer}
        >
          <View style={styles.lottieWrapper}>
            <LottieView
              source={require("../../assets/lottie/loading.json")}
              autoPlay
              loop
              style={styles.lottie}
            />
          </View>
        </Animated.View>

        {/* Loading Progress */}
        <Animated.View
          entering={FadeIn.duration(800).delay(500)}
          style={styles.progressContainer}
        >
          <View style={styles.progressTrack}>
            <Animated.View style={[styles.progressBar, progressBarStyle]} />
          </View>
          <Text style={styles.progressText}>
            {Math.round(progress * 100)}%
          </Text>
        </Animated.View>

        {/* Loading Status */}
        <Animated.Text
          entering={FadeIn.delay(600)}
          exiting={FadeOut}
          style={styles.loadingText}
        >
          {progress < 0.3 && "Preparing your experience..."}
          {progress >= 0.3 && progress < 0.7 && "Loading campaigns..."}
          {progress >= 0.7 && progress < 1 && "Almost ready..."}
          {progress >= 1 && "Welcome!"}
        </Animated.Text>

        {/* Brand Badges */}
        <Animated.View
          entering={FadeIn.duration(800).delay(700)}
          style={styles.badgesContainer}
        >
          <View style={styles.badge}>
            <Icon name="time-outline" size={16} color="#FF6B8A" />
            <Text style={styles.badgeText}>in 30 mins</Text>
          </View>
          <View style={[styles.badge, styles.badgeDivider]}>
            <Icon name="cube-outline" size={16} color="#FF6B8A" />
            <Text style={styles.badgeText}>20,000+ Products</Text>
          </View>
          <View style={styles.badge}>
            <Icon name="checkmark-circle-outline" size={16} color="#FF6B8A" />
            <Text style={styles.badgeText}>Parent Tested</Text>
          </View>
        </Animated.View>

        {/* Bottom Decorative Text */}
        <Animated.Text
          entering={FadeIn.duration(600).delay(1000)}
          style={styles.bottomText}
        >
          Made with love for every kiddo
        </Animated.Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  gradientBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#FF6B8A',
    opacity: 0.08,
  },
  decorativeCircle: {
    position: 'absolute',
    borderRadius: 999,
    opacity: 0.06,
    backgroundColor: '#FF6B8A',
  },
  circle1: {
    width: width * 0.6,
    height: width * 0.6,
    top: -width * 0.2,
    right: -width * 0.2,
  },
  circle2: {
    width: width * 0.4,
    height: width * 0.4,
    bottom: -width * 0.1,
    left: -width * 0.2,
  },
  circle3: {
    width: width * 0.3,
    height: width * 0.3,
    top: '50%',
    left: '10%',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  brandIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FF6B8A',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    shadowColor: '#FF6B8A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  brandText: {
    fontSize: 42,
    fontWeight: '700',
    color: '#1A1A2E',
    letterSpacing: -0.5,
    fontFamily: 'System',
  },
  tagline: {
    fontSize: 16,
    color: '#6B6B7B',
    fontWeight: '400',
    marginBottom: 32,
    letterSpacing: 0.5,
  },
  lottieContainer: {
    width: 160,
    height: 160,
    marginBottom: 32,
  },
  lottieWrapper: {
    flex: 1,
    borderRadius: 80,
    overflow: 'hidden',
    backgroundColor: '#FFF5F7',
  },
  lottie: {
    width: '100%',
    height: '100%',
  },
  progressContainer: {
    width: '80%',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressTrack: {
    width: '100%',
    height: 4,
    backgroundColor: '#F0F0F5',
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#FF6B8A',
    borderRadius: 2,
    shadowColor: '#FF6B8A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  progressText: {
    fontSize: 13,
    color: '#8E8E9A',
    fontWeight: '500',
  },
  loadingText: {
    fontSize: 14,
    color: '#6B6B7B',
    marginTop: 4,
    marginBottom: 24,
    fontWeight: '400',
    letterSpacing: 0.3,
  },
  badgesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginBottom: 40,
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F0F0F5',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  badgeDivider: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#F0F0F5',
  },
  badgeText: {
    fontSize: 12,
    color: '#3A3A4A',
    fontWeight: '500',
    marginLeft: 4,
  },
  bottomText: {
    fontSize: 13,
    color: '#B0B0BE',
    fontWeight: '400',
    letterSpacing: 1,
    opacity: 0.8,
  },
});

export default IntroScreen;