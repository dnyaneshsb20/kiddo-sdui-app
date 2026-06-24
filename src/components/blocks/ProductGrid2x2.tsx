import React from "react";
import { View, Text } from "react-native";
import { ProductGrid2x2Block } from "../../types/blocks";
import { ProductCard } from "../ui/ProductCard";

const ProductGrid2x2Component = ({ block }: { block: ProductGrid2x2Block }) => {
  return (
    <View className="my-1">
      {block.title && <Text className="text-xl font-bold ml-2 mb-2 text-gray-800">{block.title}</Text>}
      <View className="flex-row flex-wrap justify-around">
        {block.items.map((item) => (
          <ProductCard key={item.id} item={item} />
        ))}
      </View>
    </View>
  );
};

export const ProductGrid2x2 = React.memo(ProductGrid2x2Component, (prev, next) => prev.block.id === next.block.id);
