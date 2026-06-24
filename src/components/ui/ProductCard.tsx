import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withSpring,
  withTiming,
  useDerivedValue
} from "react-native-reanimated";
import Icon from '@expo/vector-icons/Ionicons';
import { ProductItem } from "../../types/blocks";
import { handleAction } from "../../actions/actionDispatcher";
import { useCartStore } from "../../store/cartStore";
import { useTheme } from "../../context/ThemeContext";

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2;

const ProductCardComponent = ({ item }: { item: ProductItem }) => {
  const theme = useTheme();
  const quantity = useCartStore((s) => s.itemsById[item.id] ?? 0);
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);
  const cartScale = useSharedValue(0);

  // Derived value for cart badge animation
  const cartBadgeScale = useDerivedValue(() => {
    return withTiming(quantity > 0 ? 1 : 0, { duration: 150 });
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const cartBadgeStyle = useAnimatedStyle(() => ({
    transform: [{ scale: cartBadgeScale.value }],
    opacity: cartBadgeScale.value,
  }));

  const onPressAction = () => {
    handleAction(item.action);
  };

  return (
    <Animated.View style={[styles.cardContainer, animatedStyle]}>
      {/* Image Container with Overlay */}
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: item.imageUrl }} 
          style={styles.image} 
          resizeMode="cover"
        />
        
        {/* Wishlist Button */}
        <TouchableOpacity style={styles.wishlistButton}>
          <Icon name="heart-outline" size={18} color="#1A1A2E" />
        </TouchableOpacity>

        {item.mrp && item.mrp > item.price && (
          <View style={[styles.discountBadge, { backgroundColor: theme.primary }]}>
            <Text style={styles.discountText}>
              {Math.round(((item.mrp - item.price) / item.mrp) * 100)}% OFF
            </Text>
          </View>
        )}
      </View>

      {/* Product Details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.productName} numberOfLines={1}>
          {item.name}
        </Text>
        
        <View style={styles.priceContainer}>
          <Text style={styles.price}>₹{item.price}</Text>
          {item.mrp && (
            <Text style={styles.mrp}>₹{item.mrp}</Text>
          )}
        </View>

        {/* Rating Placeholder */}
        <View style={styles.ratingContainer}>
          <Icon name="star" size={12} color="#FFB800" />
          <Icon name="star" size={12} color="#FFB800" />
          <Icon name="star" size={12} color="#FFB800" />
          <Icon name="star" size={12} color="#FFB800" />
          <Icon name="star-half" size={12} color="#FFB800" />
          <Text style={styles.ratingText}>(42)</Text>
        </View>
      </View>

      {/* Add to Cart Button with Animation */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={onPressAction}
          activeOpacity={0.8}
          style={[
            styles.addButton,
            { backgroundColor: theme.primary, shadowColor: theme.primary },
            quantity > 0 && { opacity: 0.9 }
          ]}
        >
          <View style={styles.buttonContent}>
            {quantity > 0 && (
              <Animated.View style={[styles.cartBadge, cartBadgeStyle]}>
                <Text style={styles.cartBadgeText}>{quantity}</Text>
              </Animated.View>
            )}
            <Icon 
              name={quantity > 0 ? "cart" : "cart-outline"} 
              size={16} 
              color="#FFFFFF" 
              style={styles.buttonIcon}
            />
            <Text style={styles.buttonText}>
              {quantity > 0 ? "Add More" : "Add to Cart"}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: CARD_WIDTH,
    marginHorizontal: 6,
    marginVertical: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#F3F3F8',
  },
  imageContainer: {
    position: 'relative',
    height: CARD_WIDTH * 1.1,
    backgroundColor: '#F8F8FC',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  wishlistButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  discountBadge: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    backgroundColor: '#FF6B8A',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  discountText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  detailsContainer: {
    padding: 12,
    paddingBottom: 8,
  },
  productName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1A1A2E',
    marginBottom: 4,
    letterSpacing: -0.2,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 6,
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A2E',
  },
  mrp: {
    fontSize: 12,
    color: '#8E8E9A',
    textDecorationLine: 'line-through',
    marginLeft: 6,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 10,
    color: '#8E8E9A',
    marginLeft: 4,
    fontWeight: '500',
  },
  buttonContainer: {
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
  addButton: {
    backgroundColor: '#FF6B8A',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    shadowColor: '#FF6B8A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  addButtonActive: {
    backgroundColor: '#E85A7A',
    shadowOpacity: 0.3,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonIcon: {
    marginRight: 6,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  cartBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#1A1A2E',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  cartBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
});

export const ProductCard = React.memo(ProductCardComponent, (prev, next) => prev.item.id === next.item.id);