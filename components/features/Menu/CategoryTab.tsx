import { Box, Pressable, Text } from 'native-base';
import React from 'react';
import { Category } from '../../../stores/menuStore';

/**
 * CategoryTab - Enterprise-level category selection component
 * 
 * @component
 * @description Displays category tabs for menu navigation with selection state
 * @example
 * ```tsx
 * <CategoryTab
 *   category={category}
 *   isSelected={true}
 *   onPress={handleCategoryPress}
 * />
 * ```
 */
interface CategoryTabProps {
  /** Category data to display */
  category: Category;
  /** Whether this category is currently selected */
  isSelected: boolean;
  /** Callback when category is pressed */
  onPress: (category: Category) => void;
  /** Additional styling variant */
  variant?: 'default' | 'compact' | 'pill';
}

export const CategoryTab: React.FC<CategoryTabProps> = ({
  category,
  isSelected,
  onPress,
  variant = 'default',
}) => {
  /**
   * Get variant-specific styling
   */
  const getVariantProps = () => {
    switch (variant) {
      case 'compact':
        return {
          px: 3,
          py: 2,
          mx: 1,
        };
      case 'pill':
        return {
          px: 6,
          py: 3,
          mx: 2,
          rounded: 'full',
        };
      default:
        return {
          px: 4,
          py: 3,
          mx: 1,
          rounded: 'full',
        };
    }
  };

  /**
   * Get text size based on variant
   */
  const getTextSize = () => {
    switch (variant) {
      case 'compact':
        return 'xs';
      case 'pill':
        return 'md';
      default:
        return 'sm';
    }
  };

  return (
    <Pressable onPress={() => onPress(category)}>
      <Box
        {...getVariantProps()}
        bg={isSelected ? 'primary.500' : 'gray.100'}
        borderWidth={1}
        borderColor={isSelected ? 'primary.500' : 'gray.200'}
      >
        <Text
          fontSize={getTextSize()}
          fontWeight="medium"
          color={isSelected ? 'white' : 'gray.700'}
          textAlign="center"
        >
          {category.icon} {category.name}
        </Text>
      </Box>
    </Pressable>
  );
};

export default CategoryTab; 