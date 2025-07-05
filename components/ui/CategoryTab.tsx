import { Box, Pressable, Text } from 'native-base';
import React from 'react';
import { Category } from '../../stores/menuStore';

interface CategoryTabProps {
  category: Category;
  isSelected: boolean;
  onPress: (category: Category) => void;
}

export const CategoryTab: React.FC<CategoryTabProps> = ({
  category,
  isSelected,
  onPress,
}) => {
  return (
    <Pressable onPress={() => onPress(category)}>
      <Box
        px={4}
        py={3}
        mx={1}
        rounded="full"
        bg={isSelected ? 'primary.500' : 'gray.100'}
        borderWidth={1}
        borderColor={isSelected ? 'primary.500' : 'gray.200'}
      >
        <Text
          fontSize="sm"
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