import React, { useCallback } from "react";
import { View, Text, Dimensions } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { DynamicCollectionBlock, ProductItem } from "../../types/blocks";
import { ProductCard } from "../ui/ProductCard";

const TypedFlashList = FlashList as any;
const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2;
const EXACT_HEIGHT = (CARD_WIDTH * 1.1) + 155; // Matches the dynamic height of ProductCard

const DynamicCollectionComponent = ({ block }: { block: DynamicCollectionBlock }) => {
  const renderItem = useCallback(({ item }: { item: ProductItem }) => {
    return <ProductCard item={item} />;
  }, []);

  return (
    <View className="my-1">
      <Text className="text-xl font-bold ml-2 mb-2 text-gray-800">{block.title}</Text>
      {block.items.length <= 2 ? (
        <View className="flex-row flex-wrap justify-around">
          {block.items.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </View>
      ) : (
        <View style={{ height: EXACT_HEIGHT }}>
          <TypedFlashList
            data={block.items}
            renderItem={renderItem}
            horizontal
            showsHorizontalScrollIndicator={false}
            estimatedItemSize={160}
            keyExtractor={(item: ProductItem) => item.id}
            nestedScrollEnabled={true}
          />
        </View>
      )}
    </View>
  );
};

export const DynamicCollection = React.memo(DynamicCollectionComponent, (prev, next) => prev.block.id === next.block.id);
