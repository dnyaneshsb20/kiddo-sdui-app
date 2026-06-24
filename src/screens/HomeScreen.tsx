import React, { useMemo, useCallback, useRef } from "react";
import { View, SafeAreaView, Animated, StyleSheet, StatusBar, Text, ScrollView } from "react-native";
import { FlashList } from "@shopify/flash-list";
import Icon from '@expo/vector-icons/Ionicons';
import { mockHomepagePayload } from "../data/mockHomepagePayload";
import { mockCampaigns } from "../data/mockCampaigns";
import { resolveBlockComponent } from "../registry/componentRegistry";
import { UnknownBlockFallback } from "../components/UnknownBlockFallback";
import { CampaignSwitcher } from "../components/ui/CampaignSwitcher";
import { CartBadge } from "../components/ui/CartBadge";
import { FullScreenOverlay } from "../components/blocks/FullScreenOverlay";
import { useCampaignStore } from "../store/campaignStore";
import { HomepageBlock } from "../types/blocks";
import { useTheme } from "../context/ThemeContext";

const TypedFlashList = FlashList as any;

export const HomeScreen = () => {
  const activeCampaignId = useCampaignStore((s) => s.activeCampaignId);
  const theme = useTheme();

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  const blocksToRender = useMemo(() => {
    let baseBlocks = mockHomepagePayload.blocks;
    if (activeCampaignId) {
      const activeCampaign = mockCampaigns[activeCampaignId];
      if (activeCampaign && activeCampaign.injectedBlock) {
        baseBlocks = baseBlocks.length > 0 ? [
          baseBlocks[0] as HomepageBlock,
          activeCampaign.injectedBlock,
          ...baseBlocks.slice(1),
        ] : [activeCampaign.injectedBlock];
      }
    }
    return baseBlocks;
  }, [activeCampaignId]);

  const activeOverlay = activeCampaignId ? mockCampaigns[activeCampaignId]?.overlay : null;

  // Start animation on mount
  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const renderItem = useCallback(({ item, index }: { item: HomepageBlock; index: number }) => {
    const Component = resolveBlockComponent(item.type);
    if (!Component) {
      return <UnknownBlockFallback type={item.type} />;
    }

    // Staggered animation for each item
    const itemFadeAnim = new Animated.Value(0);
    const itemSlideAnim = new Animated.Value(20);

    Animated.parallel([
      Animated.timing(itemFadeAnim, {
        toValue: 1,
        duration: 400,
        delay: index * 80,
        useNativeDriver: true,
      }),
      Animated.timing(itemSlideAnim, {
        toValue: 0,
        duration: 300,
        delay: index * 80,
        useNativeDriver: true,
      }),
    ]).start();

    return (
      <Animated.View
        style={{
          opacity: itemFadeAnim,
          transform: [{ translateY: itemSlideAnim }],
        }}
      >
        <Component block={item} />
      </Animated.View>
    );
  }, []);

  const getItemType = useCallback((item: HomepageBlock) => {
    return item.type;
  }, []);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* Enhanced Header with Shadow and Icons */}
      <Animated.View
        style={[
          styles.headerContainer,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
            backgroundColor: '#FFFFFF',
          }
        ]}
      >
        <View style={styles.headerContent}>
          <View style={styles.headerLeft}>
            <View style={{ width: 32, height: 32, borderRadius: 16, backgroundColor: theme.primary, justifyContent: 'center', alignItems: 'center', marginRight: 4 }}>
              <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>K</Text>
            </View>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flex: 1, marginHorizontal: 8 }}>
            <CampaignSwitcher />
          </ScrollView>
          <View style={styles.headerRight}>
            <CartBadge />
          </View>
        </View>
      </Animated.View>

      {/* Enhanced FlashList with custom styling */}
      <Animated.View
        style={[
          styles.listContainer,
          {
            opacity: fadeAnim,
          }
        ]}
      >
        <TypedFlashList
          data={blocksToRender}
          renderItem={renderItem}
          getItemType={getItemType}
          keyExtractor={(item: HomepageBlock) => item.id}
          estimatedItemSize={250}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </Animated.View>

      {activeOverlay && <FullScreenOverlay block={activeOverlay} />}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    paddingTop: 10,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 3,
    backgroundColor: '#FFFFFF',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    marginRight: 8,
  },
  iconSpacing: {
    marginRight: 16,
  },
  listContainer: {
    flex: 1,
  },
  listContent: {
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  separator: {
    height: 8,
  },
});

export default HomeScreen;