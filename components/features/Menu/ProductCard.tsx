import { MaterialIcons } from '@expo/vector-icons';
import { Box, HStack, Icon, Pressable, Text, VStack } from 'native-base';
import React from 'react';
import { Product } from '../../../stores/menuStore';

/**
 * ProductCard - Enterprise-level product display component
 * 
 * @component
 * @description Displays product information in a card format with add to cart functionality
 * @example
 * ```tsx
 * <ProductCard
 *   product={product}
 *   onPress={handleProductPress}
 *   showAddButton={true}
 * />
 * ```
 */
interface ProductCardProps {
  /** Product data to display */
  product: Product;
  /** Callback when product is pressed */
  onPress: (product: Product) => void;
  /** Whether to show add to cart button */
  showAddButton?: boolean;
  /** Additional styling props */
  variant?: 'default' | 'compact' | 'detailed';
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onPress,
  showAddButton = true,
  variant = 'default',
}) => {
  /**
   * Get variant-specific styling
   */
  const getVariantProps = () => {
    switch (variant) {
      case 'compact':
        return {
          p: 3,
          mb: 2,
        };
      case 'detailed':
        return {
          p: 5,
          mb: 4,
        };
      default:
        return {
          p: 4,
          mb: 3,
        };
    }
  };

  /**
   * Get image size based on variant
   */
  const getImageSize = () => {
    switch (variant) {
      case 'compact':
        return { w: 12, h: 12 };
      case 'detailed':
        return { w: 20, h: 20 };
      default:
        return { w: 16, h: 16 };
    }
  };

  return (
    <Pressable onPress={() => onPress(product)}>
      <Box
        bg="white"
        rounded="lg"
        shadow={2}
        borderWidth={1}
        borderColor="gray.200"
        {...getVariantProps()}
      >
        <HStack space={3} alignItems="center">
          {/* Product Image Placeholder */}
          <Box
            {...getImageSize()}
            bg="gray.100"
            rounded="md"
            justifyContent="center"
            alignItems="center"
          >
            <Icon
              as={MaterialIcons}
              name="restaurant"
              size={variant === 'detailed' ? 'lg' : 'md'}
              color="gray.400"
            />
          </Box>

          {/* Product Information */}
          <VStack flex={1} space={1}>
            <Text 
              fontSize={variant === 'detailed' ? 'lg' : 'md'} 
              fontWeight="semibold" 
              color="gray.800"
            >
              {product.name}
            </Text>
            <Text 
              fontSize="sm" 
              color="gray.600" 
              numberOfLines={variant === 'detailed' ? 3 : 2}
            >
              {product.description}
            </Text>
            <Text 
              fontSize={variant === 'detailed' ? 'xl' : 'lg'} 
              fontWeight="bold" 
              color="primary.500"
            >
              ₺{product.price}
            </Text>
          </VStack>

          {/* Add to Cart Button */}
          {showAddButton && (
            <Box
              bg="primary.500"
              rounded="full"
              w={variant === 'detailed' ? 10 : 8}
              h={variant === 'detailed' ? 10 : 8}
              justifyContent="center"
              alignItems="center"
            >
              <Icon
                as={MaterialIcons}
                name="add"
                size={variant === 'detailed' ? 'md' : 'sm'}
                color="white"
              />
            </Box>
          )}
        </HStack>

        {/* Stock Status Badge */}
        {!product.available && (
          <Box
            position="absolute"
            top={2}
            right={2}
            bg="error.500"
            px={2}
            py={1}
            rounded="full"
          >
            <Text fontSize="xs" color="white" fontWeight="bold">
              Stokta Yok
            </Text>
          </Box>
        )}
      </Box>
    </Pressable>
  );
};

export default ProductCard; 